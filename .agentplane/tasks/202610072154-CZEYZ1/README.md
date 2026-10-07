---
id: "202610072154-CZEYZ1"
title: "Build frozen replay anchors with a separately captured isolated dependency closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
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
  - "node node_modules/eslint/bin/eslint.js scripts/bench/internal/agent-efficiency-anchor-runtime.mjs scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-shared-worktree-dependency-manifest.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T22:03:14.879Z"
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
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
      - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
      - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
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
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
      - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
      - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
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
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
          - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
          - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
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
      digest: "sha256:548adc5d18e4afc52235547a4a2b1d0f53bf4fbc4132d2d9e460a90506573382"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
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
doc_updated_at: "2026-10-07T21:54:14.549Z"
doc_updated_by: "CODER"
description: "Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration."
sections:
  Summary: |-
    Build frozen replay anchors with a separately captured isolated dependency closure

    Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.
  Scope: |-
    - In scope: Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.
    - Out of scope: unrelated refactors not required for "Build frozen replay anchors with a separately captured isolated dependency closure".
  Plan: "1. Execute approved WorkItem isolate-frozen-anchor-dependencies."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-shared-worktree-dependency-manifest.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node node_modules/eslint/bin/eslint.js scripts/bench/internal/agent-efficiency-anchor-runtime.mjs scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "63343f7622ea8a7224d02c1f9437c833113a998c"
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
            digest: "sha256:4d120ec1e49463a7252bce5b85c379fd532adac7b815ee78c5d488a2c6af6b76"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7b94222ca8d4722a431c7b8882102f4494fb1547444d30dd01f6c3e67579a199"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c8d2e56b6b69903aec06a4abda98320b7b7d049d2aa895792116179c42c1c248"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
              - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
              - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
            task_id: "202610072154-CZEYZ1"
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
            digest: "sha256:9677ecf55ec025df3f483b13cb0e193f52f41f5115257cdce00b58d7d1cb465c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7b94222ca8d4722a431c7b8882102f4494fb1547444d30dd01f6c3e67579a199"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c8d2e56b6b69903aec06a4abda98320b7b7d049d2aa895792116179c42c1c248"
              kind: "USER"
              parent_authority_digest: "sha256:4d120ec1e49463a7252bce5b85c379fd532adac7b815ee78c5d488a2c6af6b76"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
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
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
              - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
              - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
            task_id: "202610072154-CZEYZ1"
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
            evidence_digest: "sha256:0b60d0d806c89c84bf83bb022160ae9d78f0e7a31300d4e2f2d9111394c1e188"
            kind: "authority_delta"
            previous_fingerprint: "sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
            repository_evidence_digest: "sha256:6978e582d23fd72eed66b940a95ca67b857bc5561c7e73f5dd9da7c811517a54"
            request_digest: "sha256:e04efd3405ef70baa273d39a9e4d3d66a5adf8eda1a9e70d381f37046a3e45fd"
            request_task_revision: 5
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:aadc5ab2ce4e6a3647999da8f84ad00fdbd5afd92beae79d546a3031fdc512fa"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7b94222ca8d4722a431c7b8882102f4494fb1547444d30dd01f6c3e67579a199"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c8d2e56b6b69903aec06a4abda98320b7b7d049d2aa895792116179c42c1c248"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9677ecf55ec025df3f483b13cb0e193f52f41f5115257cdce00b58d7d1cb465c"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187"
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
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
              - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
              - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
            task_id: "202610072154-CZEYZ1"
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
              - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
            evidence_digest: "sha256:e0010066cf42db8318c5df850a8990dcd36adbd4708e71964d482080dc8747c7"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c8d2e56b6b69903aec06a4abda98320b7b7d049d2aa895792116179c42c1c248"
        digest: "sha256:7b94222ca8d4722a431c7b8882102f4494fb1547444d30dd01f6c3e67579a199"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b72dcde11120292b25f8e2fe1d212109a762ed1aa562caa26f7012dd15c4a18f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
                - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
            expected_outputs:
              - "isolated-anchor-dependency-evidence"
            id: "isolate-frozen-anchor-dependencies"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610072154-CZEYZ1"
      intent_digest: "sha256:da9f39cdeaa2023787e93d0f8e19a9fcbc3cef3e6011be3fe314bb5ba03f310f"
      migration_receipts: []
      mutation_receipts:
        capture:202610072154-CZEYZ1:
          after_revision: 1
          aggregate_digest: "sha256:e7ef27fead4664de9750f8c842ba92c16bff91b8b291700e23fe9d4990e26836"
          before_revision: 0
          command_digest: "sha256:40e022171789115b95f549c5d40a01779f804f77239eb53de191171f03c4ea1f"
          effect_ids: []
          event_digests:
            - "sha256:3eda2891900532ecf76e5ed9ae0ce6acf7c23bbf3bd28b0718b14a1b61a89ae1"
          mutation_id: "capture:202610072154-CZEYZ1"
        kernel_work_item_claim_required:sha256:149b038d1940caea5b504e354fdf92678d3620172842b45362619353822ef144:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:
          after_revision: 5
          aggregate_digest: "sha256:bcb097eba9e62c7df6e1383f6984a5a25cc4e796dd8e0c54903e180e904d43be"
          before_revision: 4
          command_digest: "sha256:f91051e23fa6d631c55bc12fdf61c5a2697e0b5caa44378dbc937b6309cdf390"
          effect_ids: []
          event_digests:
            - "sha256:669ef659b6e4622beb37ff3c1507ee9913a5d5007492ed4878ba122faafa15d9"
          mutation_id: "kernel_work_item_claim_required:sha256:149b038d1940caea5b504e354fdf92678d3620172842b45362619353822ef144:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        kernel_work_item_claim_required:sha256:7f8ac5eb653ac9f0e626b216beca7e21ed3a3313b5acac5214daa064e7714a39:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187:
          after_revision: 11
          aggregate_digest: "sha256:8b70d189d10466ed7fd57d52d323eb8aaa5d30816eeeefe0e57a830b70c4ad66"
          before_revision: 10
          command_digest: "sha256:6db00fa356170a422ab4c57dc32e6a33563d483ff21526ee3a736d5990601522"
          effect_ids: []
          event_digests:
            - "sha256:7e2b055baef79fab6ef94ee9ec648f309dda40b77a0bafe13101bf603e5b2d70"
          mutation_id: "kernel_work_item_claim_required:sha256:7f8ac5eb653ac9f0e626b216beca7e21ed3a3313b5acac5214daa064e7714a39:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187"
        kernel_work_item_execution_required:sha256:05c762d6b75d3dc83f0c4e68d81e55fbf90aacc6b799cf1fa863b7da378666e4:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187:
          after_revision: 12
          aggregate_digest: "sha256:a93ee1aa9ce71f14111e625b387aa4d83f77d2233a9f50cfa80bcad9d96b9595"
          before_revision: 11
          command_digest: "sha256:a71114a264ce7cfad21dfa2673aea477a4eef821d2cf64b66065e9783b366ef8"
          effect_ids: []
          event_digests:
            - "sha256:96514a9443c936ab94d0e5c8f663e05f514d09974a35602fe0963c17594a6624"
          mutation_id: "kernel_work_item_execution_required:sha256:05c762d6b75d3dc83f0c4e68d81e55fbf90aacc6b799cf1fa863b7da378666e4:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187"
        kernel_work_item_execution_required:sha256:3df3570df18797475c8b5cb15dd7887c5b28506aa9e7dacd8a68a15f34570168:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475:
          after_revision: 7
          aggregate_digest: "sha256:b737f49d1434ae5324c270aab265239daae7b7d649e600a15eab145bc4d00f08"
          before_revision: 6
          command_digest: "sha256:062f8eb1bdcec90f79a40bc20a5ca2404213af2e5025ca87beadab1049cefce5"
          effect_ids: []
          event_digests:
            - "sha256:8e47568068e64d09a0614cd1d7b78e6b73ad4331b00e13446c23d70c79b5369b"
          mutation_id: "kernel_work_item_execution_required:sha256:3df3570df18797475c8b5cb15dd7887c5b28506aa9e7dacd8a68a15f34570168:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
        kernel_work_item_materialization_required:sha256:2c7b489253a135cb290d75e2fb3be0fc7ab8e8605dca29531cddadf4e666e0fa:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:
          after_revision: 4
          aggregate_digest: "sha256:f93a7be874cc0178d096680a9195a6499eb9d55136dc2b576050bdad6f0bd96e"
          before_revision: 3
          command_digest: "sha256:64179d87637fe6f4cfb08a37f4775bcea2544473b025718ac497428172574d3b"
          effect_ids: []
          event_digests:
            - "sha256:afc6a8b07d81bac7e4d4b2d765fc9ee330dc83d606f403d163aa415306d9785a"
          mutation_id: "kernel_work_item_materialization_required:sha256:2c7b489253a135cb290d75e2fb3be0fc7ab8e8605dca29531cddadf4e666e0fa:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        result:sha256:75e39442000d0b4ab0914f49b0f8b9e8e8e32f904506d80cb9d6325ff1212086:
          after_revision: 2
          aggregate_digest: "sha256:f59098f1155fec1f0f8c45d0f978dbf9600837dbc1595ba626804ae5319962b9"
          before_revision: 1
          command_digest: "sha256:d716a8710a57358d2e7fab8a2d6d5ec478750ad7c61d0e55b9448faefefa2d35"
          effect_ids: []
          event_digests:
            - "sha256:217f881c41ae3800abe3c4eea423763264f493f5239f736f50ab1bfff277ea41"
          mutation_id: "result:sha256:75e39442000d0b4ab0914f49b0f8b9e8e8e32f904506d80cb9d6325ff1212086"
        semantic-stop:sha256:3ba16f2ebe973031303b5a75ddee8e1402b5bc9d347566b0c934cea1bf2b9906:
          after_revision: 9
          aggregate_digest: "sha256:b6da1b4b5f82b2d007c1d5724a241ff91b18d1096b245022cac97caeb8415d53"
          before_revision: 8
          command_digest: "sha256:75fb1feefd8adbce63b69e67fbc4afce1f51f01cb91814377407af11519fbf1f"
          effect_ids: []
          event_digests:
            - "sha256:f6dce1a9ae66540ddab42eff12eeeda4d213b151540ce413d8a8dd2775ed3a85"
          mutation_id: "semantic-stop:sha256:3ba16f2ebe973031303b5a75ddee8e1402b5bc9d347566b0c934cea1bf2b9906"
        sha256:7a19c8e8d3e6faecf768161e2ba46067d0f017e4f23ad3a939e7b217be2d7a84:
          after_revision: 8
          aggregate_digest: "sha256:f4df61b60fd6813369bd82b32a87982bb7c5eee0adc493d3cc1907c162fa34ab"
          before_revision: 7
          command_digest: "sha256:718be9460615e6f55fc9101278a2a083c9561e8356f667e8b31c9a257d3dd376"
          effect_ids: []
          event_digests:
            - "sha256:bb735459bc4f87ff3025cfed97555fa03aab837c070e87a62c5af3fc0cd6ef38"
          mutation_id: "sha256:7a19c8e8d3e6faecf768161e2ba46067d0f017e4f23ad3a939e7b217be2d7a84"
        sha256:c933895385b1c6b14cd94dacf69a48557b192e51478b2e7b5b15df6505eea5a5:
          after_revision: 3
          aggregate_digest: "sha256:c3771a73a1b7d88e762a3bb5989e34f688269ff5ec2d8132d3877e3d5649f6d1"
          before_revision: 2
          command_digest: "sha256:1a6f0b0f300e5bf656b83416170acf9cd93e7a3f483ce728b130c17d08187740"
          effect_ids: []
          event_digests:
            - "sha256:d1096e04ea28c0a88679efff66da84a54ad49d0303020a31da64c33a04fb30af"
          mutation_id: "sha256:c933895385b1c6b14cd94dacf69a48557b192e51478b2e7b5b15df6505eea5a5"
        sha256:ca2f8fcedf244ddf0aea8e3dacd8b91eed901c35f15c0f169254d65bab210c08:
          after_revision: 6
          aggregate_digest: "sha256:7812835d33586800cac88d7504fea103052dc6f8e502120ac6037749dfb38d3e"
          before_revision: 5
          command_digest: "sha256:a801dfd685049bac2e07b2aeccf4c5ca84d5e0535c9604793180134516909938"
          effect_ids: []
          event_digests:
            - "sha256:20a906b1646753ad2fb6df2b924db9822d5d2b7bc44bd466311e79ff354e791d"
          mutation_id: "sha256:ca2f8fcedf244ddf0aea8e3dacd8b91eed901c35f15c0f169254d65bab210c08"
        work-item-resume:sha256:2dd70d42d919fe405d99f7c5c9cb7c91bf6bed53b06316f918111d7aa54e3de0:
          after_revision: 10
          aggregate_digest: "sha256:99c0ae81821cf640c487114c3a50eafe627374a37b3176dbdc0bcdbcca82a15b"
          before_revision: 9
          command_digest: "sha256:90d8d02eba2dcc3437dd8316fda86cfe6d48369690220923a3b4947368adadd3"
          effect_ids: []
          event_digests:
            - "sha256:82b4b56ec8aad32e70ff7897fa98dad53db9f3824f31c8acb28dd3ac59b93e4c"
          mutation_id: "work-item-resume:sha256:2dd70d42d919fe405d99f7c5c9cb7c91bf6bed53b06316f918111d7aa54e3de0"
      plan_history: []
      revision: 12
      schema_version: 1
      state: "ACTIVE"
      work_items:
        isolate-frozen-anchor-dependencies:
          attempt: 2
          claim_id: "sha256:c967dfbf6aedb3552e8213e2de97c23d886195a9fafebb69a5a88189502d340d"
          definition:
            contract_digest: "sha256:b72dcde11120292b25f8e2fe1d212109a762ed1aa562caa26f7012dd15c4a18f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
                - "scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
            expected_outputs:
              - "isolated-anchor-dependency-evidence"
            id: "isolate-frozen-anchor-dependencies"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 7
          state: "EXECUTING"
          validation: null
    digest: "sha256:0d7a783233958792ad86b73793e0419c05e59280bfdffdbe218c2a79c7c92af6"
    documents:
      contracts:
        sha256:b72dcde11120292b25f8e2fe1d212109a762ed1aa562caa26f7012dd15c4a18f:
          acceptance_criteria:
            - "Preserve strict shared-driver assertAnchorLockCompatible and its exact approved toolchain/workspace projections. Do not accept whole-graph digest pairs or delete unrelated differences. Introduce an explicitly identified isolated anchor dependency mode rather than catching arbitrary errors and silently using driver packages."
            - "Use frozen anchor lock and workspace manifests to select exact package identities and dependency edges from repository-contained installed packages. Isolate the anchor resolution tree so Node resolution cannot fall through to current driver modules. Reject missing required packages, ambiguous incompatible candidates, unsupported lock entries, cycles or path escapes that cannot be safely resolved, and mismatched versions/edges. Handle optional/platform-specific and available peer dependencies consistently with existing capture semantics. Bound traversal and filesystem work; no network installs."
            - "Preserve validated driver dependency_claim unchanged. Reuse existing dependency-manifest APIs to capture a separately named anchor closure receipt with its lock/workspace graph, actual bytes, resolved edges, platform and linked digests. Recheck the selected source/materialized closure before and after compilation and reject byte or resolution drift. Preserve existing HEAD/tree/tracked-clean and build-manifest checks. Do not claim registry-tarball authentication or equivalence with historical Darwin bytes."
            - "Keep frozen anchor, current dependency locks/manifests, historical replay baselines/envelopes and SGYZBH failure evidence unchanged. Replace stale frozen/current-positive expectations in both scoped tests with deterministic controlled approved-delta positives and real unsupported-current-drift negatives. Preserve all existing meaningful tamper checks."
            - "Add focused helper and runtime tests for exact frozen selection and isolated resolution, missing/ambiguous packages, wrong versions, altered edges or bytes, escaping links, invalid/mismatched capture receipt, no driver fallback, and before/after mutation rejection. Retain and pass the genuine offline exact-anchor CURRENT_AGENT entrypoint with truthful separate driver/anchor provenance, not a mocked replacement. Test valid repository shared-module layouts and platform handling without manufacturing historical equivalence."
            - "Run all four exact verification commands sequentially so replay temporary fixture cleanup cannot race global format traversal. The three-file Vitest command uses the real existing commands/release/shared-worktree-dependency-manifest.test.ts; the erroneous intake cli path remains historical and is not claimed as executed. Preserve failures and return BLOCKED if exact isolated packages or provenance cannot be established within scope."
            - "Return source inventory, exact checks and bounded provenance evidence. Native independent evaluation, full verification and PR/main integration remain required before candidate requalification. No paid campaign, measured efficiency, publication or M05 decision is inferred."
          objective: "Build the frozen replay anchor using an explicitly isolated exact dependency closure and separately captured provenance while retaining strict shared-driver lock checks."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "node node_modules/eslint/bin/eslint.js scripts/bench/internal/agent-efficiency-anchor-runtime.mjs scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration."
        objective: "Build frozen replay anchors with a separately captured isolated dependency closure"
    events:
      -
        command_digest: "sha256:40e022171789115b95f549c5d40a01779f804f77239eb53de191171f03c4ea1f"
        id: "capture:202610072154-CZEYZ1:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610072154-CZEYZ1"
        occurred_at: "2026-10-07T21:54:14.475Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610072154-CZEYZ1"
        task_revision: 1
      -
        command_digest: "sha256:d716a8710a57358d2e7fab8a2d6d5ec478750ad7c61d0e55b9448faefefa2d35"
        id: "result:sha256:75e39442000d0b4ab0914f49b0f8b9e8e8e32f904506d80cb9d6325ff1212086:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:75e39442000d0b4ab0914f49b0f8b9e8e8e32f904506d80cb9d6325ff1212086"
        occurred_at: "2026-10-07T22:00:47.066Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610072154-CZEYZ1"
        task_revision: 2
      -
        command_digest: "sha256:1a6f0b0f300e5bf656b83416170acf9cd93e7a3f483ce728b130c17d08187740"
        id: "sha256:c933895385b1c6b14cd94dacf69a48557b192e51478b2e7b5b15df6505eea5a5:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c933895385b1c6b14cd94dacf69a48557b192e51478b2e7b5b15df6505eea5a5"
        occurred_at: "2026-10-07T22:03:05.335Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610072154-CZEYZ1"
        task_revision: 3
      -
        command_digest: "sha256:64179d87637fe6f4cfb08a37f4775bcea2544473b025718ac497428172574d3b"
        id: "kernel_work_item_materialization_required:sha256:2c7b489253a135cb290d75e2fb3be0fc7ab8e8605dca29531cddadf4e666e0fa:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2c7b489253a135cb290d75e2fb3be0fc7ab8e8605dca29531cddadf4e666e0fa:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        occurred_at: "2026-10-07T22:03:57.889Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610072154-CZEYZ1"
        task_revision: 4
      -
        command_digest: "sha256:f91051e23fa6d631c55bc12fdf61c5a2697e0b5caa44378dbc937b6309cdf390"
        id: "kernel_work_item_claim_required:sha256:149b038d1940caea5b504e354fdf92678d3620172842b45362619353822ef144:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:149b038d1940caea5b504e354fdf92678d3620172842b45362619353822ef144:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        occurred_at: "2026-10-07T22:04:31.752Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610072154-CZEYZ1"
        task_revision: 5
      -
        command_digest: "sha256:a801dfd685049bac2e07b2aeccf4c5ca84d5e0535c9604793180134516909938"
        id: "sha256:ca2f8fcedf244ddf0aea8e3dacd8b91eed901c35f15c0f169254d65bab210c08:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ca2f8fcedf244ddf0aea8e3dacd8b91eed901c35f15c0f169254d65bab210c08"
        occurred_at: "2026-10-07T22:08:24.899Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610072154-CZEYZ1"
        task_revision: 6
      -
        command_digest: "sha256:062f8eb1bdcec90f79a40bc20a5ca2404213af2e5025ca87beadab1049cefce5"
        id: "kernel_work_item_execution_required:sha256:3df3570df18797475c8b5cb15dd7887c5b28506aa9e7dacd8a68a15f34570168:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3df3570df18797475c8b5cb15dd7887c5b28506aa9e7dacd8a68a15f34570168:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
        occurred_at: "2026-10-07T22:09:12.500Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610072154-CZEYZ1"
        task_revision: 7
      -
        command_digest: "sha256:718be9460615e6f55fc9101278a2a083c9561e8356f667e8b31c9a257d3dd376"
        id: "sha256:7a19c8e8d3e6faecf768161e2ba46067d0f017e4f23ad3a939e7b217be2d7a84:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7a19c8e8d3e6faecf768161e2ba46067d0f017e4f23ad3a939e7b217be2d7a84"
        occurred_at: "2026-10-07T22:12:57.245Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610072154-CZEYZ1"
        task_revision: 8
      -
        command_digest: "sha256:75fb1feefd8adbce63b69e67fbc4afce1f51f01cb91814377407af11519fbf1f"
        id: "semantic-stop:sha256:3ba16f2ebe973031303b5a75ddee8e1402b5bc9d347566b0c934cea1bf2b9906:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:3ba16f2ebe973031303b5a75ddee8e1402b5bc9d347566b0c934cea1bf2b9906"
        occurred_at: "2026-10-07T22:13:22.546Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610072154-CZEYZ1"
        task_revision: 9
      -
        command_digest: "sha256:90d8d02eba2dcc3437dd8316fda86cfe6d48369690220923a3b4947368adadd3"
        id: "work-item-resume:sha256:2dd70d42d919fe405d99f7c5c9cb7c91bf6bed53b06316f918111d7aa54e3de0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:2dd70d42d919fe405d99f7c5c9cb7c91bf6bed53b06316f918111d7aa54e3de0"
        occurred_at: "2026-10-07T22:15:17.729Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610072154-CZEYZ1"
        task_revision: 10
      -
        command_digest: "sha256:6db00fa356170a422ab4c57dc32e6a33563d483ff21526ee3a736d5990601522"
        id: "kernel_work_item_claim_required:sha256:7f8ac5eb653ac9f0e626b216beca7e21ed3a3313b5acac5214daa064e7714a39:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7f8ac5eb653ac9f0e626b216beca7e21ed3a3313b5acac5214daa064e7714a39:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187"
        occurred_at: "2026-10-07T22:16:22.106Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610072154-CZEYZ1"
        task_revision: 11
      -
        command_digest: "sha256:a71114a264ce7cfad21dfa2673aea477a4eef821d2cf64b66065e9783b366ef8"
        id: "kernel_work_item_execution_required:sha256:05c762d6b75d3dc83f0c4e68d81e55fbf90aacc6b799cf1fa863b7da378666e4:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:05c762d6b75d3dc83f0c4e68d81e55fbf90aacc6b799cf1fa863b7da378666e4:sha256:47ba601d93962916cb66dd1aa2085c85d25c11bd5bfb7cf7325bbe8453349187"
        occurred_at: "2026-10-07T22:16:39.735Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610072154-CZEYZ1"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Build frozen replay anchors with a separately captured isolated dependency closure

Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.

## Scope

- In scope: Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.
- Out of scope: unrelated refactors not required for "Build frozen replay anchors with a separately captured isolated dependency closure".

## Plan

1. Execute approved WorkItem isolate-frozen-anchor-dependencies.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-shared-worktree-dependency-manifest.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node node_modules/eslint/bin/eslint.js scripts/bench/internal/agent-efficiency-anchor-runtime.mjs scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
