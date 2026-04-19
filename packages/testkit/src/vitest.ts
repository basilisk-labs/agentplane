import { describe } from "vitest";

type DescribeFn = typeof describe;

/**
 * Use for suites that require explicit environment opt-in or secrets.
 * Call with the already-computed gate to keep the suite condition readable at call sites.
 */
export function describeWhenEnvPresent(enabled: boolean): DescribeFn {
  return (enabled ? describe : describe.skip) as DescribeFn;
}

/**
 * Use for suites that should not run inside hook mode, where repository hooks
 * intentionally constrain side effects and process execution.
 */
export const describeWhenNotHook =
  process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;

/**
 * Use to mark critical contract suites. This is currently an alias of `describe`
 * so the semantic tag lives in one place even before we add separate routing.
 */
export const describeCritical: DescribeFn = describe;
