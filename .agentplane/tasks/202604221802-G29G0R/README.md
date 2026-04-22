---
id: "202604221802-G29G0R"
title: "Publish v0.3.21 legacy init cache hotfix"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: publishing v0.3.21 patch release for the init legacy recipe cache migration now merged to main."
events:
  -
    type: "status"
    at: "2026-04-22T18:02:56.505Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publishing v0.3.21 patch release for the init legacy recipe cache migration now merged to main."
doc_version: 3
doc_updated_at: "2026-04-22T18:02:56.511Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
