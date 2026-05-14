---
id: "202605141619-44RW98"
title: "Fix runner playbook knip exports"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:19:48.316Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T16:21:33.752Z"
  updated_by: "CODER"
  note: "Verified: narrowed runner playbook exports fix the knip dead-code baseline failure while preserving playbook behavior."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair the runner playbook dead-code baseline failure by narrowing exports and verifying the post-merge CI failure locally."
events:
  -
    type: "status"
    at: "2026-05-14T16:20:02.109Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the runner playbook dead-code baseline failure by narrowing exports and verifying the post-merge CI failure locally."
  -
    type: "verify"
    at: "2026-05-14T16:21:33.752Z"
    author: "CODER"
    state: "ok"
    note: "Verified: narrowed runner playbook exports fix the knip dead-code baseline failure while preserving playbook behavior."
doc_version: 3
doc_updated_at: "2026-05-14T16:21:33.760Z"
doc_updated_by: "CODER"
description: "Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge."
sections:
  Summary: |-
    Fix runner playbook knip exports
    
    Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.
  Scope: |-
    - In scope: Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.
    - Out of scope: unrelated refactors not required for "Fix runner playbook knip exports".
  Plan: "Repair the post-merge dead-code baseline failure by keeping internal runner playbook constants and helper functions module-local and by removing premature public type re-exports; verify with knip:check, focused runner tests, typecheck, format, policy routing, and doctor."
  Verify Steps: |-
    1. `bun run knip:check` - validates the dead-code baseline regression is fixed.
    2. `bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts` - validates the runner playbook behavior remains intact.
    3. `bun run --filter=agentplane typecheck` - validates the narrowed exports still typecheck.
    4. `bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/types.ts` - validates formatting in touched source files.
    5. `node .agentplane/policy/check-routing.mjs` and `ap doctor` - validate policy routing and runtime health.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T16:21:33.752Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: narrowed runner playbook exports fix the knip dead-code baseline failure while preserving playbook behavior.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:20:02.109Z, excerpt_hash=sha256:acdccb5dbc8fb3a6d0dcc78236fbf052d09771188f01d98edf5f0357436fde17
    
    Details:
    
    Command: bun run knip:check | Result: pass | Evidence: Knip unused-code baseline OK | Scope: dead-code baseline regression.
    Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: runner playbook behavior.
    Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: narrowed exports and runner types.
    Command: bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/types.ts | Result: pass | Evidence: all matched files use Prettier style | Scope: touched source files.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing.
    Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 old branch_pr reconciliation warnings | Scope: repo/runtime health.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141619-44RW98-runner-playbook-knip-fix/.agentplane/tasks/202605141619-44RW98/blueprint/resolved-snapshot.json
    - old_digest: bb815fcd8e434be3f463e0eee3886df1196c986c32696c5e4c895675bac88573
    - current_digest: bb815fcd8e434be3f463e0eee3886df1196c986c32696c5e4c895675bac88573
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141619-44RW98
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix runner playbook knip exports

Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.

## Scope

- In scope: Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.
- Out of scope: unrelated refactors not required for "Fix runner playbook knip exports".

## Plan

Repair the post-merge dead-code baseline failure by keeping internal runner playbook constants and helper functions module-local and by removing premature public type re-exports; verify with knip:check, focused runner tests, typecheck, format, policy routing, and doctor.

## Verify Steps

1. `bun run knip:check` - validates the dead-code baseline regression is fixed.
2. `bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts` - validates the runner playbook behavior remains intact.
3. `bun run --filter=agentplane typecheck` - validates the narrowed exports still typecheck.
4. `bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/types.ts` - validates formatting in touched source files.
5. `node .agentplane/policy/check-routing.mjs` and `ap doctor` - validate policy routing and runtime health.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T16:21:33.752Z — VERIFY — ok

By: CODER

Note: Verified: narrowed runner playbook exports fix the knip dead-code baseline failure while preserving playbook behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:20:02.109Z, excerpt_hash=sha256:acdccb5dbc8fb3a6d0dcc78236fbf052d09771188f01d98edf5f0357436fde17

Details:

Command: bun run knip:check | Result: pass | Evidence: Knip unused-code baseline OK | Scope: dead-code baseline regression.
Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: runner playbook behavior.
Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: narrowed exports and runner types.
Command: bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/types.ts | Result: pass | Evidence: all matched files use Prettier style | Scope: touched source files.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing.
Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 old branch_pr reconciliation warnings | Scope: repo/runtime health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141619-44RW98-runner-playbook-knip-fix/.agentplane/tasks/202605141619-44RW98/blueprint/resolved-snapshot.json
- old_digest: bb815fcd8e434be3f463e0eee3886df1196c986c32696c5e4c895675bac88573
- current_digest: bb815fcd8e434be3f463e0eee3886df1196c986c32696c5e4c895675bac88573
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141619-44RW98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
