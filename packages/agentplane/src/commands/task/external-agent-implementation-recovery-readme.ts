import {
  isGitObjectId,
  parseTaskReadme,
  renderTaskReadme,
  setMarkdownSection,
} from "@agentplaneorg/core/tasks";

import { isRecord } from "../../shared/guards.js";
import { taskReadmesHaveOnlyLifecycleDrift } from "../shared/quality-review-target.js";

function recoveryComparableReadme(
  markdown: string,
  commit: string,
  current: boolean,
): string | null {
  const parsed = parseTaskReadme(markdown);
  const fields = parsed.frontmatter;
  Reflect.deleteProperty(fields, "token_usage");
  if (isRecord(fields.execution_contract)) {
    for (const key of ["digest", "observed", "verification", "reason_codes"])
      Reflect.deleteProperty(fields.execution_contract, key);
  }
  if (isRecord(fields.extensions)) {
    const aggregate = fields.extensions["agentplane.task_centric"];
    if (isRecord(aggregate)) {
      const comparableAggregate = { ...aggregate };
      for (const key of [
        "revision",
        "lifecycle",
        "final_validation",
        "event_cursor",
        "updated_at",
      ]) {
        Reflect.deleteProperty(comparableAggregate, key);
      }
      fields.extensions["agentplane.task_centric"] = comparableAggregate;
    }
    Reflect.deleteProperty(fields.extensions, "agentplane.task_centric_runtime");
    const receipt = fields.extensions.implementation_commit;
    if (
      receipt != null &&
      (!isRecord(receipt) ||
        typeof receipt.hash !== "string" ||
        (current && receipt.hash !== commit) ||
        Object.keys(receipt).some((key) => !["hash", "message"].includes(key)))
    )
      return null;
    Reflect.deleteProperty(fields.extensions, "implementation_commit");
  }
  return renderTaskReadme(fields, setMarkdownSection(parsed.body, "Token Usage", ""));
}

/** This comparison does not reuse verification. The fresh route reruns the observed contract. */
export function taskReadmesPreserveRecoveryContract(
  before: string,
  after: string,
  commit: string,
): boolean {
  const original = parseTaskReadme(before);
  const next = parseTaskReadme(after);
  const previousExtensions = original.frontmatter.extensions;
  const nextExtensions = next.frontmatter.extensions;
  if (isRecord(previousExtensions) && isRecord(nextExtensions)) {
    const previous = previousExtensions.task_execution_context;
    const current = nextExtensions.task_execution_context;
    const identityKeys = ["schema_version", "base_ref", "base_sha", "repository_identity"];
    if (
      isRecord(previous) &&
      isRecord(current) &&
      previous.source === "creation_checkout" &&
      !Object.hasOwn(current, "source") &&
      previous.schema_version === 1 &&
      typeof previous.base_ref === "string" &&
      previous.base_ref.trim().length > 0 &&
      typeof previous.base_sha === "string" &&
      isGitObjectId(previous.base_sha) &&
      typeof previous.repository_identity === "string" &&
      /^sha256:[0-9a-f]{64}$/u.test(previous.repository_identity) &&
      identityKeys.every((key) => previous[key] === current[key]) &&
      Object.keys(previous).every((key) => key === "source" || identityKeys.includes(key)) &&
      Object.keys(current).every((key) => identityKeys.includes(key))
    ) {
      // Verification omits creation provenance while preserving the exact execution identity.
      Reflect.deleteProperty(previous, "source");
    }
  }
  if (
    isRecord(previousExtensions) &&
    isRecord(nextExtensions) &&
    previousExtensions.task_execution_context == null
  ) {
    const baseline = previousExtensions.workflow_route_baseline;
    const context = nextExtensions.task_execution_context;
    if (
      isRecord(baseline) &&
      isRecord(context) &&
      context.schema_version === 1 &&
      typeof baseline.start_head_sha === "string" &&
      context.base_sha === baseline.start_head_sha &&
      context.repository_identity == null &&
      typeof context.base_ref === "string" &&
      Object.keys(context).every((key) =>
        ["schema_version", "base_ref", "base_sha", "repository_identity"].includes(key),
      )
    ) {
      // Verification can materialize an already-frozen execution boundary after the commit.
      previousExtensions.task_execution_context = context;
    }
  }
  if (
    isRecord(previousExtensions) &&
    isRecord(nextExtensions) &&
    previousExtensions.task_execution_context == null &&
    previousExtensions.workflow_route_baseline == null
  ) {
    const context = nextExtensions.task_execution_context;
    if (
      isRecord(context) &&
      context.schema_version === 1 &&
      typeof context.base_ref === "string" &&
      context.base_ref.trim().length > 0 &&
      typeof context.base_sha === "string" &&
      isGitObjectId(context.base_sha) &&
      context.repository_identity == null &&
      Object.keys(context).every((key) =>
        ["schema_version", "base_ref", "base_sha", "repository_identity"].includes(key),
      )
    ) {
      // Legacy approved tasks can first materialize their frozen execution identity on recovery.
      previousExtensions.task_execution_context = context;
    }
  }
  const previous = recoveryComparableReadme(
    renderTaskReadme(original.frontmatter, original.body),
    commit,
    false,
  );
  const current = recoveryComparableReadme(after, commit, true);
  return (
    previous !== null && current !== null && taskReadmesHaveOnlyLifecycleDrift(previous, current)
  );
}
