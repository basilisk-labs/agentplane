---
id: "202604210859-VY1544"
title: "Emit WARN for active legacy migration bridges"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210859-3GKMTX"
tags:
  - "code"
  - "migration"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:38:20.873Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:38:31.854Z"
  updated_by: "CODER"
  note: "User explicitly approved patch-release legacy support removal and assigned old-version handling to the upgrade agent path. Temporary WARN instrumentation is intentionally skipped, and downstream removal-policy work can proceed with remove-now assumptions."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Record that legacy WARN instrumentation is superseded by explicit patch-removal approval rather than adding temporary warnings."
events:
  -
    type: "status"
    at: "2026-04-21T09:38:24.046Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record that legacy WARN instrumentation is superseded by explicit patch-removal approval rather than adding temporary warnings."
  -
    type: "verify"
    at: "2026-04-21T09:38:31.854Z"
    author: "CODER"
    state: "ok"
    note: "User explicitly approved patch-release legacy support removal and assigned old-version handling to the upgrade agent path. Temporary WARN instrumentation is intentionally skipped, and downstream removal-policy work can proceed with remove-now assumptions."
doc_version: 3
doc_updated_at: "2026-04-21T09:38:31.860Z"
doc_updated_by: "CODER"
description: "Add structured deprecation warnings when legacy migration bridges are exercised so removal readiness can be measured before breaking changes."
sections:
  Summary: "Instrument active legacy paths with logger.warn messages that state the future removal intent and migration action."
  Scope: "Superseded scope: do not add temporary WARN instrumentation. User explicitly approved removing legacy support in the next patch release and assigned old-version handling to the upgrade agent path. This task now records that the warning-window step is intentionally skipped before removal tasks proceed."
  Plan: |-
    1. Inventory the exact remaining legacy bridge code paths.
    2. Add structured WARN logs at runtime hit points, with stable event names and migration guidance.
    3. Add tests that trigger each warning without broad fixture churn.
    4. Ensure warnings do not fire on modern paths.
  Verify Steps: |-
    - Confirm the user explicitly approved patch-release legacy support removal.
    - Confirm no temporary WARN instrumentation was added.
    - Confirm downstream removal-policy task can proceed with remove-now assumptions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:38:31.854Z — VERIFY — ok
    
    By: CODER
    
    Note: User explicitly approved patch-release legacy support removal and assigned old-version handling to the upgrade agent path. Temporary WARN instrumentation is intentionally skipped, and downstream removal-policy work can proceed with remove-now assumptions.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:38:24.081Z, excerpt_hash=sha256:297d85e069973bbe4776d5993373df5cce7a95412b3aeff7532339ab6fbdf44d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove warning instrumentation and tests for this task only."
  Findings: "This is the safe patch-release alternative before any breaking removal."
id_source: "generated"
---
## Summary

Instrument active legacy paths with logger.warn messages that state the future removal intent and migration action.

## Scope

Superseded scope: do not add temporary WARN instrumentation. User explicitly approved removing legacy support in the next patch release and assigned old-version handling to the upgrade agent path. This task now records that the warning-window step is intentionally skipped before removal tasks proceed.

## Plan

1. Inventory the exact remaining legacy bridge code paths.
2. Add structured WARN logs at runtime hit points, with stable event names and migration guidance.
3. Add tests that trigger each warning without broad fixture churn.
4. Ensure warnings do not fire on modern paths.

## Verify Steps

- Confirm the user explicitly approved patch-release legacy support removal.
- Confirm no temporary WARN instrumentation was added.
- Confirm downstream removal-policy task can proceed with remove-now assumptions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:38:31.854Z — VERIFY — ok

By: CODER

Note: User explicitly approved patch-release legacy support removal and assigned old-version handling to the upgrade agent path. Temporary WARN instrumentation is intentionally skipped, and downstream removal-policy work can proceed with remove-now assumptions.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:38:24.081Z, excerpt_hash=sha256:297d85e069973bbe4776d5993373df5cce7a95412b3aeff7532339ab6fbdf44d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove warning instrumentation and tests for this task only.

## Findings

This is the safe patch-release alternative before any breaking removal.
