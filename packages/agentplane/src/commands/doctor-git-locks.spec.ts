import type { CommandSpec } from "../cli/spec/spec.js";

export const doctorGitLocksSpec: CommandSpec<{ fix: boolean }> = {
  id: ["doctor", "git-locks"],
  group: "Quality",
  summary: "Check Git index lock state for this repository and suggest cleanup.",
  options: [
    {
      kind: "boolean",
      name: "fix",
      default: false,
      description: "Remove stale index.lock when safe.",
    },
  ],
  examples: [
    { cmd: "agentplane doctor git-locks", why: "Inspect current git index lock status." },
    {
      cmd: "agentplane doctor git-locks --fix",
      why: "Remove stale git index.lock after inspection.",
    },
  ],
  parse: (raw) => ({
    fix: raw.opts.fix === true,
  }),
};
