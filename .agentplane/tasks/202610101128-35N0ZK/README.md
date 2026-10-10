---
id: "202610101128-35N0ZK"
title: "Publish immutable reviewed candidates before final acceptance"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on: []
tags:
  - "candidate-publication"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run bench:compatibility:check"
  - "bun run hotspots:check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T12:24:13.033Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-10T12:06:44.388Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:ee9e0e978e39e8f530c28fa6dc9cbccf6f9363ec48a9243849ceff45c412a22c"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-10T12:23:12.995Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "10a10cb82afdc23b1d0ebbe6f7df1b6f365850a7"
  review_identity_digest: "sha256:bc81b181b9754929d38eaf75fccaabfbdceea142ca409f85b6514dcaa6f5dbfb"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610101128-35N0ZK/639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6/quality-report.json"
  findings:
    - "Verified all 13 required context blocks and exact native implementation, repository, validation and report evidence digests."
    - "Reviewed create-only advertised-zero Git guard, preservation of the existing pre-push hook, exact remote readback, and lack of force/commit/merge operations."
    - "Reviewed native attempt and USER grant revalidation, separate CAS journal and controller lease, authenticated receipt identity, and fail-closed reconciliation without blind retries. Native typecheck passed; 11 focused Git and journal checks are recorded."
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
      - "documentation"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "artifacts/bench/compatibility"
      - "docs/user"
      - "packages/agentplane/src"
      - "packages/core/src"
      - "scripts/bench"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
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
      - "artifacts/bench/compatibility"
      - "docs/user"
      - "packages/agentplane/src"
      - "packages/core/src"
      - "scripts/bench"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
          - "artifacts/bench/compatibility"
          - "docs/user"
          - "packages/agentplane/src"
          - "packages/core/src"
          - "scripts/bench"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
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
      digest: "sha256:8ca78fac316b181a721e2b90fcbd044070a0d5e35deac83d8c0a61480be7f424"
      escalation_reasons:
        - "central_component:packages/core/src"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "10a10cb82afdc23b1d0ebbe6f7df1b6f365850a7"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-10T11:29:09.548Z"
