import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function sources() {
  const [contract, episodes, advance] = await Promise.all([
    readFile(new URL("branch-task-supervisor.ts", import.meta.url), "utf8"),
    readFile(new URL("branch-task-supervisor-episodes.ts", import.meta.url), "utf8"),
    readFile(new URL("advance-task-step.ts", import.meta.url), "utf8"),
  ]);
  return { contract, episodes, advance };
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
    const { advance } = await sources();
    expect(advance).toContain("prepareCanonicalWorkflowEffect");
    expect(advance).toContain("applyKernelEffectStep");
  });

  it("records branch verification as a canonical compatibility projection", async () => {
    const { episodes } = await sources();
    expect(episodes).toContain("allowCanonicalProjection: true");
  });

  it("does not replay a completed hosted-close side effect on supervisor restart", async () => {
    const { advance } = await sources();
    expect(advance).toContain("restoreKernelFinalValidation");
    expect(advance).toContain("canonical_workflow_effect_no_progress");
  });

  it("records merged provider truth and the final main head in cleanup receipts", async () => {
    const { advance } = await sources();
    expect(advance).toContain("prepareCanonicalWorkflowEffect");
    expect(advance).toContain("ensureKernelOperationalProjectionEvidence");
  });
});
