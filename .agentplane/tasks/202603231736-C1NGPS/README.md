---
id: "202603231736-C1NGPS"
title: "Generate config schema from runtime contract"
result_summary: "config: runtime-generated schema parity"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:28.424Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T18:02:00.543Z"
  updated_by: "CODER"
  note: "Moved config schema source into packages/core runtime, switched schema parity to generate from that source, and verified with schemas:check, config tests, source builds, and doctor."
commit:
  hash: "4bd5c8c4ff2e55e270576f8f236fb51472df12ef"
  message: "✅ C1NGPS code: done"
comments:
  -
    author: "CODER"
    body: "Start: replace manual config schema mirroring with a generated canonical schema flow so runtime contract and published JSON schema cannot drift independently."
  -
    author: "CODER"
    body: "Verified: Moved the config schema source into core runtime, made schemas:check generate both published JSON artifacts from that source, and confirmed parity with config tests, source builds, and doctor."
events:
  -
    type: "status"
    at: "2026-03-23T17:56:33.689Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace manual config schema mirroring with a generated canonical schema flow so runtime contract and published JSON schema cannot drift independently."
  -
    type: "verify"
    at: "2026-03-23T18:02:00.543Z"
    author: "CODER"
    state: "ok"
    note: "Moved config schema source into packages/core runtime, switched schema parity to generate from that source, and verified with schemas:check, config tests, source builds, and doctor."
  -
    type: "status"
    at: "2026-03-23T18:03:27.483Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Moved the config schema source into core runtime, made schemas:check generate both published JSON artifacts from that source, and confirmed parity with config tests, source builds, and doctor."
doc_version: 3
doc_updated_at: "2026-03-23T18:03:27.484Z"
doc_updated_by: "CODER"
description: "Remove manual config contract drift by introducing a generated canonical config schema flow and manifest-driven schema mirror sync for runtime packages."
sections:
  Summary: |-
    Generate config schema from runtime contract
    
    Remove manual config contract drift by introducing a generated canonical config schema flow and manifest-driven schema mirror sync for runtime packages.
  Scope: |-
    - In scope: Remove manual config contract drift by introducing a generated canonical config schema flow and manifest-driven schema mirror sync for runtime packages.
    - Out of scope: unrelated refactors not required for "Generate config schema from runtime contract".
  Plan: |-
    1. Move the config contract to a single canonical source and generate the JSON schema artifact from that source instead of editing schema and TS types independently.
    2. Replace the single hardcoded schema mirror script with a manifest-driven sync/check flow so additional mirrors cannot drift silently.
    3. Update schema/config tests and docs references so the generated schema path is enforced in CI and future runner config additions cannot regress push hooks.
  Verify Steps: |-
    1. Run the new schema generation/sync command. Expected: canonical config schema is regenerated deterministically and all declared mirrors are synchronized.
    2. Run `bun run schemas:check` and `bunx vitest run packages/core/src/config/config.test.ts`. Expected: schema parity and config validation stay green.
    3. Review the config contract source and generated schema diff. Expected: adding a new runner field changes one source of truth and generated artifacts only.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T18:02:00.543Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved config schema source into packages/core runtime, switched schema parity to generate from that source, and verified with schemas:check, config tests, source builds, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:56:33.692Z, excerpt_hash=sha256:6193753164e98e70a54b959ca996786d4529ad7ef5ae5ec8809910545531119b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate config schema from runtime contract

Remove manual config contract drift by introducing a generated canonical config schema flow and manifest-driven schema mirror sync for runtime packages.

## Scope

- In scope: Remove manual config contract drift by introducing a generated canonical config schema flow and manifest-driven schema mirror sync for runtime packages.
- Out of scope: unrelated refactors not required for "Generate config schema from runtime contract".

## Plan

1. Move the config contract to a single canonical source and generate the JSON schema artifact from that source instead of editing schema and TS types independently.
2. Replace the single hardcoded schema mirror script with a manifest-driven sync/check flow so additional mirrors cannot drift silently.
3. Update schema/config tests and docs references so the generated schema path is enforced in CI and future runner config additions cannot regress push hooks.

## Verify Steps

1. Run the new schema generation/sync command. Expected: canonical config schema is regenerated deterministically and all declared mirrors are synchronized.
2. Run `bun run schemas:check` and `bunx vitest run packages/core/src/config/config.test.ts`. Expected: schema parity and config validation stay green.
3. Review the config contract source and generated schema diff. Expected: adding a new runner field changes one source of truth and generated artifacts only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T18:02:00.543Z — VERIFY — ok

By: CODER

Note: Moved config schema source into packages/core runtime, switched schema parity to generate from that source, and verified with schemas:check, config tests, source builds, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:56:33.692Z, excerpt_hash=sha256:6193753164e98e70a54b959ca996786d4529ad7ef5ae5ec8809910545531119b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
