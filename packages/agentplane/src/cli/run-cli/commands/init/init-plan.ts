import { runProcess } from "@agentplaneorg/core/process";

import { getVersion } from "../../../../meta/version.js";
import type { InitAnswers } from "./answers.js";
import { initRel, type ResolvedInitPaths } from "./init-paths.js";
import type { InitEffect, InitPlan } from "./model.js";
import { setupProfileToUserFacingProfile } from "./modes.js";

export const GITHUB_CLI_INIT_RECOMMENDATION =
  "GitHub CLI (gh) is recommended for branch_pr PR merges. Install it yourself (macOS: `brew install gh`; Windows: `winget install --id GitHub.cli`; Linux: see `https://cli.github.com/manual/installation`), then run `gh auth login`. AgentPlane will not install it for you; explicit GH_TOKEN/GITHUB_TOKEN can be used as the API fallback.";

export async function detectGithubCliInstalled(cwd: string): Promise<boolean> {
  try {
    await runProcess({
      command: "gh",
      args: ["--version"],
      cwd,
      encoding: "utf8",
      stdout: "ignore",
      stderr: "ignore",
      timeoutMs: 3000,
    });
    return true;
  } catch {
    return false;
  }
}

function initWriteEffects(opts: { paths: ResolvedInitPaths; answers: InitAnswers }): InitEffect[] {
  const gateway = opts.answers.policyGateway === "claude" ? "CLAUDE.md" : "AGENTS.md";
  const effects: InitEffect[] = [
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
      path: initRel(opts.paths.gitRoot, opts.paths.backendPath),
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
      path: ".agentplane/evaluators/recovery-context.md",
      summary: "Write evaluator prompt module catalog",
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
  githubCliInstalled?: boolean | null;
}): InitPlan {
  const hasConflictStrategy = opts.conflictMode.backup || opts.conflictMode.force;
  const conflictEffects: InitEffect[] = hasConflictStrategy
    ? opts.conflicts.map((conflict) => ({
        kind: opts.conflictMode.backup ? "backup_path" : "delete_path",
        path: initRel(opts.paths.gitRoot, conflict),
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
  const githubCliInstalled =
    opts.answers.workflow === "branch_pr" ? (opts.githubCliInstalled ?? null) : null;
  const warnings = [
    ...(opts.conflicts.length > 0 && !hasConflictStrategy
      ? ["Conflicts require --backup or --force before apply."]
      : []),
    ...(opts.answers.workflow === "branch_pr" && githubCliInstalled === false
      ? [GITHUB_CLI_INIT_RECOMMENDATION]
      : []),
  ];
  const nextSteps = [
    ...(opts.answers.workflow === "branch_pr" && githubCliInstalled === false
      ? ["Install GitHub CLI yourself, then run `gh auth login`."]
      : []),
    "agentplane quickstart",
    'agentplane task new --title "Trace first AI-assisted change" --owner CODER --tag code',
  ];
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
      feedbackGithubIssues: opts.answers.feedbackGithubIssues,
      feedbackAnonymousCloud: opts.answers.feedbackAnonymousCloud,
      executionProfile: opts.answers.executionProfile,
      strictUnsafeConfirm: opts.answers.strictUnsafeConfirm,
      recipes: [...opts.answers.recipes],
      blueprints: [...opts.answers.blueprints],
    },
    context: {
      gitRootExisted: opts.paths.gitRootExisted,
      parentGitRoot: opts.paths.parentGitRoot,
      outputMode: opts.outputMode,
      githubCliInstalled,
    },
    effects,
    conflicts: opts.conflicts.map((conflict) => initRel(opts.paths.gitRoot, conflict)),
    warnings,
    nextSteps,
  };
}
