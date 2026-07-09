---
id: "202607092115-G7H9BC"
title: "Harden patch-release quality and routing contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T21:16:30.497Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-09T21:47:20.762Z"
  updated_by: "TESTER"
  note: "Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and 2127 tests; policy routing and doctor completed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-09T21:49:02.278Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after PR artifact refresh."
  evaluated_sha: "e146ff505dcfe152a2b1a6b95b1073d6e86e1d4c"
  blueprint_digest: "18574fc64cca6902541a48a065e9fb64c3777473578e86a76d68e27d1775c0f1"
  evidence_refs:
    - ".agentplane/tasks/202607092115-G7H9BC/README.md"
    - ".agentplane/tasks/202607092115-G7H9BC/quality/20260709-214902278-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092115-G7H9BC/quality/20260709-214902278-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092115-G7H9BC/quality/20260709-214902278-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092115-G7H9BC/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; implementation and generated PR artifacts match the verified task scope."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement approved patch-release quality gates, exhaustive routing contracts, and ambiguity-safe wiki resolution in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-09T21:17:08.648Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement approved patch-release quality gates, exhaustive routing contracts, and ambiguity-safe wiki resolution in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-09T21:47:20.762Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and 2127 tests; policy routing and doctor completed."
doc_version: 3
doc_updated_at: "2026-07-09T21:47:20.906Z"
doc_updated_by: "CODER"
description: "Fix jscpd v5 clone detection, align architecture Node support with declared engines, make route blockers and repairs exhaustive with surfaced local probe diagnostics, and prevent ambiguous wiki links from resolving nondeterministically."
sections:
  Summary: |-
    Harden patch-release quality and routing contracts

    Fix jscpd v5 clone detection, align architecture Node support with declared engines, make route blockers and repairs exhaustive with surfaced local probe diagnostics, and prevent ambiguous wiki links from resolving nondeterministically.
  Scope: |-
    Implementation scope: package.json; scripts/README.md; scripts/checks/check-clone-baseline.mjs; scripts/checks/run-depcruise-arch.mjs; scripts/checks/check-lifecycle-invariants.mjs; focused script tests; packages/agentplane/src/commands/shared/route-*.ts and focused tests; packages/agentplane/src/commands/context/wiki-reports.ts and its unit tests.
    Release target: patch 0.6.22. No version bump or npm publication in this task.
  Plan: |-
    1. Update scripts/checks/check-clone-baseline.mjs for the installed jscpd v5 CLI, add regression coverage, and wire clone:check into ci:contract.
    2. Align scripts/checks/run-depcruise-arch.mjs with the repository Node >=24 engine contract and add version-contract coverage.
    3. Introduce typed exhaustive route blocker/repair contracts, split pure route policy from probes where needed, and preserve local probe diagnostics instead of silently discarding them.
    4. Make wiki target resolution deterministic and ambiguity-aware when titles or basenames collide, with focused tests.
    5. Run focused tests, lint, typecheck, clone, architecture, full test:fast, policy routing, doctor, and task verification; publish through the branch_pr route.
  Verify Steps: |-
    1. bun run clone:check
    2. bun run arch:check
    3. bun run lint:core
    4. bun run typecheck
    5. bun run test:fast
    6. bun run policy:routing:check
    7. node .agentplane/policy/check-routing.mjs
    8. ap doctor
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-09T21:47:20.762Z — VERIFY — ok

    By: TESTER

    Note: Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and 2127 tests; policy routing and doctor completed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T21:46:15.789Z, excerpt_hash=sha256:86ab53875e03a9921bf05495acf346d11830af22d4ca0f9834294fd3670669ec

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092115-G7H9BC-harden-patch-release-quality-and-routing-contrac/.agentplane/tasks/202607092115-G7H9BC/blueprint/resolved-snapshot.json
    - old_digest: 18574fc64cca6902541a48a065e9fb64c3777473578e86a76d68e27d1775c0f1
    - current_digest: 18574fc64cca6902541a48a065e9fb64c3777473578e86a76d68e27d1775c0f1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092115-G7H9BC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092115-G7H9BC
    - diagnostic_command: agentplane pr check 202607092115-G7H9BC
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit and restore the previous quality-gate, route-decision, and wiki-resolution behavior. No data migration is introduced."
  Findings: |-
    - Observation: The task worktree initially lacked fresh CLI dist and package-local dependency links, and parallel full-suite execution caused unrelated Clack mock failures.
      Impact: Initial ci:contract and test:fast attempts were not valid product signals.
      Resolution: Ran bun run framework:dev:bootstrap and repeated ci:contract and test:fast sequentially; both passed.
id_source: "generated"
---
## Summary

Harden patch-release quality and routing contracts

Fix jscpd v5 clone detection, align architecture Node support with declared engines, make route blockers and repairs exhaustive with surfaced local probe diagnostics, and prevent ambiguous wiki links from resolving nondeterministically.

## Scope

Implementation scope: package.json; scripts/README.md; scripts/checks/check-clone-baseline.mjs; scripts/checks/run-depcruise-arch.mjs; scripts/checks/check-lifecycle-invariants.mjs; focused script tests; packages/agentplane/src/commands/shared/route-*.ts and focused tests; packages/agentplane/src/commands/context/wiki-reports.ts and its unit tests.
Release target: patch 0.6.22. No version bump or npm publication in this task.

## Plan

1. Update scripts/checks/check-clone-baseline.mjs for the installed jscpd v5 CLI, add regression coverage, and wire clone:check into ci:contract.
2. Align scripts/checks/run-depcruise-arch.mjs with the repository Node >=24 engine contract and add version-contract coverage.
3. Introduce typed exhaustive route blocker/repair contracts, split pure route policy from probes where needed, and preserve local probe diagnostics instead of silently discarding them.
4. Make wiki target resolution deterministic and ambiguity-aware when titles or basenames collide, with focused tests.
5. Run focused tests, lint, typecheck, clone, architecture, full test:fast, policy routing, doctor, and task verification; publish through the branch_pr route.

## Verify Steps

1. bun run clone:check
2. bun run arch:check
3. bun run lint:core
4. bun run typecheck
5. bun run test:fast
6. bun run policy:routing:check
7. node .agentplane/policy/check-routing.mjs
8. ap doctor

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-09T21:47:20.762Z — VERIFY — ok

By: TESTER

Note: Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and 2127 tests; policy routing and doctor completed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T21:46:15.789Z, excerpt_hash=sha256:86ab53875e03a9921bf05495acf346d11830af22d4ca0f9834294fd3670669ec

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092115-G7H9BC-harden-patch-release-quality-and-routing-contrac/.agentplane/tasks/202607092115-G7H9BC/blueprint/resolved-snapshot.json
- old_digest: 18574fc64cca6902541a48a065e9fb64c3777473578e86a76d68e27d1775c0f1
- current_digest: 18574fc64cca6902541a48a065e9fb64c3777473578e86a76d68e27d1775c0f1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092115-G7H9BC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092115-G7H9BC
- diagnostic_command: agentplane pr check 202607092115-G7H9BC
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit and restore the previous quality-gate, route-decision, and wiki-resolution behavior. No data migration is introduced.

## Findings

- Observation: The task worktree initially lacked fresh CLI dist and package-local dependency links, and parallel full-suite execution caused unrelated Clack mock failures.
  Impact: Initial ci:contract and test:fast attempts were not valid product signals.
  Resolution: Ran bun run framework:dev:bootstrap and repeated ci:contract and test:fast sequentially; both passed.
