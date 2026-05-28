import { infoMessage } from "../../cli/output.js";
import * as prompts from "../../cli/prompts.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { ContextInitParsed } from "./context.spec.js";
import { cmdContextInit } from "./init.js";

export async function runContextInit(_ctx: CommandCtx, p: ContextInitParsed): Promise<number> {
  const parsed = await resolveContextInitParsed(_ctx, p);
  return await cmdContextInit({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed,
  });
}

const INTERACTIVE_CONTEXT_INIT_PROFILES: ContextInitParsed["profile"][] = [
  "minimal",
  "adaptive",
  "maximum-assimilation",
];

async function resolveContextInitParsed(
  ctx: CommandCtx,
  parsed: ContextInitParsed,
): Promise<ContextInitParsed> {
  if (parsed.profileProvided === true || ctx.outputMode === "json" || !isInteractiveTerminal()) {
    return parsed;
  }

  const contextInitModePromptEnabled = process.env.AGENTPLANE_CONTEXT_INIT_MODE_PROMPT === "1";
  if (!contextInitModePromptEnabled) return { ...parsed, profile: "maximum-assimilation" };

  process.stdout.write(
    infoMessage(
      [
        "Context init mode:",
        "minimal = smallest workspace scaffold",
        "adaptive = smaller llm-wiki workspace for normal project context",
        "maximum-assimilation = default mode for preserving significant source meaning",
      ].join("\n"),
    ) + "\n",
  );

  const profile = (await prompts.selectPrompt(
    "Select context mode",
    INTERACTIVE_CONTEXT_INIT_PROFILES,
    parsed.profile,
  )) as ContextInitParsed["profile"];

  return { ...parsed, profile };
}

function isInteractiveTerminal(): boolean {
  return process.stdin.isTTY === true && process.stdout.isTTY === true;
}
