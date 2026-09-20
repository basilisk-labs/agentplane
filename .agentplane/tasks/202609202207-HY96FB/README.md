---
id: "202609202207-HY96FB"
title: "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.11"
  - "unblocker"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bun test packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
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
doc_updated_at: "2026-09-20T22:07:32.772Z"
doc_updated_by: "CODER"
description: "The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact."
sections:
  Summary: |-
    Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure

    The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.
  Scope: |-
    - In scope: The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.
    - Out of scope: unrelated refactors not required for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "4470b04c34da735ffb46914ea6e6398a54eb39ac"
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
            digest: "sha256:684fa8d14f2328c9cafa27b353fae8cfdb033cbeb185b9210cd9b8ce3d7fdd75"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7f889b8e6f5971665cd7c5888eae74353c178a6f8e9b2db9d651c1b357d2ae3e"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eda54900d507b15f0dccfcccc6ac6910361d64b1fe182d96c3f762cde4417e17"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Kernel operational projection source and focused tests"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
            task_id: "202609202207-HY96FB"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bun test packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:eda54900d507b15f0dccfcccc6ac6910361d64b1fe182d96c3f762cde4417e17"
        digest: "sha256:7f889b8e6f5971665cd7c5888eae74353c178a6f8e9b2db9d651c1b357d2ae3e"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:75ee71bf68ff60f98efb67b30fe57ec6854af11420e254f6b5cf9b20b58b8784"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Kernel operational projection source and focused tests"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
            expected_outputs:
              - "kernel-verification-projection-fix"
              - "kernel-verification-projection-regression-tests"
            id: "preserve-kernel-verification-metadata"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609202207-HY96FB"
      intent_digest: "sha256:7dee3f9b2ad0a6d481ed0668cb1baee1ffb8e20e7be97d0ffc57b048d8f17560"
      migration_receipts: []
      mutation_receipts:
        capture:202609202207-HY96FB:
          after_revision: 1
          aggregate_digest: "sha256:79c84d2d062bf0c01f4d7db0d3dbedb434be72acaeb43cb8a61843526be79036"
          before_revision: 0
          command_digest: "sha256:f1e007323449a7b3c95180da22e504269199e741d81949aa9abbb0d872c2b6a1"
          effect_ids: []
          event_digests:
            - "sha256:19fe7110527a9fc1e8af8f8f7661f9528acd017af8f0dfb4be191ab083dd2813"
          mutation_id: "capture:202609202207-HY96FB"
        kernel_work_item_claim_required:sha256:5e11dbd460be1b02c3c7da0a827087a865a0073f05e1e49c2433007a54ecd4c3:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 5
          aggregate_digest: "sha256:545551e7b02478869bd619eaf79247489484369457fbdd99e2b0732161b0e2dc"
          before_revision: 4
          command_digest: "sha256:349d524c59b0e9ea002f97010a5765fbe940ef831a21e5c92094feefd87f2d95"
          effect_ids: []
          event_digests:
            - "sha256:bfeb3c71707d74468f6d7813003d9f5945bfc527be10bc0ee1e58eeae2b99207"
          mutation_id: "kernel_work_item_claim_required:sha256:5e11dbd460be1b02c3c7da0a827087a865a0073f05e1e49c2433007a54ecd4c3:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_execution_required:sha256:7285fb9f40192ea39b0062c14decde58e7d26a7a2c76855acf53a9a954a8db01:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 6
          aggregate_digest: "sha256:32501ff49cf5ea690966fe35f9666c450d1f10a02e799b08ecb4bac120297a6c"
          before_revision: 5
          command_digest: "sha256:9ce3c36b33383cd81f8f8b7ad322dd848d82db85d5af9fbad3c1450a8821a3f3"
          effect_ids: []
          event_digests:
            - "sha256:bc54f0b64694c35b1f5506abdb6fb264d6109caf1cfc18890ebbf89a0f1d35a7"
          mutation_id: "kernel_work_item_execution_required:sha256:7285fb9f40192ea39b0062c14decde58e7d26a7a2c76855acf53a9a954a8db01:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_materialization_required:sha256:37317eb66628edb701ae58bcc910f19d9192ccb4d3fdd8a79d3f06f1967411ba:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 4
          aggregate_digest: "sha256:211c81ac41a0702fe3a01123e325bb7e93df4af5a97596cc7ebd51cb455153b2"
          before_revision: 3
          command_digest: "sha256:4cc1fdad5078240e94fce818e51fe0b6cca74d35464462a6bd2a4e377c2051ac"
          effect_ids: []
          event_digests:
            - "sha256:97374160c7a7216a326db48888229c194abe05102db04b6faa8d462944d3fb8f"
          mutation_id: "kernel_work_item_materialization_required:sha256:37317eb66628edb701ae58bcc910f19d9192ccb4d3fdd8a79d3f06f1967411ba:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        result:sha256:52be7f125bc4f60d29e8fe34bb0814afdd992541c7362ca804c2eb4eb79e4e97:
          after_revision: 2
          aggregate_digest: "sha256:122b556d75bd95a247e70bf50e1de08f82dd37d972979f3b83a4d874f4d9cb47"
          before_revision: 1
          command_digest: "sha256:5139f2ee997b3b3601520159a261a15e6b60b8f88563206f28e6173bddab4475"
          effect_ids: []
          event_digests:
            - "sha256:b36e54b6d389e81f7da14212ea376fc362b5df7b12cf7906066dcddf6096aeb8"
          mutation_id: "result:sha256:52be7f125bc4f60d29e8fe34bb0814afdd992541c7362ca804c2eb4eb79e4e97"
        sha256:58301a0b1dcb64ad16f8121845df757ea1bf3bfae2f739158f767aef3bc1ee31:
          after_revision: 3
          aggregate_digest: "sha256:b72fb45ed6655f11306f28663eda6548cb65695a1c6848e81b293ff1092ce813"
          before_revision: 2
          command_digest: "sha256:e230c18e3c142fe5b4e84f6802a3184162cd2aa3cec03224bd0535efabf81589"
          effect_ids: []
          event_digests:
            - "sha256:2f377e6ef1c7cf3333c4f34eaeb8058be87335860447eca43e992512d3e19df2"
          mutation_id: "sha256:58301a0b1dcb64ad16f8121845df757ea1bf3bfae2f739158f767aef3bc1ee31"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        preserve-kernel-verification-metadata:
          attempt: 1
          claim_id: "sha256:bf76bc6cf95e270641389891903f3aac145b5ac05b89bf30488f030ede258a5b"
          definition:
            contract_digest: "sha256:75ee71bf68ff60f98efb67b30fe57ec6854af11420e254f6b5cf9b20b58b8784"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Kernel operational projection source and focused tests"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
            expected_outputs:
              - "kernel-verification-projection-fix"
              - "kernel-verification-projection-regression-tests"
            id: "preserve-kernel-verification-metadata"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:e3d09300110cf0a572e6ef8829fdddb8307b5d22a25a4d861edf1e082d1c18f4"
    documents:
      contracts:
        sha256:75ee71bf68ff60f98efb67b30fe57ec6854af11420e254f6b5cf9b20b58b8784:
          acceptance_criteria:
            - "projectKernelOperationalEvidence does not rewrite state, attempts, updated_at, updated_by, or note for an existing passing verification record."
            - "ensureKernelOperationalProjectionStatus restores status and projection evidence without changing an existing verification record, including when the final-validation evidence digest changes."
            - "Focused tests demonstrate that verification metadata remains byte-for-byte equivalent across initial projection and later Kernel effect writes."
            - "Missing verification metadata keeps the existing compatibility fallback; no verification identity or fail-closed gate is weakened."
          objective: "Preserve the exact accepted task.verification metadata when creating or refreshing the Kernel operational projection, while retaining the existing fallback only when no verification metadata exists."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact."
        objective: "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure"
    events:
      -
        command_digest: "sha256:f1e007323449a7b3c95180da22e504269199e741d81949aa9abbb0d872c2b6a1"
        id: "capture:202609202207-HY96FB:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609202207-HY96FB"
        occurred_at: "2026-09-20T22:07:32.746Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609202207-HY96FB"
        task_revision: 1
      -
        command_digest: "sha256:5139f2ee997b3b3601520159a261a15e6b60b8f88563206f28e6173bddab4475"
        id: "result:sha256:52be7f125bc4f60d29e8fe34bb0814afdd992541c7362ca804c2eb4eb79e4e97:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:52be7f125bc4f60d29e8fe34bb0814afdd992541c7362ca804c2eb4eb79e4e97"
        occurred_at: "2026-09-20T22:08:23.294Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609202207-HY96FB"
        task_revision: 2
      -
        command_digest: "sha256:e230c18e3c142fe5b4e84f6802a3184162cd2aa3cec03224bd0535efabf81589"
        id: "sha256:58301a0b1dcb64ad16f8121845df757ea1bf3bfae2f739158f767aef3bc1ee31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:58301a0b1dcb64ad16f8121845df757ea1bf3bfae2f739158f767aef3bc1ee31"
        occurred_at: "2026-09-20T22:08:30.815Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609202207-HY96FB"
        task_revision: 3
      -
        command_digest: "sha256:4cc1fdad5078240e94fce818e51fe0b6cca74d35464462a6bd2a4e377c2051ac"
        id: "kernel_work_item_materialization_required:sha256:37317eb66628edb701ae58bcc910f19d9192ccb4d3fdd8a79d3f06f1967411ba:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:37317eb66628edb701ae58bcc910f19d9192ccb4d3fdd8a79d3f06f1967411ba:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T22:08:37.356Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609202207-HY96FB"
        task_revision: 4
      -
        command_digest: "sha256:349d524c59b0e9ea002f97010a5765fbe940ef831a21e5c92094feefd87f2d95"
        id: "kernel_work_item_claim_required:sha256:5e11dbd460be1b02c3c7da0a827087a865a0073f05e1e49c2433007a54ecd4c3:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5e11dbd460be1b02c3c7da0a827087a865a0073f05e1e49c2433007a54ecd4c3:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T22:08:41.384Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609202207-HY96FB"
        task_revision: 5
      -
        command_digest: "sha256:9ce3c36b33383cd81f8f8b7ad322dd848d82db85d5af9fbad3c1450a8821a3f3"
        id: "kernel_work_item_execution_required:sha256:7285fb9f40192ea39b0062c14decde58e7d26a7a2c76855acf53a9a954a8db01:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7285fb9f40192ea39b0062c14decde58e7d26a7a2c76855acf53a9a954a8db01:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T22:09:23.195Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609202207-HY96FB"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure

The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.

## Scope

- In scope: The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.
- Out of scope: unrelated refactors not required for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
