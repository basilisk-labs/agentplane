---
id: "202605021914-ADH1EE"
title: "Add release module recovery workflow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "recovery"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:15:20.373Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:36:11.293Z"
  updated_by: "CODER"
  note: "Verified: publish-distribution-module.yml accepts exact tag/SHA/module inputs and excludes npm publish; workflow lint and contract tests passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement exact-SHA distribution module recovery workflow as part of the approved modular release pipeline worktree; do not republish npm in this path."
events:
  -
    type: "status"
    at: "2026-05-02T19:34:41.317Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement exact-SHA distribution module recovery workflow as part of the approved modular release pipeline worktree; do not republish npm in this path."
  -
    type: "verify"
    at: "2026-05-02T19:36:11.293Z"
    author: "CODER"
    state: "ok"
    note: "Verified: publish-distribution-module.yml accepts exact tag/SHA/module inputs and excludes npm publish; workflow lint and contract tests passed."
doc_version: 3
doc_updated_at: "2026-05-02T19:36:11.300Z"
doc_updated_by: "CODER"
description: "Add a dispatchable recovery path that can rerun selected distribution modules for an exact release tag and SHA without republishing npm."
sections:
  Summary: |-
    Add release module recovery workflow
    
    Add a dispatchable recovery path that can rerun selected distribution modules for an exact release tag and SHA without republishing npm.
  Scope: |-
    - In scope: Add a dispatchable recovery path that can rerun selected distribution modules for an exact release tag and SHA without republishing npm.
    - Out of scope: unrelated refactors not required for "Add release module recovery workflow".
  Plan: "Plan: after publish modules and standalone installers are deterministic, add a workflow_dispatch recovery surface that reruns selected distribution modules for an exact tag/SHA from release-distribution.json without republishing npm; include result artifacts and duplicate-PR handling."
  Verify Steps: |-
    1. Review the requested outcome for "Add release module recovery workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:36:11.293Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: publish-distribution-module.yml accepts exact tag/SHA/module inputs and excludes npm publish; workflow lint and contract tests passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:34:41.317Z, excerpt_hash=sha256:f2651ccc32b4b154044e08db43b0464efa701e68e1e7eb83e1fb4f5c66da6dae
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add release module recovery workflow

Add a dispatchable recovery path that can rerun selected distribution modules for an exact release tag and SHA without republishing npm.

## Scope

- In scope: Add a dispatchable recovery path that can rerun selected distribution modules for an exact release tag and SHA without republishing npm.
- Out of scope: unrelated refactors not required for "Add release module recovery workflow".

## Plan

Plan: after publish modules and standalone installers are deterministic, add a workflow_dispatch recovery surface that reruns selected distribution modules for an exact tag/SHA from release-distribution.json without republishing npm; include result artifacts and duplicate-PR handling.

## Verify Steps

1. Review the requested outcome for "Add release module recovery workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:36:11.293Z — VERIFY — ok

By: CODER

Note: Verified: publish-distribution-module.yml accepts exact tag/SHA/module inputs and excludes npm publish; workflow lint and contract tests passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:34:41.317Z, excerpt_hash=sha256:f2651ccc32b4b154044e08db43b0464efa701e68e1e7eb83e1fb4f5c66da6dae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
