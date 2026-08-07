import type { InitFlags, InitMode } from "../model.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitPromptClack } from "./contracts.js";

type InteractiveInitMode = Extract<InitMode, "quick" | "advanced">;

const initModeOptions: { value: InteractiveInitMode; label: string; hint: string }[] = [
  {
    value: "quick",
    label: "Quick (recommended)",
    hint: "Choose the agent surface and workflow; keep safe local defaults for everything else.",
  },
  {
    value: "advanced",
    label: "Advanced",
    hint: "Review policy, storage, approvals, execution, recipes, and blueprints individually.",
  },
];

export async function promptInitModeStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "initMode">;
}): Promise<InteractiveInitMode | "guided"> {
  if (opts.flags.initMode === "advanced") return "advanced";
  if (opts.flags.initMode === "guided") return "guided";
  if (opts.flags.initMode === "quick") return "quick";
  return await selectStepValue(opts.clack, {
    message: "Setup depth",
    options: initModeOptions,
    initialValue: "quick",
    cancelMessage: "Setup depth selection cancelled.",
  });
}
