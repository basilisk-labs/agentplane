---
id: "202609030849-925NNG"
title: "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap-recovery"
  - "task-centric-projection"
  - "plan-rejection"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T11:32:01.234Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:490fd6caaf0298d0e941adf03ea509f12c27a85ec06548a12aa76eb7849a294a"
verification:
  state: "needs_rework"
  updated_at: "2026-09-03T11:29:57.796Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:full"
  attempts: 2
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/reference"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The defect spans canonical task-centric persistence, routing, diagnostics, CLI registration, focused tests, and the exact compatibility ratchet."
      - "branch_pr remains required for independent evaluation and hosted integration before historical recovery."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/reference"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/reference"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/doctor"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-kernel"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:ab022e87a13b2832d513163d959623f6d75994613c9d9b07c4e5128e5d49934e"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
        - "docs_contract"
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
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: fc7843b5ffc6. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 6d8522b612cf. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-03T08:57:33.804Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T09:14:46.501Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fc7843b5ffc6. CLI accepted one state-bound external-agent semantic result."
    commit: "fc7843b5ffc66dac1d65dcacc3c26fb38edd1db8"
  -
    type: "verify"
    at: "2026-09-03T09:14:54.444Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: agentplane doctor"
  -
    type: "status"
    at: "2026-09-03T11:23:34.113Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T11:28:06.930Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 6d8522b612cf. CLI accepted one state-bound external-agent semantic result."
    commit: "6d8522b612cf0684ec6d4b9fc2dd5f3d34391342"
  -
    type: "verify"
    at: "2026-09-03T11:29:57.796Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-03T11:32:06.611Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-03T11:32:06.611Z"
