---
id: "202606081917-BASAPD"
title: "Add loop specification schema and built-in loop catalog"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on:
  - "202606081917-Z9QTR4"
tags:
  - "code"
  - "loops"
  - "schema"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops"
  - "bun run schemas:check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-06-08T19:18:52.583Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files."
sections:
  Summary: |-
    Add loop specification schema and built-in loop catalog

    Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.
  Scope: |-
    - In scope: Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.
    - Out of scope: unrelated refactors not required for "Add loop specification schema and built-in loop catalog".
  Plan: |-
    1. Add a loops domain module with LoopSpec, LoopRun, Iteration, Observation, Decision, and scoring types.
    2. Add built-in loop templates for a conservative MVP set: tdd.fix, ci.repair, docs.sync, security.review, context.harvest, workflow.recover, evaluator.quality-gate, and loop.improve.
    3. Add validation helpers and project-local loop loading from .agentplane/loops without auto-trusting invalid specs.
    4. Add JSON schema/spec example coverage where this repo keeps public schemas.
    5. Test validation, built-in catalog listing, and selection/scoring behavior.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add loop specification schema and built-in loop catalog

Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.

## Scope

- In scope: Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.
- Out of scope: unrelated refactors not required for "Add loop specification schema and built-in loop catalog".

## Plan

1. Add a loops domain module with LoopSpec, LoopRun, Iteration, Observation, Decision, and scoring types.
2. Add built-in loop templates for a conservative MVP set: tdd.fix, ci.repair, docs.sync, security.review, context.harvest, workflow.recover, evaluator.quality-gate, and loop.improve.
3. Add validation helpers and project-local loop loading from .agentplane/loops without auto-trusting invalid specs.
4. Add JSON schema/spec example coverage where this repo keeps public schemas.
5. Test validation, built-in catalog listing, and selection/scoring behavior.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
