import path from "node:path";

import {
  extractTaskSuffix,
  loadConfig,
  resolveBaseBranch,
  resolveProject,
} from "@agentplaneorg/core";

import { createCliEmitter } from "../../cli/output.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { GitContext } from "../shared/git-context.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { parseTaskIdFromBranch } from "../shared/git-worktree.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureNetworkApproved } from "../shared/network-approval.js";
import { runOperatorPipeline } from "../shared/operator-pipeline.js";
import {
  cleanHookEnv,
  maybePersistExpectedCliVersion,
  maybeRefreshGeneratedReference,
  maybeUpdateBunLockfile,
  replaceAgentplanePackageMetadata,
  replacePackageVersionInFile,
} from "./apply.mutation.js";
import {
  ensureCleanTrackedTree,
  ensureNpmVersionsAvailable,
  ensureRemoteExists,
  ensureRemoteTagDoesNotExist,
  ensureTagDoesNotExist,
  fileExists,
  loadReleasePlan,
  readCoreDependencyVersion,
  readPackageVersion,
  runReleasePrepublishGate,
  validateReleaseNotes,
} from "./apply.preflight.js";
import {
  pushReleaseCandidateBranch,
  pushReleaseRefs,
  writeReleaseApplyReport,
} from "./apply.reporting.js";
import type {
  ReleaseApplyParsed,
  ReleaseApplyReport,
  ReleaseApplyRoute,
  ReleaseVersionPlan,
} from "./apply.types.js";
const output = createCliEmitter();

