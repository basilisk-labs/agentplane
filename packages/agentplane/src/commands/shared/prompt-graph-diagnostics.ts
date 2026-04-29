import { createHash } from "node:crypto";

import { resolveProject } from "@agentplaneorg/core/project";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type {
  PromptModule,
  PromptModuleCompiledGraph,
} from "../../runtime/prompt-modules/index.js";
import { compileProjectOverlayArtifactsFromRegistry } from "../recipes/impl/overlay-project.js";
import { readProjectPromptGraph } from "../recipes/impl/overlay-publish.js";
import { resolveProjectPromptGraphPath } from "../recipes/impl/paths.js";
import { readActiveRecipeIdsFromRegistry } from "../recipes/impl/overlay-compile.js";
import { readProjectRecipesRegistry } from "../recipes/impl/project-registry.js";

export type PromptGraphArtifactState =
  | "unavailable"
  | "not_configured"
  | "missing"
  | "current"
  | "stale"
  | "invalid"
  | "compile_error";

export type PromptGraphModuleSummary = {
  address: string;
  title: string;
  ownerKind: PromptModule["owner"]["kind"];
  ownerLabel: string;
  sourceKind: PromptModule["provenance"]["source_kind"];
  sourceRef: string;
  fragmentId: string | null;
  recipeId: string | null;
};

export type PromptGraphSummary = {
  moduleCount: number;
  bindingCount: number;
  validatorCount: number;
  diagnosticCount: number;
  errorCount: number;
  warningCount: number;
  repoOverrideCount: number;
  ownerCounts: Record<string, number>;
  sourceKindCounts: Record<string, number>;
  contentHash: string;
};

export type PromptGraphInspection = {
  artifactPath: string | null;
  artifactState: PromptGraphArtifactState;
  activeRecipeIds: string[];
  summary: PromptGraphSummary | null;
  modules: PromptGraphModuleSummary[];
  diagnostics: PromptModuleCompiledGraph["diagnostics"];
  error: string | null;
};

function stableJson(value: unknown): string {
  return JSON.stringify(canonicalizeJson(value));
}

function contentHash(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function errorMessage(err: unknown): string {
  if (err instanceof Error && err.message.trim()) return err.message.trim();
  return String(err);
}

function increment(counts: Record<string, number>, key: string): void {
  counts[key] = (counts[key] ?? 0) + 1;
}

function ownerLabel(module: PromptModule): string {
  const owner = module.owner;
  if (owner.kind === "framework") {
    return `${owner.package_name}${owner.version ? `@${owner.version}` : ""}`;
  }
  if (owner.kind === "recipe") {
    return `recipe:${owner.recipe_id}${owner.version ? `@${owner.version}` : ""}`;
  }
  if (owner.kind === "runtime") {
    return owner.adapter_id ? `runtime:${owner.adapter_id}` : "runtime";
  }
  return "project";
}

function moduleRecipeId(module: PromptModule): string | null {
  if (module.owner.kind === "recipe") return module.owner.recipe_id;
  return module.provenance.recipe_id ?? null;
}

function isRepoOverride(module: PromptModule): boolean {
  return (
    module.owner.kind === "project" ||
    module.address.namespace === "project" ||
    module.provenance.source_kind === "project_file"
  );
}

function summarizePromptGraph(graph: PromptModuleCompiledGraph): {
  summary: PromptGraphSummary;
  modules: PromptGraphModuleSummary[];
} {
  const ownerCounts: Record<string, number> = {};
  const sourceKindCounts: Record<string, number> = {};
  let repoOverrideCount = 0;
  const modules = graph.nodes
    .map((node) => node.module)
    .toSorted((left, right) => left.address.value.localeCompare(right.address.value));

  for (const module of modules) {
    increment(ownerCounts, module.owner.kind);
    increment(sourceKindCounts, module.provenance.source_kind);
    if (isRepoOverride(module)) repoOverrideCount += 1;
  }

  const errorCount = graph.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "error",
  ).length;
  const warningCount = graph.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "warning",
  ).length;

  return {
    summary: {
      moduleCount: modules.length,
      bindingCount: graph.bindings.length,
      validatorCount: graph.validators.length,
      diagnosticCount: graph.diagnostics.length,
      errorCount,
      warningCount,
      repoOverrideCount,
      ownerCounts,
      sourceKindCounts,
      contentHash: contentHash(graph),
    },
    modules: modules.map((module) => ({
      address: module.address.value,
      title: module.title,
      ownerKind: module.owner.kind,
      ownerLabel: ownerLabel(module),
      sourceKind: module.provenance.source_kind,
      sourceRef: module.provenance.source_ref,
      fragmentId: module.provenance.fragment_id ?? null,
      recipeId: moduleRecipeId(module),
    })),
  };
}

function artifactState(opts: {
  generated: PromptModuleCompiledGraph | null;
  expected: PromptModuleCompiledGraph | null;
  activeRecipeIds: string[];
}): PromptGraphArtifactState {
  if (!opts.generated) return opts.activeRecipeIds.length > 0 ? "missing" : "not_configured";
  if (!opts.expected) return "compile_error";
  return stableJson(opts.generated) === stableJson(opts.expected) ? "current" : "stale";
}

