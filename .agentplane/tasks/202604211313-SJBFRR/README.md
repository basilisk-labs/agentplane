---
id: "202604211313-SJBFRR"
title: "Add cold-start regression guard"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211313-5RAM5H"
tags:
  - "ci"
  - "perf"
  - "tooling"
verify:
  - "bun run bench:cli:cold"
  - "bun run ci:local:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:19.680Z"
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
doc_updated_at: "2026-04-21T13:13:19.166Z"
doc_updated_by: "PLANNER"
description: "Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands."
sections:
  Summary: |-
    Add cold-start regression guard
    
    Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
  Scope: |-
    - In scope: Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
    - Out of scope: unrelated refactors not required for "Add cold-start regression guard".
  Plan: "Scope: prevent hidden cold-start regression. Steps: 1. Decide which cold-path scenarios are stable enough for a guard. 2. Store baseline and tolerance in a script-readable artifact. 3. Add a check command that reports regression without noisy flakes. 4. Wire it into a suitable local/CI route only if stable. Acceptance: check passes on current main and fails on an artificial large regression."
  Verify Steps: |-
    1. Review the requested outcome for "Add cold-start regression guard". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add cold-start regression guard

Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.

## Scope

- In scope: Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
- Out of scope: unrelated refactors not required for "Add cold-start regression guard".

## Plan

Scope: prevent hidden cold-start regression. Steps: 1. Decide which cold-path scenarios are stable enough for a guard. 2. Store baseline and tolerance in a script-readable artifact. 3. Add a check command that reports regression without noisy flakes. 4. Wire it into a suitable local/CI route only if stable. Acceptance: check passes on current main and fails on an artificial large regression.

## Verify Steps

1. Review the requested outcome for "Add cold-start regression guard". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
