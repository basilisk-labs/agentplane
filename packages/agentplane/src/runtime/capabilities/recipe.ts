import type {
  CompiledRecipeAssetEntry,
  InstalledRecipeEntry,
  ResolvedRecipeScenarioSelection,
} from "@agentplaneorg/recipes";

import { createCapabilityRegistry } from "./registry.js";
import type { AgentplaneCapabilityEntry, AgentplaneCapabilityRegistry } from "./model.js";

type RecipeSelection = Pick<
  ResolvedRecipeScenarioSelection,
  "scenario_id" | "agents_involved" | "skills_used" | "tools_used"
>;

type RecipeEntry = Pick<InstalledRecipeEntry, "id" | "version" | "manifest">;

function source(entry: RecipeEntry) {
  return {
    id: "recipe_manifest" as const,
    detail: `${entry.id}@${entry.version}`,
  };
}

function scenarioCapabilityId(recipeId: string, scenarioId: string): string {
  return `recipe:${recipeId}/scenario:${scenarioId}`;
}

function agentCapabilityId(recipeId: string, agentId: string): string {
  return `recipe:${recipeId}/agent:${agentId}`;
}

function skillCapabilityId(recipeId: string, skillId: string): string {
  return `recipe:${recipeId}/skill:${skillId}`;
}

function toolCapabilityId(recipeId: string, toolId: string): string {
  return `recipe:${recipeId}/tool:${toolId}`;
}

function toFallbackAssets(entry: RecipeEntry): CompiledRecipeAssetEntry[] {
  const assets: CompiledRecipeAssetEntry[] = [];
  for (const scenario of entry.manifest.scenarios ?? []) {
    assets.push({
      id: scenarioCapabilityId(entry.id, scenario.id),
      kind: "scenario",
      recipe_id: entry.id,
      recipe_version: entry.version,
      recipe_name: entry.manifest.name,
      asset_id: scenario.id,
      source: scenario.file,
      summary: scenario.summary,
      definition: scenario,
    });
  }
  for (const agent of entry.manifest.agents ?? []) {
    assets.push({
      id: agentCapabilityId(entry.id, agent.id),
      kind: "agent",
      recipe_id: entry.id,
      recipe_version: entry.version,
      recipe_name: entry.manifest.name,
      asset_id: agent.id,
      source: agent.file,
      summary: agent.summary,
      definition: agent,
      content: "",
    });
  }
  for (const skill of entry.manifest.skills ?? []) {
    assets.push({
      id: skillCapabilityId(entry.id, skill.id),
      kind: "skill",
      recipe_id: entry.id,
      recipe_version: entry.version,
      recipe_name: entry.manifest.name,
      asset_id: skill.id,
      source: skill.file,
      summary: skill.summary,
      definition: skill,
      content: "",
    });
  }
  for (const tool of entry.manifest.tools ?? []) {
    assets.push({
      id: toolCapabilityId(entry.id, tool.id),
      kind: "tool",
      recipe_id: entry.id,
      recipe_version: entry.version,
      recipe_name: entry.manifest.name,
      asset_id: tool.id,
      source: tool.entrypoint,
      summary: tool.summary,
      definition: tool,
    });
  }
  return assets;
}

function selectedAvailability(opts: {
  selected: boolean;
  gate: string | null;
  reason: string;
}): Pick<AgentplaneCapabilityEntry, "availability" | "reason" | "blocked_by"> {
  if (opts.selected) {
    return { availability: "available" };
  }
  if (!opts.gate) {
    return { availability: "available" };
  }
  return {
    availability: "blocked",
    reason: opts.reason,
    blocked_by: [opts.gate],
  };
}

export function resolveRecipeCapabilityRegistry(opts: {
  entry: RecipeEntry;
  assets?: CompiledRecipeAssetEntry[];
  selection?: RecipeSelection | null;
}): AgentplaneCapabilityRegistry {
  const assets = opts.assets ?? toFallbackAssets(opts.entry);
  const gate = opts.selection
    ? scenarioCapabilityId(opts.entry.id, opts.selection.scenario_id)
    : null;
  const entries: AgentplaneCapabilityEntry[] = [];

  for (const scenario of assets.filter((asset) => asset.kind === "scenario")) {
    const selected = opts.selection ? scenario.asset_id === opts.selection.scenario_id : true;
    entries.push({
      id: scenario.id,
      kind: "scenario",
      source: source(opts.entry),
      summary: scenario.summary,
      ...selectedAvailability({
        selected,
        gate,
        reason: "The scenario is declared by the recipe but is not the active selection.",
      }),
      metadata: {
        recipe_id: opts.entry.id,
        recipe_version: opts.entry.version,
        scenario_id: scenario.asset_id,
        scenario_name: scenario.definition.name,
        file: scenario.definition.file,
      },
    });
  }

  for (const agent of assets.filter((asset) => asset.kind === "agent")) {
    const selected = opts.selection
      ? opts.selection.agents_involved.includes(agent.asset_id)
      : true;
    entries.push({
      id: agent.id,
      kind: "agent",
      source: source(opts.entry),
      summary: agent.summary,
      ...selectedAvailability({
        selected,
        gate,
        reason: "The agent is declared by the recipe but is not used by the selected scenario.",
      }),
      metadata: {
        recipe_id: opts.entry.id,
        recipe_version: opts.entry.version,
        agent_id: agent.asset_id,
        role: agent.definition.role,
        file: agent.definition.file,
      },
    });
  }

  for (const skill of assets.filter((asset) => asset.kind === "skill")) {
    const selected = opts.selection ? opts.selection.skills_used.includes(skill.asset_id) : true;
    entries.push({
      id: skill.id,
      kind: "skill",
      source: source(opts.entry),
      summary: skill.summary,
      ...selectedAvailability({
        selected,
        gate,
        reason: "The skill is declared by the recipe but is not used by the selected scenario.",
      }),
      metadata: {
        recipe_id: opts.entry.id,
        recipe_version: opts.entry.version,
        skill_id: skill.asset_id,
        file: skill.definition.file,
      },
    });
  }

  for (const tool of assets.filter((asset) => asset.kind === "tool")) {
    const selected = opts.selection ? opts.selection.tools_used.includes(tool.asset_id) : true;
    entries.push({
      id: tool.id,
      kind: "tool",
      source: source(opts.entry),
      summary: tool.summary,
      ...selectedAvailability({
        selected,
        gate,
        reason: "The tool is declared by the recipe but is not used by the selected scenario.",
      }),
      metadata: {
        recipe_id: opts.entry.id,
        recipe_version: opts.entry.version,
        tool_id: tool.asset_id,
        runtime: tool.definition.runtime,
        entrypoint: tool.definition.entrypoint,
      },
    });
  }

  return createCapabilityRegistry(entries);
}
