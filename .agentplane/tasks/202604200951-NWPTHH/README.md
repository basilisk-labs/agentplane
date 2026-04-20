---
id: "202604200951-NWPTHH"
title: "Expand script-runtime adoption across generated checks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:51:54.118Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: expand script-runtime adoption across generated checks and sync scripts without changing generated outputs."
events:
  -
    type: "status"
    at: "2026-04-20T09:51:54.435Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand script-runtime adoption across generated checks and sync scripts without changing generated outputs."
doc_version: 3
doc_updated_at: "2026-04-20T09:51:54.444Z"
doc_updated_by: "CODER"
description: "Migrate schema sync, agent template sync, recipes inventory generation, and onboarding docs check to defineScript so F′ reaches broad script-runtime usage."
sections:
  Summary: |-
    Expand script-runtime adoption across generated checks
    
    Migrate schema sync, agent template sync, recipes inventory generation, and onboarding docs check to defineScript so F′ reaches broad script-runtime usage.
  Scope: |-
    - In scope: Migrate schema sync, agent template sync, recipes inventory generation, and onboarding docs check to defineScript so F′ reaches broad script-runtime usage.
    - Out of scope: unrelated refactors not required for "Expand script-runtime adoption across generated checks".
  Plan: |-
    1. Migrate sync-schemas.mjs and sync-agent-templates.mjs to defineScript while preserving parseCheckSyncMode.
    2. Migrate generate-recipes-inventory.mjs to defineScript/runScriptMain and use context argv/cwd instead of process.argv.
    3. Migrate check-agent-onboarding-scenario.mjs to defineScript/runScriptMain.
    4. Run schemas:check, agents:check, docs:recipes:check, docs:onboarding:check, format, and lint; commit and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Expand script-runtime adoption across generated checks". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Expand script-runtime adoption across generated checks

Migrate schema sync, agent template sync, recipes inventory generation, and onboarding docs check to defineScript so F′ reaches broad script-runtime usage.

## Scope

- In scope: Migrate schema sync, agent template sync, recipes inventory generation, and onboarding docs check to defineScript so F′ reaches broad script-runtime usage.
- Out of scope: unrelated refactors not required for "Expand script-runtime adoption across generated checks".

## Plan

1. Migrate sync-schemas.mjs and sync-agent-templates.mjs to defineScript while preserving parseCheckSyncMode.
2. Migrate generate-recipes-inventory.mjs to defineScript/runScriptMain and use context argv/cwd instead of process.argv.
3. Migrate check-agent-onboarding-scenario.mjs to defineScript/runScriptMain.
4. Run schemas:check, agents:check, docs:recipes:check, docs:onboarding:check, format, and lint; commit and finish.

## Verify Steps

1. Review the requested outcome for "Expand script-runtime adoption across generated checks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
