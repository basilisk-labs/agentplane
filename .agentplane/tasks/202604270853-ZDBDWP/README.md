---
id: "202604270853-ZDBDWP"
title: "Unify lifecycle mutations through transition service"
result_summary: "Merged via PR #547."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604270852-PR9VMK"
tags:
  - "code"
  - "workflow"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:35.892Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-28T05:34:03.518Z"
  updated_by: "CODER"
  note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass, 3 files and 15 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts; Result: pass, 12 files and 63 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: shared lifecycle close transition command path."
commit:
  hash: "6a28d20a88c50c278e39940b139e29d9810d5e46"
  message: "Merge pull request #547 from basilisk-labs/task/202604270853-ZDBDWP/lifecycle-transition-service"
comments:
  -
    author: "CODER"
    body: "Start: Unifying lifecycle mutation execution through shared transition command surfaces for task close, finish, verify, and hosted closure paths."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #547 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-28T05:27:20.267Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Unifying lifecycle mutation execution through shared transition command surfaces for task close, finish, verify, and hosted closure paths."
  -
    type: "verify"
    at: "2026-04-28T05:34:03.518Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass, 3 files and 15 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts; Result: pass, 12 files and 63 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: shared lifecycle close transition command path."
  -
    type: "status"
    at: "2026-04-28T05:37:27.976Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #547 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-28T05:37:27.981Z"
doc_updated_by: "INTEGRATOR"
description: "Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules."
sections:
  Summary: |-
    Unify lifecycle mutations through transition service
    
    Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
  Scope: |-
    - In scope: Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
    - Out of scope: unrelated refactors not required for "Unify lifecycle mutations through transition service".
  Plan: "1. Identify remaining lifecycle commands that mutate task status, verification, commit, comments, and docs outside the transition service. 2. Move one coherent subset behind workflow-transition-service without changing public command semantics. 3. Preserve backend and README side-effect behavior through existing intent abstractions. 4. Add regression coverage for finish, verify rework, and close/hosted-close behavior touched by the change. 5. Verify focused lifecycle tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-28T05:34:03.518Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass, 3 files and 15 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts; Result: pass, 12 files and 63 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: shared lifecycle close transition command path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:27:20.283Z, excerpt_hash=sha256:b131f0b729f58d1ba2dc944b7e3b3305de6eb247fb5e443ec4c2f96dd6b19bdf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify lifecycle mutations through transition service

Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.

## Scope

- In scope: Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
- Out of scope: unrelated refactors not required for "Unify lifecycle mutations through transition service".

## Plan

1. Identify remaining lifecycle commands that mutate task status, verification, commit, comments, and docs outside the transition service. 2. Move one coherent subset behind workflow-transition-service without changing public command semantics. 3. Preserve backend and README side-effect behavior through existing intent abstractions. 4. Add regression coverage for finish, verify rework, and close/hosted-close behavior touched by the change. 5. Verify focused lifecycle tests and typecheck.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-28T05:34:03.518Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass, 3 files and 15 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts; Result: pass, 12 files and 63 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: shared lifecycle close transition command path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:27:20.283Z, excerpt_hash=sha256:b131f0b729f58d1ba2dc944b7e3b3305de6eb247fb5e443ec4c2f96dd6b19bdf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
