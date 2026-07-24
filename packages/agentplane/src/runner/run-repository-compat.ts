import { CliError } from "../shared/errors.js";

import { openLatestRunnerRun, RunnerRunRepository } from "./run-repository.js";

type RunnerStorage = "supervisor" | "task";

type RunnerRunLookup = {
  git_root: string;
  workflow_dir: string;
  task_id: string;
};

type SelectedRunnerRun = {
  run_id: string;
  repository: RunnerRunRepository;
};

function isNoRunnerRunsError(error: unknown, storage: RunnerStorage): boolean {
  return (
    error instanceof CliError &&
    error.code === "E_IO" &&
    error.context?.reason === "runner_runs_not_found" &&
    error.context.storage === storage
  );
}

export async function openExistingRunnerRunWithLegacyFallback(
  opts: RunnerRunLookup & { run_id: string },
): Promise<RunnerRunRepository> {
  const supervisor = await RunnerRunRepository.openTaskRunIfPresent({
    ...opts,
    storage: "supervisor",
  });
  if (supervisor) return supervisor;
  return await RunnerRunRepository.openExistingTaskRun({
    ...opts,
    storage: "task",
  });
}

export async function openLatestRunnerRunWithLegacyFallback(
  opts: RunnerRunLookup,
): Promise<SelectedRunnerRun> {
  try {
    return await openLatestRunnerRun({
      ...opts,
      storage: "supervisor",
    });
  } catch (error) {
    if (!isNoRunnerRunsError(error, "supervisor")) throw error;
    return await openLatestRunnerRun({
      ...opts,
      storage: "task",
    });
  }
}
