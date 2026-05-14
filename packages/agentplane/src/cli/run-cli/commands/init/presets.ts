import type { InitDefaults, SetupProfilePreset } from "./model.js";

export const INIT_DEFAULTS: InitDefaults = {
  policyGateway: "codex",
  ide: "codex",
  workflow: "direct",
  directCloseDirtyPolicy: "allow_other_task_readmes",
  backend: "local",
  hooks: true,
  recipes: [],
  requirePlanApproval: true,
  requireNetworkApproval: true,
  requireVerifyApproval: true,
  feedbackGithubIssues: true,
  executionProfile: "balanced",
  strictUnsafeConfirm: false,
  blueprints: [],
};

export const setupProfilePresets: Record<
  SetupProfilePreset,
  {
    mode: "compact" | "full";
    description: string;
    defaultHooks: boolean;
    defaultStrictUnsafeConfirm: boolean;
    defaultRequirePlanApproval: boolean;
    defaultRequireNetworkApproval: boolean;
    defaultRequireVerifyApproval: boolean;
    defaultFeedbackGithubIssues: boolean;
    defaultExecutionProfile: InitDefaults["executionProfile"];
    defaultRecipes: string[];
  }
> = {
  light: {
    mode: "compact",
    description: "Light profile (maximum flexibility, minimal enforcement, hooks disabled).",
    defaultHooks: false,
    defaultStrictUnsafeConfirm: false,
    defaultRequirePlanApproval: false,
    defaultRequireNetworkApproval: false,
    defaultRequireVerifyApproval: false,
    defaultFeedbackGithubIssues: true,
    defaultExecutionProfile: "aggressive",
    defaultRecipes: [],
  },
  normal: {
    mode: "compact",
    description:
      "Normal profile (balanced defaults and approvals enabled for standard team workflows; hooks enabled).",
    defaultHooks: true,
    defaultStrictUnsafeConfirm: false,
    defaultRequirePlanApproval: true,
    defaultRequireNetworkApproval: true,
    defaultRequireVerifyApproval: true,
    defaultFeedbackGithubIssues: true,
    defaultExecutionProfile: "balanced",
    defaultRecipes: [],
  },
  "full-harness": {
    mode: "full",
    description:
      "Full Harness profile (strict guardrails, explicit confirmations, conservative execution; hooks enabled).",
    defaultHooks: true,
    defaultStrictUnsafeConfirm: true,
    defaultRequirePlanApproval: true,
    defaultRequireNetworkApproval: true,
    defaultRequireVerifyApproval: true,
    defaultFeedbackGithubIssues: true,
    defaultExecutionProfile: "conservative",
    defaultRecipes: [],
  },
};

export function normalizeSetupProfile(raw: string | undefined): SetupProfilePreset | undefined {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (value === "developer" || value === "enterprise") return "full-harness";
  if (value === "manager") return "normal";
  if (value === "vibecoder") return "light";
  if (value === "light" || value === "normal" || value === "full-harness") return value;
  return undefined;
}
