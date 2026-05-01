import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

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

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function requireString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Missing ${label}`);
  return text;
}

function renderFormula(manifest) {
  const version = requireString(manifest.version, "release version");
  const pkg = manifest.packages?.agentplane;
  const url = requireString(pkg?.npmTarballUrl, "agentplane npm tarball URL");
  const sha256 = requireString(pkg?.npmTarballSha256, "agentplane npm tarball sha256");
  return `class Agentplane < Formula
  desc "Git-native CLI harness for auditable coding-agent workflows"
  homepage "https://agentplane.org"
  url "${url}"
  sha256 "${sha256}"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*")
  end

  test do
    assert_match "${version}", shell_output("#{bin}/agentplane --version")
    assert_match "agentplane", shell_output("#{bin}/agentplane --help")
  end
end
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
    npmTarballUrl: manifest.packages?.agentplane?.npmTarballUrl ?? null,
    npmTarballSha256: manifest.packages?.agentplane?.npmTarballSha256 ?? null,
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
    if (!formula.includes("std_npm_args")) {
      throw new Error("Homebrew formula must use std_npm_args for npm package installation");
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
