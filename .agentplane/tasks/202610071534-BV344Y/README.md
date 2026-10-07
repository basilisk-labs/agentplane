---
id: "202610071534-BV344Y"
title: "Preserve unchanged PR review artifacts during provider hydration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "v0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run format:check"
  - "git diff --check"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T15:37:31.563Z"
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
      - "packages/agentplane/src/commands/pr/internal/review-template.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
  declaration:
    external_effects: []
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
      - "packages/agentplane/src/commands/pr/internal/review-template.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
          - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
          - "packages/agentplane/src/commands/pr/internal/review-template.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:0bb46ae5717dd4c111883e42bab4ee14d387dcfed88179d6fe6a3da17e8819e4"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
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
doc_updated_at: "2026-10-07T15:34:28.288Z"
doc_updated_by: "CODER"
description: "Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements."
sections:
  Summary: |-
    Preserve unchanged PR review artifacts during provider hydration

    Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.
  Scope: |-
    - In scope: Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.
    - Out of scope: unrelated refactors not required for "Preserve unchanged PR review artifacts during provider hydration".
  Plan: "1. Execute approved WorkItem stabilize-pr-hydration-artifacts."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "f285c23ba586c2ffeda7346cfbf9e9081c3f4f71"
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
            digest: "sha256:bef341d439b3f24cc0d04378271ad084ccf867f53fdb3fe899ad9a4239f89d4f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:08d4e946c551a20718bfbca6c72a2e9a2cb91abbd6ad50e948a25cd4005bbcdd"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            task_id: "202610071534-BV344Y"
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
            digest: "sha256:abc637a3e35a60b827fcb8fb6f052788ed7a33ca8157cd5daa6805b8644f12d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:08d4e946c551a20718bfbca6c72a2e9a2cb91abbd6ad50e948a25cd4005bbcdd"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
              kind: "USER"
              parent_authority_digest: "sha256:bef341d439b3f24cc0d04378271ad084ccf867f53fdb3fe899ad9a4239f89d4f"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610071534-BV344Y"
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
            evidence_digest: "sha256:6a843d5e79b659b99857f6fb9a3b8eb8c785a5ff7cc085f5a33332834d622f3c"
            kind: "authority_delta"
            previous_fingerprint: "sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
            repository_evidence_digest: "sha256:b80b15e303669a280334dd12c96de021adb13713ea86ec2fc47bcc1e9dc50bd8"
            request_digest: "sha256:31ae2ae3ba1014a10251fcd1fca722e8089872fde0f39e5452f09d87e18e94b0"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
        digest: "sha256:08d4e946c551a20718bfbca6c72a2e9a2cb91abbd6ad50e948a25cd4005bbcdd"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:c6c217c0cefcbdf957d9157c635ed02d47f1e73e55b37d533cccbc37e33fad03"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            expected_outputs:
              - "pr-hydration-evidence"
            id: "stabilize-pr-hydration-artifacts"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610071534-BV344Y"
      intent_digest: "sha256:3f19f2575ba712f6c9d2497db9263ec711267ad6bc634790b9609e5c22892fbf"
      migration_receipts: []
      mutation_receipts:
        capture:202610071534-BV344Y:
          after_revision: 1
          aggregate_digest: "sha256:de1a5170942c19ac639f7f66266fba0a03d6b78f4d2f8a05fc4a6b4bd6ada32f"
          before_revision: 0
          command_digest: "sha256:bb159e10fc342ad788b5015ccb1485375cae21b6208f65c4078864e0fd479643"
          effect_ids: []
          event_digests:
            - "sha256:f9dcc11ab37f5d335653a6ef799aa51ebc4e90287e6cf4a81e7ea1c9d222def9"
          mutation_id: "capture:202610071534-BV344Y"
        kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:
          after_revision: 5
          aggregate_digest: "sha256:0f52a83d91e6008f82a1504bb578f8bd4e4386b31c97c9b61f55a862c31c163e"
          before_revision: 4
          command_digest: "sha256:55e7402fce191f6298301df1d51e25ac99569ccbed8d8c05ffdcd1191de9c18e"
          effect_ids: []
          event_digests:
            - "sha256:b93ad7ebc8b2d4873bb329c9badd74720ded47224c4d26f174c1d7b2f5ded15e"
          mutation_id: "kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:
          after_revision: 7
          aggregate_digest: "sha256:cb96879829e7b2d58fab248ef1b95e6efd823b61d5d26844d6f5369baef81063"
          before_revision: 6
          command_digest: "sha256:9396b51de2cdbd6fc176b1c1d15967d23c0d4656540dcda5c17f207112cf992d"
          effect_ids: []
          event_digests:
            - "sha256:b5f34e791805487ff814db9944ba22e1e6b14f8922975c8d414fde23d9d98307"
          mutation_id: "kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:
          after_revision: 4
          aggregate_digest: "sha256:43e0363dfa8dbd60ba40f289a459675f0ffe4400cd0d3d919dac0d41693ed716"
          before_revision: 3
          command_digest: "sha256:5b5ae8a780112c1dcb6e9d20cdab56f13e9d7ca4fb71ca5814cd50a70a6bff38"
          effect_ids: []
          event_digests:
            - "sha256:df2c55996858f58039804eb5524413da68910d1e2ce41a6baf825c416cccede8"
          mutation_id: "kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd:
          after_revision: 2
          aggregate_digest: "sha256:af79e68e12b0594491e3c513b88f97ff75e8cda6e9ce902487a09ec8ee03189e"
          before_revision: 1
          command_digest: "sha256:93aae4812ecfdc3916cde7b5ba7721c61d137b4f4f0f332d72d730582a6365d9"
          effect_ids: []
          event_digests:
            - "sha256:fe2e969f42137e1aa7188c01b7ccd6b881481329328d61f01dc8eb1e1aa88164"
          mutation_id: "result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd"
        sha256:22463cb780f42d55381bafb4cc1bb427cee868e01cab3366316a8141a0c594c9:
          after_revision: 6
          aggregate_digest: "sha256:1dbaf17c19b86b76fa968d216b0a0a0d65efbb3303c962f786560190c95af5f0"
          before_revision: 5
          command_digest: "sha256:7b17be3d442fc5b7e02748393ea81f8fa2506162cd1cec6bea2e727793739a80"
          effect_ids: []
          event_digests:
            - "sha256:01ab1e5f228d78896e04c53f064f92e7528d330190c00696caf1ce8d728d2a1a"
          mutation_id: "sha256:22463cb780f42d55381bafb4cc1bb427cee868e01cab3366316a8141a0c594c9"
        sha256:72cdf442cce0ad23a8dbe97dcc5dd7399831848b1e2063286894fa88617a7cd2:
          after_revision: 3
          aggregate_digest: "sha256:6f5ef8ffdca43eb2f81fee25174cf05a7fe7251241a9a9d85d8ec793c7c94b87"
          before_revision: 2
          command_digest: "sha256:4bac27a257a8b21215b8d4cd5ca84bd63b55bbae1f1f05bd611cdb454a113bb8"
          effect_ids: []
          event_digests:
            - "sha256:48c30b4c87a38b53d97af758f192b5ac13e607d3924c790fc982b48d00312443"
          mutation_id: "sha256:72cdf442cce0ad23a8dbe97dcc5dd7399831848b1e2063286894fa88617a7cd2"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        stabilize-pr-hydration-artifacts:
          attempt: 1
          claim_id: "sha256:21a1102bfafe9f9e4c34581876139f79a987306891969e694f5e86357a870da7"
          definition:
            contract_digest: "sha256:c6c217c0cefcbdf957d9157c635ed02d47f1e73e55b37d533cccbc37e33fad03"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            expected_outputs:
              - "pr-hydration-evidence"
            id: "stabilize-pr-hydration-artifacts"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:9f130bc8b2476a515ba4d9308092efbae71fb1771729e8984a0ff40294bf9dfa"
    documents:
      contracts:
        sha256:c6c217c0cefcbdf957d9157c635ed02d47f1e73e55b37d533cccbc37e33fad03:
          acceptance_criteria:
            - "Keep review.md and github-body.md byte-stable on second and third PR open reruns when only provider identity, link or lifecycle metadata changes. Preserve provider metadata freshness and identity."
            - "Preserve the prior summary timestamp only when the rendered semantic evidence is unchanged. Reuse the existing renderer owner for a minimal stable-summary helper. Do not merely capture pre-provider metadata time because later reruns already contain advanced metadata."
            - "Regenerate summaries for genuine diff, branch or evidence changes. Missing or malformed prior blocks regenerate safely. Continue reflecting task content changes rather than indiscriminately reusing old documents."
            - "Retain both existing failing hydration assertions, including the only-metadata-dirty condition. Add deterministic distinct-timestamp coverage for a third rerun, provider metadata persistence, genuine content/diff mutation and malformed blocks. Do not freeze clocks to conceal drift or weaken assertions."
            - "Only the four declared files may change. Preserve all other provider behavior, review requirements, baselines and gates. Return source hashes and observed focused checks. Independent EVALUATOR, native full verification and hosted branch integration remain required before candidate requalification. No release version changes, paid measurements or M05 disposition."
          objective: "Preserve unchanged rendered PR evidence during provider-only hydration without suppressing truthful provider metadata updates. Use the existing summary renderer and PR open owner."
          role: "EXECUTOR"
          verification_commands:
            - "bun run format:check"
            - "git diff --check"
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
      intent:
        context: "Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements."
        objective: "Preserve unchanged PR review artifacts during provider hydration"
    events:
      -
        command_digest: "sha256:bb159e10fc342ad788b5015ccb1485375cae21b6208f65c4078864e0fd479643"
        id: "capture:202610071534-BV344Y:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610071534-BV344Y"
        occurred_at: "2026-10-07T15:34:28.227Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610071534-BV344Y"
        task_revision: 1
      -
        command_digest: "sha256:93aae4812ecfdc3916cde7b5ba7721c61d137b4f4f0f332d72d730582a6365d9"
        id: "result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd"
        occurred_at: "2026-10-07T15:36:55.352Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610071534-BV344Y"
        task_revision: 2
      -
        command_digest: "sha256:4bac27a257a8b21215b8d4cd5ca84bd63b55bbae1f1f05bd611cdb454a113bb8"
        id: "sha256:72cdf442cce0ad23a8dbe97dcc5dd7399831848b1e2063286894fa88617a7cd2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:72cdf442cce0ad23a8dbe97dcc5dd7399831848b1e2063286894fa88617a7cd2"
        occurred_at: "2026-10-07T15:37:28.195Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610071534-BV344Y"
        task_revision: 3
      -
        command_digest: "sha256:5b5ae8a780112c1dcb6e9d20cdab56f13e9d7ca4fb71ca5814cd50a70a6bff38"
        id: "kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        occurred_at: "2026-10-07T15:37:56.927Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610071534-BV344Y"
        task_revision: 4
      -
        command_digest: "sha256:55e7402fce191f6298301df1d51e25ac99569ccbed8d8c05ffdcd1191de9c18e"
        id: "kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        occurred_at: "2026-10-07T15:38:11.358Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610071534-BV344Y"
        task_revision: 5
      -
        command_digest: "sha256:7b17be3d442fc5b7e02748393ea81f8fa2506162cd1cec6bea2e727793739a80"
        id: "sha256:22463cb780f42d55381bafb4cc1bb427cee868e01cab3366316a8141a0c594c9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:22463cb780f42d55381bafb4cc1bb427cee868e01cab3366316a8141a0c594c9"
        occurred_at: "2026-10-07T15:40:30.599Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610071534-BV344Y"
        task_revision: 6
      -
        command_digest: "sha256:9396b51de2cdbd6fc176b1c1d15967d23c0d4656540dcda5c17f207112cf992d"
        id: "kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        occurred_at: "2026-10-07T15:41:07.527Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610071534-BV344Y"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve unchanged PR review artifacts during provider hydration

Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.

## Scope

- In scope: Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.
- Out of scope: unrelated refactors not required for "Preserve unchanged PR review artifacts during provider hydration".

## Plan

1. Execute approved WorkItem stabilize-pr-hydration-artifacts.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
