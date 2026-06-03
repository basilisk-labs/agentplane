import type { RunnerCustomConfig } from "@agentplaneorg/core/config";

import { CustomRunnerAdapter } from "./custom.js";

export class HermesRunnerAdapter extends CustomRunnerAdapter {
  constructor(config: RunnerCustomConfig | undefined) {
    super(config, "hermes");
  }
}
