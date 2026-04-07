import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "wait-remote-pr-checks.mjs");

const tempRoots: string[] = [];
type RunScriptResult = { exitCode: number; stdout: string; stderr: string };
type RunScriptOptions = { env?: Record<string, string> };

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-remote-check-wait-"));
  tempRoots.push(root);
  return root;
}

async function writeExecutable(root: string, relativePath: string, content: string) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${content}\n`, { encoding: "utf8", mode: 0o755 });
  return target;
}

async function writeGhMock(root: string) {
  const stateFile = path.join(root, "gh-state.json");
  const callLog = path.join(root, "gh-calls.jsonl");
  await writeFile(
    stateFile,
    JSON.stringify(
      {
        prViewCalls: 0,
        statusCalls: 0,
        checkRunCalls: 0,
        protectionCalls: 0,
        repoViewCalls: 0,
      },
      null,
      2,
    ),
    "utf8",
  );

  const script = [
    "#!/usr/bin/env node",
    "const fs = require('node:fs');",
    "const statePath = process.env.GH_STATE_FILE;",
    "const logPath = process.env.GH_CALL_LOG;",
    "const scenario = process.env.GH_SCENARIO || 'success';",
    "const args = process.argv.slice(2);",
    "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
    "const state = statePath && fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : {};",
    "function save(next) { if (statePath) fs.writeFileSync(statePath, JSON.stringify(next, null, 2)); }",
    "function ok(payload) { process.stdout.write(`${JSON.stringify(payload)}\\n`); process.exit(0); }",
    "function fail(message, code = 1) { process.stderr.write(`${message}\\n`); process.exit(code); }",
    "function nextCount(key) { const next = { ...state, [key]: Number(state[key] || 0) + 1 }; save(next); return next[key]; }",
    "function prPayload() { return { number: 123, headRefOid: 'head-sha-1', baseRefName: 'main', url: 'https://github.com/basilisk-labs/agentplane/pull/123', title: 'Check polling' }; }",
    "function repoPayload() { return { nameWithOwner: 'basilisk-labs/agentplane' }; }",
    "function protectionPayload() { return { required_status_checks: { strict: true, contexts: ['Core CI / test', 'Docs CI / docs'], checks: [ { context: 'Core CI / test', app_id: 123 }, { context: 'Docs CI / docs', app_id: 456 } ] } }; }",
    "function statusPayload() {",
    "  const attempt = Number(state.statusCalls || 0);",
    "  const pending = { state: 'pending', statuses: [ { context: 'Core CI / test', state: 'pending', description: 'running' }, { context: 'Docs CI / docs', state: 'pending', description: 'queued' } ] };",
    "  const success = { state: 'success', statuses: [ { context: 'Core CI / test', state: 'success', description: 'done' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "  return scenario === 'timeout' ? pending : attempt === 0 ? pending : success;",
    "}",
    "function checkRunsPayload() { return { total_count: 0, check_runs: [] }; }",
    "function transientFailureOnce() {",
    "  const attempt = Number(state.prViewCalls || 0);",
    "  if (scenario === 'retry-transient' && attempt === 0) {",
    "    nextCount('prViewCalls');",
    String.raw`    fail('gh: Post "https://api.github.com/graphql": EOF');`,
    "  }",
    "}",
    "if (args[0] === 'repo' && args[1] === 'view') { nextCount('repoViewCalls'); ok(repoPayload()); }",
    "if (args[0] === 'pr' && args[1] === 'view') {",
    "  transientFailureOnce();",
    "  nextCount('prViewCalls');",
    "  if (scenario === 'auth-failure') fail('gh: Authentication required');",
    "  ok(prPayload());",
    "}",
    String.raw`if (args[0] === 'api' && /\/branches\/main\/protection$/.test(args[1])) {`,
    "  nextCount('protectionCalls');",
    "  if (scenario === 'auth-failure') fail('gh: Authentication required');",
    "  ok(protectionPayload());",
    "}",
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/status$/.test(args[1])) { nextCount('statusCalls'); ok(statusPayload()); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/check-runs$/.test(args[1])) { nextCount('checkRunCalls'); ok(checkRunsPayload()); }`,
    "fail(`unexpected gh invocation: ${args.join(' ')}`);",
  ].join("\n");

  await writeExecutable(root, "bin/gh", script);
  return { stateFile, callLog };
}

async function runScript(args: string[], opts: RunScriptOptions = {}): Promise<RunScriptResult> {
  try {
    const result = await execFileAsync(process.execPath, [SCRIPT_PATH, ...args], {
      cwd: process.cwd(),
      env: { ...process.env, ...opts.env },
      maxBuffer: 10 * 1024 * 1024,
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
    };
  } catch (error: unknown) {
    const execError = error as {
      code?: number;
      stdout?: string;
      stderr?: string;
    };
    return {
      exitCode: Number.isInteger(execError.code) ? execError.code : 1,
      stdout: typeof execError.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError.stderr === "string" ? execError.stderr : String(error),
    };
  }
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("wait-remote-pr-checks script", () => {
  it("prints help without invoking gh", async () => {
    const result = await runScript(["--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("workflow:wait-remote-checks");
    expect(result.stdout).toContain("polls PR check state");
    expect(result.stdout).not.toContain("gh pr checks --watch");
  });

  it("polls until the required checks pass", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript([], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("attempt 1/3");
    expect(result.stdout).toContain("attempt 2/3");
    expect(result.stdout).toContain("required checks passed for PR #123");

    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(
      `["pr","view","--repo","basilisk-labs/agentplane","--json","number,headRefOid,baseRefName,url,title"]`,
    );
    expect(callLogText).toContain(
      `["api","repos/basilisk-labs/agentplane/branches/main/protection"]`,
    );
    expect(callLogText).toContain(
      `["api","repos/basilisk-labs/agentplane/commits/head-sha-1/check-runs"]`,
    );
    expect(callLogText).toContain(
      `["api","repos/basilisk-labs/agentplane/commits/head-sha-1/status"]`,
    );
  });

  it("retries transient gh transport errors before resolving the PR", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript(["123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "retry-transient",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
      },
    });

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toContain("transient GitHub transport error");
    expect(result.stdout).toContain("required checks passed for PR #123");

    const state = JSON.parse(await readFile(stateFile, "utf8")) as { prViewCalls: number };
    expect(state.prViewCalls).toBeGreaterThan(1);
  });

  it("fails explicitly for auth errors without retrying forever", async () => {
    const root = await makeTempRoot();
    const { stateFile } = await writeGhMock(root);

    const result = await runScript(["123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "auth-failure",
        GH_STATE_FILE: stateFile,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Authentication required");
    expect(result.stderr).not.toContain("timed out waiting");
  });

  it("times out with an explicit message when checks never settle", async () => {
    const root = await makeTempRoot();
    const { stateFile } = await writeGhMock(root);

    const result = await runScript([], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_STATE_FILE: stateFile,
        GH_SCENARIO: "timeout",
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stdout).toContain("attempt 1/2");
    expect(result.stdout).toContain("attempt 2/2");
    expect(result.stderr).toContain("timed out waiting for required checks");
  });
});
