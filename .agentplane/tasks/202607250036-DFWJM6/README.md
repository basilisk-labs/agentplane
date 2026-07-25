---
id: "202607250036-DFWJM6"
title: "Publish rebased PR branches with an explicit force-with-lease"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 50
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "publication"
  - "v0.7/reliability"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run hotspots:check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T03:04:57.475Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-25T12:06:02.950Z"
  updated_by: "TESTER"
  note: "Rework verified at 8003f34e: real cwd/restore preserves no-root init semantics; focused 17/17, repeated scenario 5/5, platform-critical 91/91, cleanup 105/105, publication 21/21, integration 48/48, targeted PR 134/134, full fast 453 files and 3046 tests, critical 11/11, typecheck/lint/hotspots/format/task-lint/routing/doctor pass; all tracked temp-directory classes remain at zero."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T12:06:32.518Z"
  updated_by: "EVALUATOR"
  note: "The rework replaces a JS-only cwd spy with a real, always-restored process cwd, preserving the no-root init contract and removing the plausible persistent Windows directory handle without widening production behavior."
  evaluated_sha: "8003f34e83c1a2304c653393a2631e33320e4087"
  blueprint_digest: "a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43"
  evidence_refs:
    - ".agentplane/tasks/202607250036-DFWJM6/README.md"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-120632518-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-120632518-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-120632518-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts"
    - "packages/testkit/src/cli-harness/temp-root-cleanup.ts"
    - "packages/testkit/src/cli-harness/temp-root-cleanup.test.ts"
  findings:
    - "runCli still receives no --root and initializes the child directory; the conflicting parent-repository assertion remains intact."
    - "The same forked Windows test route already passes an equivalent real process.chdir/restore pattern, while the changed file is excluded from full-fast unit routing and cannot explain the invalid historical-temp overload."
    - "Focused, repeated, platform-critical, cleanup, publication, integration, targeted PR, full fast, critical, static, lifecycle, and zero-temp-inventory checks all pass after exact-prefix cleanup."
commit:
  hash: "8003f34e83c1a2304c653393a2631e33320e4087"
  message: "🧪 DFWJM6 code: use real cwd in init regression"
comments:
  -
    author: "CODER"
    body: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T00:37:21.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
  -
    type: "verify"
    at: "2026-07-25T01:06:30.385Z"
    author: "TESTER"
    state: "ok"
    note: "Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope."
  -
    type: "status"
    at: "2026-07-25T01:08:17.205Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T01:09:01.464Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T01:10:57.839Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T01:17:09.694Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD."
  -
    type: "verify"
    at: "2026-07-25T01:26:53.345Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c0f4d84b6685: exact observed local object is the force-push source; deterministic source-race regression plus repository, lease, refusal, and destination-race coverage pass (21/21). Typecheck, lint:core, hotspots, architecture, task-state, routing, Prettier, task lint, and diff-check pass. Independent re-review: PASS."
  -
    type: "status"
    at: "2026-07-25T01:28:05.017Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T01:43:58.774Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-routed exposed stale PR-flow fixtures: mandatory evaluator provenance, queue lease identity, and SKIPPED check state must be aligned before integration."
  -
    type: "verify"
    at: "2026-07-25T03:54:40.008Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verified at cbf4ac33977c: focused publication 21/21, parser and integration regressions pass, full fast 452/452 files and 3045/3045 tests, critical CLI 11/11 chunks, targeted PR route 22/22 files and 134/134 tests, typecheck/lint/format/hotspots/task lint/policy routing pass, and post-run temp-root birthtime inventory is empty."
  -
    type: "status"
    at: "2026-07-25T03:55:24.673Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T03:56:09.016Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T04:03:08.504Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted Windows test-windows failed at e473ea3ac4ca: helper afterEach cleanup hit EBUSY while recursively removing magic_fresh_directory. Rework: apply bounded fs.rm retries to helper-owned roots, cover the retry contract, and republish after local platform-critical verification."
  -
    type: "verify"
    at: "2026-07-25T04:20:21.439Z"
    author: "TESTER"
    state: "ok"
    note: "Windows cleanup rework verified at db062c2cdb31: failing init scenario and helper contract 20/20, platform-critical 6/6 files and 91/91 tests, full fast 453/453 files and 3046/3046 tests, critical CLI 11/11 chunks, typecheck/lint/format/policy checks pass, and post-run temp-root birthtime inventory is empty. Hosted Windows rerun remains the external gate."
  -
    type: "status"
    at: "2026-07-25T04:21:04.732Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T04:32:25.924Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted Windows still fails at PR head 659ae331c780ed79b9c4f43f8d1578937101d039: one init validation root remains locked after bounded cleanup retries."
  -
    type: "verify"
    at: "2026-07-25T12:06:02.950Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verified at 8003f34e: real cwd/restore preserves no-root init semantics; focused 17/17, repeated scenario 5/5, platform-critical 91/91, cleanup 105/105, publication 21/21, integration 48/48, targeted PR 134/134, full fast 453 files and 3046 tests, critical 11/11, typecheck/lint/hotspots/format/task-lint/routing/doctor pass; all tracked temp-directory classes remain at zero."
  -
    type: "status"
    at: "2026-07-25T12:06:53.028Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T12:06:53.029Z"
