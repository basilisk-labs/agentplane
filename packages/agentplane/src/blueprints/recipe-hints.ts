import type { ResolvedRecipeBlueprintExtension } from "@agentplaneorg/recipes";

import type { BlueprintNodeKind, RecipeHint } from "./model.js";

export function recipeBlueprintExtensionToHint(
  extension: ResolvedRecipeBlueprintExtension,
): RecipeHint {
  return {
    recipeId: extension.recipe_id,
    recipeVersion: extension.recipe_version,
    recipeName: extension.recipe_name,
    extensionId: extension.extension_id,
    kind: extension.kind,
    summary: extension.summary,
    ...(extension.target_node_kind
      ? { targetNodeKind: extension.target_node_kind as BlueprintNodeKind }
      : {}),
    value: extension.value,
  };
}

export function recipeBlueprintExtensionsToHints(
  extensions: readonly ResolvedRecipeBlueprintExtension[],
): RecipeHint[] {
  return extensions.map((extension) => recipeBlueprintExtensionToHint(extension));
}
