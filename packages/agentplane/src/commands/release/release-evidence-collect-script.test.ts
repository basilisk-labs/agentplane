import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/evidence-collect.mjs");
const RELEASE_SHA = "a".repeat(40);
const roots: string[] = [];

async function writeExecutable(filePath: string, source: string) {
  await writeFile(filePath, source, "utf8");
  await chmod(filePath, 0o755);
}

async function makeHarness() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-evidence-"));
  roots.push(root);
  const binDir = path.join(root, "bin");
  await mkdir(binDir, { recursive: true });
  const publishResultPath = path.join(root, "publish-result.json");
  const evidencePath = path.join(root, "evidence.json");
  const artifactPath = path.join(root, "artifact.json");
  await writeFile(
    artifactPath,
    `${JSON.stringify({
      schemaVersion: 1,
      success: true,
      reasonCode: "publish_succeeded",
      sha: RELEASE_SHA,
      version: "0.7.3",
      tag: "v0.7.3",
    })}\n`,
    "utf8",
  );

  await writeExecutable(
    path.join(binDir, "git"),
    [
      "#!/usr/bin/env node",
      "const args = process.argv.slice(2);",
      `const sha = ${JSON.stringify(RELEASE_SHA)};`,
      'if (args[0] === "rev-list") { console.log(sha); process.exit(0); }',
      'if (args[0] === "rev-parse" && args[1] === "HEAD") { console.log("current-head"); process.exit(0); }',
      'if (args[0] === "ls-remote") { console.log(`${sha}\\trefs/tags/v0.7.3`); process.exit(0); }',
      "process.exit(91);",
      "",
    ].join("\n"),
  );
  await writeExecutable(
    path.join(binDir, "npm"),
    [
      "#!/usr/bin/env node",
      'if (process.argv[2] === "view") { console.log("0.7.3"); process.exit(0); }',
      "process.exit(91);",
      "",
    ].join("\n"),
  );
  await writeExecutable(
    path.join(binDir, "bun"),
    [
      "#!/usr/bin/env node",
      'if (process.env.TEST_AUDIT_FAIL === "1") { console.log(JSON.stringify({ ok: false, failures: ["fixture"] })); process.exit(1); }',
      "console.log(JSON.stringify({ ok: true, failures: [] }));",
      "",
    ].join("\n"),
  );
  await writeExecutable(
    path.join(binDir, "gh"),
    [
      "#!/usr/bin/env node",
      "const { copyFileSync, mkdirSync } = require('node:fs');",
      "const path = require('node:path');",
      "const args = process.argv.slice(2);",
      'if (args[0] === "repo" && args[1] === "view") { console.log("basilisk-labs/agentplane"); process.exit(0); }',
      'if (args[0] === "release" && args[1] === "view") { console.log(JSON.stringify({ tagName: "v0.7.3", isDraft: false, isPrerelease: false })); process.exit(0); }',
      'if (args[0] === "run" && args[1] === "list") { console.log(JSON.stringify([{ databaseId: 73, headSha: process.env.TEST_RELEASE_SHA, status: "completed", conclusion: "success", createdAt: "2026-08-05T00:00:00Z" }])); process.exit(0); }',
      'if (args[0] === "run" && args[1] === "download") {',
      '  if (process.env.TEST_DOWNLOAD_FAIL === "1") process.exit(2);',
      '  const dir = args[args.indexOf("--dir") + 1];',
      "  mkdirSync(dir, { recursive: true });",
      '  copyFileSync(process.env.TEST_PUBLISH_ARTIFACT, path.join(dir, "publish-result.json"));',
      "  process.exit(0);",
      "}",
      "process.exit(91);",
      "",
    ].join("\n"),
  );

  return { root, binDir, publishResultPath, evidencePath, artifactPath };
}

async function runCollect(
  harness: Awaited<ReturnType<typeof makeHarness>>,
  extraEnv: Record<string, string> = {},
) {
  return execFileAsync(
    "node",
    [
      SCRIPT_PATH,
      "--version",
      "0.7.3",
      "--out",
      harness.evidencePath,
      "--publish-result",
      harness.publishResultPath,
      "--github-repo",
      "basilisk-labs/agentplane",
      "--json",
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${harness.binDir}${path.delimiter}${process.env.PATH ?? ""}`,
        TEST_RELEASE_SHA: RELEASE_SHA,
        TEST_PUBLISH_ARTIFACT: harness.artifactPath,
        ...extraEnv,
      },
    },
  );
}

function readErrorStdout(error: unknown): string {
  if (!error || typeof error !== "object" || !("stdout" in error)) throw error;
  const stdout = error.stdout;
  if (typeof stdout === "string") return stdout;
  if (Buffer.isBuffer(stdout)) return stdout.toString("utf8");
  return "";
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("release evidence collection", () => {
  it("downloads the exact-SHA publish result and closes the evidence state", async () => {
    const harness = await makeHarness();
    const result = await runCollect(harness);
    const payload = JSON.parse(result.stdout) as {
      ok: boolean;
      release_sha: string;
      failures: string[];
      publish_result: { source: string; run_id: number; identity_matches: boolean };
    };

    expect(payload).toMatchObject({
      ok: true,
      release_sha: RELEASE_SHA,
      failures: [],
      publish_result: {
        source: "github_artifact",
        run_id: 73,
        identity_matches: true,
      },
    });
    expect(JSON.parse(await readFile(harness.evidencePath, "utf8"))).toMatchObject({
      ok: true,
      tag: "v0.7.3",
      release_sha: RELEASE_SHA,
    });

    const repeatedResult = await runCollect(harness);
    const repeated = JSON.parse(repeatedResult.stdout) as {
      ok: boolean;
      publish_result: { source: string; run_id: number };
    };
    expect(repeated).toMatchObject({
      ok: true,
      publish_result: { source: "local", run_id: 73 },
    });
  });

  it("writes diagnostic evidence and exits nonzero when hosted evidence is incomplete", async () => {
    const harness = await makeHarness();
    let stdout = "";
    try {
      await runCollect(harness, { TEST_DOWNLOAD_FAIL: "1" });
      throw new Error("expected release evidence collection to fail");
    } catch (error) {
      stdout = readErrorStdout(error);
    }
    const payload = JSON.parse(stdout) as { ok: boolean; failures: string[] };

    expect(payload.ok).toBe(false);
    expect(payload.failures).toContain("exact-SHA publish-result artifact is unavailable");
    expect(payload.failures).toContain("post-publish platform audit failed");
    expect(JSON.parse(await readFile(harness.evidencePath, "utf8"))).toMatchObject({ ok: false });
  });

  it("exits nonzero when the post-publish platform audit rejects the artifact", async () => {
    const harness = await makeHarness();
    let stdout = "";
    try {
      await runCollect(harness, { TEST_AUDIT_FAIL: "1" });
      throw new Error("expected release evidence collection to fail");
    } catch (error) {
      stdout = readErrorStdout(error);
    }
    const payload = JSON.parse(stdout) as { ok: boolean; failures: string[] };

    expect(payload.ok).toBe(false);
    expect(payload.failures).toContain("post-publish platform audit failed");
  });
});
