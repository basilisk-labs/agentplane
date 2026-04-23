import { chmod, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
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
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane hooks: runner not found (PATH missing and shim unavailable)." >&2',
    "  exit 127",
    "fi",
    "exec agentplane hooks run " + hook + ' "$@"',
    "",
  ].join("\n");
}

function shellSingleQuote(value: string): string {
  return `'${value.replaceAll("'", String.raw`'\''`)}'`;
}

function resolveInstalledHookRunnerPath(): string {
  const activeBin = String(process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN ?? "").trim();
  return activeBin || resolveAgentplaneBinPath();
}

function shimScriptText(installedRunnerPath: string): string {
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
    `INSTALL_BIN=${shellSingleQuote(installedRunnerPath)}`,
    'if command -v node >/dev/null 2>&1 && [ -f "$INSTALL_BIN" ]; then',
    '  exec node "$INSTALL_BIN" "$@"',
    "fi",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  exec node "$ENV_BIN" "$@"',
    "fi",
    "if command -v agentplane >/dev/null 2>&1; then",
    '  exec agentplane "$@"',
    "fi",
    'if [ "${AGENTPLANE_HOOK_ALLOW_NPX:-}" = "1" ] && command -v npx >/dev/null 2>&1; then',
    '  exec npx --yes agentplane "$@"',
    "fi",
    'echo "agentplane shim: runner not found (need installed runner, env runner, repo-local source, agentplane in PATH, or AGENTPLANE_HOOK_ALLOW_NPX=1)." >&2',
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
  await writeFile(shimPath, shimScriptText(resolveInstalledHookRunnerPath()), "utf8");
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
