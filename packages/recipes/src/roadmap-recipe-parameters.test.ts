import { describe, expect, it } from "vitest";
import {
  MissingScenarioParametersError,
  resolveScenarioParameters,
  type ScenarioParameterBinding,
} from "./scenario-parameters.js";
import { parseScenarioV2, type ScenarioV2Definition } from "./scenario-v2.js";

function scenario(): ScenarioV2Definition {
  return parseScenarioV2({
    schema_version: "2",
    id: "repair",
    goal: "Repair {{target}}: {{message}}, {{count}}, {{flag}}",
    parameters: [
      { name: "target", type: "repo_path", required: true },
      { name: "message", type: "string", required: true },
      { name: "count", type: "integer", required: false, default: 3 },
      { name: "flag", type: "boolean", required: false, default: false },
    ],
    applicability: { required: [{ kind: "path_exists", path: "{{target}}" }], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [
        { id: "correct", description: "Fix {{message}}", required: true, check_ids: ["test"] },
      ],
      checks: [
        {
          id: "test",
          kind: "deterministic",
          required: true,
          capability: "run_checks",
          command: "bun test ${HOME}",
        },
      ],
      work_items: [
        {
          id: "repair",
          objective: "Fix {{message}}",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["{{target}}"],
          context: {
            required_sources: ["{{target}}/file.ts"],
            optional_sources: [],
            symbol_hints: ["{{message}}"],
            max_bytes: 4096,
          },
          resource_claims: [{ kind: "path", resource: "{{target}}", mode: "write" }],
          risk: "medium",
          capabilities: ["repository_write"],
          optional: false,
          priority: 1,
        },
      ],
      assumptions: ["{{message}}"],
      unresolved_questions: ["{{message}}"],
    },
  });
}
const bindings = (): ScenarioParameterBinding[] => [
  { name: "target", value: "src/feature" },
  { name: "message", value: "the regression" },
];

