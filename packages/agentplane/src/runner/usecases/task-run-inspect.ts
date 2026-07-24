import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { openLatestRunnerRun, RunnerRunRepository } from "../run-repository.js";
import type { TaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerContextBundle, RunnerEvent, RunnerRunState } from "../types.js";

export type LoadedTaskRunnerInspection = {
  ctx: CommandContext;
  task_id: string;
  run_id: string;
  selection: "explicit" | "latest";
  paths: TaskRunnerPaths;
  repository: RunnerRunRepository;
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  events: RunnerEvent[];
  events_text: string;
};

export async function loadTaskRunnerInspection(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
}): Promise<LoadedTaskRunnerInspection> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  const task = await executionContext.backend.task_backend.getTask(opts.task_id);
  if (!task) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task not found: ${opts.task_id}`,
    });
  }

  const explicitRunId =
    typeof opts.run_id === "string" && opts.run_id.trim().length > 0 ? opts.run_id : null;
  const selected = explicitRunId
    ? {
        run_id: explicitRunId,
        repository: await RunnerRunRepository.openExistingTaskRun({
          git_root: executionContext.repo.git_root,
          workflow_dir: executionContext.repo.workflow_dir,
          task_id: opts.task_id,
          run_id: explicitRunId,
          storage: "supervisor",
        }),
      }
    : await openLatestRunnerRun({
        git_root: executionContext.repo.git_root,
        workflow_dir: executionContext.repo.workflow_dir,
        task_id: opts.task_id,
        storage: "supervisor",
      });
  const runId = selected.run_id;
  const repository = selected.repository;
  const paths = repository.paths as TaskRunnerPaths;
  const [record, eventsData] = await Promise.all([
    repository.readRequiredRecord({
      task_id: opts.task_id,
      run_id: runId,
    }),
    repository.readEventsRequired({
      task_id: opts.task_id,
      run_id: runId,
    }),
  ]);

  return {
    ctx: executionContext.command,
    task_id: opts.task_id,
    run_id: runId,
    selection: explicitRunId ? "explicit" : "latest",
    paths,
    repository,
    bundle: record.bundle,
    state: record.state,
    events: eventsData.events,
    events_text: eventsData.events_text,
  };
}
