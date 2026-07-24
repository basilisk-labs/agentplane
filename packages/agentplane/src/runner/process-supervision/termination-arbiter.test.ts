import { describe, expect, it } from "vitest";

import { createRunnerTerminationArbiter } from "./termination-arbiter.js";

describe("runner termination first-cause arbiter", () => {
  it("keeps cancellation authoritative when timeout arrives later", () => {
    const arbiter = createRunnerTerminationArbiter();
    expect(arbiter.reserve("cancel")).toBe(true);
    expect(arbiter.commit("cancel")).toBe(true);
    expect(arbiter.reserve("timeout")).toBe(false);
    expect(arbiter.claimExit()).toBe(false);
    expect(arbiter.cause()).toBe("cancel");
  });

  it("keeps timeout authoritative when cancellation arrives later", () => {
    const arbiter = createRunnerTerminationArbiter();
    expect(arbiter.reserve("timeout")).toBe(true);
    expect(arbiter.commit("timeout")).toBe(true);
    expect(arbiter.reserve("cancel")).toBe(false);
    expect(arbiter.claimExit()).toBe(false);
    expect(arbiter.cause()).toBe("timeout");
  });

  it("lets natural exit win after unsuccessful signal delivery releases its reservation", () => {
    const arbiter = createRunnerTerminationArbiter();
    expect(arbiter.reserve("timeout")).toBe(true);
    arbiter.release("timeout");
    expect(arbiter.claimExit()).toBe(true);
    expect(arbiter.reserve("cancel")).toBe(false);
    expect(arbiter.cause()).toBe("exit");
  });
});
