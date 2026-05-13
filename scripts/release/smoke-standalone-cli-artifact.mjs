import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const TARGETS = [
  { platform: "darwin", arch: "arm64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "darwin", arch: "x64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "linux", arch: "x64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "linux", arch: "arm64", archive: "tar.gz", entrypoint: "bin/agentplane" },
  { platform: "win32", arch: "x64", archive: "zip", entrypoint: "bin/agentplane.cmd" },
];

function usage() {
  return [
    "Usage: node scripts/smoke-standalone-cli-artifact.mjs --artifact <archive> [options]",
    "",
    "Smoke-test a bundled-runtime AgentPlane CLI archive.",
    "",
    "Options:",
    "  --artifact <path>              Standalone archive to smoke-test",
    "  --expected-version <semver>    Expected AgentPlane version",
    "  --allow-synthetic-runtime      Accept synthetic check-mode runtime output",
    "  --skip-cli-commands            Validate layout only; do not execute the CLI",
    "  --keep                         Keep the extracted temp directory for inspection",
    "  --json                         Emit smoke result JSON to stdout",
    "  --help, -h                     Show this help text",
  ].join("\n");
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: opts.encoding ?? "utf8",
    env: opts.env ?? process.env,
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
    timeout: opts.timeout ?? 30_000,
  });
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["artifact", "expected-version"],
    booleanFlags: ["allow-synthetic-runtime", "skip-cli-commands", "keep", "json", "help"],
  });
  return {
    help: Boolean(flags.help),
    artifact: typeof flags.artifact === "string" ? path.resolve(repoRoot, flags.artifact) : null,
    expectedVersion:
      typeof flags["expected-version"] === "string" ? flags["expected-version"].trim() : null,
    allowSyntheticRuntime: Boolean(flags["allow-synthetic-runtime"]),
    skipCliCommands: Boolean(flags["skip-cli-commands"]),
    keep: Boolean(flags.keep),
    json: Boolean(flags.json),
  };
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function inferTarget(artifactPath) {
  const name = path.basename(artifactPath);
  const target = TARGETS.find((candidate) =>
    name.includes(`-${candidate.platform}-${candidate.arch}.`),
  );
  if (!target) throw new Error(`Cannot infer standalone target from artifact name: ${name}`);
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

function assertFile(filePath, label) {
  if (!existsSync(filePath)) throw new Error(`Missing ${label}: ${filePath}`);
  const stat = statSync(filePath);
  if (!stat.isFile()) throw new Error(`Expected ${label} to be a file: ${filePath}`);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function runtimePath(rootDir, target) {
  if (target.platform === "win32") return path.join(rootDir, "lib", "node", "node.exe");
  return path.join(rootDir, "lib", "node", "bin", "node");
}

function assertWrapper(rootDir, target) {
  const wrapperPath = path.join(rootDir, target.entrypoint);
  assertFile(wrapperPath, "wrapper");
  const wrapper = readFileSync(wrapperPath, "utf8");
  if (target.platform === "win32") {
    if (!wrapper.includes(String.raw`"%~dp0..\lib\node\node.exe"`)) {
      throw new Error("Windows wrapper does not invoke bundled node.exe");
    }
    if (!wrapper.includes(String.raw`"%~dp0..\lib\agentplane\package\bin\agentplane.js"`)) {
      throw new Error("Windows wrapper does not invoke packaged agentplane.js");
    }
    return;
  }
  if (!wrapper.includes('"$DIR/../lib/node/bin/node"')) {
    throw new Error("POSIX wrapper does not invoke bundled Node runtime");
  }
  if (!wrapper.includes('"$DIR/../lib/agentplane/package/bin/agentplane.js"')) {
    throw new Error("POSIX wrapper does not invoke packaged agentplane.js");
  }
  chmodSync(wrapperPath, 0o755);
}

function commandEnv(rootDir) {
  const withoutNodePath = String(process.env.PATH ?? "")
    .split(path.delimiter)
    .filter((entry) => !/node|npm|bun/u.test(entry))
    .join(path.delimiter);
  return {
    ...process.env,
    PATH: withoutNodePath,
    AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
    AGENTPLANE_STANDALONE_SMOKE_ROOT: rootDir,
  };
}

function runCli(rootDir, target, args, cwd) {
  const executable = path.join(rootDir, target.entrypoint);
  return run(executable, args, {
    cwd,
    env: commandEnv(rootDir),
    timeout: 45_000,
  });
}

function isDoctorOkOutput(output) {
  return output.includes("doctor OK") || output.includes("doctor (OK)");
}

function initTempGitRepo() {
  const repo = mkdtempSync(path.join(os.tmpdir(), "agentplane-standalone-smoke-repo-"));
  run("git", ["init", "-q", "-b", "main"], { cwd: repo });
  run("git", ["config", "user.email", "agentplane-smoke@example.com"], { cwd: repo });
  run("git", ["config", "user.name", "AgentPlane Smoke"], { cwd: repo });
  execFileSync("git", ["commit", "--allow-empty", "-m", "initial"], {
    cwd: repo,
    stdio: "ignore",
  });
  return repo;
}

function runCliCommands(rootDir, target, args) {
  if (args.skipCliCommands) return { executed: false, reason: "skip_cli_commands" };
  if (!isHostTarget(target)) return { executed: false, reason: "host_target_mismatch" };

  const versionOutput = runCli(rootDir, target, ["--version"], rootDir).trim();
  if (versionOutput === "synthetic-node") {
    if (!args.allowSyntheticRuntime) {
      throw new Error("Artifact contains a synthetic runtime; pass --allow-synthetic-runtime");
    }
    return { executed: true, syntheticRuntime: true, versionOutput };
  }
  if (args.expectedVersion && versionOutput !== args.expectedVersion) {
    throw new Error(`Expected version ${args.expectedVersion}, got ${versionOutput}`);
  }

  const repo = initTempGitRepo();
  try {
    const quickstartOutput = runCli(rootDir, target, ["quickstart"], repo);
    if (!quickstartOutput.includes("agentplane quickstart")) {
      throw new Error("quickstart smoke output did not contain expected marker");
    }
    const initOutput = runCli(rootDir, target, ["init", "--yes"], repo);
    if (!initOutput.includes(".agentplane") && !existsSync(path.join(repo, ".agentplane"))) {
      throw new Error("init smoke did not create .agentplane");
    }
    const doctorOutput = runCli(rootDir, target, ["doctor"], repo);
    if (!isDoctorOkOutput(doctorOutput)) {
      throw new Error(`doctor smoke did not pass:\n${doctorOutput.trim()}`);
    }
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
  return { executed: true, syntheticRuntime: false, versionOutput };
}

async function smokeArtifact(args) {
  if (!args.artifact) throw new Error("--artifact is required");
  assertFile(args.artifact, "artifact");
  const target = inferTarget(args.artifact);
  const extractDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-standalone-smoke-"));
  try {
    extractArchive(args.artifact, target, extractDir);
    const versionPath = path.join(extractDir, "share", "agentplane", "VERSION");
    const manifestPath = path.join(extractDir, "share", "agentplane", "manifest.json");
    const cliEntryPath = path.join(
      extractDir,
      "lib",
      "agentplane",
      "package",
      "bin",
      "agentplane.js",
    );
    const runtime = runtimePath(extractDir, target);
    assertFile(versionPath, "VERSION");
    assertFile(manifestPath, "standalone manifest");
    assertFile(cliEntryPath, "packaged CLI entrypoint");
    assertFile(runtime, "bundled Node runtime");
    assertWrapper(extractDir, target);

    const versionText = await readFile(versionPath, "utf8");
    const version = versionText.trim();
    const manifest = await readJson(manifestPath);
    if (args.expectedVersion && version !== args.expectedVersion) {
      throw new Error(`Expected VERSION ${args.expectedVersion}, got ${version}`);
    }
    if (manifest.kind !== "agentplane_standalone_cli") {
      throw new Error(`Unexpected standalone manifest kind: ${manifest.kind}`);
    }
    if (manifest.platform !== target.platform || manifest.arch !== target.arch) {
      throw new Error("Standalone manifest target does not match archive target");
    }
    if (manifest.installStrategy !== "bundled_node") {
      throw new Error(`Unexpected install strategy: ${manifest.installStrategy}`);
    }
    if (manifest.entrypoint !== target.entrypoint) {
      throw new Error(`Unexpected entrypoint: ${manifest.entrypoint}`);
    }

    const commandResult = runCliCommands(extractDir, target, args);
    return {
      artifact: path.basename(args.artifact),
      sha256: sha256File(args.artifact),
      version,
      platform: target.platform,
      arch: target.arch,
      entrypoint: target.entrypoint,
      commandResult,
      extractDir: args.keep ? extractDir : null,
    };
  } finally {
    if (!args.keep) rmSync(extractDir, { recursive: true, force: true });
  }
}

const main = defineScript({
  name: "smoke-standalone-cli-artifact",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const result = await smokeArtifact(args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(result)}\n`);
      return;
    }
    const commandStatus = result.commandResult.executed
      ? result.commandResult.syntheticRuntime
        ? "synthetic-runtime"
        : "cli-commands"
      : result.commandResult.reason;
    context.stdout.write(
      `standalone artifact smoke OK (${result.platform}-${result.arch}, ${commandStatus})\n`,
    );
  },
});

runScriptMain(main);
