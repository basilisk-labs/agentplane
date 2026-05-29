---
id: "202605290543-WSRP8V"
title: "PR flow status render decomposition"
result_summary: "Merged via PR #4290."
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
  updated_at: "2026-05-29T05:43:21.540Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T05:45:57.703Z"
  updated_by: "CODER"
  note: "PR flow status text rendering extracted into flow-status.render.ts; flow-status.ts reduced to 367 lines while preserving report resolution and output rows."
  attempts: 0
commit:
  hash: "5e0036d4b83cc212d96eebdf827e87c277e8c0ac"
  message: "♻️ WSRP8V pr: decompose flow status rendering"
comments:
  -
    author: "CODER"
    body: "Start: Extract PR flow status text rendering while preserving report resolution and output."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4290 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T05:43:31.419Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract PR flow status text rendering while preserving report resolution and output."
  -
    type: "verify"
    at: "2026-05-29T05:45:57.703Z"
    author: "CODER"
    state: "ok"
    note: "PR flow status text rendering extracted into flow-status.render.ts; flow-status.ts reduced to 367 lines while preserving report resolution and output rows."
  -
    type: "status"
    at: "2026-05-29T05:50:02.678Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4290 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T05:50:02.682Z"
doc_updated_by: "INTEGRATOR"
description: "Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output."
sections:
  Summary: |-
    PR flow status render decomposition

    Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.
  Scope: |-
    - In scope: Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.
    - Out of scope: unrelated refactors not required for "PR flow status render decomposition".
  Plan: "Scope: reduce packages/agentplane/src/commands/pr/flow-status.ts below the 400-line hotspot warning by extracting text rendering helpers into focused module(s). Preserve resolvePrFlowStatus behavior, JSON report shape, and text output labels/values. Acceptance: PR flow status tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "PR flow status render decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "PR flow status render decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T05:45:57.703Z — VERIFY — ok

    By: CODER

    Note: PR flow status text rendering extracted into flow-status.render.ts; flow-status.ts reduced to 367 lines while preserving report resolution and output rows.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:43:31.419Z, excerpt_hash=sha256:b07b78319475670b45d53649db996a8cb5d6c3f68a5f4cd2e37d71bacbd38f8b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290543-WSRP8V/blueprint/resolved-snapshot.json
    - old_digest: 49c4bb2d80229e6eb79eb8228cf89ded9daba997ed23f788d44e16dc88861539
    - current_digest: 49c4bb2d80229e6eb79eb8228cf89ded9daba997ed23f788d44e16dc88861539
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290543-WSRP8V

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
      Impact: JSON report shape, PR/close-tail resolution, hosted checks, review threads, queue, handoff, and text labels remain covered by PR flow status tests.
      Resolution: Runtime hotspot warnings dropped from 7 to 6; flow-status.ts is now below 400 lines.
id_source: "generated"
---
## Summary

PR flow status render decomposition

Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.

## Scope

- In scope: Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.
- Out of scope: unrelated refactors not required for "PR flow status render decomposition".

## Plan

Scope: reduce packages/agentplane/src/commands/pr/flow-status.ts below the 400-line hotspot warning by extracting text rendering helpers into focused module(s). Preserve resolvePrFlowStatus behavior, JSON report shape, and text output labels/values. Acceptance: PR flow status tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "PR flow status render decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "PR flow status render decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T05:45:57.703Z — VERIFY — ok

By: CODER

Note: PR flow status text rendering extracted into flow-status.render.ts; flow-status.ts reduced to 367 lines while preserving report resolution and output rows.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:43:31.419Z, excerpt_hash=sha256:b07b78319475670b45d53649db996a8cb5d6c3f68a5f4cd2e37d71bacbd38f8b

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290543-WSRP8V/blueprint/resolved-snapshot.json
- old_digest: 49c4bb2d80229e6eb79eb8228cf89ded9daba997ed23f788d44e16dc88861539
- current_digest: 49c4bb2d80229e6eb79eb8228cf89ded9daba997ed23f788d44e16dc88861539
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290543-WSRP8V

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
  Impact: JSON report shape, PR/close-tail resolution, hosted checks, review threads, queue, handoff, and text labels remain covered by PR flow status tests.
  Resolution: Runtime hotspot warnings dropped from 7 to 6; flow-status.ts is now below 400 lines.
