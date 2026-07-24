import { readdir } from "node:fs/promises";

import { readRunnerChildSpawnClaim } from "../adapters/execution-control.js";
import { readRunnerPreparationRecord } from "../preparation-record.js";
import type { RunnerRunRepository } from "../run-repository.js";

export type TaskRunnerMissingStateAuthority =
  | "incomplete_pre_provider"
  | "missing_state_unverified"
  | "spawn_authorized_but_unconfirmed";

export async function inspectTaskRunnerMissingStateAuthority(opts: {
  repository: RunnerRunRepository;
  run_id: string;
}): Promise<TaskRunnerMissingStateAuthority> {
  const repository = opts.repository;
  await repository.assertBoundary("before reading missing-state child spawn authority");
  const spawnClaim = await readRunnerChildSpawnClaim({
    run_dir: repository.paths.run_dir,
    run_id: opts.run_id,
  });
  await repository.assertBoundary("after reading missing-state child spawn authority");
  if (spawnClaim) return "spawn_authorized_but_unconfirmed";

  const preparationRecord = await readRunnerPreparationRecord({
    run_dir: repository.paths.run_dir,
    run_id: opts.run_id,
  });
  await repository.assertBoundary("after reading missing-state preparation provenance");
  if (preparationRecord) return "incomplete_pre_provider";

  const entries = await readdir(repository.paths.run_dir);
  await repository.assertBoundary("after checking an uninitialized runner directory");
  return entries.length === 0 ? "incomplete_pre_provider" : "missing_state_unverified";
}
