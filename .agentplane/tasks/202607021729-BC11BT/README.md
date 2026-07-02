---
id: "202607021729-BC11BT"
title: "Enforce maximum-assimilation structural validators"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202607021729-1F4FNM"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-02T17:29:49.786Z"
doc_updated_by: "CODER"
description: "Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage."
sections:
  Summary: |-
    Enforce maximum-assimilation structural validators

    Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
  Scope: |-
    - In scope: Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
    - Out of scope: unrelated refactors not required for "Enforce maximum-assimilation structural validators".
  Plan: |-
    1. Implement the change for "Enforce maximum-assimilation structural validators".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
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

Enforce maximum-assimilation structural validators

Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.

## Scope

- In scope: Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
- Out of scope: unrelated refactors not required for "Enforce maximum-assimilation structural validators".

## Plan

1. Implement the change for "Enforce maximum-assimilation structural validators".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
