import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdVerifyParsed } from "./task/verify-record.js";
import type { VerifyParsed } from "./verify.spec.js";

export function makeRunVerifyHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: VerifyParsed): Promise<number> => {
    return await cmdVerifyParsed({
      ctx: await getCtx("verify"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      state: p.state,
      by: p.by,
      note: p.note,
      noteFile: p.noteFile,
      details: p.details,
      file: p.file,
      collectIncidents: p.collectIncidents,
      observation: p.observation,
      impact: p.impact,
      resolution: p.resolution,
      promote: p.promote,
      external: p.external,
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
