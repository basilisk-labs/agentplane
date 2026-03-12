---
id: "202603121342-6T6R5F"
title: "Cleanup phase: split recipes command regression suite"
result_summary: "Removed the monolithic recipes command test bucket, extracted a shared recipes test harness, and updated workflow harness docs to the scenario-specific split suite."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T13:57:06.047Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T14:09:00.878Z"
  updated_by: "CODER"
  note: "OK: split recipes regression suite into catalog-install, list, scenario, and cache files; eslint on split files passed; vitest passed for 53 recipes/scenario tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed."
commit:
  hash: "7b6e1e7e506c179b448c81172518f57a1ebc58b6"
  message: "🚧 6T6R5F task: split recipes command regression suite"
comments:
  -
    author: "CODER"
    body: "Start: split the mixed recipes command regression suite into focused files for install/list/info, resolver/scenario, and cache/runtime behaviors while preserving recipes command assertions."
  -
    author: "CODER"
    body: "Verified: split recipes regression coverage into focused catalog-install, list, scenario, and cache suites; lint, targeted vitest, and both package builds all passed."
events:
  -
    type: "status"
    at: "2026-03-12T13:57:17.199Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed recipes command regression suite into focused files for install/list/info, resolver/scenario, and cache/runtime behaviors while preserving recipes command assertions."
  -
    type: "verify"
    at: "2026-03-12T14:09:00.878Z"
    author: "CODER"
    state: "ok"
    note: "OK: split recipes regression suite into catalog-install, list, scenario, and cache files; eslint on split files passed; vitest passed for 53 recipes/scenario tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed."
  -
    type: "status"
    at: "2026-03-12T14:09:01.108Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split recipes regression coverage into focused catalog-install, list, scenario, and cache suites; lint, targeted vitest, and both package builds all passed."
doc_version: 3
doc_updated_at: "2026-03-12T14:09:01.108Z"
doc_updated_by: "CODER"
description: "Split recipes.test.ts into focused suites for install/list/info surfaces, resolver/scenario behavior, and cache/runtime edges without changing recipes command assertions."
id_source: "generated"
---
## Summary

Cleanup phase: split recipes command regression suite

Split recipes.test.ts into focused suites for install/list/info surfaces, resolver/scenario behavior, and cache/runtime edges without changing recipes command assertions.

## Scope

- In scope: Split recipes.test.ts into focused suites for install/list/info surfaces, resolver/scenario behavior, and cache/runtime edges without changing recipes command assertions.
- Out of scope: unrelated refactors not required for "Cleanup phase: split recipes command regression suite".

## Plan

1. Map coherent recipes command domains inside the mixed regression suite: catalog/install surfaces, explain/info/list flows, resolver/scenario behavior, and cache/runtime edge cases.
2. Split the suite into focused files along those domains while keeping any recipes-specific helpers local to the recipes test family.
3. Update selectors or docs that assume the old single-file recipes suite.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run the new split recipes regression suites. Expected: install/list/info/explain, resolver/scenario, and cache/runtime recipes tests all pass.
2. Run lint for the split recipes files and any updated selector/doc references. Expected: no new lint violations.
3. Build the touched packages after the suite split. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T14:09:00.878Z — VERIFY — ok

By: CODER

Note: OK: split recipes regression suite into catalog-install, list, scenario, and cache files; eslint on split files passed; vitest passed for 53 recipes/scenario tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T14:08:05.318Z, excerpt_hash=sha256:04b9de51fa1e9e1d481a3923b0acdb01682a148690b9046aa3539936fb2cc70d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Extracted a shared recipes command harness into packages/agentplane/src/commands/recipes.test-helpers.ts and split the former mixed recipes regression bucket into catalog-install, list, scenario, and cache suites. Updated the workflow harness matrix to point at the scenario-specific split suite instead of the removed monolith.
