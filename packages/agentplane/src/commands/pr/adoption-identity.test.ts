import { describe, expect, it } from "vitest";

import {
  bindObservedExistingPr,
  matchesAdoptedPrObservation,
  sameAdoption,
} from "./adoption-identity.js";
import type { ExistingPrAdoptionClaim } from "./adoption-identity.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";

const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/project",
  targetProject: "example/project",
  sourceUrl: "https://github.com/example/project.git",
  targetUrl: "https://github.com/example/project.git",
};

const claim: ExistingPrAdoptionClaim = {
  taskId: "T-1",
  identity,
  prNumber: 42,
  headRef: "automation/upgrade",
  baseRef: "main",
  headSha: "a".repeat(40),
  baseSha: "b".repeat(40),
  authorityDigest: `sha256:${"c".repeat(64)}`,
};

const observed: ObservedChangeRequest = {
  provider: "github",
  identity,
  prNumber: 42,
  prUrl: "https://github.com/example/project/pull/42",
  status: "OPEN",
  mergedAt: null,
  mergeCommit: null,
  base: "main",
  headSha: claim.headSha,
  baseSha: claim.baseSha,
  headRef: claim.headRef,
  mergeability: { state: "not_conflicting", mergeable: true, providerState: "clean" },
};

describe("existing PR adoption identity", () => {
  it("binds an exact same-repository provider observation", () => {
    const receipt = bindObservedExistingPr(claim, observed, "2026-10-27T10:00:00.000Z");
    expect(receipt).toMatchObject({
      task_id: "T-1",
      pr_number: 42,
      head_ref: "automation/upgrade",
      head_sha: claim.headSha,
      base_sha: claim.baseSha,
      authority_digest: claim.authorityDigest,
    });
    expect(receipt.readback_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(sameAdoption(receipt, { ...receipt })).toBe(true);
    expect(sameAdoption(receipt, { ...receipt, head_sha: "d".repeat(40) })).toBe(false);
  });

  it.each([
    ["changed head", { headSha: "d".repeat(40) }],
    ["changed base", { baseSha: "d".repeat(40) }],
    ["changed source ref", { headRef: "other" }],
    ["changed target ref", { base: "other" }],
    ["closed PR", { status: "CLOSED" as const }],
    [
      "conflict",
      { mergeability: { state: "conflicting" as const, mergeable: false, providerState: "dirty" } },
    ],
  ])("rejects %s", (_label, changed) => {
    expect(() =>
      bindObservedExistingPr(claim, { ...observed, ...changed }, "2026-10-27T10:00:00.000Z"),
    ).toThrow();
  });

  it("rejects foreign topology and missing USER authority evidence", () => {
    expect(() =>
      bindObservedExistingPr(
        { ...claim, identity: { ...identity, sourceProject: "fork/project" } },
        observed,
        "2026-10-27T10:00:00.000Z",
      ),
    ).toThrow("same-repository");
    expect(() =>
      bindObservedExistingPr(
        { ...claim, authorityDigest: "" },
        observed,
        "2026-10-27T10:00:00.000Z",
      ),
    ).toThrow("incomplete");
  });

  it("keeps immutable provider/ref identity while allowing a proven live head advance", () => {
    const receipt = bindObservedExistingPr(claim, observed, "2026-10-27T10:00:00.000Z");
    expect(matchesAdoptedPrObservation(receipt, { ...observed, headSha: "d".repeat(40) })).toBe(
      true,
    );
    expect(matchesAdoptedPrObservation(receipt, { ...observed, headRef: "other" })).toBe(false);
    expect(matchesAdoptedPrObservation(receipt, { ...observed, base: "other" })).toBe(false);
    expect(matchesAdoptedPrObservation(receipt, { ...observed, prNumber: 43 })).toBe(false);
    expect(
      matchesAdoptedPrObservation(receipt, {
        ...observed,
        identity: { ...identity, targetProject: "example/other" },
      }),
    ).toBe(false);
  });
});
