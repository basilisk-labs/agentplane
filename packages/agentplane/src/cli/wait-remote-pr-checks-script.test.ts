import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import {
  GH_LOOKUP_BASE_DELAY_MS as SHARED_GH_LOOKUP_BASE_DELAY_MS,
  GH_LOOKUP_MAX_ATTEMPTS as SHARED_GH_LOOKUP_MAX_ATTEMPTS,
  isTransientGhTransportError as isSharedTransientGhTransportError,
} from "../commands/shared/gh-transport.js";

import {
  GH_LOOKUP_BASE_DELAY_MS as SCRIPT_GH_LOOKUP_BASE_DELAY_MS,
  GH_LOOKUP_MAX_ATTEMPTS as SCRIPT_GH_LOOKUP_MAX_ATTEMPTS,
  isTransientGhTransportError as isScriptTransientGhTransportError,
} from "../../../../scripts/lib/gh-transport.mjs";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "wait-remote-pr-checks.mjs");
const explicitNodeBinary = process.env.NODE_BINARY?.trim();
const SCRIPT_RUNTIME =
  explicitNodeBinary && explicitNodeBinary.length > 0 ? explicitNodeBinary : "node";
const isScriptTransientGhTransportErrorTyped = isScriptTransientGhTransportError as unknown as (
  err: unknown,
) => boolean;

const tempRoots: string[] = [];
type RunScriptResult = { exitCode: number; stdout: string; stderr: string };
type RunScriptOptions = { cwd?: string; env?: Record<string, string> };

const DEFAULT_BRANCH_ENV = {
  GITHUB_HEAD_REF: "task/test-default-target",
};

function toText(value: unknown) {
  if (typeof value === "string") return value;
  if (Buffer.isBuffer(value)) return value.toString("utf8");
  if (value instanceof Uint8Array) return Buffer.from(value).toString("utf8");
  return "";
}

