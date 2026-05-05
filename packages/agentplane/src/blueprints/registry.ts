import { BUILTIN_BLUEPRINTS } from "./builtins.js";
import type { Blueprint, BlueprintId, BlueprintRegistry } from "./model.js";
import { validateBlueprintRegistry } from "./validate.js";

function compareBlueprints(left: Blueprint, right: Blueprint): number {
  return left.id.localeCompare(right.id);
}

export function createBlueprintRegistry(
  blueprints: readonly Blueprint[] = BUILTIN_BLUEPRINTS,
): BlueprintRegistry {
  const registry = {
    blueprints: [...blueprints].toSorted(compareBlueprints),
  };
  const result = validateBlueprintRegistry(registry);
  if (!result.ok) {
    throw new Error(
      `Invalid blueprint registry:\n${result.errors
        .map((error) => `- ${error.code}: ${error.message}`)
        .join("\n")}`,
    );
  }
  return registry;
}

export function listBlueprints(
  registry: BlueprintRegistry = createBlueprintRegistry(),
): Blueprint[] {
  return [...registry.blueprints];
}

export function getBlueprint(
  id: BlueprintId,
  registry: BlueprintRegistry = createBlueprintRegistry(),
): Blueprint | undefined {
  return registry.blueprints.find((blueprint) => blueprint.id === id);
}

export function requireBlueprint(
  id: BlueprintId,
  registry: BlueprintRegistry = createBlueprintRegistry(),
): Blueprint {
  const blueprint = getBlueprint(id, registry);
  if (!blueprint) {
    throw new Error(`Unknown blueprint: ${id}`);
  }
  return blueprint;
}
