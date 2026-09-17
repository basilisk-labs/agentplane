import { makeTaskFixture } from "@agentplane/testkit/task";
import { describe, expect, it } from "vitest";

import {
  classifyKernelCutover,
  kernelCutoverActivated,
  requireKernelIssuanceEligibility,
} from "./kernel-cutover.js";

describe("Task Kernel cutover", () => {
  it("routes records carrying the Task Kernel extension to the canonical controller", () => {
    const task = makeTaskFixture({ extensions: { task_kernel: { intentionally: "opaque" } } });
    expect(classifyKernelCutover(task)).toEqual({ kind: "canonical" });
    expect(kernelCutoverActivated([task])).toBe(true);
    expect(kernelCutoverActivated([makeTaskFixture()])).toBe(false);
  });

  it("allows completed legacy records to remain readable without migration", () => {
    const task = makeTaskFixture({ status: "DONE" });
    expect(classifyKernelCutover(task)).toEqual({ kind: "legacy_drain" });
    expect(() => requireKernelIssuanceEligibility(task)).not.toThrow();
  });

  it("drains legacy work that already crossed its persisted approval boundary", () => {
    const task = makeTaskFixture({
      status: "DOING",
      plan_approval: {
        state: "approved",
        updated_at: "2026-09-17T00:00:00.000Z",
        updated_by: "USER",
        note: "approved before cutover",
      },
    });
    expect(classifyKernelCutover(task)).toEqual({ kind: "legacy_drain" });
  });

  it("drains legacy planning but stops unknown active records with a migration command", () => {
    const todo = makeTaskFixture({ id: "T-todo", status: "TODO" });
    const doing = makeTaskFixture({ id: "T-doing", status: "DOING" });
    expect(classifyKernelCutover(todo)).toEqual({ kind: "legacy_drain" });
    expect(classifyKernelCutover(doing)).toEqual({
      kind: "migration_required",
      reason: "legacy_unknown_active",
    });
    let caught: unknown;
    try {
      requireKernelIssuanceEligibility(doing);
    } catch (error) {
      caught = error;
    }
    expect(caught).toMatchObject({
      code: "E_PHASE_POLICY",
      context: {
        reason_code: "legacy_unknown_active",
        task_id: "T-doing",
        task_status: "DOING",
        next_action: "agentplane task kernel-migrate T-doing",
      },
    });
  });

  it("turns a malformed legacy projection into an explicit migration stop", () => {
    const task = makeTaskFixture({
      id: "T-invalid",
      status: "DOING",
      extensions: { "agentplane.task_centric": { schema_version: 1 } },
    });
    expect(classifyKernelCutover(task)).toEqual({
      kind: "migration_required",
      reason: "legacy_projection_invalid",
    });
  });
});
