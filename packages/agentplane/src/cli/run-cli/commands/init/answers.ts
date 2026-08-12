import type { EvaluatorSkepticismLevel, ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { InitAborted } from "./prompts.js";
import type { InitClackPrompts } from "./prompts.js";
import type {
  InitFlags,
  InitIde,
  InitMode,
  InitParsed,
  InitTool,
  SetupProfilePreset,
} from "./model.js";
import { INIT_DEFAULTS, setupProfilePresets } from "./presets.js";
import { listCachedBlueprintCatalogItems } from "./blueprints.js";
import { listCachedRecipes } from "./recipes.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
import {
  promptAdvancedSettingsStep,
  promptBackendStep,
  promptBlueprintSelectionStep,
  promptIdeStep,
  promptInitModeStep,
  promptPolicyGatewayStep,
  promptRecipeSelectionStep,
  promptSetupProfileStep,
  promptToolStep,
  promptWorkflowStep,
} from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { introLogo, section } from "./ui.js";
import {
  resolveIdeFromFlags,
  resolvePolicyGatewayFromFlags,
  resolveRunnerProfileFromFlags,
  resolveToolDefaults,
} from "./modes.js";
import {
  detectInitRepositoryDefaults,
  type InitRepositoryDefaults,
} from "./repository-defaults.js";

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
  evaluatorSkepticism: EvaluatorSkepticismLevel;
  strictUnsafeConfirm: boolean;
  compatibilityWarnings?: string[];
  blueprints: string[];
  runnerProfile: "codex" | "hermes";
  decisionReasons: string[];
};

export type InteractiveInitAnswers = {
  answers: InitAnswers;
  initMode: Exclude<InitMode, "ci">;
};

export function assertConfirmed(clack: InitClackPrompts, value: boolean | symbol): boolean {
  if (clack.isCancel(value)) {
    clack.cancel("Init cancelled before apply.");
    throw new InitAborted("Init cancelled before apply.");
  }
  return value;
}

export function buildNonInteractiveAnswers(flags: InitParsed): InitAnswers {
  const setupProfilePreset: SetupProfilePreset = flags.setupProfile ?? "standard";
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
    evaluatorSkepticism: flags.evaluatorSkepticism ?? preset.defaultEvaluatorSkepticism,
    strictUnsafeConfirm: flags.strictUnsafeConfirm ?? preset.defaultStrictUnsafeConfirm,
    compatibilityWarnings: [...(flags.compatibilityWarnings ?? [])],
    blueprints: flags.blueprints ?? INIT_DEFAULTS.blueprints,
    runnerProfile: resolveRunnerProfileFromFlags(flags, "codex"),
    decisionReasons: [
      "Automation mode: non-interactive flags and stable defaults determine every value.",
      `Agent surface: ${flags.tool ?? "codex default"}; granular gateway and IDE flags override the mapping.`,
      `Workflow: ${flags.workflow ?? INIT_DEFAULTS.workflow}${flags.workflow ? " selected explicitly" : " is the safe local default"}.`,
      "Process policy: standard AgentPlane lifecycle and safety rules apply; explicit project settings remain independent.",
      `Storage: ${flags.backend ?? INIT_DEFAULTS.backend}${flags.backend ? " selected explicitly" : " keeps task state local by default"}.`,
    ],
  };
}

function quickDecisionReasons(opts: {
  tool: InitTool;
  workflow: WorkflowMode;
  workflowExplicit: boolean;
  setupProfile: SetupProfilePreset;
  backend: NonNullable<InitFlags["backend"]>;
  repositoryDefaults: InitRepositoryDefaults;
}): string[] {
  return [
    "Setup depth: quick keeps optional controls out of the first-run path.",
    ...opts.repositoryDefaults.decisionReasons,
    `Agent surface: ${opts.tool}; gateway, IDE integration, and managed-runner defaults are derived from this choice.`,
    `Workflow: ${opts.workflow}${opts.workflowExplicit ? " selected explicitly" : " selected in this dialog"}.`,
    "Process policy: standard AgentPlane lifecycle and safety rules apply; explicit project settings remain independent.",
    `Storage: ${opts.backend}${opts.backend === "local" ? " keeps the project self-contained" : " was selected explicitly"}.`,
    "Optional recipes and blueprints stay disabled until requested through advanced setup or explicit flags.",
  ];
}