doc_updated_by: "CODER"
description: "Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB."
sections:
  Summary: |-
    Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

    Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
  Scope: |-
    - In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
    - Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".
  Plan: "Refined the branch_pr recovery plan to include the compatibility ratchet checker required to review the new internal CLI recovery command."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-03T09:14:54.444Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: agentplane doctor
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:033e09543ff0e1038058d9488275acb9169fea33a36278d8136bbfa0b3b7a007

    Details:

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: agentplane doctor
    Result: fail
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T11:29:57.796Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:33d3954a1429d61236351f21f9aa4d220b84f62330d99964ccefe63209a31c43

    Details:

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

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
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:490fd6caaf0298d0e941adf03ea509f12c27a85ec06548a12aa76eb7849a294a"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e2948d9d384b38b3f5e77112cf7ab5b5144ff9c778c1bde311f0402d7c728526"
    digest: "sha256:1961786f6a192074eb0b31b0a149534dfb70232f1073d8dd5ff5772567be7c14"
    grant_id: "2dd0dc97-03d0-4b99-ac0d-c6601c7cd511"
    issued_at: "2026-09-03T11:32:01.234Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0b03171c6441811340c3f5a31813727d519d8c6c2ef1dd4639587ddd9bd801c0"
    plan_revision: 16
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f4fbd7586006095d0e046d670c8df7a6ea758e42387969ea67c87d3a14759130"
    status: "active"
    task_id: "202609030849-925NNG"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T11:32:01.234Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T11:31:01.148Z"
      digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
      proposal:
        assumptions:
          - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
          - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
          - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          - "The compatibility candidate and ratchet checker will record only the intentional recover-rejection command descriptor, options, and task provenance."
        planning_baseline:
          captured_at: "2026-09-03T11:30:12.647Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c17d428d7ff391ce0b6ea64045541fab73326b933fee216dbe8e3542075a6104"
          dirty_paths:
            - ".agentplane/tasks/202609030849-925NNG/README.md"
            - ".agentplane/tasks/202609030849-925NNG/pr/github-body.md"
            - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
            - ".agentplane/tasks/202609030849-925NNG/pr/review.md"
            - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202609030849-925NNG/verification/20260903112957796-21c9078b9095e3cb.json"
          git:
            kind: "commit"
            ref: null
            sha: "47389c597cfaab95a08b282db8ea606aa350da79"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:15"
        schema_version: 1
        task_id: "202609030849-925NNG"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
              id: "focused-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "lifecycle-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
              id: "compatibility"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run hotspots:check"
              id: "hotspots"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run lint"
              id: "lint"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "independent-evaluator"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "hosted-integration"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "post-merge-recovery"
              kind: "semantic"
              required: true
          criteria:
            -
              check_ids:
                - "focused-regressions"
              description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
              id: "top-1"
              required: true
            -
              check_ids:
                - "lifecycle-invariants"
                - "compatibility"
                - "hotspots"
                - "lint"
                - "typecheck"
                - "routing-policy"
                - "full-local-ci"
              description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
              id: "top-2"
              required: true
            -
              check_ids:
                - "independent-evaluator"
                - "hosted-integration"
              description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
              id: "top-3"
              required: true
            -
              check_ids:
                - "post-merge-recovery"
              description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
              id: "top-4"
              required: true
          evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "atomic-focused"
                  description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                  id: "atomic-1"
                  required: true
                -
                  check_ids:
                    - "atomic-focused"
                  description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                  id: "atomic-2"
                  required: true
                -
                  check_ids:
                    - "atomic-focused"
                    - "lifecycle-invariants"
                  description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                  id: "atomic-3"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/agentplane/src/commands/task/kernel-advance.ts"
                symbol_hints:
                  - "cmdTaskPlanReject"
                  - "reject_plan"
                  - "TaskCentricBackendAdapter"
                  - "advanceCanonicalTask"
              depends_on: []
              expected_outputs:
                - "atomic-plan-rejection-implementation"
                - "plan-rejection-regression-evidence"
              id: "atomic-plan-rejection"
              objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
              optional: false
              priority: 100
              required_inputs:
                - "planning-baseline"
                - "confirmed-corrupted-state"
                - "rejected-plan-digest"
              resource_claims:
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
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks/task-kernel"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                    id: "atomic-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                    id: "atomic-3"
                    required: true
                evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recovery-focused"
                  description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                  id: "recovery-1"
                  required: true
                -
                  check_ids:
                    - "recovery-focused"
                  description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                  id: "recovery-2"
                  required: true
                -
                  check_ids:
                    - "recovery-focused"
                    - "lifecycle-invariants"
                  description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                  id: "recovery-3"
                  required: true
                -
                  check_ids:
                    - "compatibility"
                    - "routing-policy"
                  description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                  id: "recovery-4"
                  required: true
                -
                  check_ids:
                    - "hotspots"
                    - "lint"
                    - "typecheck"
                    - "full-local-ci"
                    - "independent-evaluator"
                    - "hosted-integration"
                  description: "All requested quality gates pass, an independent EVALUATOR passes the implementation, and branch_pr integration completes before historical recovery."
                  id: "recovery-5"
                  required: true
                -
                  check_ids:
                    - "post-merge-recovery"
                  description: "On fresh main the CLI-owned operation recovers 202609021331-5FPZAB, records its receipt and evidence, emits a fresh agent.planning packet, and no plan is approved on the user's behalf."
                  id: "recovery-6"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                  - "docs/reference"
                required_sources:
                  - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                symbol_hints:
                  - "checkTaskReadmeMigrationState"
                  - "cmdTaskPlanReject"
                  - "mutation_receipts"
                  - "task command catalog"
                  - "compatibility candidate"
              depends_on:
                - "atomic-plan-rejection"
              expected_outputs:
                - "recovery-operation-implementation"
                - "diagnostic-regression-evidence"
                - "compatibility-candidate-update"
                - "historical-recovery-regression-evidence"
                - "integrated-repair"
                - "historical-task-recovery-evidence"
                - "reviewed-compatibility-ratchet-update"
              id: "diagnostic-and-recovery"
              objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
              optional: false
              priority: 90
              required_inputs:
                - "atomic-plan-rejection-implementation"
                - "plan-rejection-regression-evidence"
              resource_claims:
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
                  resource: "packages/agentplane/src/commands/doctor"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/doctor"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks/task-kernel"
                - "docs/reference"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                    id: "recovery-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                    id: "compatibility"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run hotspots:check"
                    id: "hotspots"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run lint"
                    id: "lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "independent-evaluator"
                    kind: "semantic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "hosted-integration"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "post-merge-recovery"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "Compatibility and routing checks verify the intentional CLI surface addition."
                    id: "recovery-4"
                    required: true
                  -
                    check_ids:
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "Static, full regression, independent review, and hosted integration gates all pass."
                    id: "recovery-5"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "Post-merge semantic evidence proves historical recovery and the unapproved fresh planning boundary."
                    id: "recovery-6"
                    required: true
                evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609030849-925NNG"
    event_cursor: 0
    final_validation: null
    id: "202609030849-925NNG"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-03T08:49:30.592Z"
      constraints: []
      request: |-
        Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

        Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
      task_id: "202609030849-925NNG"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-03T08:57:27.879Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T08:55:48.324Z"
        digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
        proposal:
          assumptions:
            - "The repair can reuse the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The historical task will be reconciled only after this branch_pr task is independently evaluated and integrated onto fresh main."
            - "The new recovery command will require exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          planning_baseline:
            captured_at: "2026-09-03T08:49:35.054Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "a51e95514f2909177410f78a4057873140097edb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested focused regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility checks, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed baselines or skipped mandatory checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before the historical task is recovered."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "After fresh main, only the new CLI-owned operation reconciles 202609021331-5FPZAB and evidence records the recovered revision, new fingerprint, recovery receipt, and agent.planning packet without approving its new plan."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Plan proposal followed by rejection commits README projection, canonical aggregate, revision, event journal, mutation receipt, rejected plan state, and next route as one observable mutation."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact replay returns the durable rejection receipt without a second revision or event, and simulated interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Approval packets and host-user decisions bound to the rejected digest or prior fingerprint fail closed, while task advance selects kernel_plan_required and emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
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
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify the atomic projection, aggregate, journal, receipt, plan state, revision, and route mutation."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify exact replay and every simulated interruption boundary."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and the planning route."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the fixture with README revision 52, aggregate revision 50, README rejected state, and canonical approval-eligible plan without mutating it."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The CLI recovery validates the exact historical preconditions, preserves existing task content and evidence, appends the required canonical event and receipt with monotonic revision history, and is deterministic and auditable."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "A fixture equivalent to 202609021331-5FPZAB recovers successfully; rejected digest approval stays impossible and post-recovery task advance emits agent.planning with a new state fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "CLI help/reference and command compatibility remain consistent for the new recovery operation."
                    id: "recovery-4"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 140000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "historical-recovery-regression-evidence"
                id: "diagnostic-and-recovery"
                objective: "Add a read-only diagnostic for README versus canonical revision and plan-state divergence plus a deterministic CLI-owned recovery operation that reconstructs the missing canonical rejection transition, event, receipt, invalidation, and monotonic revision history for the historical corruption shape without direct artifact edits."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
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
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused recovery tests verify exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused recovery tests and invariants verify rejected digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the CLI surface and reference integration."
                      id: "recovery-4"
                      required: true
                  evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609030849-925NNG"
      -
        approval:
          approved_at: "2026-09-03T11:23:28.933Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T09:19:09.495Z"
        digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
        proposal:
          assumptions:
            - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The compatibility candidate update will contain only the intentional new recovery command topology."
            - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
            - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          planning_baseline:
            captured_at: "2026-09-03T09:14:58.809Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/github-body.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
              - ".agentplane/tasks/202609030849-925NNG/pr/review.md"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202609030849-925NNG/verification/20260903091454444-96c41af32da98426.json"
            git:
              kind: "commit"
              ref: null
              sha: "fc7843b5ffc66dac1d65dcacc3c26fb38edd1db8"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:8"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
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
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                    id: "recovery-4"
                    required: true
                  -
                    check_ids:
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "All requested quality gates pass, an independent EVALUATOR passes the implementation, and branch_pr integration completes before historical recovery."
                    id: "recovery-5"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "On fresh main the CLI-owned operation recovers 202609021331-5FPZAB, records its receipt and evidence, emits a fresh agent.planning packet, and no plan is approved on the user's behalf."
                    id: "recovery-6"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                    - "scripts/baselines/v0.7-compatibility-candidate.json"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                    - "compatibility candidate"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "compatibility-candidate-update"
                  - "historical-recovery-regression-evidence"
                  - "integrated-repair"
                  - "historical-task-recovery-evidence"
                id: "diagnostic-and-recovery"
                objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
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
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run hotspots:check"
                      id: "hotspots"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lint"
                      id: "lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "independent-evaluator"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "post-merge-recovery"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the intentional CLI surface addition."
                      id: "recovery-4"
                      required: true
                    -
                      check_ids:
                        - "hotspots"
                        - "lint"
                        - "typecheck"
                        - "full-local-ci"
                        - "independent-evaluator"
                        - "hosted-integration"
                      description: "Static, full regression, independent review, and hosted integration gates all pass."
                      id: "recovery-5"
                      required: true
                    -
                      check_ids:
                        - "post-merge-recovery"
                      description: "Post-merge semantic evidence proves historical recovery and the unapproved fresh planning boundary."
                      id: "recovery-6"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609030849-925NNG"
    revision: 17
    schema_version: 1
    updated_at: "2026-09-03T11:32:01.234Z"
    work_items:
      atomic-plan-rejection:
        attempt: 0
        claim_id: null
        id: "atomic-plan-rejection"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      diagnostic-and-recovery:
        attempt: 0
        claim_id: null
        id: "diagnostic-and-recovery"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-03T09:14:57.375Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_fd9e7caba7ab1be301470ac5"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
        plan_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 7
        work_item_id: null
      -
        at: "2026-09-03T11:30:03.275Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_7baf48a801f9a4dcb4a422bc"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
        plan_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 14
        work_item_id: null
    leases: []
    mutation_receipts:
      plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad:
        aggregate_digest: "sha256:1fc0b90b67259acad5fec47dcf1c129fe8a6f04d521b6be3a302267f79840b91"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T11:30:03.275Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_7baf48a801f9a4dcb4a422bc"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
          plan_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 14
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704:
        aggregate_digest: "sha256:e043ed4109a2c59eb7fc3cf6e54ff7d568fa7dfc0db70a924b3f211498f4e7df"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T09:14:57.375Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_fd9e7caba7ab1be301470ac5"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
          plan_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609030849-925NNG"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "a51e95514f2909177410f78a4057873140097edb"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "a51e95514f2909177410f78a4057873140097edb"
    version: 1
id_source: "generated"
---
## Summary

Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.

## Scope

- In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
- Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".

## Plan

Refined the branch_pr recovery plan to include the compatibility ratchet checker required to review the new internal CLI recovery command.

## Verify Steps

PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-03T09:14:54.444Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: agentplane doctor
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:033e09543ff0e1038058d9488275acb9169fea33a36278d8136bbfa0b3b7a007

Details:

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG declared verification

Command: agentplane doctor
Result: fail
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T11:29:57.796Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:33d3954a1429d61236351f21f9aa4d220b84f62330d99964ccefe63209a31c43

Details:

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

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
