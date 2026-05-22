---
id: "202605221745-8BHZSX"
title: "Route quickstart and role guidance to agent context surfaces"
status: "TODO"
priority: "med"
owner: "DOCS"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605221744-GF25D1"
  - "202605221744-XBKXEW"
tags:
  - "cli"
  - "docs"
  - "workflow"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "Confirm guidance points to active work and task brief surfaces without removing command-specific recovery paths."
  - "Regenerate CLI docs if generated reference output changes."
  - "Run command-guide or help snapshot tests covering quickstart and role guidance."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:49.015Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:45:45.967Z"
doc_updated_by: "PLANNER"
description: "Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching."
sections:
  Summary: |-
    Route quickstart and role guidance to agent context surfaces

    Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
  Scope: |-
    - In scope: Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
    - Out of scope: unrelated refactors not required for "Route quickstart and role guidance to agent context surfaces".
  Plan: "After the active work and task brief surfaces exist, update quickstart, role supplements, and generated user docs so agents start from those context-rich commands rather than manually combining task list, status, work resume, verify-show, and docs lookup."
  Verify Steps: |-
    PLANNER fallback scaffold for "Route quickstart and role guidance to agent context surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Route quickstart and role guidance to agent context surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Route quickstart and role guidance to agent context surfaces

Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.

## Scope

- In scope: Update installed quickstart, role supplements, and generated docs guidance to direct agents toward active work and task brief surfaces instead of manual command stitching.
- Out of scope: unrelated refactors not required for "Route quickstart and role guidance to agent context surfaces".

## Plan

After the active work and task brief surfaces exist, update quickstart, role supplements, and generated user docs so agents start from those context-rich commands rather than manually combining task list, status, work resume, verify-show, and docs lookup.

## Verify Steps

PLANNER fallback scaffold for "Route quickstart and role guidance to agent context surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Route quickstart and role guidance to agent context surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
