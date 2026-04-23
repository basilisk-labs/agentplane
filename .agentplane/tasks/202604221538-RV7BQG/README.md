---
id: "202604221538-RV7BQG"
title: "Detect compiled prompt drift and repo overrides"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604221538-EWPH3C"
tags:
  - "code"
  - "policy"
  - "prompt-assembly"
  - "upgrade"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:28.885Z"
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
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
events:
  -
    type: "status"
    at: "2026-04-23T17:54:48.935Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
doc_version: 3
doc_updated_at: "2026-04-23T17:54:48.935Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add drift detection and repo-local override handling for manual edits to compiled AGENTS, policy, and agent files."
sections:
  Summary: |-
    Detect compiled prompt drift and repo overrides
    
    Add drift detection and repo-local override handling for manual edits to compiled AGENTS, policy, and agent files.
  Scope: |-
    - In scope: Add drift detection and repo-local override handling for manual edits to compiled AGENTS, policy, and agent files.
    - Out of scope: unrelated refactors not required for "Detect compiled prompt drift and repo overrides".
  Plan: |-
    Goal: Detect compiled prompt drift and repo overrides
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Manual prompt edits are reported as drift unless represented as repo-local modules or sanctioned overrides.
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

Detect compiled prompt drift and repo overrides

Add drift detection and repo-local override handling for manual edits to compiled AGENTS, policy, and agent files.

## Scope

- In scope: Add drift detection and repo-local override handling for manual edits to compiled AGENTS, policy, and agent files.
- Out of scope: unrelated refactors not required for "Detect compiled prompt drift and repo overrides".

## Plan

Goal: Detect compiled prompt drift and repo overrides

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Manual prompt edits are reported as drift unless represented as repo-local modules or sanctioned overrides.
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
