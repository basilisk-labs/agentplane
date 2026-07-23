import type { RunnerCustomConfig } from "@agentplaneorg/core/config";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation } from "../types.js";
import { buildRecipeRunnerEnv, readRecipeRunProfile } from "./recipe-run-profile.js";

const CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES = ["workspace-write"];
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
    fields: {
      sandbox:
        enforcement.mode === "codex_sandbox_full_auto"
          ? {
              level: "wrapper",
              channel: "argv",
              supported_values: [...CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES],
              note:
                `${configuredModeNote} Custom runner sandbox is enforced through ` +
                "`codex sandbox <platform> --full-auto` and currently supports workspace-write only, " +
                "because the shared runner contract requires writable result and trace artifacts inside run_dir.",
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

function resolveCodexSandboxPlatform(
  value: NonNullable<RunnerCustomConfig["enforcement"]>["platform"],
): "macos" | "linux" | "windows" {
  const currentPlatform = (() => {
    switch (process.platform) {
      case "darwin": {
        return "macos";
      }
      case "linux": {
        return "linux";
      }
      case "win32": {
        return "windows";
      }
      default: {
        return null;
      }
    }
  })();
  if (!currentPlatform) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message: `Custom runner codex sandbox wrapper does not support current platform ${JSON.stringify(process.platform)}.`,
      context: {
        adapter_id: "custom",
        wrapper_mode: "codex_sandbox_full_auto",
        platform: process.platform,
        policy_field: "sandbox",
      },
    });
  }
  if (value && value !== "auto") {
    if (value !== currentPlatform) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Custom runner codex sandbox wrapper is configured for ${JSON.stringify(value)} but current platform is ` +
          `${JSON.stringify(currentPlatform)}.`,
        context: {
          adapter_id: "custom",
          wrapper_mode: "codex_sandbox_full_auto",
          configured_platform: value,
          platform: currentPlatform,
          policy_field: "sandbox",
        },
      });
    }
    return value;
  }
  return currentPlatform;
}

function unsupportedCustomSandboxError(opts: {
  enforcementMode: string;
  requestedSandbox: string;
}): CliError {
  const baseContext = {
    adapter_id: "custom",
    wrapper_mode: opts.enforcementMode,
    policy_field: "sandbox",
    declared_value: opts.requestedSandbox,
    supported_values: CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES,
  } as const;
  if (opts.requestedSandbox === "read-only") {
    return new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Custom runner wrapper mode ${JSON.stringify(opts.enforcementMode)} cannot support recipe sandbox ` +
        `${JSON.stringify(opts.requestedSandbox)} because the shared runner contract requires write access ` +
        "to result.json and trace artifacts inside run_dir, while the default codex sandbox blocks writes " +
        "to cwd and TMPDIR. Supported values: workspace-write.",
      context: baseContext,
    });
  }
  return new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `Custom runner wrapper mode ${JSON.stringify(opts.enforcementMode)} does not support recipe sandbox ` +
      `${JSON.stringify(opts.requestedSandbox)}; supported values: ${CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES.join(", ")}.`,
    context: baseContext,
  });
}

function buildCustomCommand(opts: {
  config: RunnerCustomConfig | undefined;
  bundle: RunnerContextBundle;
  command: string[];
}): string[] {
  const enforcement = normalizeCustomEnforcement(opts.config);
  if (enforcement.mode !== "codex_sandbox_full_auto") return opts.command;

  const runProfile = readRecipeRunProfile(opts.bundle.recipe);
  const requestedSandbox = typeof runProfile?.sandbox === "string" ? runProfile.sandbox.trim() : "";
  if (!requestedSandbox) return opts.command;
  if (!CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES.includes(requestedSandbox)) {
    throw unsupportedCustomSandboxError({
      enforcementMode: enforcement.mode,
      requestedSandbox,
    });
  }

  return [
    "codex",
    "sandbox",
    resolveCodexSandboxPlatform(enforcement.platform),
    "--full-auto",
    ...opts.command,
  ];
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
  const recipeEnv = buildRecipeRunnerEnv(opts.bundle.recipe);
  const enforcement = normalizeCustomEnforcement(opts.config);
  const preparedCommand = buildCustomCommand({
    config: opts.config,
    bundle: opts.bundle,
    command,
  });
  return {
    adapter_id: opts.adapterId,
    run_id: execution.run_id,
    work_order_id: execution.run_id,
    repository_root: opts.bundle.repository.git_root,
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
      ...recipeEnv,
    },
    dry_run: execution.mode === "dry_run",
  };
}
