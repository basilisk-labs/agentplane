import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const DEFAULT_REPO = "basilisk-labs/agentplane";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/distribution";
const CLI_PACKAGE_DIR = "packages/agentplane";
const UPGRADE_ASSET_NAME = "agentplane-upgrade.tar.gz";
const UPGRADE_CHECKSUM_NAME = "agentplane-upgrade.tar.gz.sha256";
const INSTALL_SH_NAME = "install.sh";
const INSTALL_PS1_NAME = "install.ps1";
const SHA256SUMS_NAME = "SHA256SUMS";
const DISTRIBUTION_MANIFEST_NAME = "release-distribution.json";
const STANDALONE_ASSETS_MANIFEST_NAME = "standalone-assets.json";
const BUN_ASSETS_MANIFEST_NAME = "bun-assets.json";

function usage() {
  return [
    "Usage: node scripts/generate-release-distribution.mjs [options]",
    "",
    "Generate release distribution assets from the current checkout.",
    "",
    "Options:",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/distribution)",
    "  --version <semver>      Release version (default: packages/agentplane/package.json)",
    "  --tag <tag>             Release tag (default: v<version>)",
    "  --sha <git-sha>         Release git SHA (default: git rev-parse HEAD)",
    "  --repo <owner/name>     GitHub repository (default: basilisk-labs/agentplane)",
    "  --standalone-check-mode Generate standalone assets with synthetic Node and skipped install",
    "  --check                 Generate into a temporary directory and validate outputs",
    "  --json                  Emit the manifest JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function resolveGitHead(cwd) {
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim();
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: opts.encoding ?? "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readCliPackage(repoRoot) {
  const packageJson = await readJson(path.join(repoRoot, CLI_PACKAGE_DIR, "package.json"));
  const version = String(packageJson.version ?? "").trim();
  if (!version) throw new Error("packages/agentplane/package.json is missing version");
  return {
    name: String(packageJson.name ?? "agentplane"),
    version,
  };
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["out", "version", "tag", "sha", "repo"],
    booleanFlags: ["check", "json", "help", "standalone-check-mode"],
  });
  const help = Boolean(flags.help);
  const outDir = path.resolve(repoRoot, flags.out ?? DEFAULT_OUT_DIR);
  const version = typeof flags.version === "string" ? flags.version.trim() : null;
  const tag = typeof flags.tag === "string" ? flags.tag.trim() : null;
  const sha = typeof flags.sha === "string" ? flags.sha.trim() : null;
  const repo = typeof flags.repo === "string" ? flags.repo.trim() : DEFAULT_REPO;
  return {
    help,
    outDir,
    version,
    tag,
    sha,
    repo,
    standaloneCheckMode: Boolean(flags["standalone-check-mode"]),
    check: Boolean(flags.check),
    json: Boolean(flags.json),
  };
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function sha256Text(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function hasGnuTar() {
  try {
    return run("tar", ["--version"]).toLowerCase().includes("gnu tar");
  } catch {
    return false;
  }
}

async function createUpgradeBundle(repoRoot, outDir) {
  const outPath = path.join(outDir, UPGRADE_ASSET_NAME);
  const assetsDir = path.join(repoRoot, CLI_PACKAGE_DIR, "assets");
  if (hasGnuTar()) {
    run("tar", [
      "--sort=name",
      "--mtime=@0",
      "--owner=0",
      "--group=0",
      "--numeric-owner",
      "-czf",
      outPath,
      "-C",
      assetsDir,
      ".",
    ]);
  } else {
    run("tar", ["-czf", outPath, "-C", assetsDir, "."]);
  }
  const checksum = sha256File(outPath);
  await writeFile(path.join(outDir, UPGRADE_CHECKSUM_NAME), `${checksum}  ${UPGRADE_ASSET_NAME}\n`);
  return {
    name: UPGRADE_ASSET_NAME,
    path: outPath,
    sha256: checksum,
    kind: "upgrade_bundle",
  };
}

function npmTarballUrl(packageName, version) {
  if (packageName === "agentplane") {
    return `https://registry.npmjs.org/agentplane/-/agentplane-${version}.tgz`;
  }
  const unscoped = packageName.split("/").at(-1);
  return `https://registry.npmjs.org/${encodeURIComponent(packageName)}/-/${unscoped}-${version}.tgz`;
}

function packCliPackage(repoRoot, outDir) {
  const cacheDir = path.join(repoRoot, ".agentplane", ".npm-cache");
  const stdout = run("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", outDir], {
    cwd: path.join(repoRoot, CLI_PACKAGE_DIR),
    env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) {
    throw new Error("npm pack did not emit JSON for the agentplane package");
  }
  const [entry] = JSON.parse(jsonMatch[2]);
  const filename = String(entry?.filename ?? "");
  if (!filename) throw new Error("npm pack did not report a filename for agentplane");
  const tarballPath = path.join(outDir, filename);
  return {
    path: tarballPath,
    sha256: sha256File(tarballPath),
  };
}

function renderInstallSh({ version, repo, tag }) {
  return `#!/usr/bin/env sh
set -eu

VERSION="${version}"
REPO="${repo}"
TAG="${tag}"
BASE_URL="https://github.com/$REPO/releases/download/$TAG"
CHANNEL="\${AGENTPLANE_INSTALL_CHANNEL:-standalone}"
INSTALL_DIR="\${AGENTPLANE_INSTALL_DIR:-$HOME/.agentplane/standalone/$VERSION}"

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "agentplane install: missing required command: $1" >&2
    exit 1
  }
}

need curl
need tar

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT INT TERM

case "$(uname -s)" in
  Darwin) platform="darwin" ;;
  Linux) platform="linux" ;;
  *) echo "agentplane install: unsupported OS: $(uname -s)" >&2; exit 1 ;;
esac

case "$(uname -m)" in
  arm64|aarch64) arch="arm64" ;;
  x86_64|amd64) arch="x64" ;;
  *) echo "agentplane install: unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

case "$CHANNEL" in
  standalone) asset="agentplane-v$VERSION-$platform-$arch.tar.gz" ;;
  bun) asset="agentplane-bun-v$VERSION-$platform-$arch.tar.gz" ;;
  *) echo "agentplane install: unsupported channel: $CHANNEL (expected standalone or bun)" >&2; exit 1 ;;
esac
archive="$tmp_dir/$asset"
checksums="$tmp_dir/SHA256SUMS"

curl -fsSL "$BASE_URL/SHA256SUMS" -o "$checksums"
curl -fsSL "$BASE_URL/$asset" -o "$archive"

expected="$(awk -v asset="$asset" '$2 == asset {print $1}' "$checksums")"
if [ -z "$expected" ]; then
  echo "agentplane install: checksum entry missing for $asset" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "$archive" | awk '{print $1}')"
else
  need shasum
  actual="$(shasum -a 256 "$archive" | awk '{print $1}')"
fi

if [ "$actual" != "$expected" ]; then
  echo "agentplane install: checksum mismatch for $asset" >&2
  echo "expected: $expected" >&2
  echo "actual:   $actual" >&2
  exit 1
fi

rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
tar -xzf "$archive" -C "$INSTALL_DIR"
"$INSTALL_DIR/bin/agentplane" --version
printf '%s\\n' "$INSTALL_DIR/bin"
`;
}

function renderInstallPs1({ version, repo, tag }) {
  const defaultInstallDir = String.raw`".agentplane\standalone\$Version"`;
  const checksumSplitPattern = String.raw`'\s+'`;
  const agentplaneCmd = String.raw`"bin\agentplane.cmd"`;
  const agentplaneExe = String.raw`"bin\agentplane.exe"`;
  return `$ErrorActionPreference = "Stop"

$Version = "${version}"
$Repo = "${repo}"
$Tag = "${tag}"
$Channel = if ($env:AGENTPLANE_INSTALL_CHANNEL) { $env:AGENTPLANE_INSTALL_CHANNEL } else { "standalone" }
$BaseUrl = "https://github.com/$Repo/releases/download/$Tag"
$InstallDir = if ($env:AGENTPLANE_INSTALL_DIR) { $env:AGENTPLANE_INSTALL_DIR } else { Join-Path $HOME ${defaultInstallDir} }

function Require-Command($Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "agentplane install: missing required command: $Name"
  }
}

$TempDir = Join-Path ([System.IO.Path]::GetTempPath()) ("agentplane-install-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $TempDir | Out-Null
try {
  if ($Channel -eq "standalone") {
    $Asset = "agentplane-v$Version-win32-x64.zip"
    $AgentplaneBin = ${agentplaneCmd}
  }
  elseif ($Channel -eq "bun") {
    $Asset = "agentplane-bun-v$Version-win32-x64.zip"
    $AgentplaneBin = ${agentplaneExe}
  }
  else {
    throw "agentplane install: unsupported channel: $Channel (expected standalone or bun)"
  }
  $Archive = Join-Path $TempDir $Asset
  $Checksums = Join-Path $TempDir "SHA256SUMS"
  Invoke-WebRequest -Uri "$BaseUrl/SHA256SUMS" -OutFile $Checksums
  Invoke-WebRequest -Uri "$BaseUrl/$Asset" -OutFile $Archive
  $Expected = (Get-Content $Checksums | ForEach-Object {
    $Parts = ($_ -split ${checksumSplitPattern})
    if ($Parts.Count -ge 2 -and $Parts[1] -eq $Asset) { $Parts[0] }
  } | Select-Object -First 1)
  if (-not $Expected) {
    throw "agentplane install: checksum entry missing for $Asset"
  }
  $Actual = (Get-FileHash -Algorithm SHA256 -Path $Archive).Hash.ToLowerInvariant()
  if ($Actual -ne $Expected.ToLowerInvariant()) {
    throw "agentplane install: checksum mismatch for $Asset; expected $Expected, actual $Actual"
  }
  if (Test-Path $InstallDir) {
    Remove-Item -Recurse -Force $InstallDir
  }
  New-Item -ItemType Directory -Path $InstallDir | Out-Null
  Expand-Archive -Path $Archive -DestinationPath $InstallDir -Force
  & (Join-Path $InstallDir $AgentplaneBin) --version
  Write-Output (Join-Path $InstallDir "bin")
}
finally {
  Remove-Item -Recurse -Force $TempDir -ErrorAction SilentlyContinue
}
`;
}

function channelState(secretName) {
  if (process.env[secretName]) {
    return {
      status: "pending",
      requiredSecret: secretName,
      recovery: `Rerun the release distribution job after inspecting ${secretName}-backed publication logs.`,
    };
  }
  return {
    status: "skipped_missing_credentials",
    requiredSecret: secretName,
    recovery: `Add ${secretName} and rerun only this credentials-gated distribution module for the same release manifest.`,
  };
}

async function writeInstallers(outDir, context) {
  const installSh = renderInstallSh(context);
  const installPs1 = renderInstallPs1(context);
  const shPath = path.join(outDir, INSTALL_SH_NAME);
  const ps1Path = path.join(outDir, INSTALL_PS1_NAME);
  await Promise.all([writeFile(shPath, installSh, "utf8"), writeFile(ps1Path, installPs1, "utf8")]);
  chmodSync(shPath, 0o755);
  return [
    { name: INSTALL_SH_NAME, path: shPath, sha256: sha256Text(installSh), kind: "installer" },
    { name: INSTALL_PS1_NAME, path: ps1Path, sha256: sha256Text(installPs1), kind: "installer" },
  ];
}

async function writeChecksums(outDir, assets) {
  const lines = assets
    .map((asset) => `${asset.sha256}  ${asset.name}`)
    .toSorted((a, b) => a.localeCompare(b));
  const body = `${lines.join("\n")}\n`;
  const checksumPath = path.join(outDir, SHA256SUMS_NAME);
  await writeFile(checksumPath, body, "utf8");
  return {
    name: SHA256SUMS_NAME,
    path: checksumPath,
    sha256: sha256Text(body),
    kind: "checksum_manifest",
  };
}

function generateStandaloneAssets(repoRoot, outDir, context) {
  const args = [
    "scripts/generate-standalone-cli-assets.mjs",
    "--out",
    outDir,
    "--version",
    context.version,
    "--tag",
    context.tag,
    "--sha",
    context.sha,
    "--repo",
    context.repo,
  ];
  if (context.check || context.standaloneCheckMode) {
    args.push("--synthetic-node", "--skip-install");
  }
  execFileSync("node", args, {
    cwd: repoRoot,
    stdio: "ignore",
    env: process.env,
  });
  return JSON.parse(readFileSync(path.join(outDir, STANDALONE_ASSETS_MANIFEST_NAME), "utf8"));
}

function generateBunAssets(repoRoot, outDir, context) {
  const args = [
    "scripts/generate-bun-cli-assets.mjs",
    "--out",
    outDir,
    "--version",
    context.version,
    "--tag",
    context.tag,
    "--sha",
    context.sha,
  ];
  if (context.check || context.standaloneCheckMode) {
    args.push("--synthetic-binary");
  }
  execFileSync("node", args, {
    cwd: repoRoot,
    stdio: "ignore",
    env: process.env,
  });
  return JSON.parse(readFileSync(path.join(outDir, BUN_ASSETS_MANIFEST_NAME), "utf8"));
}

function publicReleaseAssetUrl(repo, tag, assetName) {
  return `https://github.com/${repo}/releases/download/${tag}/${assetName}`;
}

async function buildDistribution(repoRoot, args) {
  const cliPackage = await readCliPackage(repoRoot);
  const version = args.version ?? cliPackage.version;
  const tag = args.tag ?? `v${version}`;
  const sha = args.sha ?? resolveGitHead(repoRoot);
  const outDir = args.check
    ? mkdtempSync(path.join(os.tmpdir(), "agentplane-release-dist-"))
    : args.outDir;
  await mkdir(outDir, { recursive: true });

  const packDir = path.join(outDir, ".npm-pack");
  await mkdir(packDir, { recursive: true });
  const cliTarball = packCliPackage(repoRoot, packDir);
  const cliTarballUrl = npmTarballUrl(cliPackage.name, version);
  const upgradeBundle = await createUpgradeBundle(repoRoot, outDir);
  const installerAssets = await writeInstallers(outDir, {
    version,
    repo: args.repo,
    tag,
  });
  const standaloneManifest = generateStandaloneAssets(repoRoot, outDir, {
    version,
    tag,
    sha,
    repo: args.repo,
    check: args.check,
    standaloneCheckMode: args.standaloneCheckMode,
  });
  const standaloneAssets = standaloneManifest.assets ?? [];
  const bunManifest = generateBunAssets(repoRoot, outDir, {
    version,
    tag,
    sha,
    standaloneCheckMode: args.standaloneCheckMode,
    check: args.check,
  });
  const bunAssets = bunManifest.assets ?? [];
  const checksumManifest = await writeChecksums(outDir, [
    upgradeBundle,
    ...installerAssets,
    ...standaloneAssets,
    ...bunAssets,
  ]);

  const releaseAssets = [
    upgradeBundle,
    ...installerAssets,
    ...standaloneAssets,
    ...bunAssets,
    checksumManifest,
    {
      name: STANDALONE_ASSETS_MANIFEST_NAME,
      kind: "standalone_manifest",
      sha256: sha256File(path.join(outDir, STANDALONE_ASSETS_MANIFEST_NAME)),
    },
    {
      name: BUN_ASSETS_MANIFEST_NAME,
      kind: "bun_manifest",
      sha256: sha256File(path.join(outDir, BUN_ASSETS_MANIFEST_NAME)),
    },
  ].map((asset) => ({
    name: asset.name,
    kind: asset.kind,
    sha256: asset.sha256,
    url: publicReleaseAssetUrl(args.repo, tag, asset.name),
  }));
  const manifest = {
    schemaVersion: 1,
    manifestKind: "release_distribution",
    version,
    tag,
    sha,
    repository: args.repo,
    packages: {
      agentplane: {
        name: cliPackage.name,
        version,
        npmTarballUrl: cliTarballUrl,
        npmTarballSha256: cliTarball.sha256,
      },
    },
    platformAssets: standaloneAssets,
    bunAssets,
    releaseAssets,
    externalChannelSwitchGate: {
      defaultInstallStrategy: "standalone_bundled_node",
      candidateInstallStrategy: "bun_single_file_executable",
      bunDefaultEligible: false,
      requiredEvidence: [
        "published_release_contains_all_bun_assets",
        "bun_assets_pass_release_cycle_smoke",
        "external_channel_rollback_to_standalone_is_documented",
      ],
      nextAction:
        "Keep Homebrew, Scoop, and setup-agentplane on standalone archives until a published release records Bun binary parity evidence.",
    },
    channels: {
      npm: { status: "pending", required: true },
      githubRelease: { status: "pending", required: true },
      ghcr: { status: "pending", required: true },
      homebrewTap: channelState("HOMEBREW_TAP_TOKEN"),
      scoopBucket: channelState("SCOOP_BUCKET_TOKEN"),
      setupAgentplane: channelState("SETUP_AGENTPLANE_TOKEN"),
    },
    recovery: {
      missingCredentials:
        "Add the missing channel secret and rerun only the corresponding credentials-gated module for this exact manifest.",
      assetDrift:
        "Regenerate release distribution assets for the same version, tag, and sha, then re-upload the GitHub Release assets before running package-manager modules.",
    },
  };
  const manifestPath = path.join(outDir, DISTRIBUTION_MANIFEST_NAME);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  if (args.check) {
    assertDistributionOutputs(outDir, manifest);
    rmSync(outDir, { recursive: true, force: true });
  }
  return manifest;
}

function assertDistributionOutputs(outDir, manifest) {
  const required = [
    UPGRADE_ASSET_NAME,
    UPGRADE_CHECKSUM_NAME,
    INSTALL_SH_NAME,
    INSTALL_PS1_NAME,
    SHA256SUMS_NAME,
    DISTRIBUTION_MANIFEST_NAME,
    STANDALONE_ASSETS_MANIFEST_NAME,
    BUN_ASSETS_MANIFEST_NAME,
  ];
  for (const name of required) {
    const target = path.join(outDir, name);
    if (!existsSync(target)) throw new Error(`Missing release distribution output: ${name}`);
  }
  if (manifest.platformAssets.length !== 5) {
    throw new Error(`Expected 5 standalone platform assets, got ${manifest.platformAssets.length}`);
  }
  if (manifest.bunAssets.length !== 5) {
    throw new Error(`Expected 5 Bun executable assets, got ${manifest.bunAssets.length}`);
  }
  if (manifest.releaseAssets.length !== 16) {
    throw new Error(`Expected 16 public release assets, got ${manifest.releaseAssets.length}`);
  }
  const names = new Set(manifest.releaseAssets.map((asset) => asset.name));
  for (const name of [
    UPGRADE_ASSET_NAME,
    INSTALL_SH_NAME,
    INSTALL_PS1_NAME,
    SHA256SUMS_NAME,
    STANDALONE_ASSETS_MANIFEST_NAME,
    BUN_ASSETS_MANIFEST_NAME,
    ...manifest.platformAssets.map((asset) => asset.name),
    ...manifest.bunAssets.map((asset) => asset.name),
  ]) {
    if (!names.has(name)) throw new Error(`release-distribution.json missing asset ${name}`);
  }
}

const main = defineScript({
  name: "generate-release-distribution",
  async run(context) {
    const repoRoot = context.cwd;
    const args = parseArgs(context.argv, repoRoot);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const manifest = await buildDistribution(repoRoot, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(manifest)}\n`);
      return;
    }
    context.stdout.write(
      `release distribution ${args.check ? "check" : "generated"} for ${manifest.tag} (${manifest.version})\n`,
    );
  },
});

runScriptMain(main);