export async function inspectProjectPromptGraph(project: {
  agentplaneDir: string;
}): Promise<PromptGraphInspection> {
  const artifactPath = resolveProjectPromptGraphPath(project);
  let activeRecipeIds: string[] = [];
  try {
    activeRecipeIds = readActiveRecipeIdsFromRegistry(await readProjectRecipesRegistry(project));
  } catch (err) {
    return {
      artifactPath,
      artifactState: "compile_error",
      activeRecipeIds,
      summary: null,
      modules: [],
      diagnostics: [],
      error: `Failed to read project recipes registry: ${errorMessage(err)}`,
    };
  }

  let generated: PromptModuleCompiledGraph | null = null;
  try {
    generated = await readProjectPromptGraph(project);
  } catch (err) {
    return {
      artifactPath,
      artifactState: "invalid",
      activeRecipeIds,
      summary: null,
      modules: [],
      diagnostics: [],
      error: `Failed to read generated prompt graph: ${errorMessage(err)}`,
    };
  }

  let expected: PromptModuleCompiledGraph | null = null;
  const shouldCompileExpected = generated !== null || activeRecipeIds.length > 0;
  if (shouldCompileExpected) {
    try {
      const compiled = await compileProjectOverlayArtifactsFromRegistry(
        project,
        await readProjectRecipesRegistry(project),
      );
      expected = compiled.promptGraph;
    } catch (err) {
      const graphForSummary = generated;
      const summarized = graphForSummary ? summarizePromptGraph(graphForSummary) : null;
      return {
        artifactPath,
        artifactState: "compile_error",
        activeRecipeIds,
        summary: summarized?.summary ?? null,
        modules: summarized?.modules ?? [],
        diagnostics: graphForSummary?.diagnostics ?? [],
        error: `Failed to compile expected prompt graph: ${errorMessage(err)}`,
      };
    }
  }

  const state = artifactState({ generated, expected, activeRecipeIds });
  const graphForSummary = generated ?? expected;
  const summarized = graphForSummary ? summarizePromptGraph(graphForSummary) : null;
  return {
    artifactPath,
    artifactState: state,
    activeRecipeIds,
    summary: summarized?.summary ?? null,
    modules: summarized?.modules ?? [],
    diagnostics: graphForSummary?.diagnostics ?? [],
    error: null,
  };
}

export async function inspectPromptGraphForCwd(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<PromptGraphInspection> {
  try {
    return await inspectProjectPromptGraph(
      await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }),
    );
  } catch (err) {
    return {
      artifactPath: null,
      artifactState: "unavailable",
      activeRecipeIds: [],
      summary: null,
      modules: [],
      diagnostics: [],
      error: errorMessage(err),
    };
  }
}

function formatCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts).toSorted(([left], [right]) => left.localeCompare(right));
  return entries.length > 0 ? entries.map(([key, count]) => `${key}=${count}`).join(", ") : "none";
}

export function renderPromptGraphExplainText(inspection: PromptGraphInspection): string {
  const lines = [
    "Prompt graph:",
    `- Artifact: ${inspection.artifactPath ?? "unresolved"} (${inspection.artifactState})`,
    `- Active recipes: ${inspection.activeRecipeIds.length > 0 ? inspection.activeRecipeIds.join(", ") : "none"}`,
  ];
  if (inspection.error) {
    lines.push(`- Error: ${inspection.error}`);
  }
  if (inspection.summary) {
    lines.push(
      `- Modules: ${inspection.summary.moduleCount} (owners: ${formatCounts(inspection.summary.ownerCounts)})`,
      `- Provenance: ${formatCounts(inspection.summary.sourceKindCounts)}`,
      `- Repo overrides: ${inspection.summary.repoOverrideCount}`,
      `- Mutation effects: bindings=${inspection.summary.bindingCount}, validators=${inspection.summary.validatorCount}, diagnostics=${inspection.summary.diagnosticCount}`,
      `- Content hash: ${inspection.summary.contentHash}`,
    );
  }
  if (inspection.modules.length > 0) {
    lines.push("- Compiled modules:");
    for (const module of inspection.modules.slice(0, 50)) {
      const fragment = module.fragmentId ? `; fragment=${module.fragmentId}` : "";
      lines.push(
        `  - ${module.address} [${module.ownerLabel}; ${module.sourceKind}; ${module.sourceRef}${fragment}]`,
      );
    }
    if (inspection.modules.length > 50) {
      lines.push(`  - ... ${inspection.modules.length - 50} more`);
    }
  }
  if (inspection.diagnostics.length > 0) {
    lines.push("- Compiler diagnostics:");
    for (const diagnostic of inspection.diagnostics) {
      lines.push(`  - [${diagnostic.severity}] ${diagnostic.code}: ${diagnostic.message}`);
    }
  }
  return lines.join("\n");
}
