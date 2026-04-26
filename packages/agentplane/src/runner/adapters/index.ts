import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { CodexRunnerAdapter } from "./codex.js";
import { CustomRunnerAdapter } from "./custom.js";
import type { RunnerAdapter } from "./shared.js";

export function createRunnerAdapter(config: Pick<AgentplaneConfig, "runner">): RunnerAdapter {
  switch (config.runner.default_adapter) {
    case "codex": {
      return new CodexRunnerAdapter();
    }
    case "custom": {
      return new CustomRunnerAdapter(config.runner.custom);
    }
  }
}
