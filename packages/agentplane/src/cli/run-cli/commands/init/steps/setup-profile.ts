import { setupProfilePresets } from "../presets.js";
import type { InitFlags, SetupProfilePreset } from "../model.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitPromptClack, SetupProfileStepAnswers } from "./contracts.js";

const setupProfileOptions: { value: SetupProfilePreset; label: string; hint: string }[] = [
  {
    value: "light",
    label: "Light",
    hint: setupProfilePresets.light.description,
  },
  {
    value: "normal",
    label: "Normal",
    hint: setupProfilePresets.normal.description,
  },
  {
    value: "full-harness",
    label: "Full Harness",
    hint: setupProfilePresets["full-harness"].description,
  },
];

export async function promptSetupProfileStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "setupProfile">;
  defaultProfile?: SetupProfilePreset;
}): Promise<SetupProfileStepAnswers> {
  const setupProfilePreset =
    opts.flags.setupProfile ??
    (await selectStepValue(opts.clack, {
      message: "Setup profile",
      options: setupProfileOptions,
      initialValue: opts.defaultProfile ?? "normal",
      cancelMessage: "Setup profile selection cancelled.",
    }));

  return {
    setupProfilePreset,
    setupProfileMode: setupProfilePresets[setupProfilePreset].mode,
  };
}
