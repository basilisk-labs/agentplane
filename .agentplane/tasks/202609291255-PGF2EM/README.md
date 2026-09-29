---
id: "202609291255-PGF2EM"
title: "Recognize empty schema object staging directories during task scans"
status: "DOING"
priority: "med"
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
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-29T12:59:23.510Z"
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
      - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
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
      - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
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
          - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
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
      digest: "sha256:7552a33d54d804212c435da1d4f1b5b2262f857a977b6a4ed1be4c7c3c8a981f"
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
doc_updated_at: "2026-09-29T12:55:59.951Z"
doc_updated_by: "CODER"
description: "User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020."
sections:
  Summary: |-
    Recognize empty schema object staging directories during task scans

    User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.
  Scope: |-
    - In scope: User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.
    - Out of scope: unrelated refactors not required for "Recognize empty schema object staging directories during task scans".
  Plan: "1. Execute approved WorkItem recognize-schema-staging."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "4119c4342407fa28a7283521e2b0f87bbea5f243"
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
            digest: "sha256:875d17f01ae208cc086031811caec5cfd2c05dfeb28c141f5db7123c445b7619"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e8f6dcab3da2899e921cbb4397cd9936dcf7151cf061d32745eea3bb4c89c576"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:84f1a588449c4ad1b76bc36ae260cae9ed67085a02bef1496067302ef43e31d9"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
            task_id: "202609291255-PGF2EM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:84f1a588449c4ad1b76bc36ae260cae9ed67085a02bef1496067302ef43e31d9"
        digest: "sha256:e8f6dcab3da2899e921cbb4397cd9936dcf7151cf061d32745eea3bb4c89c576"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fa0158290019e5318ecc7d71fa74fdf7dc47bec76ed2a718d10704f929d692c1"
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
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
            expected_outputs:
              - "scanner-regression-fix"
            id: "recognize-schema-staging"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609291255-PGF2EM"
      intent_digest: "sha256:fff0454ffb02e228fb229f518ccc02f0a3ae266dea7357c4141c5193d1fe773a"
      migration_receipts: []
      mutation_receipts:
        capture:202609291255-PGF2EM:
          after_revision: 1
          aggregate_digest: "sha256:525b39fc7b0beaa19087abbd3068be632bf506140fd93573c42853e29307e189"
          before_revision: 0
          command_digest: "sha256:3d0bd6c3b95accbbcd97c40e999186745911fc7dc32b70188d01168e38203225"
          effect_ids: []
          event_digests:
            - "sha256:6d213b1b833504c503e8288ee02408b12706360db4942d75cda68028d7d5beff"
          mutation_id: "capture:202609291255-PGF2EM"
        kernel_work_item_claim_required:sha256:b423ac0c3f9931936792edaa8b7d1a627ea3af39fa3a8c5e80d137000e739bb4:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 5
          aggregate_digest: "sha256:3c3ed165daf4ed91b0d796e9e7a74e12ea0873138108ea4d8ade4396d7706b06"
          before_revision: 4
          command_digest: "sha256:2245c57dc63d5bd5ff7cc6b5ad5ec87bdf8d27f79fd07e448e5780d306c90508"
          effect_ids: []
          event_digests:
            - "sha256:fa7b6c84d21060a2fa6fa59e28f551cd219d3a80e21cb9b9e01c1f8534b34695"
          mutation_id: "kernel_work_item_claim_required:sha256:b423ac0c3f9931936792edaa8b7d1a627ea3af39fa3a8c5e80d137000e739bb4:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        kernel_work_item_execution_required:sha256:bb37f75b5eddf1f962a523bf98818c71fcc1182ec403689a165d1075d66717ba:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 6
          aggregate_digest: "sha256:7eac88b4fd27d4f932f23a0d4abb94ae9682d68ee1988cdf62de3348a89a8ec7"
          before_revision: 5
          command_digest: "sha256:fe0091c186c431c6c86b002da716b8d2de89e9da04b6b78a06a8785041ac4f92"
          effect_ids: []
          event_digests:
            - "sha256:fe7db866e8eed945025568bca541f77b493bc0307200efec970d8d94e8adc153"
          mutation_id: "kernel_work_item_execution_required:sha256:bb37f75b5eddf1f962a523bf98818c71fcc1182ec403689a165d1075d66717ba:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        kernel_work_item_materialization_required:sha256:d8708669db94bc1ef0a9777aa2a5438e466e6c2434702c5d323680168ff8b8da:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 4
          aggregate_digest: "sha256:1b946394076aca276c2c80b29e5548466db1aba21a8c833489f28db61fc6796b"
          before_revision: 3
          command_digest: "sha256:7fc9aa7f538a8627786f64f7bd2afed851a9e49bedea633f3ff4a49f70fe9111"
          effect_ids: []
          event_digests:
            - "sha256:40cf0541def4d94c7f9c4489b5980e8c3bc7d9f233a04ed0544f2f1d03d7e07c"
          mutation_id: "kernel_work_item_materialization_required:sha256:d8708669db94bc1ef0a9777aa2a5438e466e6c2434702c5d323680168ff8b8da:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        result:sha256:a85a9db4c0e2d091b51b61871a0f76e8ce84a811e401ac46a4a00b913670befe:
          after_revision: 2
          aggregate_digest: "sha256:3235b1821f34865ea552f4985223551229ee5878c55ce4b71f21e372dfb6ba72"
          before_revision: 1
          command_digest: "sha256:e4c7fa3f1a1d34b2ec2d80b943e93bf2f3611cd3e9fc01d09b0a63e48e3e3170"
          effect_ids: []
          event_digests:
            - "sha256:bc3bce1ca50e78df6d87b8da67b050f9aeb65ae8a3b3cfb4c52db6a7313a44fe"
          mutation_id: "result:sha256:a85a9db4c0e2d091b51b61871a0f76e8ce84a811e401ac46a4a00b913670befe"
        sha256:1494672ada3a51975db2ff0d94fed82cf0b269e80a135256c2be54aaa0a219ab:
          after_revision: 3
          aggregate_digest: "sha256:24f8629fa6943be520d00d3ebf6a92cc4bd357d8967ff64dd70742418a91989b"
          before_revision: 2
          command_digest: "sha256:5fea92a09d85647038f0abe400fbf2c8bbe687f22efb51cd26baf59410526fb3"
          effect_ids: []
          event_digests:
            - "sha256:673eca3ebcd86f793a5035983e0a1f145384a7f3c1ffdc41867587e41d70c8e1"
          mutation_id: "sha256:1494672ada3a51975db2ff0d94fed82cf0b269e80a135256c2be54aaa0a219ab"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        recognize-schema-staging:
          attempt: 1
          claim_id: "sha256:e2422f89485ae648442fb2868c009e386701964d6af8ce6a493bcb07600f0dd1"
          definition:
            contract_digest: "sha256:fa0158290019e5318ecc7d71fa74fdf7dc47bec76ed2a718d10704f929d692c1"
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
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
            expected_outputs:
              - "scanner-regression-fix"
            id: "recognize-schema-staging"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:1c4d1626e87de7aea72c943ebeebfb4f76aecba73ac595ad442a02c9a9fbee83"
    documents:
      contracts:
        sha256:fa0158290019e5318ecc7d71fa74fdf7dc47bec76ed2a718d10704f929d692c1:
          acceptance_criteria:
            - "A schema-only directory produced by the native evidence writer is excluded from tasks without scan warnings."
            - "Nonempty staging, symlinked staging, unknown siblings and invalid schemas remain warned on cold and warm scans."
            - "A present invalid README is never hidden by schema-only recognition."
            - "Focused backend and reconciliation tests plus typecheck pass."
          objective: "Allow the optional empty real .staging directory alongside schema-only sha256 objects. Preserve warnings for nonempty staging, symlinks, unknown siblings, corrupt objects and unreadable README. Add a regression using putEvaluatorEvidenceObject and cold/warm list coverage. Do not delete artifacts or relax digest/containment checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run --config vitest.config.ts --maxWorkers=2 packages/agentplane/src/backends/task-backend.local-handoff.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts"
            - "bun run typecheck"
      intent:
        context: "User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020."
        objective: "Recognize empty schema object staging directories during task scans"
    events:
      -
        command_digest: "sha256:3d0bd6c3b95accbbcd97c40e999186745911fc7dc32b70188d01168e38203225"
        id: "capture:202609291255-PGF2EM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609291255-PGF2EM"
        occurred_at: "2026-09-29T12:55:59.891Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609291255-PGF2EM"
        task_revision: 1
      -
        command_digest: "sha256:e4c7fa3f1a1d34b2ec2d80b943e93bf2f3611cd3e9fc01d09b0a63e48e3e3170"
        id: "result:sha256:a85a9db4c0e2d091b51b61871a0f76e8ce84a811e401ac46a4a00b913670befe:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:a85a9db4c0e2d091b51b61871a0f76e8ce84a811e401ac46a4a00b913670befe"
        occurred_at: "2026-09-29T12:58:59.915Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609291255-PGF2EM"
        task_revision: 2
      -
        command_digest: "sha256:5fea92a09d85647038f0abe400fbf2c8bbe687f22efb51cd26baf59410526fb3"
        id: "sha256:1494672ada3a51975db2ff0d94fed82cf0b269e80a135256c2be54aaa0a219ab:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1494672ada3a51975db2ff0d94fed82cf0b269e80a135256c2be54aaa0a219ab"
        occurred_at: "2026-09-29T12:59:13.774Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609291255-PGF2EM"
        task_revision: 3
      -
        command_digest: "sha256:7fc9aa7f538a8627786f64f7bd2afed851a9e49bedea633f3ff4a49f70fe9111"
        id: "kernel_work_item_materialization_required:sha256:d8708669db94bc1ef0a9777aa2a5438e466e6c2434702c5d323680168ff8b8da:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:d8708669db94bc1ef0a9777aa2a5438e466e6c2434702c5d323680168ff8b8da:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T12:59:29.895Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609291255-PGF2EM"
        task_revision: 4
      -
        command_digest: "sha256:2245c57dc63d5bd5ff7cc6b5ad5ec87bdf8d27f79fd07e448e5780d306c90508"
        id: "kernel_work_item_claim_required:sha256:b423ac0c3f9931936792edaa8b7d1a627ea3af39fa3a8c5e80d137000e739bb4:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b423ac0c3f9931936792edaa8b7d1a627ea3af39fa3a8c5e80d137000e739bb4:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T12:59:48.788Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609291255-PGF2EM"
        task_revision: 5
      -
        command_digest: "sha256:fe0091c186c431c6c86b002da716b8d2de89e9da04b6b78a06a8785041ac4f92"
        id: "kernel_work_item_execution_required:sha256:bb37f75b5eddf1f962a523bf98818c71fcc1182ec403689a165d1075d66717ba:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bb37f75b5eddf1f962a523bf98818c71fcc1182ec403689a165d1075d66717ba:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T13:00:37.037Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609291255-PGF2EM"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recognize empty schema object staging directories during task scans

User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.

## Scope

- In scope: User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.
- Out of scope: unrelated refactors not required for "Recognize empty schema object staging directories during task scans".

## Plan

1. Execute approved WorkItem recognize-schema-staging.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
