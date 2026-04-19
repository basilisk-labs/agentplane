const RUNTIME_MODE_ENV_KEYS = [
  "AGENTPLANE_REPO_LOCAL_HANDOFF",
  "AGENTPLANE_RUNTIME_HANDOFF_FROM",
  "AGENTPLANE_RUNTIME_ACTIVE_BIN",
  "AGENTPLANE_RUNTIME_MODE",
  "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK",
] as const;

export function clearRuntimeModeEnv(env: NodeJS.ProcessEnv): void {
  for (const key of RUNTIME_MODE_ENV_KEYS) {
    delete env[key];
  }
}

export function buildCleanRuntimeModeEnv(
  base: NodeJS.ProcessEnv = process.env,
  overrides: NodeJS.ProcessEnv = {},
): NodeJS.ProcessEnv {
  const env = { ...base };
  clearRuntimeModeEnv(env);
  return {
    ...env,
    ...overrides,
  };
}
