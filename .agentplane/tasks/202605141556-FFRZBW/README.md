---
id: "202605141556-FFRZBW"
title: "Add runner playbook contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T15:57:20.586Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T16:09:58.900Z"
  updated_by: "CODER"
  note: "Re-verified after task-specific Verify Steps were recorded: runner playbook contract layer is implemented and covered by focused checks."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved generic runner playbook contract layer in the task worktree, keeping the diff scoped to runtime contract code, focused tests, and task verification evidence."
events:
  -
    type: "status"
    at: "2026-05-14T15:57:47.446Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved generic runner playbook contract layer in the task worktree, keeping the diff scoped to runtime contract code, focused tests, and task verification evidence."
  -
    type: "verify"
    at: "2026-05-14T16:09:28.564Z"
    author: "CODER"
    state: "ok"
    note: "Verified: runner playbook contract layer implemented with generic blueprint/playbook/runtime capability/final verifier contracts, attached to runner bundle/bootstrap, and covered by focused tests."
  -
    type: "verify"
    at: "2026-05-14T16:09:58.900Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after task-specific Verify Steps were recorded: runner playbook contract layer is implemented and covered by focused checks."
doc_version: 3
doc_updated_at: "2026-05-14T16:09:58.914Z"
doc_updated_by: "CODER"
description: "Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks."
sections:
  Summary: |-
    Add runner playbook contracts
    
    Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.
  Scope: |-
    - In scope: Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.
    - Out of scope: unrelated refactors not required for "Add runner playbook contracts".
  Plan: "Implement a minimal generic runner contract layer: (1) inspect existing blueprint/evaluator/runtime surfaces and choose the local package boundary; (2) add typed ExecutionBlueprint, TaskPlaybook, RuntimeCapability, ExecutionState, and verification result contracts; (3) add a built-in knowledge-capture playbook as a generic example with deterministic success checks; (4) add focused unit tests and documentation comments only where needed; (5) run task verification, targeted tests, policy routing check, and agentplane doctor."
  Verify Steps: |-
    1. `bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts` - validates playbook selection, blueprint/playbook separation, final verifier blocking, and bootstrap rendering.
    2. `bun run --filter=agentplane typecheck` - validates the runner bundle and exported type contracts.
    3. `bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/types/playbooks.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/types/context.ts` - validates formatting in touched source files.
    4. `node .agentplane/policy/check-routing.mjs` - validates policy routing after task metadata changes.
    5. `ap doctor` - validates repository/runtime health for this task worktree.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T16:09:28.564Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: runner playbook contract layer implemented with generic blueprint/playbook/runtime capability/final verifier contracts, attached to runner bundle/bootstrap, and covered by focused tests.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:57:47.446Z, excerpt_hash=sha256:dc97acf9e455281943c19e1613a5796b2fb4958b34201acf6657f1e1467eead5
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: playbook selection, blueprint/playbook separation, final verifier blocking, bootstrap rendering.
    Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: runner bundle/types exports.
    Command: bun run format:check -- touched runner files | Result: pass | Evidence: All matched files use Prettier code style | Scope: touched TS files.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing after task metadata changes.
    Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 for old branch_pr reconciliation tasks | Scope: repo/runtime health.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141556-FFRZBW-runner-playbook-contracts/.agentplane/tasks/202605141556-FFRZBW/blueprint/resolved-snapshot.json
    - old_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
    - current_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141556-FFRZBW
    
    ### 2026-05-14T16:09:58.900Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after task-specific Verify Steps were recorded: runner playbook contract layer is implemented and covered by focused checks.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:09:28.572Z, excerpt_hash=sha256:dc97acf9e455281943c19e1613a5796b2fb4958b34201acf6657f1e1467eead5
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: playbook selection, blueprint/playbook separation, final verifier blocking, bootstrap rendering.
    Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: runner bundle/types exports.
    Command: bun run format:check -- touched runner files | Result: pass | Evidence: All matched files use Prettier code style | Scope: touched TS files.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing after task metadata changes.
    Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 for old branch_pr reconciliation tasks | Scope: repo/runtime health.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141556-FFRZBW-runner-playbook-contracts/.agentplane/tasks/202605141556-FFRZBW/blueprint/resolved-snapshot.json
    - old_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
    - current_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141556-FFRZBW
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add runner playbook contracts

Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.

