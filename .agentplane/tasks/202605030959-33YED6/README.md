---
id: "202605030959-33YED6"
title: "Add Bun executable release artifacts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bun"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T10:00:31.592Z"
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
doc_updated_at: "2026-05-03T11:07:06.742Z"
doc_updated_by: "PLANNER"
description: "Add Bun executable artifact generation to the release pipeline behind an explicit migration gate, preserving current standalone artifacts until verification proves parity."
sections:
  Summary: |-
    Add Bun executable release artifacts
    
    Add Bun executable artifact generation to the release pipeline behind an explicit migration gate, preserving current standalone artifacts until verification proves parity.
  Scope: |-
    - In scope: Add Bun executable artifact generation to the release pipeline behind an explicit migration gate, preserving current standalone artifacts until verification proves parity.
    - Out of scope: unrelated refactors not required for "Add Bun executable release artifacts".
  Plan: |-
    Plan:
    1. Add Bun executable artifact generation behind an explicit release/distribution gate while preserving existing standalone artifacts.
    2. Extend artifact manifest and checksum generation to represent Bun binaries without breaking npm, GHCR, installer, Homebrew, Scoop, or setup-action consumers.
    3. Add binary smoke tests and manifest parity checks for every generated platform.
    4. Publish only after compatibility spike acceptance is satisfied.
    Acceptance: release workflow can produce Bun executable artifacts reproducibly, with checksums and smoke evidence, without regressing current channels.
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
  Findings: "Blocked by 202605030959-G3XX2Y compatibility spike: Bun --compile can produce an executable, but the current CLI fails at startup because package-root resolution expects an npm/filesystem package layout and cannot resolve from Bun $bunfs. Do not add Bun executable release artifacts until a binary runtime contract exists for package metadata, assets, smoke tests, and rollback."
id_source: "generated"
---
## Summary

Add Bun executable release artifacts

Add Bun executable artifact generation to the release pipeline behind an explicit migration gate, preserving current standalone artifacts until verification proves parity.

## Scope

- In scope: Add Bun executable artifact generation to the release pipeline behind an explicit migration gate, preserving current standalone artifacts until verification proves parity.
- Out of scope: unrelated refactors not required for "Add Bun executable release artifacts".

## Plan

Plan:
1. Add Bun executable artifact generation behind an explicit release/distribution gate while preserving existing standalone artifacts.
2. Extend artifact manifest and checksum generation to represent Bun binaries without breaking npm, GHCR, installer, Homebrew, Scoop, or setup-action consumers.
3. Add binary smoke tests and manifest parity checks for every generated platform.
4. Publish only after compatibility spike acceptance is satisfied.
Acceptance: release workflow can produce Bun executable artifacts reproducibly, with checksums and smoke evidence, without regressing current channels.

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

Blocked by 202605030959-G3XX2Y compatibility spike: Bun --compile can produce an executable, but the current CLI fails at startup because package-root resolution expects an npm/filesystem package layout and cannot resolve from Bun $bunfs. Do not add Bun executable release artifacts until a binary runtime contract exists for package metadata, assets, smoke tests, and rollback.
