import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { validateExecutionReceipt } from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it, vi } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { createSupervisionClock } from "../process-supervision/clock.js";
import * as processSupervision from "../process-supervision/run.js";
import type { SupervisedProcessResult } from "../process-supervision/run.js";
import { RunnerRunRepository } from "../run-repository.js";
import type { RunnerResult } from "../types.js";
import { writeRunnerExecutionState } from "./base.js";
import { executeSupervisedRunnerAdapter } from "./execute-supervised.js";
import { createRunnerAdapter } from "./index.js";
import { buildRunnerExecutionArtifacts } from "./runtime-shared.js";

async function makeGitTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  return root;
}

function failedProcessResult(): SupervisedProcessResult {
  return {
    exit_code: null,
    exit_signal: "SIGTERM",
    stdout_tail: "",
    stderr_tail: "",
    stdout_bytes: 0,
    stderr_bytes: 0,
    pid: 4242,
    started_at: "2026-07-24T10:00:00.000Z",
    ended_at: "2026-07-24T10:00:01.000Z",
    cancel_requested_at: null,
    cancel_signal: null,
    timeout_reason: null,
    timeout_requested_at: null,
    terminate_sent_at: "2026-07-24T10:00:00.500Z",
    kill_sent_at: null,
    force_killed: false,
    process_tree: {
      scope: "posix_process_group",
      group_id: 4242,
      cleanup_state: "terminated",
      terminate_sent_at: "2026-07-24T10:00:00.500Z",
      kill_sent_at: null,
      completed_at: "2026-07-24T10:00:01.000Z",
      residual_alive: false,
      error: null,
      containment_state: "limited",
      containment_limitation: "test process-group limitation",
    },
    heartbeat_at: "2026-07-24T10:00:01.000Z",
    trace_artifact_path: null,
    trace_archive_path: null,
    stderr_artifact_path: null,
    stderr_archive_path: null,
  };
}

