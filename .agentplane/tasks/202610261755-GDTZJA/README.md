---
id: "202610261755-GDTZJA"
title: "Authorize prospective scope for completed canonical task rework"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "kernel"
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/runner/usecases/kernel-authority.test.ts --pool=forks --maxWorkers 1"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T00:32:41.371Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-27T01:11:01.162Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-27T00:32:13.864Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "ff11bd02ed1fe73c238c917cdd884d081b7711d6"
  review_identity_digest: "sha256:a66b173c898b785ee223a245e403f366c8dbb480d411ead1222b211ceb4c84c6"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610261755-GDTZJA/2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484/quality-report.json"
  findings:
    - "Commit ff11bd02ed1fe73c238c917cdd884d081b7711d6 adds a distinct authenticated USER pre-effect grant for COMPLETED branch-PR rework, binds the exact blocker/request, repository, plan, policy and authority lineage, and rejects changed paths or replay."
    - "The kernel returns COMPLETED to PLANNING, rejects the superseded plan, requires a new required WorkItem, and leaves ACTIVE/BLOCKED prospective and post-effect authority-delta routes separate."
    - "Focused integration and kernel regressions cover success, stale digest, changed files, replay, USER attribution and route separation; AgentPlane independently recorded both required checks passed, including full local CI."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks/task-kernel"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks/task-kernel"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-blocker-boundary.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-rework-scope-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.ts"
      - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
      - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-authority.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
      - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
      - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
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
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner/usecases"
          - "packages/core/src/tasks/task-kernel"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:127a5199eb8921fd181a6facda4e79cbb5a2d501390a1ea34ccdc59f6f46737a"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_path:packages/core/src/tasks/task-kernel/authority-lineage.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel-authority.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
        - "central_path:packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/prospective-scope.ts"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-blocker-boundary.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-rework-scope-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.ts"
          - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
          - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
          - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/kernel-authority.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
          - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
          - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "ff11bd02ed1fe73c238c917cdd884d081b7711d6"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-27T01:11:01.162Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-27T01:11:02.392Z"
