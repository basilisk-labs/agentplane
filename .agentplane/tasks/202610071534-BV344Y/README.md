---
id: "202610071534-BV344Y"
title: "Preserve unchanged PR review artifacts during provider hydration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 38
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
  updated_at: "2026-10-07T17:32:50.153Z"
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
  updated_at: "2026-10-07T16:32:15.901Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "bc115455cd199ab2449b6cddd07a1bee7f800b04"
  review_identity_digest: "sha256:aa1b2411b8a2e2e1b91b79a07265694f8d83d3cd2e3c583d5d08253210c16b29"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610071534-BV344Y/7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e/quality-report.json"
  findings:
    - "Verified fresh manifest f7001203ce9b108dfa0e4ce74a0f7daf8a39e05a6e17b35c9e68e79f19ed045b, all 13 required blocks, accepted result, repository evidence, native validation 5c7eff92d6cd164358114a5e5f93024fafedc2dd21bf59f74166182f895a5eea and report 3062bc4331a8acc19ee8ddc04644c5540c2b4079cf0a99511266e0a1219783cb. Exact result schema verified."
    - "Current and committed hydration test at bc115455cd199ab2449b6cddd07a1bee7f800b04 matches SHA256 61c9cb923d5f9f621918d0979cb0c2f273e8dcd20fc5c816f2e275d393c9ef07. Diff adds one existing parsePrMeta import and replaces exactly two JSON.parse calls. No production changes or assertion weakening."
    - "parsePrMeta parses to unknown, validates the metadata schema and enforces task identity before returning PrMeta. The change removes unsafe inferred-any access without new casts, suppressions or permissive fallback. Stable third rerun, fresh provider metadata and content-refresh assertions remain intact."
    - "All four fresh native checks passed: targeted ESLint, 24 tests across two suites, full formatting and diff. Retained author logs independently hash-verified. Earlier failed final validation remains at 76b0d9b1b23556dc44770ebbfecb3499da5b9a8e18030274d38cbe76f45c786e/final-validation.json, SHA256 5e0e0bd40d16b2844ba2584962cce38feb31263519c43ca55f52629026eb8695."
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
  hash: "bc115455cd199ab2449b6cddd07a1bee7f800b04"
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
  Plan: "1. Execute approved WorkItem requalify-compatible-pr-summary-rendering."
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
    digest: "sha256:4484854c9010557dbab64712823a20ffc74365b4213aedb69c04a7632dab3a26"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610071534-BV344Y/7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e/quality-report.json"
    findings:
      - "Verified fresh manifest f7001203ce9b108dfa0e4ce74a0f7daf8a39e05a6e17b35c9e68e79f19ed045b, all 13 required blocks, accepted result, repository evidence, native validation 5c7eff92d6cd164358114a5e5f93024fafedc2dd21bf59f74166182f895a5eea and report 3062bc4331a8acc19ee8ddc04644c5540c2b4079cf0a99511266e0a1219783cb. Exact result schema verified."
      - "Current and committed hydration test at bc115455cd199ab2449b6cddd07a1bee7f800b04 matches SHA256 61c9cb923d5f9f621918d0979cb0c2f273e8dcd20fc5c816f2e275d393c9ef07. Diff adds one existing parsePrMeta import and replaces exactly two JSON.parse calls. No production changes or assertion weakening."
      - "parsePrMeta parses to unknown, validates the metadata schema and enforces task identity before returning PrMeta. The change removes unsafe inferred-any access without new casts, suppressions or permissive fallback. Stable third rerun, fresh provider metadata and content-refresh assertions remain intact."
      - "All four fresh native checks passed: targeted ESLint, 24 tests across two suites, full formatting and diff. Retained author logs independently hash-verified. Earlier failed final validation remains at 76b0d9b1b23556dc44770ebbfecb3499da5b9a8e18030274d38cbe76f45c786e/final-validation.json, SHA256 5e0e0bd40d16b2844ba2584962cce38feb31263519c43ca55f52629026eb8695."
    implementation_commit: "bc115455cd199ab2449b6cddd07a1bee7f800b04"
    implementation_tree: "234647580d1fa4423531c7362f5cfedcb0184bf4"
    projected_at: "2026-10-07T16:32:15.901Z"
    review_identity_digest: "sha256:aa1b2411b8a2e2e1b91b79a07265694f8d83d3cd2e3c583d5d08253210c16b29"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:8444d4e6a4d22d1b41513a0d3357717cdfdad8c3c10bf15d9b00353ede97e3f4"
    work_order_id: "sha256:1c2f885ec60d5fcd2df643d633563016ce4b7aa892297bc359207dab88938b10"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a43e8e4878ef2ca88416aaba89badc0cba2a480dc723c9e15f293d52831dbfb9"
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
              parent_authority_digest: "sha256:ad48432cf701efcf5a073dbcfe45b8c57b9068b91c6b750c2f33657c9531d454"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
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
            evidence_digest: "sha256:f0361073e9536305d51a912c540c64a6e93b68762e637cfac32f8eb75e2b836e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:44abf4035faa378e359eb476e6575d577a85a36ff9d32bf534f7e359cd3c9133"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728"
            plan_revision: 3
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:220de697552ac7ff03db21e9886c8cd8445802ed3c2c684de543d058da7aa37f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a43e8e4878ef2ca88416aaba89badc0cba2a480dc723c9e15f293d52831dbfb9"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
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
            evidence_digest: "sha256:3a5dc190147ea8367d6a7e2aa3d5ed5b3f964fea00eb9862a6f9eb561d436708"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1173ed9aa8af6db19cd5bd4b3874db91966a8a74c1056e179ccb177126450af9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1"
            plan_revision: 4
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2c5b555dc9f436ed7f116111d604462500797eb5f624fdfa4f3643812121fa6f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
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
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2c5b555dc9f436ed7f116111d604462500797eb5f624fdfa4f3643812121fa6f"
        digest: "sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1"
        revision: 4
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:7a2d7b9f5f62f6303ed75574a45381d6985cb9448fe7e16cbf6f413e4a5bccae"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            expected_outputs:
              - "provider-base-mock-recovery-evidence"
            id: "requalify-compatible-pr-summary-rendering"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610071534-BV344Y"
      intent_digest: "sha256:3f19f2575ba712f6c9d2497db9263ec711267ad6bc634790b9609e5c22892fbf"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728:
          after_revision: 22
          aggregate_digest: "sha256:a2c75b9a98f576229959935d20132c3a9fb94bc7c26381819debcebbadeb4dea"
          before_revision: 21
          command_digest: "sha256:537ef7b3e18575fff9b8ba08dabf5eeeca8ff7482260e9bc81f1af0996c07444"
          effect_ids: []
          event_digests:
            - "sha256:e3d53eda3bed82a3f5a4e7e75b1241aa36b13f7553e94b9d7e91737966f166c9"
          mutation_id: "amend:sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728"
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
        kernel_work_item_claim_required:sha256:2d5da7d749ec02064b35f1ce4b56246e361192e26c5bcd976d26fb3c99dd44d5:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 24
          aggregate_digest: "sha256:af657f060e442ae55a02260648fe97dba8a7dde53716656d0de5bf96ca5e5091"
          before_revision: 23
          command_digest: "sha256:a9fc845484e87302314995396765284e85184f5348177ae3c365bf29fb390067"
          effect_ids: []
          event_digests:
            - "sha256:1a48328f332fe586315fec864d3f9ad59c21ed0c789d1c3fba9a7c5eba8cbf54"
          mutation_id: "kernel_work_item_claim_required:sha256:2d5da7d749ec02064b35f1ce4b56246e361192e26c5bcd976d26fb3c99dd44d5:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a:
          after_revision: 5
          aggregate_digest: "sha256:0f52a83d91e6008f82a1504bb578f8bd4e4386b31c97c9b61f55a862c31c163e"
          before_revision: 4
          command_digest: "sha256:55e7402fce191f6298301df1d51e25ac99569ccbed8d8c05ffdcd1191de9c18e"
          effect_ids: []
          event_digests:
            - "sha256:b93ad7ebc8b2d4873bb329c9badd74720ded47224c4d26f174c1d7b2f5ded15e"
          mutation_id: "kernel_work_item_claim_required:sha256:7393eeece1c8068f3ba919a250ef471989854ed04cc4836b9dd749a210551c40:sha256:a4384101a3e65960b326f15cc27f9c73c09a3fac096d2ee250e740ac040a3b9a"
        kernel_work_item_claim_required:sha256:d7f49b0ef44284f7456ec8c367c36a44e403a29b7b880aa50c7441f5a478ceaf:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 31
          aggregate_digest: "sha256:07ee3f7a783141f608b47f3cac09671cf87cd3ff24a3a1fcce46ad8a7a52bbec"
          before_revision: 30
          command_digest: "sha256:4b5264e81483d70d8fe5703a17f37a66ba92aaefc6ef24a6030521ee38b8084f"
          effect_ids: []
          event_digests:
            - "sha256:bca1490a21d0d0c7ac3325c7177c2ef8b90c480cadfd69eee0eb6307909c3f47"
          mutation_id: "kernel_work_item_claim_required:sha256:d7f49b0ef44284f7456ec8c367c36a44e403a29b7b880aa50c7441f5a478ceaf:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        kernel_work_item_execution_required:sha256:40ad20af074a8c9d284b0526328c6b2cc3276407821543c40d91c6409f0705b2:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 32
          aggregate_digest: "sha256:aee1081efa4aa26ce695fd1e07193ee884fdddd3e366fbbd4f2d840004916ace"
          before_revision: 31
          command_digest: "sha256:df72e20cdf6ae18d1f7c0bc85f71646e77bac6f03231c0893b42ceaf04b1760a"
          effect_ids: []
          event_digests:
            - "sha256:2b4f277bc845f9b611b5ab182f560bba197a9cc39f9d93098947f58e7b0c36c8"
          mutation_id: "kernel_work_item_execution_required:sha256:40ad20af074a8c9d284b0526328c6b2cc3276407821543c40d91c6409f0705b2:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3:
          after_revision: 16
          aggregate_digest: "sha256:06ebe1266ff9b50c8c15b42904e3bc0cf28a4b7295976f40b1a3e9fdf447055d"
          before_revision: 15
          command_digest: "sha256:fd3fd33b1faefc67ac65bfa31c79d86697e5930bcf6180ff04c3bcaa4eba5b70"
          effect_ids: []
          event_digests:
            - "sha256:eea268f8c2547ba3c7b47e20a932d21b2df0a2b2f91b196f258e3348db023a4d"
          mutation_id: "kernel_work_item_execution_required:sha256:8cb02da18e62dcdc2e10939ce9e0e81648a4bc62b29b40ea8f895280ab2efff8:sha256:760a652564e6b3739e0bf23655a26d5b197434c9c30a8c340df0141ffbdb7ab3"
        kernel_work_item_execution_required:sha256:9e1b0725748c180fb606a6d5eddea4213734a62d581529bb25a634ca0df7c6ae:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 25
          aggregate_digest: "sha256:fb473255f86b28cf86a4bd31a21dd224f9e1ff3ea2193a102320ee190e1bc5bf"
          before_revision: 24
          command_digest: "sha256:96b6a6fb27e49331a964989df7843650721ac41845927941a6321a72941abce9"
          effect_ids: []
          event_digests:
            - "sha256:b696348862bfe5bf43e760df3e722758767e6bd2b84f0d0ab594ab7b3fb579b2"
          mutation_id: "kernel_work_item_execution_required:sha256:9e1b0725748c180fb606a6d5eddea4213734a62d581529bb25a634ca0df7c6ae:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:
          after_revision: 7
          aggregate_digest: "sha256:cb96879829e7b2d58fab248ef1b95e6efd823b61d5d26844d6f5369baef81063"
          before_revision: 6
          command_digest: "sha256:9396b51de2cdbd6fc176b1c1d15967d23c0d4656540dcda5c17f207112cf992d"
          effect_ids: []
          event_digests:
            - "sha256:b5f34e791805487ff814db9944ba22e1e6b14f8922975c8d414fde23d9d98307"
          mutation_id: "kernel_work_item_execution_required:sha256:b381a6c869fa607f9ed605e0a8a753004fb8dd4b7311fef231925aa4e8fae94d:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        kernel_work_item_inspection_required:sha256:cf8c1e03092e9fb0f074e8e78f8e41733f40106164a7514e7e8016c288d5b16b:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 19
          aggregate_digest: "sha256:445707a38c231259a9765b98dbcf2f6af48374a7077cfee99616d49bbb207ace"
          before_revision: 18
          command_digest: "sha256:2c0e4e22279afb9f886e2da191543f36d7aceff5a45d006f73333e598173677d"
          effect_ids: []
          event_digests:
            - "sha256:69bb437f42eeb91a2552e0dda5c8a3867965a0ee837a52fac20684302a24f797"
          mutation_id: "kernel_work_item_inspection_required:sha256:cf8c1e03092e9fb0f074e8e78f8e41733f40106164a7514e7e8016c288d5b16b:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
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
        kernel_work_item_materialization_required:sha256:929cd3b142e400665ac48d08e561bb493255ea1e70c16834546fde1fdf4ba965:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:
          after_revision: 30
          aggregate_digest: "sha256:e65f233f2c0630e6df20ae0267f351f1b489dc7173c134ccd9a5041ded33d2e0"
          before_revision: 29
          command_digest: "sha256:c95d00516c38f1707b38f9ba13ecd1fd5c6ee7deb4f12aaf1a2e5096b330bde0"
          effect_ids: []
          event_digests:
            - "sha256:3439a9d82212d75d66b2dca7c257e965eda252e81aeb7d1faf76de5e19bd28e4"
          mutation_id: "kernel_work_item_materialization_required:sha256:929cd3b142e400665ac48d08e561bb493255ea1e70c16834546fde1fdf4ba965:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        plan:sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1:
          after_revision: 28
          aggregate_digest: "sha256:933e0c2180a4fd164a384668143e8dc54614e0112856aa9e45caa95a0686e663"
          before_revision: 27
          command_digest: "sha256:dc2e431c9c5c0e97f8a862f59f277ef59aae61011c7d35e2bf9e76c1322c86a3"
          effect_ids: []
          event_digests:
            - "sha256:5f972f18af9dd9625d6bf81432acca344a9ab3a787f1a16894c58db48f7bf13e"
          mutation_id: "plan:sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1"
        reject:sha256:23510eabf1b421bdb58fa74c60ae2e8bc948bc8060741f0eb9adcd271427f3cd:
          after_revision: 27
          aggregate_digest: "sha256:7cb79c44334e1d4e15421cf3286ba52917c04a908d4376233ba5479e3bce52f7"
          before_revision: 26
          command_digest: "sha256:e6209e521957c0b5e1ca9cec3c9d9369498981d3be4409bebcafe11a985a7cbc"
          effect_ids: []
          event_digests:
            - "sha256:0b28089cdf2337a2c136cadc6f50a11dfa8084c0f62c473e15e1d7c9da66e4e3"
          mutation_id: "reject:sha256:23510eabf1b421bdb58fa74c60ae2e8bc948bc8060741f0eb9adcd271427f3cd"
        result:sha256:1c2f885ec60d5fcd2df643d633563016ce4b7aa892297bc359207dab88938b10:
          after_revision: 18
          aggregate_digest: "sha256:62ebf8efced809d3d85685c76d9493548b5b673985dfe1f82e674059007361a1"
          before_revision: 17
          command_digest: "sha256:06186ea3877c5b8f11f80f5cd3ad1769817b15054f4d1239d73345445183c926"
          effect_ids: []
          event_digests:
            - "sha256:547641d14e6ae57af08856bc7d7a564d71967e28e0baf457aa42abb39355ec3d"
          mutation_id: "result:sha256:1c2f885ec60d5fcd2df643d633563016ce4b7aa892297bc359207dab88938b10"
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
        semantic-stop:sha256:35127c704f9c813ce337fd4f59310448cfc8d3e4cb53b48f4660e839585fca10:
          after_revision: 26
          aggregate_digest: "sha256:3ab0581747f5d007ab7b7256c162447db99a9dce62ce601214a56fc83382f1fa"
          before_revision: 25
          command_digest: "sha256:cd99080dacb91194b5386be1ab63f02f9aaac50f3c3f9efc21ac0856f1a512de"
          effect_ids: []
          event_digests:
            - "sha256:d579ba733807f90355877e401400e02edde1f669aee6f0297bfcb14a23ccf3ac"
          mutation_id: "semantic-stop:sha256:35127c704f9c813ce337fd4f59310448cfc8d3e4cb53b48f4660e839585fca10"
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
        sha256:46182570e6823a4dad9c574a15135954c9f30e633e9443e017e311e035f17ec1:
          after_revision: 23
          aggregate_digest: "sha256:1b89734ab75800267152585a4015f5384218177d7c6c32836805183c250561d5"
          before_revision: 22
          command_digest: "sha256:dbc5f1d9eaedd8ae694ca2f9eb93c08248751f257b2adbd03a9724d03a43ca28"
          effect_ids: []
          event_digests:
            - "sha256:3f38fc0b2d9fea9223d6d97ecc067b7696d9ebbdd6e5a3de624cf8f16097e11f"
          mutation_id: "sha256:46182570e6823a4dad9c574a15135954c9f30e633e9443e017e311e035f17ec1"
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
        sha256:a962f4ca4ca4d13444e7fcba3acd48d377fb0a62d9251de82bc61272702c66ff:
          after_revision: 17
          aggregate_digest: "sha256:afe6afec9b3a96d4834630fac6273ea66ea7ee59920e08850f9cb6d922025c85"
          before_revision: 16
          command_digest: "sha256:e186a434d7786bbd41fea247ed48177771f6b9fa819367dbaa12022d26057ef7"
          effect_ids: []
          event_digests:
            - "sha256:a2cde42a9e3c39aea44f734884939d71ebd92ef2853b4b583b35d02a1f0ccee4"
          mutation_id: "sha256:a962f4ca4ca4d13444e7fcba3acd48d377fb0a62d9251de82bc61272702c66ff"
        sha256:cda169555573687a78ca28f8407221436650b289d8366832b2d306c3adb01e44:
          after_revision: 29
          aggregate_digest: "sha256:32e289edd5971df7a335b77dd9ec853702c410d702f889f746340be83bd58627"
          before_revision: 28
          command_digest: "sha256:43d138a32c46a82fc45518ce3f3acdbbfdf6384ad9397bfd351ccc669bde18a6"
          effect_ids: []
          event_digests:
            - "sha256:5908b996352afab0dd2e1fb82e022df0648a20d1b043d667c6abf41c1b40b699"
          mutation_id: "sha256:cda169555573687a78ca28f8407221436650b289d8366832b2d306c3adb01e44"
        validation-resolution:sha256:7f9eb46250db517387d3c5849fe0b1e06e1b551f8cec018aa4fe27aeadb34d7c:
          after_revision: 21
          aggregate_digest: "sha256:66c41e178c36e6c73894a22974741225f2ae2224a54d305bbce18ffb03fd90b2"
          before_revision: 20
          command_digest: "sha256:bca8d1a96256441b082bfb3fe0731697b30cbc988cd037166f69a4c8d52c1d9e"
          effect_ids: []
          event_digests:
            - "sha256:e830923488fb0db8ef3a5496df012073045b7a27b88614de9f869aa97826081d"
          mutation_id: "validation-resolution:sha256:7f9eb46250db517387d3c5849fe0b1e06e1b551f8cec018aa4fe27aeadb34d7c"
        validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e:
          after_revision: 12
          aggregate_digest: "sha256:268254d08d82b3dc863ba77425df940590f89f0117846d87538463e2f16e5e10"
          before_revision: 11
          command_digest: "sha256:e2d839db95dd20b0243e88d23c98615bafa4d2f2155f1134c0b91abcf1271aae"
          effect_ids: []
          event_digests:
            - "sha256:b037483074a5272b40c13229745713d9964176cd8ee748ca2f2c3b8b5c157eda"
          mutation_id: "validation-resolution:sha256:a804c3f606861d6ca30e90b20896e211d74e5fa287d7c713f25831e68ebce36e"
        validation:sha256:7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e:
          after_revision: 20
          aggregate_digest: "sha256:727064dadfd36cb534ea4e1d6f901f4ae0cae7daec1f1723278dfe5fd59250e8"
          before_revision: 19
          command_digest: "sha256:53bfc83eb238899a99143853de8bd8a6572ddfecf5cf5d431c7f79c4444d9f32"
          effect_ids: []
          event_digests:
            - "sha256:474083922472967661303b08c7e49e21201475ead66e05704f93c1efb03c4d2b"
          mutation_id: "validation:sha256:7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:efecaa591d156e88676a3938c171fcbba03470e2196195f1ec24a99eba61f5a6"
          digest: "sha256:d5024b4a81d342d548aefbff8e804b3e8a90e4dcce2f79884f78377b81cf8a9b"
          revision: 2
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:5dc8693eb9232ea42c8a4aca20ff0ff81b592977cdfede995bedf3c0acfe6711"
          digest: "sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728"
          revision: 3
          state: "REJECTED"
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
            -
              contract_digest: "sha256:67dac954bc1a47eed44646fa1189e0a16d556524c388090339a8d5018cbe69d0"
              depends_on:
                - "validate-pr-metadata-test-types"
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
                  - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
                  - "packages/agentplane/src/commands/pr/internal/review-template.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              expected_outputs:
                - "provider-base-mock-recovery-evidence"
              id: "align-provider-base-review-mock"
              optional: false
              required_inputs: []
      revision: 32
      schema_version: 1
      state: "ACTIVE"
      work_items:
        requalify-compatible-pr-summary-rendering:
          attempt: 1
          claim_id: "sha256:14c957479a7fd3002ffae78de91e20ab9afe03c290d027bd8764c9a3624f72c5"
          definition:
            contract_digest: "sha256:7a2d7b9f5f62f6303ed75574a45381d6985cb9448fe7e16cbf6f413e4a5bccae"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.test.ts"
                - "packages/agentplane/src/commands/pr/internal/review-template.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            expected_outputs:
              - "provider-base-mock-recovery-evidence"
            id: "requalify-compatible-pr-summary-rendering"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:d5189a4f08768a537f35b5d815634a866070fbb82aba18576352e1c3894717ef"
    documents:
      contracts:
        sha256:67dac954bc1a47eed44646fa1189e0a16d556524c388090339a8d5018cbe69d0:
          acceptance_criteria:
            - "Before editing sync-open-provider-base.test.ts, return a structured scope-extension blocker for that exact missing writable root. Continue only after native scope admission supplies the required authority."
            - "Change only the declared test mock. Do not change production behavior, disable assertions, or suppress lint checks."
            - "Retain the failed full CI evidence at .git/agentplane/kernel/exchanges/202610071534-BV344Y/beba2ba86dfe3d5ce45f1415d6098247021e3ab0bbfb2f51205ee81daef2355d/final-validation.json. Confirm all review-template mocks are compatible."
            - "Run the three provider base tests and the 24 hydration and summary regressions. Independent evaluation and native full verification remain required."
          objective: "Align the provider base unit test review-template mock with the stable summary export used by runPrOpenSync. Preserve all existing provider routing and protected base assertions."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts"
            - "bun run format:check"
            - "git diff --check"
        sha256:7a2d7b9f5f62f6303ed75574a45381d6985cb9448fe7e16cbf6f413e4a5bccae:
          acceptance_criteria:
            - "Keep review.md and github-body.md byte-stable on second and third PR open reruns when only provider identity, link or lifecycle metadata changes. Preserve provider metadata freshness and identity."
            - "Preserve the prior summary timestamp only when the rendered semantic evidence is unchanged. Reuse the existing renderer owner for a minimal stable-summary helper. Do not merely capture pre-provider metadata time because later reruns already contain advanced metadata."
            - "Regenerate summaries for genuine diff, branch or evidence changes. Missing or malformed prior blocks regenerate safely. Continue reflecting task content changes rather than indiscriminately reusing old documents."
            - "Retain both existing failing hydration assertions, including the only-metadata-dirty condition. Add deterministic distinct-timestamp coverage for a third rerun, provider metadata persistence, genuine content/diff mutation and malformed blocks. Do not freeze clocks to conceal drift or weaken assertions."
            - "Resolve all eight TypeScript ESLint errors at the added provider metadata assertions. Do not use any, suppress lint rules, or weaken regression assertions."
            - "Keep renderPrAutoSummary exported with optional previousDocument. Move raw rendering to a private helper. Preserve strict unique block, ISO timestamp and exact canonical evidence comparison. Avoid recursive calls through options containing previousDocument."
            - "Use the existing renderer export at both sync-open-step call sites. Migrate stable-summary unit coverage to that public entrypoint and remove the unnecessary new exported helper. Keep all assertions and provider-base test unchanged."
            - "Change only review-template.ts, review-template.test.ts and sync-open-step.ts within the original trusted four-file scope. The blocked request to extend scope is superseded by this compatible design."
            - "Retain failed CI evidence. Verify all 27 relevant tests, ESLint and formatting. Independent evaluation and native full verification remain required."
          objective: "Preserve the existing renderPrAutoSummary entrypoint while adding optional prior-document stability. Keep existing callers and provider-base test mocks compatible without changing their files."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts"
            - "bun run format:check"
            - "git diff --check"
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
      -
        command_digest: "sha256:e186a434d7786bbd41fea247ed48177771f6b9fa819367dbaa12022d26057ef7"
        id: "sha256:a962f4ca4ca4d13444e7fcba3acd48d377fb0a62d9251de82bc61272702c66ff:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a962f4ca4ca4d13444e7fcba3acd48d377fb0a62d9251de82bc61272702c66ff"
        occurred_at: "2026-10-07T16:27:25.032Z"
        payload_digest: "sha256:7aed4e8983de7c3098093656db0d79cdcb238427d9745771a6217634a5d9c179"
        task_id: "202610071534-BV344Y"
        task_revision: 17
      -
        command_digest: "sha256:06186ea3877c5b8f11f80f5cd3ad1769817b15054f4d1239d73345445183c926"
        id: "result:sha256:1c2f885ec60d5fcd2df643d633563016ce4b7aa892297bc359207dab88938b10:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:1c2f885ec60d5fcd2df643d633563016ce4b7aa892297bc359207dab88938b10"
        occurred_at: "2026-10-07T16:27:41.685Z"
        payload_digest: "sha256:69571b85987578de74a6ec64dbe6f6df440e424ef82757acea400492761c84df"
        task_id: "202610071534-BV344Y"
        task_revision: 18
      -
        command_digest: "sha256:2c0e4e22279afb9f886e2da191543f36d7aceff5a45d006f73333e598173677d"
        id: "kernel_work_item_inspection_required:sha256:cf8c1e03092e9fb0f074e8e78f8e41733f40106164a7514e7e8016c288d5b16b:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cf8c1e03092e9fb0f074e8e78f8e41733f40106164a7514e7e8016c288d5b16b:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T16:27:56.068Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610071534-BV344Y"
        task_revision: 19
      -
        command_digest: "sha256:53bfc83eb238899a99143853de8bd8a6572ddfecf5cf5d431c7f79c4444d9f32"
        id: "validation:sha256:7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7214d52556865fc1d6dae919c2910db70789ddb6141e7cf29b814c6f2490480e"
        occurred_at: "2026-10-07T16:32:27.195Z"
        payload_digest: "sha256:69938fe0c64f6bfea902cedc3f03b9377bcdf72cb8ae0c4f97535602a6cddad3"
        task_id: "202610071534-BV344Y"
        task_revision: 20
      -
        command_digest: "sha256:bca8d1a96256441b082bfb3fe0731697b30cbc988cd037166f69a4c8d52c1d9e"
        id: "validation-resolution:sha256:7f9eb46250db517387d3c5849fe0b1e06e1b551f8cec018aa4fe27aeadb34d7c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7f9eb46250db517387d3c5849fe0b1e06e1b551f8cec018aa4fe27aeadb34d7c"
        occurred_at: "2026-10-07T16:32:34.002Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610071534-BV344Y"
        task_revision: 21
      -
        command_digest: "sha256:537ef7b3e18575fff9b8ba08dabf5eeeca8ff7482260e9bc81f1af0996c07444"
        id: "amend:sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:b22a9ab9c9358e794fb9fdf9a3f4a68908fa716e943c7f5df8ca1e752cfae728"
        occurred_at: "2026-10-07T17:21:30.058Z"
        payload_digest: "sha256:b222aac1f5270ef1b823ac02d32286888ec9f174d20822344e285c5e9e06c7b5"
        task_id: "202610071534-BV344Y"
        task_revision: 22
      -
        command_digest: "sha256:dbc5f1d9eaedd8ae694ca2f9eb93c08248751f257b2adbd03a9724d03a43ca28"
        id: "sha256:46182570e6823a4dad9c574a15135954c9f30e633e9443e017e311e035f17ec1:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:46182570e6823a4dad9c574a15135954c9f30e633e9443e017e311e035f17ec1"
        occurred_at: "2026-10-07T17:21:37.316Z"
        payload_digest: "sha256:d47dd98692456ecd8c2232ce09064ac5e2cff5d4b61aee0c39058ec1a5b2e91b"
        task_id: "202610071534-BV344Y"
        task_revision: 23
      -
        command_digest: "sha256:a9fc845484e87302314995396765284e85184f5348177ae3c365bf29fb390067"
        id: "kernel_work_item_claim_required:sha256:2d5da7d749ec02064b35f1ce4b56246e361192e26c5bcd976d26fb3c99dd44d5:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:2d5da7d749ec02064b35f1ce4b56246e361192e26c5bcd976d26fb3c99dd44d5:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T17:22:23.026Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610071534-BV344Y"
        task_revision: 24
      -
        command_digest: "sha256:96b6a6fb27e49331a964989df7843650721ac41845927941a6321a72941abce9"
        id: "kernel_work_item_execution_required:sha256:9e1b0725748c180fb606a6d5eddea4213734a62d581529bb25a634ca0df7c6ae:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9e1b0725748c180fb606a6d5eddea4213734a62d581529bb25a634ca0df7c6ae:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T17:22:32.569Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610071534-BV344Y"
        task_revision: 25
      -
        command_digest: "sha256:cd99080dacb91194b5386be1ab63f02f9aaac50f3c3f9efc21ac0856f1a512de"
        id: "semantic-stop:sha256:35127c704f9c813ce337fd4f59310448cfc8d3e4cb53b48f4660e839585fca10:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:35127c704f9c813ce337fd4f59310448cfc8d3e4cb53b48f4660e839585fca10"
        occurred_at: "2026-10-07T17:24:59.712Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610071534-BV344Y"
        task_revision: 26
      -
        command_digest: "sha256:e6209e521957c0b5e1ca9cec3c9d9369498981d3be4409bebcafe11a985a7cbc"
        id: "reject:sha256:23510eabf1b421bdb58fa74c60ae2e8bc948bc8060741f0eb9adcd271427f3cd:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:23510eabf1b421bdb58fa74c60ae2e8bc948bc8060741f0eb9adcd271427f3cd"
        occurred_at: "2026-10-07T17:31:32.174Z"
        payload_digest: "sha256:16282e9fbd41a7a208eb6babc4d1780cd67fb16c40ed225cef284d9c197420de"
        task_id: "202610071534-BV344Y"
        task_revision: 27
      -
        command_digest: "sha256:dc2e431c9c5c0e97f8a862f59f277ef59aae61011c7d35e2bf9e76c1322c86a3"
        id: "plan:sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:bc022f9641feba81dced5f59dd5c1b359f36b0d8e4ba0a415526ebc43fd30ec1"
        occurred_at: "2026-10-07T17:32:15.014Z"
        payload_digest: "sha256:abb509d7cac4387e94d375f5d441d48393830df3ebeba29149ddc9596c5a00e3"
        task_id: "202610071534-BV344Y"
        task_revision: 28
      -
        command_digest: "sha256:43d138a32c46a82fc45518ce3f3acdbbfdf6384ad9397bfd351ccc669bde18a6"
        id: "sha256:cda169555573687a78ca28f8407221436650b289d8366832b2d306c3adb01e44:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cda169555573687a78ca28f8407221436650b289d8366832b2d306c3adb01e44"
        occurred_at: "2026-10-07T17:32:46.037Z"
        payload_digest: "sha256:6c919ca94c72d1ed2bed44df0f7b3dd208c9d70f6d41f76f5cd115be81328ada"
        task_id: "202610071534-BV344Y"
        task_revision: 29
      -
        command_digest: "sha256:c95d00516c38f1707b38f9ba13ecd1fd5c6ee7deb4f12aaf1a2e5096b330bde0"
        id: "kernel_work_item_materialization_required:sha256:929cd3b142e400665ac48d08e561bb493255ea1e70c16834546fde1fdf4ba965:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:929cd3b142e400665ac48d08e561bb493255ea1e70c16834546fde1fdf4ba965:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T17:33:20.606Z"
        payload_digest: "sha256:b37255627d10d9aab6c17127e13606aa76e71be55028471edd7be66d33c3ed84"
        task_id: "202610071534-BV344Y"
        task_revision: 30
      -
        command_digest: "sha256:4b5264e81483d70d8fe5703a17f37a66ba92aaefc6ef24a6030521ee38b8084f"
        id: "kernel_work_item_claim_required:sha256:d7f49b0ef44284f7456ec8c367c36a44e403a29b7b880aa50c7441f5a478ceaf:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d7f49b0ef44284f7456ec8c367c36a44e403a29b7b880aa50c7441f5a478ceaf:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T17:33:34.175Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610071534-BV344Y"
        task_revision: 31
      -
        command_digest: "sha256:df72e20cdf6ae18d1f7c0bc85f71646e77bac6f03231c0893b42ceaf04b1760a"
        id: "kernel_work_item_execution_required:sha256:40ad20af074a8c9d284b0526328c6b2cc3276407821543c40d91c6409f0705b2:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:40ad20af074a8c9d284b0526328c6b2cc3276407821543c40d91c6409f0705b2:sha256:bb326741deebdf9c60b4cfdbbb8d9dc43e054a0689ae18eed8ad8cc9ab69b2e1"
        occurred_at: "2026-10-07T17:33:44.324Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202610071534-BV344Y"
        task_revision: 32
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

1. Execute approved WorkItem requalify-compatible-pr-summary-rendering.

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
