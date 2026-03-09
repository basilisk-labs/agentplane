import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-recovery-state.mjs");

const workspaces: string[] = [];

async function initReleaseRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-release-recovery-"));
  workspaces.push(root);

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Release Recovery Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "release-recovery@example.com"], {
    cwd: root,
  });

  await mkdir(path.join(root, "packages", "core"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", ".release", "plan", "2026-03-08T00-00-00-000Z"), {
    recursive: true,
  });
  await mkdir(path.join(root, "docs", "releases"), { recursive: true });

  await writeFile(
    path.join(root, "packages", "core", "package.json"),
    JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    JSON.stringify(
      { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", ".release", "plan", "2026-03-08T00-00-00-000Z", "version.json"),
    JSON.stringify(
      {
        prevTag: "v0.2.6",
        prevVersion: "0.2.6",
        nextTag: "v0.2.7",
        nextVersion: "0.2.7",
        bump: "patch",
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  await writeFile(path.join(root, "tracked.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

  return root;
}

async function runScript(
  root: string,
  args: string[] = [],
): Promise<{ stdout: string; stderr: string }> {
  const result = await execFileAsync("node", [SCRIPT_PATH, ...args], {
    cwd: root,
    env: process.env,
  });
  return {
    stdout: String(result.stdout ?? ""),
    stderr: String(result.stderr ?? ""),
  };
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("release recovery script", () => {
  it("reports a local tag that was not pushed to the remote", async () => {
    const root = await initReleaseRepo();
    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });
    await execFileAsync("git", ["push", "-u", "origin", "main"], { cwd: root });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

    const { stdout } = await runScript(root, ["--json"]);
    const payload = JSON.parse(stdout) as {
      current: { localTagPresent: boolean; remote: { tagPresent: boolean } };
      findings: { code: string; nextAction?: string }[];
    };

    expect(payload.current.localTagPresent).toBe(true);
    expect(payload.current.remote.tagPresent).toBe(false);
    expect(
      payload.findings.some((finding) => finding.code === "release_local_tag_not_pushed"),
    ).toBe(true);
    expect(
      payload.findings.find((finding) => finding.code === "release_local_tag_not_pushed")
        ?.nextAction,
    ).toContain("git push origin HEAD");
  }, 60_000);

  it("reports release-note drift and locally bumped versions without a local tag", async () => {
    const root = await initReleaseRepo();
    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.7" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.7", dependencies: { "@agentplaneorg/core": "0.2.7" } },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    const { stdout } = await runScript(root, ["--json"]);
    const payload = JSON.parse(stdout) as {
      findings: { code: string }[];
    };

    expect(payload.findings.some((finding) => finding.code === "release_notes_missing")).toBe(true);
    expect(
      payload.findings.some(
        (finding) => finding.code === "release_versions_bumped_without_local_tag",
      ),
    ).toBe(true);
  }, 60_000);

  it("reports burned npm versions when registry checking is requested", async () => {
    const root = await initReleaseRepo();
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "check-npm-version-availability.mjs"),
      [
        String.raw`process.stderr.write('Version already published: agentplane@0.2.7\n');`,
        "process.exitCode = 1;",
        "",
      ].join("\n"),
      "utf8",
    );

    const { stdout } = await runScript(root, ["--json", "--check-registry"]);
    const payload = JSON.parse(stdout) as {
      current: { registry: { checked: boolean; status: string; detail: string } };
      findings: { code: string }[];
    };

    expect(payload.current.registry.checked).toBe(true);
    expect(payload.current.registry.status).toBe("blocked");
    expect(payload.current.registry.detail).toContain("Version already published");
    expect(payload.findings.some((finding) => finding.code === "release_npm_version_burned")).toBe(
      true,
    );
  }, 60_000);

  it("prints help text", async () => {
    const root = await initReleaseRepo();
    const { stdout } = await runScript(root, ["--help"]);
    expect(stdout).toContain("Usage: node scripts/check-release-recovery-state.mjs");
    expect(stdout).toContain("--check-registry");
  }, 60_000);
});
