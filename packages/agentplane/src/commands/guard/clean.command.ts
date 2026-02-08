import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { cmdGuardClean } from "./index.js";

export type GuardCleanParsed = { quiet: boolean };

export const guardCleanSpec: CommandSpec<GuardCleanParsed> = {
  id: ["guard", "clean"],
  group: "Guard",
  summary: "Ensure the git index has no staged files.",
  options: [
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [{ cmd: "agentplane guard clean", why: "Fail if staged files exist." }],
  parse: (raw) => ({ quiet: raw.opts.quiet === true }),
};

export const runGuardClean: CommandHandler<GuardCleanParsed> = async (ctx, p) => {
  return await cmdGuardClean({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, quiet: p.quiet });
};
