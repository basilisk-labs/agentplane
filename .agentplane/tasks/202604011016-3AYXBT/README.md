---
id: "202604011016-3AYXBT"
title: "Apply and publish next patch release"
status: "DOING"
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
  state: "approved"
  updated_at: "2026-04-01T11:16:27.603Z"
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
    body: "Start: apply and publish v0.3.8 after the green release-prepublish gate, then verify the exact published artifacts and release state."
events:
  -
    type: "status"
    at: "2026-04-01T11:16:37.127Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: apply and publish v0.3.8 after the green release-prepublish gate, then verify the exact published artifacts and release state."
doc_version: 3
doc_updated_at: "2026-04-01T11:16:37.138Z"
doc_updated_by: "CODER"
description: "Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts."
sections:
  Summary: |-
    Apply and publish next patch release
    
    Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.
  Scope: |-
    - In scope: Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.
    - Out of scope: unrelated refactors not required for "Apply and publish next patch release".
  Plan: "1. Confirm release gates are green and workspace is ready for apply. 2. Apply the prepared v0.3.8 patch release with push enabled from the exact checked commit. 3. Run post-publish verification against the exact release SHA and record artifact/registry evidence."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
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

Apply and publish next patch release

Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.

## Scope

- In scope: Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.
- Out of scope: unrelated refactors not required for "Apply and publish next patch release".

## Plan

1. Confirm release gates are green and workspace is ready for apply. 2. Apply the prepared v0.3.8 patch release with push enabled from the exact checked commit. 3. Run post-publish verification against the exact release SHA and record artifact/registry evidence.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
