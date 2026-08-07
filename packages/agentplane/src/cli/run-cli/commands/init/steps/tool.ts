import type { InitFlags, InitTool } from "../model.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitPromptClack, ToolStepAnswers } from "./contracts.js";

const toolOptions: { value: InitTool; label: string; hint: string }[] = [
  { value: "codex", label: "Codex", hint: "Install AGENTS.md and Codex-oriented local rules." },
  { value: "claude", label: "Claude Code", hint: "Install CLAUDE.md for Claude Code." },
  { value: "cursor", label: "Cursor", hint: "Install AGENTS.md and sync Cursor rules." },
  { value: "windsurf", label: "Windsurf", hint: "Install AGENTS.md and sync Windsurf rules." },
  { value: "hermes", label: "Hermes", hint: "Use the native Hermes managed runner profile." },
  {
    value: "multiple",
    label: "Multiple agents",
    hint: "Use portable AGENTS.md defaults without one IDE-specific integration.",
  },
  {
    value: "manual",
    label: "Manual / other",
    hint: "Use portable defaults and configure a custom runner later.",
  },
];

export async function promptToolStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "tool">;
  defaultTool?: InitTool;
}): Promise<ToolStepAnswers> {
  const tool: InitTool =
    opts.flags.tool ??
    (await selectStepValue<InitTool>(opts.clack, {
      message: "Primary agent surface",
      options: toolOptions,
      initialValue: opts.defaultTool ?? "codex",
      cancelMessage: "Agent surface selection cancelled.",
    }));
  return { tool };
}
