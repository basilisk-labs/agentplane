import path from "node:path";
import { runProcess } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import {
  mergeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  taskCentricDigest,
} from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { taskDataToFrontmatter, type CommandContext } from "../shared/task-backend.js";
import type { PreparedTaskMutationObserver } from "../shared/task-mutation.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { DirectTaskVerificationResult } from "./direct-task-verification.js";
import {
  readExternalAgentExchange,
  writeExternalAgentExchange,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import { syncRecordedVerificationArtifacts } from "./verify-record-execute.js";

export type ExternalImplementationVerificationCheckpoint = {
  stage: "prepared" | "completed";
  digest: string;
  work_order_id: string;
  result_digest: string;
  head: string;
  branch: string;
  base: string;
  authority: string;
  task: TaskData;
  artifacts: Record<string, string>;
  verification: DirectTaskVerificationResult;
};

function stableAuthority(decision: TaskRouteDecision): string {
  const fingerprint = decision.workflowStep.preconditionFingerprint;
  return taskCentricDigest({
    task_id: fingerprint.task_id,
    worktree: fingerprint.worktree,
    provider: decision.prFlow?.providerObservation ?? null,
    components: Object.fromEntries(
      Object.entries(fingerprint.components).filter(
        ([key]) => !["task", "git", "authority", "provider"].includes(key),
      ),
    ),
  });
}

async function observe(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}) {
  const { checkout, task_id: taskId } = opts.exchange;
  const conflict = resolveConflictReworkSemanticInput({
    task_id: taskId,
    checkout,
    head: opts.work_order.state_fingerprint.git_head,
    writable_roots: opts.work_order.authority.writable_roots,
    required_inputs: opts.work_order.required_inputs,
  });
  if (!conflict) throw new Error("Verification checkpoint requires bound conflict context.");
  const git = (args: string[]) =>
    runProcess({ command: "git", args, cwd: checkout, env: gitProofEnv() });
  const [head, branch, base, status, decision] = await Promise.all([
    git(["rev-parse", "HEAD"]),
    git(["symbolic-ref", "--short", "HEAD"]),
    git(["rev-parse", "--verify", "--end-of-options", conflict.provider.base]),
    git(["status", "--porcelain", "-z", "--untracked-files=all"]),
    refreshExternalAgentRoute({ cwd: checkout, task_id: taskId, include_remote: true }),
  ]);
  if (
    branch.stdout.trim() !== conflict.task_worktree.branch ||
    base.stdout.trim() !== conflict.local.base_head_sha
  )
    throw new Error("Conflict verification checkpoint branch or base changed.");
  const prefix = `${opts.command.config.paths.workflow_dir}/${taskId}/`;
  const read = (file: string) =>
    readContainedStableTextNoFollow({
      repository_root: checkout,
      file_path: path.join(checkout, file),
      max_bytes: 16 * 1024 * 1024,
      label: "external implementation checkpoint",
    });
  const artifacts: Record<string, string> = {};
  for (const entry of status.stdout.split("\0").filter(Boolean)) {
    const file = entry.slice(3);
    if (!file.startsWith(prefix) || /[RCD]/u.test(entry.slice(0, 2)))
      throw new Error(
        `Conflict verification checkpoint found foreign workspace changes: ${JSON.stringify(entry)}.`,
      );
    const content = await read(file);
    if (!entry.startsWith(" ") && !entry.startsWith("?")) {
      const staged = await git(["show", `:${file}`]);
      if (staged.stdout !== content)
        throw new Error("Conflict verification checkpoint found foreign staged changes.");
    }
    artifacts[file] = taskCentricDigest(content);
  }
  const readmePath = `${prefix}README.md`;
  // Include the projection even if a prepared write is the first README change.
  artifacts[readmePath] = taskCentricDigest(await read(readmePath));
  return {
    head: head.stdout.trim(),
    branch: branch.stdout.trim(),
    base: base.stdout.trim(),
    authority: stableAuthority(decision),
    artifacts,
    readmePath,
    read,
  };
}

/** Persist the actual verification owner's prepared afterimage before its Task write. */
export async function prepareExternalVerificationCheckpoint(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  mutation: Parameters<PreparedTaskMutationObserver>[0];
  expected_task: TaskData;
  verification: DirectTaskVerificationResult;
}): Promise<void> {
  if (!opts.exchange.result_digest)
    throw new Error("Verification checkpoint has no accepted result.");
  if (taskCentricDigest(opts.mutation.current) !== taskCentricDigest(opts.expected_task))
    throw new Error("Verification Task changed before its prepared checkpoint.");
  const observed = await observe(opts);
  const { next: task } = opts.mutation;
  const readme = parseTaskReadme(await observed.read(observed.readmePath));
  const rendered = renderTaskReadme(
    { ...readme.frontmatter, ...taskDataToFrontmatter(task) },
    mergeTaskDoc(readme.body, task.doc ?? ""),
  );
  observed.artifacts[observed.readmePath] = taskCentricDigest(
    rendered.endsWith("\n") ? rendered : `${rendered}\n`,
  );
  const checkpoint = {
    stage: "prepared" as const,
    work_order_id: opts.work_order.work_order_id,
    result_digest: opts.exchange.result_digest,
    head: observed.head,
    branch: observed.branch,
    base: observed.base,
    authority: observed.authority,
    task,
    artifacts: observed.artifacts,
    verification: opts.verification,
  };
  await writeExternalAgentExchange(
    path.join(path.dirname(opts.exchange.work_order_ref), "exchange.json"),
    {
      ...opts.exchange,
      verification_checkpoint: { ...checkpoint, digest: taskCentricDigest(checkpoint) },
    },
  );
}

