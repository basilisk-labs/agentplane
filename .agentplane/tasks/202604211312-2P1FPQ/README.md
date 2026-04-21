---
id: "202604211312-2P1FPQ"
title: "Remove trivial runtime shim callsites"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-04-21T17:23:59.072Z"
  updated_by: "CODER"
  note: "Verified removal of trivial runtime shim callsites. Checks: bun run typecheck passed; bun run knip:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed. Additional architecture check passed: bun run arch:check, with known no-circular baseline reduced from 8 to 6 after deleting shim edges."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove trivial runtime shim callsites by rewriting internal imports to canonical implementation modules and deleting shims that have no retained compatibility purpose."
events:
  -
    type: "status"
    at: "2026-04-21T17:14:54.411Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove trivial runtime shim callsites by rewriting internal imports to canonical implementation modules and deleting shims that have no retained compatibility purpose."
  -
    type: "verify"
    at: "2026-04-21T17:23:59.072Z"
    author: "CODER"
    state: "ok"
    note: "Verified removal of trivial runtime shim callsites. Checks: bun run typecheck passed; bun run knip:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed. Additional architecture check passed: bun run arch:check, with known no-circular baseline reduced from 8 to 6 after deleting shim edges."
doc_version: 3
doc_updated_at: "2026-04-21T17:23:59.074Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T17:23:59.072Z — VERIFY — ok

    By: CODER

    Note: Verified removal of trivial runtime shim callsites. Checks: bun run typecheck passed; bun run knip:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed. Additional architecture check passed: bun run arch:check, with known no-circular baseline reduced from 8 to 6 after deleting shim edges.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:14:54.420Z, excerpt_hash=sha256:daa53212fa5d2fd6104e6aeefc649e101561948fbaf709e9c823ea0a89ad6ee0

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
### 2026-04-21T17:23:59.072Z — VERIFY — ok

By: CODER

Note: Verified removal of trivial runtime shim callsites. Checks: bun run typecheck passed; bun run knip:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed. Additional architecture check passed: bun run arch:check, with known no-circular baseline reduced from 8 to 6 after deleting shim edges.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:14:54.420Z, excerpt_hash=sha256:daa53212fa5d2fd6104e6aeefc649e101561948fbaf709e9c823ea0a89ad6ee0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
