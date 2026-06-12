---
id: "202606081917-BASAPD"
title: "Add loop specification schema and built-in loop catalog"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "approved"
  updated_at: "2026-06-12T10:22:21.582Z"
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
doc_updated_at: "2026-06-12T10:17:58.399Z"
doc_updated_by: "PLANNER"
description: "Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files."
sections:
  Summary: |-
    Add loop specification schema and built-in loop catalog

    Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.
  Scope: |-
    - In scope: Add typed LoopSpec/LoopRun/Observation/Decision contracts, JSON schema/spec examples, built-in loop templates, and validation helpers for project-local loop files.
    - Out of scope: unrelated refactors not required for "Add loop specification schema and built-in loop catalog".
  Plan: |-
    1. Add a loops domain module with LoopSpec, LoopRun, Iteration, Observation, Decision, and scoring-ready types.
    2. Add built-in loop templates for the conservative MVP set: tdd.fix, ci.repair, docs.sync, security.review, context.harvest, workflow.recover, evaluator.quality-gate, and loop.improve as catalog entries only where execution remains dry-run safe.
    3. Add validation helpers and project-local loop loading from .agentplane/loops without auto-trusting invalid specs.
    4. Add JSON schema/spec example coverage where this repo keeps public schemas.
    5. Include forward-compatible schema extension points for typed step contracts, metric definitions, prompt module identity, and structured artifact refs, but do not implement score-aware execution in v0.1.
    6. Test validation, built-in catalog listing, selection/scoring behavior, and compatibility with existing loop specs.
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

1. Add a loops domain module with LoopSpec, LoopRun, Iteration, Observation, Decision, and scoring-ready types.
2. Add built-in loop templates for the conservative MVP set: tdd.fix, ci.repair, docs.sync, security.review, context.harvest, workflow.recover, evaluator.quality-gate, and loop.improve as catalog entries only where execution remains dry-run safe.
3. Add validation helpers and project-local loop loading from .agentplane/loops without auto-trusting invalid specs.
4. Add JSON schema/spec example coverage where this repo keeps public schemas.
5. Include forward-compatible schema extension points for typed step contracts, metric definitions, prompt module identity, and structured artifact refs, but do not implement score-aware execution in v0.1.
6. Test validation, built-in catalog listing, selection/scoring behavior, and compatibility with existing loop specs.

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
