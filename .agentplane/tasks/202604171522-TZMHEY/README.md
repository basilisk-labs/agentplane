---
id: "202604171522-TZMHEY"
title: "Refactor command catalog dispatch metadata into needs union"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:23:15.840Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T15:31:02.263Z"
  updated_by: "CODER"
  note: "Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace repeated command-catalog dispatch booleans with a single needs union and keep dispatch behavior unchanged."
events:
  -
    type: "status"
    at: "2026-04-17T15:23:32.476Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace repeated command-catalog dispatch booleans with a single needs union and keep dispatch behavior unchanged."
  -
    type: "verify"
    at: "2026-04-17T15:31:02.263Z"
    author: "CODER"
    state: "ok"
    note: "Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-17T15:31:02.266Z"
doc_updated_by: "CODER"
description: "Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts."
sections:
  Summary: |-
    Refactor command catalog dispatch metadata into needs union
    
    Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
  Scope: |-
    - In scope: Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
    - Out of scope: unrelated refactors not required for "Refactor command catalog dispatch metadata into needs union".
  Plan: |-
    1. Introduce a typed needs union and declareCommand helper in command-catalog/shared.ts while keeping entry() as a compatibility wrapper.
    2. Migrate command-catalog modules from repeated boolean metadata to the new needs contract without changing command ids, loaders, or invocation handling.
    3. Update catalog tests to assert the normalized dispatch metadata and run focused verification for command-catalog lookups plus typecheck.
  Verify Steps: |-
    1. Inspect packages/agentplane/src/cli/run-cli/command-catalog/shared.ts and touched catalog modules. Expected: repeated needsProject/needsLoadedConfig/needsTaskContext metadata is replaced by a single declared needs contract, and dispatch normalization still yields the same booleans for existing commands.
    2. Run bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts. Expected: longest-prefix matching, direct-child discovery, and dispatch metadata assertions stay green.
    3. Run bun run typecheck. Expected: the new helper and migrated catalog modules typecheck without changing command loader signatures or invocation contracts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T15:31:02.263Z — VERIFY — ok
    
    By: CODER
    
    Note: Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:23:32.482Z, excerpt_hash=sha256:b8a85ab7c63f26b58ec08ba909f2ef57a2cd9edc12a98a5be0c0cfa093a74902
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor command catalog dispatch metadata into needs union

Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.

## Scope

- In scope: Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
- Out of scope: unrelated refactors not required for "Refactor command catalog dispatch metadata into needs union".

## Plan

1. Introduce a typed needs union and declareCommand helper in command-catalog/shared.ts while keeping entry() as a compatibility wrapper.
2. Migrate command-catalog modules from repeated boolean metadata to the new needs contract without changing command ids, loaders, or invocation handling.
3. Update catalog tests to assert the normalized dispatch metadata and run focused verification for command-catalog lookups plus typecheck.

## Verify Steps

1. Inspect packages/agentplane/src/cli/run-cli/command-catalog/shared.ts and touched catalog modules. Expected: repeated needsProject/needsLoadedConfig/needsTaskContext metadata is replaced by a single declared needs contract, and dispatch normalization still yields the same booleans for existing commands.
2. Run bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts. Expected: longest-prefix matching, direct-child discovery, and dispatch metadata assertions stay green.
3. Run bun run typecheck. Expected: the new helper and migrated catalog modules typecheck without changing command loader signatures or invocation contracts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T15:31:02.263Z — VERIFY — ok

By: CODER

Note: Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:23:32.482Z, excerpt_hash=sha256:b8a85ab7c63f26b58ec08ba909f2ef57a2cd9edc12a98a5be0c0cfa093a74902

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
