import { mkdir, mkdtemp, realpath, rename, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseScenarioV2, type ScenarioPredicate } from "@agentplaneorg/recipes";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";

import {
  assertRecipeApplicable,
  observeRecipeApplicability,
  type RecipeApplicabilityObservers,
} from "./recipe-applicability.js";
import {
  createCapabilityRegistry,
  resolveRunnerAdapterCapabilityRegistry,
} from "../../runtime/capabilities/index.js";

function scenario(required: ScenarioPredicate[] = [], excluded: ScenarioPredicate[] = []) {
  return parseScenarioV2({
    schema_version: "2",
    id: "repair",
    goal: "Repair source",
    parameters: [],
    applicability: { required, excluded },
    plan_template: {
      schema_version: 2,
      criteria: [
        { id: "correct", description: "Regression passes", required: true, check_ids: ["test"] },
      ],
      checks: [
        {
          id: "test",
          kind: "deterministic",
          required: true,
          capability: "run_checks",
          command: "bun test",
        },
      ],
      work_items: [
        {
          id: "repair",
          objective: "Repair source",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["src"],
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "medium",
          capabilities: ["repository_write"],
          resource_claims: [],
          optional: false,
          priority: 1,
        },
      ],
    },
  });
}
const valuePredicate = (
  key: string,
  value: string | boolean | number | null = true,
): ScenarioPredicate => ({ kind: "observed_value_equals", key, value });
const pathPredicate = (relative: string): ScenarioPredicate => ({
  kind: "path_exists",
  path: relative,
});
const capabilityPredicate = (id = "test"): ScenarioPredicate => ({
  kind: "capability_available",
  capability: id,
});
let root: string;
beforeEach(async () => {
  root = await realpath(await mkdtemp(path.join(os.tmpdir(), "recipe-applicability-")));
  await mkdir(path.join(root, "src"));
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});
function observe(input = scenario(), observers?: RecipeApplicabilityObservers) {
  return observeRecipeApplicability({
    scenario: input,
    bindings: [],
    repository_root: root,
    observers,
  });
}
function capabilities(availability: "available" | "blocked" | "unavailable") {
  return createCapabilityRegistry([
    {
      id: "test",
      kind: "tool",
      availability,
      source: { id: "runner_adapter", detail: "native-fixture" },
    },
  ]);
}

