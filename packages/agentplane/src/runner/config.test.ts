import { defaultConfig, validateConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { resolveRunnerAdapterId } from "./config.js";

describe("runner config", () => {
  it("defaults the selected runner adapter to codex", () => {
    const config = validateConfig({});
    expect(resolveRunnerAdapterId(config)).toBe("codex");
  });

  it("reads an explicit custom adapter selection from config", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    (raw.runner as Record<string, unknown>).default_adapter = "custom";
    const config = validateConfig(raw);
    expect(resolveRunnerAdapterId(config)).toBe("custom");
  });
});