doc_updated_by: "SUPERVISOR"
description: "When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass."
sections:
  Summary: |-
    Authorize prospective scope for completed canonical task rework

    When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass.
  Scope: |-
    - In scope: When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass.
    - Out of scope: unrelated refactors not required for "Authorize prospective scope for completed canonical task rework".
  Plan: "1. Execute approved WorkItem completed-rework-prospective-scope."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/runner/usecases/kernel-authority.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-27T01:11:01.162Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2a25af24990efff1693c75cf75904e8f8b119bb575d9d7ce72856505758d2cc8, input_digest=sha256:e8b99b73b2211fa105a27114d31b89d8948996335211df8c5ca3c795fa9679c9

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check full_regression

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610261755-GDTZJA Verification Contract check task_outcome (2/2)

    NativeTaskIdentityRef:
    - plan_digest: sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b
    - policy_digest: sha256:feb24a8e320ce0423015830ce3c494a6612f1ba022b9c4cc1f35d24a47ac94d9
    - capability_digest: sha256:2da985001bffb5ce18f1bd8a372cd34ca6c17aa23d539fb99bc30d1629fbf091
    - checks_digest: sha256:f00c032f2dd4e253830fda48bcb3f808d632aed4a5f7bf4fc59119d5432fc5d6
    - identity_digest: sha256:e3c877d96a0849b83080bd3c479c1955c2e363f2c4442f7906ba215a71976f1a

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610261755-GDTZJA
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
  agentplane.kernel_operational_projection:
    digest: "sha256:fbc586bf5289e2f1a36b21140a06531249cdc5fe9d8e53a20fac30259ac59409"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610261755-GDTZJA/2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484/quality-report.json"
    findings:
      - "Commit ff11bd02ed1fe73c238c917cdd884d081b7711d6 adds a distinct authenticated USER pre-effect grant for COMPLETED branch-PR rework, binds the exact blocker/request, repository, plan, policy and authority lineage, and rejects changed paths or replay."
      - "The kernel returns COMPLETED to PLANNING, rejects the superseded plan, requires a new required WorkItem, and leaves ACTIVE/BLOCKED prospective and post-effect authority-delta routes separate."
      - "Focused integration and kernel regressions cover success, stale digest, changed files, replay, USER attribution and route separation; AgentPlane independently recorded both required checks passed, including full local CI."
    implementation_commit: "ff11bd02ed1fe73c238c917cdd884d081b7711d6"
    implementation_tree: "92a83a570e1494f182979cd1c6e5dcbb4ca2b581"
    projected_at: "2026-10-27T00:32:13.864Z"
    review_identity_digest: "sha256:a66b173c898b785ee223a245e403f366c8dbb480d411ead1222b211ceb4c84c6"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb"
    work_order_id: "sha256:3a84c28d5c350829400fee5804c1dc254ee30c178f5deb2e86f9d69186d28c6f"
  task_execution_context:
    base_ref: "main"
    base_sha: "8727d85da7df97573e3d95842654ac57ce25766b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7690202dc79627503c75c99e756b3d474a5257851dfda75b1ad45ab1a4d41600"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b959f6b8f4a1d537ccb65eb523b1458d7ad18766625ff6f3422a53f033d884ad"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610261755-GDTZJA"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:23594be1252c37af42325491d8ec34f7e7ce33fdc1d176ca60a9d7b13a14c4cb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b959f6b8f4a1d537ccb65eb523b1458d7ad18766625ff6f3422a53f033d884ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:7690202dc79627503c75c99e756b3d474a5257851dfda75b1ad45ab1a4d41600"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610261755-GDTZJA"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-blocker-boundary.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-rework-scope-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/scope-extend.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
            evidence_digest: "sha256:68035e7e424ba7f45f0b128d7670ecc42811f4d4e1fefa1e81cae857892ce455"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:588df6b462a8f327f90f5786768af5b7a297855ae8844736f717a4f7b134a151"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b959f6b8f4a1d537ccb65eb523b1458d7ad18766625ff6f3422a53f033d884ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:23594be1252c37af42325491d8ec34f7e7ce33fdc1d176ca60a9d7b13a14c4cb"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610261755-GDTZJA"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-rework-scope.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel-authority.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
            evidence_digest: "sha256:9b5923e5eb32e4f4dd646585a7f15ae9587fb556822d4b5cb0931cac7f8b8dbd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:b959f6b8f4a1d537ccb65eb523b1458d7ad18766625ff6f3422a53f033d884ad"
        digest: "sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:99818a5c08428aef75f3f0fe6f2b8b7f11652627531a2cb973dff20debe49359"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
                - "schema"
                - "public_api"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "prospective-completed-rework-grant"
              - "focused-regression-evidence"
              - "full-ci-evidence"
            id: "completed-rework-prospective-scope"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:0c37f0b48ee8a0758a13c410b3d270018eef17abb89d6d52232cfe52fee18e95"
          environment_digest: "sha256:18f6ab25ab91daa217dc1f7049588e04cdaa96053510cd63c881b9e493aece69"
          implementation_identity: "sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
          toolchain_digest: "sha256:c515df88305b99a5dde5c76670cea8148aaf7d789c47ff26c3ddc337a1fda4c8"
        observed_at: "2026-10-27T00:32:46.553Z"
        status: "PASSED"
      id: "202610261755-GDTZJA"
      intent_digest: "sha256:dabaa2dbfbac3df1aa3180bca51eccf03f6271593a95d9afd9f2e364751d9f0e"
      migration_receipts: []
      mutation_receipts:
        capture:202610261755-GDTZJA:
          after_revision: 1
          aggregate_digest: "sha256:024d5b5570a4800a0a9c9b125206859a0a8d159fec15ec8e4be42766c96df056"
          before_revision: 0
          command_digest: "sha256:c8c3b3530fec5e460462499c940829b2f9d0a5771df17e67b401d8dc02481aae"
          effect_ids: []
          event_digests:
            - "sha256:aaa0932a77168070abd4ba7cd9a45dfe3da5ecebbc14e490f8b26a2a039cef22"
          mutation_id: "capture:202610261755-GDTZJA"
        final-validation:sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb:16:
          after_revision: 17
          aggregate_digest: "sha256:4fb830626a59cdcefb2c3d501a735122c975ee36915bb083fd59b65f46a21cf4"
          before_revision: 16
          command_digest: "sha256:810b949748a4525c9492ef4364d2846cccc116c21d64d24af14734e6addd5fd3"
          effect_ids: []
          event_digests:
            - "sha256:10c95476ce265e5b03e37768d2d3ba51a0ee32018435bf8ff4c600b190c2bc72"
          mutation_id: "final-validation:sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb:16"
        kernel_task_completion_required:sha256:db6e47b8b8a2a707aee742ec2b7402d852da11e528b1ac19d518d7302a742c18:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe:
          after_revision: 18
          aggregate_digest: "sha256:deb0c15df4c3f251179144ee338a9f9ea6893e6d1059b4de97f735a6d40ac0f8"
          before_revision: 17
          command_digest: "sha256:6c0dbdf7855961a696c00cc3822f9c638da50d9a6c03b2c49edac2840d36bf32"
          effect_ids: []
          event_digests:
            - "sha256:071e4c33d458254138d956d6d50b03ff740d157b5d22d426d43c2edb19434b68"
          mutation_id: "kernel_task_completion_required:sha256:db6e47b8b8a2a707aee742ec2b7402d852da11e528b1ac19d518d7302a742c18:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
        kernel_work_item_claim_required:sha256:5c9da948112567bbd33575eb5e6a870e5cd3ac0263148d383f82ce884dee808d:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133:
          after_revision: 10
          aggregate_digest: "sha256:ccac1ffe77815dc23312279118c019797bbecd8b61fa875de1df00f64f11f38e"
          before_revision: 9
          command_digest: "sha256:39185e82a8525dc1ffe8fdd305378bb72b3ebe768ebb0fa7b597cb633311ea33"
          effect_ids: []
          event_digests:
            - "sha256:dcfa0ad1adc1dd6f7d0837bc7c73921bafdfecc671801921b9ed410491dc12d1"
          mutation_id: "kernel_work_item_claim_required:sha256:5c9da948112567bbd33575eb5e6a870e5cd3ac0263148d383f82ce884dee808d:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
        kernel_work_item_claim_required:sha256:82a8615c5a2a113d2cdfd0ae2906fde90d8d54f6ba4a955876f2763d769c498b:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 5
          aggregate_digest: "sha256:114ab9a9ab5d7c2e51ea1cd5afb24da9363c2a6a146c9a113f498289a1baa054"
          before_revision: 4
          command_digest: "sha256:01db7db71f33ac64a7e6e10539e487fb9e4ca13f38da0c0382e0a5f14c1fb83a"
          effect_ids: []
          event_digests:
            - "sha256:b0d2a3546be415b20efaa9af3140aba22d4de458b38bf2f5e556cd3c21e67ced"
          mutation_id: "kernel_work_item_claim_required:sha256:82a8615c5a2a113d2cdfd0ae2906fde90d8d54f6ba4a955876f2763d769c498b:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        kernel_work_item_execution_required:sha256:0c433333e4efcdc85a2dfe2cb7e1ea6906563d435248d460924d1d10691dd080:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 6
          aggregate_digest: "sha256:8eaeae2b5a3672dcedf083c5a2f961a4923d8f14bb8ae09beb0b0631f6decb95"
          before_revision: 5
          command_digest: "sha256:c602e1ddd7264cdbd97664197def3b0099675aa1056cdfbf569e3b401515ffc6"
          effect_ids: []
          event_digests:
            - "sha256:cb87f7077224ee1f382198e1fc026c897b93df9d8d2f87a2d2637e187c989a05"
          mutation_id: "kernel_work_item_execution_required:sha256:0c433333e4efcdc85a2dfe2cb7e1ea6906563d435248d460924d1d10691dd080:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        kernel_work_item_execution_required:sha256:31991bc4529204f3fa286e526be55de1246c2fde6c11d19c5b9a19b7f6600129:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133:
          after_revision: 11
          aggregate_digest: "sha256:f619d86ad83b791b5a965d6bf2885fdab4c9c7e56069eb53ffb71444a889dee1"
          before_revision: 10
          command_digest: "sha256:85703b3008cde8f195bc30ea2921b60110ef93e21a1e91a877c6ca9a5665ee29"
          effect_ids: []
          event_digests:
            - "sha256:07fbfc953214acdd94a46b5399650773a709e1df48a3ac05bd465b7971eb9765"
          mutation_id: "kernel_work_item_execution_required:sha256:31991bc4529204f3fa286e526be55de1246c2fde6c11d19c5b9a19b7f6600129:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
        kernel_work_item_inspection_required:sha256:fbe8f8475104bd04a35dd5871303c5ca4f996869ca61491b815606a783584126:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe:
          after_revision: 14
          aggregate_digest: "sha256:c957234051ad7ccfd7f21adaf3099d81da651a8a1ab0479a81af3c5dfdd4668f"
          before_revision: 13
          command_digest: "sha256:87d4d4ce50fdc357a6f296cacdc6ad6509bd2662b061d726fc5300aac52bb3c0"
          effect_ids: []
          event_digests:
            - "sha256:6a1386732367cc1e1eba593bc242ea5aee9140c25209e5197c81022fc3471a74"
          mutation_id: "kernel_work_item_inspection_required:sha256:fbe8f8475104bd04a35dd5871303c5ca4f996869ca61491b815606a783584126:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
        kernel_work_item_materialization_required:sha256:6a934978e20fb917084c6720a43d5ea0987ecc35e82f824ccfc566db15a50b40:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 4
          aggregate_digest: "sha256:a935aee029d6d82818680deff4c87909b1bac12bd8d3b185c17f56341770bf19"
          before_revision: 3
          command_digest: "sha256:67ac6f5f93847774b8948e0d687aecd67bc68258223de87980b9c050d1939c7a"
          effect_ids: []
          event_digests:
            - "sha256:231b2fec09609f69d58bdce5949aa9f61dc013b3618b211b2da6a1d7082869ae"
          mutation_id: "kernel_work_item_materialization_required:sha256:6a934978e20fb917084c6720a43d5ea0987ecc35e82f824ccfc566db15a50b40:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        result:sha256:098ffab31384ac37e34dc65d7d273ba09b1390d779a593b6717ca0b82267bad1:
          after_revision: 2
          aggregate_digest: "sha256:2e04a8b08b65926d6197cb482b62b2c2ab4bd91c45395403a2a52d2205fcea3d"
          before_revision: 1
          command_digest: "sha256:04bf21a6bf5d2e46af44e755a5b484188ef60c8f2d8de687e8ce615302acb8df"
          effect_ids: []
          event_digests:
            - "sha256:677495dbf88eac17bca88b406a4a7c5398ea7964bb17edf41d08147171bfeb5c"
          mutation_id: "result:sha256:098ffab31384ac37e34dc65d7d273ba09b1390d779a593b6717ca0b82267bad1"
        result:sha256:3a84c28d5c350829400fee5804c1dc254ee30c178f5deb2e86f9d69186d28c6f:
          after_revision: 13
          aggregate_digest: "sha256:ba2620fd787244bf6e4725d94474d0ad27f7aec086659873ac1566e215da9d62"
          before_revision: 12
          command_digest: "sha256:6ad3e9bb0bef0f0fc20680449f8610b110d6696e97a15e14edad3c9b48169dc4"
          effect_ids: []
          event_digests:
            - "sha256:6fdf4a29fdeb121779ab32c5ae1fc0de396e75842634390be39395490d776288"
          mutation_id: "result:sha256:3a84c28d5c350829400fee5804c1dc254ee30c178f5deb2e86f9d69186d28c6f"
        semantic-stop:sha256:69dd6c732b943ba70da77538f09f21d0347de42a9feff56ec950cf27bc1d8f03:
          after_revision: 8
          aggregate_digest: "sha256:d30e40cd9116ee0b36aaf49cc0147e4a79a8c1db2f10725c95d7de2789d73ad7"
          before_revision: 7
          command_digest: "sha256:54954230d3be7f6d18537217cbb8074db41b245893c1dadeacd62c4f85160b79"
          effect_ids: []
          event_digests:
            - "sha256:4a2e76865f060c57569dea5748657672318a10b534660072f7d7b35a500afb19"
          mutation_id: "semantic-stop:sha256:69dd6c732b943ba70da77538f09f21d0347de42a9feff56ec950cf27bc1d8f03"
        sha256:66d94917c989ec77b82938f65217ab72e206803b18dae3f78dd9198510fc3c5a:
          after_revision: 3
          aggregate_digest: "sha256:c22c7ec278767f3ebe0e00962f0fcbe698865511324c120b748c1f75afe5401e"
          before_revision: 2
          command_digest: "sha256:b7b5c3ade3b9d879fa2010bed9837125bbfb4d71ac3e33591cab693fd4f4ff20"
          effect_ids: []
          event_digests:
            - "sha256:58e1c1de5398093eaf60dee9c0219f0109f8fa886a7d7adf063a95630fd2da83"
          mutation_id: "sha256:66d94917c989ec77b82938f65217ab72e206803b18dae3f78dd9198510fc3c5a"
        sha256:82a22d87357ca2eb85d65a3e916b68635d14c3b207ec7f2cf658d0555f6f9925:
          after_revision: 7
          aggregate_digest: "sha256:290ad45dfc257520645cc0b61d8789f4196c53550bd8f029e36cc73cd74b3e7d"
          before_revision: 6
          command_digest: "sha256:826abf317258cf28e5855472d912a7144f739e5ad791370e3c125f7eef747349"
          effect_ids: []
          event_digests:
            - "sha256:49a302a077d652bdfe33ac25301ce3127593b9a0c12b4f7b7c8ff7cb558f922f"
          mutation_id: "sha256:82a22d87357ca2eb85d65a3e916b68635d14c3b207ec7f2cf658d0555f6f9925"
        sha256:d96d33f68e5b29eb45b739527e4b9799d613c925d12b90590192b6df00afb7bd:
          after_revision: 12
          aggregate_digest: "sha256:bbd534c97a6eb99adc502a7f0e0c6e8ecca50ecb42519a406513e21d46d896f2"
          before_revision: 11
          command_digest: "sha256:a1bac038b94a3f5950466ccfd6d904fbbc251bfbabd8dd8e4eb07792033c0f6d"
          effect_ids: []
          event_digests:
            - "sha256:73646b983c8ebe90bdb14e945df464ca9209753e0e2fe989ddbd333ac91f7a8d"
          mutation_id: "sha256:d96d33f68e5b29eb45b739527e4b9799d613c925d12b90590192b6df00afb7bd"
        validation-resolution:sha256:8ade8a7b1054916c9926cc4a8ba3896a4ab3519eb6f0b512d492fad668647254:
          after_revision: 16
          aggregate_digest: "sha256:efdbf157a622a9e6de01a35975f454de6c69b530a9109be1103c85e30949da2b"
          before_revision: 15
          command_digest: "sha256:5bc5eb257782b7af5081af5199e6923298a9ced047f31f0e9d9710d259215df8"
          effect_ids: []
          event_digests:
            - "sha256:6a91155a4297ef37da268c4c1d938c06501985f669659958dcf514cc0a68e5c0"
          mutation_id: "validation-resolution:sha256:8ade8a7b1054916c9926cc4a8ba3896a4ab3519eb6f0b512d492fad668647254"
        validation:sha256:2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484:
          after_revision: 15
          aggregate_digest: "sha256:de9f7a637694977cfb9a07dc010945a5178b76e521ca311b7f86376cf431f603"
          before_revision: 14
          command_digest: "sha256:a774deb24ec3620b28eb102b95f14595d04f7bd43c70c4aa52f2e08575ac11b6"
          effect_ids: []
          event_digests:
            - "sha256:ff00280663168ba1248d77729aff608288c9df2069f6d7529cb40e393dc11cc9"
          mutation_id: "validation:sha256:2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484"
        work-item-resume:sha256:97aea782391aab47fd517299804d039658c79f0506453aad8a178d825e4cd421:
          after_revision: 9
          aggregate_digest: "sha256:cccb4951b47e6c846e803fba2bf255203aff81d6873976ee1ffc36df4dfc7fda"
          before_revision: 8
          command_digest: "sha256:a805b28a1ea9a6b5de93d2dcb727c6e449f2d4522035deebd3737416cdee99f8"
          effect_ids: []
          event_digests:
            - "sha256:3ce2afcea13cbb84608d34b9643ad62e9df95312a2ec0733d8aba5bcff23e1e6"
          mutation_id: "work-item-resume:sha256:97aea782391aab47fd517299804d039658c79f0506453aad8a178d825e4cd421"
      plan_history: []
      revision: 18
      schema_version: 1
      state: "COMPLETED"
      work_items:
        completed-rework-prospective-scope:
          attempt: 2
          claim_id: "sha256:62ce1a31fc54f631e6072ef93b43193fe661a36ee2b1bc4c06ca076e7b48c2dc"
          definition:
            contract_digest: "sha256:99818a5c08428aef75f3f0fe6f2b8b7f11652627531a2cb973dff20debe49359"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
                - "schema"
                - "public_api"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "prospective-completed-rework-grant"
              - "focused-regression-evidence"
              - "full-ci-evidence"
            id: "completed-rework-prospective-scope"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:481f658af07a7541c3d08f21fcdbab6f2e86d0e94c835f6f9ab4062b17b74334"
              id: "prospective-completed-rework-grant"
              kind: "implementation"
              plan_revision: 1
              repository_fingerprint: "sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
              task_id: "202610261755-GDTZJA"
              work_item_id: "completed-rework-prospective-scope"
            -
              attempt: 2
              digest: "sha256:9ebdff1135fb19b6f128dc9515fd1c631e085cc63263f0a63dca7588cdf10484"
              id: "focused-regression-evidence"
              kind: "verification_evidence"
              plan_revision: 1
              repository_fingerprint: "sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
              task_id: "202610261755-GDTZJA"
              work_item_id: "completed-rework-prospective-scope"
            -
              attempt: 2
              digest: "sha256:4f093e9ee1edf078ddbb434497b7a627655fc15a77c1757f8c0d4a37db7119d8"
              id: "full-ci-evidence"
              kind: "verification_evidence"
              plan_revision: 1
              repository_fingerprint: "sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
              task_id: "202610261755-GDTZJA"
              work_item_id: "completed-rework-prospective-scope"
          result_digest: "sha256:2b7697bebfcc5b72f906cd34104a13dbf657fe112a05c7b1f5174f546c975270"
          revision: 11
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9886a211afcb705653a23dd2cf85bc73c359883ac0c30db143c75775bfe30a19"
              - "sha256:a66b173c898b785ee223a245e403f366c8dbb480d411ead1222b211ceb4c84c6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:0c37f0b48ee8a0758a13c410b3d270018eef17abb89d6d52232cfe52fee18e95"
              environment_digest: "sha256:6e012597a1622890813956de9b0236fe07f9f67248beb36aebc49ba518d776f3"
              implementation_identity: "sha256:2b7697bebfcc5b72f906cd34104a13dbf657fe112a05c7b1f5174f546c975270"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-27T00:32:13.864Z"
            status: "PASSED"
    digest: "sha256:7d0899f60596e36bc0dd4b0e7e22e45a10eeff58a32d9c0aba0bcc3c72770c3b"
    documents:
      contracts:
        sha256:99818a5c08428aef75f3f0fe6f2b8b7f11652627531a2cb973dff20debe49359:
          acceptance_criteria:
            - "A USER operator can approve an exact authenticated prospective scope request from a completed-task implementation_rework result while the requested files remain unchanged."
            - "The grant binds the task, canonical result or request digest, repository and worktree identity, current plan revision/digest, base/head and policy fingerprints, requested roots and effects, and approved actor; stale, replayed, tampered or widened requests fail closed."
            - "The approved scope invalidates the superseded plan and requires a fresh canonical plan, explicit plan approval, and fresh executor packet before any implementation mutation under the expanded authority."
            - "The existing ACTIVE/BLOCKED WorkItem prospective scope route and the existing post-effect authority-delta route retain their semantics; neither is weakened or used to backfill a pre-effect grant."
            - "Focused tests cover completed-task happy path, request digest mismatch, stale or replayed request, changed files before grant, and separation from existing grant routes."
          objective: "Implement a generic native prospective scope-grant path for an authenticated typed blocker from an implementation_rework episode on a COMPLETED canonical branch-PR task. Grant the exact proposed roots and effects before out-of-scope files change, then require fresh plan approval and a fresh executor episode."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass."
        objective: "Authorize prospective scope for completed canonical task rework"
    events:
      -
        command_digest: "sha256:c8c3b3530fec5e460462499c940829b2f9d0a5771df17e67b401d8dc02481aae"
        id: "capture:202610261755-GDTZJA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610261755-GDTZJA"
        occurred_at: "2026-10-26T17:56:01.238Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610261755-GDTZJA"
        task_revision: 1
      -
        command_digest: "sha256:04bf21a6bf5d2e46af44e755a5b484188ef60c8f2d8de687e8ce615302acb8df"
        id: "result:sha256:098ffab31384ac37e34dc65d7d273ba09b1390d779a593b6717ca0b82267bad1:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:098ffab31384ac37e34dc65d7d273ba09b1390d779a593b6717ca0b82267bad1"
        occurred_at: "2026-10-26T17:58:23.837Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610261755-GDTZJA"
        task_revision: 2
      -
        command_digest: "sha256:b7b5c3ade3b9d879fa2010bed9837125bbfb4d71ac3e33591cab693fd4f4ff20"
        id: "sha256:66d94917c989ec77b82938f65217ab72e206803b18dae3f78dd9198510fc3c5a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:66d94917c989ec77b82938f65217ab72e206803b18dae3f78dd9198510fc3c5a"
        occurred_at: "2026-10-26T17:58:36.020Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610261755-GDTZJA"
        task_revision: 3
      -
        command_digest: "sha256:67ac6f5f93847774b8948e0d687aecd67bc68258223de87980b9c050d1939c7a"
        id: "kernel_work_item_materialization_required:sha256:6a934978e20fb917084c6720a43d5ea0987ecc35e82f824ccfc566db15a50b40:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:6a934978e20fb917084c6720a43d5ea0987ecc35e82f824ccfc566db15a50b40:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T17:58:47.415Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610261755-GDTZJA"
        task_revision: 4
      -
        command_digest: "sha256:01db7db71f33ac64a7e6e10539e487fb9e4ca13f38da0c0382e0a5f14c1fb83a"
        id: "kernel_work_item_claim_required:sha256:82a8615c5a2a113d2cdfd0ae2906fde90d8d54f6ba4a955876f2763d769c498b:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:82a8615c5a2a113d2cdfd0ae2906fde90d8d54f6ba4a955876f2763d769c498b:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T17:59:06.305Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610261755-GDTZJA"
        task_revision: 5
      -
        command_digest: "sha256:c602e1ddd7264cdbd97664197def3b0099675aa1056cdfbf569e3b401515ffc6"
        id: "kernel_work_item_execution_required:sha256:0c433333e4efcdc85a2dfe2cb7e1ea6906563d435248d460924d1d10691dd080:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0c433333e4efcdc85a2dfe2cb7e1ea6906563d435248d460924d1d10691dd080:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T18:00:05.040Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610261755-GDTZJA"
        task_revision: 6
      -
        command_digest: "sha256:826abf317258cf28e5855472d912a7144f739e5ad791370e3c125f7eef747349"
        id: "sha256:82a22d87357ca2eb85d65a3e916b68635d14c3b207ec7f2cf658d0555f6f9925:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:82a22d87357ca2eb85d65a3e916b68635d14c3b207ec7f2cf658d0555f6f9925"
        occurred_at: "2026-10-26T18:30:34.631Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610261755-GDTZJA"
        task_revision: 7
      -
        command_digest: "sha256:54954230d3be7f6d18537217cbb8074db41b245893c1dadeacd62c4f85160b79"
        id: "semantic-stop:sha256:69dd6c732b943ba70da77538f09f21d0347de42a9feff56ec950cf27bc1d8f03:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:69dd6c732b943ba70da77538f09f21d0347de42a9feff56ec950cf27bc1d8f03"
        occurred_at: "2026-10-26T18:30:57.118Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202610261755-GDTZJA"
        task_revision: 8
      -
        command_digest: "sha256:a805b28a1ea9a6b5de93d2dcb727c6e449f2d4522035deebd3737416cdee99f8"
        id: "work-item-resume:sha256:97aea782391aab47fd517299804d039658c79f0506453aad8a178d825e4cd421:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:97aea782391aab47fd517299804d039658c79f0506453aad8a178d825e4cd421"
        occurred_at: "2026-10-26T19:30:07.613Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610261755-GDTZJA"
        task_revision: 9
      -
        command_digest: "sha256:39185e82a8525dc1ffe8fdd305378bb72b3ebe768ebb0fa7b597cb633311ea33"
        id: "kernel_work_item_claim_required:sha256:5c9da948112567bbd33575eb5e6a870e5cd3ac0263148d383f82ce884dee808d:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5c9da948112567bbd33575eb5e6a870e5cd3ac0263148d383f82ce884dee808d:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
        occurred_at: "2026-10-26T19:30:31.845Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610261755-GDTZJA"
        task_revision: 10
      -
        command_digest: "sha256:85703b3008cde8f195bc30ea2921b60110ef93e21a1e91a877c6ca9a5665ee29"
        id: "kernel_work_item_execution_required:sha256:31991bc4529204f3fa286e526be55de1246c2fde6c11d19c5b9a19b7f6600129:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:31991bc4529204f3fa286e526be55de1246c2fde6c11d19c5b9a19b7f6600129:sha256:fefdc77dd21aa0dddaeef366a7fa7bfbe8bd78a1e26764ec8d0c06d807282133"
        occurred_at: "2026-10-26T19:30:46.998Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610261755-GDTZJA"
        task_revision: 11
      -
        command_digest: "sha256:a1bac038b94a3f5950466ccfd6d904fbbc251bfbabd8dd8e4eb07792033c0f6d"
        id: "sha256:d96d33f68e5b29eb45b739527e4b9799d613c925d12b90590192b6df00afb7bd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d96d33f68e5b29eb45b739527e4b9799d613c925d12b90590192b6df00afb7bd"
        occurred_at: "2026-10-26T23:53:29.312Z"
        payload_digest: "sha256:6a393f0d5f638e65b9d28b5f23acc31dc08122dddefda82bfc41f81256a566cd"
        task_id: "202610261755-GDTZJA"
        task_revision: 12
      -
        command_digest: "sha256:6ad3e9bb0bef0f0fc20680449f8610b110d6696e97a15e14edad3c9b48169dc4"
        id: "result:sha256:3a84c28d5c350829400fee5804c1dc254ee30c178f5deb2e86f9d69186d28c6f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:3a84c28d5c350829400fee5804c1dc254ee30c178f5deb2e86f9d69186d28c6f"
        occurred_at: "2026-10-26T23:53:39.834Z"
        payload_digest: "sha256:2214120ad1a5e1c4b7674bdbd2a4b5a1cbcf9ebfe37aea8b8ccadb27d3eee601"
        task_id: "202610261755-GDTZJA"
        task_revision: 13
      -
        command_digest: "sha256:87d4d4ce50fdc357a6f296cacdc6ad6509bd2662b061d726fc5300aac52bb3c0"
        id: "kernel_work_item_inspection_required:sha256:fbe8f8475104bd04a35dd5871303c5ca4f996869ca61491b815606a783584126:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fbe8f8475104bd04a35dd5871303c5ca4f996869ca61491b815606a783584126:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
        occurred_at: "2026-10-26T23:53:47.995Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610261755-GDTZJA"
        task_revision: 14
      -
        command_digest: "sha256:a774deb24ec3620b28eb102b95f14595d04f7bd43c70c4aa52f2e08575ac11b6"
        id: "validation:sha256:2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2cf1fb354014cc484726d64b1e7aefa13bc5879060564438152d920793129484"
        occurred_at: "2026-10-27T00:32:22.841Z"
        payload_digest: "sha256:43a52746fe1d98579ff85ddb184591f7f78f601544ff0fc20900514e17962df9"
        task_id: "202610261755-GDTZJA"
        task_revision: 15
      -
        command_digest: "sha256:5bc5eb257782b7af5081af5199e6923298a9ced047f31f0e9d9710d259215df8"
        id: "validation-resolution:sha256:8ade8a7b1054916c9926cc4a8ba3896a4ab3519eb6f0b512d492fad668647254:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8ade8a7b1054916c9926cc4a8ba3896a4ab3519eb6f0b512d492fad668647254"
        occurred_at: "2026-10-27T00:32:32.801Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610261755-GDTZJA"
        task_revision: 16
      -
        command_digest: "sha256:810b949748a4525c9492ef4364d2846cccc116c21d64d24af14734e6addd5fd3"
        id: "final-validation:sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb:16:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:c5fb95c16811cb45a8a55595d11af7a1d4577a31ee6d9dd254620ce88375e9bb:16"
        occurred_at: "2026-10-27T01:10:58.327Z"
        payload_digest: "sha256:337e06d84312b19d1e0f727462ad460e979740ceb05e415258cb18f2a428dcb8"
        task_id: "202610261755-GDTZJA"
        task_revision: 17
      -
        command_digest: "sha256:6c0dbdf7855961a696c00cc3822f9c638da50d9a6c03b2c49edac2840d36bf32"
        id: "kernel_task_completion_required:sha256:db6e47b8b8a2a707aee742ec2b7402d852da11e528b1ac19d518d7302a742c18:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:db6e47b8b8a2a707aee742ec2b7402d852da11e528b1ac19d518d7302a742c18:sha256:25608b0d35d3c7255f6b7f5f47834b66760a61d75118bab12bda433b5694a3fe"
        occurred_at: "2026-10-27T01:11:53.628Z"
        payload_digest: "sha256:c818f58e22c90ed9706f662cd9bd877680e676cf7540fcc394c0621904fe423d"
        task_id: "202610261755-GDTZJA"
        task_revision: 18
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Authorize prospective scope for completed canonical task rework

