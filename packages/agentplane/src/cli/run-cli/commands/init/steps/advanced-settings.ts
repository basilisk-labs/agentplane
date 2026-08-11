import {
  CANONICAL_EXECUTION_PROFILE,
  type EvaluatorSkepticismLevel,
} from "@agentplaneorg/core/config";

import type { InitFlags, SetupProfilePreset } from "../model.js";
import { setupProfilePresets } from "../presets.js";

import { confirmStepValue, selectStepValue } from "./prompt-utils.js";
import type {
  AdvancedSettingsStepAnswers,
  InitSetupProfileMode,
  InitPromptClack,
} from "./contracts.js";

const evaluatorSkepticismOptions: {
  value: EvaluatorSkepticismLevel;
  label: string;
  hint: string;
}[] = [
  { value: "standard", label: "Standard", hint: "Contract review plus missing checks." },
  { value: "strict", label: "Strict", hint: "Adversarial invariant and negative-case review." },
  {
    value: "paranoid",
    label: "Paranoid",
    hint: "Assume pass evidence is incomplete until proven.",
  },
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
    | "feedbackAnonymousCloud"
    | "executionProfile"
    | "evaluatorSkepticism"
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
  let feedbackAnonymousCloud =
    opts.flags.feedbackAnonymousCloud ?? preset.defaultFeedbackAnonymousCloud;
  let requireNetworkApproval =
    opts.flags.requireNetworkApproval ?? preset.defaultRequireNetworkApproval;
  const executionProfile = CANONICAL_EXECUTION_PROFILE;
  let evaluatorSkepticism = opts.flags.evaluatorSkepticism ?? preset.defaultEvaluatorSkepticism;
  const strictUnsafeConfirm = false;

  if (opts.setupProfileMode === "full") {
    if (!opts.flags.evaluatorSkepticism) {
      evaluatorSkepticism = await selectStepValue(opts.clack, {
        message: "Evaluator skepticism",
        options: evaluatorSkepticismOptions,
        initialValue: evaluatorSkepticism,
        cancelMessage: "Evaluator skepticism selection cancelled.",
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
  if (opts.setupProfileMode === "full" && opts.flags.feedbackGithubIssues === undefined) {
    feedbackGithubIssues = await confirmStepValue(opts.clack, {
      message: "Allow GitHub issue prompts for internal AgentPlane errors?",
      initialValue: feedbackGithubIssues,
      cancelMessage: "Feedback issue opt-in selection cancelled.",
    });
  }
  if (
    opts.setupProfileMode === "full" &&
    feedbackGithubIssues &&
    opts.flags.feedbackAnonymousCloud === undefined
  ) {
    feedbackAnonymousCloud = await confirmStepValue(opts.clack, {
      message:
        "Allow anonymous AgentPlane Cloud fallback when GitHub issue publishing is unavailable?",
      initialValue: feedbackAnonymousCloud,
      cancelMessage: "Feedback cloud fallback selection cancelled.",
    });
  }

  return {
    hooks,
    requirePlanApproval,
    requireNetworkApproval,
    requireVerifyApproval,
    feedbackGithubIssues,
    feedbackAnonymousCloud,
    executionProfile,
    evaluatorSkepticism,
    strictUnsafeConfirm,
  };
}
