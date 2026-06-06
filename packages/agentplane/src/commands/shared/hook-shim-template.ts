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
    "run_agentplane() {",
    '  label="$1"',
    "  shift",
    '  timeout_seconds="${AGENTPLANE_HOOK_SHIM_TIMEOUT_SECONDS:-600}"',
    '  case "$timeout_seconds" in',
    '    ""|*[!0-9]*) timeout_seconds=600 ;;',
    "  esac",
    '  "$@" &',
    "  child_pid=$!",
    "  (",
    '    sleep "$timeout_seconds"',
    '    if kill -0 "$child_pid" >/dev/null 2>&1; then',
    '      echo "agentplane shim: $label timed out after ${timeout_seconds}s while running: $*" >&2',
    '      echo "agentplane shim: reason_code=hook_shim_timeout" >&2',
    '      echo "agentplane shim: next_action=run agentplane doctor, inspect active git hook processes, then retry the hook or use --no-verify only after direct validation passed." >&2',
    '      kill "$child_pid" >/dev/null 2>&1 || true',
    "      sleep 2",
    '      kill -KILL "$child_pid" >/dev/null 2>&1 || true',
    "    fi",
    "  ) &",
    "  watchdog_pid=$!",
    "  set +e",
    '  wait "$child_pid"',
    "  status=$?",
    "  set -e",
    '  kill "$watchdog_pid" >/dev/null 2>&1 || true',
    '  wait "$watchdog_pid" >/dev/null 2>&1 || true',
    '  return "$status"',
    "}",
    'if command -v node >/dev/null 2>&1 && [ -f "$LOCAL_BIN" ]; then',
    '  run_agentplane "local runner" node "$LOCAL_BIN" "$@"',
    "  exit $?",
    "fi",
    `INSTALL_BIN=${shellSingleQuote(installedRunnerPath)}`,
    'if command -v node >/dev/null 2>&1 && [ -f "$INSTALL_BIN" ]; then',
    '  run_agentplane "installed runner" node "$INSTALL_BIN" "$@"',
    "  exit $?",
    "fi",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  run_agentplane "AGENTPLANE_HOOK_RUNNER" node "$ENV_BIN" "$@"',
    "  exit $?",
    "fi",
    'if [ -n "${AGENTPLANE_HOOK_ALLOW_GLOBAL+x}" ] && [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL}" != "1" ]; then',
    '  echo "agentplane shim: local runner not found; AGENTPLANE_HOOK_ALLOW_GLOBAL=1 to opt-in global runner." >&2',
    "  exit 127",
    "fi",
    'if [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL:-}" = "1" ] && command -v agentplane >/dev/null 2>&1; then',
    '  run_agentplane "global runner" agentplane "$@"',
    "  exit $?",
    "fi",
    'echo "agentplane shim: local runner not found (packages/agentplane/bin/agentplane.js or AGENTPLANE_HOOK_RUNNER) and no global fallback enabled." >&2',
    "  exit 127",
    "",
  ].join("\n");
}
