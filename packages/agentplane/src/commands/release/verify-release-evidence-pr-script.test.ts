import { execFile } from "node:child_process";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(
  process.cwd(),
  "scripts",
  "workflow",
  "verify-release-evidence-pr.mjs",
);
const tempRoots: string[] = [];

const SHA = "1234567890abcdef1234567890abcdef12345678";
const REF = "task-close/202608041322-M26FS0/1234567890ab";
const REPO = "basilisk-labs/agentplane";
const PR_URL = "https://github.com/basilisk-labs/agentplane/pull/5000";

async function makeFakeGh() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-evidence-gh-"));
  tempRoots.push(root);
  const statePath = path.join(root, "state.json");
  await writeFile(
    statePath,
    `${JSON.stringify({ calls: [], runListCalls: 0, prViewCalls: 0 }, null, 2)}\n`,
    "utf8",
  );
  const ghPath = path.join(root, "gh");
  await writeFile(
    ghPath,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      "const args = process.argv.slice(2);",
      "const statePath = process.env.FAKE_GH_STATE;",
      'const state = JSON.parse(fs.readFileSync(statePath, "utf8"));',
      "state.calls.push(args);",
      "const save = () => fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\\n`);",
      `const sha = ${JSON.stringify(SHA)};`,
      `const ref = ${JSON.stringify(REF)};`,
      "const oldExact = { databaseId: 101, createdAt: '2026-08-05T19:00:00Z', event: 'workflow_dispatch', headBranch: ref, headSha: sha, status: 'completed', url: 'https://github.com/basilisk-labs/agentplane/actions/runs/101' };",
      "if (args[0] === 'run' && args[1] === 'list') {",
      "  state.runListCalls += 1;",
      "  let runs = [oldExact];",
      "  if (process.env.FAKE_GH_MODE !== 'stale' && state.runListCalls >= 3) {",
      "    runs = [",
      "      oldExact,",
      "      { databaseId: 200, createdAt: '2026-08-05T20:00:00Z', event: 'workflow_dispatch', headBranch: ref, headSha: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', status: 'queued', url: 'https://github.com/basilisk-labs/agentplane/actions/runs/200' },",
      "      { databaseId: 202, createdAt: '2026-08-05T20:00:02Z', event: 'workflow_dispatch', headBranch: ref, headSha: sha, status: 'queued', url: 'https://github.com/basilisk-labs/agentplane/actions/runs/202' },",
      "      { databaseId: 201, createdAt: '2026-08-05T20:00:01Z', event: 'workflow_dispatch', headBranch: ref, headSha: sha, status: 'queued', url: 'https://github.com/basilisk-labs/agentplane/actions/runs/201' },",
      "    ];",
      "  }",
      "  save(); console.log(JSON.stringify(runs)); process.exit(0);",
      "}",
      "if (args[0] === 'workflow' && args[1] === 'run') { save(); process.exit(0); }",
      "if (args[0] === 'run' && args[1] === 'watch') { save(); process.exit(0); }",
      "if (args[0] === 'api') { save(); console.log(JSON.stringify({ id: 301 })); process.exit(0); }",
      "if (args[0] === 'pr' && args[1] === 'checks') { save(); process.exit(0); }",
      "if (args[0] === 'pr' && args[1] === 'merge') {",
      "  save();",
      "  if (args.includes('--auto')) process.exit(0);",
      "  process.stderr.write('merge queue required\\n'); process.exit(1);",
      "}",
      "if (args[0] === 'pr' && args[1] === 'view') {",
      "  state.prViewCalls += 1; save();",
      "  if (state.prViewCalls === 1) { console.log(JSON.stringify({ state: 'OPEN', mergedAt: null, mergeCommit: null })); process.exit(0); }",
      "  console.log(JSON.stringify({ state: 'MERGED', mergedAt: '2026-08-05T20:02:00Z', mergeCommit: { oid: 'feedface' } })); process.exit(0);",
      "}",
      "save(); process.stderr.write(`unexpected gh call: ${args.join(' ')}\\n`); process.exit(2);",
      "",
    ].join("\n"),
    "utf8",
  );
  await chmod(ghPath, 0o755);
  return { root, statePath };
}

