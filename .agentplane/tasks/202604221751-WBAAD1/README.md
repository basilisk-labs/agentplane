---
id: "202604221751-WBAAD1"
title: "Migrate legacy recipe cache scenarios during init"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "recipes"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T17:51:09.740Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T17:56:26.116Z"
  updated_by: "CODER"
  note: "Verified legacy cached recipe migration during init."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing init recipe cache migration for legacy cached scenario descriptors that omit file metadata, with persistence and release-path regression coverage."
events:
  -
    type: "status"
    at: "2026-04-22T17:51:10.139Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing init recipe cache migration for legacy cached scenario descriptors that omit file metadata, with persistence and release-path regression coverage."
  -
    type: "verify"
    at: "2026-04-22T17:56:26.116Z"
    author: "CODER"
    state: "ok"
    note: "Verified legacy cached recipe migration during init."
doc_version: 3
doc_updated_at: "2026-04-22T17:56:26.123Z"
doc_updated_by: "CODER"
description: "Fix agentplane init for legacy cached recipe scenarios that omit file metadata by normalizing and persisting old recipe cache entries instead of aborting init."
sections:
  Summary: |-
    Migrate legacy recipe cache scenarios during init
    
    Fix agentplane init for legacy cached recipe scenarios that omit file metadata by normalizing and persisting old recipe cache entries instead of aborting init.
  Scope: |-
    - In scope: Fix agentplane init for legacy cached recipe scenarios that omit file metadata by normalizing and persisting old recipe cache entries instead of aborting init.
    - Out of scope: unrelated refactors not required for "Migrate legacy recipe cache scenarios during init".
  Plan: |-
    1. Inspect recipe cache read/write flow and current manifest v1 normalization.
    2. Add legacy v1 scenario file fallback using a deterministic scenario path derived from the normalized scenario id.
    3. Persist migrated cached recipe manifests back to recipes.json when old cache entries are normalized.
    4. Add regression coverage for a minimal legacy scenario with no file field and for cache rewrite behavior.
    5. Run targeted recipes/init/critical tests and release parity before commit.
  Verify Steps: |-
    1. Review the requested outcome for "Migrate legacy recipe cache scenarios during init". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T17:56:26.116Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified legacy cached recipe migration during init.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T17:51:10.145Z, excerpt_hash=sha256:ce1ebdcedf07b116a673f860cb91f6ca4e0c7daa010556f752078c300044ea2f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Legacy schema_version=1 cached recipe scenarios without file now normalize to scenarios/<scenario-id>.json and init read path persists the normalized recipes.json.
      Impact: agentplane init no longer aborts on old cached recipe scenario descriptors missing modern fields.
      Resolution: Covered by recipes manifest unit test, init cache persistence test, full interactive init v2 test, critical init exit-code test, package typechecks, agentplane build, release parity, doctor, and policy routing.
id_source: "generated"
---
## Summary

Migrate legacy recipe cache scenarios during init

Fix agentplane init for legacy cached recipe scenarios that omit file metadata by normalizing and persisting old recipe cache entries instead of aborting init.

## Scope

- In scope: Fix agentplane init for legacy cached recipe scenarios that omit file metadata by normalizing and persisting old recipe cache entries instead of aborting init.
- Out of scope: unrelated refactors not required for "Migrate legacy recipe cache scenarios during init".

## Plan

1. Inspect recipe cache read/write flow and current manifest v1 normalization.
2. Add legacy v1 scenario file fallback using a deterministic scenario path derived from the normalized scenario id.
3. Persist migrated cached recipe manifests back to recipes.json when old cache entries are normalized.
4. Add regression coverage for a minimal legacy scenario with no file field and for cache rewrite behavior.
5. Run targeted recipes/init/critical tests and release parity before commit.

## Verify Steps

1. Review the requested outcome for "Migrate legacy recipe cache scenarios during init". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T17:56:26.116Z — VERIFY — ok

By: CODER

Note: Verified legacy cached recipe migration during init.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T17:51:10.145Z, excerpt_hash=sha256:ce1ebdcedf07b116a673f860cb91f6ca4e0c7daa010556f752078c300044ea2f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Legacy schema_version=1 cached recipe scenarios without file now normalize to scenarios/<scenario-id>.json and init read path persists the normalized recipes.json.
  Impact: agentplane init no longer aborts on old cached recipe scenario descriptors missing modern fields.
  Resolution: Covered by recipes manifest unit test, init cache persistence test, full interactive init v2 test, critical init exit-code test, package typechecks, agentplane build, release parity, doctor, and policy routing.
