import type { AgentplaneConfig } from "@agentplaneorg/core";

import { CodexRunnerAdapter } from "./codex.js";
import type { RunnerAdapter } from "./shared.js";

export function createRunnerAdapter(config: Pick<AgentplaneConfig, "runner">): RunnerAdapter {
  switch (config.runner.default_adapter) {
    case "codex": {
      return new CodexRunnerAdapter();
    }
    case "custom": {
      throw new Error("Runner adapter is not implemented yet: custom");
    }
  }
}

export { CodexRunnerAdapter } from "./codex.js";
export type { RunnerAdapter } from "./shared.js";
export { runnerAdapterFailureResult, runnerAdapterSuccessResult } from "./shared.js";
