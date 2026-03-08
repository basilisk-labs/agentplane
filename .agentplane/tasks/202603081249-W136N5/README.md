---
id: "202603081249-W136N5"
title: "Plan runtime-sensitive CLI pre-push buckets"
result_summary: "Planned the next runtime-sensitive pre-push optimization around a cli-core bucket and a cli-runtime bucket, while keeping residual mixed CLI paths on the broad fallback until they have clearer focused coverage."
status: "DONE"
priority: "med"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:52:38.533Z"
  updated_by: "PLANNER"
  note: "Mapped the remaining runtime-sensitive CLI broad fallback into two safe next buckets: cli-core for run-cli execution plumbing and cli-runtime for bin/runtime freshness-handoff behavior, each with existing focused regression suites. Residual mixed files remain on the broad contour for now."
commit:
  hash: "62ed89cc399ac30ee4942b59035cc57e448d4430"
  message: "✅ AG4527 close: Updated the pre-push contour documentation so the new cli-help bucket is documented alo... (202603081239-AG4527) [docs]"
comments:
  -
    author: "PLANNER"
    body: "Start: classify the remaining runtime-sensitive CLI broad fallback into safe sub-buckets with clear existing focused suites and leave any entangled residual paths on the broad contour."
  -
    author: "PLANNER"
    body: "Verified: the remaining runtime-sensitive CLI broad fallback was decomposed into two safe next-step classes with explicit existing suites: cli-core for run-cli execution plumbing and cli-runtime for runtime freshness-handoff behavior."
events:
  -
    type: "status"
    at: "2026-03-08T12:50:42.388Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify the remaining runtime-sensitive CLI broad fallback into safe sub-buckets with clear existing focused suites and leave any entangled residual paths on the broad contour."
  -
    type: "verify"
    at: "2026-03-08T12:52:38.533Z"
    author: "PLANNER"
    state: "ok"
    note: "Mapped the remaining runtime-sensitive CLI broad fallback into two safe next buckets: cli-core for run-cli execution plumbing and cli-runtime for bin/runtime freshness-handoff behavior, each with existing focused regression suites. Residual mixed files remain on the broad contour for now."
  -
    type: "status"
    at: "2026-03-08T12:52:56.952Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the remaining runtime-sensitive CLI broad fallback was decomposed into two safe next-step classes with explicit existing suites: cli-core for run-cli execution plumbing and cli-runtime for runtime freshness-handoff behavior."
doc_version: 3
doc_updated_at: "2026-03-08T12:52:56.952Z"
doc_updated_by: "PLANNER"
description: "Map the remaining broad fallback for run-cli and runtime-sensitive CLI paths into safe sub-buckets with explicit boundaries and focused regression suites."
id_source: "generated"
---
## Summary

Plan runtime-sensitive CLI pre-push buckets

Map the remaining broad fallback for run-cli and runtime-sensitive CLI paths into safe sub-buckets with explicit boundaries and focused regression suites.

Planning focus: isolate only the classes that already have clear focused regression coverage.

## Scope

- In scope: Map the remaining broad fallback for run-cli and runtime-sensitive CLI paths into safe sub-buckets with explicit boundaries and focused regression suites..
- Out of scope: unrelated refactors not required for "Plan runtime-sensitive CLI pre-push buckets".

## Plan

1. Inventory the remaining runtime-sensitive CLI broad-fallback paths and separate them into coherent behavior classes such as run-cli execution flow, runtime/handoff resolution, and stale-dist/runtime-watch freshness.
2. Map each safe behavior class to the focused regression suites that already exist, and identify which classes are still too entangled to narrow in this cycle.
3. Record the resulting bucket boundary so the implementation task narrows only the classes with clear focused coverage and leaves any mixed residual paths on the broad fallback.

## Verify Steps

1. Review the remaining runtime-sensitive CLI broad-fallback paths. Expected: the analysis separates them into coherent behavior classes instead of treating the whole layer as one bucket.
2. Map each candidate class to existing focused tests. Expected: every proposed new bucket has an explicit focused regression suite.
3. Compare the proposal against the current broad fallback. Expected: any still-entangled paths are left explicitly on the broad contour for a later cycle.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:52:38.533Z — VERIFY — ok

By: PLANNER

Note: Mapped the remaining runtime-sensitive CLI broad fallback into two safe next buckets: cli-core for run-cli execution plumbing and cli-runtime for bin/runtime freshness-handoff behavior, each with existing focused regression suites. Residual mixed files remain on the broad contour for now.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:52:35.701Z, excerpt_hash=sha256:b480d51961d496ede615a86dd6237de05bb58444d54a906f858d9bd2317b8964

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the remaining runtime-sensitive CLI broad fallback is not one indivisible class. It naturally splits into at least two behavior groups with existing focused coverage: run-cli execution plumbing and runtime/dev-wrapper freshness-handoff behavior.
  Impact: keeping them under one broad fallback still makes narrow runtime edits pay for unrelated suites.
  Resolution: the next implementation step should narrow only two explicit classes: (1) a cli-core bucket for run-cli execution plumbing covered by focused run-cli core suites, and (2) a cli-runtime bucket for bin/runtime-context/runtime-watch/dist-guard/stale-dist/repo-local-handoff/verify-global-install paths covered by their focused runtime tests. Leave any residual mixed CLI files that lack a clear focused suite on the broad fallback for a later cycle.
  Promotion: none
