import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { CliError } from "../../shared/errors.js";
import { type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { executeTaskStatusTransitionRequest, nowIso, requireStructuredComment } from "./shared.js";

export async function recordVerifiedNoopClosure(opts: {
  ctx: CommandContext;
  taskId: string;
  author: string;
  body: string;
  resultSummary: string;
  quiet: boolean;
  successMessage: string;
  force: boolean;
}): Promise<void> {
  const verifiedCfg = opts.ctx.config.tasks.comments.verified;
  requireStructuredComment(opts.body, verifiedCfg.prefix, verifiedCfg.min_chars);

  const at = nowIso();
  await applyTaskMutation({
    ctx: opts.ctx,
    taskId: opts.taskId,
    policyAction: "task_finish",
    build: async (task) => {
      if (!opts.force && normalizeTaskStatus(task.status) === "DONE") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is already DONE: ${opts.taskId} (use --force to override)`,
        });
      }
      const execution = await executeTaskStatusTransitionRequest({
        task,
        backend: opts.ctx.taskBackend,
        config: opts.ctx.config,
        at,
        toStatus: "DONE",
        eventAuthor: opts.author,
        updatedBy: opts.author,
        note: opts.body,
        comment: { author: opts.author, body: opts.body },
        extraFields: {
          result_summary: opts.resultSummary,
          risk_level: "low",
          breaking: false,
        },
        force: true,
        dependencyPolicy: { kind: "none" },
      });
      return { intents: execution.intents, nextTask: execution.nextTask };
    },
  });

  if (!opts.quiet) {
    process.stdout.write(`${opts.successMessage}\n`);
  }
}
