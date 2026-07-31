---
id: "202607221908-2NDXVB"
title: "Migrate task, lifecycle, and route command boundaries"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221848-VBV9B1"
  - "202607221848-VC4VVS"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T22:59:56.898Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T23:36:22.971Z"
  updated_by: "TESTER"
  note: "Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering, invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout classified against clean main."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-31T23:51:42.183Z"
  updated_by: "HUMAN"
  note: "Both PR capability-boundary findings are corrected on the current head: remote authority grants use a declared remote/provider session selected by parsed intent, while observation triage uses the read-only profile."
  evaluated_sha: "24e064bc3161bf5fab78e620a22894ce38e45f6a"
  blueprint_digest: "6da3bd6e284423315e176aa3e368fb2af9851d74b332cbeff5f6e150e24d64ec"
  evidence_refs:
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-2NDXVB/README.md"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-2NDXVB/quality/20260731-235142000-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - ".agentplane/tasks/202607221908-2NDXVB/verification/task-lifecycle-route-migration.md"
    - "24e064bc3161bf5fab78e620a22894ce38e45f6a"
  findings:
    - "The authority-grant profile is the union of lifecycle mutation and remote route capabilities; local grants remain provider-lazy and remote grants are now visible to capability enforcement and tracing."
    - "Observation triage now matches its implementation, which only reads and summarizes observation entries."
commit:
  hash: "3d0c443f35f59420efd5473ec0626d2264fb4c00"
  message: "🧪 2NDXVB task: refresh review evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: granular task, lifecycle, and route command sessions with lazy provider resolution and typed task plan results."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T23:00:26.665Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T23:35:58.735Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: granular task, lifecycle, and route command sessions with lazy provider resolution and typed task plan results."
  -
    type: "verify"
    at: "2026-07-31T23:36:22.971Z"
    author: "TESTER"
    state: "ok"
    note: "Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering, invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout classified against clean main."
  -
    type: "status"
    at: "2026-07-31T23:37:55.748Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-31T23:52:56.850Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T23:52:56.865Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout."
sections:
  Summary: |-
    Migrate task, lifecycle, and route command boundaries

    RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout.
  Scope: |-
    - In scope: task read/write, plan/start/verify/finish, brief/next-action/status, worktree/PR route projections, granular backend/Git/route/policy capabilities, typed results/errors, and human/JSON compatibility rendering.
    - Out of scope: context, runner/Hermes, and provider/release operation execution.
  Plan: |-
    1. Group task/lifecycle/route handlers by exact capability sets.
    2. Route all decisions through typed WorkflowStep/WorkOrder results.
    3. Extract typed mutations and renderers from command IO.
    4. Remove duplicate route reconstruction and broad session access.
    5. Run lifecycle matrix, local/backend parity, snapshots, and laziness tests.
  Verify Steps: |-
    1. Exercise every lifecycle phase in direct and branch_pr fixtures. Expected: one typed route result supplies compatible outputs and exact capabilities.
    2. Attempt undeclared backend/Git/provider access. Expected: denied before side effects.
    3. Search this family for stdout parsing and independent route classification. Expected: none remain.
    4. Run task/route tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T23:36:22.971Z — VERIFY — ok

    By: TESTER

    Note: Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering, invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout classified against clean main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T23:35:58.735Z, excerpt_hash=sha256:1f16e7eba51c91fb7b5510a8701d1fa60a252a9deb593df3e486df5e833d34e6

    Details:

    # Task, lifecycle, and route capability migration

    - `bun run typecheck`: passed.
    - `bun run format:check`: passed.
    - `bun run lint:core`: passed.
    - `bun run arch:check`: passed; dependency-cruiser used `typescript@6.0.3` and reported zero violations.
    - `bun run knip:check`: passed at the existing 545-entry baseline.
    - `bun run guards:check`: passed, including the trust-boundary ratchet.
    - `bun run lifecycle:invariants`: passed, 8 invariants.
    - `bun run test:critical`: passed, 12/12 chunks.
    - Focused catalog/session/route/workflow/mutation matrix: passed, 91 tests.
    - Focused `task begin` direct and branch_pr fixtures: passed, 2 tests.
    - Focused plan/catalog/session suite under Vitest: passed, 28 tests.
    - `bun run test:fast`: 510/511 files and 3577/3579 tests passed; two cases in `task-run-lifecycle-replay-security.test.ts` exceeded the shared 30-second timeout under full-suite load.
    - Isolated replay-security rerun on this task branch: passed, 10/10 tests.
    - Isolated replay-security control rerun on clean `main` at `68b71790527489b13f868deede5a8de4552117cb`: passed, 10/10 tests with the same approximately 44-second aggregate test runtime.
  Rollback Plan: |-
    - Revert this family to explicit compatibility adapters without changing persisted task truth.
    - Restore the prior renderer only for the affected commands.
    - Re-run lifecycle and backend parity fixtures.
  Findings: |-
    - Observation: Granular task and lifecycle requirements still resolve to the shared CommandContext compatibility value.
      Impact: Session access, provider laziness, and catalog requirements are enforced now, but field-level context isolation cannot be removed until the other four command-family slices converge.
      Resolution: Keep the compatibility value explicit in this slice; remove it in RF-24 fan-in after all family loaders use CommandSession profiles.
