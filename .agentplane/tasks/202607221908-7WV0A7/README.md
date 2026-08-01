---
id: "202607221908-7WV0A7"
title: "Migrate provider, integration, release, and ops command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
origin:
  system: "manual"
depends_on:
  - "202607221849-NWVCAG"
  - "202607221852-71SCSW"
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
  - "bun run release:parity"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T12:13:32.408Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T12:30:05.123Z"
  updated_by: "TESTER"
  note: "PASS: semantic rework verified at 8c8bf30b4b6f with measured effects and SHA-bound recovery evidence."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T12:34:06.614Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "8c8bf30b4b6fe5fd3cce7d6be67eeb7267834290"
  blueprint_digest: "f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c"
  evidence_refs:
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-7WV0A7/README.md"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-7WV0A7/verification/20260801123005123-a5cccc4fdbad3cfd.json"
    - ".agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json"
    - ".agentplane/tasks/202607221908-7WV0A7/quality/20260801-123330043-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No contract-breaking findings identified."
commit:
  hash: "d53ad1acb3f9473a2f5e493035b8bb8ba7b049fa"
  message: "♻️ 7WV0A7 task: migrate provider and release command sessions"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: provider, integration, release, hosted-close, cleanup, and local work commands now declare authority-aware CommandSession profiles; group commands no longer prepare broad context; focused and critical verification passed."
events:
  -
    type: "status"
    at: "2026-08-01T03:23:48.372Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T03:42:34.295Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: provider, integration, release, hosted-close, cleanup, and local work commands now declare authority-aware CommandSession profiles; group commands no longer prepare broad context; focused and critical verification passed."
  -
    type: "verify"
    at: "2026-08-01T03:43:10.720Z"
    author: "TESTER"
    state: "ok"
    note: "Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed."
  -
    type: "verify"
    at: "2026-08-01T12:24:05.563Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: provider/release vertical verified with SHA-bound command and runtime recovery evidence."
  -
    type: "verify"
    at: "2026-08-01T12:30:05.123Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: semantic rework verified at 8c8bf30b4b6f with measured effects and SHA-bound recovery evidence."
