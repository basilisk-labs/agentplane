---
id: "202603081006-0G67DX"
title: "Add upgrade guidance for task README v3 migration"
result_summary: "Documented the two-step recovery path for framework upgrade plus README v3 migration."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081006-SDFADJ"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:30:33.712Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:33:16.792Z"
  updated_by: "DOCS"
  note: "Docs now explain the two-step upgrade path: update framework-managed files with agentplane upgrade, then run task migrate-doc --all when doctor reports active legacy README v2/v3 drift; docs site check passed and doctor only shows the expected transitional warning for this repository archive."
commit:
  hash: "dc69f5e3c7f96e46d50099af116f9a1546568ffb"
  message: "📝 0G67DX task: document README v3 upgrade recovery"
comments:
  -
    author: "DOCS"
    body: "Start: add upgrade guidance for task README v3 migration and explain when old projects must run task migrate-doc --all after upgrade."
  -
    author: "DOCS"
    body: "Verified: upgrade docs now explain when legacy workspaces must run task migrate-doc --all after framework upgrade and doctor drift warnings."
events:
  -
    type: "status"
    at: "2026-03-08T11:32:00.579Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add upgrade guidance for task README v3 migration and explain when old projects must run task migrate-doc --all after upgrade."
  -
    type: "verify"
    at: "2026-03-08T11:33:16.792Z"
    author: "DOCS"
    state: "ok"
    note: "Docs now explain the two-step upgrade path: update framework-managed files with agentplane upgrade, then run task migrate-doc --all when doctor reports active legacy README v2/v3 drift; docs site check passed and doctor only shows the expected transitional warning for this repository archive."
  -
    type: "status"
    at: "2026-03-08T11:34:04.219Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade docs now explain when legacy workspaces must run task migrate-doc --all after framework upgrade and doctor drift warnings."
doc_version: 3
doc_updated_at: "2026-03-08T11:34:04.219Z"
doc_updated_by: "DOCS"
description: "Teach upgrade and user-facing recovery docs how to move old projects from task README v2 to v3 without hidden mixed states."
id_source: "generated"
---
## Summary

Add upgrade guidance for task README v3 migration

Teach upgrade and user-facing recovery docs how to move old projects from task README v2 to v3 without hidden mixed states.

## Scope

- In scope: Teach upgrade and user-facing recovery docs how to move old projects from task README v2 to v3 without hidden mixed states..
- Out of scope: unrelated refactors not required for "Add upgrade guidance for task README v3 migration".

## Plan

1. Inspect setup, workflow-migration, and legacy upgrade recovery docs to locate the current upgrade path and the right place to introduce README v3 migration guidance. 2. Update user-facing upgrade/recovery guidance so old projects learn when to run task migrate-doc --all, what mixed v2/v3 state means, and how doctor/upgrade interact after README v3 rollout. 3. Run targeted docs checks plus doctor and finish with a docs-only commit pushed to main.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:33:16.792Z — VERIFY — ok

By: DOCS

Note: Docs now explain the two-step upgrade path: update framework-managed files with agentplane upgrade, then run task migrate-doc --all when doctor reports active legacy README v2/v3 drift; docs site check passed and doctor only shows the expected transitional warning for this repository archive.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T11:32:00.579Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
