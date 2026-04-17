import { createHash } from "node:crypto";

import type {
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
    !when.commands || when.commands.length === 0 || Boolean(runtime.command && when.commands.includes(runtime.command));
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
