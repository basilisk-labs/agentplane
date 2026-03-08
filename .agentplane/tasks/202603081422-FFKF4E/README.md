---
id: "202603081422-FFKF4E"
title: "Make init plan and verify approvals profile-driven defaults"
result_summary: "Init no longer asks separate happy-path questions for plan and verification approvals; those defaults now come from the chosen setup profile."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081422-MYT5TP"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:34:07.723Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:36:53.369Z"
  updated_by: "CODER"
  note: "Verified: targeted init tests pass, CLI docs freshness is clean, docs-site checks pass, and interactive init now keeps plan/verify approvals as profile-driven defaults while leaving network approval configurable and explicit flags available."
commit:
  hash: "c34cba94996451d09c4de5e6e5bb02e4e36bf786"
  message: "🧭 FFKF4E init: make plan and verify approvals profile-driven"
comments:
  -
    author: "CODER"
    body: "Start: narrowing init approval UX so plan and verification approvals become profile-driven defaults, while keeping explicit flags and network approval handling intact."
  -
    author: "CODER"
    body: "Verified: targeted init tests pass, CLI docs freshness is clean, docs-site checks pass, and interactive init now keeps plan and verification approvals as profile-driven defaults while leaving network approval configurable and explicit flags available for overrides."
events:
  -
    type: "status"
    at: "2026-03-08T14:34:08.040Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrowing init approval UX so plan and verification approvals become profile-driven defaults, while keeping explicit flags and network approval handling intact."
  -
    type: "verify"
    at: "2026-03-08T14:36:53.369Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted init tests pass, CLI docs freshness is clean, docs-site checks pass, and interactive init now keeps plan/verify approvals as profile-driven defaults while leaving network approval configurable and explicit flags available."
  -
    type: "status"
    at: "2026-03-08T14:37:04.143Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted init tests pass, CLI docs freshness is clean, docs-site checks pass, and interactive init now keeps plan and verification approvals as profile-driven defaults while leaving network approval configurable and explicit flags available for overrides."
doc_version: 3
doc_updated_at: "2026-03-08T14:37:04.143Z"
doc_updated_by: "CODER"
description: "Simplify init UX so plan and verification approvals are treated as workflow defaults of the chosen setup profile instead of separate interactive happy-path questions, while keeping explicit CLI overrides available."
id_source: "generated"
---
## Summary

- Problem: init currently asks interactive questions about plan and verification approvals even though those are agent-workflow defaults rather than meaningful user-facing safety choices in the normal happy-path.
- Target outcome: plan and verification approvals come from the selected setup profile by default, while explicit CLI flags remain available for advanced overrides.
- Constraint: keep network approval configurable and preserve non-interactive explicit overrides.

## Scope

### In scope
- simplify init interactive happy-path for plan/verify approvals
- preserve setup-profile defaults and explicit flags
- update targeted docs/help/tests to match the new behavior

### Out of scope
- silent global CLI auto-update behavior
- changing workflow_mode semantics
- removing network approval configurability

## Plan

1. Remove interactive plan/verify approval prompts from init and keep them profile-driven unless flags override them.
2. Update docs/help text so init explains that profile choice owns these defaults.
3. Run targeted init tests and docs/help freshness checks, then close the task.

## Verify Steps

1. Run targeted init tests. Expected: init still writes the correct approval values for profiles and explicit flags.
2. Run docs/help freshness checks touched by the init wording change. Expected: generated CLI/help surfaces stay in sync.
3. Review the interactive init flow code. Expected: only meaningful remaining approval question in the happy-path is network-related, not plan/verify orchestration defaults.

## Rollback Plan

1. Revert the init approval-UX change.
2. Re-run the targeted init tests and docs/help checks to confirm the previous prompts and wording are restored.

## Findings


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:36:53.369Z — VERIFY — ok

By: CODER

Note: Verified: targeted init tests pass, CLI docs freshness is clean, docs-site checks pass, and interactive init now keeps plan/verify approvals as profile-driven defaults while leaving network approval configurable and explicit flags available.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:34:08.040Z, excerpt_hash=sha256:9014c1f7f9fa91e3c27c799a5ebc14b497be322d46ccb0c51b53806b7c29a4aa

<!-- END VERIFICATION RESULTS -->
