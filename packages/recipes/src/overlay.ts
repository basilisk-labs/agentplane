import { createHash } from "node:crypto";

import { invalidFieldMessage, isRecord } from "./internal-utils.js";
import type {
  CompiledRecipeAssetRegistry,
  CompiledOverlayBundle,
  OverlaySurface,
  OverlayWhen,
  ProjectOverlayManifestV2,
} from "./types.js";

const ALL_OVERLAY_SURFACES: OverlaySurface[] = [
  "planning",
  "execution",
  "coding",
  "debugging",
  "review",
  "verification",
  "docs",
  "finish",
];

export function createEmptyOverlayBundle(): CompiledOverlayBundle {
  const surfaces = Object.fromEntries(
    ALL_OVERLAY_SURFACES.map((surface) => [surface, []]),
  ) as unknown as Record<OverlaySurface, CompiledOverlayBundle["surfaces"][OverlaySurface]>;
  return {
    schema_version: 1,
    kind: "overlay_bundle",
    active: [],
    surfaces,
    validators: [],
    templates: {},
    agents: [],
    tools: [],
    trace: [],
  };
}

function requireString(raw: unknown, field: string): string {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(invalidFieldMessage(field, "non-empty string"));
  }
  return raw.trim();
}

function requireRecord(raw: unknown, field: string): Record<string, unknown> {
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage(field, "object"));
  }
  return raw;
}

function validateCompiledOverlayFragment(
  raw: unknown,
  surface: OverlaySurface,
  index: number,
): void {
  const entry = requireRecord(raw, `overlay bundle.surfaces.${surface}[${index}]`);
  requireString(entry.id, `overlay bundle.surfaces.${surface}[${index}].id`);
  requireString(entry.recipe_id, `overlay bundle.surfaces.${surface}[${index}].recipe_id`);
  requireString(
    entry.recipe_version,
    `overlay bundle.surfaces.${surface}[${index}].recipe_version`,
  );
  requireString(entry.recipe_name, `overlay bundle.surfaces.${surface}[${index}].recipe_name`);
  requireString(entry.surface, `overlay bundle.surfaces.${surface}[${index}].surface`);
  requireString(entry.file, `overlay bundle.surfaces.${surface}[${index}].file`);
  requireString(entry.source, `overlay bundle.surfaces.${surface}[${index}].source`);
  requireString(entry.content, `overlay bundle.surfaces.${surface}[${index}].content`);
}

function validateCompiledOverlayBundleActive(raw: unknown, index: number): void {
  const entry = requireRecord(raw, `overlay bundle.active[${index}]`);
  requireString(entry.id, `overlay bundle.active[${index}].id`);
  requireString(entry.version, `overlay bundle.active[${index}].version`);
  requireString(entry.name, `overlay bundle.active[${index}].name`);
  requireString(entry.summary, `overlay bundle.active[${index}].summary`);
}

function validateCompiledOverlayValidator(raw: unknown, index: number): void {
  const entry = requireRecord(raw, `overlay bundle.validators[${index}]`);
  requireString(entry.id, `overlay bundle.validators[${index}].id`);
  requireString(entry.kind, `overlay bundle.validators[${index}].kind`);
  requireString(entry.phase, `overlay bundle.validators[${index}].phase`);
  requireString(entry.recipe_id, `overlay bundle.validators[${index}].recipe_id`);
  requireString(entry.recipe_version, `overlay bundle.validators[${index}].recipe_version`);
}

function validateCompiledOverlayTraceEntry(raw: unknown, index: number): void {
  const entry = requireRecord(raw, `overlay bundle.trace[${index}]`);
  requireString(entry.recipe_id, `overlay bundle.trace[${index}].recipe_id`);
  requireString(entry.recipe_version, `overlay bundle.trace[${index}].recipe_version`);
  if (typeof entry.accepted !== "boolean") {
    throw new Error(invalidFieldMessage(`overlay bundle.trace[${index}].accepted`, "boolean"));
  }
  requireString(entry.reason, `overlay bundle.trace[${index}].reason`);
}

