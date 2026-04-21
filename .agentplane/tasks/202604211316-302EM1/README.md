---
id: "202604211316-302EM1"
title: "Promote init v2 as default interactive UI"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211316-2FRTB3"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run docs:cli:check"
  - "bun run test:project -- cli-core"
  - "bun run test:project -- critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:33.956Z"
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
doc_updated_at: "2026-04-21T13:16:32.988Z"
doc_updated_by: "PLANNER"
description: "After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior."
sections:
  Summary: |-
    Promote init v2 as default interactive UI
    
    After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
  Scope: |-
    - In scope: After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
    - Out of scope: unrelated refactors not required for "Promote init v2 as default interactive UI".
  Plan: "Scope: implement atom #7. Steps: 1. Switch default TTY interactive init to v2. 2. Keep non-TTY, --yes, explicit flags, and plain prompt mode behavior stable or intentionally update snapshots. 3. Deprecate old ui.ts/framedRailCallout path. 4. Update run-cli.core.init.test.ts snapshots only for intentional interactive UI changes. Acceptance: init CLI contracts pass and default interactive UI is v2."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run test:project -- critical`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Promote init v2 as default interactive UI

After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.

## Scope

- In scope: After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
- Out of scope: unrelated refactors not required for "Promote init v2 as default interactive UI".

## Plan

Scope: implement atom #7. Steps: 1. Switch default TTY interactive init to v2. 2. Keep non-TTY, --yes, explicit flags, and plain prompt mode behavior stable or intentionally update snapshots. 3. Deprecate old ui.ts/framedRailCallout path. 4. Update run-cli.core.init.test.ts snapshots only for intentional interactive UI changes. Acceptance: init CLI contracts pass and default interactive UI is v2.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run test:project -- critical`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
