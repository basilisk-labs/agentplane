import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  getStagedFiles,
  loadConfig,
  resolveBaseBranch,
  resolveProject,
  validateCommitSubject,
} from "@agentplaneorg/core";

import { loadTaskBackend } from "../../backends/task-backend.js";
import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  getProtectedPathOverride,
  protectedPathKindForFile,
} from "../../shared/protected-paths.js";
import { gitCurrentBranch, gitRevParse } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";

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
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane hooks: agentplane not found in PATH" >&2',
    "  exit 1",
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
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane shim: agentplane not found in PATH" >&2',
    "  exit 1",
    "fi",
    'exec agentplane "$@"',
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

function findMatchingTaskId(opts: { subject: string; tasks: { id: string }[] }): string | null {
  const lowered = opts.subject.toLowerCase();
  for (const task of opts.tasks) {
    const suffix = task.id.split("-").at(-1) ?? "";
    if (suffix && lowered.includes(suffix.toLowerCase())) return task.id;
  }
  return null;
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
      if (!subject) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "Commit message subject is empty",
        });
      }

      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const loaded = await loadConfig(resolved.agentplaneDir);

      const taskId = (process.env.AGENTPLANE_TASK_ID ?? "").trim();
      if (taskId) {
        const policy = validateCommitSubject({
          subject,
          taskId,
          genericTokens: loaded.config.commit.generic_tokens,
        });
        if (!policy.ok) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: policy.errors.join("\n"),
          });
        }
        return 0;
      }

      const { backend } = await loadTaskBackend({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const tasks = await backend.listTasks();
      if (tasks.length === 0) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "No task IDs available to validate commit subject",
        });
      }

      const matchedTaskId = findMatchingTaskId({ subject, tasks });
      if (!matchedTaskId) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "Commit subject must mention a task suffix",
        });
      }

      const policy = validateCommitSubject({
        subject,
        taskId: matchedTaskId,
        genericTokens: loaded.config.commit.generic_tokens,
      });
      if (!policy.ok) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: policy.errors.join("\n"),
        });
      }
      return 0;
    }

    if (opts.hook === "pre-commit") {
      const staged = await getStagedFiles({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      if (staged.length === 0) return 0;
      const allowTasks = (process.env.AGENTPLANE_ALLOW_TASKS ?? "").trim() === "1";
      const allowBase = (process.env.AGENTPLANE_ALLOW_BASE ?? "").trim() === "1";
      const allowPolicy = (process.env.AGENTPLANE_ALLOW_POLICY ?? "").trim() === "1";
      const allowConfig = (process.env.AGENTPLANE_ALLOW_CONFIG ?? "").trim() === "1";
      const allowHooks = (process.env.AGENTPLANE_ALLOW_HOOKS ?? "").trim() === "1";
      const allowCI = (process.env.AGENTPLANE_ALLOW_CI ?? "").trim() === "1";

      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const loaded = await loadConfig(resolved.agentplaneDir);
      const tasksPath = loaded.config.paths.tasks_path;
      const tasksStaged = staged.includes(tasksPath);
      const nonTasks = staged.filter((entry: string) => entry !== tasksPath);

      if (tasksStaged && !allowTasks) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `${tasksPath} is protected by agentplane hooks (set AGENTPLANE_ALLOW_TASKS=1 to override)`,
        });
      }

      for (const filePath of staged) {
        const kind = protectedPathKindForFile({ filePath, tasksPath });
        if (!kind || kind === "tasks") continue;
        const override = getProtectedPathOverride(kind);
        const allowed =
          (kind === "policy" && allowPolicy) ||
          (kind === "config" && allowConfig) ||
          (kind === "hooks" && allowHooks) ||
          (kind === "ci" && allowCI);
        if (!allowed) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `${filePath} is protected by agentplane hooks (set ${override.envVar}=1 to override)`,
          });
        }
      }

      if (loaded.config.workflow_mode === "branch_pr") {
        const baseBranch = await resolveBaseBranch({
          cwd: opts.cwd,
          rootOverride: opts.rootOverride ?? null,
          cliBaseOpt: null,
          mode: loaded.config.workflow_mode,
        });
        if (!baseBranch) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Base branch could not be resolved (use `agentplane branch base set`).",
          });
        }
        const currentBranch = await gitCurrentBranch(resolved.gitRoot);
        if (tasksStaged && currentBranch !== baseBranch) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `${tasksPath} commits are allowed only on ${baseBranch} in branch_pr mode`,
          });
        }
        if (nonTasks.length > 0 && currentBranch === baseBranch && !allowBase) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Code commits are forbidden on ${baseBranch} in branch_pr mode`,
          });
        }
      }
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
