import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { InitAborted } from "./prompts.js";
import type { InitClackPrompts } from "./prompts.js";
import type { InitFlags, InitIde, InitParsed, SetupProfilePreset } from "./model.js";
import { INIT_DEFAULTS, setupProfilePresets } from "./presets.js";
import { listCachedRecipes } from "./recipes.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
import {
  promptAdvancedSettingsStep,
  promptBackendStep,
  promptIdeStep,
  promptPolicyGatewayStep,
  promptRecipeSelectionStep,
  promptSetupProfileStep,
  promptWorkflowStep,
} from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { introLogo, section } from "./ui.js";

export type InitAnswers = {
  setupProfileDescription: string;
  policyGateway: PolicyGatewayFlavor;
  ide: InitIde;
  workflow: WorkflowMode;
  directCloseDirtyPolicy: NonNullable<InitFlags["directCloseDirtyPolicy"]>;
  backend: NonNullable<InitFlags["backend"]>;
  hooks: boolean;
  recipes: string[];
  requirePlanApproval: boolean;
  requireNetworkApproval: boolean;
  requireVerifyApproval: boolean;
  executionProfile: ExecutionProfile;
  strictUnsafeConfirm: boolean;
};

export function assertConfirmed(clack: InitClackPrompts, value: boolean | symbol): boolean {
  if (clack.isCancel(value)) {
    clack.cancel("Init cancelled before apply.");
    throw new InitAborted("Init cancelled before apply.");
  }
  return value;
}

export function buildNonInteractiveAnswers(flags: InitParsed): InitAnswers {
  const setupProfilePreset: SetupProfilePreset = flags.setupProfile ?? "normal";
  const preset = setupProfilePresets[setupProfilePreset];
  return {
    setupProfileDescription: preset.description,
    policyGateway: flags.policyGateway ?? INIT_DEFAULTS.policyGateway,
    ide: flags.ide ?? INIT_DEFAULTS.ide,
    workflow: flags.workflow ?? INIT_DEFAULTS.workflow,
    directCloseDirtyPolicy: flags.directCloseDirtyPolicy ?? INIT_DEFAULTS.directCloseDirtyPolicy,
    backend: flags.backend ?? INIT_DEFAULTS.backend,
    hooks: flags.hooks ?? preset.defaultHooks,
    recipes: flags.recipes ?? preset.defaultRecipes,
    requirePlanApproval: flags.requirePlanApproval ?? preset.defaultRequirePlanApproval,
    requireNetworkApproval: flags.requireNetworkApproval ?? preset.defaultRequireNetworkApproval,
    requireVerifyApproval: flags.requireVerifyApproval ?? preset.defaultRequireVerifyApproval,
    executionProfile: flags.executionProfile ?? preset.defaultExecutionProfile,
    strictUnsafeConfirm: flags.strictUnsafeConfirm ?? preset.defaultStrictUnsafeConfirm,
  };
}

export async function promptInteractiveAnswers(opts: {
  flags: InitParsed;
  clack: InitClackPrompts;
}): Promise<InitAnswers> {
  const promptClack = opts.clack as InitPromptClack & Pick<InitClackPrompts, "note">;
  opts.clack.intro("AgentPlane init");
  introLogo(opts.clack);
  section(opts.clack, "Setup", "Choose the project defaults before AgentPlane writes files.");
  const setup = await promptSetupProfileStep({
    clack: promptClack,
    flags: opts.flags,
    defaultProfile: "normal",
  });
  const selectedPreset = setupProfilePresets[setup.setupProfilePreset];
  const policy = await promptPolicyGatewayStep({ clack: promptClack, flags: opts.flags });
  const ide = await promptIdeStep({ clack: promptClack, flags: opts.flags });
  const workflow = await promptWorkflowStep({
    clack: promptClack,
    flags: opts.flags,
    setupProfileMode: setup.setupProfileMode,
  });
  const backend = await promptBackendStep({ clack: promptClack, flags: opts.flags });
  const advanced = await promptAdvancedSettingsStep({
    clack: promptClack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: setup.setupProfileMode,
  });
  const cachedRecipes = await listCachedRecipes();
  const recipeSelection = await promptRecipeSelectionStep({
    clack: promptClack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: setup.setupProfileMode,
    cachedRecipes,
  });
  return {
    setupProfileDescription: selectedPreset.description,
    policyGateway: policy.policyGateway,
    ide: ide.ide,
    workflow: workflow.workflow,
    directCloseDirtyPolicy: workflow.directCloseDirtyPolicy,
    backend: backend.backend,
    hooks: advanced.hooks,
    recipes: recipeSelection.recipes,
    requirePlanApproval: advanced.requirePlanApproval,
    requireNetworkApproval: advanced.requireNetworkApproval,
    requireVerifyApproval: advanced.requireVerifyApproval,
    executionProfile: advanced.executionProfile,
    strictUnsafeConfirm: advanced.strictUnsafeConfirm,
  };
}
