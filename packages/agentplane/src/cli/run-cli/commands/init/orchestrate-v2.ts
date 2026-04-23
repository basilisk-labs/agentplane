import path from "node:path";
import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { getVersion } from "../../../../meta/version.js";
import { CliError } from "../../../../shared/errors.js";
import { policyGatewayFileName } from "../../../../shared/policy-gateway.js";
import type { CommandSpec } from "../../../spec/spec.js";
import { usageError } from "../../../spec/errors.js";
import { mapCoreError } from "../../../error-map.js";
import { fileExists } from "../../../fs-utils.js";

import { resolveInitBaseBranchForInit } from "./base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./conflicts.js";
import { ensureGitRoot } from "./git.js";
import { maybeSyncIde } from "./ide-sync.js";
import type { InitParsed } from "./model.js";
import { InitAborted, loadInitV2ClackPrompts } from "./prompts-v2.js";
import type { InitV2ClackPrompts } from "./prompts-v2.js";
import {
  listCachedRecipes,
  maybeAddCachedRecipes,
  validateCachedRecipesSelection,
} from "./recipes.js";
import { setupProfilePresets } from "./presets.js";
import {
  applyInitV2WithProgress,
  promptAdvancedSettingsStep,
  promptBackendStep,
  promptConflictResolverStep,
  promptIdeStep,
  promptPolicyGatewayStep,
  promptRecipeSelectionStep,
  promptSetupProfileStep,
  promptWorkflowStep,
} from "./steps/index.js";
import type { InitV2PromptClack } from "./steps/contracts.js";
import { introLogo, outroError, outroSuccess, previewInstall, section } from "./ui-v2.js";
import { ensureAgentsFiles } from "./write-agents.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./write-config.js";
import { ensureInitRedmineEnvTemplate } from "./write-env.js";
import { ensureInitGitignore } from "./write-gitignore.js";
import { ensureInitWorkflow } from "./write-workflow.js";

function assertInteractiveInitV2(opts: { flags: InitParsed; spec: CommandSpec<InitParsed> }): void {
  if (opts.flags.yes) {
    throw usageError({
      spec: opts.spec,
      command: "init",
      message: "Interactive init UI cannot be combined with --yes.",
    });
  }
}

function requireInitV2Clack(
  clack: InitV2ClackPrompts | null,
  spec: CommandSpec<InitParsed>,
): InitV2ClackPrompts {
  if (clack) return clack;
  throw usageError({
    spec,
    command: "init",
    message:
      "Interactive init UI requires an interactive TTY. Unset AGENTPLANE_INIT_UI or omit --interactive-ui for the non-interactive route.",
  });
}

function assertConfirmed(clack: InitV2ClackPrompts, value: boolean | symbol): boolean {
  if (clack.isCancel(value)) {
    clack.cancel("Init cancelled before apply.");
    throw new InitAborted("Init cancelled before apply.");
  }
  return value;
}

