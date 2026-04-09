import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "wait-remote-pr-checks.mjs");
const explicitNodeBinary = process.env.NODE_BINARY?.trim();
const SCRIPT_RUNTIME =
  explicitNodeBinary && explicitNodeBinary.length > 0 ? explicitNodeBinary : "node";

const tempRoots: string[] = [];
type RunScriptResult = { exitCode: number; stdout: string; stderr: string };
type RunScriptOptions = { env?: Record<string, string> };

function toText(value: unknown) {
  if (typeof value === "string") return value;
  if (Buffer.isBuffer(value)) return value.toString("utf8");
  if (value instanceof Uint8Array) return Buffer.from(value).toString("utf8");
  return "";
}

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
        prViewCallsByTarget: {},
        statusCallsByHead: {},
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
    "const path = require('node:path');",
    "const statePath = process.env.GH_STATE_FILE;",
    "const logPath = process.env.GH_CALL_LOG;",
    "const scenario = process.env.GH_SCENARIO || 'success';",
    "const args = process.argv.slice(2);",
    "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
    "const stateSeed = statePath && fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : {};",
    "const stateDir = statePath ? `${statePath}.parts` : null;",
    "if (stateDir) fs.mkdirSync(stateDir, { recursive: true });",
    "function counterPath(key, subkey) { if (!stateDir) return null; const suffix = typeof subkey === 'string' ? subkey : '__root__'; return path.join(stateDir, `${key}__${encodeURIComponent(suffix)}.txt`); }",
    "function readCounter(key, subkey) { const file = counterPath(key, subkey); if (!file || !fs.existsSync(file)) { if (typeof subkey === 'string') { const map = stateSeed[key] && typeof stateSeed[key] === 'object' ? stateSeed[key] : {}; return Number(map[subkey] || 0); } return Number(stateSeed[key] || 0); } const raw = fs.readFileSync(file, 'utf8').trim(); return raw.length > 0 ? Number(raw) : 0; }",
    "function writeCounter(key, subkey, value) { const file = counterPath(key, subkey); if (!file) return; fs.writeFileSync(file, String(value)); }",
    "function mapFromCounters(key) { if (!stateDir || !fs.existsSync(stateDir)) return stateSeed[key] && typeof stateSeed[key] === 'object' ? { ...stateSeed[key] } : {}; const result = stateSeed[key] && typeof stateSeed[key] === 'object' ? { ...stateSeed[key] } : {}; for (const entry of fs.readdirSync(stateDir)) { const prefix = `${key}__`; if (!entry.startsWith(prefix) || !entry.endsWith('.txt')) continue; const subkey = decodeURIComponent(entry.slice(prefix.length, -4)); if (subkey === '__root__') continue; const raw = fs.readFileSync(path.join(stateDir, entry), 'utf8').trim(); result[subkey] = raw.length > 0 ? Number(raw) : 0; } return result; }",
    "function snapshotState() { return { ...stateSeed, prViewCalls: readCounter('prViewCalls'), prViewCallsByTarget: mapFromCounters('prViewCallsByTarget'), statusCallsByHead: mapFromCounters('statusCallsByHead'), checkRunCalls: readCounter('checkRunCalls'), protectionCalls: readCounter('protectionCalls'), repoViewCalls: readCounter('repoViewCalls') }; }",
    "function saveSnapshot() { if (!statePath) return; fs.writeFileSync(statePath, JSON.stringify(snapshotState(), null, 2)); }",
    "function readState() { return snapshotState(); }",
    "function ok(payload) { process.stdout.write(`${JSON.stringify(payload)}\\n`); process.exit(0); }",
    "function fail(message, code = 1) { process.stderr.write(`${message}\\n`); process.exit(code); }",
    "function nextCount(key, subkey) { const value = readCounter(key, subkey) + 1; writeCounter(key, subkey, value); saveSnapshot(); return value; }",
    "function prPayload(target) { if (target === '456') { return { number: 456, headRefOid: 'head-sha-2', baseRefName: 'main', url: 'https://github.com/basilisk-labs/agentplane/pull/456', title: 'Check polling 2' }; } return { number: 123, headRefOid: 'head-sha-1', baseRefName: 'main', url: 'https://github.com/basilisk-labs/agentplane/pull/123', title: 'Check polling' }; }",
    "function repoPayload() { return { nameWithOwner: 'basilisk-labs/agentplane' }; }",
    "function protectionPayload() { return { required_status_checks: { strict: true, contexts: ['Core CI / test', 'Docs CI / docs'], checks: [ { context: 'Core CI / test', app_id: 123 }, { context: 'Docs CI / docs', app_id: 456 } ] } }; }",
    "function statusPayload(headSha) {",
    "  const currentMap = readState();",
    "  const attempts = currentMap.statusCallsByHead && typeof currentMap.statusCallsByHead === 'object' ? currentMap.statusCallsByHead : {};",
    "  const attempt = Number(attempts[headSha] || 0);",
    "  const pending = { state: 'pending', statuses: [ { context: 'Core CI / test', state: 'pending', description: 'running' }, { context: 'Docs CI / docs', state: 'pending', description: 'queued' } ] };",
    "  const success = { state: 'success', statuses: [ { context: 'Core CI / test', state: 'success', description: 'done' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "  const failure = { state: 'failure', statuses: [ { context: 'Core CI / test', state: 'failure', description: 'failed' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "  if (headSha === 'head-sha-2' && scenario === 'multi-second-failure') return failure;",
    "  if (scenario === 'timeout') return pending;",
    "  return attempt === 0 ? pending : success;",
    "}",
    "function checkRunsPayload() { return { total_count: 0, check_runs: [] }; }",
    "function transientFailureOnce() {",
    "  const attempt = Number(readState().prViewCalls || 0);",
    "  if (scenario === 'retry-transient' && attempt === 0) {",
    "    nextCount('prViewCalls');",
    String.raw`    fail('gh: Post "https://api.github.com/graphql": EOF');`,
    "  }",
    "}",
    "if (args[0] === 'repo' && args[1] === 'view') { nextCount('repoViewCalls'); ok(repoPayload()); }",
    "if (args[0] === 'pr' && args[1] === 'view') {",
    "  transientFailureOnce();",
    "  const target = args.find((arg, index) => index >= 2 && !arg.startsWith('--')) || 'default';",
    "  nextCount('prViewCalls');",
    "  nextCount('prViewCallsByTarget', target);",
    "  if (scenario === 'auth-failure') fail('gh: Authentication required');",
    "  ok(prPayload(target));",
    "}",
    String.raw`if (args[0] === 'api' && /\/branches\/main\/protection$/.test(args[1])) {`,
    "  if (scenario === 'auth-failure') fail('gh: Authentication required');",
    "  nextCount('protectionCalls');",
    "  ok(protectionPayload());",
    "}",
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/status$/.test(args[1])) { const payload = statusPayload('head-sha-1'); nextCount('statusCallsByHead', 'head-sha-1'); ok(payload); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-2\/status$/.test(args[1])) { const payload = statusPayload('head-sha-2'); nextCount('statusCallsByHead', 'head-sha-2'); ok(payload); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/check-runs$/.test(args[1])) { nextCount('checkRunCalls'); ok(checkRunsPayload()); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-2\/check-runs$/.test(args[1])) { nextCount('checkRunCalls'); ok(checkRunsPayload()); }`,
    "fail(`unexpected gh invocation: ${args.join(' ')}`);",
  ].join("\n");

  await writeExecutable(root, "bin/gh", script);
  return { stateFile, callLog };
}

async function runScript(args: string[], opts: RunScriptOptions = {}): Promise<RunScriptResult> {
  try {
    const result = await execFileAsync(SCRIPT_RUNTIME, [SCRIPT_PATH, ...args], {
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
      stdout: toText(execError.stdout),
      stderr: toText(execError.stderr) || String(error),
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

  it("waits for multiple PRs in input order and caches shared protection lookups", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript(["123", "456"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "multi-success",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("PR #123 [1/2]");
    expect(result.stdout).toContain("required checks passed for PR #123 [1/2]");
    expect(result.stdout).toContain("PR #456 [2/2]");
    expect(result.stdout).toContain("required checks passed for PR #456 [2/2]");

    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(`["pr","view","123"`);
    expect(callLogText).toContain(`["pr","view","456"`);
    expect(callLogText.match(/branches\/main\/protection/g)?.length).toBe(1);

    const state = JSON.parse(await readFile(stateFile, "utf8")) as {
      prViewCallsByTarget: Record<string, number>;
      statusCallsByHead: Record<string, number>;
      protectionCalls: number;
    };
    expect(state.prViewCallsByTarget["123"]).toBeGreaterThan(0);
    expect(state.prViewCallsByTarget["456"]).toBeGreaterThan(0);
    expect(state.statusCallsByHead["head-sha-1"]).toBeGreaterThan(1);
    expect(state.statusCallsByHead["head-sha-2"]).toBeGreaterThan(1);
    expect(state.protectionCalls).toBe(1);
  });

  it("fails on the first failing PR and stops before later targets", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript(["123", "456"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "multi-second-failure",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stdout).toContain("required checks passed for PR #123 [1/2]");
    expect(result.stderr).toContain("required checks failed for PR #456 [2/2]");

    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(`["pr","view","123"`);
    expect(callLogText).toContain(`["pr","view","456"`);
    expect(callLogText).toContain(
      `["api","repos/basilisk-labs/agentplane/commits/head-sha-2/status"]`,
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
