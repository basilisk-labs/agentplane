---
id: "202604210900-RP5GA0"
title: "Decide legacy bridge removal policy for patch release"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202604210859-VY1544"
tags:
  - "meta"
  - "migration"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:38:54.452Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:39:08.755Z"
  updated_by: "PLANNER"
  note: "Recorded remove-now legacy bridge policy for the patch release based on explicit user approval; downstream removal tasks can proceed without WARN-window gating."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Record explicit remove-now policy for legacy bridge support in the patch release based on user approval."
events:
  -
    type: "status"
    at: "2026-04-21T09:38:55.711Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record explicit remove-now policy for legacy bridge support in the patch release based on user approval."
  -
    type: "verify"
    at: "2026-04-21T09:39:08.755Z"
    author: "PLANNER"
    state: "ok"
    note: "Recorded remove-now legacy bridge policy for the patch release based on explicit user approval; downstream removal tasks can proceed without WARN-window gating."
doc_version: 3
doc_updated_at: "2026-04-21T09:39:08.768Z"
doc_updated_by: "PLANNER"
description: "Resolve the SemVer conflict around legacy bridge removal before any breaking cleanup is attempted."
sections:
  Summary: "Make an explicit release-policy decision for legacy bridge removals: patch release WARN-only, or approved breaking-change override."
  Scope: "In scope: planning documentation/task findings and release criteria for legacy bridges. Out of scope: code deletion."
  Plan: |-
    1. Review WARN evidence from T11 and SemVer impact of each bridge.
    2. Classify each bridge as remove-now, defer, or retain with telemetry.
    3. Record the decision and required migration note/release-note criteria.
    4. Gate deletion tasks on this decision.
  Verify Steps: |-
    - Each legacy bridge has an explicit remove/defer/retain decision.
    - Patch-release breaking risk is acknowledged instead of implicit.
    - Downstream deletion tasks know their scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:39:08.755Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Recorded remove-now legacy bridge policy for the patch release based on explicit user approval; downstream removal tasks can proceed without WARN-window gating.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:39:04.913Z, excerpt_hash=sha256:f9bd36af6910236751248c154eb55a6b390b32a28aeb6bd391f32504c03573fd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Reopen the decision if WARN evidence or release policy changes materially."
  Findings: |-
    Decision: remove legacy bridge support in the next patch release. User explicitly approved this despite SemVer breakage risk, with the operating assumption that old-version state should be handled by the upgrade agent during upgrade.
    
    Remove-now tasks: legacy task index v1 support, legacy WORKFLOW.md path support, task doc v2 support, old source redirect, and safeFixLegacyUntrackedTaskReadmes retention decision.
    
    Release-note requirement: call out the breaking cleanup explicitly and point old repositories at the upgrade agent path.
id_source: "generated"
---
## Summary

Make an explicit release-policy decision for legacy bridge removals: patch release WARN-only, or approved breaking-change override.

## Scope

In scope: planning documentation/task findings and release criteria for legacy bridges. Out of scope: code deletion.

## Plan

1. Review WARN evidence from T11 and SemVer impact of each bridge.
2. Classify each bridge as remove-now, defer, or retain with telemetry.
3. Record the decision and required migration note/release-note criteria.
4. Gate deletion tasks on this decision.

## Verify Steps

- Each legacy bridge has an explicit remove/defer/retain decision.
- Patch-release breaking risk is acknowledged instead of implicit.
- Downstream deletion tasks know their scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:39:08.755Z — VERIFY — ok

By: PLANNER

Note: Recorded remove-now legacy bridge policy for the patch release based on explicit user approval; downstream removal tasks can proceed without WARN-window gating.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:39:04.913Z, excerpt_hash=sha256:f9bd36af6910236751248c154eb55a6b390b32a28aeb6bd391f32504c03573fd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Reopen the decision if WARN evidence or release policy changes materially.

## Findings

Decision: remove legacy bridge support in the next patch release. User explicitly approved this despite SemVer breakage risk, with the operating assumption that old-version state should be handled by the upgrade agent during upgrade.

Remove-now tasks: legacy task index v1 support, legacy WORKFLOW.md path support, task doc v2 support, old source redirect, and safeFixLegacyUntrackedTaskReadmes retention decision.

Release-note requirement: call out the breaking cleanup explicitly and point old repositories at the upgrade agent path.
