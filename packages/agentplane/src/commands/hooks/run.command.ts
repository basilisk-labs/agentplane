import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";

import { HOOK_NAMES, cmdHooksRun } from "./index.js";

export type HooksRunParsed = { hook: (typeof HOOK_NAMES)[number]; args: string[] };

export const hooksRunSpec: CommandSpec<HooksRunParsed> = {
  id: ["hooks", "run"],
  group: "Hooks",
  summary: "Run a managed hook (use `--` to pass through additional arguments).",
  args: [
    { name: "hook", required: true, valueHint: "<hook>" },
    { name: "args", required: false, variadic: true, valueHint: "<args...>" },
  ],
  examples: [
    { cmd: "agentplane hooks run pre-commit", why: "Run the pre-commit checks." },
    {
      cmd: "agentplane hooks run commit-msg -- .git/COMMIT_EDITMSG",
      why: "Run commit-msg with a message file argument.",
    },
  ],
  validateRaw: (raw) => {
    const hook = String(raw.args.hook);
    if (!HOOK_NAMES.includes(hook as (typeof HOOK_NAMES)[number])) {
      throw usageError({
        spec: hooksRunSpec,
        message: `Unknown hook: ${hook} (expected one of: ${HOOK_NAMES.join(", ")})`,
      });
    }
  },
  parse: (raw) => ({
    hook: String(raw.args.hook) as (typeof HOOK_NAMES)[number],
    args: Array.isArray(raw.args.args) ? raw.args.args.map(String) : [],
  }),
};

export const runHooksRun: CommandHandler<HooksRunParsed> = async (ctx, p) => {
  return await cmdHooksRun({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    hook: p.hook,
    args: p.args,
  });
};
