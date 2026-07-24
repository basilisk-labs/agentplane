import path from "node:path";

import { readStableRegularTextNoFollow, writeNewStableRegularFileNoFollow } from "./stable-file.js";

const RUNNER_PREPARATION_RECORD_FILENAME = ".runner-preparation-record.json";

export type RunnerPreparationRecord = {
  schema_version: 1;
  kind: "runner_preparation_record";
  run_id: string;
  created_at: string;
};

function parseRunnerPreparationRecord(raw: string, expectedRunId: string): RunnerPreparationRecord {
  const parsed = JSON.parse(raw) as Partial<RunnerPreparationRecord>;
  if (
    parsed.schema_version !== 1 ||
    parsed.kind !== "runner_preparation_record" ||
    parsed.run_id !== expectedRunId ||
    typeof parsed.created_at !== "string" ||
    !Number.isFinite(Date.parse(parsed.created_at))
  ) {
    throw new Error(`Invalid runner preparation record for run_id=${expectedRunId}.`);
  }
  return parsed as RunnerPreparationRecord;
}

export async function writeRunnerPreparationRecord(opts: {
  run_dir: string;
  run_id: string;
  created_at?: string;
}): Promise<RunnerPreparationRecord> {
  const record: RunnerPreparationRecord = {
    schema_version: 1,
    kind: "runner_preparation_record",
    run_id: opts.run_id,
    created_at: opts.created_at ?? new Date().toISOString(),
  };
  await writeNewStableRegularFileNoFollow(
    path.join(opts.run_dir, RUNNER_PREPARATION_RECORD_FILENAME),
    `${JSON.stringify(record)}\n`,
    "runner preparation record",
  );
  return record;
}

export async function readRunnerPreparationRecord(opts: {
  run_dir: string;
  run_id: string;
}): Promise<RunnerPreparationRecord | null> {
  const recordPath = path.join(opts.run_dir, RUNNER_PREPARATION_RECORD_FILENAME);
  try {
    return parseRunnerPreparationRecord(
      await readStableRegularTextNoFollow(recordPath, "runner preparation record", {
        max_bytes: 4096,
      }),
      opts.run_id,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}
