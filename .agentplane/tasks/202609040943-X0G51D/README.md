---
id: "202609040943-X0G51D"
title: "Preserve completed WorkItems across command-only material plan refinements"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "lifecycle-recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T10:04:58.330Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:2f370e55a06f75e0edfaf7db08ce499f742b8d76d2fc64e88cfc4eb37a88608e"
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
    - "effect_ci"
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
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Network read, task-branch publication, integration, and branch cleanup are AgentPlane-owned delivery effects; release and publication effects are excluded."
      - "The defect is in central task-plan rematerialization and must be isolated in branch_pr mode with hosted validation."
      - "The writable roots cover only the existing task-centric reconciler, PLANNER-result application, and nearest F31YXS regression tests."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-centric"
        evidence_requirements:
          - "external_effect:destructive_git"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "destructive_git"
          - "external_write"
          - "network_read"
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:e8b5d71221153e8a7157e35cfb2db00be3ad0667093898158a8f73e7ee16858c"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-centric"
        - "effect_ci"
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
      - "repository_effect:ci"
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
    at: "2026-09-04T10:05:07.704Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-04T10:05:07.704Z"
doc_updated_by: "CODER"
description: "Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope."
sections:
  Summary: |-
    Preserve completed WorkItems across command-only material plan refinements

    Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.
  Scope: |-
    - In scope: Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.
    - Out of scope: unrelated refactors not required for "Preserve completed WorkItems across command-only material plan refinements".
  Plan: "Prepared a minimal two-WorkItem branch_pr plan. It makes replacement-plan runtime reconciliation ignore revision-bound evidence fingerprints while comparing every semantic WorkItem field, preserves compatible completed runtime atomically, and proves the F31YXS command-only replan sequence through focused domain, command, and CLI regressions plus the full required gates."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preserve completed WorkItems across command-only material plan refinements". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preserve completed WorkItems across command-only material plan refinements". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:2f370e55a06f75e0edfaf7db08ce499f742b8d76d2fc64e88cfc4eb37a88608e"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:8f9f30d367154fe1f3867a09acc0009a0aa4f5684d006a9612b51f89ee573e53"
    digest: "sha256:905f405009830ffcecb2ef76dd41d44017ec5329f67aa0dd69d3e207d833f9f8"
    grant_id: "7fd6e10d-95d1-417d-902d-191c4e5d1e76"
    issued_at: "2026-09-04T10:04:58.330Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:b2de90866c860755555199e2408575d9c60ae58c30e464101a58a49dda91c309"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5f8e2f526ef444a7cd606905e2353e8596a86e0a2440a0dc008e6a8d9de84fa4"
    status: "active"
    task_id: "202609040943-X0G51D"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-04T10:04:58.330Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:0515fc5b4f4eec4ab51d782c2861f79369cb47808eccf0196503a660f862080e"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-04T09:49:45.326Z"
      digest: "sha256:0515fc5b4f4eec4ab51d782c2861f79369cb47808eccf0196503a660f862080e"
      proposal:
        assumptions:
          - "The F31YXS failure is reproduced by a replacement plan with unchanged WorkItem identities and semantics except for one qualification command and the revision-bound evidence fingerprints."
          - "WorkItems execute strictly in dependency order with one active WorkItem at a time."
          - "Completed runtime includes state, revision, attempt, claim identity, output manifests, validation result, and failure metadata and must be preserved as one atomic value for compatible WorkItems."
          - "F31YXS and PX8PZT recovery resume only after this prerequisite task is integrated through AgentPlane."
          - "MPXQBK, broad projection cleanup, provider-neutral GitLab scope, dependency changes, CLI compatibility, and release/version/publication work remain excluded."
        planning_baseline:
          captured_at: "2026-09-04T09:43:42.324Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:d673562ad938d0010be5fee2e7e3bb64c078a38b757cafb1ee33718feb010647"
          dirty_paths:
            - ".agentplane/tasks/202609040943-X0G51D/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609040943-X0G51D"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts --maxWorkers=1"
              id: "core-reconciliation-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts --maxWorkers=1"
              id: "planning-authority-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
              id: "f31yxs-cli-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun x prettier --check packages/core/src/tasks/task-centric packages/agentplane/src/commands/task/external-agent-planning-authority.ts packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              id: "format-touched"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
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
              id: "routing"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
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
              id: "full-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "core-reconciliation-focused"
                - "planning-authority-focused"
                - "f31yxs-cli-focused"
                - "format-touched"
                - "lint-core"
                - "typecheck"
                - "routing"
                - "diff-check"
                - "full-regression"
              description: "A command-only material plan refinement preserves every compatible completed WorkItem runtime and dependency output, reopens only the WorkItem whose verification semantics changed, rejects incompatible contract changes, and continues at qualification or verification without a fake source diff; focused tests, formatting, lint, typecheck, routing, diff checks, and full local CI all pass."
              id: "command-only-replan-preserves-compatible-runtime"
              required: true
          evidence_fingerprint: "sha256:d673562ad938d0010be5fee2e7e3bb64c078a38b757cafb1ee33718feb010647"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "core-reconciliation-focused"
                  description: "Domain regressions prove that baseline-only evidence fingerprint changes preserve COMPLETED state, attempts, output manifests, validation evidence, and dependency satisfaction; a verification-command change reopens only its owning WorkItem; and every enumerated incompatible semantic change resets the affected runtime without mutating unrelated runtime."
                  id: "runtime-preservation-is-semantic-and-fail-closed"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "F31YXS replan and rematerialization evidence"
                symbol_hints:
                  - "reconcileReplacementPlanWorkItems"
                  - "materializeApprovedWorkItems"
                  - "freshWorkItemRuntime"
                  - "WorkItemRuntime"
              depends_on: []
              expected_outputs:
                - "compatible-workitem-runtime-projection"
              id: "compatible-workitem-reconciliation"
              objective: "Define fail-closed semantic compatibility for replacement-plan WorkItems and use it during rematerialization. Ignore only revision-bound validation evidence fingerprints; preserve the complete prior runtime for a compatible WorkItem, reset the runtime for any WorkItem whose identity, dependency, required input, expected output, scope, acceptance, validation command or criterion, context, risk, capability, resource claim, optionality, or priority changed, and recompute readiness from preserved outputs."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts --maxWorkers=1"
                    id: "core-reconciliation-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                criteria:
                  -
                    check_ids:
                      - "core-reconciliation-focused"
                    description: "Domain regressions prove that baseline-only evidence fingerprint changes preserve COMPLETED state, attempts, output manifests, validation evidence, and dependency satisfaction; a verification-command change reopens only its owning WorkItem; and every enumerated incompatible semantic change resets the affected runtime without mutating unrelated runtime."
                    id: "runtime-preservation-is-semantic-and-fail-closed"
                    required: true
                evidence_fingerprint: "sha256:d673562ad938d0010be5fee2e7e3bb64c078a38b757cafb1ee33718feb010647"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "planning-authority-focused"
                    - "f31yxs-cli-focused"
                  description: "Command and CLI regressions reproduce the approved F31YXS sequence and prove that reapproval does not reissue completed implementation, all preserved manifests satisfy downstream dependencies, the changed qualification WorkItem is schedulable, unchanged HEAD is accepted, and incompatible plan changes remain fail-closed."
                  id: "f31yxs-sequence-continues-at-qualification"
                  required: true
                -
                  check_ids:
                    - "format-touched"
                    - "lint-core"
                    - "typecheck"
                    - "routing"
                    - "diff-check"
                    - "full-regression"
                  description: "Touched files are formatted and the repository lint, typecheck, routing, diff, and complete local CI gates pass."
                  id: "repository-qualification-passes"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "F31YXS supervisor packet and reapproval sequence"
                symbol_hints:
                  - "applyExternalPlanningResult"
                  - "reconcileReplacementPlanWorkItems"
                  - "materializeApprovedWorkItems"
                  - "run-cli.core.task-advance.evidence-rework"
              depends_on:
                - "compatible-workitem-reconciliation"
              expected_outputs:
                - "verified-f31yxs-command-only-replan-continuation"
              id: "f31yxs-command-only-replan-regression"
              objective: "Exercise replacement-plan application through the existing PLANNER-result path and add the exact F31YXS regression: completed implementation at unchanged HEAD, refinement from task-specific task lint to repository-wide task lint, reapproval, preserved upstream outputs and attempts, and continuation at the changed qualification or task-verification boundary without demanding a synthetic source diff. Run the complete qualification gates without weakening verification."
              optional: false
              priority: 1
              required_inputs:
                - "compatible-workitem-runtime-projection"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts --maxWorkers=1"
                    id: "planning-authority-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
                    id: "f31yxs-cli-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun x prettier --check packages/core/src/tasks/task-centric packages/agentplane/src/commands/task/external-agent-planning-authority.ts packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    id: "format-touched"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
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
                    id: "routing"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
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
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "planning-authority-focused"
                      - "f31yxs-cli-focused"
                    description: "Command and CLI regressions reproduce the approved F31YXS sequence and prove that reapproval does not reissue completed implementation, all preserved manifests satisfy downstream dependencies, the changed qualification WorkItem is schedulable, unchanged HEAD is accepted, and incompatible plan changes remain fail-closed."
                    id: "f31yxs-sequence-continues-at-qualification"
                    required: true
                  -
                    check_ids:
                      - "format-touched"
                      - "lint-core"
                      - "typecheck"
                      - "routing"
                      - "diff-check"
                      - "full-regression"
                    description: "Touched files are formatted and the repository lint, typecheck, routing, diff, and complete local CI gates pass."
                    id: "repository-qualification-passes"
                    required: true
                evidence_fingerprint: "sha256:d673562ad938d0010be5fee2e7e3bb64c078a38b757cafb1ee33718feb010647"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609040943-X0G51D"
    event_cursor: 1
    final_validation: null
    id: "202609040943-X0G51D"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-04T09:43:37.165Z"
      constraints: []
      request: |-
        Preserve completed WorkItems across command-only material plan refinements

        Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.
      task_id: "202609040943-X0G51D"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 4
    schema_version: 1
    updated_at: "2026-09-04T10:05:07.704Z"
    work_items:
      compatible-workitem-reconciliation:
        attempt: 0
        claim_id: null
        id: "compatible-workitem-reconciliation"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      f31yxs-command-only-replan-regression:
        attempt: 0
        claim_id: null
        id: "f31yxs-command-only-replan-regression"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:e2f7e4154f1e7f9de99fc6522480c44c309fa6f4f44489f34d7d222874a6d7a0:
        aggregate_digest: "sha256:0577004e4f823495082e6146e674aaef69730b802b82ba57b0fa31a6b3d8a147"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T10:05:07.704Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3b15843075c6867da76d00ee"
          mutation_id: "compatibility:sha256:e2f7e4154f1e7f9de99fc6522480c44c309fa6f4f44489f34d7d222874a6d7a0"
          plan_digest: "sha256:0515fc5b4f4eec4ab51d782c2861f79369cb47808eccf0196503a660f862080e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609040943-X0G51D"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e2f7e4154f1e7f9de99fc6522480c44c309fa6f4f44489f34d7d222874a6d7a0"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609040943-X0G51D"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
    version: 1
id_source: "generated"
---
## Summary

Preserve completed WorkItems across command-only material plan refinements

Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.

## Scope

- In scope: Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.
- Out of scope: unrelated refactors not required for "Preserve completed WorkItems across command-only material plan refinements".

## Plan

Prepared a minimal two-WorkItem branch_pr plan. It makes replacement-plan runtime reconciliation ignore revision-bound evidence fingerprints while comparing every semantic WorkItem field, preserves compatible completed runtime atomically, and proves the F31YXS command-only replan sequence through focused domain, command, and CLI regressions plus the full required gates.

## Verify Steps

PLANNER fallback scaffold for "Preserve completed WorkItems across command-only material plan refinements". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preserve completed WorkItems across command-only material plan refinements". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
