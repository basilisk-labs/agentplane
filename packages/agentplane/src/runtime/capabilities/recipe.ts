import type {
  InstalledRecipeEntry,
  ResolvedRecipeScenarioSelection,
} from "../../commands/recipes/impl/types.js";

import { createCapabilityRegistry } from "./registry.js";
import type { AgentplaneCapabilityEntry, AgentplaneCapabilityRegistry } from "./types.js";

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
  return `recipe.${recipeId}.scenario.${scenarioId}`;
}

function agentCapabilityId(recipeId: string, agentId: string): string {
  return `recipe.${recipeId}.agent.${agentId}`;
}

function skillCapabilityId(recipeId: string, skillId: string): string {
  return `recipe.${recipeId}.skill.${skillId}`;
}

function toolCapabilityId(recipeId: string, toolId: string): string {
  return `recipe.${recipeId}.tool.${toolId}`;
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
  selection?: RecipeSelection | null;
}): AgentplaneCapabilityRegistry {
  if (opts.entry.manifest.kind !== "scenario_pack") {
    return createCapabilityRegistry([]);
  }
  const gate = opts.selection
    ? scenarioCapabilityId(opts.entry.id, opts.selection.scenario_id)
    : null;
  const entries: AgentplaneCapabilityEntry[] = [];

  for (const scenario of opts.entry.manifest.scenarios) {
    const selected = opts.selection ? scenario.id === opts.selection.scenario_id : true;
    entries.push({
      id: scenarioCapabilityId(opts.entry.id, scenario.id),
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
        scenario_id: scenario.id,
        scenario_name: scenario.name,
        file: scenario.file,
      },
    });
  }

  for (const agent of opts.entry.manifest.agents ?? []) {
    const selected = opts.selection ? opts.selection.agents_involved.includes(agent.id) : true;
    entries.push({
      id: agentCapabilityId(opts.entry.id, agent.id),
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
        agent_id: agent.id,
        role: agent.role,
        file: agent.file,
      },
    });
  }

  for (const skill of opts.entry.manifest.skills ?? []) {
    const selected = opts.selection ? opts.selection.skills_used.includes(skill.id) : true;
    entries.push({
      id: skillCapabilityId(opts.entry.id, skill.id),
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
        skill_id: skill.id,
        kind: skill.kind,
        file: skill.file,
      },
    });
  }

  for (const tool of opts.entry.manifest.tools ?? []) {
    const selected = opts.selection ? opts.selection.tools_used.includes(tool.id) : true;
    entries.push({
      id: toolCapabilityId(opts.entry.id, tool.id),
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
        tool_id: tool.id,
        runtime: tool.runtime,
        entrypoint: tool.entrypoint,
      },
    });
  }

  return createCapabilityRegistry(entries);
}
