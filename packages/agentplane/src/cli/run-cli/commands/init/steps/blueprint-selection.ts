import type { InitFlags, SetupProfilePreset } from "../model.js";

import { parseCommaSeparatedSelection, textStepValue } from "./prompt-utils.js";
import type {
  BlueprintSelectionStepAnswers,
  InitPromptClack,
  InitSetupProfileMode,
} from "./contracts.js";

type InitBlueprintSelectionItem = {
  id: string;
  label: string;
};

function normalizeCachedBlueprintRefs(
  cachedBlueprints: readonly (InitBlueprintSelectionItem | string)[],
): string[] {
  return cachedBlueprints.map((blueprint) =>
    typeof blueprint === "string" ? blueprint : blueprint.label,
  );
}

export async function promptBlueprintSelectionStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "blueprints">;
  setupProfilePreset: SetupProfilePreset;
  setupProfileMode: InitSetupProfileMode;
  cachedBlueprints: readonly (InitBlueprintSelectionItem | string)[];
}): Promise<BlueprintSelectionStepAnswers> {
  if (opts.flags.blueprints) {
    return { blueprints: [...opts.flags.blueprints] };
  }

  if (opts.setupProfileMode !== "full" || opts.setupProfilePreset !== "full-harness") {
    return { blueprints: [] };
  }

  const cachedBlueprintRefs = normalizeCachedBlueprintRefs(opts.cachedBlueprints);
  if (cachedBlueprintRefs.length === 0) {
    return { blueprints: [] };
  }

  const answer = await textStepValue(opts.clack, {
    message: "Install cached blueprints",
    defaultValue: "none",
    placeholder: cachedBlueprintRefs.join(", "),
    validate: (value) => {
      const selected = parseCommaSeparatedSelection(value, []);
      const available = new Set(cachedBlueprintRefs);
      const missing = selected.filter((blueprint) => !available.has(blueprint));
      if (missing.length > 0) {
        return `Unknown cached blueprint: ${missing.join(", ")}`;
      }
      return;
    },
    cancelMessage: "Blueprint selection cancelled.",
  });

  return { blueprints: parseCommaSeparatedSelection(answer, []) };
}
