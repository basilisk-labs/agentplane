import path from "node:path";

import { matchOverlayWhen } from "@agentplaneorg/recipes";

import { fileExists } from "../../cli/fs-utils.js";
import { readProjectOverlayBundle } from "../../commands/recipes/impl/overlay-project.js";
import type { RunnerPromptBlock, RunnerTaskContext } from "../types.js";
import { normalizeText, OVERLAY_PROMPT_PRIORITIES } from "./prompt-block-shared.js";

async function detectRepoTypes(gitRoot: string): Promise<string[]> {
  const repoTypes = ["generic"];
  const checks: [string, string][] = [
    ["package.json", "node"],
    ["pyproject.toml", "python"],
    ["go.mod", "go"],
    ["Cargo.toml", "rust"],
  ];
  for (const [relativePath, repoType] of checks) {
    if (await fileExists(path.join(gitRoot, relativePath))) repoTypes.push(repoType);
  }
  return [...new Set(repoTypes)].toSorted();
}

function inferTaskKind(task: RunnerTaskContext | undefined): string | undefined {
  const tags = Array.isArray(task?.data.tags)
    ? task.data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  if (tags.includes("docs")) return "docs";
  if (tags.includes("refactor")) return "refactor";
  if (tags.includes("research")) return "research";
  if (tags.includes("bug") || tags.includes("bugfix")) return "bugfix";
  if (tags.length > 0) return "feature";
  return undefined;
}

export async function collectOverlayPromptBlocks(opts: {
  git_root: string;
  task?: RunnerTaskContext;
  command?: string;
}): Promise<RunnerPromptBlock[]> {
  const bundle = await readProjectOverlayBundle({
    agentplaneDir: path.join(opts.git_root, ".agentplane"),
  });
  if (!bundle) return [];
  const repoTypes = await detectRepoTypes(opts.git_root);
  const tags = Array.isArray(opts.task?.data.tags)
    ? opts.task.data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const taskKind = inferTaskKind(opts.task);
  const blocks: RunnerPromptBlock[] = [];

  for (const [surface, fragments] of Object.entries(bundle.surfaces)) {
    for (const fragment of fragments) {
      if (
        !matchOverlayWhen(fragment.when, {
          task_kind: taskKind,
          command: opts.command,
          tags,
          repo_types: repoTypes,
        })
      ) {
        continue;
      }
      blocks.push({
        id: `overlay.${fragment.recipe_id}.${fragment.id}`,
        role: fragment.strength === "required" ? "policy" : "context",
        title: `${fragment.recipe_name}: ${fragment.id}`,
        source: fragment.source,
        priority:
          OVERLAY_PROMPT_PRIORITIES[surface as keyof typeof OVERLAY_PROMPT_PRIORITIES] +
          (fragment.order ?? 0),
        surface: surface as keyof typeof OVERLAY_PROMPT_PRIORITIES,
        strength: fragment.strength,
        content: normalizeText(fragment.content),
      });
    }
  }
  return blocks;
}
