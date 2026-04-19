import path from "node:path";

import {
  extractTaskSuffix,
  loadConfig,
  resolveProject,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { createCliEmitter, emitCommandResult } from "../../cli/output.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { GitContext } from "../shared/git-context.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureNetworkApproved } from "../shared/network-approval.js";
import { runOperatorPipeline } from "../shared/operator-pipeline.js";
import { parseTaskIdFromBranch } from "../shared/git-worktree.js";
import {
  cleanHookEnv,
  maybePersistExpectedCliVersion,
  maybeRefreshGeneratedReference,
  maybeUpdateBunLockfile,
  replaceAgentplanePackageMetadata,
  replacePackageDependencyVersion,
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
  readAgentplaneDependencyVersion,
  readCoreDependencyVersion,
  readPackageVersion,
  readRecipesDependencyVersion,
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
  ReleaseCommandMutation,
  ReleaseCommandRouteResolver,
  ReleaseCommandState,
  ReleaseVersionPlan,
} from "./apply.types.js";

const output = createCliEmitter();

function emitReleaseLine(text: string): void {
  emitCommandResult(output, { kind: "line", text });
}

async function resolveReleasePlanInputs(opts: { gitRoot: string; planOverride?: string }): Promise<{
  planDir: string;
  plan: ReleaseVersionPlan;
  notesPath: string;
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

  return { planDir, plan, notesPath };
}