extensions:
  implementation_commit:
    hash: "24e064bc3161bf5fab78e620a22894ce38e45f6a"
    message: "🛂 2NDXVB task: enforce route capability profiles"
  workflow_route_baseline:
    start_head_sha: "68b71790527489b13f868deede5a8de4552117cb"
    version: 1
id_source: "generated"
---
## Summary

Migrate task, lifecycle, and route command boundaries

RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout.

## Scope

- In scope: task read/write, plan/start/verify/finish, brief/next-action/status, worktree/PR route projections, granular backend/Git/route/policy capabilities, typed results/errors, and human/JSON compatibility rendering.
- Out of scope: context, runner/Hermes, and provider/release operation execution.

## Plan

1. Group task/lifecycle/route handlers by exact capability sets.
2. Route all decisions through typed WorkflowStep/WorkOrder results.
3. Extract typed mutations and renderers from command IO.
4. Remove duplicate route reconstruction and broad session access.
5. Run lifecycle matrix, local/backend parity, snapshots, and laziness tests.

## Verify Steps

1. Exercise every lifecycle phase in direct and branch_pr fixtures. Expected: one typed route result supplies compatible outputs and exact capabilities.
2. Attempt undeclared backend/Git/provider access. Expected: denied before side effects.
3. Search this family for stdout parsing and independent route classification. Expected: none remain.
4. Run task/route tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T23:36:22.971Z — VERIFY — ok

By: TESTER

Note: Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering, invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout classified against clean main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T23:35:58.735Z, excerpt_hash=sha256:1f16e7eba51c91fb7b5510a8701d1fa60a252a9deb593df3e486df5e833d34e6

Details:

# Task, lifecycle, and route capability migration

- `bun run typecheck`: passed.
- `bun run format:check`: passed.
- `bun run lint:core`: passed.
- `bun run arch:check`: passed; dependency-cruiser used `typescript@6.0.3` and reported zero violations.
- `bun run knip:check`: passed at the existing 545-entry baseline.
- `bun run guards:check`: passed, including the trust-boundary ratchet.
- `bun run lifecycle:invariants`: passed, 8 invariants.
- `bun run test:critical`: passed, 12/12 chunks.
- Focused catalog/session/route/workflow/mutation matrix: passed, 91 tests.
- Focused `task begin` direct and branch_pr fixtures: passed, 2 tests.
- Focused plan/catalog/session suite under Vitest: passed, 28 tests.
- `bun run test:fast`: 510/511 files and 3577/3579 tests passed; two cases in `task-run-lifecycle-replay-security.test.ts` exceeded the shared 30-second timeout under full-suite load.
- Isolated replay-security rerun on this task branch: passed, 10/10 tests.
- Isolated replay-security control rerun on clean `main` at `68b71790527489b13f868deede5a8de4552117cb`: passed, 10/10 tests with the same approximately 44-second aggregate test runtime.

## Rollback Plan

- Revert this family to explicit compatibility adapters without changing persisted task truth.
- Restore the prior renderer only for the affected commands.
- Re-run lifecycle and backend parity fixtures.

## Findings

- Observation: Granular task and lifecycle requirements still resolve to the shared CommandContext compatibility value.
  Impact: Session access, provider laziness, and catalog requirements are enforced now, but field-level context isolation cannot be removed until the other four command-family slices converge.
  Resolution: Keep the compatibility value explicit in this slice; remove it in RF-24 fan-in after all family loaders use CommandSession profiles.

## Baseline classification

`run-cli.core.task-guided.test.ts` case `task complete records verification and finishes a direct task` fails before the changed completion path because its temporary repository omits `.agentplane/policy/dod.code.md`, which the evaluator now freezes as required policy evidence. The same case reproduces on clean `main` at `68b71790527489b13f868deede5a8de4552117cb`; it is not introduced by this task. The changed `task begin` direct and branch_pr cases pass independently.

The two `test:fast` replay-security failures were timeout-only under concurrent full-suite load. Both the task branch and clean `main` pass the entire file in isolation, so they are classified as suite-load flakiness rather than a behavioral regression in this slice.

## Residual boundary

Granular requirements now deny undeclared session access before command-context preparation and keep remote provider resolution lazy. The shared `CommandContext` remains the compatibility value behind declared context capabilities until all five vertical slices converge and the RF-24 fan-in task removes the coarse compatibility layer.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-2NDXVB-migrate-task-lifecycle-and-route-command-boundar/.agentplane/tasks/202607221908-2NDXVB/blueprint/resolved-snapshot.json
- old_digest: 6da3bd6e284423315e176aa3e368fb2af9851d74b332cbeff5f6e150e24d64ec
- current_digest: 6da3bd6e284423315e176aa3e368fb2af9851d74b332cbeff5f6e150e24d64ec
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-2NDXVB

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-2NDXVB
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Scope implemented

- Replaced the legacy `CommandNeeds` adapter for the task read, task write, lifecycle, and route command families with explicit `CommandSession` profiles.
- Kept runner/Hermes, hosted-close/provider operations, normalization sync, and Obsidian commands on their owning downstream slices.
- Added separate local and remote route context resolvers for `task status`, `task brief`, and `task next-action`; provider preparation now occurs only when `--remote` is selected.
- Replaced `task begin` stdout interception with the typed `setTaskPlan()` use-case result. The standalone `task plan set` renderer preserves its existing stdout contract.
- Added catalog, undeclared-capability denial, local-route laziness, and guided lifecycle coverage.
