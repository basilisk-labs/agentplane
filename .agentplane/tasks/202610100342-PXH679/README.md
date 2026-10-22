---
id: "202610100342-PXH679"
title: "Distinguish provider transport outages from authentication failures for issue 6088"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 25
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T08:12:57.669Z"
  updated_by: "agentplane:kernel-controller"
  note: "Explicit operator recovery authorized by the user: select pinned retained evidence for reviewed fast-forward base import. Preserve the approved plan, scope, checks, and prior failed validation. This is not historical WorkOrder issuance attestation."
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
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
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
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
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
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
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
      digest: "sha256:66faba53c087f84278f0f780e42ce059d7b7961451e80643ba40fb054eefdc03"
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
doc_updated_at: "2026-10-10T03:43:07.836Z"
doc_updated_by: "CODER"
description: "Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication."
sections:
  Summary: |-
    Distinguish provider transport outages from authentication failures for issue 6088

    Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.
  Scope: |-
    - In scope: Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.
    - Out of scope: unrelated refactors not required for "Distinguish provider transport outages from authentication failures for issue 6088".
  Plan: "1. Execute approved WorkItem provider-transport-classification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Distinguish provider transport outages from authentication failures for issue 6088". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Distinguish provider transport outages from authentication failures for issue 6088". Expected: the visible result matches ## Summary and stays inside approved scope.
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
            digest: "sha256:711ff2b05ef261d99f833566e5a3a3d0bfb9c12fe902afa12f04f10b0c5f4afd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
            task_id: "202610100342-PXH679"
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
            digest: "sha256:679ec9cdfe1f4a31f4d7ddf60c8a215060cf12aef9cf06f6191791fa0049f55a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "USER"
              parent_authority_digest: "sha256:711ff2b05ef261d99f833566e5a3a3d0bfb9c12fe902afa12f04f10b0c5f4afd"
            repository_effects:
              - "documentation"
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
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610100342-PXH679"
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
            evidence_digest: "sha256:f459eecf36fb67ccc111f9d6f68d4b5fb1eb82e7d71571733a293e10df581632"
            kind: "authority_delta"
            previous_fingerprint: "sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
            repository_evidence_digest: "sha256:25e91c4f317942f2faabbe00973d2a49fee6f108f206c1b95886cbf756501263"
            request_digest: "sha256:90e5012091d4b0b5e28f164444da900b77f8916a511a15c7c258a11b7c15d943"
            request_task_revision: 5
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:42ae095f0bdf66474866be1f5edf2993db9b3607a5f22a1a21073eea34f111f1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:679ec9cdfe1f4a31f4d7ddf60c8a215060cf12aef9cf06f6191791fa0049f55a"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
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
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610100342-PXH679"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
            evidence_digest: "sha256:bab0081cf477ec1748ddd28d578d96e90ea80f7b86689fe60d56aa467219dbfb"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:34f75d192ab73bfe6da114a70d8c8678bf8d75e018c5deea09602a4dc5abac92"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "USER"
              parent_authority_digest: "sha256:42ae095f0bdf66474866be1f5edf2993db9b3607a5f22a1a21073eea34f111f1"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:55333921901fe2cb1471da1a6fb5b7eed6b2246e957169f710b3f750cd8dd922"
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
              - ".agentplane/tmp/PXH679/pr-body.md"
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
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610100342-PXH679"
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
              - "tests"
            added_scope_roots:
              - ".agentplane/tmp/PXH679/pr-body.md"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
            changed_paths:
              - ".agentplane/tmp/PXH679/pr-body.md"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
            evidence_digest: "sha256:96be476c472208c6c7e1dd555096985c6f6530c8b45742643a4a1e38c751bf71"
            kind: "authority_delta"
            previous_fingerprint: "sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
            repository_evidence_digest: "sha256:f1008368a5c8ee259ebf91f4b229b4be3103e2cfe7cd1b879e3451ffdf29a1ed"
            request_digest: "sha256:a39c68070d7b8d3a0a39c8e44608a2f20fb58978a70e81fed783463d0ef0af4b"
            request_task_revision: 14
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:70ab604d0a58d4370de5cbdb236d3830104a2fce58489602f79e099c1ab855b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "USER"
              parent_authority_digest: "sha256:34f75d192ab73bfe6da114a70d8c8678bf8d75e018c5deea09602a4dc5abac92"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372"
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
              - ".agentplane/tmp/PXH679/pr-body.md"
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
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610100342-PXH679"
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
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
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
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.ts"
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
              - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
              - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
              - "packages/agentplane/src/runner/result-manifest.ts"
              - "packages/agentplane/src/runner/run-record-profile.ts"
              - "packages/agentplane/src/runner/types/state.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
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
              - "packages/core/src/process/run-process.observation.test.ts"
              - "packages/core/src/process/run-process.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/runner/knowledge-ref.ts"
              - "packages/core/src/runner/runner-effect-operation.ts"
              - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
              - "packages/core/src/runner/supervisor-execution-episode.ts"
              - "packages/core/src/schemas/index.ts"
              - "packages/core/src/schemas/iso-timestamp.test.ts"
              - "packages/core/src/schemas/iso-timestamp.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
              - "packages/core/src/tasks/task-artifact-schema.shared.ts"
              - "packages/core/src/tasks/task-centric/model.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
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
              - "vitest.config.ts"
            evidence_digest: "sha256:caa94e08db5dd2b7d58b3a8e1594139029aa03fa7484b7434678fcc15776e7e0"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:55333921901fe2cb1471da1a6fb5b7eed6b2246e957169f710b3f750cd8dd922"
            repository_evidence_digest: "sha256:599f9b8e6a8ddf82e2ccd40a809e42516ef2d514a8818216cea95688b4ba92a0"
            request_digest: "sha256:a56324a10ffd4768211a669250f04b47f482d3ff8edb230396fc67465fd89815"
            request_task_revision: 15
            reviewed_base_import:
              canonical_record_digest: "sha256:579c5689b3651f7ca20ed6922909d510778a357569504ec9b25a9a464be4d3d6"
              checkpoint_digest: "sha256:55333921901fe2cb1471da1a6fb5b7eed6b2246e957169f710b3f750cd8dd922"
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
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
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
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/kernel-plan.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.ts"
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
                - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
                - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
                - "packages/agentplane/src/runner/result-manifest.ts"
                - "packages/agentplane/src/runner/run-record-profile.ts"
                - "packages/agentplane/src/runner/types/state.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
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
                - "packages/core/src/process/run-process.observation.test.ts"
                - "packages/core/src/process/run-process.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/core/src/runner/knowledge-ref.ts"
                - "packages/core/src/runner/runner-effect-operation.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/schemas/index.ts"
                - "packages/core/src/schemas/iso-timestamp.test.ts"
                - "packages/core/src/schemas/iso-timestamp.ts"
                - "packages/core/src/tasks/plan-execution-grant.ts"
                - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
                - "packages/core/src/tasks/task-artifact-schema.shared.ts"
                - "packages/core/src/tasks/task-centric/model.ts"
                - "packages/core/src/tasks/task-centric/schema.ts"
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
                - "vitest.config.ts"
              mutation_receipt_digest: "sha256:07d16db9a1298ac2f8d924bb6ad2a430e3b54d7abc07a15c462f02fbdf72efd2"
              new_commit: "d0836ee3fe99b92295631b0ac272e4c1bfd77ab2"
              old_commit: "805ecab9c77885cc84047682e1d8afa5fec9ea86"
              overlay_digest: "sha256:9a00725c50f63a01b73a449ebba70669b3efed7f95042f1f08ce271b3844852a"
              work_order_digest: "sha256:ddf24767d3c86c587650daa0e84bd88d0e5c10e9b630231c7bf8b2034824d8a0"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0741868d5cc497d5570f55d63d2ef2b14c43cc18c30fa21793c6ccbab26b2e94"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:70ab604d0a58d4370de5cbdb236d3830104a2fce58489602f79e099c1ab855b9"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df"
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
              - ".agentplane/tmp/PXH679/pr-body.md"
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
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
              - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610100342-PXH679"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".agentplane/tmp/PXH679/pr-body.md"
            evidence_digest: "sha256:8cfc62a289eb72fd393eb203c9a1aba16782d57cc968052c33ca8605dccfaaec"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:2e09fe0f24271fa9af8fe2b60174fc74d99a18979ca358b54455b40e7f46f74d"
        digest: "sha256:af4a7aac0f8cc59bf5b06292bea413d4fec8c5096e7f551108513aebc4a68cdf"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:26d530884899f7b00e81e2d0fa35ff8adf69328059545bf68be7cb01e0310d80"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
                - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
            expected_outputs:
              - "provider-classification-report"
            id: "provider-transport-classification"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:2707c7140538e1d590186318244d261f16db425ef1ba5e885a1a81e2bae4085c"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:aeaf929ad08a1ff204f5b63d4d8d3f7cc8a0d3eb2aa6082a4d1cf51c55dcaec5"
          environment_digest: "sha256:7ed5341db563ccbe9f486d726f460b0f7b6907d235c2e1b290b67cf9d0218930"
          implementation_identity: "sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df"
          toolchain_digest: "sha256:98ffb7c80c108df14b2100f17cd47c3b126f38f6652b736b2d8f31e672f79f62"
        observed_at: "2026-10-10T09:08:44.498Z"
        status: "PASSED"
      id: "202610100342-PXH679"
      intent_digest: "sha256:450baa641792d96296d0f3d580f26d18226b8df8003819b0e249e23d2b781ae2"
      migration_receipts: []
      mutation_receipts:
        capture:202610100342-PXH679:
          after_revision: 1
          aggregate_digest: "sha256:180e1e2d64f6d75dc9c61afcb34cca730d5a7c5053a1ee75a565b3b223809eff"
          before_revision: 0
          command_digest: "sha256:9416a845f5b8b5a737a55ae9242a65eafe88fe7717ceb089e14c79a4eb7c8650"
          effect_ids: []
          event_digests:
            - "sha256:80d480020204cd4a7b48915069325cf3e36a97696b74767e8da8271e9a7641d7"
          mutation_id: "capture:202610100342-PXH679"
        final-validation:sha256:2707c7140538e1d590186318244d261f16db425ef1ba5e885a1a81e2bae4085c:21:
          after_revision: 22
          aggregate_digest: "sha256:b86e9b7c84256a11488fb006d42386cc7f904537f45f939d21b5554e43330611"
          before_revision: 21
          command_digest: "sha256:fd51eefb72219d0cc57106d14dfb054bcb2791bfae8cca591d4c6376fc218613"
          effect_ids: []
          event_digests:
            - "sha256:a069a836a13c1bce385c8a6b74859bdbc8cc1af95f470e03b2746a5a845ebf44"
          mutation_id: "final-validation:sha256:2707c7140538e1d590186318244d261f16db425ef1ba5e885a1a81e2bae4085c:21"
        kernel_task_completion_required:sha256:d2c4fef78092b7e417d4b2ebd88b1102942726bbd498ab7d82de20a850092101:sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df:
          after_revision: 23
          aggregate_digest: "sha256:1255aef6bca2d0bf4e7d8d1c6f557244b7caf5e50555b77ffa598e8d9b0fad1e"
          before_revision: 22
          command_digest: "sha256:b7e7096060c6d58f9f4d537890ac6df0cc4c6bdbc27627317e4d9619c659e748"
          effect_ids: []
          event_digests:
            - "sha256:2c94c34fec6f37dcf9fe7384a55429eeb75b21e15a6f61e88f87ddc2be4c8ab7"
          mutation_id: "kernel_task_completion_required:sha256:d2c4fef78092b7e417d4b2ebd88b1102942726bbd498ab7d82de20a850092101:sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df"
        kernel_work_item_claim_required:sha256:f0887f849611dca606c37687c799af0f2d943b1a074120a692e5a43ad4267509:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3:
          after_revision: 5
          aggregate_digest: "sha256:73fce4ba53454c4de65a28935137be65918453c6b338cff3dbae69a29b79c81b"
          before_revision: 4
          command_digest: "sha256:780eaff64f9954b2108e995630c607f63005344e4da6f5242c5e88cecea4940e"
          effect_ids: []
          event_digests:
            - "sha256:0541477b1cde1ea2ec43086b7421c8671cb99f230c7cde49341a55b68b5b8b71"
          mutation_id: "kernel_work_item_claim_required:sha256:f0887f849611dca606c37687c799af0f2d943b1a074120a692e5a43ad4267509:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
        kernel_work_item_execution_required:sha256:0f57463b44db8c8aee87fd543ed5daa51a61dcc1d506d8a3cbe46d57f220347d:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:fc8b13830afb7c212a9f53855109965a716a926fcd74da71c315c79baa1c2e3d"
          before_revision: 6
          command_digest: "sha256:9d4048b65189bc83f9002574d28fdc921446f8e09bc3bc2a25bc448780a2c9a8"
          effect_ids: []
          event_digests:
            - "sha256:ade72eb4072dbefda783cb01fa20bfde11a584729547dc505269d97d94ab2f6a"
          mutation_id: "kernel_work_item_execution_required:sha256:0f57463b44db8c8aee87fd543ed5daa51a61dcc1d506d8a3cbe46d57f220347d:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_execution_required:sha256:ddea1f4fd825c7090fc2803eecb697d1d82b6438541412c168e09234021c42df:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:
          after_revision: 14
          aggregate_digest: "sha256:5e4dd8f1407345749be4ab6e6e7c1e2d2fc47014d7d2fcdaef1771262cc8b0b7"
          before_revision: 13
          command_digest: "sha256:a1d29ebcbd520c39dcb1c2cd8b75745572c7769c66652eb0f3dd44a496b77689"
          effect_ids: []
          event_digests:
            - "sha256:05609cd78fd79d458df5d80fd941ca7891e6ab458bd64144c44789b2d3e813d9"
          mutation_id: "kernel_work_item_execution_required:sha256:ddea1f4fd825c7090fc2803eecb697d1d82b6438541412c168e09234021c42df:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        kernel_work_item_inspection_required:sha256:1392455067b8d8012af6c9bf90feec17bbd8495026302c97a5b68e52605f3f5c:sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372:
          after_revision: 18
          aggregate_digest: "sha256:00ab54ef8ca213bb4fc1e499da26adad4535b4bea3bd8711c14e73d6a3272e64"
          before_revision: 17
          command_digest: "sha256:9f0f4210e4619808c7a57cfb415ffe1d7df66dc763dbc2c8c8b0a14b8f688a72"
          effect_ids: []
          event_digests:
            - "sha256:863ce1e87c15c1348eeff23561847021ee1887b85c8ff8bcc11aa8783b5f9e44"
          mutation_id: "kernel_work_item_inspection_required:sha256:1392455067b8d8012af6c9bf90feec17bbd8495026302c97a5b68e52605f3f5c:sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372"
        kernel_work_item_inspection_required:sha256:d653890f2da7e140d5e5d1859fed1c954d8dc09fd2647892ccb266d9ddc9c40e:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:
          after_revision: 10
          aggregate_digest: "sha256:ebec664b324f5e3d7e3cbfe8005d0b562a435aee953de5a8a12416ec6cf2a024"
          before_revision: 9
          command_digest: "sha256:2101308f647b15877024cdfadba550a639e4cf4eabe4adaaf20457e05729b4dd"
          effect_ids: []
          event_digests:
            - "sha256:f7806db8de0e5b085f51b12a4a9ad53c3bf7b36e4c67624e0e20f3ebcd50d6b0"
          mutation_id: "kernel_work_item_inspection_required:sha256:d653890f2da7e140d5e5d1859fed1c954d8dc09fd2647892ccb266d9ddc9c40e:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        kernel_work_item_materialization_required:sha256:a3fc261f003cbea0e3c8454948310233e303494e0a51bb11c2f442c1f173de4e:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3:
          after_revision: 4
          aggregate_digest: "sha256:72c80df5ed52cca6e300a7c44da18268f266c9b8f776584f42e9e16b670c1f04"
          before_revision: 3
          command_digest: "sha256:76d5542ce9f93d63239d9a44eb8d33b0345ae1437aaf12ff8eb9da07cbc388a9"
          effect_ids: []
          event_digests:
            - "sha256:69b96c7ceb13d8dae35fd5263d63c226f671884ba8f12e58d945167cfcfa59d4"
          mutation_id: "kernel_work_item_materialization_required:sha256:a3fc261f003cbea0e3c8454948310233e303494e0a51bb11c2f442c1f173de4e:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
        kernel_work_item_rework_claim_required:sha256:612af09b20dd3dd5220cf202080091b7f31505ff73ecbdb9036fbbf5f7ab8314:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:
          after_revision: 13
          aggregate_digest: "sha256:72c3ad9aa1c57d967a7900bd1a77f781ab1a5991b60f7d68dee5e9be429842d3"
          before_revision: 12
          command_digest: "sha256:c74819b4f8af160a32ccd47f0116bc85638e7df8665a46d4bb33f0fef05fc7bf"
          effect_ids: []
          event_digests:
            - "sha256:7915e2a0292fbf63e6dcb8616d44d7a183e72f1279f6bfa9372445232e72c216"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:612af09b20dd3dd5220cf202080091b7f31505ff73ecbdb9036fbbf5f7ab8314:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        result:sha256:2a4b47bab5a6aed091bd67df4b6bb8d6bb86b2522515e0906d2747a86816f4f2:
          after_revision: 17
          aggregate_digest: "sha256:6c6508219685b4dd5a2f21931d5fc03329b8b4490f37267d49503324668f338e"
          before_revision: 16
          command_digest: "sha256:73f98bcd86fbdfb597aadfb45cab5323bd5c34e09c4b020c73b1f7498e2c50b5"
          effect_ids: []
          event_digests:
            - "sha256:249558a47209e23014ef1b00b543dd5afa0d9fcd196cad53ccec5e37f2feb054"
          mutation_id: "result:sha256:2a4b47bab5a6aed091bd67df4b6bb8d6bb86b2522515e0906d2747a86816f4f2"
        result:sha256:a6944858332d33fc191c9c9b80e097b6a5342509c3384cbbd50a4d4a9e3742df:
          after_revision: 2
          aggregate_digest: "sha256:70c993781a4c67328605e7265809be85a54bed13b83e3e79f3efd7fcfeefa34a"
          before_revision: 1
          command_digest: "sha256:4f1d1baa37c0bc79d9ced0f58a7200a7ca4767492cc2a3ebce71e736b8a0cb0c"
          effect_ids: []
          event_digests:
            - "sha256:d9483b4dfa7c93733bbd380e4a023ba7ced108eb753e88bf618736bf59303795"
          mutation_id: "result:sha256:a6944858332d33fc191c9c9b80e097b6a5342509c3384cbbd50a4d4a9e3742df"
        result:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f:
          after_revision: 9
          aggregate_digest: "sha256:53c01cad1a1a798cb02032f9de27cacb48806b9a26a26263836f408ca7b95738"
          before_revision: 8
          command_digest: "sha256:41d7413c3b376b5a4d8d90c747c7e7002e061230823cdfd5e6bffc80b810f3b1"
          effect_ids: []
          event_digests:
            - "sha256:d8631d1de9f7058cf6d7a072a9c6b63342cb0bd1128b28e35588e0dfdd426653"
          mutation_id: "result:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f"
        sha256:01d89d3262070e5656bb286ff680fffd05457c9c356f40ce39ac65ed5cd54b30:
          after_revision: 3
          aggregate_digest: "sha256:152e9d5dc070a6fc861fa7254b6ddaa4217f7d43c4964816da69ef14e60cb65d"
          before_revision: 2
          command_digest: "sha256:3f7a7fddb89ccbae290cfcaac052f0c497cd9095a9441215157ec7d9634111d7"
          effect_ids: []
          event_digests:
            - "sha256:48bf75fc6b462b041d7413766f47897ddfe5850448b43b139f2bf0c33a85b947"
          mutation_id: "sha256:01d89d3262070e5656bb286ff680fffd05457c9c356f40ce39ac65ed5cd54b30"
        sha256:2a8ab3b02b4938b1f0647778f91d6b9dc1d76e5911550ffbc0049ecb881633ec:
          after_revision: 15
          aggregate_digest: "sha256:df3a9171cf6b333d85f6efdb15fdba3e4aa373ca2a091150e95e1d8f029f701d"
          before_revision: 14
          command_digest: "sha256:e50dc413b0d22c1ddbe16be8956ec75d1f55cd90115fe880f44993aa93e20601"
          effect_ids: []
          event_digests:
            - "sha256:2c566b6cded93cb3273bff9d53422eafc3158c55379a6021e42fe70a0fcdcaad"
          mutation_id: "sha256:2a8ab3b02b4938b1f0647778f91d6b9dc1d76e5911550ffbc0049ecb881633ec"
        sha256:63247b648f5713ccdefc58529141b2768d73393ca0e4ff284e288cf27757744e:
          after_revision: 6
          aggregate_digest: "sha256:ed2b4912db5b096a0419e647fae610211e2c2bfa842df89a1636ff5b1d2b1e79"
          before_revision: 5
          command_digest: "sha256:a23bfaa79d1b3679525b6e0e971774477abec98f5bd26f9d05154ce5e9609264"
          effect_ids: []
          event_digests:
            - "sha256:a7a405ef92a2bbdd66fb9926d3c388add043cfd562d7a7fe21e61ec73f5be1b4"
          mutation_id: "sha256:63247b648f5713ccdefc58529141b2768d73393ca0e4ff284e288cf27757744e"
        sha256:904c378feb8f63598f2b591cf3653105eb5aba6944368195aa417fe5f5acd33e:
          after_revision: 8
          aggregate_digest: "sha256:9cec26c35043e9bd4c7ce165104865a3012c6d9a725b7e6e20179a9ca5ef5fa4"
          before_revision: 7
          command_digest: "sha256:7aaf5b2914f357068708c225af6a9d2e483771d169870559e833a155fa9a88bf"
          effect_ids: []
          event_digests:
            - "sha256:09b12e0fb479dcd58f1e0247425ffc27050fa2a3c9d703369c3368cfecdb52ec"
          mutation_id: "sha256:904c378feb8f63598f2b591cf3653105eb5aba6944368195aa417fe5f5acd33e"
        sha256:a57f7b2a0d3c4690f0e4b9f066674eadab7e043e171871d177feb1e9740af181:
          after_revision: 21
          aggregate_digest: "sha256:10b1afe38637836d1d432fd321756ebb04668ee6b007c10b46f3153a542e99aa"
          before_revision: 20
          command_digest: "sha256:6b4fb90d59fdd525423b21c6723d952153d0d607e56aafa0d47883841faa206d"
          effect_ids: []
          event_digests:
            - "sha256:be040e7ed9eeddd4dbf3303b7e71989c6da8ba27c5c1bcd18d35aa046e5c5aa7"
          mutation_id: "sha256:a57f7b2a0d3c4690f0e4b9f066674eadab7e043e171871d177feb1e9740af181"
        sha256:d126e5afdd9d99649bde9038fc80c8ff991c82539dbb1c5aece4347cea9bc905:
          after_revision: 16
          aggregate_digest: "sha256:8d5fad21be746e4755ee2f1e3c0071de1dc572cd3773f3203e9f3dc630155d02"
          before_revision: 15
          command_digest: "sha256:ec6b91c22fb92944bf49e07f480f53a2b0bbc57ee59f9613053a61361f935186"
          effect_ids: []
          event_digests:
            - "sha256:056e12132bc13e1b111ede4492300ffad48d60fa30f912b40eb2c143e69f007d"
          mutation_id: "sha256:d126e5afdd9d99649bde9038fc80c8ff991c82539dbb1c5aece4347cea9bc905"
        validation-resolution:sha256:d9dc04e2b053654c48b4e1f855074c1fa620440412a9de20380ec7025f0165cf:
          after_revision: 20
          aggregate_digest: "sha256:3c5350aefd980d3cb999af52b6ff8a6850eb4bfbac2a78831f905070fc4a6cdd"
          before_revision: 19
          command_digest: "sha256:e997d889aede465986fdb20f58353772b94d580ed58b6df80a300ae59d9e0562"
          effect_ids: []
          event_digests:
            - "sha256:875fc939c25f5e88ba1194d6b0c77e1c19f328acf57e6fbc8111f9a122893b24"
          mutation_id: "validation-resolution:sha256:d9dc04e2b053654c48b4e1f855074c1fa620440412a9de20380ec7025f0165cf"
        validation-resolution:sha256:ef778eb66ead255d2378934eabdae94b310338d4fa88b1380ffc26a241a968a5:
          after_revision: 12
          aggregate_digest: "sha256:76cdf6b4b1da06f614af0f2c3e9fd2b0cf89b09206ae34c6c810257b78862992"
          before_revision: 11
          command_digest: "sha256:0d32a55568bcbf63fcb36a7d6406f3a10061396417979a9da1dda6356d4de2f6"
          effect_ids: []
          event_digests:
            - "sha256:142d62cebd308f1d466f0b7aada23d451d454e1b3538525c8b8ba74cfc569d15"
          mutation_id: "validation-resolution:sha256:ef778eb66ead255d2378934eabdae94b310338d4fa88b1380ffc26a241a968a5"
        validation:sha256:2f2527edf275de2e6ce204397378b09174d8751a7e3669260a94e425cf4881c0:
          after_revision: 19
          aggregate_digest: "sha256:2e8eaae098ab1f47ba6564c1ee0914d3e0dbf1b0087c98a030a9db66640e6e01"
          before_revision: 18
          command_digest: "sha256:46f2b186b8623f5c4b5c2303651124c15cc1746533e5e17604dddc6fadad3c68"
          effect_ids: []
          event_digests:
            - "sha256:cc2597c386adbd29e2169662ce424b5f218c8fce939f686e91ff8465a9196104"
          mutation_id: "validation:sha256:2f2527edf275de2e6ce204397378b09174d8751a7e3669260a94e425cf4881c0"
        validation:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f:
          after_revision: 11
          aggregate_digest: "sha256:dfb9fd621d7f7bd30aa03f95cef33a3f8ba91c79ef160626b1a1fe7cf4daf66f"
          before_revision: 10
          command_digest: "sha256:3979a702f5422b5a72751baabe60023c665f92862610d7936dadd05b44b015a8"
          effect_ids: []
          event_digests:
            - "sha256:da89d48c5bc03d9b13b31248bc2e864e441f0d565fe4eef39b382e027a8c387d"
          mutation_id: "validation:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f"
      plan_history: []
      revision: 23
      schema_version: 1
      state: "COMPLETED"
      work_items:
        provider-transport-classification:
          attempt: 2
          claim_id: "sha256:5f59770edef29d45a7b06bc0b6cfe0d58a8c40ce65dd79bb2dd03bcea112d7fe"
          definition:
            contract_digest: "sha256:26d530884899f7b00e81e2d0fa35ff8adf69328059545bf68be7cb01e0310d80"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
                - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
            expected_outputs:
              - "provider-classification-report"
            id: "provider-transport-classification"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:9229031b8617ac3cbb8103d4fc86e22142af9bb14c208bc1eaecc4202d86f161"
              id: "provider-classification-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372"
              task_id: "202610100342-PXH679"
              work_item_id: "provider-transport-classification"
          result_digest: "sha256:54bb11aa11336c2eaa28ab6db2d23474e139cad647a70050d77a3bc277c84195"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9a8fcd893373b3905b54a12debe8ae7c1a4de216a71989a4467289439d305f4a"
              - "sha256:6c74a14257068391ba4c614c68830b90b19e78f58182ee64e208b0fa98605ce6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:aeaf929ad08a1ff204f5b63d4d8d3f7cc8a0d3eb2aa6082a4d1cf51c55dcaec5"
              environment_digest: "sha256:e9c4def31e56d1fd4dc2490e8b2e3c480d61fc985ad45da006658aa6df9a97d2"
              implementation_identity: "sha256:54bb11aa11336c2eaa28ab6db2d23474e139cad647a70050d77a3bc277c84195"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-10T08:43:44.471Z"
            status: "PASSED"
    digest: "sha256:cac86c411ae1b0b020dc707862e356d025524d3ab25ccdd0292a7b66967255f8"
    documents:
      contracts:
        sha256:26d530884899f7b00e81e2d0fa35ff8adf69328059545bf68be7cb01e0310d80:
          acceptance_criteria:
            - "Distinguish successful authentication, missing credentials, rejected credentials, transport failures, unavailable CLI and unknown failure."
            - "TCP, DNS and TLS uncertainty must fail closed even when the other provider succeeds; never select another provider merely because one is unreachable."
            - "Two successful matching CLI sessions remain ambiguous. Preserve recorded provider and known-host selection, identity drift rejection and all hosted checks."
            - "Report a sanitized bounded cause category and retry/readback guidance without raw command output, secrets or login advice for network uncertainty."
            - "Add mocked regressions for both transports, 401 and 403, missing sessions, unavailable CLI, unknown output, two valid sessions, mixed success and transport failure, and recorded identity bypass of probing."
            - "Keep mandatory final validation and independent review unchanged. Do not modify lifecycle, CI budgets, versions or manifests."
          objective: "Repair issue 6088 by retaining typed auth-status outcomes and conservative provider selection without changing credential access or integration authority."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
            - "bun run test:critical"
      intent:
        context: "Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication."
        objective: "Distinguish provider transport outages from authentication failures for issue 6088"
    events:
      -
        command_digest: "sha256:9416a845f5b8b5a737a55ae9242a65eafe88fe7717ceb089e14c79a4eb7c8650"
        id: "capture:202610100342-PXH679:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610100342-PXH679"
        occurred_at: "2026-10-10T03:43:07.651Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610100342-PXH679"
        task_revision: 1
      -
        command_digest: "sha256:4f1d1baa37c0bc79d9ced0f58a7200a7ca4767492cc2a3ebce71e736b8a0cb0c"
        id: "result:sha256:a6944858332d33fc191c9c9b80e097b6a5342509c3384cbbd50a4d4a9e3742df:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:a6944858332d33fc191c9c9b80e097b6a5342509c3384cbbd50a4d4a9e3742df"
        occurred_at: "2026-10-10T03:44:42.448Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610100342-PXH679"
        task_revision: 2
      -
        command_digest: "sha256:3f7a7fddb89ccbae290cfcaac052f0c497cd9095a9441215157ec7d9634111d7"
        id: "sha256:01d89d3262070e5656bb286ff680fffd05457c9c356f40ce39ac65ed5cd54b30:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:01d89d3262070e5656bb286ff680fffd05457c9c356f40ce39ac65ed5cd54b30"
        occurred_at: "2026-10-10T03:45:21.370Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610100342-PXH679"
        task_revision: 3
      -
        command_digest: "sha256:76d5542ce9f93d63239d9a44eb8d33b0345ae1437aaf12ff8eb9da07cbc388a9"
        id: "kernel_work_item_materialization_required:sha256:a3fc261f003cbea0e3c8454948310233e303494e0a51bb11c2f442c1f173de4e:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a3fc261f003cbea0e3c8454948310233e303494e0a51bb11c2f442c1f173de4e:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
        occurred_at: "2026-10-10T03:45:58.118Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610100342-PXH679"
        task_revision: 4
      -
        command_digest: "sha256:780eaff64f9954b2108e995630c607f63005344e4da6f5242c5e88cecea4940e"
        id: "kernel_work_item_claim_required:sha256:f0887f849611dca606c37687c799af0f2d943b1a074120a692e5a43ad4267509:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f0887f849611dca606c37687c799af0f2d943b1a074120a692e5a43ad4267509:sha256:325511d16df1dcc87da2e82d43b657d6e8641d5d1bf8b3ea4e36aacf1fefa9e3"
        occurred_at: "2026-10-10T03:47:00.237Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610100342-PXH679"
        task_revision: 5
      -
        command_digest: "sha256:a23bfaa79d1b3679525b6e0e971774477abec98f5bd26f9d05154ce5e9609264"
        id: "sha256:63247b648f5713ccdefc58529141b2768d73393ca0e4ff284e288cf27757744e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:63247b648f5713ccdefc58529141b2768d73393ca0e4ff284e288cf27757744e"
        occurred_at: "2026-10-10T03:54:04.431Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610100342-PXH679"
        task_revision: 6
      -
        command_digest: "sha256:9d4048b65189bc83f9002574d28fdc921446f8e09bc3bc2a25bc448780a2c9a8"
        id: "kernel_work_item_execution_required:sha256:0f57463b44db8c8aee87fd543ed5daa51a61dcc1d506d8a3cbe46d57f220347d:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0f57463b44db8c8aee87fd543ed5daa51a61dcc1d506d8a3cbe46d57f220347d:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-10T03:55:31.977Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610100342-PXH679"
        task_revision: 7
      -
        command_digest: "sha256:7aaf5b2914f357068708c225af6a9d2e483771d169870559e833a155fa9a88bf"
        id: "sha256:904c378feb8f63598f2b591cf3653105eb5aba6944368195aa417fe5f5acd33e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:904c378feb8f63598f2b591cf3653105eb5aba6944368195aa417fe5f5acd33e"
        occurred_at: "2026-10-10T04:21:36.060Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610100342-PXH679"
        task_revision: 8
      -
        command_digest: "sha256:41d7413c3b376b5a4d8d90c747c7e7002e061230823cdfd5e6bffc80b810f3b1"
        id: "result:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f"
        occurred_at: "2026-10-10T04:22:26.080Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610100342-PXH679"
        task_revision: 9
      -
        command_digest: "sha256:2101308f647b15877024cdfadba550a639e4cf4eabe4adaaf20457e05729b4dd"
        id: "kernel_work_item_inspection_required:sha256:d653890f2da7e140d5e5d1859fed1c954d8dc09fd2647892ccb266d9ddc9c40e:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:d653890f2da7e140d5e5d1859fed1c954d8dc09fd2647892ccb266d9ddc9c40e:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        occurred_at: "2026-10-10T04:23:15.148Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610100342-PXH679"
        task_revision: 10
      -
        command_digest: "sha256:3979a702f5422b5a72751baabe60023c665f92862610d7936dadd05b44b015a8"
        id: "validation:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e59cda9a0c7b9a24ccd1e0529c956f6f3bccafb9d2823bf2df37ed252651910f"
        occurred_at: "2026-10-10T04:33:00.283Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610100342-PXH679"
        task_revision: 11
      -
        command_digest: "sha256:0d32a55568bcbf63fcb36a7d6406f3a10061396417979a9da1dda6356d4de2f6"
        id: "validation-resolution:sha256:ef778eb66ead255d2378934eabdae94b310338d4fa88b1380ffc26a241a968a5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ef778eb66ead255d2378934eabdae94b310338d4fa88b1380ffc26a241a968a5"
        occurred_at: "2026-10-10T04:33:20.989Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610100342-PXH679"
        task_revision: 12
      -
        command_digest: "sha256:c74819b4f8af160a32ccd47f0116bc85638e7df8665a46d4bb33f0fef05fc7bf"
        id: "kernel_work_item_rework_claim_required:sha256:612af09b20dd3dd5220cf202080091b7f31505ff73ecbdb9036fbbf5f7ab8314:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:612af09b20dd3dd5220cf202080091b7f31505ff73ecbdb9036fbbf5f7ab8314:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        occurred_at: "2026-10-10T04:34:12.363Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610100342-PXH679"
        task_revision: 13
      -
        command_digest: "sha256:a1d29ebcbd520c39dcb1c2cd8b75745572c7769c66652eb0f3dd44a496b77689"
        id: "kernel_work_item_execution_required:sha256:ddea1f4fd825c7090fc2803eecb697d1d82b6438541412c168e09234021c42df:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ddea1f4fd825c7090fc2803eecb697d1d82b6438541412c168e09234021c42df:sha256:b5f9a51f3a165293335b3e042c158548a47ce0689c15666772dbe55a82521e5f"
        occurred_at: "2026-10-10T04:34:55.640Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610100342-PXH679"
        task_revision: 14
      -
        command_digest: "sha256:e50dc413b0d22c1ddbe16be8956ec75d1f55cd90115fe880f44993aa93e20601"
        id: "sha256:2a8ab3b02b4938b1f0647778f91d6b9dc1d76e5911550ffbc0049ecb881633ec:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2a8ab3b02b4938b1f0647778f91d6b9dc1d76e5911550ffbc0049ecb881633ec"
        occurred_at: "2026-10-10T07:35:31.474Z"
        payload_digest: "sha256:619ec633851f8a40ab55b455b62e7e53f4668b96ab14c44bb69aec6be8fff016"
        task_id: "202610100342-PXH679"
        task_revision: 15
      -
        command_digest: "sha256:ec6b91c22fb92944bf49e07f480f53a2b0bbc57ee59f9613053a61361f935186"
        id: "sha256:d126e5afdd9d99649bde9038fc80c8ff991c82539dbb1c5aece4347cea9bc905:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d126e5afdd9d99649bde9038fc80c8ff991c82539dbb1c5aece4347cea9bc905"
        occurred_at: "2026-10-10T08:12:38.715Z"
        payload_digest: "sha256:acb6f2178741f58cdb2cf04128f5898b65a819b7f026f1a33c59ffa10c5a59c6"
        task_id: "202610100342-PXH679"
        task_revision: 16
      -
        command_digest: "sha256:73f98bcd86fbdfb597aadfb45cab5323bd5c34e09c4b020c73b1f7498e2c50b5"
        id: "result:sha256:2a4b47bab5a6aed091bd67df4b6bb8d6bb86b2522515e0906d2747a86816f4f2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2a4b47bab5a6aed091bd67df4b6bb8d6bb86b2522515e0906d2747a86816f4f2"
        occurred_at: "2026-10-10T08:26:10.407Z"
        payload_digest: "sha256:eedbc286ef237c60234d64f29e534510c94489a4f483380ce9de473cbe942b51"
        task_id: "202610100342-PXH679"
        task_revision: 17
      -
        command_digest: "sha256:9f0f4210e4619808c7a57cfb415ffe1d7df66dc763dbc2c8c8b0a14b8f688a72"
        id: "kernel_work_item_inspection_required:sha256:1392455067b8d8012af6c9bf90feec17bbd8495026302c97a5b68e52605f3f5c:sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:1392455067b8d8012af6c9bf90feec17bbd8495026302c97a5b68e52605f3f5c:sha256:29b925b34a9bb788a3d34baeddc60b429b3501957d47d515648c33d2e3fa6372"
        occurred_at: "2026-10-10T08:26:18.301Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610100342-PXH679"
        task_revision: 18
      -
        command_digest: "sha256:46f2b186b8623f5c4b5c2303651124c15cc1746533e5e17604dddc6fadad3c68"
        id: "validation:sha256:2f2527edf275de2e6ce204397378b09174d8751a7e3669260a94e425cf4881c0:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2f2527edf275de2e6ce204397378b09174d8751a7e3669260a94e425cf4881c0"
        occurred_at: "2026-10-10T08:43:52.428Z"
        payload_digest: "sha256:85ac794df99668560599f8e5dd06f6e2c717b04a8d4a4dcb5e659b98b66a25a2"
        task_id: "202610100342-PXH679"
        task_revision: 19
      -
        command_digest: "sha256:e997d889aede465986fdb20f58353772b94d580ed58b6df80a300ae59d9e0562"
        id: "validation-resolution:sha256:d9dc04e2b053654c48b4e1f855074c1fa620440412a9de20380ec7025f0165cf:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d9dc04e2b053654c48b4e1f855074c1fa620440412a9de20380ec7025f0165cf"
        occurred_at: "2026-10-10T08:43:59.060Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610100342-PXH679"
        task_revision: 20
      -
        command_digest: "sha256:6b4fb90d59fdd525423b21c6723d952153d0d607e56aafa0d47883841faa206d"
        id: "sha256:a57f7b2a0d3c4690f0e4b9f066674eadab7e043e171871d177feb1e9740af181:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a57f7b2a0d3c4690f0e4b9f066674eadab7e043e171871d177feb1e9740af181"
        occurred_at: "2026-10-10T09:08:23.380Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202610100342-PXH679"
        task_revision: 21
      -
        command_digest: "sha256:fd51eefb72219d0cc57106d14dfb054bcb2791bfae8cca591d4c6376fc218613"
        id: "final-validation:sha256:2707c7140538e1d590186318244d261f16db425ef1ba5e885a1a81e2bae4085c:21:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:2707c7140538e1d590186318244d261f16db425ef1ba5e885a1a81e2bae4085c:21"
        occurred_at: "2026-10-10T09:12:14.472Z"
        payload_digest: "sha256:f82ecc27f2f29f93808e9211938b81654d8005c0fb55fb2a5fa1afabdf9cd00e"
        task_id: "202610100342-PXH679"
        task_revision: 22
      -
        command_digest: "sha256:b7e7096060c6d58f9f4d537890ac6df0cc4c6bdbc27627317e4d9619c659e748"
        id: "kernel_task_completion_required:sha256:d2c4fef78092b7e417d4b2ebd88b1102942726bbd498ab7d82de20a850092101:sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:d2c4fef78092b7e417d4b2ebd88b1102942726bbd498ab7d82de20a850092101:sha256:7dc30be0971c5f2a5713a544bff90aaac572321b631095e995b23759d0b8c2df"
        occurred_at: "2026-10-10T09:12:22.317Z"
        payload_digest: "sha256:7d18c3441e6ae02fda6d639e3219021dea5b8f8f03d7827b5cb8e6c9b3e88efc"
        task_id: "202610100342-PXH679"
        task_revision: 23
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Distinguish provider transport outages from authentication failures for issue 6088

Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.

## Scope

- In scope: Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.
- Out of scope: unrelated refactors not required for "Distinguish provider transport outages from authentication failures for issue 6088".

## Plan

1. Execute approved WorkItem provider-transport-classification.

## Verify Steps

PLANNER fallback scaffold for "Distinguish provider transport outages from authentication failures for issue 6088". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Distinguish provider transport outages from authentication failures for issue 6088". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
