import assert from "node:assert/strict";
import test from "node:test";
import { publicInterfaceFeedback } from "./public-interface-feedback.mjs";
const contract = {
  schema_version: 1,
  observed_value_keys: ["backend.id", "workflow.mode"],
  conditional_observed_value_keys: ["policy.require_planner"],
  validation_capabilities: ["task.verify"],
};
function fixture() {
  return {
    schema_version: "2",
    id: "public-schema-fixture",
    goal: "Inspect {{objective}}",
    parameters: [
      { name: "objective", type: "string", required: true },
      { name: "source", type: "repo_path", required: true },
    ],
    applicability: { required: [{ kind: "path_exists", path: "{{source}}" }], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [
        { id: "checked", description: "Public check", required: true, check_ids: ["check"] },
      ],
      checks: [
        {
          id: "check",
          kind: "deterministic",
          command: "node public-check.mjs",
          required: true,
          capability: "task.verify",
        },
      ],
      work_items: [
        {
          id: "inspect",
          objective: "Inspect {{objective}}",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["inspection"],
          scope_roots: ["{{source}}"],
          context: {
            required_sources: ["{{source}}"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [],
          optional: false,
          priority: 0,
        },
      ],
      assumptions: [],
      unresolved_questions: [],
    },
  };
}
const bindings = [
  { name: "objective", value: "public module" },
  { name: "source", value: "src/public.mjs" },
];
const manifest = { dependency_closure: { commands: [{ command: "node public-check.mjs" }] } };
test("actual resolver exposes concrete fields without claiming task authority", () => {
  const result = publicInterfaceFeedback(fixture(), bindings, manifest, contract);
  assert.equal(result.findings.total, 0);
  assert.match(result.resolved_predicates.items[0], /src\/public.mjs/u);
  assert.equal(result.task_capability_authority, "unknown_without_trusted_task");
  const bad = fixture();
  bad.plan_template.checks[0].command = "{{objective}}";
  assert.throws(
    () => publicInterfaceFeedback(bad, bindings, manifest, contract),
    /Placeholders are forbidden/u,
  );
});
test("static interface reports unsupported keys, literal commands and specialization", () => {
  const bad = fixture();
  bad.applicability.required.push({
    kind: "observed_value_equals",
    key: "selection",
    value: "exact",
  });
  bad.plan_template.checks[0].command = "${command}";
  bad.plan_template.checks[0].capability = "invented";
  bad.plan_template.unresolved_questions = ["Unresolved public contract question"];
  const result = publicInterfaceFeedback(bad, bindings, manifest, contract);
  const codes = result.findings.items.map((item) => JSON.parse(item).code);
  assert.deepEqual(codes, [
    "unsupported_observer_key",
    "unsupported_supplied_check_capability",
    "command_closure_declaration_missing",
    "unconditional_specialization_required",
  ]);
});

test("conditional keys remain unobserved and long diagnostics declare truncation", () => {
  const input = fixture();
  input.applicability.required.push({
    kind: "observed_value_equals",
    key: "policy.require_planner",
    value: true,
  });
  input.plan_template.unresolved_questions = ["x".repeat(1500)];
  const result = publicInterfaceFeedback(input, bindings, manifest, contract);
  assert.equal(
    result.findings.items.some((item) => JSON.parse(item).code === "unsupported_observer_key"),
    false,
  );
  assert.equal(result.unresolved_questions.truncated, true);
  assert.equal(result.unresolved_questions.items[0].length, 1024);
  assert.match(result.scope, /not native eligibility/u);
});
