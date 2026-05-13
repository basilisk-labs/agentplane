import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTextPayload } from "../shared/text-payload.js";
import {
  prSpec,
  type PrCheckParsed,
  type PrCloseParsed,
  type PrCloseSupersededParsed,
  type PrFlowStatusParsed,
  type PrNoteParsed,
  type PrOpenParsed,
  type PrUpdateParsed,
} from "./pr.spec.js";

import { cmdPrCheck } from "./check.js";
import { cmdPrCloseSuperseded } from "./close-superseded.js";
import { cmdPrClose } from "./close.js";
import { cmdPrFlowStatus } from "./flow-status.js";
import { cmdPrNote } from "./note.js";
import { cmdPrOpen } from "./open.js";
import { cmdPrUpdate } from "./update.js";

export {
  prCheckSpec,
  prCloseSpec,
  prCloseSupersededSpec,
  prFlowStatusSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "./pr.spec.js";

async function runPrRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: prSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["pr"]),
    command: "pr",
  });
}

export function makeRunPrHandler(
  _getCtx: (cmd: string) => Promise<CommandContext>,
): CommandHandler<GroupCommandParsed> {
  return runPrRootGroup;
}

export function makeRunPrOpenHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrOpenParsed): Promise<number> => {
    return await cmdPrOpen({
      ctx: await getCtx("pr open"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      branch: p.branch ?? undefined,
      includeTaskIds: p.includeTaskIds,
      syncOnly: p.syncOnly,
    });
  };
}

export function makeRunPrUpdateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrUpdateParsed): Promise<number> => {
    return await cmdPrUpdate({
      ctx: await getCtx("pr update"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      includeTaskIds: p.includeTaskIds,
    });
  };
}

export function makeRunPrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrCheckParsed): Promise<number> => {
    return await cmdPrCheck({
      ctx: await getCtx("pr check"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
    });
  };
}

export function makeRunPrFlowStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrFlowStatusParsed): Promise<number> => {
    return await cmdPrFlowStatus({
      ctx: await getCtx("pr flow status"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      json: p.json,
    });
  };
}

export function makeRunPrNoteHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrNoteParsed): Promise<number> => {
    const body = await resolveTextPayload({
      cwd: ctx.cwd,
      inline: p.body,
      file: p.bodyFile,
      label: "PR note body",
    });
    return await cmdPrNote({
      ctx: await getCtx("pr note"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body,
    });
  };
}

export function makeRunPrCloseHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrCloseParsed): Promise<number> => {
    return await cmdPrClose({
      ctx: await getCtx("pr close"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      prNumber: p.prNumber,
      repo: p.repo,
      comment: p.comment,
      deleteRemoteBranch: p.deleteRemoteBranch,
    });
  };
}

export function makeRunPrCloseSupersededHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrCloseSupersededParsed): Promise<number> => {
    return await cmdPrCloseSuperseded({
      ctx: await getCtx("pr close-superseded"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      deleteRemoteBranch: p.deleteRemoteBranch,
    });
  };
}
