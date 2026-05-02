import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-homebrew-formula.mjs");
const tempRoots: string[] = [];

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
  it("renders a cached tarball npm install without Homebrew min-release-age arguments", async () => {
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
          packages: {
            agentplane: {
              npmTarballUrl: "https://registry.npmjs.org/agentplane/-/agentplane-0.4.1.tgz",
              npmTarballSha256: "76edd130dceddb1d15313a5feb3819c513c815b350b9abc822b3ea4712ccc74b",
            },
          },
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
    };
    expect(formula).toContain('version "0.4.1"');
    expect(formula).toContain("cached_download");
    expect(formula).toContain('"--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund"');
    expect(formula).not.toContain("std_npm_args");
    expect(formula).not.toContain("--min-release-age");
    expect(evidence.installStrategy).toBe("npm_global_cached_tarball");
  });
});
