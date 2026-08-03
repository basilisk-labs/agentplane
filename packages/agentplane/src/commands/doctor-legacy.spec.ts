import type { CommandSpec } from "../cli/spec/spec.js";

export type DoctorLegacyParsed = { json: boolean };

export const doctorLegacySpec: CommandSpec<DoctorLegacyParsed> = {
  id: ["doctor", "legacy"],
  group: "Quality",
  summary: "Inspect compatibility adapters, retirement targets, and current workspace usage.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane doctor legacy --json",
      why: "Emit the packaged retirement manifest with deterministic workspace usage evidence.",
    },
  ],
  notes: ["Read-only: this command never applies migrations or removes compatibility data."],
  parse: (raw) => ({ json: raw.opts.json === true }),
};
