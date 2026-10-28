---
id: "202610272137-T6KC8D"
title: "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T21:40:50.770Z"
  updated_by: "USER"
  note: null
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
    - "effect_external_write"
    - "effect_release_metadata"
    - "effect_schema"
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
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "schema"
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
      - "public_api"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "effect_schema"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
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
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src"
          - "packages/core/src/tasks/task-kernel"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:70bfc2c8bb635753795794d0e068263c7c024982d3e60083e87410e3e17bd01a"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.test.mjs"
        - "effect_release_metadata"
        - "effect_schema"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-27T21:37:41.744Z"
doc_updated_by: "CODER"
description: "Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification."
sections:
  Summary: |-
    Complete generic hosted PR adoption with exact-base-safe merge and CLI reference

    Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
  Scope: |-
    - In scope: Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
    - Out of scope: unrelated refactors not required for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference".
  Plan: "1. Execute approved WorkItem generic-adopted-hosted-pr-lifecycle."
  Verify Steps: |-
    PLANNER fallback scaffold for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "6b0a86164c6cf94466b527c70c8da3fed76b6dfc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:29272e84ddc26a9d63ef685c3a54873275ef261ec5baf651b685ac17fe8b47a6"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:cdd96803df632a3a2f16c3200195d21e0f3e33bfe087003fc7bcf40279f75487"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:4cf609334230f66aaf4ee81501de201b89771ec597d358d43bbe4baaff55b12f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:cdd96803df632a3a2f16c3200195d21e0f3e33bfe087003fc7bcf40279f75487"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:29272e84ddc26a9d63ef685c3a54873275ef261ec5baf651b685ac17fe8b47a6"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/project.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/project.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.adoption.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
              - "packages/agentplane/src/commands/pr/adoption-identity.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-identity.ts"
              - "packages/agentplane/src/commands/pr/adoption-merge-base-proof.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-merge.ts"
              - "packages/agentplane/src/commands/pr/adoption-observe.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-observe.ts"
              - "packages/agentplane/src/commands/pr/adoption-request.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-request.ts"
              - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-route.ts"
              - "packages/agentplane/src/commands/pr/adoption-store.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-store.ts"
              - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
              - "packages/agentplane/src/commands/pr/adoption-verification.ts"
              - "packages/agentplane/src/commands/pr/adoption.command.ts"
              - "packages/agentplane/src/commands/pr/check.ts"
              - "packages/agentplane/src/commands/pr/flow-status.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
              - "packages/agentplane/src/commands/pr/pr.spec.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/pr-meta/builders.adoption.test.ts"
              - "packages/agentplane/src/commands/shared/pr-meta/builders.ts"
              - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
              - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-adopted-pr.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.ts"
              - "packages/agentplane/src/commands/task/adopted-provider-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/adopted-provider-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.hosted.test.ts"
              - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts"
              - "packages/agentplane/src/commands/task/kernel-adopted-pr-route.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-checkout.test.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-checkout.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-head-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-readback.test.ts"
              - "packages/agentplane/src/commands/task/kernel-hosted-readback.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts"
              - "packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:67c5511f7c8d4d6cec2d058ea43b089f2d9f19e288b728edbceaba4574799789"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3f50df8ba86a6aac862b1b859b55df339a86e4ad0ca8b20c369e871ede11b4b4"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4cf609334230f66aaf4ee81501de201b89771ec597d358d43bbe4baaff55b12f"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:6b2c8bc1982d4cdbbed7e28fa4ba00d13e76f2f4640d55ae8839d8af973bfa8e"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d545b8652e9f37532c80ebda9e54a6151e1164c075ae9cfeefc1e763d9289cec"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3f50df8ba86a6aac862b1b859b55df339a86e4ad0ca8b20c369e871ede11b4b4"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/flow-status-close-tail.ts"
              - "packages/agentplane/src/commands/pr/flow-status.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-params.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-adopted-operations.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/kernel-adopted-preclaim-update.ts"
              - "packages/agentplane/src/commands/task/kernel-final-corrective-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-work-order.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-commit-intents.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
            evidence_digest: "sha256:12816ed7b9ebbe9b09936144c502e9e58b3418423f39519587f74d49058e9109"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4859980024f7d7b7a3dd5218b3d478bc58c4d2eedcda300ff94fd94cc1e67b3a"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "USER"
              parent_authority_digest: "sha256:d545b8652e9f37532c80ebda9e54a6151e1164c075ae9cfeefc1e763d9289cec"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:4dd912712217275af1ed1310141f133295fc66726596aec5ff2456931db6170d"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
            request_digest: "sha256:98def132c6858926bbe46f57a639bd8bdbd2522e50a8644f28a3174c8a024a0c"
            scope_request:
              attempt: 3
              claim_id: "sha256:6c068bdf5e8e856e63d77afaf31557f4605e754a665eae701109a0865be8ee4a"
              contract_digest: "sha256:9fcfe8f6c082ca12c0169a8d0a42d0153d350e915857f82cc0a2c93e9842c0e6"
              intake_after_digest: "sha256:90edfb1ed82ca321f4c29ba418e5008f5741aa42824a897addcaf70ac86edf7c"
              intake_before_digest: "sha256:52a0f3c3ace7a61e0e9bb9d773e323b303ce7ee48d530000c78e93f92c5376f6"
              parent_authority_digest: "sha256:d545b8652e9f37532c80ebda9e54a6151e1164c075ae9cfeefc1e763d9289cec"
              plan_digest: "sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
              plan_revision: 2
              record_digest: "sha256:0ef5eed7999dce580533e907560e8f7142678fb39b47f9e60f67c126b8cd18cd"
              repository_effects: []
              repository_fingerprint: "sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:7034ec1ddf911231c9c64894b0dbaaa939d9b3d48a61abd26b91537b66e01ced"
              scope_roots:
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
              stop_receipt_digest: "sha256:cc8aeb961dcf4bca4841a08c897f2619fd86da636c03c96ea5dc267e8c97d4bb"
              task_id: "202610272137-T6KC8D"
              task_revision: 20
              work_item_id: "generic-adopted-hosted-pr-lifecycle"
              work_order_id: "sha256:fcf26609a6a15fb1052b8b666a2972b1d74c67cd7d3871e64f9ba528dcb37193"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c149a23d712b98d6084d5b44fff24c2e91c19b932da014ddae73031e5a814da0"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:e91967dc1c0e051ca34cfb1ff0a7e8ea1141be93525121e535bca184227ce794"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:34b36ada43da9c918df7ea872ffea298937988665f5706dcf20d0b64f7ad07b4"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            task_id: "202610272137-T6KC8D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:34b36ada43da9c918df7ea872ffea298937988665f5706dcf20d0b64f7ad07b4"
        digest: "sha256:e91967dc1c0e051ca34cfb1ff0a7e8ea1141be93525121e535bca184227ce794"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e9c8057ee1df3ba60c0e418d1a2b1d8e69a53ec2b9cc4df4003af2e6affedbc4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "packages/core/src/tasks/task-kernel"
                - "docs/user/cli-reference.generated.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            expected_outputs:
              - "authoritative-adoption-identity-and-strict-persistence"
              - "canonical-exact-head-evidence-and-independent-review"
              - "supervisor-owned-provider-update-merge-close-route"
              - "focused-negative-tests-and-full-ci-receipt"
              - "exact-base-safe-provider-merge-strategy"
              - "fresh-generated-cli-reference"
              - "ordinary-route-regression-repair"
            id: "generic-adopted-hosted-pr-lifecycle"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610272137-T6KC8D"
      intent_digest: "sha256:96d10d5a43221a3c17ac7cc18478add576738aa3bae9aab6d786e759d567d17f"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed:
          after_revision: 15
          aggregate_digest: "sha256:af8d71c0f249c12e449be0216d3ef88193f826a92780379246a567f14cf9e2fb"
          before_revision: 14
          command_digest: "sha256:a1d05b2beed5715706e6b80263b16b3239c68c16846f187feb438f1762ed7748"
          effect_ids: []
          event_digests:
            - "sha256:a83165bb9dc54a8b3d9d2a37e439db239019a364df02c6fed973cd5bc98a5d42"
          mutation_id: "amend:sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
        capture:202610272137-T6KC8D:
          after_revision: 1
          aggregate_digest: "sha256:b5e475b5ea7a9aab62d94bc9c7bb159fabe625e121ec53972ad98b805dab2142"
          before_revision: 0
          command_digest: "sha256:a424b420fcd2dfee527ca9404c4f3c955666d3164e2aeb4bbf74e18103539413"
          effect_ids: []
          event_digests:
            - "sha256:57570ba16d916094c4144a7cfe08433f4ce8c7f6a427c3a6bd51d33c4551a7a4"
          mutation_id: "capture:202610272137-T6KC8D"
        kernel_work_item_claim_required:sha256:00d3639cbe01b50918cc6364904850c9f711375cd095b042976bd8b822df8789:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9:
          after_revision: 24
          aggregate_digest: "sha256:e46cb64be3766937e381e55f29c644ecfabe8689fca91a3068b63737f4e4057c"
          before_revision: 23
          command_digest: "sha256:7522b66d890d01156d4a913c4de0efbcf40739da9f639a5ef501f9778575afb6"
          effect_ids: []
          event_digests:
            - "sha256:1d7349dbfea387728aa898573fe6009195082927fde188e7e1ac85507998740c"
          mutation_id: "kernel_work_item_claim_required:sha256:00d3639cbe01b50918cc6364904850c9f711375cd095b042976bd8b822df8789:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
        kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 5
          aggregate_digest: "sha256:86cea86dbc1f23cd12c8aa065395b6b1bd0de5500a58cff48a74ed82af886067"
          before_revision: 4
          command_digest: "sha256:bdcccc51733b48e1b00711134e3a0bd8c4886b30ca8c8db1f017ce320d04a257"
          effect_ids: []
          event_digests:
            - "sha256:31b177f4b7c33898cdb915bed4453bc750df266196102b88743b8cb6e114dcaf"
          mutation_id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        kernel_work_item_claim_required:sha256:add1212d22374b0c0f06d61da788e1bc8c38255fb5bf76fa7ebac561a4d8d50f:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:
          after_revision: 17
          aggregate_digest: "sha256:3c49f9d8a09c2b88b43def7d4341bdf39615927720a023b8ba2be3092cae1060"
          before_revision: 16
          command_digest: "sha256:9e825c983127e8a8a7fd9f04414d09e513e0ea4c25651b53609bce4732167a93"
          effect_ids: []
          event_digests:
            - "sha256:fa91bcee00594ac84ee30b79a58734a50472bd84ca5f1e88cc49118cbae8435c"
          mutation_id: "kernel_work_item_claim_required:sha256:add1212d22374b0c0f06d61da788e1bc8c38255fb5bf76fa7ebac561a4d8d50f:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        kernel_work_item_execution_required:sha256:425fa8fc2335ff387fe9760dd6186c491c329674ade89e19da38333513870bec:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:
          after_revision: 18
          aggregate_digest: "sha256:470ffa53ccb63dcb74726f5302e5719059efea048ada813186a6f0aef2e23cb8"
          before_revision: 17
          command_digest: "sha256:3ac3d57c05de9a686d7e6189ed0bb74db07930279b7906ccb43baf45f167f348"
          effect_ids: []
          event_digests:
            - "sha256:18507bedcb20d8393becea143e2a5f45bc94cf65236824ea7957826df778229a"
          mutation_id: "kernel_work_item_execution_required:sha256:425fa8fc2335ff387fe9760dd6186c491c329674ade89e19da38333513870bec:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        kernel_work_item_execution_required:sha256:b517e6deccead04dc396637aacfbe68209fd486080506d2629087418a604cf5d:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9:
          after_revision: 25
          aggregate_digest: "sha256:2bdeb08f5f32d85ec8eab6b18c8fb7dc9e7b2a3976ced496827de2afcbacb441"
          before_revision: 24
          command_digest: "sha256:57a37ea62e94b72fecf53d23c8ee820331b5450d759db5448c0cbafbaca2f54f"
          effect_ids: []
          event_digests:
            - "sha256:c2e21fb90062cad51754455489506c12c7f3a8e0c6e79fed4606477ebceda3aa"
          mutation_id: "kernel_work_item_execution_required:sha256:b517e6deccead04dc396637aacfbe68209fd486080506d2629087418a604cf5d:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
        kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 6
          aggregate_digest: "sha256:56dd0aa6fc90e8c8b8b37b5427008b7510b844aa77cc44bc1624778be8b01770"
          before_revision: 5
          command_digest: "sha256:c82f5ca487a2d4b6ad7443874de9ec7c51acf4566b2230f4fb2f58169e8be77e"
          effect_ids: []
          event_digests:
            - "sha256:2e73a8bb51099197004fa57eafb6041f333590c000437cda9382806582402e1e"
          mutation_id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        kernel_work_item_execution_required:sha256:ce6b8e8399b6aa087bec86f287376b417628594fec87f6ebeb68e6e9c2e232f5:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:
          after_revision: 13
          aggregate_digest: "sha256:688ce166251202aaca63f3a528ae6ea0ee8ddacb005c59c030ce6252ddbe132f"
          before_revision: 12
          command_digest: "sha256:7c4fc29b6043b716464ad8b24a384e0ef2cf142a53a4f1495c1f5986ae27de30"
          effect_ids: []
          event_digests:
            - "sha256:26996274de0375e22af342fb0d176c89c6cca1c502ae5edab055199e2044eb15"
          mutation_id: "kernel_work_item_execution_required:sha256:ce6b8e8399b6aa087bec86f287376b417628594fec87f6ebeb68e6e9c2e232f5:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        kernel_work_item_inspection_required:sha256:d3bf23895be83506cd16bd239c43d0db881844d643024a085be8cd126633a057:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:
          after_revision: 9
          aggregate_digest: "sha256:2bc3365d8447e8ccae38dbc1285ad3e99c84e1919a5960db426fa86bd5f9d2a5"
          before_revision: 8
          command_digest: "sha256:500c4efec1346edaecf41e16e59bbbc2472fc2a4d1798c1f228936fe12940fec"
          effect_ids: []
          event_digests:
            - "sha256:6ffcc6047632233aabe2f591bc02565cc5e88f6e1979634b14f46bfffd592c5c"
          mutation_id: "kernel_work_item_inspection_required:sha256:d3bf23895be83506cd16bd239c43d0db881844d643024a085be8cd126633a057:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 4
          aggregate_digest: "sha256:597fc226446f5c2737160f3aa0df0ce27cd55673c048e8fc87a562df9ea2c32a"
          before_revision: 3
          command_digest: "sha256:4c394c80b29987f9b748947d6d888e5c50b46829502082f7a16e0d2dfbe1d915"
          effect_ids: []
          event_digests:
            - "sha256:29b73af9ad7b58874aba9a38f207c51e40ac86890d42b2cd7c424f74fcc87cac"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        kernel_work_item_rework_claim_required:sha256:1ff7d02f99790afbf1aac9cc1d9164ea86e8a2d3a3f10dbf694b61ae99e806d9:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:
          after_revision: 12
          aggregate_digest: "sha256:db4f4002cb717c15d93a5953e55179f7203404e7662a09d1bb499b679513be3d"
          before_revision: 11
          command_digest: "sha256:48088f55b36569814ea70af5609497b0a3b8045f5dd326437bfef93c9174437f"
          effect_ids: []
          event_digests:
            - "sha256:9b2b2a4c0dbeaa3a0686b7363e8198fc0d393dfd32554874990862529bad1837"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:1ff7d02f99790afbf1aac9cc1d9164ea86e8a2d3a3f10dbf694b61ae99e806d9:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        result:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f:
          after_revision: 8
          aggregate_digest: "sha256:ba9add581bd548a8ccd7df02c3fef525e969093052a5f0f7ab91a1e323e03f80"
          before_revision: 7
          command_digest: "sha256:56a008be8a8682bd506eb9da4ac59d9284f839e1668576d3b0b12d3ad8a0bf0e"
          effect_ids: []
          event_digests:
            - "sha256:e9315a43e449eb11fd0785dc5f223520ca38708cec3bcd64a32206e1f178f9ee"
          mutation_id: "result:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f"
        result:sha256:8237d9d484a3a01ce2ddbd06624acdebf4366cbe731e416ddf761934f684f69b:
          after_revision: 22
          aggregate_digest: "sha256:be9c0a02986bbbe8afd328c66538fe5bcde0a9bc7719a6e80e6bcbcb3db45fa7"
          before_revision: 21
          command_digest: "sha256:4bb6e7de725d17d9c17e5ee72e601e3085b271c1be2d45decc63288ff0f1036b"
          effect_ids: []
          event_digests:
            - "sha256:e357ab762b3c1d209baaea90c6173772c73f9802e3f688ee82dec0943a2cd813"
          mutation_id: "result:sha256:8237d9d484a3a01ce2ddbd06624acdebf4366cbe731e416ddf761934f684f69b"
        result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0:
          after_revision: 2
          aggregate_digest: "sha256:6e25c17c63c8ae306ce27b827c44813c0933c3f19006ece98a8e3108d16e1a8a"
          before_revision: 1
          command_digest: "sha256:514d6cf0449a16780562c34991cc315df0099e67f118d153d5beab925af1baee"
          effect_ids: []
          event_digests:
            - "sha256:f98bab41c80667bbe6e777bffa3c2825731f20293c2728a18e854d74ea2539dc"
          mutation_id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0"
        scope-request:sha256:98def132c6858926bbe46f57a639bd8bdbd2522e50a8644f28a3174c8a024a0c:
          after_revision: 21
          aggregate_digest: "sha256:e502fc6d33e00fd06eebedffb0be85411e0eb344573ec6743c6730b0d52b8253"
          before_revision: 20
          command_digest: "sha256:aeafc9996375dca96d1919966c441ee4ef0f5a21414e6e94bc904c442cb50337"
          effect_ids: []
          event_digests:
            - "sha256:bb4d31a3f7902bad661af43af4067eb49dc9fd7766072059e84cbbf37c38752f"
          mutation_id: "scope-request:sha256:98def132c6858926bbe46f57a639bd8bdbd2522e50a8644f28a3174c8a024a0c"
        semantic-stop:sha256:ce6089095d863f4ece0f7d77240d7d1b49302d6206145f24cf76f1ab3734a18b:
          after_revision: 14
          aggregate_digest: "sha256:0fb11afcb418a98e73dc114c2b0b2e9b7ff55907684ca951da9e7799ab9d380d"
          before_revision: 13
          command_digest: "sha256:7b022ec01bb226f1f1f450c6d8d4883edbac75925d71b3a6a0b694a6e09749de"
          effect_ids: []
          event_digests:
            - "sha256:df8f0695d23817d22ecb6bb0dbc9f65caa3ed1348a457b06e23d2375dd56b7e7"
          mutation_id: "semantic-stop:sha256:ce6089095d863f4ece0f7d77240d7d1b49302d6206145f24cf76f1ab3734a18b"
        semantic-stop:sha256:fcf26609a6a15fb1052b8b666a2972b1d74c67cd7d3871e64f9ba528dcb37193:
          after_revision: 20
          aggregate_digest: "sha256:a70a47f5c20c05b27755e331d2cb401eb63161421aa8301e26befc168aeea448"
          before_revision: 19
          command_digest: "sha256:32c2fbb86f6905d6b2ca4696a2fe163773b9c1c7a6fdcc7f512d42f8a0ffe10e"
          effect_ids: []
          event_digests:
            - "sha256:d4c5ca3690f4c9700a60542dd1b4b5b61690428b0d69a9462c84e734e339961c"
          mutation_id: "semantic-stop:sha256:fcf26609a6a15fb1052b8b666a2972b1d74c67cd7d3871e64f9ba528dcb37193"
        sha256:25ca13f3f9ef44e08785c830ab4459d0c384d640bbcf9c3d7a6ccfb585907f0c:
          after_revision: 7
          aggregate_digest: "sha256:cf0f485976988ce4c77f2e5ed4e916fd9fe66fac969bf550d77eba993d7f8bcd"
          before_revision: 6
          command_digest: "sha256:d40d46e9dd88fa224f53db155baf122e43267d41b12af83209d33dfec771bd8f"
          effect_ids: []
          event_digests:
            - "sha256:01ec2b8a8b76ec9fef6a2fc41516d29ee8541d20ac56ef49fb79d30a0e192685"
          mutation_id: "sha256:25ca13f3f9ef44e08785c830ab4459d0c384d640bbcf9c3d7a6ccfb585907f0c"
        sha256:372e76d30da525bffb32ec4789aeb33ff6ab900ddb8247612a6f54a6693bf240:
          after_revision: 19
          aggregate_digest: "sha256:c1114a937d9a75d52b6d01c07c0baa96257747590a42283063f22c74b8b2990d"
          before_revision: 18
          command_digest: "sha256:6854bbd8ed2bf2b2980957589332288cd0910cdc1f18eb628c3e0a5e215221f8"
          effect_ids: []
          event_digests:
            - "sha256:6181c8b13706e7cce7104bbb6ed08ccac9c248b805c62f6ecc4e37bc75606dfa"
          mutation_id: "sha256:372e76d30da525bffb32ec4789aeb33ff6ab900ddb8247612a6f54a6693bf240"
        sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544:
          after_revision: 3
          aggregate_digest: "sha256:e33a902d9c53608fb26025625e62c446e82df7afad8775ebe4b7cc4eeb836437"
          before_revision: 2
          command_digest: "sha256:3315029dac167a31583d27d703cdbea5b675f403b3ebefa28c3773461c97fe79"
          effect_ids: []
          event_digests:
            - "sha256:b2f13e1ab58e6cbe525c39647ea38183209fccefefcab92168531170a68b0833"
          mutation_id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544"
        sha256:7cab8fe9c96ad064e4d9c3a9862e8774ada766f98203b420b0da7b7a94f25199:
          after_revision: 16
          aggregate_digest: "sha256:4ca3a99c9564082d774f7e86dde198c3fa7a0a0ed85e60e171dd5188fc995b46"
          before_revision: 15
          command_digest: "sha256:2a6073ddc591258f5842d38c87865b5034f6e3059489ea51caeda474c5c3c014"
          effect_ids: []
          event_digests:
            - "sha256:ba1e74af30251d6891396cdaecc98afeb37a72d7b3479129dc53167f1ed811e8"
          mutation_id: "sha256:7cab8fe9c96ad064e4d9c3a9862e8774ada766f98203b420b0da7b7a94f25199"
        sha256:c4ffa1f48ef72db8a3d88dc804ff2519b288d7981e2e724578fb1038d3a2acbe:
          after_revision: 23
          aggregate_digest: "sha256:65cc8035da20f227232c63e3c329b4cb1ff5517f1c96752e6739ebf9d7262cb6"
          before_revision: 22
          command_digest: "sha256:5e333bf0535d22cc812931196ab7219c2deef429b6da3b114087333901831cee"
          effect_ids: []
          event_digests:
            - "sha256:917e68cdd98b6b5198b81a86850faf22e1ea98ceded3fc555f2103a2b289a7ec"
          mutation_id: "sha256:c4ffa1f48ef72db8a3d88dc804ff2519b288d7981e2e724578fb1038d3a2acbe"
        validation-resolution:sha256:7b7b53626da7ea453fea4cb6807f795e8b48108ff1c8a2be707ba7b636532974:
          after_revision: 11
          aggregate_digest: "sha256:30bc6b52cc432bab6a53e2113641ed0c3d0a291af58fe1ed9e12da188ae559b2"
          before_revision: 10
          command_digest: "sha256:bb68f59a5ee9add322c68a7a3d895293ea68d463d1a82f8d975bc41a3b4bc6d5"
          effect_ids: []
          event_digests:
            - "sha256:d7103efd08269736bcd3eae1e37c3825bba72c8e8fecec0e2d198f97c207ca39"
          mutation_id: "validation-resolution:sha256:7b7b53626da7ea453fea4cb6807f795e8b48108ff1c8a2be707ba7b636532974"
        validation:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f:
          after_revision: 10
          aggregate_digest: "sha256:c23c8eaeb0557fdb04f51d1cb047a86699a5e5622442572cda9dfb8b2674fd48"
          before_revision: 9
          command_digest: "sha256:779c8ea784cf95ea54aebee96c76f6bda2e38e9e38454d2550c354ec240a1037"
          effect_ids: []
          event_digests:
            - "sha256:7ac414c1668353aa9c4e3184d7dca0b2301767230884bb634cdebc8d5810ef5b"
          mutation_id: "validation:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
          digest: "sha256:cdd96803df632a3a2f16c3200195d21e0f3e33bfe087003fc7bcf40279f75487"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:115b189ea5b4d4cb9d6ffeab274eb3a980302f0dd863e3e2f410f90f23adc2df"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects:
                  - "network_read"
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "release_metadata"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/user/cli-reference.generated.mdx"
              expected_outputs:
                - "authoritative-adoption-identity-and-strict-persistence"
                - "canonical-exact-head-evidence-and-independent-review"
                - "supervisor-owned-provider-update-merge-close-route"
                - "focused-negative-tests-and-full-ci-receipt"
                - "exact-base-safe-provider-merge-strategy"
                - "fresh-generated-cli-reference"
                - "ordinary-route-regression-repair"
              id: "generic-adopted-hosted-pr-lifecycle"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:d53220087d7d17cb9a7e3a9e80c8cd66d1f3bd165a30b2e65f1fa0714985e5a7"
          digest: "sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:9fcfe8f6c082ca12c0169a8d0a42d0153d350e915857f82cc0a2c93e9842c0e6"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects:
                  - "network_read"
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "release_metadata"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/user/cli-reference.generated.mdx"
              expected_outputs:
                - "authoritative-adoption-identity-and-strict-persistence"
                - "canonical-exact-head-evidence-and-independent-review"
                - "supervisor-owned-provider-update-merge-close-route"
                - "focused-negative-tests-and-full-ci-receipt"
                - "exact-base-safe-provider-merge-strategy"
                - "fresh-generated-cli-reference"
                - "ordinary-route-regression-repair"
              id: "generic-adopted-hosted-pr-lifecycle"
              optional: false
              required_inputs: []
      revision: 25
      schema_version: 1
      state: "ACTIVE"
      work_items:
        generic-adopted-hosted-pr-lifecycle:
          attempt: 4
          claim_id: "sha256:ebbf2b5f7c9fb0c5bf8a3350282a57124b55ce11bc45bc2bc2facbfcf2c0074e"
          definition:
            contract_digest: "sha256:e9c8057ee1df3ba60c0e418d1a2b1d8e69a53ec2b9cc4df4003af2e6affedbc4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "packages/core/src/tasks/task-kernel"
                - "docs/user/cli-reference.generated.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            expected_outputs:
              - "authoritative-adoption-identity-and-strict-persistence"
              - "canonical-exact-head-evidence-and-independent-review"
              - "supervisor-owned-provider-update-merge-close-route"
              - "focused-negative-tests-and-full-ci-receipt"
              - "exact-base-safe-provider-merge-strategy"
              - "fresh-generated-cli-reference"
              - "ordinary-route-regression-repair"
            id: "generic-adopted-hosted-pr-lifecycle"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 19
          state: "EXECUTING"
          validation: null
    digest: "sha256:dbcbeaf0962137a7aa4fb36727e36e583bdaec651c8530cace3ce8bdbe317f4d"
    documents:
      contracts:
        sha256:115b189ea5b4d4cb9d6ffeab274eb3a980302f0dd863e3e2f410f90f23adc2df:
          acceptance_criteria:
            - "Persist immutable provider/repository/PR/base/head/tree/adoption identity from authoritative primary control store. Strict kernelValidationSchema.identity accepts and preserves only the optional hosted_head_evidence_digest; metadata rebuild preserves previousMeta.adoption. Reject foreign repositories, conflicting identities, missing control-store records, and tampered or replayed receipts."
            - "Canonical TESTER, independent EVALUATOR, and final validation bind one observed hosted PR head and matching repository tree to the approved task/Plan and current provider readback. Reject stale head/base, changed required checks, mismatched tree, missing review evidence, and changed task identity. Do not reuse local or hosted CI evidence for a different head."
            - "Native provider check, branch update, guarded merge, hosted close, and restart/replay recovery use current provider readback and separate matching USER grants for external writes. Preserve existing branch_pr policies for required checks, reviews, branch protection, and task cleanliness. Never use admin or force merge, and do not perform provider writes inside the semantic episode."
            - "Register generic adoption commands in the CLI catalog/loader and preserve authority through shared workflow steps and side-effect projection. Keep ordinary newly-created PR lifecycle behavior unchanged. Do not derive integration truth from a transient task checkout or silently fill missing evidence."
            - "Cover authoritative control-store persistence, adapter strictness and replay, CLI dispatch, exact-head TESTER/EVALUATOR/final-validation, provider update/merge/close, stale authority, concurrent head change, and interrupted operation with focused negative tests. Run typecheck, lint/format as applicable, mandatory full CI, and independent EVALUATOR before branch publication."
            - "Keep changes to the named generic production files and nearest tests within the three approved roots. Preserve 621P51 and 138DXY until successor work is safely transferred and their native closure routes are separately authorized."
            - "A hard process exit after provider update or merge but before the local receipt leaves a running intent. Recover it with the native journal transition under the retained lease and exact prior USER grant. Reconcile the immutable provider result without repeating the remote effect. Fail closed on changed PR identity, head, base ancestry, or grant."
            - "A repeated canonical controller transfer preserves a primary descendant after Hosted Close and rejects divergent history. The source task DONE state cannot bypass adopted merge or primary transfer. Clean primary readback reaches DONE only after the guarded merge and native close route."
            - "Add focused negative tests for running-intent crash, same-second merge timestamp, duplicate exact USER grants, update and merge replay, base drift, and stale source controller handoff."
            - "An adopted GitHub PR uses a merge-commit method whose immutable first parent can prove the exact authorized pre-merge base for a multi-commit head. Never try rebase first or fall back to rebase. If merge commits are disabled, fail before provider PUT. After success and on crash recovery, require exact provider identity/head, merge commit, and first parent equal the authorized base. A base advance between guard and effect cannot be recorded as success."
            - "For adopted GitLab MRs, read the target project merge strategy before the remote effect and fail closed on FF, automatic rebase, or an ambiguous strategy that cannot guarantee an immutable exact-base parent. Treat an ambiguous transport response as effect in doubt; reconcile by fresh readback under the original USER grant without issuing a second merge request. Keep ordinary branch_pr method policy unchanged."
            - "The global adopted recovery hook leaves ordinary task routes untouched before resolving gitCommonDir, acquiring an adopted journal lease, or reading a provider. Ordinary final validation resolves an adopted hosted route only when the latest accepted repository evidence has adopted_hosted_pr origin. Evaluator review ignores ordinary PR metadata with no adoption marker, but strictly validates marked adoption metadata and never overwrites non-adopted PR artifacts."
            - "Update optional repository-evidence test fixtures and normal-route negative tests so the full core suite confirms both adopted and non-adopted behavior. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog; its pr adopt command is present and bun run docs:cli:check passes. Preserve exact EWN source provenance; old EWN task remains for separate native supersession after validated transfer."
            - "Run focused provider merge, adopted lifecycle, normal-route regression, and docs checks; run typecheck, lint/format, mandatory full CI, and independent EVALUATOR before publication. No provider mutation occurs inside the semantic WorkItem."
          objective: "Implement a generic native branch_pr route for an existing same-repository hosted PR. The planned production files are core task-kernel/{model,kernel,index,hosted-pr-head-evidence}.ts; agentplane adapters/task-backend/kernel-record.ts; CLI run-cli/command-catalog/project.ts and command-loaders/project.ts; commands/task/kernel-{accepted-repository-evidence,adopted-pr-route,final-validation,hosted-checkout,hosted-head-evidence,hosted-readback,inspection,inspection-validation,repository-coordinator,repository-types,semantic-result}.ts and branch-task-supervisor-{episodes,operations}.ts; commands/evaluator/evaluator-qualification-review.ts; commands/shared/pr-meta/builders.ts, side-effect-authority-policy.ts, side-effect-authority.ts, workflow-operation-{effects,prefix,projection}.ts, workflow-postconditions.ts, workflow-step-reducer.ts, workflow-step.ts, workflow-step-adopted-pr.ts; commands/pr/{check,flow-status,pr.spec,provider-update-branch}.ts and internal/sync.ts, plus adoption-{identity,merge,observe,request,route,store,task-authority,verification}.ts and adoption.command.ts. Add nearest tests under these same roots. Transfer package source and tests from EWNMG7 implementation c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 only after this WorkOrder; reject transient adoption-checkout and compatibility TESTER/EVALUATOR episodes. No bot-, provider-, or repository-specific adapter or workaround. Additional named generic production files required for replay and durable handoff are commands/task/advance-task-step.ts, kernel-controller-handoff.ts, adopted-provider-effect-recovery.ts; commands/shared/supervisor-execution-episode.ts, provider-update-branch-route.ts, canonical-pre-merge-evidence.ts. Additional named provider merge production files are commands/pr/integrate/internal/github-pr-merge.ts and gitlab-mr-merge.ts. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog. The nearest tests include commands/pr/integrate/internal/gitlab-mr-merge.test.ts, a new GitHub merge-strategy test, commands/pr/adoption-merge.test.ts, commands/task/roadmap-terminal-noop.test.ts, commands/task/roadmap-common-review-application.test.ts, commands/evaluator/evaluator-run.command.test.ts, runner/usecases/kernel-task-lifecycle.test.ts, and commands/task/kernel-inspection.test.ts."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-review.adoption.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-hosted-checkout.test.ts packages/agentplane/src/commands/task/kernel-hosted-readback.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.hosted.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/shared/pr-meta/builders.adoption.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts --pool=forks --maxWorkers 1"
            - "bun run typecheck"
            - "bun run ci:local:full"
            - "bunx vitest run packages/agentplane/src/commands/task/adopted-provider-effect-recovery.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-merge-base-proof.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts --pool=forks --maxWorkers 1"
            - "bun run docs:cli:check"
        sha256:9fcfe8f6c082ca12c0169a8d0a42d0153d350e915857f82cc0a2c93e9842c0e6:
          acceptance_criteria:
            - "Persist immutable provider/repository/PR/base/head/tree/adoption identity from authoritative primary control store. Strict kernelValidationSchema.identity accepts and preserves only the optional hosted_head_evidence_digest; metadata rebuild preserves previousMeta.adoption. Reject foreign repositories, conflicting identities, missing control-store records, and tampered or replayed receipts."
            - "Canonical TESTER, independent EVALUATOR, and final validation bind one observed hosted PR head and matching repository tree to the approved task/Plan and current provider readback. Reject stale head/base, changed required checks, mismatched tree, missing review evidence, and changed task identity. Do not reuse local or hosted CI evidence for a different head."
            - "Native provider check, branch update, guarded merge, hosted close, and restart/replay recovery use current provider readback and separate matching USER grants for external writes. Preserve existing branch_pr policies for required checks, reviews, branch protection, and task cleanliness. Never use admin or force merge, and do not perform provider writes inside the semantic episode."
            - "Register generic adoption commands in the CLI catalog/loader and preserve authority through shared workflow steps and side-effect projection. Keep ordinary newly-created PR lifecycle behavior unchanged. Do not derive integration truth from a transient task checkout or silently fill missing evidence."
            - "Cover authoritative control-store persistence, adapter strictness and replay, CLI dispatch, exact-head TESTER/EVALUATOR/final-validation, provider update/merge/close, stale authority, concurrent head change, and interrupted operation with focused negative tests. Run typecheck, lint/format as applicable, mandatory full CI, and independent EVALUATOR before branch publication."
            - "Keep changes to the named generic production files and nearest tests within the three approved roots. Preserve 621P51 and 138DXY until successor work is safely transferred and their native closure routes are separately authorized."
            - "A hard process exit after provider update or merge but before the local receipt leaves a running intent. Recover it with the native journal transition under the retained lease and exact prior USER grant. Reconcile the immutable provider result without repeating the remote effect. Fail closed on changed PR identity, head, base ancestry, or grant."
            - "A repeated canonical controller transfer preserves a primary descendant after Hosted Close and rejects divergent history. The source task DONE state cannot bypass adopted merge or primary transfer. Clean primary readback reaches DONE only after the guarded merge and native close route."
            - "Add focused negative tests for running-intent crash, same-second merge timestamp, duplicate exact USER grants, update and merge replay, base drift, and stale source controller handoff."
            - "An adopted GitHub PR uses a merge-commit method whose immutable first parent can prove the exact authorized pre-merge base for a multi-commit head. Never try rebase first or fall back to rebase. If merge commits are disabled, fail before provider PUT. After success and on crash recovery, require exact provider identity/head, merge commit, and first parent equal the authorized base. A base advance between guard and effect cannot be recorded as success."
            - "For adopted GitLab MRs, read the target project merge strategy before the remote effect and fail closed on FF, automatic rebase, or an ambiguous strategy that cannot guarantee an immutable exact-base parent. Treat an ambiguous transport response as effect in doubt; reconcile by fresh readback under the original USER grant without issuing a second merge request. Keep ordinary branch_pr method policy unchanged."
            - "The global adopted recovery hook leaves ordinary task routes untouched before resolving gitCommonDir, acquiring an adopted journal lease, or reading a provider. Ordinary final validation resolves an adopted hosted route only when the latest accepted repository evidence has adopted_hosted_pr origin. Evaluator review ignores ordinary PR metadata with no adoption marker, but strictly validates marked adoption metadata and never overwrites non-adopted PR artifacts."
            - "Update optional repository-evidence test fixtures and normal-route negative tests so the full core suite confirms both adopted and non-adopted behavior. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog; its pr adopt command is present and bun run docs:cli:check passes. Preserve exact EWN source provenance; old EWN task remains for separate native supersession after validated transfer."
            - "Run focused provider merge, adopted lifecycle, normal-route regression, and docs checks; run typecheck, lint/format, mandatory full CI, and independent EVALUATOR before publication. No provider mutation occurs inside the semantic WorkItem."
            - "All seven modules that crossed the 600-line hotspot gate in run-005 fall below the threshold after behavior-preserving extraction to the seven additionally named generic helper files. Existing public imports/exports and ordinary and adopted routes remain unchanged; bun run hotspots:check passes without allow-oversized exceptions."
          objective: "Implement a generic native branch_pr route for an existing same-repository hosted PR. The planned production files are core task-kernel/{model,kernel,index,hosted-pr-head-evidence}.ts; agentplane adapters/task-backend/kernel-record.ts; CLI run-cli/command-catalog/project.ts and command-loaders/project.ts; commands/task/kernel-{accepted-repository-evidence,adopted-pr-route,final-validation,hosted-checkout,hosted-head-evidence,hosted-readback,inspection,inspection-validation,repository-coordinator,repository-types,semantic-result}.ts and branch-task-supervisor-{episodes,operations}.ts; commands/evaluator/evaluator-qualification-review.ts; commands/shared/pr-meta/builders.ts, side-effect-authority-policy.ts, side-effect-authority.ts, workflow-operation-{effects,prefix,projection}.ts, workflow-postconditions.ts, workflow-step-reducer.ts, workflow-step.ts, workflow-step-adopted-pr.ts; commands/pr/{check,flow-status,pr.spec,provider-update-branch}.ts and internal/sync.ts, plus adoption-{identity,merge,observe,request,route,store,task-authority,verification}.ts and adoption.command.ts. Add nearest tests under these same roots. Transfer package source and tests from EWNMG7 implementation c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 only after this WorkOrder; reject transient adoption-checkout and compatibility TESTER/EVALUATOR episodes. No bot-, provider-, or repository-specific adapter or workaround. Additional named generic production files required for replay and durable handoff are commands/task/advance-task-step.ts, kernel-controller-handoff.ts, adopted-provider-effect-recovery.ts; commands/shared/supervisor-execution-episode.ts, provider-update-branch-route.ts, canonical-pre-merge-evidence.ts. Additional named provider merge production files are commands/pr/integrate/internal/github-pr-merge.ts and gitlab-mr-merge.ts. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog. The nearest tests include commands/pr/integrate/internal/gitlab-mr-merge.test.ts, a new GitHub merge-strategy test, commands/pr/adoption-merge.test.ts, commands/task/roadmap-terminal-noop.test.ts, commands/task/roadmap-common-review-application.test.ts, commands/evaluator/evaluator-run.command.test.ts, runner/usecases/kernel-task-lifecycle.test.ts, and commands/task/kernel-inspection.test.ts. Native full CI run-005 on 9ddd877ea14fb61b2e468a8bc789be345c5b29db passed build, runtime, core, and CLI; docs-schema failed only hotspots:check because seven modified modules exceeded 600 lines. Extract behavior-preserving generic helpers into these additional named files: commands/pr/flow-status-close-tail.ts, commands/shared/workflow-operation-params.ts, commands/task/kernel-repository-commit-intents.ts, commands/task/branch-task-supervisor-adopted-operations.ts, commands/task/kernel-adopted-preclaim-update.ts, commands/task/kernel-inspection-work-order.ts, commands/task/kernel-final-corrective-plan.ts. No temporary hotspot exceptions."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-review.adoption.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-hosted-checkout.test.ts packages/agentplane/src/commands/task/kernel-hosted-readback.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.hosted.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/shared/pr-meta/builders.adoption.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts --pool=forks --maxWorkers 1"
            - "bun run typecheck"
            - "bunx vitest run packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers 1"
            - "bun run hotspots:check"
            - "bun run ci:local:full"
            - "bunx vitest run packages/agentplane/src/commands/task/adopted-provider-effect-recovery.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-merge-base-proof.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts --pool=forks --maxWorkers 1"
            - "bun run docs:cli:check"
        sha256:e9c8057ee1df3ba60c0e418d1a2b1d8e69a53ec2b9cc4df4003af2e6affedbc4:
          acceptance_criteria:
            - "Persist immutable provider/repository/PR/base/head/tree/adoption identity from authoritative primary control store. Strict kernelValidationSchema.identity accepts and preserves only the optional hosted_head_evidence_digest; metadata rebuild preserves previousMeta.adoption. Reject foreign repositories, conflicting identities, missing control-store records, and tampered or replayed receipts."
            - "Canonical TESTER, independent EVALUATOR, and final validation bind one observed hosted PR head and matching repository tree to the approved task/Plan and current provider readback. Reject stale head/base, changed required checks, mismatched tree, missing review evidence, and changed task identity. Do not reuse local or hosted CI evidence for a different head."
            - "Native provider check, branch update, guarded merge, hosted close, and restart/replay recovery use current provider readback and separate matching USER grants for external writes. Preserve existing branch_pr policies for required checks, reviews, branch protection, and task cleanliness. Never use admin or force merge, and do not perform provider writes inside the semantic episode."
            - "Register generic adoption commands in the CLI catalog/loader and preserve authority through shared workflow steps and side-effect projection. Keep ordinary newly-created PR lifecycle behavior unchanged. Do not derive integration truth from a transient task checkout or silently fill missing evidence."
            - "Cover authoritative control-store persistence, adapter strictness and replay, CLI dispatch, exact-head TESTER/EVALUATOR/final-validation, provider update/merge/close, stale authority, concurrent head change, and interrupted operation with focused negative tests. Run typecheck, lint/format as applicable, mandatory full CI, and independent EVALUATOR before branch publication."
            - "Keep changes to the named generic production files and nearest tests within the three approved roots. Preserve 621P51 and 138DXY until successor work is safely transferred and their native closure routes are separately authorized."
            - "A hard process exit after provider update or merge but before the local receipt leaves a running intent. Recover it with the native journal transition under the retained lease and exact prior USER grant. Reconcile the immutable provider result without repeating the remote effect. Fail closed on changed PR identity, head, base ancestry, or grant."
            - "A repeated canonical controller transfer preserves a primary descendant after Hosted Close and rejects divergent history. The source task DONE state cannot bypass adopted merge or primary transfer. Clean primary readback reaches DONE only after the guarded merge and native close route."
            - "Add focused negative tests for running-intent crash, same-second merge timestamp, duplicate exact USER grants, update and merge replay, base drift, and stale source controller handoff."
            - "An adopted GitHub PR uses a merge-commit method whose immutable first parent can prove the exact authorized pre-merge base for a multi-commit head. Never try rebase first or fall back to rebase. If merge commits are disabled, fail before provider PUT. After success and on crash recovery, require exact provider identity/head, merge commit, and first parent equal the authorized base. A base advance between guard and effect cannot be recorded as success."
            - "For adopted GitLab MRs, read the target project merge strategy before the remote effect and fail closed on FF, automatic rebase, or an ambiguous strategy that cannot guarantee an immutable exact-base parent. Treat an ambiguous transport response as effect in doubt; reconcile by fresh readback under the original USER grant without issuing a second merge request. Keep ordinary branch_pr method policy unchanged."
            - "The global adopted recovery hook leaves ordinary task routes untouched before resolving gitCommonDir, acquiring an adopted journal lease, or reading a provider. Ordinary final validation resolves an adopted hosted route only when the latest accepted repository evidence has adopted_hosted_pr origin. Evaluator review ignores ordinary PR metadata with no adoption marker, but strictly validates marked adoption metadata and never overwrites non-adopted PR artifacts."
            - "Update optional repository-evidence test fixtures and normal-route negative tests so the full core suite confirms both adopted and non-adopted behavior. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog; its pr adopt command is present and bun run docs:cli:check passes. Preserve exact EWN source provenance; old EWN task remains for separate native supersession after validated transfer."
            - "Run focused provider merge, adopted lifecycle, normal-route regression, and docs checks; run typecheck, lint/format, mandatory full CI, and independent EVALUATOR before publication. No provider mutation occurs inside the semantic WorkItem."
            - "All seven modules that crossed the 600-line hotspot gate in run-005 fall below the threshold after behavior-preserving extraction to the seven additionally named generic helper files. Existing public imports/exports and ordinary and adopted routes remain unchanged; bun run hotspots:check passes without allow-oversized exceptions."
            - "The three prospectively approved script paths are the sole exception to the original three-root generic implementation boundary. Keep the immutable v0.6.24 compatibility baseline byte-identical. Update reviewed candidate cli_topology and workflow_schema surfaces, candidate.source_tasks and affected delta.source_tasks for source task 202610270555-MY0JZE, and the validator expected provenance and pr adopt CLI addition evidence. Reject unknown or unreviewed candidate deltas."
            - "A nearest validator regression test rejects an unknown CLI or workflow delta and validates reviewed pr adopt provenance. The candidate freshness check and strict compatibility validator pass against the exact staged source before native full CI."
          objective: "Implement a generic native branch_pr route for an existing same-repository hosted PR. The planned production files are core task-kernel/{model,kernel,index,hosted-pr-head-evidence}.ts; agentplane adapters/task-backend/kernel-record.ts; CLI run-cli/command-catalog/project.ts and command-loaders/project.ts; commands/task/kernel-{accepted-repository-evidence,adopted-pr-route,final-validation,hosted-checkout,hosted-head-evidence,hosted-readback,inspection,inspection-validation,repository-coordinator,repository-types,semantic-result}.ts and branch-task-supervisor-{episodes,operations}.ts; commands/evaluator/evaluator-qualification-review.ts; commands/shared/pr-meta/builders.ts, side-effect-authority-policy.ts, side-effect-authority.ts, workflow-operation-{effects,prefix,projection}.ts, workflow-postconditions.ts, workflow-step-reducer.ts, workflow-step.ts, workflow-step-adopted-pr.ts; commands/pr/{check,flow-status,pr.spec,provider-update-branch}.ts and internal/sync.ts, plus adoption-{identity,merge,observe,request,route,store,task-authority,verification}.ts and adoption.command.ts. Add nearest tests under these same roots. Transfer package source and tests from EWNMG7 implementation c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 only after this WorkOrder; reject transient adoption-checkout and compatibility TESTER/EVALUATOR episodes. No bot-, provider-, or repository-specific adapter or workaround. Additional named generic production files required for replay and durable handoff are commands/task/advance-task-step.ts, kernel-controller-handoff.ts, adopted-provider-effect-recovery.ts; commands/shared/supervisor-execution-episode.ts, provider-update-branch-route.ts, canonical-pre-merge-evidence.ts. Additional named provider merge production files are commands/pr/integrate/internal/github-pr-merge.ts and gitlab-mr-merge.ts. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog. The nearest tests include commands/pr/integrate/internal/gitlab-mr-merge.test.ts, a new GitHub merge-strategy test, commands/pr/adoption-merge.test.ts, commands/task/roadmap-terminal-noop.test.ts, commands/task/roadmap-common-review-application.test.ts, commands/evaluator/evaluator-run.command.test.ts, runner/usecases/kernel-task-lifecycle.test.ts, and commands/task/kernel-inspection.test.ts. Native full CI run-005 on 9ddd877ea14fb61b2e468a8bc789be345c5b29db passed build, runtime, core, and CLI; docs-schema failed only hotspots:check because seven modified modules exceeded 600 lines. Extract behavior-preserving generic helpers into these additional named files: commands/pr/flow-status-close-tail.ts, commands/shared/workflow-operation-params.ts, commands/task/kernel-repository-commit-intents.ts, commands/task/branch-task-supervisor-adopted-operations.ts, commands/task/kernel-adopted-preclaim-update.ts, commands/task/kernel-inspection-work-order.ts, commands/task/kernel-final-corrective-plan.ts. No temporary hotspot exceptions. The three prospectively approved scripts paths update only reviewed compatibility candidate evidence: scripts/baselines/v0.7-compatibility-candidate.json, scripts/checks/check-compatibility-contract-baseline.mjs, and the nearest scripts/checks/check-compatibility-contract-baseline.test.mjs. Preserve the immutable v0.6.24 baseline; attribute the new CLI and workflow surface to source task 202610270555-MY0JZE and this successor execution task 202610272137-T6KC8D in task traceability."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-review.adoption.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-hosted-checkout.test.ts packages/agentplane/src/commands/task/kernel-hosted-readback.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.hosted.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/shared/pr-meta/builders.adoption.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts --pool=forks --maxWorkers 1"
            - "bun run typecheck"
            - "bunx vitest run packages/agentplane/src/commands/task/adopted-provider-effect-recovery.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-merge-base-proof.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts --pool=forks --maxWorkers 1"
            - "bun run docs:cli:check"
            - "bunx vitest run packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers 1"
            - "bun run hotspots:check"
            - "node --test scripts/checks/check-compatibility-contract-baseline.test.mjs"
            - "node scripts/bench/capture-compatibility-candidate.mjs --check"
            - "node scripts/checks/check-compatibility-contract-baseline.mjs"
            - "bun run ci:local:full"
      intent:
        context: "Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification."
        objective: "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference"
    events:
      -
        command_digest: "sha256:a424b420fcd2dfee527ca9404c4f3c955666d3164e2aeb4bbf74e18103539413"
        id: "capture:202610272137-T6KC8D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610272137-T6KC8D"
        occurred_at: "2026-10-27T21:37:41.674Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610272137-T6KC8D"
        task_revision: 1
      -
        command_digest: "sha256:514d6cf0449a16780562c34991cc315df0099e67f118d153d5beab925af1baee"
        id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0"
        occurred_at: "2026-10-27T21:39:19.953Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610272137-T6KC8D"
        task_revision: 2
      -
        command_digest: "sha256:3315029dac167a31583d27d703cdbea5b675f403b3ebefa28c3773461c97fe79"
        id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544"
        occurred_at: "2026-10-27T21:40:46.605Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610272137-T6KC8D"
        task_revision: 3
      -
        command_digest: "sha256:4c394c80b29987f9b748947d6d888e5c50b46829502082f7a16e0d2dfbe1d915"
        id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:41:05.593Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610272137-T6KC8D"
        task_revision: 4
      -
        command_digest: "sha256:bdcccc51733b48e1b00711134e3a0bd8c4886b30ca8c8db1f017ce320d04a257"
        id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:41:21.888Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610272137-T6KC8D"
        task_revision: 5
      -
        command_digest: "sha256:c82f5ca487a2d4b6ad7443874de9ec7c51acf4566b2230f4fb2f58169e8be77e"
        id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:42:17.854Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610272137-T6KC8D"
        task_revision: 6
      -
        command_digest: "sha256:d40d46e9dd88fa224f53db155baf122e43267d41b12af83209d33dfec771bd8f"
        id: "sha256:25ca13f3f9ef44e08785c830ab4459d0c384d640bbcf9c3d7a6ccfb585907f0c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:25ca13f3f9ef44e08785c830ab4459d0c384d640bbcf9c3d7a6ccfb585907f0c"
        occurred_at: "2026-10-27T22:38:54.983Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610272137-T6KC8D"
        task_revision: 7
      -
        command_digest: "sha256:56a008be8a8682bd506eb9da4ac59d9284f839e1668576d3b0b12d3ad8a0bf0e"
        id: "result:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f"
        occurred_at: "2026-10-27T22:39:08.562Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610272137-T6KC8D"
        task_revision: 8
      -
        command_digest: "sha256:500c4efec1346edaecf41e16e59bbbc2472fc2a4d1798c1f228936fe12940fec"
        id: "kernel_work_item_inspection_required:sha256:d3bf23895be83506cd16bd239c43d0db881844d643024a085be8cd126633a057:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:d3bf23895be83506cd16bd239c43d0db881844d643024a085be8cd126633a057:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        occurred_at: "2026-10-27T22:39:19.926Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610272137-T6KC8D"
        task_revision: 9
      -
        command_digest: "sha256:779c8ea784cf95ea54aebee96c76f6bda2e38e9e38454d2550c354ec240a1037"
        id: "validation:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6d33227814666d5afa1c36613fc151f1c6fb88ae4728ee9fa97348b773e33e9f"
        occurred_at: "2026-10-27T23:34:07.992Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610272137-T6KC8D"
        task_revision: 10
      -
        command_digest: "sha256:bb68f59a5ee9add322c68a7a3d895293ea68d463d1a82f8d975bc41a3b4bc6d5"
        id: "validation-resolution:sha256:7b7b53626da7ea453fea4cb6807f795e8b48108ff1c8a2be707ba7b636532974:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7b7b53626da7ea453fea4cb6807f795e8b48108ff1c8a2be707ba7b636532974"
        occurred_at: "2026-10-27T23:34:15.978Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610272137-T6KC8D"
        task_revision: 11
      -
        command_digest: "sha256:48088f55b36569814ea70af5609497b0a3b8045f5dd326437bfef93c9174437f"
        id: "kernel_work_item_rework_claim_required:sha256:1ff7d02f99790afbf1aac9cc1d9164ea86e8a2d3a3f10dbf694b61ae99e806d9:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:1ff7d02f99790afbf1aac9cc1d9164ea86e8a2d3a3f10dbf694b61ae99e806d9:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        occurred_at: "2026-10-27T23:34:29.387Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610272137-T6KC8D"
        task_revision: 12
      -
        command_digest: "sha256:7c4fc29b6043b716464ad8b24a384e0ef2cf142a53a4f1495c1f5986ae27de30"
        id: "kernel_work_item_execution_required:sha256:ce6b8e8399b6aa087bec86f287376b417628594fec87f6ebeb68e6e9c2e232f5:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ce6b8e8399b6aa087bec86f287376b417628594fec87f6ebeb68e6e9c2e232f5:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        occurred_at: "2026-10-27T23:34:38.862Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610272137-T6KC8D"
        task_revision: 13
      -
        command_digest: "sha256:7b022ec01bb226f1f1f450c6d8d4883edbac75925d71b3a6a0b694a6e09749de"
        id: "semantic-stop:sha256:ce6089095d863f4ece0f7d77240d7d1b49302d6206145f24cf76f1ab3734a18b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:ce6089095d863f4ece0f7d77240d7d1b49302d6206145f24cf76f1ab3734a18b"
        occurred_at: "2026-10-27T23:35:46.738Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610272137-T6KC8D"
        task_revision: 14
      -
        command_digest: "sha256:a1d05b2beed5715706e6b80263b16b3239c68c16846f187feb438f1762ed7748"
        id: "amend:sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:c2fd37b9b37516087d279c9adaa1f0633f5ea3da823a48f047e30e963f9ebfed"
        occurred_at: "2026-10-27T23:37:04.319Z"
        payload_digest: "sha256:36be904ca7a7b0203be7b7ae9baf0f6b429970e74f83ac756501ba6bd5218510"
        task_id: "202610272137-T6KC8D"
        task_revision: 15
      -
        command_digest: "sha256:2a6073ddc591258f5842d38c87865b5034f6e3059489ea51caeda474c5c3c014"
        id: "sha256:7cab8fe9c96ad064e4d9c3a9862e8774ada766f98203b420b0da7b7a94f25199:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7cab8fe9c96ad064e4d9c3a9862e8774ada766f98203b420b0da7b7a94f25199"
        occurred_at: "2026-10-27T23:37:13.015Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202610272137-T6KC8D"
        task_revision: 16
      -
        command_digest: "sha256:9e825c983127e8a8a7fd9f04414d09e513e0ea4c25651b53609bce4732167a93"
        id: "kernel_work_item_claim_required:sha256:add1212d22374b0c0f06d61da788e1bc8c38255fb5bf76fa7ebac561a4d8d50f:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:add1212d22374b0c0f06d61da788e1bc8c38255fb5bf76fa7ebac561a4d8d50f:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        occurred_at: "2026-10-27T23:37:59.905Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610272137-T6KC8D"
        task_revision: 17
      -
        command_digest: "sha256:3ac3d57c05de9a686d7e6189ed0bb74db07930279b7906ccb43baf45f167f348"
        id: "kernel_work_item_execution_required:sha256:425fa8fc2335ff387fe9760dd6186c491c329674ade89e19da38333513870bec:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:425fa8fc2335ff387fe9760dd6186c491c329674ade89e19da38333513870bec:sha256:070de341c089ba5573646f17cf8aab98efca672c90eb9c34d6cf96d16d129f9f"
        occurred_at: "2026-10-27T23:38:10.295Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610272137-T6KC8D"
        task_revision: 18
      -
        command_digest: "sha256:6854bbd8ed2bf2b2980957589332288cd0910cdc1f18eb628c3e0a5e215221f8"
        id: "sha256:372e76d30da525bffb32ec4789aeb33ff6ab900ddb8247612a6f54a6693bf240:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:372e76d30da525bffb32ec4789aeb33ff6ab900ddb8247612a6f54a6693bf240"
        occurred_at: "2026-10-28T00:26:13.536Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202610272137-T6KC8D"
        task_revision: 19
      -
        command_digest: "sha256:32c2fbb86f6905d6b2ca4696a2fe163773b9c1c7a6fdcc7f512d42f8a0ffe10e"
        id: "semantic-stop:sha256:fcf26609a6a15fb1052b8b666a2972b1d74c67cd7d3871e64f9ba528dcb37193:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:fcf26609a6a15fb1052b8b666a2972b1d74c67cd7d3871e64f9ba528dcb37193"
        occurred_at: "2026-10-28T00:26:28.390Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610272137-T6KC8D"
        task_revision: 20
      -
        command_digest: "sha256:aeafc9996375dca96d1919966c441ee4ef0f5a21414e6e94bc904c442cb50337"
        id: "scope-request:sha256:98def132c6858926bbe46f57a639bd8bdbd2522e50a8644f28a3174c8a024a0c:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:98def132c6858926bbe46f57a639bd8bdbd2522e50a8644f28a3174c8a024a0c"
        occurred_at: "2026-10-28T00:27:09.193Z"
        payload_digest: "sha256:3eb8e3742554dcf08308e10744eb692d6cdd37346bbef096cddf90f11bd7f319"
        task_id: "202610272137-T6KC8D"
        task_revision: 21
      -
        command_digest: "sha256:4bb6e7de725d17d9c17e5ee72e601e3085b271c1be2d45decc63288ff0f1036b"
        id: "result:sha256:8237d9d484a3a01ce2ddbd06624acdebf4366cbe731e416ddf761934f684f69b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8237d9d484a3a01ce2ddbd06624acdebf4366cbe731e416ddf761934f684f69b"
        occurred_at: "2026-10-28T00:29:53.870Z"
        payload_digest: "sha256:1423d23267a7138d5f49fe4475c6a6b715faaa24deb4e72b1664a506e7602395"
        task_id: "202610272137-T6KC8D"
        task_revision: 22
      -
        command_digest: "sha256:5e333bf0535d22cc812931196ab7219c2deef429b6da3b114087333901831cee"
        id: "sha256:c4ffa1f48ef72db8a3d88dc804ff2519b288d7981e2e724578fb1038d3a2acbe:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c4ffa1f48ef72db8a3d88dc804ff2519b288d7981e2e724578fb1038d3a2acbe"
        occurred_at: "2026-10-28T00:30:20.875Z"
        payload_digest: "sha256:f7bd9087bcaca617f73953dbe1f6b8cb7c21ad9488de552111f1147c8f0d517f"
        task_id: "202610272137-T6KC8D"
        task_revision: 23
      -
        command_digest: "sha256:7522b66d890d01156d4a913c4de0efbcf40739da9f639a5ef501f9778575afb6"
        id: "kernel_work_item_claim_required:sha256:00d3639cbe01b50918cc6364904850c9f711375cd095b042976bd8b822df8789:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:00d3639cbe01b50918cc6364904850c9f711375cd095b042976bd8b822df8789:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
        occurred_at: "2026-10-28T00:30:48.948Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610272137-T6KC8D"
        task_revision: 24
      -
        command_digest: "sha256:57a37ea62e94b72fecf53d23c8ee820331b5450d759db5448c0cbafbaca2f54f"
        id: "kernel_work_item_execution_required:sha256:b517e6deccead04dc396637aacfbe68209fd486080506d2629087418a604cf5d:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b517e6deccead04dc396637aacfbe68209fd486080506d2629087418a604cf5d:sha256:f12f5c6f1191b6bf17891452adbfe10936314bf1929572dc92e768a0a19ce6f9"
        occurred_at: "2026-10-28T00:31:03.766Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610272137-T6KC8D"
        task_revision: 25
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Complete generic hosted PR adoption with exact-base-safe merge and CLI reference

Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.

## Scope

- In scope: Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
- Out of scope: unrelated refactors not required for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference".

## Plan

1. Execute approved WorkItem generic-adopted-hosted-pr-lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
