---
id: "202610080929-405MZ2"
title: "Retry task-local stable snapshot drift during competing controller reads"
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
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-10-08T09:33:56.269Z"
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
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
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
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
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
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
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
      digest: "sha256:fe9c5d09af3711ff86ffcd86da40ed34666b7fa69d6d22d5edc6399444f33b0c"
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
doc_updated_at: "2026-10-08T09:29:36.707Z"
doc_updated_by: "CODER"
description: "Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates."
sections:
  Summary: |-
    Retry task-local stable snapshot drift during competing controller reads

    Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.
  Scope: |-
    - In scope: Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.
    - Out of scope: unrelated refactors not required for "Retry task-local stable snapshot drift during competing controller reads".
  Plan: "1. Execute approved WorkItem retry-task-snapshot-drift."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
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
            digest: "sha256:915fd0af35973299188df6ab85b7cd988c643bd1174c9b13a84592eceb3db07c"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:dabdb449a96ed5560d57197a6884f968c672a25da11851380d29830d40b9832f"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:ea8f71fa019c7273143df455360739a69732e8116acd14654210d827b5a1336c"
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
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
            task_id: "202610080929-405MZ2"
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
            digest: "sha256:1587112470c2a7eb0e8ea42db5b58dcd972b3565d95eac7ca7921489d0e654c0"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:dabdb449a96ed5560d57197a6884f968c672a25da11851380d29830d40b9832f"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:ea8f71fa019c7273143df455360739a69732e8116acd14654210d827b5a1336c"
              kind: "USER"
              parent_authority_digest: "sha256:915fd0af35973299188df6ab85b7cd988c643bd1174c9b13a84592eceb3db07c"
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
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610080929-405MZ2"
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
            evidence_digest: "sha256:02993279b680c0fc2b39ddfe031b62086cd412497266d60e99a9b07c19c0df8f"
            kind: "authority_delta"
            previous_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_evidence_digest: "sha256:700d6bf89b2ca1069a5ea545a034e80c980eac8e1d2d1d8fb019b65ccd0be037"
            request_digest: "sha256:3eeb70fc7bf0a3c7c5fc1711d0c0aaa34f541a12c6312408f72332ae56eb793e"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:ea8f71fa019c7273143df455360739a69732e8116acd14654210d827b5a1336c"
        digest: "sha256:dabdb449a96ed5560d57197a6884f968c672a25da11851380d29830d40b9832f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cd2558c327942092de50ed39123fcbbad2b72fde641bfb99a1f5a0a1d15a8514"
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
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
            expected_outputs:
              - "task-snapshot-drift-retry-evidence"
            id: "retry-task-snapshot-drift"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610080929-405MZ2"
      intent_digest: "sha256:d33c1fcb82359c6d71fc9ea30f2cd2128e156300ad48431ce9d7f86bfe1353fd"
      migration_receipts: []
      mutation_receipts:
        capture:202610080929-405MZ2:
          after_revision: 1
          aggregate_digest: "sha256:189b2dc92ecbdf2f0fe665e89a77e1d73e9cb34d82c7b7f5232434f90f8d9f42"
          before_revision: 0
          command_digest: "sha256:c7f2208c6f6db6d4fab59a7e2f55875854cd508c3d253dd9a17b79126ed22692"
          effect_ids: []
          event_digests:
            - "sha256:4b1a46ce4d75308fb44a46ab273c49d819a09cf3a89202d8ce45054ad80976ca"
          mutation_id: "capture:202610080929-405MZ2"
        kernel_work_item_claim_required:sha256:74888f663a0af7e576263325c4a146ef5a33a8cc90af241684393fd51d62dadf:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 5
          aggregate_digest: "sha256:4627ab969336f4901b0beb62e3a04ebb8b3c9d8e552fee22395aa2ff00a4e3bb"
          before_revision: 4
          command_digest: "sha256:bf86aae270b621e5bfad7afe91c10dc72af0dc6a65e84263b94a48c7fa730232"
          effect_ids: []
          event_digests:
            - "sha256:1306c3b7d2366e3c089c931ad7eb7d643a59e109a0b1b1fdd745a9bb005077ca"
          mutation_id: "kernel_work_item_claim_required:sha256:74888f663a0af7e576263325c4a146ef5a33a8cc90af241684393fd51d62dadf:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        kernel_work_item_execution_required:sha256:406b63dd2fea08a55875e2b705dfa9f8c3767921834e86955e581b854d9a41db:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:
          after_revision: 7
          aggregate_digest: "sha256:949f0edb809d110940dcb56e528762df2fbf827fb8bf5994a68098d5ecb4f650"
          before_revision: 6
          command_digest: "sha256:5f00b673f5e6284712ca3c906c97b3be34d0c1ac33bbc732489837e6399ddbc9"
          effect_ids: []
          event_digests:
            - "sha256:9607a2915e5562584d3c1dde654f15cbd2811af18aeb18246d8522c276862a37"
          mutation_id: "kernel_work_item_execution_required:sha256:406b63dd2fea08a55875e2b705dfa9f8c3767921834e86955e581b854d9a41db:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        kernel_work_item_materialization_required:sha256:3dab2f4f8962612f1db100cf85d969705b2a66ad3528837e704cdea856c4303b:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 4
          aggregate_digest: "sha256:046307e5b2f3901471fe3a8e56aaea4f118f544d4b8f4757938233eb6a0161f6"
          before_revision: 3
          command_digest: "sha256:858e74a14406e36748dcfc57d4d4d3a1c7650bb4540ff5d95a319bb548a0e9cc"
          effect_ids: []
          event_digests:
            - "sha256:562553e2a32207603ccc2a4d44826235c2f9b2a3fd8b209fd3e891edca149ab4"
          mutation_id: "kernel_work_item_materialization_required:sha256:3dab2f4f8962612f1db100cf85d969705b2a66ad3528837e704cdea856c4303b:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        result:sha256:c9adb7c79ac4b130737a139f2047f5c5f78588f89223ad89f96fb39485320733:
          after_revision: 2
          aggregate_digest: "sha256:95c5780e7f217af91949b5230d4704eba1f49d0143e90cf3918813399aa9d90c"
          before_revision: 1
          command_digest: "sha256:b3be5223c504e1497800be3711d2b40199ec3a3f897bc9c1e40fd203058aa84b"
          effect_ids: []
          event_digests:
            - "sha256:f0df7158d2a818487d746eb2a4188ab9c5b35234c8e778d1c0cbafcf37240fe1"
          mutation_id: "result:sha256:c9adb7c79ac4b130737a139f2047f5c5f78588f89223ad89f96fb39485320733"
        sha256:1d0ea1d5a4755aee08699cd8892c6d579cfe1b348cf81a6feca31da99f234d2a:
          after_revision: 3
          aggregate_digest: "sha256:17084055ba2ade7bf1ab0456adf4699cd97b4e8f9fc56879633e44b2ab7af3c8"
          before_revision: 2
          command_digest: "sha256:b6d5633b0de19649986e3a654239c314ef8c0cd46802a520dde3b0e7e76bc072"
          effect_ids: []
          event_digests:
            - "sha256:2e3289e3fd107b91017c2a7677d1abfd3c72f28040b5d8b46111e1e38890f317"
          mutation_id: "sha256:1d0ea1d5a4755aee08699cd8892c6d579cfe1b348cf81a6feca31da99f234d2a"
        sha256:8ad33c71b83bca13da7e4a01b555ff8bf8c9e7c8db9da0930025000e6abc6795:
          after_revision: 6
          aggregate_digest: "sha256:a68bebe4f0e0747c43d64f1cbab02ec07ffe2603985386647781ed5134ec097f"
          before_revision: 5
          command_digest: "sha256:027193291cc935618fa6e248fd3d2497d0c6a98dd7e6edaf2c8d2e2757182833"
          effect_ids: []
          event_digests:
            - "sha256:08d46ce5c14ad88b49ca2cbf76cb426c3b8bb1991d5f9d773bfbddfc54c6d9c9"
          mutation_id: "sha256:8ad33c71b83bca13da7e4a01b555ff8bf8c9e7c8db9da0930025000e6abc6795"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        retry-task-snapshot-drift:
          attempt: 1
          claim_id: "sha256:e38800ca10f9e71f12043565b79ba4f76b20d0391a8138e5f896e723237460cd"
          definition:
            contract_digest: "sha256:cd2558c327942092de50ed39123fcbbad2b72fde641bfb99a1f5a0a1d15a8514"
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
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
            expected_outputs:
              - "task-snapshot-drift-retry-evidence"
            id: "retry-task-snapshot-drift"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:43616021f99a9f8bf85cbbf54ee69f4d790c39c9911b194bd68d5b63f4b098c1"
    documents:
      contracts:
        sha256:cd2558c327942092de50ed39123fcbbad2b72fde641bfb99a1f5a0a1d15a8514:
          acceptance_criteria:
            - "Change only kernel-backend-adapter.ts and kernel-backend-adapter.test.ts. Extend the existing retry classifier to exact task-specific stable-read snapshot-drift errors, including before-read and during-read observations. Preserve the existing atomic replacement case, three-retry ceiling and 10/20/30 ms delays."
            - "Each retry must perform a fresh complete backend.getTask read. Preserve containment, no-follow, regular-file, size, parsing and snapshot validation. Do not return stale bytes, broaden arbitrary Error/ELOOP handling, swallow exhausted retries, or alter mutation/replay/CAS ownership."
            - "Add deterministic tests for before-read and during-read drift followed by success, exact retry exhaustion, and immediate propagation of symlink, nonregular, oversize, parsing and foreign-task errors. Assert attempt counts and retained error behavior. Keep the actual competing local/cloud controller test unchanged and require exactly one dispatch/event."
            - "Run all four focused commands and retain source hashes and actual logs, including failures. Preserve PR6065 run37754884982 failure at ff669b6d09067e87e98a9cfa5fad6459c281d874 and prior passing evidence. Independent review and native final full CI (bun run ci:local:full) remain mandatory; focused checks do not replace full CI or hosted acceptance."
            - "Stop and report if the two-file boundary is insufficient. Do not modify stable-file security, CI selection, registry rules, lifecycle metadata, or production release behavior."
          objective: "Handle exact task-local stable-snapshot drift through the existing bounded KernelBackendAdapter read retry."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
            - "node node_modules/prettier/bin/prettier.cjs --check packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
            - "git diff --check"
      intent:
        context: "Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates."
        objective: "Retry task-local stable snapshot drift during competing controller reads"
    events:
      -
        command_digest: "sha256:c7f2208c6f6db6d4fab59a7e2f55875854cd508c3d253dd9a17b79126ed22692"
        id: "capture:202610080929-405MZ2:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610080929-405MZ2"
        occurred_at: "2026-10-08T09:29:36.571Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610080929-405MZ2"
        task_revision: 1
      -
        command_digest: "sha256:b3be5223c504e1497800be3711d2b40199ec3a3f897bc9c1e40fd203058aa84b"
        id: "result:sha256:c9adb7c79ac4b130737a139f2047f5c5f78588f89223ad89f96fb39485320733:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:c9adb7c79ac4b130737a139f2047f5c5f78588f89223ad89f96fb39485320733"
        occurred_at: "2026-10-08T09:33:02.479Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610080929-405MZ2"
        task_revision: 2
      -
        command_digest: "sha256:b6d5633b0de19649986e3a654239c314ef8c0cd46802a520dde3b0e7e76bc072"
        id: "sha256:1d0ea1d5a4755aee08699cd8892c6d579cfe1b348cf81a6feca31da99f234d2a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1d0ea1d5a4755aee08699cd8892c6d579cfe1b348cf81a6feca31da99f234d2a"
        occurred_at: "2026-10-08T09:33:52.676Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610080929-405MZ2"
        task_revision: 3
      -
        command_digest: "sha256:858e74a14406e36748dcfc57d4d4d3a1c7650bb4540ff5d95a319bb548a0e9cc"
        id: "kernel_work_item_materialization_required:sha256:3dab2f4f8962612f1db100cf85d969705b2a66ad3528837e704cdea856c4303b:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:3dab2f4f8962612f1db100cf85d969705b2a66ad3528837e704cdea856c4303b:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T09:34:12.765Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610080929-405MZ2"
        task_revision: 4
      -
        command_digest: "sha256:bf86aae270b621e5bfad7afe91c10dc72af0dc6a65e84263b94a48c7fa730232"
        id: "kernel_work_item_claim_required:sha256:74888f663a0af7e576263325c4a146ef5a33a8cc90af241684393fd51d62dadf:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:74888f663a0af7e576263325c4a146ef5a33a8cc90af241684393fd51d62dadf:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T09:34:25.852Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610080929-405MZ2"
        task_revision: 5
      -
        command_digest: "sha256:027193291cc935618fa6e248fd3d2497d0c6a98dd7e6edaf2c8d2e2757182833"
        id: "sha256:8ad33c71b83bca13da7e4a01b555ff8bf8c9e7c8db9da0930025000e6abc6795:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8ad33c71b83bca13da7e4a01b555ff8bf8c9e7c8db9da0930025000e6abc6795"
        occurred_at: "2026-10-08T09:36:04.467Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610080929-405MZ2"
        task_revision: 6
      -
        command_digest: "sha256:5f00b673f5e6284712ca3c906c97b3be34d0c1ac33bbc732489837e6399ddbc9"
        id: "kernel_work_item_execution_required:sha256:406b63dd2fea08a55875e2b705dfa9f8c3767921834e86955e581b854d9a41db:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:406b63dd2fea08a55875e2b705dfa9f8c3767921834e86955e581b854d9a41db:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        occurred_at: "2026-10-08T09:37:02.096Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610080929-405MZ2"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Retry task-local stable snapshot drift during competing controller reads

Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.

## Scope

- In scope: Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.
- Out of scope: unrelated refactors not required for "Retry task-local stable snapshot drift during competing controller reads".

## Plan

1. Execute approved WorkItem retry-task-snapshot-drift.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
