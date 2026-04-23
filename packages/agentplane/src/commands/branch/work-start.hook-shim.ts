import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";
import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";

const HOOK_SHIM_MARKER = "agentplane-hook-shim";

function shellSingleQuote(value: string): string {
  return `'${value.replaceAll("'", String.raw`'\''`)}'`;
}

function resolveInstalledHookRunnerPath(): string {
  const activeBin = String(process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN ?? "").trim();
  return activeBin || resolveAgentplaneBinPath();
}

function repoLocalHookShimText(installedRunnerPath: string): string {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_SHIM_MARKER} (do not edit)`,
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

export async function materializeHookShimForWorktree(worktreePath: string): Promise<void> {
  const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
  if (await fileExists(shimPath)) return;

  await mkdir(path.dirname(shimPath), { recursive: true });
  await writeFile(shimPath, repoLocalHookShimText(resolveInstalledHookRunnerPath()), "utf8");
  await chmod(shimPath, 0o755);
}
