---
id: "202605010645-D8EM8Y"
title: "AP-07: Introduce unified test route registry"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-WG423K"
tags:
  - "code"
verify:
  - "node scripts/check-vitest-projects.mjs"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-01T06:45:05.585Z"
doc_updated_by: "CODER"
description: "Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry."
sections:
  Summary: |-
    AP-07: Introduce unified test route registry
    
    Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
  Scope: |-
    - In scope: Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
    - Out of scope: unrelated refactors not required for "AP-07: Introduce unified test route registry".
  Plan: |-
    1. Implement the change for "AP-07: Introduce unified test route registry".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `node scripts/check-vitest-projects.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

AP-07: Introduce unified test route registry

Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.

## Scope

- In scope: Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
- Out of scope: unrelated refactors not required for "AP-07: Introduce unified test route registry".

## Plan

1. Implement the change for "AP-07: Introduce unified test route registry".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `node scripts/check-vitest-projects.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
