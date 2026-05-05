import { describe, expect, it } from "vitest";

import { explainResolvedBlueprint, formatBlueprintExplain } from "./explain.js";
import type { BlueprintResolveInput } from "./model.js";
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
      {
        recipeId: "docs-recipe",
        nodeKind: "context_resolve",
        kind: "context_hint",
        reason: "Recipe hint context_hint accepted for context_resolve.",
      },
    ]);
    expect(resolved.rejectedRecipeExtensions).toHaveLength(1);
    expect(resolved.rejectedRecipeExtensions[0]?.nodeKind).toBe("finish");
  });

  it("warns when unknown mutation falls back to analysis", () => {
    const resolved = resolve({ mutation: "unknown", title: "Inspect current state" });

    expect(resolved.blueprint.id).toBe("analysis.light");
    expect(resolved.stopReasons.map((reason) => reason.id)).toContain("unknown_mutation_scope");
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
