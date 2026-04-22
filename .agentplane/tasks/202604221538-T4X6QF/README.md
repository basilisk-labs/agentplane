---
id: "202604221538-T4X6QF"
title: "Emit prompt graph and manifest artifacts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-FSYGA6"
  - "202604221538-P6WRV2"
  - "202604221538-TAEV8T"
tags:
  - "code"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:20.689Z"
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
doc_updated_at: "2026-04-22T15:38:20.473Z"
doc_updated_by: "PLANNER"
description: "Write .agentplane/generated/prompt-graph.json and prompt-manifest.json from the resolved prompt graph with stable ordering and content hashes."
sections:
  Summary: |-
    Emit prompt graph and manifest artifacts
    
    Write .agentplane/generated/prompt-graph.json and prompt-manifest.json from the resolved prompt graph with stable ordering and content hashes.
  Scope: |-
    - In scope: Write .agentplane/generated/prompt-graph.json and prompt-manifest.json from the resolved prompt graph with stable ordering and content hashes.
    - Out of scope: unrelated refactors not required for "Emit prompt graph and manifest artifacts".
  Plan: |-
    Goal: Emit prompt graph and manifest artifacts
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Generated artifacts are deterministic, schema-valid, and clearly marked as derived rather than authoritative.
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

Emit prompt graph and manifest artifacts

Write .agentplane/generated/prompt-graph.json and prompt-manifest.json from the resolved prompt graph with stable ordering and content hashes.

## Scope

- In scope: Write .agentplane/generated/prompt-graph.json and prompt-manifest.json from the resolved prompt graph with stable ordering and content hashes.
- Out of scope: unrelated refactors not required for "Emit prompt graph and manifest artifacts".

## Plan

Goal: Emit prompt graph and manifest artifacts

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Generated artifacts are deterministic, schema-valid, and clearly marked as derived rather than authoritative.
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
