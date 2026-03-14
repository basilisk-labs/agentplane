---
id: "202603141602-F1GN6D"
title: "Stabilize start semicolon-detail regression for v0.3.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T16:02:42.291Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:17:06.431Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: 25 tests passed after attaching the existing start path-handling timeout budget to the semicolon-details case. Scope: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the lifecycle test file; final confirmation remains with the next full release gate."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the semicolon-details start lifecycle regression, confirm whether it is a timeout-only full-gate spill or a real start-path formatting bug, and keep the fix inside the start lifecycle test or implementation path only if evidence requires it."
events:
  -
    type: "status"
    at: "2026-03-14T16:14:41.401Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the semicolon-details start lifecycle regression, confirm whether it is a timeout-only full-gate spill or a real start-path formatting bug, and keep the fix inside the start lifecycle test or implementation path only if evidence requires it."
  -
    type: "verify"
    at: "2026-03-14T16:17:06.431Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: 25 tests passed after attaching the existing start path-handling timeout budget to the semicolon-details case. Scope: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the lifecycle test file; final confirmation remains with the next full release gate."
doc_version: 3
doc_updated_at: "2026-03-14T16:17:06.436Z"
doc_updated_by: "CODER"
description: "Fix the remaining start lifecycle failure in run-cli.core.lifecycle coverage so status_commit_policy=off with semicolon details keeps its expected comment formatting and no longer times out under the full release gate."
sections:
  Summary: |-
    Stabilize start semicolon-detail regression for v0.3.7
    
    Fix the remaining start lifecycle failure in run-cli.core.lifecycle coverage so status_commit_policy=off with semicolon details keeps its expected comment formatting and no longer times out under the full release gate.
  Scope: |-
    - In scope: Fix the remaining start lifecycle failure in run-cli.core.lifecycle coverage so status_commit_policy=off with semicolon details keeps its expected comment formatting and no longer times out under the full release gate.
    - Out of scope: unrelated refactors not required for "Stabilize start semicolon-detail regression for v0.3.7".
  Plan: "1. Reproduce the semicolon-details failure in packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts under isolated execution. 2. Fix the smallest start/commit-from-comment path needed so status_commit_policy=off preserves the expected formatting and execution timing under full release load. 3. Re-run the file suite and TypeScript build, then record any remaining follow-up in Findings."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:17:06.431Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: 25 tests passed after attaching the existing start path-handling timeout budget to the semicolon-details case. Scope: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the lifecycle test file; final confirmation remains with the next full release gate.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:16:59.669Z, excerpt_hash=sha256:40017f95dd3a1653fb4c3379361b6434aff30806b99d6e61f3116223db13432c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Isolated evidence: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts passes after attaching the existing START_COMMIT_PATH_HANDLING_TIMEOUT_MS budget to the semicolon-details path.
    - Inference: this remaining start regression is consistent with a full-gate timeout spill, not a deterministic formatting or status_commit_policy=off behavior bug.
    - Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass.
    - Close-commit note: finish will use --no-close-commit while docs/user/cli-reference.generated.mdx remains intentionally dirty for the blocked release task.
id_source: "generated"
---
## Summary

Stabilize start semicolon-detail regression for v0.3.7

Fix the remaining start lifecycle failure in run-cli.core.lifecycle coverage so status_commit_policy=off with semicolon details keeps its expected comment formatting and no longer times out under the full release gate.

## Scope

- In scope: Fix the remaining start lifecycle failure in run-cli.core.lifecycle coverage so status_commit_policy=off with semicolon details keeps its expected comment formatting and no longer times out under the full release gate.
- Out of scope: unrelated refactors not required for "Stabilize start semicolon-detail regression for v0.3.7".

## Plan

1. Reproduce the semicolon-details failure in packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts under isolated execution. 2. Fix the smallest start/commit-from-comment path needed so status_commit_policy=off preserves the expected formatting and execution timing under full release load. 3. Re-run the file suite and TypeScript build, then record any remaining follow-up in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:17:06.431Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: 25 tests passed after attaching the existing start path-handling timeout budget to the semicolon-details case. Scope: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the lifecycle test file; final confirmation remains with the next full release gate.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:16:59.669Z, excerpt_hash=sha256:40017f95dd3a1653fb4c3379361b6434aff30806b99d6e61f3116223db13432c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Isolated evidence: packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts passes after attaching the existing START_COMMIT_PATH_HANDLING_TIMEOUT_MS budget to the semicolon-details path.
- Inference: this remaining start regression is consistent with a full-gate timeout spill, not a deterministic formatting or status_commit_policy=off behavior bug.
- Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass.
- Close-commit note: finish will use --no-close-commit while docs/user/cli-reference.generated.mdx remains intentionally dirty for the blocked release task.
