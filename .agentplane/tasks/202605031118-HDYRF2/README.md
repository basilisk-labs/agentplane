---
id: "202605031118-HDYRF2"
title: "Add Bun binary smoke coverage"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "bun"
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:19:15.251Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T11:19:12.296Z"
doc_updated_by: "PLANNER"
description: "Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime."
sections:
  Summary: |-
    Add Bun binary smoke coverage
    
    Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
  Scope: |-
    - In scope: Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
    - Out of scope: unrelated refactors not required for "Add Bun binary smoke coverage".
  Plan: |-
    Plan:
    1. Add binary-specific smoke coverage separate from bundled-Node standalone smoke.
    2. Build a Bun executable in test/check mode.
    3. Verify --version, quickstart, init --yes, and doctor in a temp repo with Node/Bun removed from PATH where feasible.
    Acceptance: binary smoke fails on package-root/assets regressions and passes for the supported host target.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Add Bun binary smoke coverage

Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.

## Scope

- In scope: Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
- Out of scope: unrelated refactors not required for "Add Bun binary smoke coverage".

## Plan

Plan:
1. Add binary-specific smoke coverage separate from bundled-Node standalone smoke.
2. Build a Bun executable in test/check mode.
3. Verify --version, quickstart, init --yes, and doctor in a temp repo with Node/Bun removed from PATH where feasible.
Acceptance: binary smoke fails on package-root/assets regressions and passes for the supported host target.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
