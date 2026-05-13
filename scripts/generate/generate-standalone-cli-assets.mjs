import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import https from "node:https";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const DEFAULT_REPO = "basilisk-labs/agentplane";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/standalone";
const DEFAULT_NODE_VERSION = "v24.15.0";
const CLI_PACKAGE_DIR = "packages/agentplane";
const CORE_PACKAGE_DIR = "packages/core";
const RECIPES_PACKAGE_DIR = "packages/recipes";
const NODE_DIST_BASE_URL = "https://nodejs.org/download/release";
const TARGETS = [
  { platform: "darwin", arch: "arm64", node: "darwin-arm64", archive: "tar.gz" },
  { platform: "darwin", arch: "x64", node: "darwin-x64", archive: "tar.gz" },
  { platform: "linux", arch: "x64", node: "linux-x64", archive: "tar.gz" },
  { platform: "linux", arch: "arm64", node: "linux-arm64", archive: "tar.gz" },
  { platform: "win32", arch: "x64", node: "win-x64", archive: "zip" },
];

function usage() {
  return [
    "Usage: node scripts/generate-standalone-cli-assets.mjs [options]",
    "",
    "Generate bundled-runtime AgentPlane CLI archives.",
    "",
    "Options:",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/standalone)",
    "  --version <semver>      Release version (default: packages/agentplane/package.json)",
    "  --tag <tag>             Release tag (default: v<version>)",
    "  --sha <git-sha>         Release git SHA (default: git rev-parse HEAD)",
    "  --repo <owner/name>     GitHub repository (default: basilisk-labs/agentplane)",
    "  --node-version <vX.Y.Z> Embedded Node version (default: v24.15.0)",
    "  --target <platform-arch> Repeatable target filter, e.g. darwin-arm64",
    "  --synthetic-node        Use a synthetic embedded Node runtime instead of downloading Node",
    "  --skip-install          Skip npm production dependency installation",
    "  --check                 Generate into a temporary directory with synthetic Node and validate outputs",
    "  --json                  Emit standalone result JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: opts.encoding ?? "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function copyDirectory(source, target) {
  run("mkdir", ["-p", target], { stdio: "ignore" });
  run("cp", ["-R", `${source}/.`, target]);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function resolveGitHead(cwd) {
  return run("git", ["rev-parse", "HEAD"], { cwd }).trim();
}

function normalizeList(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["out", "version", "tag", "sha", "repo", "node-version", "target"],
    booleanFlags: ["check", "json", "help", "synthetic-node", "skip-install"],
  });
  return {
    help: Boolean(flags.help),
    outDir: path.resolve(repoRoot, flags.out ?? DEFAULT_OUT_DIR),
    version: typeof flags.version === "string" ? flags.version.trim() : null,
    tag: typeof flags.tag === "string" ? flags.tag.trim() : null,
    sha: typeof flags.sha === "string" ? flags.sha.trim() : null,
    repo: typeof flags.repo === "string" ? flags.repo.trim() : DEFAULT_REPO,
    nodeVersion:
      typeof flags["node-version"] === "string"
        ? flags["node-version"].trim()
        : DEFAULT_NODE_VERSION,
    targets: normalizeList(flags.target)
      .map((target) => String(target).trim())
      .filter(Boolean),
    syntheticNode: Boolean(flags["synthetic-node"]),
    skipInstall: Boolean(flags["skip-install"]),
    check: Boolean(flags.check),
    json: Boolean(flags.json),
  };
}

