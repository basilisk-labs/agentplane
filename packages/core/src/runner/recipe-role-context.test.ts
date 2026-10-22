import { describe, expect, it } from "vitest";
import { taskCentricDigest } from "../tasks/task-centric/digest.js";
import { AGENT_WORK_ORDER_V2_VALID_FIXTURE } from "./agent-work-order-fixtures.js";
import { validateAgentWorkOrderV2 } from "./agent-work-order.js";
import { RECIPE_ROLE_CONTEXT_ZOD_SCHEMA } from "./recipe-role-context.js";

function fixture(content = "Exact retained guidance") {
  const projection = {
    schema_version: 1,
    kind: "recipe_role_context",
    role: AGENT_WORK_ORDER_V2_VALID_FIXTURE.role,
    recipe: {
      id: "demo",
      version: "1",
      scenario_id: "report",
      closure_digest: taskCentricDigest("closure"),
    },
    strategy_goal: "Preserve exact context",
    applicability: { required: [], excluded: [] },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: { schema_version: 1, criteria: [], checks: [] },
    current_work_items: [],
    deviations: [],
    guidance: [{ source: "recipe", path: "agent.md", digest: taskCentricDigest(content), content }],
    stop_conditions: [],
  };
  return { projection, digest: taskCentricDigest(projection) };
}

describe("bounded Recipe WorkOrder transport", () => {
  it("accepts exactly 65536 original projection bytes and rejects one more without counting envelope metadata", () => {
    const empty = fixture("");
    const length = 65_536 - Buffer.byteLength(JSON.stringify(empty.projection), "utf8");
    const exact = fixture("x".repeat(length));
    expect(Buffer.byteLength(JSON.stringify(exact.projection))).toBe(65_536);
    expect(RECIPE_ROLE_CONTEXT_ZOD_SCHEMA.parse(exact)).toEqual(exact);
    expect(() => RECIPE_ROLE_CONTEXT_ZOD_SCHEMA.parse(fixture("x".repeat(length + 1)))).toThrow(
      "65536 bytes",
    );
    expect(() => RECIPE_ROLE_CONTEXT_ZOD_SCHEMA.parse(fixture("é".repeat(length)))).toThrow(
      "65536 bytes",
    );
  });
  it("rejects digest tampering and role substitution while old WorkOrders remain compatible", () => {
    const context = fixture();
    expect(
      validateAgentWorkOrderV2(AGENT_WORK_ORDER_V2_VALID_FIXTURE).recipe_context,
    ).toBeUndefined();
    expect(
      validateAgentWorkOrderV2({ ...AGENT_WORK_ORDER_V2_VALID_FIXTURE, recipe_context: context })
        .recipe_context,
    ).toEqual(context);
    context.projection.guidance[0]!.content = "Changed";
    expect(() =>
      validateAgentWorkOrderV2({ ...AGENT_WORK_ORDER_V2_VALID_FIXTURE, recipe_context: context }),
    ).toThrow();
    context.digest = taskCentricDigest(context.projection);
    expect(() =>
      validateAgentWorkOrderV2({
        ...AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        role: "CURATOR",
        recipe_context: context,
      }),
    ).toThrow();
  });
});
