import { describe, expect, it } from "vitest";

import type { BlueprintResolveInput } from "./model.js";
import { resolveBlueprint } from "./resolve.js";
import {
  blueprintSnapshotDigest,
  blueprintSnapshotPayloadForDigest,
  buildBlueprintResolvedSnapshot,
  stableBlueprintSnapshotJson,
  validateBlueprintResolvedSnapshot,
} from "./snapshot.js";

function input(overrides: Partial<BlueprintResolveInput> = {}): BlueprintResolveInput {
  return {
    tags: [],
    mutation: "none",
    ...overrides,
  };
}

describe("blueprint resolved snapshots", () => {
  it("captures resolver input, selected route, evidence, stop rules, recipes, and digest", () => {
    const resolveInput = input({
      taskId: "202605060915-YN0VAQ",
      title: "Define resolved blueprint snapshot schema",
      tags: ["blueprints", "code"],
      taskKind: "code",
      workflowMode: "branch_pr",
      mutation: "code",
      mutationScope: "code",
      touchedPaths: ["packages/agentplane/src/blueprints/model.ts"],
      riskFlags: ["merge"],
      recipeHints: [
        {
          recipeId: "blueprint-recipe",
          recipeVersion: "0.5.0",
          kind: "context_hint",
          value: { docs: ["docs/developer/blueprints.mdx"] },
        },
      ],
    });
    const resolved = resolveBlueprint({ input: resolveInput });
    const snapshot = buildBlueprintResolvedSnapshot({
      resolved,
      input: resolveInput,
      workflowMode: "branch_pr",
    });

    expect(snapshot.artifactKind).toBe("agentplane.blueprint.resolved_snapshot");
    expect(snapshot.resolverInput).toEqual(
      expect.objectContaining({
        taskId: "202605060915-YN0VAQ",
        taskKind: "code",
        workflowMode: "branch_pr",
        mutation: "code",
        mutationScope: "code",
        touchedPaths: ["packages/agentplane/src/blueprints/model.ts"],
        riskFlags: ["merge"],
      }),
    );
    expect(snapshot.selectedBlueprint.id).toBe("code.branch_pr");
    expect(snapshot.nodes.map((node) => node.kind)).toContain("fast_local_checks");
    expect(snapshot.requiredEvidence.map((item) => item.id)).toContain("code_pr.commit");
    expect(snapshot.policyModules).toContain(".agentplane/policy/workflow.branch_pr.md");
    expect(snapshot.acceptedRecipeExtensions).toEqual([
      expect.objectContaining({
        recipeId: "blueprint-recipe",
        kind: "context_hint",
        nodeKind: "context_resolve",
      }),
    ]);
    expect(snapshot.stopReasons.map((reason) => reason.id)).toContain("merge_risk");
    expect(validateBlueprintResolvedSnapshot(snapshot).ok).toBe(true);
  });

  it("produces stable canonical JSON and digest independent of object key order", () => {
    expect(stableBlueprintSnapshotJson({ b: 1, a: { d: 2, c: 3 } })).toBe(
      '{"a":{"c":3,"d":2},"b":1}',
    );
    expect(blueprintSnapshotDigest({ b: 1, a: 2 })).toEqual(
      blueprintSnapshotDigest({ a: 2, b: 1 }),
    );
  });

  it("keeps digest stable for identical resolver outputs", () => {
    const resolveInput = input({
      taskId: "T-1",
      tags: ["analysis"],
      taskKind: "analysis",
      workflowMode: "branch_pr",
      mutation: "none",
    });
    const first = buildBlueprintResolvedSnapshot({
      resolved: resolveBlueprint({ input: resolveInput }),
      input: resolveInput,
      workflowMode: "branch_pr",
    });
    const second = buildBlueprintResolvedSnapshot({
      resolved: resolveBlueprint({ input: resolveInput }),
      input: resolveInput,
      workflowMode: "branch_pr",
    });

    expect(first.digest).toEqual(second.digest);
    expect(blueprintSnapshotPayloadForDigest(first)).toEqual(
      blueprintSnapshotPayloadForDigest(second),
    );
  });

  it("rejects malformed snapshots and digest drift", () => {
    const resolveInput = input({ tags: ["docs"], mutation: "docs", workflowMode: "branch_pr" });
    const snapshot = buildBlueprintResolvedSnapshot({
      resolved: resolveBlueprint({ input: resolveInput }),
      input: resolveInput,
      workflowMode: "branch_pr",
    });

    expect(validateBlueprintResolvedSnapshot(null).errors[0]?.code).toBe("snapshot_invalid_object");
    expect(
      validateBlueprintResolvedSnapshot({ ...snapshot, schemaVersion: 2 }).errors.map(
        (error) => error.code,
      ),
    ).toContain("snapshot_invalid_schema_version");
    expect(
      validateBlueprintResolvedSnapshot({
        ...snapshot,
        plan: { ...snapshot.plan, blueprintId: "analysis.light" },
      }).errors.map((error) => error.code),
    ).toContain("snapshot_plan_mismatch");
    expect(
      validateBlueprintResolvedSnapshot({
        ...snapshot,
        selectionReasons: [...snapshot.selectionReasons, "unexpected drift"],
      }).errors.map((error) => error.code),
    ).toContain("snapshot_digest_mismatch");
  });
});
