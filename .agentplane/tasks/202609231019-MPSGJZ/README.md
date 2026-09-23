---
id: "202609231019-MPSGJZ"
title: "Fix canonical completed-task branch lifecycle recovery without internal provider work items"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T10:22:03.915Z"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
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
    - "repository_branch_pr_floor"
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
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
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
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-23T10:19:46.771Z"
doc_updated_by: "CODER"
description: "Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks."
sections:
  Summary: |-
    Fix canonical completed-task branch lifecycle recovery without internal provider work items

    Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
  Scope: |-
    - In scope: Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
    - Out of scope: unrelated refactors not required for "Fix canonical completed-task branch lifecycle recovery without internal provider work items".
  Plan: "1. Execute approved WorkItem implement-lifecycle-recovery."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "a2104636fe2522ebdcd79ce32e5ba59f23241a6f"
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
            digest: "sha256:d0c468fcf9f1e0dfa5275059e3bd34867c1cdd13374fcac76e12b07afcb2f4ca"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b35abeeb010e2c596c7e631a6874801d8139e099435386fa2c1321716a7edde4"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-completed-branch-supervisor"
              - "codex-output-schema"
              - "runner-rework-authority"
              - "supervisor-journal-recovery"
              - "task-lifecycle-hardening"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/adapters"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
            task_id: "202609231019-MPSGJZ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:b35abeeb010e2c596c7e631a6874801d8139e099435386fa2c1321716a7edde4"
        digest: "sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-completed-branch-supervisor"
                - "supervisor-journal-recovery"
                - "runner-rework-authority"
                - "codex-output-schema"
                - "task-lifecycle-hardening"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/runner/adapters"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "lifecycle-recovery-source"
              - "lifecycle-recovery-regression-tests"
            id: "implement-lifecycle-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609231019-MPSGJZ"
      intent_digest: "sha256:d5a94ede9c60c35d031e28d2b00066e55244c127a9956963194d97666de2022b"
      migration_receipts: []
      mutation_receipts:
        capture:202609231019-MPSGJZ:
          after_revision: 1
          aggregate_digest: "sha256:6d7a8daac801f74dcde4e6026b4cd503df796c1d2c3888dcf7a6547068064254"
          before_revision: 0
          command_digest: "sha256:66a0984986af953894e8fac677a08f3e9595aa8d5c4ac7fa90bef219d4454c3e"
          effect_ids: []
          event_digests:
            - "sha256:076b179f363a241590367095067760f3f6c646047c329430b270aa823daccf1a"
          mutation_id: "capture:202609231019-MPSGJZ"
        kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:e02390cd1b133d95049985daae4b0d001594af94d629e07e23c2729033774731"
          before_revision: 4
          command_digest: "sha256:35595c91d5dd1253c419658209f28949a935158515201e668b9590e12d7f893d"
          effect_ids: []
          event_digests:
            - "sha256:394f8edc8f8ea8766989990e9de1fd4c0c00d0a9ba3f04641ae180d130cba1ed"
          mutation_id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:72fd6766e910d8f2a2a41d5919aa5ffc602ed1659b737bbc2e4fad9047cccc4a"
          before_revision: 5
          command_digest: "sha256:22fe1774914db32ef10228d9a74518eaac8f5e7b2970db5df4a768a44dd30def"
          effect_ids: []
          event_digests:
            - "sha256:ce5649738c5309700eafe1c855242a290b993e8db00796c7e87291ec3b102614"
          mutation_id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:02617458207d1168220950685df6b7d735bb58c2ffadf8bea29ff6141fa4bc63"
          before_revision: 3
          command_digest: "sha256:78eba9212ab26106e5fadfbced8fe91af3d04162c073b446d6f57f137af1a327"
          effect_ids: []
          event_digests:
            - "sha256:8456e457742745d336a63fbec696c6eb067c1397032ce4ea8a7cea6a03f9beda"
          mutation_id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff:
          after_revision: 2
          aggregate_digest: "sha256:85310d6e0e3cdba44785270c2e551b1dbd5aeebae51162cd3b3ebdd12578fffd"
          before_revision: 1
          command_digest: "sha256:b26b496b1691c3346b7cf5257bd137f007e36b53622fc9a49c7ab0c5496be846"
          effect_ids: []
          event_digests:
            - "sha256:c02edb1d3dde4b872821dd818096a92455a8b7970adf01d556b8d9caae5911ab"
          mutation_id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff"
        sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2:
          after_revision: 3
          aggregate_digest: "sha256:aa417efb109b227517746929acfb150e2bddd5e656d3747c7f8462e5c7175df3"
          before_revision: 2
          command_digest: "sha256:14c972b47a12f2c709e2a907b183093ea5a14d4cb96ad8583d923757aaba9693"
          effect_ids: []
          event_digests:
            - "sha256:f65a30c683b1296e09a412d69734ad74f7427a08667c5f0defa29276a0bf4e5b"
          mutation_id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        implement-lifecycle-recovery:
          attempt: 1
          claim_id: "sha256:2cb3992c12c640d347953ba5bb5cfa2ff1950c5e2c868ff614bfecf6e159d192"
          definition:
            contract_digest: "sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-completed-branch-supervisor"
                - "supervisor-journal-recovery"
                - "runner-rework-authority"
                - "codex-output-schema"
                - "task-lifecycle-hardening"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/runner/adapters"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "lifecycle-recovery-source"
              - "lifecycle-recovery-regression-tests"
            id: "implement-lifecycle-recovery"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:98d3c5666ffa3e094e391d0e7c6a6e6e7853b43d70c45de396616ce7dff7b06a"
    documents:
      contracts:
        sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c:
          acceptance_criteria:
            - "Semantic WorkItems cannot claim PR publication, hosted checks, merge, hosted close, cleanup, or equivalent provider lifecycle effects."
            - "Host decision parsing, shell-safe text input, accepted-result replay, task revision binding, pre-effect recovery, and repeat cleanup preserve fail-closed behavior with focused tests."
            - "Completed canonical branch tasks route implementation rework, verification, and quality review through the authoritative task checkout."
            - "Branch supervisor replacement and stale-state recovery preserve exact failed-operation identity and never replay an uncertain effect."
            - "An exact implementation_rework WorkOrder may execute against a DONE task without reopening the completed Task Kernel aggregate."
            - "integration.enqueue and integration.run_next execute from the frozen base checkout without controller transfer after canonical completion."
            - "Codex role-specific output schemas contain no unsupported composition keywords and satisfy strict required-property rules."
            - "The branch contains no task artifacts owned by earlier tasks."
          objective: "Implement the verified 0.7.11 lifecycle hardening and completed-task branch supervisor fixes on one clean branch without internal provider lifecycle work items."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks."
        objective: "Fix canonical completed-task branch lifecycle recovery without internal provider work items"
    events:
      -
        command_digest: "sha256:66a0984986af953894e8fac677a08f3e9595aa8d5c4ac7fa90bef219d4454c3e"
        id: "capture:202609231019-MPSGJZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231019-MPSGJZ"
        occurred_at: "2026-09-23T10:19:46.741Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231019-MPSGJZ"
        task_revision: 1
      -
        command_digest: "sha256:b26b496b1691c3346b7cf5257bd137f007e36b53622fc9a49c7ab0c5496be846"
        id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff"
        occurred_at: "2026-09-23T10:21:54.545Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231019-MPSGJZ"
        task_revision: 2
      -
        command_digest: "sha256:14c972b47a12f2c709e2a907b183093ea5a14d4cb96ad8583d923757aaba9693"
        id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2"
        occurred_at: "2026-09-23T10:22:03.013Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231019-MPSGJZ"
        task_revision: 3
      -
        command_digest: "sha256:78eba9212ab26106e5fadfbced8fe91af3d04162c073b446d6f57f137af1a327"
        id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:14.045Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231019-MPSGJZ"
        task_revision: 4
      -
        command_digest: "sha256:35595c91d5dd1253c419658209f28949a935158515201e668b9590e12d7f893d"
        id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:17.742Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231019-MPSGJZ"
        task_revision: 5
      -
        command_digest: "sha256:22fe1774914db32ef10228d9a74518eaac8f5e7b2970db5df4a768a44dd30def"
        id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:32.554Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231019-MPSGJZ"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix canonical completed-task branch lifecycle recovery without internal provider work items

Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.

## Scope

- In scope: Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
- Out of scope: unrelated refactors not required for "Fix canonical completed-task branch lifecycle recovery without internal provider work items".

## Plan

1. Execute approved WorkItem implement-lifecycle-recovery.

## Verify Steps

PLANNER fallback scaffold for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
