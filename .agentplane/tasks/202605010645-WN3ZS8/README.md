---
id: "202605010645-WN3ZS8"
title: "AP-08: Split hooks CLI test monolith"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-D8EM8Y"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
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
doc_updated_at: "2026-05-01T06:45:08.227Z"
doc_updated_by: "CODER"
description: "Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers."
sections:
  Summary: |-
    AP-08: Split hooks CLI test monolith
    
    Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
  Scope: |-
    - In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
    - Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".
  Plan: |-
    1. Implement the change for "AP-08: Split hooks CLI test monolith".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-08: Split hooks CLI test monolith

Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.

## Scope

- In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
- Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".

## Plan

1. Implement the change for "AP-08: Split hooks CLI test monolith".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
