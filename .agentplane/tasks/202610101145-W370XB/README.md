---
id: "202610101145-W370XB"
title: "Anchor semantic result continuation to exact issued authority"
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
  - "bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T11:50:43.612Z"
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
      - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
      - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
          - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
          - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
      digest: "sha256:a8213495590f2e48e3e1b44dbb76f486920ee13be6489b9a236c2cc389a7832a"
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
doc_updated_at: "2026-10-10T11:46:08.672Z"
doc_updated_by: "CODER"
description: "Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation."
sections:
  Summary: |-
    Anchor semantic result continuation to exact issued authority

    Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
  Scope: |-
    - In scope: Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
    - Out of scope: unrelated refactors not required for "Anchor semantic result continuation to exact issued authority".
  Plan: "1. Execute approved WorkItem anchor-issued-authority."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
            digest: "sha256:4407c74546170270cf219d823a7ac422d189b352403b7974fd8275aebe888305"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
            task_id: "202610101145-W370XB"
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
            digest: "sha256:065cbe4d1110ac524f694495173c5b69298e0de82780940344a2a1794b2a3a2c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4407c74546170270cf219d823a7ac422d189b352403b7974fd8275aebe888305"
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
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
            task_id: "202610101145-W370XB"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:e1d6ce95d2f5f1754af8b050bdd42ed1b13ce71ae8cb4eb0a1dd2f490cefe265"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4add8de0033a00dd4721715c89b2b473600b75c239b9ab97145b994558597d78"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
              kind: "USER"
              parent_authority_digest: "sha256:065cbe4d1110ac524f694495173c5b69298e0de82780940344a2a1794b2a3a2c"
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
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
            task_id: "202610101145-W370XB"
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
            evidence_digest: "sha256:da8582e1c4a893bdab297b49d2bd322c1ff28e46096b87508418284b78fd0aa2"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_evidence_digest: "sha256:3cff8f94bc83103f644580755b48e941eed692138ca7358e2a36ea6ad059ce15"
            request_digest: "sha256:04be3953b869b5e12eca451464157750a9c8b9ddaef863c60727809378f5931e"
            request_task_revision: 7
            reviewed_base_import:
              canonical_record_digest: "sha256:65ffcc7b400c940c072479895acc3ac66fa90ee2401f065e1990c2e8f96ef36f"
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
              mutation_receipt_digest: "sha256:ea98dd8b1608124030faa367b8425b30cc031e0a9c6fda7742326b3a259d20ff"
              new_commit: "7b46bd63fa10785c36420ee627c01d814171497b"
              old_commit: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:bde4a1f2d23c49a1cd0622d0684ad660a354a5d43f783196cab09e4b386f56f7"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
        digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9"
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
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            expected_outputs:
              - "issued-authority-repair-evidence"
            id: "anchor-issued-authority"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:d270a8b0e9762ba2e024965bd57e4bf923836a91b7f11a06ea0a3a45dca7e74b"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:020f64a87f2d05e75437bb17e32f130db7b0b236b8f1ce4de799990e47bc8988"
          environment_digest: "sha256:4bc59af9b2ed92f44eba55cfa26ec2383116a50ce67e10fac860703d156134d3"
          implementation_identity: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
          toolchain_digest: "sha256:1fde6d7742ab0d57509f99bec1d74d01d859e7caec9ce895a8ca705211135755"
        observed_at: "2026-10-10T18:03:54.177Z"
        status: "PASSED"
      id: "202610101145-W370XB"
      intent_digest: "sha256:6c26ce7d70458b6bfec8dc073d52779d3515bc7264c0c749c9e2bde462423325"
      migration_receipts: []
      mutation_receipts:
        capture:202610101145-W370XB:
          after_revision: 1
          aggregate_digest: "sha256:d67e90975678bde22d61d0517a8d9a708caf59be2807c7099382239d3914645c"
          before_revision: 0
          command_digest: "sha256:e96619f157a78afcd2acc6cd1306b26917c11537fb15b1c4e29b7cb9fb98f834"
          effect_ids: []
          event_digests:
            - "sha256:1cecbfd234b13170b812133e3aaa38dab7d3371fd2e72c3921cef4eb87be3ec2"
          mutation_id: "capture:202610101145-W370XB"
        final-validation:sha256:d270a8b0e9762ba2e024965bd57e4bf923836a91b7f11a06ea0a3a45dca7e74b:12:
          after_revision: 13
          aggregate_digest: "sha256:b293c66c6715682640419b6b71cc58691c6a1db1e951d8cff948220f8c9b4c03"
          before_revision: 12
          command_digest: "sha256:c7e389834a538b314141420dead8b343cd2bcf0d07c823b98303522f4c56163f"
          effect_ids: []
          event_digests:
            - "sha256:1d9c2bd8d1cf89bb73bc02161144e73052faaa9cd19d793647fc49bcfce40ffd"
          mutation_id: "final-validation:sha256:d270a8b0e9762ba2e024965bd57e4bf923836a91b7f11a06ea0a3a45dca7e74b:12"
        kernel_task_completion_required:sha256:4c1713c6ef45b5fcb85eadd4bd6710e26e2ce7a4c5c8b33f0376faf51553ac5d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 14
          aggregate_digest: "sha256:9b468b46dff8a6ba6798daedf6c78482f7d49f7d5d6a3951d25b0b540d7f1f4d"
          before_revision: 13
          command_digest: "sha256:3580294779f5b5e092d3a53761b46e15fb78ebc9641b58d51e8d375f63b05a1b"
          effect_ids: []
          event_digests:
            - "sha256:67321a000fb1e0ed3158617934211c4e2caf696042326d85496b66e7a661deff"
          mutation_id: "kernel_task_completion_required:sha256:4c1713c6ef45b5fcb85eadd4bd6710e26e2ce7a4c5c8b33f0376faf51553ac5d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 5
          aggregate_digest: "sha256:4b57ba6902a37f46bf358c24646e98c571312c8c24ce725bd8d562475643a21f"
          before_revision: 4
          command_digest: "sha256:b1ae2974b052ee6037717a9f9fb171f803f956b161387b58ba98f4982b544e67"
          effect_ids: []
          event_digests:
            - "sha256:bcad567566eda3aba8490b4c94d044234fa2aac0f21a8803ef4b476e27d90dd7"
          mutation_id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        kernel_work_item_execution_required:sha256:71dd1b34edc6643ba1883a146e1be2f20f01d2810279b22cef6e3d205a9d22d8:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:92ca23d73fd416664ae8130fc357ca410847d147faf37a8f6714c5af562f0117"
          before_revision: 6
          command_digest: "sha256:97467faa54807e99fd1d75c4088ec9783ee8cfbc18a10fa4bd316abb90a9c631"
          effect_ids: []
          event_digests:
            - "sha256:beee885b888ebb90d16701472359a491b1f4543750e75f7d27d49c3813f95efa"
          mutation_id: "kernel_work_item_execution_required:sha256:71dd1b34edc6643ba1883a146e1be2f20f01d2810279b22cef6e3d205a9d22d8:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_inspection_required:sha256:e38bc33f7a00ee75065d4dd64e56b35767ac20edd13728642cb24389c54edc06:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 10
          aggregate_digest: "sha256:a76b99b0b672b8c9460e7c751a4497ef8ee916f0b963f975d655911517918d59"
          before_revision: 9
          command_digest: "sha256:c957a0053cc88a734492aa8b86cf71b57a5a241cf9f2031491e9c7a00a350d11"
          effect_ids: []
          event_digests:
            - "sha256:282ba0a241bd6d4a32664cbeee40d34ec7a1e1267365c9e89d184d3403b7424f"
          mutation_id: "kernel_work_item_inspection_required:sha256:e38bc33f7a00ee75065d4dd64e56b35767ac20edd13728642cb24389c54edc06:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 4
          aggregate_digest: "sha256:85dca334d4bea0c4e1e28d549b32637674701d3f34599f24c50b4311866404e4"
          before_revision: 3
          command_digest: "sha256:27bdda69bf4a1fca66455b12f7f085408dfc6477de66b8603a7088d71de5ce50"
          effect_ids: []
          event_digests:
            - "sha256:4e38e9ff757fda862cad5b7eed7de025111c93f2342a1830d28772a329cc883e"
          mutation_id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        result:sha256:059866fae12ab90c0aa45ca6957b27dfda5b139b1c9adff01e139b5e9c691b1c:
          after_revision: 9
          aggregate_digest: "sha256:9c008afe3ab41b06437b10aae2f40691ec5486cd57cafc880f2390aafc6db5fb"
          before_revision: 8
          command_digest: "sha256:aaff92f083fc627c20be9188e86064abb8cc96a44a5e1fe928bf90fee07eefc3"
          effect_ids: []
          event_digests:
            - "sha256:411edd5b6506f289fba7b49d878ab2aeb072e527d18ecd87e39a508ebe313beb"
          mutation_id: "result:sha256:059866fae12ab90c0aa45ca6957b27dfda5b139b1c9adff01e139b5e9c691b1c"
        result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5:
          after_revision: 2
          aggregate_digest: "sha256:d63d5005ec24bff70db38daf1155990cc6c2d3cfee4efbc4efc4f6140a983acd"
          before_revision: 1
          command_digest: "sha256:68880d9502624c7381496333700128218befe9cf3d3356925af37b5c72f882ef"
          effect_ids: []
          event_digests:
            - "sha256:4e4b9e351ddb578d22a8a89bc1fbd915e3f2032a33e5774acaa3f76670a9d05a"
          mutation_id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5"
        sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91:
          after_revision: 3
          aggregate_digest: "sha256:0a552cced4a661887970dd83fa72e96626487f3a68476811d4af790a22c09c13"
          before_revision: 2
          command_digest: "sha256:a61ad38eb192f164df30771f71b568d27fb145e55382f84d72d68690283586c2"
          effect_ids: []
          event_digests:
            - "sha256:e1284a8dabe4ce6a5a760b73b0e993c7ce73b5ed9c833ac3f7d9fb4e7b3f1e19"
          mutation_id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91"
        sha256:6d7115dd4d871da2aa119511df64f963348f931ae30074e9119ad74cdd44a688:
          after_revision: 6
          aggregate_digest: "sha256:156cd261f027afde7b5e1b1a64dc30b75ef979175fa7817a2bf10e02d31ab826"
          before_revision: 5
          command_digest: "sha256:c1da39ce0341163082b4bb3fd73e030242d428c586397ef4a281f176c635c4db"
          effect_ids: []
          event_digests:
            - "sha256:9260859dab1e8651bde1141854522f7955dddea15743686cd28e178d5f2c7bf9"
          mutation_id: "sha256:6d7115dd4d871da2aa119511df64f963348f931ae30074e9119ad74cdd44a688"
        sha256:a31dfdd9d3e47c542ac3ca6064c60e4cd4292f6d74bd11f2e6613eba9498e77c:
          after_revision: 8
          aggregate_digest: "sha256:f0dd067070f431efcd7cff571d06fa339c7b733b846f470a881ee72463193cb0"
          before_revision: 7
          command_digest: "sha256:5f580b2db21f90ee41a54d0e3d50798874707c7be12e065bdce8c7863fb80c14"
          effect_ids: []
          event_digests:
            - "sha256:adfc638ecaad1a2c7808fb707a82c3ebac3e3f22449ccfa4151c85bac3ffb10c"
          mutation_id: "sha256:a31dfdd9d3e47c542ac3ca6064c60e4cd4292f6d74bd11f2e6613eba9498e77c"
        validation-resolution:sha256:fe4305be39278810ed18384dda4bb09b4669c7bed6d3e883ebd070bdcd7b0e5d:
          after_revision: 12
          aggregate_digest: "sha256:dd6493a3ebcd9302b6d4b2471ba23eac5ee2e2da992aa24a44d2520a3a91869c"
          before_revision: 11
          command_digest: "sha256:1cca1e4c5b6c670d5f393fac3b76f508a890cf217570a6a7c7c3cbf5dad55532"
          effect_ids: []
          event_digests:
            - "sha256:9d8e3abaed75af5d5ea124bdd83445b38a1720f27befd2f72bcd7922fe94c686"
          mutation_id: "validation-resolution:sha256:fe4305be39278810ed18384dda4bb09b4669c7bed6d3e883ebd070bdcd7b0e5d"
        validation:sha256:e1d9125a2af1efd0cf0269384bf3fc3eb4d69334ddf68ec19e268edaf0c1c6ee:
          after_revision: 11
          aggregate_digest: "sha256:497aa242dd2d0217a6765b12f4d29cb6d3f5c5d8f4aa68cfa9602bc290e4fea1"
          before_revision: 10
          command_digest: "sha256:3f742fd9ef82b7f43628632a8425caa268d2080857552fe92c983afffdb50592"
          effect_ids: []
          event_digests:
            - "sha256:d8ae5ffce61f6d60f045f067f4c7f51103cca4a78cf3f3cf91e05e5bac2b5256"
          mutation_id: "validation:sha256:e1d9125a2af1efd0cf0269384bf3fc3eb4d69334ddf68ec19e268edaf0c1c6ee"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        anchor-issued-authority:
          attempt: 1
          claim_id: "sha256:caa3b7fde37b6e6b27eff3cb1ebe86b1fabcefae3c9aaf7594c708215b6ebf98"
          definition:
            contract_digest: "sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9"
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
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            expected_outputs:
              - "issued-authority-repair-evidence"
            id: "anchor-issued-authority"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:48537a04a97aa2165824e3d71ffdff600763c83674c63e3eddb65f4d32b10de5"
              id: "issued-authority-repair-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
              task_id: "202610101145-W370XB"
              work_item_id: "anchor-issued-authority"
          result_digest: "sha256:fc67c7a6493bc3e840c63794e3e11f7cb2379484bbecd121fa238e85d5a73d53"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:96e34ce04574d411ba68d7ee893378650784f8c90f94214438992748a79b9581"
              - "sha256:d237d8b0e6ab3c42d41057a9266b082263484c979fdf876a722bfa9bccac4f32"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:020f64a87f2d05e75437bb17e32f130db7b0b236b8f1ce4de799990e47bc8988"
              environment_digest: "sha256:14c3513895a34db7d0695f3dfe726efdf04bc2974015f20e5f55d7855ade04fb"
              implementation_identity: "sha256:fc67c7a6493bc3e840c63794e3e11f7cb2379484bbecd121fa238e85d5a73d53"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-10T18:01:52.807Z"
            status: "PASSED"
    digest: "sha256:f55ea6ef40e40711164c515bcde602274183da5945abe8404d060d5df6f87ba9"
    documents:
      contracts:
        sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9:
          acceptance_criteria:
            - "Anchor continuation to the authenticated issued WorkOrder authority, not the first or last repeated repository fingerprint."
            - "Reconstruct and verify an exact delegated WorkOrder authority against its canonical lineage parent when necessary. Reject missing, substituted or ambiguous historical anchors."
            - "Apply the same trusted anchor to semantic stop continuation, semantic implementation acceptance and receiveResult; preserve task, plan, WorkItem, contract, attempt and claim binding checks."
            - "Preserve serialized KernelWorkBinding fields and existing semantic receipt/replay digests. Do not require a new core schema or public artifact field."
            - "Reproduce approval fingerprint A, authority delta, genuine issued authority with fingerprint A, then valid scoped implementation continuation B; accept only continuation from the exact issued authority."
            - "Negative regressions cover wrong or missing authority, unrelated repeated fingerprint, wrong claim/attempt/plan, out-of-scope paths and a non-implementation transition after the genuine anchor; ordinary unchanged bindings and replay remain compatible."
            - "Do not mutate Factory or WS task state/results, expand authority, rewrite native receipts or introduce a fingerprint-selection fallback."
            - "Before implementation, obtain operator plan review and an isolated native task checkout on reviewed source; any old-base bootstrap/import must use genuine supported recovery and fresh evidence."
          objective: "Repair native result continuation by anchoring all three acceptance paths to trusted exact issued authority, preserving existing binding/replay serialization."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            - "bun run typecheck"
            - "bun run hotspots:check"
      intent:
        context: "Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation."
        objective: "Anchor semantic result continuation to exact issued authority"
    events:
      -
        command_digest: "sha256:e96619f157a78afcd2acc6cd1306b26917c11537fb15b1c4e29b7cb9fb98f834"
        id: "capture:202610101145-W370XB:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101145-W370XB"
        occurred_at: "2026-10-10T11:46:08.486Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101145-W370XB"
        task_revision: 1
      -
        command_digest: "sha256:68880d9502624c7381496333700128218befe9cf3d3356925af37b5c72f882ef"
        id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5"
        occurred_at: "2026-10-10T11:49:40.516Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101145-W370XB"
        task_revision: 2
      -
        command_digest: "sha256:a61ad38eb192f164df30771f71b568d27fb145e55382f84d72d68690283586c2"
        id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91"
        occurred_at: "2026-10-10T11:50:20.156Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101145-W370XB"
        task_revision: 3
      -
        command_digest: "sha256:27bdda69bf4a1fca66455b12f7f085408dfc6477de66b8603a7088d71de5ce50"
        id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:50:49.956Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101145-W370XB"
        task_revision: 4
      -
        command_digest: "sha256:b1ae2974b052ee6037717a9f9fb171f803f956b161387b58ba98f4982b544e67"
        id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:51:27.708Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101145-W370XB"
        task_revision: 5
      -
        command_digest: "sha256:c1da39ce0341163082b4bb3fd73e030242d428c586397ef4a281f176c635c4db"
        id: "sha256:6d7115dd4d871da2aa119511df64f963348f931ae30074e9119ad74cdd44a688:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6d7115dd4d871da2aa119511df64f963348f931ae30074e9119ad74cdd44a688"
        occurred_at: "2026-10-10T17:40:42.756Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610101145-W370XB"
        task_revision: 6
      -
        command_digest: "sha256:97467faa54807e99fd1d75c4088ec9783ee8cfbc18a10fa4bd316abb90a9c631"
        id: "kernel_work_item_execution_required:sha256:71dd1b34edc6643ba1883a146e1be2f20f01d2810279b22cef6e3d205a9d22d8:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:71dd1b34edc6643ba1883a146e1be2f20f01d2810279b22cef6e3d205a9d22d8:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-10T17:41:43.298Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610101145-W370XB"
        task_revision: 7
      -
        command_digest: "sha256:5f580b2db21f90ee41a54d0e3d50798874707c7be12e065bdce8c7863fb80c14"
        id: "sha256:a31dfdd9d3e47c542ac3ca6064c60e4cd4292f6d74bd11f2e6613eba9498e77c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a31dfdd9d3e47c542ac3ca6064c60e4cd4292f6d74bd11f2e6613eba9498e77c"
        occurred_at: "2026-10-10T17:45:45.893Z"
        payload_digest: "sha256:091791069d94218d4e5cb430d38bb9b9386610c2f3faf8fe11181e8417113cf8"
        task_id: "202610101145-W370XB"
        task_revision: 8
      -
        command_digest: "sha256:aaff92f083fc627c20be9188e86064abb8cc96a44a5e1fe928bf90fee07eefc3"
        id: "result:sha256:059866fae12ab90c0aa45ca6957b27dfda5b139b1c9adff01e139b5e9c691b1c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:059866fae12ab90c0aa45ca6957b27dfda5b139b1c9adff01e139b5e9c691b1c"
        occurred_at: "2026-10-10T17:53:21.222Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610101145-W370XB"
        task_revision: 9
      -
        command_digest: "sha256:c957a0053cc88a734492aa8b86cf71b57a5a241cf9f2031491e9c7a00a350d11"
        id: "kernel_work_item_inspection_required:sha256:e38bc33f7a00ee75065d4dd64e56b35767ac20edd13728642cb24389c54edc06:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e38bc33f7a00ee75065d4dd64e56b35767ac20edd13728642cb24389c54edc06:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T17:53:49.544Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610101145-W370XB"
        task_revision: 10
      -
        command_digest: "sha256:3f742fd9ef82b7f43628632a8425caa268d2080857552fe92c983afffdb50592"
        id: "validation:sha256:e1d9125a2af1efd0cf0269384bf3fc3eb4d69334ddf68ec19e268edaf0c1c6ee:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e1d9125a2af1efd0cf0269384bf3fc3eb4d69334ddf68ec19e268edaf0c1c6ee"
        occurred_at: "2026-10-10T18:02:25.313Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610101145-W370XB"
        task_revision: 11
      -
        command_digest: "sha256:1cca1e4c5b6c670d5f393fac3b76f508a890cf217570a6a7c7c3cbf5dad55532"
        id: "validation-resolution:sha256:fe4305be39278810ed18384dda4bb09b4669c7bed6d3e883ebd070bdcd7b0e5d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fe4305be39278810ed18384dda4bb09b4669c7bed6d3e883ebd070bdcd7b0e5d"
        occurred_at: "2026-10-10T18:02:59.094Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610101145-W370XB"
        task_revision: 12
      -
        command_digest: "sha256:c7e389834a538b314141420dead8b343cd2bcf0d07c823b98303522f4c56163f"
        id: "final-validation:sha256:d270a8b0e9762ba2e024965bd57e4bf923836a91b7f11a06ea0a3a45dca7e74b:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:d270a8b0e9762ba2e024965bd57e4bf923836a91b7f11a06ea0a3a45dca7e74b:12"
        occurred_at: "2026-10-10T18:06:09.756Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610101145-W370XB"
        task_revision: 13
      -
        command_digest: "sha256:3580294779f5b5e092d3a53761b46e15fb78ebc9641b58d51e8d375f63b05a1b"
        id: "kernel_task_completion_required:sha256:4c1713c6ef45b5fcb85eadd4bd6710e26e2ce7a4c5c8b33f0376faf51553ac5d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:4c1713c6ef45b5fcb85eadd4bd6710e26e2ce7a4c5c8b33f0376faf51553ac5d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T18:06:42.267Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610101145-W370XB"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Anchor semantic result continuation to exact issued authority

Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.

## Scope

- In scope: Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
- Out of scope: unrelated refactors not required for "Anchor semantic result continuation to exact issued authority".

## Plan

1. Execute approved WorkItem anchor-issued-authority.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
