---
id: "202609041801-ZVX69C"
title: "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "projection-recovery"
  - "regression"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "quality.regression"
verify:
  - "agentplane doctor"
  - "agentplane task lint"
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
  - "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T20:56:49.709Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:0c5f62bbce9bd35b857d3f519756656b6aa8a901908bb0a02a409de158961ea7"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_destructive_git"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/workflow.test.ts"
      - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch publication, hosted checks, integration, and CLI-owned cleanup remain separate AgentPlane-owned lifecycle effects."
      - "Release metadata, dependencies, MPXQBK, stale-branch imports, and full GitLab provider expansion remain excluded."
      - "The complete local CI failure is narrowed to two workflow test fixtures that must define task-specific Verify Steps."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/workflow.test.ts"
      - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks"
  observed:
    authority_violations:
      - "verification:recorded-check-2:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/release-critical-lifecycle.test.ts"
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-test-helpers.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery-readme.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/plan-shared.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/shared.unit.test.ts"
      - "packages/agentplane/src/commands/task/shared.verify-steps.test.ts"
      - "packages/agentplane/src/commands/task/shared/docs.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
      - "packages/agentplane/src/commands/workflow.test.ts"
      - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
      - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
      - "packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_destructive_git"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "destructive_git"
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/evaluator"
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/commands/workflow.test.ts"
          - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
          - "packages/agentplane/src/runner/usecases"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "external_effect:destructive_git"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "destructive_git"
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:df3c3a63a5be28fbc3dcf47c186c270dba10f16aac3c7df23477fff1375b165b"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/release-critical-lifecycle.test.ts"
        - "central_path:packages/agentplane/src/cli/route-decision.testkit.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/release-critical-lifecycle.test.ts"
          - "packages/agentplane/src/cli/route-decision.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-test-helpers.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery-readme.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/plan-shared.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/shared.unit.test.ts"
          - "packages/agentplane/src/commands/task/shared.verify-steps.test.ts"
          - "packages/agentplane/src/commands/task/shared/docs.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
          - "packages/agentplane/src/commands/workflow.test.ts"
          - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
          - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
          - "packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "external_effect:destructive_git"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-2"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 359ff9b7c478. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9ad28bcb18ee. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 53302ccb9941. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-04T18:17:29.142Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-04T19:32:44.657Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 359ff9b7c478. CLI accepted one state-bound external-agent semantic result."
    commit: "359ff9b7c478650659df39f40384bba78342f41b"
  -
    type: "verify"
    at: "2026-09-04T20:10:31.376Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check could not run: agentplane task lint"
  -
    type: "status"
    at: "2026-09-04T20:40:00.019Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9ad28bcb18ee. CLI accepted one state-bound external-agent semantic result."
    commit: "9ad28bcb18eebdff64e88d9010294367df90dfe4"
  -
    type: "verify"
    at: "2026-09-04T20:57:00.677Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check could not run: agentplane task lint"
  -
    type: "status"
    at: "2026-09-04T21:07:21.152Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 53302ccb9941. CLI accepted one state-bound external-agent semantic result."
    commit: "53302ccb9941294c5c2a4eaf6cc33b819dee67ee"
