import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/generate-standalone-cli-assets.mjs");
const SMOKE_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/smoke-standalone-cli-artifact.mjs");
const STANDALONE_ASSET_TEST_TIMEOUT_MS = 180_000;
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-standalone-test-"));
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

async function listTar(pathToArchive: string) {
  const { stdout } = await execFileAsync("tar", ["-tzf", pathToArchive], { cwd: process.cwd() });
  return stdout.split(/\r?\n/u).filter(Boolean);
}

async function listZip(pathToArchive: string) {
  const { stdout } = await execFileAsync("unzip", ["-Z1", pathToArchive], { cwd: process.cwd() });
  return stdout.split(/\r?\n/u).filter(Boolean);
}

async function readZipEntry(pathToArchive: string, entry: string) {
  const { stdout } = await execFileAsync("unzip", ["-p", pathToArchive, entry], {
    cwd: process.cwd(),
  });
  return stdout;
}

function hostStandaloneTarget() {
  const target = `${process.platform}-${process.arch}`;
  const supported = new Set([
    "darwin-arm64",
    "darwin-x64",
    "linux-x64",
    "linux-arm64",
    "win32-x64",
  ]);
  return supported.has(target) ? target : "linux-x64";
}

describe("generate-standalone-cli-assets script", () => {
  it(
    "generates POSIX standalone archive layout in offline check mode",
    async () => {
      const outDir = path.join(await makeTempRoot(), "out");

      await execFileAsync(
        "node",
        [
          SCRIPT_PATH,
          "--out",
          outDir,
          "--target",
          "darwin-arm64",
          "--version",
          "1.2.3",
          "--tag",
          "v1.2.3",
          "--sha",
          "abc123",
          "--synthetic-node",
          "--skip-install",
        ],
        { cwd: process.cwd() },
      );

      const archivePath = path.join(outDir, "agentplane-v1.2.3-darwin-arm64.tar.gz");
      const manifest = JSON.parse(
        await readFile(path.join(outDir, "standalone-assets.json"), "utf8"),
      ) as {
        assets: {
          name: string;
          kind: string;
          platform: string;
          arch: string;
          archive: string;
          installStrategy: string;
          entrypoint: string;
          dependencyStatus: string;
        }[];
      };
      const checksum = await readFile(path.join(outDir, "SHA256SUMS"), "utf8");
      const listing = await listTar(archivePath);

      expect(manifest.assets).toHaveLength(1);
      expect(manifest.assets[0]).toMatchObject({
        name: "agentplane-v1.2.3-darwin-arm64.tar.gz",
        kind: "standalone_cli",
        platform: "darwin",
        arch: "arm64",
        archive: "tar.gz",
        installStrategy: "bundled_node",
        entrypoint: "bin/agentplane",
        dependencyStatus: "skipped_check_mode",
      });
      expect(checksum).toContain("agentplane-v1.2.3-darwin-arm64.tar.gz");
      expect(listing).toContain("./bin/agentplane");
      expect(listing).toContain("./lib/node/bin/node");
      expect(listing).toContain("./lib/agentplane/package/bin/agentplane.js");
      expect(listing).toContain("./share/agentplane/VERSION");
      expect(listing).toContain("./share/agentplane/manifest.json");
    },
    STANDALONE_ASSET_TEST_TIMEOUT_MS,
  );

  it(
    "generates Windows standalone archive layout in offline check mode",
    async () => {
      const outDir = path.join(await makeTempRoot(), "out");

      await execFileAsync(
        "node",
        [
          SCRIPT_PATH,
          "--out",
          outDir,
          "--target",
          "win32-x64",
          "--version",
          "1.2.3",
          "--tag",
          "v1.2.3",
          "--sha",
          "abc123",
          "--synthetic-node",
          "--skip-install",
        ],
        { cwd: process.cwd() },
      );

      const archivePath = path.join(outDir, "agentplane-v1.2.3-win32-x64.zip");
      const manifest = JSON.parse(
        await readFile(path.join(outDir, "standalone-assets.json"), "utf8"),
      ) as {
        assets: { entrypoint: string; platform: string; archive: string }[];
      };
      const listing = await listZip(archivePath);
      const wrapper = await readZipEntry(archivePath, "bin/agentplane.cmd");

      expect(existsSync(archivePath)).toBe(true);
      expect(manifest.assets[0]).toMatchObject({
        platform: "win32",
        archive: "zip",
        entrypoint: "bin/agentplane.cmd",
      });
      expect(listing).toContain("bin/agentplane.cmd");
      expect(listing).toContain("lib/node/node.exe");
      expect(listing).toContain("lib/agentplane/package/bin/agentplane.js");
      expect(listing).toContain("share/agentplane/manifest.json");
      expect(wrapper).toContain(String.raw`"%~dp0..\lib\node\node.exe"`);
      expect(wrapper).toContain(String.raw`"%~dp0..\lib\agentplane\package\bin\agentplane.js"`);
    },
    STANDALONE_ASSET_TEST_TIMEOUT_MS,
  );

  it(
    "validates every contract target through --check without writing final outputs",
    async () => {
      const outDir = path.join(await makeTempRoot(), "out");
      const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--out", outDir, "--check"], {
        cwd: process.cwd(),
      });

      expect(stdout).toContain("standalone CLI assets check");
      expect(existsSync(outDir)).toBe(false);
    },
    STANDALONE_ASSET_TEST_TIMEOUT_MS,
  );

  it(
    "installs production dependencies from a sanitized package payload",
    async () => {
      const root = await makeTempRoot();
      const outDir = path.join(root, "out");
      const extractDir = path.join(root, "extract");

      await execFileAsync(
        "node",
        [
          SCRIPT_PATH,
          "--out",
          outDir,
          "--target",
          "linux-x64",
          "--version",
          "1.2.3",
          "--tag",
          "v1.2.3",
          "--sha",
          "abc123",
          "--synthetic-node",
        ],
        { cwd: process.cwd() },
      );

      const archivePath = path.join(outDir, "agentplane-v1.2.3-linux-x64.tar.gz");
      await mkdir(extractDir, { recursive: true });
      await execFileAsync("tar", ["-xzf", archivePath, "-C", extractDir], { cwd: process.cwd() });
      const manifest = JSON.parse(
        await readFile(path.join(outDir, "standalone-assets.json"), "utf8"),
      ) as { assets: { dependencyStatus: string }[] };
      const packageJson = JSON.parse(
        await readFile(
          path.join(extractDir, "lib", "agentplane", "package", "package.json"),
          "utf8",
        ),
      ) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        scripts?: Record<string, string>;
      };

      expect(manifest.assets[0]?.dependencyStatus).toBe(
        "installed_npm_ci_local_workspace_tarballs",
      );
      expect(packageJson.dependencies?.["@agentplaneorg/core"]).toBe("1.2.3");
      expect(packageJson.dependencies?.["@agentplaneorg/recipes"]).toBe("1.2.3");
      expect(packageJson.devDependencies).toBeUndefined();
      expect(packageJson.scripts).toBeUndefined();
    },
    STANDALONE_ASSET_TEST_TIMEOUT_MS,
  );

  it(
    "smoke-tests a standalone archive fixture without a PATH node dependency",
    async () => {
      const outDir = path.join(await makeTempRoot(), "out");
      const target = hostStandaloneTarget();

      await execFileAsync(
        "node",
        [
          SCRIPT_PATH,
          "--out",
          outDir,
          "--target",
          target,
          "--version",
          "1.2.3",
          "--tag",
          "v1.2.3",
          "--sha",
          "abc123",
          "--synthetic-node",
          "--skip-install",
        ],
        { cwd: process.cwd() },
      );

      const extension = target.startsWith("win32-") ? "zip" : "tar.gz";
      const archivePath = path.join(outDir, `agentplane-v1.2.3-${target}.${extension}`);
      const smokeArgs = [
        SMOKE_SCRIPT_PATH,
        "--artifact",
        archivePath,
        "--expected-version",
        "1.2.3",
        "--allow-synthetic-runtime",
        "--json",
      ];
      if (target.startsWith("win32-")) smokeArgs.push("--skip-cli-commands");

      const { stdout } = await execFileAsync("node", smokeArgs, { cwd: process.cwd() });
      const result = JSON.parse(stdout) as {
        artifact: string;
        version: string;
        commandResult: { executed: boolean; syntheticRuntime?: boolean; reason?: string };
      };

      expect(result.artifact).toBe(`agentplane-v1.2.3-${target}.${extension}`);
      expect(result.version).toBe("1.2.3");
      if (target.startsWith("win32-")) {
        expect(result.commandResult).toMatchObject({
          executed: false,
          reason: "skip_cli_commands",
        });
      } else {
        expect(result.commandResult).toMatchObject({
          executed: true,
          syntheticRuntime: true,
        });
      }
    },
    STANDALONE_ASSET_TEST_TIMEOUT_MS,
  );
});
