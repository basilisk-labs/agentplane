---
id: "202603081218-6B393Q"
title: "Bucket broad pre-push test suites by change scope"
result_summary: "Split the remaining broad pre-push contour by adding targeted release, upgrade, and guard buckets with focused selector rules, focused suites, and regressions that preserve the broad fallback for mixed changes."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081218-FS24HK"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:28:32.500Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: focus this task on turning broad pre-push buckets into narrower change-class contours without weakening the broad fallback for mixed infrastructure edits."
verification:
  state: "ok"
  updated_at: "2026-03-08T12:32:08.299Z"
  updated_by: "CODER"
  note: "Added release, upgrade, and guard fast-CI buckets; selector regressions passed, and isolated changed-file simulations now route those scopes to targeted contours instead of blanket full-fast."
commit:
  hash: "65af90705b56e882cb02f29b9fdddbe99db3e68a"
  message: "⚡ 6B393Q task: bucket broad pre-push suites by scope"
comments:
  -
    author: "CODER"
    body: "Start: measure the remaining expensive broad pre-push paths, identify the narrow change classes that still trigger full-fast, and implement additional path-aware buckets without weakening fallback coverage."
  -
    author: "CODER"
    body: "Verified: isolated release, upgrade, and guard changes now route to targeted fast-CI buckets instead of the blanket full-fast contour, while broad and mixed infrastructure edits still fall back to the wider path."
events:
  -
    type: "status"
    at: "2026-03-08T12:28:41.806Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: measure the remaining expensive broad pre-push paths, identify the narrow change classes that still trigger full-fast, and implement additional path-aware buckets without weakening fallback coverage."
  -
    type: "verify"
    at: "2026-03-08T12:32:08.299Z"
    author: "CODER"
    state: "ok"
    note: "Added release, upgrade, and guard fast-CI buckets; selector regressions passed, and isolated changed-file simulations now route those scopes to targeted contours instead of blanket full-fast."
  -
    type: "status"
    at: "2026-03-08T12:32:35.367Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: isolated release, upgrade, and guard changes now route to targeted fast-CI buckets instead of the blanket full-fast contour, while broad and mixed infrastructure edits still fall back to the wider path."
doc_version: 3
doc_updated_at: "2026-03-08T12:32:35.367Z"
doc_updated_by: "CODER"
description: "Split the expensive standard pre-push test sweep into explicit buckets so CLI, release, doctor, guard, and task-heavy paths can run only when their owning paths changed."
id_source: "generated"
---
## Summary

Bucket broad pre-push test suites by change scope

Split the expensive standard pre-push test sweep into explicit buckets so CLI, release, doctor, guard, and task-heavy paths can run only when their owning paths changed.

## Scope

- In scope: Split the expensive standard pre-push test sweep into explicit buckets so CLI, release, doctor, guard, and task-heavy paths can run only when their owning paths changed..
- Out of scope: unrelated refactors not required for "Bucket broad pre-push test suites by change scope".

## Plan

1. Analyze the remaining full-fast selector paths and isolate the highest-cost narrow change classes still falling into the broad bucket.
2. Add path-aware targeted buckets and matching fast CI execution paths for those change classes while preserving the full-fast fallback for mixed or infra-wide edits.
3. Add selector regressions and end-to-end fast-CI checks to prove the narrower buckets trigger for isolated changes and still fall back correctly for broad edits.

## Verify Steps

1. Run targeted selector and fast-CI tests for the new buckets. Expected: the selector returns the intended bucket and all focused tests pass.
2. Run lint and any required build checks for touched CI-selector files. Expected: no lint or build failures.
3. Simulate isolated changed-file scopes through scripts/run-local-ci.mjs --mode fast. Expected: narrow changes avoid the blanket full-fast path while broad changes still fall back correctly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:32:08.299Z — VERIFY — ok

By: CODER

Note: Added release, upgrade, and guard fast-CI buckets; selector regressions passed, and isolated changed-file simulations now route those scopes to targeted contours instead of blanket full-fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:32:08.148Z, excerpt_hash=sha256:2714f6db296cbcb17c9a40d2385e2c9058ecbf889663074596c838844255e3db

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: isolated release, upgrade, and guard changes were still falling into blanket full-fast even though each area already had focused regression suites.
  Impact: narrow infrastructure edits paid the full pre-push cost unnecessarily.
  Resolution: added targeted release, upgrade, and guard buckets with explicit focused suites; kept generic CLI changes on the broad fallback for a later cycle.
  Promotion: none
