---
id: "202605290402-V18P6W"
title: "ACR command specs decomposition"
result_summary: "Merged via PR #4274."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-29T04:08:04.296Z"
  updated_by: "CODER"
  note: "Verified ACR command specs decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts (11 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 15 to 14; acr.command.ts is 196 lines, below the 400-line warning threshold."
  attempts: 0
commit:
  hash: "bdb551dc0489dbde38711d3fd216668b0f32ebaa"
  message: "✅ V18P6W acr: record verification"
comments:
  -
    author: "CODER"
    body: "Start: extract ACR parsed types and command specs into acr.specs.ts while preserving acr.command.ts public exports."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4274 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T04:02:50.630Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract ACR parsed types and command specs into acr.specs.ts while preserving acr.command.ts public exports."
  -
    type: "verify"
    at: "2026-05-29T04:08:04.296Z"
    author: "CODER"
    state: "ok"
    note: "Verified ACR command specs decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts (11 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 15 to 14; acr.command.ts is 196 lines, below the 400-line warning threshold."
  -
    type: "status"
    at: "2026-05-29T04:13:25.308Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4274 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T04:13:25.312Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-29T04:08:04.296Z — VERIFY — ok

    By: CODER

    Note: Verified ACR command specs decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts (11 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 15 to 14; acr.command.ts is 196 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:02:50.630Z, excerpt_hash=sha256:a4cac58a5c13790963ac280cfdd83fc40502cf6ca25b2e47748d13b74e20eb68

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290402-V18P6W/blueprint/resolved-snapshot.json
    - old_digest: 26e97421e0c637c5b34a7569ba40bd500e2b7ca167594363ad338d4b0c3f0728
    - current_digest: 26e97421e0c637c5b34a7569ba40bd500e2b7ca167594363ad338d4b0c3f0728
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290402-V18P6W

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
### 2026-05-29T04:08:04.296Z — VERIFY — ok

By: CODER

Note: Verified ACR command specs decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts (11 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 15 to 14; acr.command.ts is 196 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:02:50.630Z, excerpt_hash=sha256:a4cac58a5c13790963ac280cfdd83fc40502cf6ca25b2e47748d13b74e20eb68

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290402-V18P6W/blueprint/resolved-snapshot.json
- old_digest: 26e97421e0c637c5b34a7569ba40bd500e2b7ca167594363ad338d4b0c3f0728
- current_digest: 26e97421e0c637c5b34a7569ba40bd500e2b7ca167594363ad338d4b0c3f0728
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290402-V18P6W

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
