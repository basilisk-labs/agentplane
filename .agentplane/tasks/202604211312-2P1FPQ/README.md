---
id: "202604211312-2P1FPQ"
title: "Remove trivial runtime shim callsites"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211312-4PXEBW"
  - "202604211312-EYTQD7"
tags:
  - "cleanup"
  - "code"
  - "refactor"
verify:
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:49.393Z"
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
doc_updated_at: "2026-04-21T13:12:48.806Z"
doc_updated_by: "PLANNER"
description: "Migrate internal imports away from one-line or pure re-export shims such as init.ts, finish.ts, guard impl commands.ts, and process-supervision.ts."
sections:
  Summary: |-
    Remove trivial runtime shim callsites
    
    Migrate internal imports away from one-line or pure re-export shims such as init.ts, finish.ts, guard impl commands.ts, and process-supervision.ts.
  Scope: |-
    - In scope: Migrate internal imports away from one-line or pure re-export shims such as init.ts, finish.ts, guard impl commands.ts, and process-supervision.ts.
    - Out of scope: unrelated refactors not required for "Remove trivial runtime shim callsites".
  Plan: "Scope: remove internal dependence on post-refactor proxy files where no external compatibility value remains. Steps: 1. Inventory pure re-export shims and their importers. 2. Rewrite internal imports to canonical implementation modules. 3. Delete shims that have no public package contract. 4. Keep or document any shim that is externally exposed. Acceptance: trivial internal shims are removed or explicitly retained with a documented reason; knip and typecheck pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Remove trivial runtime shim callsites

Migrate internal imports away from one-line or pure re-export shims such as init.ts, finish.ts, guard impl commands.ts, and process-supervision.ts.

## Scope

- In scope: Migrate internal imports away from one-line or pure re-export shims such as init.ts, finish.ts, guard impl commands.ts, and process-supervision.ts.
- Out of scope: unrelated refactors not required for "Remove trivial runtime shim callsites".

## Plan

Scope: remove internal dependence on post-refactor proxy files where no external compatibility value remains. Steps: 1. Inventory pure re-export shims and their importers. 2. Rewrite internal imports to canonical implementation modules. 3. Delete shims that have no public package contract. 4. Keep or document any shim that is externally exposed. Acceptance: trivial internal shims are removed or explicitly retained with a documented reason; knip and typecheck pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
