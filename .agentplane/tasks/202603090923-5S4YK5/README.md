---
id: "202603090923-5S4YK5"
title: "Finalize canonical README v3 task-doc contract"
result_summary: "Aligned repo config, schema defaults, migration output, and task-facing docs/tests on the canonical README v3 contract."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T09:26:51.292Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T09:35:07.427Z"
  updated_by: "CODER"
  note: "Active README v3 contract is now aligned across repo config, schema defaults, migration output, and user-facing task guidance; targeted config, migrate-doc, and CLI task suites passed along with docs-site, doctor, routing, schema sync, and agentplane build."
commit:
  hash: "46e51c581ab8937b66147b6e61f6043d990349f6"
  message: "✨ 5S4YK5 code: finalize canonical README v3 contract"
comments:
  -
    author: "CODER"
    body: "Start: remove active Context/Notes assumptions from config, templates, and CLI/docs runtime surfaces while preserving legacy read compatibility."
  -
    author: "CODER"
    body: "Verified: active README v3 contract now excludes Context and Notes from runtime defaults while preserving legacy read compatibility and migration support."
events:
  -
    type: "status"
    at: "2026-03-09T09:26:58.288Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove active Context/Notes assumptions from config, templates, and CLI/docs runtime surfaces while preserving legacy read compatibility."
  -
    type: "verify"
    at: "2026-03-09T09:35:07.427Z"
    author: "CODER"
    state: "ok"
    note: "Active README v3 contract is now aligned across repo config, schema defaults, migration output, and user-facing task guidance; targeted config, migrate-doc, and CLI task suites passed along with docs-site, doctor, routing, schema sync, and agentplane build."
  -
    type: "status"
    at: "2026-03-09T09:35:07.783Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: active README v3 contract now excludes Context and Notes from runtime defaults while preserving legacy read compatibility and migration support."
doc_version: 3
doc_updated_at: "2026-03-09T09:35:07.783Z"
doc_updated_by: "CODER"
description: "Remove mixed v2/v3 runtime assumptions from config, task templates, help, and lifecycle validation so README v3 is the only active contract while legacy v2 stays read-compatible and migratable."
id_source: "generated"
---
## Summary

Finalize canonical README v3 task-doc contract

Remove mixed v2/v3 runtime assumptions from config, task templates, help, and lifecycle validation so README v3 is the only active contract while legacy v2 stays read-compatible and migratable.

## Scope

- In scope: Remove mixed v2/v3 runtime assumptions from config, task templates, help, and lifecycle validation so README v3 is the only active contract while legacy v2 stays read-compatible and migratable.
- Out of scope: unrelated refactors not required for "Finalize canonical README v3 task-doc contract".

## Plan

1. Remove legacy v2 sections from the active task-doc contract in repo config, task templates, and CLI/runtime help so new tasks and lifecycle guidance speak only README v3.
2. Preserve legacy v2 read compatibility by keeping Notes-aware fallback helpers and targeted migration-facing docs/tests, but stop advertising v2 sections as current runtime requirements.
3. Update task lifecycle/tests/generated surfaces that still assert Context or Notes as active sections, then verify with targeted task/CLI suites plus doctor and routing checks.

## Verify Steps

1. Review .agentplane/config.json, task templates, and CLI help after the patch. Expected: the active task-doc contract advertises Summary, Scope, Plan, Verify Steps, Verification, Rollback Plan, and Findings, without Context or Notes as current sections.
2. Run targeted task and CLI tests covering task creation, lifecycle validation, and help rendering. Expected: they pass while legacy v2 read/migration coverage still remains explicit.
3. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both succeed with no new drift introduced by the contract change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T09:35:07.427Z — VERIFY — ok

By: CODER

Note: Active README v3 contract is now aligned across repo config, schema defaults, migration output, and user-facing task guidance; targeted config, migrate-doc, and CLI task suites passed along with docs-site, doctor, routing, schema sync, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T09:26:58.288Z, excerpt_hash=sha256:8d8e469bf3464b25b026acfed69ae8ea4bfc255bc88cad478fcb266121842530

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
