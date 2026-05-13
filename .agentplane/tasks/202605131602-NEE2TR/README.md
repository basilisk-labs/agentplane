---
id: "202605131602-NEE2TR"
title: "Split human context command surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:02:46.702Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved human context command surface in a dedicated branch_pr worktree, reusing existing context handlers and keeping low-level pipeline commands available for ap."
events:
  -
    type: "status"
    at: "2026-05-13T16:03:03.096Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved human context command surface in a dedicated branch_pr worktree, reusing existing context handlers and keeping low-level pipeline commands available for ap."
doc_version: 3
doc_updated_at: "2026-05-13T16:03:03.096Z"
doc_updated_by: "CODER"
description: "Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface."
sections:
  Summary: |-
    Split human context command surface
    
    Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
  Scope: |-
    - In scope: Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
    - Out of scope: unrelated refactors not required for "Split human context command surface".
  Plan: "Implement a human-facing context command surface while keeping ap as the advanced agent/pipeline interface. Scope: preserve existing context pipeline commands for ap; add agentplane-oriented aliases that use current terminology: context init, context learn files <paths...>, context learn changes, context learn tasks, context show, and context check; do not add context open/setup; implement aliases by reusing existing handlers rather than duplicating domain logic; update CLI help/docs/tests so human commands create processing tasks for external data and completed task data in simple mode; keep promotion/write-proposals advanced. Verification: focused command spec/parse tests, context command tests, CLI reference freshness, policy routing, doctor, and a smoke of the new help/parse surface."
  Verify Steps: |-
    1. Review the requested outcome for "Split human context command surface". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Split human context command surface

Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.

## Scope

- In scope: Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
- Out of scope: unrelated refactors not required for "Split human context command surface".

## Plan

Implement a human-facing context command surface while keeping ap as the advanced agent/pipeline interface. Scope: preserve existing context pipeline commands for ap; add agentplane-oriented aliases that use current terminology: context init, context learn files <paths...>, context learn changes, context learn tasks, context show, and context check; do not add context open/setup; implement aliases by reusing existing handlers rather than duplicating domain logic; update CLI help/docs/tests so human commands create processing tasks for external data and completed task data in simple mode; keep promotion/write-proposals advanced. Verification: focused command spec/parse tests, context command tests, CLI reference freshness, policy routing, doctor, and a smoke of the new help/parse surface.

## Verify Steps

1. Review the requested outcome for "Split human context command surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
