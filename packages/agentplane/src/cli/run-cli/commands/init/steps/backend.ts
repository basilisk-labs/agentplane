import type { InitDefaults, InitFlags } from "../model.js";
import { INIT_DEFAULTS } from "../presets.js";

import { selectStepValue } from "./prompt-utils.js";
import type { BackendStepAnswers, InitPromptClack } from "./contracts.js";

const backendOptions: {
  value: NonNullable<InitFlags["backend"]>;
  label: string;
  hint: string;
}[] = [
  { value: "local", label: "Local", hint: "Store task data in .agentplane." },
  { value: "cloud", label: "Cloud", hint: "Use a hosted sync service with a local cache." },
  { value: "redmine", label: "Redmine", hint: "Prepare Redmine backend stubs." },
];

export async function promptBackendStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "backend">;
  defaults?: Pick<InitDefaults, "backend">;
}): Promise<BackendStepAnswers> {
  const defaults = opts.defaults ?? INIT_DEFAULTS;
  const backend =
    opts.flags.backend ??
    (await selectStepValue(opts.clack, {
      message: "Task backend",
      options: backendOptions,
      initialValue: defaults.backend,
      cancelMessage: "Task backend selection cancelled.",
    }));

  return { backend };
}