export function validateCompiledOverlayBundle(raw: unknown): CompiledOverlayBundle {
  const bundle = requireRecord(raw, "overlay bundle");
  if (bundle.schema_version !== 1) {
    throw new Error(invalidFieldMessage("overlay bundle.schema_version", "1"));
  }
  if (bundle.kind !== "overlay_bundle") {
    throw new Error(invalidFieldMessage("overlay bundle.kind", '"overlay_bundle"'));
  }
  if (!Array.isArray(bundle.active)) {
    throw new Error(invalidFieldMessage("overlay bundle.active", "array"));
  }
  for (const [index, entry] of bundle.active.entries()) {
    validateCompiledOverlayBundleActive(entry, index);
  }

  const surfaces = requireRecord(bundle.surfaces, "overlay bundle.surfaces");
  for (const surface of ALL_OVERLAY_SURFACES) {
    const fragments = surfaces[surface];
    if (!Array.isArray(fragments)) {
      throw new Error(invalidFieldMessage(`overlay bundle.surfaces.${surface}`, "array"));
    }
    for (const [index, entry] of fragments.entries()) {
      validateCompiledOverlayFragment(entry, surface, index);
    }
  }

  if (!Array.isArray(bundle.validators)) {
    throw new Error(invalidFieldMessage("overlay bundle.validators", "array"));
  }
  for (const [index, entry] of bundle.validators.entries()) {
    validateCompiledOverlayValidator(entry, index);
  }
  if (!isRecord(bundle.templates)) {
    throw new Error(invalidFieldMessage("overlay bundle.templates", "object"));
  }
  if (!Array.isArray(bundle.agents)) {
    throw new Error(invalidFieldMessage("overlay bundle.agents", "array"));
  }
  if (!Array.isArray(bundle.tools)) {
    throw new Error(invalidFieldMessage("overlay bundle.tools", "array"));
  }
  if (!Array.isArray(bundle.trace)) {
    throw new Error(invalidFieldMessage("overlay bundle.trace", "array"));
  }
  for (const [index, entry] of bundle.trace.entries()) {
    validateCompiledOverlayTraceEntry(entry, index);
  }
  return bundle as CompiledOverlayBundle;
}

function validateCompiledRecipeAssetEntry(raw: unknown, index: number): void {
  const entry = requireRecord(raw, `recipe asset registry.entries[${index}]`);
  requireString(entry.id, `recipe asset registry.entries[${index}].id`);
  const kind = requireString(entry.kind, `recipe asset registry.entries[${index}].kind`);
  const knownKinds = [
    "agent",
    "skill",
    "tool",
    "scenario",
    "template",
    "prompt_module",
    "prompt_mutation_set",
  ];
  if (!knownKinds.includes(kind)) {
    throw new Error(
      invalidFieldMessage(
        `recipe asset registry.entries[${index}].kind`,
        '"agent" | "skill" | "tool" | "scenario" | "template" | "prompt_module" | "prompt_mutation_set"',
      ),
    );
  }
  requireString(entry.recipe_id, `recipe asset registry.entries[${index}].recipe_id`);
  requireString(entry.recipe_version, `recipe asset registry.entries[${index}].recipe_version`);
  requireString(entry.recipe_name, `recipe asset registry.entries[${index}].recipe_name`);
  requireString(entry.asset_id, `recipe asset registry.entries[${index}].asset_id`);
  requireString(entry.source, `recipe asset registry.entries[${index}].source`);
}

export function validateCompiledRecipeAssetRegistry(raw: unknown): CompiledRecipeAssetRegistry {
  const registry = requireRecord(raw, "recipe asset registry");
  if (registry.schema_version !== 1) {
    throw new Error(invalidFieldMessage("recipe asset registry.schema_version", "1"));
  }
  if (registry.kind !== "recipe_asset_registry") {
    throw new Error(invalidFieldMessage("recipe asset registry.kind", '"recipe_asset_registry"'));
  }
  if (!Array.isArray(registry.entries)) {
    throw new Error(invalidFieldMessage("recipe asset registry.entries", "array"));
  }
  for (const [index, entry] of registry.entries.entries()) {
    validateCompiledRecipeAssetEntry(entry, index);
  }
  return registry as CompiledRecipeAssetRegistry;
}

export function matchOverlayWhen(
  when: OverlayWhen | undefined,
  runtime: {
    task_kind?: string;
    command?: string;
    tags?: string[];
    repo_types?: string[];
  },
): boolean {
  if (!when) return true;
  const matchesTaskKinds =
    !when.task_kinds ||
    when.task_kinds.length === 0 ||
    Boolean(runtime.task_kind && when.task_kinds.includes(runtime.task_kind as never));
  if (!matchesTaskKinds) return false;

  const matchesCommands =
    !when.commands ||
    when.commands.length === 0 ||
    Boolean(runtime.command && when.commands.includes(runtime.command));
  if (!matchesCommands) return false;

  const tags = new Set(runtime.tags);
  const matchesTags =
    !when.tags_any || when.tags_any.length === 0 || when.tags_any.some((tag) => tags.has(tag));
  if (!matchesTags) return false;

  const repoTypes = new Set(runtime.repo_types);
  const matchesRepoTypes =
    !when.repo_types ||
    when.repo_types.length === 0 ||
    when.repo_types.some((repoType) => repoTypes.has(repoType));
  if (!matchesRepoTypes) return false;

  return true;
}

export function hashOverlayInputs(opts: {
  manifest: ProjectOverlayManifestV2;
  prompts: { id: string; content: string }[];
}): string {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(opts.manifest));
  for (const prompt of opts.prompts) {
    hash.update(prompt.id);
    hash.update("\n");
    hash.update(prompt.content);
    hash.update("\n");
  }
  return hash.digest("hex");
}
