---
id: "202604270854-D9N9B2"
title: "Introduce runner run repository contracts"
result_summary: "Merged via PR #549."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604270853-ZDBDWP"
tags:
  - "code"
  - "runner"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:45.995Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-28T05:40:31.154Z"
  updated_by: "CODER"
  note: "Command: bun run test:project -- agentplane packages/agentplane/src/runner; Result: pass, 16 files and 77 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts; Result: pass, 5 files and 19 tests. Command: bun run typecheck; Result: pass after framework:dev:bootstrap refreshed local package exports. Scope: existing RunnerRunRepository and task runner projection contracts on current main."
commit:
  hash: "9695f8b241dd33114c2eda553e337acad7a574d0"
  message: "Merge pull request #549 from basilisk-labs/task/202604270854-D9N9B2/runner-run-repository-contracts"
comments:
  -
    author: "CODER"
    body: "Start: verify the existing runner run repository contracts and task runner projection wiring on current main before closing this already-satisfied atom."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #549 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-28T05:39:03.664Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify the existing runner run repository contracts and task runner projection wiring on current main before closing this already-satisfied atom."
  -
    type: "verify"
    at: "2026-04-28T05:40:31.154Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- agentplane packages/agentplane/src/runner; Result: pass, 16 files and 77 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts; Result: pass, 5 files and 19 tests. Command: bun run typecheck; Result: pass after framework:dev:bootstrap refreshed local package exports. Scope: existing RunnerRunRepository and task runner projection contracts on current main."
  -
    type: "status"
    at: "2026-04-28T06:43:15.839Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #549 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-28T06:43:15.845Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation."
sections:
  Summary: |-
    Introduce runner run repository contracts
    
    Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
  Scope: |-
    - In scope: Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
    - Out of scope: unrelated refactors not required for "Introduce runner run repository contracts".
  Plan: "1. Identify runner invocation/result persistence seams and adapter-specific success interpretation. 2. Introduce narrow RunnerRunRepository and TaskRunnerProjection contracts without replacing all runner storage. 3. Wire one low-risk read/write path to the contracts. 4. Add coverage for canonical invocation/result projection. 5. Verify runner tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-28T05:40:31.154Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run test:project -- agentplane packages/agentplane/src/runner; Result: pass, 16 files and 77 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts; Result: pass, 5 files and 19 tests. Command: bun run typecheck; Result: pass after framework:dev:bootstrap refreshed local package exports. Scope: existing RunnerRunRepository and task runner projection contracts on current main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:39:03.664Z, excerpt_hash=sha256:ae96fe7a8a7addcdd9581b317a2439ae2946402efac5dbbc17df9c8d537b5561
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce runner run repository contracts

Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.

## Scope

- In scope: Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
- Out of scope: unrelated refactors not required for "Introduce runner run repository contracts".

## Plan

1. Identify runner invocation/result persistence seams and adapter-specific success interpretation. 2. Introduce narrow RunnerRunRepository and TaskRunnerProjection contracts without replacing all runner storage. 3. Wire one low-risk read/write path to the contracts. 4. Add coverage for canonical invocation/result projection. 5. Verify runner tests and typecheck.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-28T05:40:31.154Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- agentplane packages/agentplane/src/runner; Result: pass, 16 files and 77 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts; Result: pass, 5 files and 19 tests. Command: bun run typecheck; Result: pass after framework:dev:bootstrap refreshed local package exports. Scope: existing RunnerRunRepository and task runner projection contracts on current main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:39:03.664Z, excerpt_hash=sha256:ae96fe7a8a7addcdd9581b317a2439ae2946402efac5dbbc17df9c8d537b5561

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
