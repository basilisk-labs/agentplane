---
id: "202607021729-QWQRZY"
title: "Create context task pack and source span skeleton"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202607021729-C07EE3"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts"
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
doc_updated_at: "2026-07-02T17:29:28.516Z"
doc_updated_by: "CODER"
description: "Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation."
sections:
  Summary: |-
    Create context task pack and source span skeleton

    Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
  Scope: |-
    - In scope: Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
    - Out of scope: unrelated refactors not required for "Create context task pack and source span skeleton".
  Plan: |-
    1. Implement the change for "Create context task pack and source span skeleton".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Create context task pack and source span skeleton

Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.

## Scope

- In scope: Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
- Out of scope: unrelated refactors not required for "Create context task pack and source span skeleton".

## Plan

1. Implement the change for "Create context task pack and source span skeleton".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
