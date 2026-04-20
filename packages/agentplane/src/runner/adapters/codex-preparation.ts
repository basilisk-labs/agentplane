import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation } from "../types.js";
import { buildRecipeRunnerEnv, readRecipeRunProfile } from "./recipe-run-profile.js";

const CODEX_LAST_MESSAGE_FILENAME = "codex-last-message.md";
const CODEX_SANDBOX_VALUES = new Set(["read-only", "workspace-write", "danger-full-access"]);
const SUPPORTED_CODEX_SANDBOXES = [...CODEX_SANDBOX_VALUES];

export const CODEX_RUN_PROFILE_CAPABILITIES: RunnerAdapterCapabilities = {
  adapter_id: "codex",
  fields: {
    sandbox: {
      level: "native",
      channel: "argv",
      supported_values: SUPPORTED_CODEX_SANDBOXES,
      note: "Recipe sandbox is enforced through codex --sandbox argv mapping.",
    },
    writes_artifacts_to: {
      level: "advisory",
      channel: "env",
      note: "Recipe artifact prefixes are exported through env and enforced post-run against external manifest artifacts and evidence paths.",
    },
  },
};

function resolveCodexSandbox(value: unknown): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) return "danger-full-access";
  if (CODEX_SANDBOX_VALUES.has(normalized)) return normalized;
  throw new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `Codex runner does not support recipe sandbox ${JSON.stringify(normalized)}; ` +
      `supported values: ${SUPPORTED_CODEX_SANDBOXES.join(", ")}.`,
    context: {
      adapter_id: "codex",
      requested_sandbox: normalized,
      supported_sandboxes: SUPPORTED_CODEX_SANDBOXES,
    },
  });
}

export function buildCodexInvocation(opts: {
  adapterId: "codex";
  bundle: RunnerContextBundle;
}): RunnerInvocation {
  const { execution } = opts.bundle;
  const runProfile = readRecipeRunProfile(opts.bundle.recipe);
  const sandbox = resolveCodexSandbox(runProfile?.sandbox);
  const recipeEnv = buildRecipeRunnerEnv(opts.bundle.recipe);
  const lastMessagePath = path.join(execution.artifact_paths.run_dir, CODEX_LAST_MESSAGE_FILENAME);
  return {
    adapter_id: opts.adapterId,
    run_id: execution.run_id,
    run_dir: execution.artifact_paths.run_dir,
    bundle_path: execution.artifact_paths.bundle_path,
    state_path: execution.artifact_paths.state_path,
    events_path: execution.artifact_paths.events_path,
    result_path: execution.artifact_paths.result_path,
    trace_path: execution.artifact_paths.trace_path,
    stderr_path: execution.artifact_paths.stderr_path,
    trace_policy: execution.trace_policy,
    timeout_policy: execution.timeout_policy,
    bootstrap_path: execution.artifact_paths.bootstrap_path,
    output_last_message_path: lastMessagePath,
    argv: [
      "codex",
      "-a",
      "never",
      "exec",
      "--json",
      "--output-last-message",
      lastMessagePath,
      "-C",
      opts.bundle.repository.git_root,
      "-s",
      sandbox,
      "-",
    ],
    env: {
      AGENTPLANE_RUNNER_ADAPTER: opts.adapterId,
      AGENTPLANE_RUNNER_MODE: execution.mode,
      AGENTPLANE_RUNNER_API_VERSION: opts.bundle.runner_api_version,
      AGENTPLANE_RUNNER_TARGET: opts.bundle.target.kind,
      AGENTPLANE_RUNNER_RESULT_PATH: execution.artifact_paths.result_path,
      ...recipeEnv,
    },
    dry_run: execution.mode === "dry_run",
  };
}
