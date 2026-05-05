import { describe, expect, it } from "vitest";

import { BUILTIN_BLUEPRINTS } from "./builtins.js";
import type { Blueprint } from "./model.js";
import {
  createBlueprintRegistry,
  getBlueprint,
  listBlueprints,
  requireBlueprint,
} from "./registry.js";
import { validateBlueprint, validateBlueprintRegistry } from "./validate.js";

function cloneBlueprint(blueprint: Blueprint): Blueprint {
  return structuredClone(blueprint);
}

function expectError(blueprint: Blueprint, code: string): void {
  const result = validateBlueprint(blueprint);
  expect(result.ok).toBe(false);
  expect(result.errors.map((error) => error.code)).toContain(code);
}

describe("blueprint built-ins", () => {
  it("validates every built-in blueprint", () => {
    expect(BUILTIN_BLUEPRINTS).toHaveLength(7);

    for (const blueprint of BUILTIN_BLUEPRINTS) {
      expect(validateBlueprint(blueprint), blueprint.id).toEqual({ ok: true, errors: [] });
    }
  });

  it("exports a registry with stable lookup helpers", () => {
    const registry = createBlueprintRegistry();

    expect(listBlueprints(registry).map((blueprint) => blueprint.id)).toEqual([
      "analysis.light",
      "code.branch_pr",
      "code.direct",
      "content.light",
      "docs.change",
      "ops.approval",
      "release.strict",
    ]);
    expect(getBlueprint("analysis.light", registry)?.title).toBe("Lightweight analysis");
    expect(requireBlueprint("code.branch_pr", registry).workflowModes).toEqual(["branch_pr"]);
  });

  it("rejects duplicate blueprint ids in the registry", () => {
    const blueprint = requireBlueprint("analysis.light");
    const result = validateBlueprintRegistry({
      blueprints: [blueprint, cloneBlueprint(blueprint)],
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain("duplicate_blueprint_id");
    expect(() => createBlueprintRegistry([blueprint, cloneBlueprint(blueprint)])).toThrow(
      /duplicate_blueprint_id/,
    );
  });

  it("keeps lightweight analysis and content routes free of PR and CI nodes", () => {
    for (const id of ["analysis.light", "content.light"] as const) {
      const kinds = requireBlueprint(id).nodes.map((node) => node.kind);

      expect(kinds).not.toContain("worktree_start");
      expect(kinds).not.toContain("fast_local_checks");
      expect(kinds).not.toContain("pr_artifact");
      expect(kinds).not.toContain("hosted_checks");
      expect(kinds).not.toContain("publish_or_integrate");
    }
  });
});

describe("blueprint validation", () => {
  it("rejects duplicate node ids", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    const [firstNode] = blueprint.nodes;
    if (!firstNode) throw new Error("analysis.light must have at least one node");
    blueprint.nodes = [...blueprint.nodes, { ...firstNode, kind: "scope", id: firstNode.id }];

    expectError(blueprint, "duplicate_node_id");
  });

  it("rejects unknown edge targets", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.edges = [...blueprint.edges, { from: "finish", to: "missing" }];

    expectError(blueprint, "unknown_edge_node");
  });

  it("rejects cyclic v0 graphs", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.edges = [...blueprint.edges, { from: "finish", to: "scope" }];

    expectError(blueprint, "cycle");
  });

  it("rejects missing core nodes", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.nodes = blueprint.nodes.filter((node) => node.kind !== "context_resolve");
    blueprint.edges = blueprint.edges.filter(
      (edge) => edge.from !== "context_resolve" && edge.to !== "context_resolve",
    );

    expectError(blueprint, "missing_core_node");
  });

  it("rejects protected optional nodes", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.nodes = blueprint.nodes.map((node) =>
      node.kind === "finish" ? { ...node, required: false } : node,
    );

    expectError(blueprint, "optional_protected_node");
  });

  it("rejects evidence produced by unknown nodes", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.requiredEvidence = [
      ...blueprint.requiredEvidence,
      {
        id: "analysis.missing",
        kind: "sources",
        producedBy: "missing",
        required: true,
        description: "Missing producer.",
      },
    ];

    expectError(blueprint, "unknown_evidence_producer");
  });

  it("rejects evidence that the producer node does not declare", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.requiredEvidence = [
      ...blueprint.requiredEvidence,
      {
        id: "analysis.commit",
        kind: "commit",
        producedBy: "work_unit",
        required: true,
        description: "Commit should not be produced by analysis work.",
      },
    ];

    expectError(blueprint, "evidence_kind_not_produced");
  });

  it("rejects analysis and content routes with PR or CI nodes", () => {
    const blueprint = cloneBlueprint(requireBlueprint("analysis.light"));
    blueprint.nodes = [
      ...blueprint.nodes,
      {
        id: "hosted_checks",
        kind: "hosted_checks",
        mode: "deterministic",
        required: true,
      },
    ];

    expectError(blueprint, "disallowed_node_kind");
  });

  it("rejects workflow mode mismatch for code.direct and code.branch_pr", () => {
    const direct = cloneBlueprint(requireBlueprint("code.direct"));
    direct.workflowModes = ["branch_pr"];
    expectError(direct, "workflow_mode_mismatch");

    const branchPr = cloneBlueprint(requireBlueprint("code.branch_pr"));
    branchPr.workflowModes = ["direct"];
    expectError(branchPr, "workflow_mode_mismatch");
  });

  it("rejects release and ops routes without approval gates", () => {
    const release = cloneBlueprint(requireBlueprint("release.strict"));
    release.nodes = release.nodes.filter((node) => node.kind !== "approval_gate");
    release.edges = release.edges.filter(
      (edge) => edge.from !== "approval_gate" && edge.to !== "approval_gate",
    );
    expectError(release, "missing_approval_gate");

    const ops = cloneBlueprint(requireBlueprint("ops.approval"));
    ops.nodes = ops.nodes.filter((node) => node.kind !== "approval_gate");
    ops.edges = ops.edges.filter(
      (edge) => edge.from !== "approval_gate" && edge.to !== "approval_gate",
    );
    expectError(ops, "missing_approval_gate");
  });

  it("rejects ops routes without rollback evidence", () => {
    const blueprint = cloneBlueprint(requireBlueprint("ops.approval"));
    blueprint.requiredEvidence = blueprint.requiredEvidence.filter(
      (evidence) => evidence.kind !== "rollback",
    );

    expectError(blueprint, "missing_rollback_evidence");
  });
});
