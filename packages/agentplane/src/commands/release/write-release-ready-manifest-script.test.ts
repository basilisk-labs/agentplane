import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/write-release-ready-manifest.mjs");

const roots: string[] = [];

async function writePackageJson(root: string, relDir: string, data: Record<string, unknown>) {
  const dir = path.join(root, relDir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "package.json"), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function initWorkspace({
  coreVersion = "1.2.3",
  cliVersion = "1.2.3",
  dependencyVersion = "1.2.3",
  writeNotes = true,
}: {
  coreVersion?: string;
  cliVersion?: string;
  dependencyVersion?: string;
  writeNotes?: boolean;
}) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-ready-"));
  roots.push(root);
  await writePackageJson(root, "packages/core", {
    name: "@agentplaneorg/core",
    version: coreVersion,
  });
  await writePackageJson(root, "packages/agentplane", {
    name: "agentplane",
    version: cliVersion,
    dependencies: {
      "@agentplaneorg/core": dependencyVersion,
    },
  });
  if (writeNotes) {
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });
    await writeFile(path.join(root, "docs", "releases", `v${cliVersion}.md`), "# Notes\n", "utf8");
  }
  return root;
}

async function writeNpmStub(root: string, scriptContent: string) {
  const binDir = path.join(root, "bin");
  await mkdir(binDir, { recursive: true });
  const npmPath = path.join(binDir, "npm");
  await writeFile(npmPath, `${scriptContent}\n`, { encoding: "utf8", mode: 0o755 });
  return binDir;
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("write-release-ready-manifest script", () => {
  it("emits a ready manifest with registry snapshot metadata", async () => {
    const root = await initWorkspace({});
    const outPath = path.join(root, ".agentplane", ".release", "ready", "release-ready.json");
    const binDir = await writeNpmStub(
      root,
      [
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        'if [[ "$2" == "@agentplaneorg/core@1.2.3" ]]; then',
        '  echo "1.2.3"',
        "  exit 0",
        "fi",
        "echo 'npm error code E404' >&2",
        "exit 1",
        "",
      ].join("\n"),
    );

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--json", "--check-registry", "--sha", "abc123", "--out", outPath],
      {
        cwd: root,
        env: {
          ...process.env,
          PATH: `${binDir}:${process.env.PATH ?? ""}`,
          GITHUB_REF: "refs/heads/main",
          GITHUB_WORKFLOW: "Core CI",
        },
      },
    );
    const payload = JSON.parse(String(result.stdout ?? "")) as {
      ready: boolean;
      reasonCode: string;
      sha: string | null;
      tag: string;
      registry: {
        checked: boolean;
        status: string;
        corePublished: boolean | null;
        cliPublished: boolean | null;
      };
      source: { workflow: string | null };
    };

    expect(payload.ready).toBe(true);
    expect(payload.reasonCode).toBe("ready");
    expect(payload.sha).toBe("abc123");
    expect(payload.tag).toBe("v1.2.3");
    expect(payload.registry.checked).toBe(true);
    expect(payload.registry.status).toBe("checked");
    expect(payload.registry.corePublished).toBe(true);
    expect(payload.registry.cliPublished).toBe(false);
    expect(payload.source.workflow).toBe("Core CI");

    const manifestText = await execFileAsync("cat", [outPath], { cwd: root });
    expect(String(manifestText.stdout ?? "")).toContain('"ready": true');
  });

  it("marks the workspace not ready when release notes are missing", async () => {
    const root = await initWorkspace({ writeNotes: false });
    const result = await execFileAsync("node", [SCRIPT_PATH, "--json"], { cwd: root });
    const payload = JSON.parse(String(result.stdout ?? "")) as {
      ready: boolean;
      reasonCode: string;
      nextAction: string;
    };

    expect(payload.ready).toBe(false);
    expect(payload.reasonCode).toBe("release_notes_missing");
    expect(payload.nextAction).toContain("docs/releases/v1.2.3.md");
  });

  it("marks the workspace not ready when package version parity drift exists", async () => {
    const root = await initWorkspace({
      coreVersion: "1.2.3",
      cliVersion: "1.2.4",
      dependencyVersion: "1.2.2",
    });
    const result = await execFileAsync("node", [SCRIPT_PATH, "--json"], { cwd: root });
    const payload = JSON.parse(String(result.stdout ?? "")) as {
      ready: boolean;
      reasonCode: string;
      message: string;
    };

    expect(payload.ready).toBe(false);
    expect(payload.reasonCode).toBe("release_version_parity_drift");
    expect(payload.message).toContain("core=1.2.3");
    expect(payload.message).toContain("agentplane=1.2.4");
  });
});
