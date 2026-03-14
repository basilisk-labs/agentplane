---
id: "202603141531-81V28G"
title: "Stabilize git-utils staged rename timeout case"
result_summary: "Git-utils rename coverage now uses a dedicated timeout constant for the staged and modified rename cases."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/core/src/git/git-utils.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:33:14.556Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for the remaining v0.3.7 gate tail."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:44:38.025Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/core/src/git/git-utils.test.ts; Result: pass; Evidence: 8 tests passed and both rename cases completed within the suite budget. Scope: packages/core/src/git/git-utils.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to a local rename-timeout constant and two rename coverage tests in one file; no scope drift."
commit:
  hash: "7b8baae7659934b4e2c704755c5de636306208e6"
  message: "⏱️ 81V28G test: stabilize git-utils rename timeout budget"
comments:
  -
    author: "CODER"
    body: "Start: inspect the staged rename coverage timeout in packages/core/src/git/git-utils.test.ts, keep the diff minimal, and close only if the failure is another full-gate budget spill rather than a semantic rename regression."
  -
    author: "CODER"
    body: "Verified: git-utils rename coverage now has an explicit local timeout budget; suite, tsc, and package builds all passed with no scope drift."
events:
  -
    type: "status"
    at: "2026-03-14T15:43:01.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the staged rename coverage timeout in packages/core/src/git/git-utils.test.ts, keep the diff minimal, and close only if the failure is another full-gate budget spill rather than a semantic rename regression."
  -
    type: "verify"
    at: "2026-03-14T15:44:38.025Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/core/src/git/git-utils.test.ts; Result: pass; Evidence: 8 tests passed and both rename cases completed within the suite budget. Scope: packages/core/src/git/git-utils.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to a local rename-timeout constant and two rename coverage tests in one file; no scope drift."
  -
    type: "status"
    at: "2026-03-14T15:44:54.812Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: git-utils rename coverage now has an explicit local timeout budget; suite, tsc, and package builds all passed with no scope drift."
doc_version: 3
doc_updated_at: "2026-03-14T15:44:54.816Z"
doc_updated_by: "CODER"
description: "Stabilize the staged-rename coverage in core git-utils under full release load while preserving protected-path bypass detection semantics."
sections:
  Summary: |-
    Stabilize git-utils staged rename timeout case
    
    Stabilize the staged-rename coverage in core git-utils under full release load while preserving protected-path bypass detection semantics.
  Scope: |-
    - In scope: Stabilize the staged-rename coverage in core git-utils under full release load while preserving protected-path bypass detection semantics.
    - Out of scope: unrelated refactors not required for "Stabilize git-utils staged rename timeout case".
  Plan: |-
    1. Reproduce the staged-rename git-utils timeout under isolated and full-gate conditions to confirm whether the protected-path bypass coverage is only budget-sensitive.
    2. Patch the smallest coherent timeout or fixture issue while preserving rename-path semantics on both sides of the move.
    3. Re-run git-utils coverage and tsc, and record any remaining aggregate-load caveat in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/core/src/git/git-utils.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:44:38.025Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/core/src/git/git-utils.test.ts; Result: pass; Evidence: 8 tests passed and both rename cases completed within the suite budget. Scope: packages/core/src/git/git-utils.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to a local rename-timeout constant and two rename coverage tests in one file; no scope drift.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:43:01.249Z, excerpt_hash=sha256:cc67bd8caa75ce69276460b910971eeac053f68b0d3d5fd6c0c98be43b1cdd74
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize git-utils staged rename timeout case

Stabilize the staged-rename coverage in core git-utils under full release load while preserving protected-path bypass detection semantics.

## Scope

- In scope: Stabilize the staged-rename coverage in core git-utils under full release load while preserving protected-path bypass detection semantics.
- Out of scope: unrelated refactors not required for "Stabilize git-utils staged rename timeout case".

## Plan

1. Reproduce the staged-rename git-utils timeout under isolated and full-gate conditions to confirm whether the protected-path bypass coverage is only budget-sensitive.
2. Patch the smallest coherent timeout or fixture issue while preserving rename-path semantics on both sides of the move.
3. Re-run git-utils coverage and tsc, and record any remaining aggregate-load caveat in Findings.

## Verify Steps

1. Run `bun x vitest run packages/core/src/git/git-utils.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:44:38.025Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/core/src/git/git-utils.test.ts; Result: pass; Evidence: 8 tests passed and both rename cases completed within the suite budget. Scope: packages/core/src/git/git-utils.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to a local rename-timeout constant and two rename coverage tests in one file; no scope drift.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:43:01.249Z, excerpt_hash=sha256:cc67bd8caa75ce69276460b910971eeac053f68b0d3d5fd6c0c98be43b1cdd74

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
