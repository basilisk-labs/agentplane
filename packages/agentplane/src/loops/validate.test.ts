import { describe, expect, it } from "vitest";

import { BUILTIN_LOOPS } from "./builtins.js";
import type { LoopSpec } from "./model.js";
import { validateLoopRegistry, validateLoopSpec } from "./validate.js";

const BASE_LOOP: LoopSpec = {
  schemaVersion: 1,
  id: "custom.loop",
  version: "0.1.0",
  title: "Custom loop",
  description: "A custom loop for validation tests.",
  kind: "implementation",
  status: "experimental",
  appliesTo: { taskKinds: ["code"] },
  permissions: { canRunCommands: true },
  budgets: { maxIterations: 2 },
  steps: [{ id: "load", type: "context.load" }],
  transitions: [{ from: "load", if: "ready", to: "finish", decision: "finish" }],
  outputs: { required: ["loop-run.json"] },
  stopConditions: [{ id: "done", reason: "Done.", decision: "finish" }],
};

describe("loop validation", () => {
  it("keeps built-in loops valid with representative step contracts", () => {
    expect(validateLoopRegistry({ loops: BUILTIN_LOOPS }).errors).toEqual([]);
  });

  it("accepts legacy loop specs without step contracts", () => {
    expect(validateLoopSpec(BASE_LOOP).ok).toBe(true);
  });

  it("accepts typed step contracts", () => {
    const result = validateLoopSpec({
      ...BASE_LOOP,
      steps: [
        {
          id: "render_prompt",
          type: "prompt.render",
          contract: {
            schemaRef: "agentplane://loop-contracts/prompt-render/v1",
            inputs: [{ id: "task_context", type: "object", required: true }],
            outputs: [{ id: "rendered_prompt", type: "string", required: true }],
            artifacts: [{ id: "prompt", path: "steps/render_prompt/output.json" }],
          },
        },
      ],
      transitions: [{ from: "render_prompt", if: "ready", to: "finish", decision: "finish" }],
    });

    expect(result.errors).toEqual([]);
  });

  it("rejects malformed step contracts", () => {
    const result = validateLoopSpec({
      ...BASE_LOOP,
      steps: [
        {
          id: "render_prompt",
          type: "prompt.render",
          contract: {
            schemaRef: "",
            inputs: [
              { id: "task_context", type: "object" },
              { id: "task_context", type: "not-a-type" },
            ],
            outputs: [{ id: "" }],
            artifacts: [{ id: "prompt", path: "" }],
          },
        },
      ],
      transitions: [{ from: "render_prompt", if: "ready", to: "finish", decision: "finish" }],
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining(["invalid_step_contract", "duplicate_contract_id"]),
    );
  });
});
