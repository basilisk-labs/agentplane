---
id: "202608021534-YN84E1"
title: "Harden the v0.7.1 guided lifecycle and canonical help surface"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "trust-boundary"
  - "ux"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-guided.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run docs:cli:check"
  - "bun run docs:bootstrap:check"
  - "bun run docs:ia:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "bun run test:critical"
  - "node scripts/qualification/check-v0.7.1-product-contract.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T19:28:09.490Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T20:38:34.056Z"
  updated_by: "CODER"
  note: "Fresh verification for 15c1edc58: formatting, typecheck, focused guided lifecycle tests, critical suite (77 tests), static/docs/policy checks, and v0.7.1 product contract pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T20:40:07.002Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "15c1edc58761832097756ba8bc56cc78181fd2f8"
  blueprint_digest: "228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545"
  evidence_refs:
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021534-YN84E1/README.md"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608021534-YN84E1/quality/20260802-204006529-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The only implementation delta since the accepted semantic review is Prettier line wrapping in the guided lifecycle test and task complete option description; no control flow, provenance, gate, or assertion meaning changed."
    - "Fresh verification record binds the complete declared suite to 15c1edc58761832097756ba8bc56cc78181fd2f8, closing the stale-evidence condition exposed by the rework."
commit:
  hash: "a47c0ec01b991c13340e236c6b98a91a9fdc3f29"
  message: "✅ YN84E1 task: record current-head evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: guided lifecycle boundaries, canonical help, compatibility ratchet, focused regressions, and v0.7.1 product contract."
  -
    author: "CODER"
    body: "Implementation rework committed: truthful plan provenance, legacy synthetic-plan migration guard, and missing runner-receipt regression."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T19:28:52.499Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T20:12:32.908Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: guided lifecycle boundaries, canonical help, compatibility ratchet, focused regressions, and v0.7.1 product contract."
  -
    type: "verify"
    at: "2026-08-02T20:15:06.679Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, policy routing, v0.7.1 product contract, and critical-cli 77/77 all passed against f4870b156d51."
  -
    type: "status"
    at: "2026-08-02T20:25:05.714Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: truthful plan provenance, legacy synthetic-plan migration guard, and missing runner-receipt regression."
  -
    type: "verify"
    at: "2026-08-02T20:27:03.945Z"
    author: "TESTER"
    state: "ok"
    note: "PASS after evaluator rework at 534adaa8862d: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, routing, product contract, compatibility ratchet, and critical-cli 77/77 passed."
  -
    type: "status"
    at: "2026-08-02T20:28:21.412Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-02T20:38:34.056Z"
    author: "CODER"
    state: "ok"
    note: "Fresh verification for 15c1edc58: formatting, typecheck, focused guided lifecycle tests, critical suite (77 tests), static/docs/policy checks, and v0.7.1 product contract pass."
  -
    type: "status"
    at: "2026-08-02T20:41:49.624Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T20:41:49.624Z"
doc_updated_by: "CODER"
description: "Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run."
sections:
  Summary: |-
    Harden the v0.7.1 guided lifecycle and canonical help surface

    Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
  Scope: |-
    - In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
    - Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".
  Plan: |-
    1. Map the current task begin, task complete, task advance, task run, quickstart, README, and default help paths to one explicit supervisor contract while preserving advanced compatibility entrypoints.
    2. Change task begin so it creates or prepares the task and stops at a typed semantic planning boundary without synthesizing or approving a task-specific plan.
    3. Change task complete so normal closure fails closed unless matching observed checks and an evaluator or explicit human verdict are present; retain any compatibility bypass only as an explicit unsafe advanced path with durable evidence.
    4. Make task advance and task run share the same state-machine boundary semantics, promote them in README and quickstart, and limit default help to 10-12 canonical operations while moving aliases, recovery, and maintainer commands behind advanced discovery.
    5. Add focused contract and regression tests for every allowed and rejected path, then run docs:check, test:critical, and the v0.7.1 product-contract gate.
  Verify Steps: |-
    1. Run the focused cli-core lifecycle/help suite listed in task verify. Expected: begin stops on a PLANNER semantic boundary; normal complete rejects missing observed checks or missing evaluator/human verdict; the unsafe compatibility override requires explicit operator confirmation and leaves durable history; advance and run expose the same state-machine boundary.
    2. Run typecheck, lint:core, docs:cli:check, docs:bootstrap:check, docs:ia:check, and the policy routing check. Expected: default help exposes no more than 12 canonical operations, promotes task advance/task run, generated docs are current, and repository policy remains valid.
    3. Run test:critical and scripts/qualification/check-v0.7.1-product-contract.mjs. Expected: all trust-boundary, recovery, package, compatibility-ratchet, and v0.7.1 product gates pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T20:15:06.679Z — VERIFY — ok

    By: TESTER

    Note: PASS: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, policy routing, v0.7.1 product contract, and critical-cli 77/77 all passed against f4870b156d51.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:12:32.908Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
    - old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021534-YN84E1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021534-YN84E1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T20:27:03.945Z — VERIFY — ok

    By: TESTER

    Note: PASS after evaluator rework at 534adaa8862d: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, routing, product contract, compatibility ratchet, and critical-cli 77/77 passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:25:05.714Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
    - old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021534-YN84E1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T20:38:34.056Z — VERIFY — ok

    By: CODER

    Note: Fresh verification for 15c1edc58: formatting, typecheck, focused guided lifecycle tests, critical suite (77 tests), static/docs/policy checks, and v0.7.1 product contract pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:28:21.412Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
    - old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021534-YN84E1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Guided lifecycle now preserves the PLANNER semantic boundary, refuses synthetic verification, and exposes 11 canonical top-level help operations.
      Impact: The normal path is fail-closed while the legacy unobserved closeout path is explicit and auditable.
      Resolution: No verification defects or residual gaps found in the approved scope.

    - Observation: Legacy approved synthetic plans now stop at PLANNER; explicit compatibility plans use PLANNER provenance; missing runner receipts fail closed before the audited override.
      Impact: The evaluator findings are resolved without weakening compatibility or existing gates.
      Resolution: Fresh verification evidence is bound to implementation SHA 534adaa8862d.

    - Observation: Hosted verify-contract failed only because two changed files were not Prettier-formatted.
      Impact: PR integration was blocked; no functional regression was observed.
      Resolution: Formatted the two files, rebuilt the repo-local runtime, and reran all declared gates successfully.
