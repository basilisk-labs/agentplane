---
id: "202604170608-Z0NB6Z"
title: "Rebuild recipes as vendored project packages"
result_summary: "Completed the vendored project-recipes refactor umbrella."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-04-17T06:09:06.235Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T06:40:28.659Z"
  updated_by: "TESTER"
  note: "Vendor-based recipes now use global cache only for install/import and project-local vendored packages as runtime authority. Verified on rebuilt repo-local runtime with typecheck and targeted CLI/runtime test suite passing."
commit:
  hash: "87ce44c48a6bbb21ed03773a975bea7b50ad907e"
  message: "✅ NRV3V2 close: Merged via PR #372. (202604170648-NRV3V2) [docs,recipes] (#373)"
comments:
  -
    author: "CODER"
    body: "Start: split recipes into global cache plus vendored project packages, replace config-based active authority with project registry, and move runtime compilation onto project-local recipe overlays and assets only."
  -
    author: "INTEGRATOR"
    body: "Verified: the vendor-based recipes refactor stack is fully merged and closed on main."
events:
  -
    type: "status"
    at: "2026-04-17T06:09:37.496Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split recipes into global cache plus vendored project packages, replace config-based active authority with project registry, and move runtime compilation onto project-local recipe overlays and assets only."
  -
    type: "verify"
    at: "2026-04-17T06:40:28.659Z"
    author: "TESTER"
    state: "ok"
    note: "Vendor-based recipes now use global cache only for install/import and project-local vendored packages as runtime authority. Verified on rebuilt repo-local runtime with typecheck and targeted CLI/runtime test suite passing."
  -
    type: "status"
    at: "2026-04-17T10:41:17.264Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: the vendor-based recipes refactor stack is fully merged and closed on main."
doc_version: 3
doc_updated_at: "2026-04-17T10:41:17.264Z"
doc_updated_by: "INTEGRATOR"
description: "Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority."
sections:
  Summary: |-
    Rebuild recipes as vendored project packages
    
    Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
  Scope: |-
    - In scope: Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
    - Out of scope: unrelated refactors not required for "Rebuild recipes as vendored project packages".
  Plan: "1. Split recipes storage into global cache and project vendor store, with install/list/info semantics reading from cache only. 2. Introduce project-local recipes registry as the single authority for vendored packages and active overlays, then reuse one materialization service for init and recipes add. 3. Move runtime compilation to vendored project-local recipes only, compile overlay bundle plus namespaced asset registry, and remove scenario-centric authority from the recipes domain. 4. Update CLI/tests/docs for vendor-based flow, then run focused recipes/runtime/init verification before PR handoff."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T06:40:28.659Z — VERIFY — ok
    
    By: TESTER
    
    Note: Vendor-based recipes now use global cache only for install/import and project-local vendored packages as runtime authority. Verified on rebuilt repo-local runtime with typecheck and targeted CLI/runtime test suite passing.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T06:09:37.506Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Repo-local lifecycle commands initially failed because the framework checkout runtime was stale after export-surface changes in @agentplaneorg/recipes.
      Impact: Task verification could not be recorded until the repo-local binary and dist outputs were rebuilt against the current source tree.
      Resolution: Ran bun run framework:dev:bootstrap, revalidated the repo-local runtime with runtime explain, then reran typecheck and the targeted CLI/runtime test suite before recording verification.
id_source: "generated"
---
## Summary

Rebuild recipes as vendored project packages

Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.

## Scope

- In scope: Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
- Out of scope: unrelated refactors not required for "Rebuild recipes as vendored project packages".

## Plan

1. Split recipes storage into global cache and project vendor store, with install/list/info semantics reading from cache only. 2. Introduce project-local recipes registry as the single authority for vendored packages and active overlays, then reuse one materialization service for init and recipes add. 3. Move runtime compilation to vendored project-local recipes only, compile overlay bundle plus namespaced asset registry, and remove scenario-centric authority from the recipes domain. 4. Update CLI/tests/docs for vendor-based flow, then run focused recipes/runtime/init verification before PR handoff.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T06:40:28.659Z — VERIFY — ok

By: TESTER

Note: Vendor-based recipes now use global cache only for install/import and project-local vendored packages as runtime authority. Verified on rebuilt repo-local runtime with typecheck and targeted CLI/runtime test suite passing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T06:09:37.506Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Repo-local lifecycle commands initially failed because the framework checkout runtime was stale after export-surface changes in @agentplaneorg/recipes.
  Impact: Task verification could not be recorded until the repo-local binary and dist outputs were rebuilt against the current source tree.
  Resolution: Ran bun run framework:dev:bootstrap, revalidated the repo-local runtime with runtime explain, then reran typecheck and the targeted CLI/runtime test suite before recording verification.
