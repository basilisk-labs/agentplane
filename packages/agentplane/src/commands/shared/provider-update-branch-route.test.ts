import { describe, expect, it } from "vitest";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import { providerUpdateBranchParams } from "./provider-update-branch-route.js";

const H = "1".repeat(40);
const R = "2".repeat(40);
const updated = "3".repeat(40);

function flow(provider: "github" | "gitlab" = "gitlab"): PrFlowStatusReport {
  const branch = "task/202611031819-QKNKFW/native-update";
  const identity = {
    provider,
    hostname: provider === "gitlab" ? "gitlab.example.test" : "github.com",
    remote: "origin",
    sourceProject: "group/project",
    targetProject: "group/project",
    sourceUrl: "https://example.test/group/project.git",
    targetUrl: "https://example.test/group/project.git",
  };
  return {
    task: { id: "202611031819-QKNKFW", status: "DONE", verification: "ok" },
    branch: { name: branch, headSha: H, metaHeadSha: H },
    pr: { state: "OPEN", source: "lookup", provider, prNumber: 42, base: "main", headSha: H },
    providerObservation: {
      state: "found",
      pr: {
        provider,
        identity,
        status: "OPEN",
        prNumber: 42,
        headRef: branch,
        base: "main",
        headSha: H,
        baseSha: R,
        prUrl: null,
        mergedAt: null,
        mergeCommit: null,
        mergeability: {
          state: "not_conflicting",
          mergeable: true,
          providerState: provider === "gitlab" ? "need_rebase" : "behind",
        },
      },
    },
    publication: {
      state: "aligned",
      localHeadSha: H,
      hostedHeadSha: H,
      upstreamRef: `origin/${branch}`,
      upstreamHeadSha: H,
    },
    hostedChecks: { checked: true, failing: 0, pending: 0, passing: 1, total: 1 },
  } as PrFlowStatusReport;
}

describe("provider update route", () => {
  it.each(["github", "gitlab"] as const)(
    "routes a completed aligned %s task behind the current target",
    (provider) => {
      const state = flow(provider);
      expect(providerUpdateBranchParams(state)).toMatchObject({
        taskId: state.task.id,
        identity: { provider },
        expectedHeadSha: H,
        expectedBaseSha: R,
        prNumber: 42,
        baseBranch: "main",
      });
    },
  );

  it.each(["mergeable", "checking", "conflict", "unknown"])(
    "does not authorize a GitLab update from %s",
    (status) => {
      const state = flow();
      if (state.providerObservation?.state !== "found") throw new Error("fixture");
      state.providerObservation.pr.mergeability!.providerState = status;
      expect(providerUpdateBranchParams(state)).toBeNull();
    },
  );

  it("rejects source forks, missing target SHA and stale publication evidence", () => {
    for (const kind of ["fork", "base", "publication"] as const) {
      const state = flow();
      if (state.providerObservation?.state !== "found") throw new Error("fixture");
      if (kind === "fork") state.providerObservation.pr.identity.sourceProject = "fork/project";
      if (kind === "base") state.providerObservation.pr.baseSha = null;
      if (kind === "publication") state.publication!.hostedHeadSha = updated;
      expect(providerUpdateBranchParams(state)).toBeNull();
    }
  });

  it("offers only exact reconciliation when the hosted descendant is ahead locally", () => {
    const state = flow();
    if (state.providerObservation?.state !== "found") throw new Error("fixture");
    state.providerObservation.pr.headSha = updated;
    state.pr.headSha = updated;
    state.publication!.state = "hosted_mismatch";
    state.publication!.hostedHeadSha = updated;
    expect(providerUpdateBranchParams(state)).toMatchObject({
      expectedHeadSha: H,
      expectedBaseSha: R,
      reconcileHeadSha: updated,
    });
  });

  it("leaves adopted GitLab MRs unsupported", () => {
    const state = flow();
    state.adoption = { provider: "gitlab", pr_number: 42, head_sha: H } as NonNullable<
      PrFlowStatusReport["adoption"]
    >;
    expect(providerUpdateBranchParams(state)).toBeNull();
  });
});
