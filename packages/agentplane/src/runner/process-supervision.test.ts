import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { runSupervisedProcess } from "./process-supervision.js";

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
        "}, 700);",
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

    const partialTrace = await waitForTraceMatch({
      path: invocation.trace_path,
      timeoutMs: 500,
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
});
