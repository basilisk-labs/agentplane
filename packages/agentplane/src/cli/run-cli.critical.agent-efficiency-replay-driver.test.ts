import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const DRIVER_URL = pathToFileURL(
  path.join(process.cwd(), "scripts/bench/run-agent-efficiency-codex-replay.mjs"),
).href;
const CAPTURE_URL = pathToFileURL(
  path.join(process.cwd(), "scripts/bench/capture-agent-efficiency-replay.mjs"),
).href;
const REGISTRY_PATH = path.join(process.cwd(), "scripts/bench/agent-efficiency-fixtures.json");

type Collector = {
  finalStatus: null | "blocked" | "done" | "reviewed";
  lineBuffer: string;
  stderrBytes: number;
  stdoutBytes: number;
  turnCompletedEvents: number;
  usage: null | Record<string, number>;
};

type DriverModule = {
  ANCHOR_CONTEXT_TELEMETRY: Record<
    "context_search_latency_ms" | "retrieval_gaps" | "retrieval_hits" | "retrieval_recall_proxy",
    null
  >;
  CODEX_REPLAY_BINARY: string;
  CODEX_REPLAY_CLI_VERSION: string;
  CODEX_REPLAY_MODEL: string;
  CODEX_REPLAY_REASONING_EFFORT: string;
  CODEX_REPLAY_TURN_TIMEOUT_MS: number;
  acceptCodexJsonlLine(collector: Collector, line: string): void;
  buildAnchorProcessEnvironment(
    fixtureRoot: string,
    source: Record<string, string>,
  ): Record<string, string>;
  buildCodexReplayEnvironment(source: Record<string, string>): Record<string, string>;
  buildEpisodeInstruction(
    scenarioId: string,
    episodeIndex: number,
    role: string,
  ): { common: string; prompt: string };
  composeEpisodePrompt(
    bootstrapBytes: string,
    instruction: { common: string; prompt: string },
  ): { bootstrap_sha256: string; prompt: string; prompt_bytes: number };
  createCodexJsonlCollector(): Collector;
  expectedAnchorPreparationCliCalls(expectedTrace: string[]): number;
  finalizeCodexJsonlCollector(collector: Collector): {
    final_status: "blocked" | "done" | "reviewed";
    provider_usage: Record<string, number>;
    stderr_bytes: number;
    stdout_bytes: number;
  };
  measurePreparedContext(
    bundleBytes: string,
    bootstrapBytes: string,
    runState?: Record<string, unknown> | null,
  ): {
    bootstrap_bytes: number;
    bootstrap_sha256: string;
    bundle_bytes: number;
    duplicate_input_bytes: number;
    prompt_boilerplate_bytes: number;
    prompt_boilerplate_definition: string;
    prompt_boilerplate_source: string;
  };
  partitionReplayClock(clock: {
    completedAt: number;
    firstMutationAt: number | null;
    harnessReadyAt: number;
    harnessStartedAt: number;
    preparationLatencyMs: number;
  }): {
    harness_setup_latency_ms: number;
    preparation_latency_ms: number;
    time_to_first_scoped_mutation_ms: number | null;
    time_to_verified_result_ms: number;
  };
};

type CaptureModule = {
  REPLAY_DRIVER_TURN_TIMEOUT_MS: number;
  buildReplayGitEnvironment(source: Record<string, string>): Record<string, string>;
  replayAnchorCloneArgs(sourceRoot: string): string[];
  replayDriverTimeoutMs(scenario: { expected_episode_trace: string[] }): number;
};

async function driver(): Promise<DriverModule> {
  return (await import(DRIVER_URL)) as DriverModule;
}

async function capture(): Promise<CaptureModule> {
  return (await import(CAPTURE_URL)) as CaptureModule;
}

function digest(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function completed(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    type: "turn.completed",
    usage: {
      cached_input_tokens: 40,
      input_tokens: 100,
      output_tokens: 30,
      reasoning_output_tokens: 20,
      ...overrides,
    },
  });
}

