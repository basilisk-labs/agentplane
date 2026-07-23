import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  type ExecutionReceiptGitObservation,
  type ExecutionReceiptObservedCheck,
} from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it } from "vitest";

import { createExecutionReceipt, writeExecutionReceipt } from "./execution-receipt.js";
import { runSupervisedProcess } from "./process-supervision/run.js";
import { isProcessAlive, waitForProcessExit } from "./process-supervision/signals.js";
import type { RunnerInvocation } from "./types.js";

const tempRoots: string[] = [];
const escapedPids: number[] = [];

afterEach(async () => {
  for (const pid of escapedPids.splice(0)) {
    try {
      if (isProcessAlive(pid)) process.kill(pid, "SIGKILL");
    } catch {
      // Best-effort cleanup for a regression fixture.
    }
  }
  await Promise.all(tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

function observedGit(): ExecutionReceiptGitObservation {
  return structuredClone(EXECUTION_RECEIPT_V1_VALID_FIXTURE.git) as ExecutionReceiptGitObservation;
}

function containmentCheck(details: string): ExecutionReceiptObservedCheck {
  return {
    provenance: "supervisor_observed",
    id: "runner.process_containment",
    required: true,
    status: "not_run",
    details,
  };
}

async function waitForFile(filePath: string, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await access(filePath);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }
  await access(filePath);
}

function invocationFor(opts: {
  root: string;
  runDir: string;
  scriptPath: string;
  terminateGraceMs: number;
}): RunnerInvocation {
  return {
    adapter_id: "custom",
    run_id: "run-process-tree",
    work_order_id: "work-order-process-tree",
    repository_root: opts.root,
    run_dir: opts.runDir,
    bundle_path: path.join(opts.runDir, "bundle.json"),
    state_path: path.join(opts.runDir, "run-state.json"),
    events_path: path.join(opts.runDir, "events.jsonl"),
    result_path: path.join(opts.runDir, "result.json"),
    receipt_path: path.join(opts.runDir, "execution-receipt.json"),
    trace_path: path.join(opts.runDir, "agent-trace.jsonl"),
    stderr_path: path.join(opts.runDir, "stderr.log"),
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 64 * 1024,
      capture_stderr: true,
    },
    timeout_policy: {
      wall_clock_ms: 10_000,
      idle_ms: 10_000,
      terminate_grace_ms: opts.terminateGraceMs,
    },
    bootstrap_path: null,
    output_last_message_path: null,
    argv: [process.execPath, opts.scriptPath],
    env: {},
    dry_run: false,
  };
}

describe.skipIf(process.platform === "win32")("POSIX process-group supervision", () => {
  it("does not spend the configured grace period when no descendants remain", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-tree-empty-"));
    tempRoots.push(root);
    const runDir = path.join(root, "run");
    const scriptPath = path.join(root, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(scriptPath, "process.exit(0);\n", "utf8");

    const started = Date.now();
    const result = await runSupervisedProcess({
      invocation: invocationFor({
        root,
        runDir,
        scriptPath,
        terminateGraceMs: 2000,
      }),
      stdin_text: "",
      start_message: "empty process group test",
    });

    expect(result.exit_code).toBe(0);
    expect(result.process_tree).toMatchObject({
      scope: "posix_process_group",
      cleanup_state: "not_needed",
      terminate_sent_at: null,
      kill_sent_at: null,
      residual_alive: false,
      error: null,
      containment_state: "limited",
    });
    expect(result.process_tree.containment_limitation).toContain("new session");
    expect(Date.now() - started).toBeLessThan(1500);
  });

  it("kills a background descendant before returning and prevents a delayed repository write", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-tree-background-"));
    tempRoots.push(root);
    const runDir = path.join(root, "run");
    const scriptPath = path.join(root, "runner.mjs");
    const descendantPidPath = path.join(runDir, "descendant.pid");
    const descendantReadyPath = path.join(runDir, "descendant.ready");
    const lateRepositoryPath = path.join(root, "late-write.txt");
    await mkdir(runDir, { recursive: true });

    const descendantSource = [
      'const { writeFileSync } = require("node:fs");',
      "process.on('SIGTERM', () => {});",
      `writeFileSync(${JSON.stringify(descendantPidPath)}, String(process.pid));`,
      `writeFileSync(${JSON.stringify(descendantReadyPath)}, "ready");`,
      `setTimeout(() => writeFileSync(${JSON.stringify(lateRepositoryPath)}, "late"), 700);`,
      "setInterval(() => {}, 1000);",
    ].join("\n");
    await writeFile(
      scriptPath,
      [
        'import { existsSync } from "node:fs";',
        'import { spawn } from "node:child_process";',
        `spawn(process.execPath, ["-e", ${JSON.stringify(descendantSource)}], { stdio: "ignore" }).unref();`,
        "const deadline = Date.now() + 2000;",
        "const readyPoll = setInterval(() => {",
        `  if (existsSync(${JSON.stringify(descendantReadyPath)})) {`,
        "    clearInterval(readyPoll);",
        "    process.exit(0);",
        "  }",
        "  if (Date.now() >= deadline) {",
        "    clearInterval(readyPoll);",
        "    process.exit(2);",
        "  }",
        "}, 10);",
      ].join("\n"),
      "utf8",
    );

    const result = await runSupervisedProcess({
      invocation: invocationFor({
        root,
        runDir,
        scriptPath,
        terminateGraceMs: 75,
      }),
      stdin_text: "",
      start_message: "background process group test",
    });
    const descendantPidText = await readFile(descendantPidPath, "utf8");
    const descendantPid = Number(descendantPidText.trim());

    expect(result.exit_code).toBe(0);
    expect(result.process_tree).toMatchObject({
      scope: "posix_process_group",
      cleanup_state: "force_killed",
      group_id: result.pid,
      residual_alive: false,
      error: null,
      containment_state: "limited",
    });
    expect(result.process_tree.containment_limitation).toContain("new session");
    expect(result.process_tree.terminate_sent_at).not.toBeNull();
    expect(result.process_tree.kill_sent_at).not.toBeNull();
    expect(isProcessAlive(descendantPid)).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 800));
    await expect(access(lateRepositoryPath)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("does not claim observed success when a detached descendant escapes the process group", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-tree-detached-"));
    tempRoots.push(root);
    const runDir = path.join(root, "run");
    const scriptPath = path.join(root, "runner.mjs");
    const descendantPidPath = path.join(runDir, "detached.pid");
    const descendantReadyPath = path.join(runDir, "detached.ready");
    const releasePath = path.join(runDir, "release");
    const lateRepositoryPath = path.join(root, "late-detached-write.txt");
    await mkdir(runDir, { recursive: true });

    const descendantSource = [
      'const { existsSync, writeFileSync } = require("node:fs");',
      `writeFileSync(${JSON.stringify(descendantPidPath)}, String(process.pid));`,
      `writeFileSync(${JSON.stringify(descendantReadyPath)}, "ready");`,
      "const deadline = Date.now() + 5000;",
      "const releasePoll = setInterval(() => {",
      `  if (existsSync(${JSON.stringify(releasePath)})) {`,
      "    clearInterval(releasePoll);",
      `    writeFileSync(${JSON.stringify(lateRepositoryPath)}, "late");`,
      "    process.exit(0);",
      "  }",
      "  if (Date.now() >= deadline) {",
      "    clearInterval(releasePoll);",
      "    process.exit(3);",
      "  }",
      "}, 10);",
    ].join("\n");
    await writeFile(
      scriptPath,
      [
        'import { existsSync } from "node:fs";',
        'import { spawn } from "node:child_process";',
        `spawn(process.execPath, ["-e", ${JSON.stringify(descendantSource)}], { detached: true, stdio: "ignore" }).unref();`,
        "const deadline = Date.now() + 2000;",
        "const readyPoll = setInterval(() => {",
        `  if (existsSync(${JSON.stringify(descendantReadyPath)})) {`,
        "    clearInterval(readyPoll);",
        "    process.exit(0);",
        "  }",
        "  if (Date.now() >= deadline) {",
        "    clearInterval(readyPoll);",
        "    process.exit(2);",
        "  }",
        "}, 10);",
      ].join("\n"),
      "utf8",
    );

    const invocation = invocationFor({
      root,
      runDir,
      scriptPath,
      terminateGraceMs: 75,
    });
    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "detached process containment test",
    });
    const descendantPidText = await readFile(descendantPidPath, "utf8");
    const descendantPid = Number(descendantPidText.trim());
    escapedPids.push(descendantPid);

    expect(result.exit_code).toBe(0);
    expect(isProcessAlive(descendantPid)).toBe(true);
    expect(result.process_tree).toMatchObject({
      scope: "posix_process_group",
      cleanup_state: "not_needed",
      residual_alive: false,
      containment_state: "limited",
    });
    expect(result.process_tree.containment_limitation).toContain("new session");

    const receipt = createExecutionReceipt({
      run_id: invocation.run_id,
      work_order_id: invocation.work_order_id,
      process_result: result,
      started_at: result.started_at,
      ended_at: result.ended_at,
      capabilities_invoked: [],
      git: observedGit(),
      artifacts: [],
      checks: [containmentCheck(result.process_tree.containment_limitation!)],
    });
    await writeExecutionReceipt({
      receipt_path: invocation.receipt_path,
      receipt,
    });

    expect(receipt.success_policy.outcome).toBe("unverified");
    expect(receipt.success_policy.reasons).toEqual(
      expect.arrayContaining([
        expect.stringContaining("new session"),
        "required observed check was not run: runner.process_containment",
      ]),
    );

    await writeFile(releasePath, "release", "utf8");
    await waitForFile(lateRepositoryPath);
    expect(await readFile(lateRepositoryPath, "utf8")).toBe("late");
    expect(await waitForProcessExit({ pid: descendantPid, timeout_ms: 2000 })).toBe(true);
  });

  it("preserves SIGABRT as a signaled rejected receipt", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-process-sigabrt-"));
    tempRoots.push(root);
    const runDir = path.join(root, "run");
    const scriptPath = path.join(root, "runner.mjs");
    await mkdir(runDir, { recursive: true });
    await writeFile(scriptPath, 'process.kill(process.pid, "SIGABRT");\n', "utf8");

    const invocation = invocationFor({
      root,
      runDir,
      scriptPath,
      terminateGraceMs: 75,
    });
    const result = await runSupervisedProcess({
      invocation,
      stdin_text: "",
      start_message: "SIGABRT observation test",
    });
    const receipt = createExecutionReceipt({
      run_id: invocation.run_id,
      work_order_id: invocation.work_order_id,
      process_result: result,
      started_at: result.started_at,
      ended_at: result.ended_at,
      capabilities_invoked: [],
      git: observedGit(),
      artifacts: [],
      checks: [containmentCheck(result.process_tree.containment_limitation!)],
    });
    await writeExecutionReceipt({
      receipt_path: invocation.receipt_path,
      receipt,
    });

    expect(result.exit_code).toBeNull();
    expect(result.exit_signal).toBe("SIGABRT");
    expect(receipt.process).toMatchObject({
      outcome: "signaled",
      exit_code: null,
      exit_signal: "SIGABRT",
    });
    expect(receipt.success_policy.outcome).toBe("rejected");
    expect(JSON.parse(await readFile(invocation.receipt_path, "utf8"))).toMatchObject({
      process: { outcome: "signaled", exit_signal: "SIGABRT" },
      success_policy: { outcome: "rejected" },
    });
  });
});
