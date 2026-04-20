---
id: "202604200951-NWPTHH"
title: "Expand script-runtime adoption across generated checks"
result_summary: "Expanded script-runtime adoption across schema sync, agent template sync, recipes inventory generation, and onboarding docs checks."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-20T09:54:25.151Z"
  updated_by: "CODER"
  note: "Command: bun run schemas:check -> pass. Command: bun run agents:check -> pass. Command: bun run docs:recipes:check -> pass. Command: bun run docs:onboarding:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit:
  hash: "4319185d5524906eeee11af80eddf627b5606d3d"
  message: "♻️ NWPTHH scripts: expand runtime adoption"
comments:
  -
    author: "CODER"
    body: "Start: expand script-runtime adoption across generated checks and sync scripts without changing generated outputs."
  -
    author: "CODER"
    body: "Verified: schemas, agent templates, recipes inventory, onboarding docs, format, and lint checks pass through script-runtime entrypoints."
events:
  -
    type: "status"
    at: "2026-04-20T09:51:54.435Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand script-runtime adoption across generated checks and sync scripts without changing generated outputs."
  -
    type: "verify"
    at: "2026-04-20T09:54:25.151Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check -> pass. Command: bun run agents:check -> pass. Command: bun run docs:recipes:check -> pass. Command: bun run docs:onboarding:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
  -
    type: "status"
    at: "2026-04-20T09:54:32.227Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: schemas, agent templates, recipes inventory, onboarding docs, format, and lint checks pass through script-runtime entrypoints."
doc_version: 3
doc_updated_at: "2026-04-20T09:54:32.228Z"
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
    ### 2026-04-20T09:54:25.151Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check -> pass. Command: bun run agents:check -> pass. Command: bun run docs:recipes:check -> pass. Command: bun run docs:onboarding:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:51:54.444Z, excerpt_hash=sha256:2d20a3942d843efe6bc02776c047d72de9d00f8977a0d728b60c5620cc360bad
    
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
### 2026-04-20T09:54:25.151Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check -> pass. Command: bun run agents:check -> pass. Command: bun run docs:recipes:check -> pass. Command: bun run docs:onboarding:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:51:54.444Z, excerpt_hash=sha256:2d20a3942d843efe6bc02776c047d72de9d00f8977a0d728b60c5620cc360bad

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
