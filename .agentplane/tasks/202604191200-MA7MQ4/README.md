---
id: "202604191200-MA7MQ4"
title: "Add fail-fast preflight for release candidate route"
result_summary: "Merged via PR #479."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T12:31:53.146Z"
  updated_by: "CODER"
  note: "Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green."
commit:
  hash: "6b36f2c66be81c6f53586ec5ee0010cc0a8efa82"
  message: "release: Add fail-fast preflight for release candidate route (MA7MQ4) (#479)"
comments:
  -
    author: "CODER"
    body: "Start: add a fail-fast preflight for release candidate so clean-tree and release prerequisite failures stop before the heavy release validation route runs."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #479 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-19T12:26:00.567Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a fail-fast preflight for release candidate so clean-tree and release prerequisite failures stop before the heavy release validation route runs."
  -
    type: "verify"
    at: "2026-04-19T12:31:53.146Z"
    author: "CODER"
    state: "ok"
    note: "Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green."
  -
    type: "status"
    at: "2026-04-19T14:06:09.436Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #479 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-19T14:06:09.442Z"
doc_updated_by: "INTEGRATOR"
description: "Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode."
sections:
  Summary: |-
    Add fail-fast preflight for release candidate route
    
    Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.
  Scope: |-
    - In scope: Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.
    - Out of scope: unrelated refactors not required for "Add fail-fast preflight for release candidate route".
  Plan: |-
    1. Implement the change for "Add fail-fast preflight for release candidate route".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Add fail-fast preflight for release candidate route". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T12:31:53.146Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:26:00.578Z, excerpt_hash=sha256:de390c0c3e8fd3cd12d4556d8c2874653d976918b25252601a635dc309322cde
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add fail-fast preflight for release candidate route

Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.

## Scope

- In scope: Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.
- Out of scope: unrelated refactors not required for "Add fail-fast preflight for release candidate route".

## Plan

1. Implement the change for "Add fail-fast preflight for release candidate route".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Add fail-fast preflight for release candidate route". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T12:31:53.146Z — VERIFY — ok

By: CODER

Note: Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:26:00.578Z, excerpt_hash=sha256:de390c0c3e8fd3cd12d4556d8c2874653d976918b25252601a635dc309322cde

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
