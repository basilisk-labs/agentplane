---
id: "202610222233-X2FBX2"
title: "Reject malformed persisted operational projections for PR #6158"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "issue-6158"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bunx eslint packages/agentplane/src/commands/task/kernel-operational-projection.ts packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-22T22:35:32.211Z"
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
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
          - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
      digest: "sha256:ba513219bcf323f966985c18df00d271c6b79b3095d9738b3812b8538aa1af03"
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
doc_updated_at: "2026-10-22T22:34:09.835Z"
doc_updated_by: "CODER"
description: "P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes."
sections:
  Summary: |-
    Reject malformed persisted operational projections for PR #6158

    P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.
  Scope: |-
    - In scope: P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.
    - Out of scope: unrelated refactors not required for "Reject malformed persisted operational projections for PR #6158".
  Plan: "1. Execute approved WorkItem validate-persisted-projection."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx eslint packages/agentplane/src/commands/task/kernel-operational-projection.ts packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_ref: "agentplane/A3NC2N-frozen-base"
    base_sha: "8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
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
            digest: "sha256:85079f67787dd40daf9e004355351cb6ecf2b8cc2b8a1387b9ed0b173d892d50"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:34c95fa1305f300ab28a47ecade06033a07e819ee3d266cb8ace9383db7bb153"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9594871fe2cb6ea740665a9745dec27ac80f6486580321bd739e6fd2669b9052"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
            task_id: "202610222233-X2FBX2"
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
        approval_evidence_digest: "sha256:9594871fe2cb6ea740665a9745dec27ac80f6486580321bd739e6fd2669b9052"
        digest: "sha256:34c95fa1305f300ab28a47ecade06033a07e819ee3d266cb8ace9383db7bb153"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6727141076a548b98e9874b2c075e954ef0c7357c097b0c6871363ad11e394aa"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            expected_outputs:
              - "validated-projection-output"
            id: "validate-persisted-projection"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610222233-X2FBX2"
      intent_digest: "sha256:c8b3c1d5c0e404065505bd54c14c4c04ceaf6480859b2721d515ee9a271558d8"
      migration_receipts: []
      mutation_receipts:
        capture:202610222233-X2FBX2:
          after_revision: 1
          aggregate_digest: "sha256:86a010372e09b9382a7b54d0589d38acf00eee59bdb07737cac2152312065487"
          before_revision: 0
          command_digest: "sha256:131b84a7e48eadcabe3fa7e1a4211927071008b9adb1a5bf2952086660349931"
          effect_ids: []
          event_digests:
            - "sha256:51f7e5b4acaedd49b5120eca0e2c1654f65c43ddeba371625bf8b7d0d654f1eb"
          mutation_id: "capture:202610222233-X2FBX2"
        kernel_work_item_claim_required:sha256:8d511b8ebea4c13512c6087ca1449172f2b3a270c5e49345dc845ebe37985dd2:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:
          after_revision: 5
          aggregate_digest: "sha256:a0bbb71c217718da7a5d21bb0dd24f3d39407880b6ac5fdc343a35e1fa246a2c"
          before_revision: 4
          command_digest: "sha256:39082953cda72e3032a6e7d201bd39209de5787d7553a9c5986a542c67ee152d"
          effect_ids: []
          event_digests:
            - "sha256:52744fbe2ebd65fec6749d6627a459364f3fe62868bb31e77de13ccf8b43e080"
          mutation_id: "kernel_work_item_claim_required:sha256:8d511b8ebea4c13512c6087ca1449172f2b3a270c5e49345dc845ebe37985dd2:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        kernel_work_item_execution_required:sha256:3a3d6ac1c36b6edcd0ac894cfff72f65a8c5b4fea379d9c28318e68c1415ad78:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:
          after_revision: 6
          aggregate_digest: "sha256:6f56cd734bc62449496cb5eab79c7567ff717d437b2ea5022c3dbf256ced530b"
          before_revision: 5
          command_digest: "sha256:82b1d359631496c5619f12954a409aa3808ba156ffbefd1aad0d7b573873db7a"
          effect_ids: []
          event_digests:
            - "sha256:da43debbc243ef8a00ec8ae6a80f591e010c5264e922de69780392f290e58b48"
          mutation_id: "kernel_work_item_execution_required:sha256:3a3d6ac1c36b6edcd0ac894cfff72f65a8c5b4fea379d9c28318e68c1415ad78:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        kernel_work_item_materialization_required:sha256:693241b4fe55a61b84f51f30dd38120fc22f88592ddce5e641e6d905edda55c3:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:
          after_revision: 4
          aggregate_digest: "sha256:656c2ec56bf24898ea29d26a6b4816bd5958da9b80df60beb8a928926fee8366"
          before_revision: 3
          command_digest: "sha256:2b77ba1df2586eb6e6f92b56eb788bd0aebf71ec06fe5b6b1a2951de3a5efba9"
          effect_ids: []
          event_digests:
            - "sha256:2bf548e330c95c209ab76683269c5d0253679c7aabbf5c177bd4ae2f248cd1fb"
          mutation_id: "kernel_work_item_materialization_required:sha256:693241b4fe55a61b84f51f30dd38120fc22f88592ddce5e641e6d905edda55c3:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        result:sha256:c1138465563aa69524ffb5025c68e4eb9e623dba361684d7239ec808b352597e:
          after_revision: 2
          aggregate_digest: "sha256:d23a8cf3e9d9d27a8cc228d530a69fc27236d5896c0e2c91ac31ca5fb94982e1"
          before_revision: 1
          command_digest: "sha256:bfc0d814e5ccf4c9f4f73a1740346197ba3b08a8cc081a9352eb2550375eb023"
          effect_ids: []
          event_digests:
            - "sha256:d4f713c2cadf17e38b79ef285774e297a0d7e5fa7b6d3ca3d635c05eac81b22e"
          mutation_id: "result:sha256:c1138465563aa69524ffb5025c68e4eb9e623dba361684d7239ec808b352597e"
        sha256:a96b4fe66b898cf88273781b82613d0929136ae320d1c15dc2c8b4ad412d61f4:
          after_revision: 3
          aggregate_digest: "sha256:b308d4d563710da718fd3542453e9f005079fea9c9f767c4df50f8f04740173c"
          before_revision: 2
          command_digest: "sha256:99d6c50878bf2133b67f5152909ccf0aa0e9411d0c30bd0eedef151d964ace5e"
          effect_ids: []
          event_digests:
            - "sha256:98b9a6faad63045b02064495eabf1ab555589e2d5a57759c48b3e281d41f4da2"
          mutation_id: "sha256:a96b4fe66b898cf88273781b82613d0929136ae320d1c15dc2c8b4ad412d61f4"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        validate-persisted-projection:
          attempt: 1
          claim_id: "sha256:a073289892011cba189c990a6fe26251d4b84711819b97d754a0b557d4fed979"
          definition:
            contract_digest: "sha256:6727141076a548b98e9874b2c075e954ef0c7357c097b0c6871363ad11e394aa"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            expected_outputs:
              - "validated-projection-output"
            id: "validate-persisted-projection"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:fd97afecb74426e5a435f411a09b8c5e88323542d9ff05d37ed9b7b89105d5d3"
    documents:
      contracts:
        sha256:6727141076a548b98e9874b2c075e954ef0c7357c097b0c6871363ad11e394aa:
          acceptance_criteria:
            - "A recomputed digest does not make an object with missing or wrong-type required fields readable as a Projection."
            - "Recovery repairs or rejects malformed persisted projection rather than returning unchanged, including on a repeated recovery call."
            - "Existing valid normalized review and recovery behavior remains stable; only the three scoped files change."
          objective: "Reject persisted operational projections with missing or wrong-type required fields before trusting their digest, while retaining idempotence for valid normalized review readback."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            - "bunx eslint packages/agentplane/src/commands/task/kernel-operational-projection.ts packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      intent:
        context: "P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes."
        objective: "Reject malformed persisted operational projections for PR #6158"
    events:
      -
        command_digest: "sha256:131b84a7e48eadcabe3fa7e1a4211927071008b9adb1a5bf2952086660349931"
        id: "capture:202610222233-X2FBX2:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610222233-X2FBX2"
        occurred_at: "2026-10-22T22:34:09.726Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610222233-X2FBX2"
        task_revision: 1
      -
        command_digest: "sha256:bfc0d814e5ccf4c9f4f73a1740346197ba3b08a8cc081a9352eb2550375eb023"
        id: "result:sha256:c1138465563aa69524ffb5025c68e4eb9e623dba361684d7239ec808b352597e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:c1138465563aa69524ffb5025c68e4eb9e623dba361684d7239ec808b352597e"
        occurred_at: "2026-10-22T22:35:07.133Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610222233-X2FBX2"
        task_revision: 2
      -
        command_digest: "sha256:99d6c50878bf2133b67f5152909ccf0aa0e9411d0c30bd0eedef151d964ace5e"
        id: "sha256:a96b4fe66b898cf88273781b82613d0929136ae320d1c15dc2c8b4ad412d61f4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a96b4fe66b898cf88273781b82613d0929136ae320d1c15dc2c8b4ad412d61f4"
        occurred_at: "2026-10-22T22:35:21.450Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610222233-X2FBX2"
        task_revision: 3
      -
        command_digest: "sha256:2b77ba1df2586eb6e6f92b56eb788bd0aebf71ec06fe5b6b1a2951de3a5efba9"
        id: "kernel_work_item_materialization_required:sha256:693241b4fe55a61b84f51f30dd38120fc22f88592ddce5e641e6d905edda55c3:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:693241b4fe55a61b84f51f30dd38120fc22f88592ddce5e641e6d905edda55c3:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        occurred_at: "2026-10-22T22:35:36.205Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610222233-X2FBX2"
        task_revision: 4
      -
        command_digest: "sha256:39082953cda72e3032a6e7d201bd39209de5787d7553a9c5986a542c67ee152d"
        id: "kernel_work_item_claim_required:sha256:8d511b8ebea4c13512c6087ca1449172f2b3a270c5e49345dc845ebe37985dd2:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8d511b8ebea4c13512c6087ca1449172f2b3a270c5e49345dc845ebe37985dd2:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        occurred_at: "2026-10-22T22:35:54.003Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610222233-X2FBX2"
        task_revision: 5
      -
        command_digest: "sha256:82b1d359631496c5619f12954a409aa3808ba156ffbefd1aad0d7b573873db7a"
        id: "kernel_work_item_execution_required:sha256:3a3d6ac1c36b6edcd0ac894cfff72f65a8c5b4fea379d9c28318e68c1415ad78:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3a3d6ac1c36b6edcd0ac894cfff72f65a8c5b4fea379d9c28318e68c1415ad78:sha256:bb9a010a61b5fa11fa91acc5f6b49c5cf72dfd129d9b457ff8c7b8cabb608b76"
        occurred_at: "2026-10-22T22:36:51.633Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610222233-X2FBX2"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Reject malformed persisted operational projections for PR #6158

P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.

## Scope

- In scope: P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.
- Out of scope: unrelated refactors not required for "Reject malformed persisted operational projections for PR #6158".

## Plan

1. Execute approved WorkItem validate-persisted-projection.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx eslint packages/agentplane/src/commands/task/kernel-operational-projection.ts packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