describeCritical("critical: RF-04 Codex replay driver", () => {
  it("pins the reviewed visible model and local Codex runtime", async () => {
    const replayDriver = await driver();

    expect(replayDriver.CODEX_REPLAY_BINARY).toBe(
      "/Applications/ChatGPT.app/Contents/Resources/codex",
    );
    expect(replayDriver.CODEX_REPLAY_CLI_VERSION).toBe("0.145.0-alpha.18");
    expect(replayDriver.CODEX_REPLAY_MODEL).toBe("gpt-5.6-terra");
    expect(replayDriver.CODEX_REPLAY_REASONING_EFFORT).toBe("low");
    expect(replayDriver.ANCHOR_CONTEXT_TELEMETRY).toEqual({
      context_search_latency_ms: null,
      retrieval_gaps: null,
      retrieval_hits: null,
      retrieval_recall_proxy: null,
    });
  });

  it("passes no user home, Codex home, or temporary-directory inheritance", async () => {
    const replayDriver = await driver();

    expect(
      replayDriver.buildCodexReplayEnvironment({
        CODEX_HOME: "/sensitive/codex",
        HOME: "/sensitive/home",
        LANG: "en_US.UTF-8",
        LC_ALL: "en_US.UTF-8",
        PATH: "/untrusted/bin",
        TMPDIR: "/sensitive/tmp",
      }),
    ).toEqual({
      LANG: "en_US.UTF-8",
      LC_ALL: "en_US.UTF-8",
      PATH: "/Applications/ChatGPT.app/Contents/Resources:/opt/homebrew/bin:/usr/bin:/bin",
      TZ: "UTC",
    });

    expect(
      replayDriver.buildAnchorProcessEnvironment("/isolated-fixture", {
        HOME: "/sensitive/home",
        TMPDIR: "/sensitive/tmp",
      }),
    ).toMatchObject({
      AGENTPLANE_HOME: "/isolated-fixture/.rf04-runtime/process/agentplane-home",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_OPTIONAL_LOCKS: "0",
      GIT_PAGER: "cat",
      GIT_TERMINAL_PROMPT: "0",
      HOME: "/isolated-fixture/.rf04-runtime/process/home",
      TMPDIR: "/isolated-fixture/.rf04-runtime/process/tmp",
      XDG_CACHE_HOME: "/isolated-fixture/.rf04-runtime/process/xdg-cache",
      XDG_CONFIG_HOME: "/isolated-fixture/.rf04-runtime/process/xdg-config",
    });
  });

  it("feeds the exact prepared bootstrap once and accounts for the actual prompt bytes", async () => {
    const replayDriver = await driver();
    const bootstrap = "# ANCHOR_BOOTSTRAP_SENTINEL\nPrepared context.\n";
    const instruction = replayDriver.buildEpisodeInstruction("hermes_one_step", 0, "CURRENT_AGENT");
    const composed = replayDriver.composeEpisodePrompt(bootstrap, instruction);

    expect(composed.prompt).toBe(`${bootstrap}\n${instruction.prompt}`);
    expect(composed.prompt.split("ANCHOR_BOOTSTRAP_SENTINEL")).toHaveLength(2);
    expect(composed.prompt_bytes).toBe(Buffer.byteLength(composed.prompt, "utf8"));
    expect(composed.bootstrap_sha256).toBe(digest(bootstrap));
    expect(instruction.prompt).toContain("CURRENT_AGENT");
    expect(instruction.prompt).toContain("HERMES_OK");
  });

  it("preserves the historical bundle duplication metric and does not relabel fixture text", async () => {
    const replayDriver = await driver();
    const repeated = "repeated prepared context that exceeds thirty-two UTF-8 bytes";
    const basePrompt = "canonical base prompt content measured as prepared boilerplate";
    const bundle = `${JSON.stringify({
      base_prompts: [{ content: basePrompt }],
      first: repeated,
      second: repeated,
    })}\n`;
    const bootstrap = "Use bundle.json as the complete runner input.\n";

    expect(
      replayDriver.measurePreparedContext(bundle, bootstrap, {
        prepared_metadata: { prompt_boilerplate_bytes: 123 },
      }),
    ).toEqual({
      bootstrap_bytes: Buffer.byteLength(bootstrap),
      bootstrap_sha256: digest(bootstrap),
      bundle_bytes: Buffer.byteLength(bundle),
      duplicate_input_bytes: Buffer.byteLength(repeated),
      prompt_boilerplate_bytes: 123,
      prompt_boilerplate_definition: "anchor_prepared_metadata_v1",
      prompt_boilerplate_source: "anchor_run_state.prepared_metadata.prompt_boilerplate_bytes",
    });
    expect(replayDriver.measurePreparedContext(bundle, bootstrap)).toMatchObject({
      prompt_boilerplate_bytes: Buffer.byteLength(basePrompt),
      prompt_boilerplate_definition: "bundle_base_prompt_content_utf8_v1",
      prompt_boilerplate_source: "anchor_bundle.base_prompts.content",
    });
    expect(() =>
      replayDriver.measurePreparedContext(bundle, "bootstrap without reference\n"),
    ).toThrow("ANCHOR_BOOTSTRAP_BUNDLE_REFERENCE");
    expect(() =>
      replayDriver.measurePreparedContext(
        `${JSON.stringify({ base_prompts: [{ title: "missing content" }] })}\n`,
        bootstrap,
      ),
    ).toThrow("ANCHOR_BASE_PROMPT_CONTENT");
  });

  it("proves zero-agent and CURRENT_AGENT plans and exact lifecycle call budgets offline", async () => {
    const replayDriver = await driver();
    const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8")) as {
      scenarios: { expected_episode_trace: string[]; id: string }[];
    };
    const context = registry.scenarios.find((scenario) => scenario.id === "context_assimilation");
    const hermes = registry.scenarios.find((scenario) => scenario.id === "hermes_one_step");
    const evaluator = registry.scenarios.find((scenario) => scenario.id === "evaluator_rework");

    expect(
      registry.scenarios.reduce(
        (total, scenario) => total + scenario.expected_episode_trace.length,
        0,
      ),
    ).toBe(11);
    expect(
      registry.scenarios.filter((scenario) => scenario.expected_episode_trace.length === 0),
    ).toHaveLength(3);
    expect(
      registry.scenarios.reduce(
        (total, scenario) => total + scenario.expected_episode_trace.length,
        0,
      ) * 5,
    ).toBe(55);
    expect(context?.expected_episode_trace).toEqual([]);
    expect(hermes?.expected_episode_trace).toEqual(["CURRENT_AGENT"]);
    expect(
      replayDriver.expectedAnchorPreparationCliCalls(context?.expected_episode_trace ?? []),
    ).toBe(6);
    expect(
      replayDriver.expectedAnchorPreparationCliCalls(hermes?.expected_episode_trace ?? []),
    ).toBe(6);
    expect(
      replayDriver.expectedAnchorPreparationCliCalls(evaluator?.expected_episode_trace ?? []),
    ).toBe(13);
  });

  it("keeps the parent timeout above every per-turn budget while retaining a hard cap", async () => {
    const replayCapture = await capture();
    const replayDriver = await driver();
    const evaluator = { expected_episode_trace: ["CODER", "EVALUATOR", "CODER", "EVALUATOR"] };
    const timeout = replayCapture.replayDriverTimeoutMs(evaluator);

    expect(replayCapture.REPLAY_DRIVER_TURN_TIMEOUT_MS).toBe(
      replayDriver.CODEX_REPLAY_TURN_TIMEOUT_MS,
    );
    expect(timeout).toBeGreaterThan(
      evaluator.expected_episode_trace.length * replayCapture.REPLAY_DRIVER_TURN_TIMEOUT_MS,
    );
    expect(timeout).toBeLessThanOrEqual(25 * 60 * 1000);
    expect(() =>
      replayCapture.replayDriverTimeoutMs({
        expected_episode_trace: Array.from({ length: 5 }, () => "CODER"),
      }),
    ).toThrow("exceeds the bounded parent driver timeout contract");
  });

  it("checks out the exact anchor through a local hookless no-network Git boundary", async () => {
    const replayCapture = await capture();

    expect(
      replayCapture.buildReplayGitEnvironment({
        GIT_CONFIG_GLOBAL: "/sensitive/gitconfig",
        HOME: "/sensitive/home",
        LANG: "en_US.UTF-8",
        LC_ALL: "en_US.UTF-8",
        PATH: "/untrusted/bin",
      }),
    ).toEqual({
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_OPTIONAL_LOCKS: "0",
      GIT_PAGER: "cat",
      GIT_TERMINAL_PROMPT: "0",
      LANG: "en_US.UTF-8",
      LC_ALL: "en_US.UTF-8",
      PATH: "/usr/bin:/bin",
      TZ: "UTC",
    });
    expect(replayCapture.replayAnchorCloneArgs("/local/source")).toEqual([
      "clone",
      "--quiet",
      "--shared",
      "--no-checkout",
      "--no-tags",
      "/local/source",
      ".",
    ]);
  });

  it("excludes runtime compilation and fixture prerequisites from scenario timing", async () => {
    const replayDriver = await driver();

    expect(
      replayDriver.partitionReplayClock({
        completedAt: 1200,
        firstMutationAt: 950,
        harnessReadyAt: 800,
        harnessStartedAt: 100,
        preparationLatencyMs: 100,
      }),
    ).toEqual({
      harness_setup_latency_ms: 700,
      preparation_latency_ms: 100,
      time_to_first_scoped_mutation_ms: 150,
      time_to_verified_result_ms: 400,
    });
    expect(() =>
      replayDriver.partitionReplayClock({
        completedAt: 1200,
        firstMutationAt: 700,
        harnessReadyAt: 800,
        harnessStartedAt: 100,
        preparationLatencyMs: 100,
      }),
    ).toThrow("REPLAY_CLOCK_ORDER");
    expect(() =>
      replayDriver.partitionReplayClock({
        completedAt: 1200,
        firstMutationAt: null,
        harnessReadyAt: 800,
        harnessStartedAt: 100,
        preparationLatencyMs: 401,
      }),
    ).toThrow("REPLAY_CLOCK_ORDER");
  });

  it("keeps only sanitized provider usage from exactly one final turn", async () => {
    const replayDriver = await driver();
    const collector = replayDriver.createCodexJsonlCollector();
    collector.stdoutBytes = 1234;
    collector.stderrBytes = 56;

    replayDriver.acceptCodexJsonlLine(
      collector,
      JSON.stringify({
        item: { content: "raw hidden reasoning must not be retained" },
        type: "item.completed",
      }),
    );
    replayDriver.acceptCodexJsonlLine(
      collector,
      JSON.stringify({
        item: { text: '{"status":"done"}', type: "agent_message" },
        type: "item.completed",
      }),
    );
    replayDriver.acceptCodexJsonlLine(collector, completed());
    const result = replayDriver.finalizeCodexJsonlCollector(collector);

    expect(result).toEqual({
      final_status: "done",
      provider_usage: {
        cached_input_tokens: 40,
        input_tokens: 100,
        output_tokens: 30,
        reasoning_output_tokens: 20,
        turn_completed_events: 1,
      },
      stderr_bytes: 56,
      stdout_bytes: 1234,
    });
    expect(JSON.stringify(result)).not.toContain("hidden reasoning");
  });

  it("uses the last schema-valid status before turn completion without retaining raw messages", async () => {
    const replayDriver = await driver();
    const collector = replayDriver.createCodexJsonlCollector();
    const rawMessages = [
      { text: '{"status":"blocked"}', type: "agent_message" },
      { content: '{ "status": "reviewed" }', type: "agent_message" },
      { text: '{\n  "status": "done"\n}', type: "agent_message" },
    ];

    for (const item of rawMessages) {
      replayDriver.acceptCodexJsonlLine(
        collector,
        JSON.stringify({ item, type: "item.completed" }),
      );
    }
    replayDriver.acceptCodexJsonlLine(collector, completed());

    const result = replayDriver.finalizeCodexJsonlCollector(collector);
    expect(result.final_status).toBe("done");
    expect(JSON.stringify(result)).not.toContain(rawMessages[1]?.content);
  });

  it("fails closed on status messages after turn completion", async () => {
    const replayDriver = await driver();
    const collector = replayDriver.createCodexJsonlCollector();
    replayDriver.acceptCodexJsonlLine(
      collector,
      JSON.stringify({
        item: { text: '{"status":"done"}', type: "agent_message" },
        type: "item.completed",
      }),
    );
    replayDriver.acceptCodexJsonlLine(collector, completed());
    for (const text of ['{"status":"reviewed"}', "not-json"]) {
      expect(() =>
        replayDriver.acceptCodexJsonlLine(
          collector,
          JSON.stringify({
            item: { text, type: "agent_message" },
            type: "item.completed",
          }),
        ),
      ).toThrow("CODEX_FINAL_STATUS_ORDER");
    }
  });

  it("resolves every ordered status transition to the last pre-completion value", async () => {
    const replayDriver = await driver();
    const statuses = ["blocked", "done", "reviewed"] as const;

    for (const first of statuses) {
      for (const last of statuses) {
        const collector = replayDriver.createCodexJsonlCollector();
        replayDriver.acceptCodexJsonlLine(
          collector,
          JSON.stringify({
            item: { text: JSON.stringify({ status: first }), type: "agent_message" },
            type: "item.completed",
          }),
        );
        replayDriver.acceptCodexJsonlLine(
          collector,
          JSON.stringify({
            item: { content: JSON.stringify({ status: last }), type: "agent_message" },
            type: "item.completed",
          }),
        );
        replayDriver.acceptCodexJsonlLine(collector, completed());
        expect(replayDriver.finalizeCodexJsonlCollector(collector).final_status).toBe(last);
      }
    }
  });

  it("still validates every repeated status message independently", async () => {
    const replayDriver = await driver();

    for (const invalid of ["not-json", '{"status":"done","extra":true}', '{"status":"unknown"}']) {
      const collector = replayDriver.createCodexJsonlCollector();
      replayDriver.acceptCodexJsonlLine(
        collector,
        JSON.stringify({
          item: { text: '{"status":"done"}', type: "agent_message" },
          type: "item.completed",
        }),
      );
      expect(() =>
        replayDriver.acceptCodexJsonlLine(
          collector,
          JSON.stringify({
            item: { text: invalid, type: "agent_message" },
            type: "item.completed",
          }),
        ),
      ).toThrow(invalid === "not-json" ? "CODEX_FINAL_STATUS_JSON" : "CODEX_FINAL_STATUS_SHAPE");
    }
  });

  it("fails closed on duplicate, missing, malformed, or estimated provider usage", async () => {
    const replayDriver = await driver();

    const duplicate = replayDriver.createCodexJsonlCollector();
    replayDriver.acceptCodexJsonlLine(duplicate, completed());
    expect(() => replayDriver.acceptCodexJsonlLine(duplicate, completed())).toThrow(
      "CODEX_TURN_COMPLETED_COUNT",
    );

    const missingReasoning = replayDriver.createCodexJsonlCollector();
    expect(() =>
      replayDriver.acceptCodexJsonlLine(
        missingReasoning,
        JSON.stringify({
          type: "turn.completed",
          usage: { cached_input_tokens: 1, input_tokens: 2, output_tokens: 3 },
        }),
      ),
    ).toThrow("CODEX_USAGE_SHAPE");

    const negative = replayDriver.createCodexJsonlCollector();
    expect(() =>
      replayDriver.acceptCodexJsonlLine(negative, completed({ reasoning_output_tokens: -1 })),
    ).toThrow("CODEX_REASONING_OUTPUT_TOKENS");

    const absent = replayDriver.createCodexJsonlCollector();
    expect(() => replayDriver.finalizeCodexJsonlCollector(absent)).toThrow(
      "CODEX_TURN_COMPLETED_MISSING",
    );

    const missingStatus = replayDriver.createCodexJsonlCollector();
    replayDriver.acceptCodexJsonlLine(missingStatus, completed());
    expect(() => replayDriver.finalizeCodexJsonlCollector(missingStatus)).toThrow(
      "CODEX_FINAL_STATUS_MISSING",
    );
  });
});
