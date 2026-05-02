import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const DEFAULT_MANIFEST_PATH = ".agentplane/.release/publish/distribution/release-distribution.json";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/setup-agentplane";
const ACTION_NAME = "action.yml";

function usage() {
  return [
    "Usage: node scripts/render-setup-agentplane-action.mjs [options]",
    "",
    "Render the setup-agentplane GitHub Action bundle from release-distribution.json.",
    "",
    "Options:",
    "  --manifest <path>       release-distribution.json path",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/setup-agentplane)",
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

function setupAssets(manifest) {
  return {
    darwinArm64: findPlatformAsset(manifest, "darwin", "arm64"),
    darwinX64: findPlatformAsset(manifest, "darwin", "x64"),
    linuxArm64: findPlatformAsset(manifest, "linux", "arm64"),
    linuxX64: findPlatformAsset(manifest, "linux", "x64"),
    win32X64: findPlatformAsset(manifest, "win32", "x64"),
  };
}

function renderAction(manifest) {
  const version = requireString(manifest.version, "release version");
  const assets = setupAssets(manifest);
  return `name: setup-agentplane
description: Install the AgentPlane CLI in GitHub Actions.
inputs:
  version:
    description: AgentPlane version to install. Use a plain semver value such as ${version}.
    required: false
    default: "${version}"
  verify:
    description: Run an agentplane --version smoke check after installation.
    required: false
    default: "true"
runs:
  using: composite
  steps:
    - name: Install AgentPlane
      shell: bash
      run: |
        set -euo pipefail
        version="\${inputs.version}"
        version="\${version#v}"
        tmp_dir="$(mktemp -d)"
        trap 'rm -rf "$tmp_dir"' EXIT INT TERM
        case "\${RUNNER_OS}-\${RUNNER_ARCH}" in
          macOS-ARM64)
            asset_url="${assets.darwinArm64.url}"
            asset_sha256="${assets.darwinArm64.sha256}"
            ;;
          macOS-X64)
            asset_url="${assets.darwinX64.url}"
            asset_sha256="${assets.darwinX64.sha256}"
            ;;
          Linux-ARM64)
            asset_url="${assets.linuxArm64.url}"
            asset_sha256="${assets.linuxArm64.sha256}"
            ;;
          Linux-X64)
            asset_url="${assets.linuxX64.url}"
            asset_sha256="${assets.linuxX64.sha256}"
            ;;
          Windows-X64)
            asset_url="${assets.win32X64.url}"
            asset_sha256="${assets.win32X64.sha256}"
            ;;
          *)
            echo "Unsupported runner: \${RUNNER_OS}-\${RUNNER_ARCH}" >&2
            exit 2
            ;;
        esac
        archive="\${tmp_dir}/\${asset_url##*/}"
        install_dir="\${tmp_dir}/agentplane"
        mkdir -p "\${install_dir}"
        curl -fsSL "\${asset_url}" -o "\${archive}"
        actual_sha256="$(shasum -a 256 "\${archive}" | awk '{print $1}')"
        if [ "\${actual_sha256}" != "\${asset_sha256}" ]; then
          echo "agentplane archive checksum mismatch" >&2
          exit 2
        fi
        if [[ "\${archive}" == *.zip ]]; then
          powershell -NoProfile -Command "Expand-Archive -LiteralPath '\${archive}' -DestinationPath '\${install_dir}' -Force"
        else
          tar -xzf "\${archive}" -C "\${install_dir}"
        fi
        echo "\${install_dir}/bin" >> "$GITHUB_PATH"
        if [ "\${{ inputs.verify }}" = "true" ]; then
          "\${install_dir}/bin/agentplane" --version | grep -Fx "\${version}"
        fi
`;
}

function renderReadme(manifest) {
  const version = requireString(manifest.version, "release version");
  const actionRepository =
    process.env.SETUP_AGENTPLANE_REPOSITORY ?? "basilisk-labs/setup-agentplane";
  return `# setup-agentplane

[![CI](https://github.com/${actionRepository}/actions/workflows/ci.yml/badge.svg)](https://github.com/${actionRepository}/actions/workflows/ci.yml)
![release](https://img.shields.io/github/v/release/${actionRepository}?sort=semver)
![release-channel](https://img.shields.io/github/release-date/${actionRepository})

Install AgentPlane in GitHub Actions.

${`\`\`\`yaml\n- uses: ${actionRepository}@v${version}\n  with:\n    version: ${version}\n\`\`\``}

This composite action installs AgentPlane from the official standalone archives and validates archive checksums before adding \`agentplane\` to PATH.

## Capabilities

- Deterministic install by release asset pin (run uses release asset URL)
- Cross-platform: macOS/Linux/Windows
- Smoke check with agentplane --version
- Explicit version control (no floating tags needed)

## Quick start

\`\`\`yaml\nsteps:\n  - uses: ${actionRepository}@v${version}\n    with:\n      version: ${version}\n\`\`\`

## Smoke check

\`\`\`bash\nagentplane --version\n\`\`\`
`;
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

async function renderSetupAction(repoRoot, args) {
  const tempRoot = args.check
    ? mkdtempSync(path.join(os.tmpdir(), "agentplane-setup-action-"))
    : null;
  const outDir = tempRoot ? path.join(tempRoot, "setup-agentplane") : args.outDir;
  const manifestPath = tempRoot
    ? runDistributionGenerator(repoRoot, path.join(tempRoot, "distribution"))
    : args.manifestPath;
  const manifest = await readJson(manifestPath);
  const action = renderAction(manifest);
  const readme = renderReadme(manifest);
  const actionPath = path.join(outDir, ACTION_NAME);
  const readmePath = path.join(outDir, "README.md");
  await mkdir(outDir, { recursive: true });
  await writeFile(actionPath, action, "utf8");
  await writeFile(readmePath, readme, "utf8");

  const channel = manifest.channels?.setupAgentplane ?? {};
  const evidence = {
    schemaVersion: 1,
    module: "setup_agentplane_action",
    status: channel.status ?? "unknown",
    requiredSecret: channel.requiredSecret ?? "SETUP_AGENTPLANE_TOKEN",
    actionRepository: process.env.SETUP_AGENTPLANE_REPOSITORY ?? "basilisk-labs/setup-agentplane",
    releaseRepository: manifest.repository,
    version: manifest.version,
    tag: manifest.tag,
    sha: manifest.sha,
    actionPath,
    readmePath,
    assets: setupAssets(manifest),
    installStrategy: "standalone_bundled_node",
    nextAction:
      channel.status === "skipped_missing_credentials"
        ? "Add SETUP_AGENTPLANE_TOKEN and rerun the setup-agentplane publication module for this manifest."
        : "Commit this action bundle to the configured setup-agentplane repository and tag the release.",
  };
  await writeFile(
    path.join(outDir, "setup-agentplane-result.json"),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );

  if (args.check) {
    if (!action.includes("using: composite")) {
      throw new Error("setup-agentplane action must be a composite action");
    }
    if (!action.includes("asset_sha256") || action.includes("install.sh")) {
      throw new Error("setup-agentplane action must install verified standalone archives");
    }
    rmSync(tempRoot, { recursive: true, force: true });
  }

  return evidence;
}

const main = defineScript({
  name: "render-setup-agentplane-action",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const evidence = await renderSetupAction(context.cwd, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(evidence)}\n`);
      return;
    }
    context.stdout.write(
      `setup-agentplane action ${args.check ? "check" : "rendered"} (${evidence.status})\n`,
    );
  },
});

runScriptMain(main);
