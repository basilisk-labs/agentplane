---
id: "202604211316-X068RW"
title: "Remove legacy init UI path"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211316-302EM1"
tags:
  - "cleanup"
  - "cli"
  - "code"
verify:
  - "bun run hotspots:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-core"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:40.756Z"
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
doc_updated_at: "2026-04-21T13:16:39.764Z"
doc_updated_by: "PLANNER"
description: "Delete old init UI helpers and legacy orchestrator fragments that are superseded after v2 becomes the default."
sections:
  Summary: |-
    Remove legacy init UI path
    
    Delete old init UI helpers and legacy orchestrator fragments that are superseded after v2 becomes the default.
  Scope: |-
    - In scope: Delete old init UI helpers and legacy orchestrator fragments that are superseded after v2 becomes the default.
    - Out of scope: unrelated refactors not required for "Remove legacy init UI path".
  Plan: "Scope: implement atom #8. Steps: 1. Remove ui.ts/framedRailCallout and unused legacy prompt rendering code. 2. Delete obsolete tests or convert them to v2 assertions. 3. Run knip and hotspot checks to confirm cleanup. 4. Keep non-interactive init behavior intact. Acceptance: no legacy init UI dead code remains; knip and init tests pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Remove legacy init UI path

Delete old init UI helpers and legacy orchestrator fragments that are superseded after v2 becomes the default.

## Scope

- In scope: Delete old init UI helpers and legacy orchestrator fragments that are superseded after v2 becomes the default.
- Out of scope: unrelated refactors not required for "Remove legacy init UI path".

## Plan

Scope: implement atom #8. Steps: 1. Remove ui.ts/framedRailCallout and unused legacy prompt rendering code. 2. Delete obsolete tests or convert them to v2 assertions. 3. Run knip and hotspot checks to confirm cleanup. 4. Keep non-interactive init behavior intact. Acceptance: no legacy init UI dead code remains; knip and init tests pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
