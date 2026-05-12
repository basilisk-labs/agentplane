import path from "node:path";

import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { getVersion } from "../../../../meta/version.js";
import { getPathKind } from "../../../fs-utils.js";
import { InitAborted, type InitClackPrompts } from "./prompts.js";
import type { InitEffect, InitFlags, InitParsed, InitPlan } from "./model.js";
import type { InitAnswers } from "./answers.js";
import { applyInitBaseBranchSelection, type InitBaseBranchSelection } from "./base-branch.js";
import { collectInitConflicts, handleInitConflicts } from "./conflicts.js";
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
import { setupProfileToUserFacingProfile } from "./modes.js";
import { detectParentGitRoot } from "./git.js";

export type ResolvedInitPaths = {
  gitRoot: string;
  gitRootExisted: boolean;
  parentGitRoot: string | null;
  agentplaneDir: string;
  workflowPath: string;
  legacyConfigPath: string;
  backendPath: string;
};

export async function resolveInitPaths(opts: {
  cwd: string;
  rootOverride?: string;
  backend: NonNullable<InitFlags["backend"]>;
}): Promise<ResolvedInitPaths> {
  const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
  const gitRoot = initRoot;
  const gitRootExisted = (await getPathKind(path.join(gitRoot, ".git"))) === "dir";
  const parentGitRoot = gitRootExisted ? null : await detectParentGitRoot(gitRoot);
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
  return {
    gitRoot,
    gitRootExisted,
    parentGitRoot,
    agentplaneDir,
    workflowPath,
    legacyConfigPath,
    backendPath,
  };
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
  const hookConflicts =
    opts.answers.hooks && opts.paths.gitRootExisted
      ? await collectHooksInstallConflicts({
          gitRoot: opts.paths.gitRoot,
          agentplaneDir: opts.paths.agentplaneDir,
        })
      : [];
  return [...new Set([...initConflicts, ...hookConflicts])];
}

function rel(root: string, filePath: string): string {
  return path.relative(root, filePath) || ".";
}

function initWriteEffects(opts: { paths: ResolvedInitPaths; answers: InitAnswers }): InitEffect[] {
  const gateway = opts.answers.policyGateway === "claude" ? "CLAUDE.md" : "AGENTS.md";
  const effects: InitEffect[] = [
    {
      kind: "write_file",
      path: ".agentplane/config.json",
      summary: "Write legacy compatibility config",
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    },
    {
      kind: "write_file",
      path: ".agentplane/WORKFLOW.md",
      summary: "Write workflow contract",
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    },
    {
      kind: "write_file",
      path: rel(opts.paths.gitRoot, opts.paths.backendPath),
      summary: `Write ${opts.answers.backend} backend stub`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    },
    {
      kind: "write_file",
      path: gateway,
      summary: `Write ${opts.answers.policyGateway} policy gateway`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    },
    {
      kind: "write_file",
      path: ".gitignore",
      summary: "Update repository ignore rules",
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    },
  ];
  if (!opts.paths.gitRootExisted) {
    effects.unshift({
      kind: "git_init",
      summary: "Initialize git repository after final confirmation",
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "medium",
    });
  }
  if (opts.answers.hooks) {
    effects.push({
      kind: "install_hooks",
      path: ".git/hooks",
      summary: "Install managed git hooks",
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "medium",
    });
  }
  if (opts.answers.ide !== "codex") {
    effects.push({
      kind: "sync_ide",
      summary: `Sync ${opts.answers.ide} rules`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    });
  }
  for (const recipe of opts.answers.recipes) {
    effects.push({
      kind: "vendor_recipe",
      summary: `Materialize cached recipe ${recipe}`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    });
  }
  for (const blueprint of opts.answers.blueprints) {
    effects.push({
      kind: "install_blueprint",
      summary: `Install cached blueprint catalog entry ${blueprint}`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "low",
    });
  }
  return effects;
}