doc_updated_by: "CODER"
description: "Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety."
sections:
  Summary: |-
    Publish rebased PR branches with an explicit force-with-lease

    Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
  Scope: |-
    - In scope: publish an existing matching open PR after a local rebase only through an exact observed source object and ref-scoped force-with-lease bound to the observed remote head.
    - Required hosted-CI rework: align integration fixtures with evaluator provenance, queue identity, SKIPPED checks, canonical base pinning, exact published provider/upstream head, and fresh pre-merge closure.
    - Required compatibility fix: preserve a structurally valid pre_merge_closure marker when forward-compatible PR metadata fallback reconstructs metadata with a future enum value.
    - Required test-infrastructure hardening: unique fake GitHub directories, awaited cleanup of hosted-fixture resources, full removal of harness-managed roots after every scenario, per-file Git-template cleanup, and migration of direct non-git fixtures into that lifecycle.
    - Out of scope: unrelated publication behavior, provider semantics, or production refactors not required by these enforced regressions.
  Plan: |-
    1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
    2. Authorize only an exact observed source object and ref-scoped force-with-lease bound to the observed remote head and canonical GitHub repository.
    3. Preserve fail-closed behavior for wrong repository, branch, upstream, PR identity, source races, and destination races.
    4. Align hosted PR integration fixtures with mandatory evaluator provenance, queue identity, SKIPPED check state, exact published head, and fresh pre-merge closure.
    5. Preserve a structurally valid pre_merge_closure marker when forward-compatible PR metadata fallback handles a future enum value; keep invalid markers fail-closed.
    6. Make fake-provider fixtures collision-safe, clean all harness-managed test roots after every scenario, remove per-file Git templates, and route direct non-git fixtures through the same lifecycle.
    7. Run focused publication tests, parser and routed PR regressions, the affected cleanup suites, full fast CI, typecheck, lint, formatting, lifecycle guards, and independent review before publication.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: exact source object, repository identity, lease, refusal, destination-race, and source-race regressions pass.
    2. Run `bunx vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts`. Expected: closure compatibility and hosted integration regressions pass.
    3. Run the seven CLI suites that exercise non-git and hosted-fixture roots, then confirm no new `agentplane-cli-test-*`, `agentplane-git-template-*`, or `agentplane-home-*` directories remain. Expected: all affected tests pass and the recent-temp query is empty.
    4. Run `node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/pr/branch-publication.ts` and `bun run ci:local:fast`. Expected: the targeted PR route and the full fast suite pass.
    5. Run `bun run typecheck`, `bun run lint:core`, `bun run hotspots:check`, and `bun run format:check`. Expected: code, types, formatting, and repository budgets pass.
    6. Run `agentplane task lint --verify-steps-changed` and `node .agentplane/policy/check-routing.mjs`. Expected: task documentation and policy routing pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T01:06:30.385Z — VERIFY — ok

    By: TESTER

    Note: Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:00:05.994Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607250036-DFWJM6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T01:17:09.694Z — VERIFY — needs_rework

    By: REVIEWER

    Note: GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:10:57.839Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T01:26:53.345Z — VERIFY — ok

    By: TESTER

    Note: Verified c0f4d84b6685: exact observed local object is the force-push source; deterministic source-race regression plus repository, lease, refusal, and destination-race coverage pass (21/21). Typecheck, lint:core, hotspots, architecture, task-state, routing, Prettier, task lint, and diff-check pass. Independent re-review: PASS.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:23:38.264Z, excerpt_hash=sha256:e0575c766a7b46b94c022d38e9b17477df476e087e83bbb4d9606eb99abb00f2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

    ### 2026-07-25T01:43:58.774Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-routed exposed stale PR-flow fixtures: mandatory evaluator provenance, queue lease identity, and SKIPPED check state must be aligned before integration.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:28:05.018Z, excerpt_hash=sha256:e0575c766a7b46b94c022d38e9b17477df476e087e83bbb4d9606eb99abb00f2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T03:54:40.008Z — VERIFY — ok

    By: TESTER

    Note: Rework verified at cbf4ac33977c: focused publication 21/21, parser and integration regressions pass, full fast 452/452 files and 3045/3045 tests, critical CLI 11/11 chunks, targeted PR route 22/22 files and 134/134 tests, typecheck/lint/format/hotspots/task lint/policy routing pass, and post-run temp-root birthtime inventory is empty.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T03:04:48.323Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

    ### 2026-07-25T04:03:08.504Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted Windows test-windows failed at e473ea3ac4ca: helper afterEach cleanup hit EBUSY while recursively removing magic_fresh_directory. Rework: apply bounded fs.rm retries to helper-owned roots, cover the retry contract, and republish after local platform-critical verification.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T03:56:09.018Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T04:20:21.439Z — VERIFY — ok

    By: TESTER

    Note: Windows cleanup rework verified at db062c2cdb31: failing init scenario and helper contract 20/20, platform-critical 6/6 files and 91/91 tests, full fast 453/453 files and 3046/3046 tests, critical CLI 11/11 chunks, typecheck/lint/format/policy checks pass, and post-run temp-root birthtime inventory is empty. Hosted Windows rerun remains the external gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:03:09.395Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

    ### 2026-07-25T04:32:25.924Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted Windows still fails at PR head 659ae331c780ed79b9c4f43f8d1578937101d039: one init validation root remains locked after bounded cleanup retries.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:21:04.734Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T12:06:02.950Z — VERIFY — ok

    By: TESTER

    Note: Rework verified at 8003f34e: real cwd/restore preserves no-root init semantics; focused 17/17, repeated scenario 5/5, platform-critical 91/91, cleanup 105/105, publication 21/21, integration 48/48, targeted PR 134/134, full fast 453 files and 3046 tests, critical 11/11, typecheck/lint/hotspots/format/task-lint/routing/doctor pass; all tracked temp-directory classes remain at zero.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:32:26.811Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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
    - The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
    - Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>` and the exact observed local object as source.
    - Wrong upstream/current branch, mismatched repository/head, closed or missing PR, a destination race, and a source-side HEAD race are covered by explicit fail-closed regressions.
    - Independent safety re-review of the production publication guard passed with no remaining findings.
    - Full `bun run lint` remains red on the unchanged website baseline; `bun run lint:core` and targeted ESLint are the scoped gates.

    - Observation: The hosted routed PR suite initially failed 18 tests because legacy fixtures lacked mandatory evaluator provenance, queue identity, SKIPPED check normalization, exact hosted head, and fresh pre-merge closure.
      Impact: PR publication could not satisfy the same route enforced by GitHub even though the narrow production publication tests passed.
      Resolution: A shared hosted fixture now establishes canonical base identity, real local upstream publication, exact fake-provider head, fresh closure, stable projections, and cleanup. The exact route passes 22/22 files and 134/134 tests.

    - Observation: Forward-compatible parsing discarded a valid pre_merge_closure marker when a future status value triggered fallback reconstruction.
      Impact: Integrate incorrectly reported a missing closure for otherwise valid future metadata.
      Resolution: Preserve only structurally valid raw closure markers through fallback parsing, retaining future nested fields while invalid markers remain fail-closed.

    - Observation: Date-based fake GitHub directories could collide across workers and the hosted helper leaked its temporary provider and bare-remote directories.
      Impact: Parallel CI could become flaky and repeated runs consumed disk.
      Resolution: Use mkdtemp-backed unique provider directories and awaited lifecycle cleanup for every temporary resource created by the hosted helper.

    - Observation: The CLI harness cleared only nested release artifacts and forgot every registered test root; eight direct non-git fixtures also bypassed registration.
      Impact: A focused integration run left hundreds of agentplane-cli-test directories and hundreds of MiB behind, making repeated verification capable of exhausting disk space.
      Resolution: Remove registered roots after each scenario, delete the per-file Git template after all tests, and route every direct non-git fixture through mkTempDir.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Windows Node 24 returned EBUSY from recursive rmdir of an agentplane-cli-test child immediately after init completed.
      Impact: PR #4616 cannot satisfy the hosted gate; the global no-leak cleanup is not yet cross-platform robust.
      Resolution: Centralize helper-owned root deletion with bounded maxRetries/retryDelay, add deterministic regression coverage, rerun focused/full local checks, then republish and require green test-windows.

    - Observation: test-windows failed 13 tests because the same magic_fresh_directory stayed EBUSY across repeated afterEach cleanup attempts.
      Impact: PR verification remains red; DFWJM6 cannot integrate.
      Resolution: Replace the in-process process.cwd spy in the current-directory init scenario with a real chdir restored in finally, then repeat local and hosted verification.

    - Observation: The prior full-fast attempt was invalidated by 31,259 historical test-temp directories; after exact-prefix cleanup, the canonical rerun completed normally and left zero helper-owned temp directories.
      Impact: Local verification is complete; Windows handle release still requires hosted test-windows proof on the new PR head.
      Resolution: Run evaluator, create fresh pre-merge closure, publish through guarded force-with-lease, and require stable green hosted checks before integration.
extensions:
  implementation_commit:
    hash: "cbf4ac33977ceaf346803963c55848cab66ff76d"
    message: "🧪 DFWJM6 task: complete hosted PR regressions"
id_source: "generated"
---
## Summary

Publish rebased PR branches with an explicit force-with-lease

Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.

## Scope

- In scope: publish an existing matching open PR after a local rebase only through an exact observed source object and ref-scoped force-with-lease bound to the observed remote head.
- Required hosted-CI rework: align integration fixtures with evaluator provenance, queue identity, SKIPPED checks, canonical base pinning, exact published provider/upstream head, and fresh pre-merge closure.
- Required compatibility fix: preserve a structurally valid pre_merge_closure marker when forward-compatible PR metadata fallback reconstructs metadata with a future enum value.
- Required test-infrastructure hardening: unique fake GitHub directories, awaited cleanup of hosted-fixture resources, full removal of harness-managed roots after every scenario, per-file Git-template cleanup, and migration of direct non-git fixtures into that lifecycle.
- Out of scope: unrelated publication behavior, provider semantics, or production refactors not required by these enforced regressions.

## Plan

1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
2. Authorize only an exact observed source object and ref-scoped force-with-lease bound to the observed remote head and canonical GitHub repository.
3. Preserve fail-closed behavior for wrong repository, branch, upstream, PR identity, source races, and destination races.
4. Align hosted PR integration fixtures with mandatory evaluator provenance, queue identity, SKIPPED check state, exact published head, and fresh pre-merge closure.
5. Preserve a structurally valid pre_merge_closure marker when forward-compatible PR metadata fallback handles a future enum value; keep invalid markers fail-closed.
6. Make fake-provider fixtures collision-safe, clean all harness-managed test roots after every scenario, remove per-file Git templates, and route direct non-git fixtures through the same lifecycle.
7. Run focused publication tests, parser and routed PR regressions, the affected cleanup suites, full fast CI, typecheck, lint, formatting, lifecycle guards, and independent review before publication.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: exact source object, repository identity, lease, refusal, destination-race, and source-race regressions pass.
2. Run `bunx vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts`. Expected: closure compatibility and hosted integration regressions pass.
3. Run the seven CLI suites that exercise non-git and hosted-fixture roots, then confirm no new `agentplane-cli-test-*`, `agentplane-git-template-*`, or `agentplane-home-*` directories remain. Expected: all affected tests pass and the recent-temp query is empty.
4. Run `node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/pr/branch-publication.ts` and `bun run ci:local:fast`. Expected: the targeted PR route and the full fast suite pass.
5. Run `bun run typecheck`, `bun run lint:core`, `bun run hotspots:check`, and `bun run format:check`. Expected: code, types, formatting, and repository budgets pass.
6. Run `agentplane task lint --verify-steps-changed` and `node .agentplane/policy/check-routing.mjs`. Expected: task documentation and policy routing pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T01:06:30.385Z — VERIFY — ok

By: TESTER

Note: Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:00:05.994Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607250036-DFWJM6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T01:17:09.694Z — VERIFY — needs_rework

By: REVIEWER

Note: GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:10:57.839Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T01:26:53.345Z — VERIFY — ok

By: TESTER

Note: Verified c0f4d84b6685: exact observed local object is the force-push source; deterministic source-race regression plus repository, lease, refusal, and destination-race coverage pass (21/21). Typecheck, lint:core, hotspots, architecture, task-state, routing, Prettier, task lint, and diff-check pass. Independent re-review: PASS.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:23:38.264Z, excerpt_hash=sha256:e0575c766a7b46b94c022d38e9b17477df476e087e83bbb4d9606eb99abb00f2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

### 2026-07-25T01:43:58.774Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-routed exposed stale PR-flow fixtures: mandatory evaluator provenance, queue lease identity, and SKIPPED check state must be aligned before integration.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:28:05.018Z, excerpt_hash=sha256:e0575c766a7b46b94c022d38e9b17477df476e087e83bbb4d9606eb99abb00f2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T03:54:40.008Z — VERIFY — ok

By: TESTER

Note: Rework verified at cbf4ac33977c: focused publication 21/21, parser and integration regressions pass, full fast 452/452 files and 3045/3045 tests, critical CLI 11/11 chunks, targeted PR route 22/22 files and 134/134 tests, typecheck/lint/format/hotspots/task lint/policy routing pass, and post-run temp-root birthtime inventory is empty.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T03:04:48.323Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

### 2026-07-25T04:03:08.504Z — VERIFY — needs_rework

By: TESTER

Note: Hosted Windows test-windows failed at e473ea3ac4ca: helper afterEach cleanup hit EBUSY while recursively removing magic_fresh_directory. Rework: apply bounded fs.rm retries to helper-owned roots, cover the retry contract, and republish after local platform-critical verification.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T03:56:09.018Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T04:20:21.439Z — VERIFY — ok

By: TESTER

Note: Windows cleanup rework verified at db062c2cdb31: failing init scenario and helper contract 20/20, platform-critical 6/6 files and 91/91 tests, full fast 453/453 files and 3046/3046 tests, critical CLI 11/11 chunks, typecheck/lint/format/policy checks pass, and post-run temp-root birthtime inventory is empty. Hosted Windows rerun remains the external gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:03:09.395Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

### 2026-07-25T04:32:25.924Z — VERIFY — needs_rework

By: TESTER

Note: Hosted Windows still fails at PR head 659ae331c780ed79b9c4f43f8d1578937101d039: one init validation root remains locked after bounded cleanup retries.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:21:04.734Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T12:06:02.950Z — VERIFY — ok

By: TESTER

Note: Rework verified at 8003f34e: real cwd/restore preserves no-root init semantics; focused 17/17, repeated scenario 5/5, platform-critical 91/91, cleanup 105/105, publication 21/21, integration 48/48, targeted PR 134/134, full fast 453 files and 3046 tests, critical 11/11, typecheck/lint/hotspots/format/task-lint/routing/doctor pass; all tracked temp-directory classes remain at zero.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T04:32:26.811Z, excerpt_hash=sha256:1efb02c455a6cd24d424b29828e1df8bdbcf780fae088c8d4d82a29f4afa8ee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

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

- The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
- Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>` and the exact observed local object as source.
- Wrong upstream/current branch, mismatched repository/head, closed or missing PR, a destination race, and a source-side HEAD race are covered by explicit fail-closed regressions.
- Independent safety re-review of the production publication guard passed with no remaining findings.
- Full `bun run lint` remains red on the unchanged website baseline; `bun run lint:core` and targeted ESLint are the scoped gates.

