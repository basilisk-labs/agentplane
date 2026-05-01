---
id: "202605010645-3W3EXR"
title: "AP-17: Run final refactor wave verification"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-ZN3PN7"
tags:
  - "code"
verify:
  - "bun run ci:local:full && bun run framework:dev:bootstrap && agentplane doctor && node .agentplane/policy/check-routing.mjs"
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
doc_updated_at: "2026-05-01T06:45:28.674Z"
doc_updated_by: "CODER"
description: "Run final integrated verification for the refactor wave and record any residual gaps."
sections:
  Summary: |-
    AP-17: Run final refactor wave verification
    
    Run final integrated verification for the refactor wave and record any residual gaps.
  Scope: |-
    - In scope: Run final integrated verification for the refactor wave and record any residual gaps.
    - Out of scope: unrelated refactors not required for "AP-17: Run final refactor wave verification".
  Plan: |-
    1. Implement the change for "AP-17: Run final refactor wave verification".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run ci:local:full && bun run framework:dev:bootstrap && agentplane doctor && node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-17: Run final refactor wave verification

Run final integrated verification for the refactor wave and record any residual gaps.

## Scope

- In scope: Run final integrated verification for the refactor wave and record any residual gaps.
- Out of scope: unrelated refactors not required for "AP-17: Run final refactor wave verification".

## Plan

1. Implement the change for "AP-17: Run final refactor wave verification".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run ci:local:full && bun run framework:dev:bootstrap && agentplane doctor && node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
