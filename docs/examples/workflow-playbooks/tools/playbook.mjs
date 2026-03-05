import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function resolveRepoRoot(runDir) {
  let current = path.resolve(runDir);
  while (true) {
    if (existsSync(path.join(current, ".agentplane"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return process.cwd();
    current = parent;
  }
}

function truncate(value, maxLength = 8000) {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}\n...[truncated ${value.length - maxLength} chars]`;
}

function runCommand(command, args, cwd) {
  const startedAt = new Date().toISOString();
  const started = Date.now();
  const result = spawnSync(command, args, {
    cwd,
    env: process.env,
    encoding: "utf8",
  });
  const durationMs = Date.now() - started;
  const endedAt = new Date().toISOString();

  let exitCode = typeof result.status === "number" ? result.status : 0;
  let stderr = String(result.stderr ?? "");
  if (result.error) {
    exitCode = 1;
    const code = typeof result.error.code === "string" ? result.error.code : "";
    if (code === "ENOENT") exitCode = 127;
    stderr = `${stderr}\n${result.error.message}`.trim();
  }

  return {
    command,
    args,
    display: `${command} ${args.join(" ")}`.trim(),
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: durationMs,
    exit_code: exitCode,
    stdout: truncate(String(result.stdout ?? "")),
    stderr: truncate(stderr),
  };
}

function createPlaybookCommands(repoRoot, mode) {
  const localCli = path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");
  const hasLocalCli = existsSync(localCli);
  const ap = (...args) => (hasLocalCli ? ["node", localCli, ...args] : ["agentplane", ...args]);

  if (mode === "debug") {
    return [
      ap("preflight", "--json"),
      ap("doctor"),
      ["git", "status", "--short", "--untracked-files=no"],
    ];
  }

  if (mode === "sync") {
    return [
      ap("task", "list"),
      ap("task", "export"),
      ["git", "status", "--short", "--untracked-files=no"],
    ];
  }

  if (mode === "land") {
    return [
      ap("preflight", "--mode", "full", "--json"),
      ap("doctor"),
      ["git", "status", "--short", "--untracked-files=no"],
    ];
  }

  throw new Error(`Unsupported playbook mode: ${mode}`);
}

function main() {
  const mode = process.argv[2] ?? "";
  const runDir = process.env.AGENTPLANE_RUN_DIR ?? process.cwd();
  const stepDir = process.env.AGENTPLANE_STEP_DIR ?? runDir;
  const repoRoot = resolveRepoRoot(runDir);
  const startedAt = new Date().toISOString();
  const commands = createPlaybookCommands(repoRoot, mode);

  mkdirSync(stepDir, { recursive: true });

  const results = [];
  let failed = false;

  for (const [command, ...args] of commands) {
    const result = runCommand(command, args, repoRoot);
    results.push(result);
    if (result.stdout) process.stdout.write(result.stdout + "\n");
    if (result.stderr) process.stderr.write(result.stderr + "\n");
    if (result.exit_code !== 0) failed = true;
  }

  const evidence = {
    schema_version: 1,
    playbook: mode,
    status: failed ? "failed" : "success",
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    repo_root: repoRoot,
    run_dir: runDir,
    step_dir: stepDir,
    commands: results.map((result) => ({
      command: result.command,
      args: result.args,
      display: result.display,
      started_at: result.started_at,
      ended_at: result.ended_at,
      duration_ms: result.duration_ms,
      exit_code: result.exit_code,
      stdout_tail: result.stdout,
      stderr_tail: result.stderr,
    })),
  };

  const evidencePath = path.join(stepDir, "evidence.json");
  writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + "\n", "utf8");
  process.stdout.write(`Evidence: ${evidencePath}\n`);

  if (failed) {
    process.exitCode = 1;
  }
}

main();