async function resolveReleasePlanInputs(opts: { gitRoot: string; planOverride?: string }): Promise<{
  planDir: string;
  plan: ReleaseVersionPlan;
  notesPath: string;
  minBullets: number;
}> {
  const { planDir, plan, minBullets } = await loadReleasePlan({
    gitRoot: opts.gitRoot,
    planOverride: opts.planOverride,
  });

  if (!/^v\d+\.\d+\.\d+$/u.test(plan.nextTag)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid nextTag in version.json (expected vX.Y.Z): ${plan.nextTag}`,
    });
  }

  const notesPath = path.join(opts.gitRoot, "docs", "releases", `${plan.nextTag}.md`);
  if (!(await fileExists(notesPath))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        `Missing release notes: ${path.relative(opts.gitRoot, notesPath)}\n` +
        "Write this file using a DOCS agent before applying the release.",
    });
  }
  await validateReleaseNotes(notesPath, minBullets);

  return { planDir, plan, notesPath, minBullets };
}

async function ensureReleasePlanMatchesRepoState(opts: {
  gitRoot: string;
  plan: ReleaseVersionPlan;
  corePkgPath: string;
  agentplanePkgPath: string;
}): Promise<void> {
  const [coreVersion, agentplaneVersion, coreDependencyVersion] = await Promise.all([
    readPackageVersion(opts.corePkgPath),
    readPackageVersion(opts.agentplanePkgPath),
    readCoreDependencyVersion(opts.agentplanePkgPath),
  ]);
  if (coreVersion !== agentplaneVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Package versions must match before applying a release. ` +
        `packages/core=${coreVersion} packages/agentplane=${agentplaneVersion}`,
    });
  }
  if (coreDependencyVersion !== coreVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release dependency parity check failed before apply. " +
        `packages/agentplane dependency @agentplaneorg/core=${coreDependencyVersion} ` +
        `must match packages/core version ${coreVersion}.`,
    });
  }

  await ensureCleanTrackedTree(opts.gitRoot);
  await ensureTagDoesNotExist(opts.gitRoot, opts.plan.nextTag);
  if (coreVersion !== opts.plan.prevVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Current version does not match the release-plan baseline. ` +
        `current=${coreVersion} expected_prev=${opts.plan.prevVersion} expected_next=${opts.plan.nextVersion}\n` +
        "Re-run `agentplane release plan` to generate a fresh plan for this repo state.",
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "the repository version no longer matches the prepared release-plan baseline",
          likelyCause:
            "package versions changed after the plan was generated, so continuing would apply the release over a partially drifted local state",
          nextAction: {
            command: "agentplane release plan",
            reason:
              "generate a fresh release plan from the current repository state before applying the release",
            reasonCode: "release_plan_drifted",
          },
        },
      ),
    });
  }
}

async function runPushPreflight(opts: {
  agentplaneDir: string;
  gitRoot: string;
  remote: string;
  nextTag: string;
  nextVersion: string;
  route: ReleaseApplyRoute;
  yes: boolean;
}): Promise<boolean> {
  const loaded = await loadConfig(opts.agentplaneDir);
  const pushReason =
    opts.route.kind === "branch_pr_candidate"
      ? `release apply --push will push current branch ${opts.route.current_branch} to ${opts.remote} as a release candidate for ${opts.nextTag}; final publication stays deferred until merge to ${opts.route.base_branch}`
      : `release apply --push will push HEAD and ${opts.nextTag} to ${opts.remote}`;
  await ensureNetworkApproved({
    action: "release_apply",
    config: loaded.config,
    yes: opts.yes,
    reason: "release apply --push validates npm version availability and pushes over network",
    interactive: Boolean(process.stdin.isTTY),
  });
  await ensureActionApproved({
    action: "git_push",
    config: loaded.config,
    yes: opts.yes,
    reason: pushReason,
    interactive: Boolean(process.stdin.isTTY),
  });
  await ensureRemoteExists(opts.gitRoot, opts.remote);
  await ensureRemoteTagDoesNotExist(opts.gitRoot, opts.remote, opts.nextTag);
  await ensureNpmVersionsAvailable(opts.gitRoot, opts.nextVersion);
  await runReleasePrepublishGate(opts.gitRoot);
  return true;
}

async function resolveReleaseApplyRoute(opts: {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
}): Promise<ReleaseApplyRoute> {
  const loaded = await loadConfig(opts.agentplaneDir);
  const workflowMode = loaded.config.workflow_mode;
  const currentBranch = await gitCurrentBranch(opts.gitRoot);

  if (workflowMode !== "branch_pr") {
    return {
      kind: "direct_release",
      workflow_mode: workflowMode,
      current_branch: currentBranch,
      base_branch: null,
      final_publish_deferred: false,
    };
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    mode: workflowMode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release apply in branch_pr mode requires a resolved base branch.\n" +
        "Pin it with `agentplane branch base set <branch>` or configure origin/HEAD before rerunning.",
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "branch_pr release routing could not resolve the protected base branch",
          likelyCause:
            "the release flow needs to know whether this checkout is the protected base branch or a task branch before deciding if it should create or push a release tag",
          nextAction: {
            command: "agentplane branch base set <branch>",
            reason:
              "pin the protected base branch so release apply can choose between direct publish and task-branch candidate mode",
            reasonCode: "release_branch_pr_base_unresolved",
          },
        },
      ),
    });
  }

  if (currentBranch !== baseBranch) {
    return {
      kind: "branch_pr_candidate",
      workflow_mode: workflowMode,
      current_branch: currentBranch,
      base_branch: baseBranch,
      final_publish_deferred: true,
    };
  }

  return {
    kind: "direct_release",
    workflow_mode: workflowMode,
    current_branch: currentBranch,
    base_branch: baseBranch,
    final_publish_deferred: false,
  };
}

async function applyReleaseMutation(opts: {
  agentplaneDir: string;
  gitRoot: string;
  git: GitContext;
  notesPath: string;
  corePkgPath: string;
  agentplanePkgPath: string;
  nextTag: string;
  nextVersion: string;
  route: ReleaseApplyRoute;
  taskBranchPrefix: string;
}): Promise<{ releaseCommit: { hash: string; subject: string } | null }> {
  let releaseCommit: { hash: string; subject: string } | null = null;
  await Promise.all([
    replacePackageVersionInFile(opts.corePkgPath, opts.nextVersion),
    replaceAgentplanePackageMetadata(opts.agentplanePkgPath, opts.nextVersion),
  ]);

  const expectedCliVersionPersisted = await maybePersistExpectedCliVersion(
    opts.agentplaneDir,
    opts.nextVersion,
  );
  await maybeUpdateBunLockfile(opts.gitRoot, fileExists);
  const generatedReferenceExists = await maybeRefreshGeneratedReference(opts.gitRoot, fileExists);

  const stagePaths = [
    "packages/core/package.json",
    "packages/agentplane/package.json",
    path.relative(opts.gitRoot, opts.notesPath),
  ];
  if (expectedCliVersionPersisted) {
    stagePaths.push(".agentplane/config.json");
  }
  if (generatedReferenceExists) {
    stagePaths.push("docs/reference/generated-reference.mdx");
  }
  if (await fileExists(path.join(opts.gitRoot, "bun.lock"))) {
    stagePaths.push("bun.lock");
  }
  await opts.git.stage(stagePaths);

  const staged = await opts.git.statusStagedPaths();
  if (staged.length === 0) {
    output.line("No changes to commit.");
    return { releaseCommit };
  }

  const taskId =
    opts.route.kind === "branch_pr_candidate"
      ? parseTaskIdFromBranch(opts.taskBranchPrefix, opts.route.current_branch)
      : null;
  const subject = taskId
    ? `✨ ${extractTaskSuffix(taskId)} release: publish ${opts.nextTag}`
    : `✨ release: publish ${opts.nextTag}`;
  await opts.git.commit({ message: subject, env: cleanHookEnv() });
  const { stdout: headHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  releaseCommit = { hash: String(headHash ?? "").trim(), subject };
  return { releaseCommit };
}

async function finalizeReleaseApply(opts: {
  gitRoot: string;
  planDir: string;
  notesPath: string;
  plan: ReleaseVersionPlan;
  npmVersionChecked: boolean;
  releaseCommit: { hash: string; subject: string } | null;
  route: ReleaseApplyRoute;
  push: boolean;
  remote: string;
}): Promise<number> {
  const tagCreated = opts.route.kind === "direct_release";
  const pushedRefs: string[] = [];
  if (tagCreated) {
    await execFileAsync("git", ["tag", opts.plan.nextTag], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    output.line(`Release tag created: ${opts.plan.nextTag}`);
  } else {
    output.line(
      `Release candidate prepared on ${opts.route.current_branch}; skipped local tag creation for ${opts.plan.nextTag} because final publication is deferred until merge to ${opts.route.base_branch}.`,
    );
  }
  if (opts.push) {
    if (opts.route.kind === "branch_pr_candidate") {
      await pushReleaseCandidateBranch(opts.gitRoot, opts.remote);
      pushedRefs.push("HEAD");
      output.line(
        `Pushed: ${opts.remote} ${opts.route.current_branch} (release candidate branch only; no tag pushed)`,
      );
    } else {
      await pushReleaseRefs(opts.gitRoot, opts.remote, opts.plan.nextTag);
      pushedRefs.push("HEAD", opts.plan.nextTag);
      output.line(`Pushed: ${opts.remote} HEAD + ${opts.plan.nextTag}`);
    }
  } else if (opts.route.kind === "branch_pr_candidate") {
    output.line(
      `Next: git push <remote> HEAD  # merge ${opts.route.current_branch} into ${opts.route.base_branch} before publishing ${opts.plan.nextTag}`,
    );
  } else {
    output.line(`Next: git push <remote> HEAD && git push <remote> ${opts.plan.nextTag}`);
  }

  const reportPath = await writeReleaseApplyReport(opts.gitRoot, {
    applied_at: new Date().toISOString(),
    plan_dir: path.relative(opts.gitRoot, opts.planDir),
    notes_path: path.relative(opts.gitRoot, opts.notesPath),
    prev_version: opts.plan.prevVersion,
    next_version: opts.plan.nextVersion,
    prev_tag: opts.plan.prevTag,
    next_tag: opts.plan.nextTag,
    bump: opts.plan.bump,
    checks: {
      clean_tracked_tree: true,
      tag_absent: true,
      notes_validated: true,
      npm_version_available_checked: opts.npmVersionChecked,
    },
    commit: opts.releaseCommit,
    route: opts.route,
    tag: {
      name: opts.plan.nextTag,
      created: tagCreated,
      pushed: tagCreated && opts.push,
    },
    push: {
      requested: opts.push,
      remote: opts.remote,
      performed: pushedRefs.length > 0,
      refs: pushedRefs,
    },
  } satisfies ReleaseApplyReport);
  output.line(`Release report: ${path.relative(opts.gitRoot, reportPath)}`);
  return 0;
}

