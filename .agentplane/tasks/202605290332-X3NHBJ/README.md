---
id: "202605290332-X3NHBJ"
title: "Blueprint command listing decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-29T03:37:02.570Z"
  updated_by: "CODER"
  note: "Verified blueprint command listing decomposition. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts (29 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 18 to 17; blueprint.command.ts is 336 lines, below the 400-line warning threshold."
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
  -
    type: "verify"
    at: "2026-05-29T03:37:02.570Z"
    author: "CODER"
    state: "ok"
    note: "Verified blueprint command listing decomposition. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts (29 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 18 to 17; blueprint.command.ts is 336 lines, below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T03:37:02.608Z"
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
    ### 2026-05-29T03:37:02.570Z — VERIFY — ok

    By: CODER

    Note: Verified blueprint command listing decomposition. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts (29 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 18 to 17; blueprint.command.ts is 336 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:33:22.706Z, excerpt_hash=sha256:865891e195871975ec552f0ad30c4c359a5e97cca429e9a5bd044ee62cc81c8c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290332-X3NHBJ/blueprint/resolved-snapshot.json
    - old_digest: 4567f910fd09f75235e481f26e4e9912805eb7dfcf6a9aceebc69d63cba7e760
    - current_digest: 4567f910fd09f75235e481f26e4e9912805eb7dfcf6a9aceebc69d63cba7e760
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290332-X3NHBJ

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
### 2026-05-29T03:37:02.570Z — VERIFY — ok

By: CODER

Note: Verified blueprint command listing decomposition. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts (29 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 18 to 17; blueprint.command.ts is 336 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:33:22.706Z, excerpt_hash=sha256:865891e195871975ec552f0ad30c4c359a5e97cca429e9a5bd044ee62cc81c8c

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290332-X3NHBJ/blueprint/resolved-snapshot.json
- old_digest: 4567f910fd09f75235e481f26e4e9912805eb7dfcf6a9aceebc69d63cba7e760
- current_digest: 4567f910fd09f75235e481f26e4e9912805eb7dfcf6a9aceebc69d63cba7e760
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290332-X3NHBJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
