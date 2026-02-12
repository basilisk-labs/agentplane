---
id: "202602121038-RPKYR1"
title: "Docs: default to finish --close-commit in lifecycle guidance"
result_summary: "docs updated to default finish --close-commit flow"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T10:40:10.557Z"
  updated_by: "DOCS"
  note: "Verified: quickstart/role/task-lifecycle now default to finish --close-commit; CLI reference regenerated; help-snap and lint pass."
commit:
  hash: "514c4045338e228f3433cb0e61affe0033c81fb8"
  message: "✅ RPKYR1 docs: prefer finish --close-commit in docs and quickstart"
comments:
  -
    author: "DOCS"
    body: "Start: update docs and quickstart to prefer finish --close-commit as the default single-command close flow for one-task lifecycle."
  -
    author: "DOCS"
    body: "Verified: docs and command guide now point to finish --close-commit as the default closure path; generated CLI reference updated and checks passed."
events:
  -
    type: "status"
    at: "2026-02-12T10:38:36.697Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update docs and quickstart to prefer finish --close-commit as the default single-command close flow for one-task lifecycle."
  -
    type: "verify"
    at: "2026-02-12T10:40:10.557Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: quickstart/role/task-lifecycle now default to finish --close-commit; CLI reference regenerated; help-snap and lint pass."
  -
    type: "status"
    at: "2026-02-12T10:41:28.258Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs and command guide now point to finish --close-commit as the default closure path; generated CLI reference updated and checks passed."
doc_version: 2
doc_updated_at: "2026-02-12T10:41:28.258Z"
doc_updated_by: "DOCS"
description: "Update user-facing docs and quickstart examples to use the single-command finish+close flow, reducing agent command churn and token burn."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Update quickstart examples to prefer finish --close-commit for single-task completion.\n2. Update docs where close workflow is described so status/close commits are presented as one command path.\n3. Validate docs/help references and run focused tests.\n4. Commit docs updates and finish the task.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:40:10.557Z — VERIFY — ok

By: DOCS

Note: Verified: quickstart/role/task-lifecycle now default to finish --close-commit; CLI reference regenerated; help-snap and lint pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:38:36.697Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
