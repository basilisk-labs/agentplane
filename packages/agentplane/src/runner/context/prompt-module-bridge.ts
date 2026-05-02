import { createHash } from "node:crypto";

import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleGraph,
  PromptModuleGraphNode,
  PromptModuleOwner,
  PromptModuleProvenance,
  PromptModuleSlot,
  PromptModuleSurface,
  PromptModuleTarget,
} from "../../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../../runtime/prompt-modules/index.js";
import type { RunnerPromptBlock, RunnerPromptRole } from "../types.js";

export type RunnerPromptBlockModuleContent = {
  id: string;
  role: RunnerPromptRole;
  content: string;
  priority: number;
  title?: string;
  source?: string;
  surface?: RunnerPromptBlock["surface"];
  strength?: RunnerPromptBlock["strength"];
  resolution?: RunnerPromptBlock["resolution"];
};

export type RunnerPromptModule = PromptModule<RunnerPromptBlockModuleContent>;

function hashPromptBlockContent(content: RunnerPromptBlockModuleContent): string {
  return createHash("sha256").update(JSON.stringify(content)).digest("hex");
}

function moduleNameForBlock(block: RunnerPromptBlock): string {
  return block.id.replaceAll(/[^A-Za-z0-9_.-]/g, "_");
}

function recipeIdFromSource(source: string | undefined): string | null {
  if (!source) return null;
  const recipeSource = /^recipe:([^:]+):/.exec(source);
  if (recipeSource?.[1]) return recipeSource[1];
  const recipePath = /(?:^|\/)\.agentplane\/recipes\/([^/]+)\//.exec(source);
  if (recipePath?.[1]) return recipePath[1];
  const installedRecipePath = /(?:^|\/)recipes\/([^/]+)\//.exec(source);
  return installedRecipePath?.[1] ?? null;
}

function recipeIdForBlock(block: RunnerPromptBlock): string | null {
  if (block.id.startsWith("overlay.")) return block.id.split(".")[1] ?? null;
  return recipeIdFromSource(block.source);
}

function inferModuleOwner(block: RunnerPromptBlock): PromptModuleOwner {
  const recipeId = recipeIdForBlock(block);
  if (recipeId) return { kind: "recipe", recipe_id: recipeId };
  if (block.source?.startsWith("runtime:")) return { kind: "runtime" };
  if (block.source?.startsWith("bundled:") || block.id === "base.framework_runner") {
    return { kind: "framework", package_name: "agentplane" };
  }
  return { kind: "project" };
}

function inferModuleNamespace(owner: PromptModuleOwner): PromptModuleAddress["namespace"] {
  if (owner.kind === "recipe") return `recipe.${owner.recipe_id}`;
  return owner.kind;
}

function inferModuleSurface(block: RunnerPromptBlock): PromptModuleSurface {
  if (block.id === "base.policy_gateway" || block.id === "gateway.user.instructions") {
    return "gateway";
  }
  if (block.id === "base.owner_profile" || block.id.startsWith("recipe.agent.")) {
    return "agent_profile";
  }
  if (block.role === "policy") return "policy";
  return "runner";
}

function inferModuleTarget(block: RunnerPromptBlock): PromptModuleTarget {
  if (block.id === "base.policy_gateway") {
    return block.source?.endsWith("CLAUDE.md") ? "CLAUDE.md" : "AGENTS.md";
  }
  if (block.id === "gateway.user.instructions") return "AGENTS.md";
  if (block.id === "base.owner_profile" || block.id.startsWith("recipe.agent.")) {
    return ".agentplane/agents";
  }
  if (block.id.startsWith("recipe.")) return "recipe.manifest";
  return "runner.bundle";
}

function inferModuleSlot(block: RunnerPromptBlock): PromptModuleSlot {
  if (block.id === "base.policy_gateway") return "body";
  if (block.role === "profile") return "identity";
  if (block.role === "policy") return "hard_constraint";
  if (block.role === "context" || block.role === "task") return "context";
  return "body";
}

