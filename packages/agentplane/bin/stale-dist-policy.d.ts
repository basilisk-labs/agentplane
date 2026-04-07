export type StaleDistPolicy = {
  mode: "warn_and_run" | "strict";
  reason: "read_only_diagnostic" | "task_artifact_mutation" | "default";
};

export function classifyStaleDistPolicy(argv?: string[]): StaleDistPolicy;
