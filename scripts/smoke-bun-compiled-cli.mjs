import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

function usage() {
  return [
    "Usage: node scripts/smoke-bun-compiled-cli.mjs [options]",
    "",
    "Compile packages/agentplane/dist/cli.js with Bun and smoke-test the executable without adjacent package assets.",
    "",
    "Options:",
    "  --entry <path>                Built CLI entrypoint (default: packages/agentplane/dist/cli.js)",
    "  --expected-version <semver>   Expected AgentPlane version (default: packages/agentplane/package.json)",
    "  --keep                        Keep the compiled temp directory for inspection",
    "  --json                        Emit smoke result JSON to stdout",
    "  --help, -h                    Show this help text",
  ].join("\n");
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: opts.encoding ?? "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
    timeout: opts.timeout ?? 60_000,
  });
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["entry", "expected-version"],
    booleanFlags: ["keep", "json", "help"],
  });
  return {
    help: Boolean(flags.help),
    entry:
      typeof flags.entry === "string"
        ? path.resolve(repoRoot, flags.entry)
        : path.resolve(repoRoot, "packages/agentplane/dist/cli.js"),
    expectedVersion:
      typeof flags["expected-version"] === "string" ? flags["expected-version"].trim() : null,
    keep: Boolean(flags.keep),
    json: Boolean(flags.json),
  };
}

function readPackageVersion(repoRoot) {
  const packageJsonPath = path.join(repoRoot, "packages", "agentplane", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  if (typeof packageJson.version !== "string" || packageJson.version.length === 0) {
    throw new Error(`Invalid package version in ${packageJsonPath}`);
  }
  return packageJson.version;
}

function assertIncludes(output, marker, label) {
  if (!output.includes(marker)) {
    throw new Error(`${label} output did not contain ${JSON.stringify(marker)}:\n${output.trim()}`);
  }
}

function smokeBunCompiledCli(args, repoRoot) {
  if (!existsSync(args.entry)) {
    throw new Error(`Missing built CLI entrypoint: ${args.entry}. Run bun run build first.`);
  }
  const version = args.expectedVersion ?? readPackageVersion(repoRoot);
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-bun-compiled-smoke-"));
  const executable = path.join(
    tempDir,
    process.platform === "win32" ? "agentplane-bun.exe" : "agentplane-bun",
  );
  try {
    run(
      "bun",
      [
        "build",
        args.entry,
        "--compile",
        "--define",
        `__AGENTPLANE_PACKAGE_VERSION__=${JSON.stringify(version)}`,
        "--outfile",
        executable,
      ],
      { cwd: repoRoot, timeout: 120_000 },
    );

    const versionOutput = run(executable, ["--version"], { cwd: tempDir }).trim();
    if (versionOutput !== version) {
      throw new Error(`Expected compiled version ${version}, got ${versionOutput}`);
    }

    const quickstartOutput = run(executable, ["quickstart"], { cwd: tempDir });
    assertIncludes(quickstartOutput, "agentplane quickstart", "quickstart");

    const roleOutput = run(executable, ["role", "CODER"], { cwd: tempDir });
    assertIncludes(roleOutput, "### CODER", "role CODER");

    return {
      executable,
      kept: args.keep,
      version,
      checks: ["--version", "quickstart", "role CODER"],
    };
  } finally {
    if (!args.keep) rmSync(tempDir, { recursive: true, force: true });
  }
}

const main = defineScript({
  name: "smoke-bun-compiled-cli",
  run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const result = smokeBunCompiledCli(args, context.cwd);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(result)}\n`);
      return;
    }
    context.stdout.write(
      `bun compiled CLI smoke OK (${result.version}; ${result.checks.join(", ")})\n`,
    );
  },
});

runScriptMain(main);
