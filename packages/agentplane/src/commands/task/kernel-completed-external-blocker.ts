import { withTaskReadmeFrontmatterDefaults } from "@agentplaneorg/core/schemas";
import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import { createHash } from "node:crypto";
import path from "node:path";
import { runProcess } from "@agentplaneorg/core/process";
import { canonicalizeJson, parseTaskReadme } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { TASK_SCOPE_EXTENSION_REQUEST_KEY } from "../shared/task-scope-extension-request.js";
import { readCompletedReworkRecord } from "./kernel-completed-external-rework.js";
import {
  readExternalAgentWorkOrder,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";

const withoutReadme = (entries: Record<string, string>) =>
  Object.fromEntries(Object.entries(entries).filter(([name]) => name !== "README.md"));

function stable(value: unknown): string {
  return JSON.stringify(canonicalizeJson(value));
}

function fail(reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Canonical blocker recovery does not match the issued task evidence (${reason}).`,
  });
}

/** Prove only the one native comment/request projection changed since issuance. */
export async function canonicalBlockerProjection(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  body: string;
  pending: unknown;
  persist?: boolean;
}): Promise<boolean | null> {
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
  const order = await readExternalAgentWorkOrder(opts.exchange.work_order_ref);
  if (!(await readCompletedReworkRecord({ command: opts.command, task, work_order: order })))
    return null;
  if (opts.exchange.purpose !== "implementation_rework" || !opts.exchange.baseline.head)
    fail("purpose");
  // Consuming a BLOCKED outcome grants no execution authority. A corrected runtime
  // may derive different obligations from the same frozen inputs. Require a clean
  // issued repository and prove its exact task authority instead of reinterpreting it.
  if (opts.exchange.baseline.changed_paths.length > 0) fail("dirty-issued-baseline");
  const file = `.agentplane/tasks/${task.id}/README.md`;
  const baseline = await runProcess({
    command: "git",
    args: ["show", `${opts.exchange.baseline.head}:${file}`],
    cwd: opts.exchange.checkout,
    reject: false,
  });
  const hash = createHash("sha256").update(baseline.stdout).digest("hex");
  if (
    baseline.exitCode !== 0 ||
    opts.exchange.baseline.task_artifacts?.["README.md"]?.split(":").at(-1) !== hash
  )
    fail("baseline-readme");
  const artifacts = await captureExternalTaskArtifacts(opts.exchange.checkout, task.id);

  if (
    stable(withoutReadme(artifacts)) !==
    stable(withoutReadme(opts.exchange.baseline.task_artifacts ?? {}))
  )
    fail("protected-artifacts");
  const before = parseTaskReadme(baseline.stdout);
  before.frontmatter = withTaskReadmeFrontmatterDefaults(before.frontmatter);
  const after = parseTaskReadme(
    await readStableRegularTextNoFollow(
      path.join(opts.exchange.checkout, file),
      "canonical blocker task",
    ),
  );
  after.frontmatter = withTaskReadmeFrontmatterDefaults(after.frontmatter);
  const comment = { author: "SUPERVISOR", body: opts.body };
  const comments: unknown[] = Array.isArray(before.frontmatter.comments)
    ? before.frontmatter.comments
    : [];
  const recorded = stable(after.frontmatter.comments ?? []) === stable([...comments, comment]);
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
        stable(extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY]) !== stable(opts.pending)
      )
        fail("scope-request");
      if (original && Object.hasOwn(original, TASK_SCOPE_EXTENSION_REQUEST_KEY))
        extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY] = original[TASK_SCOPE_EXTENSION_REQUEST_KEY];
      else delete extensions[TASK_SCOPE_EXTENSION_REQUEST_KEY];
    }
  }
  if (stable(before) !== stable(after)) fail("task-projection");
  if (opts.persist && !recorded) {
    await applyTaskMutation({
      ctx: opts.command,
      taskId: task.id,
      allowCanonicalProjection: true,
      writeOptions: { expectedRevision: task.revision },
      build: (current) => ({
        nextTask: {
          ...current,
          comments: [...(current.comments ?? []), comment],
          ...(opts.pending
            ? {
                extensions: {
                  ...current.extensions,
                  [TASK_SCOPE_EXTENSION_REQUEST_KEY]: opts.pending,
                },
              }
            : {}),
        },
      }),
    });
  }
  return recorded;
}
