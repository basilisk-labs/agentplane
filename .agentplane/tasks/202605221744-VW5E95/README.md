---
id: "202605221744-VW5E95"
title: "Define machine-readable agent work context contract"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605221744-GF25D1"
tags:
  - "cli"
  - "code"
  - "context"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Add contract tests for the agent work context JSON shape and required fields."
  - "Confirm existing task status and verify-show JSON/text behavior remains backward compatible."
  - "Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:36.865Z"
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
doc_updated_at: "2026-05-22T17:44:32.537Z"
doc_updated_by: "PLANNER"
description: "Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers."
sections:
  Summary: |-
    Define machine-readable agent work context contract

    Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
  Scope: |-
    - In scope: Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
    - Out of scope: unrelated refactors not required for "Define machine-readable agent work context contract".
  Plan: "Create a stable machine-readable agent work context contract shared by task brief and future runner/agent integrations. The contract must distinguish local, cached, and remote-derived fields so agents do not overtrust stale context."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Add contract tests for the agent work context JSON shape and required fields.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm existing task status and verify-show JSON/text behavior remains backward compatible.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Define machine-readable agent work context contract

Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.

## Scope

- In scope: Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
- Out of scope: unrelated refactors not required for "Define machine-readable agent work context contract".

## Plan

Create a stable machine-readable agent work context contract shared by task brief and future runner/agent integrations. The contract must distinguish local, cached, and remote-derived fields so agents do not overtrust stale context.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Add contract tests for the agent work context JSON shape and required fields.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm existing task status and verify-show JSON/text behavior remains backward compatible.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