export function buildInitPlan(opts: {
  paths: ResolvedInitPaths;
  answers: InitAnswers;
  conflicts: string[];
  conflictMode: { backup: boolean; force: boolean };
  outputMode: "text" | "json";
  includeInstallCommit: boolean;
  initMode: InitPlan["mode"];
}): InitPlan {
  const hasConflictStrategy = opts.conflictMode.backup || opts.conflictMode.force;
  const conflictEffects: InitEffect[] = hasConflictStrategy
    ? opts.conflicts.map((conflict) => ({
        kind: opts.conflictMode.backup ? "backup_path" : "delete_path",
        path: rel(opts.paths.gitRoot, conflict),
        summary: opts.conflictMode.backup ? "Back up conflicting path" : "Delete conflicting path",
        destructive: opts.conflictMode.force,
        reversible: opts.conflictMode.backup,
        requiresNetwork: false,
        risk: opts.conflictMode.force ? "high" : "medium",
      }))
    : [];
  const effects = [
    ...conflictEffects,
    ...initWriteEffects({ paths: opts.paths, answers: opts.answers }),
  ];
  if (opts.includeInstallCommit) {
    effects.push({
      kind: "git_commit",
      summary: `Create initial AgentPlane install commit for ${getVersion()}`,
      destructive: false,
      reversible: true,
      requiresNetwork: false,
      risk: "medium",
    });
  }
  return {
    schemaVersion: "init-plan/v1",
    agentplaneVersion: getVersion(),
    root: opts.paths.gitRoot,
    mode: opts.initMode,
    profile: setupProfileToUserFacingProfile(opts.answers.setupProfile),
    internalSetupProfile: opts.answers.setupProfile,
    answers: {
      policyGateway: opts.answers.policyGateway,
      ide: opts.answers.ide,
      workflow: opts.answers.workflow,
      backend: opts.answers.backend,
      hooks: opts.answers.hooks,
      requirePlanApproval: opts.answers.requirePlanApproval,
      requireNetworkApproval: opts.answers.requireNetworkApproval,
      requireVerifyApproval: opts.answers.requireVerifyApproval,
      executionProfile: opts.answers.executionProfile,
      strictUnsafeConfirm: opts.answers.strictUnsafeConfirm,
      recipes: [...opts.answers.recipes],
      blueprints: [...opts.answers.blueprints],
    },
    context: {
      gitRootExisted: opts.paths.gitRootExisted,
      parentGitRoot: opts.paths.parentGitRoot,
      outputMode: opts.outputMode,
    },
    effects,
    conflicts: opts.conflicts.map((conflict) => rel(opts.paths.gitRoot, conflict)),
    warnings:
      opts.conflicts.length > 0 && !hasConflictStrategy
        ? ["Conflicts require --backup or --force before apply."]
        : [],
    nextSteps: [
      "agentplane quickstart",
      'agentplane task new --title "Trace first AI-assisted change" --owner CODER --tag code',
    ],
  };
}