describe("Scenario V2 bounded parameters", () => {
  it("resolves typed defaults and each approved semantic/path field without mutating the template", () => {
    const input = scenario();
    const before = structuredClone(input);
    const result = resolveScenarioParameters(input, bindings());
    expect(result.goal).toBe("Repair src/feature: the regression, 3, false");
    expect(result.plan_template.criteria[0]!.description).toBe("Fix the regression");
    expect(result.plan_template.work_items[0]).toMatchObject({
      objective: "Fix the regression",
      scope_roots: ["src/feature"],
      context: { required_sources: ["src/feature/file.ts"], symbol_hints: ["the regression"] },
      resource_claims: [{ kind: "path", resource: "src/feature", mode: "write" }],
    });
    expect(result.applicability.required[0]).toEqual({ kind: "path_exists", path: "src/feature" });
    expect(result.plan_template.assumptions).toEqual(["the regression"]);
    expect(result.plan_template.unresolved_questions).toEqual(["the regression"]);
    expect(input).toEqual(before);
  });

  it("preserves shell syntax as data and leaves command and operation identifiers unchanged", () => {
    const input = scenario();
    const text = "$(touch PWNED); `echo bad` $& $1 ${HOME}";
    const result = resolveScenarioParameters(input, [
      { name: "target", value: "src" },
      { name: "message", value: text },
    ]);
    expect(result.plan_template.work_items[0]!.objective).toBe(`Fix ${text}`);
    expect(result.plan_template.checks).toEqual(input.plan_template.checks);
    expect(result.plan_template.work_items[0]!.id).toBe("repair");
    expect(result.plan_template.work_items[0]!.expected_outputs).toEqual(["patch"]);
  });

  it("rejects duplicate declarations, duplicate bindings and unknown parameters", () => {
    const input = scenario();
    input.parameters.push(input.parameters[0]!);
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Duplicate parameter");
    expect(() => resolveScenarioParameters(scenario(), [...bindings(), bindings()[0]!])).toThrow(
      "Duplicate parameter",
    );
    expect(() =>
      resolveScenarioParameters(scenario(), [...bindings(), { name: "unknown", value: 0 }]),
    ).toThrow("Unknown parameter");
  });

  it("reports all missing required parameters structurally and permits unused optional values", () => {
    try {
      resolveScenarioParameters(scenario(), []);
      throw new Error("Unexpected success");
    } catch (error) {
      expect(error).toBeInstanceOf(MissingScenarioParametersError);
      expect((error as MissingScenarioParametersError).parameterNames).toEqual([
        "target",
        "message",
      ]);
    }
    const input = scenario();
    input.parameters.push({ name: "unused", type: "string", required: false });
    expect(resolveScenarioParameters(input, bindings()).parameters).toEqual(input.parameters);
  });

  it.each([
    ["target", "/etc/passwd"],
    ["target", "../outside"],
    ["target", "src/../../outside"],
    ["target", "C:/outside"],
    ["target", "C:outside"],
    ["target", "\\\\server\\share"],
    ["target", "src\\..\\outside"],
    ["target", "src/\u0000bad"],
    ["target", " src "],
    ["target", ""],
    ["target", 2],
    ["count", "1"],
    ["count", 1.5],
    ["count", Infinity],
    ["count", Number.MAX_SAFE_INTEGER + 1],
    ["flag", "false"],
    ["message", true],
  ])("rejects invalid %s value %s", (name, value) => {
    expect(() =>
      resolveScenarioParameters(scenario(), [
        ...bindings().filter((b) => b.name !== name),
        { name: name as string, value },
      ]),
    ).toThrow();
  });

  it.each(["/outside", "../outside", "src/../outside", "C:\\outside", "{{message}}"])(
    "rejects invalid repo_path default %s",
    (value) => {
      const input = scenario();
      input.parameters[0] = { name: "target", type: "repo_path", required: false, default: value };
      expect(() => parseScenarioV2(input)).toThrow();
    },
  );

  it.each(["{{count}}", "{{unknown}}", "{{message + count}}", "{{{{message}}}}"])(
    "rejects nested or malformed replacement text %s without recursive evaluation",
    (value) => {
      expect(() =>
        resolveScenarioParameters(scenario(), [
          { name: "target", value: "src" },
          { name: "message", value },
        ]),
      ).toThrow("Unresolved placeholder");
    },
  );

  it("validates assembled paths and refuses string parameters in path fields", () => {
    const input = scenario();
    input.plan_template.work_items[0]!.scope_roots = ["../{{target}}"];
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Invalid repository path");
    input.plan_template.work_items[0]!.scope_roots = ["{{message}}"];
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("requires a repo_path");
    input.plan_template.work_items[0]!.scope_roots = ["/absolute"];
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Invalid repository path");
  });

  const forbidden: [string, (s: ScenarioV2Definition) => void][] = [
    [
      "scenario ID",
      (s) => {
        s.id = "{{message}}";
      },
    ],
    [
      "command",
      (s) => {
        s.plan_template.checks[0]!.command = "echo {{message}}";
      },
    ],
    [
      "check capability",
      (s) => {
        s.plan_template.checks[0]!.capability = "{{message}}";
      },
    ],
    [
      "check ID",
      (s) => {
        s.plan_template.checks[0]!.id = "{{message}}";
      },
    ],
    [
      "criterion ID",
      (s) => {
        s.plan_template.criteria[0]!.id = "{{message}}";
      },
    ],
    [
      "criterion check IDs",
      (s) => {
        s.plan_template.criteria[0]!.check_ids = ["{{message}}"];
      },
    ],
    [
      "WorkItem ID",
      (s) => {
        s.plan_template.work_items[0]!.id = "{{message}}";
      },
    ],
    [
      "dependencies",
      (s) => {
        s.plan_template.work_items[0]!.depends_on = ["{{message}}"];
      },
    ],
    [
      "input IDs",
      (s) => {
        s.plan_template.work_items[0]!.required_inputs = ["{{message}}"];
      },
    ],
    [
      "output IDs",
      (s) => {
        s.plan_template.work_items[0]!.expected_outputs = ["{{message}}"];
      },
    ],
    [
      "capabilities",
      (s) => {
        s.plan_template.work_items[0]!.capabilities = ["{{message}}"];
      },
    ],
    [
      "WorkItem check IDs",
      (s) => {
        s.plan_template.work_items[0]!.check_ids = ["{{message}}"];
      },
    ],
    [
      "WorkItem criterion IDs",
      (s) => {
        s.plan_template.work_items[0]!.criterion_ids = ["{{message}}"];
      },
    ],
    [
      "top level IDs",
      (s) => {
        s.plan_template.top_level_validation = {
          criterion_ids: ["{{message}}"],
          check_ids: ["test"],
        };
      },
    ],
    [
      "predicate capability",
      (s) => {
        s.applicability.required = [{ kind: "capability_available", capability: "{{message}}" }];
      },
    ],
    [
      "predicate key",
      (s) => {
        s.applicability.required = [
          { kind: "observed_value_equals", key: "{{message}}", value: true },
        ];
      },
    ],
    [
      "non-path resource",
      (s) => {
        s.plan_template.work_items[0]!.resource_claims = [
          { kind: "exclusive", resource: "{{message}}", mode: "exclusive" },
        ];
      },
    ],
  ];
  it.each(forbidden)("rejects placeholders in %s", (_name, mutate) => {
    const input = scenario();
    mutate(input);
    expect(() => resolveScenarioParameters(input, bindings())).toThrow(
      "Placeholders are forbidden",
    );
  });
  it("does not resolve unknown or omitted optional references through object prototypes", () => {
    const input = scenario();
    input.goal = "{{constructor}}";
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Unbound parameter");
    input.parameters.push({ name: "constructor", type: "string", required: false });
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Unbound parameter");
    expect(
      resolveScenarioParameters(input, [...bindings(), { name: "constructor", value: "literal" }])
        .goal,
    ).toBe("literal");
  });

  it("rejects malformed source placeholders and invalid paths in predicates and resources", () => {
    const input = scenario();
    input.goal = "{{ message }}";
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Unresolved placeholder");
    input.goal = "Repair";
    input.applicability.required = [{ kind: "path_exists", path: "../outside" }];
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Invalid repository path");
    input.applicability.required = [];
    input.plan_template.work_items[0]!.resource_claims[0]!.resource = "../outside";
    expect(() => resolveScenarioParameters(input, bindings())).toThrow("Invalid repository path");
  });

  it("keeps explicit zero and false values instead of replacing them with defaults", () => {
    const result = resolveScenarioParameters(scenario(), [
      ...bindings(),
      { name: "count", value: 0 },
      { name: "flag", value: false },
    ]);
    expect(result.goal).toBe("Repair src/feature: the regression, 0, false");
  });
});
