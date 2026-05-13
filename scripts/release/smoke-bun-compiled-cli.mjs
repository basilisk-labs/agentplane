import { execFileSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, rmSync, readFileSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const TARGETS = [
  { platform: "darwin", arch: "arm64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "darwin", arch: "x64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "linux", arch: "x64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "linux", arch: "arm64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "win32", arch: "x64", archive: "zip", entrypoint: "bin/agentplane.exe" },
];

function usage() {
  return [
    "Usage: node scripts/smoke-bun-compiled-cli.mjs [options]",
    "",
    "Compile packages/agentplane/dist/cli.js with Bun or smoke-test a Bun executable release archive.",
    "",
    "Options:",
    "  --artifact <path>              Bun executable archive to smoke-test",
    "  --entry <path>                Built CLI entrypoint (default: packages/agentplane/dist/cli.js)",
    "  --expected-version <semver>   Expected AgentPlane version (default: packages/agentplane/package.json)",
    "  --skip-cli-commands           Validate archive layout only; do not execute the CLI",
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
    valueFlags: ["artifact", "entry", "expected-version"],
    booleanFlags: ["skip-cli-commands", "keep", "json", "help"],
  });
  return {
    help: Boolean(flags.help),
    artifact: typeof flags.artifact === "string" ? path.resolve(repoRoot, flags.artifact) : null,
    entry:
      typeof flags.entry === "string"
        ? path.resolve(repoRoot, flags.entry)
        : path.resolve(repoRoot, "packages/agentplane/dist/cli.js"),
    expectedVersion:
      typeof flags["expected-version"] === "string" ? flags["expected-version"].trim() : null,
    skipCliCommands: Boolean(flags["skip-cli-commands"]),
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

function assertFile(filePath, label) {
  if (!existsSync(filePath)) throw new Error(`Missing ${label}: ${filePath}`);
  const stat = statSync(filePath);
  if (!stat.isFile()) throw new Error(`Expected ${label} to be a file: ${filePath}`);
}

function inferTarget(artifactPath) {
  const name = path.basename(artifactPath);
  const target = TARGETS.find((candidate) =>
    name.includes(`-${candidate.platform}-${candidate.arch}.`),
  );
  if (!target) throw new Error(`Cannot infer Bun target from artifact name: ${name}`);
  return target;
}

function isHostTarget(target) {
  return target.platform === process.platform && target.arch === process.arch;
}

function extractArchive(artifactPath, target, extractDir) {
  if (target.archive === "zip") {
    run("unzip", ["-q", artifactPath, "-d", extractDir]);
    return;
  }
  run("tar", ["-xzf", artifactPath, "-C", extractDir]);
}

function smokeBunArchive(args) {
  assertFile(args.artifact, "artifact");
  const version = args.expectedVersion ?? readPackageVersion(process.cwd());
  const target = inferTarget(args.artifact);
  const extractDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-bun-archive-smoke-"));
  try {
    extractArchive(args.artifact, target, extractDir);
    const executable = path.join(extractDir, target.entrypoint);
    assertFile(executable, "Bun executable");
    if (target.platform !== "win32") chmodSync(executable, 0o755);
    if (args.skipCliCommands || !isHostTarget(target)) {
      return {
        artifact: args.artifact,
        target: `${target.platform}-${target.arch}`,
        version,
        checks: ["archive layout"],
        executed: false,
      };
    }
    const versionOutput = run(executable, ["--version"], { cwd: extractDir }).trim();
    if (versionOutput !== version) {
      throw new Error(`Expected Bun archive version ${version}, got ${versionOutput}`);
    }
    const quickstartOutput = run(executable, ["quickstart"], { cwd: extractDir });
    assertIncludes(quickstartOutput, "agentplane quickstart", "quickstart");
    return {
      artifact: args.artifact,
      target: `${target.platform}-${target.arch}`,
      version,
      checks: ["archive layout", "--version", "quickstart"],
      executed: true,
    };
  } finally {
    if (!args.keep) rmSync(extractDir, { recursive: true, force: true });
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
    const result = args.artifact ? smokeBunArchive(args) : smokeBunCompiledCli(args, context.cwd);
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