/** Complete the observed verification owner's local PR projection, without changing Task identity. */
export async function completeExternalVerificationCheckpoint(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): Promise<void> {
  const file = path.join(path.dirname(opts.exchange.work_order_ref), "exchange.json");
  const exchange = await readExternalAgentExchange(file);
  const checkpoint = exchange?.verification_checkpoint;
  if (!exchange || !checkpoint) throw new Error("Verification owner lost its prepared checkpoint.");
  const { digest, ...payload } = checkpoint;
  if (
    taskCentricDigest(payload) !== digest ||
    checkpoint.work_order_id !== opts.work_order.work_order_id ||
    checkpoint.result_digest !== opts.exchange.result_digest ||
    !["prepared", "completed"].includes(checkpoint.stage)
  )
    throw new Error("Conflict verification checkpoint identity changed.");
  const observed = await observe(opts);
  const task = await opts.command.taskBackend.getTask(opts.exchange.task_id);
  const prefix = `${opts.command.config.paths.workflow_dir}/${opts.exchange.task_id}/pr/`;
  const generated = new Set(
    ["github-body.md", "github-title.txt", "meta.json", "review.md"].map((file) => prefix + file),
  );
  const artifactKeys = Object.keys({ ...observed.artifacts, ...checkpoint.artifacts });
  if (
    observed.head !== checkpoint.head ||
    observed.authority !== checkpoint.authority ||
    taskCentricDigest(task) !== taskCentricDigest(checkpoint.task) ||
    artifactKeys.some(
      (key) => !generated.has(key) && observed.artifacts[key] !== checkpoint.artifacts[key],
    )
  )
    throw new Error("Conflict verification owner changed its prepared postcondition.");
  const completed = { ...payload, stage: "completed" as const, artifacts: observed.artifacts };
  await writeExternalAgentExchange(file, {
    ...exchange,
    verification_checkpoint: { ...completed, digest: taskCentricDigest(completed) },
  });
}

/** A proven completed Task write resumes after verification, not from the merge owner. */
export async function recoverExternalVerificationCheckpoint(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): Promise<ExternalImplementationVerificationCheckpoint | null> {
  const checkpoint = opts.exchange.verification_checkpoint;
  if (!checkpoint) return null;
  const { digest, ...payload } = checkpoint;
  if (
    taskCentricDigest(payload) !== digest ||
    checkpoint.work_order_id !== opts.work_order.work_order_id ||
    checkpoint.result_digest !== opts.exchange.result_digest ||
    !["prepared", "completed"].includes(checkpoint.stage)
  )
    throw new Error("Conflict verification checkpoint identity changed.");
  const observed = await observe(opts);
  const task = await opts.command.taskBackend.getTask(opts.exchange.task_id);
  if (
    observed.head !== checkpoint.head ||
    observed.branch !== checkpoint.branch ||
    observed.base !== checkpoint.base ||
    observed.authority !== checkpoint.authority ||
    taskCentricDigest(observed.artifacts) !== taskCentricDigest(checkpoint.artifacts) ||
    taskCentricDigest(task) !== taskCentricDigest(checkpoint.task)
  )
    throw new Error(
      "Conflict verification checkpoint postcondition changed: " +
        JSON.stringify({
          head: observed.head !== checkpoint.head,
          branch: observed.branch !== checkpoint.branch,
          base: observed.base !== checkpoint.base,
          authority: observed.authority !== checkpoint.authority,
          artifacts: Object.keys({ ...observed.artifacts, ...checkpoint.artifacts }).filter(
            (key) => observed.artifacts[key] !== checkpoint.artifacts[key],
          ),
          task: Object.keys({ ...task, ...checkpoint.task }).filter(
            (key) =>
              taskCentricDigest(Reflect.get(task ?? {}, key) ?? null) !==
              taskCentricDigest(Reflect.get(checkpoint.task, key) ?? null),
          ),
        }),
    );
  if (checkpoint.stage === "prepared") {
    const at = checkpoint.task.verification?.updated_at;
    if (!at || new Date(at).toISOString() !== at)
      throw new Error("Prepared verification has no canonical persisted timestamp.");
    await syncRecordedVerificationArtifacts({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      by: "SUPERVISOR",
      at,
      state: checkpoint.verification.status === "passed" ? "ok" : "needs_rework",
    });
    await completeExternalVerificationCheckpoint(opts);
    const exchange = await readExternalAgentExchange(
      path.join(path.dirname(opts.exchange.work_order_ref), "exchange.json"),
    );
    if (exchange?.verification_checkpoint?.stage !== "completed")
      throw new Error("Prepared verification did not complete its artifact projection.");
    return await recoverExternalVerificationCheckpoint({ ...opts, exchange });
  }
  return checkpoint;
}
