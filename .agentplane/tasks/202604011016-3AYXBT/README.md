---
id: "202604011016-3AYXBT"
title: "Apply and publish next patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T17:26:51.994Z"
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
doc_updated_at: "2026-04-02T17:27:49.321Z"
doc_updated_by: "CODER"
description: "Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts."
sections:
  Summary: |-
    Apply and publish next patch release
    
    Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.
  Scope: |-
    - In scope: Validate release readiness, run the patch release gates, apply the prepared release, push commit and tag, and verify the published release artifacts.
    - Out of scope: unrelated refactors not required for "Apply and publish next patch release".
  Plan: "Release plan: apply and publish v0.3.9 from main after the repaired publishable-manifest fix and green local/hosted gates, then verify npm metadata, GitHub tag/release, and the exact published install path as the replacement for broken v0.3.8."
  Verify Steps: |-
    1. Run bun run release:prepublish on the exact release tree. Expected: the full local release gate passes without parity, docs, coverage, or smoke regressions.
    2. Run agentplane release apply --push --yes. Expected: the version bump commit, v0.3.9 tag, and GitHub release/publish workflow are created from the checked main commit.
    3. Query npm and GitHub after publish. Expected: agentplane@0.3.9 and @agentplaneorg/core@0.3.9 are available, the GitHub release/tag exists, and npm install uses the repaired installable manifest.
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

Release plan: apply and publish v0.3.9 from main after the repaired publishable-manifest fix and green local/hosted gates, then verify npm metadata, GitHub tag/release, and the exact published install path as the replacement for broken v0.3.8.

## Verify Steps

1. Run bun run release:prepublish on the exact release tree. Expected: the full local release gate passes without parity, docs, coverage, or smoke regressions.
2. Run agentplane release apply --push --yes. Expected: the version bump commit, v0.3.9 tag, and GitHub release/publish workflow are created from the checked main commit.
3. Query npm and GitHub after publish. Expected: agentplane@0.3.9 and @agentplaneorg/core@0.3.9 are available, the GitHub release/tag exists, and npm install uses the repaired installable manifest.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
