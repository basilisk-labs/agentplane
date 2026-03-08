---
id: "202603081006-0D6TGG"
title: "Update lifecycle tests and CLI/docs surfaces for README v3"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on:
  - "202603081006-32D0Y2"
  - "202603081006-0G67DX"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:35:59.032Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:39:40.080Z"
  updated_by: "TESTER"
  note: "Lifecycle/help/docs surfaces now describe README v3 consistently: task new and task verify-show help use the acceptance-contract wording, task migrate-doc explicitly covers legacy v2/v3 recovery after upgrade, user lifecycle docs point old workspaces to task migrate-doc --all, targeted help/tasks/lifecycle vitest passed, docs site check passed, CLI reference freshness is green, and doctor only shows the expected legacy-task migration warning for this repository."
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: align lifecycle tests, task help surfaces, and generated docs with the README v3 contract and migration guidance."
events:
  -
    type: "status"
    at: "2026-03-08T11:36:03.736Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: align lifecycle tests, task help surfaces, and generated docs with the README v3 contract and migration guidance."
  -
    type: "verify"
    at: "2026-03-08T11:39:40.080Z"
    author: "TESTER"
    state: "ok"
    note: "Lifecycle/help/docs surfaces now describe README v3 consistently: task new and task verify-show help use the acceptance-contract wording, task migrate-doc explicitly covers legacy v2/v3 recovery after upgrade, user lifecycle docs point old workspaces to task migrate-doc --all, targeted help/tasks/lifecycle vitest passed, docs site check passed, CLI reference freshness is green, and doctor only shows the expected legacy-task migration warning for this repository."
doc_version: 2
doc_updated_at: "2026-03-08T11:39:40.082Z"
doc_updated_by: "TESTER"
description: "Refresh tests, help surfaces, and generated references so the new README v3 contract is enforced consistently."
id_source: "generated"
---
## Summary

Update lifecycle tests and CLI/docs surfaces for README v3

Refresh tests, help surfaces, and generated references so the new README v3 contract is enforced consistently.

## Scope

- In scope: Refresh tests, help surfaces, and generated references so the new README v3 contract is enforced consistently..
- Out of scope: unrelated refactors not required for "Update lifecycle tests and CLI/docs surfaces for README v3".

## Plan

1. Audit lifecycle tests, task command specs, and user-facing lifecycle docs for stale README contract wording or missing README v3 migration guidance. 2. Update the relevant CLI/help/docs surfaces so Verify Steps, Verification, Findings, and task migrate-doc guidance describe the README v3 contract consistently while preserving legacy v2 compatibility notes. 3. Refresh generated CLI reference/help snapshots, run focused lifecycle/help/docs checks, and close with a pushed implementation commit.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Read the lifecycle and task-contract docs. Expected: README v3 is described as the target contract, legacy v2 behavior remains clearly marked as compatibility-only, and migrate-doc guidance is consistent. 2. Inspect task command help and generated CLI reference. Expected: task new, task migrate-doc, and task verify-show describe the README v3 contract without stale wording or hidden legacy assumptions. 3. Run focused lifecycle/help/docs checks. Expected: updated snapshots, generated reference, and lifecycle tests all pass without drift.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:39:40.080Z — VERIFY — ok

By: TESTER

Note: Lifecycle/help/docs surfaces now describe README v3 consistently: task new and task verify-show help use the acceptance-contract wording, task migrate-doc explicitly covers legacy v2/v3 recovery after upgrade, user lifecycle docs point old workspaces to task migrate-doc --all, targeted help/tasks/lifecycle vitest passed, docs site check passed, CLI reference freshness is green, and doctor only shows the expected legacy-task migration warning for this repository.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T11:36:03.736Z, excerpt_hash=sha256:98c1ebb40e2d70f5346719d420a659168719950c0fc6f231eac6dad84b724f85

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
