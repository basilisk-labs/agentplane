import type { CommandHandler } from "../../../spec/spec.js";
import { cmdInit } from "./orchestrate.js";
import { initSpec } from "./spec.js";
import type { InitParsed } from "./model.js";

export const runInit: CommandHandler<InitParsed> = (ctx, flags) =>
  cmdInit({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    outputMode: ctx.outputMode ?? "text",
    flags,
    spec: initSpec,
  });
