import { parseGroupCommand, type GroupCommandParsed } from "../cli/group-command.js";
import type { CommandSpec } from "../cli/spec/spec.js";

export type RuntimeExplainParsed = { json: boolean; compact: boolean };

export const runtimeSpec: CommandSpec<GroupCommandParsed> = {
  id: ["runtime"],
  group: "Diagnostics",
  summary: "Inspect which agentplane runtime/binary/package sources are active.",
  synopsis: ["agentplane runtime <explain> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [{ cmd: "agentplane runtime explain", why: "Show active runtime details." }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runtimeExplainSpec: CommandSpec<RuntimeExplainParsed> = {
  id: ["runtime", "explain"],
  group: "Diagnostics",
  summary: "Explain the active binary, runtime mode, and resolved package roots.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable runtime details.",
    },
    {
      kind: "boolean",
      name: "compact",
      default: false,
      description: "Emit a compact prompt diagnostics payload for agent consumption.",
    },
  ],
  examples: [
    { cmd: "agentplane runtime explain", why: "Show the active runtime as readable text." },
    {
      cmd: "agentplane runtime explain --json",
      why: "Show runtime details for scripts and diagnostics tooling.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true, compact: raw.opts.compact === true }),
};
