---
id: "202606081918-CBGEQ3"
title: "Persist dry-run LoopRun evidence"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606081917-982PET"
tags:
  - "code"
  - "evidence"
  - "loops"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop-run.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:27.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-12T10:18:07.038Z"
doc_updated_by: "PLANNER"
description: "Add loop run --dry-run and loop step --dry-run support that creates LoopRun events/state artifacts under .agentplane/tasks/<task-id>/runs/<run-id> without invoking external agent adapters."
sections:
  Summary: |-
    Persist dry-run LoopRun evidence

    Add loop run --dry-run and loop step --dry-run support that creates LoopRun events/state artifacts under .agentplane/tasks/<task-id>/runs/<run-id> without invoking external agent adapters.
  Scope: |-
    - In scope: Add loop run --dry-run and loop step --dry-run support that creates LoopRun events/state artifacts under .agentplane/tasks/<task-id>/runs/<run-id> without invoking external agent adapters.
    - Out of scope: unrelated refactors not required for "Persist dry-run LoopRun evidence".
  Plan: |-
    1. Implement loop run --dry-run and loop step --dry-run only; fail closed for non-dry-run execution in this version.
    2. Create LoopRun artifacts under .agentplane/tasks/<task-id>/runs/<run-id>/loop-run.json, events.jsonl, state.json, and iterations/001/decision.json.
    3. Add a dry-run-safe per-step evidence skeleton under iterations/001/steps/<step-id>/ with input.json and output.json placeholders or refs where the step is not executed.
    4. Record loop.started, iteration.started, step.prepared, decision.made, and loop.stopped events with stable machine-readable fields.
    5. Include selected loop id/version/sha, task id, dry_run=true, stop reason, promptModule refs when present, and evidence refs.
    6. Keep all generated artifacts task-local and avoid external agent adapter invocation.
    7. Test artifact layout, JSON validity, and no-hidden-mutation behavior.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop-run.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Persist dry-run LoopRun evidence

Add loop run --dry-run and loop step --dry-run support that creates LoopRun events/state artifacts under .agentplane/tasks/<task-id>/runs/<run-id> without invoking external agent adapters.

## Scope

- In scope: Add loop run --dry-run and loop step --dry-run support that creates LoopRun events/state artifacts under .agentplane/tasks/<task-id>/runs/<run-id> without invoking external agent adapters.
- Out of scope: unrelated refactors not required for "Persist dry-run LoopRun evidence".

## Plan

1. Implement loop run --dry-run and loop step --dry-run only; fail closed for non-dry-run execution in this version.
2. Create LoopRun artifacts under .agentplane/tasks/<task-id>/runs/<run-id>/loop-run.json, events.jsonl, state.json, and iterations/001/decision.json.
3. Add a dry-run-safe per-step evidence skeleton under iterations/001/steps/<step-id>/ with input.json and output.json placeholders or refs where the step is not executed.
4. Record loop.started, iteration.started, step.prepared, decision.made, and loop.stopped events with stable machine-readable fields.
5. Include selected loop id/version/sha, task id, dry_run=true, stop reason, promptModule refs when present, and evidence refs.
6. Keep all generated artifacts task-local and avoid external agent adapter invocation.
7. Test artifact layout, JSON validity, and no-hidden-mutation behavior.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop-run.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
