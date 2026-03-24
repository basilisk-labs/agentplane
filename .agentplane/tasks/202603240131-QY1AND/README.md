---
id: "202603240131-QY1AND"
title: "Narrow recipe run_profile to enforced or explicitly advisory fields"
result_summary: "Recipe run_profile now carries only execution-relevant fields; scenario metadata is resolved separately."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "runner"
  - "schema"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T01:51:15.017Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T01:55:06.539Z"
  updated_by: "CODER"
  note: "Resolver, recipe scenario, custom runner, and scenario CLI tests passed; run_profile is now limited to execution-relevant fields while scenario metadata stays on the resolved scenario surface."
commit:
  hash: "16d4c936bfe21a175d44c5180b5cc0a1d436ca0d"
  message: "✅ QY1AND code: done"
comments:
  -
    author: "CODER"
    body: "Start: narrow recipe run_profile to execution-relevant fields only, remove duplicated scenario metadata from resolver and adapter env propagation, and update fixtures plus tests to match the smaller contract."
  -
    author: "CODER"
    body: "Verified: Narrowed the recipe run_profile contract to execution-relevant fields only, moved duplicated scenario metadata back onto resolved scenario selections, trimmed runner env propagation and capability declarations to match, and reran resolver, scenario, custom runner, eslint, and source build checks to confirm the smaller contract stays consistent."
events:
  -
    type: "status"
    at: "2026-03-24T01:51:15.657Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow recipe run_profile to execution-relevant fields only, remove duplicated scenario metadata from resolver and adapter env propagation, and update fixtures plus tests to match the smaller contract."
  -
    type: "verify"
    at: "2026-03-24T01:55:06.539Z"
    author: "CODER"
    state: "ok"
    note: "Resolver, recipe scenario, custom runner, and scenario CLI tests passed; run_profile is now limited to execution-relevant fields while scenario metadata stays on the resolved scenario surface."
  -
    type: "status"
    at: "2026-03-24T01:55:10.872Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Narrowed the recipe run_profile contract to execution-relevant fields only, moved duplicated scenario metadata back onto resolved scenario selections, trimmed runner env propagation and capability declarations to match, and reran resolver, scenario, custom runner, eslint, and source build checks to confirm the smaller contract stays consistent."
doc_version: 3
doc_updated_at: "2026-03-24T01:55:10.872Z"
doc_updated_by: "CODER"
description: "Review the remaining recipe run_profile fields and keep only a contract that is either enforced by runtime or explicitly marked as advisory."
sections:
  Summary: |-
    Narrow recipe run_profile to enforced or explicitly advisory fields
    
    Review the remaining recipe run_profile fields and keep only a contract that is either enforced by runtime or explicitly marked as advisory.
  Scope: |-
    - In scope: Review the remaining recipe run_profile fields and keep only a contract that is either enforced by runtime or explicitly marked as advisory.
    - Out of scope: unrelated refactors not required for "Narrow recipe run_profile to enforced or explicitly advisory fields".
  Plan: "1. Audit the remaining recipe run_profile fields after the network removal. 2. Keep only fields that are enforced by runtime or explicitly marked advisory. 3. Update schema, resolver, fixtures, and tests to match the narrowed contract. 4. Verify with targeted tests and source builds. Sequence: execute after D2ZVZE."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm recipe run_profile now contains only enforced or explicitly advisory fields."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T01:55:06.539Z — VERIFY — ok
    
    By: CODER
    
    Note: Resolver, recipe scenario, custom runner, and scenario CLI tests passed; run_profile is now limited to execution-relevant fields while scenario metadata stays on the resolved scenario surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:51:15.658Z, excerpt_hash=sha256:a06e7c0b6cd0d8f6eeb10b336e055afcb95005980d0da3550c0cb5f2fe810d06
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Narrow recipe run_profile to enforced or explicitly advisory fields

Review the remaining recipe run_profile fields and keep only a contract that is either enforced by runtime or explicitly marked as advisory.

## Scope

- In scope: Review the remaining recipe run_profile fields and keep only a contract that is either enforced by runtime or explicitly marked as advisory.
- Out of scope: unrelated refactors not required for "Narrow recipe run_profile to enforced or explicitly advisory fields".

## Plan

1. Audit the remaining recipe run_profile fields after the network removal. 2. Keep only fields that are enforced by runtime or explicitly marked advisory. 3. Update schema, resolver, fixtures, and tests to match the narrowed contract. 4. Verify with targeted tests and source builds. Sequence: execute after D2ZVZE.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm recipe run_profile now contains only enforced or explicitly advisory fields.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T01:55:06.539Z — VERIFY — ok

By: CODER

Note: Resolver, recipe scenario, custom runner, and scenario CLI tests passed; run_profile is now limited to execution-relevant fields while scenario metadata stays on the resolved scenario surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:51:15.658Z, excerpt_hash=sha256:a06e7c0b6cd0d8f6eeb10b336e055afcb95005980d0da3550c0cb5f2fe810d06

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