async function ensureReleasePlanMatchesRepoState(opts: {
  gitRoot: string;
  plan: ReleaseVersionPlan;
  corePkgPath: string;
  agentplanePkgPath: string;
  recipesPkgPath: string;
  testkitPkgPath: string;
  commandLabel: "release apply" | "release candidate";
}): Promise<void> {
  const [
    coreVersion,
    agentplaneVersion,
    recipesVersion,
    coreDependencyVersion,
    recipesDependencyVersion,
  ] = await Promise.all([
    readPackageVersion(opts.corePkgPath),
    readPackageVersion(opts.agentplanePkgPath),
    readPackageVersion(opts.recipesPkgPath),
    readCoreDependencyVersion(opts.agentplanePkgPath),
    readRecipesDependencyVersion(opts.agentplanePkgPath),
  ]);
  if (coreVersion !== agentplaneVersion || coreVersion !== recipesVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Package versions must match before applying a release. ` +
        `packages/core=${coreVersion} packages/agentplane=${agentplaneVersion} packages/recipes=${recipesVersion}`,
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
  if (recipesDependencyVersion !== coreVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release dependency parity check failed before apply. " +
        `packages/agentplane dependency @agentplaneorg/recipes=${recipesDependencyVersion} ` +
        `must match packages/recipes version ${coreVersion}.`,
    });
  }
  if (await fileExists(opts.testkitPkgPath)) {
    const testkitAgentplaneDependencyVersion = await readAgentplaneDependencyVersion(
      opts.testkitPkgPath,
    );
    if (testkitAgentplaneDependencyVersion !== agentplaneVersion) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          "Release dependency parity check failed before apply. " +
          `packages/testkit dependency agentplane=${testkitAgentplaneDependencyVersion} ` +
          `must match packages/agentplane version ${agentplaneVersion}.`,
      });
    }
  }

  await ensureCleanTrackedTree(opts.gitRoot, opts.commandLabel);
  await ensureTagDoesNotExist(opts.gitRoot, opts.plan.nextTag, opts.commandLabel);
  if (coreVersion !== opts.plan.prevVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Current version does not match the release-plan baseline. ` +
        `current=${coreVersion} expected_prev=${opts.plan.prevVersion} expected_next=${opts.plan.nextVersion}\n` +
        "Re-run `agentplane release plan` to generate a fresh plan for this repo state.",
      context: withDiagnosticContext(
        { command: opts.commandLabel },
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
  await ensureRemoteExists(opts.gitRoot, opts.remote, opts.commandLabel as "release apply" | "release candidate");
  await ensureRemoteTagDoesNotExist(
    opts.gitRoot,
    opts.remote,
    opts.nextTag,
    opts.commandLabel as "release apply" | "release candidate",
  );
  await ensureNpmVersionsAvailable(
    opts.gitRoot,
    opts.nextVersion,
    opts.commandLabel as "release apply" | "release candidate",
  );
  await runReleasePrepublishGate(
    opts.gitRoot,
    opts.commandLabel as "release apply" | "release candidate",
  );
  return true;
}

async function applyReleaseMutation(opts: {
  agentplaneDir: string;
  gitRoot: string;
  git: GitContext;
  notesPath: string;
  corePkgPath: string;
  agentplanePkgPath: string;
  recipesPkgPath: string;
  testkitPkgPath: string;
  nextTag: string;
  nextVersion: string;
  route: ReleaseApplyRoute;
  taskBranchPrefix: string;
}): Promise<ReleaseCommandMutation> {
  let releaseCommit: { hash: string; subject: string } | null = null;
  await Promise.all([
    replacePackageVersionInFile(opts.corePkgPath, opts.nextVersion),
    replacePackageVersionInFile(opts.recipesPkgPath, opts.nextVersion),
    replaceAgentplanePackageMetadata(opts.agentplanePkgPath, opts.nextVersion),
  ]);
  if (await fileExists(opts.testkitPkgPath)) {
    await replacePackageDependencyVersion(opts.testkitPkgPath, "agentplane", opts.nextVersion);
  }

  const expectedCliVersionPersisted = await maybePersistExpectedCliVersion(
    opts.agentplaneDir,
    opts.nextVersion,
  );
  await maybeUpdateBunLockfile(opts.gitRoot, fileExists);
  const generatedReferenceExists = await maybeRefreshGeneratedReference(opts.gitRoot, fileExists);

  const stagePaths = [
    "packages/core/package.json",
    "packages/agentplane/package.json",
    "packages/recipes/package.json",
    path.relative(opts.gitRoot, opts.notesPath),
  ];
  if (await fileExists(opts.testkitPkgPath)) {
    stagePaths.push("packages/testkit/package.json");
  }
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
    emitReleaseLine("No changes to commit.");
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
    emitReleaseLine(`Release tag created: ${opts.plan.nextTag}`);
  } else {
    emitReleaseLine(
      `Release candidate prepared on ${opts.route.current_branch}; skipped local tag creation for ${opts.plan.nextTag} because final publication is deferred until merge to ${opts.route.base_branch}.`,
    );
  }
  if (opts.push) {
    if (opts.route.kind === "release_candidate") {
      await pushReleaseCandidateBranch(opts.gitRoot, opts.remote);
      pushedRefs.push("HEAD");
      emitReleaseLine(
        `Pushed: ${opts.remote} ${opts.route.current_branch} (release candidate branch only; no tag pushed)`,
      );
    } else {
      await pushReleaseRefs(opts.gitRoot, opts.remote, opts.plan.nextTag);
      pushedRefs.push("HEAD", opts.plan.nextTag);
      emitReleaseLine(`Pushed: ${opts.remote} HEAD + ${opts.plan.nextTag}`);
    }
  } else if (opts.route.kind === "release_candidate") {
    emitReleaseLine(
      `Next: git push <remote> HEAD  # merge ${opts.route.current_branch} into ${opts.route.base_branch} before publishing ${opts.plan.nextTag}`,
    );
  } else {
    emitReleaseLine(`Next: git push <remote> HEAD && git push <remote> ${opts.plan.nextTag}`);
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
  emitReleaseLine(`Release report: ${path.relative(opts.gitRoot, reportPath)}`);
  return 0;
}

async function buildReleaseCommandState(opts: {
  cwd: string;
  rootOverride?: string | null;
  planOverride?: string;
  routeResolver: ReleaseCommandRouteResolver;
}): Promise<ReleaseCommandState> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const gitRoot = resolved.gitRoot;
  const { planDir, plan, notesPath } = await resolveReleasePlanInputs({
    gitRoot,
    planOverride: opts.planOverride,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);

  return {
    resolved,
    gitRoot,
    planDir,
    plan,
    notesPath,
    taskBranchPrefix: loaded.config.branch.task_prefix,
    route: await opts.routeResolver({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      gitRoot,
      agentplaneDir: resolved.agentplaneDir,
    }),
    corePkgPath: path.join(gitRoot, "packages", "core", "package.json"),
    agentplanePkgPath: path.join(gitRoot, "packages", "agentplane", "package.json"),
    recipesPkgPath: path.join(gitRoot, "packages", "recipes", "package.json"),
    testkitPkgPath: path.join(gitRoot, "packages", "testkit", "package.json"),
    npmVersionChecked: false,
  };
}

function assertReleaseBumpApproved(opts: {
  flags: ReleaseApplyParsed;
  plan: ReleaseVersionPlan;
  spec: CommandSpec<ReleaseApplyParsed>;
  commandLabel: string;
}): void {
  if ((opts.plan.bump === "minor" || opts.plan.bump === "major") && opts.flags.yes !== true) {
    throw usageError({
      spec: opts.spec,
      command: opts.commandLabel,
      message: `Bump '${opts.plan.bump}' requires explicit approval. Re-run with --yes.`,
    });
  }
}

async function runReleaseCommandPreflight(opts: {
  state: ReleaseCommandState;
  flags: ReleaseApplyParsed;
  spec: CommandSpec<ReleaseApplyParsed>;
  commandLabel: string;
}): Promise<void> {
  assertReleaseBumpApproved({
    flags: opts.flags,
    plan: opts.state.plan,
    spec: opts.spec,
    commandLabel: opts.commandLabel,
  });

  await ensureReleasePlanMatchesRepoState({
    gitRoot: opts.state.gitRoot,
    plan: opts.state.plan,
    corePkgPath: opts.state.corePkgPath,
    agentplanePkgPath: opts.state.agentplanePkgPath,
    recipesPkgPath: opts.state.recipesPkgPath,
    testkitPkgPath: opts.state.testkitPkgPath,
    commandLabel: opts.commandLabel as "release apply" | "release candidate",
  });

  if (opts.flags.push) {
    opts.state.npmVersionChecked = await runPushPreflight({
      agentplaneDir: opts.state.resolved.agentplaneDir,
      gitRoot: opts.state.gitRoot,
      remote: opts.flags.remote,
      nextTag: opts.state.plan.nextTag,
      nextVersion: opts.state.plan.nextVersion,
      route: opts.state.route,
      yes: opts.flags.yes,
      commandLabel: `${opts.commandLabel} --push`,
    });
  }
}

async function runReleaseCommandExecute(
  state: ReleaseCommandState,
): Promise<ReleaseCommandMutation> {
  const git = new GitContext({ gitRoot: state.gitRoot });
  return await applyReleaseMutation({
    agentplaneDir: state.resolved.agentplaneDir,
    gitRoot: state.gitRoot,
    git,
    notesPath: state.notesPath,
    corePkgPath: state.corePkgPath,
    agentplanePkgPath: state.agentplanePkgPath,
    recipesPkgPath: state.recipesPkgPath,
    testkitPkgPath: state.testkitPkgPath,
    nextTag: state.plan.nextTag,
    nextVersion: state.plan.nextVersion,
    route: state.route,
    taskBranchPrefix: state.taskBranchPrefix,
  });
}

async function runReleaseCommandFinalize(opts: {
  state: ReleaseCommandState;
  mutation: ReleaseCommandMutation;
  flags: ReleaseApplyParsed;
}): Promise<number> {
  return await finalizeReleaseApply({
    gitRoot: opts.state.gitRoot,
    planDir: opts.state.planDir,
    notesPath: opts.state.notesPath,
    plan: opts.state.plan,
    npmVersionChecked: opts.state.npmVersionChecked,
    releaseCommit: opts.mutation.releaseCommit,
    route: opts.state.route,
    push: opts.flags.push,
    remote: opts.flags.remote,
  });
}

export async function runReleaseCommandPipeline(opts: {
  ctx: { cwd: string; rootOverride?: string | null };
  flags: ReleaseApplyParsed;
  spec: CommandSpec<ReleaseApplyParsed>;
  commandLabel: string;
  routeResolver: ReleaseCommandRouteResolver;
}): Promise<number> {
  return await runOperatorPipeline({
    init: async () =>
      await buildReleaseCommandState({
        cwd: opts.ctx.cwd,
        rootOverride: opts.ctx.rootOverride ?? null,
        planOverride: opts.flags.plan,
        routeResolver: opts.routeResolver,
      }),
    preflight: async (state) =>
      await runReleaseCommandPreflight({
        state,
        flags: opts.flags,
        spec: opts.spec,
        commandLabel: opts.commandLabel,
      }),
    execute: async (state) => await runReleaseCommandExecute(state),
    finalize: async (state, mutation) =>
      await runReleaseCommandFinalize({
        state,
        mutation,
        flags: opts.flags,
      }),
  });
}

export type ReleaseApplyRouteResolverArgs = {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
};

export type ReleaseApplyResolvedProject = ResolvedProject;

export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.reporting.js";
