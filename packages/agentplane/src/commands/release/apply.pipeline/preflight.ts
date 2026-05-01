import { loadConfig } from "@agentplaneorg/core/config";

import { usageError } from "../../../cli/spec/errors.js";
import type { CommandSpec } from "../../../cli/spec/spec.js";
import { ensureActionApproved } from "../../shared/approval-requirements.js";
import { ensureNetworkApproved } from "../../shared/network-approval.js";
import { ensureRemoteExists, ensureRemoteTagDoesNotExist } from "../apply.preflight.git.js";
import {
  ensureNpmVersionsAvailable,
  runReleasePrepublishGate,
} from "../apply.preflight.publish.js";
import type {
  ReleaseApplyParsed,
  ReleaseApplyRoute,
  ReleaseCommandState,
  ReleaseVersionPlan,
} from "../apply.types.js";
import { ensureReleasePlanMatchesRepoState } from "./state.js";

export async function runPushPreflight(opts: {
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
      ? `${opts.commandLabel} will push current branch ${opts.route.current_branch} to ${opts.remote} as a release candidate for ${opts.nextTag}; final publication remains gated on merge to ${opts.route.base_branch} and explicit Publish to npm workflow dispatch`
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
  await ensureRemoteExists(
    opts.gitRoot,
    opts.remote,
    opts.commandLabel as "release apply" | "release candidate",
  );
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

export function assertReleaseBumpApproved(opts: {
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

export async function runReleaseCommandPreflight(opts: {
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
