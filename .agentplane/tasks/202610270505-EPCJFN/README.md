---
id: "202610270505-EPCJFN"
title: "Authenticate retained native validation across approved Plan corrections"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run --filter=agentplane test -- kernel-recovery-evidence.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T05:07:10.460Z"
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
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:8c8c0504745b4dd4839a7aa4d9a7b4c4a2008d9a19b17f4d2a89527791baaf97"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-27T05:06:00.705Z"
doc_updated_by: "CODER"
description: "Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions."
sections:
  Summary: |-
    Authenticate retained native validation across approved Plan corrections

    Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.
  Scope: |-
    - In scope: Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.
    - Out of scope: unrelated refactors not required for "Authenticate retained native validation across approved Plan corrections".
  Plan: "1. Execute approved WorkItem native-validation-plan-correction-recovery."
  Verify Steps: |-
    PLANNER fallback scaffold for "Authenticate retained native validation across approved Plan corrections". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Authenticate retained native validation across approved Plan corrections". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "a4b1534f06f52d10ae96e437a99514abe2629f52"
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
            digest: "sha256:e20df0e74be56789cb718a77797227c029ac4f4ecf5d660f36e9c3012d91cff3"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:46c1558656396ee6997ed2a6ca72bc9f8a32fd6b99e42dd4ea1376d21d22fab4"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6e92e1ea39f7e7ecd32756f9942339b41b5af372d7efd71724802c606e8561b9"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
            task_id: "202610270505-EPCJFN"
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
        approval_evidence_digest: "sha256:6e92e1ea39f7e7ecd32756f9942339b41b5af372d7efd71724802c606e8561b9"
        digest: "sha256:46c1558656396ee6997ed2a6ca72bc9f8a32fd6b99e42dd4ea1376d21d22fab4"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b74f8ea0d912960590b4981a4b06b0da8272fb4eb2cd98e7a4f9299d147822f7"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
            expected_outputs:
              - "lineage-aware-native-recovery"
              - "regression-tests"
              - "verification-evidence"
            id: "native-validation-plan-correction-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610270505-EPCJFN"
      intent_digest: "sha256:6362515079d39b5879f82993868d2e51b60b6042ea369e037b66b21337735aac"
      migration_receipts: []
      mutation_receipts:
        capture:202610270505-EPCJFN:
          after_revision: 1
          aggregate_digest: "sha256:48ead60dfb2a0b06aa0f61c1eee04f7bf30a55b9b2ebe449405e9c06cc2f8474"
          before_revision: 0
          command_digest: "sha256:fb6dfd035507116672dda3ae8687f3757fe1d1cc35d3d3d084b88d58141def18"
          effect_ids: []
          event_digests:
            - "sha256:3c4bcb181ddc5c9606f7b15eb0b3b5293eb4749795feca32ea924ed9eb2c7d43"
          mutation_id: "capture:202610270505-EPCJFN"
        kernel_work_item_claim_required:sha256:acd484d8daf08b71373cf6d889276468128b741adead658eaa9fe3b72f71da07:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 5
          aggregate_digest: "sha256:2efa202504954ecc0d1206ee88f88a6db626f59b7993da16541806fd23c337ff"
          before_revision: 4
          command_digest: "sha256:2d454fd5c95c6a24b54eb235a494e1d1e831daae87d8d049b3ebb6c8c94bf975"
          effect_ids: []
          event_digests:
            - "sha256:8818beeef7f39771f24712df29f2939973b5e4161dce46a0f725d2275a6881a0"
          mutation_id: "kernel_work_item_claim_required:sha256:acd484d8daf08b71373cf6d889276468128b741adead658eaa9fe3b72f71da07:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:1ccfd75a5e39c6c547569468f538fc509fda586e9b19a313d5173b2697edefb7:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 6
          aggregate_digest: "sha256:f43b333a9060839caec2b45ce679aae8706b5ad41d2ba9a424f8d5d20474cc74"
          before_revision: 5
          command_digest: "sha256:5ff69904fbe9386714daabe1558b436b84d032bf08a95b11630ccf9d64e4fe7f"
          effect_ids: []
          event_digests:
            - "sha256:cc46abb0c63ad6201088096ae8c45310edaa409203223c1465b56d91812cde06"
          mutation_id: "kernel_work_item_execution_required:sha256:1ccfd75a5e39c6c547569468f538fc509fda586e9b19a313d5173b2697edefb7:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_materialization_required:sha256:7c29b9f129c0a460acc1459f0a77bc927a859f4114019ddd91d9b6d13ea8348f:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 4
          aggregate_digest: "sha256:25134698bb6b259fe0b763e92e212fb07a965fd25cce0543562dfbb56a080b3a"
          before_revision: 3
          command_digest: "sha256:1d0ac32bc77f1df4eb87662aaa706bb5514b24e5196bcf810f28fa20ad817f7e"
          effect_ids: []
          event_digests:
            - "sha256:d69b4375b71228f084312a8e891047f12cccf66ca7da33263658dcc173b8f938"
          mutation_id: "kernel_work_item_materialization_required:sha256:7c29b9f129c0a460acc1459f0a77bc927a859f4114019ddd91d9b6d13ea8348f:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        result:sha256:ea4f436554c737f436fca3863cc2e13f762b212ed49373cb7186f0d508b400d0:
          after_revision: 2
          aggregate_digest: "sha256:9b398312c182d20cf8a26370302367e9e3440b347a10d78f3e61f17acf72b270"
          before_revision: 1
          command_digest: "sha256:abbf7e62bf28a75a459c050f506574a4c272849bcad2b33b6b8f6afdca88519d"
          effect_ids: []
          event_digests:
            - "sha256:83fce8e7a1a498ce91f4d179cc2830059ea373a942edecb4b67d181487798d58"
          mutation_id: "result:sha256:ea4f436554c737f436fca3863cc2e13f762b212ed49373cb7186f0d508b400d0"
        sha256:0cfbdd85b82b8f5319efd10827c9da7f3ec1989d8a4a85e988a542efe1886f8a:
          after_revision: 3
          aggregate_digest: "sha256:ca3da3bb21eba397c69e912b49b5ccbef9f019525d34fb3f38687882468090d4"
          before_revision: 2
          command_digest: "sha256:425d1b603f77a5557b646fdb36248ac3fa5fda00af7681a04d4bb3def1369932"
          effect_ids: []
          event_digests:
            - "sha256:1d6c90374945aa1084c237e5e77ed3671700ac2d7e69e91ba66babc04fdefde8"
          mutation_id: "sha256:0cfbdd85b82b8f5319efd10827c9da7f3ec1989d8a4a85e988a542efe1886f8a"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        native-validation-plan-correction-recovery:
          attempt: 1
          claim_id: "sha256:4ce0c09e3a8351b8b0a9d762418a80607eb01a2b90ee54dd3874b178b46b9abe"
          definition:
            contract_digest: "sha256:b74f8ea0d912960590b4981a4b06b0da8272fb4eb2cd98e7a4f9299d147822f7"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
            expected_outputs:
              - "lineage-aware-native-recovery"
              - "regression-tests"
              - "verification-evidence"
            id: "native-validation-plan-correction-recovery"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:668dff9da84546efe7f4365bd8d4112f8b7df3337606be8a01de5afe7e2aa628"
    documents:
      contracts:
        sha256:b74f8ea0d912960590b4981a4b06b0da8272fb4eb2cd98e7a4f9299d147822f7:
          acceptance_criteria:
            - "Retained implementation WorkOrder, semantic result, native validation and applied command are authenticated against their historical Plan and exact receipt; no stale historical evidence is accepted merely because a digest appears in plan_history."
            - "When the current approved Plan differs, every intervening amendment is proven by native events, receipts, USER approval evidence and authority lineage, with the same work item and valid successor contract; missing, tampered, unapproved or unrelated transitions are rejected."
            - "Recovery preserves the original BLOCKED validation and USER resume receipt and issues a new bounded implementation WorkOrder under the amended approved Plan; the original Plan case remains valid."
            - "Focused regression tests cover authentic amendment, missing/tampered historical WorkOrder, forged or stale plan lineage, changed task/work item/claim/receipt, and unchanged-plan compatibility."
          objective: "Authenticate a retained native BLOCKED validation against its original issued WorkOrder and Plan, then permit recovery under a later USER-approved Plan amendment only after verifying the complete native amendment lineage and unchanged task, work item, claim and receipt bindings. Preserve the old validation bytes and ordinary current-plan checks for the new WorkOrder."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions."
        objective: "Authenticate retained native validation across approved Plan corrections"
    events:
      -
        command_digest: "sha256:fb6dfd035507116672dda3ae8687f3757fe1d1cc35d3d3d084b88d58141def18"
        id: "capture:202610270505-EPCJFN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610270505-EPCJFN"
        occurred_at: "2026-10-27T05:06:00.582Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610270505-EPCJFN"
        task_revision: 1
      -
        command_digest: "sha256:abbf7e62bf28a75a459c050f506574a4c272849bcad2b33b6b8f6afdca88519d"
        id: "result:sha256:ea4f436554c737f436fca3863cc2e13f762b212ed49373cb7186f0d508b400d0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ea4f436554c737f436fca3863cc2e13f762b212ed49373cb7186f0d508b400d0"
        occurred_at: "2026-10-27T05:06:48.935Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610270505-EPCJFN"
        task_revision: 2
      -
        command_digest: "sha256:425d1b603f77a5557b646fdb36248ac3fa5fda00af7681a04d4bb3def1369932"
        id: "sha256:0cfbdd85b82b8f5319efd10827c9da7f3ec1989d8a4a85e988a542efe1886f8a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0cfbdd85b82b8f5319efd10827c9da7f3ec1989d8a4a85e988a542efe1886f8a"
        occurred_at: "2026-10-27T05:07:03.913Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610270505-EPCJFN"
        task_revision: 3
      -
        command_digest: "sha256:1d0ac32bc77f1df4eb87662aaa706bb5514b24e5196bcf810f28fa20ad817f7e"
        id: "kernel_work_item_materialization_required:sha256:7c29b9f129c0a460acc1459f0a77bc927a859f4114019ddd91d9b6d13ea8348f:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:7c29b9f129c0a460acc1459f0a77bc927a859f4114019ddd91d9b6d13ea8348f:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T05:07:15.703Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610270505-EPCJFN"
        task_revision: 4
      -
        command_digest: "sha256:2d454fd5c95c6a24b54eb235a494e1d1e831daae87d8d049b3ebb6c8c94bf975"
        id: "kernel_work_item_claim_required:sha256:acd484d8daf08b71373cf6d889276468128b741adead658eaa9fe3b72f71da07:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:acd484d8daf08b71373cf6d889276468128b741adead658eaa9fe3b72f71da07:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T05:07:34.367Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610270505-EPCJFN"
        task_revision: 5
      -
        command_digest: "sha256:5ff69904fbe9386714daabe1558b436b84d032bf08a95b11630ccf9d64e4fe7f"
        id: "kernel_work_item_execution_required:sha256:1ccfd75a5e39c6c547569468f538fc509fda586e9b19a313d5173b2697edefb7:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1ccfd75a5e39c6c547569468f538fc509fda586e9b19a313d5173b2697edefb7:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T05:08:25.577Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610270505-EPCJFN"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Authenticate retained native validation across approved Plan corrections

Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.

## Scope

- In scope: Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.
- Out of scope: unrelated refactors not required for "Authenticate retained native validation across approved Plan corrections".

## Plan

1. Execute approved WorkItem native-validation-plan-correction-recovery.

## Verify Steps

PLANNER fallback scaffold for "Authenticate retained native validation across approved Plan corrections". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Authenticate retained native validation across approved Plan corrections". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
