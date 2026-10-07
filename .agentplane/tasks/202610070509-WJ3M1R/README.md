---
id: "202610070509-WJ3M1R"
title: "Repair Recipe API release packaging and Blueprint guards for 0.7.13"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "release-repair"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run release:check"
  - "git diff --check"
  - "node --test scripts/checks/no-blueprint-engine.test.mjs"
  - "node scripts/checks/check-compatibility-contract-baseline.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T05:11:44.527Z"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/no-blueprint-engine.test.mjs"
      - "scripts/lib/package-tarball-policy.mjs"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/no-blueprint-engine.test.mjs"
      - "scripts/lib/package-tarball-policy.mjs"
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
          - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/no-blueprint-engine.test.mjs"
          - "scripts/lib/package-tarball-policy.mjs"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:772b2cfa803390b341fc93b2f5f7acc28498c1fbd120c37f9a955bbc08bd4801"
      escalation_reasons:
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/checks/no-blueprint-engine.test.mjs"
        - "central_component:scripts/lib/package-tarball-policy.mjs"
        - "effect_release_metadata"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-07T05:09:38.313Z"
doc_updated_by: "CODER"
description: "Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt."
sections:
  Summary: |-
    Repair Recipe API release packaging and Blueprint guards for 0.7.13

    Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.
  Scope: |-
    - In scope: Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.
    - Out of scope: unrelated refactors not required for "Repair Recipe API release packaging and Blueprint guards for 0.7.13".
  Plan: "1. Execute approved WorkItem repair-recipe-release-guards."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair Recipe API release packaging and Blueprint guards for 0.7.13". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair Recipe API release packaging and Blueprint guards for 0.7.13". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "79709e67da0b41ab9650700769a48e2a4d406d5b"
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
            digest: "sha256:acfe595f9c8a11bcb4805889382196f40bf8ffc765e76e63d33e5f5c6f0e6d1f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:eb0417724d37b8be0eae91fdeff5be555e42ddeb467dea9ba0fb666ecf701fff"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e854a283ea8f8d5c5efa521d947028a82ba0d8b76f77cdfd898e059fe6c146a4"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/no-blueprint-engine.test.mjs"
              - "scripts/lib/package-tarball-policy.mjs"
            task_id: "202610070509-WJ3M1R"
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
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dd8076f331ef8c45a1e898ec0d3e86b11543724f59db95243020456976647bca"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:eb0417724d37b8be0eae91fdeff5be555e42ddeb467dea9ba0fb666ecf701fff"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e854a283ea8f8d5c5efa521d947028a82ba0d8b76f77cdfd898e059fe6c146a4"
              kind: "USER"
              parent_authority_digest: "sha256:acfe595f9c8a11bcb4805889382196f40bf8ffc765e76e63d33e5f5c6f0e6d1f"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:11bc9300353ea1414b2338a2433771fbd576e95402bc02f00c00b953d7a7369b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/no-blueprint-engine.test.mjs"
              - "scripts/lib/package-tarball-policy.mjs"
            task_id: "202610070509-WJ3M1R"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            changed_paths:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            evidence_digest: "sha256:fa56aba0122a90db29e822b1ac70fd3213b03e2de5778d8e335d4e539e1305d5"
            kind: "authority_delta"
            previous_fingerprint: "sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
            repository_evidence_digest: "sha256:7bdee3ba4e831573506c43234eca75b52e0ff767c5063b2738ec241446a5e432"
            request_digest: "sha256:5f5586ce0fb3dc54d0b3c55cdc342b8ebdc6bc55a3ccaa83bcc60244eb2a22fb"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:e854a283ea8f8d5c5efa521d947028a82ba0d8b76f77cdfd898e059fe6c146a4"
        digest: "sha256:eb0417724d37b8be0eae91fdeff5be555e42ddeb467dea9ba0fb666ecf701fff"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:36a22c99e240e413ddfeb532e1e97f1fe1d6c091e3d083c8a06fa16b34b289b8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "repository_write"
              resources: []
              scope_roots:
                - "scripts/checks/no-blueprint-engine.test.mjs"
                - "scripts/lib/package-tarball-policy.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
            expected_outputs:
              - "recipe-release-guard-evidence"
            id: "repair-recipe-release-guards"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610070509-WJ3M1R"
      intent_digest: "sha256:671a6105519e32fb7f15115757e71c7aeb0c99591988a9969397e513a04d019e"
      migration_receipts: []
      mutation_receipts:
        capture:202610070509-WJ3M1R:
          after_revision: 1
          aggregate_digest: "sha256:85ae544b4a1798aed9a22597722aeaf7aa21dc7e71d7e81c9a95c36ca61dfb55"
          before_revision: 0
          command_digest: "sha256:51d6bc3efcec36c8ed8b6ce549ae1463679a6b5639bfc2e892a137422330f429"
          effect_ids: []
          event_digests:
            - "sha256:0fc211453d117d38d9852e11471ebfd50f2908c8344bc239288e6e6e67166cdf"
          mutation_id: "capture:202610070509-WJ3M1R"
        kernel_work_item_claim_required:sha256:eb4c269ee68f33d6c96add3f3299262c1dc54bd74a2f6da0cf400e3bf2bcc563:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee:
          after_revision: 5
          aggregate_digest: "sha256:3f32e1d3b6b7cfa4aa8ae6a8f98c6f19e08197a1b9da0d4f4bb06ce2b24070ed"
          before_revision: 4
          command_digest: "sha256:1cbea3ee23e4f454ab72dd3388d3cac64321c8c0bd0bba940c1546effe852bd0"
          effect_ids: []
          event_digests:
            - "sha256:24f66ffaf4771a9e762c72f5dfcc19df58714091460a3de713ffd779622e97fd"
          mutation_id: "kernel_work_item_claim_required:sha256:eb4c269ee68f33d6c96add3f3299262c1dc54bd74a2f6da0cf400e3bf2bcc563:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
        kernel_work_item_execution_required:sha256:6f0a0646cc593974fa1ed548af0eea9b627725fb7509d4933e4e38d952c9ba6b:sha256:11bc9300353ea1414b2338a2433771fbd576e95402bc02f00c00b953d7a7369b:
          after_revision: 7
          aggregate_digest: "sha256:5a267e76ff64e733bf42141ffa729afd01c97fd9f7fe3d8b123fb385655c98e5"
          before_revision: 6
          command_digest: "sha256:d1a5f19183deb799041bddc6621d58053eb00341bfdf23ae9ad03cc3d8c9fe44"
          effect_ids: []
          event_digests:
            - "sha256:052caff964bdb12cba304c9157f2489570379bc9369c515239bea36f6103d734"
          mutation_id: "kernel_work_item_execution_required:sha256:6f0a0646cc593974fa1ed548af0eea9b627725fb7509d4933e4e38d952c9ba6b:sha256:11bc9300353ea1414b2338a2433771fbd576e95402bc02f00c00b953d7a7369b"
        kernel_work_item_materialization_required:sha256:43686132e4366622faaca8a2bf8e4d374576d3094e6381c488d77bb1e6bea4f3:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee:
          after_revision: 4
          aggregate_digest: "sha256:df3545390e428566d85cf29759da5fca683f65a61a7e1d56956cbb17658287a1"
          before_revision: 3
          command_digest: "sha256:600958e8763b6e6d74d4305796e4c814b0044fabf128f8615921962a9f08e707"
          effect_ids: []
          event_digests:
            - "sha256:a5bb5a4981c7786b865ac04173e80b2f3e9864be16ff3ebe91bfc0932d0b697b"
          mutation_id: "kernel_work_item_materialization_required:sha256:43686132e4366622faaca8a2bf8e4d374576d3094e6381c488d77bb1e6bea4f3:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
        result:sha256:4d72fe9d5f453ea34a7fdd1f0f6c79fd2eee88535566745d4ea9988a5aeea35b:
          after_revision: 2
          aggregate_digest: "sha256:d5b3b2648528ff9745f04914751026b63d603911e46b23013a45d54d264f20e3"
          before_revision: 1
          command_digest: "sha256:591d740e7608d1e2bd804c0798b5dc6823051b00f6760e7beabf7ff5169bb9bf"
          effect_ids: []
          event_digests:
            - "sha256:a240d5f6cf381f804e95ca27744ddbb298bea98969347db1682f2abaf46ae0d8"
          mutation_id: "result:sha256:4d72fe9d5f453ea34a7fdd1f0f6c79fd2eee88535566745d4ea9988a5aeea35b"
        sha256:0ca17f367803fe4da97b948fe6ec27917b61fe23e1ac39e83c04ae305cf2687d:
          after_revision: 6
          aggregate_digest: "sha256:77647d4c9f2cdc3bb1ee29b617176993871963c3ca67c01d1fb952cadb60291a"
          before_revision: 5
          command_digest: "sha256:d7527ebd2ed092778d3af8aeeb5f75aa0c6c3ca888594d13e2aa4e2ff1a92b66"
          effect_ids: []
          event_digests:
            - "sha256:82ef5119b459b489c01eb7383e7533d7157d01e5785711cf3284009b72153e45"
          mutation_id: "sha256:0ca17f367803fe4da97b948fe6ec27917b61fe23e1ac39e83c04ae305cf2687d"
        sha256:8bd2e02c9fa0df3e50f82357cb23718590ce0fda8dcef38cb373d9b2459758a1:
          after_revision: 3
          aggregate_digest: "sha256:7a68f37c14887e6817d768b1f4fb75bbcec74f48eb481f2d4aa0b49a9d472e1b"
          before_revision: 2
          command_digest: "sha256:c6ee257c5c0f76a71ecc0143db7d291186ccd0dce9e18cfad6ea14c141ae505a"
          effect_ids: []
          event_digests:
            - "sha256:75e087984cb2a25aec16137a1394983adcf7c307a5ac11d8c81a0375823edcc2"
          mutation_id: "sha256:8bd2e02c9fa0df3e50f82357cb23718590ce0fda8dcef38cb373d9b2459758a1"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-recipe-release-guards:
          attempt: 1
          claim_id: "sha256:eabcf1e41c2e8cf74f91fb2cc58c59662972a9d5f5a6ba70961ad2b408ca4d74"
          definition:
            contract_digest: "sha256:36a22c99e240e413ddfeb532e1e97f1fe1d6c091e3d083c8a06fa16b34b289b8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "repository_write"
              resources: []
              scope_roots:
                - "scripts/checks/no-blueprint-engine.test.mjs"
                - "scripts/lib/package-tarball-policy.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
            expected_outputs:
              - "recipe-release-guard-evidence"
            id: "repair-recipe-release-guards"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:f8ae0376ef338bed6e342bfb3301197f36d5c278191e3659af829f8c2f251d7f"
    documents:
      contracts:
        sha256:36a22c99e240e413ddfeb532e1e97f1fe1d6c091e3d083c8a06fa16b34b289b8:
          acceptance_criteria:
            - "Allow and require exactly dist/recipe-api.js and dist/recipe-api.d.ts for agentplane, matching existing ./recipes exports. Do not broaden dist patterns or change exports, versions or runtime API. Preserve arbitrary-dist, source, tests, sourcemap and other denied-path rejection."
            - "Add only packages/agentplane/src/recipe-api.ts to explicit cold-reader exceptions with rationale limited to historical artifact-kind type union. Preserve active Blueprint engine/mutation/import and generated schema prohibition; add a focused assertion that the exception does not permit a runtime Blueprint surface."
            - "Update only the explicit reviewed compatibility delta and v0.7 candidate snapshot needed for these two exact allowed/required files. Preserve scripts/baselines/v0.6.24-compatibility-contract.json byte-for-byte. Keep rejection assertions for unreviewed compatibility changes; no blanket recapture acceptance."
            - "Add regular-CI Vitest regressions for both allowed/required Recipe API files and missing-required or neighboring/unreviewed dist paths, source/test/map rejection. Verify actual packed exports resolve to these files through the existing package tarball guard when build artifacts are available. Do not treat policy-unit tests as packed verification."
            - "Run focused tests, compatibility checks and file formatting with original60000ms test/hook limits and one worker. Native verifier retains mandatory release:check/fullCI responsibilities; do not claim unrun heavy checks. Report missing build prerequisites honestly; coordinate expensive checks. Preserve mandatory independent EVALUATOR and ordinary no-Recipe operation."
            - "Return source inventory, patch, actual check logs and digest-bound report. No lifecycle, source commits, network, publication or manual task-state changes in semantic episode. Preserve separately blocked candidate history. M05 remains NOT ESTABLISHED with unresolved owner disposition; no paid campaign or debt acceptance inferred."
          objective: "Repair exact Recipe API packaging and historical Blueprint guard omissions observed on candidate3dc39b85, on current main79709e67. Preserve strict release gates and immutable historical compatibility baseline. Limit edits to the five named files. Native operator integrates the independently reviewed repair before separately resuming release candidate qualification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run release:check"
            - "git diff --check"
            - "node --test scripts/checks/no-blueprint-engine.test.mjs"
            - "node scripts/checks/check-compatibility-contract-baseline.mjs"
            - "bunx --no-install vitest run packages/agentplane/src/commands/release/package-tarball-policy.test.ts --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000"
            - "node scripts/bench/capture-compatibility-candidate.mjs --check"
            - "bunx --no-install prettier --check scripts/checks/no-blueprint-engine.test.mjs scripts/lib/package-tarball-policy.mjs scripts/checks/check-compatibility-contract-baseline.mjs scripts/baselines/v0.7-compatibility-candidate.json packages/agentplane/src/commands/release/package-tarball-policy.test.ts"
      intent:
        context: "Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt."
        objective: "Repair Recipe API release packaging and Blueprint guards for 0.7.13"
    events:
      -
        command_digest: "sha256:51d6bc3efcec36c8ed8b6ce549ae1463679a6b5639bfc2e892a137422330f429"
        id: "capture:202610070509-WJ3M1R:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610070509-WJ3M1R"
        occurred_at: "2026-10-07T05:09:38.246Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610070509-WJ3M1R"
        task_revision: 1
      -
        command_digest: "sha256:591d740e7608d1e2bd804c0798b5dc6823051b00f6760e7beabf7ff5169bb9bf"
        id: "result:sha256:4d72fe9d5f453ea34a7fdd1f0f6c79fd2eee88535566745d4ea9988a5aeea35b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4d72fe9d5f453ea34a7fdd1f0f6c79fd2eee88535566745d4ea9988a5aeea35b"
        occurred_at: "2026-10-07T05:11:13.610Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610070509-WJ3M1R"
        task_revision: 2
      -
        command_digest: "sha256:c6ee257c5c0f76a71ecc0143db7d291186ccd0dce9e18cfad6ea14c141ae505a"
        id: "sha256:8bd2e02c9fa0df3e50f82357cb23718590ce0fda8dcef38cb373d9b2459758a1:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8bd2e02c9fa0df3e50f82357cb23718590ce0fda8dcef38cb373d9b2459758a1"
        occurred_at: "2026-10-07T05:11:41.187Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610070509-WJ3M1R"
        task_revision: 3
      -
        command_digest: "sha256:600958e8763b6e6d74d4305796e4c814b0044fabf128f8615921962a9f08e707"
        id: "kernel_work_item_materialization_required:sha256:43686132e4366622faaca8a2bf8e4d374576d3094e6381c488d77bb1e6bea4f3:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:43686132e4366622faaca8a2bf8e4d374576d3094e6381c488d77bb1e6bea4f3:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
        occurred_at: "2026-10-07T05:11:59.781Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610070509-WJ3M1R"
        task_revision: 4
      -
        command_digest: "sha256:1cbea3ee23e4f454ab72dd3388d3cac64321c8c0bd0bba940c1546effe852bd0"
        id: "kernel_work_item_claim_required:sha256:eb4c269ee68f33d6c96add3f3299262c1dc54bd74a2f6da0cf400e3bf2bcc563:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:eb4c269ee68f33d6c96add3f3299262c1dc54bd74a2f6da0cf400e3bf2bcc563:sha256:723e95a88a5b7897b3ba8c82a96b8f644ca947d4653062a5d337a5366365a7ee"
        occurred_at: "2026-10-07T05:12:14.558Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610070509-WJ3M1R"
        task_revision: 5
      -
        command_digest: "sha256:d7527ebd2ed092778d3af8aeeb5f75aa0c6c3ca888594d13e2aa4e2ff1a92b66"
        id: "sha256:0ca17f367803fe4da97b948fe6ec27917b61fe23e1ac39e83c04ae305cf2687d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0ca17f367803fe4da97b948fe6ec27917b61fe23e1ac39e83c04ae305cf2687d"
        occurred_at: "2026-10-07T05:13:45.218Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610070509-WJ3M1R"
        task_revision: 6
      -
        command_digest: "sha256:d1a5f19183deb799041bddc6621d58053eb00341bfdf23ae9ad03cc3d8c9fe44"
        id: "kernel_work_item_execution_required:sha256:6f0a0646cc593974fa1ed548af0eea9b627725fb7509d4933e4e38d952c9ba6b:sha256:11bc9300353ea1414b2338a2433771fbd576e95402bc02f00c00b953d7a7369b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6f0a0646cc593974fa1ed548af0eea9b627725fb7509d4933e4e38d952c9ba6b:sha256:11bc9300353ea1414b2338a2433771fbd576e95402bc02f00c00b953d7a7369b"
        occurred_at: "2026-10-07T05:14:20.925Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610070509-WJ3M1R"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair Recipe API release packaging and Blueprint guards for 0.7.13

Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.

## Scope

- In scope: Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.
- Out of scope: unrelated refactors not required for "Repair Recipe API release packaging and Blueprint guards for 0.7.13".

## Plan

1. Execute approved WorkItem repair-recipe-release-guards.

## Verify Steps

PLANNER fallback scaffold for "Repair Recipe API release packaging and Blueprint guards for 0.7.13". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair Recipe API release packaging and Blueprint guards for 0.7.13". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
