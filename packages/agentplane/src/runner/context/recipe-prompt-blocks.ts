import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  convertRecipeV1Extensions,
  type RecipeManifest,
  type RecipeV1ExtensionConversion,
} from "@agentplaneorg/recipes";

import { fileExists } from "../../cli/fs-utils.js";
import { resolveBehavior, type BehaviorCandidate } from "../../runtime/behavior/index.js";
import type {
  RunnerPromptBlock,
  RunnerPromptRole,
  RunnerRecipeContext,
  RunnerTaskContext,
} from "../types.js";
import {
  BASE_PROMPT_PRIORITIES,
  isRecord,
  promptBlockFromResolved,
  promptCandidate,
  readOptionalStringArray,
  renderRecipePromptJson,
  toPromptSource,
  type PromptSourcePayload,
  type PromptSourceTraceMetadata,
} from "./prompt-block-shared.js";

async function loadRecipePromptTextBlock(opts: {
  git_root: string;
  recipe_dir: string;
  prompt_id: string;
  role: RunnerPromptRole;
  title: string;
  relative_file?: string;
  fallback_source: string;
  fallback_content?: string;
  fallback_payload?: Record<string, unknown>;
  priority: number;
}): Promise<RunnerPromptBlock> {
  const candidates: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>[] = [];
  const relativeFile = opts.relative_file?.trim();
  if (relativeFile) {
    const absPath = path.join(opts.recipe_dir, relativeFile);
    if (await fileExists(absPath)) {
      const source = toPromptSource(opts.git_root, absPath);
      candidates.push(
        promptCandidate({
          layer: "extension",
          source,
          value: {
            source,
            title: opts.title,
            content: await readFile(absPath, "utf8"),
          },
        }),
      );
    }
  }
  if (typeof opts.fallback_content === "string" && opts.fallback_content.trim().length > 0) {
    candidates.push(
      promptCandidate({
        layer: "extension",
        source: opts.fallback_source,
        value: {
          source: opts.fallback_source,
          title: opts.title,
          content: opts.fallback_content,
        },
        order: 10,
      }),
    );
  } else if (opts.fallback_payload) {
    candidates.push(
      promptCandidate({
        layer: "extension",
        source: opts.fallback_source,
        value: {
          source: opts.fallback_source,
          title: opts.title,
          content: renderRecipePromptJson(opts.fallback_payload),
        },
        order: 10,
      }),
    );
  }
  const resolved = resolveBehavior({
    key: opts.prompt_id,
    candidates,
  });
  return promptBlockFromResolved({
    id: opts.prompt_id,
    role: opts.role,
    priority: opts.priority,
    resolved,
  });
}

