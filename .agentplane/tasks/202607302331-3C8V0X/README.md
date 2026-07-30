---
id: "202607302331-3C8V0X"
title: "Repair beta.2 guard and clone baseline drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "refactor"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check && bun run clone:check"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T23:32:09.215Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the guard and clone-baseline gate failures in a dedicated bounded repair task, preserving beta.2 qualification as a separate evidence-only gate."
events:
  -
    type: "status"
    at: "2026-07-30T23:32:41.563Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the guard and clone-baseline gate failures in a dedicated bounded repair task, preserving beta.2 qualification as a separate evidence-only gate."
doc_version: 3
doc_updated_at: "2026-07-30T23:32:41.563Z"
doc_updated_by: "CODER"
description: "Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on."
sections:
  Summary: |-
    Repair beta.2 guard and clone baseline drift

    Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.
  Scope: |-
    - In scope: Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.
    - Out of scope: unrelated refactors not required for "Repair beta.2 guard and clone baseline drift".
  Plan: "1. Reproduce the beta.2 gate failures against main and classify the shared-guard violation plus clone-baseline drift without changing qualification evidence. 2. Replace only the local isRecord guard with the canonical shared guard, regenerate the measured clone baseline, and format the generated JSON. 3. Run the focused semantic-escalation test, shared-guard and clone checks, typecheck, and full ci:contract. 4. Record structured verification and an independent evaluator review; do not publish a release. 5. Open, verify, and integrate one bounded repair PR, then make beta.2 qualification depend on the merged repair."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run guards:check && bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "9b299bedb15d2efdbf92b83567660e65aa3451a9"
    version: 1
id_source: "generated"
---
## Summary

Repair beta.2 guard and clone baseline drift

Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.

## Scope

- In scope: Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.
- Out of scope: unrelated refactors not required for "Repair beta.2 guard and clone baseline drift".

## Plan

1. Reproduce the beta.2 gate failures against main and classify the shared-guard violation plus clone-baseline drift without changing qualification evidence. 2. Replace only the local isRecord guard with the canonical shared guard, regenerate the measured clone baseline, and format the generated JSON. 3. Run the focused semantic-escalation test, shared-guard and clone checks, typecheck, and full ci:contract. 4. Record structured verification and an independent evaluator review; do not publish a release. 5. Open, verify, and integrate one bounded repair PR, then make beta.2 qualification depend on the merged repair.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run guards:check && bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
