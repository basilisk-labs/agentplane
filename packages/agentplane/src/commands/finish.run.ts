import type { CommandCtx } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdFinish } from "./task/finish-command.js";
import type { FinishParsed } from "./finish.spec.shared.js";
import { finishSpec } from "./finish.spec.js";
import { resolveTextPayload } from "./shared/text-payload.js";

export function makeRunFinishHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: FinishParsed): Promise<number> => {
    if (p.taskIds.length === 0) {
      throw usageError({
        spec: finishSpec,
        command: "finish",
        message: "Missing required argument: task-id",
      });
    }
    const body = await resolveTextPayload({
      cwd: ctx.cwd,
      inline: p.body,
      file: p.bodyFile,
      label: "finish body",
    });
    const result =
      typeof p.result === "string" || typeof p.resultFile === "string"
        ? await resolveTextPayload({
            cwd: ctx.cwd,
            inline: p.result,
            file: p.resultFile,
            label: "finish result",
          })
        : undefined;
    return await cmdFinish({
      ctx: await getCtx("finish"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskIds: p.taskIds,
      author: p.author,
      body,
      result,
      risk: p.risk,
      breaking: p.breaking,
      commit: p.commit,
      force: p.force,
      yes: p.yes,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      statusCommit: p.statusCommit,
      statusCommitEmoji: p.statusCommitEmoji,
      statusCommitAllow: p.statusCommitAllow,
      statusCommitAutoAllow: p.statusCommitAutoAllow,
      statusCommitRequireClean: p.statusCommitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      closeCommit: p.closeCommit,
      noCloseCommit: p.noCloseCommit,
      noWriteAcr: p.noWriteAcr,
      closeUnstageOthers: p.closeUnstageOthers,
      baseBranchOverride: p.baseBranchOverride,
      observation: p.observation,
      impact: p.impact,
      resolution: p.resolution,
      localOnly: p.localOnly,
      repoFixable: p.repoFixable,
      incidentScope: p.incidentScope,
      incidentTags: p.incidentTags,
      incidentMatch: p.incidentMatch,
      incidentAdvice: p.incidentAdvice,
      incidentRule: p.incidentRule,
      quiet: p.quiet,
    });
  };
}
