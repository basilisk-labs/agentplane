---
id: "202604172108-3ZC8NA"
title: "Migrate config schema validation to Zod SSOT"
result_summary: "Merged via PR #426."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T21:09:07.205Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T21:20:05.760Z"
  updated_by: "CODER"
  note: "Validated Zod-first config contract migration: config runtime now parses through Zod, generated config schemas are synced, defaults and user-facing validation behavior remain covered by config/execution-profile/upgrade tests; AJV task artifact validation remains intentionally out of scope."
commit:
  hash: "988387b2163afc0fbf9bc7e34e82c8978787b73b"
  message: "refactor/schemas: Migrate config schema validation to Zod SSOT (3ZC8NA) (#426)"
comments:
  -
    author: "CODER"
    body: "Start: migrate the config runtime contract to a Zod-first schema, keep generated JSON schema artifacts intact, and stop before touching unrelated AJV task schemas."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #426 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T21:09:21.803Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the config runtime contract to a Zod-first schema, keep generated JSON schema artifacts intact, and stop before touching unrelated AJV task schemas."
  -
    type: "verify"
    at: "2026-04-17T21:20:05.760Z"
    author: "CODER"
    state: "ok"
    note: "Validated Zod-first config contract migration: config runtime now parses through Zod, generated config schemas are synced, defaults and user-facing validation behavior remain covered by config/execution-profile/upgrade tests; AJV task artifact validation remains intentionally out of scope."
  -
    type: "status"
    at: "2026-04-18T04:53:09.907Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #426 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T04:53:09.912Z"
doc_updated_by: "INTEGRATOR"
description: "Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults."
sections:
  Summary: |-
    Migrate config schema validation to Zod SSOT
    
    Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.
  Scope: |-
    - In scope: Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.
    - Out of scope: unrelated refactors not required for "Migrate config schema validation to Zod SSOT".
  Plan: |-
    1. Add Zod and JSON-schema generation support to @agentplaneorg/core without widening the task beyond config validation.
    2. Replace the AJV-backed config contract in packages/core/src/config/config.ts with a Zod schema that remains the single source for types, defaults, and runtime validation.
    3. Generate config.schema.json from the Zod schema and keep scripts/sync-schemas.mjs green without changing unrelated task artifact schemas yet.
    4. Run focused config/schema checks plus repo gates, then record remaining AJV surfaces as explicit follow-up rather than extending this PR.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T21:20:05.760Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated Zod-first config contract migration: config runtime now parses through Zod, generated config schemas are synced, defaults and user-facing validation behavior remain covered by config/execution-profile/upgrade tests; AJV task artifact validation remains intentionally out of scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T21:09:21.815Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate config schema validation to Zod SSOT

Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.

## Scope

- In scope: Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.
- Out of scope: unrelated refactors not required for "Migrate config schema validation to Zod SSOT".

## Plan

1. Add Zod and JSON-schema generation support to @agentplaneorg/core without widening the task beyond config validation.
2. Replace the AJV-backed config contract in packages/core/src/config/config.ts with a Zod schema that remains the single source for types, defaults, and runtime validation.
3. Generate config.schema.json from the Zod schema and keep scripts/sync-schemas.mjs green without changing unrelated task artifact schemas yet.
4. Run focused config/schema checks plus repo gates, then record remaining AJV surfaces as explicit follow-up rather than extending this PR.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T21:20:05.760Z — VERIFY — ok

By: CODER

Note: Validated Zod-first config contract migration: config runtime now parses through Zod, generated config schemas are synced, defaults and user-facing validation behavior remain covered by config/execution-profile/upgrade tests; AJV task artifact validation remains intentionally out of scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T21:09:21.815Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
