---
id: "202603241335-7JHHSS"
title: "Persist final finish commit hash after close/amend"
result_summary: "finish now preserves task.commit as implementation provenance by recording tracked task READMEs in a separate deterministic close commit instead of amending the implementation commit."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:40:20.498Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: fix finish metadata so task.commit.hash matches the final visible commit after close/amend flows."
verification:
  state: "ok"
  updated_at: "2026-03-24T13:55:22.876Z"
  updated_by: "CODER"
  note: "ok: unit and CLI lifecycle tests confirm finish now records task README changes in a separate deterministic close commit, preserving task.commit as implementation provenance without the stale self-amend hash."
commit:
  hash: "8b5ebed729f6d417a7e9778d9b7f2d551511bc55"
  message: "✅ 7JHHSS code: done"
comments:
  -
    author: "CODER"
    body: "Start: trace the finish close path, fix stale task.commit.hash persistence after final close/amend flows, and keep the diff limited to finish metadata plus regression coverage."
  -
    author: "CODER"
    body: "Verified: removed the self-referential finish amend path, added a separate deterministic close commit for tracked task READMEs after comment-driven finish flows, and locked the behavior with unit plus CLI lifecycle regression coverage."
events:
  -
    type: "status"
    at: "2026-03-24T13:40:26.018Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the finish close path, fix stale task.commit.hash persistence after final close/amend flows, and keep the diff limited to finish metadata plus regression coverage."
  -
    type: "verify"
    at: "2026-03-24T13:55:22.876Z"
    author: "CODER"
    state: "ok"
    note: "ok: unit and CLI lifecycle tests confirm finish now records task README changes in a separate deterministic close commit, preserving task.commit as implementation provenance without the stale self-amend hash."
  -
    type: "status"
    at: "2026-03-24T13:56:15.889Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: removed the self-referential finish amend path, added a separate deterministic close commit for tracked task READMEs after comment-driven finish flows, and locked the behavior with unit plus CLI lifecycle regression coverage."
doc_version: 3
doc_updated_at: "2026-03-24T13:56:15.894Z"
doc_updated_by: "CODER"
description: "Fix finish so task.commit.hash records the final commit hash that remains on the branch after any close-commit or amend flow, rather than an intermediate pre-amend hash."
sections:
  Summary: |-
    Persist final finish commit hash after close/amend
    
    Fix finish so task.commit.hash records the final commit hash that remains on the branch after any close-commit or amend flow, rather than an intermediate pre-amend hash.
  Scope: |-
    - In scope: Fix finish so task.commit.hash records the final commit hash that remains on the branch after any close-commit or amend flow, rather than an intermediate pre-amend hash.
    - Out of scope: unrelated refactors not required for "Persist final finish commit hash after close/amend".
  Plan: "1. Trace the finish close path to identify where task.commit.hash is persisted before the final branch-visible commit hash is known. 2. Move metadata persistence to the final hash source and add a regression test. 3. Run focused finish tests and finish with one task-scoped commit."
  Verify Steps: |-
    1. Add or update a regression that proves task.commit.hash matches the final visible branch commit after finish closes the task.
    2. Run focused finish/closure tests that cover commit-from-comment and close/amend flows.
    3. Run bun run --filter=agentplane build.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T13:55:22.876Z — VERIFY — ok
    
    By: CODER
    
    Note: ok: unit and CLI lifecycle tests confirm finish now records task README changes in a separate deterministic close commit, preserving task.commit as implementation provenance without the stale self-amend hash.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:54:53.183Z, excerpt_hash=sha256:d093502679d725dbc7bb1b7b47276d78382d0296949d0a1ab84330c45de56fa8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. The stale hash was caused by a fixed-point problem: a tracked README cannot truthfully record the hash of the same commit that introduces that README metadata.
    2. The fix removes the self-referential amend path and records tracked task READMEs in a separate deterministic close commit after commit-from-comment/status-commit flows, while preserving task.commit as implementation provenance.
id_source: "generated"
---
## Summary

Persist final finish commit hash after close/amend

Fix finish so task.commit.hash records the final commit hash that remains on the branch after any close-commit or amend flow, rather than an intermediate pre-amend hash.

## Scope

- In scope: Fix finish so task.commit.hash records the final commit hash that remains on the branch after any close-commit or amend flow, rather than an intermediate pre-amend hash.
- Out of scope: unrelated refactors not required for "Persist final finish commit hash after close/amend".

## Plan

1. Trace the finish close path to identify where task.commit.hash is persisted before the final branch-visible commit hash is known. 2. Move metadata persistence to the final hash source and add a regression test. 3. Run focused finish tests and finish with one task-scoped commit.

## Verify Steps

1. Add or update a regression that proves task.commit.hash matches the final visible branch commit after finish closes the task.
2. Run focused finish/closure tests that cover commit-from-comment and close/amend flows.
3. Run bun run --filter=agentplane build.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T13:55:22.876Z — VERIFY — ok

By: CODER

Note: ok: unit and CLI lifecycle tests confirm finish now records task README changes in a separate deterministic close commit, preserving task.commit as implementation provenance without the stale self-amend hash.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:54:53.183Z, excerpt_hash=sha256:d093502679d725dbc7bb1b7b47276d78382d0296949d0a1ab84330c45de56fa8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. The stale hash was caused by a fixed-point problem: a tracked README cannot truthfully record the hash of the same commit that introduces that README metadata.
2. The fix removes the self-referential amend path and records tracked task READMEs in a separate deterministic close commit after commit-from-comment/status-commit flows, while preserving task.commit as implementation provenance.
