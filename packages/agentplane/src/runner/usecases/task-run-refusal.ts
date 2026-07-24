import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { evolveRunnerRunState } from "../artifacts.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { RunnerContextBundle, RunnerResult, RunnerRunState } from "../types.js";
import { renderTaskRunnerBootstrap } from "./task-run-bootstrap.js";

export class RunnerPreparationCliError extends CliError {
  readonly bundle: RunnerContextBundle;
  readonly state: RunnerRunState;

  constructor(opts: { cause: CliError; bundle: RunnerContextBundle; state: RunnerRunState }) {
    super({
      exitCode: opts.cause.exitCode,
      code: opts.cause.code,
      message: opts.cause.message,
      context: opts.cause.context,
    });
    this.bundle = opts.bundle;
    this.state = opts.state;
  }
}

export async function writeRunnerRefusalArtifacts(opts: {
  bundle: RunnerContextBundle;
  error: CliError;
  repository: RunnerRunRepository;
}): Promise<RunnerRunState> {
  const prepared = await opts.repository.writePrepared({
    bundle: opts.bundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(opts.bundle),
  });
  const result: RunnerResult = {
    status: "failed",
    exit_code: opts.error.exitCode ?? exitCodeForError("E_RUNTIME"),
    started_at: prepared.created_at,
    ended_at: prepared.created_at,
    summary: opts.error.message,
    stderr_summary: opts.error.message,
  };
  const refused = evolveRunnerRunState({
    state: prepared,
    status: "failed",
    result,
    updated_at: prepared.created_at,
  });
  await opts.repository.writeState(refused);
  await opts.repository.appendEvent({
    at: prepared.created_at,
    type: "runner_refused",
    message: `runner refused before adapter prepare: ${opts.error.message}`,
    data: opts.error.context
      ? {
          code: opts.error.code,
          exit_code: opts.error.exitCode,
          ...opts.error.context,
        }
      : {
          code: opts.error.code,
          exit_code: opts.error.exitCode,
        },
  });
  return refused;
}
