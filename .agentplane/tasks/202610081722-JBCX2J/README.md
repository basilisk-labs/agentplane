---
id: "202610081722-JBCX2J"
title: "Allow bounded full regression to complete on constrained release hosts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --pool=forks --maxWorkers 1"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-08T17:24:30.147Z"
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
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      digest: "sha256:4760960d18fa02a828db4432ff47beb8aa5da59eb0ad6cea343ff2e48b4258ea"
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
doc_updated_at: "2026-10-08T17:22:19.683Z"
doc_updated_by: "CODER"
description: "Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks."
sections:
  Summary: |-
    Allow bounded full regression to complete on constrained release hosts

    Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.
  Scope: |-
    - In scope: Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.
    - Out of scope: unrelated refactors not required for "Allow bounded full regression to complete on constrained release hosts".
  Plan: "1. Execute approved WorkItem bounded-full-regression-timeout."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow bounded full regression to complete on constrained release hosts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow bounded full regression to complete on constrained release hosts". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "6cbd18628af1b3fc9fcb27fa9e80b45e1855f3a5"
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
            digest: "sha256:6916e15c3ce999e4934d3f4d1d4f2f7df8af1fa71ba15babe6a30e121eb68480"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e3e408dc2e0263643fc1da7fccbcb72f36f722813ad0cf179c6af4f999ce07d"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4b4df51b234e89d1bf9c9486bbf174763f64ac1f89d2682a16c6d625107e6ccd"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            task_id: "202610081722-JBCX2J"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
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
            digest: "sha256:c5169aa866005194fa6b39edd2d9909201aa887e14449749f5a029e938286c59"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e3e408dc2e0263643fc1da7fccbcb72f36f722813ad0cf179c6af4f999ce07d"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:4b4df51b234e89d1bf9c9486bbf174763f64ac1f89d2682a16c6d625107e6ccd"
              kind: "USER"
              parent_authority_digest: "sha256:6916e15c3ce999e4934d3f4d1d4f2f7df8af1fa71ba15babe6a30e121eb68480"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:04ecc3debb071db7e1c300b25438add7bb678712cacc66713cf3fb1197d5934a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
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
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610081722-JBCX2J"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
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
            evidence_digest: "sha256:46711807f0d0654b4087d8777759043ce0bf70d20da320c3acc4b5e16b908eb1"
            kind: "authority_delta"
            previous_fingerprint: "sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
            repository_evidence_digest: "sha256:a4f66aa6e7830ef3b67f85fb8d0cb47cffbc219203670f6e8ac57f0e75f7c496"
            request_digest: "sha256:0491732d37caa54334ddd533ef17b3c5f7721a46a96aef4d70de4832a7fa103d"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:4b4df51b234e89d1bf9c9486bbf174763f64ac1f89d2682a16c6d625107e6ccd"
        digest: "sha256:4e3e408dc2e0263643fc1da7fccbcb72f36f722813ad0cf179c6af4f999ce07d"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:ea529f759429243fd21e17763cae67ba820e80d4e71b6c6eecbbe6b69594946b"
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
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            expected_outputs:
              - "timeout-repair-evidence"
            id: "bounded-full-regression-timeout"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610081722-JBCX2J"
      intent_digest: "sha256:a4496b34146bc2bdbf2107267ab0ccc9f5499947cc48bf49f5e26b692ddb9af6"
      migration_receipts: []
      mutation_receipts:
        capture:202610081722-JBCX2J:
          after_revision: 1
          aggregate_digest: "sha256:acddef8a4d79436d123637cc7e166e613ed2f8b0044b536a7d61f195a0a1d37e"
          before_revision: 0
          command_digest: "sha256:47654b1bd31e60c3509e4eb55349ecb72de2be55fb9019663a56d93c1f66e469"
          effect_ids: []
          event_digests:
            - "sha256:b512e8fa34c2330796b2f89a83cdfcb253112c7955109673cf6d49c6498d8add"
          mutation_id: "capture:202610081722-JBCX2J"
        kernel_work_item_claim_required:sha256:c284d9d0dbb6be2434292a6720bceae58ba62cc07319c62ed02bbda6011495ae:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2:
          after_revision: 5
          aggregate_digest: "sha256:2a5aef1139e46a1ae3183c71e104a2ad03bf1db7b01834cd17329c2152b9b6b5"
          before_revision: 4
          command_digest: "sha256:47f4d5f657149a48bad4ee358f58ebed1c7fa0a4061974a1a1543ae9e1f7b7c6"
          effect_ids: []
          event_digests:
            - "sha256:05c5de2a29ecc8969ee6fe53d801dfc5a170ea48f1f818bb9eac658710cd2a5f"
          mutation_id: "kernel_work_item_claim_required:sha256:c284d9d0dbb6be2434292a6720bceae58ba62cc07319c62ed02bbda6011495ae:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
        kernel_work_item_execution_required:sha256:7329e8ccb3f3bcf9e32de0a45d7a230069f30350fa25cec8124d57d32b9ed322:sha256:04ecc3debb071db7e1c300b25438add7bb678712cacc66713cf3fb1197d5934a:
          after_revision: 7
          aggregate_digest: "sha256:b104c4363fa91c5f18414e7306798cb6a508a46ac3dbcef4e33af8b3d98c4ac7"
          before_revision: 6
          command_digest: "sha256:50a6589d784e0641b92e0ee013055da2c6534dd0e7f50871a24ab21e03689bd0"
          effect_ids: []
          event_digests:
            - "sha256:8bcda5e624f00132b45fc4bf309a7feb8cc0f8c00997aa6d16aac9e29ab5ec06"
          mutation_id: "kernel_work_item_execution_required:sha256:7329e8ccb3f3bcf9e32de0a45d7a230069f30350fa25cec8124d57d32b9ed322:sha256:04ecc3debb071db7e1c300b25438add7bb678712cacc66713cf3fb1197d5934a"
        kernel_work_item_materialization_required:sha256:9c1f29a5946dc57039a9f620d11094daa799afccb7860be805ceba442ee90bf0:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2:
          after_revision: 4
          aggregate_digest: "sha256:9c3a3aa9772a68b41641dd7b124eb34ce03e9cc3d1efd5850ed86c3cc7c9abf1"
          before_revision: 3
          command_digest: "sha256:f1f1977b89b5e48cbf195c8f066207cf7da9fa11a756f91f610842dad3e836a1"
          effect_ids: []
          event_digests:
            - "sha256:22ce3a4cec1fc9ed1e680dcb9e891e119f88ade16363669cb1b7719562f6941c"
          mutation_id: "kernel_work_item_materialization_required:sha256:9c1f29a5946dc57039a9f620d11094daa799afccb7860be805ceba442ee90bf0:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
        result:sha256:4a5bc53324eaa0e36114fe8ecb6fa04a86f92fac9e641bd1b1a2ae2c183f2181:
          after_revision: 2
          aggregate_digest: "sha256:d07b9c16f7c06670743c461d7c499e63d4d6f2cf279465697214d9ddff96cbc6"
          before_revision: 1
          command_digest: "sha256:66ca45a158068c93867a26541f764706bf4da840397178ea5e68c5b43682ca1c"
          effect_ids: []
          event_digests:
            - "sha256:733bff06d8a8bffd6d6c3a55b2cb69059fefb0fa876538606ff43e57d4f55ec1"
          mutation_id: "result:sha256:4a5bc53324eaa0e36114fe8ecb6fa04a86f92fac9e641bd1b1a2ae2c183f2181"
        sha256:28003fc9f072dae21f81eeb436cdf0e32c40b25c2a97916553dc1d76e15d2aec:
          after_revision: 6
          aggregate_digest: "sha256:7e30b132f34bf335bbf018a3419eab35c7792a00de5f11fef124790f767ca064"
          before_revision: 5
          command_digest: "sha256:d6c4d1688e93153bd200496234b8acfc1e4387da58a81b9e8cd15b96aed07ffb"
          effect_ids: []
          event_digests:
            - "sha256:e0276c108721cf9e8e5231c04e7413a5dcdcab389cd5a69323742c6eb4c37dd6"
          mutation_id: "sha256:28003fc9f072dae21f81eeb436cdf0e32c40b25c2a97916553dc1d76e15d2aec"
        sha256:e785e399368194b3c08c9d6dcccac0fe398317d86d0939515a3db234bea1795e:
          after_revision: 3
          aggregate_digest: "sha256:84b74ca087e2769a8e9be99fe41297085292adcba76f68c5fc1c95db57884ebb"
          before_revision: 2
          command_digest: "sha256:dabc190984f16e4e0f95e8da5a273339c8235817aeb1fdffe4fbb8dfc5f97918"
          effect_ids: []
          event_digests:
            - "sha256:bb02b01cafcdeb7c7bcb0f502a48d106d0c25238d60f1bf51bc9f153f7c24242"
          mutation_id: "sha256:e785e399368194b3c08c9d6dcccac0fe398317d86d0939515a3db234bea1795e"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bounded-full-regression-timeout:
          attempt: 1
          claim_id: "sha256:8dfc87ad27cbbce64cc17056a822c86f579dc113553a3197cec4f634070f8182"
          definition:
            contract_digest: "sha256:ea529f759429243fd21e17763cae67ba820e80d4e71b6c6eecbbe6b69594946b"
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
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            expected_outputs:
              - "timeout-repair-evidence"
            id: "bounded-full-regression-timeout"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:b66bd9876f0f4121c096c56eeb958e87b6038ba9a1547802aac1e63e6b8b03c8"
    documents:
      contracts:
        sha256:ea529f759429243fd21e17763cae67ba820e80d4e71b6c6eecbbe6b69594946b:
          acceptance_criteria:
            - "Change only the ci:local:full script-specific default from 90 to 150 minutes (9000000 ms), matching release:ci-check; preserve every required check and all existing release budgets."
            - "Exercise actual verification runner invocation for ci:local:full, asserting the exact executable, arguments, working directory and 9000000 ms timeout. Preserve meaningful existing assertions."
            - "Prove a shorter explicit additional_commands timeout still takes precedence and an unrelated command retains its 30-minute default. Do not add global timeout overrides or change process lifecycle, failure handling, authority, check selection or retry behavior."
            - "Keep changes within the three admitted files and minimize actual edits. Preserve prior failed validation evidence. Return accurate focused check evidence and source summary; native independent evaluation, final regression and integration remain required."
          objective: "Give ci:local:full a finite 150-minute native verification budget while preserving all verification and timeout precedence."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --pool=forks --maxWorkers 1"
            - "bunx --no-install eslint packages/agentplane/src/commands/task/direct-task-verification.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bunx --no-install prettier --check packages/agentplane/src/commands/task/direct-task-verification.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "git diff --check"
      intent:
        context: "Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks."
        objective: "Allow bounded full regression to complete on constrained release hosts"
    events:
      -
        command_digest: "sha256:47654b1bd31e60c3509e4eb55349ecb72de2be55fb9019663a56d93c1f66e469"
        id: "capture:202610081722-JBCX2J:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610081722-JBCX2J"
        occurred_at: "2026-10-08T17:22:19.635Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610081722-JBCX2J"
        task_revision: 1
      -
        command_digest: "sha256:66ca45a158068c93867a26541f764706bf4da840397178ea5e68c5b43682ca1c"
        id: "result:sha256:4a5bc53324eaa0e36114fe8ecb6fa04a86f92fac9e641bd1b1a2ae2c183f2181:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4a5bc53324eaa0e36114fe8ecb6fa04a86f92fac9e641bd1b1a2ae2c183f2181"
        occurred_at: "2026-10-08T17:24:12.407Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610081722-JBCX2J"
        task_revision: 2
      -
        command_digest: "sha256:dabc190984f16e4e0f95e8da5a273339c8235817aeb1fdffe4fbb8dfc5f97918"
        id: "sha256:e785e399368194b3c08c9d6dcccac0fe398317d86d0939515a3db234bea1795e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e785e399368194b3c08c9d6dcccac0fe398317d86d0939515a3db234bea1795e"
        occurred_at: "2026-10-08T17:24:23.450Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610081722-JBCX2J"
        task_revision: 3
      -
        command_digest: "sha256:f1f1977b89b5e48cbf195c8f066207cf7da9fa11a756f91f610842dad3e836a1"
        id: "kernel_work_item_materialization_required:sha256:9c1f29a5946dc57039a9f620d11094daa799afccb7860be805ceba442ee90bf0:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:9c1f29a5946dc57039a9f620d11094daa799afccb7860be805ceba442ee90bf0:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
        occurred_at: "2026-10-08T17:24:34.124Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610081722-JBCX2J"
        task_revision: 4
      -
        command_digest: "sha256:47f4d5f657149a48bad4ee358f58ebed1c7fa0a4061974a1a1543ae9e1f7b7c6"
        id: "kernel_work_item_claim_required:sha256:c284d9d0dbb6be2434292a6720bceae58ba62cc07319c62ed02bbda6011495ae:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:c284d9d0dbb6be2434292a6720bceae58ba62cc07319c62ed02bbda6011495ae:sha256:b9da2281119b2424d34580006a9314ea26e7afe362e7a867c95d9acc256cf6a2"
        occurred_at: "2026-10-08T17:24:50.124Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610081722-JBCX2J"
        task_revision: 5
      -
        command_digest: "sha256:d6c4d1688e93153bd200496234b8acfc1e4387da58a81b9e8cd15b96aed07ffb"
        id: "sha256:28003fc9f072dae21f81eeb436cdf0e32c40b25c2a97916553dc1d76e15d2aec:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:28003fc9f072dae21f81eeb436cdf0e32c40b25c2a97916553dc1d76e15d2aec"
        occurred_at: "2026-10-08T17:27:00.600Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610081722-JBCX2J"
        task_revision: 6
      -
        command_digest: "sha256:50a6589d784e0641b92e0ee013055da2c6534dd0e7f50871a24ab21e03689bd0"
        id: "kernel_work_item_execution_required:sha256:7329e8ccb3f3bcf9e32de0a45d7a230069f30350fa25cec8124d57d32b9ed322:sha256:04ecc3debb071db7e1c300b25438add7bb678712cacc66713cf3fb1197d5934a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7329e8ccb3f3bcf9e32de0a45d7a230069f30350fa25cec8124d57d32b9ed322:sha256:04ecc3debb071db7e1c300b25438add7bb678712cacc66713cf3fb1197d5934a"
        occurred_at: "2026-10-08T17:27:27.175Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610081722-JBCX2J"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow bounded full regression to complete on constrained release hosts

Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.

## Scope

- In scope: Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.
- Out of scope: unrelated refactors not required for "Allow bounded full regression to complete on constrained release hosts".

## Plan

1. Execute approved WorkItem bounded-full-regression-timeout.

## Verify Steps

PLANNER fallback scaffold for "Allow bounded full regression to complete on constrained release hosts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow bounded full regression to complete on constrained release hosts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