export const releaseApplySpec: CommandSpec<ReleaseApplyParsed> = {
  id: ["release", "apply"],
  group: "Release",
  summary: "Apply a prepared release: bump versions, validate notes, commit, and tag.",
  description:
    "Applies a release plan generated by `agentplane release plan`. This command does not author release notes; it expects a DOCS agent to have written docs/releases/vX.Y.Z.md. By default it applies a patch bump; minor/major bumps require explicit approval.",
  options: [
    {
      kind: "string",
      name: "plan",
      valueHint: "<path>",
      description:
        "Path to a release plan directory (defaults to the latest under .agentplane/.release/plan/).",
    },
    {
      kind: "boolean",
      name: "push",
      default: false,
      description:
        "Optional direct-push mode: push the release commit and tag immediately " +
        "(requires --yes). Leave this off when publishing happens later from a protected branch workflow.",
    },
    {
      kind: "string",
      name: "remote",
      valueHint: "<name>",
      description: "Git remote to push to (default: origin).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description:
        "Approve minor/major bumps and allow pushing. Patch bumps can be applied without this flag.",
    },
  ],
  parse: (raw) => {
    return {
      plan: raw.opts.plan as string | undefined,
      push: raw.opts.push === true,
      remote: (raw.opts.remote as string | undefined) ?? "origin",
      yes: raw.opts.yes === true,
    };
  },
  validate: (p) => {
    if (p.push && p.yes !== true) {
      throw usageError({
        spec: releaseApplySpec,
        command: "release apply",
        message: "Option --push requires explicit approval. Re-run with --yes.",
      });
    }
    if (!p.remote.trim()) {
      throw usageError({
        spec: releaseApplySpec,
        command: "release apply",
        message: "Option --remote must be non-empty.",
      });
    }
  },
  examples: [
    {
      cmd: "agentplane release apply",
      why: "Apply the latest release plan locally (expects docs/releases/vX.Y.Z.md to exist).",
    },
    {
      cmd: "agentplane release apply --plan .agentplane/.release/plan/<runId>",
      why: "Apply a specific release plan directory.",
    },
    {
      cmd: "agentplane release apply --push --yes",
      why: "Apply and push the release commit+tag to the remote.",
    },
  ],
};