async function readCliPackage(repoRoot) {
  const packageJson = await readJson(path.join(repoRoot, CLI_PACKAGE_DIR, "package.json"));
  const version = String(packageJson.version ?? "").trim();
  if (!version) throw new Error("packages/agentplane/package.json is missing version");
  return { name: String(packageJson.name ?? "agentplane"), version };
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function publicReleaseAssetUrl(repo, tag, assetName) {
  return `https://github.com/${repo}/releases/download/${tag}/${assetName}`;
}

function assetName(version, target) {
  const extension = target.archive === "zip" ? "zip" : "tar.gz";
  return `agentplane-v${version}-${target.platform}-${target.arch}.${extension}`;
}

function nodeArchiveName(nodeVersion, target) {
  const extension = target.archive === "zip" ? "zip" : "tar.gz";
  return `node-${nodeVersion}-${target.node}.${extension}`;
}

function nodeArchiveUrl(nodeVersion, target) {
  return `${NODE_DIST_BASE_URL}/${nodeVersion}/${nodeArchiveName(nodeVersion, target)}`;
}

function downloadFile(url, outPath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (
        response.statusCode &&
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        return downloadFile(response.headers.location, outPath).then(resolve, reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Download failed ${response.statusCode ?? "unknown"}: ${url}`));
        response.resume();
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", async () => {
        await writeFile(outPath, Buffer.concat(chunks));
        resolve();
      });
    });
    request.on("error", reject);
  });
}

async function fetchNodeChecksums(nodeVersion, cacheDir) {
  const shasumsPath = path.join(cacheDir, `${nodeVersion}-SHASUMS256.txt`);
  if (!existsSync(shasumsPath)) {
    await downloadFile(`${NODE_DIST_BASE_URL}/${nodeVersion}/SHASUMS256.txt`, shasumsPath);
  }
  const body = await readFile(shasumsPath, "utf8");
  return new Map(
    body
      .split(/\r?\n/u)
      .map((line) => line.trim().split(/\s+/u))
      .filter((parts) => parts.length >= 2)
      .map(([checksum, name]) => [name, checksum]),
  );
}

async function materializeSyntheticNode(target, nodeRoot) {
  await mkdir(nodeRoot, { recursive: true });
  if (target.platform === "win32") {
    await writeFile(
      path.join(nodeRoot, "node.exe"),
      "synthetic node runtime for check mode\n",
      "utf8",
    );
    return;
  }
  const nodeBinDir = path.join(nodeRoot, "bin");
  await mkdir(nodeBinDir, { recursive: true });
  const nodePath = path.join(nodeBinDir, "node");
  await writeFile(nodePath, "#!/usr/bin/env sh\necho synthetic-node\n", "utf8");
  chmodSync(nodePath, 0o755);
}

async function materializeOfficialNode({ target, nodeVersion, cacheDir, nodeRoot }) {
  await mkdir(cacheDir, { recursive: true });
  const archiveName = nodeArchiveName(nodeVersion, target);
  const archivePath = path.join(cacheDir, archiveName);
  const checksums = await fetchNodeChecksums(nodeVersion, cacheDir);
  const expected = checksums.get(archiveName);
  if (!expected) throw new Error(`Node checksum not found for ${archiveName}`);
  if (!existsSync(archivePath)) {
    await downloadFile(nodeArchiveUrl(nodeVersion, target), archivePath);
  }
  const actual = sha256File(archivePath);
  if (actual !== expected) {
    throw new Error(
      `Node checksum mismatch for ${archiveName}: expected ${expected}, actual ${actual}`,
    );
  }
  const extractDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-node-"));
  try {
    if (target.archive === "zip") {
      run("unzip", ["-q", archivePath, "-d", extractDir]);
    } else {
      run("tar", ["-xzf", archivePath, "-C", extractDir]);
    }
    const extractedEntries = await readdir(extractDir);
    const rootName = extractedEntries.find((name) => name.startsWith(`node-${nodeVersion}-`));
    if (!rootName) throw new Error(`Unable to locate extracted Node root for ${archiveName}`);
    copyDirectory(path.join(extractDir, rootName), nodeRoot);
  } finally {
    rmSync(extractDir, { recursive: true, force: true });
  }
}

function packWorkspacePackage(repoRoot, packageDir, outDir) {
  const cacheDir = path.join(repoRoot, ".agentplane", ".npm-cache");
  const stdout = run("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", outDir], {
    cwd: path.join(repoRoot, packageDir),
    env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) throw new Error(`npm pack did not emit JSON for ${packageDir}`);
  const [entry] = JSON.parse(jsonMatch[2]);
  const filename = String(entry?.filename ?? "");
  if (!filename) throw new Error(`npm pack did not report a filename for ${packageDir}`);
  return path.join(outDir, filename);
}

async function extractCliPackage(tarballPath, packageRoot) {
  const extractDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-cli-package-"));
  try {
    run("tar", ["-xzf", tarballPath, "-C", extractDir]);
    copyDirectory(path.join(extractDir, "package"), packageRoot);
  } finally {
    rmSync(extractDir, { recursive: true, force: true });
  }
}

async function sanitizeStandalonePackageJson(packageRoot, localPackages) {
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJson = await readJson(packageJsonPath);
  delete packageJson.devDependencies;
  delete packageJson.scripts;
  packageJson.dependencies = {
    ...packageJson.dependencies,
    "@agentplaneorg/core": `file:${localPackages.coreTarball}`,
    "@agentplaneorg/recipes": `file:${localPackages.recipesTarball}`,
  };
  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

async function restoreStandalonePackageJson(packageRoot, version) {
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJson = await readJson(packageJsonPath);
  packageJson.dependencies = {
    ...packageJson.dependencies,
    "@agentplaneorg/core": version,
    "@agentplaneorg/recipes": version,
  };
  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

async function materializeSyntheticAgentplanePackage(packageRoot, version) {
  const binDir = path.join(packageRoot, "bin");
  await mkdir(binDir, { recursive: true });
  await writeFile(
    path.join(packageRoot, "package.json"),
    `${JSON.stringify(
      {
        name: "agentplane",
        version,
        type: "module",
        bin: {
          agentplane: "bin/agentplane.js",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  const binPath = path.join(binDir, "agentplane.js");
  await writeFile(
    binPath,
    "#!/usr/bin/env node\nconsole.log(process.argv.includes('--version') ? process.env.AGENTPLANE_SYNTHETIC_VERSION || '0.0.0' : 'synthetic-agentplane')\n",
    "utf8",
  );
  chmodSync(binPath, 0o755);
}

async function writeWrapper(target, rootDir) {
  const binDir = path.join(rootDir, "bin");
  await mkdir(binDir, { recursive: true });
  if (target.platform === "win32") {
    const wrapperPath = path.join(binDir, "agentplane.cmd");
    await writeFile(
      wrapperPath,
      '@echo off\r\n"%~dp0..\\lib\\node\\node.exe" "%~dp0..\\lib\\agentplane\\package\\bin\\agentplane.js" %*\r\n',
      "utf8",
    );
    return "bin/agentplane.cmd";
  }
  const wrapperPath = path.join(binDir, "agentplane");
  await writeFile(
    wrapperPath,
    '#!/usr/bin/env sh\nDIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"\nexec "$DIR/../lib/node/bin/node" "$DIR/../lib/agentplane/package/bin/agentplane.js" "$@"\n',
    "utf8",
  );
  chmodSync(wrapperPath, 0o755);
  return "bin/agentplane";
}

async function writeStandaloneManifest({
  rootDir,
  version,
  tag,
  sha,
  target,
  nodeVersion,
  entrypoint,
}) {
  const shareDir = path.join(rootDir, "share", "agentplane");
  await mkdir(shareDir, { recursive: true });
  await writeFile(path.join(shareDir, "VERSION"), `${version}\n`, "utf8");
  const manifest = {
    schemaVersion: 1,
    kind: "agentplane_standalone_cli",
    version,
    tag,
    sha,
    platform: target.platform,
    arch: target.arch,
    nodeVersion,
    installStrategy: "bundled_node",
    entrypoint,
  };
  await writeFile(
    path.join(shareDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}

function normalizeArchiveTimestamps(rootDir) {
  try {
    run("find", [rootDir, "-exec", "touch", "-h", "-t", "197001010000", "{}", "+"]);
  } catch {
    // Best effort only; archive checks validate content, not platform timestamp tooling.
  }
}

function createArchive(rootDir, outPath, target) {
  normalizeArchiveTimestamps(rootDir);
  if (target.archive === "zip") {
    run("zip", ["-X", "-q", "-r", outPath, "."], { cwd: rootDir });
    return;
  }
  run("tar", ["-czf", outPath, "-C", rootDir, "."]);
}

async function installProductionDependencies(repoRoot, packageRoot, skipInstall) {
  if (skipInstall) return "skipped_check_mode";
  const env = {
    ...process.env,
    NPM_CONFIG_CACHE: path.join(repoRoot, ".agentplane", ".npm-cache"),
  };
  run(
    "npm",
    ["install", "--package-lock-only", "--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund"],
    {
      cwd: packageRoot,
      env,
    },
  );
  run("npm", ["ci", "--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund"], {
    cwd: packageRoot,
    env,
  });
  return "installed_npm_ci_local_workspace_tarballs";
}

function publicStandaloneAsset(asset) {
  const next = { ...asset };
  delete next.path;
  return next;
}

async function buildTarget({
  repoRoot,
  workRoot,
  outDir,
  cliTarball,
  version,
  tag,
  sha,
  repo,
  nodeVersion,
  target,
  syntheticNode,
  skipInstall,
  coreTarball,
  recipesTarball,
}) {
  const rootDir = path.join(workRoot, `${target.platform}-${target.arch}`);
  const packageRoot = path.join(rootDir, "lib", "agentplane", "package");
  const nodeRoot = path.join(rootDir, "lib", "node");
  await mkdir(packageRoot, { recursive: true });
  await mkdir(nodeRoot, { recursive: true });

  let dependencyStatus = "skipped_check_mode";
  if (syntheticNode && skipInstall) {
    await materializeSyntheticAgentplanePackage(packageRoot, version);
  } else {
    if (!cliTarball || !coreTarball || !recipesTarball) {
      throw new Error(
        "Standalone package tarballs are required when synthetic skip-install mode is disabled",
      );
    }
    await extractCliPackage(cliTarball, packageRoot);
    await sanitizeStandalonePackageJson(packageRoot, { coreTarball, recipesTarball });
    dependencyStatus = await installProductionDependencies(repoRoot, packageRoot, skipInstall);
    await restoreStandalonePackageJson(packageRoot, version);
  }
  await (syntheticNode
    ? materializeSyntheticNode(target, nodeRoot)
    : materializeOfficialNode({
        target,
        nodeVersion,
        cacheDir: path.join(repoRoot, ".agentplane", ".node-cache"),
        nodeRoot,
      }));

  const entrypoint = await writeWrapper(target, rootDir);
  await writeStandaloneManifest({ rootDir, version, tag, sha, target, nodeVersion, entrypoint });

  const name = assetName(version, target);
  const outPath = path.join(outDir, name);
  createArchive(rootDir, outPath, target);
  return {
    name,
    kind: "standalone_cli",
    platform: target.platform,
    arch: target.arch,
    archive: target.archive,
    url: publicReleaseAssetUrl(repo, tag, name),
    sha256: sha256File(outPath),
    size: statSync(outPath).size,
    nodeVersion,
    installStrategy: "bundled_node",
    entrypoint,
    status: "created",
    dependencyStatus,
    path: outPath,
  };
}

function selectTargets(requestedTargets) {
  if (requestedTargets.length === 0) return TARGETS;
  const byName = new Map(TARGETS.map((target) => [`${target.platform}-${target.arch}`, target]));
  return requestedTargets.map((name) => {
    const target = byName.get(name);
    if (!target) throw new Error(`Unknown standalone target: ${name}`);
    return target;
  });
}

async function writeChecksums(outDir, assets) {
  const lines = assets
    .map((asset) => `${asset.sha256}  ${asset.name}`)
    .toSorted((a, b) => a.localeCompare(b));
  await writeFile(path.join(outDir, "SHA256SUMS"), `${lines.join("\n")}\n`, "utf8");
}

function assertStandaloneOutputs(outDir, assets, expectedTargets) {
  if (assets.length !== expectedTargets.length) {
    throw new Error(`Expected ${expectedTargets.length} standalone assets, got ${assets.length}`);
  }
  for (const asset of assets) {
    if (!existsSync(path.join(outDir, asset.name)))
      throw new Error(`Missing standalone archive: ${asset.name}`);
    if (asset.kind !== "standalone_cli")
      throw new Error(`Invalid standalone asset kind: ${asset.kind}`);
    if (asset.installStrategy !== "bundled_node") {
      throw new Error(`Invalid standalone install strategy: ${asset.installStrategy}`);
    }
  }
  if (!existsSync(path.join(outDir, "standalone-assets.json"))) {
    throw new Error("Missing standalone-assets.json");
  }
  if (!existsSync(path.join(outDir, "SHA256SUMS")))
    throw new Error("Missing standalone SHA256SUMS");
}

async function buildStandaloneAssets(repoRoot, args) {
  const cliPackage = await readCliPackage(repoRoot);
  const version = args.version ?? cliPackage.version;
  const tag = args.tag ?? `v${version}`;
  const sha = args.sha ?? resolveGitHead(repoRoot);
  const outDir = args.check
    ? mkdtempSync(path.join(os.tmpdir(), "agentplane-standalone-assets-"))
    : args.outDir;
  const workRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-standalone-work-"));
  await mkdir(outDir, { recursive: true });
  try {
    const targets = selectTargets(args.targets);
    const packDir = path.join(workRoot, ".npm-pack");
    const useSyntheticPackage = args.check || (args.syntheticNode && args.skipInstall);
    let cliTarball = null;
    let coreTarball = null;
    let recipesTarball = null;
    if (!useSyntheticPackage) {
      await mkdir(packDir, { recursive: true });
      cliTarball = packWorkspacePackage(repoRoot, CLI_PACKAGE_DIR, packDir);
      coreTarball = packWorkspacePackage(repoRoot, CORE_PACKAGE_DIR, packDir);
      recipesTarball = packWorkspacePackage(repoRoot, RECIPES_PACKAGE_DIR, packDir);
    }
    const assets = [];
    for (const target of targets) {
      assets.push(
        await buildTarget({
          repoRoot,
          workRoot,
          outDir,
          cliTarball,
          version,
          tag,
          sha,
          repo: args.repo,
          nodeVersion: args.nodeVersion,
          target,
          syntheticNode: args.check || args.syntheticNode,
          skipInstall: args.check || args.skipInstall,
          coreTarball,
          recipesTarball,
        }),
      );
    }
    await writeChecksums(outDir, assets);
    const result = {
      schemaVersion: 1,
      manifestKind: "standalone_cli_assets",
      version,
      tag,
      sha,
      repository: args.repo,
      nodeVersion: args.nodeVersion,
      checkMode: args.check,
      assets: assets.map((asset) => publicStandaloneAsset(asset)),
    };
    await writeFile(
      path.join(outDir, "standalone-assets.json"),
      `${JSON.stringify(result, null, 2)}\n`,
      "utf8",
    );
    assertStandaloneOutputs(outDir, result.assets, targets);
    if (args.check) rmSync(outDir, { recursive: true, force: true });
    return result;
  } finally {
    rmSync(workRoot, { recursive: true, force: true });
  }
}

const main = defineScript({
  name: "generate-standalone-cli-assets",
  async run(context) {
    const repoRoot = context.cwd;
    const args = parseArgs(context.argv, repoRoot);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const result = await buildStandaloneAssets(repoRoot, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(result)}\n`);
      return;
    }
    context.stdout.write(
      `standalone CLI assets ${args.check ? "check" : "generated"} for ${result.tag} (${result.assets.length} assets)\n`,
    );
  },
});

runScriptMain(main);
