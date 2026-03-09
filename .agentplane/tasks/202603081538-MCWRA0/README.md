---
id: "202603081538-MCWRA0"
title: "Plan 0.3.3 stabilization workstream"
result_summary: "Defined and executed the minimal 0.3.3 prep graph: one release-flow code fix and one docs/policy stabilization task."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:39:46.905Z"
  updated_by: "ORCHESTRATOR"
  note: "0.3.3 prep is narrowed to three atomic outcomes: release-flow config parity, bug-ledger refresh, and promotion of only the strongest incident entries."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:50:24.999Z"
  updated_by: "PLANNER"
  note: "Verified: the 0.3.3 prep graph produced one focused code task and one focused docs/policy task, both now completed, and the planning pass left the tracked working tree clean apart from the intended implementation commits."
commit:
  hash: "ab8e2fc956343164f9f982f738b0de1ac1ff7b49"
  message: "📝 0YPG92 docs: refresh CLI bug ledger and incidents"
comments:
  -
    author: "PLANNER"
    body: "Start: locking the 0.3.3 prep scope to one planning task plus one release-flow code task and one docs/policy task, with explicit verification boundaries and no speculative expansion beyond those outcomes."
  -
    author: "PLANNER"
    body: "Verified: the 0.3.3 stabilization workstream is now narrowed to a completed release-flow parity fix and a completed bug-ledger-plus-incidents refresh, with no extra scope carried forward from the planning phase."
events:
  -
    type: "status"
    at: "2026-03-08T15:40:53.619Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: locking the 0.3.3 prep scope to one planning task plus one release-flow code task and one docs/policy task, with explicit verification boundaries and no speculative expansion beyond those outcomes."
  -
    type: "verify"
    at: "2026-03-08T15:50:24.999Z"
    author: "PLANNER"
    state: "ok"
    note: "Verified: the 0.3.3 prep graph produced one focused code task and one focused docs/policy task, both now completed, and the planning pass left the tracked working tree clean apart from the intended implementation commits."
  -
    type: "status"
    at: "2026-03-08T15:50:25.065Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the 0.3.3 stabilization workstream is now narrowed to a completed release-flow parity fix and a completed bug-ledger-plus-incidents refresh, with no extra scope carried forward from the planning phase."
doc_version: 3
doc_updated_at: "2026-03-08T15:50:25.065Z"
doc_updated_by: "PLANNER"
description: "Define the atomic task graph for the 0.3.3 prep cycle covering CLI bug ledger refresh, strong incident promotion, and release-flow synchronization of framework.cli.expected_version."
id_source: "generated"
---
## Summary

Plan 0.3.3 stabilization workstream

Define the atomic task graph for the 0.3.3 prep cycle covering CLI bug ledger refresh, strong incident promotion, and release-flow synchronization of framework.cli.expected_version.

## Scope

- In scope: Define the atomic task graph for the 0.3.3 prep cycle covering CLI bug ledger refresh, strong incident promotion, and release-flow synchronization of framework.cli.expected_version.
- Out of scope: unrelated refactors not required for "Plan 0.3.3 stabilization workstream".

## Plan

1. Audit the confirmed v0.3.x CLI failures, open gaps, and release-prep drift that still matter for 0.3.3.
2. Turn that audit into an atomic task graph covering release-flow code changes and docs/policy updates.
3. Record clear verification criteria and closure boundaries so the 0.3.3 prep work can run without scope ambiguity.

## Verify Steps

1. Inspect the three 0.3.3 prep tasks in agentplane task list or task show output. Expected: planner, code, and docs scopes are all present and non-overlapping.
2. Review the task README plans and Verify Steps for GF7P9C and 0YPG92. Expected: each task has concrete execution and verification criteria instead of placeholder text.
3. Confirm git status --short --untracked-files=no stays clean after the planning pass. Expected: the task graph is recorded without unrelated repository drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:50:24.999Z — VERIFY — ok

By: PLANNER

Note: Verified: the 0.3.3 prep graph produced one focused code task and one focused docs/policy task, both now completed, and the planning pass left the tracked working tree clean apart from the intended implementation commits.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T15:40:53.619Z, excerpt_hash=sha256:b534bc799281cbfe2953681f0d158703b08512f08908396ab3718366aa422d99

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
