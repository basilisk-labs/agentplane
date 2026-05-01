---
id: "202605010645-WG423K"
title: "AP-06: Add prompt selector and merge diagnostics"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010644-6YE9F6"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
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
doc_updated_at: "2026-05-01T06:45:02.568Z"
doc_updated_by: "CODER"
description: "Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible."
sections:
  Summary: |-
    AP-06: Add prompt selector and merge diagnostics
    
    Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
  Scope: |-
    - In scope: Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
    - Out of scope: unrelated refactors not required for "AP-06: Add prompt selector and merge diagnostics".
  Plan: |-
    1. Implement the change for "AP-06: Add prompt selector and merge diagnostics".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-06: Add prompt selector and merge diagnostics

Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.

## Scope

- In scope: Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
- Out of scope: unrelated refactors not required for "AP-06: Add prompt selector and merge diagnostics".

## Plan

1. Implement the change for "AP-06: Add prompt selector and merge diagnostics".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
