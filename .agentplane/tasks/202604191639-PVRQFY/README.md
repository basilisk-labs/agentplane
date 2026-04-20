---
id: "202604191639-PVRQFY"
title: "Publish typed describe wrappers from testkit"
result_summary: "Added describeWhenEnvPresent, describeWhenNotHook, and describeCritical to @agentplane/testkit, wired them through packages/agentplane/src/testing/index.ts, and migrated the current redmine live, release/upgrade hook-gated, and CLI critical suites. Verified with testkit build, focused Vitest coverage, and a repo-local framework bootstrap."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T17:48:16.866Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T17:48:27.019Z"
  updated_by: "CODER"
  note: "Published shared Vitest suite wrappers and migrated current hook/env/critical declarations."
commit:
  hash: "ad42ce78248112bf212a3907959b38777a1e8b77"
  message: "🧪 testkit: add shared vitest suite wrappers"
comments:
  -
    author: "CODER"
    body: "Start: introduce typed Vitest suite wrappers in testkit, wire them through the compatibility layer, and migrate current hook/env/critical suite declarations."
  -
    author: "CODER"
    body: "Verified: shared Vitest suite wrappers are published through testkit and the compatibility layer, and all current hook/env/critical consumers now use them."
events:
  -
    type: "status"
    at: "2026-04-19T17:48:18.223Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce typed Vitest suite wrappers in testkit, wire them through the compatibility layer, and migrate current hook/env/critical suite declarations."
  -
    type: "verify"
    at: "2026-04-19T17:48:27.019Z"
    author: "CODER"
    state: "ok"
    note: "Published shared Vitest suite wrappers and migrated current hook/env/critical declarations."
  -
    type: "status"
    at: "2026-04-19T17:48:58.340Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared Vitest suite wrappers are published through testkit and the compatibility layer, and all current hook/env/critical consumers now use them."
doc_version: 3
doc_updated_at: "2026-04-19T17:48:58.341Z"
doc_updated_by: "CODER"
description: "Epic E′. Move describeWhenEnvPresent, describeCritical, and describeWhenNotHook helpers into @agentplane/testkit with typed exports."
sections:
  Summary: |-
    Publish typed describe wrappers from testkit
    
    Epic E′. Move describeWhenEnvPresent, describeCritical, and describeWhenNotHook helpers into @agentplane/testkit with typed exports.
  Scope: |-
    - In scope: Epic E′. Move describeWhenEnvPresent, describeCritical, and describeWhenNotHook helpers into @agentplane/testkit with typed exports.
    - Out of scope: unrelated refactors not required for "Publish typed describe wrappers from testkit".
  Plan: "1. Add typed describeWhenEnvPresent, describeWhenNotHook, and describeCritical helpers to @agentplane/testkit with explicit semantics. 2. Export the helpers through the compatibility test surface used by agentplane tests. 3. Migrate the current inline hook/env/critical suite declarations to the shared helpers. 4. Validate the migrated suites with focused Vitest coverage and refresh the repo-local runtime if the compatibility surface changes."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T17:48:27.019Z — VERIFY — ok
    
    By: CODER
    
    Note: Published shared Vitest suite wrappers and migrated current hook/env/critical declarations.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:48:18.236Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added describeWhenEnvPresent, describeWhenNotHook, and describeCritical to @agentplane/testkit, exported them through the compatibility surface, and migrated the current redmine live, release/upgrade hook-gated, and CLI critical suites.
      Impact: Suite gating semantics now live in one reusable layer instead of being redefined ad hoc, which reduces drift and gives later test migrations a stable import surface.
      Resolution: Implemented typed wrappers in testkit, added explicit compatibility re-exports, rebuilt testkit, and validated all current consumers with focused Vitest coverage.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Publish typed describe wrappers from testkit

Epic E′. Move describeWhenEnvPresent, describeCritical, and describeWhenNotHook helpers into @agentplane/testkit with typed exports.

## Scope

- In scope: Epic E′. Move describeWhenEnvPresent, describeCritical, and describeWhenNotHook helpers into @agentplane/testkit with typed exports.
- Out of scope: unrelated refactors not required for "Publish typed describe wrappers from testkit".

## Plan

1. Add typed describeWhenEnvPresent, describeWhenNotHook, and describeCritical helpers to @agentplane/testkit with explicit semantics. 2. Export the helpers through the compatibility test surface used by agentplane tests. 3. Migrate the current inline hook/env/critical suite declarations to the shared helpers. 4. Validate the migrated suites with focused Vitest coverage and refresh the repo-local runtime if the compatibility surface changes.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T17:48:27.019Z — VERIFY — ok

By: CODER

Note: Published shared Vitest suite wrappers and migrated current hook/env/critical declarations.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:48:18.236Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added describeWhenEnvPresent, describeWhenNotHook, and describeCritical to @agentplane/testkit, exported them through the compatibility surface, and migrated the current redmine live, release/upgrade hook-gated, and CLI critical suites.
  Impact: Suite gating semantics now live in one reusable layer instead of being redefined ad hoc, which reduces drift and gives later test migrations a stable import surface.
  Resolution: Implemented typed wrappers in testkit, added explicit compatibility re-exports, rebuilt testkit, and validated all current consumers with focused Vitest coverage.
  Promotion: incident-candidate
  Fixability: external
