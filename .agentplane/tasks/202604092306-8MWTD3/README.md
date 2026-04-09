---
id: "202604092306-8MWTD3"
title: "Print exact findings-add next step when incidents stay local"
result_summary: "Merged via PR #239."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T23:07:18.928Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:13:23.207Z"
  updated_by: "CODER"
  note: "Verified current HEAD after task commit: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree."
commit:
  hash: "15b5db39aa16de242aa1297f28b930215d38dbce"
  message: "incidents/ux: Print exact findings-add next step when incidents stay local (8MWTD3) (#239)"
comments:
  -
    author: "CODER"
    body: "Start: refine verify/finish incident no-op messaging so operators get an exact task findings add command when incidents.md stays unchanged after plain text input."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
events:
  -
    type: "status"
    at: "2026-04-09T23:07:41.710Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refine verify/finish incident no-op messaging so operators get an exact task findings add command when incidents.md stays unchanged after plain text input."
  -
    type: "verify"
    at: "2026-04-09T23:11:28.385Z"
    author: "CODER"
    state: "ok"
    note: "Verified: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree."
  -
    type: "verify"
    at: "2026-04-09T23:13:23.207Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after task commit: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree."
  -
    type: "status"
    at: "2026-04-09T23:31:51.575Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
  -
    type: "status"
    at: "2026-04-09T23:32:52.847Z"
    author: "INTEGRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
  -
    type: "status"
    at: "2026-04-09T23:33:07.565Z"
    author: "INTEGRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: merged via PR #239 after hosted checks passed; closeout metadata reconciled on base."
doc_version: 3
doc_updated_at: "2026-04-09T23:33:07.565Z"
doc_updated_by: "INTEGRATOR"
description: "When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose."
sections:
  Summary: |-
    Print exact findings-add next step when incidents stay local
    
    When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.
  Scope: |-
    - In scope: When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.
    - Out of scope: unrelated refactors not required for "Print exact findings-add next step when incidents stay local".
  Plan: |-
    1. Implement the change for "Print exact findings-add next step when incidents stay local".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run verify with a plain --note and no structured finding flags. Expected: the no-op message names incidents.md and prints an exact task findings add command for the active task.
    2. Run finish with plain body/result text and no structured finding flags. Expected: the no-op message prints the same exact next-step pattern for finish.
    3. Run a structured finding path that already includes observation/impact/resolution. Expected: the success/no-op messaging stays correct and does not duplicate the plain-text guidance.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:11:28.385Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:41.717Z, excerpt_hash=sha256:3ea085f9b2bd79cb922dd92a7bd9498fd5eb5b639dfc0177d89f84c11963bd36
    
    ### 2026-04-09T23:13:23.207Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current HEAD after task commit: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:11:28.387Z, excerpt_hash=sha256:3ea085f9b2bd79cb922dd92a7bd9498fd5eb5b639dfc0177d89f84c11963bd36
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Print exact findings-add next step when incidents stay local

When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.

## Scope

- In scope: When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.
- Out of scope: unrelated refactors not required for "Print exact findings-add next step when incidents stay local".

## Plan

1. Implement the change for "Print exact findings-add next step when incidents stay local".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run verify with a plain --note and no structured finding flags. Expected: the no-op message names incidents.md and prints an exact task findings add command for the active task.
2. Run finish with plain body/result text and no structured finding flags. Expected: the no-op message prints the same exact next-step pattern for finish.
3. Run a structured finding path that already includes observation/impact/resolution. Expected: the success/no-op messaging stays correct and does not duplicate the plain-text guidance.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:11:28.385Z — VERIFY — ok

By: CODER

Note: Verified: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:41.717Z, excerpt_hash=sha256:3ea085f9b2bd79cb922dd92a7bd9498fd5eb5b639dfc0177d89f84c11963bd36

### 2026-04-09T23:13:23.207Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after task commit: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:11:28.387Z, excerpt_hash=sha256:3ea085f9b2bd79cb922dd92a7bd9498fd5eb5b639dfc0177d89f84c11963bd36

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
