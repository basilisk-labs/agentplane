---
id: "202610070801-91ZH0N"
title: "Remove duplicated release and benchmark script logic for 0.7.13"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run clone:check"
  - "bun run format:check"
  - "bun x vitest run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts --maxWorkers=2"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T08:04:36.028Z"
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
      - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
      - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
      - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
      - "scripts/bench/cli-benchmark-runner.mjs"
      - "scripts/bench/measure-cli-walltime.mjs"
      - "scripts/checks/check-cli-cold-baseline.mjs"
      - "scripts/checks/check-cli-walltime-baseline.mjs"
      - "scripts/generate/render-homebrew-formula.mjs"
      - "scripts/generate/render-scoop-manifest.mjs"
      - "scripts/generate/render-setup-agentplane-action.mjs"
      - "scripts/lib/cli-baseline-check.mjs"
      - "scripts/lib/cli-baseline-check.test.mjs"
      - "scripts/lib/cli-benchmark-shared.mjs"
      - "scripts/lib/cli-benchmark-shared.test.mjs"
      - "scripts/lib/release-distribution-render.mjs"
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
      - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
      - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
      - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
      - "scripts/bench/cli-benchmark-runner.mjs"
      - "scripts/bench/measure-cli-walltime.mjs"
      - "scripts/checks/check-cli-cold-baseline.mjs"
      - "scripts/checks/check-cli-walltime-baseline.mjs"
      - "scripts/generate/render-homebrew-formula.mjs"
      - "scripts/generate/render-scoop-manifest.mjs"
      - "scripts/generate/render-setup-agentplane-action.mjs"
      - "scripts/lib/cli-baseline-check.mjs"
      - "scripts/lib/cli-baseline-check.test.mjs"
      - "scripts/lib/cli-benchmark-shared.mjs"
      - "scripts/lib/cli-benchmark-shared.test.mjs"
      - "scripts/lib/release-distribution-render.mjs"
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
          - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
          - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
          - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
          - "scripts/bench/cli-benchmark-runner.mjs"
          - "scripts/bench/measure-cli-walltime.mjs"
          - "scripts/checks/check-cli-cold-baseline.mjs"
          - "scripts/checks/check-cli-walltime-baseline.mjs"
          - "scripts/generate/render-homebrew-formula.mjs"
          - "scripts/generate/render-scoop-manifest.mjs"
          - "scripts/generate/render-setup-agentplane-action.mjs"
          - "scripts/lib/cli-baseline-check.mjs"
          - "scripts/lib/cli-baseline-check.test.mjs"
          - "scripts/lib/cli-benchmark-shared.mjs"
          - "scripts/lib/cli-benchmark-shared.test.mjs"
          - "scripts/lib/release-distribution-render.mjs"
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
      digest: "sha256:aaa8e3213cdd7e1aaa0fc7c950c63b7e80cc164ffa490008b44bfe1a0162b7b4"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
        - "central_component:scripts/checks/check-cli-cold-baseline.mjs"
        - "central_component:scripts/checks/check-cli-walltime-baseline.mjs"
        - "central_component:scripts/lib/cli-baseline-check.mjs"
        - "central_component:scripts/lib/cli-baseline-check.test.mjs"
        - "central_component:scripts/lib/cli-benchmark-shared.mjs"
        - "central_component:scripts/lib/cli-benchmark-shared.test.mjs"
        - "central_component:scripts/lib/release-distribution-render.mjs"
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
doc_updated_at: "2026-10-07T08:01:37.252Z"
doc_updated_by: "ORCHESTRATOR"
description: "Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification."
sections:
  Summary: |-
    Remove duplicated release and benchmark script logic for 0.7.13

    Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.
  Scope: |-
    - In scope: Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.
    - Out of scope: unrelated refactors not required for "Remove duplicated release and benchmark script logic for 0.7.13".
  Plan: "1. Execute approved WorkItem deduplicate-release-benchmark-scripts."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun x vitest run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "b50f9b74f16d1bd5bc5e632fe218f93bcae57398"
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
            digest: "sha256:e74caf7524e3ba09df48c4337c74d9d4c38f2152af698b8a8ce1b6007f0202b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ca9fcee6abe5a8aed04f56f75c1c39c8f47f38a66fdd6cc1d812d56229421e9d"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:492e3e8761003bd05c930ce9a77d8c176806169df3d723af62ecc24e10441d3c"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
              - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
              - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
              - "scripts/bench/cli-benchmark-runner.mjs"
              - "scripts/bench/measure-cli-walltime.mjs"
              - "scripts/checks/check-cli-cold-baseline.mjs"
              - "scripts/checks/check-cli-walltime-baseline.mjs"
              - "scripts/generate/render-homebrew-formula.mjs"
              - "scripts/generate/render-scoop-manifest.mjs"
              - "scripts/generate/render-setup-agentplane-action.mjs"
              - "scripts/lib/cli-baseline-check.mjs"
              - "scripts/lib/cli-baseline-check.test.mjs"
              - "scripts/lib/cli-benchmark-shared.mjs"
              - "scripts/lib/cli-benchmark-shared.test.mjs"
              - "scripts/lib/release-distribution-render.mjs"
            task_id: "202610070801-91ZH0N"
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
            digest: "sha256:c34d935d1165a04dcd2719480579dbbd36a22f7430ebc3df1e07398b437060eb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ca9fcee6abe5a8aed04f56f75c1c39c8f47f38a66fdd6cc1d812d56229421e9d"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:492e3e8761003bd05c930ce9a77d8c176806169df3d723af62ecc24e10441d3c"
              kind: "USER"
              parent_authority_digest: "sha256:e74caf7524e3ba09df48c4337c74d9d4c38f2152af698b8a8ce1b6007f0202b9"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:181c94e40fa0c6d270354774bdeb9d0bcd91b681528cec48f95663a7416f19c1"
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
              - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
              - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
              - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
              - "scripts/bench/cli-benchmark-runner.mjs"
              - "scripts/bench/measure-cli-walltime.mjs"
              - "scripts/checks/check-cli-cold-baseline.mjs"
              - "scripts/checks/check-cli-walltime-baseline.mjs"
              - "scripts/generate/render-homebrew-formula.mjs"
              - "scripts/generate/render-scoop-manifest.mjs"
              - "scripts/generate/render-setup-agentplane-action.mjs"
              - "scripts/lib/cli-baseline-check.mjs"
              - "scripts/lib/cli-baseline-check.test.mjs"
              - "scripts/lib/cli-benchmark-shared.mjs"
              - "scripts/lib/cli-benchmark-shared.test.mjs"
              - "scripts/lib/release-distribution-render.mjs"
            task_id: "202610070801-91ZH0N"
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
            evidence_digest: "sha256:b3cee082ccfb2c3e07f292a1ab777a03507770a2b26c54cb53268c33545bb044"
            kind: "authority_delta"
            previous_fingerprint: "sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
            repository_evidence_digest: "sha256:35b9b8ee13172f2b9b24e39488fabdf38c64a4e38eb8aca2ebf44d9ac8c249b0"
            request_digest: "sha256:d4769e23db9ea7636e407f0f114830bd9408bd11c22e8491d4b82ba50193c12e"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:492e3e8761003bd05c930ce9a77d8c176806169df3d723af62ecc24e10441d3c"
        digest: "sha256:ca9fcee6abe5a8aed04f56f75c1c39c8f47f38a66fdd6cc1d812d56229421e9d"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:864f8fe438ca881a1bdf87214ccb2b1e1d06d6aacebc6346bdc6338437154e1f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
                - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
                - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                - "scripts/bench/cli-benchmark-runner.mjs"
                - "scripts/bench/measure-cli-walltime.mjs"
                - "scripts/checks/check-cli-cold-baseline.mjs"
                - "scripts/checks/check-cli-walltime-baseline.mjs"
                - "scripts/generate/render-homebrew-formula.mjs"
                - "scripts/generate/render-scoop-manifest.mjs"
                - "scripts/generate/render-setup-agentplane-action.mjs"
                - "scripts/lib/cli-baseline-check.mjs"
                - "scripts/lib/cli-baseline-check.test.mjs"
                - "scripts/lib/cli-benchmark-shared.mjs"
                - "scripts/lib/cli-benchmark-shared.test.mjs"
                - "scripts/lib/release-distribution-render.mjs"
            expected_outputs:
              - "deduplication-evidence"
            id: "deduplicate-release-benchmark-scripts"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610070801-91ZH0N"
      intent_digest: "sha256:f3483d8d00e31a175051425538b45fefab2a9a90436702412bdfef38dc3f9611"
      migration_receipts: []
      mutation_receipts:
        capture:202610070801-91ZH0N:
          after_revision: 1
          aggregate_digest: "sha256:952c782f8e7c56bf89bfdfa7bea191f243cc8bd40e4035ce8e497e2e3e1c25ce"
          before_revision: 0
          command_digest: "sha256:ea172f69cf7a513b817d045689395c808ca188ba8a84283fcd442957d0360299"
          effect_ids: []
          event_digests:
            - "sha256:57e4d289492b5ff73851bcc8ae1f0448e541d65cd2782b7ce788efa3813d771f"
          mutation_id: "capture:202610070801-91ZH0N"
        kernel_work_item_claim_required:sha256:81ac3aea909436da6e2f0dedb730b85915a766dfd71935a2d5818bd508032ff4:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500:
          after_revision: 5
          aggregate_digest: "sha256:e0aee3077b25d074192e0411cc6c7e3da0b014557c239851e70ea476257ca479"
          before_revision: 4
          command_digest: "sha256:d7896b75a009e02b66e779bcdc9ecb9bd4b792a6cfa236b837d4ea76d3e5164f"
          effect_ids: []
          event_digests:
            - "sha256:9762ded4290954d3830188b49c645495ced458bbb764434faf41a78b78e69fb7"
          mutation_id: "kernel_work_item_claim_required:sha256:81ac3aea909436da6e2f0dedb730b85915a766dfd71935a2d5818bd508032ff4:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
        kernel_work_item_execution_required:sha256:ff924b92ba71944e7626da177d970f1686e9fdde91b586d9605a84cb5a7bff63:sha256:181c94e40fa0c6d270354774bdeb9d0bcd91b681528cec48f95663a7416f19c1:
          after_revision: 7
          aggregate_digest: "sha256:2a81f4b6e5c8b7f88691e5ca9936562e3e53760e58478c617d1f42f68bff6eab"
          before_revision: 6
          command_digest: "sha256:495edcb146b62bd2823e37998650447223f3c058e59098bdca329e62ae833eb3"
          effect_ids: []
          event_digests:
            - "sha256:322b3bf1fce82130b2418f2d53bcfba8ca9de04193f876aeed2697ac352814db"
          mutation_id: "kernel_work_item_execution_required:sha256:ff924b92ba71944e7626da177d970f1686e9fdde91b586d9605a84cb5a7bff63:sha256:181c94e40fa0c6d270354774bdeb9d0bcd91b681528cec48f95663a7416f19c1"
        kernel_work_item_materialization_required:sha256:514676596799dba00cac3414212b04f13026a0e251cc3e1c689e204b401017df:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500:
          after_revision: 4
          aggregate_digest: "sha256:37fd9367bbe9703235f45e297ab6021696c5c7a9bfa9c2214253d9ec4d651b3e"
          before_revision: 3
          command_digest: "sha256:a03d4ac48e24de3321f48365c27abb87b13cea8342e4229fc5f58e9e87f88f98"
          effect_ids: []
          event_digests:
            - "sha256:5a313a8d734c1d49e3c5cd461c3549fc01345b4360993be1604984bf16b76b25"
          mutation_id: "kernel_work_item_materialization_required:sha256:514676596799dba00cac3414212b04f13026a0e251cc3e1c689e204b401017df:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
        result:sha256:5ab6120f68bf1eaf13201e5a168b1b20726e032909b89e07f4ac14ad2e62f307:
          after_revision: 2
          aggregate_digest: "sha256:5213afd05765489fe4507c295198544564313ae0b02e757216ddd5dedea2368f"
          before_revision: 1
          command_digest: "sha256:2addaec01a018bc5425fd903d6d1efcff8afe03f71655b132c49df54cf063efb"
          effect_ids: []
          event_digests:
            - "sha256:f16c1ff723447d4f32b34665ac6b22aa67b5a92e6f38b7b02c9b17a7701e6d1d"
          mutation_id: "result:sha256:5ab6120f68bf1eaf13201e5a168b1b20726e032909b89e07f4ac14ad2e62f307"
        sha256:7cda7a2ddb5a7a9a5ea5698b517c28f5dd0be86cb3b07a7a4db1e17bdf0de2f0:
          after_revision: 3
          aggregate_digest: "sha256:38a626300a537196b2ea2291af35fb953cff34ebe558ebad88764c49cae426db"
          before_revision: 2
          command_digest: "sha256:a3b9222fa913f920d2d36de7085d6356ae32170e380959acbc35d9aaab032b0d"
          effect_ids: []
          event_digests:
            - "sha256:9e575065f4afa3e6e2c99f091879ee39f9c7412f6ab70fcc373017f2ac1b1ed8"
          mutation_id: "sha256:7cda7a2ddb5a7a9a5ea5698b517c28f5dd0be86cb3b07a7a4db1e17bdf0de2f0"
        sha256:8d6cad088cae2ccf473c2dbfe78e7d1c658801f2ebc444c6de949cb1bd9d3ac7:
          after_revision: 6
          aggregate_digest: "sha256:3f16d4886ae3278e9c36c12278e3d8424bd7db456a2b3ba2732d7933d0b31178"
          before_revision: 5
          command_digest: "sha256:3f35d45c63231cf56269eb6bf2bf7b663b2e0c2ee13ceeeb7b6330113f80d38f"
          effect_ids: []
          event_digests:
            - "sha256:00fb9b426d0090741060c86daaf762aa4fbd2a3039a69ddbb35b8035c3fc2431"
          mutation_id: "sha256:8d6cad088cae2ccf473c2dbfe78e7d1c658801f2ebc444c6de949cb1bd9d3ac7"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        deduplicate-release-benchmark-scripts:
          attempt: 1
          claim_id: "sha256:8137305b0023e12cfaa1375a244a2a076a3d567a3a29091e48e2a9638e3642a7"
          definition:
            contract_digest: "sha256:864f8fe438ca881a1bdf87214ccb2b1e1d06d6aacebc6346bdc6338437154e1f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
                - "packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts"
                - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                - "scripts/bench/cli-benchmark-runner.mjs"
                - "scripts/bench/measure-cli-walltime.mjs"
                - "scripts/checks/check-cli-cold-baseline.mjs"
                - "scripts/checks/check-cli-walltime-baseline.mjs"
                - "scripts/generate/render-homebrew-formula.mjs"
                - "scripts/generate/render-scoop-manifest.mjs"
                - "scripts/generate/render-setup-agentplane-action.mjs"
                - "scripts/lib/cli-baseline-check.mjs"
                - "scripts/lib/cli-baseline-check.test.mjs"
                - "scripts/lib/cli-benchmark-shared.mjs"
                - "scripts/lib/cli-benchmark-shared.test.mjs"
                - "scripts/lib/release-distribution-render.mjs"
            expected_outputs:
              - "deduplication-evidence"
            id: "deduplicate-release-benchmark-scripts"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:f977814a722c489714ceb2fb2e5a60301d5d8de9a550dbbf6b7d880f7beea987"
    documents:
      contracts:
        sha256:864f8fe438ca881a1bdf87214ccb2b1e1d06d6aacebc6346bdc6338437154e1f:
          acceptance_criteria:
            - "Extract shared CLI baseline parsing, measurement validation and comparison behavior into the scoped helper; preserve mode-specific flags, defaults, strict numeric validation, diagnostics, exit status and cold/walltime measurement semantics."
            - "Reuse the existing release-distribution-render owner for common renderer argument handling; preserve Homebrew, Scoop and setup-action generated bytes, defaults, required asset validation and failure diagnostics."
            - "First reduce CLI-check and renderer duplication. Only if necessary for unchanged clone thresholds, consolidate genuinely common benchmark runner behavior through the existing cli-benchmark-shared owner; preserve timing, warmups, attempts, subprocess environment, timeout and result semantics. Do not create a competing framework."
            - "Add behavior-focused tests for both CLI baseline modes, malformed inputs, threshold boundary/pass/failure and mode mismatch; retain existing renderer assertions and cover argument errors/defaults. If benchmark behavior changes, add deterministic subprocess success/failure/timeout and aggregation coverage using the scoped shared-helper test. Keep both scoped helper test files executable by the assigned node test command."
            - "Run the unchanged clone guard successfully: clones <=95, duplicatedLines <=1482 and duplicatedTokens <=10417. Retain actual metrics. Do not alter clone or performance baselines, scanner inputs/exclusions, immutable measurement evidence, release version metadata, or suppress/skip checks."
            - "Return source/check evidence with remaining limitations. Independent EVALUATOR, native full verification and branch integration remain required before candidate requalification. No publication, paid campaign or M05 disposition is authorized."
          objective: "Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run clone:check"
            - "bun run format:check"
            - "bun x vitest run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts --maxWorkers=2"
            - "git diff --check"
            - "node --test scripts/lib/cli-baseline-check.test.mjs scripts/lib/cli-benchmark-shared.test.mjs"
      intent:
        context: "Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification."
        objective: "Remove duplicated release and benchmark script logic for 0.7.13"
    events:
      -
        command_digest: "sha256:ea172f69cf7a513b817d045689395c808ca188ba8a84283fcd442957d0360299"
        id: "capture:202610070801-91ZH0N:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610070801-91ZH0N"
        occurred_at: "2026-10-07T08:01:37.192Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610070801-91ZH0N"
        task_revision: 1
      -
        command_digest: "sha256:2addaec01a018bc5425fd903d6d1efcff8afe03f71655b132c49df54cf063efb"
        id: "result:sha256:5ab6120f68bf1eaf13201e5a168b1b20726e032909b89e07f4ac14ad2e62f307:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:5ab6120f68bf1eaf13201e5a168b1b20726e032909b89e07f4ac14ad2e62f307"
        occurred_at: "2026-10-07T08:04:09.045Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610070801-91ZH0N"
        task_revision: 2
      -
        command_digest: "sha256:a3b9222fa913f920d2d36de7085d6356ae32170e380959acbc35d9aaab032b0d"
        id: "sha256:7cda7a2ddb5a7a9a5ea5698b517c28f5dd0be86cb3b07a7a4db1e17bdf0de2f0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7cda7a2ddb5a7a9a5ea5698b517c28f5dd0be86cb3b07a7a4db1e17bdf0de2f0"
        occurred_at: "2026-10-07T08:04:32.733Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610070801-91ZH0N"
        task_revision: 3
      -
        command_digest: "sha256:a03d4ac48e24de3321f48365c27abb87b13cea8342e4229fc5f58e9e87f88f98"
        id: "kernel_work_item_materialization_required:sha256:514676596799dba00cac3414212b04f13026a0e251cc3e1c689e204b401017df:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:514676596799dba00cac3414212b04f13026a0e251cc3e1c689e204b401017df:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
        occurred_at: "2026-10-07T08:04:50.045Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610070801-91ZH0N"
        task_revision: 4
      -
        command_digest: "sha256:d7896b75a009e02b66e779bcdc9ecb9bd4b792a6cfa236b837d4ea76d3e5164f"
        id: "kernel_work_item_claim_required:sha256:81ac3aea909436da6e2f0dedb730b85915a766dfd71935a2d5818bd508032ff4:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:81ac3aea909436da6e2f0dedb730b85915a766dfd71935a2d5818bd508032ff4:sha256:8ba09e7ab9acddc624debfcc8696edc41377a1243c7172924da0e84c1c3a4500"
        occurred_at: "2026-10-07T08:05:04.360Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610070801-91ZH0N"
        task_revision: 5
      -
        command_digest: "sha256:3f35d45c63231cf56269eb6bf2bf7b663b2e0c2ee13ceeeb7b6330113f80d38f"
        id: "sha256:8d6cad088cae2ccf473c2dbfe78e7d1c658801f2ebc444c6de949cb1bd9d3ac7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8d6cad088cae2ccf473c2dbfe78e7d1c658801f2ebc444c6de949cb1bd9d3ac7"
        occurred_at: "2026-10-07T08:07:35.317Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610070801-91ZH0N"
        task_revision: 6
      -
        command_digest: "sha256:495edcb146b62bd2823e37998650447223f3c058e59098bdca329e62ae833eb3"
        id: "kernel_work_item_execution_required:sha256:ff924b92ba71944e7626da177d970f1686e9fdde91b586d9605a84cb5a7bff63:sha256:181c94e40fa0c6d270354774bdeb9d0bcd91b681528cec48f95663a7416f19c1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ff924b92ba71944e7626da177d970f1686e9fdde91b586d9605a84cb5a7bff63:sha256:181c94e40fa0c6d270354774bdeb9d0bcd91b681528cec48f95663a7416f19c1"
        occurred_at: "2026-10-07T08:08:01.639Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610070801-91ZH0N"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Remove duplicated release and benchmark script logic for 0.7.13

Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.

## Scope

- In scope: Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.
- Out of scope: unrelated refactors not required for "Remove duplicated release and benchmark script logic for 0.7.13".

## Plan

1. Execute approved WorkItem deduplicate-release-benchmark-scripts.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun x vitest run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
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
