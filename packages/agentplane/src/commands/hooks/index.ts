import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig, resolveBaseBranch, resolveProject } from "@agentplaneorg/core";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { resolveCommitEmojiForAgent } from "../../shared/agent-emoji.js";
import { CliError } from "../../shared/errors.js";
import { GitContext } from "../shared/git-context.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import { gitCurrentBranch, gitRevParse } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";
import { readDirectWorkLock } from "../../shared/direct-work-lock.js";

const HOOK_MARKER = "agentplane-hook";
const SHIM_MARKER = "agentplane-hook-shim";
export const HOOK_NAMES = ["commit-msg", "pre-commit", "pre-push"] as const;

async function resolveGitHooksDir(cwd: string): Promise<string> {
  const repoRoot = await gitRevParse(cwd, ["--show-toplevel"]);
  const commonDirRaw = await gitRevParse(cwd, ["--git-common-dir"]);
  const hooksRaw = await gitRevParse(cwd, ["--git-path", "hooks"]);
  const commonDir = path.resolve(
    path.isAbsolute(commonDirRaw) ? commonDirRaw : path.join(repoRoot, commonDirRaw),
  );
  const hooksDir = path.resolve(
    path.isAbsolute(hooksRaw) ? hooksRaw : path.join(repoRoot, hooksRaw),
  );
  const resolvedRoot = path.resolve(repoRoot);

  if (!isPathWithin(resolvedRoot, hooksDir) && !isPathWithin(commonDir, hooksDir)) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: [
        "Refusing to manage git hooks outside the repository.",
        `hooks_path=${hooksDir}`,
        `repo_root=${resolvedRoot}`,
        `common_dir=${commonDir}`,
        "Fix:",
        "  1) Use a repo-relative core.hooksPath (e.g., .git/hooks)",
        "  2) Re-run `agentplane hooks install`",
      ].join("\n"),
    });
  }
  return hooksDir;
}

async function fileIsManaged(filePath: string, marker: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf8");
    return content.includes(marker);
  } catch {
    return false;
  }
}

function hookScriptText(hook: (typeof HOOK_NAMES)[number]): string {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_MARKER} (do not edit)`,
    "set -e",
    'REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"',
    'SHIM="$REPO_ROOT/.agentplane/bin/agentplane"',
    'if [ -x "$SHIM" ]; then',
    '  exec "$SHIM" hooks run ' + hook + ' "$@"',
    "fi",
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane hooks: runner not found (PATH missing and shim unavailable)." >&2',
    "  exit 127",
    "fi",
    "exec agentplane hooks run " + hook + ' "$@"',
    "",
  ].join("\n");
}

function shimScriptText(): string {
  return [
    "#!/usr/bin/env sh",
    `# ${SHIM_MARKER} (do not edit)`,
    "set -e",
    'SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"',
    'REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"',
    'LOCAL_BIN="$REPO_ROOT/packages/agentplane/bin/agentplane.js"',
    'if command -v node >/dev/null 2>&1 && [ -f "$LOCAL_BIN" ]; then',
    '  exec node "$LOCAL_BIN" "$@"',
    "fi",
    "if command -v npx >/dev/null 2>&1; then",
    '  exec npx --yes agentplane "$@"',
    "fi",
    "if command -v agentplane >/dev/null 2>&1; then",
    '  exec agentplane "$@"',
    "fi",
    'echo "agentplane shim: runner not found (need node+npx or agentplane in PATH)." >&2',
    "  exit 127",
    "",
  ].join("\n");
}

async function ensureShim(agentplaneDir: string, gitRoot: string): Promise<void> {
  const shimDir = path.join(agentplaneDir, "bin");
  const shimPath = path.join(shimDir, "agentplane");
  await mkdir(shimDir, { recursive: true });
  if (await fileExists(shimPath)) {
    const managed = await fileIsManaged(shimPath, SHIM_MARKER);
    if (!managed) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Refusing to overwrite existing shim: ${path.relative(gitRoot, shimPath)}`,
      });
    }
  }
  await writeFile(shimPath, shimScriptText(), "utf8");
  await chmod(shimPath, 0o755);
}

function readCommitSubject(message: string): string {
  for (const line of message.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

export async function cmdHooksInstall(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const hooksDir = await resolveGitHooksDir(resolved.gitRoot);
    await mkdir(hooksDir, { recursive: true });
    await mkdir(resolved.agentplaneDir, { recursive: true });
    await ensureShim(resolved.agentplaneDir, resolved.gitRoot);

    for (const hook of HOOK_NAMES) {
      const hookPath = path.join(hooksDir, hook);
      if (await fileExists(hookPath)) {
        const managed = await fileIsManaged(hookPath, HOOK_MARKER);
        if (!managed) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Refusing to overwrite existing hook: ${path.relative(resolved.gitRoot, hookPath)}`,
          });
        }
      }
      await writeFile(hookPath, hookScriptText(hook), "utf8");
      await chmod(hookPath, 0o755);
    }

    if (!opts.quiet) {
      process.stdout.write(`${path.relative(resolved.gitRoot, hooksDir)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "hooks install", root: opts.rootOverride ?? null });
  }
}

export async function cmdHooksUninstall(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const hooksDir = await resolveGitHooksDir(resolved.gitRoot);
    let removed = 0;
    for (const hook of HOOK_NAMES) {
      const hookPath = path.join(hooksDir, hook);
      if (!(await fileExists(hookPath))) continue;
      const managed = await fileIsManaged(hookPath, HOOK_MARKER);
      if (!managed) continue;
      await rm(hookPath, { force: true });
      removed++;
    }
    if (!opts.quiet) {
      process.stdout.write(
        removed > 0
          ? `${successMessage("removed hooks", undefined, `count=${removed}`)}\n`
          : `${infoMessage("no agentplane hooks found")}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "hooks uninstall", root: opts.rootOverride ?? null });
  }
}

