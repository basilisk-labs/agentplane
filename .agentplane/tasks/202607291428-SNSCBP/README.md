---
id: "202607291428-SNSCBP"
title: "Gate beta.1 qualification on SHA-bound evaluator evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "quality"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T14:28:28.077Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-29T14:28:55.544Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T14:28:55.544Z"
doc_updated_by: "CODER"
description: "Add the completed SHA-bound evaluator evidence task as an explicit beta.1 qualification dependency so the milestone cannot advance without merged evidence."
sections:
  Summary: |-
    Gate beta.1 qualification on SHA-bound evaluator evidence

    Add the completed SHA-bound evaluator evidence task as an explicit beta.1 qualification dependency so the milestone cannot advance without merged evidence.
  Scope: |-
    - In scope: Add the completed SHA-bound evaluator evidence task as an explicit beta.1 qualification dependency so the milestone cannot advance without merged evidence.
    - Out of scope: unrelated refactors not required for "Gate beta.1 qualification on SHA-bound evaluator evidence".
  Plan: "1. Add 202607291148-1F9GZD to the beta.1 qualification task dependency graph. 2. Verify the persisted task document and route show the gate cannot advance without that task. 3. Run docs/policy checks and record verification. 4. Complete a focused evaluator review and merge this metadata-only PR before the evaluator-evidence implementation PR."
  Verify Steps: |-
    PLANNER fallback scaffold for "Gate beta.1 qualification on SHA-bound evaluator evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Gate beta.1 qualification on SHA-bound evaluator evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Gate beta.1 qualification on SHA-bound evaluator evidence

Add the completed SHA-bound evaluator evidence task as an explicit beta.1 qualification dependency so the milestone cannot advance without merged evidence.

## Scope

- In scope: Add the completed SHA-bound evaluator evidence task as an explicit beta.1 qualification dependency so the milestone cannot advance without merged evidence.
- Out of scope: unrelated refactors not required for "Gate beta.1 qualification on SHA-bound evaluator evidence".

## Plan

1. Add 202607291148-1F9GZD to the beta.1 qualification task dependency graph. 2. Verify the persisted task document and route show the gate cannot advance without that task. 3. Run docs/policy checks and record verification. 4. Complete a focused evaluator review and merge this metadata-only PR before the evaluator-evidence implementation PR.

## Verify Steps

PLANNER fallback scaffold for "Gate beta.1 qualification on SHA-bound evaluator evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Gate beta.1 qualification on SHA-bound evaluator evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
