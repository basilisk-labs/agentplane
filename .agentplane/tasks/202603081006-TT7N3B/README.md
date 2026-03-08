---
id: "202603081006-TT7N3B"
title: "Migrate repository task archive to README v3"
result_summary: "Migrated the repository task archive to README v3 so all task READMEs and exported task snapshots now use doc_version=3 consistently."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081006-0D6TGG"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:42:59.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:00:29.873Z"
  updated_by: "DOCS"
  note: "Repository task archive was migrated to README v3. agentplane task migrate-doc --all now leaves all 1066 task READMEs at doc_version=3, agentplane task export refreshed .agentplane/tasks.json accordingly, and agentplane doctor reports warnings=0 on the updated snapshot."
commit:
  hash: "f39a4e5ff66381142e1824273e52e082ebfb2564"
  message: "📝 TT7N3B task: migrate repository task archive to README v3"
comments:
  -
    author: "DOCS"
    body: "Start: run the controlled repository-wide task README migration to v3, then verify that doctor and representative archive samples reflect the new contract cleanly."
  -
    author: "DOCS"
    body: "Verified: migrated the repository task archive to README v3, refreshed tasks.json, and confirmed doctor is clean on the updated snapshot."
events:
  -
    type: "status"
    at: "2026-03-08T11:43:06.028Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: run the controlled repository-wide task README migration to v3, then verify that doctor and representative archive samples reflect the new contract cleanly."
  -
    type: "verify"
    at: "2026-03-08T12:00:29.873Z"
    author: "DOCS"
    state: "ok"
    note: "Repository task archive was migrated to README v3. agentplane task migrate-doc --all now leaves all 1066 task READMEs at doc_version=3, agentplane task export refreshed .agentplane/tasks.json accordingly, and agentplane doctor reports warnings=0 on the updated snapshot."
  -
    type: "status"
    at: "2026-03-08T12:00:43.329Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: migrated the repository task archive to README v3, refreshed tasks.json, and confirmed doctor is clean on the updated snapshot."
doc_version: 3
doc_updated_at: "2026-03-08T12:00:43.329Z"
doc_updated_by: "DOCS"
description: "Run a controlled migration of repository task READMEs to the new v3 format after runtime support is complete."
id_source: "generated"
---
## Summary

Migrate repository task archive to README v3

Run a controlled migration of repository task READMEs to the new v3 format after runtime support is complete.

## Scope

- In scope: Run a controlled migration of repository task READMEs to the new v3 format after runtime support is complete..
- Out of scope: unrelated refactors not required for "Migrate repository task archive to README v3".

## Plan

1. Capture the repository baseline for task README migration so the archive-wide churn stays explainable (legacy count, active count, representative before-state). 2. Run agentplane task migrate-doc --all to normalize repository task READMEs from doc_version=2 to README v3, then inspect representative tasks to confirm Findings/Verification ordering and content preservation. 3. Run doctor and targeted task-doc checks to confirm the active v2/v3 drift warning disappears, then commit and push the controlled archive migration.

## Verify Steps

1. Capture a before/after sample from the task archive. Expected: migrated README docs keep task content while switching to doc_version=3 with Verification and Findings in the canonical order. 2. Run agentplane task migrate-doc --all and inspect the summary. Expected: the command rewrites the repository archive deterministically without manual README edits. 3. Run doctor and task checks after migration. Expected: the active legacy README v2/v3 warning is gone and the repository remains operable on the new contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:00:29.873Z — VERIFY — ok

By: DOCS

Note: Repository task archive was migrated to README v3. agentplane task migrate-doc --all now leaves all 1066 task READMEs at doc_version=3, agentplane task export refreshed .agentplane/tasks.json accordingly, and agentplane doctor reports warnings=0 on the updated snapshot.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T11:43:06.028Z, excerpt_hash=sha256:1d3a498f52e6a47d555b209cbffd6d4a7ca69472feb3f54e470b1a5019834e35

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
