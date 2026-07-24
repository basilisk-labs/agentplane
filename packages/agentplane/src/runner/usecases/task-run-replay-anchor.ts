import { isDeepStrictEqual } from "node:util";

import type { TaskData, TaskRunnerHistoryEntry } from "../../backends/task-backend.js";

function withoutHistory(entry: NonNullable<TaskData["runner"]>): TaskRunnerHistoryEntry {
  const { history: _history, ...snapshot } = entry;
  return snapshot;
}

export function matchingTaskRunnerAnchors(task: TaskData, runId: string): TaskRunnerHistoryEntry[] {
  const runner = task.runner;
  if (!runner) return [];
  const matches = [
    ...(runner.run_id === runId ? [withoutHistory(runner)] : []),
    ...(runner.history ?? []).filter((entry) => entry.run_id === runId),
  ];
  const unique: TaskRunnerHistoryEntry[] = [];
  for (const candidate of matches) {
    if (!unique.some((entry) => isDeepStrictEqual(entry, candidate))) {
      unique.push(candidate);
    }
  }
  return unique;
}
