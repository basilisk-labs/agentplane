import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { matchOverlayWhen } from "@agentplaneorg/recipes";

import { loadAgentTemplates, loadPolicyGatewayTemplate } from "../../agents/agents-template.js";
import { fileExists } from "../../cli/fs-utils.js";
import { readProjectOverlayBundle } from "../../commands/recipes.js";
import {
  resolveBehavior,
  stripBehaviorValue,
  type BehaviorCandidate,
  type ResolvedBehavior,
} from "../../runtime/behavior/index.js";
import {
  resolvePolicyGatewayForRepo,
  type PolicyGatewayFlavor,
} from "../../shared/policy-gateway.js";
import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import type {
  RunnerPromptBlock,
  RunnerPromptRole,
  RunnerRecipeContext,
  RunnerTaskContext,
} from "../types.js";

const FRAMEWORK_RUNNER_PROMPT_URL = new URL("../../../assets/RUNNER.md", import.meta.url);

const BASE_PROMPT_PRIORITIES = {
  framework_runner: 100,
  policy_gateway: 200,
  execution_profile: 250,
  owner_profile: 300,
  recipe_execution_context: 400,
  recipe_agent_profile: 500,
  recipe_skill_context: 600,
  recipe_tools_context: 700,
} as const;

const OVERLAY_PROMPT_PRIORITIES = {
  planning: 410,
  execution: 420,
  coding: 430,
  debugging: 440,
  review: 450,
  verification: 460,
  docs: 470,
  finish: 480,
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
    ? task?.data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  if (tags.includes("docs")) return "docs";
  if (tags.includes("refactor")) return "refactor";
  if (tags.includes("research")) return "research";
  if (tags.includes("bug") || tags.includes("bugfix")) return "bugfix";
  if (tags.length > 0) return "feature";
  return undefined;
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

async function collectOverlayPromptBlocks(opts: {
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
    ? opts.task?.data.tags.filter((tag): tag is string => typeof tag === "string")
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

type PromptSourcePayload = {
  source: string;
  title: string;
  content: string;
};

type PromptSourceTraceMetadata = {
  title: string;
};

type ResolvedPromptSource = ResolvedBehavior<PromptSourcePayload, PromptSourceTraceMetadata>;

function promptCandidate(opts: {
  layer: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>["layer"];
  source: string;
  value: PromptSourcePayload;
  order?: number;
}): BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata> {
  return {
    layer: opts.layer,
    source: opts.source,
    value: opts.value,
    order: opts.order,
    metadata: {
      title: opts.value.title,
    },
  };
}

function promptBlockFromResolved(opts: {
  id: string;
  role: RunnerPromptRole;
  priority: number;
  resolved: ResolvedPromptSource;
}): RunnerPromptBlock {
  return {
    id: opts.id,
    role: opts.role,
    title: opts.resolved.value.title,
    source: opts.resolved.value.source,
    priority: opts.priority,
    content: opts.resolved.value.content,
    resolution: stripBehaviorValue(opts.resolved),
  };
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

export async function resolveOwnerProfilePromptSource(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<ResolvedPromptSource> {
  const candidates: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>[] = [];
  const repoProfilePath = await resolveRepoAgentProfilePath(opts);
  if (repoProfilePath) {
    const source = toPromptSource(opts.git_root, repoProfilePath);
    candidates.push(
      promptCandidate({
        layer: "user",
        source,
        value: {
          source,
          title: `Owner Agent Profile (${opts.owner_id})`,
          content: validateJsonPrompt(source, await readFile(repoProfilePath, "utf8")),
        },
      }),
    );
  }

  const bundledFileName = `${opts.owner_id}.json`;
  const bundledTemplates = await loadAgentTemplates();
  const bundled = bundledTemplates.find(
    (entry) => entry.fileName.toLowerCase() === bundledFileName.toLowerCase(),
  );
  if (!bundled) {
    throw new Error(`Bundled agent profile not found: ${bundledFileName}`);
  }
  candidates.push(
    promptCandidate({
      layer: "builtin",
      source: `bundled:agent-profile:${bundled.fileName}`,
      value: {
        source: `bundled:agent-profile:${bundled.fileName}`,
        title: `Owner Agent Profile (${opts.owner_id})`,
        content: validateJsonPrompt(`bundled:agent-profile:${bundled.fileName}`, bundled.contents),
      },
      order: 10,
    }),
  );

  return resolveBehavior({
    key: `runner.owner_profile:${opts.owner_id}`,
    candidates,
  });
}

async function loadOwnerProfilePrompt(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<RunnerPromptBlock> {
  const resolved = await resolveOwnerProfilePromptSource(opts);
  return promptBlockFromResolved({
    id: "base.owner_profile",
    role: "profile",
    priority: BASE_PROMPT_PRIORITIES.owner_profile,
    resolved,
  });
}

async function loadFrameworkRunnerPrompt(): Promise<RunnerPromptBlock> {
  const resolved = resolveBehavior({
    key: "runner.framework_prompt",
    candidates: [
      promptCandidate({
        layer: "builtin",
        source: "bundled:runner-prompt:RUNNER.md",
        value: {
          source: "bundled:runner-prompt:RUNNER.md",
          title: "Framework Runner Prompt",
          content: normalizeText(await readFile(FRAMEWORK_RUNNER_PROMPT_URL, "utf8")),
        },
      }),
    ],
  });

  return promptBlockFromResolved({
    id: "base.framework_runner",
    role: "system",
    priority: BASE_PROMPT_PRIORITIES.framework_runner,
    resolved,
  });
}

export async function resolvePolicyGatewayPromptSource(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
  harness?: ResolvedHarnessContract;
}): Promise<ResolvedPromptSource> {
  const gateway =
    opts.harness?.repo.policy_gateway ??
    (await resolvePolicyGatewayForRepo({
      gitRoot: opts.git_root,
      fallbackFlavor: opts.fallback_flavor,
    }));
  const candidates: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>[] = [];

  if (await fileExists(gateway.absPath)) {
    const source = path.relative(opts.git_root, gateway.absPath).replaceAll("\\", "/");
    candidates.push(
      promptCandidate({
        layer: "harness",
        source,
        value: {
          source,
          title: `Repository Policy Gateway (${gateway.fileName})`,
          content: normalizeText(await readFile(gateway.absPath, "utf8")),
        },
      }),
    );
  }

  candidates.push(
    promptCandidate({
      layer: "builtin",
      source: `bundled:policy-gateway:${gateway.fileName}`,
      value: {
        source: `bundled:policy-gateway:${gateway.fileName}`,
        title: `Bundled Policy Gateway Fallback (${gateway.fileName})`,
        content: await loadPolicyGatewayTemplate(gateway.flavor),
      },
      order: 10,
    }),
  );

  return resolveBehavior({
    key: `runner.policy_gateway:${gateway.fileName}`,
    candidates,
  });
}

async function loadPolicyGatewayPrompt(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
  harness?: ResolvedHarnessContract;
}): Promise<RunnerPromptBlock> {
  const resolved = await resolvePolicyGatewayPromptSource(opts);
  return promptBlockFromResolved({
    id: "base.policy_gateway",
    role: "policy",
    priority: BASE_PROMPT_PRIORITIES.policy_gateway,
    resolved,
  });
}

function renderExecutionProfilePromptContent(runtime: ResolvedExecutionProfileRuntime): string {
  return renderRecipePromptJson({
    profile: runtime.profile,
    reasoning_effort: runtime.reasoning_effort,
    budget: runtime.budget,
    approvals: runtime.approvals,
    stop_conditions: runtime.stop_conditions,
    handoff_conditions: runtime.handoff_conditions,
    unsafe_actions_requiring_explicit_user_ok: runtime.unsafe_actions_requiring_explicit_user_ok,
    runner: runtime.runner,
  });
}

function loadExecutionProfilePrompt(opts: {
  execution_profile?: ResolvedExecutionProfileRuntime;
}): RunnerPromptBlock | null {
  if (!opts.execution_profile) return null;
  const source = `runtime:execution-profile:${opts.execution_profile.profile}`;
  const resolved = resolveBehavior({
    key: "runner.execution_profile",
    candidates: [
      promptCandidate({
        layer: "harness",
        source,
        value: {
          source,
          title: `Execution Profile Runtime (${opts.execution_profile.profile})`,
          content: renderExecutionProfilePromptContent(opts.execution_profile),
        },
      }),
    ],
  });

  return promptBlockFromResolved({
    id: "base.execution_profile",
    role: "policy",
    priority: BASE_PROMPT_PRIORITIES.execution_profile,
    resolved,
  });
}

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
            content: normalizeText(await readFile(absPath, "utf8")),
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
          content: normalizeText(opts.fallback_content),
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

export async function collectRunnerBasePrompts(opts: {
  git_root: string;
  owner_id: string;
  agents_dir?: string;
  fallback_policy_gateway_flavor?: PolicyGatewayFlavor;
  task?: RunnerTaskContext;
  command?: string;
  recipe?: RunnerRecipeContext;
  harness?: ResolvedHarnessContract;
  execution_profile?: ResolvedExecutionProfileRuntime;
}): Promise<RunnerPromptBlock[]> {
  const owner_id = normalizeOwnerId(opts.owner_id);
  const trimmedAgentsDir = opts.agents_dir?.trim() ?? opts.harness?.workflow.paths.agents_dir;
  const agents_dir =
    trimmedAgentsDir && trimmedAgentsDir.length > 0 ? trimmedAgentsDir : ".agentplane/agents";
  const fallback_flavor = opts.fallback_policy_gateway_flavor ?? "codex";

  const resolvedBasePrompts = await Promise.all([
    loadFrameworkRunnerPrompt(),
    loadPolicyGatewayPrompt({
      git_root: opts.git_root,
      fallback_flavor,
      harness: opts.harness,
    }),
    Promise.resolve(loadExecutionProfilePrompt({ execution_profile: opts.execution_profile })),
    loadOwnerProfilePrompt({ git_root: opts.git_root, agents_dir, owner_id }),
  ]);
  const basePrompts = resolvedBasePrompts.filter(
    (prompt): prompt is RunnerPromptBlock => prompt !== null,
  );

  const prompts = [
    ...basePrompts,
    ...(await collectOverlayPromptBlocks({
      git_root: opts.git_root,
      task: opts.task,
      command: opts.command,
    })),
    ...(await collectRecipePromptBlocks({
      git_root: opts.git_root,
      recipe: opts.recipe ?? { recipe_id: "", scenario_id: "" },
    })),
  ];

  return prompts.toSorted(
    (left, right) => left.priority - right.priority || left.id.localeCompare(right.id),
  );
}
