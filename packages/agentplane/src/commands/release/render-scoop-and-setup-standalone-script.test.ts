import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

import { afterEach, describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";

const execFileAsync = promisify(execFile);
const SCOOP_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-scoop-manifest.mjs");
const SETUP_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/render-setup-agentplane-action.mjs");
const tempRoots: string[] = [];
const externalChannelSwitchGate = {
  defaultInstallStrategy: "bun_single_file_executable",
  candidateInstallStrategy: "bun_single_file_executable",
  bunDefaultEligible: true,
};

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
  const name = `agentplane-bun-v0.4.1-${platform}-${arch}.${extension}`;
  return {
    name,
    kind: "bun_executable",
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
        externalChannelSwitchGate,
        bunAssets: [
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

async function setupInstallFixture(cliVersion = "0.4.1") {
  const root = await makeTempRoot();
  const binDir = path.join(root, "payload", "bin");
  await mkdir(binDir, { recursive: true });
  const binary = path.join(binDir, "agentplane");
  await writeFile(binary, `#!/bin/sh\nprintf '%s\\n' '${cliVersion}'\n`);
  await chmod(binary, 0o755);
  const archive = path.join(root, "agentplane.tar.gz");
  await execFileAsync("tar", ["-czf", archive, "-C", path.dirname(binDir), "bin"]);
  const manifestPath = await writeManifest(root);
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
    bunAssets: { platform: string; arch: string; url: string; sha256: string }[];
  };
  const asset = manifest.bunAssets.find(
    (entry) => entry.platform === "linux" && entry.arch === "x64",
  );
  if (!asset) throw new Error("Missing fixture asset");
  asset.url = pathToFileURL(archive).href;
  asset.sha256 = createHash("sha256")
    .update(await readFile(archive))
    .digest("hex");
  await writeFile(manifestPath, JSON.stringify(manifest));
  const outDir = path.join(root, "action");
  await execFileAsync("node", [SETUP_SCRIPT_PATH, "--manifest", manifestPath, "--out", outDir]);
  const action = parseYaml(await readFile(path.join(outDir, "action.yml"), "utf8")) as {
    runs: { steps: { env: Record<string, string>; run: string }[] };
  };
  const step = action.runs.steps[0];
  expect(step?.env).toEqual({
    AGENTPLANE_VERSION: "${{ inputs.version }}",
    AGENTPLANE_VERIFY: "${{ inputs.verify }}",
  });
  if (!step) throw new Error("Missing install step");
  const runnerTemp = path.join(root, "runner temp");
  await mkdir(runnerTemp);
  const githubPath = path.join(root, "github-path");
  await writeFile(githubPath, "");
  const env = {
    ...process.env,
    RUNNER_TEMP: runnerTemp,
    RUNNER_OS: "Linux",
    RUNNER_ARCH: "X64",
    GITHUB_PATH: githubPath,
    AGENTPLANE_VERSION: "0.4.1",
    AGENTPLANE_VERIFY: "true",
  };
  return { root, archive, githubPath, env, script: step.run };
}

describe("standalone consumer renderers", () => {
  it.each(["0.4.1", "v0.4.1"])(
    "keeps a verified %s installation usable in a later step",
    async (version) => {
      const fixture = await setupInstallFixture();
      await execFileAsync("bash", ["-c", fixture.script], {
        cwd: fixture.root,
        env: { ...fixture.env, AGENTPLANE_VERSION: version },
      });
      const pathContent = await readFile(fixture.githubPath, "utf8");
      const installedPath = pathContent.trim();
      expect(installedPath).not.toBe("");
      const { stdout } = await execFileAsync("bash", ["-c", "agentplane --version"], {
        cwd: fixture.root,
        env: { ...fixture.env, PATH: `${installedPath}${path.delimiter}${process.env.PATH ?? ""}` },
      });
      expect(stdout.trim()).toBe("0.4.1");
    },
  );

  it.each(["0.4.2", "$(touch injected)"])(
    "rejects version input %s without executing it",
    async (version) => {
      const fixture = await setupInstallFixture();
      await expect(
        execFileAsync("bash", ["-c", fixture.script], {
          cwd: fixture.root,
          env: { ...fixture.env, AGENTPLANE_VERSION: version },
        }),
      ).rejects.toMatchObject({ code: 2 });
      expect(await readFile(fixture.githubPath, "utf8")).toBe("");
      await expect(readFile(path.join(fixture.root, "injected"))).rejects.toMatchObject({
        code: "ENOENT",
      });
    },
  );

  it("does not add a corrupted archive to PATH", async () => {
    const fixture = await setupInstallFixture();
    await writeFile(fixture.archive, "corrupted archive");
    await expect(
      execFileAsync("bash", ["-c", fixture.script], {
        cwd: fixture.root,
        env: fixture.env,
      }),
    ).rejects.toMatchObject({ code: 2 });
    expect(await readFile(fixture.githubPath, "utf8")).toBe("");
  });

  it("only publishes PATH after the requested CLI verification passes", async () => {
    const fixture = await setupInstallFixture("0.0.0");
    await expect(
      execFileAsync("bash", ["-c", fixture.script], {
        cwd: fixture.root,
        env: fixture.env,
      }),
    ).rejects.toMatchObject({ code: 1 });
    expect(await readFile(fixture.githubPath, "utf8")).toBe("");
    await execFileAsync("bash", ["-c", fixture.script], {
      cwd: fixture.root,
      env: { ...fixture.env, AGENTPLANE_VERIFY: "false" },
    });
    const pathContent = await readFile(fixture.githubPath, "utf8");
    expect(pathContent.trim()).not.toBe("");
  });

  it("renders Scoop from the Windows Bun asset without nodejs dependency", async () => {
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
      externalChannelSwitchGate: { bunDefaultEligible: boolean };
      assets: { win32X64: { name: string } };
    };

    expect(scoop.depends).toBeUndefined();
    expect(scoop.extract_dir).toBeUndefined();
    expect(scoop.architecture["64bit"].url).toContain("agentplane-bun-v0.4.1-win32-x64.zip");
    expect(scoop.bin).toEqual([[String.raw`bin\agentplane.exe`, "agentplane"]]);
    expect(evidence.installStrategy).toBe("bun_single_file_executable");
    expect(evidence.externalChannelSwitchGate.bunDefaultEligible).toBe(true);
    expect(evidence.assets.win32X64.name).toBe("agentplane-bun-v0.4.1-win32-x64.zip");
  });

  it("renders setup-agentplane from Bun assets with checksum verification", async () => {
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
      externalChannelSwitchGate: { bunDefaultEligible: boolean };
      assets: { linuxX64: { name: string }; win32X64: { name: string } };
    };

    expect(action).toContain("Linux-X64)");
    expect(action).toContain("Windows-X64)");
    expect(action).toContain("asset_sha256=");
    expect(action).toContain("shasum -a 256");
    expect(action).toContain("Expand-Archive");
    expect(action).toContain("$GITHUB_PATH");
    expect(action).not.toContain("install.sh");
    expect(readme).toContain("Bun single-file executable archives");
    expect(evidence.installStrategy).toBe("bun_single_file_executable");
    expect(evidence.externalChannelSwitchGate.bunDefaultEligible).toBe(true);
    expect(evidence.assets.linuxX64.name).toBe("agentplane-bun-v0.4.1-linux-x64.tar.gz");
    expect(evidence.assets.win32X64.name).toBe("agentplane-bun-v0.4.1-win32-x64.zip");
  });
});
