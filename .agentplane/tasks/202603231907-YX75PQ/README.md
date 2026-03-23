---
id: "202603231907-YX75PQ"
title: "Validate runner result manifests strictly"
result_summary: "runner: strict result manifest validation"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:08:15.918Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:18:56.606Z"
  updated_by: "CODER"
  note: "Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds."
commit:
  hash: "97f482199ca6d6e601ab70e0273582f7efa6a4c7"
  message: "✅ YX75PQ code: done"
comments:
  -
    author: "CODER"
    body: "Start: add strict validation for runner result.json manifests, make malformed manifests fail deterministically instead of being partially ignored, and cover the invalid-manifest path through adapter and CLI tests."
  -
    author: "CODER"
    body: "Verified: Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds."
events:
  -
    type: "status"
    at: "2026-03-23T19:08:26.437Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add strict validation for runner result.json manifests, make malformed manifests fail deterministically instead of being partially ignored, and cover the invalid-manifest path through adapter and CLI tests."
  -
    type: "verify"
    at: "2026-03-23T19:18:56.606Z"
    author: "CODER"
    state: "ok"
    note: "Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds."
  -
    type: "status"
    at: "2026-03-23T19:19:20.467Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds."
doc_version: 3
doc_updated_at: "2026-03-23T19:19:20.467Z"
doc_updated_by: "CODER"
description: "Add strict schema/version validation for runner result manifests, surface malformed result.json as typed runner failures, and cover codex/custom adapter behavior when manifests are invalid."
sections:
  Summary: |-
    Validate runner result manifests strictly
    
    Add strict schema/version validation for runner result manifests, surface malformed result.json as typed runner failures, and cover codex/custom adapter behavior when manifests are invalid.
  Scope: |-
    - In scope: Add strict schema/version validation for runner result manifests, surface malformed result.json as typed runner failures, and cover codex/custom adapter behavior when manifests are invalid.
    - Out of scope: unrelated refactors not required for "Validate runner result manifests strictly".
  Plan: |-
    1. Add strict parsing for runner result manifests, including schema_version enforcement and typed invalid-manifest failures.
    2. Teach custom and codex adapters to surface malformed result.json as deterministic runner failures instead of silently dropping fields.
    3. Cover valid, malformed, and incompatible manifest cases in adapter and CLI-level tests.
  Verify Steps: |-
    1. Run adapter tests for codex and custom runners with valid and malformed result.json payloads. Expected: valid manifests are applied, invalid manifests fail with a typed runtime error and preserved artifacts.
    2. Run CLI task-run integration for a runner that writes an invalid manifest. Expected: task run exits with runtime failure and task runner state records the failure deterministically.
    3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: manifest validation compiles cleanly across core and agentplane packages.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:18:56.606Z — VERIFY — ok
    
    By: CODER
    
    Note: Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:08:26.438Z, excerpt_hash=sha256:19da803c08a0376b31a60ea97db842f6b6da33341941574ba8f8cea3aedca29d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Validate runner result manifests strictly

Add strict schema/version validation for runner result manifests, surface malformed result.json as typed runner failures, and cover codex/custom adapter behavior when manifests are invalid.

## Scope

- In scope: Add strict schema/version validation for runner result manifests, surface malformed result.json as typed runner failures, and cover codex/custom adapter behavior when manifests are invalid.
- Out of scope: unrelated refactors not required for "Validate runner result manifests strictly".

## Plan

1. Add strict parsing for runner result manifests, including schema_version enforcement and typed invalid-manifest failures.
2. Teach custom and codex adapters to surface malformed result.json as deterministic runner failures instead of silently dropping fields.
3. Cover valid, malformed, and incompatible manifest cases in adapter and CLI-level tests.

## Verify Steps

1. Run adapter tests for codex and custom runners with valid and malformed result.json payloads. Expected: valid manifests are applied, invalid manifests fail with a typed runtime error and preserved artifacts.
2. Run CLI task-run integration for a runner that writes an invalid manifest. Expected: task run exits with runtime failure and task runner state records the failure deterministically.
3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: manifest validation compiles cleanly across core and agentplane packages.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:18:56.606Z — VERIFY — ok

By: CODER

Note: Added strict runner result manifest validation with typed invalid-manifest failures, preserved malformed payloads as artifacts, and verified custom/codex adapter plus CLI invalid-manifest paths through prettier, eslint, targeted tests, and source builds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:08:26.438Z, excerpt_hash=sha256:19da803c08a0376b31a60ea97db842f6b6da33341941574ba8f8cea3aedca29d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
