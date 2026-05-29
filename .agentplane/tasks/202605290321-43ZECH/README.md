---
id: "202605290321-43ZECH"
title: "Backend command decomposition"
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
  updated_at: "2026-05-29T03:21:39.440Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T03:26:01.290Z"
  updated_by: "CODER"
  note: "Verified backend command decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --config vitest.workspace.ts (21 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 19 to 18; backend.ts is 352 lines, below the 400-line warning threshold."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract backend connect config/dotenv helpers from backend.ts into a focused module, preserving command behavior and reducing runtime hotspot count."
events:
  -
    type: "status"
    at: "2026-05-29T03:21:56.722Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract backend connect config/dotenv helpers from backend.ts into a focused module, preserving command behavior and reducing runtime hotspot count."
  -
    type: "verify"
    at: "2026-05-29T03:26:01.290Z"
    author: "CODER"
    state: "ok"
    note: "Verified backend command decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --config vitest.workspace.ts (21 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 19 to 18; backend.ts is 352 lines, below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T03:26:01.326Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold."
sections:
  Summary: |-
    Backend command decomposition

    Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.
    - Out of scope: unrelated refactors not required for "Backend command decomposition".
  Plan: |-
    Refactor backend command hotspot with a single behavior-preserving extraction.

    Scope:
    - Extract backend connect config writing and dotenv upsert/quoting helpers from packages/agentplane/src/commands/backend.ts into a focused backend-connect module.
    - Keep public command entrypoint behavior, output text, error mapping, and network approval behavior unchanged.
    - Keep backend.ts below the 400-line runtime hotspot warning threshold.

    Verify:
    - Run targeted backend command tests if present, or the closest CLI/core tests covering backend commands.
    - Run bun run typecheck.
    - Run bun run arch:check.
    - Run bun run knip:check.
    - Run bun run lint:core.
    - Run bun run format:changed.
    - Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 19 to 18.
  Verify Steps: |-
    PLANNER fallback scaffold for "Backend command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Backend command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T03:26:01.290Z — VERIFY — ok

    By: CODER

    Note: Verified backend command decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --config vitest.workspace.ts (21 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 19 to 18; backend.ts is 352 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:21:56.722Z, excerpt_hash=sha256:6da40d103f05f78a7444f9a581aab8801f4109e0d3d9986a098dc76e76a268fa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290321-43ZECH/blueprint/resolved-snapshot.json
    - old_digest: ed164bce3041f2f4d28cfec7e54e0b7a3795e1b9321c2200d613767c277842ad
    - current_digest: ed164bce3041f2f4d28cfec7e54e0b7a3795e1b9321c2200d613767c277842ad
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290321-43ZECH

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Backend command decomposition

Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.

## Scope

- In scope: Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.
- Out of scope: unrelated refactors not required for "Backend command decomposition".

## Plan

Refactor backend command hotspot with a single behavior-preserving extraction.

Scope:
- Extract backend connect config writing and dotenv upsert/quoting helpers from packages/agentplane/src/commands/backend.ts into a focused backend-connect module.
- Keep public command entrypoint behavior, output text, error mapping, and network approval behavior unchanged.
- Keep backend.ts below the 400-line runtime hotspot warning threshold.

Verify:
- Run targeted backend command tests if present, or the closest CLI/core tests covering backend commands.
- Run bun run typecheck.
- Run bun run arch:check.
- Run bun run knip:check.
- Run bun run lint:core.
- Run bun run format:changed.
- Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 19 to 18.

## Verify Steps

PLANNER fallback scaffold for "Backend command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Backend command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T03:26:01.290Z — VERIFY — ok

By: CODER

Note: Verified backend command decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --config vitest.workspace.ts (21 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 19 to 18; backend.ts is 352 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:21:56.722Z, excerpt_hash=sha256:6da40d103f05f78a7444f9a581aab8801f4109e0d3d9986a098dc76e76a268fa

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290321-43ZECH/blueprint/resolved-snapshot.json
- old_digest: ed164bce3041f2f4d28cfec7e54e0b7a3795e1b9321c2200d613767c277842ad
- current_digest: ed164bce3041f2f4d28cfec7e54e0b7a3795e1b9321c2200d613767c277842ad
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290321-43ZECH

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
