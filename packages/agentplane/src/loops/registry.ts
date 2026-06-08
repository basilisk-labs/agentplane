import { BUILTIN_LOOPS } from "./builtins.js";
import type { LoopId, LoopRegistry, LoopSpec } from "./model.js";
import { validateLoopRegistry } from "./validate.js";

function compareLoops(left: LoopSpec, right: LoopSpec): number {
  return left.id.localeCompare(right.id);
}

export function createLoopRegistry(loops: readonly LoopSpec[] = BUILTIN_LOOPS): LoopRegistry {
  const registry = { loops: [...loops].toSorted(compareLoops) };
  const result = validateLoopRegistry(registry);
  if (!result.ok) {
    throw new Error(
      `Invalid loop registry:\n${result.errors
        .map((error) => `- ${error.code}: ${error.message}`)
        .join("\n")}`,
    );
  }
  return registry;
}

export function listLoops(registry: LoopRegistry = createLoopRegistry()): LoopSpec[] {
  return [...registry.loops];
}

export function getLoop(
  id: LoopId,
  registry: LoopRegistry = createLoopRegistry(),
): LoopSpec | undefined {
  return registry.loops.find((loop) => loop.id === id);
}

export function requireLoop(id: LoopId, registry: LoopRegistry = createLoopRegistry()): LoopSpec {
  const loop = getLoop(id, registry);
  if (!loop) throw new Error(`Unknown loop: ${id}`);
  return loop;
}
