---
id: "202605290332-X3NHBJ"
title: "Blueprint command listing decomposition"
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
  updated_at: "2026-05-29T03:33:13.066Z"
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
    body: "Start: extract blueprint examples/list handlers into a focused module while preserving command exports and CLI output."
events:
  -
    type: "status"
    at: "2026-05-29T03:33:22.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract blueprint examples/list handlers into a focused module while preserving command exports and CLI output."
doc_version: 3
doc_updated_at: "2026-05-29T03:33:22.706Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count."
sections:
  Summary: |-
    Blueprint command listing decomposition

    Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.
    - Out of scope: unrelated refactors not required for "Blueprint command listing decomposition".
  Plan: |-
    Refactor blueprint command hotspot with a single behavior-preserving extraction.

    Scope:
    - Extract blueprint examples and blueprint list route formatting/validation helpers from packages/agentplane/src/commands/blueprint/blueprint.command.ts into a focused module.
    - Preserve command-loader imports by re-exporting handlers from blueprint.command.ts.
    - Preserve JSON/text output, validation errors, and project-local blueprint trust behavior.
    - Keep blueprint.command.ts below the 400-line runtime hotspot warning threshold.

    Verify:
    - Run bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts.
    - Run bun run typecheck.
    - Run bun run arch:check.
    - Run bun run knip:check.
    - Run bun run lint:core.
    - Run bun run format:changed.
    - Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 18 to 17.
  Verify Steps: |-
    PLANNER fallback scaffold for "Blueprint command listing decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Blueprint command listing decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Blueprint command listing decomposition

Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.
- Out of scope: unrelated refactors not required for "Blueprint command listing decomposition".

## Plan

Refactor blueprint command hotspot with a single behavior-preserving extraction.

Scope:
- Extract blueprint examples and blueprint list route formatting/validation helpers from packages/agentplane/src/commands/blueprint/blueprint.command.ts into a focused module.
- Preserve command-loader imports by re-exporting handlers from blueprint.command.ts.
- Preserve JSON/text output, validation errors, and project-local blueprint trust behavior.
- Keep blueprint.command.ts below the 400-line runtime hotspot warning threshold.

Verify:
- Run bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts.
- Run bun run typecheck.
- Run bun run arch:check.
- Run bun run knip:check.
- Run bun run lint:core.
- Run bun run format:changed.
- Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 18 to 17.

## Verify Steps

PLANNER fallback scaffold for "Blueprint command listing decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Blueprint command listing decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
