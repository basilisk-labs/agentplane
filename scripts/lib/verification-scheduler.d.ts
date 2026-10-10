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
  failure_kind?:
    | "timeout"
    | "out_of_memory"
    | "assertion_failure"
    | "infrastructure_failure"
    | "command_failure"
    | null;
  failure_kinds?: Array<NonNullable<VerificationGroupResult["failure_kind"]>>;
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

export function classifyVerificationGroupFailure(
  result: Pick<VerificationGroupResult, "exit_code" | "timed_out"> &
    Partial<Pick<VerificationGroupResult, "stdout" | "stderr">>,
): NonNullable<VerificationGroupResult["failure_kind"]> | null;

export function classifyVerificationGroupFailures(
  result: Pick<VerificationGroupResult, "exit_code" | "timed_out"> &
    Partial<Pick<VerificationGroupResult, "stdout" | "stderr">>,
): Array<NonNullable<VerificationGroupResult["failure_kind"]>>;

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
