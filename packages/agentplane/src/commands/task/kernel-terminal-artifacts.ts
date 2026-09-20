import { parseTaskIdFromBranch, parseTaskIdFromCloseBranch } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";

import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskFromContext } from "../shared/task-backend.js";
import {
  readDirectRepositoryStatus,
  type DirectRepositoryStatus,
} from "./direct-task-finalization.js";
import { pathFromStatusLine } from "./external-agent-implementation-finalization.js";
import { materializeBranchPrCloseTail } from "./finish-close.js";

async function currentBranch(command: CommandContext): Promise<string> {
  const result = await runProcess({
    command: "git",
    args: ["branch", "--show-current"],
    cwd: command.resolvedProject.gitRoot,
    reject: false,
  });
  const branch = result.stdout.trim();
  if (result.exitCode !== 0 || !branch) throw new Error("Canonical branch is unavailable");
  return branch;
}

function taskStatusLines(
  command: CommandContext,
  taskId: string,
  status: DirectRepositoryStatus,
): string[] {
  const prefix = `${command.config.paths.workflow_dir}/${taskId}/`;
  return status.lines.filter((line) => {
    const candidate = pathFromStatusLine(line);
    return candidate === prefix.slice(0, -1) || candidate?.startsWith(prefix) === true;
  });
}

/** Persist terminal Kernel state without staging an unrelated direct-workflow baseline. */
export async function commitCanonicalTerminalTaskArtifacts(
  command: CommandContext,
  taskId: string,
): Promise<boolean> {
  command.git.invalidateStatus();
  const before = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
  if (!before) throw new Error("Canonical terminal repository status is unavailable");
  if (taskStatusLines(command, taskId, before).length === 0) return false;

  const [task, branch] = await Promise.all([
    loadTaskFromContext({ ctx: command, taskId }),
    currentBranch(command),
  ]);
  const onTaskBranch = parseTaskIdFromBranch(command.config.branch.task_prefix, branch) === taskId;
  const onCloseBranch =
    parseTaskIdFromCloseBranch(command.config.branch.task_close_prefix, branch) === taskId;
  if (task.execution_route?.repository_mode === "branch_pr" && !onTaskBranch && !onCloseBranch) {
    const closeBranch = await materializeBranchPrCloseTail({
      ctx: command,
      cwd: command.resolvedProject.gitRoot,
      taskId,
      quiet: true,
      closeUnstageOthers: true,
    });
    if (!closeBranch) {
      throw new Error(
        "Canonical terminal task artifacts could not be materialized on a close branch",
      );
    }
    command.git.invalidateStatus();
    const after = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
    if (!after || taskStatusLines(command, taskId, after).length > 0) {
      throw new Error("Canonical terminal task artifacts remain dirty after close-branch commit");
    }
    return true;
  }

  const exitCode = await cmdCommit({
    ctx: command,
    cwd: command.resolvedProject.gitRoot,
    taskId,
    message: `✅ ${taskId.split("-").at(-1)} task: persist canonical completion`,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) throw new Error(`Canonical terminal artifact commit exited ${exitCode}`);

  command.git.invalidateStatus();
  const after = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
  if (!after || taskStatusLines(command, taskId, after).length > 0) {
    throw new Error("Canonical terminal task artifacts remain dirty after commit");
  }
  return true;
}
