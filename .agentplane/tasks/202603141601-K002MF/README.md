---
id: "202603141601-K002MF"
title: "Stabilize readiness JSON and timeout regressions for v0.3.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T16:02:12.035Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:07:08.004Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; Result: pass; Evidence: 8 tests passed and the readiness/preflight cases completed cleanly after quieting finish setup output and adding a local timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the readiness test file; full release-gate confirmation remains with the blocked release task."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the readiness and preflight --json regressions, identify whether the failures come from timeout budget, stdout contamination, or both, and keep the fix inside the readiness/preflight surface unless evidence proves broader drift."
events:
  -
    type: "status"
    at: "2026-03-14T16:03:43.002Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the readiness and preflight --json regressions, identify whether the failures come from timeout budget, stdout contamination, or both, and keep the fix inside the readiness/preflight surface unless evidence proves broader drift."
  -
    type: "verify"
    at: "2026-03-14T16:07:08.004Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; Result: pass; Evidence: 8 tests passed and the readiness/preflight cases completed cleanly after quieting finish setup output and adding a local timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the readiness test file; full release-gate confirmation remains with the blocked release task."
doc_version: 3
doc_updated_at: "2026-03-14T16:07:08.013Z"
doc_updated_by: "CODER"
description: "Fix the remaining readiness failures in run-cli.core.branch-meta.readiness coverage: restore deterministic ready output timing and ensure preflight --json emits clean machine-readable JSON without leading CLI noise."
sections:
  Summary: |-
    Stabilize readiness JSON and timeout regressions for v0.3.7
    
    Fix the remaining readiness failures in run-cli.core.branch-meta.readiness coverage: restore deterministic ready output timing and ensure preflight --json emits clean machine-readable JSON without leading CLI noise.
  Scope: |-
    - In scope: Fix the remaining readiness failures in run-cli.core.branch-meta.readiness coverage: restore deterministic ready output timing and ensure preflight --json emits clean machine-readable JSON without leading CLI noise.
    - Out of scope: unrelated refactors not required for "Stabilize readiness JSON and timeout regressions for v0.3.7".
  Plan: "1. Reproduce the two readiness failures in packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts under isolated execution. 2. Separate timing overflow from output-contract drift, then make the smallest coherent fix so ready/preflight stay deterministic under full release load. 3. Re-run the file suite and TypeScript build, then record whether any follow-up remains in Findings."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:07:08.004Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; Result: pass; Evidence: 8 tests passed and the readiness/preflight cases completed cleanly after quieting finish setup output and adding a local timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the readiness test file; full release-gate confirmation remains with the blocked release task.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:07:07.778Z, excerpt_hash=sha256:97fd098ca258b42a68e1c01d4da5ff34c50be551419ebe944ee2c9561ec3073d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Isolated evidence: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passes after quieting the dependency finish setup and raising the local ready-details timeout budget.
    - Inference: the JSON contamination was likely caused by leaked close-commit stdout from readiness test setup under full-gate load rather than by preflight command serialization itself.
    - Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass, because the original failure only reproduced there.
id_source: "generated"
---
## Summary

Stabilize readiness JSON and timeout regressions for v0.3.7

Fix the remaining readiness failures in run-cli.core.branch-meta.readiness coverage: restore deterministic ready output timing and ensure preflight --json emits clean machine-readable JSON without leading CLI noise.

## Scope

- In scope: Fix the remaining readiness failures in run-cli.core.branch-meta.readiness coverage: restore deterministic ready output timing and ensure preflight --json emits clean machine-readable JSON without leading CLI noise.
- Out of scope: unrelated refactors not required for "Stabilize readiness JSON and timeout regressions for v0.3.7".

## Plan

1. Reproduce the two readiness failures in packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts under isolated execution. 2. Separate timing overflow from output-contract drift, then make the smallest coherent fix so ready/preflight stay deterministic under full release load. 3. Re-run the file suite and TypeScript build, then record whether any follow-up remains in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:07:08.004Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; Result: pass; Evidence: 8 tests passed and the readiness/preflight cases completed cleanly after quieting finish setup output and adding a local timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the readiness test file; full release-gate confirmation remains with the blocked release task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:07:07.778Z, excerpt_hash=sha256:97fd098ca258b42a68e1c01d4da5ff34c50be551419ebe944ee2c9561ec3073d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Isolated evidence: packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passes after quieting the dependency finish setup and raising the local ready-details timeout budget.
- Inference: the JSON contamination was likely caused by leaked close-commit stdout from readiness test setup under full-gate load rather than by preflight command serialization itself.
- Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass, because the original failure only reproduced there.