export async function cmdInitV2(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
  spec: CommandSpec<InitParsed>;
}): Promise<number> {
  assertInteractiveInitV2({ flags: opts.flags, spec: opts.spec });
  const clack = requireInitV2Clack(await loadInitV2ClackPrompts(), opts.spec);

  try {
    const promptClack = clack as InitV2PromptClack & Pick<InitV2ClackPrompts, "note">;
    clack.intro("AgentPlane init");
    introLogo(clack);
    section(clack, "Setup", "Choose the project defaults before AgentPlane writes files.");
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

    await validateCachedRecipesSelection(recipeSelection.recipes);

    const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
    const baseBranchFallback = "main";
    const { gitRoot, gitRootExisted } = await ensureGitRoot({ initRoot, baseBranchFallback });
    const resolved = { gitRoot, agentplaneDir: path.join(gitRoot, ".agentplane") };
    const initBaseBranch = await resolveInitBaseBranchForInit({
      gitRoot: resolved.gitRoot,
      baseBranchFallback,
      isInteractive: false,
      workflow: workflow.workflow,
      gitRootExisted,
    });
    const configPath = path.join(resolved.agentplaneDir, "config.json");
    const localBackendPath = path.join(resolved.agentplaneDir, "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      resolved.agentplaneDir,
      "backends",
      "redmine",
      "backend.json",
    );
    const backendPath = backend.backend === "redmine" ? redmineBackendPath : localBackendPath;
    const initDirs = [
      resolved.agentplaneDir,
      path.join(resolved.agentplaneDir, "tasks"),
      path.join(resolved.agentplaneDir, "agents"),
      path.join(resolved.agentplaneDir, "cache"),
      path.join(resolved.agentplaneDir, "backends"),
      path.join(resolved.agentplaneDir, "backends", backend.backend),
    ];
    const initFiles = [configPath, backendPath];
    const initConflicts = await collectInitConflicts({ initDirs, initFiles });
    const gatewayPath = path.join(resolved.gitRoot, policyGatewayFileName(policy.policyGateway));
    const agentsMissing = !(await fileExists(gatewayPath));
    if (initConflicts.length > 0 && agentsMissing) {
      await ensureAgentplaneDirs(resolved.agentplaneDir, backend.backend);
      await ensureAgentsFiles({
        gitRoot: resolved.gitRoot,
        agentplaneDir: resolved.agentplaneDir,
        workflow: workflow.workflow,
        policyGateway: policy.policyGateway,
        configPathAbs: configPath,
        backendPathAbs: backendPath,
      });
    }
    const hookConflicts = advanced.hooks
      ? await collectHooksInstallConflicts({
          gitRoot: resolved.gitRoot,
          agentplaneDir: resolved.agentplaneDir,
        })
      : [];
    const conflicts = [...new Set([...initConflicts, ...hookConflicts])];

    const conflictChoice =
      opts.flags.force || opts.flags.backup
        ? null
        : await promptConflictResolverStep({
            clack: promptClack,
            gitRoot: resolved.gitRoot,
            conflicts,
          });
    await handleInitConflicts({
      gitRoot: resolved.gitRoot,
      conflicts,
      backup: opts.flags.backup === true || conflictChoice === "backup",
      force: opts.flags.force === true || conflictChoice === "overwrite",
    });

    previewInstall(clack, [
      { label: "Profile", value: selectedPreset.description },
      { label: "Gateway", value: policy.policyGateway },
      { label: "Workflow", value: workflow.workflow },
      { label: "Backend", value: backend.backend },
      { label: "Hooks", value: advanced.hooks },
      { label: "IDE", value: ide.ide },
      { label: "Recipes", value: recipeSelection.recipes.join(", ") || "none" },
      { label: "Install commit", value: !opts.flags.gitignoreAgents },
    ]);
    const confirmed = assertConfirmed(
      clack,
      await clack.confirm({ message: "Apply this init plan?", initialValue: true }),
    );
    if (!confirmed) {
      clack.cancel("Init cancelled before apply.");
      throw new InitAborted("Init cancelled before apply.");
    }

    const execution = buildExecutionProfile(advanced.executionProfile, {
      strictUnsafeConfirm: advanced.strictUnsafeConfirm,
    });
    await applyInitV2WithProgress({
      clack,
      includeInstallCommit: !opts.flags.gitignoreAgents,
      plan: {
        config: async () => {
          await ensureAgentplaneDirs(resolved.agentplaneDir, backend.backend);
          await writeInitConfig({
            agentplaneDir: resolved.agentplaneDir,
            gitRoot: resolved.gitRoot,
            workflow: workflow.workflow,
            directCloseDirtyPolicy: workflow.directCloseDirtyPolicy,
            backendConfigPathAbs: backendPath,
            requirePlanApproval: advanced.requirePlanApproval,
            requireNetworkApproval: advanced.requireNetworkApproval,
            requireVerifyApproval: advanced.requireVerifyApproval,
            execution,
          });
          await writeBackendStubs({ backend: backend.backend, backendPath });
          if (opts.flags.gitignoreAgents) {
            await setPinnedBaseBranch({
              cwd: resolved.gitRoot,
              rootOverride: resolved.gitRoot,
              value: initBaseBranch,
            });
          }
        },
        agents: async () => {
          const { installPaths } = await ensureAgentsFiles({
            gitRoot: resolved.gitRoot,
            agentplaneDir: resolved.agentplaneDir,
            workflow: workflow.workflow,
            policyGateway: policy.policyGateway,
            configPathAbs: configPath,
            backendPathAbs: backendPath,
          });
          if (backend.backend === "redmine") {
            await ensureInitRedmineEnvTemplate({ gitRoot: resolved.gitRoot });
            installPaths.push(".env.example");
          }
          return installPaths;
        },
        workflow: async () => {
          const workflowInit = await ensureInitWorkflow({
            gitRoot: resolved.gitRoot,
            workflowMode: workflow.workflow,
            approvals: {
              requirePlanApproval: advanced.requirePlanApproval,
              requireVerifyApproval: advanced.requireVerifyApproval,
              requireNetworkApproval: advanced.requireNetworkApproval,
            },
          });
          return workflowInit.installPaths.map((abs) => path.relative(resolved.gitRoot, abs));
        },
        gitignore: async () => {
          await ensureInitGitignore({
            gitRoot: resolved.gitRoot,
            includeAgentPromptFiles: opts.flags.gitignoreAgents === true,
          });
          return [".gitignore"];
        },
        hooks: advanced.hooks
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
            ide: ide.ide,
            gitRoot: resolved.gitRoot,
          });
          return ideRes.installPaths;
        },
        recipes: async () => {
          await maybeAddCachedRecipes({
            recipes: recipeSelection.recipes,
            cwd: opts.cwd,
            rootOverride: opts.rootOverride,
          });
        },
        installCommit: async (installPaths) => {
          await ensureInitCommit({
            gitRoot: resolved.gitRoot,
            baseBranch: initBaseBranch,
            installPaths: [...installPaths],
            version: getVersion(),
            skipHooks: true,
          });
        },
      },
    });

    outroSuccess(clack, resolved.gitRoot);
    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof InitAborted) {
      throw usageError({ spec: opts.spec, command: "init", message: err.message });
    }
    outroError(clack, err);
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}
