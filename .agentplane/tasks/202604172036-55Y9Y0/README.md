---
id: "202604172036-55Y9Y0"
title: "Write ADR for schema runtime contract strategy"
status: "DOING"
priority: "med"
owner: "PLANNER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "docs"
  - "refactor"
  - "schemas"
verify:
  - "bun run lint:core"
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T05:24:55.338Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T05:28:57.442Z"
  updated_by: "PLANNER"
  note: "Validated schema-contract ADR refresh: added a Zod-SSOT ADR, rewrote the practical schema strategy page around durable vs transient boundaries, updated adjacent architecture/project-layout references, and confirmed lint:core plus Prettier checks stayed green."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: replace the stale AJV-first schema strategy doc with a Zod-SSOT ADR, update adjacent developer docs to match the codebase, and keep scope limited to schema-contract documentation."
events:
  -
    type: "status"
    at: "2026-04-18T05:25:10.043Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the stale AJV-first schema strategy doc with a Zod-SSOT ADR, update adjacent developer docs to match the codebase, and keep scope limited to schema-contract documentation."
  -
    type: "verify"
    at: "2026-04-18T05:28:57.442Z"
    author: "PLANNER"
    state: "ok"
    note: "Validated schema-contract ADR refresh: added a Zod-SSOT ADR, rewrote the practical schema strategy page around durable vs transient boundaries, updated adjacent architecture/project-layout references, and confirmed lint:core plus Prettier checks stayed green."
doc_version: 3
doc_updated_at: "2026-04-18T05:28:57.446Z"
doc_updated_by: "PLANNER"
description: "Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas."
sections:
  Summary: |-
    Write ADR for schema runtime contract strategy
    
    Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.
  Scope: |-
    - In scope: Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.
    - Out of scope: unrelated refactors not required for "Write ADR for schema runtime contract strategy".
  Plan: |-
    1. Implement the change for "Write ADR for schema runtime contract strategy".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Write ADR for schema runtime contract strategy". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T05:28:57.442Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Validated schema-contract ADR refresh: added a Zod-SSOT ADR, rewrote the practical schema strategy page around durable vs transient boundaries, updated adjacent architecture/project-layout references, and confirmed lint:core plus Prettier checks stayed green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:25:10.104Z, excerpt_hash=sha256:951b6bd468369d1b0964d2c7442a9dae32213c7fa6b5361fc6ad68b09974ed38
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Write ADR for schema runtime contract strategy

Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.

## Scope

- In scope: Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.
- Out of scope: unrelated refactors not required for "Write ADR for schema runtime contract strategy".

## Plan

1. Implement the change for "Write ADR for schema runtime contract strategy".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Write ADR for schema runtime contract strategy". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T05:28:57.442Z — VERIFY — ok

By: PLANNER

Note: Validated schema-contract ADR refresh: added a Zod-SSOT ADR, rewrote the practical schema strategy page around durable vs transient boundaries, updated adjacent architecture/project-layout references, and confirmed lint:core plus Prettier checks stayed green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:25:10.104Z, excerpt_hash=sha256:951b6bd468369d1b0964d2c7442a9dae32213c7fa6b5361fc6ad68b09974ed38

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
