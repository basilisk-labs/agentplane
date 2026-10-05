import path from "node:path";
import { z } from "zod";
import type { CommandContext } from "../shared/task-backend.js";
import {
  explicitRecipeSelectionSchema,
  resolveExplicitRecipeScenarioSelection,
} from "../recipes/impl/explicit-selection.js";
import {
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../shared/contained-stable-file.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { materializeRecipeScenarioTask } from "../../runner/usecases/scenario-materialize-task.js";
import type { RecipeClosureReference } from "../../runner/context/recipe-retention.js";

const fields = {
  schema_version: z.literal(1),
  bindings: z
    .array(
      z.strictObject({
        name: z.string().min(1).max(256),
        value: z.union([z.string().max(8192), z.number().finite(), z.boolean()]),
      }),
    )
    .max(128),
};
const recipeInputSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    ...fields,
    kind: z.literal("selected_recipe"),
    task_id: z.string().min(1).optional(),
    selection: explicitRecipeSelectionSchema,
  }),
  z.strictObject({
    ...fields,
    kind: z.literal("retained_recipe"),
    task_id: z.string().min(1),
    reference: z.unknown(),
  }),
]);
export type RecipeTaskInput = z.infer<typeof recipeInputSchema>;

/** CLI transport only. Native compilation, retention and Plan admission keep their existing owners. */
export async function readRecipeTaskInput(opts: { root: string; cwd: string; file: string }) {
  const identity = await captureContainedPathChainIdentity({
    repository_root: opts.root,
    file_path: path.resolve(opts.cwd, opts.file),
    label: "Recipe input",
    path_policy: { target_kind: "file", exact_case: true },
  });
  const input = recipeInputSchema.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(identity.file_path, "Recipe input", {
        max_bytes: 128 * 1024,
      }),
    ),
  );
  await assertContainedPathChainIdentityUnchanged(identity, "Recipe input");
  return input;
}
export async function validateRecipeCreationInput(command: CommandContext, input: RecipeTaskInput) {
  if (input.kind !== "selected_recipe" || input.task_id !== undefined)
    throw new Error(
      "Task creation requires an unbound explicit Recipe selection. Resume an existing Task with task plan set.",
    );
  await resolveExplicitRecipeScenarioSelection({
    project: command.resolvedProject,
    selection: input.selection,
  });
}
export async function prepareRecipeTaskInput(
  command: CommandContext,
  taskId: string,
  input: RecipeTaskInput,
) {
  if (input.task_id !== undefined && input.task_id !== taskId)
    throw new Error("Recipe input belongs to another Task.");
  const common = {
    ctx: command,
    cwd: command.resolvedProject.gitRoot,
    task_id: taskId,
    mode: "instantiate" as const,
    bindings: input.bindings,
  };
  if (input.kind === "selected_recipe") {
    const prepared = await materializeRecipeScenarioTask({ ...common, selection: input.selection });
    return {
      prepared,
      recipe_input:
        prepared.kind === "retention_required"
          ? {
              schema_version: 1 as const,
              kind: "retained_recipe" as const,
              task_id: taskId,
              reference: prepared.reference,
              bindings: prepared.bindings,
            }
          : { ...input, task_id: taskId },
    };
  }
  const reference = input.reference as RecipeClosureReference;
  const expectedRoot = path.posix.join(
    command.config.paths.workflow_dir.replaceAll("\\", "/"),
    taskId,
    "quality",
  );
  if (reference?.task_quality_root !== expectedRoot)
    throw new Error("Retained Recipe input requires this Task's evidence owner.");
  const prepared = await materializeRecipeScenarioTask({ ...common, reference });
  return { prepared, recipe_input: input };
}
export function recipePreparationMessage(kind: string) {
  return kind === "retention_required"
    ? "The native repository owner must commit the exact reference.artifact.path before portable admission. Save recipe_input as JSON and resume task plan set with --recipe-file. Preparation grants no execution approval."
    : "Resolve the returned evidence needs or specialization request, then resume this same Task. Preparation grants no execution approval.";
}
