---
id: "202610110406-P2ADDS"
title: "Authenticate policy renewal receipts in retained rework authority"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "v0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts packages/agentplane/src/commands/task/kernel-rework-proof.test.ts --maxWorkers=1"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T04:09:31.412Z"
  updated_by: "agentplane:kernel-controller"
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
      - "repository_write"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
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
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:d4e6874ebabefb198f97a9488718919c0fe8e71acbb197d101438b3f6960519d"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-11T04:07:14.024Z"
doc_updated_by: "CODER"
description: "Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied."
sections:
  Summary: |-
    Authenticate policy renewal receipts in retained rework authority

    Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied.
  Scope: |-
    - In scope: Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied.
    - Out of scope: unrelated refactors not required for "Authenticate policy renewal receipts in retained rework authority".
  Plan: "1. Execute approved WorkItem authenticate-renewed-rework."
  Verify Steps: |-
    PLANNER fallback scaffold for "Authenticate policy renewal receipts in retained rework authority". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Authenticate policy renewal receipts in retained rework authority". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
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
            digest: "sha256:e2038cfed90bf759e2c31f48ec3e36f1fe02a6d4b3a961cdb58daf7269b0eb4c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:14a9d7a78f0683757b1696e1610bff7c563a36ebca4e5d95747dc074a572ea19"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aff297db6210fe068809850c0ca5e0dd01a96d175923b8d7af7c458b41229af0"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            task_id: "202610110406-P2ADDS"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:af472b636644c24dfb1486ca8bd648fe9bf1c6f55bfe9bb0a4ad8539901bf7e9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:14a9d7a78f0683757b1696e1610bff7c563a36ebca4e5d95747dc074a572ea19"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aff297db6210fe068809850c0ca5e0dd01a96d175923b8d7af7c458b41229af0"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e2038cfed90bf759e2c31f48ec3e36f1fe02a6d4b3a961cdb58daf7269b0eb4c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            task_id: "202610110406-P2ADDS"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:7bec42bde82f246996386f31a8b52e4764680c5f52d6b9873dd6da2991b54fff"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f2639c4517fda779cedd66d82eba08a84ff50070ca91114bb0c6487ac685d322"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:14a9d7a78f0683757b1696e1610bff7c563a36ebca4e5d95747dc074a572ea19"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:aff297db6210fe068809850c0ca5e0dd01a96d175923b8d7af7c458b41229af0"
              kind: "USER"
              parent_authority_digest: "sha256:af472b636644c24dfb1486ca8bd648fe9bf1c6f55bfe9bb0a4ad8539901bf7e9"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            task_id: "202610110406-P2ADDS"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".agentplane/policy/context.must.md"
              - ".agentplane/policy/dod.core.md"
              - ".agentplane/policy/dod.docs.md"
              - ".agentplane/policy/examples/migration-note.md"
              - ".agentplane/policy/governance.md"
              - ".agentplane/policy/security.must.md"
              - ".agentplane/policy/workflow.branch_pr.md"
              - ".agentplane/policy/workflow.direct.md"
              - ".agentplane/policy/workflow.md"
              - ".agentplane/policy/workflow.release.md"
              - ".agentplane/policy/workflow.upgrade.md"
              - ".github/workflows/task-hosted-close.yml"
              - ".prettierignore"
              - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
              - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
              - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
              - "bun.lock"
              - "context/wiki/index.md"
              - "context/wiki/proposals/index.md"
              - "context/wiki/proposals/task-harvest/index.md"
              - "context/wiki/release-docs/concepts/index.md"
              - "context/wiki/release-docs/domains/index.md"
              - "context/wiki/release-docs/release-lines/index.md"
              - "context/wiki/reports/index.md"
              - "context/wiki/task-harvest/index.md"
              - "docs/developer/modular-prompt-assembly.mdx"
              - "docs/developer/testing-and-quality.mdx"
              - "docs/releases/v0.7.1.md"
              - "docs/releases/v0.7.13-acceptance.md"
              - "docs/releases/v0.7.13.md"
              - "docs/user/candidate-publication.md"
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "eslint.config.cjs"
              - "package.json"
              - "packages/agentplane/assets/AGENTS.md"
              - "packages/agentplane/assets/RUNNER.md"
              - "packages/agentplane/assets/policy/context.must.md"
              - "packages/agentplane/assets/policy/dod.core.md"
              - "packages/agentplane/assets/policy/dod.docs.md"
              - "packages/agentplane/assets/policy/examples/migration-note.md"
              - "packages/agentplane/assets/policy/governance.md"
              - "packages/agentplane/assets/policy/security.must.md"
              - "packages/agentplane/assets/policy/workflow.branch_pr.md"
              - "packages/agentplane/assets/policy/workflow.direct.md"
              - "packages/agentplane/assets/policy/workflow.md"
              - "packages/agentplane/assets/policy/workflow.release.md"
              - "packages/agentplane/assets/policy/workflow.upgrade.md"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-request-adapter.test.ts"
              - "packages/agentplane/src/agents/agents-template.test.ts"
              - "packages/agentplane/src/agents/agents-template.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
              - "packages/agentplane/src/backends/task-backend/shared/types.ts"
              - "packages/agentplane/src/cli/command-invocations.ts"
              - "packages/agentplane/src/cli/error-map.ts"
              - "packages/agentplane/src/cli/help.all-commands.contract.test.ts"
              - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
              - "packages/agentplane/src/cli/reason-codes.ts"
              - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task-candidate.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task-recovery.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
              - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
              - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
              - "packages/agentplane/src/cli/run-cli/globals.ts"
              - "packages/agentplane/src/cli/spec/help.ts"
              - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              - "packages/agentplane/src/cli/verification-contract.test.ts"
              - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
              - "packages/agentplane/src/commands/context/assimilation-supervisor.unit.test.ts"
              - "packages/agentplane/src/commands/context/context.spec.ts"
              - "packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
              - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
              - "packages/agentplane/src/commands/evidence/evidence.command.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-close.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/flow-status.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
              - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
              - "packages/agentplane/src/commands/pr/internal/auto-commit-ancestry.test.ts"
              - "packages/agentplane/src/commands/pr/internal/auto-commit.test.ts"
              - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
              - "packages/agentplane/src/commands/pr/update.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/src/commands/shared/canonical-task-owner.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/shared/hook-shim-template.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.ts"
              - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
              - "packages/agentplane/src/commands/shared/reconcile-canonical-scope.test.ts"
              - "packages/agentplane/src/commands/shared/reconcile-check.ts"
              - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
              - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
              - "packages/agentplane/src/commands/shared/route-guidance.ts"
              - "packages/agentplane/src/commands/shared/route-oracle.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-store.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-store.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/shared/source-confidence.ts"
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
              - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-publication-spec.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.ts"
              - "packages/agentplane/src/commands/task/active.command.ts"
              - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
              - "packages/agentplane/src/commands/task/authority-grant.command.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-admission.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-context.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-context.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-executor.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-executor.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-receipt.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-tree.ts"
              - "packages/agentplane/src/commands/task/candidate-publication.command.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication.command.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.ts"
              - "packages/agentplane/src/commands/task/close-noop.command.ts"
              - "packages/agentplane/src/commands/task/close-noop.ts"
              - "packages/agentplane/src/commands/task/comment.ts"
              - "packages/agentplane/src/commands/task/comment.unit.test.ts"
              - "packages/agentplane/src/commands/task/configured-authority.test.ts"
              - "packages/agentplane/src/commands/task/configured-authority.ts"
              - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
              - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
              - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
              - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
              - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-authority-delta-stop.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-cutover.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request-paths.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.ts"
              - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/agentplane/src/commands/task/run-render.ts"
              - "packages/agentplane/src/commands/task/scaffold.ts"
              - "packages/agentplane/src/commands/task/scope-approve-request.command.ts"
              - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
              - "packages/agentplane/src/commands/task/verification-observation.test.ts"
              - "packages/agentplane/src/commands/task/verification-observation.ts"
              - "packages/agentplane/src/commands/workflow.test.ts"
              - "packages/agentplane/src/context/ingest-task-pack.test.ts"
              - "packages/agentplane/src/context/ingest-task.ts"
              - "packages/agentplane/src/context/knowledge-ref.ts"
              - "packages/agentplane/src/harness/state-machine.ts"
              - "packages/agentplane/src/policy/taxonomy.ts"
              - "packages/agentplane/src/ports/kernel-authority.ts"
              - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
              - "packages/agentplane/src/runner/context/recipe-role-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
              - "packages/agentplane/src/runner/context/work-order-context.ts"
              - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
              - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
              - "packages/agentplane/src/runner/result-manifest.ts"
              - "packages/agentplane/src/runner/run-record-profile.ts"
              - "packages/agentplane/src/runner/types/state.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
              - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
              - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
              - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
              - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
              - "packages/agentplane/src/runtime/harness/types.ts"
              - "packages/agentplane/src/runtime/prompt-modules/model.ts"
              - "packages/agentplane/src/runtime/sgr/contract-types.ts"
              - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
              - "packages/agentplane/src/runtime/task-execution-context/model.ts"
              - "packages/agentplane/src/shared/candidate-pre-push-script.ts"
              - "packages/agentplane/src/shared/package-paths.ts"
              - "packages/agentplane/src/shared/preparation-trace.ts"
              - "packages/agentplane/src/shared/sqlite-driver.ts"
              - "packages/agentplane/src/workflow-runtime/migration.ts"
              - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
              - "packages/core/package.json"
              - "packages/core/schemas/agent-work-order-v2.schema.json"
              - "packages/core/schemas/config.schema.json"
              - "packages/core/schemas/task-handoff.schema.json"
              - "packages/core/schemas/task-readme-frontmatter.schema.json"
              - "packages/core/schemas/tasks-export.schema.json"
              - "packages/core/schemas/workflow.schema.json"
              - "packages/core/src/config/schema.impl.ts"
              - "packages/core/src/git/git-utils.ts"
              - "packages/core/src/index.ts"
              - "packages/core/src/process/run-process.observation.test.ts"
              - "packages/core/src/process/run-process.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/runner/knowledge-ref.ts"
              - "packages/core/src/runner/recipe-role-context.test.ts"
              - "packages/core/src/runner/recipe-role-context.ts"
              - "packages/core/src/runner/runner-effect-operation.ts"
              - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
              - "packages/core/src/runner/supervisor-execution-episode.ts"
              - "packages/core/src/schemas/index.ts"
              - "packages/core/src/schemas/iso-timestamp.test.ts"
              - "packages/core/src/schemas/iso-timestamp.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/kernel-plan-refinement.ts"
              - "packages/core/src/tasks/kernel-semantic.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/supplied-plan-aggregate.ts"
              - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
              - "packages/core/src/tasks/task-artifact-schema.shared.ts"
              - "packages/core/src/tasks/task-centric/model.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/bookkeeping.test.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
              - "packages/core/src/tasks/task-kernel/final-recovery.test.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
              - "packages/core/src/tasks/task-store.ts"
              - "packages/recipes/package.json"
              - "packages/recipes/src/compiled-contracts.ts"
              - "packages/recipes/src/manifest-contracts.ts"
              - "packages/recipes/src/manifest.ts"
              - "packages/spec/schemas/agent-work-order-v2.schema.json"
              - "packages/spec/schemas/config.schema.json"
              - "packages/spec/schemas/task-handoff.schema.json"
              - "packages/spec/schemas/task-readme-frontmatter.schema.json"
              - "packages/spec/schemas/tasks-export.schema.json"
              - "packages/spec/schemas/workflow.schema.json"
              - "packages/testkit/src/agentplane-internal.ts"
              - "packages/testkit/src/candidate-publication.ts"
              - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
              - "packages/testkit/src/task.ts"
              - "schemas/agent-semantic-result.schema.json"
              - "schemas/agent-work-order-v2.schema.json"
              - "schemas/config.schema.json"
              - "schemas/execution-receipt.schema.json"
              - "schemas/task-handoff.schema.json"
              - "schemas/task-readme-frontmatter.schema.json"
              - "schemas/tasks-export.schema.json"
              - "schemas/workflow.schema.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/baselines/v0.7-pr6095-cli-review.json"
              - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
              - "scripts/bench/internal/paired-m05/app-server-port.mjs"
              - "scripts/bench/internal/paired-m05/boundary.mjs"
              - "scripts/bench/internal/paired-m05/boundary.test.mjs"
              - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
              - "scripts/bench/internal/paired-m05/contract.mjs"
              - "scripts/bench/internal/paired-m05/isolation.mjs"
              - "scripts/bench/internal/paired-m05/isolation.test.mjs"
              - "scripts/bench/internal/paired-m05/journal.mjs"
              - "scripts/bench/internal/paired-m05/landlock-runner.py"
              - "scripts/bench/internal/paired-m05/ledger.mjs"
              - "scripts/bench/internal/paired-m05/ledger.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
              - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
              - "scripts/bench/internal/paired-m05/report.mjs"
              - "scripts/bench/internal/paired-m05/report.test.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
              - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
              - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
              - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
              - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription.test.mjs"
              - "scripts/bench/paired-live-codex-launcher.mjs"
              - "scripts/bench/paired-live-codex-launcher.test.mjs"
              - "scripts/bench/paired-m05-offline.test.mjs"
              - "scripts/bench/paired-m05-setup.mjs"
              - "scripts/bench/paired-production-driver.mjs"
              - "scripts/bench/paired-production-driver.test.mjs"
              - "scripts/bench/paired-result-report.mjs"
              - "scripts/bench/paired-result-report.test.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/run-local-ci-group.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-failures-reporter.mjs"
              - "scripts/lib/verification-observation.mjs"
              - "scripts/lib/verification-observation.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
              - "scripts/lib/verification-scheduler.test.mjs"
              - "scripts/release/check-local-tarball-install-smoke.mjs"
              - "scripts/release/installed-recipe-matrix.mjs"
              - "scripts/workflow/prepare-hosted-task-closure.mjs"
              - "vitest.config.ts"
            evidence_digest: "sha256:252da5e7b09b306dba58cdf42ecb25bf6b37cc9dab5a7899c7a6e15624d7d312"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_evidence_digest: "sha256:75abbea527ab414ef3869185e907f8abdb640ece269c54493e5abfccf6cda5ed"
            request_digest: "sha256:7f513dc26a1cae8942181928970ef079c90fcf094e5a19372bd96615c9547b7a"
            request_task_revision: 7
            reviewed_base_import:
              canonical_record_digest: "sha256:e41ac1a1f6328b2313fc2020835fffc13940afbd9ec88019157aab0ea0ff9820"
              checkpoint_digest: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
              imported_paths:
                - ".agentplane/policy/context.must.md"
                - ".agentplane/policy/dod.core.md"
                - ".agentplane/policy/dod.docs.md"
                - ".agentplane/policy/examples/migration-note.md"
                - ".agentplane/policy/governance.md"
                - ".agentplane/policy/security.must.md"
                - ".agentplane/policy/workflow.branch_pr.md"
                - ".agentplane/policy/workflow.direct.md"
                - ".agentplane/policy/workflow.md"
                - ".agentplane/policy/workflow.release.md"
                - ".agentplane/policy/workflow.upgrade.md"
                - ".github/workflows/task-hosted-close.yml"
                - ".prettierignore"
                - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
                - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
                - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
                - "bun.lock"
                - "context/wiki/index.md"
                - "context/wiki/proposals/index.md"
                - "context/wiki/proposals/task-harvest/index.md"
                - "context/wiki/release-docs/concepts/index.md"
                - "context/wiki/release-docs/domains/index.md"
                - "context/wiki/release-docs/release-lines/index.md"
                - "context/wiki/reports/index.md"
                - "context/wiki/task-harvest/index.md"
                - "docs/developer/modular-prompt-assembly.mdx"
                - "docs/developer/testing-and-quality.mdx"
                - "docs/releases/v0.7.1.md"
                - "docs/releases/v0.7.13-acceptance.md"
                - "docs/releases/v0.7.13.md"
                - "docs/user/candidate-publication.md"
                - "docs/user/cli-reference.generated.mdx"
                - "docs/user/task-lifecycle.mdx"
                - "eslint.config.cjs"
                - "package.json"
                - "packages/agentplane/assets/AGENTS.md"
                - "packages/agentplane/assets/RUNNER.md"
                - "packages/agentplane/assets/policy/context.must.md"
                - "packages/agentplane/assets/policy/dod.core.md"
                - "packages/agentplane/assets/policy/dod.docs.md"
                - "packages/agentplane/assets/policy/examples/migration-note.md"
                - "packages/agentplane/assets/policy/governance.md"
                - "packages/agentplane/assets/policy/security.must.md"
                - "packages/agentplane/assets/policy/workflow.branch_pr.md"
                - "packages/agentplane/assets/policy/workflow.direct.md"
                - "packages/agentplane/assets/policy/workflow.md"
                - "packages/agentplane/assets/policy/workflow.release.md"
                - "packages/agentplane/assets/policy/workflow.upgrade.md"
                - "packages/agentplane/package.json"
                - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-scope-request-adapter.test.ts"
                - "packages/agentplane/src/agents/agents-template.test.ts"
                - "packages/agentplane/src/agents/agents-template.ts"
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/backends/task-backend/shared/types.ts"
                - "packages/agentplane/src/cli/command-invocations.ts"
                - "packages/agentplane/src/cli/error-map.ts"
                - "packages/agentplane/src/cli/help.all-commands.contract.test.ts"
                - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
                - "packages/agentplane/src/cli/reason-codes.ts"
                - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
                - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task-candidate.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task-recovery.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
                - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
                - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
                - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
                - "packages/agentplane/src/cli/run-cli/globals.ts"
                - "packages/agentplane/src/cli/spec/help.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/cli/verification-contract.test.ts"
                - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
                - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/context/assimilation-supervisor.unit.test.ts"
                - "packages/agentplane/src/commands/context/context.spec.ts"
                - "packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
                - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
                - "packages/agentplane/src/commands/evidence/evidence.command.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-close.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/flow-status.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
                - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
                - "packages/agentplane/src/commands/pr/internal/auto-commit-ancestry.test.ts"
                - "packages/agentplane/src/commands/pr/internal/auto-commit.test.ts"
                - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/pr/update.ts"
                - "packages/agentplane/src/commands/recipes.list.test.ts"
                - "packages/agentplane/src/commands/recipes/impl/index.ts"
                - "packages/agentplane/src/commands/shared/canonical-task-owner.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/shared/hook-shim-template.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity.ts"
                - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
                - "packages/agentplane/src/commands/shared/reconcile-canonical-scope.test.ts"
                - "packages/agentplane/src/commands/shared/reconcile-check.ts"
                - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
                - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
                - "packages/agentplane/src/commands/shared/route-guidance.ts"
                - "packages/agentplane/src/commands/shared/route-oracle.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-store.test.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-store.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
                - "packages/agentplane/src/commands/shared/source-confidence.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-mutation.ts"
                - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
                - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-publication-spec.ts"
                - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step.ts"
                - "packages/agentplane/src/commands/task/active.command.ts"
                - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
                - "packages/agentplane/src/commands/task/authority-grant.command.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-admission.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-context.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-context.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-executor.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-executor.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-git.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-git.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-receipt.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-request.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-request.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-tree.ts"
                - "packages/agentplane/src/commands/task/candidate-publication.command.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication.command.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.ts"
                - "packages/agentplane/src/commands/task/close-noop.command.ts"
                - "packages/agentplane/src/commands/task/close-noop.ts"
                - "packages/agentplane/src/commands/task/comment.ts"
                - "packages/agentplane/src/commands/task/comment.unit.test.ts"
                - "packages/agentplane/src/commands/task/configured-authority.test.ts"
                - "packages/agentplane/src/commands/task/configured-authority.ts"
                - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
                - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
                - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
                - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
                - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-authority-delta-stop.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-cutover.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/kernel-plan.ts"
                - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request-paths.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/commands/task/kernel-work-order.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.ts"
                - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
                - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                - "packages/agentplane/src/commands/task/run-render.ts"
                - "packages/agentplane/src/commands/task/scaffold.ts"
                - "packages/agentplane/src/commands/task/scope-approve-request.command.ts"
                - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                - "packages/agentplane/src/commands/task/verification-observation.test.ts"
                - "packages/agentplane/src/commands/task/verification-observation.ts"
                - "packages/agentplane/src/commands/workflow.test.ts"
                - "packages/agentplane/src/context/ingest-task-pack.test.ts"
                - "packages/agentplane/src/context/ingest-task.ts"
                - "packages/agentplane/src/context/knowledge-ref.ts"
                - "packages/agentplane/src/harness/state-machine.ts"
                - "packages/agentplane/src/policy/taxonomy.ts"
                - "packages/agentplane/src/ports/kernel-authority.ts"
                - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
                - "packages/agentplane/src/runner/context/recipe-role-context.ts"
                - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
                - "packages/agentplane/src/runner/context/work-order-context.ts"
                - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
                - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
                - "packages/agentplane/src/runner/result-manifest.ts"
                - "packages/agentplane/src/runner/run-record-profile.ts"
                - "packages/agentplane/src/runner/types/state.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
                - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
                - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
                - "packages/agentplane/src/runtime/harness/types.ts"
                - "packages/agentplane/src/runtime/prompt-modules/model.ts"
                - "packages/agentplane/src/runtime/sgr/contract-types.ts"
                - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
                - "packages/agentplane/src/runtime/task-execution-context/model.ts"
                - "packages/agentplane/src/shared/candidate-pre-push-script.ts"
                - "packages/agentplane/src/shared/package-paths.ts"
                - "packages/agentplane/src/shared/preparation-trace.ts"
                - "packages/agentplane/src/shared/sqlite-driver.ts"
                - "packages/agentplane/src/workflow-runtime/migration.ts"
                - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
                - "packages/core/package.json"
                - "packages/core/schemas/agent-work-order-v2.schema.json"
                - "packages/core/schemas/config.schema.json"
                - "packages/core/schemas/task-handoff.schema.json"
                - "packages/core/schemas/task-readme-frontmatter.schema.json"
                - "packages/core/schemas/tasks-export.schema.json"
                - "packages/core/schemas/workflow.schema.json"
                - "packages/core/src/config/schema.impl.ts"
                - "packages/core/src/git/git-utils.ts"
                - "packages/core/src/index.ts"
                - "packages/core/src/process/run-process.observation.test.ts"
                - "packages/core/src/process/run-process.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/core/src/runner/knowledge-ref.ts"
                - "packages/core/src/runner/recipe-role-context.test.ts"
                - "packages/core/src/runner/recipe-role-context.ts"
                - "packages/core/src/runner/runner-effect-operation.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/schemas/index.ts"
                - "packages/core/src/schemas/iso-timestamp.test.ts"
                - "packages/core/src/schemas/iso-timestamp.ts"
                - "packages/core/src/tasks/index.ts"
                - "packages/core/src/tasks/kernel-plan-refinement.ts"
                - "packages/core/src/tasks/kernel-semantic.ts"
                - "packages/core/src/tasks/plan-execution-grant.ts"
                - "packages/core/src/tasks/supplied-plan-aggregate.ts"
                - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
                - "packages/core/src/tasks/task-artifact-schema.shared.ts"
                - "packages/core/src/tasks/task-centric/model.ts"
                - "packages/core/src/tasks/task-centric/schema.ts"
                - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/bookkeeping.test.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
                - "packages/core/src/tasks/task-kernel/final-recovery.test.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/invariants.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/model.ts"
                - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
                - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
                - "packages/core/src/tasks/task-store.ts"
                - "packages/recipes/package.json"
                - "packages/recipes/src/compiled-contracts.ts"
                - "packages/recipes/src/manifest-contracts.ts"
                - "packages/recipes/src/manifest.ts"
                - "packages/spec/schemas/agent-work-order-v2.schema.json"
                - "packages/spec/schemas/config.schema.json"
                - "packages/spec/schemas/task-handoff.schema.json"
                - "packages/spec/schemas/task-readme-frontmatter.schema.json"
                - "packages/spec/schemas/tasks-export.schema.json"
                - "packages/spec/schemas/workflow.schema.json"
                - "packages/testkit/src/agentplane-internal.ts"
                - "packages/testkit/src/candidate-publication.ts"
                - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
                - "packages/testkit/src/task.ts"
                - "schemas/agent-semantic-result.schema.json"
                - "schemas/agent-work-order-v2.schema.json"
                - "schemas/config.schema.json"
                - "schemas/execution-receipt.schema.json"
                - "schemas/task-handoff.schema.json"
                - "schemas/task-readme-frontmatter.schema.json"
                - "schemas/tasks-export.schema.json"
                - "schemas/workflow.schema.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/baselines/v0.7-pr6095-cli-review.json"
                - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
                - "scripts/bench/internal/paired-m05/app-server-port.mjs"
                - "scripts/bench/internal/paired-m05/boundary.mjs"
                - "scripts/bench/internal/paired-m05/boundary.test.mjs"
                - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
                - "scripts/bench/internal/paired-m05/contract.mjs"
                - "scripts/bench/internal/paired-m05/isolation.mjs"
                - "scripts/bench/internal/paired-m05/isolation.test.mjs"
                - "scripts/bench/internal/paired-m05/journal.mjs"
                - "scripts/bench/internal/paired-m05/landlock-runner.py"
                - "scripts/bench/internal/paired-m05/ledger.mjs"
                - "scripts/bench/internal/paired-m05/ledger.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
                - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
                - "scripts/bench/internal/paired-m05/report.mjs"
                - "scripts/bench/internal/paired-m05/report.test.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
                - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
                - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
                - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
                - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
                - "scripts/bench/paired-m05-offline.test.mjs"
                - "scripts/bench/paired-m05-setup.mjs"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/run-local-ci-group.mjs"
                - "scripts/checks/run-local-ci.mjs"
                - "scripts/lib/local-ci-resource-profile.mjs"
                - "scripts/lib/local-ci-resource-profile.test.mjs"
                - "scripts/lib/verification-failures-reporter.mjs"
                - "scripts/lib/verification-observation.mjs"
                - "scripts/lib/verification-observation.test.mjs"
                - "scripts/lib/verification-scheduler.d.ts"
                - "scripts/lib/verification-scheduler.mjs"
                - "scripts/lib/verification-scheduler.test.mjs"
                - "scripts/release/check-local-tarball-install-smoke.mjs"
                - "scripts/release/installed-recipe-matrix.mjs"
                - "scripts/workflow/prepare-hosted-task-closure.mjs"
                - "vitest.config.ts"
              mutation_receipt_digest: "sha256:fd854ffcb16b24d8d11fc1386aee313e5cd35bc7b68beb4949f3cc99182bfa60"
              new_commit: "e63616f2bfa7ccd031e212375d4929eb257df208"
              old_commit: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:c98f67d1e599680f4b64996b2b2ef2f550f52fbb5a03cc2910a8ee5cb2e24b25"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:aff297db6210fe068809850c0ca5e0dd01a96d175923b8d7af7c458b41229af0"
        digest: "sha256:14a9d7a78f0683757b1696e1610bff7c563a36ebca4e5d95747dc074a572ea19"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:40125ba73cc5725b797473699f1732930095099b9dc6487771b9aca9d584c97e"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            expected_outputs:
              - "renewal-rework-proof"
            id: "authenticate-renewed-rework"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:4a8574b36725f0451f6bc9edf6394912e0a239b3b9c5ef7602c74420dd61ebb4"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:0b9cf30465adbaf6fa883b8bee825937c2aeff3dd529353c44520766c4030536"
          environment_digest: "sha256:cb0baf405abbbd1f52ae13dff1758ad4573d1b415b116caa4cffc01d2c72f07b"
          implementation_identity: "sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
          toolchain_digest: "sha256:7e00f7849598351e1fdbdd6534b6f121aa24021d57e8d9ea3cf88954e41dc3d8"
        observed_at: "2026-10-11T11:50:28.782Z"
        status: "PASSED"
      id: "202610110406-P2ADDS"
      intent_digest: "sha256:d3623ad1be53ad4c78dc5f68bd7c4886161123059018b02834305f7e66b955fa"
      migration_receipts: []
      mutation_receipts:
        capture:202610110406-P2ADDS:
          after_revision: 1
          aggregate_digest: "sha256:71b44eead2ef4dd8ce6c3665f9a88a7cbfb3cf118db7ef793dbf3c89d533ea20"
          before_revision: 0
          command_digest: "sha256:f5127cc72ed1456d2496860f1c3f276d6d6bdb4b6825ad4c67bdcc01740c0625"
          effect_ids: []
          event_digests:
            - "sha256:2ff1c7011cce13412412cc8344cdeac6599c61d3212eca9b5e020a58378d690c"
          mutation_id: "capture:202610110406-P2ADDS"
        final-validation:sha256:4a8574b36725f0451f6bc9edf6394912e0a239b3b9c5ef7602c74420dd61ebb4:12:
          after_revision: 13
          aggregate_digest: "sha256:4c83c1ce0df6dd916cbe1480667c69e038cfbe369c9efcb73b11a98bc3184c74"
          before_revision: 12
          command_digest: "sha256:362d38aa514256c67a04cb9778d858be4eae36293a32f933d179f22a3327f773"
          effect_ids: []
          event_digests:
            - "sha256:482ca571fc76784ff4bc0b3f54ad8c0812d56e89edc66f33b8b033f4af505b33"
          mutation_id: "final-validation:sha256:4a8574b36725f0451f6bc9edf6394912e0a239b3b9c5ef7602c74420dd61ebb4:12"
        kernel_task_completion_required:sha256:410d703ebca3fbb40503673617a5655849d92506e0d28c96e30dbd0a4b53ce95:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0:
          after_revision: 14
          aggregate_digest: "sha256:fff4bb45b97f3a589aaf4bd1b47820b814ac327212bd4020b154345c3a73efd6"
          before_revision: 13
          command_digest: "sha256:55fd6a4527025080737fcc43244c03d75e4322d48cef849f6579c718b06121b7"
          effect_ids: []
          event_digests:
            - "sha256:f4ab10093329e02f8619eeb2ce9adfd52572d16521bfcf7a3b769f24ac6d2cef"
          mutation_id: "kernel_task_completion_required:sha256:410d703ebca3fbb40503673617a5655849d92506e0d28c96e30dbd0a4b53ce95:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
        kernel_work_item_claim_required:sha256:2bcbcd37d274d9994789e53878864e7d912f4d7146db11ddb2a12005632f351e:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 5
          aggregate_digest: "sha256:f4c0a189b1396623d9fcf8b29ad8ae1dfae4e2617e149b211d4c486b4b0e6df5"
          before_revision: 4
          command_digest: "sha256:ea8908830c21560a675cf1a44b980ad886e623f654fbe3f526f152d3cc08fc49"
          effect_ids: []
          event_digests:
            - "sha256:63ff18a1fb74b441970a1280dc0754918660e062b21b2a6de7c7f2ac5e2708a4"
          mutation_id: "kernel_work_item_claim_required:sha256:2bcbcd37d274d9994789e53878864e7d912f4d7146db11ddb2a12005632f351e:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        kernel_work_item_execution_required:sha256:2f2b9dc97f4b97ff3c7d0ed281b5396cbd34a44a53188cd67de6c35103b273e6:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:80e87d3bf8bdb21eb537307339a55fa13fa6cf31c2b361b772edc84c0cea88c9"
          before_revision: 6
          command_digest: "sha256:a8c303cf184721327ecd95aa4dcb3412aab0d05cf17711de483f053580bb0916"
          effect_ids: []
          event_digests:
            - "sha256:1cd80490cd289e64b8af8e91989753b21c19be9ebc09304340174ea24dc0a667"
          mutation_id: "kernel_work_item_execution_required:sha256:2f2b9dc97f4b97ff3c7d0ed281b5396cbd34a44a53188cd67de6c35103b273e6:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_inspection_required:sha256:fbdc9f6191d9bf69c1f7888ddb8a4473f2c373777d685161172eaeba823c426c:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0:
          after_revision: 10
          aggregate_digest: "sha256:48039d3a6975434bfa943fddce1e26ed9f130b95f67b7afe98ba9a6aacfb2587"
          before_revision: 9
          command_digest: "sha256:8ec2f65cbb38eff374a423a268a0e387e102b1004ea6d3e5e4be4255d3c5fb6e"
          effect_ids: []
          event_digests:
            - "sha256:831aa55f87e6e5354ebdb7d35cfceca98ae9d73f808e50c401284b08b2de1474"
          mutation_id: "kernel_work_item_inspection_required:sha256:fbdc9f6191d9bf69c1f7888ddb8a4473f2c373777d685161172eaeba823c426c:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
        kernel_work_item_materialization_required:sha256:a48920e7ac84ed56e37d2d5981dbac8e39eb6a27dbd5926b3504b739b8f74db9:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 4
          aggregate_digest: "sha256:61b04323644624a9549c6792f5944989a6047fa54c80d4beb9bbb8e12904e242"
          before_revision: 3
          command_digest: "sha256:a1db9814b19c74058dfd1b6c16552435e637a9a282a6e003be613f8bd2bd26f0"
          effect_ids: []
          event_digests:
            - "sha256:91e673cf6f901257f913ee8e51178f8e5d0138b5353bf7aa4d31965364dd0cb5"
          mutation_id: "kernel_work_item_materialization_required:sha256:a48920e7ac84ed56e37d2d5981dbac8e39eb6a27dbd5926b3504b739b8f74db9:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        result:sha256:70d2d43946f3d10ec1c08b7633c670fa87b9f9fa1fff5939145996c0f372967e:
          after_revision: 2
          aggregate_digest: "sha256:c06e851cd7f03f93055f6946a4c45c532c736f829f7b216049da41825277fbcb"
          before_revision: 1
          command_digest: "sha256:9d2e9907bf24fa0720094c2e2d59fdf10c79979b76ff6ec394ecbfa884bd0a15"
          effect_ids: []
          event_digests:
            - "sha256:5f13f4b16b87418ee2da4cc02918b7b1afdbd99d0f03342e61bace9005d0fe3c"
          mutation_id: "result:sha256:70d2d43946f3d10ec1c08b7633c670fa87b9f9fa1fff5939145996c0f372967e"
        result:sha256:a8bbbc4ecaa88b4ce29253b6ffd7c9932b8b33cc74549cd09a74110a09378d81:
          after_revision: 9
          aggregate_digest: "sha256:9c62bb125010917ca71ad391225a6ca111256c6122eaa6e3a42ff77484a4196c"
          before_revision: 8
          command_digest: "sha256:f4e9e77cc1f219c9086f5c4e7c784c37fecfa6f20053e7ff95ef1e9001c4fd07"
          effect_ids: []
          event_digests:
            - "sha256:87811951f5b668c15399cc3b53ace2a007b7c10476d31bc6bc5c95543563efd7"
          mutation_id: "result:sha256:a8bbbc4ecaa88b4ce29253b6ffd7c9932b8b33cc74549cd09a74110a09378d81"
        sha256:9accb103ce3999584bd0d0a10ec328b4242d0a0e2b3157ab7a7602519645b2f5:
          after_revision: 6
          aggregate_digest: "sha256:697cbb0479b6502ba523b9b1cda649ee2008357fcea49970131f233a7f882405"
          before_revision: 5
          command_digest: "sha256:718e9f4659c870df6dca2432198e48c461d7f0aedbf179ffa0d7fbb83d79fdf9"
          effect_ids: []
          event_digests:
            - "sha256:b6af119174ff4be57506ccf32117e3709d4457a282564dfa6bb1ad8b330698cc"
          mutation_id: "sha256:9accb103ce3999584bd0d0a10ec328b4242d0a0e2b3157ab7a7602519645b2f5"
        sha256:a00284f6973d270184f09eb6a49265c735ab01c531a597cffdfc2571d348284f:
          after_revision: 8
          aggregate_digest: "sha256:428a1bee9796f8c3f8ccae42f8c567807a3f8726e9c36871045e6686073ad342"
          before_revision: 7
          command_digest: "sha256:489d7b0de830add96193e52082cc534a9cebc2aa3126fb2a280768c3985aae0e"
          effect_ids: []
          event_digests:
            - "sha256:5b377415689c19162f3ce7c0fe253a992483b1249643b01f3f47f90438182fdd"
          mutation_id: "sha256:a00284f6973d270184f09eb6a49265c735ab01c531a597cffdfc2571d348284f"
        sha256:aeb156646c1ea0104c8f192333257a4d7437f8a0f5eea94874f60011bb4481d7:
          after_revision: 3
          aggregate_digest: "sha256:cd2b4bc3ccef53c42a179bec9d40d5de657106f6fbb63d0eed15425e2d52b188"
          before_revision: 2
          command_digest: "sha256:9fa83fe9e19ff49fb381e28e2d3977eaed2a6d90d42893ecab57a9e620173f72"
          effect_ids: []
          event_digests:
            - "sha256:9f7a824f28425e2ad9edf7685e1ed298467e7e05043e54c75d8a5744309dda28"
          mutation_id: "sha256:aeb156646c1ea0104c8f192333257a4d7437f8a0f5eea94874f60011bb4481d7"
        validation-resolution:sha256:6c4095285f8596249bb2a1ffba85cbc527b72a56221b15b3660dafc3cb307dc0:
          after_revision: 12
          aggregate_digest: "sha256:6dc7ba906646cc02cbe4e0809c3dc4059f1e6ae8c01261583bdc18cf8d730e38"
          before_revision: 11
          command_digest: "sha256:447a58b55428af373949d6827f0712e54ed0a224ed0b185d753f1af1c5730d58"
          effect_ids: []
          event_digests:
            - "sha256:20dfffc28fd28d1812e82c179f1834de2c7357cb61cd1e90e283fe3c741bb639"
          mutation_id: "validation-resolution:sha256:6c4095285f8596249bb2a1ffba85cbc527b72a56221b15b3660dafc3cb307dc0"
        validation:sha256:ffd44b2c3f01a5b99e055a71b52022b55a5cc01a65e7cd0e31018ab926c3eb96:
          after_revision: 11
          aggregate_digest: "sha256:86ca9d985a6406ba947718f541c23b5383072962eb10a1fb658c9da1e7109a05"
          before_revision: 10
          command_digest: "sha256:877c0cec8139f9912334c46c5c869a7304118da9d5cb1fd53f06fe04dec5079b"
          effect_ids: []
          event_digests:
            - "sha256:2394d3f7edbf10dfac1b992241122771993c8ab6abdc9225dc52ecbc7268675c"
          mutation_id: "validation:sha256:ffd44b2c3f01a5b99e055a71b52022b55a5cc01a65e7cd0e31018ab926c3eb96"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        authenticate-renewed-rework:
          attempt: 1
          claim_id: "sha256:500a8ba907bb79fe3f20de3e43cc9ba2ed2a84373729bd93f563283dd7e8e8ac"
          definition:
            contract_digest: "sha256:40125ba73cc5725b797473699f1732930095099b9dc6487771b9aca9d584c97e"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            expected_outputs:
              - "renewal-rework-proof"
            id: "authenticate-renewed-rework"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:b63f45ae9370d213549d2596edb2f0e8afc386a4b9481ce9ca6d55f9a617ef2e"
              id: "renewal-rework-proof"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
              task_id: "202610110406-P2ADDS"
              work_item_id: "authenticate-renewed-rework"
          result_digest: "sha256:6163b64ef79b5c8e46d2d3a347a086ce1dd912af2587e74df74aef40471c25b0"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a7278738e13c5f9969ceabcb57644dc205e4b1e449a199fe3db918f1cb20d507"
              - "sha256:d9a72639de917a2a404d899f07b5ad48b34d0286985ff61738bc96a3ee63b506"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:0b9cf30465adbaf6fa883b8bee825937c2aeff3dd529353c44520766c4030536"
              environment_digest: "sha256:919c772ce5ca66fda273d5001e0a351d17946f5fc75c04d51a28a32e1084562b"
              implementation_identity: "sha256:6163b64ef79b5c8e46d2d3a347a086ce1dd912af2587e74df74aef40471c25b0"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-11T11:49:54.776Z"
            status: "PASSED"
    digest: "sha256:c5b0938b5d82ab742e8d67b355301d3a754d5ac50a50618ec121ac33250430de"
    documents:
      contracts:
        sha256:40125ba73cc5725b797473699f1732930095099b9dc6487771b9aca9d584c97e:
          acceptance_criteria:
            - "Select renewal command only for policy_renewal observation; preserve ordinary continuation compatibility and all existing validation."
            - "Use genuine reducer-accepted renewal, semantic stop and approved amendment to prove new rework evidence admission."
            - "Reject forged command kind, receipt/event digests, substituted authority and fingerprint; no synthetic historical receipt."
            - "Retain baseline RED and focused GREEN evidence; independent review required. Do not mutate XZZ or execute provider effects."
            - "Implement in isolated reviewed current integration checkout with honest native or approved operator provenance. Defer broad regression until orchestrator lane is available."
          objective: "Recognize authentic renew_policy_authority issuance history by exact typed command reconstruction, preserving native event/receipt, revision, delegated authority and fingerprint checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts packages/agentplane/src/commands/task/kernel-rework-proof.test.ts --maxWorkers=1"
            - "bun run typecheck"
      intent:
        context: "Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied."
        objective: "Authenticate policy renewal receipts in retained rework authority"
    events:
      -
        command_digest: "sha256:f5127cc72ed1456d2496860f1c3f276d6d6bdb4b6825ad4c67bdcc01740c0625"
        id: "capture:202610110406-P2ADDS:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610110406-P2ADDS"
        occurred_at: "2026-10-11T04:07:13.928Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610110406-P2ADDS"
        task_revision: 1
      -
        command_digest: "sha256:9d2e9907bf24fa0720094c2e2d59fdf10c79979b76ff6ec394ecbfa884bd0a15"
        id: "result:sha256:70d2d43946f3d10ec1c08b7633c670fa87b9f9fa1fff5939145996c0f372967e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:70d2d43946f3d10ec1c08b7633c670fa87b9f9fa1fff5939145996c0f372967e"
        occurred_at: "2026-10-11T04:08:34.415Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610110406-P2ADDS"
        task_revision: 2
      -
        command_digest: "sha256:9fa83fe9e19ff49fb381e28e2d3977eaed2a6d90d42893ecab57a9e620173f72"
        id: "sha256:aeb156646c1ea0104c8f192333257a4d7437f8a0f5eea94874f60011bb4481d7:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:aeb156646c1ea0104c8f192333257a4d7437f8a0f5eea94874f60011bb4481d7"
        occurred_at: "2026-10-11T04:09:08.462Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610110406-P2ADDS"
        task_revision: 3
      -
        command_digest: "sha256:a1db9814b19c74058dfd1b6c16552435e637a9a282a6e003be613f8bd2bd26f0"
        id: "kernel_work_item_materialization_required:sha256:a48920e7ac84ed56e37d2d5981dbac8e39eb6a27dbd5926b3504b739b8f74db9:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a48920e7ac84ed56e37d2d5981dbac8e39eb6a27dbd5926b3504b739b8f74db9:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-11T04:09:43.908Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610110406-P2ADDS"
        task_revision: 4
      -
        command_digest: "sha256:ea8908830c21560a675cf1a44b980ad886e623f654fbe3f526f152d3cc08fc49"
        id: "kernel_work_item_claim_required:sha256:2bcbcd37d274d9994789e53878864e7d912f4d7146db11ddb2a12005632f351e:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:2bcbcd37d274d9994789e53878864e7d912f4d7146db11ddb2a12005632f351e:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-11T04:10:27.542Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610110406-P2ADDS"
        task_revision: 5
      -
        command_digest: "sha256:718e9f4659c870df6dca2432198e48c461d7f0aedbf179ffa0d7fbb83d79fdf9"
        id: "sha256:9accb103ce3999584bd0d0a10ec328b4242d0a0e2b3157ab7a7602519645b2f5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9accb103ce3999584bd0d0a10ec328b4242d0a0e2b3157ab7a7602519645b2f5"
        occurred_at: "2026-10-11T11:37:25.617Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610110406-P2ADDS"
        task_revision: 6
      -
        command_digest: "sha256:a8c303cf184721327ecd95aa4dcb3412aab0d05cf17711de483f053580bb0916"
        id: "kernel_work_item_execution_required:sha256:2f2b9dc97f4b97ff3c7d0ed281b5396cbd34a44a53188cd67de6c35103b273e6:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2f2b9dc97f4b97ff3c7d0ed281b5396cbd34a44a53188cd67de6c35103b273e6:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-11T11:37:48.792Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610110406-P2ADDS"
        task_revision: 7
      -
        command_digest: "sha256:489d7b0de830add96193e52082cc534a9cebc2aa3126fb2a280768c3985aae0e"
        id: "sha256:a00284f6973d270184f09eb6a49265c735ab01c531a597cffdfc2571d348284f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a00284f6973d270184f09eb6a49265c735ab01c531a597cffdfc2571d348284f"
        occurred_at: "2026-10-11T11:42:34.624Z"
        payload_digest: "sha256:091791069d94218d4e5cb430d38bb9b9386610c2f3faf8fe11181e8417113cf8"
        task_id: "202610110406-P2ADDS"
        task_revision: 8
      -
        command_digest: "sha256:f4e9e77cc1f219c9086f5c4e7c784c37fecfa6f20053e7ff95ef1e9001c4fd07"
        id: "result:sha256:a8bbbc4ecaa88b4ce29253b6ffd7c9932b8b33cc74549cd09a74110a09378d81:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a8bbbc4ecaa88b4ce29253b6ffd7c9932b8b33cc74549cd09a74110a09378d81"
        occurred_at: "2026-10-11T11:47:31.795Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610110406-P2ADDS"
        task_revision: 9
      -
        command_digest: "sha256:8ec2f65cbb38eff374a423a268a0e387e102b1004ea6d3e5e4be4255d3c5fb6e"
        id: "kernel_work_item_inspection_required:sha256:fbdc9f6191d9bf69c1f7888ddb8a4473f2c373777d685161172eaeba823c426c:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fbdc9f6191d9bf69c1f7888ddb8a4473f2c373777d685161172eaeba823c426c:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
        occurred_at: "2026-10-11T11:47:43.862Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610110406-P2ADDS"
        task_revision: 10
      -
        command_digest: "sha256:877c0cec8139f9912334c46c5c869a7304118da9d5cb1fd53f06fe04dec5079b"
        id: "validation:sha256:ffd44b2c3f01a5b99e055a71b52022b55a5cc01a65e7cd0e31018ab926c3eb96:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ffd44b2c3f01a5b99e055a71b52022b55a5cc01a65e7cd0e31018ab926c3eb96"
        occurred_at: "2026-10-11T11:50:07.970Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610110406-P2ADDS"
        task_revision: 11
      -
        command_digest: "sha256:447a58b55428af373949d6827f0712e54ed0a224ed0b185d753f1af1c5730d58"
        id: "validation-resolution:sha256:6c4095285f8596249bb2a1ffba85cbc527b72a56221b15b3660dafc3cb307dc0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:6c4095285f8596249bb2a1ffba85cbc527b72a56221b15b3660dafc3cb307dc0"
        occurred_at: "2026-10-11T11:50:16.176Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610110406-P2ADDS"
        task_revision: 12
      -
        command_digest: "sha256:362d38aa514256c67a04cb9778d858be4eae36293a32f933d179f22a3327f773"
        id: "final-validation:sha256:4a8574b36725f0451f6bc9edf6394912e0a239b3b9c5ef7602c74420dd61ebb4:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:4a8574b36725f0451f6bc9edf6394912e0a239b3b9c5ef7602c74420dd61ebb4:12"
        occurred_at: "2026-10-11T11:50:59.296Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610110406-P2ADDS"
        task_revision: 13
      -
        command_digest: "sha256:55fd6a4527025080737fcc43244c03d75e4322d48cef849f6579c718b06121b7"
        id: "kernel_task_completion_required:sha256:410d703ebca3fbb40503673617a5655849d92506e0d28c96e30dbd0a4b53ce95:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:410d703ebca3fbb40503673617a5655849d92506e0d28c96e30dbd0a4b53ce95:sha256:983722949e32622fd08fac6eae433057c914cb0c8c8ab5906ccaf00088edbab0"
        occurred_at: "2026-10-11T11:51:10.711Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610110406-P2ADDS"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Authenticate policy renewal receipts in retained rework authority

Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied.

## Scope

- In scope: Repair retainedIssuanceAuthority for genuine renew_policy_authority events while preserving complete event/receipt/delegated-authority/fingerprint validation. Reproduce XZZGWH revision8 renewal followed by semantic stop, approved amendment and attempt2. Add forged-kind and receipt negatives. No XZZ mutation or external effects. Use isolated reviewed c390 integration base; defer broad tests while AGR lane is occupied.
- Out of scope: unrelated refactors not required for "Authenticate policy renewal receipts in retained rework authority".

## Plan

1. Execute approved WorkItem authenticate-renewed-rework.

## Verify Steps

PLANNER fallback scaffold for "Authenticate policy renewal receipts in retained rework authority". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Authenticate policy renewal receipts in retained rework authority". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
