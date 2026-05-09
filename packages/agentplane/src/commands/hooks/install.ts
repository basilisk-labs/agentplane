import { chmod, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  renderHookShimScript,
  resolveInstalledHookRunnerPath,
} from "../shared/hook-shim-template.js";
import {
  fileIsManaged,
  HOOK_MARKER,
  HOOK_NAMES,
  type HookName,
  resolveGitHooksDir,
  SHIM_MARKER,
} from "./shared.js";

function hookScriptText(hook: HookName): string {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_MARKER} (do not edit)`,
    "set -e",
    'REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"',
    'SHIM="$REPO_ROOT/.agentplane/bin/agentplane"',
    'if [ -x "$SHIM" ]; then',
    '  exec "$SHIM" hooks run ' + hook + ' "$@"',
    "fi",
    'echo "agentplane hooks: local shim not found or not executable: $SHIM" >&2',
    'echo "Run agentplane hooks install or agentplane init to restore repository-scoped hooks." >&2',
    "exit 127",
    "",
  ].join("\n");
}

export async function collectHooksInstallConflicts(opts: {
  gitRoot: string;
  agentplaneDir: string;
}): Promise<string[]> {
  const hooksDir = await resolveGitHooksDir(opts.gitRoot);
  const conflicts: string[] = [];
  const shimPath = path.join(opts.agentplaneDir, "bin", "agentplane");
  if (await fileExists(shimPath)) {
    const managed = await fileIsManaged(shimPath, SHIM_MARKER);
    if (!managed) conflicts.push(shimPath);
  }

  for (const hook of HOOK_NAMES) {
    const hookPath = path.join(hooksDir, hook);
    if (!(await fileExists(hookPath))) continue;
    const managed = await fileIsManaged(hookPath, HOOK_MARKER);
    if (!managed) conflicts.push(hookPath);
  }

  return conflicts;
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
  await writeFile(shimPath, renderHookShimScript(resolveInstalledHookRunnerPath()), "utf8");
  await chmod(shimPath, 0o755);
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
