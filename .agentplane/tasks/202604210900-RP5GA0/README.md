---
id: "202604210900-RP5GA0"
title: "Decide legacy bridge removal policy for patch release"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T09:00:20.533Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Reopen the decision if WARN evidence or release policy changes materially."
  Findings: "Critical check: SAFE_TO_REMOVE and REFACTORING_PLAN disagree on some bridge removals; this task prevents accidental SemVer breakage."
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Reopen the decision if WARN evidence or release policy changes materially.

## Findings

Critical check: SAFE_TO_REMOVE and REFACTORING_PLAN disagree on some bridge removals; this task prevents accidental SemVer breakage.
