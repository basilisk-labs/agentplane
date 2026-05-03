import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/generate-bun-cli-assets.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-bun-assets-test-"));
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

describe("generate-bun-cli-assets script", () => {
  it("generates synthetic Bun executable asset layout and manifest", async () => {
    const outDir = path.join(await makeTempRoot(), "out");

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
        "--synthetic-binary",
      ],
      { cwd: process.cwd(), timeout: 90_000 },
    );

    const manifest = JSON.parse(await readFile(path.join(outDir, "bun-assets.json"), "utf8")) as {
      assets: {
        name: string;
        kind: string;
        platform: string;
        arch: string;
        bunTarget: string;
        installStrategy: string;
        entrypoint: string;
        dependencyStatus: string;
      }[];
    };

    expect(manifest.assets).toHaveLength(5);
    expect(manifest.assets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-linux-x64.tar.gz",
        kind: "bun_executable",
        platform: "linux",
        arch: "x64",
        bunTarget: "bun-linux-x64",
        installStrategy: "bun_single_file_executable",
        entrypoint: "bin/agentplane",
        dependencyStatus: "synthetic_check_mode",
      }),
    );
    expect(manifest.assets).toContainEqual(
      expect.objectContaining({
        name: "agentplane-bun-v1.2.3-win32-x64.zip",
        platform: "win32",
        entrypoint: "bin/agentplane.exe",
      }),
    );
    for (const asset of manifest.assets) {
      expect(existsSync(path.join(outDir, asset.name))).toBe(true);
    }
  }, 90_000);

  it("validates Bun executable assets in check mode", async () => {
    const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--check"], {
      cwd: process.cwd(),
      timeout: 90_000,
    });

    expect(stdout).toContain("bun executable assets check");
  }, 90_000);
});
