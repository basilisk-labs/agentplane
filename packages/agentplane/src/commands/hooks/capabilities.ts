import type { GitMutationKind } from "../../shared/git-mutation.js";
import type { HookName } from "./shared.js";

export type HookCapabilityMode = "read_only" | "write_capable";
export type HookGitIndexWriteIntent = "forbidden" | "worktree_mutex_required";
export type HookLockContext = "git_optional_locks_disabled" | "outside_git_index";

export type HookCapability = {
  hook: HookName;
  mode: HookCapabilityMode;
  gitIndexWriteIntent: HookGitIndexWriteIntent;
  mutationKind: GitMutationKind;
  lockContext: HookLockContext;
};

const HOOK_CAPABILITIES: Readonly<Record<HookName, HookCapability>> = {
  "commit-msg": {
    hook: "commit-msg",
    mode: "read_only",
    gitIndexWriteIntent: "forbidden",
    mutationKind: "hook_check",
    lockContext: "git_optional_locks_disabled",
  },
  "pre-commit": {
    hook: "pre-commit",
    mode: "read_only",
    gitIndexWriteIntent: "forbidden",
    mutationKind: "hook_check",
    lockContext: "git_optional_locks_disabled",
  },
  "pre-push": {
    hook: "pre-push",
    mode: "read_only",
    gitIndexWriteIntent: "forbidden",
    mutationKind: "hook_check",
    lockContext: "git_optional_locks_disabled",
  },
  "post-merge": {
    hook: "post-merge",
    mode: "write_capable",
    gitIndexWriteIntent: "forbidden",
    mutationKind: "hook_check",
    lockContext: "outside_git_index",
  },
};

export function resolveHookCapability(hook: HookName): HookCapability {
  return HOOK_CAPABILITIES[hook];
}

export function hookCapabilityDiagnosticContext(
  capability: HookCapability,
): Record<string, unknown> {
  return {
    hook: capability.hook,
    hook_capability_mode: capability.mode,
    hook_git_index_write_intent: capability.gitIndexWriteIntent,
    mutation_kind: capability.mutationKind,
    hook_lock_context: capability.lockContext,
  };
}

export async function withHookCapabilityEnvironment<T>(
  capability: HookCapability,
  run: () => Promise<T>,
): Promise<T> {
  const previous = {
    AGENTPLANE_HOOK_CAPABILITY_MODE: process.env.AGENTPLANE_HOOK_CAPABILITY_MODE,
    AGENTPLANE_HOOK_GIT_INDEX_WRITE_INTENT: process.env.AGENTPLANE_HOOK_GIT_INDEX_WRITE_INTENT,
    AGENTPLANE_HOOK_LOCK_CONTEXT: process.env.AGENTPLANE_HOOK_LOCK_CONTEXT,
    AGENTPLANE_HOOK_MUTATION_KIND: process.env.AGENTPLANE_HOOK_MUTATION_KIND,
    GIT_OPTIONAL_LOCKS: process.env.GIT_OPTIONAL_LOCKS,
  };

  process.env.AGENTPLANE_HOOK_CAPABILITY_MODE = capability.mode;
  process.env.AGENTPLANE_HOOK_GIT_INDEX_WRITE_INTENT = capability.gitIndexWriteIntent;
  process.env.AGENTPLANE_HOOK_LOCK_CONTEXT = capability.lockContext;
  process.env.AGENTPLANE_HOOK_MUTATION_KIND = capability.mutationKind;
  if (capability.mode === "read_only") process.env.GIT_OPTIONAL_LOCKS = "0";

  try {
    return await run();
  } finally {
    restoreEnv(previous);
  }
}

function restoreEnv(values: Record<string, string | undefined>): void {
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
