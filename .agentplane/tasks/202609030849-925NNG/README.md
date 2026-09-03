---
id: "202609030849-925NNG"
title: "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-09-03T08:57:27.879Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:6586820677574c61894d815f17657e01fd9f0a35fb44b34a9816b7fdbc0f4606"
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
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The defect spans the task plan command, canonical task-centric adapter, route emission, doctor diagnostics, CLI command registration, focused tests, and CLI reference documentation."
      - "branch_pr is required because the repair changes central lifecycle persistence and must receive independent evaluation and hosted integration before use on the historical task."
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
      digest: "sha256:b412b88c74c2d0f5137d6dc8d2e0a55a36336b2a1e07ea0aa311d417b58ca2ab"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
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
events:
  -
    type: "status"
    at: "2026-09-03T08:57:33.804Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-03T08:57:33.804Z"
doc_updated_by: "CODER"
description: "Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB."
sections:
  Summary: |-
    Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

    Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
  Scope: |-
    - In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
    - Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".
  Plan: "Plan a bounded branch_pr repair that makes task-centric plan rejection atomic and fail-closed, adds deterministic diagnostics and receipt-backed CLI recovery, qualifies the change, and leaves recovery of 202609021331-5FPZAB to the new operation after integration."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:6586820677574c61894d815f17657e01fd9f0a35fb44b34a9816b7fdbc0f4606"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e2948d9d384b38b3f5e77112cf7ab5b5144ff9c778c1bde311f0402d7c728526"
    digest: "sha256:298e5bb7fa10aab1e4730e5431ba1b57d1fbf396a58c97b93f7c50fce4046195"
    grant_id: "83842038-c61d-4eab-b09e-9d6363c612f7"
    issued_at: "2026-09-03T08:57:27.879Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c865b0d6d2151e3892143b1fb9e7a90d750e8053c7e0a26446d7623597a98819"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f4fbd7586006095d0e046d670c8df7a6ea758e42387969ea67c87d3a14759130"
    status: "active"
    task_id: "202609030849-925NNG"
  agentplane.task_centric:
    current_plan:
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
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-09-03T08:57:27.879Z"
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
  task_execution_context:
    base_ref: "main"
    base_sha: "a51e95514f2909177410f78a4057873140097edb"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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

Plan a bounded branch_pr repair that makes task-centric plan rejection atomic and fail-closed, adds deterministic diagnostics and receipt-backed CLI recovery, qualifies the change, and leaves recovery of 202609021331-5FPZAB to the new operation after integration.

## Verify Steps

PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
