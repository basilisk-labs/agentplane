---
id: "202603081006-ZWK4YX"
title: "Validate README v3 migration on a legacy project scenario"
result_summary: "Added a regression scenario that validates the README v2 to v3 recovery path on a legacy-style project through the real CLI."
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603081006-TT7N3B"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:04:45.877Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:13:31.886Z"
  updated_by: "TESTER"
  note: "Added a real CLI integration scenario that creates a project, commits a legacy README v2 task state, confirms doctor recommends agentplane task migrate-doc --all, then validates upgrade --yes, task migrate-doc --all, task export, and a clean final doctor run on the migrated snapshot."
commit:
  hash: "44269f2202043d061d349aa5f5c6d98b592afa31"
  message: "🧪 ZWK4YX task: validate README v3 migration on legacy scenario"
comments:
  -
    author: "TESTER"
    body: "Start: codify a real CLI legacy-project migration scenario covering upgrade, doctor, task migrate-doc --all, and export."
  -
    author: "TESTER"
    body: "Verified: the real CLI scenario now proves that a committed legacy README v2 task state can be recovered through doctor guidance, upgrade --yes, task migrate-doc --all, task export, and a clean final doctor run."
events:
  -
    type: "status"
    at: "2026-03-08T12:04:50.279Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: codify a real CLI legacy-project migration scenario covering upgrade, doctor, task migrate-doc --all, and export."
  -
    type: "verify"
    at: "2026-03-08T12:13:31.886Z"
    author: "TESTER"
    state: "ok"
    note: "Added a real CLI integration scenario that creates a project, commits a legacy README v2 task state, confirms doctor recommends agentplane task migrate-doc --all, then validates upgrade --yes, task migrate-doc --all, task export, and a clean final doctor run on the migrated snapshot."
  -
    type: "status"
    at: "2026-03-08T12:13:54.300Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the real CLI scenario now proves that a committed legacy README v2 task state can be recovered through doctor guidance, upgrade --yes, task migrate-doc --all, task export, and a clean final doctor run."
doc_version: 3
doc_updated_at: "2026-03-08T12:13:54.300Z"
doc_updated_by: "TESTER"
description: "Exercise upgrade, doctor, and migrate-doc against a legacy-style project to confirm the v2 to v3 rollout path is stable."
id_source: "generated"
---
## Summary

Validate README v3 migration on a legacy project scenario

Exercise upgrade, doctor, and migrate-doc against a legacy-style project to confirm the v2 to v3 rollout path is stable.

## Scope

- In scope: Exercise upgrade, doctor, and migrate-doc against a legacy-style project to confirm the v2 to v3 rollout path is stable..
- Out of scope: unrelated refactors not required for "Validate README v3 migration on a legacy project scenario".

## Plan

1. Build a reproducible legacy-project scenario under a temporary nested git repo inside this repository, using the real CLI path rather than unit-only helpers. 2. Exercise the current recovery path end to end: create a project, inject a legacy README v2 task state, run upgrade/doctor, then run task migrate-doc --all plus task export and confirm the workspace reaches a clean README v3 snapshot. 3. Codify the scenario as an automated regression test and update any touched guidance only if the runtime behavior diverges from the documented recovery path.

## Verify Steps

1. Run the automated legacy-project scenario through the real CLI. Expected: doctor reports the active legacy README v2 state before migration and points to agentplane task migrate-doc --all. 2. Run the recovery path in the scenario. Expected: agentplane upgrade --yes succeeds, task migrate-doc --all upgrades the task docs, and task export refreshes tasks.json to doc_version=3. 3. Re-run doctor on the migrated scenario. Expected: warnings=0 for README migration state and the workspace reports a clean README v3 snapshot.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:13:31.886Z — VERIFY — ok

By: TESTER

Note: Added a real CLI integration scenario that creates a project, commits a legacy README v2 task state, confirms doctor recommends agentplane task migrate-doc --all, then validates upgrade --yes, task migrate-doc --all, task export, and a clean final doctor run on the migrated snapshot.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:04:50.279Z, excerpt_hash=sha256:b52d31308f1d15ca254534ca936207b5b01dae8ab2df4a333acef174f30e127e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
