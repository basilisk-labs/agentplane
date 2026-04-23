---
id: "202604221538-HSSZGV"
title: "Compile agent profiles from role modules"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-T4X6QF"
tags:
  - "agents"
  - "code"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:26.142Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T15:38:25.932Z"
doc_updated_by: "PLANNER"
description: "Generate .agentplane/agents role profiles from role profile and role instruction modules, preserving compatibility with current role activation."
sections:
  Summary: |-
    Compile agent profiles from role modules

    Generate .agentplane/agents role profiles from role profile and role instruction modules, preserving compatibility with current role activation.
  Scope: |-
    - In scope: Generate .agentplane/agents role profiles from role profile and role instruction modules, preserving compatibility with current role activation.
    - Out of scope: unrelated refactors not required for "Compile agent profiles from role modules".
  Plan: |-
    Goal: Compile agent profiles from role modules

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Agent profile output preserves current role help while exposing module provenance in generated artifacts.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Compile agent profiles from role modules

Generate .agentplane/agents role profiles from role profile and role instruction modules, preserving compatibility with current role activation.

## Scope

- In scope: Generate .agentplane/agents role profiles from role profile and role instruction modules, preserving compatibility with current role activation.
- Out of scope: unrelated refactors not required for "Compile agent profiles from role modules".

## Plan

Goal: Compile agent profiles from role modules

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Agent profile output preserves current role help while exposing module provenance in generated artifacts.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
