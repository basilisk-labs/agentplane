import path from "node:path";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { GitContext } from "../shared/git-context.js";
import { ensureNetworkApproved } from "../shared/network-approval.js";
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
import { pushReleaseRefs, writeReleaseApplyReport } from "./apply.reporting.js";
import type { ReleaseApplyParsed, ReleaseApplyReport, ReleaseVersionPlan } from "./apply.types.js";

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
  yes: boolean;
}): Promise<boolean> {
  const loaded = await loadConfig(opts.agentplaneDir);
  await ensureNetworkApproved({
    config: loaded.config,
    yes: opts.yes,
    reason: "release apply --push validates npm version availability and pushes over network",
    interactive: Boolean(process.stdin.isTTY),
  });
  await ensureRemoteExists(opts.gitRoot, opts.remote);
  await ensureRemoteTagDoesNotExist(opts.gitRoot, opts.remote, opts.nextTag);
  await ensureNpmVersionsAvailable(opts.gitRoot, opts.nextVersion);
  await runReleasePrepublishGate(opts.gitRoot);
  return true;
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
    process.stdout.write("No changes to commit.\n");
    return { releaseCommit };
  }

  const subject = `✨ release: ${opts.nextTag}`;
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
  push: boolean;
  remote: string;
}): Promise<number> {
  await execFileAsync("git", ["tag", opts.plan.nextTag], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });

  process.stdout.write(`Release tag created: ${opts.plan.nextTag}\n`);
  if (opts.push) {
    await pushReleaseRefs(opts.gitRoot, opts.remote, opts.plan.nextTag);
    process.stdout.write(`Pushed: ${opts.remote} HEAD + ${opts.plan.nextTag}\n`);
  } else {
    process.stdout.write(
      `Next: git push <remote> HEAD && git push <remote> ${opts.plan.nextTag}\n`,
    );
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
    push: { requested: opts.push, remote: opts.remote, performed: opts.push },
  } satisfies ReleaseApplyReport);
  process.stdout.write(`Release report: ${path.relative(opts.gitRoot, reportPath)}\n`);
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
        "Mandatory for real releases: push commit and tag so GitHub publish workflow can publish to npm " +
        "(requires --yes). Local tests can skip with AGENTPLANE_RELEASE_DRY_RUN=1.",
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
    if (!p.push && process.env.AGENTPLANE_RELEASE_DRY_RUN !== "1") {
      throw usageError({
        spec: releaseApplySpec,
        command: "release apply",
        message: "Release publish is mandatory. Run `agentplane release apply --push --yes`.",
      });
    }
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
      why: "Apply the latest release plan (expects docs/releases/vX.Y.Z.md to exist).",
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
  if (!flags.push && process.env.AGENTPLANE_RELEASE_DRY_RUN !== "1") {
    throw usageError({
      spec: releaseApplySpec,
      command: "release apply",
      message: "Release publish is mandatory. Run `agentplane release apply --push --yes`.",
    });
  }

  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const gitRoot = resolved.gitRoot;
  const { planDir, plan, notesPath } = await resolveReleasePlanInputs({
    gitRoot,
    planOverride: flags.plan,
  });

  if ((plan.bump === "minor" || plan.bump === "major") && flags.yes !== true) {
    throw usageError({
      spec: releaseApplySpec,
      command: "release apply",
      message: `Bump '${plan.bump}' requires explicit approval. Re-run with --yes.`,
    });
  }

  const corePkgPath = path.join(gitRoot, "packages", "core", "package.json");
  const agentplanePkgPath = path.join(gitRoot, "packages", "agentplane", "package.json");
  await ensureReleasePlanMatchesRepoState({
    gitRoot,
    plan,
    corePkgPath,
    agentplanePkgPath,
  });

  let npmVersionChecked = false;
  if (flags.push) {
    npmVersionChecked = await runPushPreflight({
      agentplaneDir: resolved.agentplaneDir,
      gitRoot,
      remote: flags.remote,
      nextTag: plan.nextTag,
      nextVersion: plan.nextVersion,
      yes: flags.yes,
    });
  }

  const git = new GitContext({ gitRoot });
  const { releaseCommit } = await applyReleaseMutation({
    agentplaneDir: resolved.agentplaneDir,
    gitRoot,
    git,
    notesPath,
    corePkgPath,
    agentplanePkgPath,
    nextTag: plan.nextTag,
    nextVersion: plan.nextVersion,
  });

  return await finalizeReleaseApply({
    gitRoot,
    planDir,
    notesPath,
    plan,
    npmVersionChecked,
    releaseCommit,
    push: flags.push,
    remote: flags.remote,
  });
};

export { pushReleaseRefs } from "./apply.reporting.js";
