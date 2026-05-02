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
    };
    const checksums = await readFile(path.join(outDir, "SHA256SUMS"), "utf8");

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
    for (const asset of manifest.platformAssets) {
      expect(manifest.releaseAssets.map((releaseAsset) => releaseAsset.name)).toContain(asset.name);
      expect(checksums).toContain(asset.name);
      expect(existsSync(path.join(outDir, asset.name))).toBe(true);
    }
  }, 90_000);

  it("validates standalone assets during release distribution check", async () => {
    const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--check"], {
      cwd: process.cwd(),
    });

    expect(stdout).toContain("release distribution check");
  }, 90_000);
});
