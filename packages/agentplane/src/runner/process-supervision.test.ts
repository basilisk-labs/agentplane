import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { runSupervisedProcess } from "./process-supervision.js";
import { compressedTraceArtifactPath, readTraceArtifactText } from "./trace-artifacts.js";

async function waitForTraceMatch(opts: {
  path: string;
  timeoutMs: number;
  matcher: (contents: string) => boolean;
}): Promise<string> {
  const started = Date.now();
  let lastContents = "";
  while (Date.now() - started < opts.timeoutMs) {
    const contents = await readFile(opts.path, "utf8").catch((err: NodeJS.ErrnoException) => {
      if (err.code === "ENOENT") {
        return "";
      }
      throw err;
    });
    lastContents = contents;
    if (opts.matcher(contents)) {
      return contents;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return lastContents;
}

describe("runSupervisedProcess", () => {
  let tempDir = "";

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
      tempDir = "";
    }
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
        "}, 2000);",
      ].join("\n"),
      "utf8",
    );

    const invocation = {
      adapter_id: "custom",
      run_id: "run-stream",
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
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
        timeoutMs: 1900,
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
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
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

  it("applies trace redaction and gzip retention policy after successful runs", async () => {
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
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
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
    expect(result.trace_artifact_path).toBe(compressedTraceArtifactPath(invocation.trace_path));
    expect(result.trace_archive_path).toBeNull();
    expect(result.stderr_artifact_path).toBe(compressedTraceArtifactPath(invocation.stderr_path));
    expect(result.stderr_archive_path).toBeNull();
    expect(await readFile(invocation.trace_path, "utf8").catch(() => "")).toBe("");
    expect(await readFile(invocation.stderr_path, "utf8").catch(() => "")).toBe("");
    const trace = await readTraceArtifactText(invocation.trace_path);
    expect(trace).toContain("[REDACTED]");
    expect(trace).not.toContain("SECRET_TOKEN");
    const stderr = await readTraceArtifactText(invocation.stderr_path);
    expect(stderr).toContain("[REDACTED]");
    expect(stderr).not.toContain("SECRET_TOKEN");
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
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
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
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
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
});
