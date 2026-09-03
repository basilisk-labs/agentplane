---
id: "202609031717-PX8PZT"
title: "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "salvage"
  - "lifecycle"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --maxWorkers=1"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T17:25:57.943Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:f363bb4ac1ac0302dc6d1ec6e430b88599c582db408e8780ea49f15c7b4b293b"
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
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "scripts/workflow"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "External writes and task-branch cleanup are limited to AgentPlane-owned branch_pr delivery; release metadata, versioning, package publication, and unrelated provider work remain excluded."
      - "The four behaviors alter central task handoff, branch publication, direct verification, and worktree preparation paths, so isolated branch_pr execution and hosted integration are required."
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
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "scripts/workflow"
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
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "scripts/workflow"
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
      digest: "sha256:6ea95960613a25aadb15970c83abff5856b2868ceea3311e03dff2c1dece999d"
      escalation_reasons:
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
    at: "2026-09-03T17:26:07.810Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-03T17:26:07.810Z"
doc_updated_by: "CODER"
description: "Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full."
sections:
  Summary: |-
    Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches

    Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.
  Scope: |-
    - In scope: Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.
    - Out of scope: unrelated refactors not required for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches".
  Plan: "Prepared one bounded branch_pr plan with five strictly sequential WorkItems: four minimal current-architecture ports for missing Clean Core lifecycle contracts, followed by integrated qualification. The execution declaration, WorkItem scopes, and write claims use the same closed set of repository roots."
  Verify Steps: |-
    PLANNER fallback scaffold for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    approval_evidence_digest: "sha256:f363bb4ac1ac0302dc6d1ec6e430b88599c582db408e8780ea49f15c7b4b293b"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:8f9f30d367154fe1f3867a09acc0009a0aa4f5684d006a9612b51f89ee573e53"
    digest: "sha256:ca3e0ef511f97af56b917248fe26e5d75e0281510562c159a99ad758068ec346"
    grant_id: "869d36a4-3c36-4440-956f-c7461acfcba2"
    issued_at: "2026-09-03T17:25:57.943Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a63793390fe0b52e982b018453cd547d327919c0d1677a0cc85052e0cc36f955"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5f8e2f526ef444a7cd606905e2353e8596a86e0a2440a0dc008e6a8d9de84fa4"
    status: "active"
    task_id: "202609031717-PX8PZT"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T17:25:57.943Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:5e65578b8dfe4f0a9b1eaf327c18db0b345448fdc7b95fa0fdd7213fd4e4bfdc"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T17:23:53.492Z"
      digest: "sha256:5e65578b8dfe4f0a9b1eaf327c18db0b345448fdc7b95fa0fdd7213fd4e4bfdc"
      proposal:
        assumptions:
          - "Tasks 202609030849-925NNG and 202609021331-5FPZAB are terminal and their required changes are present on main at 65625c1a19230dd1ca73e87f31a1b975c5363b54."
          - "The four source branches are evidence only; implementation will be adapted to current main and no stale branch will be merged or cherry-picked as a unit."
          - "WorkItems execute strictly in dependency order with only one active WorkItem at a time."
          - "MPXQBK, full T4RR70/GitLab scope, 9RCWZQ release behavior, versions, release notes, tags, package publication, and dependency upgrades remain excluded."
        planning_baseline:
          captured_at: "2026-09-03T17:17:43.942Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
          dirty_paths:
            - ".agentplane/tasks/202609031717-PX8PZT/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609031717-PX8PZT"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --maxWorkers=1"
              id: "salvage-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun x prettier --check packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/branch/work-start.materialize.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/pr/flow-status.ts packages/agentplane/src/commands/shared/task-handoff-reader.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/task/direct-task-verification.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/handoff.shared.ts scripts/workflow/bootstrap-framework-dev.mjs"
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
              command: "bun run ci:local:full"
              id: "full-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "salvage-focused"
                - "format-touched"
                - "lint-core"
                - "typecheck"
                - "routing"
                - "full-regression"
              description: "All four minimal lifecycle contracts are implemented with fail-closed regressions, existing exact-head and protected-base validation remains passing, the touched files are formatted, lint/typecheck/routing pass, and the complete local CI gate passes without importing excluded release or provider scope."
              id: "clean-core-salvage-complete"
              required: true
          evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "protected-handoff-focused"
                  description: "Repeated show, resume-context, and PR flow reads from task and base checkouts resolve the same valid protected handoff without changing refs or artifact bytes; malformed, foreign, ambiguously duplicated, or wrong-owner handoffs fail closed."
                  id: "protected-handoff-owner-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 112000
                optional_sources:
                  - "DVS5NN branch diff"
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "readTaskHandoffLatest"
                  - "findWorktreeForBranch"
                  - "buildTaskResumeContext"
                  - "resolvePrFlowStatus"
              depends_on: []
              expected_outputs:
                - "protected-handoff-owner-resolution"
              id: "protected-handoff-owner-resolution"
              objective: "Adapt the DVS5NN protected integration handoff reader to current main so branch_pr consumers read the protected handoff from its owning base checkout without copying artifacts. Validate task identity, INTEGRATOR ownership, base identity, and conflicting protected copies while preserving direct and ordinary local handoffs."
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
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts --maxWorkers=1"
                    id: "protected-handoff-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "protected-handoff-focused"
                    description: "Repeated show, resume-context, and PR flow reads from task and base checkouts resolve the same valid protected handoff without changing refs or artifact bytes; malformed, foreign, ambiguously duplicated, or wrong-owner handoffs fail closed."
                    id: "protected-handoff-owner-acceptance"
                    required: true
                evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "branch-publication-focused"
                  description: "Task-artifact-only no-PR divergence can publish the exact local head with an observed force-with-lease, while source edits, foreign task artifacts, PR presence or ambiguity, remote mismatch, invalid heads, and concurrent remote movement fail without overwriting provider state."
                  id: "guarded-publication-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 104000
                optional_sources:
                  - "HBSZ4F branch diff"
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "pushTaskBranchUpstreamIfConfigured"
                  - "isTaskLocalOnlyAdvance"
                  - "observeExistingChangeRequestByBranch"
                  - "resolvePublicationHeads"
              depends_on:
                - "protected-handoff-owner-resolution"
              expected_outputs:
                - "guarded-task-only-branch-publication"
              id: "guarded-task-only-branch-publication"
              objective: "Adapt the HBSZ4F no-PR publication recovery to current main. Permit a lease-protected replacement only when the local advance contains exclusively this Task's allowed artifacts, the upstream is origin for the exact branch, local and remote heads are valid and distinct, both remotes identify the same repository, and provider observation proves that no unique change request exists."
              optional: false
              priority: 1
              required_inputs:
                - "protected-handoff-owner-resolution"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
                -
                  kind: "path"
                  mode: "read"
                  resource: "packages/agentplane/src/commands/shared"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/pr/branch-publication.test.ts --maxWorkers=1"
                    id: "branch-publication-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "branch-publication-focused"
                    description: "Task-artifact-only no-PR divergence can publish the exact local head with an observed force-with-lease, while source edits, foreign task artifacts, PR presence or ambiguity, remote mismatch, invalid heads, and concurrent remote movement fail without overwriting provider state."
                    id: "guarded-publication-acceptance"
                    required: true
                evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "declared-sequence-focused"
                  description: "Valid literal && sequences run in order with one budget and accurate combined evidence; malformed segments and unsupported shell operators are rejected before execution, and failures or zero-test results prevent all later segments."
                  id: "declared-sequence-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources:
                  - "QWP8S8 branch diff"
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "parseDirectTaskCheck"
                  - "runDirectTaskVerification"
                  - "bunTestReportedZeroTests"
                  - "localRuntimeEvidence"
              depends_on:
                - "guarded-task-only-branch-publication"
              expected_outputs:
                - "safe-declared-check-sequence-execution"
              id: "safe-declared-check-sequence-execution"
              objective: "Adapt the QWP8S8 declared-check sequence support to the current direct verifier and its runtime evidence model. Parse only top-level whitespace-delimited literal &&, validate every segment before any process starts, execute each segment as structured argv in declaration order, share one timeout budget, and stop on first nonzero or zero-test result."
              optional: false
              priority: 2
              required_inputs:
                - "guarded-task-only-branch-publication"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=1"
                    id: "declared-sequence-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "declared-sequence-focused"
                    description: "Valid literal && sequences run in order with one budget and accurate combined evidence; malformed segments and unsupported shell operators are rejected before execution, and failures or zero-test results prevent all later segments."
                    id: "declared-sequence-acceptance"
                    required: true
                evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "worktree-dependency-focused"
                  description: "Complete repository-owned install layouts remain reusable, while missing direct dependencies, missing package manifests, foreign symlinks, and layouts resolving into any task worktree are rejected or rebuilt without adopting another task's dependencies."
                  id: "worktree-dependency-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 104000
                optional_sources:
                  - "9T9528 branch diff"
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "materializeRepoLocalInstallLayoutForWorktree"
                  - "linkDirectoryIntoWorktree"
                  - "hasWorkspaceNodeModules"
                  - "removeForeignInstallLayouts"
              depends_on:
                - "safe-declared-check-sequence-execution"
              expected_outputs:
                - "safe-worktree-dependency-preparation"
              id: "safe-worktree-dependency-preparation"
              objective: "Adapt the 9T9528 dependency-layout validation to current worktree materialization and framework bootstrap. Reuse node_modules only when the root manifest is readable, every declared direct dependency resolves outside task worktrees, and every dependency has its package manifest; otherwise decline the link or rebuild the local install layout."
              optional: false
              priority: 3
              required_inputs:
                - "safe-declared-check-sequence-execution"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/workflow"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "scripts/workflow"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --maxWorkers=1"
                    id: "worktree-dependency-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "worktree-dependency-focused"
                    description: "Complete repository-owned install layouts remain reusable, while missing direct dependencies, missing package manifests, foreign symlinks, and layouts resolving into any task worktree are rejected or rebuilt without adopting another task's dependencies."
                    id: "worktree-dependency-acceptance"
                    required: true
                evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "salvage-focused"
                    - "format-touched"
                    - "lint-core"
                    - "typecheck"
                    - "routing"
                    - "full-regression"
                  description: "All required deterministic checks pass at one implementation head, the diff contains only the four approved contracts and their tests, and no release, dependency, MPXQBK, or broad provider-neutral behavior is introduced."
                  id: "salvage-qualification-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "requireOpenGithubPrAtHead"
                  - "provider_base_sha"
                  - "runDirectTaskVerification"
                  - "materializeRepoLocalInstallLayoutForWorktree"
              depends_on:
                - "safe-worktree-dependency-preparation"
              expected_outputs:
                - "clean-core-salvage-qualification-evidence"
              id: "clean-core-salvage-qualification"
              objective: "Qualify the integrated four-contract change on the authoritative task checkout. Run the combined focused suite, touched-file formatting, lint, typecheck, routing, and full local CI; confirm existing exact-head and protected-base tests remain covered and record any residual risk without widening scope."
              optional: false
              priority: 4
              required_inputs:
                - "safe-worktree-dependency-preparation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
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
                  resource: "scripts/workflow"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "scripts/workflow"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --maxWorkers=1"
                    id: "salvage-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun x prettier --check packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/branch/work-start.materialize.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/pr/flow-status.ts packages/agentplane/src/commands/shared/task-handoff-reader.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/task/direct-task-verification.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/handoff.shared.ts scripts/workflow/bootstrap-framework-dev.mjs"
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
                    command: "bun run ci:local:full"
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "salvage-focused"
                      - "format-touched"
                      - "lint-core"
                      - "typecheck"
                      - "routing"
                      - "full-regression"
                    description: "All required deterministic checks pass at one implementation head, the diff contains only the four approved contracts and their tests, and no release, dependency, MPXQBK, or broad provider-neutral behavior is introduced."
                    id: "salvage-qualification-acceptance"
                    required: true
                evidence_fingerprint: "sha256:6a8d6c231ba00c51700e16040fa256005bfb58677ca6051aea73ac27dbbd60e7"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609031717-PX8PZT"
    event_cursor: 1
    final_validation: null
    id: "202609031717-PX8PZT"
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
          description: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --maxWorkers=1"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-03T17:17:40.191Z"
      constraints: []
      request: |-
        Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches

        Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.
      task_id: "202609031717-PX8PZT"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 4
    schema_version: 1
    updated_at: "2026-09-03T17:26:07.810Z"
    work_items:
      clean-core-salvage-qualification:
        attempt: 0
        claim_id: null
        id: "clean-core-salvage-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      guarded-task-only-branch-publication:
        attempt: 0
        claim_id: null
        id: "guarded-task-only-branch-publication"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      protected-handoff-owner-resolution:
        attempt: 0
        claim_id: null
        id: "protected-handoff-owner-resolution"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      safe-declared-check-sequence-execution:
        attempt: 0
        claim_id: null
        id: "safe-declared-check-sequence-execution"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      safe-worktree-dependency-preparation:
        attempt: 0
        claim_id: null
        id: "safe-worktree-dependency-preparation"
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
      compatibility:sha256:b683699e59a42f657fb67dc0ec611e6fa63fa2a5a96d05f4a7bbc82f7fa17b2e:
        aggregate_digest: "sha256:b360b2430597c20f5813ae01fad306254d063d75f74c903bae5571737eb62f0c"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T17:26:07.810Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_71d36cdb64fcfa2c68d25105"
          mutation_id: "compatibility:sha256:b683699e59a42f657fb67dc0ec611e6fa63fa2a5a96d05f4a7bbc82f7fa17b2e"
          plan_digest: "sha256:5e65578b8dfe4f0a9b1eaf327c18db0b345448fdc7b95fa0fdd7213fd4e4bfdc"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031717-PX8PZT"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b683699e59a42f657fb67dc0ec611e6fa63fa2a5a96d05f4a7bbc82f7fa17b2e"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609031717-PX8PZT"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    version: 1
id_source: "generated"
---
## Summary

Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches

Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.

## Scope

- In scope: Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.
- Out of scope: unrelated refactors not required for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches".

## Plan

Prepared one bounded branch_pr plan with five strictly sequential WorkItems: four minimal current-architecture ports for missing Clean Core lifecycle contracts, followed by integrated qualification. The execution declaration, WorkItem scopes, and write claims use the same closed set of repository roots.

## Verify Steps

PLANNER fallback scaffold for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
