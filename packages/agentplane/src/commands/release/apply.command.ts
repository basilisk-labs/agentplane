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
  commandLabel: string;
}): Promise<boolean> {
  const loaded = await loadConfig(opts.agentplaneDir);
  const pushReason =
    opts.route.kind === "release_candidate"
      ? `${opts.commandLabel} will push current branch ${opts.route.current_branch} to ${opts.remote} as a release candidate for ${opts.nextTag}; final publication remains gated on merge to ${opts.route.base_branch}`
      : `${opts.commandLabel} will push HEAD and ${opts.nextTag} to ${opts.remote}`;
  await ensureNetworkApproved({
    action: opts.route.kind === "release_candidate" ? "release_candidate" : "release_apply",
    config: loaded.config,
    yes: opts.yes,
    reason: `${opts.commandLabel} validates npm version availability and pushes over network`,
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

async function resolveDirectReleaseRoute(opts: {
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
              "pin the protected base branch so release commands can choose between the direct route and the release-candidate route",
            reasonCode: "release_branch_pr_base_unresolved",
          },
        },
      ),
    });
  }

  if (currentBranch !== baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "release apply is not available on branch_pr task branches.\n" +
        "Use `agentplane release candidate` to prepare and optionally push the release candidate branch.",
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "release apply was invoked from a branch_pr candidate branch",
          likelyCause:
            "branch_pr repositories must prepare release candidates on dedicated non-base branches and publish only after merge into the protected base branch",
          nextAction: {
            command: "agentplane release candidate",
            reason:
              "prepare the release candidate on the current branch instead of treating it as a direct publish route",
            reasonCode: "release_apply_branch_pr_candidate_requires_explicit_route",
          },
        },
      ),
    });
  }

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      "release apply is not available in branch_pr mode.\n" +
      "Prepare the release candidate on a dedicated branch, merge it into the protected base branch, then let hosted publish run from main.",
    context: withDiagnosticContext(
      { command: "release apply" },
      {
        state: "release apply was invoked from a branch_pr base checkout",
        likelyCause:
          "branch_pr repositories publish from the merged base branch, so local direct release apply should not act as the publication route",
        nextAction: {
          command: "agentplane release candidate",
          reason:
            "run the explicit release-candidate route from a dedicated non-base branch/worktree before merging to the protected base branch",
          reasonCode: "release_apply_branch_pr_base_requires_candidate_route",
        },
      },
    ),
  });
}

async function resolveReleaseCandidateRoute(opts: {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
}): Promise<ReleaseApplyRoute> {
  const loaded = await loadConfig(opts.agentplaneDir);
  const workflowMode = loaded.config.workflow_mode;
  const currentBranch = await gitCurrentBranch(opts.gitRoot);

  if (workflowMode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "release candidate is only available when workflow_mode=branch_pr.\n" +
        "Use `agentplane release apply` for direct-mode releases.",
      context: withDiagnosticContext(
        { command: "release candidate" },
        {
          state: "release candidate was invoked outside branch_pr mode",
          likelyCause:
            "direct-mode repositories have no protected-base candidate route, so release preparation and publication stay on the direct release path",
          nextAction: {
            command: "agentplane release apply",
            reason:
              "use the direct release route when the repository workflow mode is not branch_pr",
            reasonCode: "release_candidate_requires_branch_pr_mode",
          },
        },
      ),
    });
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
        "Release candidate routing in branch_pr mode requires a resolved base branch.\n" +
        "Pin it with `agentplane branch base set <branch>` or configure origin/HEAD before rerunning.",
      context: withDiagnosticContext(
        { command: "release candidate" },
        {
          state: "branch_pr release-candidate routing could not resolve the protected base branch",
          likelyCause:
            "the candidate route must know which protected branch will eventually receive and publish the release candidate",
          nextAction: {
            command: "agentplane branch base set <branch>",
            reason:
              "pin the protected base branch so release candidate routing can target the correct merge branch",
            reasonCode: "release_candidate_base_unresolved",
          },
        },
      ),
    });
  }

  if (currentBranch === baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "release candidate must run from a dedicated non-base branch/worktree in branch_pr mode.\n" +
        `Current branch ${currentBranch} is the protected base branch ${baseBranch}.`,
      context: withDiagnosticContext(
        { command: "release candidate" },
        {
          state: "release candidate was invoked from the protected base branch",
          likelyCause:
            "branch_pr release candidates must be prepared on a dedicated branch so the hosted PR becomes the promotion boundary into the protected base branch",
          nextAction: {
            command: "agentplane work start <task-id> --agent CODER --slug <slug> --worktree",
            reason:
              "create or switch to a dedicated release-candidate branch/worktree before preparing the candidate",
            reasonCode: "release_candidate_requires_non_base_branch",
          },
        },
      ),
    });
  }

  return {
    kind: "release_candidate",
    workflow_mode: workflowMode,
    current_branch: currentBranch,
    base_branch: baseBranch,
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
    opts.route.kind === "release_candidate"
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
    if (opts.route.kind === "release_candidate") {
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
  } else if (opts.route.kind === "release_candidate") {
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
  summary: "Apply a prepared direct-mode release: bump versions, validate notes, commit, and tag.",
  description:
    "Applies a release plan generated by `agentplane release plan` on the direct release route. This command does not author release notes; it expects a DOCS agent to have written docs/releases/vX.Y.Z.md. In branch_pr repositories, use `agentplane release candidate` on a dedicated non-base branch instead.",
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
        "(requires --yes). This is for the direct release route only.",
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

export const releaseCandidateSpec: CommandSpec<ReleaseApplyParsed> = {
  id: ["release", "candidate"],
  group: "Release",
  summary:
    "Prepare a branch_pr release candidate: bump versions, validate notes, commit, and optionally push the candidate branch.",
  description:
    "Prepares a release candidate from a generated release plan on a dedicated non-base branch in branch_pr mode. This command creates the candidate commit but intentionally does not create or push the release tag; final publication remains gated on merge to the protected base branch and hosted publish from main.",
  options: releaseApplySpec.options,
  parse: releaseApplySpec.parse,
  validate: (p) => {
    if (p.push && p.yes !== true) {
      throw usageError({
        spec: releaseCandidateSpec,
        command: "release candidate",
        message: "Option --push requires explicit approval. Re-run with --yes.",
      });
    }
    if (!p.remote.trim()) {
      throw usageError({
        spec: releaseCandidateSpec,
        command: "release candidate",
        message: "Option --remote must be non-empty.",
      });
    }
  },
  examples: [
    {
      cmd: "agentplane release candidate",
      why: "Prepare the latest release plan on the current branch_pr candidate branch.",
    },
    {
      cmd: "agentplane release candidate --plan .agentplane/.release/plan/<runId>",
      why: "Prepare a specific release plan on the current candidate branch.",
    },
    {
      cmd: "agentplane release candidate --push --yes",
      why: "Prepare and push only the release candidate branch for hosted review and merge.",
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
        route: await resolveDirectReleaseRoute({
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
          commandLabel: "release apply --push",
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

export const runReleaseCandidate: CommandHandler<ReleaseApplyParsed> = async (ctx, flags) => {
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
        route: await resolveReleaseCandidateRoute({
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
          spec: releaseCandidateSpec,
          command: "release candidate",
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
          commandLabel: "release candidate --push",
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