doc_updated_by: "CODER"
description: "Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation."
sections:
  Summary: |-
    Publish immutable reviewed candidates before final acceptance

    Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.
  Scope: |-
    - In scope: Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.
    - Out of scope: unrelated refactors not required for "Publish immutable reviewed candidates before final acceptance".
  Plan: |-
    1. Execute approved WorkItem define-candidate-checkpoint.
    2. Execute approved WorkItem publish-exact-candidate.
    3. Execute approved WorkItem qualify-candidate-boundary.
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish immutable reviewed candidates before final acceptance". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish immutable reviewed candidates before final acceptance". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:1cabb3a5451185f3dbcf8de78d709829c3e06884ac1d79fa9dcc747ad83310d8"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610101128-35N0ZK/639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6/quality-report.json"
    findings:
      - "Verified all 13 required context blocks and exact native implementation, repository, validation and report evidence digests."
      - "Reviewed create-only advertised-zero Git guard, preservation of the existing pre-push hook, exact remote readback, and lack of force/commit/merge operations."
      - "Reviewed native attempt and USER grant revalidation, separate CAS journal and controller lease, authenticated receipt identity, and fail-closed reconciliation without blind retries. Native typecheck passed; 11 focused Git and journal checks are recorded."
    implementation_commit: "10a10cb82afdc23b1d0ebbe6f7df1b6f365850a7"
    implementation_tree: "92397412a33752cc6dcfac723c34fa281e2558b2"
    projected_at: "2026-10-10T12:23:12.995Z"
    review_identity_digest: "sha256:bc81b181b9754929d38eaf75fccaabfbdceea142ca409f85b6514dcaa6f5dbfb"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:9853be2ed508040108a86b3a2ebc92e3d0bb8c7cc42ef95e1a067e2cccfd4c23"
    work_order_id: "sha256:b88cb69ce883ef54c70412661ac6a474f465db2eed260f9880e21898cee12556"
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
            digest: "sha256:dfd7207e46a4462e73c9d8dd2f23ad39ed03ad27c72f9f84a0811d5b49b49daa"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
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
              - "artifacts/bench/compatibility"
              - "docs/user"
              - "packages/agentplane/src"
              - "packages/core/src"
              - "scripts/bench"
            task_id: "202610101128-35N0ZK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:3f5787187596ff1bda3ac6e1c3359fd73e394414c2ef87636eb7ad784e9c890a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:dfd7207e46a4462e73c9d8dd2f23ad39ed03ad27c72f9f84a0811d5b49b49daa"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
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
              - "artifacts/bench/compatibility"
              - "docs/user"
              - "packages/agentplane/src"
              - "packages/core/src"
              - "scripts/bench"
            task_id: "202610101128-35N0ZK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:2973b7295a3325d196efa330e60550639cc6770e6228740fa5692991b566be2b"
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
            digest: "sha256:70a3c03ae728bd8967d5cc471d924847204d8279dd6c90e6a678c80c9dc46d8c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
              kind: "USER"
              parent_authority_digest: "sha256:3f5787187596ff1bda3ac6e1c3359fd73e394414c2ef87636eb7ad784e9c890a"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/bench/compatibility"
              - "docs/user"
              - "packages/agentplane/src"
              - "packages/core/src"
              - "scripts/bench"
            task_id: "202610101128-35N0ZK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
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
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
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
              - "packages/agentplane/src/commands/shared/source-confidence.ts"
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
              - "packages/agentplane/src/commands/task/active.command.ts"
              - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.ts"
              - "packages/agentplane/src/commands/task/close-noop.command.ts"
              - "packages/agentplane/src/commands/task/close-noop.ts"
              - "packages/agentplane/src/commands/task/comment.ts"
              - "packages/agentplane/src/commands/task/comment.unit.test.ts"
              - "packages/agentplane/src/commands/task/configured-authority.test.ts"
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
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
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
              - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
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
            evidence_digest: "sha256:6cf44c2f42eae204b191cf06ecd30c2a2f8fc2619928ff86fbfcd5b3a5e29642"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_evidence_digest: "sha256:9a54c75b1f2c89fa80f94eb4ddd7178245780dddf73a1875ffcb5bd2a4928f87"
            request_digest: "sha256:0ede40aef9f85f56964d7d823e559f9df69e67ecf67cfe762a3acdd1bc96e078"
            request_task_revision: 7
            reviewed_base_import:
              canonical_record_digest: "sha256:f0f709eb39618a42a9c70df502a1e9f12a00ad64eac173b951cc5f5b43c2f5da"
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
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
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
                - "packages/agentplane/src/commands/shared/source-confidence.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-mutation.ts"
                - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
                - "packages/agentplane/src/commands/task/active.command.ts"
                - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.ts"
                - "packages/agentplane/src/commands/task/close-noop.command.ts"
                - "packages/agentplane/src/commands/task/close-noop.ts"
                - "packages/agentplane/src/commands/task/comment.ts"
                - "packages/agentplane/src/commands/task/comment.unit.test.ts"
                - "packages/agentplane/src/commands/task/configured-authority.test.ts"
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
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
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
                - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
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
              mutation_receipt_digest: "sha256:bda4c04d9527511bc6419d7e8d5b02ec067b4d4c147bb7b4015f9dfb9134ca78"
              new_commit: "017f21d326d151c5ce6cbec4425ff112f4918095"
              old_commit: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:a0843f49742b9113f8aaa299efa02465fcaa1058f5ec92f66450071c91c05c23"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d2b1ca5a6ab5250a1e78262d657f72a01ad8e58c5ea2022b9018479e7bf101ce"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:70a3c03ae728bd8967d5cc471d924847204d8279dd6c90e6a678c80c9dc46d8c"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/bench/compatibility"
              - "docs/user"
              - "packages/agentplane/src"
              - "packages/core/src"
              - "scripts/bench"
            task_id: "202610101128-35N0ZK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-publication-spec.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-admission.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-tree.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
            evidence_digest: "sha256:a4acdedf34c75f5484061bc6a96601ebc4b93f809c171b5ce3431b65221b66b4"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a5f382a8f1400c0abeaf23ac46577feff813be4eafff7909325f2f2817473f91"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d2b1ca5a6ab5250a1e78262d657f72a01ad8e58c5ea2022b9018479e7bf101ce"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/bench/compatibility"
              - "docs/user"
              - "packages/agentplane/src"
              - "packages/core/src"
              - "scripts/bench"
            task_id: "202610101128-35N0ZK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/candidate-publication-executor.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-executor.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-receipt.ts"
              - "packages/agentplane/src/commands/task/candidate-publication.test-helpers.ts"
            evidence_digest: "sha256:0f8314112f8c9631c77d3e9e3d5f9cb2806962cfbe9452328cc2902e5d5c7391"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:f6758f4a82a8b494b672fe7a6daade8be525a652202d8da63de36ea99d05270c"
        digest: "sha256:d33af704e1e7134296680fcbd7006a8f990f8ff2cda188927893f13031d73092"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5635efea853ae7b6b334e79f29e7b5579b7e1402857ad014611d14cf04c9534d"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
            expected_outputs:
              - "define-candidate-checkpoint-evidence"
            id: "define-candidate-checkpoint"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:af47fe2ae686ec25547a6163507aea340810ef3177fa47541d6d4faf65bb83d3"
            depends_on:
              - "define-candidate-checkpoint"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
            expected_outputs:
              - "publish-exact-candidate-evidence"
            id: "publish-exact-candidate"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:32d9c1e0a266cff596c349b760714cf0ee6ba8d4d13429cb63e6db0e4c9ecfd4"
            depends_on:
              - "publish-exact-candidate"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "docs/user"
                - "artifacts/bench/compatibility"
                - "scripts/bench"
            expected_outputs:
              - "qualify-candidate-boundary-evidence"
            id: "qualify-candidate-boundary"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610101128-35N0ZK"
      intent_digest: "sha256:e208a35a7110f4c4aeb64a2a1569ee4f766ac0203ae9c58d2eaa175456b15cad"
      migration_receipts: []
      mutation_receipts:
        capture:202610101128-35N0ZK:
          after_revision: 1
          aggregate_digest: "sha256:ddd818727b5d59b604954d1ae72e483dd47938b339222fd0267fa0865fdeb504"
          before_revision: 0
          command_digest: "sha256:6290c99ab816bab47d7c4a882f8cad449336130ab380f55899faa351942b06c7"
          effect_ids: []
          event_digests:
            - "sha256:c6b01c911a94bda9caa80b2f19c6bef563f1109ffe43648e85341bacf35cb4f9"
          mutation_id: "capture:202610101128-35N0ZK"
        kernel_work_item_claim_required:sha256:652d261055576e991ea8164e670bc61e5e4650a08664d55b86851c6e06ceaa91:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:
          after_revision: 14
          aggregate_digest: "sha256:4821b8bf7eb1379e335b683a94df5393965902b6fbd6f00e20e440442ec93179"
          before_revision: 13
          command_digest: "sha256:0b2a4d9092946cc638f86738c31bb611e8dfa2d328a565688bf662e809335d11"
          effect_ids: []
          event_digests:
            - "sha256:415bb783cb638b9891fa70e6ef3d02ae9897705493cdfcc94ba0d1f9133d9f71"
          mutation_id: "kernel_work_item_claim_required:sha256:652d261055576e991ea8164e670bc61e5e4650a08664d55b86851c6e06ceaa91:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        kernel_work_item_claim_required:sha256:bb3e70ea85eb08acdd438ffa2039cb7128a09d6aa947abc0e5fc00d4aa7bf3f3:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 5
          aggregate_digest: "sha256:c727a598a8639e44245e61d901f4d7c0bfce057b34e7c678d22175958b5b2610"
          before_revision: 4
          command_digest: "sha256:84d88b2262411473bb392b3b0f0449d337f4d5d8289e9e466899c5a187eab094"
          effect_ids: []
          event_digests:
            - "sha256:28e7e003aa2bea7a325df62763f01b75b205e114c6274dc774321d727e58591a"
          mutation_id: "kernel_work_item_claim_required:sha256:bb3e70ea85eb08acdd438ffa2039cb7128a09d6aa947abc0e5fc00d4aa7bf3f3:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        kernel_work_item_claim_required:sha256:bfb42f71c903e7105c036725465ae854d5eefc761bc245c373b5cb2827b46dea:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:
          after_revision: 21
          aggregate_digest: "sha256:656717e71c2a6664579370329f5a063037f823a8cdacb9c6fb44c851dac22738"
          before_revision: 20
          command_digest: "sha256:97589096e3b5af7f7f0d1adffdb0edf3a4c354164116909d2d637612ee9bef93"
          effect_ids: []
          event_digests:
            - "sha256:f42be18d7cae64136b35b18eb810bb60d923e61a0dbd4f295ab628553bf24a9f"
          mutation_id: "kernel_work_item_claim_required:sha256:bfb42f71c903e7105c036725465ae854d5eefc761bc245c373b5cb2827b46dea:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        kernel_work_item_execution_required:sha256:21796f390b486acb6f5762208bc35ee17fe3dcb781fed117e79576db4fc28cbd:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:5161dbb29216ee8d135b39aa05aec35e993936aee0fd763e6dc5d4a51ed5f1b0"
          before_revision: 6
          command_digest: "sha256:b3c57b109697089a66cd6625d33bfd495a44f2722e1bdae1970759636551da29"
          effect_ids: []
          event_digests:
            - "sha256:f14e6440ae2d5d460b5cfa4a7746f33c0e664cb664eb39917b79d2a03f3f56fe"
          mutation_id: "kernel_work_item_execution_required:sha256:21796f390b486acb6f5762208bc35ee17fe3dcb781fed117e79576db4fc28cbd:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_execution_required:sha256:d2145a88f50033619fb5569121342c5883f1b6febac49a52385306555e126cd0:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:
          after_revision: 22
          aggregate_digest: "sha256:e1fd3c6dde19003a01df65be7f03190d7b5358e2f26394a7a87d79107dbe195a"
          before_revision: 21
          command_digest: "sha256:ac29fa71c0eae1bcdd394ddcde81c3128a6162a0b69901912d9287cfffcf0e88"
          effect_ids: []
          event_digests:
            - "sha256:d4fd82633255292f601f82a0f87e8645b30f6a4a356bfc877f25aac8b082eb7d"
          mutation_id: "kernel_work_item_execution_required:sha256:d2145a88f50033619fb5569121342c5883f1b6febac49a52385306555e126cd0:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        kernel_work_item_execution_required:sha256:f79c48429f060b693d60a8f32a92c00b9372c473a22baa7ab8166aa573429ab1:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:
          after_revision: 15
          aggregate_digest: "sha256:ef02121902bf0eb002a5534c794964d86d7211d1ba3635a413ec07cee0ccf476"
          before_revision: 14
          command_digest: "sha256:6ade409929a5230780c941f47bea3eb38b32274338f6ed58862776bc0f58f46d"
          effect_ids: []
          event_digests:
            - "sha256:5d84c4bdbfbeded0aa2e1a5672255a88b7723075f85f4fe1b69c16666f2885e1"
          mutation_id: "kernel_work_item_execution_required:sha256:f79c48429f060b693d60a8f32a92c00b9372c473a22baa7ab8166aa573429ab1:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        kernel_work_item_inspection_required:sha256:7b1f0b5baeb9dc8cf8b8c8163798f9a6d20a84142732347958d802a443c7e2b5:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:
          after_revision: 18
          aggregate_digest: "sha256:5034afca7cfc9a57dd1a7d08bde4fc21f8af33b58666401213a156db480ac572"
          before_revision: 17
          command_digest: "sha256:6888e81596db13ca6d6bdbd2d36f49f3b780bdd78889aea3e730170821295f5a"
          effect_ids: []
          event_digests:
            - "sha256:d0cd4e3ad71e50bbfd60c36bb48e5b329ed5eb7bada7c33882ae316efc764d48"
          mutation_id: "kernel_work_item_inspection_required:sha256:7b1f0b5baeb9dc8cf8b8c8163798f9a6d20a84142732347958d802a443c7e2b5:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        kernel_work_item_inspection_required:sha256:fd9663bb627b7522769632afbced43d3e1936e4c4625b88de32049bc16eda6df:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:
          after_revision: 11
          aggregate_digest: "sha256:a969b5cf0abedd5a6f0a651581717a84f0f7cc6e749ff7aefc3159c58f7dda59"
          before_revision: 10
          command_digest: "sha256:47890d0a854bb72116552479e3bc1948c8bdc3248e3f4ba902bb70d51a9c2d51"
          effect_ids: []
          event_digests:
            - "sha256:6de9382e17ba98a5a0611aa25040bc8121f26f6b466d6c43bd4b48ad73d16485"
          mutation_id: "kernel_work_item_inspection_required:sha256:fd9663bb627b7522769632afbced43d3e1936e4c4625b88de32049bc16eda6df:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        kernel_work_item_materialization_required:sha256:b4844f020e0be374cd273388ddd2e58b81ff291ababe6c2374f180649678d07a:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 4
          aggregate_digest: "sha256:bf587c9fdc2ef7da3ea83401348ed2cbd31e300c8cee78009a686d42c21cf303"
          before_revision: 3
          command_digest: "sha256:09d9c48763a449f3e57b6d284c3023884679930aeeda097e6786ed5f8997416f"
          effect_ids: []
          event_digests:
            - "sha256:cd5912cf0f6e5ea5ed89d60af44ae1913a9911b1e2c95c1a86f24175bbff1eae"
          mutation_id: "kernel_work_item_materialization_required:sha256:b4844f020e0be374cd273388ddd2e58b81ff291ababe6c2374f180649678d07a:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        result:sha256:a2ba83fe058108a2ff514ad5a6b2b6be3036a78dbd19bc983caa0966326bda34:
          after_revision: 10
          aggregate_digest: "sha256:aadefa1db3fe63062870f6d9ed33785a89bd18da9f99dda82c64b22dcd7fa063"
          before_revision: 9
          command_digest: "sha256:c5a61ca4c69d39dddc604560f170580ac87a8ef17419da0a901af6245f97279b"
          effect_ids: []
          event_digests:
            - "sha256:8af850852d5dc28c89d8fb8b112a8177799704dd4367662733133c3f95dcae81"
          mutation_id: "result:sha256:a2ba83fe058108a2ff514ad5a6b2b6be3036a78dbd19bc983caa0966326bda34"
        result:sha256:b88cb69ce883ef54c70412661ac6a474f465db2eed260f9880e21898cee12556:
          after_revision: 17
          aggregate_digest: "sha256:193fdfae06e0d7a7ec2cb9b6b940a899de9c8ce844ed69c50435edcc16b7e025"
          before_revision: 16
          command_digest: "sha256:a311c2e19300c5e31a8a6a8cb97b783a5d27b0a6e6526a341df649b9932de7db"
          effect_ids: []
          event_digests:
            - "sha256:f8c06f496172c2dd88cc06304c27a82f7ca2642946d5e35d4345220c673ac8ef"
          mutation_id: "result:sha256:b88cb69ce883ef54c70412661ac6a474f465db2eed260f9880e21898cee12556"
        result:sha256:be590b76a2be5fc68491564a915625db5bfbef1c9e2d2ed1f13082bbb653989d:
          after_revision: 2
          aggregate_digest: "sha256:d5d9a28689fc04bd2214466fdca56ab4af41528914968da0481b73ede5b50f7e"
          before_revision: 1
          command_digest: "sha256:8c46eba181594721bd45f1f629438fb36e25b10453bada2b395b48c661e779ca"
          effect_ids: []
          event_digests:
            - "sha256:75d3952ad16104dd37355f91f9f8d4cf9930c6063f01b40e8b82e447f6b20a66"
          mutation_id: "result:sha256:be590b76a2be5fc68491564a915625db5bfbef1c9e2d2ed1f13082bbb653989d"
        sha256:34d51765abc516c8c2bbf564cbf2ce17e4f9bd82a5a724c6ea2ed3efbff6171f:
          after_revision: 16
          aggregate_digest: "sha256:deb60f7494a1d1a2ce55d9e0f410d43a921020154ffb63c1aeaaf91182267452"
          before_revision: 15
          command_digest: "sha256:d6aa91b0870cb3a0f0dc0e7c52af2d38e9f7484cee08773e61f95438b37f9b91"
          effect_ids: []
          event_digests:
            - "sha256:205e1bd04f87420fe648e3853407f18617386f4ebcad3eae77361866945ac510"
          mutation_id: "sha256:34d51765abc516c8c2bbf564cbf2ce17e4f9bd82a5a724c6ea2ed3efbff6171f"
        sha256:56c145bc0e0e14f9cf5bd3fb95fd0b8b028e19a5e28c06ade02b8dc17b0bfb70:
          after_revision: 9
          aggregate_digest: "sha256:fd3688e70a30bab8a9813ebab536189ebb7ac6e0d6805452f457fc9329c487f5"
          before_revision: 8
          command_digest: "sha256:8665bfedf9316513cabe2c8686f13390b1df547579f66f898eb356afc6d2d4cd"
          effect_ids: []
          event_digests:
            - "sha256:f97f17018d6fab64344bbacdab51adea1b24de5955b1637efb16805715d1405b"
          mutation_id: "sha256:56c145bc0e0e14f9cf5bd3fb95fd0b8b028e19a5e28c06ade02b8dc17b0bfb70"
        sha256:a028ed4a43edeae9d86b9618612cacda24b05200eb287f2b412b99850ee56410:
          after_revision: 3
          aggregate_digest: "sha256:639cff90385ea76aaa1ea2a22f6f73580df36305117b1c4c5a7373b73a40f103"
          before_revision: 2
          command_digest: "sha256:d22ffbe0ca448165d87b93e4419a1d22137fc66d82d401c6acfd53eb67f3912b"
          effect_ids: []
          event_digests:
            - "sha256:8dddabd7bc3fc6697db2b7aff9cb15619186f4fe32f4a659788b4f5bc14360ce"
          mutation_id: "sha256:a028ed4a43edeae9d86b9618612cacda24b05200eb287f2b412b99850ee56410"
        sha256:a0fa0b2da13b5a662b22f8a7dbbc107f4b6551fb009ed1db7e77c89ed5b6404a:
          after_revision: 8
          aggregate_digest: "sha256:4f63b57fd181140d881cd67d16145ed27b268d9de68370c90a161f36ab297080"
          before_revision: 7
          command_digest: "sha256:5361eed446c69c6deced851152b1ef089dc5c226141db9397502a148f123b4da"
          effect_ids: []
          event_digests:
            - "sha256:9e98155f586f5c93d7bdf15bdb52e208b23c24e699632319df13de50d25bd047"
          mutation_id: "sha256:a0fa0b2da13b5a662b22f8a7dbbc107f4b6551fb009ed1db7e77c89ed5b6404a"
        sha256:b49a12f390ce88a9890136c8e266b798cad408c2404af2ca2395e9902759fe5d:
          after_revision: 6
          aggregate_digest: "sha256:349ca1b937e8c7acb6d1de621b9697d37b8d16182a30f40654e19986d82fe708"
          before_revision: 5
          command_digest: "sha256:742573bc63f39126a21d285c1fd5f23633a8b937399702af50a93678b07f49cb"
          effect_ids: []
          event_digests:
            - "sha256:c9499e006987d817b8bfff06be676f4e779f4fcdd903e6596f5ea22381af1f1d"
          mutation_id: "sha256:b49a12f390ce88a9890136c8e266b798cad408c2404af2ca2395e9902759fe5d"
        validation-resolution:sha256:62a3f609fd247b5368475cf83b730233284755b82c04f7782500ad394506218e:
          after_revision: 13
          aggregate_digest: "sha256:10cc258949952aa129b6a3fc0bc9d673c1211368bf7ff74cfc8b57483f04a77a"
          before_revision: 12
          command_digest: "sha256:5e389e4e40503f0e16df0d203618950013ee28fdf238abb94849963aefe62dce"
          effect_ids: []
          event_digests:
            - "sha256:76328511e8601c3e4d8378994559fe13486317ab8398a0a1b1219064146b0f75"
          mutation_id: "validation-resolution:sha256:62a3f609fd247b5368475cf83b730233284755b82c04f7782500ad394506218e"
        validation-resolution:sha256:e7e063d468d3c97df78b6799568a6eb5da829c4f840c7b84b9fa41127d554ba4:
          after_revision: 20
          aggregate_digest: "sha256:86da541ee61a34969f5e775cc2abe3f3b506b2ad747be2d9d105844c890adf46"
          before_revision: 19
          command_digest: "sha256:e42ecfd15b8d8fec9f7e4e035703c6ac6d4dea417550b5092253abef722d2b93"
          effect_ids: []
          event_digests:
            - "sha256:1bb524579d50757da1b9662c52bd54d92eb5e6fb112668703d18601fc92f7945"
          mutation_id: "validation-resolution:sha256:e7e063d468d3c97df78b6799568a6eb5da829c4f840c7b84b9fa41127d554ba4"
        validation:sha256:639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6:
          after_revision: 19
          aggregate_digest: "sha256:457f4f6d7ba9bacc2b29739337e8cdc9b1dd568f64e0076f10f9b7e2dd13fffc"
          before_revision: 18
          command_digest: "sha256:dbec85bb4de210c148a7f3215ce23a42e3a8d39a8754633862a162e1d6991bfe"
          effect_ids: []
          event_digests:
            - "sha256:66efa74874f9a57e7ca99881d670752a32e481265c51de9136891701e5a489b5"
          mutation_id: "validation:sha256:639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6"
        validation:sha256:f78856ae6c33d687859b90cf4b758a873d3e9da19675eda09381277c52b65d91:
          after_revision: 12
          aggregate_digest: "sha256:bae44004f3b1bc50abb07716f40be30f2d7065e2f73915d39eb0dd996a86d9d4"
          before_revision: 11
          command_digest: "sha256:6bb14a54e28aed36030de7224402e1011caaf1c7fdc32d83857adcfd266568f6"
          effect_ids: []
          event_digests:
            - "sha256:d534528dfa2c8a78c1935bed9fc3f2517a1c5f3e65d3f3d9abccc5f8814102e5"
          mutation_id: "validation:sha256:f78856ae6c33d687859b90cf4b758a873d3e9da19675eda09381277c52b65d91"
      plan_history: []
      revision: 22
      schema_version: 1
      state: "ACTIVE"
      work_items:
        define-candidate-checkpoint:
          attempt: 1
          claim_id: "sha256:8eac2591fbc03d5b48cdbf0ad3df1ce1f10419165857074beb44b10b0a8ac1b6"
          definition:
            contract_digest: "sha256:5635efea853ae7b6b334e79f29e7b5579b7e1402857ad014611d14cf04c9534d"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
            expected_outputs:
              - "define-candidate-checkpoint-evidence"
            id: "define-candidate-checkpoint"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:435de6f8a77026fcca299f92cc8ee240cd0222619bbbd106da0fac4f8939881b"
              id: "define-candidate-checkpoint-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
              task_id: "202610101128-35N0ZK"
              work_item_id: "define-candidate-checkpoint"
          result_digest: "sha256:1481dbef17c474731b01c535211cead2569883b96f23e9a247247c74c2bb3b79"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ed4bd3c700ff1ce246402e0e45ec088fcd8bb18748881ef8f125e98d2bd823e3"
              - "sha256:749008b7d887f224f209f72420a0ac89352a8cee60d8715f732fc34c88db4476"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b255a2bf3fa9205cff600226f1197f959b788c4153ddb30c96266c20430d51b7"
              environment_digest: "sha256:508b5597207780b6c16c77418f739ffdc5076112621e3e7ae987be78f841e641"
              implementation_identity: "sha256:1481dbef17c474731b01c535211cead2569883b96f23e9a247247c74c2bb3b79"
              toolchain_digest: "sha256:1b40843e15ab2bb312959fc9298e3086b96356d1702033776aba57fdea7c8049"
            observed_at: "2026-10-10T12:06:44.388Z"
            status: "PASSED"
        publish-exact-candidate:
          attempt: 1
          claim_id: "sha256:48b4ad3d1e1a62ffb573da584128a0df70f42c75e98f63be74eda35d2c54ef2b"
          definition:
            contract_digest: "sha256:af47fe2ae686ec25547a6163507aea340810ef3177fa47541d6d4faf65bb83d3"
            depends_on:
              - "define-candidate-checkpoint"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
            expected_outputs:
              - "publish-exact-candidate-evidence"
            id: "publish-exact-candidate"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:83f732f8793bba8ec1567ab413c44b90b8e746ec3b26f85deefa6fe8f97421dd"
              id: "publish-exact-candidate-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
              task_id: "202610101128-35N0ZK"
              work_item_id: "publish-exact-candidate"
          result_digest: "sha256:37e74461ebb7a70b3752df0b7cb3bc80c96277b67974cacf542037fc108bb028"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:1f9533202cc710fdbbab8319e2e0ccd8f5bfc71f79304053bc321592f5184ac0"
              - "sha256:bc81b181b9754929d38eaf75fccaabfbdceea142ca409f85b6514dcaa6f5dbfb"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b255a2bf3fa9205cff600226f1197f959b788c4153ddb30c96266c20430d51b7"
              environment_digest: "sha256:55d673b192450c95f18c71f809674ccd380ab6db6c85a4bbaf9d3c971c0f31b9"
              implementation_identity: "sha256:37e74461ebb7a70b3752df0b7cb3bc80c96277b67974cacf542037fc108bb028"
              toolchain_digest: "sha256:1b40843e15ab2bb312959fc9298e3086b96356d1702033776aba57fdea7c8049"
            observed_at: "2026-10-10T12:23:12.995Z"
            status: "PASSED"
        qualify-candidate-boundary:
          attempt: 1
          claim_id: "sha256:1821e416d7b2b53ef5ec6591103d19c637dd738dd765eee6e62f6c3e9cfc9595"
          definition:
            contract_digest: "sha256:32d9c1e0a266cff596c349b760714cf0ee6ba8d4d13429cb63e6db0e4c9ecfd4"
            depends_on:
              - "publish-exact-candidate"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "docs/user"
                - "artifacts/bench/compatibility"
                - "scripts/bench"
            expected_outputs:
              - "qualify-candidate-boundary-evidence"
            id: "qualify-candidate-boundary"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:e42af59691d8a612b4f3157a1e5f6eaba9fc28781259b55ff6a9238fb3e49444"
    documents:
      contracts:
        sha256:32d9c1e0a266cff596c349b760714cf0ee6ba8d4d13429cb63e6db0e4c9ecfd4:
          acceptance_criteria:
            - "Prove missing approval, stale task/plan/attempt/claim/WorkOrder/head/tree/file/remote pins, malformed URL/ref and revoked/expired approval fail before publication."
            - "Prove exact tracked manifest coverage, rejection of mismatched working input, and safe operation despite unrelated dirty checkout state. Prove old-head concurrent update is rejected without force."
            - "Prove success and crash-before/after publication reconciliation, exact provider readback, no duplicate effect/auto-commit/merge/integration, no fake finalPASS, and continued acceptance with W23 still open."
            - "Run affected focused tests, typecheck, scoped lint/format, required generated CLI reference check and current compatibility checker. Use hosted exact-head CI for broad validation; do not duplicate local full CI."
            - "Report exact remaining protected workflow trigger/qualification prerequisite honestly. No Factory changes, external publish, release version change or final release claim occur in these semantic episodes."
          objective: "Qualify the bounded operator checkpoint with local Git/provider fixtures and independent review. Update only required generated command documentation and reviewed current compatibility inventory; preserve immutable baselines."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run hotspots:check"
            - "bun run docs:cli:check"
            - "bun run bench:compatibility:check"
        sha256:5635efea853ae7b6b334e79f29e7b5579b7e1402857ad014611d14cf04c9534d:
          acceptance_criteria:
            - "Bind request to canonical task record, approved plan, current WorkItem attempt/claim/contract and retained WorkOrder, reviewed immutable commit/tree, exact frozen tracked-file inventory and canonical content digest, repository identity, remote/ref/base and expected old remote head."
            - "Validate content from immutable Git objects. Do not accept dirty working bytes as published content or demand unrelated user checkout cleanliness. Reject unsafe remote URLs/ref names and never persist credentials."
            - "Preparation is read-only and returns the full reviewable request/digest before explicit USER approval. Separate expiring publish-only authority must not modify the EXECUTOR grant or imply merge/integration rights."
            - "Obtain the required hosted workflow trigger contract from the Factory owner without accessing or mutating Factory. If an extra PR/dispatch effect is essential, report that bounded scope to the release orchestrator before implementation rather than silently widening publication."
          objective: "Define and implement an externally reviewable immutable candidate request and separate publish-only operator admission, using existing authority and supervisor journal primitives. Work only in an isolated checkout based on reviewed main017f21d326d151c5ce6cbec4425ff112f4918095, never the primary3147 checkout."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
        sha256:af47fe2ae686ec25547a6163507aea340810ef3177fa47541d6d4faf65bb83d3:
          acceptance_criteria:
            - "Revalidate approval, canonical task/plan/attempt/claim/contract and every immutable candidate binding immediately before dispatch; fail closed on drift or revoked/expired authority."
            - "Use ordinary non-force exact-SHA publication with expected-old-head concurrency protection. Do not auto-commit, amend, rebase, merge, update unrelated refs, change protected provider settings or auto-enqueue integration."
            - "Persist request, operation identity and provider readback receipt using existing journal/idempotency/reconciliation mechanisms. Crash-after-effect must reconcile the exact remote ref rather than blindly retry or fabricate success."
            - "Leave WorkItem/task/final_validation status unchanged. Receipt proves publication only; actual protected CI/image acceptance remains separately checked against that exact candidate."
          objective: "Implement only the approved exact-candidate publication executor and durable receipt through the existing persisted supervisor operation journal. Do not invoke real remote publication while developing this repair."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
      intent:
        context: "Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation."
        objective: "Publish immutable reviewed candidates before final acceptance"
    events:
      -
        command_digest: "sha256:6290c99ab816bab47d7c4a882f8cad449336130ab380f55899faa351942b06c7"
        id: "capture:202610101128-35N0ZK:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101128-35N0ZK"
        occurred_at: "2026-10-10T11:29:09.411Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101128-35N0ZK"
        task_revision: 1
      -
        command_digest: "sha256:8c46eba181594721bd45f1f629438fb36e25b10453bada2b395b48c661e779ca"
        id: "result:sha256:be590b76a2be5fc68491564a915625db5bfbef1c9e2d2ed1f13082bbb653989d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:be590b76a2be5fc68491564a915625db5bfbef1c9e2d2ed1f13082bbb653989d"
        occurred_at: "2026-10-10T11:31:27.433Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101128-35N0ZK"
        task_revision: 2
      -
        command_digest: "sha256:d22ffbe0ca448165d87b93e4419a1d22137fc66d82d401c6acfd53eb67f3912b"
        id: "sha256:a028ed4a43edeae9d86b9618612cacda24b05200eb287f2b412b99850ee56410:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a028ed4a43edeae9d86b9618612cacda24b05200eb287f2b412b99850ee56410"
        occurred_at: "2026-10-10T11:31:59.272Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101128-35N0ZK"
        task_revision: 3
      -
        command_digest: "sha256:09d9c48763a449f3e57b6d284c3023884679930aeeda097e6786ed5f8997416f"
        id: "kernel_work_item_materialization_required:sha256:b4844f020e0be374cd273388ddd2e58b81ff291ababe6c2374f180649678d07a:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:b4844f020e0be374cd273388ddd2e58b81ff291ababe6c2374f180649678d07a:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:32:33.013Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101128-35N0ZK"
        task_revision: 4
      -
        command_digest: "sha256:84d88b2262411473bb392b3b0f0449d337f4d5d8289e9e466899c5a187eab094"
        id: "kernel_work_item_claim_required:sha256:bb3e70ea85eb08acdd438ffa2039cb7128a09d6aa947abc0e5fc00d4aa7bf3f3:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:bb3e70ea85eb08acdd438ffa2039cb7128a09d6aa947abc0e5fc00d4aa7bf3f3:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:33:18.546Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101128-35N0ZK"
        task_revision: 5
      -
        command_digest: "sha256:742573bc63f39126a21d285c1fd5f23633a8b937399702af50a93678b07f49cb"
        id: "sha256:b49a12f390ce88a9890136c8e266b798cad408c2404af2ca2395e9902759fe5d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b49a12f390ce88a9890136c8e266b798cad408c2404af2ca2395e9902759fe5d"
        occurred_at: "2026-10-10T11:38:01.745Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610101128-35N0ZK"
        task_revision: 6
      -
        command_digest: "sha256:b3c57b109697089a66cd6625d33bfd495a44f2722e1bdae1970759636551da29"
        id: "kernel_work_item_execution_required:sha256:21796f390b486acb6f5762208bc35ee17fe3dcb781fed117e79576db4fc28cbd:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:21796f390b486acb6f5762208bc35ee17fe3dcb781fed117e79576db4fc28cbd:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-10T11:39:18.270Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610101128-35N0ZK"
        task_revision: 7
      -
        command_digest: "sha256:5361eed446c69c6deced851152b1ef089dc5c226141db9397502a148f123b4da"
        id: "sha256:a0fa0b2da13b5a662b22f8a7dbbc107f4b6551fb009ed1db7e77c89ed5b6404a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a0fa0b2da13b5a662b22f8a7dbbc107f4b6551fb009ed1db7e77c89ed5b6404a"
        occurred_at: "2026-10-10T11:42:57.296Z"
        payload_digest: "sha256:091791069d94218d4e5cb430d38bb9b9386610c2f3faf8fe11181e8417113cf8"
        task_id: "202610101128-35N0ZK"
        task_revision: 8
      -
        command_digest: "sha256:8665bfedf9316513cabe2c8686f13390b1df547579f66f898eb356afc6d2d4cd"
        id: "sha256:56c145bc0e0e14f9cf5bd3fb95fd0b8b028e19a5e28c06ade02b8dc17b0bfb70:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:56c145bc0e0e14f9cf5bd3fb95fd0b8b028e19a5e28c06ade02b8dc17b0bfb70"
        occurred_at: "2026-10-10T12:03:18.406Z"
        payload_digest: "sha256:24f7ea3d3341ee0c827f30d020d0d10cfe76d88847462d9a35c97dcef11d0ac1"
        task_id: "202610101128-35N0ZK"
        task_revision: 9
      -
        command_digest: "sha256:c5a61ca4c69d39dddc604560f170580ac87a8ef17419da0a901af6245f97279b"
        id: "result:sha256:a2ba83fe058108a2ff514ad5a6b2b6be3036a78dbd19bc983caa0966326bda34:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a2ba83fe058108a2ff514ad5a6b2b6be3036a78dbd19bc983caa0966326bda34"
        occurred_at: "2026-10-10T12:03:31.684Z"
        payload_digest: "sha256:de77806419676a10a75eff87ad80b20211622a03369fab29283c5d328bc90bac"
        task_id: "202610101128-35N0ZK"
        task_revision: 10
      -
        command_digest: "sha256:47890d0a854bb72116552479e3bc1948c8bdc3248e3f4ba902bb70d51a9c2d51"
        id: "kernel_work_item_inspection_required:sha256:fd9663bb627b7522769632afbced43d3e1936e4c4625b88de32049bc16eda6df:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fd9663bb627b7522769632afbced43d3e1936e4c4625b88de32049bc16eda6df:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        occurred_at: "2026-10-10T12:03:44.472Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610101128-35N0ZK"
        task_revision: 11
      -
        command_digest: "sha256:6bb14a54e28aed36030de7224402e1011caaf1c7fdc32d83857adcfd266568f6"
        id: "validation:sha256:f78856ae6c33d687859b90cf4b758a873d3e9da19675eda09381277c52b65d91:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f78856ae6c33d687859b90cf4b758a873d3e9da19675eda09381277c52b65d91"
        occurred_at: "2026-10-10T12:06:56.734Z"
        payload_digest: "sha256:c63b7dfe554e6a9662207c3d480eeec6c05e273791074f8bceb8cc0dafdc06e5"
        task_id: "202610101128-35N0ZK"
        task_revision: 12
      -
        command_digest: "sha256:5e389e4e40503f0e16df0d203618950013ee28fdf238abb94849963aefe62dce"
        id: "validation-resolution:sha256:62a3f609fd247b5368475cf83b730233284755b82c04f7782500ad394506218e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:62a3f609fd247b5368475cf83b730233284755b82c04f7782500ad394506218e"
        occurred_at: "2026-10-10T12:07:09.285Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610101128-35N0ZK"
        task_revision: 13
      -
        command_digest: "sha256:0b2a4d9092946cc638f86738c31bb611e8dfa2d328a565688bf662e809335d11"
        id: "kernel_work_item_claim_required:sha256:652d261055576e991ea8164e670bc61e5e4650a08664d55b86851c6e06ceaa91:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:652d261055576e991ea8164e670bc61e5e4650a08664d55b86851c6e06ceaa91:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        occurred_at: "2026-10-10T12:07:35.469Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610101128-35N0ZK"
        task_revision: 14
      -
        command_digest: "sha256:6ade409929a5230780c941f47bea3eb38b32274338f6ed58862776bc0f58f46d"
        id: "kernel_work_item_execution_required:sha256:f79c48429f060b693d60a8f32a92c00b9372c473a22baa7ab8166aa573429ab1:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f79c48429f060b693d60a8f32a92c00b9372c473a22baa7ab8166aa573429ab1:sha256:4fa406622e254a092eefcdb89c204afd5ad0949a55640f371892d3ce5574cea8"
        occurred_at: "2026-10-10T12:07:47.071Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610101128-35N0ZK"
        task_revision: 15
      -
        command_digest: "sha256:d6aa91b0870cb3a0f0dc0e7c52af2d38e9f7484cee08773e61f95438b37f9b91"
        id: "sha256:34d51765abc516c8c2bbf564cbf2ce17e4f9bd82a5a724c6ea2ed3efbff6171f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:34d51765abc516c8c2bbf564cbf2ce17e4f9bd82a5a724c6ea2ed3efbff6171f"
        occurred_at: "2026-10-10T12:18:47.181Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202610101128-35N0ZK"
        task_revision: 16
      -
        command_digest: "sha256:a311c2e19300c5e31a8a6a8cb97b783a5d27b0a6e6526a341df649b9932de7db"
        id: "result:sha256:b88cb69ce883ef54c70412661ac6a474f465db2eed260f9880e21898cee12556:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b88cb69ce883ef54c70412661ac6a474f465db2eed260f9880e21898cee12556"
        occurred_at: "2026-10-10T12:19:21.843Z"
        payload_digest: "sha256:eedbc286ef237c60234d64f29e534510c94489a4f483380ce9de473cbe942b51"
        task_id: "202610101128-35N0ZK"
        task_revision: 17
      -
        command_digest: "sha256:6888e81596db13ca6d6bdbd2d36f49f3b780bdd78889aea3e730170821295f5a"
        id: "kernel_work_item_inspection_required:sha256:7b1f0b5baeb9dc8cf8b8c8163798f9a6d20a84142732347958d802a443c7e2b5:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7b1f0b5baeb9dc8cf8b8c8163798f9a6d20a84142732347958d802a443c7e2b5:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        occurred_at: "2026-10-10T12:19:41.466Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610101128-35N0ZK"
        task_revision: 18
      -
        command_digest: "sha256:dbec85bb4de210c148a7f3215ce23a42e3a8d39a8754633862a162e1d6991bfe"
        id: "validation:sha256:639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:639da03136c478bfc8fddd47e8edb80f0e5d2bd47c14b51dcb6da585b86fa2c6"
        occurred_at: "2026-10-10T12:23:35.895Z"
        payload_digest: "sha256:85ac794df99668560599f8e5dd06f6e2c717b04a8d4a4dcb5e659b98b66a25a2"
        task_id: "202610101128-35N0ZK"
        task_revision: 19
      -
        command_digest: "sha256:e42ecfd15b8d8fec9f7e4e035703c6ac6d4dea417550b5092253abef722d2b93"
        id: "validation-resolution:sha256:e7e063d468d3c97df78b6799568a6eb5da829c4f840c7b84b9fa41127d554ba4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e7e063d468d3c97df78b6799568a6eb5da829c4f840c7b84b9fa41127d554ba4"
        occurred_at: "2026-10-10T12:23:52.519Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610101128-35N0ZK"
        task_revision: 20
      -
        command_digest: "sha256:97589096e3b5af7f7f0d1adffdb0edf3a4c354164116909d2d637612ee9bef93"
        id: "kernel_work_item_claim_required:sha256:bfb42f71c903e7105c036725465ae854d5eefc761bc245c373b5cb2827b46dea:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:bfb42f71c903e7105c036725465ae854d5eefc761bc245c373b5cb2827b46dea:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        occurred_at: "2026-10-10T12:24:36.750Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610101128-35N0ZK"
        task_revision: 21
      -
        command_digest: "sha256:ac29fa71c0eae1bcdd394ddcde81c3128a6162a0b69901912d9287cfffcf0e88"
        id: "kernel_work_item_execution_required:sha256:d2145a88f50033619fb5569121342c5883f1b6febac49a52385306555e126cd0:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d2145a88f50033619fb5569121342c5883f1b6febac49a52385306555e126cd0:sha256:fe11e62687b35bc8830922fdb5ff45689f9e090d907941e79f03fc4d03600d52"
        occurred_at: "2026-10-10T12:25:07.585Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610101128-35N0ZK"
        task_revision: 22
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish immutable reviewed candidates before final acceptance

Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.

## Scope

- In scope: Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.
- Out of scope: unrelated refactors not required for "Publish immutable reviewed candidates before final acceptance".

## Plan

1. Execute approved WorkItem define-candidate-checkpoint.
2. Execute approved WorkItem publish-exact-candidate.
3. Execute approved WorkItem qualify-candidate-boundary.

## Verify Steps

PLANNER fallback scaffold for "Publish immutable reviewed candidates before final acceptance". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish immutable reviewed candidates before final acceptance". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
