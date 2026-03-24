---
id: "202603240203-NT6Y4M"
title: "Backfill recipes scenario tests after run_profile narrowing"
result_summary: "recipes.scenario tests now assert scenario metadata outside run_profile"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "test"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T02:03:53.510Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T02:04:38.425Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts
    Result: pass
    Evidence: 1 file passed, 16 tests passed; expectations now assert scenario metadata at resolved selection level.
    Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
    
    Command: git diff -- packages/agentplane/src/commands/recipes.scenario.test.ts
    Result: pass
    Evidence: only expectation moves from run_profile to top-level resolved selection fields remain.
    Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
commit:
  hash: "495a220b8e9b32ac48c738c47b607440ff48cf13"
  message: "✅ NT6Y4M code: done"
comments:
  -
    author: "CODER"
    body: "Start: align recipes.scenario expectations with the narrowed run_profile contract so scenario metadata is asserted at the resolved selection level and the working tree can close cleanly."
  -
    author: "CODER"
    body: "Verified: aligned recipes.scenario expectations with the narrowed run_profile contract and confirmed the focused scenario suite passes."
events:
  -
    type: "status"
    at: "2026-03-24T02:03:59.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align recipes.scenario expectations with the narrowed run_profile contract so scenario metadata is asserted at the resolved selection level and the working tree can close cleanly."
  -
    type: "verify"
    at: "2026-03-24T02:04:38.425Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts
      Result: pass
      Evidence: 1 file passed, 16 tests passed; expectations now assert scenario metadata at resolved selection level.
      Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
      
      Command: git diff -- packages/agentplane/src/commands/recipes.scenario.test.ts
      Result: pass
      Evidence: only expectation moves from run_profile to top-level resolved selection fields remain.
      Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
  -
    type: "status"
    at: "2026-03-24T02:05:32.533Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: aligned recipes.scenario expectations with the narrowed run_profile contract and confirmed the focused scenario suite passes."
doc_version: 3
doc_updated_at: "2026-03-24T02:05:32.533Z"
doc_updated_by: "CODER"
description: "Align recipes.scenario test expectations with the narrowed recipe run_profile contract so scenario metadata is asserted on the resolved selection instead of inside run_profile."
sections:
  Summary: |-
    Backfill recipes scenario tests after run_profile narrowing
    
    Align recipes.scenario test expectations with the narrowed recipe run_profile contract so scenario metadata is asserted on the resolved selection instead of inside run_profile.
  Scope: |-
    - In scope: Align recipes.scenario test expectations with the narrowed recipe run_profile contract so scenario metadata is asserted on the resolved selection instead of inside run_profile.
    - Out of scope: unrelated refactors not required for "Backfill recipes scenario tests after run_profile narrowing".
  Plan: |-
    1. Update recipes.scenario test expectations to assert scenario metadata on resolved selection instead of run_profile.
    2. Run the focused recipes scenario test suite and confirm the narrowed run_profile contract remains covered.
    3. Record verification evidence and close with a traceable task commit.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts`. Expected: the suite passes and asserts scenario metadata at the resolved selection level.
    2. Inspect the diff for `packages/agentplane/src/commands/recipes.scenario.test.ts`. Expected: only expectation updates needed for the narrowed run_profile contract remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T02:04:38.425Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts
    Result: pass
    Evidence: 1 file passed, 16 tests passed; expectations now assert scenario metadata at resolved selection level.
    Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
    
    Command: git diff -- packages/agentplane/src/commands/recipes.scenario.test.ts
    Result: pass
    Evidence: only expectation moves from run_profile to top-level resolved selection fields remain.
    Scope: packages/agentplane/src/commands/recipes.scenario.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T02:03:59.128Z, excerpt_hash=sha256:7943369e35d7fa62d9d5acb8d256c8a77ecce6d857708bbfa918fb809340ed53
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Backfill recipes scenario tests after run_profile narrowing

Align recipes.scenario test expectations with the narrowed recipe run_profile contract so scenario metadata is asserted on the resolved selection instead of inside run_profile.

## Scope

- In scope: Align recipes.scenario test expectations with the narrowed recipe run_profile contract so scenario metadata is asserted on the resolved selection instead of inside run_profile.
- Out of scope: unrelated refactors not required for "Backfill recipes scenario tests after run_profile narrowing".

## Plan

1. Update recipes.scenario test expectations to assert scenario metadata on resolved selection instead of run_profile.
2. Run the focused recipes scenario test suite and confirm the narrowed run_profile contract remains covered.
3. Record verification evidence and close with a traceable task commit.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts`. Expected: the suite passes and asserts scenario metadata at the resolved selection level.
2. Inspect the diff for `packages/agentplane/src/commands/recipes.scenario.test.ts`. Expected: only expectation updates needed for the narrowed run_profile contract remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T02:04:38.425Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts
Result: pass
Evidence: 1 file passed, 16 tests passed; expectations now assert scenario metadata at resolved selection level.
Scope: packages/agentplane/src/commands/recipes.scenario.test.ts

Command: git diff -- packages/agentplane/src/commands/recipes.scenario.test.ts
Result: pass
Evidence: only expectation moves from run_profile to top-level resolved selection fields remain.
Scope: packages/agentplane/src/commands/recipes.scenario.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T02:03:59.128Z, excerpt_hash=sha256:7943369e35d7fa62d9d5acb8d256c8a77ecce6d857708bbfa918fb809340ed53

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
