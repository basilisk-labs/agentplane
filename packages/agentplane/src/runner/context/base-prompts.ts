import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadAgentTemplates, loadPolicyGatewayTemplate } from "../../agents/agents-template.js";
import { fileExists } from "../../cli/fs-utils.js";
import {
  resolvePolicyGatewayForRepo,
  type PolicyGatewayFlavor,
} from "../../shared/policy-gateway.js";
import type { RunnerPromptBlock, RunnerPromptRole, RunnerRecipeContext } from "../types.js";

const FRAMEWORK_RUNNER_PROMPT_URL = new URL("../../../assets/RUNNER.md", import.meta.url);

const BASE_PROMPT_PRIORITIES = {
  framework_runner: 100,
  policy_gateway: 200,
  owner_profile: 300,
  recipe_execution_context: 400,
  recipe_agent_profile: 500,
  recipe_skill_context: 600,
  recipe_tools_context: 700,
} as const;

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function normalizeOwnerId(ownerIdRaw: string): string {
  const trimmed = ownerIdRaw.trim();
  if (!trimmed) throw new Error("Runner base prompt collection requires a non-empty owner id.");
  return trimmed.toUpperCase();
}

function normalizeText(text: string): string {
  return ensureTrailingNewline(text.trimEnd());
}

function validateJsonPrompt(source: string, text: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new Error(`Invalid prompt JSON: ${source} (malformed JSON)`);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid prompt JSON: ${source} (expected object)`);
  }
  return normalizeText(text);
}

function renderRecipePromptJson(
  value: Record<string, unknown> | Record<string, unknown>[],
): string {
  return normalizeText(JSON.stringify(value, null, 2));
}

function toPromptSource(gitRoot: string, absPath: string): string {
  return path.relative(gitRoot, absPath).replaceAll("\\", "/");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function readOptionalStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

async function resolveRepoAgentProfilePath(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<string | null> {
  const agentsDir = path.join(opts.git_root, opts.agents_dir);
  if (!(await fileExists(agentsDir))) return null;

  const entries = await readdir(agentsDir);
  const wanted = `${opts.owner_id}.json`.toLowerCase();
  const match = entries.find((entry) => entry.endsWith(".json") && entry.toLowerCase() === wanted);
  if (!match) return null;
  return path.join(agentsDir, match);
}

async function loadOwnerProfilePrompt(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<RunnerPromptBlock> {
  const repoProfilePath = await resolveRepoAgentProfilePath(opts);
  if (repoProfilePath) {
    const source = toPromptSource(opts.git_root, repoProfilePath);
    const content = validateJsonPrompt(source, await readFile(repoProfilePath, "utf8"));
    return {
      id: "base.owner_profile",
      role: "profile",
      title: `Owner Agent Profile (${opts.owner_id})`,
      source,
      priority: BASE_PROMPT_PRIORITIES.owner_profile,
      content,
    };
  }

  const bundledFileName = `${opts.owner_id}.json`;
  const bundledTemplates = await loadAgentTemplates();
  const bundled = bundledTemplates.find(
    (entry) => entry.fileName.toLowerCase() === bundledFileName.toLowerCase(),
  );
  if (!bundled) {
    throw new Error(`Bundled agent profile not found: ${bundledFileName}`);
  }

  return {
    id: "base.owner_profile",
    role: "profile",
    title: `Owner Agent Profile (${opts.owner_id})`,
    source: `bundled:agent-profile:${bundled.fileName}`,
    priority: BASE_PROMPT_PRIORITIES.owner_profile,
    content: validateJsonPrompt(`bundled:agent-profile:${bundled.fileName}`, bundled.contents),
  };
}

async function loadFrameworkRunnerPrompt(): Promise<RunnerPromptBlock> {
  return {
    id: "base.framework_runner",
    role: "system",
    title: "Framework Runner Prompt",
    source: "bundled:runner-prompt:RUNNER.md",
    priority: BASE_PROMPT_PRIORITIES.framework_runner,
    content: normalizeText(await readFile(FRAMEWORK_RUNNER_PROMPT_URL, "utf8")),
  };
}

async function loadPolicyGatewayPrompt(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
}): Promise<RunnerPromptBlock> {
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: opts.git_root,
    fallbackFlavor: opts.fallback_flavor,
  });

  if (await fileExists(gateway.absPath)) {
    const source = path.relative(opts.git_root, gateway.absPath).replaceAll("\\", "/");
    return {
      id: "base.policy_gateway",
      role: "policy",
      title: `Repository Policy Gateway (${gateway.fileName})`,
      source,
      priority: BASE_PROMPT_PRIORITIES.policy_gateway,
      content: normalizeText(await readFile(gateway.absPath, "utf8")),
    };
  }

  return {
    id: "base.policy_gateway",
    role: "policy",
    title: `Bundled Policy Gateway Fallback (${gateway.fileName})`,
    source: `bundled:policy-gateway:${gateway.fileName}`,
    priority: BASE_PROMPT_PRIORITIES.policy_gateway,
    content: await loadPolicyGatewayTemplate(gateway.flavor),
  };
}

async function loadRecipePromptJsonBlock(opts: {
  git_root: string;
  recipe_dir: string;
  prompt_id: string;
  role: RunnerPromptRole;
  title: string;
  relative_file?: string;
  fallback_source: string;
  fallback_payload: Record<string, unknown>;
  priority: number;
}): Promise<RunnerPromptBlock> {
  const relativeFile = opts.relative_file?.trim();
  if (relativeFile) {
    const absPath = path.join(opts.recipe_dir, relativeFile);
    if (await fileExists(absPath)) {
      const source = toPromptSource(opts.git_root, absPath);
      return {
        id: opts.prompt_id,
        role: opts.role,
        title: opts.title,
        source,
        priority: opts.priority,
        content: validateJsonPrompt(source, await readFile(absPath, "utf8")),
      };
    }
  }
  return {
    id: opts.prompt_id,
    role: opts.role,
    title: opts.title,
    source: opts.fallback_source,
    priority: opts.priority,
    content: renderRecipePromptJson(opts.fallback_payload),
  };
}

async function collectRecipePromptBlocks(opts: {
  git_root: string;
  recipe: RunnerRecipeContext;
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

  const agentBlocks = await Promise.all(
    (opts.recipe.agents ?? []).map(async (agent, index) => {
      const agentId = typeof agent.id === "string" ? agent.id : `agent_${index + 1}`;
      return loadRecipePromptJsonBlock({
        git_root: opts.git_root,
        recipe_dir: recipeDir,
        prompt_id: `recipe.agent.${agentId}`,
        role: "profile",
        title: `Recipe Agent Prompt (${agentId})`,
        relative_file: typeof agent.file === "string" ? agent.file : undefined,
        fallback_source: `recipe:${opts.recipe.recipe_id}:agent:${agentId}`,
        fallback_payload: agent,
        priority: BASE_PROMPT_PRIORITIES.recipe_agent_profile + index,
      });
    }),
  );
  promptBlocks.push(...agentBlocks);

  const skillBlocks = await Promise.all(
    (opts.recipe.skills ?? []).map(async (skill, index) => {
      const skillId = typeof skill.id === "string" ? skill.id : `skill_${index + 1}`;
      return loadRecipePromptJsonBlock({
        git_root: opts.git_root,
        recipe_dir: recipeDir,
        prompt_id: `recipe.skill.${skillId}`,
        role: "context",
        title: `Recipe Skill Prompt (${skillId})`,
        relative_file: typeof skill.file === "string" ? skill.file : undefined,
        fallback_source: `recipe:${opts.recipe.recipe_id}:skill:${skillId}`,
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

export async function collectRunnerBasePrompts(opts: {
  git_root: string;
  owner_id: string;
  agents_dir?: string;
  fallback_policy_gateway_flavor?: PolicyGatewayFlavor;
  recipe?: RunnerRecipeContext;
}): Promise<RunnerPromptBlock[]> {
  const owner_id = normalizeOwnerId(opts.owner_id);
  const trimmedAgentsDir = opts.agents_dir?.trim();
  const agents_dir =
    trimmedAgentsDir && trimmedAgentsDir.length > 0 ? trimmedAgentsDir : ".agentplane/agents";
  const fallback_flavor = opts.fallback_policy_gateway_flavor ?? "codex";

  const prompts = [
    ...(await Promise.all([
      loadFrameworkRunnerPrompt(),
      loadPolicyGatewayPrompt({ git_root: opts.git_root, fallback_flavor }),
      loadOwnerProfilePrompt({ git_root: opts.git_root, agents_dir, owner_id }),
    ])),
    ...(await collectRecipePromptBlocks({
      git_root: opts.git_root,
      recipe: opts.recipe ?? { recipe_id: "", scenario_id: "" },
    })),
  ];

  return prompts.toSorted(
    (left, right) => left.priority - right.priority || left.id.localeCompare(right.id),
  );
}
