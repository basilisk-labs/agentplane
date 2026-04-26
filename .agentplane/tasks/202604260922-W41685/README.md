---
id: "202604260922-W41685"
title: "Migrate core root imports to subpaths"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "core"
  - "imports"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T09:22:49.288Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T09:24:46.558Z"
  updated_by: "CODER"
  note: "Migrated agentplane source imports away from @agentplaneorg/core root."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate bare core imports to subpath imports without changing behavior."
events:
  -
    type: "status"
    at: "2026-04-26T09:22:49.495Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate bare core imports to subpath imports without changing behavior."
  -
    type: "verify"
    at: "2026-04-26T09:24:46.558Z"
    author: "CODER"
    state: "ok"
    note: "Migrated agentplane source imports away from @agentplaneorg/core root."
doc_version: 3
doc_updated_at: "2026-04-26T09:24:46.561Z"
doc_updated_by: "CODER"
description: "Reduce bare @agentplaneorg/core imports in agentplane sources by replacing test/runtime imports with explicit core subpath imports."
sections:
  Summary: |-
    Migrate core root imports to subpaths
    
    Reduce bare @agentplaneorg/core imports in agentplane sources by replacing test/runtime imports with explicit core subpath imports.
  Scope: |-
    - In scope: Reduce bare @agentplaneorg/core imports in agentplane sources by replacing test/runtime imports with explicit core subpath imports.
    - Out of scope: unrelated refactors not required for "Migrate core root imports to subpaths".
  Plan: |-
    1. Replace bare @agentplaneorg/core imports in packages/agentplane/src with explicit subpaths for config, commit, and project symbols.
    2. Preserve runtime/test behavior by changing only import declarations.
    3. Verify with rg import count, typecheck, lint, and focused affected test batches.
  Verify Steps: |-
    1. Review the requested outcome for "Migrate core root imports to subpaths". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T09:24:46.558Z — VERIFY — ok
    
    By: CODER
    
    Note: Migrated agentplane source imports away from @agentplaneorg/core root.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:22:49.501Z, excerpt_hash=sha256:c54805ea4e0bc5fc9ca3208e9bb1841d551f6ec163ff2ea7136c85f167e8c76e
    
    Details:
    
    Checks passed: rg found zero bare @agentplaneorg/core imports under packages/agentplane/src; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; focused vitest batches passed (32/32 non-CLI, 52/52 run-cli).
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate core root imports to subpaths

Reduce bare @agentplaneorg/core imports in agentplane sources by replacing test/runtime imports with explicit core subpath imports.

## Scope

- In scope: Reduce bare @agentplaneorg/core imports in agentplane sources by replacing test/runtime imports with explicit core subpath imports.
- Out of scope: unrelated refactors not required for "Migrate core root imports to subpaths".

## Plan

1. Replace bare @agentplaneorg/core imports in packages/agentplane/src with explicit subpaths for config, commit, and project symbols.
2. Preserve runtime/test behavior by changing only import declarations.
3. Verify with rg import count, typecheck, lint, and focused affected test batches.

## Verify Steps

1. Review the requested outcome for "Migrate core root imports to subpaths". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T09:24:46.558Z — VERIFY — ok

By: CODER

Note: Migrated agentplane source imports away from @agentplaneorg/core root.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:22:49.501Z, excerpt_hash=sha256:c54805ea4e0bc5fc9ca3208e9bb1841d551f6ec163ff2ea7136c85f167e8c76e

Details:

Checks passed: rg found zero bare @agentplaneorg/core imports under packages/agentplane/src; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; focused vitest batches passed (32/32 non-CLI, 52/52 run-cli).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