export async function maybeConfirmInteractiveApply(opts: {
  clack: InitClackPrompts | null;
  flags: InitParsed;
  answers: InitAnswers;
  paths: ResolvedInitPaths;
  plan: InitPlan;
}): Promise<void> {
  if (!opts.clack) return;
  previewInstall(opts.clack, [
    { label: "Target", value: opts.paths.gitRoot },
    { label: "Profile", value: opts.answers.setupProfileDescription },
    { label: "Gateway", value: opts.answers.policyGateway },
    { label: "Workflow", value: opts.answers.workflow },
    { label: "Backend", value: opts.answers.backend },
    { label: "Hooks", value: opts.answers.hooks },
    { label: "IDE", value: opts.answers.ide },
    { label: "Recipes", value: opts.answers.recipes.join(", ") || "none" },
    { label: "Blueprints", value: opts.answers.blueprints.join(", ") || "none" },
    { label: "Git init", value: !opts.paths.gitRootExisted },
    { label: "Conflicts", value: opts.plan.conflicts.join(", ") || "none" },
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
  initBaseBranchSelection: InitBaseBranchSelection;
  conflictMode: { backup: boolean; force: boolean };
  conflicts: string[];
  ensureGitRoot: (opts: {
    initRoot: string;
    baseBranchFallback: string;
  }) => Promise<{ gitRoot: string; gitRootExisted: boolean }>;
}): Promise<void> {
  const ensured = await opts.ensureGitRoot({
    initRoot: opts.paths.gitRoot,
    baseBranchFallback: "main",
  });
  const paths = { ...opts.paths, gitRoot: ensured.gitRoot, gitRootExisted: ensured.gitRootExisted };
  await applyInitBaseBranchSelection({
    gitRoot: paths.gitRoot,
    selection: opts.initBaseBranchSelection,
  });
  await handleInitConflicts({
    gitRoot: paths.gitRoot,
    conflicts: opts.conflicts,
    backup: opts.conflictMode.backup,
    force: opts.conflictMode.force,
  });
  await applyInitWithProgress({
    clack: opts.clack,
    includeInstallCommit: !opts.flags.gitignoreAgents,
    plan: {
      config: async () => {
        await ensureAgentplaneDirs(paths.agentplaneDir, opts.answers.backend);
        await writeInitConfig({
          agentplaneDir: paths.agentplaneDir,
          gitRoot: paths.gitRoot,
          workflow: opts.answers.workflow,
          directCloseDirtyPolicy: opts.answers.directCloseDirtyPolicy,
          backendConfigPathAbs: paths.backendPath,
          requirePlanApproval: opts.answers.requirePlanApproval,
          requireNetworkApproval: opts.answers.requireNetworkApproval,
          requireVerifyApproval: opts.answers.requireVerifyApproval,
          execution: buildExecutionProfile(opts.answers.executionProfile, {
            strictUnsafeConfirm: opts.answers.strictUnsafeConfirm,
          }),
        });
        await writeBackendStubs({
          backend: opts.answers.backend,
          backendPath: paths.backendPath,
        });
        if (opts.flags.gitignoreAgents) {
          await setPinnedBaseBranch({
            cwd: paths.gitRoot,
            rootOverride: paths.gitRoot,
            value: opts.initBaseBranchSelection.baseBranch,
          });
        }
      },
      agents: async () => {
        const { installPaths } = await ensureAgentsFiles({
          gitRoot: paths.gitRoot,
          agentplaneDir: paths.agentplaneDir,
          workflow: opts.answers.workflow,
          policyGateway: opts.answers.policyGateway,
          workflowPathAbs: paths.workflowPath,
          backendPathAbs: paths.backendPath,
        });
        if (opts.answers.backend === "redmine") {
          await ensureInitRedmineEnvTemplate({ gitRoot: paths.gitRoot });
          installPaths.push(".env.example");
        }
        if (opts.answers.backend === "cloud") {
          await ensureInitCloudEnvTemplate({ gitRoot: paths.gitRoot });
          installPaths.push(".env.example");
        }
        return installPaths;
      },
      workflow: async () => {
        const workflowInit = await ensureInitWorkflow({
          gitRoot: paths.gitRoot,
          workflowMode: opts.answers.workflow,
          approvals: {
            requirePlanApproval: opts.answers.requirePlanApproval,
            requireVerifyApproval: opts.answers.requireVerifyApproval,
            requireNetworkApproval: opts.answers.requireNetworkApproval,
          },
        });
        return workflowInit.installPaths.map((abs) => path.relative(paths.gitRoot, abs));
      },
      gitignore: async () => {
        await ensureInitGitignore({
          gitRoot: paths.gitRoot,
          includeAgentPromptFiles: opts.flags.gitignoreAgents === true,
        });
        return [".gitignore"];
      },
      hooks: opts.answers.hooks
        ? async () => {
            await cmdHooksInstall({
              cwd: paths.gitRoot,
              rootOverride: paths.gitRoot,
              quiet: true,
            });
            return [".agentplane/bin/agentplane"];
          }
        : undefined,
      ideSync: async () => {
        const ideRes = await maybeSyncIde({
          cwd: paths.gitRoot,
          rootOverride: paths.gitRoot,
          ide: opts.answers.ide,
          gitRoot: paths.gitRoot,
        });
        return ideRes.installPaths;
      },
      recipes: async () => {
        return await import("./recipes.js").then((m) =>
          m.maybeAddCachedRecipes({
            recipes: opts.answers.recipes,
            cwd: paths.gitRoot,
            rootOverride: paths.gitRoot,
          }),
        );
      },
      blueprints: async () => {
        return await import("./blueprints.js").then((m) =>
          m.maybeInstallCachedBlueprints({
            blueprints: opts.answers.blueprints,
            cwd: paths.gitRoot,
            rootOverride: paths.gitRoot,
          }),
        );
      },
      installCommit: async (installPaths) => {
        await ensureInitCommit({
          gitRoot: paths.gitRoot,
          baseBranch: opts.initBaseBranchSelection.baseBranch,
          installPaths: [...installPaths],
          version: getVersion(),
          skipHooks: true,
        });
      },
    },
  });
}
