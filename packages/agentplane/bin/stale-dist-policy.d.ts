export type StaleDistPolicy = {
  mode: "warn_and_run" | "strict";
  reason: "read_only_diagnostic" | "default";
};

export function classifyStaleDistPolicy(argv?: string[]): StaleDistPolicy;
