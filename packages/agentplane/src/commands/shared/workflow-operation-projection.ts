import { WORKFLOW_OPERATION_ARGV_PREFIX } from "./workflow-operation-prefix.js";
import type { WorkflowOperation } from "./workflow-step.js";

const SHELL_SINGLE_QUOTE_ESCAPE = `'"'"'`;

function includeTaskArgv(taskIds: readonly string[]): string[] {
  return taskIds.flatMap((taskId) => ["--include-task", taskId]);
}

function operationArgv(operation: WorkflowOperation): string[] {
  switch (operation.id) {
    case "batch.collect_included":
    case "batch.follow_primary": {
      return ["agentplane", "task", "brief", operation.params.taskId];
    }
    case "batch.reconcile_included": {
      return ["agentplane", "release", "tasks", "reconcile", "--task-id", operation.params.taskId];
    }
    case "integration.adopt_legacy_protected_conflict": {
      return [
        "agentplane",
        "integrate",
        "queue",
        "adopt-legacy-protected-conflict",
        operation.params.taskId,
        "--expect-adoption-token",
        operation.params.expectedAdoptionToken,
      ];
    }
    case "integration.enqueue": {
      return [
        "agentplane",
        "integrate",
        "queue",
        "enqueue",
        operation.params.taskId,
        "--branch",
        operation.params.branch,
      ];
    }
    case "pr.artifacts.update":
    case "pr.sync_or_verify": {
      return [
        "agentplane",
        "pr",
        "update",
        operation.params.taskId,
        ...includeTaskArgv(operation.params.includeTaskIds),
      ];
    }
    case "pr.head.publish":
    case "pr.open": {
      return [
        "agentplane",
        "pr",
        "open",
        operation.params.taskId,
        "--author",
        operation.params.author,
        ...includeTaskArgv(operation.params.includeTaskIds),
      ];
    }
    case "provider.pr.refresh": {
      return ["agentplane", "pr", "flow", "status", operation.params.taskId];
    }
    case "route.remote.refresh": {
      return [
        "agentplane",
        "task",
        "next-action",
        operation.params.taskId,
        "--remote",
        "--explain",
      ];
    }
    case "runner.follow": {
      const params = operation.params;
      if (params.mode === "reclaim") {
        return [
          "agentplane",
          "task",
          "reclaim",
          params.taskId,
          "--author",
          params.author,
          "--reason",
          params.reason,
        ];
      }
      if (params.mode === "status") {
        return [
          "agentplane",
          "task",
          "run",
          "status",
          params.taskId,
          ...(params.runId ? ["--run-id", params.runId] : []),
        ];
      }
      if (params.mode === "verify") {
        return ["agentplane", "task", "verify-show", params.taskId];
      }
      return ["agentplane", "task", "run", params.taskId];
    }
    case "task.artifacts.commit": {
      return ["agentplane", "commit", operation.params.taskId, "--close", "--unstage-others"];
    }
    case "task.hosted_close.open": {
      return ["agentplane", "task", "hosted-close-pr", operation.params.taskId];
    }
    case "task.hosted_close.finalize":
    case "task.worktree.cleanup": {
      return [
        "agentplane",
        "cleanup",
        "merged",
        "--task-id",
        operation.params.taskId,
        "--finalize",
        "--base",
        operation.params.base,
      ];
    }
    case "task.pre_merge_close": {
      return [
        "agentplane",
        "finish",
        operation.params.taskId,
        "--author",
        operation.params.author,
        "--body",
        operation.params.body,
        "--result",
        operation.params.result,
        "--commit",
        operation.params.commit,
        "--pre-merge-closure",
        ...(operation.params.force ? ["--force", "--yes"] : []),
      ];
    }
    case "task.branch.start":
    case "task.start": {
      return [
        "agentplane",
        "task",
        "start-ready",
        operation.params.taskId,
        "--author",
        operation.params.author,
        "--body",
        operation.params.body,
      ];
    }
    case "task.verify.show": {
      return ["agentplane", "task", "verify-show", operation.params.taskId];
    }
    case "worktree.prepare": {
      return [
        "agentplane",
        "work",
        "start",
        operation.params.taskId,
        "--agent",
        operation.params.agent,
        "--slug",
        operation.params.slug,
        "--worktree",
      ];
    }
  }
}

export function projectWorkflowOperationArgv(operation: WorkflowOperation): string[] {
  const argv = operationArgv(operation);
  const prefix = WORKFLOW_OPERATION_ARGV_PREFIX[operation.id];
  if (prefix.some((value, index) => argv[index] !== value)) {
    throw new Error(
      `Workflow operation ${operation.id} projection does not match its registered prefix.`,
    );
  }
  return argv;
}

function quoteCliArg(value: string): string {
  if (/^[A-Za-z0-9_./:@+=,-]+$/u.test(value)) return value;
  return `'${value.replaceAll("'", SHELL_SINGLE_QUOTE_ESCAPE)}'`;
}

export function renderCliArgv(argv: readonly string[]): string {
  return argv.map((value) => quoteCliArg(value)).join(" ");
}

export function projectWorkflowOperationCommand(operation: WorkflowOperation): string {
  return renderCliArgv(projectWorkflowOperationArgv(operation));
}
