---
id: "202610101212-RDPWEM"
title: "Bind publication base to authenticated reviewed import"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T12:14:51.649Z"
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
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
          - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
          - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
          - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
      digest: "sha256:8703396c720806cb1faf0487f0ce45ea9b357791d545858007833c7b97cdad1a"
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
doc_updated_at: "2026-10-10T12:12:30.002Z"
doc_updated_by: "CODER"
description: "Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review."
sections:
  Summary: |-
    Bind publication base to authenticated reviewed import

    Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
  Scope: |-
    - In scope: Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
    - Out of scope: unrelated refactors not required for "Bind publication base to authenticated reviewed import".
  Plan: "1. Execute approved WorkItem bind-reviewed-publication-base."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
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
            digest: "sha256:daf77c13963c01f0463aedc3efe61bfe1c2d7ec36151bd266a61fad1e160f197"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
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
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
            task_id: "202610101212-RDPWEM"
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
            digest: "sha256:1856f2a4c38a0acb5e6247e17cbeb6b39f2a7b2aad1a74b06b36a32a85813e3a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:daf77c13963c01f0463aedc3efe61bfe1c2d7ec36151bd266a61fad1e160f197"
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
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
            task_id: "202610101212-RDPWEM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:321b8d4ece9e6c33ceb897f4b307fef72d4819ad27cbfd22e39f68c12d12735b"
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
            digest: "sha256:0662fc5b3b560245e60bb2ed6dab23d17f16913b1135b843ec330eb2ebb44bc5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
              kind: "USER"
              parent_authority_digest: "sha256:1856f2a4c38a0acb5e6247e17cbeb6b39f2a7b2aad1a74b06b36a32a85813e3a"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
            task_id: "202610101212-RDPWEM"
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
              - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
              - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
              - "vitest.config.ts"
            evidence_digest: "sha256:175d8d2007ea5f7b855740d07b5611ef28db6c94299969003186266e31e900a9"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_evidence_digest: "sha256:3cff8f94bc83103f644580755b48e941eed692138ca7358e2a36ea6ad059ce15"
            request_digest: "sha256:5f853b682f1abe010ad02764b1767ce48212c1dd60e6f73e70df1b0cfe5a71e9"
            request_task_revision: 7
            reviewed_base_import:
              canonical_record_digest: "sha256:e2ce97c37ee4d277a9135ca76381de857e7ebe856d2e10d57f1794d465c453f0"
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
                - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
                - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
                - "vitest.config.ts"
              mutation_receipt_digest: "sha256:f36c634e7f221d439c112a22ffd15da6c8b94e69f53cabea783037ba5c9c8c1f"
              new_commit: "7b46bd63fa10785c36420ee627c01d814171497b"
              old_commit: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:2ae1e632921bd3baf6c83eb0139ef11b3a057ce1decfdb222e584fb453c1dc41"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
        digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
            expected_outputs:
              - "publication-base-repair-evidence"
            id: "bind-reviewed-publication-base"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:c15dbdd7b34efb5ca99d37e5a2c29956bc0b08561f2d43bbea64ced9cbb5da17"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:686a612910f5d767f51012c2965539c3fdf0636f96fd761872498b108e000239"
          environment_digest: "sha256:444e5c46d56120373f1f97a895ea8f60c0419f57b2211fd0f45e587a539f3427"
          implementation_identity: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
          toolchain_digest: "sha256:1fde6d7742ab0d57509f99bec1d74d01d859e7caec9ce895a8ca705211135755"
        observed_at: "2026-10-10T18:21:47.840Z"
        status: "PASSED"
      id: "202610101212-RDPWEM"
      intent_digest: "sha256:441c567517183ea00fa7e0de6fa24e214e9faf872e3507a261bb89218174909a"
      migration_receipts: []
      mutation_receipts:
        capture:202610101212-RDPWEM:
          after_revision: 1
          aggregate_digest: "sha256:71988ac9a7219bcf3780ef4e0684651a8f0a95db6e0a03188f203c863975de66"
          before_revision: 0
          command_digest: "sha256:dba1511268d58b128ddc88cf91692ef759b53c3f580d5cb442b37450d1e1b82b"
          effect_ids: []
          event_digests:
            - "sha256:23fa5d60c87aef36e038107e479bfe63571e9a31f8d690adaf607627c5fd6c4a"
          mutation_id: "capture:202610101212-RDPWEM"
        final-validation:sha256:c15dbdd7b34efb5ca99d37e5a2c29956bc0b08561f2d43bbea64ced9cbb5da17:12:
          after_revision: 13
          aggregate_digest: "sha256:df3e70742324e1380329a4e3f0b63f84d17665ba63c50c3126a4663cfde971cd"
          before_revision: 12
          command_digest: "sha256:7f8445651e704531df761720dd2b9c0714e969a07e7f109d46e1446e69e7361c"
          effect_ids: []
          event_digests:
            - "sha256:47f51c26eda9339f06d0da1afe75024f0232ff6ed61d3b51a95bd10333f0aa29"
          mutation_id: "final-validation:sha256:c15dbdd7b34efb5ca99d37e5a2c29956bc0b08561f2d43bbea64ced9cbb5da17:12"
        kernel_task_completion_required:sha256:7d6f882be1e8e94a4aa2e4998fd812eb7a69c6253dd9917b08fa17b8aa2a497a:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 14
          aggregate_digest: "sha256:fe847c015f29cc44aa6d9e5b2fbfedd110028c9384b8c7e6b5a151dd7dd86806"
          before_revision: 13
          command_digest: "sha256:d7a27aeab24e0d6ea206baa0d4f9bb512f6f3769a599060fb3f87552ccb6b6c9"
          effect_ids: []
          event_digests:
            - "sha256:362f3f739c3e447defb1b889ba3ba2ef47229f90a90bfda1f6a2c9e482e5cd21"
          mutation_id: "kernel_task_completion_required:sha256:7d6f882be1e8e94a4aa2e4998fd812eb7a69c6253dd9917b08fa17b8aa2a497a:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 5
          aggregate_digest: "sha256:606e5621ff4f9fe4b662a2c74bac9977304886b466938da31607c67eb039164e"
          before_revision: 4
          command_digest: "sha256:0a8b604ea2839897f934c2f310c406b0a2e30278855d0b8be1dadd4b30880854"
          effect_ids: []
          event_digests:
            - "sha256:563c1890bda147f4c3b8d0694010257c2c41063c5ded60daf5b11449d6d5760f"
          mutation_id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        kernel_work_item_execution_required:sha256:d73418f8ae855bb404cac1549a1e60edaee1609b63a46256445712ec38676f24:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:3081ca2542bc3dcc95f23c428ce5344c35fa3f9144a8a1a3aab2c77217330aea"
          before_revision: 6
          command_digest: "sha256:10b59f26b5224fa0daae1db46426fd1d29e834b7383495478970a12490162fec"
          effect_ids: []
          event_digests:
            - "sha256:020303cf2b15ca43a8103187ee24d17b5da5d0c6be779bf20e2edc1771173888"
          mutation_id: "kernel_work_item_execution_required:sha256:d73418f8ae855bb404cac1549a1e60edaee1609b63a46256445712ec38676f24:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_inspection_required:sha256:ea09465c4fff0e58c96e74b19c3ea397d213aa37e663325e213b621a8308174b:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 10
          aggregate_digest: "sha256:06c16e193179d1d483b5ca1eb363e946cb06108fc26dfc90c3cf80a340567a6f"
          before_revision: 9
          command_digest: "sha256:07d76e125a8088711a6fb8227f5bbe5d91cfda9cab7529a3737de302d73c4b82"
          effect_ids: []
          event_digests:
            - "sha256:dd38c127adf2a82e1d94297a2e558d2e75587c1987959b3ba851d74d8aeaab08"
          mutation_id: "kernel_work_item_inspection_required:sha256:ea09465c4fff0e58c96e74b19c3ea397d213aa37e663325e213b621a8308174b:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 4
          aggregate_digest: "sha256:94e70d288f7fdf0d4a200ceccde6a6b445d3733345a17eefc942bbeb2f543839"
          before_revision: 3
          command_digest: "sha256:fa504306923802f36810f27dd5babc251db64c1400908b1054c31a1870bbdb19"
          effect_ids: []
          event_digests:
            - "sha256:97c997dc9575c062b3d2956939ff20a94901b1b7bc9db304d34fb36a61890266"
          mutation_id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        result:sha256:b70b3de2de20a20c0ccab863c2f11aba8c18772cfb18264215d081b0046a9a7c:
          after_revision: 9
          aggregate_digest: "sha256:5733cb7a7005b0d1ebd31eb6723524d364dbc1d05ff4d7f32261497bf0c406fc"
          before_revision: 8
          command_digest: "sha256:943d12b141104f128b66f59ac6ef52cc23e58f1692a93caf7dfe8b46044d8b58"
          effect_ids: []
          event_digests:
            - "sha256:726a9cf763b11c3b3b2228d66201d0ca378032f21db1b4c0518ab3f34732266d"
          mutation_id: "result:sha256:b70b3de2de20a20c0ccab863c2f11aba8c18772cfb18264215d081b0046a9a7c"
        result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6:
          after_revision: 2
          aggregate_digest: "sha256:065def9684fbb8b84a7d744aec5585d15a25265215fbbed1e90d39e33a26f2bf"
          before_revision: 1
          command_digest: "sha256:ac050e04beac99197e7ace8c71dfd6e87f3de6a972cab37c0a0876a3d0c4ed30"
          effect_ids: []
          event_digests:
            - "sha256:35a94ae123be2cd05d0d284a8ed25e44e1466cf935aa5093e18a70e5f8ae77e4"
          mutation_id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6"
        sha256:1059c4b8aaea44bad7d9f305097e4ed3dc966555f9a1f98a7c7150fe5c9765ce:
          after_revision: 8
          aggregate_digest: "sha256:86548c66e8f91f767dae85e85452ed0ee5ed435157a02b3963773a4a1c72795b"
          before_revision: 7
          command_digest: "sha256:bb822fb1a4d329c6e3808e3b3e7166372996d7601eb32e54eddbd0d63ad8bd50"
          effect_ids: []
          event_digests:
            - "sha256:639190eff2b2b93115010c87485ee64b94e2e7b70655b54011b5bd92ecdb9fe5"
          mutation_id: "sha256:1059c4b8aaea44bad7d9f305097e4ed3dc966555f9a1f98a7c7150fe5c9765ce"
        sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce:
          after_revision: 3
          aggregate_digest: "sha256:6f47064178a355896353dc51dac533a6fe06fdb94c15cd87c13656ee4ce1e1db"
          before_revision: 2
          command_digest: "sha256:2dcaaef336e99bc1ef6ae2a5b54473462da03a818242f16b9a71f2c3a67a1e5d"
          effect_ids: []
          event_digests:
            - "sha256:51c52c546d571aab2aeaf53b7e4859223d52dc771e9fe2fc34b2186e4156a809"
          mutation_id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce"
        sha256:ef7af41f9f2845d4b7eb2f9ed39f5676ee3aa4949d3649ce488bf8a7fafe1d90:
          after_revision: 6
          aggregate_digest: "sha256:51ac6a84a6f0da1948b457631e37c7e4eb462b5423a4798bb1b98eaddc159d48"
          before_revision: 5
          command_digest: "sha256:4891fb22ab90d0ea3e441c758c50fa098fa25dc329427ee8a6efe5bf1c2f7189"
          effect_ids: []
          event_digests:
            - "sha256:a8d9ab270798cd21a8e9b5832bce8a0c34c16ac271b13d190c4e156e83c88d65"
          mutation_id: "sha256:ef7af41f9f2845d4b7eb2f9ed39f5676ee3aa4949d3649ce488bf8a7fafe1d90"
        validation-resolution:sha256:9ed0f0d5b3a895452a4ad321e44c21d86d58dba0f311ecbd0fad6bc349cb631e:
          after_revision: 12
          aggregate_digest: "sha256:044b217ef979d66985c47e4811512170a320d71bc20387b7fb765459495141a3"
          before_revision: 11
          command_digest: "sha256:ab971a84d5ee6ef3a4e24005b663e4e81bc058b51e11e9790e54b92aacc31345"
          effect_ids: []
          event_digests:
            - "sha256:990b19a7f4f6c331ee697576ad5df7c4b0a3039b2493197fe111bb03f7ebe635"
          mutation_id: "validation-resolution:sha256:9ed0f0d5b3a895452a4ad321e44c21d86d58dba0f311ecbd0fad6bc349cb631e"
        validation:sha256:b7c3819e5375d8469c3e8c0f9990961a5c39047ac0b0a75b1e66fb3d3eaf7d3d:
          after_revision: 11
          aggregate_digest: "sha256:9e1d9e5e670d4d05aa15244645e157b8c8db327c1ccf1fffeee211930c658405"
          before_revision: 10
          command_digest: "sha256:dd9b6297e1bb5b3b696656c5464993fd4a89775192f842ba56257ed737b0e9ea"
          effect_ids: []
          event_digests:
            - "sha256:953d9c3956589de8f712273c7bce4e435661a4ac766683287b4b68195404d87d"
          mutation_id: "validation:sha256:b7c3819e5375d8469c3e8c0f9990961a5c39047ac0b0a75b1e66fb3d3eaf7d3d"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        bind-reviewed-publication-base:
          attempt: 1
          claim_id: "sha256:d29707be9dbd71488b1c45a0d0cf33cca3c92ee8d9cb6e45e5240f3ad20f5db0"
          definition:
            contract_digest: "sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
            expected_outputs:
              - "publication-base-repair-evidence"
            id: "bind-reviewed-publication-base"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:1ef9848f888ef82e12a7320b6bf81a165bf8ae803e70ecc316dc0e82de7ed8d9"
              id: "publication-base-repair-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
              task_id: "202610101212-RDPWEM"
              work_item_id: "bind-reviewed-publication-base"
          result_digest: "sha256:e85232cd5e97d121a3f23c77b3fc61fa0ac417fc4986dfdd95ed2f9af1414190"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d7aae5b488e3f5e593b45601c24eb92df1f0e6e74ae727833c357fee215535d6"
              - "sha256:2cb6d9d4dc5d3574221b88c6e142948f9a8e7ff947f7bcdbf73c9e96f69d55aa"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:686a612910f5d767f51012c2965539c3fdf0636f96fd761872498b108e000239"
              environment_digest: "sha256:c023ecb9ccd1422dbcf5c90ea4d747bf010c206537cb6f80ec3697c220218330"
              implementation_identity: "sha256:e85232cd5e97d121a3f23c77b3fc61fa0ac417fc4986dfdd95ed2f9af1414190"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-10T18:20:08.273Z"
            status: "PASSED"
    digest: "sha256:567377a6cc10902d2ecb550675705e6cc1b00eb7cacc083a664ff7fcb110bddd"
    documents:
      contracts:
        sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4:
          acceptance_criteria:
            - "Preserve original task_execution_context base and original WorkItem implementation evidence unchanged."
            - "Require valid canonical authority lineage and its latest authenticated reviewed-base import chain reaching exact current final-validated Git HEAD. Validate retained final evidence identity; a mutable projection alone is insufficient."
            - "Require an explicit supported publication branch pin and observed matching remote target SHA equal to the authenticated import new_commit and current verified HEAD. Reject arbitrary ancestors, unrelated descendants and target drift."
            - "Use the derived publication base consistently for ownership guard, diffstat and generated PR metadata in both sync entry points. Do not edit PR metadata or canonical state by hand."
            - "Ordinary tasks without a matching reviewed import retain existing frozen-base behavior. Invalid claimed recovery evidence fails closed before writes."
            - "Real Git/native evidence tests cover old task base to reviewed main recovery and unchanged ordinary task behavior; reject missing/forged import, wrong parent/checkpoint, HEAD/verification drift, remote drift and foreign artifacts introduced after the authenticated base."
            - "Do not rerun WS full CI for this routing repair. Independently review and qualify this implementation before any operator invocation on WS. Keep original failed verification and publication receipts."
          objective: "Resolve a separately explicit publication branch only from exact authenticated reviewed-base import and current final verification, then use that base consistently in PR artifact synchronization."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            - "bun run typecheck"
            - "bun run hotspots:check"
      intent:
        context: "Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review."
        objective: "Bind publication base to authenticated reviewed import"
    events:
      -
        command_digest: "sha256:dba1511268d58b128ddc88cf91692ef759b53c3f580d5cb442b37450d1e1b82b"
        id: "capture:202610101212-RDPWEM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101212-RDPWEM"
        occurred_at: "2026-10-10T12:12:29.903Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101212-RDPWEM"
        task_revision: 1
      -
        command_digest: "sha256:ac050e04beac99197e7ace8c71dfd6e87f3de6a972cab37c0a0876a3d0c4ed30"
        id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6"
        occurred_at: "2026-10-10T12:14:16.785Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101212-RDPWEM"
        task_revision: 2
      -
        command_digest: "sha256:2dcaaef336e99bc1ef6ae2a5b54473462da03a818242f16b9a71f2c3a67a1e5d"
        id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce"
        occurred_at: "2026-10-10T12:14:41.304Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101212-RDPWEM"
        task_revision: 3
      -
        command_digest: "sha256:fa504306923802f36810f27dd5babc251db64c1400908b1054c31a1870bbdb19"
        id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-10T12:14:59.951Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101212-RDPWEM"
        task_revision: 4
      -
        command_digest: "sha256:0a8b604ea2839897f934c2f310c406b0a2e30278855d0b8be1dadd4b30880854"
        id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-10T12:15:24.092Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101212-RDPWEM"
        task_revision: 5
      -
        command_digest: "sha256:4891fb22ab90d0ea3e441c758c50fa098fa25dc329427ee8a6efe5bf1c2f7189"
        id: "sha256:ef7af41f9f2845d4b7eb2f9ed39f5676ee3aa4949d3649ce488bf8a7fafe1d90:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ef7af41f9f2845d4b7eb2f9ed39f5676ee3aa4949d3649ce488bf8a7fafe1d90"
        occurred_at: "2026-10-10T16:32:27.218Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610101212-RDPWEM"
        task_revision: 6
      -
        command_digest: "sha256:10b59f26b5224fa0daae1db46426fd1d29e834b7383495478970a12490162fec"
        id: "kernel_work_item_execution_required:sha256:d73418f8ae855bb404cac1549a1e60edaee1609b63a46256445712ec38676f24:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d73418f8ae855bb404cac1549a1e60edaee1609b63a46256445712ec38676f24:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-10T16:34:03.498Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610101212-RDPWEM"
        task_revision: 7
      -
        command_digest: "sha256:bb822fb1a4d329c6e3808e3b3e7166372996d7601eb32e54eddbd0d63ad8bd50"
        id: "sha256:1059c4b8aaea44bad7d9f305097e4ed3dc966555f9a1f98a7c7150fe5c9765ce:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1059c4b8aaea44bad7d9f305097e4ed3dc966555f9a1f98a7c7150fe5c9765ce"
        occurred_at: "2026-10-10T16:40:55.312Z"
        payload_digest: "sha256:091791069d94218d4e5cb430d38bb9b9386610c2f3faf8fe11181e8417113cf8"
        task_id: "202610101212-RDPWEM"
        task_revision: 8
      -
        command_digest: "sha256:943d12b141104f128b66f59ac6ef52cc23e58f1692a93caf7dfe8b46044d8b58"
        id: "result:sha256:b70b3de2de20a20c0ccab863c2f11aba8c18772cfb18264215d081b0046a9a7c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b70b3de2de20a20c0ccab863c2f11aba8c18772cfb18264215d081b0046a9a7c"
        occurred_at: "2026-10-10T16:49:36.170Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610101212-RDPWEM"
        task_revision: 9
      -
        command_digest: "sha256:07d76e125a8088711a6fb8227f5bbe5d91cfda9cab7529a3737de302d73c4b82"
        id: "kernel_work_item_inspection_required:sha256:ea09465c4fff0e58c96e74b19c3ea397d213aa37e663325e213b621a8308174b:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ea09465c4fff0e58c96e74b19c3ea397d213aa37e663325e213b621a8308174b:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T16:50:32.202Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610101212-RDPWEM"
        task_revision: 10
      -
        command_digest: "sha256:dd9b6297e1bb5b3b696656c5464993fd4a89775192f842ba56257ed737b0e9ea"
        id: "validation:sha256:b7c3819e5375d8469c3e8c0f9990961a5c39047ac0b0a75b1e66fb3d3eaf7d3d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b7c3819e5375d8469c3e8c0f9990961a5c39047ac0b0a75b1e66fb3d3eaf7d3d"
        occurred_at: "2026-10-10T18:20:56.245Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610101212-RDPWEM"
        task_revision: 11
      -
        command_digest: "sha256:ab971a84d5ee6ef3a4e24005b663e4e81bc058b51e11e9790e54b92aacc31345"
        id: "validation-resolution:sha256:9ed0f0d5b3a895452a4ad321e44c21d86d58dba0f311ecbd0fad6bc349cb631e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9ed0f0d5b3a895452a4ad321e44c21d86d58dba0f311ecbd0fad6bc349cb631e"
        occurred_at: "2026-10-10T18:21:19.008Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610101212-RDPWEM"
        task_revision: 12
      -
        command_digest: "sha256:7f8445651e704531df761720dd2b9c0714e969a07e7f109d46e1446e69e7361c"
        id: "final-validation:sha256:c15dbdd7b34efb5ca99d37e5a2c29956bc0b08561f2d43bbea64ced9cbb5da17:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:c15dbdd7b34efb5ca99d37e5a2c29956bc0b08561f2d43bbea64ced9cbb5da17:12"
        occurred_at: "2026-10-10T18:22:56.717Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610101212-RDPWEM"
        task_revision: 13
      -
        command_digest: "sha256:d7a27aeab24e0d6ea206baa0d4f9bb512f6f3769a599060fb3f87552ccb6b6c9"
        id: "kernel_task_completion_required:sha256:7d6f882be1e8e94a4aa2e4998fd812eb7a69c6253dd9917b08fa17b8aa2a497a:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:7d6f882be1e8e94a4aa2e4998fd812eb7a69c6253dd9917b08fa17b8aa2a497a:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T18:23:09.083Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610101212-RDPWEM"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind publication base to authenticated reviewed import

Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.

## Scope

- In scope: Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
- Out of scope: unrelated refactors not required for "Bind publication base to authenticated reviewed import".

## Plan

1. Execute approved WorkItem bind-reviewed-publication-base.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
