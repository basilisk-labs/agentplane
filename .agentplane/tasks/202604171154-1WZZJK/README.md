---
id: "202604171154-1WZZJK"
title: "Align package versions after v0.3.13 release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T12:24:49.870Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:34:35.820Z"
  updated_by: "CODER"
  note: "Verified recipes version parity and release availability checks after adding recipes package coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align recipes package version surfaces and release parity checks with the current 0.3.13 workspace."
events:
  -
    type: "status"
    at: "2026-04-17T12:25:09.913Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align recipes package version surfaces and release parity checks with the current 0.3.13 workspace."
  -
    type: "verify"
    at: "2026-04-17T12:29:28.176Z"
    author: "CODER"
    state: "ok"
    note: "Verified recipes version parity after 0.3.13 release."
  -
    type: "verify"
    at: "2026-04-17T12:34:35.820Z"
    author: "CODER"
    state: "ok"
    note: "Verified recipes version parity and release availability checks after adding recipes package coverage."
doc_version: 3
doc_updated_at: "2026-04-17T12:34:35.825Z"
doc_updated_by: "CODER"
description: "Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version."
sections:
  Summary: |-
    Align package versions after v0.3.13 release
    
    Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.
  Scope: |-
    - In scope: Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.
    - Out of scope: unrelated refactors not required for "Align package versions after v0.3.13 release".
  Plan: |-
    1. Update packages/recipes version surfaces to 0.3.13 in package metadata and exported version constants.
    2. Align @agentplaneorg/recipes dependency pins and regenerate generated package reference output.
    3. Add or tighten parity coverage so future release drift is caught automatically.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:29:28.176Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified recipes version parity after 0.3.13 release.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:25:09.921Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-17T12:34:35.820Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified recipes version parity and release availability checks after adding recipes package coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:29:28.182Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Updated recipes package metadata, dependency pins, docs reference, and release parity checks to include @agentplaneorg/recipes.
      Impact: Release hygiene no longer reports a false green while packages/recipes drifts from the workspace version.
      Resolution: Aligned version surfaces to 0.3.13 and extended the parity checker plus tests to enforce recipes parity going forward.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Aligned recipes version metadata, dependency pins, lockfile, and release check scripts so both parity and npm availability treat @agentplaneorg/recipes as a first-class release package.
      Impact: The release guard no longer misses recipes drift and no longer fails on incomplete synthetic workspaces once recipes participate in release checks.
      Resolution: Updated release parity and npm availability scripts plus tests, then re-ran focused release checks.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Align package versions after v0.3.13 release

Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.

## Scope

- In scope: Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.
- Out of scope: unrelated refactors not required for "Align package versions after v0.3.13 release".

## Plan

1. Update packages/recipes version surfaces to 0.3.13 in package metadata and exported version constants.
2. Align @agentplaneorg/recipes dependency pins and regenerate generated package reference output.
3. Add or tighten parity coverage so future release drift is caught automatically.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:29:28.176Z — VERIFY — ok

By: CODER

Note: Verified recipes version parity after 0.3.13 release.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:25:09.921Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-17T12:34:35.820Z — VERIFY — ok

By: CODER

Note: Verified recipes version parity and release availability checks after adding recipes package coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:29:28.182Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Updated recipes package metadata, dependency pins, docs reference, and release parity checks to include @agentplaneorg/recipes.
  Impact: Release hygiene no longer reports a false green while packages/recipes drifts from the workspace version.
  Resolution: Aligned version surfaces to 0.3.13 and extended the parity checker plus tests to enforce recipes parity going forward.
  Promotion: incident-candidate
  Fixability: external

- Observation: Aligned recipes version metadata, dependency pins, lockfile, and release check scripts so both parity and npm availability treat @agentplaneorg/recipes as a first-class release package.
  Impact: The release guard no longer misses recipes drift and no longer fails on incomplete synthetic workspaces once recipes participate in release checks.
  Resolution: Updated release parity and npm availability scripts plus tests, then re-ran focused release checks.
  Promotion: incident-candidate
  Fixability: external
