import { describe, expect, it } from "vitest";

import { validateBlueprintRouteDecisionSgrResult } from "../../blueprints/sgr-decision.js";
import { validateContextExtractionSgrResult } from "../../context/sgr-extraction.js";
import { validateEvaluatorSgrResult } from "../../evaluators/sgr-result.js";
import { SGR_CONTRACT_SCHEMA_VERSION } from "./index.js";

const sourceRef = {
  path: "context/raw/tasks/202605010900-ABC123.json",
  sha256: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

describe("SGR reliability contracts", () => {
  it("validates source-backed context extraction results", () => {
    const result = validateContextExtractionSgrResult({
      schema_version: SGR_CONTRACT_SCHEMA_VERSION,
      kind: "context_extraction",
      task_id: "202605010900-ABC123",
      reasoning: [
        {
          label: "classify-source",
          summary: "Task README and ACR describe a reusable release gate.",
          evidence_refs: [sourceRef],
        },
      ],
      source_refs: [sourceRef],
      extracted_items: [
        {
          id: "entity.release-workflow",
          kind: "graph_entity",
          summary: "Release workflow is a reusable project concept.",
          source_refs: [sourceRef],
          confidence: 0.9,
          status: "proposed",
          entity: {
            id: "entity.release-workflow",
            kind: "concept",
            label: "Release workflow",
          },
        },
        {
          id: "fact.release-gate",
          kind: "fact",
          summary: "Release tasks require evidence-backed publish gates.",
          source_refs: [sourceRef],
          confidence: 0.9,
          status: "proposed",
          stale_markers: ["release workflow changed"],
          conflict_markers: [],
        },
      ],
    });

    expect(result.extracted_items[0]).toMatchObject({
      id: "entity.release-workflow",
      confidence: 0.9,
    });
  });

  it("rejects context extraction items without source references", () => {
    expect(() =>
      validateContextExtractionSgrResult({
        schema_version: SGR_CONTRACT_SCHEMA_VERSION,
        kind: "context_extraction",
        reasoning: [{ label: "extract", summary: "Extract a claim." }],
        source_refs: [sourceRef],
        extracted_items: [
          {
            id: "fact.unsourced",
            kind: "fact",
            summary: "Unsourced claim.",
            source_refs: [],
            confidence: 0.7,
            status: "proposed",
          },
        ],
      }),
    ).toThrow("extracted_items[0].source_refs");
  });

  it("requires markers for stale and conflict context extraction items", () => {
    const baseResult = {
      schema_version: SGR_CONTRACT_SCHEMA_VERSION,
      kind: "context_extraction",
      reasoning: [{ label: "extract", summary: "Extract a claim." }],
      source_refs: [sourceRef],
    };

    expect(() =>
      validateContextExtractionSgrResult({
        ...baseResult,
        extracted_items: [
          {
            id: "fact.stale",
            kind: "fact",
            summary: "Stale claim.",
            source_refs: [sourceRef],
            confidence: 0.7,
            status: "stale",
          },
        ],
      }),
    ).toThrow("stale_markers");

    expect(() =>
      validateContextExtractionSgrResult({
        ...baseResult,
        extracted_items: [
          {
            id: "fact.conflict",
            kind: "fact",
            summary: "Conflicting claim.",
            source_refs: [sourceRef],
            confidence: 0.7,
            status: "conflict",
            stale_markers: ["old source"],
          },
        ],
      }),
    ).toThrow("conflict_markers");
  });

  it("validates structured evaluator results", () => {
    const result = validateEvaluatorSgrResult({
      schema_version: SGR_CONTRACT_SCHEMA_VERSION,
      kind: "evaluator_result",
      evaluator_id: "recovery-context",
      verdict: "rework",
      findings: [
        {
          id: "finding.missing-negative-test",
          severity: "high",
          summary: "The implementation only checks the happy path.",
          broken_invariant: "Verification must cover relevant negative paths.",
          evidence_refs: [sourceRef],
        },
      ],
      missing_tests: ["Reject evaluator findings without evidence refs."],
      hidden_assumptions: ["The diff summary matches the approved task contract."],
      recovery_context: "Use task README as the primary contract source.",
    });

    expect(result.verdict).toBe("rework");
    expect(result.findings).toHaveLength(1);
  });

  it("rejects rework evaluator results without findings", () => {
    expect(() =>
      validateEvaluatorSgrResult({
        schema_version: SGR_CONTRACT_SCHEMA_VERSION,
        kind: "evaluator_result",
        evaluator_id: "recovery-context",
        verdict: "rework",
        findings: [],
        missing_tests: [],
        hidden_assumptions: [],
      }),
    ).toThrow("non-empty array for rework or blocked verdict");
  });

  it("validates structured blueprint route decisions", () => {
    const result = validateBlueprintRouteDecisionSgrResult({
      schema_version: SGR_CONTRACT_SCHEMA_VERSION,
      kind: "blueprint_route_decision",
      facts: [
        {
          label: "mutation-scope",
          summary: "The task mutates TypeScript source files.",
          evidence_refs: [sourceRef],
        },
      ],
      inferences: [
        {
          label: "task-kind",
          summary: "The task is code work in branch_pr mode.",
        },
      ],
      rejected_routes: [
        {
          blueprint_id: "analysis.light",
          reason: "Read-only analysis route cannot cover code mutation.",
        },
      ],
      selected_route: {
        blueprint_id: "code.branch_pr",
        task_kind: "code",
        rationale: "Code mutation in branch_pr requires task worktree and PR evidence.",
      },
      required_evidence: [
        {
          id: "checks.focused",
          kind: "check_result",
          description: "Focused schema tests pass.",
        },
      ],
      stop_rules: [
        {
          id: "scope-drift",
          severity: "approval_required",
          reason: "Runtime execution changes are outside this contract-only task.",
        },
      ],
      weak_links: ["The schema is not yet wired into evaluator execution."],
    });

    expect(result.selected_route.blueprint_id).toBe("code.branch_pr");
    expect(result.rejected_routes[0]?.blueprint_id).toBe("analysis.light");
  });

  it("rejects blueprint decisions without a selected route", () => {
    expect(() =>
      validateBlueprintRouteDecisionSgrResult({
        schema_version: SGR_CONTRACT_SCHEMA_VERSION,
        kind: "blueprint_route_decision",
        facts: [{ label: "intent", summary: "Analyze only." }],
        inferences: [{ label: "task-kind", summary: "analysis" }],
        rejected_routes: [],
        required_evidence: [],
        stop_rules: [],
        weak_links: [],
      }),
    ).toThrow("selected_route");
  });
});
