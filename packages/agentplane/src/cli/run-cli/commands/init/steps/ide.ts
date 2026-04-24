import type { InitDefaults, InitFlags, InitIde } from "../model.js";
import { INIT_DEFAULTS } from "../presets.js";

import { selectStepValue } from "./prompt-utils.js";
import type { IdeStepAnswers, InitPromptClack } from "./contracts.js";

const ideOptions: { value: InitIde; label: string; hint: string }[] = [
  { value: "codex", label: "Codex", hint: "Use Codex-oriented local rules." },
  { value: "cursor", label: "Cursor", hint: "Sync Cursor rules." },
  { value: "windsurf", label: "Windsurf", hint: "Sync Windsurf rules." },
];

export async function promptIdeStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "ide">;
  defaults?: Pick<InitDefaults, "ide">;
}): Promise<IdeStepAnswers> {
  const defaults = opts.defaults ?? INIT_DEFAULTS;
  const ide =
    opts.flags.ide ??
    (await selectStepValue(opts.clack, {
      message: "IDE integration",
      options: ideOptions,
      initialValue: defaults.ide,
      cancelMessage: "IDE integration selection cancelled.",
    }));

  return { ide };
}
