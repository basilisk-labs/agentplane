---
id: "202604170648-NRV3V2"
title: "Refresh recipes tests and documentation for vendor flow"
result_summary: "Merged via PR #372."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T06:48:45.754Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T09:53:21.438Z"
  updated_by: "CODER"
  note: "Aligned recipe docs, help text, and generated CLI reference to the cache -> vendor -> project-only runtime model."
commit:
  hash: "0c83bcb41496aba04de62215139f6dd2e1cd666d"
  message: "docs/recipes: Refresh recipes tests and documentation for vendor flow (NRV3V2) (#372)"
comments:
  -
    author: "CODER"
    body: "Start: refresh recipes docs, help text, and remaining tests to match cache -> vendor -> project-only runtime behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #372 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T09:44:29.272Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh recipes docs, help text, and remaining tests to match cache -> vendor -> project-only runtime behavior."
  -
    type: "verify"
    at: "2026-04-17T09:53:21.438Z"
    author: "CODER"
    state: "ok"
    note: "Aligned recipe docs, help text, and generated CLI reference to the cache -> vendor -> project-only runtime model."
  -
    type: "status"
    at: "2026-04-17T10:36:29.375Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #372 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T10:36:29.380Z"
doc_updated_by: "INTEGRATOR"
description: "Update automated coverage, help text, and docs to reflect cache -> vendor -> project-only runtime recipes behavior."
sections:
  Summary: |-
    Refresh recipes tests and documentation for vendor flow
    
    Update automated coverage, help text, and docs to reflect cache -> vendor -> project-only runtime recipes behavior.
  Scope: |-
    - In scope: Update automated coverage, help text, and docs to reflect cache -> vendor -> project-only runtime recipes behavior.
    - Out of scope: unrelated refactors not required for "Refresh recipes tests and documentation for vendor flow".
  Plan: "1. Update tests and snapshots for the vendor-based recipes lifecycle. 2. Refresh user-facing docs and help text to describe cache -> vendor -> project-only runtime semantics. 3. Verify the updated coverage matches the final CLI surface."
  Verify Steps: |-
    1. Review the requested outcome for "Refresh recipes tests and documentation for vendor flow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T09:53:21.438Z — VERIFY — ok
    
    By: CODER
    
    Note: Aligned recipe docs, help text, and generated CLI reference to the cache -> vendor -> project-only runtime model.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:44:29.286Z, excerpt_hash=sha256:563298da73b9bb0ffc7e1422548ac4de9fa1187c34ac29acd4a1c4fd767e4e44
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The weakest link was surface drift: user docs, generated CLI help, and embedded orchestrator guidance still described bundled recipes and top-level scenario commands after the runtime had already moved to vendor-based recipes.
      Impact: That drift would send users through obsolete commands and hide the real authority split between global cache and project-local vendored recipes.
      Resolution: Updated command specs, regenerated the CLI reference, refreshed docs and orchestrator guidance, and verified the help/init/recipes surfaces against the current command registry.
id_source: "generated"
---
## Summary

Refresh recipes tests and documentation for vendor flow

Update automated coverage, help text, and docs to reflect cache -> vendor -> project-only runtime recipes behavior.

## Scope

- In scope: Update automated coverage, help text, and docs to reflect cache -> vendor -> project-only runtime recipes behavior.
- Out of scope: unrelated refactors not required for "Refresh recipes tests and documentation for vendor flow".

## Plan

1. Update tests and snapshots for the vendor-based recipes lifecycle. 2. Refresh user-facing docs and help text to describe cache -> vendor -> project-only runtime semantics. 3. Verify the updated coverage matches the final CLI surface.

## Verify Steps

1. Review the requested outcome for "Refresh recipes tests and documentation for vendor flow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T09:53:21.438Z — VERIFY — ok

By: CODER

Note: Aligned recipe docs, help text, and generated CLI reference to the cache -> vendor -> project-only runtime model.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:44:29.286Z, excerpt_hash=sha256:563298da73b9bb0ffc7e1422548ac4de9fa1187c34ac29acd4a1c4fd767e4e44

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The weakest link was surface drift: user docs, generated CLI help, and embedded orchestrator guidance still described bundled recipes and top-level scenario commands after the runtime had already moved to vendor-based recipes.
  Impact: That drift would send users through obsolete commands and hide the real authority split between global cache and project-local vendored recipes.
  Resolution: Updated command specs, regenerated the CLI reference, refreshed docs and orchestrator guidance, and verified the help/init/recipes surfaces against the current command registry.
