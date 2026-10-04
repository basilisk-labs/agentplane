import { describe, expect, it, vi } from "vitest";
import * as fsPromises from "node:fs/promises";
import { parseScenarioDefinition } from "./scenario.js";
import { parseScenarioV2 } from "./scenario-v2.js";

vi.mock("node:fs/promises", async (importOriginal) => ({
  ...(await importOriginal<typeof fsPromises>()),
  readFile: vi.fn(() => {
    throw new Error("Unexpected read");
  }),
  readdir: vi.fn(() => {
    throw new Error("Unexpected directory read");
  }),
}));

function scenario() {
  return {
    schema_version: "2",
    id: "repair",
    goal: "Repair the selected module",
    parameters: [{ name: "target", type: "repo_path", required: true }],
    applicability: { required: [{ kind: "path_exists", path: "src" }], excluded: [] },
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
            max_bytes: 4096,
          },
          risk: "medium",
          capabilities: ["repository_write"],
          resource_claims: [],
          optional: false,
          priority: 1,
        },
      ],
    },
  };
}

describe("Scenario API 2 reader", () => {
  it("requires explicit V2 negotiation and preserves legacy V1 decoding", () => {
    expect(() => parseScenarioDefinition(scenario())).toThrow(
      'Unsupported scenario API version: "2"',
    );
    expect(parseScenarioDefinition(scenario(), ["1", "2"]).schema_version).toBe("2");
    const v1 = {
      id: "old",
      goal: "Inspect",
      inputs: {},
      outputs: {},
      steps: [],
      task_template: { title: "Inspect", description: "Inspect source", owner: "CODER" },
    };
    expect(parseScenarioDefinition(v1).schema_version).toBe("1");
    expect(() => parseScenarioDefinition(v1, ["2"])).toThrow(
      'Unsupported scenario API version: "1"',
    );
  });

  it.each(["3", 2, null, false])("rejects unsupported explicit version %s", (version) => {
    expect(() =>
      parseScenarioDefinition({ ...scenario(), schema_version: version }, ["1", "2"]),
    ).toThrow();
  });

  it.each(["cursor", "approval", "terminal_success", "steps", "unknown"])(
    "rejects scenario field %s",
    (field) => {
      expect(() => parseScenarioV2({ ...scenario(), [field]: true })).toThrow();
    },
  );

  it("rejects nested unknown fields and invalid parameter defaults", () => {
    const input = scenario();
    expect(() =>
      parseScenarioV2({
        ...input,
        parameters: [{ name: "flag", type: "boolean", required: true, default: "true" }],
      }),
    ).toThrow();
    expect(() =>
      parseScenarioV2({ ...input, applicability: { required: [], excluded: [], observed: true } }),
    ).toThrow();
    expect(() =>
      parseScenarioV2({
        ...input,
        applicability: {
          required: [{ kind: "path_exists", path: "src", observed: true }],
          excluded: [],
        },
      }),
    ).toThrow();
    expect(() =>
      parseScenarioV2({ ...input, parameters: [...input.parameters, ...input.parameters] }),
    ).toThrow("Duplicate parameter");
  });

  it("uses the shared compact Plan structure and rejects native identity and lifecycle fields", () => {
    const input = scenario();
    for (const field of ["task_id", "planning_baseline", "approval", "cursor"]) {
      expect(() =>
        parseScenarioV2({ ...input, plan_template: { ...input.plan_template, [field]: "forged" } }),
      ).toThrow();
    }
    expect(() =>
      parseScenarioV2({ ...input, plan_template: { ...input.plan_template, work_items: [] } }),
    ).toThrow();
    expect(() =>
      parseScenarioV2({
        ...input,
        plan_template: {
          ...input.plan_template,
          checks: [{ ...input.plan_template.checks[0], optional: true }],
        },
      }),
    ).toThrow();
  });

  it("parses deterministically without evaluating predicates, executing commands or mutating input", () => {
    const input = scenario();
    const before = structuredClone(input);
    const parsed = parseScenarioV2(input);
    expect(parseScenarioV2(input)).toEqual(parsed);
    expect(input).toEqual(before);
    expect(parsed.applicability.required).toEqual(input.applicability.required);
    expect(fsPromises.readFile).not.toHaveBeenCalled();
    expect(fsPromises.readdir).not.toHaveBeenCalled();
    parsed.plan_template.work_items[0]!.scope_roots.push("other");
    expect(input).toEqual(before);
  });
});