doc_version: 3
doc_updated_at: "2026-08-01T12:30:06.049Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers."
sections:
  Summary: |-
    Migrate provider, integration, release, and ops command boundaries

    RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.
  Scope: |-
    - In scope: exact CommandSession capability profiles for PR, integration queue, hosted-close, cleanup, release, and adjacent provider/ops command families; parsed-intent session selection; representative typed result and renderer seams for integration queue list/doctor and release plan; runtime authority-denial, recovery, output-parity, and exact-SHA regression evidence.
    - Out of scope: repository-wide removal of legacy CommandNeeds/coarse context consumers and completion of typed use-case/rendering boundaries for every command; those remain owned by 202607221854-SDPFN0 and 202607221854-PGPR3J. Granting publication authority or changing protected-main policy also remains out of scope.
  Plan: |-
    1. Classify and declare exact provider, Git, network, task, and authority capabilities for each command in this vertical.
    2. Select narrower sessions from parsed operation intent where read-only, dry-run, and execution modes differ.
    3. Extract representative typed integration-queue and release-plan results from CLI rendering while preserving shared CliError and exit-code contracts.
    4. Prove capability denial before context preparation and preserve bounded hosted-check, conflict, partial-publication, and recovery behavior.
    5. Freeze command-backed verification evidence for the current implementation SHA; leave repository-wide typed-result and CommandSession fan-in to their declared downstream tasks.
  Verify Steps: |-
    1. Inspect the provider/integration/release/ops command catalog matrix. Expected: every command in this vertical declares an explicit session, read/dry-run variants omit write authority, and denied capabilities fail before context preparation.
    2. Execute conditional registry paths for integration queue and release commands. Expected: parsed intent selects the exact session and repeated capability requests reuse one prepared context.
    3. Exercise typed list/doctor/release-plan results and human/JSON renderers, plus late checks, network failure, merge conflict, partial publication, and recovery regressions. Expected: compatible output, exact-SHA provenance, bounded retries, and no duplicated effects.
    4. Run focused provider/release tests, guards, lifecycle invariants, release parity, critical CLI, typecheck, lint, Knip, formatting, and hotspot guards; record exact commands and scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T03:43:10.720Z — VERIFY — ok

    By: TESTER

    Note: Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:42:34.295Z, excerpt_hash=sha256:19b4d28bd7718ce4e5b6f221ffd2e63f660ef21c39a8d7304ee579f5a5b72463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
    - old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-7WV0A7
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T12:24:05.563Z — VERIFY — ok

    By: TESTER

    Note: PASS: provider/release vertical verified with SHA-bound command and runtime recovery evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T12:13:31.661Z, excerpt_hash=sha256:5f3be586d16174d604f552b097ea4f2500e7bc2eedc047d7bcac67a48748a628

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/release/plan.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: 5 files and 37 tests prove the full vertical capability matrix, denied authority before preparation, single-context reuse, real typed queue results, human and JSON compatibility, and exact protected-base SHA release-plan provenance.

    Command: bunx vitest run packages/agentplane/src/commands/pr/hosted-checks.test.ts packages/agentplane/src/commands/integrate-queue.command.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: 7 files and 91 tests prove late checks, network failure, bounded timeout, merge conflict, queue recovery, partial publication, failed prepublish, exact release identity, and duplicate-effect prevention.

    Command: git diff --quiet 6c23608a30c55cc88770da4b0d1c15caae7bc0e2 134295dcd7191419f4120f6347a7f6cd508686ab -- packages scripts package.json bun.lock .github
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: no implementation, script, dependency, or workflow drift between semantic implementation SHA 6c23608a30c5 and lifecycle-descendant verification execution SHA 134295dcd719.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: shared guards and trust-boundary ratchet.

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: all 8 lifecycle invariants.

    Command: bun run release:parity
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: core, CLI, recipes, dependency, and runtime version parity.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: all 12 critical CLI chunks and 77 tests.

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: workspace TypeScript correctness.

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: core source and scripts.

    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: unused-code debt baseline at 545 of 545 entries.

    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: repository formatting contract.

    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
    Scope: runtime and test source-size hard limits and oversized-test baseline.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
    - old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

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

    ### 2026-08-01T12:30:05.123Z — VERIFY — ok

    By: TESTER

    Note: PASS: semantic rework verified at 8c8bf30b4b6f with measured effects and SHA-bound recovery evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T12:24:06.453Z, excerpt_hash=sha256:5f3be586d16174d604f552b097ea4f2500e7bc2eedc047d7bcac67a48748a628

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/release/plan.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: 5 files and 37 tests prove exact capability profiles, denied authority before preparation, conditional sessions, one-context reuse, real typed queue/doctor/release-plan results, output parity, exact protected-base SHA, and measured artifact effects.

    Command: bunx vitest run packages/agentplane/src/commands/pr/hosted-checks.test.ts packages/agentplane/src/commands/integrate-queue.command.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: 7 files and 91 tests prove late checks, network failure, bounded timeout, merge conflict, recovery, partial publication, failed prepublish, exact release identity, and duplicate-effect prevention.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: shared guards and trust-boundary ratchet.

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: all 8 lifecycle invariants.

    Command: bun run release:parity
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: core, CLI, recipes, dependency, and runtime version parity.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: all 12 critical CLI chunks and 77 tests.

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: workspace TypeScript correctness.

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: core source and scripts.

    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: unused-code baseline at 545 of 545 entries.

    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: repository formatting contract.

    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
    Scope: runtime/test hard limits and oversized-test baseline.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
    - old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

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
    - Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
    - Preserve provider/release evidence and use recovery versions after publication.
    - Re-run release parity and provider state fixtures.
  Findings: |-
    - Observation: Read-only provider sessions deny git.mutate before context preparation; local work sessions deny provider and route.remote; provider-write and release-publish commands declare exact catalog capabilities while group commands prepare no context.
      Impact: Provider/network/Git mutation authority is explicit at the command boundary without changing public output or release version parity.
      Resolution: Keep shared CommandContext as a compatibility value until RF-24 fan-in removes the coarse resolver; no flake or regression observed in this verification.

    - Observation: Semantic rework showed that integration queue list, doctor, claim, release, and run-next shared a provider-write CommandSession even when parsed operation intent required only local read or provider read authority.
      Impact: Read-oriented commands prepared backend/task write and Git mutation capabilities unnecessarily, while queue and release outputs still coupled typed orchestration data to CLI rendering.
      Resolution: Split exact local-read, provider-read, task-provider-read, and execution profiles; select release and run-next sessions from parsed intent; make queue list side-effect free; add typed list, doctor, and release-plan results with audit metadata plus separate compatibility renderers; verify negative authority, recovery, human/JSON parity, and exact-SHA paths.
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Migrate provider, integration, release, and ops command boundaries

RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.

## Scope

- In scope: exact CommandSession capability profiles for PR, integration queue, hosted-close, cleanup, release, and adjacent provider/ops command families; parsed-intent session selection; representative typed result and renderer seams for integration queue list/doctor and release plan; runtime authority-denial, recovery, output-parity, and exact-SHA regression evidence.
- Out of scope: repository-wide removal of legacy CommandNeeds/coarse context consumers and completion of typed use-case/rendering boundaries for every command; those remain owned by 202607221854-SDPFN0 and 202607221854-PGPR3J. Granting publication authority or changing protected-main policy also remains out of scope.

## Plan

1. Classify and declare exact provider, Git, network, task, and authority capabilities for each command in this vertical.
2. Select narrower sessions from parsed operation intent where read-only, dry-run, and execution modes differ.
3. Extract representative typed integration-queue and release-plan results from CLI rendering while preserving shared CliError and exit-code contracts.
4. Prove capability denial before context preparation and preserve bounded hosted-check, conflict, partial-publication, and recovery behavior.
5. Freeze command-backed verification evidence for the current implementation SHA; leave repository-wide typed-result and CommandSession fan-in to their declared downstream tasks.

## Verify Steps

1. Inspect the provider/integration/release/ops command catalog matrix. Expected: every command in this vertical declares an explicit session, read/dry-run variants omit write authority, and denied capabilities fail before context preparation.
2. Execute conditional registry paths for integration queue and release commands. Expected: parsed intent selects the exact session and repeated capability requests reuse one prepared context.
3. Exercise typed list/doctor/release-plan results and human/JSON renderers, plus late checks, network failure, merge conflict, partial publication, and recovery regressions. Expected: compatible output, exact-SHA provenance, bounded retries, and no duplicated effects.
4. Run focused provider/release tests, guards, lifecycle invariants, release parity, critical CLI, typecheck, lint, Knip, formatting, and hotspot guards; record exact commands and scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T03:43:10.720Z — VERIFY — ok

By: TESTER

Note: Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:42:34.295Z, excerpt_hash=sha256:19b4d28bd7718ce4e5b6f221ffd2e63f660ef21c39a8d7304ee579f5a5b72463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
- old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-7WV0A7
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T12:24:05.563Z — VERIFY — ok

By: TESTER

Note: PASS: provider/release vertical verified with SHA-bound command and runtime recovery evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T12:13:31.661Z, excerpt_hash=sha256:5f3be586d16174d604f552b097ea4f2500e7bc2eedc047d7bcac67a48748a628

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/release/plan.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: 5 files and 37 tests prove the full vertical capability matrix, denied authority before preparation, single-context reuse, real typed queue results, human and JSON compatibility, and exact protected-base SHA release-plan provenance.

