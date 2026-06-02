import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { CodexRunnerAdapter } from "./codex.js";
import { CustomRunnerAdapter } from "./custom.js";
import { HermesRunnerAdapter } from "./hermes.js";
import type { RunnerAdapter } from "./shared.js";

export function createRunnerAdapter(config: Pick<AgentplaneConfig, "runner">): RunnerAdapter {
  switch (config.runner.default_adapter) {
    case "codex": {
      return new CodexRunnerAdapter();
    }
    case "custom": {
      return new CustomRunnerAdapter(config.runner.custom);
    }
    case "hermes": {
      return new HermesRunnerAdapter(config.runner.custom);
    }
  }
}