describe("supervisor Recipe applicability", () => {
  it("records deterministic serializable filesystem evidence and guards immediate use", async () => {
    const input = scenario([pathPredicate("src")], [pathPredicate("absent/nested")]);
    const first = await observe(input);
    const second = await observe(input);
    expect(first).toEqual(second);
    expect(first.disposition).toBe("applicable");
    expect(first.predicates.map((p) => p.state)).toEqual(["true", "false"]);
    const serialized = JSON.stringify(first);
    expect(JSON.parse(serialized)).toEqual(first);
    for (const predicate of first.predicates) {
      expect(predicate.provenance.observed_by).toBe("agentplane");
      expect(predicate.provenance.evidence_digest).toBe(
        taskCentricDigest(predicate.provenance.evidence),
      );
    }
    await expect(assertRecipeApplicable(first, input, root)).resolves.toBeUndefined();
  });

  it.each([
    ["true", "true", "mismatch"],
    ["true", "false", "applicable"],
    ["true", "unknown", "needs_evidence"],
    ["false", "true", "mismatch"],
    ["false", "false", "mismatch"],
    ["false", "unknown", "mismatch"],
    ["unknown", "true", "mismatch"],
    ["unknown", "false", "needs_evidence"],
    ["unknown", "unknown", "needs_evidence"],
  ] as const)(
    "requires required=%s and excluded=%s to yield %s",
    async (required, excluded, disposition) => {
      const input = scenario([valuePredicate("required")], [valuePredicate("excluded")]);
      const values: NonNullable<RecipeApplicabilityObservers["values"]> = new Map(
        [
          ...([
            ["required", required],
            ["excluded", excluded],
          ] as const),
        ]
          .filter(([, state]) => state !== "unknown")
          .map(([key, state]) => [key, { source: "native.fixture", read: () => state === "true" }]),
      );
      const result = await observe(input, { values });
      expect(result.disposition).toBe(disposition);
      expect(result.predicates.map((p) => p.state)).toEqual([required, excluded]);
      if (disposition === "applicable")
        await expect(assertRecipeApplicable(result, input, root)).resolves.toBeUndefined();
      else await expect(assertRecipeApplicable(result, input, root)).rejects.toThrow(disposition);
    },
  );

  it("exposes precise evidence needs without creating a USER decision or overriding a mismatch", async () => {
    const result = await observe(
      scenario(
        [pathPredicate("src"), valuePredicate("language", "typescript")],
        [capabilityPredicate("publish")],
      ),
    );
    expect(result.disposition).toBe("needs_evidence");
    expect(result.evidence_needs).toEqual([
      {
        predicate_ref: "required:1",
        kind: "observed_value_equals",
        source_ref: "language",
        reason: "value_observer_missing",
      },
      {
        predicate_ref: "excluded:0",
        kind: "capability_available",
        source_ref: "publish",
        reason: "capability_observer_missing",
      },
    ]);
    expect(result).not.toHaveProperty("requires_user");
    const mismatch = await observe(scenario([pathPredicate("absent"), valuePredicate("language")]));
    expect(mismatch.disposition).toBe("mismatch");
    expect(mismatch.mismatches).toEqual(["required:0"]);
    expect(mismatch.evidence_needs).toHaveLength(1);
  });

  it.each(["available", "blocked", "unavailable"] as const)(
    "preserves native capability availability %s",
    async (availability) => {
      const result = await observe(scenario([capabilityPredicate()]), {
        capabilities: () => capabilities(availability),
      });
      expect(result.predicates[0]!.state).toBe(availability === "available" ? "true" : "false");
      expect(result.predicates[0]!.provenance.evidence).toEqual([
        { id: "test", availability, source: { id: "runner_adapter", detail: "native-fixture" } },
      ]);
    },
  );

  it("uses existing runner capability resolution", async () => {
    const result = await observe(scenario([capabilityPredicate("runner.adapter.fixture")]), {
      capabilities: () =>
        resolveRunnerAdapterCapabilityRegistry({ adapter_id: "fixture", capabilities: undefined }),
    });
    expect(result.disposition).toBe("applicable");
  });

  it("keeps absent, conflicting and Recipe-declared capability evidence unknown", async () => {
    const input = scenario([capabilityPredicate()]);
    const absent = await observe(input, { capabilities: () => createCapabilityRegistry() });
    expect(absent.predicates[0]!.reason).toBe("capability_not_observed");
    const conflicting = await observe(input, {
      capabilities: () =>
        createCapabilityRegistry([
          ...capabilities("available").entries,
          ...capabilities("blocked").entries,
        ]),
    });
    expect(conflicting.predicates[0]!.reason).toBe("conflicting_capability_observations");
    const recipe = await observe(input, {
      capabilities: () =>
        createCapabilityRegistry([
          {
            id: "test",
            kind: "tool",
            availability: "available",
            source: { id: "recipe_manifest", detail: "untrusted" },
          },
        ]),
    });
    expect(recipe.predicates[0]!.reason).toBe("capability_source_not_approved");
  });

  it.each([null, false, 0, "", "typescript"])(
    "compares observed primitive %s without coercion",
    async (value) => {
      const result = await observe(
        scenario([valuePredicate("value", value)], [valuePredicate("value", "unmatched")]),
        { values: new Map([["value", { source: "native.fixture", read: () => value }]]) },
      );
      expect(result.disposition).toBe("applicable");
    },
  );

  it("does not coerce numeric or boolean strings, evaluate expressions, or traverse key paths", async () => {
    const result = await observe(
      scenario([valuePredicate("value", "1"), valuePredicate("value.nested")]),
      { values: new Map([["value", { source: "native.fixture", read: () => 1 }]]) },
    );
    expect(result.predicates.map((p) => p.state)).toEqual(["false", "unknown"]);
    expect(result.predicates[1]!.reason).toBe("value_observer_missing");
  });

  it("reads each approved source once per pass even when several predicates reference it", async () => {
    let reads = 0;
    const read = vi.fn(() => (++reads === 1 ? "a" : "b"));
    const cap = vi.fn(() => capabilities(reads === 1 ? "available" : "blocked"));
    const result = await observe(
      scenario(
        [valuePredicate("value", "a"), valuePredicate("value", "b"), capabilityPredicate()],
        [capabilityPredicate()],
      ),
      { values: new Map([["value", { source: "native.fixture", read }]]), capabilities: cap },
    );
    expect(read).toHaveBeenCalledTimes(1);
    expect(cap).toHaveBeenCalledTimes(1);
    expect(result.predicates.map((p) => p.state)).toEqual(["true", "false", "true", "true"]);
    expect(result.disposition).toBe("mismatch");
  });

  it("cannot accept serialized, modified or agent-injected observation booleans", async () => {
    const input = scenario();
    const report = await observe(input);
    const serialized = JSON.stringify(report);
    await expect(assertRecipeApplicable(JSON.parse(serialized), input, root)).rejects.toThrow(
      "Unissued",
    );
    report.disposition = "mismatch";
    await expect(assertRecipeApplicable(report, input, root)).rejects.toThrow("modified");
    await expect(
      observeRecipeApplicability({
        scenario: {
          ...input,
          applicability: {
            required: [{ kind: "path_exists", path: "src", observed: true }],
            excluded: [],
          },
        },
        bindings: [],
        repository_root: root,
      }),
    ).rejects.toThrow();
    const forgedReaders = {
      capabilities: true,
      values: { value: { source: "agentplane", read: true } },
    } as unknown as RecipeApplicabilityObservers;
    const forged = await observe(
      scenario([capabilityPredicate(), valuePredicate("value")]),
      forgedReaders,
    );
    expect(forged.predicates.map((p) => p.state)).toEqual(["unknown", "unknown"]);
  });

  it("distinguishes missing and failed observers and bounds errors without leaking their content", async () => {
    const result = await observe(
      scenario([
        capabilityPredicate(),
        valuePredicate("failed"),
        valuePredicate("invalid"),
        valuePredicate("unapproved"),
      ]),
      {
        capabilities: () => {
          throw new Error("private error text");
        },
        values: new Map([
          [
            "failed",
            {
              source: "native.fixture",
              read: () => {
                throw new Error("private error text");
              },
            },
          ],
          ["invalid", { source: "native.fixture", read: () => Infinity }],
          ["unapproved", { source: "", read: () => true }],
        ]),
      },
    );
    expect(result.predicates.map((p) => p.reason)).toEqual([
      "capability_observation_failed",
      "value_observation_failed",
      "invalid_observed_value",
      "value_observer_not_approved",
    ]);
    expect(JSON.stringify(result)).not.toContain("private error text");
    expect(result.disposition).toBe("needs_evidence");
  });

  it("reobserves before use and binds reports to their exact Scenario and repository", async () => {
    let value = true;
    const input = scenario([valuePredicate("value")]);
    const result = await observe(input, {
      values: new Map([["value", { source: "native.fixture", read: () => value }]]),
    });
    await expect(assertRecipeApplicable(result, scenario(), root)).rejects.toThrow(
      "different Scenario",
    );
    await expect(assertRecipeApplicable(result, input, root + "-other")).rejects.toThrow(
      "different Scenario",
    );
    value = false;
    await expect(assertRecipeApplicable(result, input, root)).rejects.toThrow("Stale");
  });

  it("does not turn unsafe symlinks or missing repository roots into false exclusion evidence", async () => {
    await symlink(path.join(root, "src"), path.join(root, "alias"), "dir");
    const result = await observe(scenario([pathPredicate("src")], [pathPredicate("alias")]));
    expect(result.disposition).toBe("needs_evidence");
    expect(result.predicates[1]!.reason).toBe("path_containment_unproven");
    const missing = await observeRecipeApplicability({
      scenario: scenario([], [pathPredicate("absent")]),
      bindings: [],
      repository_root: root + "-missing",
    });
    expect(missing.disposition).toBe("needs_evidence");
    expect(missing.predicates[0]!.reason).toBe("repository_or_ancestor_unavailable");
  });

  it("rejects changed paths between observation and use", async () => {
    const input = scenario([pathPredicate("src")]);
    const result = await observe(input);
    await rename(path.join(root, "src"), path.join(root, "retired"));
    await mkdir(path.join(root, "src"));
    await expect(assertRecipeApplicable(result, input, root)).rejects.toThrow("Stale");
  });

  it("marks a path changed by a later observation unknown", async () => {
    const result = await observe(scenario([pathPredicate("src"), valuePredicate("mutate")]), {
      values: new Map([
        [
          "mutate",
          {
            source: "native.fixture",
            read: async () => {
              await rename(path.join(root, "src"), path.join(root, "retired"));
              await symlink(path.join(root, "retired"), path.join(root, "src"), "dir");
              return true;
            },
          },
        ],
      ]),
    });
    expect(result.disposition).toBe("needs_evidence");
    expect(result.predicates[0]!.reason).toBe("path_changed_during_observation");
  });

  it("fails unknown on unsupported filesystem observation platforms", async () => {
    const descriptor = Object.getOwnPropertyDescriptor(process, "platform")!;
    Object.defineProperty(process, "platform", { value: "win32" });
    try {
      const result = await observe(scenario([], [pathPredicate("absent")]));
      expect(result.disposition).toBe("needs_evidence");
      expect(result.predicates[0]!.reason).toBe("path_containment_unsupported");
    } finally {
      Object.defineProperty(process, "platform", descriptor);
    }
  });
});
