---
id: "202604211313-QP30HX"
title: "Wire scripts README freshness check"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211313-KVSVYR"
tags:
  - "ci"
  - "docs"
  - "scripts"
verify:
  - "bun run ci:local:fast"
  - "node scripts/generate-scripts-readme.mjs --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:39.570Z"
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
doc_updated_at: "2026-04-21T13:13:39.046Z"
doc_updated_by: "PLANNER"
description: "Add the scripts README freshness check to the appropriate local and CI quality routes."
sections:
  Summary: |-
    Wire scripts README freshness check
    
    Add the scripts README freshness check to the appropriate local and CI quality routes.
  Scope: |-
    - In scope: Add the scripts README freshness check to the appropriate local and CI quality routes.
    - Out of scope: unrelated refactors not required for "Wire scripts README freshness check".
  Plan: "Scope: make scripts documentation non-stale. Steps: 1. Add a package.json script for scripts docs freshness. 2. Add it to docs/tooling quality route with minimal extra runtime. 3. Update developer docs to point to scripts/README.md. Acceptance: package script drift fails the freshness check."
  Verify Steps: |-
    1. Review the requested outcome for "Wire scripts README freshness check". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Wire scripts README freshness check

Add the scripts README freshness check to the appropriate local and CI quality routes.

## Scope

- In scope: Add the scripts README freshness check to the appropriate local and CI quality routes.
- Out of scope: unrelated refactors not required for "Wire scripts README freshness check".

## Plan

Scope: make scripts documentation non-stale. Steps: 1. Add a package.json script for scripts docs freshness. 2. Add it to docs/tooling quality route with minimal extra runtime. 3. Update developer docs to point to scripts/README.md. Acceptance: package script drift fails the freshness check.

## Verify Steps

1. Review the requested outcome for "Wire scripts README freshness check". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
