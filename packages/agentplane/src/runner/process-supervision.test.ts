import { access, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";
import { waitForCondition } from "@agentplane/testkit";

import { captureRunnerArtifactDirectoryBoundary } from "./run-directory-boundary.js";
import {
  runSupervisedProcess,
  SupervisedProcessExecutionError,
} from "./process-supervision/run.js";
import { isProcessAlive } from "./process-supervision/signals.js";
import {
  applyFinalTraceRetention,
  compressedTraceArtifactPath,
  readTraceArtifactText,
} from "./trace-artifacts.js";

async function waitForTraceMatch(opts: {
  path: string;
  timeoutMs: number;
  matcher: (contents: string) => boolean;
}): Promise<string> {
  return await waitForCondition({
    description: `trace match in ${opts.path}`,
    timeoutMs: opts.timeoutMs,
    pollMs: 25,
    read: async () =>
      await readFile(opts.path, "utf8").catch((err: NodeJS.ErrnoException) => {
        if (err.code === "ENOENT") {
          return "";
        }
        throw err;
      }),
    predicate: opts.matcher,
  });
}

describe("runSupervisedProcess", () => {
  let tempDir = "";

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
      tempDir = "";
    }
  });

  it("checks the run-directory boundary immediately before process spawn", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-pre-spawn-"));
    const runDir = path.join(tempDir, "run");
    const markerPath = path.join(tempDir, "spawned.txt");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      'await import("node:fs/promises").then(({ writeFile }) => writeFile(new URL("./spawned.txt", import.meta.url), "spawned", "utf8"));\n',
      "utf8",
    );
    const invocation = {
      adapter_id: "custom",
      run_id: "run-pre-spawn",
      work_order_id: "run-pre-spawn",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;
    const boundary = await captureRunnerArtifactDirectoryBoundary({
      run_dir: runDir,
      artifact_root: tempDir,
      artifact_paths: [
        invocation.bundle_path,
        invocation.state_path,
        invocation.events_path,
        invocation.result_path,
        invocation.receipt_path,
        invocation.trace_path,
        invocation.stderr_path,
      ],
    });
    await rename(runDir, path.join(tempDir, "original-run"));
    await mkdir(runDir);

    await expect(
      runSupervisedProcess({
        invocation,
        stdin_text: "",
        start_message: "must not start",
        assert_artifact_boundary: boundary.assertStable,
      }),
    ).rejects.toThrow(/run_dir identity changed immediately before spawning child process/u);
    await expect(readFile(markerPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("streams stdout/stderr into trace artifacts before process exit", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        String.raw`process.stdout.write('{"type":"first"}\n');`,
        "setTimeout(() => {",
        String.raw`  process.stderr.write('stderr line\n');`,
        "}, 300);",
        "setTimeout(() => {",
        String.raw`  process.stdout.write('plain stdout\n');`,
        "}, 600);",
        "setTimeout(() => {",
        "  process.exit(0);",
        "}, 5000);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-stream",
      work_order_id: "run-stream",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const resultPromise = runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });
    let completed = false;
    void resultPromise.finally(() => {
      completed = true;
    });

    try {
      const partialTrace = await waitForTraceMatch({
        path: invocation.trace_path,
        timeoutMs: 4500,
        matcher: (contents) =>
          contents.includes('"stream":"stdout"') && contents.includes('"type":"first"'),
      });
      expect(completed).toBe(false);
      expect(partialTrace).toContain('"stream":"stdout"');
      expect(partialTrace).toContain('"type":"first"');

      const result = await resultPromise;

      expect(result.exit_code).toBe(0);
      expect(result.stdout_bytes).toBeGreaterThan(0);
      expect(result.stderr_bytes).toBeGreaterThan(0);
      expect(result.stdout_tail).toContain("plain stdout");
      expect(result.stderr_tail).toContain("stderr line");

      const fullTrace = await readFile(invocation.trace_path, "utf8");
      expect(fullTrace).toContain('"kind":"json_event"');
      expect(fullTrace).toContain('"kind":"text"');
      expect(fullTrace).toContain('"stream":"stderr"');
      expect(await readFile(invocation.stderr_path, "utf8")).toContain("stderr line");
    } finally {
      await resultPromise.then(
        () => null,
        () => null,
      );
    }
  });

  it("preserves trace event ordering across buffered async writes", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-order-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        "for (let i = 0; i < 50; i += 1) {",
        "  process.stdout.write(`stdout-${i}\\n`);",
        "  process.stderr.write(`stderr-${i}\\n`);",
        "}",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-ordering",
      work_order_id: "run-ordering",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.exit_code).toBe(0);
    const trace = await readFile(invocation.trace_path, "utf8");
    const events = trace
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { seq: number; raw: string });
    expect(events).toHaveLength(100);
    expect(events.map((event) => event.seq)).toEqual(
      Array.from({ length: 100 }, (_, index) => index + 1),
    );
    expect(events.map((event) => event.raw).toSorted()).toEqual(
      Array.from({ length: 50 }, (_, index) => [`stderr-${index}`, `stdout-${index}`])
        .flat()
        .toSorted(),
    );
    expect(await readFile(invocation.stderr_path, "utf8")).toContain("stderr-49");
  });

  it("terminates newline-heavy output after the supervision byte budget", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-output-budget-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    const pidPath = path.join(tempDir, "runner.pid");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        'await import("node:fs/promises").then(({ writeFile }) => writeFile(new URL("./runner.pid", import.meta.url), String(process.pid), "utf8"));',
        "for (let i = 0; i < 1000; i += 1) {",
        "  process.stdout.write(`short-line-${i}\\n`);",
        "}",
        "setTimeout(() => process.exit(0), 5000);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-output-budget",
      work_order_id: "run-output-budget",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const thrown = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
      max_output_bytes: 256,
    }).then(
      () => null,
      (error: unknown) => error,
    );

    if (!(thrown instanceof SupervisedProcessExecutionError)) {
      throw new Error("Expected a typed supervision error.");
    }
    expect(thrown.primary_error.message).toBe("Runner output exceeded max_output_bytes=256.");
    expect(Number.isInteger(thrown.process_result.pid)).toBe(true);
    expect(thrown.process_result.process_tree).toMatchObject({
      scope: process.platform === "win32" ? "direct_child_only" : "posix_process_group",
      residual_alive: false,
    });
    expect(["not_needed", "terminated", "force_killed"]).toContain(
      thrown.process_result.process_tree.cleanup_state,
    );
    const pidText = await readFile(pidPath, "utf8");
    const runnerPid = Number(pidText.trim());
    expect(isProcessAlive(runnerPid)).toBe(false);
  });

  it("flushes buffered trace and stderr writes before resolving failed runs", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-failure-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        String.raw`process.stdout.write('final stdout without newline');`,
        String.raw`process.stderr.write('final stderr without newline');`,
        "process.exit(7);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-failure-flush",
      work_order_id: "run-failure-flush",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.exit_code).toBe(7);
    expect(await readFile(invocation.trace_path, "utf8")).toContain("final stdout without newline");
    expect(await readFile(invocation.trace_path, "utf8")).toContain("final stderr without newline");
    expect(await readFile(invocation.stderr_path, "utf8")).toBe("final stderr without newline");
  });

  it("honors trace policy knobs for raw capture, stderr capture, and tail size", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-policy-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        String.raw`process.stdout.write('0123456789\n');`,
        String.raw`process.stderr.write('stderr line\n');`,
        "setTimeout(() => process.exit(0), 25);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-policy",
      work_order_id: "run-policy",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "off",
        max_tail_bytes: 4,
        capture_stderr: false,
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.stdout_tail).toBe("789\n");
    expect(result.stderr_tail).toBe("ine\n");
    expect(await readFile(invocation.trace_path, "utf8").catch(() => "")).toBe("");
    expect(await readFile(invocation.stderr_path, "utf8").catch(() => "")).toBe("");
  });

  it("defers success-only trace removal until the final runner verdict", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-retention-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        String.raw`process.stdout.write('token=SECRET_TOKEN\n');`,
        String.raw`process.stderr.write('stderr SECRET_TOKEN\n');`,
        "setTimeout(() => process.exit(0), 25);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-retention",
      work_order_id: "run-retention",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
        retention: "remove_on_success",
        compression: "gzip",
        redact_patterns: ["SECRET_TOKEN"],
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.exit_code).toBe(0);
    expect(result.stdout_tail).toContain("[REDACTED]");
    expect(result.stdout_tail).not.toContain("SECRET_TOKEN");
    expect(result.stderr_tail).toContain("[REDACTED]");
    expect(result.trace_artifact_path).toBe(invocation.trace_path);
    expect(result.trace_archive_path).toBe(compressedTraceArtifactPath(invocation.trace_path));
    expect(result.stderr_artifact_path).toBe(invocation.stderr_path);
    expect(result.stderr_archive_path).toBe(compressedTraceArtifactPath(invocation.stderr_path));
    expect(await readFile(invocation.trace_path, "utf8")).toContain("[REDACTED]");
    expect(await readFile(invocation.stderr_path, "utf8")).toContain("[REDACTED]");
    const trace = await readTraceArtifactText(invocation.trace_path);
    expect(trace).toContain("[REDACTED]");
    expect(trace).not.toContain("SECRET_TOKEN");
    const stderr = await readTraceArtifactText(invocation.stderr_path);
    expect(stderr).toContain("[REDACTED]");
    expect(stderr).not.toContain("SECRET_TOKEN");

    const [finalTrace, finalStderr] = await Promise.all([
      applyFinalTraceRetention({
        file_path: invocation.trace_path,
        policy: invocation.trace_policy,
        run_status: "success",
      }),
      applyFinalTraceRetention({
        file_path: invocation.stderr_path,
        policy: invocation.trace_policy,
        run_status: "success",
      }),
    ]);
    expect(finalTrace).toEqual({
      artifact_path: compressedTraceArtifactPath(invocation.trace_path),
      archive_path: null,
    });
    expect(finalStderr).toEqual({
      artifact_path: compressedTraceArtifactPath(invocation.stderr_path),
      archive_path: null,
    });
    expect(await readFile(invocation.trace_path, "utf8").catch(() => "")).toBe("");
    expect(await readFile(invocation.stderr_path, "utf8").catch(() => "")).toBe("");
  });

  it("decodes split UTF-8 and redacts secrets split across provider chunks", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-stream-decoding-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        "const stdoutPayload = Buffer.from('Привет SECRET_TOKEN\\n', 'utf8');",
        "const stderrPayload = Buffer.from('Ошибка SECRET_TOKEN\\n', 'utf8');",
        "const stdoutSecret = stdoutPayload.indexOf(Buffer.from('SECRET_TOKEN'));",
        "const stderrSecret = stderrPayload.indexOf(Buffer.from('SECRET_TOKEN'));",
        "process.stdout.write(stdoutPayload.subarray(0, 1));",
        "process.stderr.write(stderrPayload.subarray(0, stderrSecret + 3));",
        "setTimeout(() => {",
        "  process.stdout.write(stdoutPayload.subarray(1, stdoutSecret + 3));",
        "  process.stderr.write(stderrPayload.subarray(stderrSecret + 3));",
        "}, 30);",
        "setTimeout(() => {",
        "  process.stdout.write(stdoutPayload.subarray(stdoutSecret + 3));",
        "}, 60);",
        "setTimeout(() => process.exit(0), 90);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-stream-decoding",
      work_order_id: "run-stream-decoding",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
        redact_patterns: ["SECRET_TOKEN"],
      },
      timeout_policy: {
        wall_clock_ms: 10_000,
        idle_ms: 10_000,
        terminate_grace_ms: 100,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;
    const observedLines: string[] = [];

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
      observe_stdout_line: (line) => observedLines.push(line),
    });

    expect(observedLines).toEqual(["Привет SECRET_TOKEN"]);
    expect(result.stdout_tail).toBe("Привет [REDACTED]\n");
    expect(result.stderr_tail).toBe("Ошибка [REDACTED]\n");
    expect(result.stdout_tail).not.toContain("�");
    expect(result.stderr_tail).not.toContain("SECRET_TOKEN");
    expect(await readFile(invocation.trace_path, "utf8")).not.toContain("SECRET_TOKEN");
    expect(await readFile(invocation.stderr_path, "utf8")).toBe("Ошибка [REDACTED]\n");
  });

  it("classifies idle timeouts and records termination timestamps", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-idle-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      ["setTimeout(() => {", String.raw`  process.stdout.write('too late\n');`, "}, 2000);"].join(
        "\n",
      ),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-idle-timeout",
      work_order_id: "run-idle-timeout",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 5000,
        idle_ms: 100,
        terminate_grace_ms: 250,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.timeout_reason).toBe("idle");
    expect(result.timeout_requested_at).toBeTruthy();
    expect(result.terminate_sent_at).toBeTruthy();
    expect(result.kill_sent_at).toBeNull();
    expect(result.force_killed).toBe(false);
    expect(result.exit_signal).toBe("SIGTERM");
  });

  it("classifies wall-clock timeouts and force-kill escalation", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-supervision-wall-"));
    const runDir = path.join(tempDir, "run");
    const scriptPath = path.join(tempDir, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(
      scriptPath,
      [
        "process.on('SIGTERM', () => {});",
        String.raw`setInterval(() => process.stdout.write('tick\n'), 20);`,
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-wall-timeout",
      work_order_id: "run-wall-timeout",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "execution-receipt.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 64 * 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 120,
        idle_ms: 1000,
        terminate_grace_ms: 0,
      },
      bootstrap_path: null,
      output_last_message_path: null,
      argv: [process.execPath, scriptPath],
      env: {},
      dry_run: false,
    } as const;

    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "test runner started",
    });

    expect(result.timeout_reason).toBe("wall_clock");
    expect(result.timeout_requested_at).toBeTruthy();
    expect(result.terminate_sent_at).toBeTruthy();
    expect(result.kill_sent_at).toBeTruthy();
    expect(result.force_killed).toBe(true);
    expect(["SIGTERM", "SIGKILL"]).toContain(result.exit_signal);
  });

  it.skipIf(process.platform === "win32")(
    "starts controls after running state and durably serializes cancellation metadata",
    async () => {
      tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-cancel-state-"));
      const runDir = path.join(tempDir, "run");
      const scriptPath = path.join(tempDir, "runner.mjs");
      const readyPath = path.join(runDir, "ready");
      await mkdir(runDir, { recursive: true });
      await writeFile(
        scriptPath,
        [
          'import { writeFileSync } from "node:fs";',
          `writeFileSync(${JSON.stringify(readyPath)}, "ready");`,
          'process.on("SIGTERM", () => {});',
          "setInterval(() => {}, 1000);",
        ].join("\n"),
        "utf8",
      );

      const invocation = {
        adapter_id: "custom",
        run_id: "run-cancel-state",
        work_order_id: "run-cancel-state",
        repository_root: tempDir,
        run_dir: runDir,
        bundle_path: path.join(runDir, "bundle.json"),
        state_path: path.join(runDir, "run-state.json"),
        events_path: path.join(runDir, "events.jsonl"),
        result_path: path.join(runDir, "result.json"),
        receipt_path: path.join(runDir, "execution-receipt.json"),
        trace_path: path.join(runDir, "agent-trace.jsonl"),
        stderr_path: path.join(runDir, "stderr.log"),
        trace_policy: {
          mode: "raw",
          max_tail_bytes: 64 * 1024,
          capture_stderr: true,
        },
        timeout_policy: {
          wall_clock_ms: 10_000,
          idle_ms: 10_000,
          terminate_grace_ms: 0,
        },
        bootstrap_path: null,
        output_last_message_path: null,
        argv: [process.execPath, scriptPath],
        env: {},
        dry_run: false,
      } as const;
      const createdAt = "2026-07-24T00:00:00.000Z";
      await writeFile(
        invocation.state_path,
        `${JSON.stringify({
          schema_version: 1,
          runner_api_version: "1",
          run_id: invocation.run_id,
          adapter_id: invocation.adapter_id,
          target: { kind: "task", task_id: "task-cancel-state" },
          status: "prepared",
          mode: "execute",
          bundle_path: invocation.bundle_path,
          result_path: invocation.result_path,
          receipt_path: invocation.receipt_path,
          bootstrap_path: null,
          events_path: invocation.events_path,
          trace_path: invocation.trace_path,
          stderr_path: invocation.stderr_path,
          trace_policy: invocation.trace_policy,
          timeout_policy: invocation.timeout_policy,
          created_at: createdAt,
          updated_at: createdAt,
        })}\n`,
        "utf8",
      );

      const result = await runSupervisedProcess({
        invocation,
        stdin_text: "",
        start_message: "durable cancellation metadata test",
        read_cancellation_intent: async () =>
          await access(readyPath).then(
            () => ({
              requested_at: "2026-07-24T00:00:01.000Z",
              signal: "SIGTERM" as const,
            }),
            () => null,
          ),
      });
      const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
        status: string;
        supervision?: Record<string, unknown>;
      };
      const eventsText = await readFile(invocation.events_path, "utf8");
      const events = eventsText
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line) as { type: string });

      expect(result.cancel_requested_at).toBe("2026-07-24T00:00:01.000Z");
      expect(result.cancel_signal).toBe("SIGKILL");
      expect(result.kill_sent_at).toBeTruthy();
      expect(result.force_killed).toBe(true);
      expect(state).toMatchObject({
        status: "running",
        supervision: {
          cancel_requested_at: "2026-07-24T00:00:01.000Z",
          cancel_signal: "SIGKILL",
          force_killed: true,
        },
      });
      expect(typeof state.supervision?.terminate_sent_at).toBe("string");
      expect(typeof state.supervision?.kill_sent_at).toBe("string");
      expect(events.findIndex((event) => event.type === "runner_execute_start")).toBeLessThan(
        events.findIndex((event) => event.type === "runner_cancel_signal_sent"),
      );
    },
  );

  it.skipIf(process.platform === "win32")(
    "does not attribute an external SIGKILL to the supervisor",
    async () => {
      tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-external-sigkill-"));
      const runDir = path.join(tempDir, "run");
      const scriptPath = path.join(tempDir, "runner.mjs");
      await mkdir(runDir, { recursive: true });
      await writeFile(scriptPath, 'process.kill(process.pid, "SIGKILL");\n', "utf8");

      const invocation = {
        adapter_id: "custom",
        run_id: "run-external-sigkill",
        work_order_id: "run-external-sigkill",
        repository_root: tempDir,
        run_dir: runDir,
        bundle_path: path.join(runDir, "bundle.json"),
        state_path: path.join(runDir, "run-state.json"),
        events_path: path.join(runDir, "events.jsonl"),
        result_path: path.join(runDir, "result.json"),
        receipt_path: path.join(runDir, "execution-receipt.json"),
        trace_path: path.join(runDir, "agent-trace.jsonl"),
        stderr_path: path.join(runDir, "stderr.log"),
        trace_policy: {
          mode: "raw",
          max_tail_bytes: 64 * 1024,
          capture_stderr: true,
        },
        timeout_policy: {
          wall_clock_ms: 10_000,
          idle_ms: 10_000,
          terminate_grace_ms: 100,
        },
        bootstrap_path: null,
        output_last_message_path: null,
        argv: [process.execPath, scriptPath],
        env: {},
        dry_run: false,
      } as const;

      const result = await runSupervisedProcess({
        invocation,
        stdin_text: "",
        start_message: "external SIGKILL test",
      });

      expect(result.exit_signal).toBe("SIGKILL");
      expect(result.kill_sent_at).toBeNull();
      expect(result.force_killed).toBe(false);
      expect(result.cancel_signal).toBeNull();
    },
  );
});
