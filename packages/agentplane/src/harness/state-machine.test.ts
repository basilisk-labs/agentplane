import { describe, expect, it } from "vitest";

import { transitionOrchestrationState } from "./state-machine.js";

describe("harness/state-machine", () => {
  it("allows legal transition", () => {
    const result = transitionOrchestrationState("claimed", "start", { strict: true });
    expect(result).toEqual({ ok: true, next: "running" });
  });

  it("rejects illegal transition in strict mode", () => {
    const result = transitionOrchestrationState("unclaimed", "start", { strict: true });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("ORCH_INVALID_TRANSITION");
    }
  });
});
