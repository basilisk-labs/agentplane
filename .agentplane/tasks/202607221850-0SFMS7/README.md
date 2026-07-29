---
id: "202607221850-0SFMS7"
title: "Supervise direct task execution end to end"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221849-8YYZ9X"
  - "202607221850-8HBF4J"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
  - "202607242236-1BFWEY"
tags:
  - "direct"
  - "milestone-beta1"
  - "refactor"
  - "rf-10"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T01:35:28.740Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-29T01:35:45.315Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T01:35:45.315Z"
doc_updated_by: "CODER"
description: "RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops."
sections:
  Summary: |-
    Supervise direct task execution end to end

    RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops.
  Scope: |-
    - In scope: direct workflow lifecycle automation, state refresh after each operation, zero EXECUTOR lifecycle calls, start/check/evaluate/finalize operations, retries, approvals, waits, human input, and golden scenario metrics.
    - Out of scope: branch_pr provider/PR/merge integration.
  Plan: |-
    1. Map the direct lifecycle onto typed supervisor operations and episode boundaries.
    2. Prepare a role-specific EXECUTOR work order and launch through typed runner results.
    3. Observe process/Git/check/artifact evidence and run the EVALUATOR episode.
    4. Apply safe post-operations until terminal or an approval/wait/human step.
    5. Compare golden-path quality and orchestration cost to the 0.6.24 baseline.
  Verify Steps: |-
    1. Run the approved direct golden task. Expected: EXECUTOR performs zero AgentPlane lifecycle calls; supervisor starts, observes, evaluates, verifies, and finalizes.
    2. Change route state after every operation fixture. Expected: the supervisor recomputes from fresh state and never executes a stale next step.
    3. Exercise approval required, missing knowledge, evaluator rework, out-of-scope write, and adapter crash. Expected: bounded typed stops/retries with no synthesized semantic summary.
    4. Compare baseline metrics. Expected: lifecycle/tool/duplicate-context cost decreases without lower verified success or safety.
    5. Run direct workflow coverage, lifecycle invariants, contract CI, and focused tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "950e9cd2f222c12d16e930bdb8a3e39237659651"
    version: 1
id_source: "generated"
---
## Summary

Supervise direct task execution end to end

RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops.

## Scope

- In scope: direct workflow lifecycle automation, state refresh after each operation, zero EXECUTOR lifecycle calls, start/check/evaluate/finalize operations, retries, approvals, waits, human input, and golden scenario metrics.
- Out of scope: branch_pr provider/PR/merge integration.

## Plan

1. Map the direct lifecycle onto typed supervisor operations and episode boundaries.
2. Prepare a role-specific EXECUTOR work order and launch through typed runner results.
3. Observe process/Git/check/artifact evidence and run the EVALUATOR episode.
4. Apply safe post-operations until terminal or an approval/wait/human step.
5. Compare golden-path quality and orchestration cost to the 0.6.24 baseline.

## Verify Steps

1. Run the approved direct golden task. Expected: EXECUTOR performs zero AgentPlane lifecycle calls; supervisor starts, observes, evaluates, verifies, and finalizes.
2. Change route state after every operation fixture. Expected: the supervisor recomputes from fresh state and never executes a stale next step.
3. Exercise approval required, missing knowledge, evaluator rework, out-of-scope write, and adapter crash. Expected: bounded typed stops/retries with no synthesized semantic summary.
4. Compare baseline metrics. Expected: lifecycle/tool/duplicate-context cost decreases without lower verified success or safety.
5. Run direct workflow coverage, lifecycle invariants, contract CI, and focused tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
