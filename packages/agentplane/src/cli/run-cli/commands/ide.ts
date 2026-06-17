import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import type { RunDeps } from "../command-catalog/kernel.js";

import { makeRunIdePlatformSyncHandler } from "./platform.js";

type IdeSyncParsed = { ide?: "cursor" | "windsurf" };

export const ideSyncSpec: CommandSpec<IdeSyncParsed> = {
  id: ["ide", "sync"],
  group: "IDE",
  summary: "Generate IDE entrypoints from policy gateway file (AGENTS.md or CLAUDE.md).",
  options: [
    {
      kind: "string",
      name: "ide",
      valueHint: "<cursor|windsurf>",
      choices: ["cursor", "windsurf"],
      description: "Only generate rules for a single IDE (default: both).",
    },
  ],
  examples: [
    { cmd: "agentplane ide sync", why: "Generate Cursor + Windsurf rules." },
    { cmd: "agentplane ide sync --ide cursor", why: "Generate Cursor rules only." },
    {
      cmd: "agentplane platform sync --platform cursor --platform windsurf",
      why: "Use the platform sync command directly.",
    },
  ],
  parse: (raw) => ({ ide: raw.opts.ide as IdeSyncParsed["ide"] }),
};

export function makeRunIdeSyncHandler(deps: RunDeps): CommandHandler<IdeSyncParsed> {
  return makeRunIdePlatformSyncHandler(deps);
}
