---
id: "202604211316-X068RW"
title: "Remove legacy init UI path"
result_summary: "Removed legacy framed init UI helpers/tests, simplified legacy prompt output, narrowed init v2 public type surface, and deleted unused command-loader fan-in shims required for knip baseline stability."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-04-21T17:05:38.307Z"
  updated_by: "CODER"
  note: "Verified legacy init UI cleanup. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run knip:check passed (files=11/11, exports=251/251, types=299/301, total=561/563); bun run hotspots:check passed with warnings only; bun run lint:core passed; bun run format:check passed; git diff --check passed."
commit:
  hash: "8d8f8e1b3d1d69df258bb7d9b859fabcff93c602"
  message: "🧹 X068RW init: remove legacy UI path"
comments:
  -
    author: "CODER"
    body: "Start: remove legacy init UI helpers now that v2 is the default interactive route, while preserving non-TTY, --yes, and plain prompt behavior."
  -
    author: "CODER"
    body: "Verified: legacy init UI cleanup. Checks: bun run typecheck; bun run test:project -- cli-core; bun run knip:check; bun run hotspots:check; bun run lint:core; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T16:59:10.065Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove legacy init UI helpers now that v2 is the default interactive route, while preserving non-TTY, --yes, and plain prompt behavior."
  -
    type: "verify"
    at: "2026-04-21T17:05:38.307Z"
    author: "CODER"
    state: "ok"
    note: "Verified legacy init UI cleanup. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run knip:check passed (files=11/11, exports=251/251, types=299/301, total=561/563); bun run hotspots:check passed with warnings only; bun run lint:core passed; bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T17:06:16.102Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: legacy init UI cleanup. Checks: bun run typecheck; bun run test:project -- cli-core; bun run knip:check; bun run hotspots:check; bun run lint:core; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T17:06:16.103Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T17:05:38.307Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified legacy init UI cleanup. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run knip:check passed (files=11/11, exports=251/251, types=299/301, total=561/563); bun run hotspots:check passed with warnings only; bun run lint:core passed; bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:59:10.073Z, excerpt_hash=sha256:963b4173752f8db932a3763244db6f2b7b0cd28beb299f5e729c001fdd8646fd
    
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
### 2026-04-21T17:05:38.307Z — VERIFY — ok

By: CODER

Note: Verified legacy init UI cleanup. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run knip:check passed (files=11/11, exports=251/251, types=299/301, total=561/563); bun run hotspots:check passed with warnings only; bun run lint:core passed; bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:59:10.073Z, excerpt_hash=sha256:963b4173752f8db932a3763244db6f2b7b0cd28beb299f5e729c001fdd8646fd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
