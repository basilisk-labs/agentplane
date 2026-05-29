import type {
  AcceptedRecipeExtension,
  Blueprint,
  BlueprintNodeKind,
  RecipeHint,
  RejectedRecipeExtension,
} from "./model.js";

function extensionPointFor(
  blueprint: Blueprint,
  nodeKind: BlueprintNodeKind,
): { allowed: readonly RecipeHint["kind"][]; rejected: readonly string[] } | undefined {
  return blueprint.recipeExtensionPoints?.find((point) => point.nodeKind === nodeKind);
}

function targetNodeKindForHint(hint: RecipeHint): BlueprintNodeKind | undefined {
  if (hint.kind === "preferred_blueprint") return undefined;
  if (hint.targetNodeKind) return hint.targetNodeKind;
  if (hint.kind === "context_hint" || hint.kind === "risk_hint") return "context_resolve";
  if (hint.kind === "check_suggestion") return "deterministic_check";
  if (hint.kind === "output_schema" || hint.kind === "artifact_template") return "work_unit";
  if (hint.kind === "evidence_requirement") return "verify_record";
  return undefined;
}

function acceptedRecipeExtension(opts: {
  hint: RecipeHint;
  nodeKind: BlueprintNodeKind;
  reason: string;
}): AcceptedRecipeExtension {
  return {
    recipeId: opts.hint.recipeId,
    ...(opts.hint.recipeVersion ? { recipeVersion: opts.hint.recipeVersion } : {}),
    ...(opts.hint.recipeName ? { recipeName: opts.hint.recipeName } : {}),
    ...(opts.hint.extensionId ? { extensionId: opts.hint.extensionId } : {}),
    nodeKind: opts.nodeKind,
    kind: opts.hint.kind,
    ...(opts.hint.summary ? { summary: opts.hint.summary } : {}),
    value: opts.hint.value,
    reason: opts.reason,
  };
}

function rejectedRecipeExtension(opts: {
  hint: RecipeHint;
  nodeKind?: BlueprintNodeKind;
  reason: string;
}): RejectedRecipeExtension {
  return {
    recipeId: opts.hint.recipeId,
    ...(opts.hint.recipeVersion ? { recipeVersion: opts.hint.recipeVersion } : {}),
    ...(opts.hint.recipeName ? { recipeName: opts.hint.recipeName } : {}),
    ...(opts.hint.extensionId ? { extensionId: opts.hint.extensionId } : {}),
    ...(opts.nodeKind ? { nodeKind: opts.nodeKind } : {}),
    kind: opts.hint.kind,
    ...(opts.hint.summary ? { summary: opts.hint.summary } : {}),
    value: opts.hint.value,
    reason: opts.reason,
  };
}

export function validateRecipeHintsForBlueprint(opts: {
  blueprint: Blueprint;
  recipeHints: readonly RecipeHint[];
}): {
  acceptedRecipeExtensions: AcceptedRecipeExtension[];
  rejectedRecipeExtensions: RejectedRecipeExtension[];
} {
  const acceptedRecipeExtensions: AcceptedRecipeExtension[] = [];
  const rejectedRecipeExtensions: RejectedRecipeExtension[] = [];
  const nodeKinds = new Set(opts.blueprint.nodes.map((node) => node.kind));

  for (const hint of opts.recipeHints) {
    if (hint.kind === "preferred_blueprint") {
      const value = hint.value;
      const blueprintId =
        typeof value === "object" && value !== null && "blueprint_id" in value
          ? (value as { blueprint_id?: unknown }).blueprint_id
          : value;
      if (blueprintId === opts.blueprint.id) {
        acceptedRecipeExtensions.push(
          acceptedRecipeExtension({
            hint,
            nodeKind: "intake",
            reason: `Recipe preferred blueprint ${opts.blueprint.id} accepted.`,
          }),
        );
      } else {
        rejectedRecipeExtensions.push(
          rejectedRecipeExtension({
            hint,
            reason: `Recipe preferred blueprint ${
              typeof blueprintId === "string" ? blueprintId : "unknown"
            } did not match the resolved safe route ${opts.blueprint.id}.`,
          }),
        );
      }
      continue;
    }

    const nodeKind = targetNodeKindForHint(hint);
    if (!nodeKind || !nodeKinds.has(nodeKind)) {
      rejectedRecipeExtensions.push(
        rejectedRecipeExtension({
          hint,
          nodeKind,
          reason: "Recipe hint targets a node kind that is not active in the selected blueprint.",
        }),
      );
      continue;
    }

    const point = extensionPointFor(opts.blueprint, nodeKind);
    if (!point?.allowed.includes(hint.kind)) {
      rejectedRecipeExtensions.push(
        rejectedRecipeExtension({
          hint,
          nodeKind,
          reason: "Recipe hint is not allowed for this protected route extension point.",
        }),
      );
      continue;
    }

    acceptedRecipeExtensions.push(
      acceptedRecipeExtension({
        hint,
        nodeKind,
        reason: `Recipe hint ${hint.kind} accepted for ${nodeKind}.`,
      }),
    );
  }

  return { acceptedRecipeExtensions, rejectedRecipeExtensions };
}
