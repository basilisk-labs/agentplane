import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { CliError } from "../../shared/errors.js";
import { resolveLocalExecutable } from "../../shared/runtime-env.js";

function commandAvailable(command: string, cwd: string): boolean {
  const env = {
    ...process.env,
    PATH: (process.env.PATH ?? "")
      .split(path.delimiter)
      .map((entry) => path.resolve(cwd, entry))
      .join(path.delimiter),
  };
  return resolveLocalExecutable(command, env) !== null;
}

export const HOOK_SHIM_MARKER = "agentplane-hook-shim";

function shellSingleQuote(value: string): string {
  return `'${value.replaceAll("'", String.raw`'\''`)}'`;
}

export function resolveInstalledHookRunnerPath(): string {
  const activeBin = String(process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN ?? "").trim();
  return activeBin || resolveAgentplaneBinPath();
}

export async function assertHookRunnerReady(repoRoot: string): Promise<void> {
  const shim = await readFile(path.join(repoRoot, ".agentplane/bin/agentplane"), "utf8").catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return "";
      throw error;
    },
  );
  if (!shim.includes(HOOK_SHIM_MARKER)) return;
  const installed = /\nINSTALL_BIN='((?:'\\''|[^'])*)'/
    .exec(shim)?.[1]
    ?.replaceAll(String.raw`'\''`, "'");
  const candidates = [
    process.env.AGENTPLANE_HOOK_RUNNER,
    path.join(repoRoot, "packages/agentplane/bin/agentplane.js"),
    installed,
    ...(shim.includes('ACTIVE_BIN="${AGENTPLANE_RUNTIME_ACTIVE_BIN:-}"')
      ? [process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN]
      : []),
  ];
  if (commandAvailable("node", repoRoot)) {
    for (const candidate of candidates) {
      if (candidate && (await stat(path.resolve(repoRoot, candidate)).catch(() => null))?.isFile())
        return;
    }
  }
  if (process.env.AGENTPLANE_HOOK_ALLOW_GLOBAL === "1" && commandAvailable("agentplane", repoRoot))
    return;
  throw new CliError({
    code: "E_VALIDATION",
    message:
      "Managed hook runner is unavailable. Run agentplane hooks install from the active CLI in this checkout, then retry. Hooks must remain enabled.",
    context: {
      reason_code: "hook_runner_unavailable",
      installed_runner: installed ?? null,
      recovery_argv: ["agentplane", "hooks", "install", "--root", repoRoot],
      recovery_cwd: repoRoot,
    },
  });
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
    "  exec 3<&0",
    '  "$@" <&3 &',
    "  child_pid=$!",
    '  timeout_marker="${TMPDIR:-/tmp}/agentplane-hook-timeout.$$.$child_pid"',
    '  rm -f "$timeout_marker"',
    "  (",
    "    elapsed=0",
    '    while [ "$elapsed" -lt "$timeout_seconds" ]; do',
    "      sleep 1",
    "      elapsed=$((elapsed + 1))",
    '      kill -0 "$child_pid" >/dev/null 2>&1 || exit 0',
    "    done",
    '    if kill -0 "$child_pid" >/dev/null 2>&1; then',
    '      echo "agentplane shim: $label timed out after ${timeout_seconds}s while running: $*" >&2',
    '      echo "agentplane shim: reason_code=hook_shim_timeout" >&2',
    '      echo "agentplane shim: next_action=run agentplane doctor, inspect active git hook processes, then retry with hooks enabled." >&2',
    '      : > "$timeout_marker"',
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
    "  exec 3<&-",
    '  if [ -f "$timeout_marker" ]; then',
    '    rm -f "$timeout_marker"',
    "    return 1",
    "  fi",
    '  rm -f "$timeout_marker"',
    '  if [ "$status" -gt 128 ]; then',
    "    signal_number=$((status - 128))",
    '    echo "agentplane shim: $label terminated by signal ${signal_number} while running: $*" >&2',
    '    echo "agentplane shim: reason_code=hook_runner_signal" >&2',
    '    echo "agentplane shim: next_action=run agentplane doctor, repair the runner, then retry with hooks enabled." >&2',
    "    return 1",
    "  fi",
    '  return "$status"',
    "}",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  run_agentplane "AGENTPLANE_HOOK_RUNNER" node "$ENV_BIN" "$@"',
    "  exit $?",
    "fi",
    'if command -v node >/dev/null 2>&1 && [ -f "$LOCAL_BIN" ]; then',
    '  run_agentplane "local runner" node "$LOCAL_BIN" "$@"',
    "  exit $?",
    "fi",
    `INSTALL_BIN=${shellSingleQuote(installedRunnerPath)}`,
    'if command -v node >/dev/null 2>&1 && [ -f "$INSTALL_BIN" ]; then',
    '  run_agentplane "installed runner" node "$INSTALL_BIN" "$@"',
    "  exit $?",
    "fi",
    'ACTIVE_BIN="${AGENTPLANE_RUNTIME_ACTIVE_BIN:-}"',
    'if [ -n "$ACTIVE_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ACTIVE_BIN" ]; then',
    '  run_agentplane "active runner" node "$ACTIVE_BIN" "$@"',
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
    'echo "agentplane shim: no explicit, repository-local, installed, active, or opted-in global runner was available." >&2',
    "  exit 127",
    "",
  ].join("\n");
}
