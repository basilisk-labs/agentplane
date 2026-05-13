---
id: "202605140709-5H7BAA"
title: "Finalize v0.6 readiness blockers and pending task integration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T07:09:35.951Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user request to complete open tasks, merge pending work, fix v0.6 context blockers, and report only after full readiness checks pass."
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
    body: "Start: Implement approved v0.6 readiness blocker fixes, reconcile pending task work, and verify the full empty-directory context assimilation release path."
events:
  -
    type: "status"
    at: "2026-05-14T07:09:50.861Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved v0.6 readiness blocker fixes, reconcile pending task work, and verify the full empty-directory context assimilation release path."
doc_version: 3
doc_updated_at: "2026-05-14T07:09:50.861Z"
doc_updated_by: "CODER"
description: "Fix context release blockers found in v0.6 readiness audit, complete the three open evaluator/docgen TODO tasks, reconcile useful unmerged task branch work, and prove empty-directory context assimilation plus release/package gates before merging to main."
sections:
  Summary: |-
    Finalize v0.6 readiness blockers and pending task integration
    
    Fix context release blockers found in v0.6 readiness audit, complete the three open evaluator/docgen TODO tasks, reconcile useful unmerged task branch work, and prove empty-directory context assimilation plus release/package gates before merging to main.
  Scope: |-
    - In scope: Fix context release blockers found in v0.6 readiness audit, complete the three open evaluator/docgen TODO tasks, reconcile useful unmerged task branch work, and prove empty-directory context assimilation plus release/package gates before merging to main.
    - Out of scope: unrelated refactors not required for "Finalize v0.6 readiness blockers and pending task integration".
  Plan: "Batch plan for v0.6 readiness and pending integration. Included existing TODO tasks: 202605132134-E6RDJG, 202605132134-ZD2J9D, 202605132136-3P69QC. Included in-flight/unmerged work to reconcile: 202605132103-J5YVSS PR #3689, useful non-merged cloud autosync branches 202605131921-JXEQ8J and 202605132026-PV7HGD if they still apply cleanly to current main. Steps: 1) start a branch_pr worktree from current main; 2) cherry-pick or reimplement only still-relevant pending branch changes, avoiding stale task artifact churn; 3) fix v0.6 context blockers: bundled node:sqlite import, Bun/Node readiness gate mismatch, context init/doctor self-consistency, context/wiki/AGENTS.md scaffold contract, context ingest --run lifecycle, duplicate/incorrect learn files output, docs release/projection drift; 4) run focused tests for evaluator/docgen/context/cloud surfaces; 5) run package install smoke and full empty-directory context smoke from init through ingestion/reindex/search/doctor/verify; 6) update task verification records and PR artifacts; 7) merge through branch_pr integration into main and close included tasks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
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

Finalize v0.6 readiness blockers and pending task integration

Fix context release blockers found in v0.6 readiness audit, complete the three open evaluator/docgen TODO tasks, reconcile useful unmerged task branch work, and prove empty-directory context assimilation plus release/package gates before merging to main.

## Scope

- In scope: Fix context release blockers found in v0.6 readiness audit, complete the three open evaluator/docgen TODO tasks, reconcile useful unmerged task branch work, and prove empty-directory context assimilation plus release/package gates before merging to main.
- Out of scope: unrelated refactors not required for "Finalize v0.6 readiness blockers and pending task integration".

## Plan

Batch plan for v0.6 readiness and pending integration. Included existing TODO tasks: 202605132134-E6RDJG, 202605132134-ZD2J9D, 202605132136-3P69QC. Included in-flight/unmerged work to reconcile: 202605132103-J5YVSS PR #3689, useful non-merged cloud autosync branches 202605131921-JXEQ8J and 202605132026-PV7HGD if they still apply cleanly to current main. Steps: 1) start a branch_pr worktree from current main; 2) cherry-pick or reimplement only still-relevant pending branch changes, avoiding stale task artifact churn; 3) fix v0.6 context blockers: bundled node:sqlite import, Bun/Node readiness gate mismatch, context init/doctor self-consistency, context/wiki/AGENTS.md scaffold contract, context ingest --run lifecycle, duplicate/incorrect learn files output, docs release/projection drift; 4) run focused tests for evaluator/docgen/context/cloud surfaces; 5) run package install smoke and full empty-directory context smoke from init through ingestion/reindex/search/doctor/verify; 6) update task verification records and PR artifacts; 7) merge through branch_pr integration into main and close included tasks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

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
