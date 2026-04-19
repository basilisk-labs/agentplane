import { loadConfig, resolveBaseBranch } from "@agentplaneorg/core";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { runReleaseCommandPipeline } from "./apply.pipeline.js";
import type { ReleaseApplyParsed, ReleaseApplyRoute } from "./apply.types.js";

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

const releaseCandidateOptions: CommandSpec<ReleaseApplyParsed>["options"] = [
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
      "Optional candidate-push mode: push only the release candidate branch for hosted review and merge (requires --yes). The release tag is not created or pushed here.",
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
];

export const releaseCandidateSpec: CommandSpec<ReleaseApplyParsed> = {
  id: ["release", "candidate"],
  group: "Release",
  summary:
    "Prepare a branch_pr release candidate: bump versions, validate notes, commit, and optionally push the candidate branch.",
  description:
    "Prepares a release candidate from a generated release plan on a dedicated non-base branch in branch_pr mode. This command creates the candidate commit but intentionally does not create or push the release tag; final publication remains gated on merge to the protected base branch and hosted publish from main.",
  options: releaseCandidateOptions,
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
