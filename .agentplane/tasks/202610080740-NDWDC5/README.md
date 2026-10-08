---
id: "202610080740-NDWDC5"
title: "Qualify M05 live campaign contract and durable accounting offline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "git diff --check"
  - "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-08T07:45:24.209Z"
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
      - "scripts/bench/internal/paired-m05"
      - "scripts/bench/paired-live-codex-launcher.mjs"
      - "scripts/bench/paired-live-codex-launcher.test.mjs"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
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
      - "scripts/bench/internal/paired-m05"
      - "scripts/bench/paired-live-codex-launcher.mjs"
      - "scripts/bench/paired-live-codex-launcher.test.mjs"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
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
          - "scripts/bench/internal/paired-m05"
          - "scripts/bench/paired-live-codex-launcher.mjs"
          - "scripts/bench/paired-live-codex-launcher.test.mjs"
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
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
      digest: "sha256:e455c2bd2c8cbba08d9b2891964ab447daf277fe798a05050139989f2685347b"
      escalation_reasons:
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
doc_updated_at: "2026-10-08T07:40:45.915Z"
doc_updated_by: "CODER"
description: "Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release."
sections:
  Summary: |-
    Qualify M05 live campaign contract and durable accounting offline

    Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.
  Scope: |-
    - In scope: Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.
    - Out of scope: unrelated refactors not required for "Qualify M05 live campaign contract and durable accounting offline".
  Plan: |-
    1. Execute approved WorkItem m05-contract-ledger.
    2. Execute approved WorkItem m05-launcher-boundary.
    3. Execute approved WorkItem m05-versioned-report.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "3dbcbad442bbeaadd73e6e698180c8cbaad55b30"
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
            digest: "sha256:40f8c3d5354a1badca046e005d391b3a343e58bca60b65d1c800a72f746b533e"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ebf1efc9a199d846f19682b95eee0be9f144dd9b65aa93a4db565780979a2247"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:217ebb9b325eac23d777ee47dd43361409eb284d2e084535763bbc249448f30c"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "scripts/bench/internal/paired-m05"
              - "scripts/bench/paired-live-codex-launcher.mjs"
              - "scripts/bench/paired-live-codex-launcher.test.mjs"
              - "scripts/bench/paired-production-driver.mjs"
              - "scripts/bench/paired-production-driver.test.mjs"
              - "scripts/bench/paired-result-report.mjs"
              - "scripts/bench/paired-result-report.test.mjs"
            task_id: "202610080740-NDWDC5"
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
            digest: "sha256:4d2419e4d0f7b802ab6a624ec209fe49485f39a3f0a104b6785a373c54d7837e"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ebf1efc9a199d846f19682b95eee0be9f144dd9b65aa93a4db565780979a2247"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:217ebb9b325eac23d777ee47dd43361409eb284d2e084535763bbc249448f30c"
              kind: "USER"
              parent_authority_digest: "sha256:40f8c3d5354a1badca046e005d391b3a343e58bca60b65d1c800a72f746b533e"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
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
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
              - "scripts/bench/internal/paired-m05"
              - "scripts/bench/paired-live-codex-launcher.mjs"
              - "scripts/bench/paired-live-codex-launcher.test.mjs"
              - "scripts/bench/paired-production-driver.mjs"
              - "scripts/bench/paired-production-driver.test.mjs"
              - "scripts/bench/paired-result-report.mjs"
              - "scripts/bench/paired-result-report.test.mjs"
            task_id: "202610080740-NDWDC5"
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
            evidence_digest: "sha256:212db90f93ba0bf14d42a4ca0d1d8a417ca5d9f20c4687712b4182a4ab64e9ba"
            kind: "authority_delta"
            previous_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_evidence_digest: "sha256:700d6bf89b2ca1069a5ea545a034e80c980eac8e1d2d1d8fb019b65ccd0be037"
            request_digest: "sha256:5cf445b8f36aef585e70e0b2ec811dfd379f9c8a06e1e3934f7a121b5abca1ac"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:217ebb9b325eac23d777ee47dd43361409eb284d2e084535763bbc249448f30c"
        digest: "sha256:ebf1efc9a199d846f19682b95eee0be9f144dd9b65aa93a4db565780979a2247"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:92d466c9ca40b5a4afb8e6960409d98c14b0b2411fe49b82b7689d4cb552420a"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
            expected_outputs:
              - "m05-contract-ledger-evidence"
            id: "m05-contract-ledger"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:b38137444baccab71cc5b051b1af1ce05602e8dca8b4c13cd83de765f9953ab7"
            depends_on:
              - "m05-contract-ledger"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
            expected_outputs:
              - "m05-launcher-boundary-evidence"
            id: "m05-launcher-boundary"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:b4b91017d1388185fc6da7b293d639cead5274fea60811b83f12931de8d6637b"
            depends_on:
              - "m05-launcher-boundary"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
            expected_outputs:
              - "m05-versioned-report-evidence"
            id: "m05-versioned-report"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610080740-NDWDC5"
      intent_digest: "sha256:2b845bdbed8d71897198ee952b1e376544da19820f329ec9eb655ef2a7278a16"
      migration_receipts: []
      mutation_receipts:
        capture:202610080740-NDWDC5:
          after_revision: 1
          aggregate_digest: "sha256:b672c4539f8601876a114ead16554e6765cbb189ace63c946031365ebd5ce51b"
          before_revision: 0
          command_digest: "sha256:894c4e969c40d4292b63ff98c81f5c3fe8637334bed194842e92a106c18f1456"
          effect_ids: []
          event_digests:
            - "sha256:2424d72a94f0f236d189dfa6bb93a708ae4fc2661067a951673a4417e8a1baef"
          mutation_id: "capture:202610080740-NDWDC5"
        kernel_work_item_claim_required:sha256:a08091fc59278f0443b642b0a688265d773131d11b1d7f2b09ff395d70c56bcc:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 5
          aggregate_digest: "sha256:94defd9ece1a574c0b1cfb29757d91b920d54952ad5ce2823c2b56035fc75fbb"
          before_revision: 4
          command_digest: "sha256:63d4db90c5e02eeb2dc1f046c146207143ca0a0404980f99f7231ac8d670d33b"
          effect_ids: []
          event_digests:
            - "sha256:b24807d99d2573ec73adfd77255154300273d6cc0a7aaffdace3f4cc50d0e621"
          mutation_id: "kernel_work_item_claim_required:sha256:a08091fc59278f0443b642b0a688265d773131d11b1d7f2b09ff395d70c56bcc:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        kernel_work_item_execution_required:sha256:b781e291a48c444ed0712b6682dabc4237e39134b393cc52685534e771fa77d3:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:
          after_revision: 7
          aggregate_digest: "sha256:c639a2a738b9df7d0e33248dbb3c38b214b97ad504c084dc0f1740971f2c4da4"
          before_revision: 6
          command_digest: "sha256:5443aba91988ae858a76fadf65aedc41d5dc817f225df38ed75ecdae04d25d7f"
          effect_ids: []
          event_digests:
            - "sha256:25e7cc78eecf220939d6ea0b6d64127e965e47387ea04583ec506c96870db37d"
          mutation_id: "kernel_work_item_execution_required:sha256:b781e291a48c444ed0712b6682dabc4237e39134b393cc52685534e771fa77d3:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        kernel_work_item_materialization_required:sha256:7c13ecf120cba00a68d932d60fb0830c266e540c30087864a911a1b0a90ad0c7:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 4
          aggregate_digest: "sha256:93e0b3b05b448f4cce83d5275a1be3405775ec9666ae58d8b666c64346016088"
          before_revision: 3
          command_digest: "sha256:eef0dd9cecbacd53407ef80ab8a8af070a2fb75121a51b63e6dd8cc0c22a910d"
          effect_ids: []
          event_digests:
            - "sha256:56a47272bf224f211ef4cdb22e6bc1835309b729794571d8b8d336421e475ef8"
          mutation_id: "kernel_work_item_materialization_required:sha256:7c13ecf120cba00a68d932d60fb0830c266e540c30087864a911a1b0a90ad0c7:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        result:sha256:8ee44daddad4e1e7b1d2c57ef497c755b4bc7441e337e84db10034f36921c5e3:
          after_revision: 2
          aggregate_digest: "sha256:5d9efcdebd6663dd33d5246dc6711ee7b857bede887d21cd0a437797efc42866"
          before_revision: 1
          command_digest: "sha256:971ce02bc1f6ea8240f7986da639401c5f93c27f0089f3636db5aa97ccc0dc65"
          effect_ids: []
          event_digests:
            - "sha256:7b94ede79d4c8c5ae09eec86d0c2dc213ca92463f1c411fce8f0b3a22ca7014f"
          mutation_id: "result:sha256:8ee44daddad4e1e7b1d2c57ef497c755b4bc7441e337e84db10034f36921c5e3"
        sha256:3ec3819b349ce057bae1b9e532c32d7d23eb8d8a26c4e804a700072223c66e1d:
          after_revision: 6
          aggregate_digest: "sha256:3621d45cb31a517deb1d0abcaaabbb77863e1a60d9bb16b84b26f2d0a6f01ca3"
          before_revision: 5
          command_digest: "sha256:2cb98d5f40b219ec629537684c7c7de1d53f70a2788abc6c532be3e2b8a6d62e"
          effect_ids: []
          event_digests:
            - "sha256:0f605a7f4e6f4b6d4824f3f8b7241db97c39bf9e885dd0435fcb6b41a2a0de6b"
          mutation_id: "sha256:3ec3819b349ce057bae1b9e532c32d7d23eb8d8a26c4e804a700072223c66e1d"
        sha256:7ac291bb9c674dfd5549020b915d48a084f45021707ad0a835d4f8268421be32:
          after_revision: 3
          aggregate_digest: "sha256:65127b08c1a369c96f9863578264699bb1bb83f4236a5e2a0de0764df99f9b11"
          before_revision: 2
          command_digest: "sha256:9328d133a7a99768444b7cfda6559e289386da393d9014399a4628e46e24547c"
          effect_ids: []
          event_digests:
            - "sha256:45c672adc393d7fb8c8e6442b259c0d9dadc3414dae65739e683d5692101d3db"
          mutation_id: "sha256:7ac291bb9c674dfd5549020b915d48a084f45021707ad0a835d4f8268421be32"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        m05-contract-ledger:
          attempt: 1
          claim_id: "sha256:7ae4036de761c5abdf9436f9302001bd7b4a5ce7f4f0ea8161fed52e2c8a9049"
          definition:
            contract_digest: "sha256:92d466c9ca40b5a4afb8e6960409d98c14b0b2411fe49b82b7689d4cb552420a"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
            expected_outputs:
              - "m05-contract-ledger-evidence"
            id: "m05-contract-ledger"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
        m05-launcher-boundary:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:b38137444baccab71cc5b051b1af1ce05602e8dca8b4c13cd83de765f9953ab7"
            depends_on:
              - "m05-contract-ledger"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
            expected_outputs:
              - "m05-launcher-boundary-evidence"
            id: "m05-launcher-boundary"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        m05-versioned-report:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:b4b91017d1388185fc6da7b293d639cead5274fea60811b83f12931de8d6637b"
            depends_on:
              - "m05-launcher-boundary"
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
                - "scripts/bench/internal/paired-m05"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
            expected_outputs:
              - "m05-versioned-report-evidence"
            id: "m05-versioned-report"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:4ef75f3512cf0bcbaa53cb3199daec6dbdd35267f698cadaad89f0c3e190eb85"
    documents:
      contracts:
        sha256:92d466c9ca40b5a4afb8e6960409d98c14b0b2411fe49b82b7689d4cb552420a:
          acceptance_criteria:
            - "Validate exact immutable product, target, objective, oracle, policy, adapter/model/effort, runtime/sandbox/network, transport/cache, random order and authority bindings. Unknown identities or missing finite limits reject preflight; never infer authority from a manifest or mode flag."
            - "Persist campaign-bound assignments and reserved worst-case budgets before invocation using atomic durable ownership. Reconcile interruption before/after launch and result persistence without duplicate uncertain launches. Preserve failed, blocked, cancelled and interrupted assignments; tampered identities, competing claims and unresolved receipts fail closed."
            - "Ledger covers every semantic role and orchestration stage, retries and independent review. Missing/partial/unattributable usage remains unknown, never zero. Keep provider totals and cached/reasoning subsets distinct; separate setup and nonoverlapping latency spans. Tests use deterministic temporary repositories and injected adapters."
            - "Offline injected-provider tests only. No provider calls, network, credential reads, lifecycle actions or fabricated approval. Preserve v1 and offline-v2 bytes/semantics and immutable historical evidence. Record source hashes, actual check logs and remaining gaps; independent EVALUATOR and native verification remain mandatory."
          objective: "Introduce a separately versioned M05 live contract and durable assignment accounting without activating live execution."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs"
            - "node node_modules/eslint/bin/eslint.js scripts/bench/internal/paired-m05 scripts/bench/paired-production-driver.mjs scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.mjs scripts/bench/paired-result-report.test.mjs"
            - "bun run format:check"
            - "git diff --check"
        sha256:b38137444baccab71cc5b051b1af1ce05602e8dca8b4c13cd83de765f9953ab7:
          acceptance_criteria:
            - "Keep historical M01 behavior separate. M05 live dispatch requires trusted operator authority bound to the exact campaign and qualified corpus/oracle, plus an adapter capability proving enforceability of declared finite token/spend/retry limits. A numeric manifest cap, timeout, post-hoc usage or injected authority boolean alone is insufficient."
            - "Reserve worst-case authorized cost before every role/retry call and stop before exceeding cumulative limits. If the current Codex adapter cannot enforce the claimed ceiling, reject it before invocation and report that unsupported capability honestly. Do not silently substitute an adapter, model or unlimited campaign."
            - "Exercise actual launcher/driver ownership with offline injected process/provider ports: authorized finite execution, missing/mismatched authority, unsupported caps, exhausted budget, identity drift, process failure, partial usage and interruption recovery. Preserve real production planning/review obligations; do not label a fixed one-file or known-answer Plan fixture as a coding campaign."
            - "Offline injected-provider tests only. No provider calls, network, credential reads, lifecycle actions or fabricated approval. Preserve v1 and offline-v2 bytes/semantics and immutable historical evidence. Record source hashes, actual check logs and remaining gaps; independent EVALUATOR and native verification remain mandatory."
          objective: "Connect the qualified M05 contract and ledger to a bounded launcher interface, with offline execution tests."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs"
            - "node node_modules/eslint/bin/eslint.js scripts/bench/internal/paired-m05 scripts/bench/paired-production-driver.mjs scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.mjs scripts/bench/paired-result-report.test.mjs"
            - "bun run format:check"
            - "git diff --check"
        sha256:b4b91017d1388185fc6da7b293d639cead5274fea60811b83f12931de8d6637b:
          acceptance_criteria:
            - "Add separately versioned M05 reporting without reinterpreting v1 or offline-v2 evidence. Compute all assigned observed cost per independently verified success, success rates and matched successful pairs without dropping unmatched failures; zero successes have no finite cost-per-success estimate."
            - "Report setup-inclusive and steady-state totals separately, task-clustered uncertainty and per-workflow/transport/cache strata. Preserve pilot versus preregistered confirmation separation. Missing usage or insufficient samples produce NOT ESTABLISHED unless justified bounds exist; trade-offs remain MIXED. No efficiency guarantee or favorable stopping rule."
            - "Use deterministic positive/negative reporting fixtures for failed/cancelled assignments, zero successes, incomplete usage, overlapping/subset accounting, mismatched oracle/policy, small clustered samples and mixed outcomes. Run all four existing complete Node test files, scoped ESLint including new helpers, formatting and diff checks with retained evidence."
            - "Corpus/oracle qualification, exact artifact pins and campaign materialization remain follow-up work before any live call. User has authorized a live experiment in principle; model, effort and finite budget remain unresolved. This task grants no paid execution and must report adapter limitations rather than claiming a ready campaign."
            - "Offline injected-provider tests only. No provider calls, network, credential reads, lifecycle actions or fabricated approval. Preserve v1 and offline-v2 bytes/semantics and immutable historical evidence. Record source hashes, actual check logs and remaining gaps; independent EVALUATOR and native verification remain mandatory."
          objective: "Report durable M05 campaign outcomes and offline-qualify the integrated boundary."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs"
            - "node node_modules/eslint/bin/eslint.js scripts/bench/internal/paired-m05 scripts/bench/paired-production-driver.mjs scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.mjs scripts/bench/paired-result-report.test.mjs"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release."
        objective: "Qualify M05 live campaign contract and durable accounting offline"
    events:
      -
        command_digest: "sha256:894c4e969c40d4292b63ff98c81f5c3fe8637334bed194842e92a106c18f1456"
        id: "capture:202610080740-NDWDC5:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610080740-NDWDC5"
        occurred_at: "2026-10-08T07:40:45.707Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610080740-NDWDC5"
        task_revision: 1
      -
        command_digest: "sha256:971ce02bc1f6ea8240f7986da639401c5f93c27f0089f3636db5aa97ccc0dc65"
        id: "result:sha256:8ee44daddad4e1e7b1d2c57ef497c755b4bc7441e337e84db10034f36921c5e3:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8ee44daddad4e1e7b1d2c57ef497c755b4bc7441e337e84db10034f36921c5e3"
        occurred_at: "2026-10-08T07:43:56.335Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610080740-NDWDC5"
        task_revision: 2
      -
        command_digest: "sha256:9328d133a7a99768444b7cfda6559e289386da393d9014399a4628e46e24547c"
        id: "sha256:7ac291bb9c674dfd5549020b915d48a084f45021707ad0a835d4f8268421be32:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7ac291bb9c674dfd5549020b915d48a084f45021707ad0a835d4f8268421be32"
        occurred_at: "2026-10-08T07:45:15.748Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610080740-NDWDC5"
        task_revision: 3
      -
        command_digest: "sha256:eef0dd9cecbacd53407ef80ab8a8af070a2fb75121a51b63e6dd8cc0c22a910d"
        id: "kernel_work_item_materialization_required:sha256:7c13ecf120cba00a68d932d60fb0830c266e540c30087864a911a1b0a90ad0c7:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:7c13ecf120cba00a68d932d60fb0830c266e540c30087864a911a1b0a90ad0c7:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T07:46:23.727Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610080740-NDWDC5"
        task_revision: 4
      -
        command_digest: "sha256:63d4db90c5e02eeb2dc1f046c146207143ca0a0404980f99f7231ac8d670d33b"
        id: "kernel_work_item_claim_required:sha256:a08091fc59278f0443b642b0a688265d773131d11b1d7f2b09ff395d70c56bcc:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a08091fc59278f0443b642b0a688265d773131d11b1d7f2b09ff395d70c56bcc:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T07:46:40.479Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610080740-NDWDC5"
        task_revision: 5
      -
        command_digest: "sha256:2cb98d5f40b219ec629537684c7c7de1d53f70a2788abc6c532be3e2b8a6d62e"
        id: "sha256:3ec3819b349ce057bae1b9e532c32d7d23eb8d8a26c4e804a700072223c66e1d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3ec3819b349ce057bae1b9e532c32d7d23eb8d8a26c4e804a700072223c66e1d"
        occurred_at: "2026-10-08T07:50:59.189Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610080740-NDWDC5"
        task_revision: 6
      -
        command_digest: "sha256:5443aba91988ae858a76fadf65aedc41d5dc817f225df38ed75ecdae04d25d7f"
        id: "kernel_work_item_execution_required:sha256:b781e291a48c444ed0712b6682dabc4237e39134b393cc52685534e771fa77d3:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b781e291a48c444ed0712b6682dabc4237e39134b393cc52685534e771fa77d3:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        occurred_at: "2026-10-08T07:51:30.679Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610080740-NDWDC5"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Qualify M05 live campaign contract and durable accounting offline

Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.

## Scope

- In scope: Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.
- Out of scope: unrelated refactors not required for "Qualify M05 live campaign contract and durable accounting offline".

## Plan

1. Execute approved WorkItem m05-contract-ledger.
2. Execute approved WorkItem m05-launcher-boundary.
3. Execute approved WorkItem m05-versioned-report.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-live-codex-launcher.test.mjs scripts/bench/paired-result-report.test.mjs scripts/bench/paired-m05-offline.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
