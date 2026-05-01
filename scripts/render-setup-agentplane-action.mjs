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

function renderAction(manifest) {
  const version = requireString(manifest.version, "release version");
  const repository = requireString(manifest.repository, "release repository");
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
        version="$\{{ inputs.version }}"
        version="$\{version#v}"
        tag="v$\{version}"
        tmp_dir="$(mktemp -d)"
        trap 'rm -rf "$tmp_dir"' EXIT INT TERM
        curl -fsSL "https://github.com/${repository}/releases/download/$\{tag}/install.sh" -o "$tmp_dir/install.sh"
        sh "$tmp_dir/install.sh"
        if [ "$\{{ inputs.verify }}" = "true" ]; then
          agentplane --version | grep -Fx "$\{version}"
        fi
`;
}

function renderReadme(manifest) {
  const version = requireString(manifest.version, "release version");
  const actionRepository =
    process.env.SETUP_AGENTPLANE_REPOSITORY ?? "basilisk-labs/setup-agentplane";
  return `# setup-agentplane

Install AgentPlane in GitHub Actions.

\`\`\`yaml
steps:
  - uses: ${actionRepository}@v${version}
    with:
      version: ${version}
\`\`\`

This generated action installs AgentPlane through the release \`install.sh\` asset, which verifies
the npm tarball checksum before installing the CLI.
`;
}

function runDistributionGenerator(repoRoot, outDir) {
  execFileSync("node", ["scripts/generate-release-distribution.mjs", "--out", outDir], {
    cwd: repoRoot,
    stdio: "ignore",
    env: process.env,
  });
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
    installAssetUrl: `https://github.com/${manifest.repository}/releases/download/${manifest.tag}/install.sh`,
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
    if (!action.includes("/releases/download/${tag}/install.sh")) {
      throw new Error("setup-agentplane action must install through the release install.sh asset");
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
