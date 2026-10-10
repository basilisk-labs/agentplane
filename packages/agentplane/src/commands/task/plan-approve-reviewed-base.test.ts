import { describe, expect, it } from "vitest";
import { taskPlanApproveSpec } from "./plan-approve.command.js";

const valid = {
  "renew-authority": true,
  by: "USER",
  "reviewed-base-old": "a".repeat(40),
  "reviewed-base-new": "b".repeat(40),
  "reviewed-work-order-digest": `sha256:${"c".repeat(64)}`,
  "reviewed-checkpoint-digest": `sha256:${"d".repeat(64)}`,
};
function validate(opts: Record<string, unknown>) {
  taskPlanApproveSpec.validateRaw!({ opts, args: { "task-id": "task" } } as Parameters<
    NonNullable<typeof taskPlanApproveSpec.validateRaw>
  >[0]);
}
describe("explicit reviewed-base operator command", () => {
  it("requires USER and all four exact pins on renewal only", () => {
    expect(() => validate(valid)).not.toThrow();
    for (const key of Object.keys(valid)) {
      const missing = { ...valid } as Record<string, unknown>;
      delete missing[key];
      expect(() => validate(missing)).toThrow();
    }
    expect(() => validate({ ...valid, by: "EXECUTOR" })).toThrow();
    expect(() => validate({ ...valid, "reviewed-base-old": "aaaaaaa" })).toThrow();
    expect(() => validate({ ...valid, "renew-authority": false })).toThrow();
  });
  it("keeps ordinary explicit operator policy renewal compatible", () => {
    expect(() => validate({ "renew-authority": true, by: "USER" })).not.toThrow();
  });
});
