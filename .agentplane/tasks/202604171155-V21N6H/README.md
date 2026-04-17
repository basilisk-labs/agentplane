---
id: "202604171155-V21N6H"
title: "Deprecate public recipes scenario surface"
result_summary: "Merged via PR #384."
status: "DONE"
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
  updated_at: "2026-04-17T12:36:01.752Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:43:32.476Z"
  updated_by: "CODER"
  note: "Verified removal of the public recipes scenario CLI surface."
commit:
  hash: "e6b8c732614a5a235ab79e7f24b2fe752a98611d"
  message: "recipes/workflow: Deprecate public recipes scenario surface (V21N6H) (#384)"
comments:
  -
    author: "CODER"
    body: "Start: remove the public recipes scenario surface from CLI/help/docs while preserving recipe-owned scenario assets internally."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #384 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T12:36:39.826Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the public recipes scenario surface from CLI/help/docs while preserving recipe-owned scenario assets internally."
  -
    type: "verify"
    at: "2026-04-17T12:43:32.476Z"
    author: "CODER"
    state: "ok"
    note: "Verified removal of the public recipes scenario CLI surface."
  -
    type: "status"
    at: "2026-04-17T14:25:32.753Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #384 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T14:25:32.758Z"
doc_updated_by: "INTEGRATOR"
description: "Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model."
sections:
  Summary: |-
    Deprecate public recipes scenario surface
    
    Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.
  Scope: |-
    - In scope: Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.
    - Out of scope: unrelated refactors not required for "Deprecate public recipes scenario surface".
  Plan: |-
    1. Identify every public CLI/help/docs entry point that still exposes recipes scenario commands as a first-class domain.
    2. Remove those commands from the public command catalog and help/docs surfaces while preserving internal recipe-owned scenario assets.
    3. Update focused CLI/docs tests to assert the public scenario surface is gone and recipes guidance no longer positions it as the primary runtime model.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:43:32.476Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified removal of the public recipes scenario CLI surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:36:39.856Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Removed recipes scenario commands from the public command catalog, regenerated CLI/docs inventory, and updated user/developer guidance plus help/tests to treat scenario assets as recipe-owned internals.
      Impact: The public recipes model no longer presents a parallel scenario runtime alongside the overlay/vendor flow.
      Resolution: Regenerated CLI reference and recipes inventory, updated prompt assets, and reran focused command-catalog/help tests plus freshness checks.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Deprecate public recipes scenario surface

Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.

## Scope

- In scope: Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.
- Out of scope: unrelated refactors not required for "Deprecate public recipes scenario surface".

## Plan

1. Identify every public CLI/help/docs entry point that still exposes recipes scenario commands as a first-class domain.
2. Remove those commands from the public command catalog and help/docs surfaces while preserving internal recipe-owned scenario assets.
3. Update focused CLI/docs tests to assert the public scenario surface is gone and recipes guidance no longer positions it as the primary runtime model.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:43:32.476Z — VERIFY — ok

By: CODER

Note: Verified removal of the public recipes scenario CLI surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:36:39.856Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Removed recipes scenario commands from the public command catalog, regenerated CLI/docs inventory, and updated user/developer guidance plus help/tests to treat scenario assets as recipe-owned internals.
  Impact: The public recipes model no longer presents a parallel scenario runtime alongside the overlay/vendor flow.
  Resolution: Regenerated CLI reference and recipes inventory, updated prompt assets, and reran focused command-catalog/help tests plus freshness checks.
  Promotion: incident-candidate
  Fixability: external