function transcript(result: RunScriptResult) {
  return `${result.stdout}${result.stderr}`;
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

async function makeDetachedGitRoot() {
  const root = await makeTempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await writeFile(path.join(root, "README.md"), "detached checkout fixture\n", "utf8");
  await execFileAsync("git", ["add", "README.md"], { cwd: root });
  await execFileAsync(
    "git",
    [
      "-c",
      "user.name=agentplane-test",
      "-c",
      "user.email=agentplane-test@example.com",
      "commit",
      "-m",
      "fixture",
    ],
    { cwd: root },
  );
  await execFileAsync("git", ["checkout", "--detach", "HEAD"], { cwd: root });
  return root;
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
        jobCallsById: {},
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
    "function readJsonSafe(file) { if (!file || !fs.existsSync(file)) return {}; try { const raw = fs.readFileSync(file, 'utf8'); return raw.trim().length > 0 ? JSON.parse(raw) : {}; } catch { return {}; } }",
    "function writeJsonAtomic(file, payload) { if (!file) return; const tmp = `${file}.${process.pid}.${Date.now()}.tmp`; fs.writeFileSync(tmp, JSON.stringify(payload, null, 2)); fs.renameSync(tmp, file); }",
    "const stateSeed = readJsonSafe(statePath);",
    "const stateDir = statePath ? `${statePath}.parts` : null;",
    "if (stateDir) fs.mkdirSync(stateDir, { recursive: true });",
    "function counterPath(key, subkey) { if (!stateDir) return null; const suffix = typeof subkey === 'string' ? subkey : '__root__'; return path.join(stateDir, `${key}__${encodeURIComponent(suffix)}.txt`); }",
    "function readCounter(key, subkey) { const file = counterPath(key, subkey); if (!file || !fs.existsSync(file)) { if (typeof subkey === 'string') { const map = stateSeed[key] && typeof stateSeed[key] === 'object' ? stateSeed[key] : {}; return Number(map[subkey] || 0); } return Number(stateSeed[key] || 0); } const raw = fs.readFileSync(file, 'utf8').trim(); return raw.length > 0 ? Number(raw) : 0; }",
    "function writeCounter(key, subkey, value) { const file = counterPath(key, subkey); if (!file) return; fs.writeFileSync(file, String(value)); }",
    "function mapFromCounters(key) { if (!stateDir || !fs.existsSync(stateDir)) return stateSeed[key] && typeof stateSeed[key] === 'object' ? { ...stateSeed[key] } : {}; const result = stateSeed[key] && typeof stateSeed[key] === 'object' ? { ...stateSeed[key] } : {}; for (const entry of fs.readdirSync(stateDir)) { const prefix = `${key}__`; if (!entry.startsWith(prefix) || !entry.endsWith('.txt')) continue; const subkey = decodeURIComponent(entry.slice(prefix.length, -4)); if (subkey === '__root__') continue; const raw = fs.readFileSync(path.join(stateDir, entry), 'utf8').trim(); result[subkey] = raw.length > 0 ? Number(raw) : 0; } return result; }",
    "function snapshotState() { return { ...stateSeed, prViewCalls: readCounter('prViewCalls'), prViewCallsByTarget: mapFromCounters('prViewCallsByTarget'), statusCallsByHead: mapFromCounters('statusCallsByHead'), checkRunCalls: readCounter('checkRunCalls'), jobCallsById: mapFromCounters('jobCallsById'), protectionCalls: readCounter('protectionCalls'), repoViewCalls: readCounter('repoViewCalls') }; }",
    "function saveSnapshot() { if (!statePath) return; writeJsonAtomic(statePath, snapshotState()); }",
    "function readState() { return snapshotState(); }",
    "function ok(payload) { process.stdout.write(`${JSON.stringify(payload)}\\n`); process.exit(0); }",
    "function fail(message, code = 1) { process.stderr.write(`${message}\\n`); process.exit(code); }",
    "function nextCount(key, subkey) { const value = readCounter(key, subkey) + 1; writeCounter(key, subkey, value); saveSnapshot(); return value; }",
    "function prPayload(target) { const mergeStateStatus = scenario === 'dirty-pr' ? 'DIRTY' : 'CLEAN'; if (target === '456') { return { number: 456, headRefOid: 'head-sha-2', baseRefName: 'main', url: 'https://github.com/basilisk-labs/agentplane/pull/456', title: 'Check polling 2', mergeStateStatus }; } return { number: 123, headRefOid: 'head-sha-1', baseRefName: 'main', url: 'https://github.com/basilisk-labs/agentplane/pull/123', title: 'Check polling', mergeStateStatus }; }",
    "function repoPayload() { return { nameWithOwner: 'basilisk-labs/agentplane' }; }",
    "function protectionPayload() { return { required_status_checks: { strict: true, contexts: ['Core CI / test', 'Docs CI / docs'], checks: [ { context: 'Core CI / test', app_id: 123 }, { context: 'Docs CI / docs', app_id: 456 } ] } }; }",
    "function lateProtectionPayload() { return { required_status_checks: { strict: true, contexts: ['Core CI / test', 'Docs CI / docs', 'Release-ready manifest'], checks: [ { context: 'Core CI / test', app_id: 123 }, { context: 'Docs CI / docs', app_id: 456 }, { context: 'Release-ready manifest', app_id: 789 } ] } }; }",
    "function statusPayload(headSha) {",
    "  const currentMap = readState();",
    "  const attempts = currentMap.statusCallsByHead && typeof currentMap.statusCallsByHead === 'object' ? currentMap.statusCallsByHead : {};",
    "  const attempt = Number(attempts[headSha] || 0);",
    "  const pending = { state: 'pending', statuses: [ { context: 'Core CI / test', state: 'pending', description: 'running' }, { context: 'Docs CI / docs', state: 'pending', description: 'queued' } ] };",
    "  const success = { state: 'success', statuses: [ { context: 'Core CI / test', state: 'success', description: 'done' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "  const failure = { state: 'failure', statuses: [ { context: 'Core CI / test', state: 'failure', description: 'failed' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "  if (scenario === 'late-required-check') {",
    "    if (attempt === 0) return { state: 'success', statuses: [ { context: 'Core CI / test', state: 'success', description: 'done' }, { context: 'Docs CI / docs', state: 'success', description: 'done' } ] };",
    "    return { state: 'success', statuses: [ { context: 'Core CI / test', state: 'success', description: 'done' }, { context: 'Docs CI / docs', state: 'success', description: 'done' }, { context: 'Release-ready manifest', state: 'success', description: 'done' } ] };",
    "  }",
    "  if (scenario === 'ready-flaps') {",
    "    if (attempt === 1) return pending;",
    "    return success;",
    "  }",
    "  if (headSha === 'head-sha-2' && scenario === 'multi-second-failure') return failure;",
    "  if (scenario === 'timeout') return pending;",
    "  if (scenario === 'progressing-in-progress') return attempt < 2 ? pending : success;",
    "  if (scenario === 'stuck-in-progress') return pending;",
    "  return attempt === 0 ? pending : success;",
    "}",
    "function checkRunsPayload(headSha) {",
    "  const attempt = Number(readState().checkRunCalls || 0);",
    "  if (scenario === 'progressing-in-progress' && headSha === 'head-sha-1' && attempt < 2) {",
    "    return { total_count: 1, check_runs: [ { name: 'Core CI / test', status: 'in_progress', conclusion: null, details_url: 'https://github.com/basilisk-labs/agentplane/actions/runs/1/job/99', started_at: '2026-01-01T00:00:00Z', completed_at: null } ] };",
    "  }",
    "  if (scenario === 'stuck-in-progress' && headSha === 'head-sha-1') {",
    "    return { total_count: 1, check_runs: [ { name: 'Core CI / test', status: 'in_progress', conclusion: null, details_url: 'https://github.com/basilisk-labs/agentplane/actions/runs/1/job/99', started_at: '2026-01-01T00:00:00Z', completed_at: null } ] };",
    "  }",
    "  return { total_count: 0, check_runs: [] };",
    "}",
    "function actionsJobPayload(jobId) {",
    "  const attempt = Number((readState().jobCallsById || {})[jobId] || 0);",
    "  if (scenario === 'progressing-in-progress') {",
    "    if (attempt === 0) return { status: 'in_progress', conclusion: null, started_at: '2026-01-01T00:00:00Z', completed_at: null, steps: [ { number: 1, name: 'Set up job', status: 'completed', conclusion: 'success', completed_at: '2026-01-01T00:00:05Z' }, { number: 2, name: 'Run tests', status: 'in_progress', conclusion: null, completed_at: null } ] };",
    "    return { status: 'in_progress', conclusion: null, started_at: '2026-01-01T00:00:00Z', completed_at: null, steps: [ { number: 1, name: 'Set up job', status: 'completed', conclusion: 'success', completed_at: '2026-01-01T00:00:05Z' }, { number: 2, name: 'Run tests', status: 'completed', conclusion: 'success', completed_at: '2026-01-01T00:00:20Z' }, { number: 3, name: 'Upload artifacts', status: 'in_progress', conclusion: null, completed_at: null } ] };",
    "  }",
    "  return { status: 'in_progress', conclusion: null, started_at: '2026-01-01T00:00:00Z', completed_at: null, steps: [ { number: 1, name: 'Set up job', status: 'completed', conclusion: 'success', completed_at: '2026-01-01T00:00:05Z' }, { number: 2, name: 'Run tests', status: 'in_progress', conclusion: null, completed_at: null } ] };",
    "}",
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
    "  ok(scenario === 'late-required-check' ? lateProtectionPayload() : protectionPayload());",
    "}",
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/status$/.test(args[1])) { const payload = statusPayload('head-sha-1'); nextCount('statusCallsByHead', 'head-sha-1'); ok(payload); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-2\/status$/.test(args[1])) { const payload = statusPayload('head-sha-2'); nextCount('statusCallsByHead', 'head-sha-2'); ok(payload); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-1\/check-runs$/.test(args[1])) { nextCount('checkRunCalls'); ok(checkRunsPayload('head-sha-1')); }`,
    String.raw`if (args[0] === 'api' && /\/commits\/head-sha-2\/check-runs$/.test(args[1])) { nextCount('checkRunCalls'); ok(checkRunsPayload('head-sha-2')); }`,
    String.raw`if (args[0] === 'api' && /\/actions\/jobs\/99$/.test(args[1])) { nextCount('jobCallsById', '99'); ok(actionsJobPayload('99')); }`,
    "fail(`unexpected gh invocation: ${args.join(' ')}`);",
  ].join("\n");

  await writeExecutable(root, "bin/gh", script);
  return { stateFile, callLog };
}

async function runScript(args: string[], opts: RunScriptOptions = {}): Promise<RunScriptResult> {
  try {
    const result = await execFileAsync(SCRIPT_RUNTIME, [SCRIPT_PATH, ...args], {
      cwd: opts.cwd ?? process.cwd(),
      env: {
        ...process.env,
        BRANCH_NAME: "",
        GITHUB_HEAD_REF: "",
        GITHUB_REPOSITORY: "",
        ...opts.env,
      },
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
  it("keeps script-side GitHub transport retry defaults and classification aligned with the shared helper", () => {
    expect(SCRIPT_GH_LOOKUP_MAX_ATTEMPTS).toBe(SHARED_GH_LOOKUP_MAX_ATTEMPTS);
    expect(SCRIPT_GH_LOOKUP_BASE_DELAY_MS).toBe(SHARED_GH_LOOKUP_BASE_DELAY_MS);

    const cases = [
      { text: 'gh: Post "https://api.github.com/graphql": EOF', transient: true },
      { text: "gh: tls handshake timeout", transient: true },
      { text: "gh: Authentication required", transient: false },
      { text: "gh: HTTP 404 Not Found", transient: false },
      { text: "gh: HTTP 422 Unprocessable Entity", transient: false },
      { text: "gh: unknown command foo", transient: false },
    ];

    for (const testCase of cases) {
      const error = new Error(testCase.text) as Error & { stderr?: string };
      error.stderr = testCase.text;
      expect(isScriptTransientGhTransportErrorTyped(error)).toBe(testCase.transient);
      expect(isSharedTransientGhTransportError(error)).toBe(testCase.transient);
    }
  });

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
        GH_SCENARIO: "success",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        ...DEFAULT_BRANCH_ENV,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode).toBe(0);
    const output = transcript(result);
    expect(output).toContain("poll 1 (idle 1/3)");
    expect(output).toContain("ready; waiting for stable check set (1/2)");
    expect(output).toContain("poll 3 (idle 0/3)");
    expect(output).toContain("required checks passed for PR #123");

    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(
      `["pr","view","task/test-default-target","--repo","basilisk-labs/agentplane","--json","number,headRefOid,baseRefName,url,title,mergeStateStatus"]`,
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

  it("waits for the ready check set to stay stable before passing", async () => {
    const root = await makeTempRoot();
    const { stateFile } = await writeGhMock(root);

    const result = await runScript(["123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "late-required-check",
        GH_STATE_FILE: stateFile,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "4",
        AGENTPLANE_REMOTE_CHECK_STABLE_POLLS: "2",
      },
    });

    expect(result.exitCode, transcript(result)).toBe(0);
    const output = transcript(result);
    expect(output).toContain("poll 1");
    expect(output).toContain("Release-ready manifest=pending");
    expect(output).toContain("ready; waiting for stable check set (1/2)");
    expect(output).toContain("Release-ready manifest=success");
    expect(output).toContain("required checks passed for PR #123");
  });

  it("resets ready stability after a non-ready poll", async () => {
    const root = await makeTempRoot();
    const { stateFile } = await writeGhMock(root);

    const result = await runScript(["123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "ready-flaps",
        GH_STATE_FILE: stateFile,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "5",
        AGENTPLANE_REMOTE_CHECK_STABLE_POLLS: "2",
      },
    });

    expect(result.exitCode, transcript(result)).toBe(0);
    const output = transcript(result);
    expect(output).toContain("poll 2");
    expect(output).toContain("Core CI / test=pending");
    expect(output).toContain("poll 4");
    expect(output).toContain("required checks passed for PR #123");
  });

  it("accepts --pr as an alias for a positional PR target", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript(["--pr", "123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "success",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode, transcript(result)).toBe(0);
    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(
      `["pr","view","123","--repo","basilisk-labs/agentplane","--json","number,headRefOid,baseRefName,url,title,mergeStateStatus"]`,
    );
    expect(callLogText).not.toContain(`["pr","view","--pr"`);
  });

  it("rejects unknown dashed options before contacting GitHub", async () => {
    const root = await makeTempRoot();

    const result = await runScript(["--mystery"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Unknown option: --mystery");
    expect(result.stderr).not.toContain("required checks passed");
  });

  it("fails explicitly for detached push checkouts without an explicit PR target", async () => {
    const root = await makeTempRoot();
    const detachedRoot = await makeDetachedGitRoot();
    const { stateFile } = await writeGhMock(root);

    const result = await runScript([], {
      cwd: detachedRoot,
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_STATE_FILE: stateFile,
        GH_SCENARIO: "success",
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Unable to resolve current branch for gh pr view");
    expect(result.stderr).toContain("Pass a PR number/url/branch explicitly");
  });

  it(
    "waits for multiple PRs in input order and caches shared protection lookups",
    { timeout: 120_000 },
    async () => {
      const root = await makeTempRoot();
      const { stateFile, callLog } = await writeGhMock(root);

      const result = await runScript(["123", "456"], {
        env: {
          PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
          GH_SCENARIO: "multi-success",
          GH_STATE_FILE: stateFile,
          GH_CALL_LOG: callLog,
          AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
          AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "4",
        },
      });

      expect(result.exitCode, transcript(result)).toBe(0);
      const output = transcript(result);
      expect(output).toContain("PR #123 [1/2]");
      expect(output).toContain("required checks passed for PR #123 [1/2]");
      expect(output).toContain("PR #456 [2/2]");
      expect(output).toContain("required checks passed for PR #456 [2/2]");

      const callLogText = await readFile(callLog, "utf8");
      expect(callLogText).toContain(`["pr","view","123"`);
      expect(callLogText).toContain(`["pr","view","456"`);
      expect(callLogText.match(/branches\/main\/protection/g)?.length).toBe(1);

      expect(callLogText.match(/"pr","view","123"/g)?.length ?? 0).toBeGreaterThan(0);
      expect(callLogText.match(/"pr","view","456"/g)?.length ?? 0).toBeGreaterThan(0);
      expect(
        callLogText.match(/"api","repos\/basilisk-labs\/agentplane\/commits\/head-sha-1\/status"/g)
          ?.length ?? 0,
      ).toBeGreaterThan(1);
      expect(
        callLogText.match(/"api","repos\/basilisk-labs\/agentplane\/commits\/head-sha-2\/status"/g)
          ?.length ?? 0,
      ).toBeGreaterThan(1);
      expect(callLogText.match(/branches\/main\/protection/g)?.length ?? 0).toBe(1);
    },
  );

  it(
    "fails on the first failing PR and stops before later targets",
    { timeout: 120_000 },
    async () => {
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
      const output = transcript(result);
      expect(output).toContain("required checks passed for PR #123 [1/2]");
      expect(output).toContain("required checks failed for PR #456 [2/2]");

      const callLogText = await readFile(callLog, "utf8");
      expect(callLogText).toContain(`["pr","view","123"`);
      expect(callLogText).toContain(`["pr","view","456"`);
      expect(callLogText).toContain(
        `["api","repos/basilisk-labs/agentplane/commits/head-sha-2/status"]`,
      );
    },
  );

  it(
    "retries transient gh transport errors before resolving the PR",
    { timeout: 120_000 },
    async () => {
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
      const output = transcript(result);
      expect(output).toContain("transient GitHub transport error");
      expect(output).toContain("required checks passed for PR #123");

      const state = JSON.parse(await readFile(stateFile, "utf8")) as { prViewCalls: number };
      expect(state.prViewCalls).toBeGreaterThan(1);
    },
  );

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

  it("fails fast when GitHub reports a dirty PR before checks start", async () => {
    const root = await makeTempRoot();
    const { stateFile, callLog } = await writeGhMock(root);

    const result = await runScript(["123"], {
      env: {
        PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
        GH_SCENARIO: "dirty-pr",
        GH_STATE_FILE: stateFile,
        GH_CALL_LOG: callLog,
        AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
        AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "3",
      },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("mergeStateStatus=DIRTY");
    expect(result.stderr).toContain("resolve conflicts before waiting for checks");

    const callLogText = await readFile(callLog, "utf8");
    expect(callLogText).toContain(`["pr","view","123"`);
    expect(callLogText).not.toContain("commits/head-sha-1/status");
    expect(callLogText).not.toContain("commits/head-sha-1/check-runs");
  });

  it(
    "times out with an explicit message when checks never settle",
    { timeout: 120_000 },
    async () => {
      const root = await makeTempRoot();
      const { stateFile } = await writeGhMock(root);

      const result = await runScript([], {
        env: {
          PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
          GH_STATE_FILE: stateFile,
          GH_SCENARIO: "timeout",
          ...DEFAULT_BRANCH_ENV,
          AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
          AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
          AGENTPLANE_REMOTE_CHECK_STABLE_POLLS: "1",
        },
      });

      expect(result.exitCode).toBe(1);
      const output = transcript(result);
      expect(output).toContain("poll 1 (idle 1/2)");
      expect(output).toContain("poll 2 (idle 2/2)");
      expect(output).toContain("timed out waiting for required checks after 2 idle polls");
    },
  );

  it(
    "keeps waiting while an in-progress required check keeps advancing",
    { timeout: 120_000 },
    async () => {
      const root = await makeTempRoot();
      const { stateFile } = await writeGhMock(root);

      const result = await runScript([], {
        env: {
          PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
          GH_STATE_FILE: stateFile,
          GH_SCENARIO: "progressing-in-progress",
          ...DEFAULT_BRANCH_ENV,
          AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
          AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
          AGENTPLANE_REMOTE_CHECK_STABLE_POLLS: "1",
        },
      });

      expect(result.exitCode).toBe(0);
      const output = transcript(result);
      expect(output).toContain("poll 1 (idle 1/2): Core CI / test=in_progress");
      expect(output).toContain("poll 2 (idle 1/2)");
      expect(output).toContain("poll 3 (idle 0/2)");
      expect(output).toContain("required checks passed for PR #123");
    },
  );

  it(
    "still times out when an in-progress required check stops changing",
    { timeout: 120_000 },
    async () => {
      const root = await makeTempRoot();
      const { stateFile } = await writeGhMock(root);

      const result = await runScript([], {
        env: {
          PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
          GH_STATE_FILE: stateFile,
          GH_SCENARIO: "stuck-in-progress",
          ...DEFAULT_BRANCH_ENV,
          AGENTPLANE_REMOTE_CHECK_INTERVAL_MS: "0",
          AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS: "2",
          AGENTPLANE_REMOTE_CHECK_STABLE_POLLS: "1",
        },
      });

      expect(result.exitCode).toBe(1);
      const output = transcript(result);
      expect(output).toContain("poll 1 (idle 1/2): Core CI / test=in_progress");
      expect(output).toContain("poll 2 (idle 2/2): Core CI / test=in_progress");
      expect(output).toContain("timed out waiting for required checks after 2 idle polls");
    },
  );
});
