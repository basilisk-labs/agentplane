import type { RunnerCustomConfig } from "@agentplaneorg/core/config";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation } from "../types.js";
import { RUNNER_DANGER_FULL_ACCESS_SANDBOX } from "../types.js";
import {
  hasExplicitRunnerDangerFullAccessAuthority,
  resolveRunnerSandboxPolicy,
} from "../sandbox-policy.js";
import { buildRecipeRunnerEnv } from "./recipe-run-profile.js";

export type CustomRunnerAdapterId = "custom" | "hermes";

function normalizeCustomEnforcement(config: RunnerCustomConfig | undefined): {
  mode: NonNullable<RunnerCustomConfig["enforcement"]>["mode"];
  platform: NonNullable<RunnerCustomConfig["enforcement"]>["platform"];
} {
  return {
    mode: config?.enforcement?.mode ?? "none",
    platform: config?.enforcement?.platform ?? "auto",
  };
}

export function buildCustomCapabilities(
  config: RunnerCustomConfig | undefined,
  adapterId: CustomRunnerAdapterId = "custom",
): RunnerAdapterCapabilities {
  const enforcement = normalizeCustomEnforcement(config);
  const configuredModeNote =
    `Configured via runner.custom.enforcement.mode=${JSON.stringify(enforcement.mode)} ` +
    `(platform=${JSON.stringify(enforcement.platform)}).`;
  return {
    adapter_id: adapterId,
    filesystem_effect_containment: {
      level: "advisory",
      supported_sandboxes: [],
      boundary: "workspace",
      descendant_inheritance: "not_enforced",
      lifetime_containment: "not_provided",
      note: "Custom and Hermes commands receive sandbox intent only; the adapter cannot attest inherited filesystem-effect containment.",
    },
    fields: {
      sandbox:
        enforcement.mode === "codex_sandbox_full_auto"
          ? {
              level: "unsupported",
              channel: "none",
              note:
                `${configuredModeNote} The legacy codex sandbox <platform> --full-auto wrapper ` +
                "is not a stable Codex CLI contract and is refused instead of claiming enforcement.",
            }
          : {
              level: "advisory",
              channel: "env",
              note:
                `${configuredModeNote} Custom runner receives sandbox intent through env only; ` +
                "the adapter does not enforce it.",
            },
      writes_artifacts_to: {
        level: "advisory",
        channel: "env",
        note: "Recipe artifact prefixes are exported through env and enforced post-run against external manifest artifacts and evidence paths.",
      },
    },
  };
}

function unsupportedCustomSandboxError(opts: {
  adapterId: CustomRunnerAdapterId;
  enforcementMode: string;
  requestedSandbox: string;
}): CliError {
  const baseContext = {
    adapter_id: opts.adapterId,
    wrapper_mode: opts.enforcementMode,
    policy_field: "sandbox",
    declared_value: opts.requestedSandbox,
    supported_values: [],
  } as const;
  return new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `${opts.adapterId === "hermes" ? "Hermes" : "Custom"} runner wrapper mode ${JSON.stringify(opts.enforcementMode)} cannot enforce requested sandbox ` +
      `${JSON.stringify(opts.requestedSandbox)} because its legacy Codex CLI argv contract is unavailable. ` +
      "Use the native Codex adapter or configure the custom adapter as advisory.",
    context: baseContext,
  });
}

function buildCustomCommand(opts: {
  adapterId: CustomRunnerAdapterId;
  config: RunnerCustomConfig | undefined;
  command: string[];
  requestedSandbox: string;
}): string[] {
  const enforcement = normalizeCustomEnforcement(opts.config);
  if (enforcement.mode !== "codex_sandbox_full_auto") return opts.command;

  throw unsupportedCustomSandboxError({
    adapterId: opts.adapterId,
    enforcementMode: enforcement.mode,
    requestedSandbox: opts.requestedSandbox,
  });
}

function normalizeCustomCommand(value: RunnerCustomConfig["command"] | undefined): string[] {
  return Array.isArray(value)
    ? value.map((entry) => entry.trim()).filter((entry) => entry.length > 0)
    : [];
}

export function buildCustomInvocation(opts: {
  adapterId: CustomRunnerAdapterId;
  config: RunnerCustomConfig | undefined;
  bundle: RunnerContextBundle;
}): RunnerInvocation {
  const command = normalizeCustomCommand(opts.config?.command);
  if (command.length === 0) {
    throw new Error(
      "Custom runner adapter requires config.runner.custom.command to contain at least one argv element",
    );
  }
  const { execution } = opts.bundle;
  const recipeEnv = buildRecipeRunnerEnv(opts.bundle.recipe, opts.bundle.task?.task_id);
  const enforcement = normalizeCustomEnforcement(opts.config);
  const sandboxPolicy =
    execution.sandbox_policy ??
    resolveRunnerSandboxPolicy({
      task: opts.bundle.task?.data,
      recipe: opts.bundle.recipe,
    });
  if (
    sandboxPolicy.requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX &&
    !hasExplicitRunnerDangerFullAccessAuthority(sandboxPolicy.authority)
  ) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Custom runner danger-full-access intent requires explicit operator authority.",
      context: {
        adapter_id: opts.adapterId,
        policy_field: "sandbox",
        declared_value: sandboxPolicy.requested,
        required_authority: "danger_full_access_authorized",
      },
    });
  }
  const preparedCommand = buildCustomCommand({
    adapterId: opts.adapterId,
    config: opts.config,
    command,
    requestedSandbox: sandboxPolicy.requested,
  });
  const sandboxDecision = execution.policy_decision?.fields.sandbox;
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
    filesystem_effect_containment: null,
    argv: preparedCommand,
    env: {
      ...opts.config?.env,
      AGENTPLANE_RUNNER_ADAPTER: opts.adapterId,
      AGENTPLANE_RUNNER_MODE: execution.mode,
      AGENTPLANE_RUNNER_API_VERSION: opts.bundle.runner_api_version,
      AGENTPLANE_RUNNER_TARGET: opts.bundle.target.kind,
      ...(opts.bundle.target.kind === "task"
        ? { AGENTPLANE_RUNNER_TASK_ID: opts.bundle.target.task_id }
        : {}),
      AGENTPLANE_RUNNER_BUNDLE_PATH: execution.artifact_paths.bundle_path,
      AGENTPLANE_RUNNER_RUN_DIR: execution.artifact_paths.run_dir,
      AGENTPLANE_RUNNER_BOOTSTRAP_PATH: execution.artifact_paths.bootstrap_path,
      AGENTPLANE_RUNNER_STATE_PATH: execution.artifact_paths.state_path,
      AGENTPLANE_RUNNER_EVENTS_PATH: execution.artifact_paths.events_path,
      AGENTPLANE_RUNNER_RESULT_PATH: execution.artifact_paths.result_path,
      AGENTPLANE_RUNNER_ENFORCEMENT_MODE: enforcement.mode ?? "none",
      AGENTPLANE_RUNNER_ENFORCEMENT_PLATFORM: enforcement.platform ?? "auto",
      AGENTPLANE_RUNNER_SANDBOX_REQUESTED: sandboxPolicy.requested,
      AGENTPLANE_RUNNER_SANDBOX_ENFORCEMENT: sandboxDecision?.status ?? "unsupported",
      AGENTPLANE_RUNNER_DANGER_AUTHORIZED: String(
        sandboxPolicy.authority.danger_full_access_authorized,
      ),
      ...recipeEnv,
    },
    dry_run: execution.mode === "dry_run",
  };
}
