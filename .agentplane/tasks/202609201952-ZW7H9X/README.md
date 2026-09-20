---
id: "202609201952-ZW7H9X"
title: "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
        kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 6
          aggregate_digest: "sha256:21507ed74361ca55b21f445db34c2a73e42dec2d93d202b9d7d9614622a2abb5"
          before_revision: 5
          command_digest: "sha256:e2e90f7d533095ae7e254f506434921c6a9b2044525b8c0af0d7f201f7f4cb6b"
          effect_ids: []
          event_digests:
            - "sha256:7fc52dbceff55c06c8819e63040fbcce3bd1955729aa312bd9db9eaabe3266b1"
          mutation_id: "kernel_work_item_execution_required:sha256:b7165c678bcb3b79b2ebc6d5fdee3d671c55b2f994f87bcc15997d894b9c1a30:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 4
          aggregate_digest: "sha256:ba9da574d90bfadd1346d841bdfb8e9bd7d15e4dc29eb104a39c921f9c4c4251"
          before_revision: 3
          command_digest: "sha256:321572e81a9becc18c136f3266dcacbbab99c1791ee6ac728295148e92dc18ad"
          effect_ids: []
          event_digests:
            - "sha256:c613ca4ab67dd5ea5c1bf8d802b01031ba0ff8bd2ba7f48dc0d9575c32be9603"
          mutation_id: "kernel_work_item_materialization_required:sha256:3ce2c464bb3fa356a0e5fd78618d3ba82b76991a6dd6685ce080359b08f3b643:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b:
          after_revision: 2
          aggregate_digest: "sha256:af77eb7eedffa772d13239e959ae8c513dabbd56a172230c234e01e88b53e40b"
          before_revision: 1
          command_digest: "sha256:3b44b92311e5eb1511b24b08cebc2dd4ebf1cb18b3515263f03117db0c39ea6e"
          effect_ids: []
          event_digests:
            - "sha256:d1788e044d84e77574b816b808c11046346c50c08ff53233d539cef1488ff20f"
          mutation_id: "result:sha256:d9b7f453710de5de4726247dceadd57ac290717a04d18cbae1a73429eff6795b"
        sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6:
          after_revision: 3
          aggregate_digest: "sha256:f31b18394f09be93accdbf413a6af5ae061f1ba4477c23a6f73cedb65c1e62a8"
          before_revision: 2
          command_digest: "sha256:952421f7b501fb6be434e53230115318ed8c42e7445ec5238011dcca22952202"
          effect_ids: []
          event_digests:
            - "sha256:276c7239f7463466383e333873da101beee61629d783b93afb477d65ef2904fa"
          mutation_id: "sha256:be58ff9a27e4ad6ce2403fd0aed8bf09dc1634a261b1f10088fea57182a019c6"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lc-01-lifecycle-owner-map:
          attempt: 1
          claim_id: "sha256:54c6fa5bc3aefb7fed5b21f4bad8d8de96c14d77b99a8d8d25da4f596434f8ac"
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
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:b0a1452688809d379265a6f8daf4491f4dc2fcd381293e2843ff406fb5e8fd6f"
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