async function promptQuickAnswers(opts: {
  flags: InitParsed;
  clack: InitPromptClack & Pick<InitClackPrompts, "log" | "note">;
  targetRoot: string;
}): Promise<InitAnswers> {
  section(
    opts.clack,
    "Quick setup",
    "Choose the agent surface and workflow. AgentPlane will explain the safe defaults before writing files; use Advanced setup to review every control.",
  );
  const setupProfile = opts.flags.setupProfile ?? "standard";
  const selectedPreset = setupProfilePresets[setupProfile];
  const repositoryDefaults = await detectInitRepositoryDefaults(opts.targetRoot);
  const { tool } = await promptToolStep({
    clack: opts.clack,
    flags: opts.flags,
    defaultTool: repositoryDefaults.tool,
  });
  const toolDefaults = resolveToolDefaults(tool);
  const workflow = await promptWorkflowStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfileMode: "compact",
    promptWorkflow: true,
    promptDirectCloseDirtyPolicy: false,
    defaults: {
      workflow: repositoryDefaults.workflow,
      directCloseDirtyPolicy: INIT_DEFAULTS.directCloseDirtyPolicy,
    },
  });
  const advanced = await promptAdvancedSettingsStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfilePreset: setupProfile,
    setupProfileMode: "compact",
  });
  const backend = opts.flags.backend ?? INIT_DEFAULTS.backend;
  return {
    setupProfile,
    setupProfileDescription: selectedPreset.description,
    policyGateway:
      opts.flags.policyGateway ?? toolDefaults.policyGateway ?? INIT_DEFAULTS.policyGateway,
    ide: opts.flags.ide ?? toolDefaults.ide ?? INIT_DEFAULTS.ide,
    workflow: workflow.workflow,
    directCloseDirtyPolicy: workflow.directCloseDirtyPolicy,
    backend,
    hooks: advanced.hooks,
    recipes: opts.flags.recipes ?? selectedPreset.defaultRecipes,
    requirePlanApproval: advanced.requirePlanApproval,
    requireNetworkApproval: advanced.requireNetworkApproval,
    requireVerifyApproval: advanced.requireVerifyApproval,
    feedbackGithubIssues: advanced.feedbackGithubIssues,
    feedbackAnonymousCloud: advanced.feedbackAnonymousCloud,
    executionProfile: advanced.executionProfile,
    evaluatorSkepticism: advanced.evaluatorSkepticism,
    strictUnsafeConfirm: advanced.strictUnsafeConfirm,
    compatibilityWarnings: [...(opts.flags.compatibilityWarnings ?? [])],
    blueprints: opts.flags.blueprints ?? INIT_DEFAULTS.blueprints,
    runnerProfile: toolDefaults.runnerProfile ?? "codex",
    decisionReasons: quickDecisionReasons({
      tool,
      workflow: workflow.workflow,
      workflowExplicit: opts.flags.workflow !== undefined,
      setupProfile,
      backend,
      repositoryDefaults,
    }),
  };
}

async function promptDetailedAnswers(opts: {
  flags: InitParsed;
  clack: InitPromptClack & Pick<InitClackPrompts, "log" | "note">;
  targetRoot: string;
  initMode: "guided" | "advanced";
}): Promise<InitAnswers> {
  section(opts.clack, "Advanced setup", "Review project policy and integration controls.");
  const setup = promptSetupProfileStep({
    clack: opts.clack,
    flags: opts.flags,
    defaultProfile: "standard",
  });
  const selectedPreset = setupProfilePresets[setup.setupProfilePreset];
  const { tool } = await promptToolStep({ clack: opts.clack, flags: opts.flags });
  const toolDefaults = resolveToolDefaults(tool);
  const promptMode = opts.initMode === "advanced" ? "full" : setup.setupProfileMode;
  const policy = await promptPolicyGatewayStep({
    clack: opts.clack,
    flags: { policyGateway: opts.flags.policyGateway },
    defaults: {
      policyGateway: toolDefaults.policyGateway ?? INIT_DEFAULTS.policyGateway,
    },
  });
  const ide = await promptIdeStep({
    clack: opts.clack,
    flags: { ide: opts.flags.ide },
    defaults: { ide: toolDefaults.ide ?? INIT_DEFAULTS.ide },
  });
  const workflow = await promptWorkflowStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfileMode: promptMode,
  });
  const backend = await promptBackendStep({ clack: opts.clack, flags: opts.flags });
  const advanced = await promptAdvancedSettingsStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: promptMode,
  });
  const cachedRecipes = await listCachedRecipes({ cwd: opts.targetRoot });
  const recipeSelection = await promptRecipeSelectionStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: promptMode,
    cachedRecipes,
  });
  const cachedBlueprints = await listCachedBlueprintCatalogItems({ cwd: opts.targetRoot });
  const blueprintSelection = await promptBlueprintSelectionStep({
    clack: opts.clack,
    flags: opts.flags,
    setupProfilePreset: setup.setupProfilePreset,
    setupProfileMode: promptMode,
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
    evaluatorSkepticism: advanced.evaluatorSkepticism,
    strictUnsafeConfirm: advanced.strictUnsafeConfirm,
    compatibilityWarnings: [...(opts.flags.compatibilityWarnings ?? [])],
    blueprints: blueprintSelection.blueprints,
    runnerProfile: toolDefaults.runnerProfile ?? "codex",
    decisionReasons: [
      `Setup depth: ${opts.initMode} exposes individual policy and integration controls.`,
      `Agent surface: ${tool}; gateway, IDE, and runner values remain individually reviewable.`,
      `Workflow: ${workflow.workflow} was confirmed in the detailed setup path.`,
      "Process policy: standard AgentPlane lifecycle and safety rules apply; explicit project settings remain independent.",
      `Storage: ${backend.backend} was confirmed in the detailed setup path.`,
    ],
  };
}

export async function promptInteractiveAnswers(opts: {
  flags: InitParsed;
  clack: InitClackPrompts;
  targetRoot: string;
}): Promise<InteractiveInitAnswers> {
  const promptClack = opts.clack as InitPromptClack & Pick<InitClackPrompts, "log" | "note">;
  opts.clack.intro("AgentPlane init");
  introLogo(opts.clack);
  const initMode = await promptInitModeStep({ clack: promptClack, flags: opts.flags });
  const answers =
    initMode === "quick"
      ? await promptQuickAnswers({
          flags: opts.flags,
          clack: promptClack,
          targetRoot: opts.targetRoot,
        })
      : await promptDetailedAnswers({
          flags: opts.flags,
          clack: promptClack,
          targetRoot: opts.targetRoot,
          initMode,
        });
  return { answers, initMode };
}