When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass.

## Scope

- In scope: When a completed branch-PR task receives an authenticated implementation_rework BLOCKED result requesting additional repository scope, let the USER approve that exact pre-effect request before any out-of-scope file changes. Bind the grant to the retained result, current canonical record, plan, repository fingerprint, policy, and requested roots/effects. Reject stale, altered, replayed, or pre-mutated requests. Invalidate the old plan and require a fresh approved plan and bounded executor packet before expanded work. Preserve the existing post-effect authority delta path. This is a generic AgentPlane lifecycle repair; no repository-specific adapter or bypass.
- Out of scope: unrelated refactors not required for "Authorize prospective scope for completed canonical task rework".

## Plan

1. Execute approved WorkItem completed-rework-prospective-scope.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/runner/usecases/kernel-authority.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-27T01:11:01.162Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2a25af24990efff1693c75cf75904e8f8b119bb575d9d7ce72856505758d2cc8, input_digest=sha256:e8b99b73b2211fa105a27114d31b89d8948996335211df8c5ca3c795fa9679c9

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check full_regression

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-scope-request.test.ts packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/core/src/tasks/task-kernel/kernel-authority.test.ts
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610261755-GDTZJA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610261755-GDTZJA Verification Contract check task_outcome (2/2)

NativeTaskIdentityRef:
- plan_digest: sha256:2ce01910b596d4cf6d517cca8c81e5592e0df0c667bed4d13219c9314b2cac0b
- policy_digest: sha256:feb24a8e320ce0423015830ce3c494a6612f1ba022b9c4cc1f35d24a47ac94d9
- capability_digest: sha256:2da985001bffb5ce18f1bd8a372cd34ca6c17aa23d539fb99bc30d1629fbf091
- checks_digest: sha256:f00c032f2dd4e253830fda48bcb3f808d632aed4a5f7bf4fc59119d5432fc5d6
- identity_digest: sha256:e3c877d96a0849b83080bd3c479c1955c2e363f2c4442f7906ba215a71976f1a

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610261755-GDTZJA
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
