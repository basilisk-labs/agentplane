import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";

import { cmdAgentLint } from "./lint.js";

export type AgentLintParsed = Record<string, never>;

export const agentLintSpec: CommandSpec<AgentLintParsed> = {
  id: ["agent", "lint"],
  group: "Agent",
  summary: "Lint agent JSON definitions (schema + invariants).",
  examples: [{ cmd: "agentplane agent lint", why: "Validate all agent definitions." }],
  parse: () => ({}),
};

export async function runAgentLint(ctx: CommandCtx): Promise<number> {
  return await cmdAgentLint({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
}
