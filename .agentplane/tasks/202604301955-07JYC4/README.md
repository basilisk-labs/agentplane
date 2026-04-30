---
id: "202604301955-07JYC4"
title: "Prune unused GPT-5.5 prompt diagnostic exports"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "code"
  - "knip"
verify:
  - "bun run knip:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T19:56:41.905Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T19:59:14.422Z"
  updated_by: "CODER"
  note: "Verified: bun run knip:check passed after pruning the unused GPT-5.5 diagnostic type exports, focused gpt55-contract tests passed, and the final implementation diff is limited to the prompt-module contract barrel surface."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: pruning the unused GPT-5.5 prompt diagnostic type exports in the dedicated task worktree, then verifying with the Knip baseline guard before opening PR artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T19:57:15.284Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: pruning the unused GPT-5.5 prompt diagnostic type exports in the dedicated task worktree, then verifying with the Knip baseline guard before opening PR artifacts."
  -
    type: "verify"
    at: "2026-04-30T19:59:14.422Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run knip:check passed after pruning the unused GPT-5.5 diagnostic type exports, focused gpt55-contract tests passed, and the final implementation diff is limited to the prompt-module contract barrel surface."
doc_version: 3
doc_updated_at: "2026-04-30T19:59:14.429Z"
doc_updated_by: "CODER"
description: "Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline."
sections:
  Summary: |-
    Prune unused GPT-5.5 prompt diagnostic exports
    
    Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.
  Scope: |-
    - In scope: Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.
    - Out of scope: unrelated refactors not required for "Prune unused GPT-5.5 prompt diagnostic exports".
  Plan: "1. Inspect the GPT-5.5 prompt contract module and its public re-exports. 2. Remove unused diagnostic type exports if they are not part of an active public contract, keeping implementation-local typing where useful. 3. Run bun run knip:check and a focused prompt-module test if touched behavior warrants it."
  Verify Steps: |-
    1. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T19:59:14.422Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run knip:check passed after pruning the unused GPT-5.5 diagnostic type exports, focused gpt55-contract tests passed, and the final implementation diff is limited to the prompt-module contract barrel surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T19:57:15.284Z, excerpt_hash=sha256:cb59ca8be8361b3a11459b29986055cbbf82748e5b076e98eccc03ac3480d518
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune unused GPT-5.5 prompt diagnostic exports

Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.

## Scope

- In scope: Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.
- Out of scope: unrelated refactors not required for "Prune unused GPT-5.5 prompt diagnostic exports".

## Plan

1. Inspect the GPT-5.5 prompt contract module and its public re-exports. 2. Remove unused diagnostic type exports if they are not part of an active public contract, keeping implementation-local typing where useful. 3. Run bun run knip:check and a focused prompt-module test if touched behavior warrants it.

## Verify Steps

1. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T19:59:14.422Z — VERIFY — ok

By: CODER

Note: Verified: bun run knip:check passed after pruning the unused GPT-5.5 diagnostic type exports, focused gpt55-contract tests passed, and the final implementation diff is limited to the prompt-module contract barrel surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T19:57:15.284Z, excerpt_hash=sha256:cb59ca8be8361b3a11459b29986055cbbf82748e5b076e98eccc03ac3480d518

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
