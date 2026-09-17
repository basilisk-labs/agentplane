import type { TaskData, TaskSummary } from "../../backends/task-backend.js";
import { resolveNativeTaskIdentity } from "../shared/native-task-identity.js";

export type TaskExecutionLifecycleSummary = {
  identity_kind: "native" | "legacy_unmigrated";
  plan_revision?: number;
  plan_digest?: string;
  policy_digest?: string;
  capability_digest?: string;
  checks_digest?: string;
  workflow_mode?: string;
  inspect_command: string;
  migrate_command?: string;
};

type TaskExecutionLifecycleResolver = (
  task: TaskData | TaskSummary,
) => TaskExecutionLifecycleSummary;

export function resolveTaskExecutionLifecycleSummary(
  task: TaskData | TaskSummary,
): TaskExecutionLifecycleSummary {
  const nativeIdentity = resolveNativeTaskIdentity(task as TaskData);
  if (!nativeIdentity) {
    return {
      identity_kind: "legacy_unmigrated",
      inspect_command: `agentplane task status ${task.id} --route`,
      migrate_command: `agentplane task kernel-migrate ${task.id}`,
    };
  }
  return {
    identity_kind: "native",
    plan_revision: nativeIdentity.plan.revision,
    plan_digest: nativeIdentity.plan.digest,
    policy_digest: nativeIdentity.policy.digest,
    capability_digest: nativeIdentity.capability.digest,
    checks_digest: nativeIdentity.checks.digest,
    workflow_mode: task.execution_contract?.selected_mode,
    inspect_command: `agentplane task brief ${task.id}`,
  };
}

export function createTaskExecutionLifecycleResolver(): TaskExecutionLifecycleResolver {
  return resolveTaskExecutionLifecycleSummary;
}

export function formatTaskExecutionListExtra(summary: TaskExecutionLifecycleSummary): string {
  if (summary.identity_kind === "native") {
    return `identity=native plan_revision=${summary.plan_revision ?? "unknown"}`;
  }
  return "identity=legacy_unmigrated";
}
