---
id: "202609211544-JKVHYA"
title: "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "release-readiness"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T15:45:10.498Z"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:9d51a4e9b780aa87aefbcf97f67fdb1821d9a38c44f1065fbe5e972d44ac7b75"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T15:44:11.592Z"
doc_updated_by: "CODER"
description: "Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded."
sections:
  Summary: |-
    Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks

    Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
  Scope: |-
    - In scope: Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
    - Out of scope: unrelated refactors not required for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks".
  Plan: "1. Execute approved WorkItem validated-release-scope-exclusions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "4b3b71d554f609ff9d9167c03f6db56a2c5a6584"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "repository_read"
              - "repository_write"
              - "run_checks"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:36f330add565a315e34042c79d04c09b2e0bf131302e9c500d4fa262bd0fe077"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "git-history"
              - "release-readiness-contract"
              - "task-registry"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
              - "scripts/lib/release-scope-exclusions.mjs"
              - "scripts/release/check-task-registry-ready.mjs"
              - "scripts/release/manifest.mjs"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609211544-JKVHYA"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
        digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources:
                - "release-readiness-contract"
                - "task-registry"
                - "git-history"
              scope_roots:
                - "scripts/lib/release-scope-exclusions.mjs"
                - "scripts/release/release-scope-exclusions.json"
                - "scripts/checks/check-task-state.mjs"
                - "scripts/release/check-task-registry-ready.mjs"
                - "scripts/release/manifest.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
                - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
            expected_outputs:
              - "release-scope-exclusion-contract"
            id: "validated-release-scope-exclusions"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609211544-JKVHYA"
      intent_digest: "sha256:808017af27ddd9581820010ce5a5dd8d682a0cf46d0216d3b06f2a77d1a99347"
      migration_receipts: []
      mutation_receipts:
        capture:202609211544-JKVHYA:
          after_revision: 1
          aggregate_digest: "sha256:6afeb27c1acd140002b9812adcd9769969835406b4e4b37d92f80ad3be40db99"
          before_revision: 0
          command_digest: "sha256:b5bf100b25b851017b7ff7d4dea8e8da5d661e4a7ae80c0cf2ef1da50effffa0"
          effect_ids: []
          event_digests:
            - "sha256:53e7d2ced9659a0194ed1e905c1143feebfe2ea4646f2f5fb1f01796600b5929"
          mutation_id: "capture:202609211544-JKVHYA"
        kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 5
          aggregate_digest: "sha256:2dd134f0ba27952ba398f58bcdf59e824d71288e9947aa50cd370a592852177e"
          before_revision: 4
          command_digest: "sha256:9add576cdd205834d0fb890feb2281bcb6f0edc9d94fc65dd5fedb1ef1cc9d23"
          effect_ids: []
          event_digests:
            - "sha256:a5ce44af5d424b576a9d899bf5886087c4bfbd6db6f28b7c688148864dec4d84"
          mutation_id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 6
          aggregate_digest: "sha256:ad2173d2013e4a7ce1e4003205a34f60c09e3e6eb59a14df43edc635f3077fd3"
          before_revision: 5
          command_digest: "sha256:adfa189a03c544d030b5f9cc8a5bdd508575ce2bdb64c0b3b10f3102fe4aea69"
          effect_ids: []
          event_digests:
            - "sha256:563ea4d103e482f929a9b22075d2ab0560fd31a998c9656a26d23606fc0b17e8"
          mutation_id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 4
          aggregate_digest: "sha256:5f0feedbb2d80d724eba8cb6a3eef8db55b59eeb16678271bc08c974fbe22d47"
          before_revision: 3
          command_digest: "sha256:e3ce0d98a664daf95806a56d6b3aecd5995d429c2af0db20d99b860043450dc2"
          effect_ids: []
          event_digests:
            - "sha256:79aa137cf9141cce6544551da7cfe4ba123eac11ee3ac58faf4696d79d35dbd7"
          mutation_id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab:
          after_revision: 2
          aggregate_digest: "sha256:9e9358f0817674698f2dfb33f1a2f159481d88976d402578fc8e9afc05013667"
          before_revision: 1
          command_digest: "sha256:fd65f7f128664accf6764239f3bb31a66728ab67f2e8157ae4d6ccd341e5f305"
          effect_ids: []
          event_digests:
            - "sha256:459fe4a31b6ecc0fed14498575ef54344591cbeb302ce66f66e212f2c7a799da"
          mutation_id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab"
        sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab:
          after_revision: 3
          aggregate_digest: "sha256:6044a7e102342ae573a2c68c7bd88a99494da857760f4c976db02108b3094d28"
          before_revision: 2
          command_digest: "sha256:d3b7bef0e9dc2e43576a0f943d14ed79127ab00b16d89fd8d49ae298498a1d6e"
          effect_ids: []
          event_digests:
            - "sha256:1ff12fe7e6a7700ce04c1310a591fb88238c12cc2f53acdff11b5b40f077cb3b"
          mutation_id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        validated-release-scope-exclusions:
          attempt: 1
          claim_id: "sha256:9fdc8e76cf13a1e03abe610ab0bba21a0bc7eb66b21512a961733ffbab06c8b0"
          definition:
            contract_digest: "sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources:
                - "release-readiness-contract"
                - "task-registry"
                - "git-history"
              scope_roots:
                - "scripts/lib/release-scope-exclusions.mjs"
                - "scripts/release/release-scope-exclusions.json"
                - "scripts/checks/check-task-state.mjs"
                - "scripts/release/check-task-registry-ready.mjs"
                - "scripts/release/manifest.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
                - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
            expected_outputs:
              - "release-scope-exclusion-contract"
            id: "validated-release-scope-exclusions"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:7e4d1a6ede6827714f36201c2df696e64fc553f9075fa297b0e7e9a17e86088a"
    documents:
      contracts:
        sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f:
          acceptance_criteria:
            - "Every exclusion names an exact task id, evidence kind, reason, and immutable Git reference; malformed, missing, non-ancestor, non-DONE replacement, and unknown-task evidence fail closed."
            - "Standalone release task checks and release-ready manifest generation consume the same validated exclusion set and report the accepted exclusions."
            - "The manifest records only the known historical 0.7.10 and 0.7.11 projections whose work is already published, merged, or superseded by a DONE merged repair task."
            - "No status, canonical task state, immutable compatibility baseline, or unrelated release gate is modified or bypassed."
          objective: "Add one audited release-scope exclusion manifest and a shared validator that permits only exact, Git-proven integrated, superseded, or published historical task projections while leaving every unverifiable active task release-blocking."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
            - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            - "bun run test:release:critical"
            - "bun run ci:local:full"
      intent:
        context: "Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded."
        objective: "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks"
    events:
      -
        command_digest: "sha256:b5bf100b25b851017b7ff7d4dea8e8da5d661e4a7ae80c0cf2ef1da50effffa0"
        id: "capture:202609211544-JKVHYA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609211544-JKVHYA"
        occurred_at: "2026-09-21T15:44:11.534Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609211544-JKVHYA"
        task_revision: 1
      -
        command_digest: "sha256:fd65f7f128664accf6764239f3bb31a66728ab67f2e8157ae4d6ccd341e5f305"
        id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab"
        occurred_at: "2026-09-21T15:45:00.801Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609211544-JKVHYA"
        task_revision: 2
      -
        command_digest: "sha256:d3b7bef0e9dc2e43576a0f943d14ed79127ab00b16d89fd8d49ae298498a1d6e"
        id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab"
        occurred_at: "2026-09-21T15:45:09.557Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609211544-JKVHYA"
        task_revision: 3
      -
        command_digest: "sha256:e3ce0d98a664daf95806a56d6b3aecd5995d429c2af0db20d99b860043450dc2"
        id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:12.887Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609211544-JKVHYA"
        task_revision: 4
      -
        command_digest: "sha256:9add576cdd205834d0fb890feb2281bcb6f0edc9d94fc65dd5fedb1ef1cc9d23"
        id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:16.777Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609211544-JKVHYA"
        task_revision: 5
      -
        command_digest: "sha256:adfa189a03c544d030b5f9cc8a5bdd508575ce2bdb64c0b3b10f3102fe4aea69"
        id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:34.675Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609211544-JKVHYA"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks

Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.

## Scope

- In scope: Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
- Out of scope: unrelated refactors not required for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks".

## Plan

1. Execute approved WorkItem validated-release-scope-exclusions.

## Verify Steps

PLANNER fallback scaffold for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
