---
id: "202607021729-1F4FNM"
title: "Add SGR v2 typed context extraction writer"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202607021729-QWQRZY"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts"
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
doc_updated_at: "2026-07-02T17:29:39.660Z"
doc_updated_by: "CODER"
description: "Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility."
sections:
  Summary: |-
    Add SGR v2 typed context extraction writer

    Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
  Scope: |-
    - In scope: Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
    - Out of scope: unrelated refactors not required for "Add SGR v2 typed context extraction writer".
  Plan: |-
    1. Implement the change for "Add SGR v2 typed context extraction writer".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add SGR v2 typed context extraction writer

Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.

## Scope

- In scope: Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
- Out of scope: unrelated refactors not required for "Add SGR v2 typed context extraction writer".

## Plan

1. Implement the change for "Add SGR v2 typed context extraction writer".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
