---
id: "202604231236-W7D50W"
title: "Audit user init flows and fix manifest failures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "init"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T12:36:37.134Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit init code paths and recipe manifest normalization, reproduce the current manifest crash, and patch the failing user-facing path with regression tests."
events:
  -
    type: "status"
    at: "2026-04-23T12:36:37.727Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit init code paths and recipe manifest normalization, reproduce the current manifest crash, and patch the failing user-facing path with regression tests."
doc_version: 3
doc_updated_at: "2026-04-23T12:36:37.746Z"
doc_updated_by: "CODER"
description: "Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes."
sections:
  Summary: |-
    Audit user init flows and fix manifest failures
    
    Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
  Scope: |-
    - In scope: Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
    - Out of scope: unrelated refactors not required for "Audit user init flows and fix manifest failures".
  Plan: "Goal: audit user-facing AgentPlane init flows with emphasis on recipe manifest loading, cached legacy shapes, and dialog execution paths. Scope: map init code from CLI entry through recipe cache and manifest validation, reproduce the current 'Invalid field manifest: expected prompts or scenarios' failure, patch normalization/validation so legacy or incomplete cached recipe manifests do not abort init, add regression coverage for direct cache/user scenarios, and run focused verification. Out of scope: unrelated init UX redesigns or non-init command refactors."
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

Audit user init flows and fix manifest failures

Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.

## Scope

- In scope: Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
- Out of scope: unrelated refactors not required for "Audit user init flows and fix manifest failures".

## Plan

Goal: audit user-facing AgentPlane init flows with emphasis on recipe manifest loading, cached legacy shapes, and dialog execution paths. Scope: map init code from CLI entry through recipe cache and manifest validation, reproduce the current 'Invalid field manifest: expected prompts or scenarios' failure, patch normalization/validation so legacy or incomplete cached recipe manifests do not abort init, add regression coverage for direct cache/user scenarios, and run focused verification. Out of scope: unrelated init UX redesigns or non-init command refactors.

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
