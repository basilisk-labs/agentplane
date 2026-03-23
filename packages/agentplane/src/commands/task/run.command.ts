import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { prepareTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import { CliError } from "../../shared/errors.js";

import type { TaskRunParsed } from "./run.spec.js";

export { taskRunSpec } from "./run.spec.js";
export type { TaskRunParsed } from "./run.spec.js";

export const runTaskRun: CommandHandler<TaskRunParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunParsed,
) => {
  if (!parsed.dryRun) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Task runner execution is not implemented yet. Re-run with --dry-run to materialize bundle artifacts only.",
      context: { command: "task run" },
    });
  }

  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
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
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task run", task_id: parsed.taskId });
  }
};
