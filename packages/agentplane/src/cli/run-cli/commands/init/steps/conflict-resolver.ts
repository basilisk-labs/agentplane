import path from "node:path";

import { InitAborted } from "../prompts.js";
import type { InitClackPrompts } from "../prompts.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitPromptClack } from "./contracts.js";

type ConflictChoice = "overwrite" | "backup";
type ConflictResolutionChoice = ConflictChoice | "cancel";

const conflictResolutionOptions: {
  value: ConflictResolutionChoice;
  label: string;
  hint: string;
}[] = [
  {
    value: "overwrite",
    label: "Overwrite",
    hint: "Delete conflicting paths before continuing init.",
  },
  {
    value: "backup",
    label: "Backup",
    hint: "Create timestamped backups before writing new files.",
  },
  {
    value: "cancel",
    label: "Cancel",
    hint: "Abort init now and keep the workspace unchanged.",
  },
];

function renderConflictPreview(gitRoot: string, conflicts: readonly string[]): string {
  return conflicts.map((conflict) => `- ${path.relative(gitRoot, conflict)}`).join("\n");
}

export async function promptConflictResolverStep(opts: {
  clack: InitPromptClack & Pick<InitClackPrompts, "note">;
  gitRoot: string;
  conflicts: readonly string[];
}): Promise<ConflictChoice | null> {
  if (opts.conflicts.length === 0) {
    return null;
  }

  opts.clack.note(renderConflictPreview(opts.gitRoot, opts.conflicts), "Init conflicts detected");

  const resolution = await selectStepValue(opts.clack, {
    message: "How should init resolve existing conflicts?",
    options: conflictResolutionOptions,
    initialValue: "backup",
    cancelMessage: "Init cancelled during conflict resolution.",
  });

  if (resolution === "cancel") {
    const message = "Init cancelled during conflict resolution.";
    opts.clack.cancel(message);
    throw new InitAborted(message);
  }

  return resolution;
}