function sourceKindForBlock(
  block: RunnerPromptBlock,
  owner: PromptModuleOwner,
): PromptModuleProvenance["source_kind"] {
  if (owner.kind === "recipe") return "recipe_asset";
  if (owner.kind === "runtime" || block.source?.startsWith("runtime:")) return "runtime";
  if (block.id === "project.skills_index") return "generated";
  if (block.source?.startsWith("bundled:")) return "framework_builtin";
  return "project_file";
}

function promptBlockContent(block: RunnerPromptBlock): RunnerPromptBlockModuleContent {
  return {
    id: block.id,
    role: block.role,
    content: block.content,
    priority: block.priority,
    ...(block.title === undefined ? {} : { title: block.title }),
    ...(block.source === undefined ? {} : { source: block.source }),
    ...(block.surface === undefined ? {} : { surface: block.surface }),
    ...(block.strength === undefined ? {} : { strength: block.strength }),
    ...(block.resolution === undefined ? {} : { resolution: block.resolution }),
  };
}

export function runnerPromptBlockToModule(block: RunnerPromptBlock): RunnerPromptModule {
  const content = promptBlockContent(block);
  const owner = inferModuleOwner(block);
  const namespace = inferModuleNamespace(owner);
  const surface = inferModuleSurface(block);
  const target = inferModuleTarget(block);
  const slot = inferModuleSlot(block);
  const name = moduleNameForBlock(block);
  const provenance: PromptModuleProvenance = {
    source_kind: sourceKindForBlock(block, owner),
    source_ref: block.source ?? block.id,
    ...(owner.kind === "recipe" ? { recipe_id: owner.recipe_id } : {}),
    ...(block.id === "project.skills_index"
      ? { generated_by: "runner.project_skill_prompt_blocks" }
      : {}),
    content_hash: hashPromptBlockContent(content),
  };

  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: `${namespace}/${surface}/${target.replaceAll("/", "~")}/${slot}/${name}`,
      namespace,
      surface,
      target,
      slot,
      name,
    },
    owner,
    title: block.title ?? block.id,
    content_kind: "json",
    content,
    mutability: owner.kind === "framework" ? "replaceable" : "extendable",
    merge: {
      mode: "append",
      conflict: "error",
      precedence: block.priority,
    },
    provenance,
  };
}

export function runnerPromptBlocksToModuleGraph(blocks: RunnerPromptBlock[]): PromptModuleGraph {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    nodes: blocks.map(
      (block): PromptModuleGraphNode => ({
        module: runnerPromptBlockToModule(block),
      }),
    ),
  };
}

function moduleToRunnerPromptBlock(module: PromptModule): RunnerPromptBlock {
  const content = module.content as RunnerPromptBlockModuleContent;
  return {
    id: content.id,
    role: content.role,
    content: content.content,
    priority: content.priority,
    ...(content.title === undefined ? {} : { title: content.title }),
    ...(content.source === undefined ? {} : { source: content.source }),
    ...(content.surface === undefined ? {} : { surface: content.surface }),
    ...(content.strength === undefined ? {} : { strength: content.strength }),
    ...(content.resolution === undefined ? {} : { resolution: content.resolution }),
  };
}

export function compileRunnerPromptModuleGraph(graph: PromptModuleGraph): RunnerPromptBlock[] {
  return graph.nodes
    .map((node) => moduleToRunnerPromptBlock(node.module))
    .toSorted((left, right) => left.priority - right.priority || left.id.localeCompare(right.id));
}

export function compileRunnerPromptBlocksThroughModules(
  blocks: RunnerPromptBlock[],
): RunnerPromptBlock[] {
  const originalBlocksByHash = new Map<string, RunnerPromptBlock[]>();
  for (const block of blocks) {
    const hash = hashPromptBlockContent(promptBlockContent(block));
    const matchingBlocks = originalBlocksByHash.get(hash) ?? [];
    matchingBlocks.push(block);
    originalBlocksByHash.set(hash, matchingBlocks);
  }

  return compileRunnerPromptModuleGraph(runnerPromptBlocksToModuleGraph(blocks)).map((block) => {
    const hash = hashPromptBlockContent(promptBlockContent(block));
    const matchingBlocks = originalBlocksByHash.get(hash);
    return matchingBlocks?.shift() ?? block;
  });
}
