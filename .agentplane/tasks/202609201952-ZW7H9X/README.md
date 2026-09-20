---
id: "202609201952-ZW7H9X"
title: "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "LC-01"
  - "backend"
  - "code"
  - "release-0.7.11"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "node --test scripts/checks/lifecycle-owner-map.test.mjs"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
    external_effects:
      - "network_read"
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
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:58d14d82a249d768c409144b62d2d36d562276aea769a836c0ffe2a19855686b"
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
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-20T19:52:16.484Z"
doc_updated_by: "CODER"
description: "Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker."
sections:
  Summary: |-
    LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary

    Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.
  Scope: |-
    - In scope: Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.
    - Out of scope: unrelated refactors not required for "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/checks/lifecycle-owner-map.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "4470b04c34da735ffb46914ea6e6398a54eb39ac"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3c72d50e79cbd54e5916f128d73adb3991e836e6bf34b708b3104a9734bde0f3"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7dd44f856aab1f0b0a792f3d48a9792d2eabb65752ea3b64a30400de1e683e0a"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:41d4fb43c55eebb17857f24d212855dda27163e1760023a349f214e5818f897a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "tests"
            repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Task Kernel and task lifecycle production source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            task_id: "202609201952-ZW7H9X"
            validation_requirements:
              - "bun run arch:check"
              - "bun run lifecycle:invariants"
              - "node --test scripts/checks/lifecycle-owner-map.test.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b74df7c1137d56f3c7eb2728215c3b246609a8237c4685948118bcfd9c2de2f9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7dd44f856aab1f0b0a792f3d48a9792d2eabb65752ea3b64a30400de1e683e0a"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:41d4fb43c55eebb17857f24d212855dda27163e1760023a349f214e5818f897a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3c72d50e79cbd54e5916f128d73adb3991e836e6bf34b708b3104a9734bde0f3"
            repository_effects:
              - "repository_write"
              - "tests"
            repository_fingerprint: "sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Task Kernel and task lifecycle production source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            task_id: "202609201952-ZW7H9X"
            validation_requirements:
              - "bun run arch:check"
              - "bun run lifecycle:invariants"
              - "node --test scripts/checks/lifecycle-owner-map.test.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            evidence_digest: "sha256:ce5da3fa86e48e41c0aedbc86901746748faa6d695bed8bf9fc1ee4f8ebdbcd6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:41d4fb43c55eebb17857f24d212855dda27163e1760023a349f214e5818f897a"
        digest: "sha256:7dd44f856aab1f0b0a792f3d48a9792d2eabb65752ea3b64a30400de1e683e0a"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c384f4bf1cad4f99f14058a9aa32fffcc07a54044e5bc5b3a64dfe17c755013"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "Task Kernel and task lifecycle production source"
              scope_roots:
                - "scripts/checks/lifecycle-owner-map.json"
                - "scripts/checks/lifecycle-owner-map.test.mjs"
            expected_outputs:
              - "lifecycle-owner-map"
            id: "lc-01-lifecycle-owner-map"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609201952-ZW7H9X"
      intent_digest: "sha256:d18bacb033713113fa5e4cc91842ebd3318407d9c18c0fec909a88d4aafdc336"
      migration_receipts: []
      mutation_receipts:
        capture:202609201952-ZW7H9X:
          after_revision: 1
          aggregate_digest: "sha256:b68b03986b3ccc78a067d739b1209420faf6aa02ab1e303edb96a5ccff00c750"
          before_revision: 0
          command_digest: "sha256:e43e44a3a49990429b260d70aeb041827e4a851885bfb7fbf325e9af2f67f87f"
          effect_ids: []
          event_digests:
            - "sha256:96c33f2cfabb12968ef97e6b8d9656bb107cf0fbfcde7ece75864031ef201ef2"
          mutation_id: "capture:202609201952-ZW7H9X"
        kernel_work_item_claim_required:sha256:0e4c4fe4a0f077747ff76da22e740d289d8f0d216a30fa4c133014a21f65cd0d:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 5
          aggregate_digest: "sha256:011f3b48725c6a7ffe070826ab08196c3f62be771c34ec953a297e770c9e1edb"
          before_revision: 4
          command_digest: "sha256:5101f325b8d4f3c8b38dbff673e832c820e20e48ac6535e9ceea94c245a82ae4"
          effect_ids: []
          event_digests:
            - "sha256:a5c56230fa5a92ba9189f2a57a57d384999f8f94273a48ce2a8e18bfddd7406d"
          mutation_id: "kernel_work_item_claim_required:sha256:0e4c4fe4a0f077747ff76da22e740d289d8f0d216a30fa4c133014a21f65cd0d:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_execution_required:sha256:62b9d1d6083ed48c5f2dd0ebd45b503ab4c652fd30ccf0bd24f1faf3cdcf6765:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:
          after_revision: 13
          aggregate_digest: "sha256:2fdc5820ed40f333b8d9c84237107a56fdc75165e1b975a4edb42d3f7e91a6ce"
          before_revision: 12
          command_digest: "sha256:8c7ee090d3e674d990d791f6123f23d13689ace9accd5115dd8dc1a454855983"
          effect_ids: []
          event_digests:
            - "sha256:4aed788853fed00321ae0b4a76d3889cf23753e779cd7e0d70ed134d8102a97c"
          mutation_id: "kernel_work_item_execution_required:sha256:62b9d1d6083ed48c5f2dd0ebd45b503ab4c652fd30ccf0bd24f1faf3cdcf6765:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 6
          aggregate_digest: "sha256:21507ed74361ca55b21f445db34c2a73e42dec2d93d202b9d7d9614622a2abb5"
          before_revision: 5
          command_digest: "sha256:e2e90f7d533095ae7e254f506434921c6a9b2044525b8c0af0d7f201f7f4cb6b"
          effect_ids: []
          event_digests:
            - "sha256:7fc52dbceff55c06c8819e63040fbcce3bd1955729aa312bd9db9eaabe3266b1"
          mutation_id: "kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_inspection_required:sha256:cf975b214fbc8779c5c0436893813cb197dfc83e4c6e6c6889b5bde241a8ab5a:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:
          after_revision: 9
          aggregate_digest: "sha256:78746f582b8e52162f5b5ac271a52e5eb6a3f332391606ce1f67844b5fe96dba"
          before_revision: 8
          command_digest: "sha256:08645c64a913204ea469d9f9dcef50f8bdb08bc9955a3b806a1fb9e9e01cb47b"
          effect_ids: []
          event_digests:
            - "sha256:b4d84924bd670ed8777f99402ce7cb71ec4f03812ad0d25b3ac3f5fde4ad3a2e"
          mutation_id: "kernel_work_item_inspection_required:sha256:cf975b214fbc8779c5c0436893813cb197dfc83e4c6e6c6889b5bde241a8ab5a:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 4
          aggregate_digest: "sha256:ba9da574d90bfadd1346d841bdfb8e9bd7d15e4dc29eb104a39c921f9c4c4251"
          before_revision: 3
          command_digest: "sha256:321572e81a9becc18c136f3266dcacbbab99c1791ee6ac728295148e92dc18ad"
          effect_ids: []
          event_digests:
            - "sha256:c613ca4ab67dd5ea5c1bf8d802b01031ba0ff8bd2ba7f48dc0d9575c32be9603"
          mutation_id: "kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_rework_claim_required:sha256:18bbdccce6f86b923a2eba0f0f8b11e41be05b2c788295b0134872441b9a4f3b:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:
          after_revision: 12
          aggregate_digest: "sha256:e00b315ea5c6527d42de148d70c67453dbc430a0288d68928e1d69e1918cb955"
          before_revision: 11
          command_digest: "sha256:59f6010846da73669f17cc2a055ed67d89bfab670751f7d3e69576770a51ccf7"
          effect_ids: []
          event_digests:
            - "sha256:9d67f64d4d470e9b4a39ba8e767bbaeb3d0307e633d4eeb07856d2aa929de105"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:18bbdccce6f86b923a2eba0f0f8b11e41be05b2c788295b0134872441b9a4f3b:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        result:sha256:4965a61d116799c1a37599ed8cdae4dd968aeb40c558945b1193b1d2dbad7b59:
          after_revision: 8
          aggregate_digest: "sha256:a7a357ef7812dd5cdad0aff530654cac6f0fc993d0581f4a5128ec671a759478"
          before_revision: 7
          command_digest: "sha256:d01988a64166bf0f53a02621ccb7a691d0527910c481a67312652d0623611800"
          effect_ids: []
          event_digests:
            - "sha256:dbe77076b3c623b795209c623698d33200300a767ac2d853746341c8f3e7e6ff"
          mutation_id: "result:sha256:4965a61d116799c1a37599ed8cdae4dd968aeb40c558945b1193b1d2dbad7b59"
        result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b:
          after_revision: 2
          aggregate_digest: "sha256:af77eb7eedffa772d13239e959ae8c513dabbd56a172230c234e01e88b53e40b"
          before_revision: 1
          command_digest: "sha256:3b44b92311e5eb1511b24b08cebc2dd4ebf1cb18b3515263f03117db0c39ea6e"
          effect_ids: []
          event_digests:
            - "sha256:d1788e044d84e77574b816b808c11046346c50c08ff53233d539cef1488ff20f"
          mutation_id: "result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b"
        sha256:8fbcb0247c67a8429ad5d26b450042bd8af922dde19e4b57e789c6dda94330f9:
          after_revision: 7
          aggregate_digest: "sha256:8b01f2bd1753acde8253d79070de58228775d1aec92553b247ce9c3cc3b8c777"
          before_revision: 6
          command_digest: "sha256:5ab209b334d89c12f5346da5d6f69b400985f6e22a39a0f5d9152495aa7eb8b8"
          effect_ids: []
          event_digests:
            - "sha256:86e474bf4ffaa40412c251c1e7496250dfb54eb85c25d0ce8d3b924c004a7183"
          mutation_id: "sha256:8fbcb0247c67a8429ad5d26b450042bd8af922dde19e4b57e789c6dda94330f9"
        sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6:
          after_revision: 3
          aggregate_digest: "sha256:f31b18394f09be93accdbf413a6af5ae061f1ba4477c23a6f73cedb65c1e62a8"
          before_revision: 2
          command_digest: "sha256:952421f7b501fb6be434e53230115318ed8c42e7445ec5238011dcca22952202"
          effect_ids: []
          event_digests:
            - "sha256:276c7239f7463466383e333873da101beee61629d783b93afb477d65ef2904fa"
          mutation_id: "sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6"
        validation-resolution:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d:
          after_revision: 11
          aggregate_digest: "sha256:e468f95676ff6867c2fa48f11880dc4ac8b6c400e6b384231a37aa12ac062420"
          before_revision: 10
          command_digest: "sha256:37f6f5ee501943280ebb2c83e6de06c0b605d89cca39d05bce1cb9731ace8783"
          effect_ids: []
          event_digests:
            - "sha256:4d59a57548f398af5ce3fdb6cd13b97e06db82246ab9567a64a21cd1c0a13d42"
          mutation_id: "validation-resolution:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d"
        validation:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d:
          after_revision: 10
          aggregate_digest: "sha256:2f683f0c5860889528fa9c8438bca0b4fb7cd500e53c185a8e9e7f8098dc5d55"
          before_revision: 9
          command_digest: "sha256:5a652eefaf08ad76dcef142ab97546a8ccf8cf895f282c87bfc6ef1d3d46874f"
          effect_ids: []
          event_digests:
            - "sha256:1b72999cc83a93991ddf40ecaa60cef063e61aac07b116bd786597afb50cfc7e"
          mutation_id: "validation:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lc-01-lifecycle-owner-map:
          attempt: 2
          claim_id: "sha256:929223d168b4271df99764ffbc95805db37196ec6dd857e66966490927132613"
          definition:
            contract_digest: "sha256:5c384f4bf1cad4f99f14058a9aa32fffcc07a54044e5bc5b3a64dfe17c755013"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "Task Kernel and task lifecycle production source"
              scope_roots:
                - "scripts/checks/lifecycle-owner-map.json"
                - "scripts/checks/lifecycle-owner-map.test.mjs"
            expected_outputs:
              - "lifecycle-owner-map"
            id: "lc-01-lifecycle-owner-map"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:9a3e0a5831f0bacc0337d12eede2de033a082c2bc7dacb3cf832de407d97c059"
    documents:
      contracts:
        sha256:5c384f4bf1cad4f99f14058a9aa32fffcc07a54044e5bc5b3a64dfe17c755013:
          acceptance_criteria:
            - "Map every production task advance and run entrypoint plus state mutation, scheduling, admission, completion, final validation, effect dispatch, effect observation, reconciliation, hosted integration, recovery, context, and authority responsibility to an existing symbol."
            - "Require exactly one canonical Kernel command/event path, one canonical state writer, and one application effect owner for every mutable responsibility."
            - "Classify task-centric lifecycle, orchestrator, and legacy mutation symbols individually as canonical owner, coordinator capability, retained pure helper, compatibility-only path, or later deletion candidate; do not treat an entire file as one ownership unit."
            - "Fail on missing paths or symbols, duplicate mutable ownership, unmapped production entrypoints, a second reducer, a kernel-specific outer loop, or a third scheduler/coordinator."
            - "Keep all frozen safety behavior unchanged and report any unrepresentable guarantee as a concrete blocking counterexample rather than weakening the map."
          objective: "Create an executable symbol-level ownership map that establishes Task Kernel as the sole domain reducer and identifies one application coordinator boundary without changing runtime behavior."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/checks/lifecycle-owner-map.test.mjs"
            - "bun run lifecycle:invariants"
            - "bun run arch:check"
      intent:
        context: "Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker."
        objective: "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary"
    events:
      -
        command_digest: "sha256:e43e44a3a49990429b260d70aeb041827e4a851885bfb7fbf325e9af2f67f87f"
        id: "capture:202609201952-ZW7H9X:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609201952-ZW7H9X"
        occurred_at: "2026-09-20T19:52:16.458Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609201952-ZW7H9X"
        task_revision: 1
      -
        command_digest: "sha256:3b44b92311e5eb1511b24b08cebc2dd4ebf1cb18b3515263f03117db0c39ea6e"
        id: "result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b"
        occurred_at: "2026-09-20T19:56:11.320Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609201952-ZW7H9X"
        task_revision: 2
      -
        command_digest: "sha256:952421f7b501fb6be434e53230115318ed8c42e7445ec5238011dcca22952202"
        id: "sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6"
        occurred_at: "2026-09-20T21:18:18.072Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609201952-ZW7H9X"
        task_revision: 3
      -
        command_digest: "sha256:321572e81a9becc18c136f3266dcacbbab99c1791ee6ac728295148e92dc18ad"
        id: "kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T21:18:32.780Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609201952-ZW7H9X"
        task_revision: 4
      -
        command_digest: "sha256:5101f325b8d4f3c8b38dbff673e832c820e20e48ac6535e9ceea94c245a82ae4"
        id: "kernel_work_item_claim_required:sha256:0e4c4fe4a0f077747ff76da22e740d289d8f0d216a30fa4c133014a21f65cd0d:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0e4c4fe4a0f077747ff76da22e740d289d8f0d216a30fa4c133014a21f65cd0d:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T21:18:40.104Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609201952-ZW7H9X"
        task_revision: 5
      -
        command_digest: "sha256:e2e90f7d533095ae7e254f506434921c6a9b2044525b8c0af0d7f201f7f4cb6b"
        id: "kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T21:21:14.782Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609201952-ZW7H9X"
        task_revision: 6
      -
        command_digest: "sha256:5ab209b334d89c12f5346da5d6f69b400985f6e22a39a0f5d9152495aa7eb8b8"
        id: "sha256:8fbcb0247c67a8429ad5d26b450042bd8af922dde19e4b57e789c6dda94330f9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8fbcb0247c67a8429ad5d26b450042bd8af922dde19e4b57e789c6dda94330f9"
        occurred_at: "2026-09-20T21:27:17.524Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609201952-ZW7H9X"
        task_revision: 7
      -
        command_digest: "sha256:d01988a64166bf0f53a02621ccb7a691d0527910c481a67312652d0623611800"
        id: "result:sha256:4965a61d116799c1a37599ed8cdae4dd968aeb40c558945b1193b1d2dbad7b59:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4965a61d116799c1a37599ed8cdae4dd968aeb40c558945b1193b1d2dbad7b59"
        occurred_at: "2026-09-20T21:27:21.989Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609201952-ZW7H9X"
        task_revision: 8
      -
        command_digest: "sha256:08645c64a913204ea469d9f9dcef50f8bdb08bc9955a3b806a1fb9e9e01cb47b"
        id: "kernel_work_item_inspection_required:sha256:cf975b214fbc8779c5c0436893813cb197dfc83e4c6e6c6889b5bde241a8ab5a:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cf975b214fbc8779c5c0436893813cb197dfc83e4c6e6c6889b5bde241a8ab5a:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        occurred_at: "2026-09-20T21:27:25.773Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609201952-ZW7H9X"
        task_revision: 9
      -
        command_digest: "sha256:5a652eefaf08ad76dcef142ab97546a8ccf8cf895f282c87bfc6ef1d3d46874f"
        id: "validation:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d"
        occurred_at: "2026-09-20T21:29:09.140Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609201952-ZW7H9X"
        task_revision: 10
      -
        command_digest: "sha256:37f6f5ee501943280ebb2c83e6de06c0b605d89cca39d05bce1cb9731ace8783"
        id: "validation-resolution:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:01136659acf9be0490cf469c8fb679ee45dcf4ea9a7dfdf2e4009bcb6dcab78d"
        occurred_at: "2026-09-20T21:29:11.454Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609201952-ZW7H9X"
        task_revision: 11
      -
        command_digest: "sha256:59f6010846da73669f17cc2a055ed67d89bfab670751f7d3e69576770a51ccf7"
        id: "kernel_work_item_rework_claim_required:sha256:18bbdccce6f86b923a2eba0f0f8b11e41be05b2c788295b0134872441b9a4f3b:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:18bbdccce6f86b923a2eba0f0f8b11e41be05b2c788295b0134872441b9a4f3b:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        occurred_at: "2026-09-20T21:29:15.998Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609201952-ZW7H9X"
        task_revision: 12
      -
        command_digest: "sha256:8c7ee090d3e674d990d791f6123f23d13689ace9accd5115dd8dc1a454855983"
        id: "kernel_work_item_execution_required:sha256:62b9d1d6083ed48c5f2dd0ebd45b503ab4c652fd30ccf0bd24f1faf3cdcf6765:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:62b9d1d6083ed48c5f2dd0ebd45b503ab4c652fd30ccf0bd24f1faf3cdcf6765:sha256:e117c9f004278cd7f961dd170bb81a3d06cb5d7d42ab98a73b5bd25b22da43e3"
        occurred_at: "2026-09-20T21:29:19.507Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609201952-ZW7H9X"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary

Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.

## Scope

- In scope: Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.
- Out of scope: unrelated refactors not required for "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/checks/lifecycle-owner-map.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
