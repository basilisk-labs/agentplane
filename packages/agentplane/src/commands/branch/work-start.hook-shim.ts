import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";

const HOOK_SHIM_MARKER = "agentplane-hook-shim";

function repoLocalHookShimText(): string {
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
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  exec node "$ENV_BIN" "$@"',
    "fi",
    "if command -v agentplane >/dev/null 2>&1; then",
    '  exec agentplane "$@"',
    "fi",
    "if command -v npx >/dev/null 2>&1; then",
    '  exec npx --yes agentplane "$@"',
    "fi",
    'echo "agentplane shim: runner not found (need env runner, repo-local source, agentplane in PATH, or node+npx)." >&2',
    "  exit 127",
    "",
  ].join("\n");
}

export async function materializeHookShimForWorktree(worktreePath: string): Promise<void> {
  const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
  if (await fileExists(shimPath)) return;

  await mkdir(path.dirname(shimPath), { recursive: true });
  await writeFile(shimPath, repoLocalHookShimText(), "utf8");
  await chmod(shimPath, 0o755);
}
