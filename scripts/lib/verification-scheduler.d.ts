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
  stdout: string;
  stderr: string;
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
