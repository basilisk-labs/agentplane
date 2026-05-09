import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";

export const HOOK_SHIM_MARKER = "agentplane-hook-shim";

function shellSingleQuote(value: string): string {
  return `'${value.replaceAll("'", String.raw`'\''`)}'`;
}

export function resolveInstalledHookRunnerPath(): string {
  const activeBin = String(process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN ?? "").trim();
  return activeBin || resolveAgentplaneBinPath();
}

export function renderHookShimScript(installedRunnerPath: string): string {
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
    'if [ -n "${AGENTPLANE_HOOK_ALLOW_GLOBAL+x}" ] && [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL}" != "1" ]; then',
    '  echo "agentplane shim: local runner not found; AGENTPLANE_HOOK_ALLOW_GLOBAL=1 to opt-in global runner." >&2',
    "  exit 127",
    "fi",
    'if [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL:-}" = "1" ] && command -v agentplane >/dev/null 2>&1; then',
    '  exec agentplane "$@"',
    "fi",
    'echo "agentplane shim: local runner not found (packages/agentplane/bin/agentplane.js or AGENTPLANE_HOOK_RUNNER) and no global fallback enabled." >&2',
    "  exit 127",
    "",
  ].join("\n");
}
