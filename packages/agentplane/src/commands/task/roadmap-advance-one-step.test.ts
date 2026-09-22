import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { canonicalCompletionPrecedesWorkflow } from "./advance-task-step.js";

const fingerprint = { digest: "sha256:route" } as never;

function operationStep(id: string) {
  return {
    kind: "cli_operation",
    operation: { id },
    preconditionFingerprint: fingerprint,
  } as never;
}

describe("LC-03 common advance-one-step coordinator", () => {
  it("completes canonical lifecycle before post-merge close and cleanup effects", () => {
    expect(canonicalCompletionPrecedesWorkflow(operationStep("task.hosted_close.finalize"))).toBe(
      true,
    );
    expect(canonicalCompletionPrecedesWorkflow(operationStep("task.worktree.cleanup"))).toBe(true);
    expect(canonicalCompletionPrecedesWorkflow(operationStep("integration.run_next"))).toBe(false);
    expect(
      canonicalCompletionPrecedesWorkflow({
        kind: "terminal",
        authoritativeCheckout: "base_checkout",
      } as never),
    ).toBe(true);
  });

  it("keeps the public entrypoint as a wrapper around the sole coordinator", async () => {
    const [command, coordinator] = await Promise.all([
      readFile(new URL("advance.command.ts", import.meta.url), "utf8"),
      readFile(new URL("advance-task-step.ts", import.meta.url), "utf8"),
    ]);

    expect(command).toContain("advanceTaskStep");
    expect(command).toContain("preparePersistedSupervisorReplacementAfterFailure");
    expect(command).not.toContain("Canonical replacement requires an explicit recovery episode");
    expect(command).not.toMatch(/for\s*\(/u);
    expect(command).not.toContain("supervisePersistedWorkflowEpisode");
    expect(coordinator).toContain("export async function advanceTaskStep");
  });

  it("preserves exchange and fail-closed recovery contracts in the coordinator", async () => {
    const [coordinator, ordinary, supervisor] = await Promise.all([
      readFile(new URL("advance-task-step.ts", import.meta.url), "utf8"),
      readFile(new URL("ordinary-advance-step.ts", import.meta.url), "utf8"),
      readFile(new URL("../shared/workflow-supervisor.ts", import.meta.url), "utf8"),
    ]);

    expect(coordinator).not.toContain("advanceOrdinaryRoute");
    expect(coordinator).not.toContain('kind: "ordinary"');
    expect(ordinary).toContain("result_schema_ref");
    expect(ordinary).toContain("resume_argv");
    expect(ordinary).toContain("effect_in_doubt");
    expect(coordinator).toContain("executeCanonicalAdmittedWorkflowOperation");
    expect(supervisor).toContain("stale precondition fingerprint");
    expect(supervisor).toContain("repeated idempotency key");
  });

  it("enters COMPLETED before dispatching any branch workflow effect", async () => {
    const coordinator = await readFile(new URL("advance-task-step.ts", import.meta.url), "utf8");
    const finalValidation = coordinator.lastIndexOf(
      'route.reason_code === "kernel_task_completion_required"',
    );
    const validationFallback = coordinator.indexOf("const checked =", finalValidation);
    const completionBranch = coordinator.slice(finalValidation, validationFallback);

    expect(finalValidation).toBeGreaterThan(-1);
    expect(validationFallback).toBeGreaterThan(finalValidation);
    expect(completionBranch).toContain('runtime.input({ kind: "complete_task" }');
    expect(completionBranch).not.toContain("prepareCanonicalWorkflowEffect");
    expect(coordinator).toContain('route.reason_code === "kernel_task_completed"');
    expect(coordinator).not.toContain("prepareCanonicalWorkflowEffect");
    expect(coordinator).toContain("executeCanonicalAdmittedWorkflowOperation");
  });
});
