---
id: "202605030959-33YED6"
title: "Add Bun executable release artifacts"
result_summary: "Superseded by completed Bun binary release asset chain; primary implementation commit f85da16d5cdc."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-05-03T14:24:10.328Z"
  updated_by: "CODER"
  note: "Verified: superseded by 202605031118-4KRYEQ, which generated Bun executable release assets, and by follow-up Bun smoke/installer tasks merged to main."
commit:
  hash: "f85da16d5cdc4cc859d17721b7862ef317474563"
  message: "Merge pull request #807 from basilisk-labs/task/202605031118-4KRYEQ/bun-binary-release-assets"
comments:
  -
    author: "CODER"
    body: "Start: close stale Bun release artifact placeholder as superseded by completed Bun binary release asset tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: stale placeholder closed because Bun executable release assets are implemented in 202605031118-4KRYEQ and merged to main."
events:
  -
    type: "status"
    at: "2026-05-03T14:24:09.901Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: close stale Bun release artifact placeholder as superseded by completed Bun binary release asset tasks."
  -
    type: "verify"
    at: "2026-05-03T14:24:10.328Z"
    author: "CODER"
    state: "ok"
    note: "Verified: superseded by 202605031118-4KRYEQ, which generated Bun executable release assets, and by follow-up Bun smoke/installer tasks merged to main."
  -
    type: "status"
    at: "2026-05-03T14:24:10.781Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale placeholder closed because Bun executable release assets are implemented in 202605031118-4KRYEQ and merged to main."
doc_version: 3
doc_updated_at: "2026-05-03T14:24:10.782Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-03T14:24:10.328Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: superseded by 202605031118-4KRYEQ, which generated Bun executable release assets, and by follow-up Bun smoke/installer tasks merged to main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:24:09.901Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-05-03T14:24:10.328Z — VERIFY — ok

By: CODER

Note: Verified: superseded by 202605031118-4KRYEQ, which generated Bun executable release assets, and by follow-up Bun smoke/installer tasks merged to main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:24:09.901Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Blocked by 202605030959-G3XX2Y compatibility spike: Bun --compile can produce an executable, but the current CLI fails at startup because package-root resolution expects an npm/filesystem package layout and cannot resolve from Bun $bunfs. Do not add Bun executable release artifacts until a binary runtime contract exists for package metadata, assets, smoke tests, and rollback.
