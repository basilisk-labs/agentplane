import type { CommandSpec } from "../cli/spec/spec.js";

export type DoctorParsed = {
  fix: boolean;
  dev: boolean;
};

export const doctorSpec: CommandSpec<DoctorParsed> = {
  id: ["doctor"],
  group: "Quality",
  summary:
    "Check workspace invariants for a normal agentplane installation (with optional dev source checks).",
  options: [
    { kind: "boolean", name: "fix", default: false, description: "Apply safe fixes." },
    {
      kind: "boolean",
      name: "dev",
      default: false,
      description: "Run monorepo source-layer checks (requires packages/agentplane/src).",
    },
  ],
  examples: [
    { cmd: "agentplane doctor", why: "Check installed workspace invariants." },
    { cmd: "agentplane doctor --dev", why: "Also run monorepo source-layer checks." },
    { cmd: "agentplane doctor --fix", why: "Apply safe-only fixes (idempotent)." },
  ],
  parse: (raw) => ({ fix: raw.opts.fix === true, dev: raw.opts.dev === true }),
};
