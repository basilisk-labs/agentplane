import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { readRunnerProviderUsageObservation, writePreparedRunnerArtifacts } from "../artifacts.js";
import type { RunnerEvent } from "../types.js";
import { createRunnerAdapter } from "./index.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

function semanticEvent(workOrderId: string, text = "not valid semantic JSON"): string {
  return JSON.stringify({
    type: "item.completed",
    item: { type: "agent_message", text },
    work_order_id: workOrderId,
  });
}

async function executeFakeCodex(lines: string[]) {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-usage-durability-"));
  tempRoots.push(root);
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  const adapter = createRunnerAdapter(defaultConfig());
  const bundle = makeRunnerContextBundle({
    adapterId: "codex",
    gitRoot: root,
    mode: "execute",
    runId: "run-usage",
    taskId: "202609120000-USAGE1",
  });
  setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-usage"));
  await writeRunnerExecutable(root, "codex", [
    [
      "#!/bin/sh",
      'while [ "$#" -gt 0 ]; do',
      '  case "$1" in',
      "    -C|-s|-a|--output-schema)",
      "      shift 2",
      "      ;;",
      "    *)",
      "      shift",
      "      ;;",
      "  esac",
      "done",
      "cat >/dev/null",
      ...lines.map((line) => `printf '%s\\n' '${line}'`),
      "exit 0",
    ].join("\n"),
  ]);
  const invocation = await adapter.prepare(bundle);
  invocation.env.PATH = `${path.join(root, "bin")}:${process.env.PATH ?? ""}`;
  await writePreparedRunnerArtifacts({
    bundle,
    bootstrap_markdown: "Return the structured semantic result.\n",
    invocation,
  });
  const result = await adapter.execute(invocation);
  const eventsText = await readFile(invocation.events_path, "utf8");
  const events = eventsText
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line) as RunnerEvent);
  return {
    result,
    invocation,
    events,
    usageEvents: events.filter((event) => event.type === "runner_provider_usage_observation"),
  };
}

describe("Codex provider usage durability", () => {
  it("persists one identity-bound charge before malformed semantic output is rejected", async () => {
    const completion = JSON.stringify({
      type: "turn.completed",
      turn_id: "turn-usage",
      usage: {
        input_tokens: 100,
        cached_input_tokens: 60,
        output_tokens: 30,
        reasoning_output_tokens: 20,
      },
    });
    const executed = await executeFakeCodex([
      JSON.stringify({ type: "thread.started", thread_id: "thread-usage" }),
      JSON.stringify({ type: "turn.started", turn_id: "turn-usage" }),
      semanticEvent("run-usage"),
      completion,
      completion,
    ]);

    expect(executed.result.status).toBe("failed");
    expect(executed.usageEvents).toHaveLength(1);
    expect(executed.events.indexOf(executed.usageEvents[0]!)).toBeLessThan(
      executed.events.findIndex((event) => event.type === "runner_execute_error"),
    );
    expect(executed.usageEvents[0]?.data).toMatchObject({
      schema_version: 1,
      kind: "runner_provider_usage_observation",
      provider: "codex",
      status: "observed",
      dispatch_id: "dispatch:run-usage",
      run_id: "run-usage",
      work_order_id: "run-usage",
      thread_id: "thread-usage",
      turn_id: "turn-usage",
      usage: {
        input_tokens: 100,
        cached_input_tokens: 60,
        output_tokens: 30,
        total_tokens: 130,
        visible_output_tokens: 10,
        reasoning_tokens: 20,
      },
    });
    const deserializedResult = structuredClone(executed.result);
    expect(deserializedResult).not.toBe(executed.result);
    await expect(
      readRunnerProviderUsageObservation({
        events_path: executed.invocation.events_path,
        provider: executed.invocation.adapter_id,
        dispatch_id: `dispatch:${executed.invocation.work_order_id}`,
        run_id: executed.invocation.run_id,
        work_order_id: executed.invocation.work_order_id,
      }),
    ).resolves.toMatchObject({
      status: "observed",
      thread_id: "thread-usage",
      turn_id: "turn-usage",
      usage: { input_tokens: 100, output_tokens: 30, total_tokens: 130 },
    });
  });

  it.each([
    {
      label: "partial identity",
      lines: [
        JSON.stringify({ type: "thread.started", thread_id: "thread-partial" }),
        semanticEvent("run-usage"),
      ],
      expectedStatus: "partial",
      expectedThreadId: "thread-partial",
    },
    {
      label: "no provider telemetry",
      lines: [semanticEvent("run-usage")],
      expectedStatus: "unavailable",
      expectedThreadId: null,
    },
  ])("records $label without manufacturing zero usage", async (fixture) => {
    const executed = await executeFakeCodex(fixture.lines);

    expect(executed.result.status).toBe("failed");
    expect(executed.usageEvents).toHaveLength(1);
    expect(executed.usageEvents[0]?.data).toMatchObject({
      status: fixture.expectedStatus,
      thread_id: fixture.expectedThreadId,
      turn_id: null,
      usage: null,
    });
  });
});
