import { InitAborted } from "../prompts.js";
import type { InitClackPrompts } from "../prompts.js";
import { previewConflicts } from "../ui.js";

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

export async function promptConflictResolverStep(opts: {
  clack: InitPromptClack & Pick<InitClackPrompts, "note">;
  gitRoot: string;
  conflicts: readonly string[];
}): Promise<ConflictChoice | null> {
  if (opts.conflicts.length === 0) {
    return null;
  }

  previewConflicts(opts.clack, {
    gitRoot: opts.gitRoot,
    conflicts: opts.conflicts,
  });

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
