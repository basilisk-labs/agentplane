---
id: "202604091052-8TZCF0"
title: "Fix task lifecycle README seeding and base artifact preservation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:53:44.571Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T11:04:02.656Z"
  updated_by: "REVIEWER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Result: pass. Evidence: the focused work-start regression suite passed 10/10 and eslint exited 0 after preserving base task READMEs during worktree seeding. Scope: branch_pr work start lifecycle, base task artifact preservation, strict task-readability after worktree creation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix branch_pr work start so task README seeding preserves canonical base artifacts and strict task scans remain readable after worktree creation."
events:
  -
    type: "status"
    at: "2026-04-09T11:00:58.721Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix branch_pr work start so task README seeding preserves canonical base artifacts and strict task scans remain readable after worktree creation."
  -
    type: "verify"
    at: "2026-04-09T11:04:02.656Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Result: pass. Evidence: the focused work-start regression suite passed 10/10 and eslint exited 0 after preserving base task READMEs during worktree seeding. Scope: branch_pr work start lifecycle, base task artifact preservation, strict task-readability after worktree creation."
doc_version: 3
doc_updated_at: "2026-04-09T11:04:02.665Z"
doc_updated_by: "CODER"
description: "Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows."
sections:
  Summary: |-
    Fix task lifecycle README seeding and base artifact preservation
    
    Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.
  Scope: |-
    - In scope: Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.
    - Out of scope: unrelated refactors not required for "Fix task lifecycle README seeding and base artifact preservation".
  Plan: "1. Reproduce the branch_pr path where task creation or work start leaves an empty base .agentplane/tasks/<id> directory or removes the canonical README. 2. Fix the lifecycle command path so README seeding and base-artifact preservation are atomic and cannot leave empty task directories behind. 3. Lock the behavior with focused lifecycle regression tests and verify strict task scans stay healthy after task creation/work-start."
  Verify Steps: |-
    1. Reproduce task creation plus `work start --worktree` on a fresh task in the focused regression harness. Expected: the base checkout keeps a readable `.agentplane/tasks/<id>/README.md` and no empty task directory is left behind.
    2. Run the focused lifecycle test slice that covers task creation/work-start artifact handling. Expected: the new atomic README-seeding path passes and strict task scans remain clean.
    3. Run lint on touched lifecycle files. Expected: no lint regressions in the modified task/worktree command path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T11:04:02.656Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Result: pass. Evidence: the focused work-start regression suite passed 10/10 and eslint exited 0 after preserving base task READMEs during worktree seeding. Scope: branch_pr work start lifecycle, base task artifact preservation, strict task-readability after worktree creation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.739Z, excerpt_hash=sha256:d37a3d993842ec65d7226c66a3f280994623696fa0bd9233477e086d0dfd7af3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix task lifecycle README seeding and base artifact preservation

Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.

## Scope

- In scope: Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.
- Out of scope: unrelated refactors not required for "Fix task lifecycle README seeding and base artifact preservation".

## Plan

1. Reproduce the branch_pr path where task creation or work start leaves an empty base .agentplane/tasks/<id> directory or removes the canonical README. 2. Fix the lifecycle command path so README seeding and base-artifact preservation are atomic and cannot leave empty task directories behind. 3. Lock the behavior with focused lifecycle regression tests and verify strict task scans stay healthy after task creation/work-start.

## Verify Steps

1. Reproduce task creation plus `work start --worktree` on a fresh task in the focused regression harness. Expected: the base checkout keeps a readable `.agentplane/tasks/<id>/README.md` and no empty task directory is left behind.
2. Run the focused lifecycle test slice that covers task creation/work-start artifact handling. Expected: the new atomic README-seeding path passes and strict task scans remain clean.
3. Run lint on touched lifecycle files. Expected: no lint regressions in the modified task/worktree command path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T11:04:02.656Z — VERIFY — ok

By: REVIEWER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Result: pass. Evidence: the focused work-start regression suite passed 10/10 and eslint exited 0 after preserving base task READMEs during worktree seeding. Scope: branch_pr work start lifecycle, base task artifact preservation, strict task-readability after worktree creation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.739Z, excerpt_hash=sha256:d37a3d993842ec65d7226c66a3f280994623696fa0bd9233477e086d0dfd7af3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