async function runScript(
  fake: Awaited<ReturnType<typeof makeFakeGh>>,
  extraEnv: Record<string, string> = {},
) {
  const args = [
    SCRIPT_PATH,
    "--workflow",
    "ci.yml",
    "--ref",
    REF,
    "--sha",
    SHA,
    "--pr-url",
    PR_URL,
    "--repo",
    REPO,
    "--poll-interval-ms",
    "0",
    "--discovery-attempts",
    "3",
    "--merge-attempts",
    "3",
    "--json",
  ];
  try {
    const result = await execFileAsync(process.execPath, args, {
      env: {
        ...process.env,
        ...extraEnv,
        FAKE_GH_STATE: fake.statePath,
        PATH: `${fake.root}${path.delimiter}${process.env.PATH ?? ""}`,
      },
      maxBuffer: 10 * 1024 * 1024,
    });
    return { exitCode: 0, stdout: String(result.stdout), stderr: String(result.stderr) };
  } catch (error: unknown) {
    const execError = error as { code?: number; stdout?: string; stderr?: string };
    return {
      exitCode: Number.isInteger(execError.code) ? Number(execError.code) : 1,
      stdout: execError.stdout ?? "",
      stderr: execError.stderr ?? String(error),
    };
  }
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("verify release-evidence PR script", () => {
  it("correlates a new exact-SHA run, publishes its check, and completes auto-merge", async () => {
    const fake = await makeFakeGh();
    const result = await runScript(fake);

    expect(result.exitCode).toBe(0);
    const payload = JSON.parse(result.stdout) as {
      state: string;
      closure_sha: string;
      ci_run_id: number;
      ci_run_url: string;
    };
    expect(payload).toMatchObject({
      state: "merged",
      closure_sha: SHA,
      ci_run_id: 201,
      ci_run_url: "https://github.com/basilisk-labs/agentplane/actions/runs/201",
    });

    const state = JSON.parse(await readFile(fake.statePath, "utf8")) as {
      calls: string[][];
      runListCalls: number;
    };
    expect(state.runListCalls).toBe(3);
    const listCalls = state.calls.filter((args) => args[0] === "run" && args[1] === "list");
    expect(listCalls).toHaveLength(3);
    for (const args of listCalls) {
      expect(args).toContain("--branch");
      expect(args).toContain(REF);
      expect(args).toContain("--commit");
      expect(args).toContain(SHA);
      expect(args).toContain("workflow_dispatch");
    }

    const workflowIndex = state.calls.findIndex(
      (args) => args[0] === "workflow" && args[1] === "run",
    );
    const watchIndex = state.calls.findIndex((args) => args[0] === "run" && args[1] === "watch");
    const checkIndex = state.calls.findIndex((args) => args[0] === "api");
    const prChecksIndex = state.calls.findIndex((args) => args[0] === "pr" && args[1] === "checks");
    const mergeIndexes = state.calls
      .map((args, index) => ({ args, index }))
      .filter(({ args }) => args[0] === "pr" && args[1] === "merge");
    expect(workflowIndex).toBeGreaterThanOrEqual(0);
    expect(watchIndex).toBeGreaterThan(workflowIndex);
    expect(checkIndex).toBeGreaterThan(watchIndex);
    expect(prChecksIndex).toBeGreaterThan(checkIndex);
    expect(mergeIndexes).toHaveLength(2);
    expect(mergeIndexes[0]?.index).toBeGreaterThan(prChecksIndex);
    expect(mergeIndexes[1]?.args).toContain("--auto");

    const watchCall = state.calls[watchIndex] ?? [];
    expect(watchCall).toContain("201");
    expect(watchCall).not.toContain("101");
    const checkCall = state.calls[checkIndex] ?? [];
    expect(checkCall).toContain(`head_sha=${SHA}`);
    expect(checkCall).toContain(
      "details_url=https://github.com/basilisk-labs/agentplane/actions/runs/201",
    );
  });

  it("fails instead of reusing a pre-existing run for the same SHA", async () => {
    const fake = await makeFakeGh();
    const result = await runScript(fake, { FAKE_GH_MODE: "stale" });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("No new ci.yml workflow_dispatch run appeared");
    const state = JSON.parse(await readFile(fake.statePath, "utf8")) as { calls: string[][] };
    expect(state.calls).not.toContainEqual(expect.arrayContaining(["watch", "101"]));
    expect(state.calls.some((args) => args[0] === "api")).toBe(false);
    expect(state.calls.some((args) => args[0] === "pr" && args[1] === "merge")).toBe(false);
  });
});
