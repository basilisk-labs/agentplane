import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type {
  RUNNER_READ_ONLY_SANDBOX,
  RunnerAdapterCapabilities,
  RunnerContextBundle,
  RunnerInvocation,
  RunnerSandboxAuthority,
} from "../types.js";
import { RUNNER_WORKSPACE_WRITE_SANDBOX } from "../types.js";
import {
  hasExplicitRunnerDangerFullAccessAuthority,
  resolveRunnerSandboxPolicy,
} from "../sandbox-policy.js";
import {
  CODEX_RESULT_TRANSPORT,
  CODEX_RESULT_TRANSPORT_ENV,
  resolveCodexResultTransportPaths,
} from "./codex-result-transport.js";
import { buildRecipeRunnerEnv } from "./recipe-run-profile.js";

const CODEX_SANDBOX_VALUES = new Set(["read-only", "workspace-write", "danger-full-access"]);
const SUPPORTED_CODEX_SANDBOXES = [...CODEX_SANDBOX_VALUES];
const CODEX_DANGER_SANDBOX = SUPPORTED_CODEX_SANDBOXES[2]!;

export function codexInvocationHasExactFilesystemEffectSandbox(
  invocation: RunnerInvocation,
  sandbox: typeof RUNNER_READ_ONLY_SANDBOX,
): boolean {
  if (!invocation.output_schema_path) return false;
  const expectedArgv = [
    "codex",
    "-a",
    "never",
    "exec",
    "--ignore-user-config",
    "--strict-config",
    "--disable",
    "hooks",
    "--ephemeral",
    "--json",
    "-C",
    invocation.repository_root,
    "-s",
    sandbox,
    "--output-schema",
    invocation.output_schema_path,
    "-",
  ];
  return (
    invocation.argv.length === expectedArgv.length &&
    invocation.argv.every((arg, index) => arg === expectedArgv[index])
  );
}

export const CODEX_RUN_PROFILE_CAPABILITIES: RunnerAdapterCapabilities = {
  adapter_id: "codex",
  fields: {
    sandbox: {
      level: "native",
      channel: "argv",
      supported_values: SUPPORTED_CODEX_SANDBOXES,
      note:
        "Recipe sandbox is enforced through codex --sandbox argv mapping; workspace-write " +
        "also ignores mutable user config and excludes TMPDIR and /tmp from default writable " +
        "roots via strict config. Supervised invocations disable hooks and session persistence " +
        "and derive the final agent message from supervisor-captured JSONL stdout. " +
        "Provider-wide filesystem-effect containment remains unverified because managed Codex " +
        "policy can override feature flags and descendant lifetime is not bounded.",
    },
    writes_artifacts_to: {
      level: "advisory",
      channel: "env",
      note: "Recipe artifact prefixes are exported through env and enforced post-run against external manifest artifacts and evidence paths.",
    },
  },
};

function resolveCodexSandbox(value: unknown, authority: RunnerSandboxAuthority): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) return RUNNER_WORKSPACE_WRITE_SANDBOX;
  if (normalized === CODEX_DANGER_SANDBOX) {
    if (!hasExplicitRunnerDangerFullAccessAuthority(authority)) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: "Codex danger-full-access sandbox requires explicit operator authority.",
        context: {
          adapter_id: "codex",
          policy_field: "sandbox",
          declared_value: normalized,
          required_authority: "danger_full_access_authorized",
        },
      });
    }
    return normalized;
  }
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
  const sandboxPolicy =
    execution.sandbox_policy ??
    resolveRunnerSandboxPolicy({
      task: opts.bundle.task?.data,
      recipe: opts.bundle.recipe,
    });
  const sandbox = resolveCodexSandbox(sandboxPolicy.requested, sandboxPolicy.authority);
  const recipeEnv = buildRecipeRunnerEnv(opts.bundle.recipe, opts.bundle.task?.task_id);
  const workspaceWrite = sandbox === RUNNER_WORKSPACE_WRITE_SANDBOX;
  const resultTransportPaths = resolveCodexResultTransportPaths(execution.artifact_paths.run_dir);
  return {
    adapter_id: opts.adapterId,
    run_id: execution.run_id,
    work_order_id: execution.run_id,
    repository_root: opts.bundle.repository.git_root,
    artifact_root: execution.artifact_paths.artifact_root ?? opts.bundle.repository.git_root,
    run_dir: execution.artifact_paths.run_dir,
    bundle_path: execution.artifact_paths.bundle_path,
    state_path: execution.artifact_paths.state_path,
    events_path: execution.artifact_paths.events_path,
    result_path: execution.artifact_paths.result_path,
    receipt_path: execution.artifact_paths.receipt_path,
    trace_path: execution.artifact_paths.trace_path,
    stderr_path: execution.artifact_paths.stderr_path,
    trace_policy: execution.trace_policy,
    timeout_policy: execution.timeout_policy,
    bootstrap_path: execution.artifact_paths.bootstrap_path,
    output_last_message_path: null,
    output_schema_path: resultTransportPaths.schema_path,
    filesystem_effect_containment: null,
    argv: [
      "codex",
      "-a",
      "never",
      "exec",
      "--ignore-user-config",
      "--strict-config",
      "--disable",
      "hooks",
      "--ephemeral",
      ...(workspaceWrite
        ? [
            "-c",
            "sandbox_workspace_write.exclude_tmpdir_env_var=true",
            "-c",
            "sandbox_workspace_write.exclude_slash_tmp=true",
          ]
        : []),
      "--json",
      "-C",
      opts.bundle.repository.git_root,
      "-s",
      sandbox,
      "--output-schema",
      resultTransportPaths.schema_path,
      "-",
    ],
    env: {
      AGENTPLANE_RUNNER_ADAPTER: opts.adapterId,
      AGENTPLANE_RUNNER_MODE: execution.mode,
      AGENTPLANE_RUNNER_API_VERSION: opts.bundle.runner_api_version,
      AGENTPLANE_RUNNER_TARGET: opts.bundle.target.kind,
      [CODEX_RESULT_TRANSPORT_ENV]: CODEX_RESULT_TRANSPORT,
      ...recipeEnv,
    },
    dry_run: execution.mode === "dry_run",
  };
}
