import type * as DeferredRuntime from "./deferred-runtime.js";

const DEFERRED_RUNTIME_PATH = "./deferred-runtime.js";

export async function loadDeferredRuntime(): Promise<typeof DeferredRuntime> {
  const embedded = (globalThis as Record<string, unknown>).__AGENTPLANE_DEFERRED_RUNTIME__ as
    | typeof DeferredRuntime
    | undefined;
  if (embedded) return embedded;
  return (await import(DEFERRED_RUNTIME_PATH)) as typeof DeferredRuntime;
}
