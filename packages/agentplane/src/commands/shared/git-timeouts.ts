export const DEFAULT_GIT_COMMIT_TIMEOUT_MS = 600_000;

export function resolveGitCommitTimeoutMs(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env.AGENTPLANE_GIT_COMMIT_TIMEOUT_MS;
  if (!raw) return DEFAULT_GIT_COMMIT_TIMEOUT_MS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : DEFAULT_GIT_COMMIT_TIMEOUT_MS;
}
