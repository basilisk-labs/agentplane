import { loadConfig } from "@agentplaneorg/core/config";
import { resolveBaseBranch } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { runReleaseCommandPipeline } from "./apply.pipeline.js";
import type { ReleaseApplyParsed, ReleaseApplyRoute } from "./apply.types.js";
import { releaseApplySpec, releaseCandidateSpec } from "./apply.spec.js";

export { releaseApplySpec, releaseCandidateSpec } from "./apply.spec.js";

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
      "Prepare the release candidate on a dedicated branch, merge it into the protected base branch, then explicitly dispatch Publish to npm with the release commit sha.",
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

export const runReleaseApply: CommandHandler<ReleaseApplyParsed> = async (ctx, flags) => {
  return await runReleaseCommandPipeline({
    ctx,
    flags,
    spec: releaseApplySpec,
    commandLabel: "release apply",
    routeResolver: resolveDirectReleaseRoute,
  });
};

export const runReleaseCandidate: CommandHandler<ReleaseApplyParsed> = async (ctx, flags) => {
  return await runReleaseCommandPipeline({
    ctx,
    flags,
    spec: releaseCandidateSpec,
    commandLabel: "release candidate",
    routeResolver: resolveReleaseCandidateRoute,
  });
};

export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.pipeline.js";
