import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCOOP_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-scoop-manifest.mjs");
const SETUP_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-setup-agentplane-action.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-standalone-consumers-"));
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

function platformAsset(platform: string, arch: string, extension: "tar.gz" | "zip") {
  const name = `agentplane-v0.4.1-${platform}-${arch}.${extension}`;
  return {
    name,
    kind: "standalone_cli",
    platform,
    arch,
    archive: extension,
    url: `https://github.com/basilisk-labs/agentplane/releases/download/v0.4.1/${name}`,
    sha256:
      platform === "win32"
        ? "76edd130dceddb1d15313a5feb3819c513c815b350b9abc822b3ea4712ccc74b"
        : "31fa4f4f74bf683e8f3933e339e3c731c5a9a840fc50134a6d2d77c1ef9441bb",
  };
}

async function writeManifest(root: string) {
  const manifestPath = path.join(root, "release-distribution.json");
  await mkdir(root, { recursive: true });
  await writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        version: "0.4.1",
        tag: "v0.4.1",
        sha: "abc123",
        repository: "basilisk-labs/agentplane",
        platformAssets: [
          platformAsset("darwin", "arm64", "tar.gz"),
          platformAsset("darwin", "x64", "tar.gz"),
          platformAsset("linux", "arm64", "tar.gz"),
          platformAsset("linux", "x64", "tar.gz"),
          platformAsset("win32", "x64", "zip"),
        ],
        channels: {
          scoopBucket: {
            status: "skipped_missing_credentials",
            requiredSecret: "SCOOP_BUCKET_TOKEN",
          },
          setupAgentplane: {
            status: "skipped_missing_credentials",
            requiredSecret: "SETUP_AGENTPLANE_TOKEN",
          },
        },
      },
      null,
      2,
    )}\n`,
  );
  return manifestPath;
}

describe("standalone consumer renderers", () => {
  it("renders Scoop from the Windows standalone asset without nodejs dependency", async () => {
    const root = await makeTempRoot();
    const manifestPath = await writeManifest(root);
    const outDir = path.join(root, "scoop");

    await execFileAsync("node", [SCOOP_SCRIPT_PATH, "--manifest", manifestPath, "--out", outDir], {
      cwd: process.cwd(),
    });

    const scoop = JSON.parse(await readFile(path.join(outDir, "agentplane.json"), "utf8")) as {
      depends?: string;
      extract_dir?: string;
      architecture: { "64bit": { url: string; hash: string } };
      bin: string[][];
    };
    const evidence = JSON.parse(await readFile(path.join(outDir, "scoop-result.json"), "utf8")) as {
      installStrategy: string;
      assets: { win32X64: { name: string } };
    };

    expect(scoop.depends).toBeUndefined();
    expect(scoop.extract_dir).toBeUndefined();
    expect(scoop.architecture["64bit"].url).toContain("agentplane-v0.4.1-win32-x64.zip");
    expect(scoop.bin).toEqual([[String.raw`bin\agentplane.cmd`, "agentplane"]]);
    expect(evidence.installStrategy).toBe("standalone_bundled_node");
    expect(evidence.assets.win32X64.name).toBe("agentplane-v0.4.1-win32-x64.zip");
  });

  it("renders setup-agentplane from standalone assets with checksum verification", async () => {
    const root = await makeTempRoot();
    const manifestPath = await writeManifest(root);
    const outDir = path.join(root, "setup-agentplane");

    await execFileAsync("node", [SETUP_SCRIPT_PATH, "--manifest", manifestPath, "--out", outDir], {
      cwd: process.cwd(),
    });

    const action = await readFile(path.join(outDir, "action.yml"), "utf8");
    const readme = await readFile(path.join(outDir, "README.md"), "utf8");
    const evidence = JSON.parse(
      await readFile(path.join(outDir, "setup-agentplane-result.json"), "utf8"),
    ) as {
      installStrategy: string;
      assets: { linuxX64: { name: string }; win32X64: { name: string } };
    };

    expect(action).toContain("Linux-X64)");
    expect(action).toContain("Windows-X64)");
    expect(action).toContain("asset_sha256=");
    expect(action).toContain("shasum -a 256");
    expect(action).toContain("Expand-Archive");
    expect(action).toContain("$GITHUB_PATH");
    expect(action).not.toContain("install.sh");
    expect(readme).toContain("standalone bundled-runtime archive checksum");
    expect(evidence.installStrategy).toBe("standalone_bundled_node");
    expect(evidence.assets.linuxX64.name).toBe("agentplane-v0.4.1-linux-x64.tar.gz");
    expect(evidence.assets.win32X64.name).toBe("agentplane-v0.4.1-win32-x64.zip");
  });
});
