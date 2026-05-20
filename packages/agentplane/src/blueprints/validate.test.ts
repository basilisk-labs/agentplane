import { describe, expect, it } from "vitest";

import { BUILTIN_BLUEPRINTS } from "./builtins.js";
import type { Blueprint } from "./model.js";
import {
  createBlueprintRegistry,
  getBlueprint,
  listBlueprints,
  requireBlueprint,
} from "./registry.js";
import { buildBlueprintPlanArtifact } from "./plan.js";
import { resolveBlueprint } from "./resolve.js";
import {
  validateBlueprint,
  validateBlueprintPlanArtifact,
  validateBlueprintRegistry,
} from "./validate.js";

function cloneBlueprint(blueprint: Blueprint): Blueprint {
  return structuredClone(blueprint);
}

function expectError(blueprint: Blueprint, code: string): void {
  const result = validateBlueprint(blueprint);
  expect(result.ok).toBe(false);
  expect(result.errors.map((error) => error.code)).toContain(code);
}

function docsPlan() {
  const resolved = resolveBlueprint({
    input: {
      tags: ["docs"],
      taskKind: "docs",
      mutation: "docs",
      workflowMode: "branch_pr",
    },
  });
  return {
    blueprint: resolved.blueprint,
    plan: buildBlueprintPlanArtifact({ resolved }),
  };
}

describe("blueprint built-ins", () => {
  it("validates every built-in blueprint", () => {
    expect(BUILTIN_BLUEPRINTS).toHaveLength(12);

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
      "context.assimilation",
      "context.maximum_assimilation",
      "docs.change",
      "ops.approval",
      "performance.benchmark",
      "post_run.improvement_review",
      "quality.regression",
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

  it("records branch_pr verification before hosted checks and integration", () => {
    const kinds = requireBlueprint("code.branch_pr").nodes.map((node) => node.kind);

    expect(kinds.indexOf("pr_artifact")).toBeLessThan(kinds.indexOf("verify_record"));
    expect(kinds.indexOf("verify_record")).toBeLessThan(kinds.indexOf("hosted_checks"));
    expect(kinds.indexOf("verify_record")).toBeLessThan(kinds.indexOf("publish_or_integrate"));
  });

  it("keeps context assimilation lifecycle gates explicit", () => {
    const blueprint = requireBlueprint("context.assimilation");

    expect(blueprint.allowedCommands).toEqual(
      expect.arrayContaining([
        "agentplane context reindex --include-raw",
        "agentplane context wiki lint context/wiki",
        "agentplane task resume-context <task-id>",
      ]),
    );
    expect(blueprint.requiredEvidence.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "context.sources",
        "context.source_lock",
        "context.verification",
        "context.recovery",
      ]),
    );
    expect(blueprint.stopRules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "context_empty_source_set",
        "context_pipeline_order_skipped",
        "context_reindex_missing_after_writes",
        "context_agent_handoff_missing_after_stalled_work",
      ]),
    );
  });

  it("keeps maximum context assimilation coverage gates explicit", () => {
    const blueprint = requireBlueprint("context.maximum_assimilation");

    expect(blueprint.allowedCommands).toEqual(
      expect.arrayContaining([
        "agentplane context reindex --include-raw",
        "agentplane context wiki lint context/wiki",
        "agentplane context graph validate",
        "agentplane verify <task-id> --ok|--rework --by EVALUATOR",
      ]),
    );
    expect(blueprint.requiredEvidence.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "context_max.coverage",
        "context_max.addressing",
        "context_max.graph_first",
        "context_max.topology",
        "context_max.glossary",
      ]),
    );
    expect(blueprint.stopRules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "context_max_missing_topology_decision",
        "context_max_page_family_without_source_evidence",
        "context_max_missing_line_refs",
        "context_max_coverage_gap_without_reason",
        "context_max_raw_deletion_resilience_unproven",
        "context_max_sensitive_leakage",
      ]),
    );
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
        mode: "agentic",
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

describe("blueprint plan validation", () => {
  it("accepts a materialized plan that matches the selected blueprint contract", () => {
    const { blueprint, plan } = docsPlan();

    expect(validateBlueprintPlanArtifact({ blueprint, plan })).toEqual({ ok: true, errors: [] });
  });

  it("rejects policy modules outside the selected blueprint contract", () => {
    const { blueprint, plan } = docsPlan();
    const result = validateBlueprintPlanArtifact({
      blueprint,
      plan: {
        ...plan,
        policyModules: [...plan.policyModules, ".agentplane/policy/workflow.release.md"],
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain("plan_unknown_policy_module");
  });

  it("rejects context policy modules outside the selected blueprint contract", () => {
    const { blueprint, plan } = docsPlan();
    const result = validateBlueprintPlanArtifact({
      blueprint,
      plan: {
        ...plan,
        contextManifest: [
          ...plan.contextManifest,
          {
            id: ".agentplane/policy/workflow.release.md",
            kind: "policy_module",
            reason: "Injected unrelated policy.",
            source: ".agentplane/policy/workflow.release.md",
          },
        ],
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain(
      "plan_unknown_context_policy_module",
    );
  });

  it("rejects policy module budgets exceeded by the plan or context manifest", () => {
    const { blueprint, plan } = docsPlan();
    const result = validateBlueprintPlanArtifact({
      blueprint,
      plan: {
        ...plan,
        contextBudget: { ...plan.contextBudget, maxPolicyModules: 0 },
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain("plan_policy_budget_exceeded");
  });

  it("rejects duplicate, missing, unknown, and invalidly ordered states", () => {
    const { blueprint, plan } = docsPlan();
    const firstState = plan.states[0];
    const secondState = plan.states[1];
    if (!firstState || !secondState) throw new Error("docs plan must contain states");

    const result = validateBlueprintPlanArtifact({
      blueprint,
      plan: {
        ...plan,
        states: [
          { ...secondState },
          { ...firstState },
          { ...firstState },
          { ...firstState, id: "unknown" },
        ],
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining([
        "plan_duplicate_state",
        "plan_unknown_state",
        "plan_missing_finish_state",
        "plan_invalid_state_transition",
      ]),
    );
  });
});
