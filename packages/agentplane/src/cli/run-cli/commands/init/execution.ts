import path from "node:path";

import { buildExecutionProfile } from "@agentplaneorg/core/config";
import { setPinnedBaseBranch } from "@agentplaneorg/core/git";

import { cmdHooksInstall, ensureInitCommit } from "../../../../commands/workflow.js";
import { getVersion } from "../../../../meta/version.js";
import { InitAborted, type InitClackPrompts } from "./prompts.js";
import type { InitParsed, InitPlan } from "./model.js";
import type { InitAnswers } from "./answers.js";
import { applyInitBaseBranchSelection, type InitBaseBranchSelection } from "./base-branch.js";
import { handleInitConflicts } from "./conflicts.js";
import { maybeSyncIde } from "./ide-sync.js";
import { promptConflictResolverStep, applyInitWithProgress } from "./steps/index.js";
import type { InitPromptClack } from "./steps/contracts.js";
import { previewInstall } from "./ui.js";
import { ensureAgentsFiles } from "./write-agents.js";
import { ensureAgentplaneDirs, writeBackendStubs, writeInitConfig } from "./write-config.js";
import { ensureEvaluatorFiles } from "./write-evaluators.js";
import { ensureInitCloudEnvTemplate, ensureInitRedmineEnvTemplate } from "./write-env.js";
import { ensureInitGitignore } from "./write-gitignore.js";
import { ensureInitWorkflow } from "./write-workflow.js";
import { assertConfirmed } from "./answers.js";
import type { ResolvedInitPaths } from "./init-paths.js";

export {
  collectInitAndHookConflicts,
  resolveInitPaths,
  type ResolvedInitPaths,
} from "./init-paths.js";
export {
  buildInitPlan,
  detectGithubCliInstalled,
  GITHUB_CLI_INIT_RECOMMENDATION,
} from "./init-plan.js";

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
    { label: "Feedback issues", value: opts.answers.feedbackGithubIssues },
    { label: "Anonymous feedback fallback", value: opts.answers.feedbackAnonymousCloud },
    { label: "IDE", value: opts.answers.ide },
    { label: "Recipes", value: opts.answers.recipes.join(", ") || "none" },
    { label: "Blueprints", value: opts.answers.blueprints.join(", ") || "none" },
    { label: "Git init", value: !opts.paths.gitRootExisted },
    { label: "Conflicts", value: opts.plan.conflicts.join(", ") || "none" },
    ...(opts.plan.context.githubCliInstalled === false
      ? [{ label: "GitHub CLI", value: "missing; install gh yourself and run gh auth login" }]
      : []),
    ...(opts.plan.warnings.length > 0
      ? [{ label: "Warnings", value: opts.plan.warnings.join(" | ") }]
      : []),
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
          feedbackGithubIssues: opts.answers.feedbackGithubIssues,
          feedbackAnonymousCloud: opts.answers.feedbackAnonymousCloud,
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
      evaluators: async () => {
        const { installPaths } = await ensureEvaluatorFiles({
          gitRoot: paths.gitRoot,
          agentplaneDir: paths.agentplaneDir,
        });
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