extensions:
  implementation_commit:
    hash: "15c1edc58761832097756ba8bc56cc78181fd2f8"
    message: "🚧 YN84E1 task: fix guided lifecycle formatting"
  workflow_route_baseline:
    start_head_sha: "ed94f65a0ff27eaf0b0add2413780630a87e838b"
    version: 1
id_source: "generated"
---
## Summary

Harden the v0.7.1 guided lifecycle and canonical help surface

Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.

## Scope

- In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
- Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".

## Plan

1. Map the current task begin, task complete, task advance, task run, quickstart, README, and default help paths to one explicit supervisor contract while preserving advanced compatibility entrypoints.
2. Change task begin so it creates or prepares the task and stops at a typed semantic planning boundary without synthesizing or approving a task-specific plan.
3. Change task complete so normal closure fails closed unless matching observed checks and an evaluator or explicit human verdict are present; retain any compatibility bypass only as an explicit unsafe advanced path with durable evidence.
4. Make task advance and task run share the same state-machine boundary semantics, promote them in README and quickstart, and limit default help to 10-12 canonical operations while moving aliases, recovery, and maintainer commands behind advanced discovery.
5. Add focused contract and regression tests for every allowed and rejected path, then run docs:check, test:critical, and the v0.7.1 product-contract gate.

## Verify Steps

1. Run the focused cli-core lifecycle/help suite listed in task verify. Expected: begin stops on a PLANNER semantic boundary; normal complete rejects missing observed checks or missing evaluator/human verdict; the unsafe compatibility override requires explicit operator confirmation and leaves durable history; advance and run expose the same state-machine boundary.
2. Run typecheck, lint:core, docs:cli:check, docs:bootstrap:check, docs:ia:check, and the policy routing check. Expected: default help exposes no more than 12 canonical operations, promotes task advance/task run, generated docs are current, and repository policy remains valid.
3. Run test:critical and scripts/qualification/check-v0.7.1-product-contract.mjs. Expected: all trust-boundary, recovery, package, compatibility-ratchet, and v0.7.1 product gates pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T20:15:06.679Z — VERIFY — ok

By: TESTER

Note: PASS: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, policy routing, v0.7.1 product contract, and critical-cli 77/77 all passed against f4870b156d51.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:12:32.908Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
- old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021534-YN84E1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021534-YN84E1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T20:27:03.945Z — VERIFY — ok

By: TESTER

Note: PASS after evaluator rework at 534adaa8862d: focused cli-core 41/41; typecheck, lint:core, docs CLI/bootstrap/IA, routing, product contract, compatibility ratchet, and critical-cli 77/77 passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:25:05.714Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
- old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021534-YN84E1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T20:38:34.056Z — VERIFY — ok

By: CODER

Note: Fresh verification for 15c1edc58: formatting, typecheck, focused guided lifecycle tests, critical suite (77 tests), static/docs/policy checks, and v0.7.1 product contract pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T20:28:21.412Z, excerpt_hash=sha256:93c77de31234a18ca42729ff860e4cecf28c907784c9a14f14e0455d82f68747

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-YN84E1-harden-the-v0-7-1-guided-lifecycle-and-canonical/.agentplane/tasks/202608021534-YN84E1/blueprint/resolved-snapshot.json
- old_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- current_digest: 228623a3c88aa1f88bdb785f46b9543396f15e95c23988ad898e30dac7823545
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021534-YN84E1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Guided lifecycle now preserves the PLANNER semantic boundary, refuses synthetic verification, and exposes 11 canonical top-level help operations.
  Impact: The normal path is fail-closed while the legacy unobserved closeout path is explicit and auditable.
  Resolution: No verification defects or residual gaps found in the approved scope.

- Observation: Legacy approved synthetic plans now stop at PLANNER; explicit compatibility plans use PLANNER provenance; missing runner receipts fail closed before the audited override.
  Impact: The evaluator findings are resolved without weakening compatibility or existing gates.
  Resolution: Fresh verification evidence is bound to implementation SHA 534adaa8862d.

- Observation: Hosted verify-contract failed only because two changed files were not Prettier-formatted.
  Impact: PR integration was blocked; no functional regression was observed.
  Resolution: Formatted the two files, rebuilt the repo-local runtime, and reran all declared gates successfully.
