import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function sources() {
  const [contract, episodes, recovery, advance, provider] = await Promise.all([
    readFile(new URL("branch-task-supervisor.ts", import.meta.url), "utf8"),
    readFile(new URL("branch-task-supervisor-episodes.ts", import.meta.url), "utf8"),
    readFile(new URL("branch-task-supervisor-journal-recovery.ts", import.meta.url), "utf8"),
    readFile(new URL("advance-task-step.ts", import.meta.url), "utf8"),
    readFile(new URL("kernel-provider-effect-coordinator.ts", import.meta.url), "utf8"),
  ]);
  return { contract, episodes, recovery, advance, provider };
}

describe("retired branch task outer supervisor", () => {
  it("runs semantic roles only through named single-purpose helpers", async () => {
    const { contract, episodes, advance } = await sources();
    expect(contract).not.toContain("superviseBranchTaskRun");
    expect(contract).not.toMatch(/^import\s+(?!type\b)/mu);
    expect(episodes).toContain("executeBranchImplementationEpisode");
    expect(episodes).toContain("executeBranchVerificationEpisode");
    expect(episodes).toContain("executeBranchEvaluatorEpisode");
    expect(advance).not.toContain("superviseBranchTaskRun");
  });

  it("returns merge authority to the user without imitating a provider action", async () => {
    const { advance } = await sources();
    expect(advance).toContain("kernelPlanApprovalOperatorAction");
    expect(advance).toContain('required_role: "USER"');
  });

  it("maps late checks through the canonical workflow effect coordinator", async () => {
    const { advance, episodes, recovery, provider } = await sources();
    expect(advance).toContain("executeCanonicalAdmittedWorkflowOperation");
    expect(advance).toContain("executeCanonicalCompletedAgentEpisode");
    expect(provider).toContain('["implementation_rework", "verification", "quality_review"]');
    expect(episodes).toContain("requiresImplementationReworkReopen");
    expect(episodes).toContain("recoverBranchImplementationJournal");
    expect(recovery).toContain("prepareReplacementSupervisorExecutionEpisodeAfterFailure");
    expect(recovery).toContain("refreshPendingReplacementSupervisorExecutionEpisode");
    expect(recovery).toContain("canonical_rework_predispatch_interrupted");
    expect(episodes).toContain(
      "replacement_of_operation_key: journal.cursor.replacement_of_operation_key",
    );
    expect(episodes).toContain(
      "Reopen completed task for implementation rework before executor dispatch.",
    );
    expect(advance).toContain("applyKernelEffectStep");
  });

  it("does not replay a completed hosted-close side effect on supervisor restart", async () => {
    const { advance, recovery } = await sources();
    expect(advance).toContain("restoreKernelFinalValidation");
    expect(advance).toContain("effect_in_doubt");
    expect(recovery).toContain("reopenCompletedSupervisorExecutionEpisodeAfterStaleState");
    expect(recovery).toContain("Branch supervisor journal changed during stale-state recovery.");
  });

  it("records merged provider truth and the final main head in cleanup receipts", async () => {
    const { advance } = await sources();
    expect(advance).toContain("canonicalWorkflowRequestDigest");
    expect(advance).toContain("ensureKernelOperationalProjectionEvidence");
  });
});