describe("executeSupervisedRunnerAdapter supervision failures", () => {
  const tempRoots: string[] = [];

  afterEach(async () => {
    vi.restoreAllMocks();
    await Promise.all(
      tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
    );
  });

  it("persists cleanup evidence when the supervisor rejects an over-budget process", async () => {
    const root = await makeGitTempRoot("agentplane-supervision-error-");
    tempRoots.push(root);
    const scriptPath = path.join(root, "runner.mjs");
    await writeFile(
      scriptPath,
      [
        "for (let index = 0; index < 1000; index += 1) {",
        "  process.stdout.write(`over-budget-${index}\\n`);",
        "}",
        "setInterval(() => {}, 1000);",
      ].join("\n"),
      "utf8",
    );
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: [process.execPath, scriptPath],
    };
    const adapter = createRunnerAdapter(config);
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      gitRoot: root,
      mode: "execute",
      runId: "run-supervision-error",
      taskId: "202607241000-SUPERR",
    });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-supervision-error"));
    const invocation = await adapter.prepare(bundle);
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Execute the prepared bundle.\n",
      invocation,
    });

    const result = await executeSupervisedRunnerAdapter({
      invocation,
      assertInvocation: (input) => {
        expect(input).toBe(invocation);
      },
      readStdinText: () => Promise.resolve(""),
      startMessage: "supervision failure test started",
      buildArtifacts: ({ invocation: input, processResult }) =>
        buildRunnerExecutionArtifacts({
          invocation: input,
          trace_artifact_path: processResult?.trace_artifact_path,
          trace_archive_path: processResult?.trace_archive_path,
          stderr_artifact_path: processResult?.stderr_artifact_path,
          stderr_archive_path: processResult?.stderr_archive_path,
        }),
      buildBaseResult: () => {
        throw new Error("unexpected successful process result");
      },
      applyManifest: ({ base }) => base,
      capabilitiesUsed: () => ["custom:test"],
      successEventMessage: () => "unexpected success",
      failureSummary: "Supervised runner failed.",
      failureEventType: "runner_execute_error",
      failureEventMessage: (failed) => failed.stderr_summary ?? "supervision failed",
      maxOutputBytes: 256,
    });

    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status?: string;
      result?: { stderr_summary?: string };
      supervision?: {
        process_tree?: {
          scope?: string;
          cleanup_state?: string;
          residual_alive?: boolean | null;
        };
      };
    };
    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      process?: {
        process_tree?: {
          scope?: string;
          cleanup_state?: string;
          residual_alive?: boolean | null;
        };
      };
    };

    expect(result).toMatchObject({
      status: "failed",
      stderr_summary: "Runner output exceeded max_output_bytes=256.",
    });
    expect(state).toMatchObject({
      status: "failed",
      result: {
        stderr_summary: "Runner output exceeded max_output_bytes=256.",
      },
      supervision: {
        process_tree: {
          scope: process.platform === "win32" ? "direct_child_only" : "posix_process_group",
          residual_alive: false,
        },
      },
    });
    expect(state.supervision?.process_tree?.cleanup_state).toMatch(
      /^(not_needed|terminated|force_killed)$/u,
    );
    expect(receipt.process?.process_tree).toEqual(state.supervision?.process_tree);
    expect(result.output_paths).toEqual(
      expect.arrayContaining([invocation.trace_path, invocation.receipt_path]),
    );
  });

  it("terminalizes with a valid receipt across forward and backward wall-clock steps", async () => {
    const root = await makeGitTempRoot("agentplane-clock-regression-");
    tempRoots.push(root);
    const scriptPath = path.join(root, "runner.mjs");
    await writeFile(
      scriptPath,
      [
        String.raw`process.stdout.write("wall-forward\n");`,
        "await new Promise((resolve) => setTimeout(resolve, 20));",
        String.raw`process.stdout.write("wall-backward\n");`,
      ].join("\n"),
      "utf8",
    );
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: [process.execPath, scriptPath],
    };
    const adapter = createRunnerAdapter(config);
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      gitRoot: root,
      mode: "execute",
      runId: "run-clock-regression",
      taskId: "202607241003-CLKREG",
    });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-clock-regression"));
    const invocation = await adapter.prepare(bundle);
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Execute the prepared bundle.\n",
      invocation,
    });
    let wallNowMs = Date.parse("2026-07-24T10:00:00.000Z");
    const supervisionClock = createSupervisionClock({
      wall_now_ms: () => wallNowMs,
    });

    const result = await executeSupervisedRunnerAdapter({
      invocation,
      supervisionClock,
      assertInvocation: (input) => {
        expect(input).toBe(invocation);
      },
      readStdinText: () => Promise.resolve(""),
      observeStdoutLine: (line) => {
        if (line === "wall-forward") wallNowMs += 3_600_000;
        if (line === "wall-backward") wallNowMs -= 7_200_000;
      },
      materializeResult: () => {
        wallNowMs -= 3_600_000;
        return Promise.resolve();
      },
      startMessage: "clock-regression test started",
      buildArtifacts: ({ invocation: input, processResult }) =>
        buildRunnerExecutionArtifacts({
          invocation: input,
          trace_artifact_path: processResult?.trace_artifact_path,
          trace_archive_path: processResult?.trace_archive_path,
          stderr_artifact_path: processResult?.stderr_artifact_path,
          stderr_archive_path: processResult?.stderr_archive_path,
        }),
      buildBaseResult: ({ processResult, artifacts, output_paths }) => ({
        status: "success",
        exit_code: processResult.exit_code ?? 0,
        started_at: processResult.started_at,
        ended_at: processResult.ended_at,
        summary: "clock regression process completed",
        stdout_summary: processResult.stdout_tail,
        output_paths,
        artifacts,
        capabilities_used: ["custom:test"],
        metrics: {
          duration_ms: Math.max(
            0,
            Date.parse(processResult.ended_at) - Date.parse(processResult.started_at),
          ),
          stdout_bytes: processResult.stdout_bytes,
          stderr_bytes: processResult.stderr_bytes,
        },
      }),
      applyManifest: ({ base }) => base,
      capabilitiesUsed: () => ["custom:test"],
      successEventMessage: () => "clock-regression test finished",
      failureSummary: "Clock-regression runner failed.",
      failureEventType: "runner_execute_error",
      failureEventMessage: (failed) => failed.stderr_summary ?? "clock-regression failed",
    });

    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status?: string;
      result?: { started_at?: string; ended_at?: string };
      supervision?: { process_tree?: { completed_at?: string } };
    };
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(invocation.receipt_path, "utf8")),
    );
    const eventsText = await readFile(invocation.events_path, "utf8");
    const events = eventsText
      .trim()
      .split("\n")
      .map(
        (line) =>
          JSON.parse(line) as {
            at?: string;
            type?: string;
            data?: Record<string, unknown>;
          },
      );
    const clockDiagnosticEvent = events.find(
      (event) => event.type === "runner_wall_clock_regression_observed",
    );

    expect(result.status).toBe("success");
    expect(state.status).toBe("success");
    expect(Date.parse(receipt.process.ended_at)).toBeGreaterThanOrEqual(
      Date.parse(receipt.process.started_at),
    );
    expect(Date.parse(receipt.process.process_tree.completed_at)).toBeGreaterThanOrEqual(
      Date.parse(receipt.process.started_at),
    );
    expect(Date.parse(receipt.process.process_tree.completed_at)).toBeLessThanOrEqual(
      Date.parse(receipt.process.ended_at),
    );
    expect(receipt.process.metrics.duration_ms).toBeLessThan(60_000);
    expect(state.supervision?.process_tree?.completed_at).toBe(
      receipt.process.process_tree.completed_at,
    );
    expect(clockDiagnosticEvent?.data?.logical_time_source).toBe("monotonic_projection");
    expect(typeof clockDiagnosticEvent?.data?.wall_clock_regression_count).toBe("number");
    const eventTimes = events.map((event) => Date.parse(event.at ?? ""));
    expect(eventTimes.every((at, index) => index === 0 || at >= eventTimes[index - 1]!)).toBe(true);
  });

  it("terminalizes prepared state when the post-spawn running-state write did not commit", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-prepared-terminal-"));
    tempRoots.push(root);
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["test-runner"],
    };
    const adapter = createRunnerAdapter(config);
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      gitRoot: root,
      mode: "execute",
      runId: "run-prepared-terminal",
      taskId: "202607241001-PREPST",
    });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-prepared-terminal"));
    const invocation = await adapter.prepare(bundle);
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Execute the prepared bundle.\n",
      invocation,
    });
    const repository = RunnerRunRepository.fromInvocation(invocation);
    const processResult = failedProcessResult();
    const result: RunnerResult = {
      status: "failed",
      exit_code: 1,
      started_at: processResult.started_at,
      ended_at: processResult.ended_at,
      stderr_summary: "spawn-state write failed",
    };

    const terminal = await writeRunnerExecutionState({
      repository,
      result,
      processResult,
      command: invocation.argv.join(" "),
    });

    expect(terminal).toMatchObject({
      status: "failed",
      result: {
        stderr_summary: "spawn-state write failed",
      },
      supervision: {
        pid: 4242,
        process_tree: processResult.process_tree,
      },
    });
  });

  it("terminalizes an unknown child exit as a supervisor_error receipt", async () => {
    const root = await makeGitTempRoot("agentplane-unknown-exit-");
    tempRoots.push(root);
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["test-runner"],
    };
    const adapter = createRunnerAdapter(config);
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      gitRoot: root,
      mode: "execute",
      runId: "run-unknown-exit",
      taskId: "202607241002-UNKEXT",
    });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-unknown-exit"));
    const invocation = await adapter.prepare(bundle);
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Execute the prepared bundle.\n",
      invocation,
    });
    const processResult: SupervisedProcessResult = {
      ...failedProcessResult(),
      exit_code: null,
      exit_signal: null,
      process_tree: {
        ...failedProcessResult().process_tree,
        cleanup_state: "terminated",
        residual_alive: false,
        error: null,
      },
    };
    vi.spyOn(processSupervision, "runSupervisedProcess").mockRejectedValueOnce(
      new processSupervision.SupervisedProcessExecutionError(
        new Error("supervisor lost the child exit observation"),
        processResult,
      ),
    );

    const result = await adapter.execute(invocation);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status?: string;
      supervision?: {
        exit_signal?: string | null;
        process_tree?: SupervisedProcessResult["process_tree"];
      };
    };
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(invocation.receipt_path, "utf8")),
    );

    expect(result).toMatchObject({
      status: "failed",
      stderr_summary: "supervisor lost the child exit observation",
    });
    expect(state).toMatchObject({
      status: "failed",
      supervision: {
        exit_signal: null,
        process_tree: processResult.process_tree,
      },
    });
    expect(receipt.process).toMatchObject({
      outcome: "supervisor_error",
      exit_code: null,
      exit_signal: null,
      process_tree: processResult.process_tree,
    });
    expect(receipt.success_policy.outcome).toBe("rejected");
  });
});
