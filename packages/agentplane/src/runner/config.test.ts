import { defaultConfig, validateConfig } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import {
  resolveRunnerAdapterId,
  resolveRunnerTimeoutPolicy,
  resolveRunnerTracePolicy,
} from "./config.js";

describe("runner config", () => {
  it("defaults the selected runner adapter to codex", () => {
    const config = validateConfig({});
    expect(resolveRunnerAdapterId(config)).toBe("codex");
    expect(resolveRunnerTracePolicy(config)).toEqual({
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
      retention: "keep",
      compression: "none",
      redact_patterns: [],
    });
    expect(resolveRunnerTimeoutPolicy(config)).toEqual({
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    });
  });

  it("reads an explicit custom adapter selection from config", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    (raw.runner as Record<string, unknown>).default_adapter = "custom";
    const config = validateConfig(raw);
    expect(resolveRunnerAdapterId(config)).toBe("custom");
  });

  it("validates custom runner command and env settings", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.runner = {
      default_adapter: "custom",
      custom: {
        command: ["custom-runner", "--flag"],
        env: {
          CUSTOM_TOKEN: "token",
        },
        enforcement: {
          mode: "codex_sandbox_full_auto",
          platform: "linux",
        },
      },
    };

    const config = validateConfig(raw);

    expect(resolveRunnerAdapterId(config)).toBe("custom");
    expect(config.runner.custom).toEqual({
      command: ["custom-runner", "--flag"],
      env: {
        CUSTOM_TOKEN: "token",
      },
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "linux",
      },
    });
  });

  it("reads explicit runner trace policy from config", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.runner = {
      default_adapter: "codex",
      trace: {
        mode: "off",
        max_tail_bytes: 128,
        capture_stderr: false,
      },
    };

    const config = validateConfig(raw);

    expect(resolveRunnerTracePolicy(config)).toEqual({
      mode: "off",
      max_tail_bytes: 128,
      capture_stderr: false,
      retention: "keep",
      compression: "none",
      redact_patterns: [],
    });
  });

  it("reads explicit runner timeout policy from config", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.runner = {
      default_adapter: "codex",
      trace: {
        mode: "raw",
        max_tail_bytes: 64,
        capture_stderr: true,
        retention: "keep",
        compression: "none",
        redact_patterns: [],
      },
      timeouts: {
        wall_clock_ms: 2000,
        idle_ms: 250,
        terminate_grace_ms: 50,
      },
    };

    const config = validateConfig(raw);

    expect(resolveRunnerTimeoutPolicy(config)).toEqual({
      wall_clock_ms: 2000,
      idle_ms: 250,
      terminate_grace_ms: 50,
    });
  });
});
