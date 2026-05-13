import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const DEFAULT_OUT_DIR = ".agentplane/.release/publish/bun";
const MANIFEST_NAME = "bun-assets.json";
const CLI_ENTRY = "packages/agentplane/dist/cli.js";
const TARGETS = [
  {
    bunTarget: "bun-darwin-arm64",
    platform: "darwin",
    arch: "arm64",
    archive: "tar.gz",
    entrypoint: "bin/agentplane",
  },
  {
    bunTarget: "bun-darwin-x64",
    platform: "darwin",
    arch: "x64",
    archive: "tar.gz",
    entrypoint: "bin/agentplane",
  },
  {
    bunTarget: "bun-linux-x64",
    platform: "linux",
    arch: "x64",
    archive: "tar.gz",
    entrypoint: "bin/agentplane",
  },
  {
    bunTarget: "bun-linux-arm64",
    platform: "linux",
    arch: "arm64",
    archive: "tar.gz",
    entrypoint: "bin/agentplane",
  },
  {
    bunTarget: "bun-windows-x64",
    platform: "win32",
    arch: "x64",
    archive: "zip",
    entrypoint: "bin/agentplane.exe",
  },
];

function usage() {
  return [
    "Usage: node scripts/generate-bun-cli-assets.mjs [options]",
    "",
    "Generate Bun single-file executable release assets as a parallel distribution channel.",
    "",
    "Options:",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/bun)",
    "  --version <semver>      Release version (default: packages/agentplane/package.json)",
    "  --tag <tag>             Release tag (default: v<version>)",
    "  --sha <git-sha>         Release git SHA (default: git rev-parse HEAD)",
    "  --synthetic-binary      Write tiny placeholder binaries for layout/manifest checks",
    "  --check                 Generate into a temporary directory and validate outputs",
    "  --json                  Emit the manifest JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: opts.encoding ?? "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
    timeout: opts.timeout ?? 180_000,
  });
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["out", "version", "tag", "sha"],
    booleanFlags: ["synthetic-binary", "check", "json", "help"],
  });
  const version = typeof flags.version === "string" ? flags.version.trim() : null;
  return {
    help: Boolean(flags.help),
    outDir: path.resolve(repoRoot, flags.out ?? DEFAULT_OUT_DIR),
    version,
    tag: typeof flags.tag === "string" ? flags.tag.trim() : null,
    sha: typeof flags.sha === "string" ? flags.sha.trim() : null,
    syntheticBinary: Boolean(flags["synthetic-binary"]),
    check: Boolean(flags.check),
    json: Boolean(flags.json),
  };
}

function resolveGitHead(cwd) {
  return run("git", ["rev-parse", "HEAD"], { cwd }).trim();
}

function readPackageVersion(repoRoot) {
  const packageJson = JSON.parse(
    readFileSync(path.join(repoRoot, "packages/agentplane/package.json"), "utf8"),
  );
  const version = String(packageJson.version ?? "").trim();
  if (!version) throw new Error("packages/agentplane/package.json is missing version");
  return version;
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function buildBinary(repoRoot, target, outPath, version, synthetic) {
  if (synthetic) {
    writeFileSync(
      outPath,
      `synthetic agentplane bun binary ${target.bunTarget} ${version}\n`,
      "utf8",
    );
    chmodSync(outPath, 0o755);
    return;
  }
  const entry = path.join(repoRoot, CLI_ENTRY);
  if (!existsSync(entry))
    throw new Error(`Missing built CLI entrypoint: ${CLI_ENTRY}. Run bun run build first.`);
  run(
    "bun",
    [
      "build",
      entry,
      "--compile",
      `--target=${target.bunTarget}`,
      "--define",
      `__AGENTPLANE_PACKAGE_VERSION__=${JSON.stringify(version)}`,
      "--outfile",
      outPath,
    ],
    { cwd: repoRoot },
  );
  chmodSync(outPath, 0o755);
}

function archiveTarget(repoRoot, outDir, target, version, binaryPath) {
  const assetName = `agentplane-bun-v${version}-${target.platform}-${target.arch}.${target.archive}`;
  const assetPath = path.join(outDir, assetName);
  const stage = mkdtempSync(path.join(os.tmpdir(), "agentplane-bun-asset-"));
  try {
    const stagedBinary = path.join(stage, target.entrypoint);
    execFileSync("mkdir", ["-p", path.dirname(stagedBinary)]);
    execFileSync("cp", [binaryPath, stagedBinary]);
    if (target.archive === "zip") {
      run("zip", ["-qr", assetPath, "."], { cwd: stage });
    } else {
      run("tar", ["-czf", assetPath, "-C", stage, "."], { cwd: repoRoot });
    }
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
  return { assetName, assetPath };
}

async function generate(repoRoot, args) {
  const version = args.version ?? readPackageVersion(repoRoot);
  const tag = args.tag ?? `v${version}`;
  const sha = args.sha ?? resolveGitHead(repoRoot);
  const outDir = args.check
    ? mkdtempSync(path.join(os.tmpdir(), "agentplane-bun-assets-"))
    : args.outDir;
  await mkdir(outDir, { recursive: true });

  const assets = [];
  for (const target of TARGETS) {
    const binaryName = target.platform === "win32" ? "agentplane.exe" : "agentplane";
    const binaryPath = path.join(outDir, `.bun-${target.platform}-${target.arch}`, binaryName);
    await mkdir(path.dirname(binaryPath), { recursive: true });
    buildBinary(repoRoot, target, binaryPath, version, args.syntheticBinary || args.check);
    const { assetName, assetPath } = archiveTarget(repoRoot, outDir, target, version, binaryPath);
    assets.push({
      name: assetName,
      kind: "bun_executable",
      platform: target.platform,
      arch: target.arch,
      bunTarget: target.bunTarget,
      archive: target.archive,
      installStrategy: "bun_single_file_executable",
      entrypoint: target.entrypoint,
      dependencyStatus:
        args.syntheticBinary || args.check ? "synthetic_check_mode" : "self_contained_bun_runtime",
      sha256: sha256File(assetPath),
    });
  }

  const manifest = {
    schemaVersion: 1,
    manifestKind: "bun_executable_assets",
    version,
    tag,
    sha,
    assets,
  };
  await writeFile(
    path.join(outDir, MANIFEST_NAME),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  if (args.check) {
    assertOutputs(outDir, manifest);
    rmSync(outDir, { recursive: true, force: true });
  }
  return manifest;
}

function assertOutputs(outDir, manifest) {
  if (manifest.assets.length !== TARGETS.length) {
    throw new Error(`Expected ${TARGETS.length} Bun assets, got ${manifest.assets.length}`);
  }
  for (const asset of manifest.assets) {
    if (!existsSync(path.join(outDir, asset.name)))
      throw new Error(`Missing Bun asset: ${asset.name}`);
  }
}

const main = defineScript({
  name: "generate-bun-cli-assets",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const manifest = await generate(context.cwd, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(manifest)}\n`);
      return;
    }
    context.stdout.write(
      `bun executable assets ${args.check ? "check" : "generated"} for ${manifest.tag} (${manifest.assets.length} assets)\n`,
    );
  },
});

runScriptMain(main);
