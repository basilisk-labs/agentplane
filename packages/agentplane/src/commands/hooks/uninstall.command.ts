import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";

import { cmdHooksUninstall } from "./index.js";

export type HooksUninstallParsed = { quiet: boolean };

export const hooksUninstallSpec: CommandSpec<HooksUninstallParsed> = {
  id: ["hooks", "uninstall"],
  group: "Hooks",
  summary: "Uninstall managed git hooks installed by agentplane.",
  options: [
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: "agentplane hooks uninstall", why: "Remove agentplane hooks from .git/hooks/." },
  ],
  parse: (raw) => ({ quiet: raw.opts.quiet === true }),
};

export const runHooksUninstall: CommandHandler<HooksUninstallParsed> = async (ctx, p) => {
  return await cmdHooksUninstall({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, quiet: p.quiet });
};
