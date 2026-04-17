---
id: "202604170905-XSJXC0"
title: "Add vendored recipe provenance and safe update policy"
result_summary: "Added vendored recipe provenance and safe update policy."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T09:05:26.088Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T09:25:53.506Z"
  updated_by: "CODER"
  note: "Added project recipe provenance, vendored state inspection, and safe update/detach flows."
commit:
  hash: "e67fe17e23810763a8ad858e126113595c2b2f82"
  message: "📝 XSJXC0 task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: add vendored recipe provenance, dirty/diverged state detection, and safe update/detach flows without widening beyond project-local recipe maintenance."
  -
    author: "INTEGRATOR"
    body: "Verified: vendored recipe provenance and guarded update flows are merged and recorded on main."
events:
  -
    type: "status"
    at: "2026-04-17T09:06:26.672Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add vendored recipe provenance, dirty/diverged state detection, and safe update/detach flows without widening beyond project-local recipe maintenance."
  -
    type: "verify"
    at: "2026-04-17T09:25:53.506Z"
    author: "CODER"
    state: "ok"
    note: "Added project recipe provenance, vendored state inspection, and safe update/detach flows."
  -
    type: "status"
    at: "2026-04-17T10:39:11.298Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: vendored recipe provenance and guarded update flows are merged and recorded on main."
doc_version: 3
doc_updated_at: "2026-04-17T10:39:11.298Z"
doc_updated_by: "INTEGRATOR"
description: "Add source provenance, dirty/diverged detection, and safe update/detach flows for vendored project recipes so updates never silently overwrite local edits."
sections:
  Summary: |-
    Add vendored recipe provenance and safe update policy
    
    Add source provenance, dirty/diverged detection, and safe update/detach flows for vendored project recipes so updates never silently overwrite local edits.
  Scope: |-
    - In scope: Add source provenance, dirty/diverged detection, and safe update/detach flows for vendored project recipes so updates never silently overwrite local edits.
    - Out of scope: unrelated refactors not required for "Add vendored recipe provenance and safe update policy".
  Plan: |-
    1. Extend project recipe registry entries with provenance and content-hash fields derived from the vendored package and cached source.
    2. Add project recipe state inspection that classifies vendored recipes as clean, modified, or diverged-from-cache without scanning unrelated directories.
    3. Introduce safe recipe maintenance commands for this model: update from cache and detach link->copy, refusing silent overwrite unless an explicit force path is used.
    4. Wire the new state into CLI output and focused tests so users can see update risk before mutating vendored recipes.
  Verify Steps: |-
    1. Review the requested outcome for "Add vendored recipe provenance and safe update policy". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T09:25:53.506Z — VERIFY — ok
    
    By: CODER
    
    Note: Added project recipe provenance, vendored state inspection, and safe update/detach flows.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:06:26.691Z, excerpt_hash=sha256:7b4f34ce8bdcbd47f7d7072ec9e53e8ba4c9d30cbbc6986e00b171823f27df10
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The weakest link was silent drift between cache and vendored recipes because project metadata was split between registry and per-package install files.
      Impact: Without explicit provenance and drift detection, update operations could overwrite local edits or leave linked recipes in a non-portable state.
      Resolution: Moved provenance into registry.json, removed project install metadata, added clean/modified/diverged state inspection, and introduced guarded recipes update/detach commands.
id_source: "generated"
---
## Summary

Add vendored recipe provenance and safe update policy

Add source provenance, dirty/diverged detection, and safe update/detach flows for vendored project recipes so updates never silently overwrite local edits.

## Scope

- In scope: Add source provenance, dirty/diverged detection, and safe update/detach flows for vendored project recipes so updates never silently overwrite local edits.
- Out of scope: unrelated refactors not required for "Add vendored recipe provenance and safe update policy".

## Plan

1. Extend project recipe registry entries with provenance and content-hash fields derived from the vendored package and cached source.
2. Add project recipe state inspection that classifies vendored recipes as clean, modified, or diverged-from-cache without scanning unrelated directories.
3. Introduce safe recipe maintenance commands for this model: update from cache and detach link->copy, refusing silent overwrite unless an explicit force path is used.
4. Wire the new state into CLI output and focused tests so users can see update risk before mutating vendored recipes.

## Verify Steps

1. Review the requested outcome for "Add vendored recipe provenance and safe update policy". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T09:25:53.506Z — VERIFY — ok

By: CODER

Note: Added project recipe provenance, vendored state inspection, and safe update/detach flows.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:06:26.691Z, excerpt_hash=sha256:7b4f34ce8bdcbd47f7d7072ec9e53e8ba4c9d30cbbc6986e00b171823f27df10

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The weakest link was silent drift between cache and vendored recipes because project metadata was split between registry and per-package install files.
  Impact: Without explicit provenance and drift detection, update operations could overwrite local edits or leave linked recipes in a non-portable state.
  Resolution: Moved provenance into registry.json, removed project install metadata, added clean/modified/diverged state inspection, and introduced guarded recipes update/detach commands.
