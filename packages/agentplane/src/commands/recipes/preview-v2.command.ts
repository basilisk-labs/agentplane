import { resolveProject } from "@agentplaneorg/core/project";
import { MissingScenarioParametersError, resolveScenarioParameters } from "@agentplaneorg/recipes";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { readRecipeTaskInput } from "../task/recipe-input.js";
import { resolveExplicitRecipeScenarioSelection } from "./impl/explicit-selection.js";

export const recipesPreviewV2Spec: CommandSpec<{ file: string }> = {
  id: ["recipes", "preview-v2"],
  group: "Recipes",
  summary:
    "Preview an exact installed V2 selection without creating a Task, retaining artifacts or granting approval.",
  description:
    'Read a JSON object with schema_version 1, kind "selected_recipe", selection {recipe_id, optional recipe_version, scenario_id, scenario_api_version: "2"}, and bindings [{name, value}]. This previews formal parameter expansion only. Task intent, applicability, dependency retention, Plan validation and USER approval remain native task boundaries.',
  args: [{ name: "file", required: true, valueHint: "<recipe-input.json>" }],
  parse: (raw) => ({ file: String(raw.args.file) }),
};
export const runRecipesPreviewV2: CommandHandler<{ file: string }> = async (ctx, parsed) => {
  const project = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const input = await readRecipeTaskInput({
    root: project.gitRoot,
    cwd: ctx.cwd,
    file: parsed.file,
  });
  if (input.kind !== "selected_recipe")
    throw new Error("Preview requires an explicit installed selection.");
  const selected = await resolveExplicitRecipeScenarioSelection({
    project,
    selection: input.selection,
  });
  let preview;
  try {
    preview = {
      kind: "preview_only",
      selection: selected.selection,
      scenario: resolveScenarioParameters(selected.scenario, input.bindings),
      next: "Use task create --recipe-file with explicit native intent. Preview grants no applicability, retention, Plan admission or execution authority.",
    };
  } catch (error) {
    if (!(error instanceof MissingScenarioParametersError)) throw error;
    preview = {
      kind: "needs_evidence",
      evidence_needs: error.parameterNames.map((name) => ({
        kind: "parameter",
        name,
        reason: "required_parameter_missing",
      })),
    };
  }
  process.stdout.write(`${JSON.stringify(preview, null, 2)}\n`);
  return 0;
};
