---
id: "202604210859-VY1544"
title: "Emit WARN for active legacy migration bridges"
result_summary: "Skipped temporary legacy WARN instrumentation in favor of approved removal."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
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
commit:
  hash: "0f35277b543712e9b55eb0e4d9990e872c422b28"
  message: "✅ VY1544 code: done"
comments:
  -
    author: "CODER"
    body: "Start: Record that legacy WARN instrumentation is superseded by explicit patch-removal approval rather than adding temporary warnings."
  -
    author: "CODER"
    body: "Verified: legacy WARN instrumentation is superseded by explicit approval to remove legacy support in the patch release."
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
  -
    type: "status"
    at: "2026-04-21T09:38:39.403Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: legacy WARN instrumentation is superseded by explicit approval to remove legacy support in the patch release."
doc_version: 3
doc_updated_at: "2026-04-21T09:38:39.404Z"
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
