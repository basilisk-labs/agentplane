import { describe, expect, it } from "vitest";

import { explainResolvedBlueprint, formatBlueprintExplain } from "./explain.js";
import type { BlueprintResolveInput } from "./model.js";
import { recipeBlueprintExtensionsToHints } from "./recipe-hints.js";
import { createBlueprintRegistry, requireBlueprint } from "./registry.js";
import { inferBlueprintTaskKind, resolveBlueprint } from "./resolve.js";

function resolve(input: Partial<BlueprintResolveInput>) {
  return resolveBlueprint({
    input: {
      tags: [],
      mutation: "none",
      ...input,
    },
  });
}

describe("resolveBlueprint", () => {
  it("resolves read-only analysis to analysis.light", () => {
    const resolved = resolve({ title: "Analyze this article", mutation: "none" });

    expect(resolved.blueprint.id).toBe("analysis.light");
    expect(resolved.selectionReasons).toContain("task kind resolved to analysis");
    expect(resolved.activeNodes.map((node) => node.kind)).not.toContain("pr_artifact");
  });

  it("resolves content-only work to content.light", () => {
    const resolved = resolve({ tags: ["content"], mutation: "none" });

    expect(resolved.blueprint.id).toBe("content.light");
  });

  it("resolves docs mutation to docs.change", () => {
    const resolved = resolve({
      tags: ["docs"],
      mutation: "docs",
      touchedPaths: ["ROADMAP.md"],
      workflowMode: "branch_pr",
    });

    expect(resolved.blueprint.id).toBe("docs.change");
    expect(resolved.selectionReasons).toContain("touched paths: ROADMAP.md");
  });

  it("resolves code mutation by workflow mode", () => {
    expect(resolve({ mutation: "code", workflowMode: "direct" }).blueprint.id).toBe("code.direct");
    expect(resolve({ mutation: "code", workflowMode: "branch_pr" }).blueprint.id).toBe(
      "code.branch_pr",
    );
  });

  it("routes publish and external system risks to stronger blueprints", () => {
    expect(resolve({ mutation: "code", riskFlags: ["publish"] }).blueprint.id).toBe(
      "release.strict",
    );
    expect(resolve({ mutation: "docs", riskFlags: ["external_system"] }).blueprint.id).toBe(
      "ops.approval",
    );
  });

  it("selects risk routes by stable priority instead of input order", () => {
    expect(resolve({ mutation: "code", riskFlags: ["publish", "credentials"] }).blueprint.id).toBe(
      "ops.approval",
    );
    expect(resolve({ mutation: "code", riskFlags: ["credentials", "publish"] }).blueprint.id).toBe(
      "ops.approval",
    );
  });

  it("does not fall back outside a supplied registry", () => {
    const registry = createBlueprintRegistry([requireBlueprint("analysis.light")]);

    expect(() =>
      resolveBlueprint({
        registry,
        input: {
          tags: [],
          mutation: "code",
          workflowMode: "branch_pr",
        },
      }),
    ).toThrow("Unknown blueprint in registry: code.branch_pr");
  });

  it("keeps explicit blueprint ids as requests with compatibility stops", () => {
    const resolved = resolve({
      mutation: "code",
      workflowMode: "branch_pr",
      explicitBlueprintId: "code.direct",
    });

    expect(resolved.blueprint.id).toBe("code.direct");
    expect(resolved.stopReasons.map((reason) => reason.id)).toContain("workflow_mode_incompatible");
  });

  it("accepts and rejects recipe hints against active extension points", () => {
    const resolved = resolve({
      mutation: "code",
      workflowMode: "branch_pr",
      recipeHints: [
        {
          recipeId: "docs-recipe",
          kind: "context_hint",
          value: { docs: ["docs/developer/blueprints.mdx"] },
        },
        {
          recipeId: "bad-recipe",
          kind: "artifact_template",
          targetNodeKind: "finish",
          value: "replace finish",
        },
      ],
    });

    expect(resolved.acceptedRecipeExtensions).toEqual([
      expect.objectContaining({
        recipeId: "docs-recipe",
        nodeKind: "context_resolve",
        kind: "context_hint",
        reason: "Recipe hint context_hint accepted for context_resolve.",
        value: { docs: ["docs/developer/blueprints.mdx"] },
      }),
    ]);
    expect(resolved.rejectedRecipeExtensions).toHaveLength(1);
    expect(resolved.rejectedRecipeExtensions[0]?.nodeKind).toBe("finish");
  });

  it("warns when unknown mutation falls back to analysis", () => {
    const resolved = resolve({ mutation: "unknown", title: "Inspect current state" });

    expect(resolved.blueprint.id).toBe("analysis.light");
    expect(resolved.stopReasons.map((reason) => reason.id)).toContain("unknown_mutation_scope");
  });

  it("accepts evidence requirements only through verify_record", () => {
    const resolved = resolve({
      mutation: "none",
      recipeHints: [
        {
          recipeId: "analysis-recipe",
          recipeVersion: "1.0.0",
          recipeName: "Analysis recipe",
          extensionId: "sources-required",
          kind: "evidence_requirement",
          summary: "Require source list.",
          value: { evidence: ["sources"] },
        },
      ],
    });

    expect(resolved.acceptedRecipeExtensions).toEqual([
      expect.objectContaining({
        recipeId: "analysis-recipe",
        recipeVersion: "1.0.0",
        extensionId: "sources-required",
        nodeKind: "verify_record",
        kind: "evidence_requirement",
        value: { evidence: ["sources"] },
      }),
    ]);
  });

  it("uses compatible recipe preferred blueprints as route hints", () => {
    const resolved = resolve({
      tags: ["content"],
      mutation: "none",
      recipeHints: [
        {
          recipeId: "content-recipe",
          kind: "preferred_blueprint",
          value: { blueprint_id: "content.light" },
        },
      ],
    });

    expect(resolved.blueprint.id).toBe("content.light");
    expect(resolved.selectionReasons).toContain(
      "recipe preferred compatible blueprint: content.light",
    );
    expect(resolved.acceptedRecipeExtensions[0]).toEqual(
      expect.objectContaining({ kind: "preferred_blueprint", nodeKind: "intake" }),
    );
  });

  it("rejects incompatible recipe preferred blueprints without forcing code PR flow", () => {
    const resolved = resolve({
      title: "Analyze a market note",
      mutation: "none",
      workflowMode: "branch_pr",
      recipeHints: [
        {
          recipeId: "code-recipe",
          kind: "preferred_blueprint",
          value: { blueprint_id: "code.branch_pr" },
        },
      ],
    });

    expect(resolved.blueprint.id).toBe("analysis.light");
    expect(resolved.activeNodes.map((node) => node.kind)).not.toContain("pr_artifact");
    expect(resolved.rejectedRecipeExtensions[0]).toEqual(
      expect.objectContaining({ recipeId: "code-recipe", kind: "preferred_blueprint" }),
    );
  });

  it("keeps risk routes stronger than recipe preferred blueprints", () => {
    const resolved = resolve({
      tags: ["content"],
      mutation: "none",
      riskFlags: ["publish"],
      recipeHints: [
        {
          recipeId: "content-recipe",
          kind: "preferred_blueprint",
          value: { blueprint_id: "content.light" },
        },
      ],
    });

    expect(resolved.blueprint.id).toBe("release.strict");
    expect(resolved.selectionReasons[0]).toContain("risk flags require release.strict");
  });

  it("bridges normalized recipe blueprint extensions into resolver hints", () => {
    const hints = recipeBlueprintExtensionsToHints([
      {
        recipe_id: "research",
        recipe_version: "0.1.0",
        recipe_name: "Research",
        extension_id: "prefer-analysis",
        kind: "preferred_blueprint",
        summary: "Prefer analysis for research recipes.",
        value: { blueprint_id: "analysis.light" },
        reasons: ["extension matched task context"],
      },
    ]);

    const resolved = resolve({
      title: "Inspect market context",
      mutation: "none",
      recipeHints: hints,
    });

    expect(resolved.blueprint.id).toBe("analysis.light");
    expect(resolved.acceptedRecipeExtensions[0]).toEqual(
      expect.objectContaining({
        recipeId: "research",
        recipeVersion: "0.1.0",
        recipeName: "Research",
        extensionId: "prefer-analysis",
        kind: "preferred_blueprint",
      }),
    );
  });

  it("infers task kind without constructing a resolved blueprint", () => {
    expect(inferBlueprintTaskKind({ mutation: "none", tags: ["editorial"] })).toBe("content");
    expect(inferBlueprintTaskKind({ mutation: "release", tags: [] })).toBe("release");
  });
});

describe("explainResolvedBlueprint", () => {
  it("creates stable explain output and text formatting", () => {
    const resolved = resolve({
      mutation: "code",
      workflowMode: "branch_pr",
      recipeHints: [{ recipeId: "checks", kind: "check_suggestion", value: "bun test" }],
    });
    const output = explainResolvedBlueprint({ resolved, workflowMode: "branch_pr" });

    expect(output.blueprintId).toBe("code.branch_pr");
    expect(output.route.map((node) => node.kind)).toContain("hosted_checks");
    expect(output.requiredEvidence.map((item) => item.id)).toContain("code_pr.commit");
    expect(formatBlueprintExplain(output)).toContain("blueprint_id: code.branch_pr");
    expect(formatBlueprintExplain(output)).toContain("workflow_mode: branch_pr");
  });
});
