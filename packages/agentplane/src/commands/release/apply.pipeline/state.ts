import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { ensureCleanTrackedTree, ensureTagDoesNotExist } from "../apply.preflight.git.js";
import { fileExists, loadReleasePlan } from "../apply.preflight.plan.js";
import {
  readCoreDependencyVersion,
  readOptionalAgentplaneDependencyVersion,
  readPackageVersion,
  readRecipesDependencyVersion,
  validateReleaseNotes,
} from "../apply.preflight.package.js";
import type {
  ReleaseApplyRoute,
  ReleaseCommandRouteResolver,
  ReleaseCommandState,
  ReleaseVersionPlan,
} from "../apply.types.js";

export async function resolveReleasePlanInputs(opts: {
  gitRoot: string;
  planOverride?: string;
}): Promise<{
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

export async function ensureReleasePlanMatchesRepoState(opts: {
  gitRoot: string;
  plan: ReleaseVersionPlan;
  route: ReleaseApplyRoute;
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
    const testkitAgentplaneDependencyVersion = await readOptionalAgentplaneDependencyVersion(
      opts.testkitPkgPath,
    );
    if (
      testkitAgentplaneDependencyVersion &&
      testkitAgentplaneDependencyVersion !== agentplaneVersion
    ) {
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
  await ensureReleasePlanBaseMatchesRepoState({
    gitRoot: opts.gitRoot,
    plan: opts.plan,
    route: opts.route,
    commandLabel: opts.commandLabel,
  });
}

async function ensureReleasePlanBaseMatchesRepoState(opts: {
  gitRoot: string;
  plan: ReleaseVersionPlan;
  route: ReleaseApplyRoute;
  commandLabel: "release apply" | "release candidate";
}): Promise<void> {
  if (!opts.plan.baseSha) return;

  if (opts.route.kind === "release_candidate" && opts.route.base_branch) {
    const protectedBase = await resolveProtectedBaseSha(opts.gitRoot, opts.route.base_branch);
    if (protectedBase.sha !== opts.plan.baseSha) {
      throw releasePlanBaseDriftError({
        commandLabel: opts.commandLabel,
        current: protectedBase.sha,
        planned: opts.plan.baseSha,
        state: "the protected base branch no longer matches the prepared release plan",
        likelyCause: `${protectedBase.ref} advanced after release planning, so the release candidate would omit late merges from the reviewed scope`,
      });
    }
    const planBaseIsOnCandidate = await gitIsAncestor(opts.gitRoot, opts.plan.baseSha, "HEAD");
    if (!planBaseIsOnCandidate) {
      throw releasePlanBaseDriftError({
        commandLabel: opts.commandLabel,
        current: await currentHeadSha(opts.gitRoot),
        planned: opts.plan.baseSha,
        state: "the candidate branch is no longer based on the prepared release plan",
        likelyCause:
          "the candidate branch was rebased or replaced after release planning, so the frozen release scope no longer matches the branch being prepared",
      });
    }
    return;
  }

  const currentHead = await currentHeadSha(opts.gitRoot);
  if (currentHead !== opts.plan.baseSha) {
    throw releasePlanBaseDriftError({
      commandLabel: opts.commandLabel,
      current: currentHead,
      planned: opts.plan.baseSha,
      state: "the candidate base no longer matches the prepared release plan",
      likelyCause:
        "main advanced after release planning, so the candidate scope may now include late merges that were not reviewed",
    });
  }
}

async function currentHeadSha(gitRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return String(stdout ?? "").trim();
}

async function resolveProtectedBaseSha(
  gitRoot: string,
  baseBranch: string,
): Promise<{ ref: string; sha: string }> {
  const refs = [`refs/remotes/origin/${baseBranch}`, `refs/heads/${baseBranch}`, baseBranch];
  for (const ref of refs) {
    const sha = await revParseOptional(gitRoot, ref);
    if (sha) return { ref, sha };
  }
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Release plan base could not be checked because protected base branch ${baseBranch} is unavailable.\n` +
      "Fetch the protected base branch before preparing the release candidate.",
    context: withDiagnosticContext(
      { command: "release candidate" },
      {
        state: "the protected base branch could not be resolved for release-plan validation",
        likelyCause:
          "the local checkout does not have the configured base branch or its origin tracking ref",
        nextAction: {
          command: `git fetch origin ${baseBranch}`,
          reason: "refresh the protected base branch tip before preparing the release candidate",
          reasonCode: "release_plan_base_unresolved",
        },
      },
    ),
  });
}

async function revParseOptional(gitRoot: string, ref: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const sha = String(stdout ?? "").trim();
    return sha || null;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1 || code === 128) return null;
    throw err;
  }
}

async function gitIsAncestor(
  gitRoot: string,
  maybeAncestor: string,
  descendant: string,
): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", maybeAncestor, descendant], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1 || code === 128) return false;
    throw err;
  }
}

function releasePlanBaseDriftError(opts: {
  commandLabel: "release apply" | "release candidate";
  current: string;
  planned: string;
  state: string;
  likelyCause: string;
}): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Release plan base drifted. current=${opts.current} planned=${opts.planned}\n` +
      "Re-run `agentplane release plan` from the intended candidate base, or explicitly cut/re-scope the release branch.",
    context: withDiagnosticContext(
      { command: opts.commandLabel },
      {
        state: opts.state,
        likelyCause: opts.likelyCause,
        nextAction: {
          command: "agentplane release plan",
          reason: "freeze a fresh release base before applying or preparing the candidate",
          reasonCode: "release_plan_base_drifted",
        },
      },
    ),
  });
}

export async function buildReleaseCommandState(opts: {
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
