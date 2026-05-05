---
id: "202605052204-WJ25N8"
title: "Materialize selected blueprint plans on tasks"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605052204-AJBX3D"
tags:
  - "blueprints"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:13.044Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:18:47.757Z"
  updated_by: "CODER"
  note: "Verified: selected blueprint plans are materialized as structured plan objects with selection rationale, states, evidence checklist, policy modules, allowed commands, and context manifest."
commit:
  hash: "5e16019e1eea4992217e70d12170dc8661de1988"
  message: "Merge pull request #952 from basilisk-labs/task/202605052203-WH7G6R/executable-blueprint-contracts"
comments:
  -
    author: "CODER"
    body: "Start: Materialize selected blueprint plan artifacts as part of the approved executable blueprint batch implementation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:27.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Materialize selected blueprint plan artifacts as part of the approved executable blueprint batch implementation."
  -
    type: "verify"
    at: "2026-05-05T22:18:47.757Z"
    author: "CODER"
    state: "ok"
    note: "Verified: selected blueprint plans are materialized as structured plan objects with selection rationale, states, evidence checklist, policy modules, allowed commands, and context manifest."
  -
    type: "status"
    at: "2026-05-05T22:27:39.720Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
doc_version: 3
doc_updated_at: "2026-05-05T22:27:39.720Z"
doc_updated_by: "INTEGRATOR"
description: "Add the third implementation task for blueprint execution contracts: persist the selected blueprint, selection rationale, ordered states, required evidence, policy modules, and command boundaries as a task artifact when a task route is resolved."
sections:
  Summary: |-
    Materialize selected blueprint plans on tasks
    
    Add the third implementation task for blueprint execution contracts: persist the selected blueprint, selection rationale, ordered states, required evidence, policy modules, and command boundaries as a task artifact when a task route is resolved.
  Scope: |-
    - In scope: Add the third implementation task for blueprint execution contracts: persist the selected blueprint, selection rationale, ordered states, required evidence, policy modules, and command boundaries as a task artifact when a task route is resolved.
    - Out of scope: unrelated refactors not required for "Materialize selected blueprint plans on tasks".
  Plan: |-
    1. Extend blueprint resolution output to include the selected definition and rationale.
    2. Persist a task-local blueprint plan artifact with selected blueprint id, why_selected, ordered states, required evidence, policy modules, and command boundaries.
    3. Keep the artifact descriptive first; do not execute states automatically.
    4. Ensure repeated resolution is deterministic and does not add noisy churn.
    5. Add tests for artifact content and no-extra-policy behavior.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:18:47.757Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: selected blueprint plans are materialized as structured plan objects with selection rationale, states, evidence checklist, policy modules, allowed commands, and context manifest.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:27.137Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: focused blueprint and runner dry-run tests; typecheck; targeted eslint; schemas; docs CLI freshness; policy routing; doctor; diff check.
      Impact: Resolved routes can now be audited as data in explain output and runner bundle artifacts.
      Resolution: Added buildBlueprintPlanArtifact and wired it into explain and runner bundle preparation.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Materialize selected blueprint plans on tasks

Add the third implementation task for blueprint execution contracts: persist the selected blueprint, selection rationale, ordered states, required evidence, policy modules, and command boundaries as a task artifact when a task route is resolved.

## Scope

- In scope: Add the third implementation task for blueprint execution contracts: persist the selected blueprint, selection rationale, ordered states, required evidence, policy modules, and command boundaries as a task artifact when a task route is resolved.
- Out of scope: unrelated refactors not required for "Materialize selected blueprint plans on tasks".

## Plan

1. Extend blueprint resolution output to include the selected definition and rationale.
2. Persist a task-local blueprint plan artifact with selected blueprint id, why_selected, ordered states, required evidence, policy modules, and command boundaries.
3. Keep the artifact descriptive first; do not execute states automatically.
4. Ensure repeated resolution is deterministic and does not add noisy churn.
5. Add tests for artifact content and no-extra-policy behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T22:18:47.757Z — VERIFY — ok

By: CODER

Note: Verified: selected blueprint plans are materialized as structured plan objects with selection rationale, states, evidence checklist, policy modules, allowed commands, and context manifest.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:27.137Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: focused blueprint and runner dry-run tests; typecheck; targeted eslint; schemas; docs CLI freshness; policy routing; doctor; diff check.
  Impact: Resolved routes can now be audited as data in explain output and runner bundle artifacts.
  Resolution: Added buildBlueprintPlanArtifact and wired it into explain and runner bundle preparation.
  Promotion: incident-candidate
  Fixability: external
