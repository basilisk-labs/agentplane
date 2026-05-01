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

function renderScoopManifest(manifest) {
  const version = requireString(manifest.version, "release version");
  const pkg = manifest.packages?.agentplane;
  const url = requireString(pkg?.npmTarballUrl, "agentplane npm tarball URL");
  const hash = requireString(pkg?.npmTarballSha256, "agentplane npm tarball sha256");
  return {
    version,
    description: "Git-native CLI harness for auditable coding-agent workflows",
    homepage: "https://agentplane.org",
    license: "MIT",
    depends: "nodejs",
    url,
    hash,
    extract_dir: "package",
    bin: [["bin/agentplane.js", "agentplane"]],
  };
}

function runDistributionGenerator(repoRoot, outDir) {
  execFileSync("node", ["scripts/generate-release-distribution.mjs", "--out", outDir], {
    cwd: repoRoot,
    stdio: "ignore",
    env: process.env,
  });
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
    npmTarballUrl: manifest.packages?.agentplane?.npmTarballUrl ?? null,
    npmTarballSha256: manifest.packages?.agentplane?.npmTarballSha256 ?? null,
    nextAction:
      channel.status === "skipped_missing_credentials"
        ? "Add SCOOP_BUCKET_TOKEN and rerun the Scoop bucket publication module for this manifest."
        : "Commit this manifest to the configured Scoop bucket and open or update the release PR.",
  };
  await writeFile(path.join(outDir, "scoop-result.json"), `${JSON.stringify(evidence, null, 2)}\n`);

  if (args.check) {
    if (scoopManifest.extract_dir !== "package") {
      throw new Error("Scoop manifest must extract the npm tarball package directory");
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
