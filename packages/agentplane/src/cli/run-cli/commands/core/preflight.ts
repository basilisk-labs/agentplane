import { createCliEmitter } from "../../../output.js";
import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";

import { wrapCommand } from "../wrap-command.js";
import { buildPreflightReport, type PreflightMode } from "./preflight-report.js";
import { renderPreflightText } from "./preflight-render.js";

const output = createCliEmitter();

type PreflightParsed = { json: boolean; mode: PreflightMode; role: string | null };

export const preflightSpec: CommandSpec<PreflightParsed> = {
  id: ["preflight"],
  group: "Core",
  summary: "Run aggregated preflight checks and print a deterministic readiness report.",
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<quick|full>",
      choices: ["quick", "full"],
      default: "quick",
      description:
        "Preflight depth. quick skips backend task-list probe; full includes backend readiness.",
    },
    {
      kind: "boolean",
      name: "full",
      default: false,
      description: "Shortcut for --mode full.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable JSON report.",
    },
    {
      kind: "string",
      name: "role",
      valueHint: "<ROLE>",
      description: "Optional active role to include in next-command guidance.",
    },
  ],
  examples: [
    { cmd: "agentplane preflight --json", why: "Produce one-shot agent-readable preflight." },
    {
      cmd: "agentplane preflight --json --mode full",
      why: "Run full preflight including backend task-list probe.",
    },
  ],
  parse: (raw) => ({
    json: raw.opts.json === true,
    mode:
      raw.opts.full === true ? "full" : ((raw.opts.mode as PreflightMode | undefined) ?? "quick"),
    role: typeof raw.opts.role === "string" ? raw.opts.role : null,
  }),
};

async function cmdPreflight(opts: {
  cwd: string;
  rootOverride?: string;
  json: boolean;
  mode: PreflightMode;
  role: string | null;
}): Promise<number> {
  return wrapCommand({ command: "preflight", rootOverride: opts.rootOverride }, async () => {
    const report = await buildPreflightReport({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      mode: opts.mode,
      role: opts.role,
    });
    if (opts.json) {
      output.json(report);
      return 0;
    }
    output.lines(renderPreflightText(report));
    return 0;
  });
}

export const runPreflight: CommandHandler<PreflightParsed> = (ctx, parsed) => {
  return cmdPreflight({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    json: parsed.json,
    mode: parsed.mode,
    role: parsed.role,
  });
};