## Scope

- In scope: Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.
- Out of scope: unrelated refactors not required for "Add runner playbook contracts".

## Plan

Implement a minimal generic runner contract layer: (1) inspect existing blueprint/evaluator/runtime surfaces and choose the local package boundary; (2) add typed ExecutionBlueprint, TaskPlaybook, RuntimeCapability, ExecutionState, and verification result contracts; (3) add a built-in knowledge-capture playbook as a generic example with deterministic success checks; (4) add focused unit tests and documentation comments only where needed; (5) run task verification, targeted tests, policy routing check, and agentplane doctor.

## Verify Steps

1. `bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts` - validates playbook selection, blueprint/playbook separation, final verifier blocking, and bootstrap rendering.
2. `bun run --filter=agentplane typecheck` - validates the runner bundle and exported type contracts.
3. `bun run format:check -- packages/agentplane/src/runner/playbooks.ts packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/types/playbooks.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/types/context.ts` - validates formatting in touched source files.
4. `node .agentplane/policy/check-routing.mjs` - validates policy routing after task metadata changes.
5. `ap doctor` - validates repository/runtime health for this task worktree.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T16:09:28.564Z — VERIFY — ok

By: CODER

Note: Verified: runner playbook contract layer implemented with generic blueprint/playbook/runtime capability/final verifier contracts, attached to runner bundle/bootstrap, and covered by focused tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:57:47.446Z, excerpt_hash=sha256:dc97acf9e455281943c19e1613a5796b2fb4958b34201acf6657f1e1467eead5

Details:

Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: playbook selection, blueprint/playbook separation, final verifier blocking, bootstrap rendering.
Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: runner bundle/types exports.
Command: bun run format:check -- touched runner files | Result: pass | Evidence: All matched files use Prettier code style | Scope: touched TS files.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing after task metadata changes.
Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 for old branch_pr reconciliation tasks | Scope: repo/runtime health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141556-FFRZBW-runner-playbook-contracts/.agentplane/tasks/202605141556-FFRZBW/blueprint/resolved-snapshot.json
- old_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
- current_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141556-FFRZBW

### 2026-05-14T16:09:58.900Z — VERIFY — ok

By: CODER

Note: Re-verified after task-specific Verify Steps were recorded: runner playbook contract layer is implemented and covered by focused checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:09:28.572Z, excerpt_hash=sha256:dc97acf9e455281943c19e1613a5796b2fb4958b34201acf6657f1e1467eead5

Details:

Command: bunx vitest run packages/agentplane/src/runner/playbooks.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts | Result: pass | Evidence: 2 files and 6 tests passed | Scope: playbook selection, blueprint/playbook separation, final verifier blocking, bootstrap rendering.
Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: agentplane typecheck exited 0 | Scope: runner bundle/types exports.
Command: bun run format:check -- touched runner files | Result: pass | Evidence: All matched files use Prettier code style | Scope: touched TS files.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing after task metadata changes.
Command: ap doctor | Result: pass with pre-existing warnings | Evidence: doctor OK, errors=0, warnings=2 for old branch_pr reconciliation tasks | Scope: repo/runtime health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141556-FFRZBW-runner-playbook-contracts/.agentplane/tasks/202605141556-FFRZBW/blueprint/resolved-snapshot.json
- old_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
- current_digest: 63b2132fc7671065de0df8ab156b973f5e532c9b33ca007b188c23c25b49e2e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141556-FFRZBW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
