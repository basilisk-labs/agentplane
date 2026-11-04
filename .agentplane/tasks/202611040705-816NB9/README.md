---
id: "202611040705-816NB9"
title: "Require fresh verification after native GitLab branch updates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
  - "bun run test:fast packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-04T08:11:41.097Z"
  updated_by: "USER"
  note: "Record the explicit user approval of the prepared816NB9 Plan with exactly21 source/test paths, including the three existing shared proof/target/verification consumers. Preserve QKNKFW and FK0WXM histories, all data, credentials, branches, runtime guards, unchanged full CI, independent EVALUATOR and canonical PR merge requirements."
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
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
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
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
          - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
          - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:cf5304fc0eb592d4726985de460695517fd6ec453488f695e2d72b5a657c284b"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-verification-records.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-04T07:05:06.090Z"
doc_updated_by: "CODER"
description: "Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion."
sections:
  Summary: |-
    Require fresh verification after native GitLab branch updates

    Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.
  Scope: |-
    - In scope: Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.
    - Out of scope: unrelated refactors not required for "Require fresh verification after native GitLab branch updates".
  Plan: "1. Execute approved WorkItem native-gitlab-fresh-validation-floor."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:fast packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:fast packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "main"
    base_sha: "4806d9ab70604c2beaaf9443cbd2817690962b72"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4d5ad837d0e52353dd5edb4ade836f194b2402d86263d4e787c6d48962098b18"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016"
            plan_revision: 1
            policy_digests:
              - "sha256:2a68602cdb59ee5df1a3d8f65ab3d471069771c5f9aeb2b4959645f747783f0b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:79788feb4c6dcddb2b426cfb7e2333a5718472719f579cc01ad5f9b837bcf545"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
              - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
              - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
              - "packages/agentplane/src/commands/shared/task-verification-records.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
            task_id: "202611040705-816NB9"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:1e140de95cbdea642c4ca28898bdba70d8fd95c92ccf793288922cc709d4d229"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016"
            plan_revision: 1
            policy_digests:
              - "sha256:2a68602cdb59ee5df1a3d8f65ab3d471069771c5f9aeb2b4959645f747783f0b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:79788feb4c6dcddb2b426cfb7e2333a5718472719f579cc01ad5f9b837bcf545"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4d5ad837d0e52353dd5edb4ade836f194b2402d86263d4e787c6d48962098b18"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:086f18e9b63915e05d41d3e3b40b3445f36843991c13d3ef9d285bffb00b51ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
              - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
              - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
              - "packages/agentplane/src/commands/shared/task-verification-records.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
            task_id: "202611040705-816NB9"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:f8c1cce67179baf197e8ac4e3f2ee262616895d9a02a35b8b8cfe255fb3762e5"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:79788feb4c6dcddb2b426cfb7e2333a5718472719f579cc01ad5f9b837bcf545"
        digest: "sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:1597a37d1edf6a6903149c67c2e9718875f24291424d202c72667ff0d6dd2cd2"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
                - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
                - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                - "packages/agentplane/src/commands/shared/task-verification-records.ts"
            expected_outputs:
              - "native-gitlab-update-source"
              - "fresh-gitlab-validation-floor-regressions"
            id: "native-gitlab-fresh-validation-floor"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611040705-816NB9"
      intent_digest: "sha256:ab9c8e361b48aa7917a8981a0adc696e8d5c0964278e7a235a8ff53996e36a25"
      migration_receipts: []
      mutation_receipts:
        capture:202611040705-816NB9:
          after_revision: 1
          aggregate_digest: "sha256:358b96b221705ecf08a62e16c8ac17d6961a91f8ec0e25e785033158198dfda8"
          before_revision: 0
          command_digest: "sha256:899de6a22c0d56491a77deb6389b1556f6eccb48f2fdf6661e6330163ae9fc74"
          effect_ids: []
          event_digests:
            - "sha256:030bb60a5815db21440776f25eca2662afe7e113d14e016b6583c87a03161876"
          mutation_id: "capture:202611040705-816NB9"
        kernel_work_item_claim_required:sha256:0f4be0925b4efbc2cb08f1cd0ef97d69e415a925b8754b77f240450586ab58c2:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55:
          after_revision: 5
          aggregate_digest: "sha256:1e540dc6e7d376b54cab6b78b9f33c1eac7b4deb783cdd954ec6e9fcdc651302"
          before_revision: 4
          command_digest: "sha256:14519b8e71b28b24762a324365d899443f73f1c1dfc0665b314e98f27651e6de"
          effect_ids: []
          event_digests:
            - "sha256:f4efb23a8698a3345b3e4b9f93949b669e4e80df50b1b23387399f254b0b4fd0"
          mutation_id: "kernel_work_item_claim_required:sha256:0f4be0925b4efbc2cb08f1cd0ef97d69e415a925b8754b77f240450586ab58c2:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
        kernel_work_item_execution_required:sha256:921bb85133caee2cdb624f349489d98a979e231fe6e235a119edd1a4eb1ad212:sha256:086f18e9b63915e05d41d3e3b40b3445f36843991c13d3ef9d285bffb00b51ea:
          after_revision: 7
          aggregate_digest: "sha256:7911a30a9d7cc40ab3d90d7796fb0f5cda7cd92c5814b3dd8af336b3ff2ac8fc"
          before_revision: 6
          command_digest: "sha256:23376789cdcbbe1f8a14893a702ad07337ae515846be3bcd45ef6afa88ad5672"
          effect_ids: []
          event_digests:
            - "sha256:b63627a139f9544db709a47951054ac0e291711bd5b90c471ca85b06b461c13b"
          mutation_id: "kernel_work_item_execution_required:sha256:921bb85133caee2cdb624f349489d98a979e231fe6e235a119edd1a4eb1ad212:sha256:086f18e9b63915e05d41d3e3b40b3445f36843991c13d3ef9d285bffb00b51ea"
        kernel_work_item_materialization_required:sha256:7861e9f50e6b3d3be79d3f7214eeeb95c287ea18c14505711188011c205034fe:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55:
          after_revision: 4
          aggregate_digest: "sha256:68badc2af57034517b8969cb00a7e9b629284b51d0f9d3c39e765941e5b1ad6d"
          before_revision: 3
          command_digest: "sha256:8bef0a2af21f94d03bc239f111484bdb44edcb67edc89969f3fd8695bc072c8a"
          effect_ids: []
          event_digests:
            - "sha256:4180fcd68ace7beb65be2c3c5a5232677ae9db8a7e7d47171eb2c9002f6c76c6"
          mutation_id: "kernel_work_item_materialization_required:sha256:7861e9f50e6b3d3be79d3f7214eeeb95c287ea18c14505711188011c205034fe:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
        plan:sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016:
          after_revision: 2
          aggregate_digest: "sha256:aaf0cd74bb797dfd287d43e1571f8d6ea1b513b00ab28ddedf8ffb998e594f73"
          before_revision: 1
          command_digest: "sha256:d9df36ecd3a803c856a1969fe7fef422a1593a905debcbac83a125a46633c688"
          effect_ids: []
          event_digests:
            - "sha256:af14d0a4623e769bd512dea846c8a4bf7c074e6a22dc05710f1be1ac9ecd00c6"
          mutation_id: "plan:sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016"
        sha256:9f9411b669ae4e797aa92c0c900a6a73e3cd9b97133826c648fa3547b8099792:
          after_revision: 3
          aggregate_digest: "sha256:51ad9a418ce115b2d979c8d1d2614cf5464899a53c6b85233ae5dffde62ebc2d"
          before_revision: 2
          command_digest: "sha256:9b552f60b9f602c0ac3c64e188428ec40e722b4094edb9ba30bccb9ae2ea688d"
          effect_ids: []
          event_digests:
            - "sha256:7147c8f7a41d59818a31bf86ce92fddcc7875497774eed92ad30dc6308329d67"
          mutation_id: "sha256:9f9411b669ae4e797aa92c0c900a6a73e3cd9b97133826c648fa3547b8099792"
        sha256:c4348b3498872175190151d9403ccc573a04943d14a22052e4bebe43f4bde54d:
          after_revision: 6
          aggregate_digest: "sha256:c6cc514246c907f2eaae46dea29b56d9db3035e14381992fc57b38fbe950128f"
          before_revision: 5
          command_digest: "sha256:50354f397f4923ff962a625960533514ce48f6d591e085d83c1c76edb44af661"
          effect_ids: []
          event_digests:
            - "sha256:ff13965001e36e2ef17ce0940e7a05def447f96498cec4fd8f475156e9de0806"
          mutation_id: "sha256:c4348b3498872175190151d9403ccc573a04943d14a22052e4bebe43f4bde54d"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        native-gitlab-fresh-validation-floor:
          attempt: 1
          claim_id: "sha256:24282d72f3c1ca9dccda71da51746f564160429f448477dd9f05fb5ae88ece35"
          definition:
            contract_digest: "sha256:1597a37d1edf6a6903149c67c2e9718875f24291424d202c72667ff0d6dd2cd2"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts"
                - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
                - "packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-journal.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                - "packages/agentplane/src/commands/shared/task-verification-records.ts"
            expected_outputs:
              - "native-gitlab-update-source"
              - "fresh-gitlab-validation-floor-regressions"
            id: "native-gitlab-fresh-validation-floor"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:e153f4f438e8d07b184086bf807911258e4598b407dfc7d24606b6b30d6e73d4"
    documents:
      contracts:
        sha256:1597a37d1edf6a6903149c67c2e9718875f24291424d202c72667ff0d6dd2cd2:
          acceptance_criteria:
            - "Only the exact approved21 source/test paths and this continuation Task own native generated artifacts may change. The previous source18 is provenance, not a passing receipt. Preserve every concurrent canonical change and every prior Task/branch/worktree/archive. The three added paths are existing proof reader, review target and verification-record acceptance consumer; no new schema, dependency, baseline or policy waiver."
            - "GitLab base observation independently authenticates the current exact target branch. diff_refs.base_sha is never substituted for current main. Wrong project/host/branch, stale or racing observations and missing evidence refuse."
            - "For exact same-project task-owned GitLab need_rebase, the native operation creates a conflict-free exact two-parent H/R merge, preserves H and R ancestry and clean worktree state, and publishes only without force or deletion under exact branch/head/base preconditions. Hosted MR, branch and commit readback must independently prove the result before local fast-forward and native proof."
            - "Interrupted publication or unavailable/unproven readback remains effect-in-doubt. Native same-operation reconciliation authenticates original grant, journal, exact H/R parents, current provider identity and original/current base ancestry. No blind retry, forged completion, stale receipt, manual Task or journal edits. Recovery must accept a real route transition only with unchanged stable controls and retained original USER authority. It must safely refresh stale tracking at already-aligned HEAD, preserving original R after current main advances. Proof-retention and completion-publication faults must preserve the same original operation; uncertain durable outcomes require readback and conditional CAS without replay or downgrade."
            - "Use one authenticated latest completed non-adopted GitLab update floor M for normal success and applied recovery. Before integration require fresh full native verification and independent EVALUATOR covering M, preserving frozen B and full B..M coverage. Reject pre-M record targets and native execution heads even when implementation/context/input digests are unchanged. Missing, corrupt, unreadable or mismatched proof for a completed GitLab operation blocks reuse. Old accepted records and reviews remain immutable historical evidence."
            - "Only the approved21 source/test paths plus own native artifacts may change. Preserve existing GitHub and adopted-PR clean-base and equivalent-input reuse, old Task states, all branches/worktrees, credentials/data, runtime guards, baselines, hooks, thresholds, worker counts and timeouts. Full native CI, independent review, canonical PR/merge/main CI and qualified controller promotion are mandatory before Factory or live sb effects."
            - "The GitLab episode owns the existing execution lease before mutating open through dispatch/persist/refresh and releases it in finally. Busy means no journal mutation or provider dispatch. Only direct successful intent CAS grants dispatch; a matching afterimage never grants ownership. State transitions acknowledge exact validated afterimages after lost acknowledgment; changed/malformed/unreadable states are preserved. Cleanup uncertainty cannot mask a primary failure or rewrite a completed effect."
            - "Real core start/completion/recovery_context fixtures cover intent CAS loss and before/after publication faults, typed retention stop, completion, both cursor advances and stale reopen, pre-effect failure/not_applied, changed/unreadable state, busy lease, release errors and managed handoff without PID/reentrant bypass. GitHub/adoption behavior and all previous assertions remain."
            - "Keep all existing600-line source and1000-line new-test limits and the immutable oversized-test baseline. Factor proof authentication once. Use narrow in-scope simplification where necessary to keep modified consumers within budget. Preserve every prior assertion. No acceptance, guard, threshold, worker count or timeout is weakened."
            - "Regression matrix uses a real named/default main at R, frozen B, valid previously accepted v5 full verification and valid EVALUATOR at H. Test both source-import R and empty/equivalent-input R, for normal update and applied recovery to M. Old full/EVAL must not authorize M; fresh full must still require EVALUATOR; fresh full plus EVALUATOR at M releases only the existing eligible integration route. Verify actual newly retained execution observations and heads, local and Git-snapshot records, own generated artifact tails, rewrite shortcuts, chained M2 updates and missing/unreadable/tampered/mismatched/pending proofs. Keep positive GitHub and adopted clean-base/equivalent-input assertions. Recovery must return fresh post-completion route. The native producer already executes new verification at each admitted task_verify; do not add a producer cache workaround."
          objective: "Implement the already-required native task-owned GitLab current-base update and uncertain-effect recovery with a durable validation floor at each authenticated merged head M. Reuse only the approved source implementations from883c67ff/1ffb278 as a starting point, without importing passing receipts or old Task artifacts. Preserve Task QKNKFW at FINAL_VALIDATION and Task FK0WXM BLOCKED with their branches, WorkOrders, native full evidence and EVALUATOR findings. FK review found that generic clean-base reuse accepts authentic old verification and EVALUATOR at H after M when local named main already contains R. Floor=M alone is insufficient for empty/equivalent-input R because accepted verification permits a different target SHA when checked-input digests agree. Factor the existing native proof/journal authentication, expose the latest completed non-adopted GitLab M floor using real gitRoot/taskId, make shared review-target selection honor it including rewrite shortcuts and artifact tails, and make shared verification acceptance reject pre-floor records before equivalent-input and legacy/snapshot fast paths. Check Git ancestry of both recorded targets and authenticated native execution heads. A completed GitLab operation with absent, unreadable, altered or mismatched proof must block reuse. Preserve all GitHub/adopted behavior. After recovery durable completion, reobserve the route rather than returning the pre-floor decision. Keep frozen B and full combined B..M checks, all runtime and publication guards, existing source/test size limits, immutable baselines, four workers, one group and unchanged timeouts. Obtain fresh native authority, full checks and independent EVALUATOR; canonical PR/merge/main CI and qualified controller promotion remain separate operator gates before Factory and sb effects."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts"
      intent:
        context: "Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion."
        objective: "Require fresh verification after native GitLab branch updates"
    events:
      -
        command_digest: "sha256:899de6a22c0d56491a77deb6389b1556f6eccb48f2fdf6661e6330163ae9fc74"
        id: "capture:202611040705-816NB9:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611040705-816NB9"
        occurred_at: "2026-11-04T07:05:06.070Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611040705-816NB9"
        task_revision: 1
      -
        command_digest: "sha256:d9df36ecd3a803c856a1969fe7fef422a1593a905debcbac83a125a46633c688"
        id: "plan:sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:c128127fc60339435a35b367add32c5da56f89b06ec16eb158d51d42e46f3016"
        occurred_at: "2026-11-04T07:06:11.543Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611040705-816NB9"
        task_revision: 2
      -
        command_digest: "sha256:9b552f60b9f602c0ac3c64e188428ec40e722b4094edb9ba30bccb9ae2ea688d"
        id: "sha256:9f9411b669ae4e797aa92c0c900a6a73e3cd9b97133826c648fa3547b8099792:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9f9411b669ae4e797aa92c0c900a6a73e3cd9b97133826c648fa3547b8099792"
        occurred_at: "2026-11-04T08:11:39.588Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611040705-816NB9"
        task_revision: 3
      -
        command_digest: "sha256:8bef0a2af21f94d03bc239f111484bdb44edcb67edc89969f3fd8695bc072c8a"
        id: "kernel_work_item_materialization_required:sha256:7861e9f50e6b3d3be79d3f7214eeeb95c287ea18c14505711188011c205034fe:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:7861e9f50e6b3d3be79d3f7214eeeb95c287ea18c14505711188011c205034fe:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
        occurred_at: "2026-11-04T08:12:25.657Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611040705-816NB9"
        task_revision: 4
      -
        command_digest: "sha256:14519b8e71b28b24762a324365d899443f73f1c1dfc0665b314e98f27651e6de"
        id: "kernel_work_item_claim_required:sha256:0f4be0925b4efbc2cb08f1cd0ef97d69e415a925b8754b77f240450586ab58c2:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0f4be0925b4efbc2cb08f1cd0ef97d69e415a925b8754b77f240450586ab58c2:sha256:4f4af0bd0d69c5a4533d132577feac113faf763b4a22d8f27567ffc8b920ae55"
        occurred_at: "2026-11-04T08:12:31.690Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611040705-816NB9"
        task_revision: 5
      -
        command_digest: "sha256:50354f397f4923ff962a625960533514ce48f6d591e085d83c1c76edb44af661"
        id: "sha256:c4348b3498872175190151d9403ccc573a04943d14a22052e4bebe43f4bde54d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c4348b3498872175190151d9403ccc573a04943d14a22052e4bebe43f4bde54d"
        occurred_at: "2026-11-04T08:14:05.266Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611040705-816NB9"
        task_revision: 6
      -
        command_digest: "sha256:23376789cdcbbe1f8a14893a702ad07337ae515846be3bcd45ef6afa88ad5672"
        id: "kernel_work_item_execution_required:sha256:921bb85133caee2cdb624f349489d98a979e231fe6e235a119edd1a4eb1ad212:sha256:086f18e9b63915e05d41d3e3b40b3445f36843991c13d3ef9d285bffb00b51ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:921bb85133caee2cdb624f349489d98a979e231fe6e235a119edd1a4eb1ad212:sha256:086f18e9b63915e05d41d3e3b40b3445f36843991c13d3ef9d285bffb00b51ea"
        occurred_at: "2026-11-04T08:14:08.685Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611040705-816NB9"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Require fresh verification after native GitLab branch updates

Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.

## Scope

- In scope: Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.
- Out of scope: unrelated refactors not required for "Require fresh verification after native GitLab branch updates".

## Plan

1. Execute approved WorkItem native-gitlab-fresh-validation-floor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:fast packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/provider-update-branch-gitlab.test.ts packages/agentplane/src/commands/shared/provider-update-branch-route.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:fast packages/agentplane/src/commands/shared/supervisor-execution-journal.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
