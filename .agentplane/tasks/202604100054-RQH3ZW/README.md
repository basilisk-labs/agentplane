---
id: "202604100054-RQH3ZW"
title: "Keep incident promotion formatted and synced without manual follow-up"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:55:39.313Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-04-10T00:54:48.657Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation."
sections:
  Summary: |-
    Keep incident promotion formatted and synced without manual follow-up
    
    Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
  Scope: |-
    - In scope: Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
    - Out of scope: unrelated refactors not required for "Keep incident promotion formatted and synced without manual follow-up".
  Plan: |-
    1. Reproduce incident promotion leaving incidents registries unsynced or unformatted.
    2. Make promotion update canonical and mirrored registry files in a hook-clean state.
    3. Add regression coverage that no manual prettier or agents:sync follow-up is needed.
    4. Verify with targeted tests and task lifecycle smoke checks.
  Verify Steps: |-
    1. Run the incident-promotion regression that updates the registry mirror. Expected: both registry paths end in a hook-clean state with no manual remediation step.
    2. Run formatting/template-sync validation on the touched incidents files. Expected: no `prettier` or `agents:sync` failure remains after the promotion path itself.
    3. Inspect canonical and mirrored incidents files. Expected: they remain synchronized after a single promotion operation.
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

Keep incident promotion formatted and synced without manual follow-up

Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.

## Scope

- In scope: Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
- Out of scope: unrelated refactors not required for "Keep incident promotion formatted and synced without manual follow-up".

## Plan

1. Reproduce incident promotion leaving incidents registries unsynced or unformatted.
2. Make promotion update canonical and mirrored registry files in a hook-clean state.
3. Add regression coverage that no manual prettier or agents:sync follow-up is needed.
4. Verify with targeted tests and task lifecycle smoke checks.

## Verify Steps

1. Run the incident-promotion regression that updates the registry mirror. Expected: both registry paths end in a hook-clean state with no manual remediation step.
2. Run formatting/template-sync validation on the touched incidents files. Expected: no `prettier` or `agents:sync` failure remains after the promotion path itself.
3. Inspect canonical and mirrored incidents files. Expected: they remain synchronized after a single promotion operation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
