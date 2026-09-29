import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskComment } from "./comment.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import type * as ExternalAgent from "./external-agent-exchange.js";
import { hasChangedTaskArtifacts } from "./external-agent-implementation-finalization.js";

export async function applyExternalReadOnlyWorktreeObservation(opts: {
  command: CommandContext;
  exchange: ExternalAgent.ExternalAgentExchange;
  envelope: ExternalAgent.ExternalAgentResultEnvelope;
}): Promise<void> {
  await cmdTaskComment({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    author: "SUPERVISOR",
    body:
      `Read-only worktree observation (${opts.envelope.result.status}): ` +
      opts.envelope.result.summary,
    quiet: true,
  });
  const status = await readDirectRepositoryStatus(opts.exchange.checkout);
  if (!hasChangedTaskArtifacts(status?.lines ?? [], opts.exchange.task_id)) return;
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record worktree observation`,
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
  if (exitCode !== 0) throw new Error(`External worktree observation commit exited ${exitCode}.`);
}
