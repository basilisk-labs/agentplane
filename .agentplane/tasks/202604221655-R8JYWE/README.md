---
id: "202604221655-R8JYWE"
title: "Release v0.3.20 init legacy scenario hotfix"
result_summary: "Published v0.3.20 patch release for init legacy scenario compatibility and original init logo restoration."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T16:55:35.486Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T17:34:16.534Z"
  updated_by: "CODER"
  note: "Release verification passed: PR #505 merged to main, remote tag v0.3.20 points at f8bb47a8, Publish to npm succeeded, npm registry reports agentplane/core/recipes 0.3.20, and installed npm package smoke init with legacy recipes cache exited 0."
commit:
  hash: "f8bb47a8001d4867a9c35374f733f243b1004aac"
  message: "Merge pull request #505 from basilisk-labs/codex/release-v0.3.20"
comments:
  -
    author: "CODER"
    body: "Start: releasing v0.3.20 from current main with the merged init legacy scenario hotfix, restored init logo, and release-path smoke coverage."
  -
    author: "CODER"
    body: "Verified: v0.3.20 is merged on main, tagged at f8bb47a8, published to npm, and independently smoke-tested from the npm package with a legacy recipe cache."
events:
  -
    type: "status"
    at: "2026-04-22T16:55:37.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: releasing v0.3.20 from current main with the merged init legacy scenario hotfix, restored init logo, and release-path smoke coverage."
  -
    type: "verify"
    at: "2026-04-22T17:34:16.534Z"
    author: "CODER"
    state: "ok"
    note: "Release verification passed: PR #505 merged to main, remote tag v0.3.20 points at f8bb47a8, Publish to npm succeeded, npm registry reports agentplane/core/recipes 0.3.20, and installed npm package smoke init with legacy recipes cache exited 0."
  -
    type: "status"
    at: "2026-04-22T17:34:17.984Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.20 is merged on main, tagged at f8bb47a8, published to npm, and independently smoke-tested from the npm package with a legacy recipe cache."
doc_version: 3
doc_updated_at: "2026-04-22T17:34:17.986Z"
doc_updated_by: "CODER"
description: "Prepare and publish the next patch release containing the init legacy recipe scenario compatibility fix, restored original init logo, and release-path init smoke coverage."
sections:
  Summary: |-
    Release v0.3.20 init legacy scenario hotfix
    
    Prepare and publish the next patch release containing the init legacy recipe scenario compatibility fix, restored original init logo, and release-path init smoke coverage.
  Scope: |-
    - In scope: Prepare and publish the next patch release containing the init legacy recipe scenario compatibility fix, restored original init logo, and release-path init smoke coverage.
    - Out of scope: unrelated refactors not required for "Release v0.3.20 init legacy scenario hotfix".
  Plan: |-
    1. Create a release branch from current main and bump all package/workspace release metadata to v0.3.20.
    2. Generate/update release notes for the init legacy scenario hotfix.
    3. Run release verification: release parity, targeted init tests, critical init E2E, typechecks, and package build.
    4. Push release branch, open PR, wait hosted checks, merge into main.
    5. Create/push the v0.3.20 tag and verify npm publication/version visibility.
    6. Record verification evidence and close the release task.
  Verify Steps: |-
    1. Review the requested outcome for "Release v0.3.20 init legacy scenario hotfix". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T17:34:16.534Z — VERIFY — ok
    
    By: CODER
    
    Note: Release verification passed: PR #505 merged to main, remote tag v0.3.20 points at f8bb47a8, Publish to npm succeeded, npm registry reports agentplane/core/recipes 0.3.20, and installed npm package smoke init with legacy recipes cache exited 0.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:55:37.152Z, excerpt_hash=sha256:c970be9804bdc6877099cd4f2ebf318c2f7fbdd235a3f565752672847db1c2c6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release v0.3.20 init legacy scenario hotfix

Prepare and publish the next patch release containing the init legacy recipe scenario compatibility fix, restored original init logo, and release-path init smoke coverage.

## Scope

- In scope: Prepare and publish the next patch release containing the init legacy recipe scenario compatibility fix, restored original init logo, and release-path init smoke coverage.
- Out of scope: unrelated refactors not required for "Release v0.3.20 init legacy scenario hotfix".

## Plan

1. Create a release branch from current main and bump all package/workspace release metadata to v0.3.20.
2. Generate/update release notes for the init legacy scenario hotfix.
3. Run release verification: release parity, targeted init tests, critical init E2E, typechecks, and package build.
4. Push release branch, open PR, wait hosted checks, merge into main.
5. Create/push the v0.3.20 tag and verify npm publication/version visibility.
6. Record verification evidence and close the release task.

## Verify Steps

1. Review the requested outcome for "Release v0.3.20 init legacy scenario hotfix". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T17:34:16.534Z — VERIFY — ok

By: CODER

Note: Release verification passed: PR #505 merged to main, remote tag v0.3.20 points at f8bb47a8, Publish to npm succeeded, npm registry reports agentplane/core/recipes 0.3.20, and installed npm package smoke init with legacy recipes cache exited 0.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:55:37.152Z, excerpt_hash=sha256:c970be9804bdc6877099cd4f2ebf318c2f7fbdd235a3f565752672847db1c2c6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
