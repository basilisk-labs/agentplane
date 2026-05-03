---
id: "202605031909-H7RHY7"
title: "T38: Auto-generate llms-full from canonical pages"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-1D4BT9"
  - "202605031908-6H68QN"
tags:
  - "discovery"
  - "infra"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:57.199Z"
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
doc_updated_at: "2026-05-03T19:09:56.809Z"
doc_updated_by: "PLANNER"
description: "Add scripts/generate-llms-full.mjs and wire it into docs site generation with drift checking."
sections:
  Summary: |-
    T38: Auto-generate llms-full from canonical pages

    Add scripts/generate-llms-full.mjs and wire it into docs site generation with drift checking.
  Scope: |-
    - In scope: Add scripts/generate-llms-full.mjs and wire it into docs site generation with drift checking.
    - Out of scope: unrelated refactors not required for "T38: Auto-generate llms-full from canonical pages".
  Plan: "Implement llms-full generation from canonical pages/blog, wire package scripts, regenerate output, and verify drift checks."
  Verify Steps: |-
    1. Review the requested outcome for "T38: Auto-generate llms-full from canonical pages". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T38: Auto-generate llms-full from canonical pages

Add scripts/generate-llms-full.mjs and wire it into docs site generation with drift checking.

## Scope

- In scope: Add scripts/generate-llms-full.mjs and wire it into docs site generation with drift checking.
- Out of scope: unrelated refactors not required for "T38: Auto-generate llms-full from canonical pages".

## Plan

Implement llms-full generation from canonical pages/blog, wire package scripts, regenerate output, and verify drift checks.

## Verify Steps

1. Review the requested outcome for "T38: Auto-generate llms-full from canonical pages". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
