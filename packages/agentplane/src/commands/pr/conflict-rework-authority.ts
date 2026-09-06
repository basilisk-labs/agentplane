import path from "node:path";
import type { AgentWorkOrderV2, StateFingerprintComponent } from "@agentplaneorg/core/schemas";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { observeWorkflowPolicy } from "../shared/workflow-step-fingerprint.js";
import { workflowFingerprintPolicyPaths } from "../shared/workflow-step-fingerprint-policy-paths.js";
import { observeWorkflowPolicyScope } from "../shared/workflow-step-policy-scope.js";
import { resolveConflictReworkSemanticInput } from "./conflict-rework-semantic-input.js";

export function conflictApplicationAuthority(decision: TaskRouteDecision) {
  const fingerprint = decision.workflowStep.preconditionFingerprint;
  return {
    task_id: fingerprint.task_id,
    task_revision: fingerprint.task_revision,
    task: fingerprint.components.task,
    backend_projection: fingerprint.components.backend_projection,
    policy: fingerprint.components.policy,
    blueprint: fingerprint.components.blueprint,
    knowledge: fingerprint.components.knowledge,
    provider: decision.prFlow?.providerObservation ?? null,
  };
}

export async function conflictRecoveryAuthority(opts: {
  command: CommandContext;
  checkout: string;
  decision: TaskRouteDecision;
  order: AgentWorkOrderV2;
  changed_paths: string[];
  context: {
    accepted_task: TaskData;
    accepted_authority: ReturnType<typeof conflictApplicationAuthority>;
  };
}) {
  const current = conflictApplicationAuthority(opts.decision);
  const expected = opts.context.accepted_authority.policy;
  if (current.policy.digest !== expected.digest) {
    await assertConflictRecoveryPolicy({ ...opts, task: opts.context.accepted_task, expected });
    current.policy = expected;
  }
  return current;
}

/** Reobserve the original policy scope; the Git owner separately proves every merge-tree change. */
async function assertConflictRecoveryPolicy(opts: {
  command: CommandContext;
  checkout: string;
  task: TaskData;
  order: AgentWorkOrderV2;
  changed_paths: string[];
  expected: StateFingerprintComponent;
}): Promise<void> {
  const { command, checkout, order } = opts;
  const conflict = resolveConflictReworkSemanticInput({
    task_id: order.task.id,
    checkout,
    head: order.state_fingerprint.git_head,
    writable_roots: order.authority.writable_roots,
    required_inputs: order.required_inputs,
  });
  if (!conflict) throw new Error("Conflict policy proof requires its bound context.");
  const scopeAt = (branch: string) =>
    observeWorkflowPolicyScope({
      repositoryRoot: checkout,
      excludedRoots: [path.join(command.config.paths.workflow_dir, order.task.id)],
      state: {
        task: opts.task,
        workflowMode: "branch_pr",
        prFlow: null,
        resume: { pr_branch: branch, base_branch: conflict.provider.base, head_sha: branch },
        taskWorktree: {
          state: "dirty",
          branch,
          worktreePath: checkout,
          changedPaths: opts.changed_paths,
        },
      },
    });
  const original = await scopeAt(conflict.local.branch_head_sha);
  const current = await scopeAt(conflict.task_worktree.branch);
  if (original.state !== "present" || current.state !== "present")
    throw new Error("Conflict policy scope could not be reobserved.");
  const modules = order.required_inputs
    .filter((input) => input.kind === "policy_module")
    .flatMap((input) => (input.path ? [input.path] : []));
  const paths = (changed: readonly string[]) =>
    workflowFingerprintPolicyPaths("branch_pr", modules, changed);
  const policyPaths = paths(original.changedPaths);
  if (taskCentricDigest(policyPaths) !== taskCentricDigest(paths(current.changedPaths)))
    throw new Error("Conflict merge changed the selected policy modules.");
  const observed = await observeWorkflowPolicy({
    ctx: command,
    repositoryRoot: checkout,
    policyPaths,
    scope: original,
  });
  if (taskCentricDigest(observed) !== opts.expected.digest)
    throw new Error("Managed conflict recovery non-Task authority changed: policy proof differs.");
}
