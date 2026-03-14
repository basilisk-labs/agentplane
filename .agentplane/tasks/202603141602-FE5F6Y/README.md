---
id: "202603141602-FE5F6Y"
title: "Stabilize cleanup-merged listing regression for v0.3.7"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T16:02:57.679Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:22:19.777Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 15 tests passed after raising only the candidate-listing-without-yes timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the cleanup-merged test file; final confirmation remains with the next full release gate."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the cleanup-merged listing regression, confirm whether the failure is budget-only or a real listing contract drift, and keep the fix inside the cleanup-merged test or listing path only if the evidence stays local."
events:
  -
    type: "status"
    at: "2026-03-14T16:17:49.789Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the cleanup-merged listing regression, confirm whether the failure is budget-only or a real listing contract drift, and keep the fix inside the cleanup-merged test or listing path only if the evidence stays local."
  -
    type: "verify"
    at: "2026-03-14T16:22:19.777Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 15 tests passed after raising only the candidate-listing-without-yes timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the cleanup-merged test file; final confirmation remains with the next full release gate."
doc_version: 3
doc_updated_at: "2026-03-14T16:22:19.782Z"
doc_updated_by: "CODER"
description: "Fix the remaining cleanup-merged failure in run-cli.core.pr-flow.cleanup-merged coverage so candidate listing without --yes remains deterministic under the full release gate and keeps the existing branch-pr behavior contract."
sections:
  Summary: |-
    Stabilize cleanup-merged listing regression for v0.3.7
    
    Fix the remaining cleanup-merged failure in run-cli.core.pr-flow.cleanup-merged coverage so candidate listing without --yes remains deterministic under the full release gate and keeps the existing branch-pr behavior contract.
  Scope: |-
    - In scope: Fix the remaining cleanup-merged failure in run-cli.core.pr-flow.cleanup-merged coverage so candidate listing without --yes remains deterministic under the full release gate and keeps the existing branch-pr behavior contract.
    - Out of scope: unrelated refactors not required for "Stabilize cleanup-merged listing regression for v0.3.7".
  Plan: "1. Reproduce the cleanup-merged listing failure in packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts and confirm whether it is timing-only or behavior drift. 2. Keep the fix inside the listing path so cleanup merged without --yes stays deterministic and preserves the current candidate-reporting contract. 3. Re-run the file suite and TypeScript build, then capture any residual risk in Findings."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:22:19.777Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 15 tests passed after raising only the candidate-listing-without-yes timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the cleanup-merged test file; final confirmation remains with the next full release gate.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:22:06.011Z, excerpt_hash=sha256:6a53afd089fa997d757e7e499f36d25ad1c73572472faf6be640f5e541840a8e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Isolated evidence: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts passes after raising only the listing-without-yes budget to 120_000.
    - Inference: the remaining cleanup-merged regression is a full-gate timeout spill in the candidate-listing path, not a deterministic branch_pr listing contract bug.
    - Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass.
    - Close-commit note: finish will use --no-close-commit while docs/user/cli-reference.generated.mdx remains intentionally dirty for the blocked release task.
id_source: "generated"
---
## Summary

Stabilize cleanup-merged listing regression for v0.3.7

Fix the remaining cleanup-merged failure in run-cli.core.pr-flow.cleanup-merged coverage so candidate listing without --yes remains deterministic under the full release gate and keeps the existing branch-pr behavior contract.

## Scope

- In scope: Fix the remaining cleanup-merged failure in run-cli.core.pr-flow.cleanup-merged coverage so candidate listing without --yes remains deterministic under the full release gate and keeps the existing branch-pr behavior contract.
- Out of scope: unrelated refactors not required for "Stabilize cleanup-merged listing regression for v0.3.7".

## Plan

1. Reproduce the cleanup-merged listing failure in packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts and confirm whether it is timing-only or behavior drift. 2. Keep the fix inside the listing path so cleanup merged without --yes stays deterministic and preserves the current candidate-reporting contract. 3. Re-run the file suite and TypeScript build, then capture any residual risk in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:22:19.777Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 15 tests passed after raising only the candidate-listing-without-yes timeout budget. Scope: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Command: bun x tsc -b packages/core packages/agentplane; Result: pass; Evidence: TypeScript build completed successfully. Scope: packages/core packages/agentplane. Command: bun run --filter=@agentplaneorg/core build; Result: pass; Evidence: core build exited with code 0. Scope: packages/core. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: packages/agentplane. Review: diff is limited to the cleanup-merged test file; final confirmation remains with the next full release gate.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:22:06.011Z, excerpt_hash=sha256:6a53afd089fa997d757e7e499f36d25ad1c73572472faf6be640f5e541840a8e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Isolated evidence: packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts passes after raising only the listing-without-yes budget to 120_000.
- Inference: the remaining cleanup-merged regression is a full-gate timeout spill in the candidate-listing path, not a deterministic branch_pr listing contract bug.
- Remaining confirmation: the fix still needs validation inside the next full bun run release:prepublish pass.
- Close-commit note: finish will use --no-close-commit while docs/user/cli-reference.generated.mdx remains intentionally dirty for the blocked release task.
