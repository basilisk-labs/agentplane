import type { InitFlags, SetupProfilePreset } from "../model.js";
import type { InitPromptClack, SetupProfileStepAnswers } from "./contracts.js";

export function promptSetupProfileStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "setupProfile">;
  defaultProfile?: SetupProfilePreset;
}): SetupProfileStepAnswers {
  void opts;
  const setupProfilePreset: SetupProfilePreset = "standard";
  return {
    setupProfilePreset,
    setupProfileMode: "compact",
  };
}