doc_version: 3
doc_updated_at: "2026-09-04T21:07:21.152Z"
doc_updated_by: "SUPERVISOR"
description: "On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full."
sections:
  Summary: |-
    Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

    On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
  Scope: |-
    - In scope: On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
    - Out of scope: unrelated refactors not required for "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification".
  Plan: "Preserve the approved single regression-repair WorkItem and extend its authority only to the two workflow test fixtures proven by the narrowed complete local CI failure. All acceptance criteria, outputs, verification gates, ordering, risk, and exclusions remain unchanged."
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1`. Expected: lifecycle plan approval, typed transport, evaluator rework, projection atomicity, branch-worktree replay, quality routing, PR artifact hydration, and protected integration handoff regressions pass.
    2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1`. Expected: canonical task projections, kernel invariants, replacement-plan recovery, stale-result handling, and task-store atomicity pass.
    3. Run `bun run format:check`. Expected: repository formatting is clean.
    4. Run `bun run lint:core`. Expected: core lint passes.
    5. Run `bun run typecheck`. Expected: TypeScript validation passes.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: task records and Verify Steps pass lint using the repository-local runtime.
    8. Run `agentplane doctor`. Expected: repository and task diagnostics report no errors.
    9. Run `git diff --check`. Expected: the final patch has no whitespace errors.
    10. Run `bun run ci:local:full`. Expected: the complete local CI gate passes after the focused repairs.
    11. Review QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 against current main. Expected: each edge is classified as already present, minimally required, independently useful outside scope, or obsolete; no stale branch is merged as-is.
    12. Review the final diff and task outcome. Expected: task projections advance atomically or fail without partial state, and no package version, release note, tag, publication, dependency, MPXQBK, or full GitLab/provider-neutral expansion change is present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-04T20:10:31.376Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check could not run: agentplane task lint
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:95f29c7308b07d354f55788604c28bcc3994e6cfd1a3ff5be67c41652160301b, input_digest=sha256:bf192956cd8fc649c9da1052fac11b93f082c975addbd85ecfde4604d3713280

    Details:

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609041801-ZVX69C declared verification

    Command: agentplane task lint
    Result: fail
    Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609041801-ZVX69C declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609041801-ZVX69C-repair-post-integration-clean-core-task-cycle-re/.agentplane/tasks/202609041801-ZVX69C/blueprint/resolved-snapshot.json
    - old_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
    - current_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609041801-ZVX69C

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609041801-ZVX69C
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-04T20:57:00.677Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check could not run: agentplane task lint
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:95f29c7308b07d354f55788604c28bcc3994e6cfd1a3ff5be67c41652160301b, input_digest=sha256:be0e7a6f9859c2366c06c23e2f69ab06718c05960fa50a7cb3ade9f3743fb36f

    Details:

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609041801-ZVX69C declared verification

    Command: agentplane task lint
    Result: fail
    Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609041801-ZVX69C declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609041801-ZVX69C-repair-post-integration-clean-core-task-cycle-re/.agentplane/tasks/202609041801-ZVX69C/blueprint/resolved-snapshot.json
    - old_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
    - current_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609041801-ZVX69C

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609041801-ZVX69C
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:0c5f62bbce9bd35b857d3f519756656b6aa8a901908bb0a02a409de158961ea7"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:3376853a2fc002883d0db22293115b286ec91c96e67cca3fb36c32718e5589f2"
    digest: "sha256:46c59869a3645d2721452bfe7c7e875ff466eba5c84be65e494e97bc3c28b20c"
    grant_id: "5f09b3ad-0daf-4f19-8632-821cdf4cfb99"
    issued_at: "2026-09-04T20:56:49.709Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a5f39c83e0955a766c57ea23a3f29e542e9c2e35c01d2379d9d684610f8bf090"
    plan_revision: 17
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c4e5cfac799cb5fee315891fb760ad2d7e3c268570cdb91d8eb37a8213076047"
    status: "active"
    task_id: "202609041801-ZVX69C"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-04T20:56:49.709Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-04T20:52:39.510Z"
      digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
      proposal:
        assumptions:
          - "The implementation checkpoint 359ff9b7c478650659df39f40384bba78342f41b remains the authoritative partial repair."
          - "Only current main and the current task worktree are authoritative; stale branches remain read-only evidence."
          - "The complete local CI failure identifies exactly two additional write roots."
          - "MPXQBK, release, version, publication, dependency, and full GitLab provider expansion remain outside this task."
        planning_baseline:
          captured_at: "2026-09-04T20:51:40.145Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:bae76702525c8cce47d60e47ea56671f602e8fc307cf71ea9d5553d2ee0e2772"
          dirty_paths:
            - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            - ".agentplane/tasks/202609041801-ZVX69C/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "9ad28bcb18eebdff64e88d9010294367df90dfe4"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:16"
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
              id: "focused-cli-cycle"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
              id: "focused-core-cycle"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
              id: "focused-added-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run format:check"
              id: "format-check"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js task lint"
              id: "task-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "agentplane doctor"
              id: "doctor"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "focused-cli-cycle"
                - "focused-core-cycle"
                - "focused-added-regressions"
                - "format-check"
                - "lint-core"
                - "typecheck"
                - "routing-policy"
                - "task-lint"
                - "doctor"
                - "diff-check"
                - "full-local-ci"
              description: "Focused task-cycle, evaluator, and runner coverage plus repository quality gates and complete local CI pass while excluded release and provider-expansion scope remains untouched."
              id: "clean-core-current-main-qualified"
              required: true
          evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "focused-core-cycle"
                    - "focused-added-regressions"
                  description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, protected integration handoff, evaluator fixtures, and managed-runner checkout authority."
                  id: "focused-cycle-regressions-pass"
                  required: true
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "focused-core-cycle"
                    - "focused-added-regressions"
                    - "full-local-ci"
                  description: "Task record, canonical aggregate, README projection, compatibility metadata, and runner authority advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                  id: "atomic-fail-closed-projections"
                  required: true
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "full-local-ci"
                  description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 remain classified; no stale branch is merged and excluded work remains deferred."
                  id: "salvage-audit-bounded"
                  required: true
                -
                  check_ids:
                    - "format-check"
                    - "lint-core"
                    - "typecheck"
                    - "routing-policy"
                    - "task-lint"
                    - "doctor"
                    - "diff-check"
                    - "full-local-ci"
                  description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, MPXQBK, or full GitLab expansion change."
                  id: "release-ready-without-release-mutation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 192000
                optional_sources:
                  - "read-only-stale-branch-diffs-and-task-routes"
                required_sources:
                  - "repository"
                  - "task-document"
                  - "current-main-focused-failure-evidence"
                symbol_hints:
                  - "fillEvaluatorTaskVerifySteps"
                  - "loadTaskCommandContext"
                  - "prepareTaskRunnerExecution"
                  - "assertRunnerCheckoutAuthority"
              depends_on: []
              expected_outputs:
                - "nine-focused-failures-classified-and-resolved"
                - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                - "stale-branch-salvage-classification"
                - "focused-and-full-local-verification-evidence"
              id: "repair-and-qualify-clean-core-task-cycle"
              objective: "Complete the existing focused task-cycle repair, update evaluator and workflow fixtures with task-specific Verify Steps, align managed-runner checkout authority with the validated task workspace, retain the stale-branch classification, and qualify the current-main result without entering excluded scope."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/workflow.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
                - "packages/agentplane/src/commands/workflow.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                    id: "focused-cli-cycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                    id: "focused-core-cycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
                    id: "focused-added-regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js task lint"
                    id: "task-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "agentplane doctor"
                    id: "doctor"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                    description: "The focused task-cycle and newly authorized evaluator and runner regressions pass."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                      - "full-local-ci"
                    description: "Task projections and checkout authority remain fail closed and deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "The existing stale-branch classification remains bounded and no excluded branch is imported."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "diff-check"
                      - "full-local-ci"
                    description: "All repository quality gates and complete local CI pass without release mutation."
                    id: "release-ready-without-release-mutation"
                    required: true
                evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202609041801-ZVX69C"
    event_cursor: 12
    final_validation: null
    id: "202609041801-ZVX69C"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "agentplane doctor"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "agentplane task lint"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-5"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
          id: "legacy-6"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
          id: "legacy-7"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-8"
          required: true
      captured_at: "2026-09-04T18:01:27.941Z"
      constraints: []
      request: |-
        Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

        On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
      task_id: "202609041801-ZVX69C"
    lifecycle: "ACTIVE"
    plan_amendments:
      -
        actor_id: "external:EXECUTOR"
        created_at: "2026-09-04T21:19:38.448Z"
        digest: "sha256:b4800ce84f36ad3a94cec16e87dcaa2cff18ef4c535b1b8da8dec8a264924abf"
        id: "amendment_b4800ce84f36ad3a94cec16e"
        plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
        plan_revision: 4
        refinement:
          acceptance_changed: false
          architecture_constraints_changed: false
          dependencies_changed: false
          description: "Replace only the top-level declared verification command `agentplane task lint` with `node packages/agentplane/bin/agentplane.js task lint`. Preserve the single WorkItem, all acceptance criteria, outputs, scope roots, risks, external effects, remaining checks, and ordering unchanged. Do not add `agentplane` to the allowed executable set and do not introduce a compatibility layer."
          external_effects_added: []
          operations:
            - "clarify"
          outputs_added: []
          risk_changed: false
          scope_roots_added: []
        schema_version: 1
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-04T18:07:07.074Z"
        digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
        proposal:
          assumptions:
            - "Task 202609030849-925NNG is terminal and its integrated changes are present on current main."
            - "Task 202609021331-5FPZAB is terminal and does not need recovery or duplication."
            - "Only current main is authoritative; stale task branches and PRs are read-only evidence and must not be merged as-is."
            - "MPXQBK, release/version/publication work, dependency upgrades, and full T4RR70 GitLab/provider-neutral expansion remain outside this task."
          planning_baseline:
            captured_at: "2026-09-04T18:01:32.480Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
            dirty_paths:
              - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                id: "focused-cli-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                id: "focused-core-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "format-check"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "agentplane task lint"
                id: "task-lint"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "agentplane doctor"
                id: "doctor"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-cli-cycle"
                  - "focused-core-cycle"
                  - "format-check"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "task-lint"
                  - "doctor"
                  - "full-local-ci"
                description: "Focused task-cycle coverage, repository quality gates, complete local CI, and hosted integration pass for the repaired current-main implementation while all excluded release and provider-expansion scope remains untouched."
                id: "clean-core-current-main-qualified"
                required: true
            evidence_fingerprint: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                    description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, and protected integration handoff."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "full-local-ci"
                    description: "Task record, canonical aggregate, README projection, and compatibility metadata advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 are each classified as already present, required and minimally ported, independently useful outside scope, or obsolete; no stale branch is merged as-is and excluded work remains deferred."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "full-local-ci"
                    description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, or full GitLab expansion change."
                    id: "release-ready-without-release-mutation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 192000
                  optional_sources:
                    - "read-only-stale-branch-diffs-and-task-routes"
                  required_sources:
                    - "repository"
                    - "task-document"
                    - "current-main-focused-failure-evidence"
                  symbol_hints:
                    - "projectTaskCentricCompatibilityMutation"
                    - "taskPlanApprove"
                    - "routeDecision"
                    - "resolveAuthoritativeTaskWorktree"
                    - "protectedIntegrationHandoff"
                    - "prArtifacts"
                depends_on: []
                expected_outputs:
                  - "nine-focused-failures-classified-and-resolved"
                  - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                  - "stale-branch-salvage-classification"
                  - "focused-and-full-local-verification-evidence"
                id: "repair-and-qualify-clean-core-task-cycle"
                objective: "Reproduce and classify every current focused task-cycle failure, repair only the stale fixtures or production behavior necessary to restore fail-closed canonical task projections and deterministic branch-worktree/PR lifecycle behavior, record the stale-branch salvage classification, and qualify the final current-main result without entering release scope."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                      id: "focused-cli-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                      id: "focused-core-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "format-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "agentplane task lint"
                      id: "task-lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "agentplane doctor"
                      id: "doctor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                      description: "The exact focused CLI and core task-cycle suites pass after the smallest coherent repair."
                      id: "focused-cycle-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "full-local-ci"
                      description: "Task projections remain atomic and fail closed, with deterministic replay and stale-result handling."
                      id: "atomic-fail-closed-projections"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "full-local-ci"
                      description: "The stale-branch salvage audit is recorded without merging stale branches or expanding excluded scope."
                      id: "salvage-audit-bounded"
                      required: true
                    -
                      check_ids:
                        - "format-check"
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "task-lint"
                        - "doctor"
                        - "full-local-ci"
                      description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass without release mutation."
                      id: "release-ready-without-release-mutation"
                      required: true
                  evidence_fingerprint: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      -
        approval:
          approved_at: "2026-09-04T18:17:19.009Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-04T18:11:29.237Z"
        digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
        proposal:
          assumptions:
            - "Task 202609030849-925NNG is terminal and its integrated changes are present on current main."
            - "Task 202609021331-5FPZAB is terminal and does not need recovery or duplication."
            - "Only current main is authoritative; stale task branches and PRs are read-only evidence and must not be merged as-is."
            - "MPXQBK, release/version/publication work, dependency upgrades, and full T4RR70 GitLab/provider-neutral expansion remain outside this task."
          planning_baseline:
            captured_at: "2026-09-04T18:09:01.934Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
            dirty_paths:
              - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:3"
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                id: "focused-cli-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                id: "focused-core-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "format-check"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "node packages/agentplane/bin/agentplane.js task lint"
                id: "task-lint"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "agentplane doctor"
                id: "doctor"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-cli-cycle"
                  - "focused-core-cycle"
                  - "format-check"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "task-lint"
                  - "doctor"
                  - "diff-check"
                  - "full-local-ci"
                description: "Focused task-cycle coverage, repository quality gates, complete local CI, and hosted integration pass for the repaired current-main implementation while all excluded release and provider-expansion scope remains untouched."
                id: "clean-core-current-main-qualified"
                required: true
            evidence_fingerprint: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                    description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, and protected integration handoff."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "full-local-ci"
                    description: "Task record, canonical aggregate, README projection, and compatibility metadata advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 are each classified as already present, required and minimally ported, independently useful outside scope, or obsolete; no stale branch is merged as-is and excluded work remains deferred."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "diff-check"
                      - "full-local-ci"
                    description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, or full GitLab expansion change."
                    id: "release-ready-without-release-mutation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 192000
                  optional_sources:
                    - "read-only-stale-branch-diffs-and-task-routes"
                  required_sources:
                    - "repository"
                    - "task-document"
                    - "current-main-focused-failure-evidence"
                  symbol_hints:
                    - "projectTaskCentricCompatibilityMutation"
                    - "taskPlanApprove"
                    - "routeDecision"
                    - "resolveAuthoritativeTaskWorktree"
                    - "protectedIntegrationHandoff"
                    - "prArtifacts"
                depends_on: []
                expected_outputs:
                  - "nine-focused-failures-classified-and-resolved"
                  - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                  - "stale-branch-salvage-classification"
                  - "focused-and-full-local-verification-evidence"
                id: "repair-and-qualify-clean-core-task-cycle"
                objective: "Reproduce and classify every current focused task-cycle failure, repair only the stale fixtures or production behavior necessary to restore fail-closed canonical task projections and deterministic branch-worktree/PR lifecycle behavior, record the stale-branch salvage classification, and qualify the final current-main result without entering release scope."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                      id: "focused-cli-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                      id: "focused-core-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "format-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "node packages/agentplane/bin/agentplane.js task lint"
                      id: "task-lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "agentplane doctor"
                      id: "doctor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                      description: "The exact focused CLI and core task-cycle suites pass after the smallest coherent repair."
                      id: "focused-cycle-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "full-local-ci"
                      description: "Task projections remain atomic and fail closed, with deterministic replay and stale-result handling."
                      id: "atomic-fail-closed-projections"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "full-local-ci"
                      description: "The stale-branch salvage audit is recorded without merging stale branches or expanding excluded scope."
                      id: "salvage-audit-bounded"
                      required: true
                    -
                      check_ids:
                        - "format-check"
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "task-lint"
                        - "doctor"
                        - "diff-check"
                        - "full-local-ci"
                      description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass without release mutation."
                      id: "release-ready-without-release-mutation"
                      required: true
                  evidence_fingerprint: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      -
        approval:
          approved_at: "2026-09-04T20:10:10.006Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-04T19:49:00.768Z"
        digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
        proposal:
          assumptions:
            - "The implementation checkpoint 359ff9b7c478650659df39f40384bba78342f41b remains the authoritative partial repair."
            - "Only current main and the current task worktree are authoritative; stale branches remain read-only evidence."
            - "The complete local CI failure identifies exactly two additional write roots."
            - "MPXQBK, release, version, publication, dependency, and full GitLab provider expansion remain outside this task."
          planning_baseline:
            captured_at: "2026-09-04T19:44:22.828Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
            dirty_paths:
              - ".agentplane/tasks/202609041801-ZVX69C/README.md"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/implementation-evidence.json"
            git:
              kind: "commit"
              ref: null
              sha: "359ff9b7c478650659df39f40384bba78342f41b"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:10"
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                id: "focused-cli-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                id: "focused-core-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
                id: "focused-added-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "format-check"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "node packages/agentplane/bin/agentplane.js task lint"
                id: "task-lint"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "agentplane doctor"
                id: "doctor"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-cli-cycle"
                  - "focused-core-cycle"
                  - "focused-added-regressions"
                  - "format-check"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "task-lint"
                  - "doctor"
                  - "diff-check"
                  - "full-local-ci"
                description: "Focused task-cycle, evaluator, and runner coverage plus repository quality gates and complete local CI pass while excluded release and provider-expansion scope remains untouched."
                id: "clean-core-current-main-qualified"
                required: true
            evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                    description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, protected integration handoff, evaluator fixtures, and managed-runner checkout authority."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                      - "full-local-ci"
                    description: "Task record, canonical aggregate, README projection, compatibility metadata, and runner authority advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 remain classified; no stale branch is merged and excluded work remains deferred."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "diff-check"
                      - "full-local-ci"
                    description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, MPXQBK, or full GitLab expansion change."
                    id: "release-ready-without-release-mutation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 192000
                  optional_sources:
                    - "read-only-stale-branch-diffs-and-task-routes"
                  required_sources:
                    - "repository"
                    - "task-document"
                    - "current-main-focused-failure-evidence"
                  symbol_hints:
                    - "fillEvaluatorTaskVerifySteps"
                    - "loadTaskCommandContext"
                    - "prepareTaskRunnerExecution"
                    - "assertRunnerCheckoutAuthority"
                depends_on: []
                expected_outputs:
                  - "nine-focused-failures-classified-and-resolved"
                  - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                  - "stale-branch-salvage-classification"
                  - "focused-and-full-local-verification-evidence"
                id: "repair-and-qualify-clean-core-task-cycle"
                objective: "Complete the existing focused task-cycle repair, update evaluator fixtures with task-specific Verify Steps, align managed-runner checkout authority with the validated task workspace, retain the stale-branch classification, and qualify the current-main result without entering excluded scope."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/evaluator"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner/usecases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                      id: "focused-cli-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                      id: "focused-core-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
                      id: "focused-added-regressions"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "format-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "node packages/agentplane/bin/agentplane.js task lint"
                      id: "task-lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "agentplane doctor"
                      id: "doctor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "focused-added-regressions"
                      description: "The focused task-cycle and newly authorized evaluator and runner regressions pass."
                      id: "focused-cycle-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "focused-added-regressions"
                        - "full-local-ci"
                      description: "Task projections and checkout authority remain fail closed and deterministic."
                      id: "atomic-fail-closed-projections"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "full-local-ci"
                      description: "The existing stale-branch classification remains bounded and no excluded branch is imported."
                      id: "salvage-audit-bounded"
                      required: true
                    -
                      check_ids:
                        - "format-check"
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "task-lint"
                        - "doctor"
                        - "diff-check"
                        - "full-local-ci"
                      description: "All repository quality gates and complete local CI pass without release mutation."
                      id: "release-ready-without-release-mutation"
                      required: true
                  evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609041801-ZVX69C"
    revision: 23
    schema_version: 1
    updated_at: "2026-09-04T21:19:38.585Z"
    work_items:
      repair-and-qualify-clean-core-task-cycle:
        attempt: 1
        claim_id: null
        id: "repair-and-qualify-clean-core-task-cycle"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:5d40b56d242a292de1d977cf19083551b49ea6d76d88f964db9c05d6db609261"
            id: "nine-focused-failures-classified-and-resolved"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609041801-ZVX69C"
              work_item_id: "repair-and-qualify-clean-core-task-cycle"
            provenance:
              - "sha256:ad821adaa0f327c89125726f22ceeff4e5e2a1b03ad30ff40c55b7042ef2309b"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:54691d76b0c5037dc615c0caae19afbe3acd3550bf50a508d36fa04428377e5c"
            id: "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609041801-ZVX69C"
              work_item_id: "repair-and-qualify-clean-core-task-cycle"
            provenance:
              - "sha256:ad821adaa0f327c89125726f22ceeff4e5e2a1b03ad30ff40c55b7042ef2309b"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:837b798c35e93e748e14b71746a2723779584e48da60989b79d6a9042fa03d63"
            id: "stale-branch-salvage-classification"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609041801-ZVX69C"
              work_item_id: "repair-and-qualify-clean-core-task-cycle"
            provenance:
              - "sha256:ad821adaa0f327c89125726f22ceeff4e5e2a1b03ad30ff40c55b7042ef2309b"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:8fd7f15fdb2cb86b4e8741fa6a73fc2176c0b4616b49c83fcd6735e5c962fc51"
            id: "focused-and-full-local-verification-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609041801-ZVX69C"
              work_item_id: "repair-and-qualify-clean-core-task-cycle"
            provenance:
              - "sha256:ad821adaa0f327c89125726f22ceeff4e5e2a1b03ad30ff40c55b7042ef2309b"
              - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "focused-cli-cycle"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "focused-core-cycle"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "focused-added-regressions"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "format-check"
              command_identity: "bun run format:check"
              detail: "Observed by bun run format:check."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "lint-core"
              command_identity: "bun run lint:core"
              detail: "Observed by bun run lint:core."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "routing-policy"
              command_identity: "node .agentplane/policy/check-routing.mjs"
              detail: "Observed by node .agentplane/policy/check-routing.mjs."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "task-lint"
              command_identity: "node packages/agentplane/bin/agentplane.js task lint"
              detail: "Observed by node packages/agentplane/bin/agentplane.js task lint."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "doctor"
              command_identity: "agentplane doctor"
              detail: "Observed by agentplane doctor."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "diff-check"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
              check_id: "full-local-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-04T21:19:38.571Z"
              repository_snapshot_digest: "sha256:953c8979ad652bb89cc3397531358cc50c8bb293b6b8e0a2700458cafa4c9218"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-04T18:08:56.286Z"
        from: "AWAITING_PLAN_APPROVAL"
        to: "PLANNING"
        actor_id: "USER"
        cause_refs:
          - "plan:sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
          - "note:sha256:3daa38e24406cec20eae796619ef60fdeffceda260bbb2505ff15200a55aa694"
        entity: "task"
        id: "event_2ce2389384a4a352a610ebb0"
        mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
        plan_digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 2
        work_item_id: null
      -
        at: "2026-09-04T19:44:21.142Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_6e7d058d9737647afcd46cba"
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
        plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 9
        work_item_id: null
      -
        at: "2026-09-04T20:51:38.451Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_c1eee5e83874e8c2aaec00bb"
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-d5084b8413e0a275f3766b13"
        plan_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 15
        work_item_id: null
      -
        at: "2026-09-04T21:19:38.448Z"
        from: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
        to: "sha256:b4800ce84f36ad3a94cec16e87dcaa2cff18ef4c535b1b8da8dec8a264924abf"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_f9ae25b88c852d57dfeb977c"
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
        plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 21
        work_item_id: null
      -
        at: "2026-09-04T21:19:38.585Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_0e8e18a78990193195eba447"
        mutation_id: "external-result:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
        plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 22
        work_item_id: "repair-and-qualify-clean-core-task-cycle"
    leases: []
    mutation_receipts:
      compatibility:sha256:277b0e4b731324bb62621d27cc12e3603148787101b7efd68a1f3e5e7ee14f46:
        aggregate_digest: "sha256:ee837e9579e0c5f7e0520ecb1c3abd84f55f2791be8d7fce42634d5c17742e14"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T21:07:21.152Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_237fef987446ab455ba2ba88"
          mutation_id: "compatibility:sha256:277b0e4b731324bb62621d27cc12e3603148787101b7efd68a1f3e5e7ee14f46"
          plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 20
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:277b0e4b731324bb62621d27cc12e3603148787101b7efd68a1f3e5e7ee14f46"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983:
        aggregate_digest: "sha256:3bba2c7d2cf7ad2450267e550381f981d598754164caeb9d90d69735ce4f0372"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T19:32:44.657Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8188687a901fab71cc4ef122"
          mutation_id: "compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:5b8248c8778c2396b858dc981fa9e21345b86937a93c6ca5c77418515e7f93d6:
        aggregate_digest: "sha256:3eb18567fee538c6de8d38fb56ac3e02fee92d9fe4ebc00bdcfed667434cb0ec"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T21:07:21.152Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_805f3e597cbcf6adc626005e"
          mutation_id: "compatibility:sha256:5b8248c8778c2396b858dc981fa9e21345b86937a93c6ca5c77418515e7f93d6"
          plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5b8248c8778c2396b858dc981fa9e21345b86937a93c6ca5c77418515e7f93d6"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:65400bd5e705ffe65f233e15ddab56ec29ceb744c0ff3cfaa7853ff31d6011f2:
        aggregate_digest: "sha256:f7122476c989d3d16c9d2c43c8c315d494e2e580f2b9d94e5ab4484443a90e70"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T20:57:01.560Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_11ce58a0feada29471dc8d8f"
          mutation_id: "compatibility:sha256:65400bd5e705ffe65f233e15ddab56ec29ceb744c0ff3cfaa7853ff31d6011f2"
          plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:65400bd5e705ffe65f233e15ddab56ec29ceb744c0ff3cfaa7853ff31d6011f2"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616:
        aggregate_digest: "sha256:8e872935d46db4701307fc9ee58f13f64047e67c312490c93e009f326bc50a48"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T18:11:53.209Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_311ce146e0df3ff419db6bc0"
          mutation_id: "compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 4
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:887b2e05fd7a9f9e02517a7561ac7fe19aee6c6499f35133b7f42e2b75b45e83:
        aggregate_digest: "sha256:5270384fb8776c565667c7cf688d9f61221ec78527bfa9e407626d55955d6499"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T20:10:32.184Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8b2091ba8f36059d4be33ecc"
          mutation_id: "compatibility:sha256:887b2e05fd7a9f9e02517a7561ac7fe19aee6c6499f35133b7f42e2b75b45e83"
          plan_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:887b2e05fd7a9f9e02517a7561ac7fe19aee6c6499f35133b7f42e2b75b45e83"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:8da570d8680b725ffc7874d6238d89a2e1a1f7f6ec7bee91c616d264884567bb:
        aggregate_digest: "sha256:1d117b896e1acece73063c635430f613716294745a0e3362ecd89a7fe681ae66"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T20:40:00.019Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b9af3bf71ae4f006806a41de"
          mutation_id: "compatibility:sha256:8da570d8680b725ffc7874d6238d89a2e1a1f7f6ec7bee91c616d264884567bb"
          plan_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8da570d8680b725ffc7874d6238d89a2e1a1f7f6ec7bee91c616d264884567bb"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0:
        aggregate_digest: "sha256:8fbdfa69ff15df3aba4e9c18aa966e3338475131094f489017b933b374948827"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T19:32:44.657Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fc60a5918309d6507816d4f3"
          mutation_id: "compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec:
        aggregate_digest: "sha256:b313714b321a1dda589ae9d27414c25a321bdec6242398117d108871cf6f6dc0"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T18:17:29.142Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_64d53847bf560ee6dd35a027"
          mutation_id: "compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:eb79e785d2ce2ec5c51d7a6bc99ebc4dea4c33f153859e6e44a717a3103ca9e0:
        aggregate_digest: "sha256:b878ccac955289eeab555bc47b4db91dce3a80f5b35ccbfd2979679f581978e8"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T20:40:00.019Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6b7e3f1b4640f9eff608e8c1"
          mutation_id: "compatibility:sha256:eb79e785d2ce2ec5c51d7a6bc99ebc4dea4c33f153859e6e44a717a3103ca9e0"
          plan_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:eb79e785d2ce2ec5c51d7a6bc99ebc4dea4c33f153859e6e44a717a3103ca9e0"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      external-result:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c:
        aggregate_digest: "sha256:c3fb8ec069cf68b6ae1bac46cebc87add57dd8c7e832ead314493a43901f585a"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T21:19:38.585Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_0e8e18a78990193195eba447"
          mutation_id: "external-result:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
          plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 22
          to: "COMPLETED"
          work_item_id: "repair-and-qualify-clean-core-task-cycle"
        mutation_id: "external-result:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-refinement:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c:
        aggregate_digest: "sha256:6e681a6ccd08dcf9bc696b581d92914487ba854f7f98e789e1e3a7236a3cc61b"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-04T21:19:38.448Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          id: "event_f9ae25b88c852d57dfeb977c"
          mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
          plan_digest: "sha256:09d9cb71cccfe955dd1fa0f9f81ba57be71072ee07d2b395e408998a7d042cee"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 21
          to: "sha256:b4800ce84f36ad3a94cec16e87dcaa2cff18ef4c535b1b8da8dec8a264924abf"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-4e3304c80d6fe2e0a1a5ca0c"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25:
        aggregate_digest: "sha256:74349dead0f9041f88ababa8939b649221c56c51690f68ee6eb8fc252f6babf6"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-04T19:44:21.142Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_6e7d058d9737647afcd46cba"
          mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-refinement:work-order-202609041801-ZVX69C-executor-d5084b8413e0a275f3766b13:
        aggregate_digest: "sha256:1787bbb9cca86d225e65377d692b5fbf36e516ba86fb95e0fc95136ff73a3a92"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-04T20:51:38.451Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_c1eee5e83874e8c2aaec00bb"
          mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-d5084b8413e0a275f3766b13"
          plan_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-d5084b8413e0a275f3766b13"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-reject-cccc54072907ad3149340210ac05fc90:
        aggregate_digest: "sha256:72bafab5c74d61343c0d2680a56e0f95e486c71552a26f548f66f899db983e18"
        event:
          actor_id: "USER"
          at: "2026-09-04T18:08:56.286Z"
          cause_refs:
            - "plan:sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
            - "note:sha256:3daa38e24406cec20eae796619ef60fdeffceda260bbb2505ff15200a55aa694"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_2ce2389384a4a352a610ebb0"
          mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
          plan_digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 2
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609041801-ZVX69C"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "53302ccb9941294c5c2a4eaf6cc33b819dee67ee"
  task_execution_context:
    base_ref: "main"
    base_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    version: 1
