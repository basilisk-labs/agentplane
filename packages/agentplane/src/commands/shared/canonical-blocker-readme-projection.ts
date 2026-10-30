import { withTaskReadmeFrontmatterDefaults } from "@agentplaneorg/core/schemas";
import { canonicalizeJson, parseTaskReadme } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { TASK_SCOPE_EXTENSION_REQUEST_KEY } from "./task-scope-extension-request-state.js";

export function canonicalBlockerProjectionValue(value: unknown): string {
  return JSON.stringify(canonicalizeJson(value));
}

function fail(reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Canonical blocker recovery does not match the issued task evidence (${reason}).`,
  });
}

export function canonicalBlockerReadmeProjection(opts: {
  baseline: string;
  current: string;
  body: string;
  pending: unknown;
}): boolean {
  const before = parseTaskReadme(opts.baseline);
  before.frontmatter = withTaskReadmeFrontmatterDefaults(before.frontmatter);
  const after = parseTaskReadme(opts.current);
  after.frontmatter = withTaskReadmeFrontmatterDefaults(after.frontmatter);
  const comment = { author: "SUPERVISOR", body: opts.body };
  const comments: unknown[] = Array.isArray(before.frontmatter.comments)
    ? before.frontmatter.comments
    : [];
  const recorded =
    canonicalBlockerProjectionValue(after.frontmatter.comments ?? []) ===
    canonicalBlockerProjectionValue([...comments, comment]);
  if (recorded) {
    if (after.frontmatter.revision !== Number(before.frontmatter.revision) + 1)
      fail("projection-revision");
    after.frontmatter.revision = before.frontmatter.revision;
    if (Object.hasOwn(before.frontmatter, "comments"))
      after.frontmatter.comments = before.frontmatter.comments;
    else delete after.frontmatter.comments;
    if (opts.pending) {
      const extensions = after.frontmatter.extensions as Record<string, unknown> | undefined;
      const original = before.frontmatter.extensions as Record<string, unknown> | undefined;
      if (
        !extensions ||
        canonicalBlockerProjectionValue(extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY]) !==
          canonicalBlockerProjectionValue(opts.pending)
      )
        fail("scope-request");
      if (original && Object.hasOwn(original, TASK_SCOPE_EXTENSION_REQUEST_KEY))
        extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY] = original[TASK_SCOPE_EXTENSION_REQUEST_KEY];
      else delete extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY];
    }
    // The task writer updates these fields when it appends the supervisor comment.
    if (
      after.frontmatter.doc_updated_by !== before.frontmatter.doc_updated_by &&
      after.frontmatter.doc_updated_by !== "SUPERVISOR"
    )
      fail("projection-writer");
    const updatedAt = after.frontmatter.doc_updated_at;
    if (typeof updatedAt !== "string" || !Number.isFinite(Date.parse(updatedAt)))
      fail("projection-timestamp");
    after.frontmatter.doc_updated_at = before.frontmatter.doc_updated_at;
    after.frontmatter.doc_updated_by = before.frontmatter.doc_updated_by;
    // The task schema omits legacy default cache counters on write. Restore only
    // those exact defaults for comparison; all non-default usage remains guarded.
    const priorUsage = before.frontmatter.token_usage as Record<string, unknown> | undefined;
    const currentUsage = after.frontmatter.token_usage as Record<string, unknown> | undefined;
    if (priorUsage && currentUsage) {
      if (
        priorUsage.cached_input_observed_agent_runs === 0 &&
        !Object.hasOwn(currentUsage, "cached_input_observed_agent_runs")
      )
        currentUsage.cached_input_observed_agent_runs = 0;
      if (
        priorUsage.cached_input_tokens === null &&
        !Object.hasOwn(currentUsage, "cached_input_tokens")
      )
        currentUsage.cached_input_tokens = null;
    }
  }
  if (canonicalBlockerProjectionValue(before) !== canonicalBlockerProjectionValue(after))
    fail("task-projection");
  return recorded;
}
