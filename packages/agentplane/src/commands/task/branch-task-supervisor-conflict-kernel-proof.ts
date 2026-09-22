import path from "node:path";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { taskCentricDigest, type taskKernel } from "@agentplaneorg/core/tasks";

import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { ExecutedTaskRunnerExecution } from "../../runner/usecases/task-run-execution.js";
import {
  assertConflictResolutionCommit,
  prepareConflictResolutionTree,
  resolveConflictResolutionSnapshot,
} from "../pr/conflict-rework-merge.js";
import { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  managedConflictEvidenceCommitMessage,
  type ManagedConflictApplicationContext,
} from "./branch-task-supervisor-conflict-contract.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";

export type ManagedConflictKernelApplication = {
  implementation_commit: string;
};

function proofTrailers(text: string): string[] {
  return text.split("\n").filter((line) => /^AgentPlane-(?:Result|Postcondition):/u.test(line));
}

export async function proveManagedConflictKernelApplication(opts: {
  command: CommandContext;
  checkout: string;
  task_id: string;
  decision: TaskRouteDecision;
  context: ManagedConflictApplicationContext;
  executed: ExecutedTaskRunnerExecution;
}): Promise<ManagedConflictKernelApplication | null> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  if (!task) throw new Error("Managed canonical conflict Task disappeared.");
  const repositoryIdentity = await resolveLogicalRepositoryIdentity({
    git_root: opts.command.resolvedProject.gitRoot,
    task,
    create_if_missing: false,
  });
  const read = readKernelRecord(task, repositoryIdentity as taskKernel.Sha256Digest);
  if (read.kind !== "canonical") return null;
  const order = opts.executed.bundle.work_order;
  if (!order) throw new Error("Managed canonical conflict proof has no WorkOrder.");
  const conflict = resolveConflictReworkSemanticInput({
    task_id: order.task.id,
    checkout: opts.checkout,
    head: order.state_fingerprint.git_head,
    writable_roots: order.authority.writable_roots,
    required_inputs: order.required_inputs,
  });
  if (!conflict) throw new Error("Managed canonical conflict proof has no bound context.");
  const git = async (args: string[]) =>
    await runProcess({ command: "git", args, cwd: opts.checkout, env: gitProofEnv() });
  const headResult = await git(["rev-parse", "HEAD"]);
  const head = headResult.stdout.trim();
  const messageResult = await git(["show", "-s", "--format=%B", head]);
  const message = messageResult.stdout;
  const expectedMessage = managedConflictEvidenceCommitMessage({
    context: opts.context,
    result: opts.executed.result,
    decision: opts.decision,
  });
  if (message.split("\n")[0] !== expectedMessage.split("\n")[0]) return null;
  const parentsResult = await git(["show", "-s", "--format=%P", head]);
  const parents = parentsResult.stdout.trim().split(" ");
  if (
    parents.length !== 1 ||
    taskCentricDigest(proofTrailers(message)) !== taskCentricDigest(proofTrailers(expectedMessage))
  ) {
    throw new Error("Managed canonical conflict evidence differs from its exact result.");
  }
  const mergeHead = parents[0]!;
  const resultDigest = taskCentricDigest({
    run_id: opts.context.run_id,
    work_order: order.work_order_id,
    result: opts.executed.result,
  });
  const snapshot = await resolveConflictResolutionSnapshot({
    cwd: opts.checkout,
    task_id: opts.task_id,
    baseline: opts.context.execution_base_commit!,
    head: mergeHead,
    base: conflict.local.base_head_sha,
    result_digest: resultDigest,
  });
  const prefix = `${opts.command.config.paths.workflow_dir.replaceAll("\\", "/")}/${opts.task_id}/`;
  const roots = order.authority.writable_roots.map(
    (root) => path.relative(opts.checkout, root).replaceAll(path.sep, "/") || ".",
  );
  const prepared = await prepareConflictResolutionTree({
    cwd: opts.checkout,
    task_head: opts.context.execution_base_commit!,
    resolution_snapshot: snapshot,
    base: conflict.local.base_head_sha,
    merge_base: conflict.local.merge_base_sha,
    allowed_path: (file) =>
      file.startsWith(prefix) ||
      roots.some((root) => root === "." || file === root || file.startsWith(`${root}/`)),
  });
  await assertConflictResolutionCommit({
    cwd: opts.checkout,
    task_id: opts.task_id,
    head: mergeHead,
    resolution_snapshot: snapshot,
    base: conflict.local.base_head_sha,
    tree: prepared.tree,
    semantic_result_digest: resultDigest,
  });
  const evidencePathsResult = await git(["diff", "--name-only", "-z", mergeHead, head]);
  const evidencePaths = evidencePathsResult.stdout.split("\0").filter(Boolean);
  if (evidencePaths.length === 0 || evidencePaths.some((file) => !file.startsWith(prefix))) {
    throw new Error("Managed canonical conflict evidence contains foreign changes.");
  }
  const statusResult = await git(["status", "--porcelain", "-z", "--untracked-files=all"]);
  if (statusResult.stdout !== "") {
    throw new Error("Managed canonical conflict recovery found foreign workspace changes.");
  }
  const runtime = await createKernelRuntime({
    command: opts.command,
    task_id: opts.task_id,
    transport: "managed",
    operation_id: `recover-managed-provider-conflict:${opts.context.result_digest}`,
  });
  const kernelContext = await runtime.native.readContext(opts.task_id);
  const authority = read.record.aggregate.authority_lineage?.at(-1)?.authority;
  const validation = read.record.aggregate.final_validation;
  if (
    authority?.repository_fingerprint !== kernelContext.repository_fingerprint ||
    validation?.status !== "PASSED" ||
    validation?.identity.implementation_identity !== kernelContext.repository_fingerprint
  ) {
    throw new Error("Managed canonical conflict Kernel evidence is stale.");
  }
  return { implementation_commit: mergeHead };
}
