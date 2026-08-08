import { execFile } from "node:child_process";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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
    tag_exists: true,
    tag_commit: "abc123release",
    latest_plan: { nextTag: "v0.6.8" },
    notes_exists: true,
    publish_result_exists: false,
    evidence_path: ".agentplane/.release/evidence/v0.6.8.json",
    evidence_exists: false,
    evidence_valid: false,
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
  target: {
    nextVersion: "0.6.8",
    nextTag: "v0.6.8",
  },
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
  it("resolves GitHub repo and token from gh when env is absent", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "agentplane-release-gh-fallback-"));
    temps.push(dir);
    const fakeGh = path.join(dir, "gh");
    await writeFile(
      fakeGh,
      [
        "#!/bin/sh",
        'if [ "$1" = "auth" ] && [ "$2" = "token" ]; then echo gh-token; exit 0; fi',
        'if [ "$1" = "repo" ] && [ "$2" = "view" ]; then echo basilisk-labs/agentplane; exit 0; fi',
        "exit 1",
        "",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeGh, 0o755);

    const result = await execFileAsync(
      "node",
      [
        "--input-type=module",
        "-e",
        [
          "import { resolveGithubRepo, resolveGithubToken } from './scripts/lib/github-actions-workflow-status.mjs';",
          "console.log(`${resolveGithubRepo()} ${resolveGithubToken()}`);",
        ].join(" "),
      ],
      {
        env: {
          ...process.env,
          PATH: `${dir}${path.delimiter}${process.env.PATH ?? ""}`,
          GITHUB_REPOSITORY: "",
          GITHUB_TOKEN: "",
          GH_TOKEN: "",
        },
      },
    );

    expect(result.stdout.trim()).toBe("basilisk-labs/agentplane gh-token");
  });

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
    expect(result.stdout).toContain("Release evidence: missing");
    expect(result.stdout).toContain("Next action: collect hosted publish evidence");
    expect(result.stdout).toContain("Command: bun run release:evidence:collect");
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
      recovery_applicability: { applicable: boolean };
    };
    expect(payload.schema_version).toBe(2);
    expect(payload.releaseSha).toBe("abc123release");
    expect(payload.truth.githubRelease.state).toBe("present");
    expect(payload.truth.registry).toContain("@agentplaneorg/core");
    expect(payload.command).toBe("bun run release:evidence:collect");
    expect(payload.recovery_applicability.applicable).toBe(true);
  });

  it("does not mix a stale recovery plan into the current release target", async () => {
    const currentState = structuredClone(releaseState);
    currentState.release.version = "0.7.3";
    currentState.release.tag = "v0.7.3";
    currentState.release.tag_commit = "current073sha";
    currentState.release.latest_plan = { nextTag: "v0.6.8" };
    currentState.release.evidence_path = ".agentplane/.release/evidence/v0.7.3.json";
    currentState.registry.packages = currentState.registry.packages.map((entry) => ({
      ...entry,
      version: "0.7.3",
    }));
    const statePath = await writeJsonFixture("state.json", currentState);
    const recoveryPath = await writeJsonFixture("recovery.json", recoveryReport);
    const githubReleasePath = await writeJsonFixture("github-release.json", {
      state: "present",
      tagName: "v0.7.3",
    });

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
      action: string;
      command: string;
      releaseSha: string;
      truth: { releaseReady: string; publish: string; publishResult: string };
      recovery: unknown;
      recovery_applicability: { applicable: boolean; reason: string };
    };

    expect(payload.releaseSha).toBe("current073sha");
    expect(payload.action).toBe("collect hosted publish evidence");
    expect(payload.command).toBe("bun run release:evidence:collect");
    expect(payload.truth).toMatchObject({
      releaseReady: "skipped",
      publish: "skipped",
      publishResult: "skipped",
    });
    expect(payload.recovery).toBeNull();
    expect(payload.recovery_applicability.applicable).toBe(false);
    expect(payload.recovery_applicability.reason).toContain("does not match current v0.7.3");
  });

  it("moves to the next patch plan after exact current release evidence is valid", async () => {
    const closedState = structuredClone(releaseState);
    closedState.release.evidence_exists = true;
    closedState.release.evidence_valid = true;
    const statePath = await writeJsonFixture("state.json", closedState);
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
    const payload = JSON.parse(result.stdout) as { action: string; command: string };

    expect(payload.action).toBe("generate a fresh release plan for the next patch");
    expect(payload.command).toBe("ap release plan --patch");
  });

  it.each([
    ["missing", null],
    ["stale", { nextVersion: "0.6.7", nextTag: "v0.6.7" }],
    ["current", { nextVersion: "0.6.8", nextTag: "v0.6.8" }],
    ["invalid", { nextVersion: "not-semver", nextTag: "v0.6.9" }],
    ["inconsistent", { nextVersion: "0.6.9", nextTag: "v0.7.0" }],
    ["version-only", { nextVersion: "0.6.9" }],
    ["tag-only", { nextTag: "v0.6.9" }],
  ])("requests a fresh patch plan for a %s latest plan", async (_label, latestPlan) => {
    const closedState = structuredClone(releaseState);
    closedState.release.evidence_exists = true;
    closedState.release.evidence_valid = true;
    closedState.release.latest_plan = latestPlan as typeof closedState.release.latest_plan;
    const statePath = await writeJsonFixture("state.json", closedState);
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
    const payload = JSON.parse(result.stdout) as { action: string; command: string };

    expect(payload.action).toBe("generate a fresh release plan for the next patch");
    expect(payload.command).toBe("ap release plan --patch");
  });

  it("prepares a candidate only when valid evidence has a future plan", async () => {
    const closedState = structuredClone(releaseState);
    closedState.release.evidence_exists = true;
    closedState.release.evidence_valid = true;
    closedState.release.latest_plan = { nextVersion: "0.6.9", nextTag: "v0.6.9" };
    const statePath = await writeJsonFixture("state.json", closedState);
    const githubReleasePath = await writeJsonFixture("github-release.json", { state: "present" });

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--check-registry", "--check-github", "--json"],
      {
        env: {
          ...process.env,
          AGENTPLANE_TEST_RELEASE_STATE_PATH: statePath,
          AGENTPLANE_TEST_GITHUB_RELEASE_STATUS_PATH: githubReleasePath,
        },
      },
    );
    const payload = JSON.parse(result.stdout) as { action: string; command: string };

    expect(payload.action).toBe("run release candidate preparation");
    expect(payload.command).toBe("bun run release:candidate:prepare -- --write");
  });

  it("orders future plan components beyond Number.MAX_SAFE_INTEGER without precision loss", async () => {
    const closedState = structuredClone(releaseState);
    closedState.release.version = "9007199254740992.0.0";
    closedState.release.tag = "v9007199254740992.0.0";
    closedState.release.evidence_exists = true;
    closedState.release.evidence_valid = true;
    closedState.release.latest_plan = {
      nextVersion: "9007199254740993.0.0",
      nextTag: "v9007199254740993.0.0",
    };
    const statePath = await writeJsonFixture("state.json", closedState);
    const githubReleasePath = await writeJsonFixture("github-release.json", { state: "present" });

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--check-registry", "--check-github", "--json"],
      {
        env: {
          ...process.env,
          AGENTPLANE_TEST_RELEASE_STATE_PATH: statePath,
          AGENTPLANE_TEST_GITHUB_RELEASE_STATUS_PATH: githubReleasePath,
        },
      },
    );
    const payload = JSON.parse(result.stdout) as { action: string; command: string };

    expect(payload.action).toBe("run release candidate preparation");
    expect(payload.command).toBe("bun run release:candidate:prepare -- --write");
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
