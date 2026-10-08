---
id: "202610081254-Z21QM3"
title: "Preregister M05 live experiment and release decision protocol"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-08T12:57:46.601Z"
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
      - "documentation"
      - "repository_write"
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
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
          - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:41bfb33e6b2c92fb1d1d5f306cd26db3375dee8ac2ca471ac5aaba454ff611d7"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-08T12:55:03.582Z"
doc_updated_by: "DOCS"
description: "Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent."
sections:
  Summary: |-
    Preregister M05 live experiment and release decision protocol

    Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
  Scope: |-
    - In scope: Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
    - Out of scope: unrelated refactors not required for "Preregister M05 live experiment and release decision protocol".
  Plan: "1. Execute approved WorkItem write-m05-experiment-protocol."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preregister M05 live experiment and release decision protocol". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preregister M05 live experiment and release decision protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "3dbcbad442bbeaadd73e6e698180c8cbaad55b30"
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
            digest: "sha256:f026db53d42b381fb2f436726e152257270b38d115acbe1536865d69722ae467"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "tests"
            repository_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            task_id: "202610081254-Z21QM3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:6c37d7de3f5560afa3dd9061f0bad526117567bbb46e41675a943b8ea31722de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
              kind: "USER"
              parent_authority_digest: "sha256:f026db53d42b381fb2f436726e152257270b38d115acbe1536865d69722ae467"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
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
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610081254-Z21QM3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            evidence_digest: "sha256:ab903ace856c6f736b533c8e80d10c81884c57542c159ca94e3ed1e1312a1757"
            kind: "authority_delta"
            previous_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_evidence_digest: "sha256:700d6bf89b2ca1069a5ea545a034e80c980eac8e1d2d1d8fb019b65ccd0be037"
            request_digest: "sha256:c2029c31cdcd1c0367339774541c557a7e2f5f65edc646e4f88d08fefde1dcc5"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
        digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            expected_outputs:
              - "m05-study-protocol-evidence"
            id: "write-m05-experiment-protocol"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610081254-Z21QM3"
      intent_digest: "sha256:610315aa636c92e3250da56f43f3572fa68cf5d78b0a213bd1199f2163b723f4"
      migration_receipts: []
      mutation_receipts:
        capture:202610081254-Z21QM3:
          after_revision: 1
          aggregate_digest: "sha256:a9e8f4ffd22998858790cb664f167fa74f92b2a88a8598d751fae1b2ca228167"
          before_revision: 0
          command_digest: "sha256:52a60062c8e06615d66773797dbca62ca09ba0fd04c038672652e5bfe56d67c0"
          effect_ids: []
          event_digests:
            - "sha256:2af67c0b0d6867b52693b708c65a992a028033230c3904fcb94b80b37d8ecfb2"
          mutation_id: "capture:202610081254-Z21QM3"
        kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 5
          aggregate_digest: "sha256:097daca06445503f33e1c8cbe9489a7ad22aa72beab7130b44b95a9e4bed5c52"
          before_revision: 4
          command_digest: "sha256:c5b9e1d5f8bb160a06b5bd7eafeee4642f7878e899aa1bd434ba7644342a71c4"
          effect_ids: []
          event_digests:
            - "sha256:76f9ddebdb7bd195a340f23cc2ed0c40e87dd4e1286fb260cb474a2c9d374e7d"
          mutation_id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:
          after_revision: 7
          aggregate_digest: "sha256:b6b4f9d317e6dce18939aa81a4c68799b522ecd67721b888b799a936dd027672"
          before_revision: 6
          command_digest: "sha256:26f771b4f8e84923a478f72362303a5cebd3418fd9cb58b2da00f1d53a8fe37d"
          effect_ids: []
          event_digests:
            - "sha256:8db66cfc501549eb8d50c118950993123ee8536636847b87baf8346ad56ed459"
          mutation_id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 4
          aggregate_digest: "sha256:3022b8ef934f98fe0f862486f320d69ace7dbf498a9da09ba7d2c79a338db963"
          before_revision: 3
          command_digest: "sha256:479f236ccf155737c87fc79a78fb46b59bd49e92d86d03b88b3b60f3d368d0fa"
          effect_ids: []
          event_digests:
            - "sha256:82c1761138581dcdde8d431b5b1fc5f446dddbea913eb1a6d10be1355f7ef9b5"
          mutation_id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa:
          after_revision: 2
          aggregate_digest: "sha256:6d13f77b882e91abf908ee228f622c74d2bcf8767f186d32daca7d0280fbd121"
          before_revision: 1
          command_digest: "sha256:cde85b891340a7ab8e66232eee4c050a6455b9034334c331af440afc2667cfb6"
          effect_ids: []
          event_digests:
            - "sha256:fe77acb5948d4a049f408fb5dc7e36c746287846a7e75c4576d1eb943ef70ceb"
          mutation_id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa"
        sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8:
          after_revision: 6
          aggregate_digest: "sha256:6d7ea348484d30d5177f2a2c853011a9930fbb4484be6293deb5ac3378a0c7d8"
          before_revision: 5
          command_digest: "sha256:1e98a1719b47f9fd893aa51f9e4bdc466de6e051f7097f16786e1f67dbaaff4a"
          effect_ids: []
          event_digests:
            - "sha256:a2e6c970aa8a1b077f470d5f760570db35371d2375282a3a15d3850927da8445"
          mutation_id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8"
        sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4:
          after_revision: 3
          aggregate_digest: "sha256:65646629e59184cf71670907033938265332dd30aaea07b48d6cdd802eaecee7"
          before_revision: 2
          command_digest: "sha256:ffeeb4c75bffda3f30bac2cc8783df1119d4bf100c2457890547b5a71c46164f"
          effect_ids: []
          event_digests:
            - "sha256:c16c260435cf8553b0d6a089965c9b159da9cbf7e67e307c5f7b1e23e348cca7"
          mutation_id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        write-m05-experiment-protocol:
          attempt: 1
          claim_id: "sha256:e7416626364e046d459e84b8ec64d4fb252327af8834ecf8f3b475cf7064558f"
          definition:
            contract_digest: "sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            expected_outputs:
              - "m05-study-protocol-evidence"
            id: "write-m05-experiment-protocol"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:4b8221c0278f4d75df0a9b2fa4f4c5d51334989e7ba88621c5c224f4f9b1bcbf"
    documents:
      contracts:
        sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461:
          acceptance_criteria:
            - "Write only artifacts/bench/m05-live-0.7.13/experiment-protocol.md. Distinguish the proposed study protocol from a fully pinned and approved runnable campaign. Preserve historical evidence and mark unresolved prerequisites explicitly."
            - "Specify the same product, policy, objective, authority, model/effort and independent final oracle across no_recipe, instantiate and specialize arms. Count native selection, planning, execution, review, retries, failures and host work. Do not give the no-Recipe arm a free prewritten Plan or give specialization a known answer. Preserve ordinary native approvals and safety checks."
            - "Define a genuine coding corpus and independent behavioral oracle for five strata: direct bug fix, branch feature/change, recoverable check failure, no exact Recipe match and near match with unresolved binding/applicability. Specify measurable code outcomes, permitted paths, immutable hidden-oracle protection, recovery evidence and safe fallback/refusal outcomes. Negative controls must not silently change targets or be pooled as successful coding savings."
            - "Specify a pilot with at least five matched randomized repetitions per task and arm, randomized balanced order and frozen seeds/assignment ledger. Distinguish repetition count from the number of independent tasks. Preserve every assigned attempt, cancellation and failure; do not replace bad outcomes or stop favorably."
            - "Define an independent fixed confirmation sample to be registered after pilot analysis and before any confirmation observations. Separate pilot and confirmation identities and data. State the prospective sample-size/precision procedure, independent task-cluster requirement, corpus-selection constraints, retry and stopping limits, and all unresolved numeric decisions. Do not treat the minimum pilot repetitions as adequate proof or guarantee that confirmation will be conclusive."
            - "Define primary all-assigned observed cost divided by independently verified successes, success rates, setup-inclusive and steady-state costs, and separate intent-to-mutation, verified-result and closure latency. Include every role and billable failure; cached/reasoning subsets are not added twice. Report study-only oracle/setup costs transparently. Missing, partial or unattributable usage prevents an unsupported complete estimate; zero successes have no finite cost per success. Matched-success comparisons are secondary."
            - "Specify task-clustered paired uncertainty and workflow/transport/cache strata. Preregister multiplicity treatment for two treatment comparisons, quality-equivalence or noninferiority margins, safety hard failures, effect-size and uncertainty thresholds, setup amortization assumptions and the release decision matrix before confirmation. Label proposed thresholds requiring ratification; no unapproved numeric margin becomes an approval."
            - "Record the latest user requirement: establish savings before publication. Explain supported benefit, MIXED, adverse, insufficient and NOT_ESTABLISHED outcomes without promising savings. An inconclusive or failed study blocks publication under the current requirement; any changed release disposition requires a new explicit user decision. Prior acceptance of open M05 debt has been superseded, not erased."
            - "List exact pending product/source/build, corpus, Recipe closure, oracle, policy, runtime/sandbox/network, transport/cache/session, adapter, provider/model/effort, price basis, randomization and authority pins. State budget and secure credential decisions as unresolved. Stop before live calls until all concrete authority and qualification gates pass. Do not access credentials, design API implementation, invoke providers, publish or claim measured economics."
            - "Check the final document against the current charter and retained M05 limitations, run the declared diff and scoped formatting checks, and return the document hash with a concise coverage/remaining-gates report for independent evaluation."
          objective: "Write an English preregistration protocol for genuine M05 coding outcomes and an honest release decision, without implementing or launching an API experiment."
          role: "EXECUTOR"
          verification_commands:
            - "git diff --check"
            - "node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
      intent:
        context: "Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent."
        objective: "Preregister M05 live experiment and release decision protocol"
    events:
      -
        command_digest: "sha256:52a60062c8e06615d66773797dbca62ca09ba0fd04c038672652e5bfe56d67c0"
        id: "capture:202610081254-Z21QM3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610081254-Z21QM3"
        occurred_at: "2026-10-08T12:55:03.500Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610081254-Z21QM3"
        task_revision: 1
      -
        command_digest: "sha256:cde85b891340a7ab8e66232eee4c050a6455b9034334c331af440afc2667cfb6"
        id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa"
        occurred_at: "2026-10-08T12:57:18.032Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610081254-Z21QM3"
        task_revision: 2
      -
        command_digest: "sha256:ffeeb4c75bffda3f30bac2cc8783df1119d4bf100c2457890547b5a71c46164f"
        id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4"
        occurred_at: "2026-10-08T12:57:34.646Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610081254-Z21QM3"
        task_revision: 3
      -
        command_digest: "sha256:479f236ccf155737c87fc79a78fb46b59bd49e92d86d03b88b3b60f3d368d0fa"
        id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T12:57:53.161Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610081254-Z21QM3"
        task_revision: 4
      -
        command_digest: "sha256:c5b9e1d5f8bb160a06b5bd7eafeee4642f7878e899aa1bd434ba7644342a71c4"
        id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T12:58:19.271Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610081254-Z21QM3"
        task_revision: 5
      -
        command_digest: "sha256:1e98a1719b47f9fd893aa51f9e4bdc466de6e051f7097f16786e1f67dbaaff4a"
        id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8"
        occurred_at: "2026-10-08T12:59:57.207Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610081254-Z21QM3"
        task_revision: 6
      -
        command_digest: "sha256:26f771b4f8e84923a478f72362303a5cebd3418fd9cb58b2da00f1d53a8fe37d"
        id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        occurred_at: "2026-10-08T13:00:20.582Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610081254-Z21QM3"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preregister M05 live experiment and release decision protocol

Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.

## Scope

- In scope: Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
- Out of scope: unrelated refactors not required for "Preregister M05 live experiment and release decision protocol".

## Plan

1. Execute approved WorkItem write-m05-experiment-protocol.

## Verify Steps

PLANNER fallback scaffold for "Preregister M05 live experiment and release decision protocol". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preregister M05 live experiment and release decision protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
