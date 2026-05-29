---
id: "202605290402-V18P6W"
title: "ACR command specs decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T04:02:39.306Z"
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
    body: "Start: extract ACR parsed types and command specs into acr.specs.ts while preserving acr.command.ts public exports."
events:
  -
    type: "status"
    at: "2026-05-29T04:02:50.630Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract ACR parsed types and command specs into acr.specs.ts while preserving acr.command.ts public exports."
doc_version: 3
doc_updated_at: "2026-05-29T04:02:50.630Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count."
sections:
  Summary: |-
    ACR command specs decomposition

    Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.
    - Out of scope: unrelated refactors not required for "ACR command specs decomposition".
  Plan: |-
    Refactor ACR command hotspot with one behavior-preserving extraction.

    Scope:
    - Extract ACR parsed types and command specs from packages/agentplane/src/commands/acr/acr.command.ts into packages/agentplane/src/commands/acr/acr.specs.ts.
    - Preserve public exports from acr.command.ts and existing CLI parsing/usage behavior.
    - Keep acr.command.ts below the 400-line runtime hotspot warning threshold.

    Verify:
    - Run bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts.
    - Run bun run typecheck.
    - Run bun run arch:check.
    - Run bun run knip:check.
    - Run bun run lint:core.
    - Run bun run format:changed.
    - Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 15 to 14.
  Verify Steps: |-
    PLANNER fallback scaffold for "ACR command specs decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "ACR command specs decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
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

ACR command specs decomposition

Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.
- Out of scope: unrelated refactors not required for "ACR command specs decomposition".

## Plan

Refactor ACR command hotspot with one behavior-preserving extraction.

Scope:
- Extract ACR parsed types and command specs from packages/agentplane/src/commands/acr/acr.command.ts into packages/agentplane/src/commands/acr/acr.specs.ts.
- Preserve public exports from acr.command.ts and existing CLI parsing/usage behavior.
- Keep acr.command.ts below the 400-line runtime hotspot warning threshold.

Verify:
- Run bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts.
- Run bun run typecheck.
- Run bun run arch:check.
- Run bun run knip:check.
- Run bun run lint:core.
- Run bun run format:changed.
- Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 15 to 14.

## Verify Steps

PLANNER fallback scaffold for "ACR command specs decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "ACR command specs decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