export const runReleaseApply: CommandHandler<ReleaseApplyParsed> = async (ctx, flags) => {
  return await runOperatorPipeline({
    init: async () => {
      const resolved = await resolveProject({
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
      });
      const gitRoot = resolved.gitRoot;
      const { planDir, plan, notesPath } = await resolveReleasePlanInputs({
        gitRoot,
        planOverride: flags.plan,
      });
      const loaded = await loadConfig(resolved.agentplaneDir);
      return {
        resolved,
        gitRoot,
        planDir,
        plan,
        notesPath,
        taskBranchPrefix: loaded.config.branch.task_prefix,
        route: await resolveReleaseApplyRoute({
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride ?? null,
          gitRoot,
          agentplaneDir: resolved.agentplaneDir,
        }),
        corePkgPath: path.join(gitRoot, "packages", "core", "package.json"),
        agentplanePkgPath: path.join(gitRoot, "packages", "agentplane", "package.json"),
        npmVersionChecked: false,
      };
    },
    preflight: async (state) => {
      if ((state.plan.bump === "minor" || state.plan.bump === "major") && flags.yes !== true) {
        throw usageError({
          spec: releaseApplySpec,
          command: "release apply",
          message: `Bump '${state.plan.bump}' requires explicit approval. Re-run with --yes.`,
        });
      }

      await ensureReleasePlanMatchesRepoState({
        gitRoot: state.gitRoot,
        plan: state.plan,
        corePkgPath: state.corePkgPath,
        agentplanePkgPath: state.agentplanePkgPath,
      });

      if (flags.push) {
        state.npmVersionChecked = await runPushPreflight({
          agentplaneDir: state.resolved.agentplaneDir,
          gitRoot: state.gitRoot,
          remote: flags.remote,
          nextTag: state.plan.nextTag,
          nextVersion: state.plan.nextVersion,
          route: state.route,
          yes: flags.yes,
        });
      }
    },
    execute: async (state) => {
      const git = new GitContext({ gitRoot: state.gitRoot });
      return await applyReleaseMutation({
        agentplaneDir: state.resolved.agentplaneDir,
        gitRoot: state.gitRoot,
        git,
        notesPath: state.notesPath,
        corePkgPath: state.corePkgPath,
        agentplanePkgPath: state.agentplanePkgPath,
        nextTag: state.plan.nextTag,
        nextVersion: state.plan.nextVersion,
        route: state.route,
        taskBranchPrefix: state.taskBranchPrefix,
      });
    },
    finalize: async (state, mutation) =>
      await finalizeReleaseApply({
        gitRoot: state.gitRoot,
        planDir: state.planDir,
        notesPath: state.notesPath,
        plan: state.plan,
        npmVersionChecked: state.npmVersionChecked,
        releaseCommit: mutation.releaseCommit,
        route: state.route,
        push: flags.push,
        remote: flags.remote,
      }),
  });
};

export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.reporting.js";
