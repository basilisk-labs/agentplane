import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { InitAborted } from "./prompts.js";
import type { InitClackPrompts } from "./prompts.js";
import type { InitFlags, InitIde, InitParsed, SetupProfilePreset } from "./model.js";
import { INIT_DEFAULTS, setupProfilePresets } from "./presets.js";
import { listCachedBlueprintCatalogItems } from "./blueprints.js";
import { listCachedRecipes } from "./recipes.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
import {
  promptAdvancedSettingsStep,
  promptBackendStep,
  promptBlueprintSelectionStep,
  promptIdeStep,
  promptPolicyGatewayStep,
  promptRecipeSelectionStep,
  promptSetupProfileStep,
  promptWorkflowStep,
} from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { introLogo, section } from "./ui.js";
import {
  resolveIdeFromFlags,
  resolvePolicyGatewayFromFlags,
  resolveToolDefaults,
} from "./modes.js";

export type InitAnswers = {
  setupProfile: SetupProfilePreset;
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
  feedbackGithubIssues: boolean;
  feedbackAnonymousCloud: boolean;
  executionProfile: ExecutionProfile;
  strictUnsafeConfirm: boolean;
  blueprints: string[];
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
    setupProfile: setupProfilePreset,
    setupProfileDescription: preset.description,
    policyGateway: resolvePolicyGatewayFromFlags(flags, INIT_DEFAULTS.policyGateway),
    ide: resolveIdeFromFlags(flags, INIT_DEFAULTS.ide),
    workflow: flags.workflow ?? INIT_DEFAULTS.workflow,
    directCloseDirtyPolicy: flags.directCloseDirtyPolicy ?? INIT_DEFAULTS.directCloseDirtyPolicy,
    backend: flags.backend ?? INIT_DEFAULTS.backend,
    hooks: flags.hooks ?? preset.defaultHooks,
    recipes: flags.recipes ?? preset.defaultRecipes,
    requirePlanApproval: flags.requirePlanApproval ?? preset.defaultRequirePlanApproval,
    requireNetworkApproval: flags.requireNetworkApproval ?? preset.defaultRequireNetworkApproval,
    requireVerifyApproval: flags.requireVerifyApproval ?? preset.defaultRequireVerifyApproval,
    feedbackGithubIssues: flags.feedbackGithubIssues ?? preset.defaultFeedbackGithubIssues,
    feedbackAnonymousCloud: flags.feedbackAnonymousCloud ?? preset.defaultFeedbackAnonymousCloud,
    executionProfile: flags.executionProfile ?? preset.defaultExecutionProfile,
    strictUnsafeConfirm: flags.strictUnsafeConfirm ?? preset.defaultStrictUnsafeConfirm,
    blueprints: flags.blueprints ?? INIT_DEFAULTS.blueprints,
  };
}

export async function promptInteractiveAnswers(opts: {
  flags: InitParsed;
  clack: InitClackPrompts;
  targetRoot: string;
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
  const toolDefaults = resolveToolDefaults(opts.flags.tool);
  const policy = await promptPolicyGatewayStep({
    clack: promptClack,
    flags: {
      policyGateway: opts.flags.policyGateway ?? toolDefaults.policyGateway,
    },
  });
  const ide = await promptIdeStep({
    clack: promptClack,
    flags: { ide: opts.flags.ide ?? toolDefaults.ide },
  });
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
  const cachedRecipes = await listCachedRecipes({ cwd: opts.targetRoot });
  const recipeSelection = await promptRecipeSelectionStep({
    clack: promptClack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: setup.setupProfileMode,
    cachedRecipes,
  });
  const cachedBlueprints = await listCachedBlueprintCatalogItems({ cwd: opts.targetRoot });
  const blueprintSelection = await promptBlueprintSelectionStep({
    clack: promptClack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: setup.setupProfileMode,
    cachedBlueprints,
  });
  return {
    setupProfile: setup.setupProfilePreset,
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
    feedbackGithubIssues: advanced.feedbackGithubIssues,
    feedbackAnonymousCloud: advanced.feedbackAnonymousCloud,
    executionProfile: advanced.executionProfile,
    strictUnsafeConfirm: advanced.strictUnsafeConfirm,
    blueprints: blueprintSelection.blueprints,
  };
}
