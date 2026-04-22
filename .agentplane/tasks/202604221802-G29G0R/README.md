---
id: "202604221802-G29G0R"
title: "Publish v0.3.21 legacy init cache hotfix"
result_summary: "Published v0.3.21; verified GitHub Release, hosted publish workflow, npm package versions, and synchronized tag state."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "init"
  - "recipes"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T18:02:56.107Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T18:34:17.315Z"
  updated_by: "CODER"
  note: "Verified v0.3.21 release publication."
commit:
  hash: "5643a70096a20dc7dc30453dbc84b5cdbdc8f112"
  message: "Merge release v0.3.21"
comments:
  -
    author: "CODER"
    body: "Start: publishing v0.3.21 patch release for the init legacy recipe cache migration now merged to main."
  -
    author: "CODER"
    body: "Verified: v0.3.21 is published on GitHub and npm with the init legacy recipe cache migration fix."
events:
  -
    type: "status"
    at: "2026-04-22T18:02:56.505Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publishing v0.3.21 patch release for the init legacy recipe cache migration now merged to main."
  -
    type: "verify"
    at: "2026-04-22T18:34:17.315Z"
    author: "CODER"
    state: "ok"
    note: "Verified v0.3.21 release publication."
  -
    type: "status"
    at: "2026-04-22T18:34:17.908Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.21 is published on GitHub and npm with the init legacy recipe cache migration fix."
doc_version: 3
doc_updated_at: "2026-04-22T18:34:17.909Z"
doc_updated_by: "CODER"
description: "Publish the next patch release with the legacy recipe cache migration fix for agentplane init."
sections:
  Summary: |-
    Publish v0.3.21 legacy init cache hotfix
    
    Publish the next patch release with the legacy recipe cache migration fix for agentplane init.
  Scope: |-
    - In scope: Publish the next patch release with the legacy recipe cache migration fix for agentplane init.
    - Out of scope: unrelated refactors not required for "Publish v0.3.21 legacy init cache hotfix".
  Plan: |-
    1. Generate the patch release plan from current main and confirm it targets v0.3.21.
    2. Add release notes documenting the legacy cached scenario file migration and verification evidence.
    3. Apply the release: bump package versions, run release validation, create release commit and tag.
    4. Push the release commit and v0.3.21 tag through the guarded release path.
    5. Verify the published package/version path after release and close the task with evidence.
  Verify Steps: |-
    1. Review the requested outcome for "Publish v0.3.21 legacy init cache hotfix". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T18:34:17.315Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified v0.3.21 release publication.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T18:02:56.511Z, excerpt_hash=sha256:6f5a659df33068ca7aa47c6230a07b0b50da4e0eb981d2cc0738215ad4d09182
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: v0.3.21 is merged to main, remote tag v0.3.21 points at merge commit 5643a700, GitHub Release is published, hosted Publish to npm succeeded, and npm reports agentplane/core/recipes at 0.3.21.
      Impact: Users can install the patch containing the init legacy recipe cache migration fix.
      Resolution: Release PR #508 merged, tag synchronized locally with origin, npm versions verified with npm view, and release task is ready to close.
id_source: "generated"
---
## Summary

Publish v0.3.21 legacy init cache hotfix

Publish the next patch release with the legacy recipe cache migration fix for agentplane init.

## Scope

- In scope: Publish the next patch release with the legacy recipe cache migration fix for agentplane init.
- Out of scope: unrelated refactors not required for "Publish v0.3.21 legacy init cache hotfix".

## Plan

1. Generate the patch release plan from current main and confirm it targets v0.3.21.
2. Add release notes documenting the legacy cached scenario file migration and verification evidence.
3. Apply the release: bump package versions, run release validation, create release commit and tag.
4. Push the release commit and v0.3.21 tag through the guarded release path.
5. Verify the published package/version path after release and close the task with evidence.

## Verify Steps

1. Review the requested outcome for "Publish v0.3.21 legacy init cache hotfix". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T18:34:17.315Z — VERIFY — ok

By: CODER

Note: Verified v0.3.21 release publication.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T18:02:56.511Z, excerpt_hash=sha256:6f5a659df33068ca7aa47c6230a07b0b50da4e0eb981d2cc0738215ad4d09182

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: v0.3.21 is merged to main, remote tag v0.3.21 points at merge commit 5643a700, GitHub Release is published, hosted Publish to npm succeeded, and npm reports agentplane/core/recipes at 0.3.21.
  Impact: Users can install the patch containing the init legacy recipe cache migration fix.
  Resolution: Release PR #508 merged, tag synchronized locally with origin, npm versions verified with npm view, and release task is ready to close.