id_source: "generated"
---
## Summary

Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.

## Scope

- In scope: On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
- Out of scope: unrelated refactors not required for "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification".

## Plan

Preserve the approved single regression-repair WorkItem and extend its authority only to the two workflow test fixtures proven by the narrowed complete local CI failure. All acceptance criteria, outputs, verification gates, ordering, risk, and exclusions remain unchanged.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1`. Expected: lifecycle plan approval, typed transport, evaluator rework, projection atomicity, branch-worktree replay, quality routing, PR artifact hydration, and protected integration handoff regressions pass.
2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1`. Expected: canonical task projections, kernel invariants, replacement-plan recovery, stale-result handling, and task-store atomicity pass.
3. Run `bun run format:check`. Expected: repository formatting is clean.
4. Run `bun run lint:core`. Expected: core lint passes.
5. Run `bun run typecheck`. Expected: TypeScript validation passes.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: task records and Verify Steps pass lint using the repository-local runtime.
8. Run `agentplane doctor`. Expected: repository and task diagnostics report no errors.
9. Run `git diff --check`. Expected: the final patch has no whitespace errors.
10. Run `bun run ci:local:full`. Expected: the complete local CI gate passes after the focused repairs.
11. Review QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 against current main. Expected: each edge is classified as already present, minimally required, independently useful outside scope, or obsolete; no stale branch is merged as-is.
12. Review the final diff and task outcome. Expected: task projections advance atomically or fail without partial state, and no package version, release note, tag, publication, dependency, MPXQBK, or full GitLab/provider-neutral expansion change is present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-04T20:10:31.376Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check could not run: agentplane task lint
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:95f29c7308b07d354f55788604c28bcc3994e6cfd1a3ff5be67c41652160301b, input_digest=sha256:bf192956cd8fc649c9da1052fac11b93f082c975addbd85ecfde4604d3713280

Details:

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609041801-ZVX69C declared verification

Command: agentplane task lint
Result: fail
Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609041801-ZVX69C declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609041801-ZVX69C-repair-post-integration-clean-core-task-cycle-re/.agentplane/tasks/202609041801-ZVX69C/blueprint/resolved-snapshot.json
- old_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
- current_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609041801-ZVX69C

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609041801-ZVX69C
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-04T20:57:00.677Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check could not run: agentplane task lint
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:95f29c7308b07d354f55788604c28bcc3994e6cfd1a3ff5be67c41652160301b, input_digest=sha256:be0e7a6f9859c2366c06c23e2f69ab06718c05960fa50a7cb3ade9f3743fb36f

Details:

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609041801-ZVX69C declared verification

Command: agentplane task lint
Result: fail
Evidence: .agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609041801-ZVX69C declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609041801-ZVX69C-repair-post-integration-clean-core-task-cycle-re/.agentplane/tasks/202609041801-ZVX69C/blueprint/resolved-snapshot.json
- old_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
- current_digest: 1d5d03aeacdb1b483834043137b255a61757d9709689684a0ace4bb88d72636c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609041801-ZVX69C

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609041801-ZVX69C
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
