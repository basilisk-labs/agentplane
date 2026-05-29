---
id: "202605291931-PPJZ35"
title: "Fix fresh feedback issues 4312-4315"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "feedback"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T19:31:36.881Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T20:29:41.653Z"
  updated_by: "CODER"
  note: "Hosted PR verification is green for PR #4316 head 73b4fd790c3cd88feb223f84a03b29467d368f2c; GitHub checks pass: PR verification, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-contract, verify-coverage, test-windows, docs, plan, CodeQL. Local checks passed: targeted tests, typecheck, lint:core, format:check, policy routing, ap doctor."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: investigate and fix GitHub feedback issues #4312-#4315 in a dedicated branch_pr worktree, with focused regression coverage and routing policy verification."
events:
  -
    type: "status"
    at: "2026-05-29T19:32:19.513Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigate and fix GitHub feedback issues #4312-#4315 in a dedicated branch_pr worktree, with focused regression coverage and routing policy verification."
  -
    type: "verify"
    at: "2026-05-29T19:40:52.943Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings."
  -
    type: "verify"
    at: "2026-05-29T19:51:24.881Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings. Hosted check follow-up: CI verify-static initially failed on lint in this diff; local lint now passes after correction."
  -
    type: "verify"
    at: "2026-05-29T20:29:41.653Z"
    author: "CODER"
    state: "ok"
    note: "Hosted PR verification is green for PR #4316 head 73b4fd790c3cd88feb223f84a03b29467d368f2c; GitHub checks pass: PR verification, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-contract, verify-coverage, test-windows, docs, plan, CodeQL. Local checks passed: targeted tests, typecheck, lint:core, format:check, policy routing, ap doctor."
doc_version: 3
doc_updated_at: "2026-05-29T20:29:41.690Z"
doc_updated_by: "CODER"
description: "Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang."
sections:
  Summary: |-
    Fix fresh feedback issues 4312-4315

    Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.
  Scope: |-
    - In scope: Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.
    - Out of scope: unrelated refactors not required for "Fix fresh feedback issues 4312-4315".
  Plan: |-
    1. Reproduce and inspect the code paths behind GitHub issues #4312-#4315: runner route liveness, policy hooks/staging behavior, task plan reject, and unexpected task creation during closeout.
    2. Implement minimal source fixes in the relevant CLI/runtime/hook modules without changing unrelated task artifacts.
    3. Add focused regression tests for the corrected behavior, prioritizing stale dead runner route handling and plan reject/hook side effects.
    4. Run task verify-show, focused tests, typecheck if impacted, node .agentplane/policy/check-routing.mjs, and agentplane doctor; record verification in the task.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts`. Expected: route runner-liveness and cloud backend regressions pass.
    2. Run `bun run typecheck`. Expected: TypeScript project references compile.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing budgets and gateway imports pass.
    4. Run `ap doctor`. Expected: repo-local runtime and policy checks are healthy, or any unrelated pre-existing warnings are recorded in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T19:40:52.943Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:39:52.984Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
    - old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

    ### 2026-05-29T19:51:24.881Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings. Hosted check follow-up: CI verify-static initially failed on lint in this diff; local lint now passes after correction.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:40:52.974Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
    - old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

    ### 2026-05-29T20:29:41.653Z — VERIFY — ok

    By: CODER

    Note: Hosted PR verification is green for PR #4316 head 73b4fd790c3cd88feb223f84a03b29467d368f2c; GitHub checks pass: PR verification, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-contract, verify-coverage, test-windows, docs, plan, CodeQL. Local checks passed: targeted tests, typecheck, lint:core, format:check, policy routing, ap doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:51:24.912Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
    - old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix fresh feedback issues 4312-4315

Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.

## Scope

- In scope: Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.
- Out of scope: unrelated refactors not required for "Fix fresh feedback issues 4312-4315".

## Plan

1. Reproduce and inspect the code paths behind GitHub issues #4312-#4315: runner route liveness, policy hooks/staging behavior, task plan reject, and unexpected task creation during closeout.
2. Implement minimal source fixes in the relevant CLI/runtime/hook modules without changing unrelated task artifacts.
3. Add focused regression tests for the corrected behavior, prioritizing stale dead runner route handling and plan reject/hook side effects.
4. Run task verify-show, focused tests, typecheck if impacted, node .agentplane/policy/check-routing.mjs, and agentplane doctor; record verification in the task.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts`. Expected: route runner-liveness and cloud backend regressions pass.
2. Run `bun run typecheck`. Expected: TypeScript project references compile.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing budgets and gateway imports pass.
4. Run `ap doctor`. Expected: repo-local runtime and policy checks are healthy, or any unrelated pre-existing warnings are recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T19:40:52.943Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:39:52.984Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
- old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

### 2026-05-29T19:51:24.881Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with info-only repo-local handoff findings. Hosted check follow-up: CI verify-static initially failed on lint in this diff; local lint now passes after correction.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:40:52.974Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
- old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

### 2026-05-29T20:29:41.653Z — VERIFY — ok

By: CODER

Note: Hosted PR verification is green for PR #4316 head 73b4fd790c3cd88feb223f84a03b29467d368f2c; GitHub checks pass: PR verification, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-contract, verify-coverage, test-windows, docs, plan, CodeQL. Local checks passed: targeted tests, typecheck, lint:core, format:check, policy routing, ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:51:24.912Z, excerpt_hash=sha256:3b01a732eed672640c22d9fecf81cedab6c4e3626c6c10877a8eb9f97c7dbdf2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291931-PPJZ35-fix-fresh-feedback-issues-4312-4315/.agentplane/tasks/202605291931-PPJZ35/blueprint/resolved-snapshot.json
- old_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- current_digest: b1c748cd499387e9d65234ceb0dcb0e5a5a9ab9035962bba71282c555f7a725b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291931-PPJZ35

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
