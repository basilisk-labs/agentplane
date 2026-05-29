---
id: "202605290522-S96Y5J"
title: "Prompt module registry decomposition"
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
  updated_at: "2026-05-29T05:22:19.077Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T05:25:51.201Z"
  updated_by: "CODER"
  note: "Prompt module registry construction helpers extracted into registry.factory.ts; registry.ts reduced to 216 lines while preserving framework prompt module graph exports."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract prompt module registry construction helpers while preserving framework prompt graph output."
events:
  -
    type: "status"
    at: "2026-05-29T05:22:36.575Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract prompt module registry construction helpers while preserving framework prompt graph output."
  -
    type: "verify"
    at: "2026-05-29T05:25:51.201Z"
    author: "CODER"
    state: "ok"
    note: "Prompt module registry construction helpers extracted into registry.factory.ts; registry.ts reduced to 216 lines while preserving framework prompt module graph exports."
doc_version: 3
doc_updated_at: "2026-05-29T05:25:51.226Z"
doc_updated_by: "CODER"
description: "Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior."
sections:
  Summary: |-
    Prompt module registry decomposition

    Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.
  Scope: |-
    - In scope: Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.
    - Out of scope: unrelated refactors not required for "Prompt module registry decomposition".
  Plan: "Scope: reduce packages/agentplane/src/runtime/prompt-modules/registry.ts below the 400-line hotspot warning by extracting prompt module construction/shared factory helpers into focused module(s). Preserve loadFrameworkPromptModules/loadFrameworkPromptModuleRegistry/buildFrameworkExecutionProfilePromptModule behavior, module address/content hash stability, and prompt graph sorting. Acceptance: prompt module registry tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prompt module registry decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prompt module registry decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T05:25:51.201Z — VERIFY — ok

    By: CODER

    Note: Prompt module registry construction helpers extracted into registry.factory.ts; registry.ts reduced to 216 lines while preserving framework prompt module graph exports.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:22:36.575Z, excerpt_hash=sha256:5bffe277d2fa3a1c37b44902a39b4da997d9214878d678e91b38a7dcff09ed3a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290522-S96Y5J/blueprint/resolved-snapshot.json
    - old_digest: e0a427f80cb2f1af29936c1d6c13920df0d55761e4646fd6f08bb23f2eb20b5f
    - current_digest: e0a427f80cb2f1af29936c1d6c13920df0d55761e4646fd6f08bb23f2eb20b5f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290522-S96Y5J

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
      Impact: Framework gateway, policy, agent profile, runner, and execution profile prompt module loading behavior remains covered by registry tests.
      Resolution: Runtime hotspot warnings dropped from 9 to 8; registry.ts is now below 400 lines.
id_source: "generated"
---
## Summary

Prompt module registry decomposition

Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.

## Scope

- In scope: Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.
- Out of scope: unrelated refactors not required for "Prompt module registry decomposition".

## Plan

Scope: reduce packages/agentplane/src/runtime/prompt-modules/registry.ts below the 400-line hotspot warning by extracting prompt module construction/shared factory helpers into focused module(s). Preserve loadFrameworkPromptModules/loadFrameworkPromptModuleRegistry/buildFrameworkExecutionProfilePromptModule behavior, module address/content hash stability, and prompt graph sorting. Acceptance: prompt module registry tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "Prompt module registry decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prompt module registry decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T05:25:51.201Z — VERIFY — ok

By: CODER

Note: Prompt module registry construction helpers extracted into registry.factory.ts; registry.ts reduced to 216 lines while preserving framework prompt module graph exports.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:22:36.575Z, excerpt_hash=sha256:5bffe277d2fa3a1c37b44902a39b4da997d9214878d678e91b38a7dcff09ed3a

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290522-S96Y5J/blueprint/resolved-snapshot.json
- old_digest: e0a427f80cb2f1af29936c1d6c13920df0d55761e4646fd6f08bb23f2eb20b5f
- current_digest: e0a427f80cb2f1af29936c1d6c13920df0d55761e4646fd6f08bb23f2eb20b5f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290522-S96Y5J

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
  Impact: Framework gateway, policy, agent profile, runner, and execution profile prompt module loading behavior remains covered by registry tests.
  Resolution: Runtime hotspot warnings dropped from 9 to 8; registry.ts is now below 400 lines.
