---
id: "202603301857-QAV7HB"
title: "Merge global-flag prescan and parse into one result model"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301856-H78XDH"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:39:05.881Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:41:10.359Z"
  updated_by: "CODER"
  note: "Unified global parse result preserved json-error behavior without argv prescan."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace the separate global prescan with a single parse result that carries early JSON error mode through parse failures without re-walking argv."
events:
  -
    type: "status"
    at: "2026-03-31T12:39:42.620Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the separate global prescan with a single parse result that carries early JSON error mode through parse failures without re-walking argv."
  -
    type: "verify"
    at: "2026-03-31T12:41:10.359Z"
    author: "CODER"
    state: "ok"
    note: "Unified global parse result preserved json-error behavior without argv prescan."
doc_version: 3
doc_updated_at: "2026-03-31T12:41:10.361Z"
doc_updated_by: "CODER"
description: "Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior."
sections:
  Summary: |-
    Merge global-flag prescan and parse into one result model
    
    Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
  Scope: |-
    - In scope: Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
    - Out of scope: unrelated refactors not required for "Merge global-flag prescan and parse into one result model".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` to isolate the exact behavior gap for R6.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts`. Expected: the behavior described by R6.1 is observable and stable.
    2. Inspect the final diff for 202603301857-QAV7HB. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:41:10.359Z — VERIFY — ok
    
    By: CODER
    
    Note: Unified global parse result preserved json-error behavior without argv prescan.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:39:42.621Z, excerpt_hash=sha256:d04ffb0f5af636a96a3d13cad05ec234ba61b7f5abb7347e313bbcf0ae0d57ac
    
    Details:
    
    Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/globals.ts
    Result: pass
    Evidence: exited 0 with no diagnostics.
    Scope: unified global parse flow and runCli integration.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts
    Result: pass
    Evidence: 1 file passed, 41 tests passed.
    Scope: runCli integration behavior including json-errors on parse failures.
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited 0.
    Scope: full package build after globals parsing refactor.
    
    Command: git diff --stat
    Result: pass
    Evidence: scope stayed limited to globals.ts, run-cli.ts, and task documentation.
    Scope: final diff review for QAV7HB.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Merge global-flag prescan and parse into one result model

Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.

## Scope

- In scope: Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
- Out of scope: unrelated refactors not required for "Merge global-flag prescan and parse into one result model".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` to isolate the exact behavior gap for R6.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts`. Expected: the behavior described by R6.1 is observable and stable.
2. Inspect the final diff for 202603301857-QAV7HB. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:41:10.359Z — VERIFY — ok

By: CODER

Note: Unified global parse result preserved json-error behavior without argv prescan.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:39:42.621Z, excerpt_hash=sha256:d04ffb0f5af636a96a3d13cad05ec234ba61b7f5abb7347e313bbcf0ae0d57ac

Details:

Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/globals.ts
Result: pass
Evidence: exited 0 with no diagnostics.
Scope: unified global parse flow and runCli integration.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts
Result: pass
Evidence: 1 file passed, 41 tests passed.
Scope: runCli integration behavior including json-errors on parse failures.

Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane build exited 0.
Scope: full package build after globals parsing refactor.

Command: git diff --stat
Result: pass
Evidence: scope stayed limited to globals.ts, run-cli.ts, and task documentation.
Scope: final diff review for QAV7HB.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
