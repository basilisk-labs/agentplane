---
id: "202605010644-6YE9F6"
title: "AP-05: Extract prompt mutation engine"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010644-1HMJJA"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
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
doc_updated_at: "2026-05-01T06:44:59.383Z"
doc_updated_by: "CODER"
description: "Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable."
sections:
  Summary: |-
    AP-05: Extract prompt mutation engine
    
    Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
  Scope: |-
    - In scope: Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
    - Out of scope: unrelated refactors not required for "AP-05: Extract prompt mutation engine".
  Plan: |-
    1. Implement the change for "AP-05: Extract prompt mutation engine".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-05: Extract prompt mutation engine

Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.

## Scope

- In scope: Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
- Out of scope: unrelated refactors not required for "AP-05: Extract prompt mutation engine".

## Plan

1. Implement the change for "AP-05: Extract prompt mutation engine".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
