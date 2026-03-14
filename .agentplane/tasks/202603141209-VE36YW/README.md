---
id: "202603141209-VE36YW"
title: "Add explicit post-upgrade recovery handoff for legacy task docs"
result_summary: "Upgrade now emits an explicit post-check handoff to agentplane task migrate-doc --all when legacy task README migration remains."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
  - "upgrade"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/doctor.command.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T12:11:02.444Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T12:16:03.745Z"
  updated_by: "CODER"
  note: "Verified: upgrade now surfaces the remaining task README migration step after apply."
commit:
  hash: "4c47fb49e4557b412768211f662d24f942aa36a4"
  message: "✨ VE36YW code: surface post-upgrade task README recovery handoff"
comments:
  -
    author: "CODER"
    body: "Start: add an explicit post-upgrade recovery handoff for legacy task docs, keep the scope to upgrade and diagnostic messaging, and cover it with upgrade plus doctor regressions."
  -
    author: "CODER"
    body: "Verified: targeted vitest, TypeScript build, and package builds passed; upgrade now prints the remaining task README migration step when legacy v2 tasks are still present."
events:
  -
    type: "status"
    at: "2026-03-14T12:11:08.230Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit post-upgrade recovery handoff for legacy task docs, keep the scope to upgrade and diagnostic messaging, and cover it with upgrade plus doctor regressions."
  -
    type: "verify"
    at: "2026-03-14T12:16:03.745Z"
    author: "CODER"
    state: "ok"
    note: "Verified: upgrade now surfaces the remaining task README migration step after apply."
  -
    type: "status"
    at: "2026-03-14T12:16:46.205Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted vitest, TypeScript build, and package builds passed; upgrade now prints the remaining task README migration step when legacy v2 tasks are still present."
doc_version: 3
doc_updated_at: "2026-03-14T12:16:46.207Z"
doc_updated_by: "CODER"
description: "Teach upgrade and related diagnostics to report when framework files are repaired but legacy task docs still require task migrate-doc, so older repos get one clear next step instead of an implicit mixed-state recovery."
sections:
  Summary: |-
    Add explicit post-upgrade recovery handoff for legacy task docs
    
    Teach upgrade and related diagnostics to report when framework files are repaired but legacy task docs still require task migrate-doc, so older repos get one clear next step instead of an implicit mixed-state recovery.
  Scope: |-
    - In scope: Teach upgrade and related diagnostics to report when framework files are repaired but legacy task docs still require task migrate-doc, so older repos get one clear next step instead of an implicit mixed-state recovery.
    - Out of scope: unrelated refactors not required for "Add explicit post-upgrade recovery handoff for legacy task docs".
  Plan: "1. Detect when upgrade repaired framework-managed files but the workspace still has active legacy task README state. 2. Surface one explicit next step from upgrade or adjacent diagnostics instead of leaving the operator to infer task migrate-doc from mixed signals. 3. Cover the new recovery handoff with targeted upgrade and doctor regression tests."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/doctor.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T12:16:03.745Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: upgrade now surfaces the remaining task README migration step after apply.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:11:08.231Z, excerpt_hash=sha256:e5a60db97a911a32a3ea929bdc5a5f23f4efc328258ae4835435d31f2cccb6aa
    
    Details:
    
    Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/doctor.command.test.ts
    Result: pass
    Evidence: 38 tests passed; upgrade regression now prints a post-check handoff for legacy README tasks and stays quiet on a clean upgrade path.
    Scope: upgrade recovery messaging and doctor workspace migration diagnostics.
    
    Command: bun x tsc -b packages/core packages/agentplane
    Result: pass
    Evidence: TypeScript project build completed without errors.
    Scope: compile safety for the upgrade/doctor integration points.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: refreshed the repo-local CLI runtime before recording lifecycle state.
    
    Command: git diff -- packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    Result: pass
    Evidence: diff is limited to the approved post-upgrade handoff path and its regression coverage.
    Scope: final result compared against the approved task scope.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add explicit post-upgrade recovery handoff for legacy task docs

Teach upgrade and related diagnostics to report when framework files are repaired but legacy task docs still require task migrate-doc, so older repos get one clear next step instead of an implicit mixed-state recovery.

## Scope

- In scope: Teach upgrade and related diagnostics to report when framework files are repaired but legacy task docs still require task migrate-doc, so older repos get one clear next step instead of an implicit mixed-state recovery.
- Out of scope: unrelated refactors not required for "Add explicit post-upgrade recovery handoff for legacy task docs".

## Plan

1. Detect when upgrade repaired framework-managed files but the workspace still has active legacy task README state. 2. Surface one explicit next step from upgrade or adjacent diagnostics instead of leaving the operator to infer task migrate-doc from mixed signals. 3. Cover the new recovery handoff with targeted upgrade and doctor regression tests.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/doctor.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T12:16:03.745Z — VERIFY — ok

By: CODER

Note: Verified: upgrade now surfaces the remaining task README migration step after apply.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:11:08.231Z, excerpt_hash=sha256:e5a60db97a911a32a3ea929bdc5a5f23f4efc328258ae4835435d31f2cccb6aa

Details:

Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/doctor.command.test.ts
Result: pass
Evidence: 38 tests passed; upgrade regression now prints a post-check handoff for legacy README tasks and stays quiet on a clean upgrade path.
Scope: upgrade recovery messaging and doctor workspace migration diagnostics.

Command: bun x tsc -b packages/core packages/agentplane
Result: pass
Evidence: TypeScript project build completed without errors.
Scope: compile safety for the upgrade/doctor integration points.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0.
Scope: refreshed the repo-local CLI runtime before recording lifecycle state.

Command: git diff -- packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
Result: pass
Evidence: diff is limited to the approved post-upgrade handoff path and its regression coverage.
Scope: final result compared against the approved task scope.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
