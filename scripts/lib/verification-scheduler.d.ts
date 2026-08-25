export type VerificationGroup = {
  id: string;
  command: string;
  args?: string[];
  env?: NodeJS.ProcessEnv;
  timeoutMs?: number;
};

export type VerificationGroupResult = {
  id: string;
  exit_code: number;
  timed_out: boolean;
  duration_ms: number;
  started_at_ms: number;
  finished_at_ms: number;
  stdout: string;
  stderr: string;
};

export type VerificationGroupSummary = {
  schema_version: 1;
  kind: "verification_group_summary";
  ok: boolean;
  groups: Array<Pick<VerificationGroupResult, "id" | "exit_code" | "timed_out" | "duration_ms">>;
};

export function runVerificationGroups(
  groups: VerificationGroup[],
  options?: {
    concurrency?: number;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    timeoutMs?: number;
    killGraceMs?: number;
    outputTailBytes?: number;
  },
): Promise<{
  schema_version: 1;
  kind: "verification_group_result";
  ok: boolean;
  results: VerificationGroupResult[];
}>;

export function summarizeVerificationGroupResults(
  results: VerificationGroupResult[],
): VerificationGroupSummary;

export function writeVerificationGroupResults(
  results: VerificationGroupResult[],
  options?: {
    stdout?: NodeJS.WritableStream;
    stderr?: NodeJS.WritableStream;
  },
): Promise<VerificationGroupSummary>;