Command: bunx vitest run packages/agentplane/src/commands/pr/hosted-checks.test.ts packages/agentplane/src/commands/integrate-queue.command.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: 7 files and 91 tests prove late checks, network failure, bounded timeout, merge conflict, queue recovery, partial publication, failed prepublish, exact release identity, and duplicate-effect prevention.

Command: git diff --quiet 6c23608a30c55cc88770da4b0d1c15caae7bc0e2 134295dcd7191419f4120f6347a7f6cd508686ab -- packages scripts package.json bun.lock .github
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: no implementation, script, dependency, or workflow drift between semantic implementation SHA 6c23608a30c5 and lifecycle-descendant verification execution SHA 134295dcd719.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: shared guards and trust-boundary ratchet.

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: all 8 lifecycle invariants.

Command: bun run release:parity
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: core, CLI, recipes, dependency, and runtime version parity.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: all 12 critical CLI chunks and 77 tests.

Command: bun run typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: workspace TypeScript correctness.

Command: bun run lint:core
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: core source and scripts.

Command: bun run knip:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: unused-code debt baseline at 545 of 545 entries.

Command: bun run format:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: repository formatting contract.

Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-134295dcd719-checks.json
Scope: runtime and test source-size hard limits and oversized-test baseline.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
- old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

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

### 2026-08-01T12:30:05.123Z — VERIFY — ok

By: TESTER

Note: PASS: semantic rework verified at 8c8bf30b4b6f with measured effects and SHA-bound recovery evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T12:24:06.453Z, excerpt_hash=sha256:5f3be586d16174d604f552b097ea4f2500e7bc2eedc047d7bcac67a48748a628

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/release/plan.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: 5 files and 37 tests prove exact capability profiles, denied authority before preparation, conditional sessions, one-context reuse, real typed queue/doctor/release-plan results, output parity, exact protected-base SHA, and measured artifact effects.

Command: bunx vitest run packages/agentplane/src/commands/pr/hosted-checks.test.ts packages/agentplane/src/commands/integrate-queue.command.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: 7 files and 91 tests prove late checks, network failure, bounded timeout, merge conflict, recovery, partial publication, failed prepublish, exact release identity, and duplicate-effect prevention.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: shared guards and trust-boundary ratchet.

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: all 8 lifecycle invariants.

Command: bun run release:parity
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: core, CLI, recipes, dependency, and runtime version parity.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: all 12 critical CLI chunks and 77 tests.

Command: bun run typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: workspace TypeScript correctness.

Command: bun run lint:core
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: core source and scripts.

Command: bun run knip:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: unused-code baseline at 545 of 545 entries.

Command: bun run format:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: repository formatting contract.

Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-7WV0A7-8c8bf30b4b6f-checks.json
Scope: runtime/test hard limits and oversized-test baseline.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
- old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

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

- Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
- Preserve provider/release evidence and use recovery versions after publication.
- Re-run release parity and provider state fixtures.

## Findings

- Observation: Read-only provider sessions deny git.mutate before context preparation; local work sessions deny provider and route.remote; provider-write and release-publish commands declare exact catalog capabilities while group commands prepare no context.
  Impact: Provider/network/Git mutation authority is explicit at the command boundary without changing public output or release version parity.
  Resolution: Keep shared CommandContext as a compatibility value until RF-24 fan-in removes the coarse resolver; no flake or regression observed in this verification.

- Observation: Semantic rework showed that integration queue list, doctor, claim, release, and run-next shared a provider-write CommandSession even when parsed operation intent required only local read or provider read authority.
  Impact: Read-oriented commands prepared backend/task write and Git mutation capabilities unnecessarily, while queue and release outputs still coupled typed orchestration data to CLI rendering.
  Resolution: Split exact local-read, provider-read, task-provider-read, and execution profiles; select release and run-next sessions from parsed intent; make queue list side-effect free; add typed list, doctor, and release-plan results with audit metadata plus separate compatibility renderers; verify negative authority, recovery, human/JSON parity, and exact-SHA paths.
