---
id: "202605120952-JT6FWR"
title: "Implement init mode and tool RFQ controls"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T09:52:23.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-12T10:02:54.382Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx eslint packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts docs/user/cli-reference.generated.mdx; bun run docs:cli:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: init tests 32 passed; CLI reference fresh; typecheck/routing/doctor OK. Scope: --init-mode/--quick/--advanced, --tool mapping, InitPlan mode/profile fields, generated CLI docs."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the RFQ init mode/tool controls as the primary batch worktree owner, including plan schema compatibility and focused init tests."
events:
  -
    type: "status"
    at: "2026-05-12T09:52:47.338Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the RFQ init mode/tool controls as the primary batch worktree owner, including plan schema compatibility and focused init tests."
  -
    type: "verify"
    at: "2026-05-12T10:02:54.382Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx eslint packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts docs/user/cli-reference.generated.mdx; bun run docs:cli:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: init tests 32 passed; CLI reference fresh; typecheck/routing/doctor OK. Scope: --init-mode/--quick/--advanced, --tool mapping, InitPlan mode/profile fields, generated CLI docs."
doc_version: 3
doc_updated_at: "2026-05-12T10:02:54.388Z"
doc_updated_by: "CODER"
description: "Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags."
sections:
  Summary: |-
    Implement init mode and tool RFQ controls
    
    Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
  Scope: |-
    - In scope: Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
    - Out of scope: unrelated refactors not required for "Implement init mode and tool RFQ controls".
  Plan: "Batch primary for RFQ init v2 remaining controls. Implement --init-mode/--quick/--advanced, --tool mapping, user-facing mode/profile fields in InitPlan, and compatibility tests. Batch includes dependent tasks 202605120952-D2F8VR and 202605120952-MG1QB4 in the same worktree because all edits share init parsing/orchestration surfaces. Verify with focused init tests, lint for touched init files, policy routing, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-12T10:02:54.382Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx eslint packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts docs/user/cli-reference.generated.mdx; bun run docs:cli:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: init tests 32 passed; CLI reference fresh; typecheck/routing/doctor OK. Scope: --init-mode/--quick/--advanced, --tool mapping, InitPlan mode/profile fields, generated CLI docs.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T09:52:47.338Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605120952-JT6FWR-init-rfq-controls/.agentplane/tasks/202605120952-JT6FWR/blueprint/resolved-snapshot.json
    - old_digest: 794134d89a4018e4371412fa46e63797450ce359101beb6169d0bcb887adcc74
    - current_digest: 794134d89a4018e4371412fa46e63797450ce359101beb6169d0bcb887adcc74
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605120952-JT6FWR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Implement init mode and tool RFQ controls

Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.

## Scope

- In scope: Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
- Out of scope: unrelated refactors not required for "Implement init mode and tool RFQ controls".

## Plan

Batch primary for RFQ init v2 remaining controls. Implement --init-mode/--quick/--advanced, --tool mapping, user-facing mode/profile fields in InitPlan, and compatibility tests. Batch includes dependent tasks 202605120952-D2F8VR and 202605120952-MG1QB4 in the same worktree because all edits share init parsing/orchestration surfaces. Verify with focused init tests, lint for touched init files, policy routing, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-12T10:02:54.382Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx eslint packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts docs/user/cli-reference.generated.mdx; bun run docs:cli:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: init tests 32 passed; CLI reference fresh; typecheck/routing/doctor OK. Scope: --init-mode/--quick/--advanced, --tool mapping, InitPlan mode/profile fields, generated CLI docs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T09:52:47.338Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605120952-JT6FWR-init-rfq-controls/.agentplane/tasks/202605120952-JT6FWR/blueprint/resolved-snapshot.json
- old_digest: 794134d89a4018e4371412fa46e63797450ce359101beb6169d0bcb887adcc74
- current_digest: 794134d89a4018e4371412fa46e63797450ce359101beb6169d0bcb887adcc74
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605120952-JT6FWR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
