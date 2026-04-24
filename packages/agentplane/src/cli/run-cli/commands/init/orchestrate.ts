import path from "node:path";
import type { ExecutionProfile } from "@agentplaneorg/core/config";
import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { getVersion } from "../../../../meta/version.js";
import { CliError } from "../../../../shared/errors.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
import { policyGatewayFileName } from "../../../../shared/policy-gateway.js";
import { mapCoreError } from "../../../error-map.js";
import { fileExists } from "../../../fs-utils.js";
import { usageError } from "../../../spec/errors.js";
import type { CommandSpec } from "../../../spec/spec.js";

import { resolveInitBaseBranchForInit } from "./base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./conflicts.js";
import { ensureGitRoot } from "./git.js";
import { maybeSyncIde } from "./ide-sync.js";
import type { InitFlags, InitIde, InitParsed, SetupProfilePreset } from "./model.js";
import { INIT_DEFAULTS, setupProfilePresets } from "./presets.js";
import { InitAborted, loadInitClackPrompts, shouldUseInitClackPrompts } from "./prompts.js";
import type { InitClackPrompts } from "./prompts.js";
import {
  listCachedRecipes,
  maybeAddCachedRecipes,
  validateCachedRecipesSelection,
} from "./recipes.js";
import {
  applyInitWithProgress,
  promptAdvancedSettingsStep,
  promptBackendStep,
  promptConflictResolverStep,
  promptIdeStep,
  promptPolicyGatewayStep,
  promptRecipeSelectionStep,
  promptSetupProfileStep,
  promptWorkflowStep,
} from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { introLogo, outroError, outroSuccess, previewInstall, section } from "./ui.js";
import { ensureAgentsFiles } from "./write-agents.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./write-config.js";
import { ensureInitRedmineEnvTemplate } from "./write-env.js";
import { ensureInitGitignore } from "./write-gitignore.js";
import { ensureInitWorkflow } from "./write-workflow.js";

