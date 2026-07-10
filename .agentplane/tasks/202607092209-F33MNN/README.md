---
id: "202607092209-F33MNN"
title: "Prepare and publish patch release v0.6.22"
status: "TODO"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202607092207-MS2B7B"
  - "202607092208-1J49NQ"
  - "202607092208-KSXT6H"
  - "202607092208-NGVXDD"
  - "202607092208-PC3904"
  - "202607092208-VQ05Q1"
  - "202607100021-S11TCN"
  - "202607100106-YP0PYE"
  - "202607100140-WGV79Y"
  - "202607100244-T9T7B2"
  - "202607100321-3WQPYW"
  - "202607100340-KW3B8P"
  - "202607100404-WPRBVK"
  - "202607100435-A932SP"
  - "202607100436-D7QB76"
  - "202607100945-T0215Q"
  - "202607101059-S3N0X5"
  - "202607101141-6T0H1E"
tags:
  - "patch-0.6.22"
  - "quality"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "Verify GitHub tag v0.6.22 and published package versions resolve to the merged main commit."
  - "ap release plan --patch"
  - "bun run ci:contract"
  - "bun run release:parity"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:58.003Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-09T22:09:48.294Z"
doc_updated_by: "PLANNER"
description: "Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity."
sections:
  Summary: |-
    Prepare and publish patch release v0.6.22

    Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.
  Scope: |-
    - In scope: Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.
    - Out of scope: unrelated refactors not required for "Prepare and publish patch release v0.6.22".
  Plan: |-
    1. Confirm every dependency is merged into protected main and the worktree is clean.
    2. Generate the v0.6.22 patch plan and release notes; resolve only release-blocking drift.
    3. Run release parity, contract CI, fast tests, and prepublish checks.
    4. Publish through the protected release workflow, then verify the GitHub tag, packages, and main commit agree.
  Verify Steps: |-
    1. Confirm tasks 202607092207-MS2B7B, 202607092208-VQ05Q1, 202607092208-1J49NQ, 202607092208-KSXT6H, 202607092208-NGVXDD, and 202607092208-PC3904 are merged and verified.
    2. Run `bun run release:parity`, `bun run ci:contract`, and `bun run test:fast`; all pass.
    3. Run `ap release plan --patch`; the next version is exactly v0.6.22 and the release plan contains the merged refactor scope.
    4. Execute the protected publish workflow with explicit network/publish approval.
    5. Verify tag v0.6.22, published package versions, release notes, and the merged main commit are consistent.
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

Prepare and publish patch release v0.6.22

Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.

## Scope

- In scope: Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.
- Out of scope: unrelated refactors not required for "Prepare and publish patch release v0.6.22".

## Plan

1. Confirm every dependency is merged into protected main and the worktree is clean.
2. Generate the v0.6.22 patch plan and release notes; resolve only release-blocking drift.
3. Run release parity, contract CI, fast tests, and prepublish checks.
4. Publish through the protected release workflow, then verify the GitHub tag, packages, and main commit agree.

## Verify Steps

1. Confirm tasks 202607092207-MS2B7B, 202607092208-VQ05Q1, 202607092208-1J49NQ, 202607092208-KSXT6H, 202607092208-NGVXDD, and 202607092208-PC3904 are merged and verified.
2. Run `bun run release:parity`, `bun run ci:contract`, and `bun run test:fast`; all pass.
3. Run `ap release plan --patch`; the next version is exactly v0.6.22 and the release plan contains the merged refactor scope.
4. Execute the protected publish workflow with explicit network/publish approval.
5. Verify tag v0.6.22, published package versions, release notes, and the merged main commit are consistent.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
