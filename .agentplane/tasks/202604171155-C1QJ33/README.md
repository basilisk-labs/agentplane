---
id: "202604171155-C1QJ33"
title: "Normalize recipes authority chain"
result_summary: "Merged via PR #386."
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
  updated_at: "2026-04-17T12:54:43.053Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:59:13.254Z"
  updated_by: "TESTER"
  note: "Verified: recipes authority now flows through registry.json and vendored manifests, while generated overlay and asset artifacts are validated derived state without a separate lock-file authority path."
commit:
  hash: "4e38c54668c613182482f8063aefd97f4ac0a6df"
  message: "recipes/workflow: Normalize recipes authority chain (C1QJ33) (#386)"
comments:
  -
    author: "CODER"
    body: "Start: normalize recipes authority to registry -> vendored manifests -> generated artifacts and remove the unused lock-file authority path."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #386 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T12:54:59.871Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize recipes authority to registry -> vendored manifests -> generated artifacts and remove the unused lock-file authority path."
  -
    type: "verify"
    at: "2026-04-17T12:59:13.254Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: recipes authority now flows through registry.json and vendored manifests, while generated overlay and asset artifacts are validated derived state without a separate lock-file authority path."
  -
    type: "status"
    at: "2026-04-17T14:36:17.799Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #386 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T14:36:17.805Z"
doc_updated_by: "INTEGRATOR"
description: "Decide and enforce the authority chain between registry.json, vendored manifests, generated artifacts, and recipes.lock.json so recipes have one consistent project-local truth model."
sections:
  Summary: |-
    Normalize recipes authority chain
    
    Decide and enforce the authority chain between registry.json, vendored manifests, generated artifacts, and recipes.lock.json so recipes have one consistent project-local truth model.
  Scope: |-
    - In scope: Decide and enforce the authority chain between registry.json, vendored manifests, generated artifacts, and recipes.lock.json so recipes have one consistent project-local truth model.
    - Out of scope: unrelated refactors not required for "Normalize recipes authority chain".
  Plan: |-
    1. Audit current recipes authority paths, including registry, vendored manifests, generated artifacts, and the lock file.
    2. Remove or reduce unused lock-file authority and align paths/types/help to a single project authority chain rooted in registry.json.
    3. Update compile/read paths and focused tests to enforce the normalized authority model.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:59:13.254Z — VERIFY — ok
    
    By: TESTER
    
    Note: Verified: recipes authority now flows through registry.json and vendored manifests, while generated overlay and asset artifacts are validated derived state without a separate lock-file authority path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:54:59.878Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Removed recipes.lock.json writes and route exports; added validation for generated overlay and asset registries on read.
      Impact: Registry remains the only project authority, and corrupted generated artifacts no longer act as implicit second sources of truth.
      Resolution: Targeted authority tests covered lock-file removal, generated artifact validation, vendoring, and runner prompt reads.
id_source: "generated"
---
## Summary

Normalize recipes authority chain

Decide and enforce the authority chain between registry.json, vendored manifests, generated artifacts, and recipes.lock.json so recipes have one consistent project-local truth model.

## Scope

- In scope: Decide and enforce the authority chain between registry.json, vendored manifests, generated artifacts, and recipes.lock.json so recipes have one consistent project-local truth model.
- Out of scope: unrelated refactors not required for "Normalize recipes authority chain".

## Plan

1. Audit current recipes authority paths, including registry, vendored manifests, generated artifacts, and the lock file.
2. Remove or reduce unused lock-file authority and align paths/types/help to a single project authority chain rooted in registry.json.
3. Update compile/read paths and focused tests to enforce the normalized authority model.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:59:13.254Z — VERIFY — ok

By: TESTER

Note: Verified: recipes authority now flows through registry.json and vendored manifests, while generated overlay and asset artifacts are validated derived state without a separate lock-file authority path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:54:59.878Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Removed recipes.lock.json writes and route exports; added validation for generated overlay and asset registries on read.
  Impact: Registry remains the only project authority, and corrupted generated artifacts no longer act as implicit second sources of truth.
  Resolution: Targeted authority tests covered lock-file removal, generated artifact validation, vendoring, and runner prompt reads.
