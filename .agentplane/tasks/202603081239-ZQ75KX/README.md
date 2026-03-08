---
id: "202603081239-ZQ75KX"
title: "Plan remaining CLI broad-fallback optimization"
result_summary: "Planned the next CLI broad-fallback optimization around help/spec/guidance surfaces only, with focused existing test suites and an explicit boundary that excludes run-cli and other runtime-sensitive CLI plumbing."
status: "DONE"
priority: "med"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:40:31.564Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved after replacing the default plan text with the final safe-scope CLI fallback roadmap; runtime-sensitive CLI paths remain explicitly out of the next narrowing step."
verification:
  state: "ok"
  updated_at: "2026-03-08T12:40:22.205Z"
  updated_by: "PLANNER"
  note: "Mapped the remaining broad CLI fallback into two classes: a safe help/spec/guidance subset with focused existing tests, and runtime-sensitive CLI plumbing that should stay on the broad contour. The next implementation task should narrow only the safe subset."
commit:
  hash: "6fdb1adba7a70fd4cc52e88347c8abf6ccf153d9"
  message: "✅ VC7TCQ close: Updated testing-and-quality guidance so the pre-push section distinguishes docs-only, t... (202603081218-VC7TCQ) [docs]"
comments:
  -
    author: "PLANNER"
    body: "Verified: mapped the remaining broad CLI fallback into a safe help/spec/guidance subset for the next narrowing step and a runtime-sensitive subset that must stay on the broad contour for now."
events:
  -
    type: "verify"
    at: "2026-03-08T12:40:22.205Z"
    author: "PLANNER"
    state: "ok"
    note: "Mapped the remaining broad CLI fallback into two classes: a safe help/spec/guidance subset with focused existing tests, and runtime-sensitive CLI plumbing that should stay on the broad contour. The next implementation task should narrow only the safe subset."
  -
    type: "status"
    at: "2026-03-08T12:40:36.765Z"
    author: "PLANNER"
    from: "TODO"
    to: "DONE"
    note: "Verified: mapped the remaining broad CLI fallback into a safe help/spec/guidance subset for the next narrowing step and a runtime-sensitive subset that must stay on the broad contour for now."
doc_version: 3
doc_updated_at: "2026-03-08T12:40:36.765Z"
doc_updated_by: "PLANNER"
description: "Identify the safe CLI help/spec/guidance paths that can leave the broad fast fallback without weakening runtime-sensitive coverage, and define the next narrow bucket rollout."
id_source: "generated"
---
## Summary

Plan remaining CLI broad-fallback optimization

Identify the safe CLI help/spec/guidance paths that can leave the broad fast fallback without weakening runtime-sensitive coverage, and define the next narrow bucket rollout.

## Scope

- In scope: Identify the safe CLI help/spec/guidance paths that can leave the broad fast fallback without weakening runtime-sensitive coverage, and define the next narrow bucket rollout..
- Out of scope: unrelated refactors not required for "Plan remaining CLI broad-fallback optimization".

## Plan

1. Inventory the remaining broad-fallback CLI path classes and separate safe help/spec/guidance files from runtime-sensitive CLI implementation paths.
2. Define the next narrow bucket rollout around those safe help/spec/guidance surfaces and map it to the focused test suites that already cover them.
3. Record the resulting scope boundary so the implementation task narrows only the safe CLI subset and leaves runtime-sensitive CLI paths on the broad contour.

## Verify Steps

1. Review the remaining CLI broad-fallback paths. Expected: the analysis distinguishes safe help/spec/guidance files from runtime-sensitive CLI files.
2. Map the safe CLI subset to focused existing tests. Expected: the proposed next bucket has a concrete focused regression suite.
3. Compare the proposed bucket boundary with current broad fallback behavior. Expected: runtime-sensitive CLI files remain explicitly outside the narrowed scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:40:22.205Z — VERIFY — ok

By: PLANNER

Note: Mapped the remaining broad CLI fallback into two classes: a safe help/spec/guidance subset with focused existing tests, and runtime-sensitive CLI plumbing that should stay on the broad contour. The next implementation task should narrow only the safe subset.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:40:21.968Z, excerpt_hash=sha256:4f5c392a07065e2df9cf0a247543d92017060846941d95776f587587d1d2df87

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the remaining broad CLI fallback is too coarse, but the whole CLI tree cannot be narrowed safely because help/spec/guidance code and runtime/execution plumbing have very different risk profiles.
  Impact: narrow documentation and spec edits still pay the broad fast-contour cost even though they already have focused unit and contract suites.
  Resolution: define the next rollout around a safe CLI help/spec/guidance subset only: bootstrap/command guides, command snippets, output/error-map/prompts, cli/spec/**, and cli/shared/**, covered by focused command-guide/help-contract/spec/output/prompts tests plus docs checks. Keep run-cli, run-cli/**, dist/runtime handoff, stale-dist, repo-local-handoff, verify-global-install, and similar runtime-sensitive paths on the broad fallback for a later cycle.
  Promotion: none
