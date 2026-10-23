const DEFAULT_CHECK_TIMEOUT_MS = 30 * 60_000;
const CHECK_TIMEOUT_MS_BY_SCRIPT: Readonly<Record<string, number>> = Object.freeze({
  // The complete regression suite can exceed the default on shared development hosts.
  "test:fast": 60 * 60_000,
  // Full CI includes four bounded verification waves and a prerequisite build.
  "ci:local:full": 150 * 60_000,
  // Prepublish also runs release-wide suites, coverage, and installed-package smoke checks.
  "release:prepublish": 150 * 60_000,
  "release:ci-check": 150 * 60_000,
  "e2e:v0.7.1:gate": 150 * 60_000,
});

/** Explicit operator profile for one native invocation. No unlimited value is accepted. */
export function taskCheckTimeoutProfile(env: NodeJS.ProcessEnv = process.env): number | undefined {
  const raw = env.AGENTPLANE_TASK_CHECK_TIMEOUT_MS;
  if (raw === undefined) return undefined;
  const value = Number(raw);
  if (!/^[1-9][0-9]*$/u.test(raw) || !Number.isSafeInteger(value) || value > 86_400_000) {
    throw new Error(
      "AGENTPLANE_TASK_CHECK_TIMEOUT_MS must be an integer from 1 to 86400000 milliseconds",
    );
  }
  return value;
}

export function taskCheckTimeoutBudget(
  sequence: readonly { script: string | null }[],
  explicit: number | undefined,
  profile: number | undefined,
): number {
  return (
    explicit ??
    profile ??
    Math.max(
      ...sequence.map(({ script }) =>
        script === null
          ? DEFAULT_CHECK_TIMEOUT_MS
          : (CHECK_TIMEOUT_MS_BY_SCRIPT[script] ?? DEFAULT_CHECK_TIMEOUT_MS),
      ),
    )
  );
}
