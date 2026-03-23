import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";

import type { TaskRunParsed } from "./run.spec.js";

export { taskRunSpec } from "./run.spec.js";
export type { TaskRunParsed } from "./run.spec.js";

export const runTaskRun: CommandHandler<TaskRunParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunParsed,
) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    if (!parsed.dryRun) {
      const executed = await executeTaskRunnerExecution({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
      });
      process.stdout.write(`${infoMessage(`task run executed: ${parsed.taskId}`)}\n`);
      process.stdout.write(`adapter: ${executed.invocation.adapter_id}\n`);
      process.stdout.write(`run_id: ${executed.invocation.run_id}\n`);
      process.stdout.write(`state: ${executed.bundle.execution.artifact_paths.state_path}\n`);
      process.stdout.write(`events: ${executed.bundle.execution.artifact_paths.events_path}\n`);
      process.stdout.write(`status: ${executed.result.status}\n`);
      process.stdout.write(`runner_exit_code: ${executed.result.exit_code ?? "null"}\n`);
      if (executed.result.stdout_summary) {
        process.stdout.write(`stdout: ${executed.result.stdout_summary}\n`);
      }
      if (executed.result.stderr_summary) {
        process.stderr.write(`stderr: ${executed.result.stderr_summary}\n`);
      }
      return executed.result.status === "success"
        ? 0
        : (executed.result.exit_code ?? exitCodeForError("E_RUNTIME"));
    }

    const prepared = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      mode: "dry_run",
    });
    process.stdout.write(`${infoMessage(`task run dry-run prepared: ${parsed.taskId}`)}\n`);
    process.stdout.write(`adapter: ${prepared.invocation.adapter_id}\n`);
    process.stdout.write(`run_id: ${prepared.invocation.run_id}\n`);
    process.stdout.write(`bundle: ${prepared.bundle.execution.artifact_paths.bundle_path}\n`);
    process.stdout.write(`bootstrap: ${prepared.bundle.execution.artifact_paths.bootstrap_path}\n`);
    process.stdout.write(`state: ${prepared.bundle.execution.artifact_paths.state_path}\n`);
    process.stdout.write(`events: ${prepared.bundle.execution.artifact_paths.events_path}\n`);
    process.stdout.write(`argv: ${prepared.invocation.argv.join(" ")}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task run", task_id: parsed.taskId });
  }
};