export async function collectRecipePromptBlocks(opts: {
  git_root: string;
  recipe: RunnerRecipeContext;
  task?: RunnerTaskContext;
  command?: string;
}): Promise<RunnerPromptBlock[]> {
  const recipeDir = opts.recipe.recipe_dir?.trim();
  if (!recipeDir) return [];

  const promptBlocks: RunnerPromptBlock[] = [];
  const scenario = isRecord(opts.recipe.scenario) ? opts.recipe.scenario : {};
  const executionContext = {
    recipe: {
      id: opts.recipe.recipe_id,
      name: opts.recipe.recipe_name ?? null,
      version: opts.recipe.recipe_version ?? null,
      scenario_id: opts.recipe.scenario_id,
      scenario_file: opts.recipe.scenario_file ?? null,
    },
    selection_reasons: opts.recipe.selection_reasons ?? [],
    run_profile: opts.recipe.run_profile ?? {},
    scenario: {
      summary: typeof scenario.summary === "string" ? scenario.summary : null,
      description: typeof scenario.description === "string" ? scenario.description : null,
      goal: typeof scenario.goal === "string" ? scenario.goal : null,
      evidence: isRecord(scenario.evidence) ? scenario.evidence : null,
      outputs: readOptionalStringArray(scenario.outputs),
    },
  } satisfies Record<string, unknown>;
  promptBlocks.push({
    id: "recipe.execution_context",
    role: "context",
    title: `Recipe Scenario Context (${opts.recipe.recipe_id}:${opts.recipe.scenario_id})`,
    source: `recipe:${opts.recipe.recipe_id}:${opts.recipe.scenario_id}`,
    priority: BASE_PROMPT_PRIORITIES.recipe_execution_context,
    content: renderRecipePromptJson(executionContext),
  });

  const manifest = isRecord(opts.recipe.manifest) ? (opts.recipe.manifest as RecipeManifest) : null;
  const conversion: RecipeV1ExtensionConversion | null = manifest
    ? convertRecipeV1Extensions({
        recipes: [{ manifest }],
        runtime: {
          task_kind: opts.task?.metadata.task_kind ?? undefined,
          command: opts.command,
          tags: opts.task?.metadata.tags ?? [],
        },
        includeIncompatible: true,
      })
    : null;
  if (conversion?.status === "manual_conversion_required") {
    throw new Error(
      [
        "RECIPE_V1_MANUAL_CONVERSION_REQUIRED",
        "Recipe V1 contains a graph constraint without an exact native mapping.",
        JSON.stringify(conversion.manual_conversion, null, 2),
      ].join("\n"),
    );
  }
  if (conversion) {
    const nonEvidenceSurfaces = {
      schema_version: conversion.schema_version,
      kind: conversion.kind,
      authority: "advisory_only",
      guidance: conversion.native_surfaces.guidance,
      outputs: conversion.native_surfaces.outputs,
      artifacts: conversion.native_surfaces.artifacts,
      route_preferences: conversion.native_surfaces.route_preferences,
      rejected: conversion.rejected,
    };
    if (
      nonEvidenceSurfaces.guidance.length > 0 ||
      nonEvidenceSurfaces.outputs.length > 0 ||
      nonEvidenceSurfaces.artifacts.length > 0 ||
      nonEvidenceSurfaces.route_preferences.length > 0 ||
      nonEvidenceSurfaces.rejected.length > 0
    ) {
      promptBlocks.push({
        id: "recipe.v1.native_surfaces",
        role: "context",
        title: "Recipe V1 Native Guidance",
        source: `recipe:${opts.recipe.recipe_id}:v1-native-surfaces`,
        priority: BASE_PROMPT_PRIORITIES.recipe_execution_context + 1,
        content: renderRecipePromptJson(nonEvidenceSurfaces),
      });
    }
    if (conversion.native_surfaces.required_evidence.length > 0) {
      promptBlocks.push({
        id: "recipe.v1.required_evidence",
        role: "policy",
        title: "Recipe V1 Required Evidence",
        source: `recipe:${opts.recipe.recipe_id}:v1-required-evidence`,
        priority: BASE_PROMPT_PRIORITIES.recipe_execution_context + 2,
        surface: "verification",
        strength: "required",
        content: renderRecipePromptJson({
          schema_version: conversion.schema_version,
          kind: "recipe_required_evidence",
          requirements: conversion.native_surfaces.required_evidence,
        }),
      });
    }
  }

  const agentBlocks = await Promise.all(
    (opts.recipe.agents ?? []).map(async (agent, index) => {
      const agentId = typeof agent.id === "string" ? agent.id : `agent_${index + 1}`;
      return loadRecipePromptTextBlock({
        git_root: opts.git_root,
        recipe_dir: recipeDir,
        prompt_id: `recipe.agent.${agentId}`,
        role: "profile",
        title: `Recipe Agent Prompt (${agentId})`,
        relative_file: typeof agent.file === "string" ? agent.file : undefined,
        fallback_source: `recipe:${opts.recipe.recipe_id}:agent:${agentId}`,
        fallback_content: typeof agent.content === "string" ? agent.content : undefined,
        fallback_payload: agent,
        priority: BASE_PROMPT_PRIORITIES.recipe_agent_profile + index,
      });
    }),
  );
  promptBlocks.push(...agentBlocks);

  const skillBlocks = await Promise.all(
    (opts.recipe.skills ?? []).map(async (skill, index) => {
      const skillId = typeof skill.id === "string" ? skill.id : `skill_${index + 1}`;
      return loadRecipePromptTextBlock({
        git_root: opts.git_root,
        recipe_dir: recipeDir,
        prompt_id: `recipe.skill.${skillId}`,
        role: "context",
        title: `Recipe Skill Prompt (${skillId})`,
        relative_file: typeof skill.file === "string" ? skill.file : undefined,
        fallback_source: `recipe:${opts.recipe.recipe_id}:skill:${skillId}`,
        fallback_content: typeof skill.content === "string" ? skill.content : undefined,
        fallback_payload: skill,
        priority: BASE_PROMPT_PRIORITIES.recipe_skill_context + index,
      });
    }),
  );
  promptBlocks.push(...skillBlocks);

  if ((opts.recipe.tools ?? []).length > 0) {
    const toolPayload = (opts.recipe.tools ?? []).map((tool) => ({
      id: typeof tool.id === "string" ? tool.id : null,
      summary: typeof tool.summary === "string" ? tool.summary : null,
      runtime: typeof tool.runtime === "string" ? tool.runtime : null,
      entrypoint: typeof tool.entrypoint === "string" ? tool.entrypoint : null,
      permissions: readOptionalStringArray(tool.permissions),
      timeout_ms: typeof tool.timeout_ms === "number" ? tool.timeout_ms : null,
      cwd_policy: typeof tool.cwd_policy === "string" ? tool.cwd_policy : null,
    }));
    promptBlocks.push({
      id: "recipe.tools_summary",
      role: "context",
      title: "Recipe Tool Context",
      source: `recipe:${opts.recipe.recipe_id}:tools`,
      priority: BASE_PROMPT_PRIORITIES.recipe_tools_context,
      content: renderRecipePromptJson(toolPayload),
    });
  }

  return promptBlocks;
}
