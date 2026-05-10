import path from "node:path";

import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { getVersion } from "../../../../meta/version.js";
import { InitAborted, type InitClackPrompts } from "./prompts.js";
import type { InitFlags, InitParsed } from "./model.js";
import type { InitAnswers } from "./answers.js";
import { collectInitConflicts } from "./conflicts.js";
import { maybeSyncIde } from "./ide-sync.js";
import { promptConflictResolverStep, applyInitWithProgress } from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { previewInstall } from "./ui.js";
import { ensureAgentsFiles } from "./write-agents.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./write-config.js";
import { ensureInitCloudEnvTemplate, ensureInitRedmineEnvTemplate } from "./write-env.js";
import { ensureInitGitignore } from "./write-gitignore.js";
import { ensureInitWorkflow } from "./write-workflow.js";
import { assertConfirmed } from "./answers.js";

export type ResolvedInitPaths = {
  gitRoot: string;
  agentplaneDir: string;
  workflowPath: string;
  legacyConfigPath: string;
  backendPath: string;
};

export async function resolveInitPaths(opts: {
  cwd: string;
  rootOverride?: string;
  backend: NonNullable<InitFlags["backend"]>;
  ensureGitRoot: (opts: {
    initRoot: string;
    baseBranchFallback: string;
  }) => Promise<{ gitRoot: string; gitRootExisted: boolean }>;
}): Promise<ResolvedInitPaths & { gitRootExisted: boolean }> {
  const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
  const { gitRoot, gitRootExisted } = await opts.ensureGitRoot({
    initRoot,
    baseBranchFallback: "main",
  });
  const agentplaneDir = path.join(gitRoot, ".agentplane");
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const legacyConfigPath = path.join(agentplaneDir, "config.json");
  const localBackendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
  const redmineBackendPath = path.join(agentplaneDir, "backends", "redmine", "backend.json");
  const cloudBackendPath = path.join(agentplaneDir, "backends", "cloud", "backend.json");
  const backendPath =
    opts.backend === "redmine"
      ? redmineBackendPath
      : opts.backend === "cloud"
        ? cloudBackendPath
        : localBackendPath;
  return { gitRoot, gitRootExisted, agentplaneDir, workflowPath, legacyConfigPath, backendPath };
}

export async function collectInitAndHookConflicts(opts: {
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
  const initFiles = [opts.paths.workflowPath, opts.paths.legacyConfigPath, opts.paths.backendPath];
  const initConflicts = await collectInitConflicts({ initDirs, initFiles });
  const hookConflicts = opts.answers.hooks
    ? await collectHooksInstallConflicts({
        gitRoot: opts.paths.gitRoot,
        agentplaneDir: opts.paths.agentplaneDir,
      })
    : [];
  return [...new Set([...initConflicts, ...hookConflicts])];
}

export async function maybeConfirmInteractiveApply(opts: {
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
    { label: "Blueprints", value: opts.answers.blueprints.join(", ") || "none" },
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

export async function resolveConflictStrategy(opts: {
  clack: InitClackPrompts | null;
  flags: InitParsed;
  gitRoot: string;
  conflicts: string[];
}): Promise<{ backup: boolean; force: boolean }> {
  const conflictChoice =
    !opts.clack || opts.flags.force || opts.flags.backup
      ? null
      : await promptConflictResolverStep({
          clack: opts.clack as InitPromptClack & Pick<InitClackPrompts, "note">,
          gitRoot: opts.gitRoot,
          conflicts: opts.conflicts,
        });
  return {
    backup: opts.flags.backup === true || conflictChoice === "backup",
    force: opts.flags.force === true || conflictChoice === "overwrite",
  };
}

export async function applyInitPlan(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
  clack: InitClackPrompts | null;
  answers: InitAnswers;
  paths: ResolvedInitPaths;
  initBaseBranch: string;
}): Promise<void> {
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
          execution: buildExecutionProfile(opts.answers.executionProfile, {
            strictUnsafeConfirm: opts.answers.strictUnsafeConfirm,
          }),
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
          workflowPathAbs: opts.paths.workflowPath,
          backendPathAbs: opts.paths.backendPath,
        });
        if (opts.answers.backend === "redmine") {
          await ensureInitRedmineEnvTemplate({ gitRoot: opts.paths.gitRoot });
          installPaths.push(".env.example");
        }
        if (opts.answers.backend === "cloud") {
          await ensureInitCloudEnvTemplate({ gitRoot: opts.paths.gitRoot });
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
        return await import("./recipes.js").then((m) =>
          m.maybeAddCachedRecipes({
            recipes: opts.answers.recipes,
            cwd: opts.cwd,
            rootOverride: opts.rootOverride,
          }),
        );
      },
      blueprints: async () => {
        return await import("./blueprints.js").then((m) =>
          m.maybeInstallCachedBlueprints({
            blueprints: opts.answers.blueprints,
            cwd: opts.cwd,
            rootOverride: opts.rootOverride,
          }),
        );
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
