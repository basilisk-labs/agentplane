import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/generate-release-distribution.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-distribution-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("generate-release-distribution script", () => {
  it("embeds standalone platform assets in the release distribution manifest", async () => {
    const outDir = path.join(await makeTempRoot(), "distribution");

    await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--out",
        outDir,
        "--version",
        "1.2.3",
        "--tag",
        "v1.2.3",
        "--sha",
        "abc123",
        "--standalone-check-mode",
      ],
      { cwd: process.cwd() },
    );

    const manifest = JSON.parse(
      await readFile(path.join(outDir, "release-distribution.json"), "utf8"),
    ) as {
      platformAssets: {
        name: string;
        kind: string;
        platform: string;
        arch: string;
        installStrategy: string;
        entrypoint: string;
      }[];
      releaseAssets: { name: string; kind: string }[];
      bunAssets: {
        name: string;
        kind: string;
        platform: string;
        arch: string;
        installStrategy: string;
        entrypoint: string;
      }[];
    };
    const checksums = await readFile(path.join(outDir, "SHA256SUMS"), "utf8");
    const installSh = await readFile(path.join(outDir, "install.sh"), "utf8");
    const installPs1 = await readFile(path.join(outDir, "install.ps1"), "utf8");

    expect(manifest.platformAssets).toHaveLength(5);
    expect(manifest.platformAssets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-v1.2.3-darwin-arm64.tar.gz",
        kind: "standalone_cli",
        platform: "darwin",
        arch: "arm64",
        installStrategy: "bundled_node",
        entrypoint: "bin/agentplane",
      }),
    );
    expect(manifest.platformAssets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-v1.2.3-win32-x64.zip",
        kind: "standalone_cli",
        platform: "win32",
        arch: "x64",
        installStrategy: "bundled_node",
        entrypoint: "bin/agentplane.cmd",
      }),
    );
    expect(manifest.releaseAssets.map((asset) => asset.name)).toContain("standalone-assets.json");
    expect(manifest.releaseAssets.map((asset) => asset.name)).toContain("bun-assets.json");
    expect(manifest.bunAssets).toHaveLength(5);
    expect(manifest.bunAssets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-darwin-arm64.tar.gz",
        kind: "bun_executable",
        platform: "darwin",
        arch: "arm64",
        installStrategy: "bun_single_file_executable",
        entrypoint: "bin/agentplane",
      }),
    );
    expect(manifest.bunAssets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-win32-x64.zip",
        kind: "bun_executable",
        platform: "win32",
        arch: "x64",
        installStrategy: "bun_single_file_executable",
        entrypoint: "bin/agentplane.exe",
      }),
    );
    for (const asset of manifest.platformAssets) {
      expect(manifest.releaseAssets.map((releaseAsset) => releaseAsset.name)).toContain(asset.name);
      expect(checksums).toContain(asset.name);
      expect(existsSync(path.join(outDir, asset.name))).toBe(true);
    }
    for (const asset of manifest.bunAssets) {
      expect(manifest.releaseAssets.map((releaseAsset) => releaseAsset.name)).toContain(asset.name);
      expect(checksums).toContain(asset.name);
      expect(existsSync(path.join(outDir, asset.name))).toBe(true);
    }
    expect(installSh).toContain("SHA256SUMS");
    expect(installSh).toContain('CHANNEL="${AGENTPLANE_INSTALL_CHANNEL:-standalone}"');
    expect(installSh).toContain('asset="agentplane-v$VERSION-$platform-$arch.tar.gz"');
    expect(installSh).toContain('asset="agentplane-bun-v$VERSION-$platform-$arch.tar.gz"');
    expect(installSh).toContain('"$INSTALL_DIR/bin/agentplane" --version');
    expect(installSh).not.toContain("npm install");
    expect(installSh).not.toContain("need node");
    expect(installPs1).toContain("SHA256SUMS");
    expect(installPs1).toContain("$Channel = if ($env:AGENTPLANE_INSTALL_CHANNEL)");
    expect(installPs1).toContain('"agentplane-v$Version-win32-x64.zip"');
    expect(installPs1).toContain('"agentplane-bun-v$Version-win32-x64.zip"');
    expect(installPs1).toContain(String.raw`-split '\s+'`);
    expect(installPs1).toContain(String.raw`"bin\agentplane.cmd"`);
    expect(installPs1).toContain(String.raw`"bin\agentplane.exe"`);
    expect(installPs1).toContain("Join-Path $InstallDir $AgentplaneBin");
    expect(installPs1).not.toContain("npm install");
    expect(installPs1).not.toContain('Require-Command "node"');
  }, 90_000);

  it("validates standalone assets during release distribution check", async () => {
    const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--check"], {
      cwd: process.cwd(),
    });

    expect(stdout).toContain("release distribution check");
  }, 90_000);
});
