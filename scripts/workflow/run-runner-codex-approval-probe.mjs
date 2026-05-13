import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { assessCodexApprovalMode } from "../../packages/agentplane/src/runner/codex-approval-probe.ts";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_MODES = ["never", "untrusted", "on-request"];

function usage() {
  console.log(
    [
      "Usage: bun scripts/run-runner-codex-approval-probe.mjs [--live] [--keep-workspace] [--modes never,untrusted,on-request]",
      "",
      "Default modes: never, untrusted, on-request",
    ].join("\n"),
  );
}

function parseModes(value) {
  const modes = value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (modes.length === 0) {
    throw new Error("--modes must contain at least one approval mode.");
  }
  for (const mode of modes) {
    if (!DEFAULT_MODES.includes(mode)) {
      throw new Error(`Unsupported approval mode: ${mode}`);
    }
  }
  return [...new Set(modes)];
}

function parseArgs(argv) {
  const out = {
    live: true,
    keepWorkspace: false,
    modes: [...DEFAULT_MODES],
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--live") continue;
    if (arg === "--keep-workspace") {
      out.keepWorkspace = true;
      continue;
    }
    if (arg === "--modes") {
      out.modes = parseModes(argv[i + 1] ?? "");
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return out;
}

async function runCommand(cmd, args, cwd, timeoutMs = 120_000) {
  try {
    const { stdout, stderr } = await execFileAsync(cmd, args, { cwd, timeout: timeoutMs });
    return { exitCode: 0, signal: null, timedOut: false, stdout, stderr };
  } catch (error) {
    return {
      exitCode: Number.isInteger(error?.code) ? error.code : null,
      signal: typeof error?.signal === "string" ? error.signal : null,
      timedOut: error?.code === "ETIMEDOUT",
      stdout: typeof error?.stdout === "string" ? error.stdout : "",
      stderr:
        typeof error?.stderr === "string"
          ? error.stderr
          : error instanceof Error
            ? error.message
            : String(error),
    };
  }
}

async function runCommandStrict(cmd, args, cwd, timeoutMs = 120_000) {
  const result = await runCommand(cmd, args, cwd, timeoutMs);
  if (result.exitCode !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed with exit=${String(result.exitCode)}\n${result.stderr}`,
    );
  }
  return result;
}

async function initProbeRepo(prefix) {
  const tempRoot = path.join(REPO_ROOT, ".agentplane", "tmp");
  await mkdir(tempRoot, { recursive: true });
  const root = await mkdtemp(path.join(tempRoot, prefix));
  await runCommandStrict("git", ["init", "-q"], root);
  await runCommandStrict("git", ["config", "user.email", "probe@example.com"], root);
  await runCommandStrict("git", ["config", "user.name", "probe"], root);
  await writeFile(path.join(root, "README.md"), "probe\n", "utf8");
  return root;
}

async function runCodexProbe(opts) {
  const workspace = await initProbeRepo(`codex-approval-${opts.mode}-${opts.action}-`);
  const targetPath = path.join(workspace, opts.targetName);
  await (opts.action === "write_probe"
    ? rm(targetPath, { force: true })
    : writeFile(targetPath, "probe\n", "utf8"));
  const prompt =
    opts.action === "write_probe"
      ? `Create file ${opts.targetName} with exact text PROBE_OK and then stop.`
      : `Delete ${opts.targetName} and then stop.`;
  const result = await runCommand(
    "codex",
    [
      "-a",
      opts.mode,
      "exec",
      "-s",
      "workspace-write",
      "-C",
      workspace,
      "--json",
      "-o",
      path.join(workspace, "last.md"),
      prompt,
    ],
    workspace,
  );
  const targetExistsAfter = await readFile(targetPath, "utf8")
    .then(() => true)
    .catch(() => false);
  return {
    workspace,
    mode: opts.mode,
    action: opts.action,
    exit_code: result.exitCode,
    signal: result.signal,
    timed_out: result.timedOut,
    target_exists_after: targetExistsAfter,
    stdout_tail: result.stdout.trim().split(/\r?\n/u).filter(Boolean).slice(-8),
    stderr_tail: result.stderr.trim().split(/\r?\n/u).filter(Boolean).slice(-8),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const createdWorkspaces = new Set();
  const retained = new Set();
  const assessments = [];
  try {
    for (const mode of args.modes) {
      const writeProbe = await runCodexProbe({
        mode,
        action: "write_probe",
        targetName: "probe.txt",
      });
      const deleteProbe = await runCodexProbe({
        mode,
        action: "delete_probe",
        targetName: "README.md",
      });
      createdWorkspaces.add(writeProbe.workspace);
      createdWorkspaces.add(deleteProbe.workspace);
      if (args.keepWorkspace) {
        retained.add(writeProbe.workspace);
        retained.add(deleteProbe.workspace);
      }
      assessments.push(
        assessCodexApprovalMode({
          mode,
          write_probe: {
            mode,
            action: "write_probe",
            exit_code: writeProbe.exit_code,
            timed_out: writeProbe.timed_out,
            target_exists_after: writeProbe.target_exists_after,
          },
          delete_probe: {
            mode,
            action: "delete_probe",
            exit_code: deleteProbe.exit_code,
            timed_out: deleteProbe.timed_out,
            target_exists_after: deleteProbe.target_exists_after,
          },
        }),
      );
      console.log(
        JSON.stringify(
          {
            mode,
            assessment: assessments.at(-1),
            write_probe: writeProbe,
            delete_probe: deleteProbe,
          },
          null,
          2,
        ),
      );
    }
    process.exitCode = 0;
  } finally {
    if (!args.keepWorkspace) {
      for (const workspace of createdWorkspaces) {
        if (retained.has(workspace)) continue;
        await rm(workspace, { recursive: true, force: true });
      }
    }
  }
}

try {
  await main();
} catch (error) {
  usage();
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
