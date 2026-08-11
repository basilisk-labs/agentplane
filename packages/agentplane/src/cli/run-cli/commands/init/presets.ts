import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { InitDefaults, SetupProfilePreset } from "./model.js";

const CANONICAL_EXECUTION_PROFILE = "standard" as const;

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
  feedbackGithubIssues: false,
  feedbackAnonymousCloud: false,
  executionProfile: CANONICAL_EXECUTION_PROFILE,
  evaluatorSkepticism: "standard",
  strictUnsafeConfirm: false,
  blueprints: [],
  runnerProfile: "codex",
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
    defaultFeedbackAnonymousCloud: boolean;
    defaultExecutionProfile: InitDefaults["executionProfile"];
    defaultEvaluatorSkepticism: InitDefaults["evaluatorSkepticism"];
    defaultRecipes: string[];
  }
> = {
  standard: {
    mode: "compact",
    description: "Standard process policy with task-specific workflow and integration settings.",
    defaultHooks: true,
    defaultStrictUnsafeConfirm: false,
    defaultRequirePlanApproval: true,
    defaultRequireNetworkApproval: true,
    defaultRequireVerifyApproval: true,
    defaultFeedbackGithubIssues: false,
    defaultFeedbackAnonymousCloud: false,
    defaultExecutionProfile: CANONICAL_EXECUTION_PROFILE,
    defaultEvaluatorSkepticism: "standard",
    defaultRecipes: [],
  },
};

export function normalizeSetupProfile(raw: string | undefined): SetupProfilePreset | undefined {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (
    value === "standard" ||
    value === "developer" ||
    value === "enterprise" ||
    value === "manager" ||
    value === "vibecoder" ||
    value === "light" ||
    value === "normal" ||
    value === "full-harness"
  )
    return "standard";
  return undefined;
}

export function normalizeExecutionProfile(raw: string | undefined): ExecutionProfile | undefined {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (
    value === "standard" ||
    value === "conservative" ||
    value === "balanced" ||
    value === "aggressive"
  )
    return CANONICAL_EXECUTION_PROFILE;
  return undefined;
}
