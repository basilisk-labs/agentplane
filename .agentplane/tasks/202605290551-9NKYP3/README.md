---
id: "202605290551-9NKYP3"
title: "Workflow transition service decomposition"
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
  updated_at: "2026-05-29T05:52:03.951Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T05:54:39.103Z"
  updated_by: "CODER"
  note: "Workflow transition verification rendering/hash helpers extracted into workflow-transition-verification.ts; workflow-transition-service.ts reduced to 353 lines while preserving transition APIs."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract workflow transition verification rendering helpers while preserving task lifecycle transition behavior."
events:
  -
    type: "status"
    at: "2026-05-29T05:52:16.492Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract workflow transition verification rendering helpers while preserving task lifecycle transition behavior."
  -
    type: "verify"
    at: "2026-05-29T05:54:39.103Z"
    author: "CODER"
    state: "ok"
    note: "Workflow transition verification rendering/hash helpers extracted into workflow-transition-verification.ts; workflow-transition-service.ts reduced to 353 lines while preserving transition APIs."
doc_version: 3
doc_updated_at: "2026-05-29T05:54:39.128Z"
doc_updated_by: "CODER"
description: "Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior."
sections:
  Summary: |-
    Workflow transition service decomposition

    Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.
  Scope: |-
    - In scope: Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.
    - Out of scope: unrelated refactors not required for "Workflow transition service decomposition".
  Plan: "Scope: reduce packages/agentplane/src/commands/task/shared/workflow-transition-service.ts below the 400-line hotspot warning by extracting verification rendering/hash helpers into focused module(s). Preserve task status transition behavior, verification transition behavior, verification section marker layout, VerifyStepsRef hashing, and exported service APIs. Acceptance: workflow-transition-service unit tests pass, relevant task lifecycle tests pass or nearest surface is documented, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "Workflow transition service decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Workflow transition service decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T05:54:39.103Z — VERIFY — ok

    By: CODER

    Note: Workflow transition verification rendering/hash helpers extracted into workflow-transition-verification.ts; workflow-transition-service.ts reduced to 353 lines while preserving transition APIs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:52:16.492Z, excerpt_hash=sha256:466bfb144ab87311d273e3983a78dcb3f43824311e19a356d59d14b8c22a9185

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290551-9NKYP3/blueprint/resolved-snapshot.json
    - old_digest: 7e4a7bdc30b05af17ca0d92d105f3ffbc6e86dfc8ef5a15b675206a2cc691aad
    - current_digest: 7e4a7bdc30b05af17ca0d92d105f3ffbc6e86dfc8ef5a15b675206a2cc691aad
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290551-9NKYP3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
      Impact: Task status transitions, verification state transitions, verification marker insertion, VerifyStepsRef hashing, and rework blocking behavior remain covered by workflow-transition-service unit tests.
      Resolution: Runtime hotspot warnings dropped from 6 to 5; workflow-transition-service.ts is now below 400 lines.
id_source: "generated"
---
## Summary

Workflow transition service decomposition

Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.

## Scope

- In scope: Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.
- Out of scope: unrelated refactors not required for "Workflow transition service decomposition".

## Plan

Scope: reduce packages/agentplane/src/commands/task/shared/workflow-transition-service.ts below the 400-line hotspot warning by extracting verification rendering/hash helpers into focused module(s). Preserve task status transition behavior, verification transition behavior, verification section marker layout, VerifyStepsRef hashing, and exported service APIs. Acceptance: workflow-transition-service unit tests pass, relevant task lifecycle tests pass or nearest surface is documented, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "Workflow transition service decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Workflow transition service decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T05:54:39.103Z — VERIFY — ok

By: CODER

Note: Workflow transition verification rendering/hash helpers extracted into workflow-transition-verification.ts; workflow-transition-service.ts reduced to 353 lines while preserving transition APIs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:52:16.492Z, excerpt_hash=sha256:466bfb144ab87311d273e3983a78dcb3f43824311e19a356d59d14b8c22a9185

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290551-9NKYP3/blueprint/resolved-snapshot.json
- old_digest: 7e4a7bdc30b05af17ca0d92d105f3ffbc6e86dfc8ef5a15b675206a2cc691aad
- current_digest: 7e4a7bdc30b05af17ca0d92d105f3ffbc6e86dfc8ef5a15b675206a2cc691aad
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290551-9NKYP3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
  Impact: Task status transitions, verification state transitions, verification marker insertion, VerifyStepsRef hashing, and rework blocking behavior remain covered by workflow-transition-service unit tests.
  Resolution: Runtime hotspot warnings dropped from 6 to 5; workflow-transition-service.ts is now below 400 lines.
