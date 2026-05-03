import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const DEFAULT_MANIFEST_PATH = ".agentplane/.release/publish/distribution/release-distribution.json";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/scoop";
const SCOOP_MANIFEST_NAME = "agentplane.json";

function usage() {
  return [
    "Usage: node scripts/render-scoop-manifest.mjs [options]",
    "",
    "Render the AgentPlane Scoop bucket manifest from release-distribution.json.",
    "",
    "Options:",
    "  --manifest <path>       release-distribution.json path",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/scoop)",
    "  --check                 Generate into a temporary directory and validate outputs",
    "  --json                  Emit module evidence JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["manifest", "out"],
    booleanFlags: ["check", "json", "help"],
  });
  return {
    manifestPath: path.resolve(repoRoot, flags.manifest ?? DEFAULT_MANIFEST_PATH),
    outDir: path.resolve(repoRoot, flags.out ?? DEFAULT_OUT_DIR),
    check: Boolean(flags.check),
    json: Boolean(flags.json),
    help: Boolean(flags.help),
  };
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function requireString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Missing ${label}`);
  return text;
}

function findPlatformAsset(manifest, platform, arch) {
  const asset = (manifest.platformAssets ?? []).find(
    (entry) =>
      entry?.kind === "standalone_cli" && entry?.platform === platform && entry?.arch === arch,
  );
  if (!asset) throw new Error(`Missing standalone platform asset: ${platform}-${arch}`);
  return {
    url: requireString(asset.url, `${platform}-${arch} standalone URL`),
    sha256: requireString(asset.sha256, `${platform}-${arch} standalone sha256`),
    name: requireString(asset.name, `${platform}-${arch} standalone asset name`),
  };
}

function renderScoopManifest(manifest) {
  const version = requireString(manifest.version, "release version");
  const win32X64 = findPlatformAsset(manifest, "win32", "x64");
  return {
    version,
    description: "CLI for auditable coding-agent workflows",
    homepage: "https://github.com/basilisk-labs/agentplane",
    license: "MIT",
    notes: [
      "Run `agentplane quickstart` after install to initialize repository conventions.",
      "Use `agentplane --version` to verify reproducibility.",
    ],
    architecture: {
      "64bit": {
        url: win32X64.url,
        hash: win32X64.sha256,
      },
    },
    checkver: {
      github: "https://github.com/basilisk-labs/agentplane/releases",
      regex: String.raw`v([\\d.]+)`,
    },
    autoupdate: {
      url: "https://github.com/basilisk-labs/agentplane/releases/download/v${version}/agentplane-v${version}-win32-x64.zip",
    },
    bin: [[String.raw`bin\agentplane.cmd`, "agentplane"]],
  };
}

function runDistributionGenerator(repoRoot, outDir) {
  execFileSync(
    "node",
    ["scripts/generate-release-distribution.mjs", "--out", outDir, "--standalone-check-mode"],
    {
      cwd: repoRoot,
      stdio: "ignore",
      env: process.env,
    },
  );
  return path.join(outDir, "release-distribution.json");
}

async function renderScoop(repoRoot, args) {
  const tempRoot = args.check ? mkdtempSync(path.join(os.tmpdir(), "agentplane-scoop-")) : null;
  const outDir = tempRoot ? path.join(tempRoot, "scoop") : args.outDir;
  const manifestPath = tempRoot
    ? runDistributionGenerator(repoRoot, path.join(tempRoot, "distribution"))
    : args.manifestPath;
  const manifest = await readJson(manifestPath);
  const scoopManifest = renderScoopManifest(manifest);
  const scoopManifestPath = path.join(outDir, SCOOP_MANIFEST_NAME);
  await mkdir(outDir, { recursive: true });
  await writeFile(scoopManifestPath, `${JSON.stringify(scoopManifest, null, 2)}\n`, "utf8");

  const channel = manifest.channels?.scoopBucket ?? {};
  const evidence = {
    schemaVersion: 1,
    module: "scoop_bucket",
    status: channel.status ?? "unknown",
    requiredSecret: channel.requiredSecret ?? "SCOOP_BUCKET_TOKEN",
    bucketRepository: process.env.SCOOP_BUCKET_REPOSITORY ?? "basilisk-labs/scoop-bucket",
    version: manifest.version,
    tag: manifest.tag,
    sha: manifest.sha,
    manifestPath: scoopManifestPath,
    manifestName: SCOOP_MANIFEST_NAME,
    assets: {
      win32X64: findPlatformAsset(manifest, "win32", "x64"),
    },
    installStrategy: "standalone_bundled_node",
    externalChannelSwitchGate: manifest.externalChannelSwitchGate ?? null,
    nextAction:
      channel.status === "skipped_missing_credentials"
        ? "Add SCOOP_BUCKET_TOKEN and rerun the Scoop bucket publication module for this manifest."
        : "Commit this manifest to the configured Scoop bucket and open or update the release PR.",
  };
  await writeFile(path.join(outDir, "scoop-result.json"), `${JSON.stringify(evidence, null, 2)}\n`);

  if (args.check) {
    if ("depends" in scoopManifest || "extract_dir" in scoopManifest) {
      throw new Error("Scoop manifest must not depend on nodejs or npm package extraction");
    }
    if (!Array.isArray(scoopManifest.bin) || scoopManifest.bin.length === 0) {
      throw new Error("Scoop manifest must expose an agentplane shim");
    }
    rmSync(tempRoot, { recursive: true, force: true });
  }

  return evidence;
}

const main = defineScript({
  name: "render-scoop-manifest",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const evidence = await renderScoop(context.cwd, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(evidence)}\n`);
      return;
    }
    context.stdout.write(
      `scoop manifest ${args.check ? "check" : "rendered"} (${evidence.status})\n`,
    );
  },
});

runScriptMain(main);
