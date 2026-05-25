import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  findPlatformAsset,
  readJson,
  requireString,
  runDistributionGenerator,
} from "../lib/release-distribution-render.mjs";
import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const DEFAULT_MANIFEST_PATH = ".agentplane/.release/publish/distribution/release-distribution.json";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/homebrew";
const FORMULA_NAME = "agentplane.rb";

function usage() {
  return [
    "Usage: node scripts/render-homebrew-formula.mjs [options]",
    "",
    "Render the AgentPlane Homebrew formula from release-distribution.json.",
    "",
    "Options:",
    "  --manifest <path>       release-distribution.json path",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/homebrew)",
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

function renderFormula(manifest) {
  const version = requireString(manifest.version, "release version");
  const darwinArm64 = findPlatformAsset(manifest, "darwin", "arm64");
  const darwinX64 = findPlatformAsset(manifest, "darwin", "x64");
  return `class Agentplane < Formula
  desc "CLI for auditable coding-agent workflows"
  homepage "https://github.com/basilisk-labs/agentplane"
  version "${version}"
  license "MIT"

  if OS.mac? && Hardware::CPU.arm?
    url "${darwinArm64.url}"
    sha256 "${darwinArm64.sha256}"
  elsif OS.mac? && Hardware::CPU.intel?
    url "${darwinX64.url}"
    sha256 "${darwinX64.sha256}"
  else
    odie "AgentPlane Homebrew formula currently supports macOS arm64 and x86_64 Bun executable archives"
  end

  livecheck do
    url "https://api.github.com/repos/basilisk-labs/agentplane/releases/latest"
    strategy :json do |json|
      json["tag_name"]&.gsub(/^v/, "")
    end
  end

  def install
    libexec.install Dir["*"]
    bin.install_symlink libexec/"bin/agentplane" => "agentplane"
  end

  test do
    assert_match "${version}", shell_output("#{bin}/agentplane --version")
    assert_match "agentplane", shell_output("#{bin}/agentplane --help")
  end
end
`;
}

async function renderHomebrew(repoRoot, args) {
  const tempRoot = args.check ? mkdtempSync(path.join(os.tmpdir(), "agentplane-homebrew-")) : null;
  const outDir = tempRoot ? path.join(tempRoot, "homebrew") : args.outDir;
  const manifestPath = tempRoot
    ? runDistributionGenerator(repoRoot, path.join(tempRoot, "distribution"))
    : args.manifestPath;
  const manifest = await readJson(manifestPath);
  const formula = renderFormula(manifest);
  const formulaDir = path.join(outDir, "Formula");
  const formulaPath = path.join(formulaDir, FORMULA_NAME);
  await mkdir(formulaDir, { recursive: true });
  await writeFile(formulaPath, formula, "utf8");

  const channel = manifest.channels?.homebrewTap ?? {};
  const evidence = {
    schemaVersion: 1,
    module: "homebrew_tap",
    status: channel.status ?? "unknown",
    requiredSecret: channel.requiredSecret ?? "HOMEBREW_TAP_TOKEN",
    tapRepository: process.env.HOMEBREW_TAP_REPOSITORY ?? "basilisk-labs/homebrew-tap",
    version: manifest.version,
    tag: manifest.tag,
    sha: manifest.sha,
    formulaPath,
    formulaName: FORMULA_NAME,
    assets: {
      darwinArm64: findPlatformAsset(manifest, "darwin", "arm64"),
      darwinX64: findPlatformAsset(manifest, "darwin", "x64"),
    },
    installStrategy: "bun_single_file_executable",
    externalChannelSwitchGate: manifest.externalChannelSwitchGate ?? null,
    nextAction:
      channel.status === "skipped_missing_credentials"
        ? "Add HOMEBREW_TAP_TOKEN and rerun the Homebrew tap publication module for this manifest."
        : "Commit this formula to the configured Homebrew tap and open or update the release PR.",
  };
  await writeFile(
    path.join(outDir, "homebrew-result.json"),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );

  if (args.check) {
    if (formula.includes('depends_on "node"') || formula.includes("npm")) {
      throw new Error("Homebrew formula must not depend on Node or npm");
    }
    if (!formula.includes("Bun executable archives")) {
      throw new Error("Homebrew formula must describe Bun executable archive support");
    }
    if (!formula.includes('bin.install_symlink libexec/"bin/agentplane"')) {
      throw new Error("Homebrew formula must link the standalone agentplane wrapper");
    }
    rmSync(tempRoot, { recursive: true, force: true });
  }

  return evidence;
}

const main = defineScript({
  name: "render-homebrew-formula",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const evidence = await renderHomebrew(context.cwd, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(evidence)}\n`);
      return;
    }
    context.stdout.write(
      `homebrew formula ${args.check ? "check" : "rendered"} (${evidence.status})\n`,
    );
  },
});

runScriptMain(main);