- Observation: The hosted routed PR suite initially failed 18 tests because legacy fixtures lacked mandatory evaluator provenance, queue identity, SKIPPED check normalization, exact hosted head, and fresh pre-merge closure.
  Impact: PR publication could not satisfy the same route enforced by GitHub even though the narrow production publication tests passed.
  Resolution: A shared hosted fixture now establishes canonical base identity, real local upstream publication, exact fake-provider head, fresh closure, stable projections, and cleanup. The exact route passes 22/22 files and 134/134 tests.

- Observation: Forward-compatible parsing discarded a valid pre_merge_closure marker when a future status value triggered fallback reconstruction.
  Impact: Integrate incorrectly reported a missing closure for otherwise valid future metadata.
  Resolution: Preserve only structurally valid raw closure markers through fallback parsing, retaining future nested fields while invalid markers remain fail-closed.

- Observation: Date-based fake GitHub directories could collide across workers and the hosted helper leaked its temporary provider and bare-remote directories.
  Impact: Parallel CI could become flaky and repeated runs consumed disk.
  Resolution: Use mkdtemp-backed unique provider directories and awaited lifecycle cleanup for every temporary resource created by the hosted helper.

- Observation: The CLI harness cleared only nested release artifacts and forgot every registered test root; eight direct non-git fixtures also bypassed registration.
  Impact: A focused integration run left hundreds of agentplane-cli-test directories and hundreds of MiB behind, making repeated verification capable of exhausting disk space.
  Resolution: Remove registered roots after each scenario, delete the per-file Git template after all tests, and route every direct non-git fixture through mkTempDir.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Windows Node 24 returned EBUSY from recursive rmdir of an agentplane-cli-test child immediately after init completed.
  Impact: PR #4616 cannot satisfy the hosted gate; the global no-leak cleanup is not yet cross-platform robust.
  Resolution: Centralize helper-owned root deletion with bounded maxRetries/retryDelay, add deterministic regression coverage, rerun focused/full local checks, then republish and require green test-windows.

- Observation: test-windows failed 13 tests because the same magic_fresh_directory stayed EBUSY across repeated afterEach cleanup attempts.
  Impact: PR verification remains red; DFWJM6 cannot integrate.
  Resolution: Replace the in-process process.cwd spy in the current-directory init scenario with a real chdir restored in finally, then repeat local and hosted verification.

- Observation: The prior full-fast attempt was invalidated by 31,259 historical test-temp directories; after exact-prefix cleanup, the canonical rerun completed normally and left zero helper-owned temp directories.
  Impact: Local verification is complete; Windows handle release still requires hosted test-windows proof on the new PR head.
  Resolution: Run evaluator, create fresh pre-merge closure, publish through guarded force-with-lease, and require stable green hosted checks before integration.
