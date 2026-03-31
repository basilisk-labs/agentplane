---
id: "202603301857-6DJCDV"
title: "Move update-check policy gating behind the real config boundary"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301857-XC7RHS"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:33:41.470Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:36:02.819Z"
  updated_by: "CODER"
  note: "Update-check gating now stays behind the actual config boundary."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: keep update-check policy behind the actual loaded-config boundary so unknown or config-free commands do not load config or .env just for optional warning logic."
events:
  -
    type: "status"
    at: "2026-03-31T12:34:29.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep update-check policy behind the actual loaded-config boundary so unknown or config-free commands do not load config or .env just for optional warning logic."
  -
    type: "verify"
    at: "2026-03-31T12:36:02.819Z"
    author: "CODER"
    state: "ok"
    note: "Update-check gating now stays behind the actual config boundary."
doc_version: 3
doc_updated_at: "2026-03-31T12:36:02.821Z"
doc_updated_by: "CODER"
description: "Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path."
sections:
  Summary: |-
    Move update-check policy gating behind the real config boundary
    
    Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
  Scope: |-
    - In scope: Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
    - Out of scope: unrelated refactors not required for "Move update-check policy gating behind the real config boundary".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts` to isolate the exact behavior gap for R4.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`. Expected: the behavior described by R4.2 is observable and stable.
    2. Inspect the final diff for 202603301857-6DJCDV. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:36:02.819Z — VERIFY — ok
    
    By: CODER
    
    Note: Update-check gating now stays behind the actual config boundary.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:34:29.551Z, excerpt_hash=sha256:14fab2495e136f211fcfcbb78cbbcd0d1d8f3c8aa340dd8ad5d98a0b81db9898
    
    Details:
    
    Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli.core.test.ts
    Result: pass
    Evidence: exited 0 with no diagnostics.
    Scope: update-check gate and regression test.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts
    Result: pass
    Evidence: 1 file passed, 41 tests passed.
    Scope: runCli integration behavior, including unknown-command and update-check flows.
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited 0.
    Scope: full package build after run-cli update-check boundary change.
    
    Command: git diff --stat
    Result: pass
    Evidence: scope stayed limited to run-cli.ts, one integration test file, and task documentation.
    Scope: final diff review for 6DJCDV.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move update-check policy gating behind the real config boundary

Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.

## Scope

- In scope: Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
- Out of scope: unrelated refactors not required for "Move update-check policy gating behind the real config boundary".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts` to isolate the exact behavior gap for R4.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`. Expected: the behavior described by R4.2 is observable and stable.
2. Inspect the final diff for 202603301857-6DJCDV. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:36:02.819Z — VERIFY — ok

By: CODER

Note: Update-check gating now stays behind the actual config boundary.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:34:29.551Z, excerpt_hash=sha256:14fab2495e136f211fcfcbb78cbbcd0d1d8f3c8aa340dd8ad5d98a0b81db9898

Details:

Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli.core.test.ts
Result: pass
Evidence: exited 0 with no diagnostics.
Scope: update-check gate and regression test.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts
Result: pass
Evidence: 1 file passed, 41 tests passed.
Scope: runCli integration behavior, including unknown-command and update-check flows.

Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane build exited 0.
Scope: full package build after run-cli update-check boundary change.

Command: git diff --stat
Result: pass
Evidence: scope stayed limited to run-cli.ts, one integration test file, and task documentation.
Scope: final diff review for 6DJCDV.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
