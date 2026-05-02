---
id: "202605021914-Z2P2TS"
title: "Add standalone installer distribution path"
result_summary: "Standalone installer distribution path merged via PR #766."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "distribution"
  - "installer"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:15:14.203Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:36:10.313Z"
  updated_by: "CODER"
  note: "Verified: install.sh and install.ps1 now consume standalone release archives with SHA256SUMS verification and no node/npm requirement; standalone production install test passes with local workspace tarballs."
commit:
  hash: "93db085a628f25e32e4bbb669c8d0132f5f61c5a"
  message: "✅ N72MF3 close: Merged via PR #766. (202605021914-N72MF3) [ci,distribution,release] (#767)"
comments:
  -
    author: "CODER"
    body: "Start: Implement standalone installer distribution path as part of the approved modular release pipeline worktree; stop if installer scope expands beyond release assets."
  -
    author: "INTEGRATOR"
    body: "Verified: standalone installer distribution path merged via PR #766 and post-merge checks passed."
events:
  -
    type: "status"
    at: "2026-05-02T19:34:41.028Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement standalone installer distribution path as part of the approved modular release pipeline worktree; stop if installer scope expands beyond release assets."
  -
    type: "verify"
    at: "2026-05-02T19:36:10.313Z"
    author: "CODER"
    state: "ok"
    note: "Verified: install.sh and install.ps1 now consume standalone release archives with SHA256SUMS verification and no node/npm requirement; standalone production install test passes with local workspace tarballs."
  -
    type: "status"
    at: "2026-05-02T20:02:52.566Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: standalone installer distribution path merged via PR #766 and post-merge checks passed."
doc_version: 3
doc_updated_at: "2026-05-02T20:02:52.568Z"
doc_updated_by: "INTEGRATOR"
description: "Make install.sh and install.ps1 consume standalone bundled-runtime release assets instead of requiring user-provided node/npm."
sections:
  Summary: |-
    Add standalone installer distribution path

    Make install.sh and install.ps1 consume standalone bundled-runtime release assets instead of requiring user-provided node/npm.
  Scope: |-
    - In scope: Make install.sh and install.ps1 consume standalone bundled-runtime release assets instead of requiring user-provided node/npm.
    - Out of scope: unrelated refactors not required for "Add standalone installer distribution path".
  Plan: "Plan: after N72MF3 design is in place, update release distribution generation so install.sh and install.ps1 install standalone bundled-runtime assets, not npm tarballs; add/adjust tests for OS/arch selection, checksum validation, and no external node/npm requirement."
  Verify Steps: |-
    1. Review the requested outcome for "Add standalone installer distribution path". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:36:10.313Z — VERIFY — ok

    By: CODER

    Note: Verified: install.sh and install.ps1 now consume standalone release archives with SHA256SUMS verification and no node/npm requirement; standalone production install test passes with local workspace tarballs.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:34:41.028Z, excerpt_hash=sha256:25fdb3b0d57c1c948df8c8d927f4b1492778b0e7e22aa7a3a27b776a967fbac3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add standalone installer distribution path

Make install.sh and install.ps1 consume standalone bundled-runtime release assets instead of requiring user-provided node/npm.

## Scope

- In scope: Make install.sh and install.ps1 consume standalone bundled-runtime release assets instead of requiring user-provided node/npm.
- Out of scope: unrelated refactors not required for "Add standalone installer distribution path".

## Plan

Plan: after N72MF3 design is in place, update release distribution generation so install.sh and install.ps1 install standalone bundled-runtime assets, not npm tarballs; add/adjust tests for OS/arch selection, checksum validation, and no external node/npm requirement.

## Verify Steps

1. Review the requested outcome for "Add standalone installer distribution path". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:36:10.313Z — VERIFY — ok

By: CODER

Note: Verified: install.sh and install.ps1 now consume standalone release archives with SHA256SUMS verification and no node/npm requirement; standalone production install test passes with local workspace tarballs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:34:41.028Z, excerpt_hash=sha256:25fdb3b0d57c1c948df8c8d927f4b1492778b0e7e22aa7a3a27b776a967fbac3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
