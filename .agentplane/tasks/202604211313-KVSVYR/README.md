---
id: "202604211313-KVSVYR"
title: "Generate scripts README from package scripts"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "scripts"
  - "tooling"
verify:
  - "bun run typecheck"
  - "node scripts/generate-scripts-readme.mjs --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:35.879Z"
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
doc_updated_at: "2026-04-21T13:13:35.199Z"
doc_updated_by: "PLANNER"
description: "Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts."
sections:
  Summary: |-
    Generate scripts README from package scripts
    
    Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
  Scope: |-
    - In scope: Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
    - Out of scope: unrelated refactors not required for "Generate scripts README from package scripts".
  Plan: "Scope: improve maintainability of the large root scripts surface. Steps: 1. Create scripts/generate-scripts-readme.mjs using existing script-runtime helpers. 2. Group scripts by namespace: ci, release, docs, test, coverage, arch, bench, misc. 3. Generate scripts/README.md with command, purpose, and grouping notes. 4. Provide --check mode. Acceptance: generated README is stable and check mode detects drift."
  Verify Steps: |-
    1. Review the requested outcome for "Generate scripts README from package scripts". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Generate scripts README from package scripts

Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.

## Scope

- In scope: Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
- Out of scope: unrelated refactors not required for "Generate scripts README from package scripts".

## Plan

Scope: improve maintainability of the large root scripts surface. Steps: 1. Create scripts/generate-scripts-readme.mjs using existing script-runtime helpers. 2. Group scripts by namespace: ci, release, docs, test, coverage, arch, bench, misc. 3. Generate scripts/README.md with command, purpose, and grouping notes. 4. Provide --check mode. Acceptance: generated README is stable and check mode detects drift.

## Verify Steps

1. Review the requested outcome for "Generate scripts README from package scripts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
