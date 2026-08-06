import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";

export function branchSupervisorArtifactCommitMessage(
  taskId: string,
  artifact: "verification_pass" | "verification_rework" | "evaluator_verdict",
): string {
  const suffix = taskId.split("-").at(-1) ?? taskId;
  if (artifact === "verification_pass") {
    return `✅ ${suffix} task: record branch verification`;
  }
  if (artifact === "verification_rework") {
    return `🧪 ${suffix} task: record verification rework`;
  }
  return `🧭 ${suffix} task: record evaluator verdict`;
}

export async function commitBranchSupervisorTaskArtifacts(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  message: string;
}): Promise<void> {
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.cwd,
    taskId: opts.task_id,
    message: opts.message,
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
  if (exitCode !== 0) {
    throw new Error(`Task artifact commit exited with ${exitCode}.`);
  }
}
