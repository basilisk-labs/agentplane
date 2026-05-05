import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-homebrew-formula.mjs");
const tempRoots: string[] = [];
const externalChannelSwitchGate = {
  defaultInstallStrategy: "bun_single_file_executable",
  candidateInstallStrategy: "bun_single_file_executable",
  bunDefaultEligible: true,
};

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-homebrew-formula-"));
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

describe("render-homebrew-formula script", () => {
  it("renders a Bun macOS formula without Node or npm install dependencies", async () => {
    const root = await makeTempRoot();
    const manifestPath = path.join(root, "release-distribution.json");
    const outDir = path.join(root, "homebrew");
    await mkdir(root, { recursive: true });
    await writeFile(
      manifestPath,
      `${JSON.stringify(
        {
          version: "0.4.1",
          tag: "v0.4.1",
          sha: "abc123",
          externalChannelSwitchGate,
          bunAssets: [
            {
              name: "agentplane-bun-v0.4.1-darwin-arm64.tar.gz",
              kind: "bun_executable",
              platform: "darwin",
              arch: "arm64",
              archive: "tar.gz",
              url: "https://github.com/basilisk-labs/agentplane/releases/download/v0.4.1/agentplane-bun-v0.4.1-darwin-arm64.tar.gz",
              sha256: "76edd130dceddb1d15313a5feb3819c513c815b350b9abc822b3ea4712ccc74b",
            },
            {
              name: "agentplane-bun-v0.4.1-darwin-x64.tar.gz",
              kind: "bun_executable",
              platform: "darwin",
              arch: "x64",
              archive: "tar.gz",
              url: "https://github.com/basilisk-labs/agentplane/releases/download/v0.4.1/agentplane-bun-v0.4.1-darwin-x64.tar.gz",
              sha256: "31fa4f4f74bf683e8f3933e339e3c731c5a9a840fc50134a6d2d77c1ef9441bb",
            },
          ],
          channels: {
            homebrewTap: {
              status: "skipped_missing_credentials",
              requiredSecret: "HOMEBREW_TAP_TOKEN",
            },
          },
        },
        null,
        2,
      )}\n`,
    );

    await execFileAsync("node", [SCRIPT_PATH, "--manifest", manifestPath, "--out", outDir], {
      cwd: process.cwd(),
    });

    const formula = await readFile(path.join(outDir, "Formula", "agentplane.rb"), "utf8");
    const evidence = JSON.parse(
      await readFile(path.join(outDir, "homebrew-result.json"), "utf8"),
    ) as {
      installStrategy: string;
      externalChannelSwitchGate: { bunDefaultEligible: boolean };
      assets: { darwinArm64: { name: string }; darwinX64: { name: string } };
    };
    expect(formula).toContain('version "0.4.1"');
    expect(formula).toContain("Hardware::CPU.arm?");
    expect(formula).toContain("agentplane-bun-v0.4.1-darwin-arm64.tar.gz");
    expect(formula).toContain("agentplane-bun-v0.4.1-darwin-x64.tar.gz");
    expect(formula).toContain('bin.install_symlink libexec/"bin/agentplane" => "agentplane"');
    expect(formula).not.toContain('depends_on "node"');
    expect(formula).not.toContain("cached_download");
    expect(formula).not.toContain("npm");
    expect(formula).not.toContain("std_npm_args");
    expect(formula).not.toContain("--min-release-age");
    expect(evidence.installStrategy).toBe("bun_single_file_executable");
    expect(evidence.externalChannelSwitchGate.bunDefaultEligible).toBe(true);
    expect(evidence.assets.darwinArm64.name).toBe("agentplane-bun-v0.4.1-darwin-arm64.tar.gz");
    expect(evidence.assets.darwinX64.name).toBe("agentplane-bun-v0.4.1-darwin-x64.tar.gz");
  });
});
