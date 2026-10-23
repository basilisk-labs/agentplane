---
id: "202610232316-VVE946"
title: "Align conflict fake GitHub providers with branch protection observation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run lint"
  - "bunx prettier packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --check"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --pool=forks --maxWorkers 2 --testTimeout 120000 --hookTimeout 120000"
plan_approval:
  state: "approved"
  updated_at: "2026-10-23T23:18:20.252Z"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
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
      digest: "sha256:1edc1d50834b6d22668201c3f243b7c1e77fd1dcbee7976b89009a32a209adc5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
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
doc_updated_at: "2026-10-23T23:17:02.797Z"
doc_updated_by: "CODER"
description: "Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion."
sections:
  Summary: |-
    Align conflict fake GitHub providers with branch protection observation

    Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.
  Scope: |-
    - In scope: Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.
    - Out of scope: unrelated refactors not required for "Align conflict fake GitHub providers with branch protection observation".
  Plan: "1. Execute approved WorkItem align-conflict-protection-fixtures."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --pool=forks --maxWorkers 2 --testTimeout 120000 --hookTimeout 120000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx prettier packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "e769ec11a233efc57329f9c15574216f4f057d03"
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
            digest: "sha256:9261c28f4e5fa9eee20bfdc73bee183e9ba94bee862b8ed4afbe44c9de52d74e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:071b3af9e1333536712a7be582f83c34b501342aacecb012121bdc4a96f229d6"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a258c82761a5fc9da10e9ec6199e3d2600b6264dd3b26fc03d338c548c80ceda"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
              - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
            task_id: "202610232316-VVE946"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:a258c82761a5fc9da10e9ec6199e3d2600b6264dd3b26fc03d338c548c80ceda"
        digest: "sha256:071b3af9e1333536712a7be582f83c34b501342aacecb012121bdc4a96f229d6"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b6209488308927d85a6a32ef5b2e344af32ca1d5835775fe1cf45f2a713031e5"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
            expected_outputs:
              - "exact-branch-observation-fixtures"
              - "resolver-call-order-regression"
              - "focused-regression-evidence"
            id: "align-conflict-protection-fixtures"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610232316-VVE946"
      intent_digest: "sha256:2c2bf1f6afd79eea41c561f883d82a349d0dc670c1ede28e0edcb01f56aeea04"
      migration_receipts: []
      mutation_receipts:
        capture:202610232316-VVE946:
          after_revision: 1
          aggregate_digest: "sha256:42c26e159e80df9047e3c933f149fd98a9b94eda3d53023496b544c2f56e8f80"
          before_revision: 0
          command_digest: "sha256:4ef827897a415d36fb2df5e00a7e4f781960807451dc69d7006e2cf640a09e50"
          effect_ids: []
          event_digests:
            - "sha256:6730d97e2660b0193b9c96536601b6dc7d98d52ec5c6274c08b4d05f8ebdd9cb"
          mutation_id: "capture:202610232316-VVE946"
        kernel_work_item_claim_required:sha256:593ff6d90ef68e9681b4e6964d6a24deda58c4a45e252eea13258b157787154c:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:
          after_revision: 5
          aggregate_digest: "sha256:33cc645219af0e5a3862d077a0c0e7a3381d41e8fa4d70d159c4ed1874726e7a"
          before_revision: 4
          command_digest: "sha256:7f23d702caab9e015626f7cf71b8c6e6e868991c75ba95eaab94c110d2be3e62"
          effect_ids: []
          event_digests:
            - "sha256:84639332aa75d7b522d16161ee225ad05f2f451efd0aaf66b61aab8a06547421"
          mutation_id: "kernel_work_item_claim_required:sha256:593ff6d90ef68e9681b4e6964d6a24deda58c4a45e252eea13258b157787154c:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        kernel_work_item_execution_required:sha256:d40a465d713e6054b66081b4a11a9b66390a9948517dfff005148c09dc419dda:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:
          after_revision: 6
          aggregate_digest: "sha256:40f09c42b6d60a1d005b9537ee951dee5dc92149a24d31df266f351be40c6d1f"
          before_revision: 5
          command_digest: "sha256:7f217ff269faccc8cec1270febc55204b2b49ec579e02b9701e8eea39989b3d7"
          effect_ids: []
          event_digests:
            - "sha256:267836965df37b6bb200ebebff33f57276319200900397bbaf0895518abf2977"
          mutation_id: "kernel_work_item_execution_required:sha256:d40a465d713e6054b66081b4a11a9b66390a9948517dfff005148c09dc419dda:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        kernel_work_item_materialization_required:sha256:0dbbe2363365e17d3987ae02e60cee0b021e3b9c563447934948111aa62ecd32:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:
          after_revision: 4
          aggregate_digest: "sha256:7d90842064ba2c4964aebe47b74322f3c368d0396980aac20f0201df89b3b329"
          before_revision: 3
          command_digest: "sha256:39cc9c438ff15f35bb434eb0ad1bb95889398ae09ccf8dbea5da8d05733e9920"
          effect_ids: []
          event_digests:
            - "sha256:ec473b0418210ba48ea16b4924031013bc45c0d4e69c74f26b397c034a408ca9"
          mutation_id: "kernel_work_item_materialization_required:sha256:0dbbe2363365e17d3987ae02e60cee0b021e3b9c563447934948111aa62ecd32:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        result:sha256:ae28a1130eb24438338c36c120fcbe28c974e0d1bf075bf142f7db33ce742565:
          after_revision: 2
          aggregate_digest: "sha256:e5ada426e5e072cb28a40fda19af3e632348908130bb654bb3e46ff9087b8352"
          before_revision: 1
          command_digest: "sha256:7a2d50c43702a8fdbdbc4045b3f7a3173a6bc954e5f6c16c3c862a8dfb0592c0"
          effect_ids: []
          event_digests:
            - "sha256:a59a96673bce7a27120029baf36250d0b19daf9978622168e451fb27e24f5f28"
          mutation_id: "result:sha256:ae28a1130eb24438338c36c120fcbe28c974e0d1bf075bf142f7db33ce742565"
        sha256:1d8e25a0252ddff432925fc6ca81e02e479fc4af6abd43327a32153167830776:
          after_revision: 3
          aggregate_digest: "sha256:b0b0308c4531f7611b0db983312c9fe7ce044e5135385ce859a145b005bc23d4"
          before_revision: 2
          command_digest: "sha256:aa2dbbecd837b921d1b27ed63b56cd052c01f315c2a91c40e800b12903be4686"
          effect_ids: []
          event_digests:
            - "sha256:d6ac89648e4343880854ea0d122fb3a979ae15916dfc49bf1e94d55204dee5a6"
          mutation_id: "sha256:1d8e25a0252ddff432925fc6ca81e02e479fc4af6abd43327a32153167830776"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        align-conflict-protection-fixtures:
          attempt: 1
          claim_id: "sha256:f9e58f53263338c2aff1f0bf5106ad6dc320d2156934b44ccc3032658d7438b8"
          definition:
            contract_digest: "sha256:b6209488308927d85a6a32ef5b2e344af32ca1d5835775fe1cf45f2a713031e5"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
            expected_outputs:
              - "exact-branch-observation-fixtures"
              - "resolver-call-order-regression"
              - "focused-regression-evidence"
            id: "align-conflict-protection-fixtures"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:3f3fac5c4c3a69482e3ae2460cdf0db274fb478e4bc4142248b0a4aca2dc0046"
    documents:
      contracts:
        sha256:b6209488308927d85a6a32ef5b2e344af32ca1d5835775fe1cf45f2a713031e5:
          acceptance_criteria:
            - "Conflict publication and conflict rework focused tests pass using the exact branch-then-protection fake responses."
            - "Fake providers still reject unexpected GitHub API endpoints."
            - "The resolver test asserts exact branch and protection API call order without weakening its fail-closed cases."
            - "Full local CI and hosted PR checks pass before integration."
          objective: "Make both affected fake GitHub providers return the exact protected main branch observation before protection detail. Preserve unknown-endpoint rejection and production fail-closed semantics. Assert the resolver's two provider calls in order."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --pool=forks --maxWorkers 2 --testTimeout 120000 --hookTimeout 120000"
            - "bunx prettier packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --check"
            - "bun run lint"
      intent:
        context: "Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion."
        objective: "Align conflict fake GitHub providers with branch protection observation"
    events:
      -
        command_digest: "sha256:4ef827897a415d36fb2df5e00a7e4f781960807451dc69d7006e2cf640a09e50"
        id: "capture:202610232316-VVE946:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610232316-VVE946"
        occurred_at: "2026-10-23T23:17:02.751Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610232316-VVE946"
        task_revision: 1
      -
        command_digest: "sha256:7a2d50c43702a8fdbdbc4045b3f7a3173a6bc954e5f6c16c3c862a8dfb0592c0"
        id: "result:sha256:ae28a1130eb24438338c36c120fcbe28c974e0d1bf075bf142f7db33ce742565:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ae28a1130eb24438338c36c120fcbe28c974e0d1bf075bf142f7db33ce742565"
        occurred_at: "2026-10-23T23:18:05.290Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610232316-VVE946"
        task_revision: 2
      -
        command_digest: "sha256:aa2dbbecd837b921d1b27ed63b56cd052c01f315c2a91c40e800b12903be4686"
        id: "sha256:1d8e25a0252ddff432925fc6ca81e02e479fc4af6abd43327a32153167830776:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1d8e25a0252ddff432925fc6ca81e02e479fc4af6abd43327a32153167830776"
        occurred_at: "2026-10-23T23:18:15.280Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610232316-VVE946"
        task_revision: 3
      -
        command_digest: "sha256:39cc9c438ff15f35bb434eb0ad1bb95889398ae09ccf8dbea5da8d05733e9920"
        id: "kernel_work_item_materialization_required:sha256:0dbbe2363365e17d3987ae02e60cee0b021e3b9c563447934948111aa62ecd32:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0dbbe2363365e17d3987ae02e60cee0b021e3b9c563447934948111aa62ecd32:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        occurred_at: "2026-10-23T23:18:22.766Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610232316-VVE946"
        task_revision: 4
      -
        command_digest: "sha256:7f23d702caab9e015626f7cf71b8c6e6e868991c75ba95eaab94c110d2be3e62"
        id: "kernel_work_item_claim_required:sha256:593ff6d90ef68e9681b4e6964d6a24deda58c4a45e252eea13258b157787154c:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:593ff6d90ef68e9681b4e6964d6a24deda58c4a45e252eea13258b157787154c:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        occurred_at: "2026-10-23T23:18:34.098Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610232316-VVE946"
        task_revision: 5
      -
        command_digest: "sha256:7f217ff269faccc8cec1270febc55204b2b49ec579e02b9701e8eea39989b3d7"
        id: "kernel_work_item_execution_required:sha256:d40a465d713e6054b66081b4a11a9b66390a9948517dfff005148c09dc419dda:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d40a465d713e6054b66081b4a11a9b66390a9948517dfff005148c09dc419dda:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        occurred_at: "2026-10-23T23:19:03.525Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610232316-VVE946"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align conflict fake GitHub providers with branch protection observation

Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.

## Scope

- In scope: Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.
- Out of scope: unrelated refactors not required for "Align conflict fake GitHub providers with branch protection observation".

## Plan

1. Execute approved WorkItem align-conflict-protection-fixtures.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --pool=forks --maxWorkers 2 --testTimeout 120000 --hookTimeout 120000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx prettier packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
