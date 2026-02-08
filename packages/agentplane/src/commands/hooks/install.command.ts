import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdHooksInstall } from "./index.js";

export type HooksInstallParsed = { quiet: boolean };

export const hooksInstallSpec: CommandSpec<HooksInstallParsed> = {
  id: ["hooks", "install"],
  group: "Hooks",
  summary: "Install managed git hooks and the agentplane shim.",
  options: [
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [{ cmd: "agentplane hooks install", why: "Install hooks into .git/hooks/." }],
  parse: (raw) => ({ quiet: raw.opts.quiet === true }),
};

export const runHooksInstall: CommandHandler<HooksInstallParsed> = async (ctx, p) => {
  return await cmdHooksInstall({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, quiet: p.quiet });
};
