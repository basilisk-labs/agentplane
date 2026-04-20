import path from "node:path";

import { execFileAsync, gitEnv } from "../../shared/git.js";
import {
  pushReleaseCandidateBranch,
  pushReleaseRefs,
  writeReleaseApplyReport,
} from "../apply.reporting.js";
import type {
  ReleaseApplyParsed,
  ReleaseApplyReport,
  ReleaseCommandMutation,
  ReleaseCommandState,
  ReleaseVersionPlan,
} from "../apply.types.js";
import { emitReleaseLine } from "./shared.js";

export async function finalizeReleaseApply(opts: {
  gitRoot: string;
  planDir: string;
  notesPath: string;
  plan: ReleaseVersionPlan;
  npmVersionChecked: boolean;
  releaseCommit: { hash: string; subject: string } | null;
  route: ReleaseCommandState["route"];
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

export async function runReleaseCommandFinalize(opts: {
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