export async function cmdHooksRun(opts: {
  cwd: string;
  rootOverride?: string;
  hook: (typeof HOOK_NAMES)[number];
  args: string[];
}): Promise<number> {
  try {
    if (opts.hook === "commit-msg") {
      const messagePath = opts.args[0];
      if (!messagePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Missing commit message file path",
        });
      }
      const raw = await readFile(messagePath, "utf8");
      const subject = readCommitSubject(raw);

      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const loaded = await loadConfig(resolved.agentplaneDir);

      const taskId = (process.env.AGENTPLANE_TASK_ID ?? "").trim();
      const statusTo = (process.env.AGENTPLANE_STATUS_TO ?? "").trim().toUpperCase();
      const agentsDirAbs = path.join(resolved.gitRoot, loaded.config.paths.agents_dir);
      let agentId = (process.env.AGENTPLANE_AGENT_ID ?? "").trim();
      if (!agentId && loaded.config.workflow_mode === "direct" && taskId) {
        const lock = await readDirectWorkLock(resolved.agentplaneDir);
        const lockAgent = lock?.agent?.trim() ?? "";
        if (lock?.task_id === taskId && lockAgent) agentId = lockAgent;
      }

      const emoji = subject.split(/\s+/).find(Boolean) ?? "";
      if (taskId) {
        if (statusTo === "DONE") {
          if (emoji !== "✅") {
            throw new CliError({
              exitCode: 5,
              code: "E_GIT",
              message:
                "Finish commits must use a checkmark emoji.\n" +
                "Expected:\n" +
                "  ✅ <TASK_SUFFIX> <scope>: <summary>",
            });
          }
        } else if (agentId) {
          const expectedEmoji = await resolveCommitEmojiForAgent({ agentsDirAbs, agentId });
          if (emoji !== expectedEmoji) {
            throw new CliError({
              exitCode: 5,
              code: "E_GIT",
              message:
                "Commit emoji does not match the executor agent policy.\n" +
                `executor_agent=${agentId}\n` +
                "Expected:\n" +
                `  ${expectedEmoji} <TASK_SUFFIX> <scope>: <summary>`,
            });
          }
        }
      }

      const res = evaluatePolicy({
        action: "hook_commit_msg",
        config: loaded.config,
        taskId,
        git: { stagedPaths: [] },
        commit: { subject },
      });
      throwIfPolicyDenied(res);
      return 0;
    }

    if (opts.hook === "pre-commit") {
      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const staged = await new GitContext({ gitRoot: resolved.gitRoot }).statusStagedPaths();
      if (staged.length === 0) return 0;
      const allowTasks = (process.env.AGENTPLANE_ALLOW_TASKS ?? "").trim() === "1";
      const allowBase = (process.env.AGENTPLANE_ALLOW_BASE ?? "").trim() === "1";
      const allowPolicy = (process.env.AGENTPLANE_ALLOW_POLICY ?? "").trim() === "1";
      const allowConfig = (process.env.AGENTPLANE_ALLOW_CONFIG ?? "").trim() === "1";
      const allowHooks = (process.env.AGENTPLANE_ALLOW_HOOKS ?? "").trim() === "1";
      const allowCI = (process.env.AGENTPLANE_ALLOW_CI ?? "").trim() === "1";

      const loaded = await loadConfig(resolved.agentplaneDir);
      const inBranchPr = loaded.config.workflow_mode === "branch_pr";
      const baseBranch = inBranchPr
        ? await resolveBaseBranch({
            cwd: opts.cwd,
            rootOverride: opts.rootOverride ?? null,
            cliBaseOpt: null,
            mode: loaded.config.workflow_mode,
          })
        : null;
      const currentBranch = inBranchPr ? await gitCurrentBranch(resolved.gitRoot) : undefined;

      const res = evaluatePolicy({
        action: "hook_pre_commit",
        config: loaded.config,
        taskId: (process.env.AGENTPLANE_TASK_ID ?? "").trim(),
        git: {
          stagedPaths: staged,
          currentBranch,
          baseBranch,
        },
        allow: {
          allowTasks,
          allowBase,
          allowPolicy,
          allowConfig,
          allowHooks,
          allowCI,
        },
      });
      throwIfPolicyDenied(res);
      return 0;
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: `hooks run ${opts.hook}`,
      root: opts.rootOverride ?? null,
    });
  }
}
