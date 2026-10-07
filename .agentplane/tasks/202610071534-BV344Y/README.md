---
id: "202610071534-BV344Y"
title: "Preserve unchanged PR review artifacts during provider hydration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 19
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
  updated_at: "2026-10-07T16:20:45.903Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-07T15:59:27.008Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:b2b1501e61357d5b7c693037f2eaacbe6d303576019eb85894cda81f78d398e7"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-07T15:59:27.008Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "06a9c47935d341cf065fd4678b4a5854b6ebdca1"
  review_identity_digest: "sha256:894257ddf54337f6ebb344a1afad3f500454000df4cac2cb4eb4eb568e8fcbd7"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610071534-BV344Y/7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822/quality-report.json"
  findings:
    - "Verified manifest 464601773791defd9e86cccc95d8ba742d6ae78015cbe5e17d84b41017927f5a and all 13 required blocks, accepted result, repository/native-validation evidence, report f88a5aae261b7de3a7826fa9dd0dc438cf0b8208589ad02c69343caee03f973a and exact schema 42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc. Four current and committed files match the report inventory at 06a9c47935d341cf065fd4678b4a5854b6ebdca1; five retained check logs match their hashes."
    - "The existing renderer owns stable selection. It requires one start/end block, a canonical valid ISO timestamp and exact equality against the current rendered branch/diff evidence using that timestamp. Changed evidence, duplicate/missing/malformed blocks and invalid calendar dates regenerate. It does not merely retain pre-provider metadata time."
    - "PR open uses the helper for outgoing creation body and final local documents. Provider metadata construction and persistence remain unchanged; review/body are still rendered from current task, handoff notes and related-task inputs. No old complete document is blindly reused."
    - "Tests retain hydration byte-equality and only-metadata-dirty assertions, seed a genuinely distinct historical summary time, verify persisted identity and later metadata time, and cover third reruns. The former changed-byte fixture now makes an actual task summary change while retaining both inequalities and adding a changed-content assertion; another identical remote lookup remains stable. Helper negatives cover branch/diff changes and malformed ISO/blocks."
    - "Fresh native checks all passed: full formatting, diff check and 24 tests across two assigned suites. This evaluator read native evidence and source; no tests were rerun and no implementation was authored or modified."
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
commit:
  hash: "06a9c47935d341cf065fd4678b4a5854b6ebdca1"
  message: "AgentPlane-owned canonical implementation commit"
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
  Plan: |-
    1. Execute approved WorkItem stabilize-pr-hydration-artifacts.
    2. Execute approved WorkItem validate-pr-metadata-test-types.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:7a7f7adc48f4634e315f6a336bbafd580cd9f47588f03231618b1bb73e14b0d4"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610071534-BV344Y/7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822/quality-report.json"
    findings:
      - "Verified manifest 464601773791defd9e86cccc95d8ba742d6ae78015cbe5e17d84b41017927f5a and all 13 required blocks, accepted result, repository/native-validation evidence, report f88a5aae261b7de3a7826fa9dd0dc438cf0b8208589ad02c69343caee03f973a and exact schema 42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc. Four current and committed files match the report inventory at 06a9c47935d341cf065fd4678b4a5854b6ebdca1; five retained check logs match their hashes."
      - "The existing renderer owns stable selection. It requires one start/end block, a canonical valid ISO timestamp and exact equality against the current rendered branch/diff evidence using that timestamp. Changed evidence, duplicate/missing/malformed blocks and invalid calendar dates regenerate. It does not merely retain pre-provider metadata time."
      - "PR open uses the helper for outgoing creation body and final local documents. Provider metadata construction and persistence remain unchanged; review/body are still rendered from current task, handoff notes and related-task inputs. No old complete document is blindly reused."
      - "Tests retain hydration byte-equality and only-metadata-dirty assertions, seed a genuinely distinct historical summary time, verify persisted identity and later metadata time, and cover third reruns. The former changed-byte fixture now makes an actual task summary change while retaining both inequalities and adding a changed-content assertion; another identical remote lookup remains stable. Helper negatives cover branch/diff changes and malformed ISO/blocks."
      - "Fresh native checks all passed: full formatting, diff check and 24 tests across two assigned suites. This evaluator read native evidence and source; no tests were rerun and no implementation was authored or modified."
    implementation_commit: "06a9c47935d341cf065fd4678b4a5854b6ebdca1"
    implementation_tree: "d43c64dfae470741b1188bd62537311f321ba3e3"
    projected_at: "2026-10-07T15:59:27.008Z"
    review_identity_digest: "sha256:894257ddf54337f6ebb344a1afad3f500454000df4cac2cb4eb4eb568e8fcbd7"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:b2b1501e61357d5b7c693037f2eaacbe6d303576019eb85894cda81f78d398e7"
    work_order_id: "sha256:2a3eaa44840c4dfa81d9725c39339e9a002cc6f4e850e8ea2db4494db40be252"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bcb1dbf3bd72280a03e8c356864b67a93d6fd615bd27a6051f8122e6d35744f7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:08d4e946c551a20718bfbca6c72a2e9a2cb91abbd6ad50e948a25cd4005bbcdd"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:abc637a3e35a60b827fcb8fb6f052788ed7a33ca8157cd5daa6805b8644f12d6"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
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
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
              - "packages/agentplane/src/commands/pr/internal/review-template.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            evidence_digest: "sha256:8b0b11a242d5331d9e101553d764a18419ff161db622a2c386cd50144a94f998"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ad48432cf701efcf5a073dbcfe45b8c57b9068b91c6b750c2f33657c9531d454"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b"
            plan_revision: 2
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:bcb1dbf3bd72280a03e8c356864b67a93d6fd615bd27a6051f8122e6d35744f7"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
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
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:f2bc1731ca571a480a4822037be35aaac4c57b5304e9e4613c3c3d2f92fbacb5"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:efecaa591d156e88676a3938c171fcbba03470e2196195f1ec24a99eba61f5a6"
        digest: "sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b"
        revision: 2
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
          -
            contract_digest: "sha256:942e796295db4f8bf731d6fcebb4b00b7951c3a7dc5e8b7cbf73a51b2060b1c4"
            depends_on:
              - "stabilize-pr-hydration-artifacts"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
            expected_outputs:
              - "pr-hydration-lint-recovery-evidence"
            id: "validate-pr-metadata-test-types"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610071534-BV344Y"
      intent_digest: "sha256:3f19f2575ba712f6c9d2497db9263ec711267ad6bc634790b9609e5c22892fbf"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b:
          after_revision: 13
          aggregate_digest: "sha256:3f43e878233ca6c91ee5d1ab307247cf242920b04d064d25dfe90e073f8bcef8"
          before_revision: 12
          command_digest: "sha256:3b9ac5447c3ea78a5846ca6f7b1bbf77cfd3ff3164009cee6e8a99585d0e2709"
          effect_ids: []
          event_digests:
            - "sha256:9ccfa1bfcd4954696ebbe7ef42827667a496e47471d6ca5bc1ade506e00d631e"
          mutation_id: "amend:sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b"
        capture:202610071534-BV344Y:
          after_revision: 1
          aggregate_digest: "sha256:de1a5170942c19ac639f7f66266fba0a03d6b78f4d2f8a05fc4a6b4bd6ada32f"
          before_revision: 0
          command_digest: "sha256:bb159e10fc342ad788b5015ccb1485375cae21b6208f65c4078864e0fd479643"
          effect_ids: []
          event_digests:
            - "sha256:f9dcc11ab37f5d335653a6ef799aa51ebc4e90287e6cf4a81e7ea1c9d222def9"
          mutation_id: "capture:202610071534-BV344Y"
        kernel_work_item_claim_required:sha256:08490654e3466124efbe73f1fed99bdbd5b577b3809c492eee9ff070c0ada9b9:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:
          after_revision: 15
          aggregate_digest: "sha256:0674e16116c72d7421442a8c6ad930c2cb769b8894320d3fac5fa13a38f3aab0"
          before_revision: 14
          command_digest: "sha256:1b87bd6b329c6e327c849f7ee4008191b7a3734a2db9033d814f92cadc981783"
          effect_ids: []
          event_digests:
            - "sha256:ca12f4ef1c62500680630b79777f7c23cd86b4876987fc4b6643e92264adfcdf"
          mutation_id: "kernel_work_item_claim_required:sha256:08490654e3466124efbe73f1fed99bdbd5b577b3809c492eee9ff070c0ada9b9:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:
          after_revision: 5
          aggregate_digest: "sha256:0f52a83d91e6008f82a1504bb578f8bd4e4386b31c97c9b61f55a862c31c163e"
          before_revision: 4
          command_digest: "sha256:55e7402fce191f6298301df1d51e25ac99569ccbed8d8c05ffdcd1191de9c18e"
          effect_ids: []
          event_digests:
            - "sha256:b93ad7ebc8b2d4873bb329c9badd74720ded47224c4d26f174c1d7b2f5ded15e"
          mutation_id: "kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:
          after_revision: 16
          aggregate_digest: "sha256:06ebe1266ff9b50c8c15b42904e3bc0cf28a4b7295976f40b1a3e9fdf447055d"
          before_revision: 15
          command_digest: "sha256:fd3fd33b1faefc67ac65bfa31c79d86697e5930bcf6180ff04c3bcaa4eba5b70"
          effect_ids: []
          event_digests:
            - "sha256:eea268f8c2547ba3c7b47e20a932d21b2df0a2b2f91b196f258e3348db023a4d"
          mutation_id: "kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:
          after_revision: 7
          aggregate_digest: "sha256:cb96879829e7b2d58fab248ef1b95e6efd823b61d5d26844d6f5369baef81063"
          before_revision: 6
          command_digest: "sha256:9396b51de2cdbd6fc176b1c1d15967d23c0d4656540dcda5c17f207112cf992d"
          effect_ids: []
          event_digests:
            - "sha256:b5f34e791805487ff814db9944ba22e1e6b14f8922975c8d414fde23d9d98307"
          mutation_id: "kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        kernel_work_item_inspection_required:sha256:e8749c1b78fa12f58ed26186439806b5c19de976aee6f9c514ae00690b919ded:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:
          after_revision: 10
          aggregate_digest: "sha256:f893ac83f85dbc92170b457e336ffe50621e0396d2fe36e8d0da465c501d091f"
          before_revision: 9
          command_digest: "sha256:b3ad12eb39db17d8333e0c2d85006ae20b569878ec354009be285fd6040d4b6e"
          effect_ids: []
          event_digests:
            - "sha256:78df350e0e32c0904547e53caff76ff30a798bb005acd0b2dc7cc0a6727e03cb"
          mutation_id: "kernel_work_item_inspection_required:sha256:e8749c1b78fa12f58ed26186439806b5c19de976aee6f9c514ae00690b919ded:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:
          after_revision: 4
          aggregate_digest: "sha256:43e0363dfa8dbd60ba40f289a459675f0ffe4400cd0d3d919dac0d41693ed716"
          before_revision: 3
          command_digest: "sha256:5b5ae8a780112c1dcb6e9d20cdab56f13e9d7ca4fb71ca5814cd50a70a6bff38"
          effect_ids: []
          event_digests:
            - "sha256:df2c55996858f58039804eb5524413da68910d1e2ce41a6baf825c416cccede8"
          mutation_id: "kernel_work_item_materialization_required:sha256:477cf0bc16131dab16ee7a1a8b00534bbd8464ea682037674562ed68a226b327:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        result:sha256:2a3eaa44840c4dfa81d9725c39339e9a002cc6f4e850e8ea2db4494db40be252:
          after_revision: 9
          aggregate_digest: "sha256:d1a3f2470dd42af35d59b023e0d47cda18fa6a185b712605c109da18ca0c11f3"
          before_revision: 8
          command_digest: "sha256:1533a95d0d96f6198f2d88c426a450db13c0447177739e27f08a94756f572ec0"
          effect_ids: []
          event_digests:
            - "sha256:5561d15ff52d30d9cc6e923dfce9ad3a7f043008b2a2062bb23765ff48106c04"
          mutation_id: "result:sha256:2a3eaa44840c4dfa81d9725c39339e9a002cc6f4e850e8ea2db4494db40be252"
        result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd:
          after_revision: 2
          aggregate_digest: "sha256:af79e68e12b0594491e3c513b88f97ff75e8cda6e9ce902487a09ec8ee03189e"
          before_revision: 1
          command_digest: "sha256:93aae4812ecfdc3916cde7b5ba7721c61d137b4f4f0f332d72d730582a6365d9"
          effect_ids: []
          event_digests:
            - "sha256:fe2e969f42137e1aa7188c01b7ccd6b881481329328d61f01dc8eb1e1aa88164"
          mutation_id: "result:sha256:edc7590f8995b52e1862ca8cd0251c707023fb493ae91623a2d874b0ec9192fd"
        sha256:1c087456426f88cf949b0d2e1ad46e32c8a1bb32c18cc00c73c4eb73b7fdfa5d:
          after_revision: 14
          aggregate_digest: "sha256:91ac6348540ab733c1e5fb3ad48c57ceb22a2eb8278d5322a9843a1c0b1a82cd"
          before_revision: 13
          command_digest: "sha256:f6d637bb4cd3c0b932084d29ed8a0e3053e42d8f88966f131984dd26e4b55214"
          effect_ids: []
          event_digests:
            - "sha256:be5b7ac94b5cccda043f3841d0e3ed771a31d24e1971d049b54c74bbddc0d977"
          mutation_id: "sha256:1c087456426f88cf949b0d2e1ad46e32c8a1bb32c18cc00c73c4eb73b7fdfa5d"
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
        sha256:9c6a7004ede02d9fe9104773928af5cac4b95e41fcfd32703d034ddb0098b9c6:
          after_revision: 8
          aggregate_digest: "sha256:00deffc237a17f974fc99eda9e6e2ad4c40539dfa96455f4669b0ffc1bae3a45"
          before_revision: 7
          command_digest: "sha256:04a237809c8ab1fc44f1a41b76ae35b36c52114434c1f1f4a0a0a7ceddbb973a"
          effect_ids: []
          event_digests:
            - "sha256:b73117e546dcc509a908a72524bb583d91653cfe57265c0d16456db86fc8cc39"
          mutation_id: "sha256:9c6a7004ede02d9fe9104773928af5cac4b95e41fcfd32703d034ddb0098b9c6"
        validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e:
          after_revision: 12
          aggregate_digest: "sha256:268254d08d82b3dc863ba77425df940590f89f0117846d87538463e2f16e5e10"
          before_revision: 11
          command_digest: "sha256:e2d839db95dd20b0243e88d23c98615bafa4d2f2155f1134c0b91abcf1271aae"
          effect_ids: []
          event_digests:
            - "sha256:b037483074a5272b40c13229745713d9964176cd8ee748ca2f2c3b8b5c157eda"
          mutation_id: "validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e"
        validation:sha256:7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822:
          after_revision: 11
          aggregate_digest: "sha256:2c7b96e6b95fd255a0b76b8fa472ad58866ae6e4d912f1b036120784033ac400"
          before_revision: 10
          command_digest: "sha256:d9a408404762cd544577e0ffc795c17fd8887f0f169491992908849fdebde868"
          effect_ids: []
          event_digests:
            - "sha256:184eba47585ca456c8bf027652536711e2fb17dc413fcfc6f5f08cb33f4d38a9"
          mutation_id: "validation:sha256:7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
          digest: "sha256:08d4e946c551a20718bfbca6c72a2e9a2cb91abbd6ad50e948a25cd4005bbcdd"
          revision: 1
          state: "SUPERSEDED"
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
      revision: 16
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:f88a5aae261b7de3a7826fa9dd0dc438cf0b8208589ad02c69343caee03f973a"
              id: "pr-hydration-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
              task_id: "202610071534-BV344Y"
              work_item_id: "stabilize-pr-hydration-artifacts"
          result_digest: "sha256:6ae4a1db78c5ab94b48961ae5cfc535e001b6d82e28c50257b91ff804191fd45"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:789268b81d0adff0f2dd37e3a214866b32daac9bf1454b307b5501e20123337c"
              - "sha256:894257ddf54337f6ebb344a1afad3f500454000df4cac2cb4eb4eb568e8fcbd7"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b6a98ac9611702f1dd6a702419e8349caf36f7a818fb820285ffef039920ea0d"
              environment_digest: "sha256:1ad08141eea44d0acec1c7fba315861eb6c0e53c39c57eb4b9ccd11d7fb4588b"
              implementation_identity: "sha256:6ae4a1db78c5ab94b48961ae5cfc535e001b6d82e28c50257b91ff804191fd45"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-07T15:59:27.008Z"
            status: "PASSED"
        validate-pr-metadata-test-types:
          attempt: 1
          claim_id: "sha256:cb7ebfeb64c8c1e5492ea451ef186ddf480f2d4bdfc0b1d28758995ac4607408"
          definition:
            contract_digest: "sha256:942e796295db4f8bf731d6fcebb4b00b7951c3a7dc5e8b7cbf73a51b2060b1c4"
            depends_on:
              - "stabilize-pr-hydration-artifacts"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
            expected_outputs:
              - "pr-hydration-lint-recovery-evidence"
            id: "validate-pr-metadata-test-types"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:4c0bd79cbe7a63d0e11ca7d551d75c8580698565fc1e176fd389d91be8bdbbe0"
    documents:
      contracts:
        sha256:942e796295db4f8bf731d6fcebb4b00b7951c3a7dc5e8b7cbf73a51b2060b1c4:
          acceptance_criteria:
            - "Resolve all eight TypeScript ESLint errors at the added provider metadata assertions. Do not use any, suppress lint rules, or weaken regression assertions."
            - "Keep production code and all other files unchanged. Preserve stable third reruns, truthful provider metadata, genuine task-content refresh and malformed-block coverage."
            - "Record the retained failed final verification at .git/agentplane/kernel/exchanges/202610071534-BV344Y/76b0d9b1b23556dc44770ebbfecb3499da5b9a8e18030274d38cbe76f45c786e/final-validation.json. Independent evaluation and full native final CI remain required."
          objective: "Correct unsafe JSON parsing in the PR hydration regression tests identified by retained final CI evidence. Preserve all behavior and assertions. Use the existing validated PR metadata reader or safe unknown validation."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "bun run format:check"
            - "git diff --check"
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
      -
        command_digest: "sha256:04a237809c8ab1fc44f1a41b76ae35b36c52114434c1f1f4a0a0a7ceddbb973a"
        id: "sha256:9c6a7004ede02d9fe9104773928af5cac4b95e41fcfd32703d034ddb0098b9c6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9c6a7004ede02d9fe9104773928af5cac4b95e41fcfd32703d034ddb0098b9c6"
        occurred_at: "2026-10-07T15:54:52.695Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610071534-BV344Y"
        task_revision: 8
      -
        command_digest: "sha256:1533a95d0d96f6198f2d88c426a450db13c0447177739e27f08a94756f572ec0"
        id: "result:sha256:2a3eaa44840c4dfa81d9725c39339e9a002cc6f4e850e8ea2db4494db40be252:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2a3eaa44840c4dfa81d9725c39339e9a002cc6f4e850e8ea2db4494db40be252"
        occurred_at: "2026-10-07T15:55:11.039Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610071534-BV344Y"
        task_revision: 9
      -
        command_digest: "sha256:b3ad12eb39db17d8333e0c2d85006ae20b569878ec354009be285fd6040d4b6e"
        id: "kernel_work_item_inspection_required:sha256:e8749c1b78fa12f58ed26186439806b5c19de976aee6f9c514ae00690b919ded:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e8749c1b78fa12f58ed26186439806b5c19de976aee6f9c514ae00690b919ded:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        occurred_at: "2026-10-07T15:55:25.053Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610071534-BV344Y"
        task_revision: 10
      -
        command_digest: "sha256:d9a408404762cd544577e0ffc795c17fd8887f0f169491992908849fdebde868"
        id: "validation:sha256:7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7fc8a61973095fd5fdf0a65bdda2b785a5a991c8ef9f5d625f483826ebf5a822"
        occurred_at: "2026-10-07T15:59:36.274Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610071534-BV344Y"
        task_revision: 11
      -
        command_digest: "sha256:e2d839db95dd20b0243e88d23c98615bafa4d2f2155f1134c0b91abcf1271aae"
        id: "validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e"
        occurred_at: "2026-10-07T15:59:43.969Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610071534-BV344Y"
        task_revision: 12
      -
        command_digest: "sha256:3b9ac5447c3ea78a5846ca6f7b1bbf77cfd3ff3164009cee6e8a99585d0e2709"
        id: "amend:sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b"
        occurred_at: "2026-10-07T16:20:13.171Z"
        payload_digest: "sha256:b15590955f1bf684e87c1de91d4294438c4366f8c657818652f9d8a39b168887"
        task_id: "202610071534-BV344Y"
        task_revision: 13
      -
        command_digest: "sha256:f6d637bb4cd3c0b932084d29ed8a0e3053e42d8f88966f131984dd26e4b55214"
        id: "sha256:1c087456426f88cf949b0d2e1ad46e32c8a1bb32c18cc00c73c4eb73b7fdfa5d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1c087456426f88cf949b0d2e1ad46e32c8a1bb32c18cc00c73c4eb73b7fdfa5d"
        occurred_at: "2026-10-07T16:20:19.181Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610071534-BV344Y"
        task_revision: 14
      -
        command_digest: "sha256:1b87bd6b329c6e327c849f7ee4008191b7a3734a2db9033d814f92cadc981783"
        id: "kernel_work_item_claim_required:sha256:08490654e3466124efbe73f1fed99bdbd5b577b3809c492eee9ff070c0ada9b9:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:08490654e3466124efbe73f1fed99bdbd5b577b3809c492eee9ff070c0ada9b9:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        occurred_at: "2026-10-07T16:20:52.742Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610071534-BV344Y"
        task_revision: 15
      -
        command_digest: "sha256:fd3fd33b1faefc67ac65bfa31c79d86697e5930bcf6180ff04c3bcaa4eba5b70"
        id: "kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        occurred_at: "2026-10-07T16:21:04.236Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610071534-BV344Y"
        task_revision: 16
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
2. Execute approved WorkItem validate-pr-metadata-test-types.

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
