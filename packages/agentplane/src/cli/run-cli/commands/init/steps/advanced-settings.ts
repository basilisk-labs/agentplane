import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { InitFlags, SetupProfilePreset } from "../model.js";
import { setupProfilePresets } from "../presets.js";

import { confirmStepValue, selectStepValue } from "./prompt-utils.js";
import type {
  AdvancedSettingsStepAnswers,
  InitSetupProfileMode,
  InitPromptClack,
} from "./contracts.js";

const executionProfileOptions: { value: ExecutionProfile; label: string; hint: string }[] = [
  { value: "conservative", label: "Conservative", hint: "Lower autonomy and stricter budgets." },
  { value: "balanced", label: "Balanced", hint: "Default autonomy and verification posture." },
  { value: "aggressive", label: "Aggressive", hint: "Higher autonomy and lighter guardrails." },
];

export async function promptAdvancedSettingsStep(opts: {
  clack: InitPromptClack;
  flags: Pick<
    InitFlags,
    | "hooks"
    | "requirePlanApproval"
    | "requireNetworkApproval"
    | "requireVerifyApproval"
    | "feedbackGithubIssues"
    | "executionProfile"
    | "strictUnsafeConfirm"
  >;
  setupProfilePreset: SetupProfilePreset;
  setupProfileMode: InitSetupProfileMode;
}): Promise<AdvancedSettingsStepAnswers> {
  const preset = setupProfilePresets[opts.setupProfilePreset];
  const hooks = opts.flags.hooks ?? preset.defaultHooks;
  const requirePlanApproval = opts.flags.requirePlanApproval ?? preset.defaultRequirePlanApproval;
  const requireVerifyApproval =
    opts.flags.requireVerifyApproval ?? preset.defaultRequireVerifyApproval;
  let feedbackGithubIssues = opts.flags.feedbackGithubIssues ?? preset.defaultFeedbackGithubIssues;
  let requireNetworkApproval =
    opts.flags.requireNetworkApproval ?? preset.defaultRequireNetworkApproval;
  let executionProfile = opts.flags.executionProfile ?? preset.defaultExecutionProfile;
  let strictUnsafeConfirm = opts.flags.strictUnsafeConfirm ?? preset.defaultStrictUnsafeConfirm;

  if (opts.setupProfileMode === "full") {
    if (!opts.flags.executionProfile) {
      executionProfile = await selectStepValue(opts.clack, {
        message: "Execution profile",
        options: executionProfileOptions,
        initialValue: executionProfile,
        cancelMessage: "Execution profile selection cancelled.",
      });
    }
    if (opts.flags.strictUnsafeConfirm === undefined) {
      strictUnsafeConfirm = await confirmStepValue(opts.clack, {
        message: "Require strict explicit confirmation for extra unsafe actions?",
        initialValue: strictUnsafeConfirm,
        cancelMessage: "Strict unsafe confirmation selection cancelled.",
      });
    }
    if (opts.flags.requireNetworkApproval === undefined) {
      requireNetworkApproval = await confirmStepValue(opts.clack, {
        message: "Require explicit approval for network actions?",
        initialValue: requireNetworkApproval,
        cancelMessage: "Network approval selection cancelled.",
      });
    }
  }
  if (opts.flags.feedbackGithubIssues === undefined) {
    feedbackGithubIssues = await confirmStepValue(opts.clack, {
      message: "Allow GitHub issue prompts for internal AgentPlane errors?",
      initialValue: feedbackGithubIssues,
      cancelMessage: "Feedback issue opt-in selection cancelled.",
    });
  }

  return {
    hooks,
    requirePlanApproval,
    requireNetworkApproval,
    requireVerifyApproval,
    feedbackGithubIssues,
    executionProfile,
    strictUnsafeConfirm,
  };
}
