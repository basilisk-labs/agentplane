---
id: "202604200944-WRANPJ"
title: "Add shared defineCheck script helper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:44:18.820Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:46:04.522Z"
  updated_by: "CODER"
  note: "Command: node scripts/check-release-version.mjs --tag v0.3.15 -> pass. Command: node scripts/check-published-packages.mjs --spec @agentplaneorg/core@0.3.15 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a generic defineCheck wrapper and migrate two simple check scripts before touching heavier release recovery logic."
events:
  -
    type: "status"
    at: "2026-04-20T09:44:19.241Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a generic defineCheck wrapper and migrate two simple check scripts before touching heavier release recovery logic."
  -
    type: "verify"
    at: "2026-04-20T09:46:04.522Z"
    author: "CODER"
    state: "ok"
    note: "Command: node scripts/check-release-version.mjs --tag v0.3.15 -> pass. Command: node scripts/check-published-packages.mjs --spec @agentplaneorg/core@0.3.15 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
doc_version: 3
doc_updated_at: "2026-04-20T09:46:04.529Z"
doc_updated_by: "CODER"
description: "Introduce a small defineCheck wrapper in script-runtime for load/compare/report style scripts and migrate two simple check scripts to it."
sections:
  Summary: |-
    Add shared defineCheck script helper
    
    Introduce a small defineCheck wrapper in script-runtime for load/compare/report style scripts and migrate two simple check scripts to it.
  Scope: |-
    - In scope: Introduce a small defineCheck wrapper in script-runtime for load/compare/report style scripts and migrate two simple check scripts to it.
    - Out of scope: unrelated refactors not required for "Add shared defineCheck script helper".
  Plan: |-
    1. Add defineCheck({ name, parseArgs, check }) to scripts/lib/script-runtime.mjs on top of defineScript.
    2. Migrate scripts/check-release-version.mjs to defineCheck while preserving --tag/stdin/GitHub tag behavior and error output.
    3. Migrate scripts/check-published-packages.mjs to defineCheck while preserving --spec behavior and npm polling output.
    4. Run focused script smoke checks plus format/lint, then commit, verify, and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Add shared defineCheck script helper". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:46:04.522Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/check-release-version.mjs --tag v0.3.15 -> pass. Command: node scripts/check-published-packages.mjs --spec @agentplaneorg/core@0.3.15 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:44:19.253Z, excerpt_hash=sha256:499400725159acb6c4dfcc67fc3d00722c2b3cf9238367a0f03fe23b8e8134d8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add shared defineCheck script helper

Introduce a small defineCheck wrapper in script-runtime for load/compare/report style scripts and migrate two simple check scripts to it.

## Scope

- In scope: Introduce a small defineCheck wrapper in script-runtime for load/compare/report style scripts and migrate two simple check scripts to it.
- Out of scope: unrelated refactors not required for "Add shared defineCheck script helper".

## Plan

1. Add defineCheck({ name, parseArgs, check }) to scripts/lib/script-runtime.mjs on top of defineScript.
2. Migrate scripts/check-release-version.mjs to defineCheck while preserving --tag/stdin/GitHub tag behavior and error output.
3. Migrate scripts/check-published-packages.mjs to defineCheck while preserving --spec behavior and npm polling output.
4. Run focused script smoke checks plus format/lint, then commit, verify, and finish.

## Verify Steps

1. Review the requested outcome for "Add shared defineCheck script helper". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:46:04.522Z — VERIFY — ok

By: CODER

Note: Command: node scripts/check-release-version.mjs --tag v0.3.15 -> pass. Command: node scripts/check-published-packages.mjs --spec @agentplaneorg/core@0.3.15 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:44:19.253Z, excerpt_hash=sha256:499400725159acb6c4dfcc67fc3d00722c2b3cf9238367a0f03fe23b8e8134d8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
