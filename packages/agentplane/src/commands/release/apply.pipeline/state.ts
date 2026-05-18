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
  if (opts.plan.baseSha) {
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    const currentHead = String(stdout ?? "").trim();
    if (currentHead !== opts.plan.baseSha) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          `Release plan base drifted. current=${currentHead} planned=${opts.plan.baseSha}\n` +
          "Re-run `agentplane release plan` from the intended candidate base, or explicitly cut/re-scope the release branch.",
        context: withDiagnosticContext(
          { command: opts.commandLabel },
          {
            state: "the candidate base no longer matches the prepared release plan",
            likelyCause:
              "main advanced after release planning, so the candidate scope may now include late merges that were not reviewed",
            nextAction: {
              command: "agentplane release plan",
              reason: "freeze a fresh release base before applying or preparing the candidate",
              reasonCode: "release_plan_base_drifted",
            },
          },
        ),
      });
    }
  }
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
