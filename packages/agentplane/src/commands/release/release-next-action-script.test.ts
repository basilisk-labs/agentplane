import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/next-action.mjs");
const temps: string[] = [];

async function writeJsonFixture(name: string, payload: unknown) {
  const dir = await mkdtemp(path.join(tmpdir(), "agentplane-release-next-action-"));
  temps.push(dir);
  const filePath = path.join(dir, name);
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return filePath;
}

const releaseState = {
  schema_version: 1,
  git: {
    branch: "main",
    head: "abc123release",
    tracked_dirty: false,
    upstream: { upstream: "origin/main", ahead: 0, behind: 0 },
  },
  release: {
    version: "0.6.8",
    tag: "v0.6.8",
    latest_plan: { nextTag: "v0.6.8" },
    notes_exists: true,
    publish_result_exists: false,
  },
  parity: { ok: true },
  registry: {
    checked: true,
    packages: [
      { name: "@agentplaneorg/core", version: "0.6.8", published: true },
      { name: "@agentplaneorg/recipes", version: "0.6.8", published: true },
      { name: "agentplane", version: "0.6.8", published: true },
    ],
  },
};

const recoveryReport = {
  summary: {
    state: "release_publish_already_succeeded",
    nextAction: "Do not rerun publish; verify release evidence only.",
  },
  current: {
    localTagPresent: true,
    remote: { name: "origin", tagPresent: true },
    github: {
      releaseSha: "abc123release",
      releaseReady: {
        state: "ready_artifact_available",
        runId: 12_345,
        artifactName: "release-ready",
      },
      publish: {
        state: "success",
        conclusion: "success",
      },
      publishResult: {
        state: "available",
        success: true,
        reasonCode: null,
      },
    },
  },
};

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (dir) await rm(dir, { recursive: true, force: true });
  }
});

describe("release next-action script", () => {
  it("prints compact release truth and next action", async () => {
    const statePath = await writeJsonFixture("state.json", releaseState);
    const recoveryPath = await writeJsonFixture("recovery.json", recoveryReport);
    const githubReleasePath = await writeJsonFixture("github-release.json", {
      state: "present",
      tagName: "v0.6.8",
      url: "https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.8",
      publishedAt: "2026-05-23T00:00:00Z",
    });

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--check-registry", "--check-github"],
      {
        env: {
          ...process.env,
          AGENTPLANE_TEST_RELEASE_STATE_PATH: statePath,
          AGENTPLANE_TEST_RELEASE_RECOVERY_REPORT_PATH: recoveryPath,
          AGENTPLANE_TEST_GITHUB_RELEASE_STATUS_PATH: githubReleasePath,
        },
      },
    );

    expect(result.stdout).toContain("Release next action");
    expect(result.stdout).toContain("Release SHA: abc123release");
    expect(result.stdout).toContain(
      "Release-ready: ready_artifact_available run=12345 artifact=release-ready",
    );
    expect(result.stdout).toContain("Publish workflow: success conclusion=success");
    expect(result.stdout).toContain("Publish result: available success=true");
    expect(result.stdout).toContain("NPM registry: published");
    expect(result.stdout).toContain("Git tag: local=present; origin/v0.6.8=present");
    expect(result.stdout).toContain("GitHub release: present");
    expect(result.stdout).toContain("Command: Do not rerun publish; verify release evidence only.");
  });

  it("emits the same diagnostic contract as JSON", async () => {
    const statePath = await writeJsonFixture("state.json", releaseState);
    const recoveryPath = await writeJsonFixture("recovery.json", recoveryReport);
    const githubReleasePath = await writeJsonFixture("github-release.json", { state: "present" });

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--check-registry", "--check-github", "--json"],
      {
        env: {
          ...process.env,
          AGENTPLANE_TEST_RELEASE_STATE_PATH: statePath,
          AGENTPLANE_TEST_RELEASE_RECOVERY_REPORT_PATH: recoveryPath,
          AGENTPLANE_TEST_GITHUB_RELEASE_STATUS_PATH: githubReleasePath,
        },
      },
    );

    const payload = JSON.parse(result.stdout) as {
      schema_version: number;
      releaseSha: string;
      truth: { githubRelease: { state: string }; registry: string };
      command: string;
    };
    expect(payload.schema_version).toBe(2);
    expect(payload.releaseSha).toBe("abc123release");
    expect(payload.truth.githubRelease.state).toBe("present");
    expect(payload.truth.registry).toContain("@agentplaneorg/core");
    expect(payload.command).toBe("Do not rerun publish; verify release evidence only.");
  });

  it("passes --github-repo through to GitHub release lookup", async () => {
    const statePath = await writeJsonFixture("state.json", releaseState);
    const recoveryPath = await writeJsonFixture("recovery.json", recoveryReport);
    const binDir = await mkdtemp(path.join(tmpdir(), "agentplane-release-next-action-bin-"));
    temps.push(binDir);
    const argsPath = path.join(binDir, "gh-args.json");
    const ghPath = path.join(binDir, "gh");
    await writeFile(
      ghPath,
      [
        "#!/usr/bin/env node",
        "const { writeFileSync } = require('node:fs');",
        `writeFileSync(${JSON.stringify(argsPath)}, JSON.stringify(process.argv.slice(2)));`,
        "process.stdout.write(JSON.stringify({ tagName: 'v0.6.8', url: 'https://example.invalid/release' }));",
      ].join("\n"),
      { encoding: "utf8", mode: 0o755 },
    );

    await execFileAsync(
      "node",
      [SCRIPT_PATH, "--check-github", "--github-repo", "other-owner/other-repo", "--json"],
      {
        env: {
          ...process.env,
          PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
          AGENTPLANE_TEST_RELEASE_STATE_PATH: statePath,
          AGENTPLANE_TEST_RELEASE_RECOVERY_REPORT_PATH: recoveryPath,
        },
      },
    );

    const args = JSON.parse(await readFile(argsPath, "utf8")) as string[];
    expect(args).toContain("--repo");
    expect(args).toContain("other-owner/other-repo");
  });
});