type InitAnswers = {
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

type ResolvedInitPaths = {
  gitRoot: string;
  agentplaneDir: string;
  configPath: string;
  backendPath: string;
};

function shouldRunInteractiveInit(flags: InitParsed): boolean {
  if (flags.yes || process.env.AGENTPLANE_PROMPTS === "plain") return false;
  return shouldUseInitClackPrompts();
}

function assertNonInteractiveInitAllowed(opts: {
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
  interactive: boolean;
}): void {
  if (opts.interactive || opts.flags.yes || opts.flags.setupProfile) return;
  if (opts.flags.workflow && opts.flags.requireNetworkApproval !== undefined) return;
  throw usageError({
    spec: opts.spec,
    command: "init",
    message:
      "Non-interactive init requires --yes, --setup-profile, or explicit values for: --workflow, --require-network-approval.",
  });
}

function requireInitClack(
  clack: InitClackPrompts | null,
  spec: CommandSpec<InitParsed>,
): InitClackPrompts {
  if (clack) return clack;
  throw usageError({
    spec,
    command: "init",
    message: "Interactive init requires an interactive TTY.",
  });
}

function assertConfirmed(clack: InitClackPrompts, value: boolean | symbol): boolean {
  if (clack.isCancel(value)) {
    clack.cancel("Init cancelled before apply.");
    throw new InitAborted("Init cancelled before apply.");
  }
  return value;
}

function buildNonInteractiveAnswers(flags: InitParsed): InitAnswers {
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

async function promptInteractiveAnswers(opts: {
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

async function resolveInitPaths(opts: {
  cwd: string;
  rootOverride?: string;
  backend: NonNullable<InitFlags["backend"]>;
}): Promise<ResolvedInitPaths & { gitRootExisted: boolean }> {
  const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
  const { gitRoot, gitRootExisted } = await ensureGitRoot({ initRoot, baseBranchFallback: "main" });
  const agentplaneDir = path.join(gitRoot, ".agentplane");
  const configPath = path.join(agentplaneDir, "config.json");
  const localBackendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
  const redmineBackendPath = path.join(agentplaneDir, "backends", "redmine", "backend.json");
  const backendPath = opts.backend === "redmine" ? redmineBackendPath : localBackendPath;
  return { gitRoot, gitRootExisted, agentplaneDir, configPath, backendPath };
}

async function collectInitAndHookConflicts(opts: {
  paths: ResolvedInitPaths;
  answers: InitAnswers;
}): Promise<string[]> {
  const initDirs = [
    opts.paths.agentplaneDir,
    path.join(opts.paths.agentplaneDir, "tasks"),
    path.join(opts.paths.agentplaneDir, "agents"),
    path.join(opts.paths.agentplaneDir, "cache"),
    path.join(opts.paths.agentplaneDir, "backends"),
    path.join(opts.paths.agentplaneDir, "backends", opts.answers.backend),
  ];
  const initFiles = [opts.paths.configPath, opts.paths.backendPath];
  const initConflicts = await collectInitConflicts({ initDirs, initFiles });
  const gatewayPath = path.join(
    opts.paths.gitRoot,
    policyGatewayFileName(opts.answers.policyGateway),
  );
  const agentsMissing = !(await fileExists(gatewayPath));
  if (initConflicts.length > 0 && agentsMissing) {
    await ensureAgentplaneDirs(opts.paths.agentplaneDir, opts.answers.backend);
    await ensureAgentsFiles({
      gitRoot: opts.paths.gitRoot,
      agentplaneDir: opts.paths.agentplaneDir,
      workflow: opts.answers.workflow,
      policyGateway: opts.answers.policyGateway,
      configPathAbs: opts.paths.configPath,
      backendPathAbs: opts.paths.backendPath,
    });
  }
  const hookConflicts = opts.answers.hooks
    ? await collectHooksInstallConflicts({
        gitRoot: opts.paths.gitRoot,
        agentplaneDir: opts.paths.agentplaneDir,
      })
    : [];
  return [...new Set([...initConflicts, ...hookConflicts])];
}

async function maybeConfirmInteractiveApply(opts: {
  clack: InitClackPrompts | null;
  flags: InitParsed;
  answers: InitAnswers;
}): Promise<void> {
  if (!opts.clack) return;
  previewInstall(opts.clack, [
    { label: "Profile", value: opts.answers.setupProfileDescription },
    { label: "Gateway", value: opts.answers.policyGateway },
    { label: "Workflow", value: opts.answers.workflow },
    { label: "Backend", value: opts.answers.backend },
    { label: "Hooks", value: opts.answers.hooks },
    { label: "IDE", value: opts.answers.ide },
    { label: "Recipes", value: opts.answers.recipes.join(", ") || "none" },
    { label: "Install commit", value: !opts.flags.gitignoreAgents },
  ]);
  const confirmed = assertConfirmed(
    opts.clack,
    await opts.clack.confirm({ message: "Apply this init plan?", initialValue: true }),
  );
  if (!confirmed) {
    opts.clack.cancel("Init cancelled before apply.");
    throw new InitAborted("Init cancelled before apply.");
  }
}

async function applyInitPlan(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
  clack: InitClackPrompts | null;
  answers: InitAnswers;
  paths: ResolvedInitPaths;
  initBaseBranch: string;
}): Promise<void> {
  const execution = buildExecutionProfile(opts.answers.executionProfile, {
    strictUnsafeConfirm: opts.answers.strictUnsafeConfirm,
  });
  await applyInitWithProgress({
    clack: opts.clack,
    includeInstallCommit: !opts.flags.gitignoreAgents,
    plan: {
      config: async () => {
        await ensureAgentplaneDirs(opts.paths.agentplaneDir, opts.answers.backend);
        await writeInitConfig({
          agentplaneDir: opts.paths.agentplaneDir,
          gitRoot: opts.paths.gitRoot,
          workflow: opts.answers.workflow,
          directCloseDirtyPolicy: opts.answers.directCloseDirtyPolicy,
          backendConfigPathAbs: opts.paths.backendPath,
          requirePlanApproval: opts.answers.requirePlanApproval,
          requireNetworkApproval: opts.answers.requireNetworkApproval,
          requireVerifyApproval: opts.answers.requireVerifyApproval,
          execution,
        });
        await writeBackendStubs({
          backend: opts.answers.backend,
          backendPath: opts.paths.backendPath,
        });
        if (opts.flags.gitignoreAgents) {
          await setPinnedBaseBranch({
            cwd: opts.paths.gitRoot,
            rootOverride: opts.paths.gitRoot,
            value: opts.initBaseBranch,
          });
        }
      },
      agents: async () => {
        const { installPaths } = await ensureAgentsFiles({
          gitRoot: opts.paths.gitRoot,
          agentplaneDir: opts.paths.agentplaneDir,
          workflow: opts.answers.workflow,
          policyGateway: opts.answers.policyGateway,
          configPathAbs: opts.paths.configPath,
          backendPathAbs: opts.paths.backendPath,
        });
        if (opts.answers.backend === "redmine") {
          await ensureInitRedmineEnvTemplate({ gitRoot: opts.paths.gitRoot });
          installPaths.push(".env.example");
        }
        return installPaths;
      },
      workflow: async () => {
        const workflowInit = await ensureInitWorkflow({
          gitRoot: opts.paths.gitRoot,
          workflowMode: opts.answers.workflow,
          approvals: {
            requirePlanApproval: opts.answers.requirePlanApproval,
            requireVerifyApproval: opts.answers.requireVerifyApproval,
            requireNetworkApproval: opts.answers.requireNetworkApproval,
          },
        });
        return workflowInit.installPaths.map((abs) => path.relative(opts.paths.gitRoot, abs));
      },
      gitignore: async () => {
        await ensureInitGitignore({
          gitRoot: opts.paths.gitRoot,
          includeAgentPromptFiles: opts.flags.gitignoreAgents === true,
        });
        return [".gitignore"];
      },
      hooks: opts.answers.hooks
        ? async () => {
            await cmdHooksInstall({
              cwd: opts.cwd,
              rootOverride: opts.rootOverride,
              quiet: true,
            });
            return [".agentplane/bin/agentplane"];
          }
        : undefined,
      ideSync: async () => {
        const ideRes = await maybeSyncIde({
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          ide: opts.answers.ide,
          gitRoot: opts.paths.gitRoot,
        });
        return ideRes.installPaths;
      },
      recipes: async () => {
        return await maybeAddCachedRecipes({
          recipes: opts.answers.recipes,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
        });
      },
      installCommit: async (installPaths) => {
        await ensureInitCommit({
          gitRoot: opts.paths.gitRoot,
          baseBranch: opts.initBaseBranch,
          installPaths: [...installPaths],
          version: getVersion(),
          skipHooks: true,
        });
      },
    },
  });
}

export async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
}): Promise<number> {
  const interactive = shouldRunInteractiveInit(opts.flags);
  assertNonInteractiveInitAllowed({ flags: opts.flags, spec: opts.spec, interactive });
  const clack = interactive ? requireInitClack(await loadInitClackPrompts(), opts.spec) : null;

  try {
    const answers = clack
      ? await promptInteractiveAnswers({ flags: opts.flags, clack })
      : buildNonInteractiveAnswers(opts.flags);
    await validateCachedRecipesSelection(answers.recipes);
    const paths = await resolveInitPaths({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      backend: answers.backend,
    });
    const initBaseBranch = await resolveInitBaseBranchForInit({
      gitRoot: paths.gitRoot,
      baseBranchFallback: "main",
      isInteractive: false,
      workflow: answers.workflow,
      gitRootExisted: paths.gitRootExisted,
    });
    const conflicts = await collectInitAndHookConflicts({ paths, answers });
    const conflictChoice =
      !clack || opts.flags.force || opts.flags.backup
        ? null
        : await promptConflictResolverStep({
            clack: clack as InitPromptClack & Pick<InitClackPrompts, "note">,
            gitRoot: paths.gitRoot,
            conflicts,
          });
    await handleInitConflicts({
      gitRoot: paths.gitRoot,
      conflicts,
      backup: opts.flags.backup === true || conflictChoice === "backup",
      force: opts.flags.force === true || conflictChoice === "overwrite",
    });
    await maybeConfirmInteractiveApply({ clack, flags: opts.flags, answers });
    await applyInitPlan({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      flags: opts.flags,
      clack,
      answers,
      paths,
      initBaseBranch,
    });
    if (clack) {
      outroSuccess(clack, paths.gitRoot);
    }
    process.stdout.write(`${path.relative(paths.gitRoot, paths.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof InitAborted) {
      throw usageError({ spec: opts.spec, command: "init", message: err.message });
    }
    if (clack) {
      outroError(clack, err);
    }
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
