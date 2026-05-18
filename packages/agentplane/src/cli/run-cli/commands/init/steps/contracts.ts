import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../../agents/agents-template.js";
import type { PolicyGatewayFlavor } from "../../../../../shared/policy-gateway.js";
import type { InitFlags, InitIde, SetupProfilePreset } from "../model.js";
import type { InitClackPrompts } from "../prompts.js";

export type InitSetupProfileMode = "compact" | "full";

export type InitPromptOption<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

export type InitPromptClack = Pick<InitClackPrompts, "cancel" | "isCancel"> & {
  select<T extends string>(opts: {
    message: string;
    options: InitPromptOption<T>[];
    initialValue?: T;
  }): Promise<T | symbol>;
  confirm(opts: { message: string; initialValue?: boolean }): Promise<boolean | symbol>;
  text(opts: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    validate?: (value: string) => string | void;
  }): Promise<string | symbol>;
};

export type SetupProfileStepAnswers = {
  setupProfilePreset: SetupProfilePreset;
  setupProfileMode: InitSetupProfileMode;
};

export type PolicyGatewayStepAnswers = {
  policyGateway: PolicyGatewayFlavor;
};

export type IdeStepAnswers = {
  ide: InitIde;
};

export type WorkflowStepAnswers = {
  workflow: WorkflowMode;
  directCloseDirtyPolicy: NonNullable<InitFlags["directCloseDirtyPolicy"]>;
};

export type BackendStepAnswers = {
  backend: NonNullable<InitFlags["backend"]>;
};

export type AdvancedSettingsStepAnswers = {
  hooks: boolean;
  requirePlanApproval: boolean;
  requireNetworkApproval: boolean;
  requireVerifyApproval: boolean;
  feedbackGithubIssues: boolean;
  feedbackAnonymousCloud: boolean;
  executionProfile: ExecutionProfile;
  strictUnsafeConfirm: boolean;
};

export type RecipeSelectionStepAnswers = {
  recipes: string[];
};

export type BlueprintSelectionStepAnswers = {
  blueprints: string[];
};
