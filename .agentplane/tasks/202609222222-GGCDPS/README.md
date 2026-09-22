---
id: "202609222222-GGCDPS"
title: "Run canonical post-completion integration operations from the authoritative base checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T22:24:56.135Z"
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
doc_updated_at: "2026-09-22T22:22:52.010Z"
doc_updated_by: "CODER"
description: "Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations."
sections:
  Summary: |-
    Run canonical post-completion integration operations from the authoritative base checkout

    Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
  Scope: |-
    - In scope: Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
    - Out of scope: unrelated refactors not required for "Run canonical post-completion integration operations from the authoritative base checkout".
  Plan: "1. Execute approved WorkItem route-canonical-integration-to-base."
  Verify Steps: |-
    PLANNER fallback scaffold for "Run canonical post-completion integration operations from the authoritative base checkout". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Run canonical post-completion integration operations from the authoritative base checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "task/202609221053-GMZJ6N/canonical-provider-lifecycle"
    base_sha: "23d16a9d2a0471268f921502d5ba233d4a53451e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9652c98d0f62b2eb669ff1823ea8345488544a4b614f5f248a278e8b6a14732c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609222222-GGCDPS"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:987d4e6ea69a3b25a0112e986f4ac54a956b314b650740deb40b6e9cf3b6c5c2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9652c98d0f62b2eb669ff1823ea8345488544a4b614f5f248a278e8b6a14732c"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609222222-GGCDPS"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
            evidence_digest: "sha256:56a9838bb7e87bce7c35f529f45b5068f31d05242de8c0625f0e29d5b993f0a9"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
        digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-integration-base-source"
              - "canonical-integration-base-tests"
            id: "route-canonical-integration-to-base"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609222222-GGCDPS"
      intent_digest: "sha256:916a15918a167521ac7c0a0acd41427f8e9bd644e7340edc38d6967c756fa829"
      migration_receipts: []
      mutation_receipts:
        capture:202609222222-GGCDPS:
          after_revision: 1
          aggregate_digest: "sha256:5775b35697e150bb336b037495bbf5289a7ad46dfbb998c6f6dbffff9b306207"
          before_revision: 0
          command_digest: "sha256:4c33aaaeca686e4296665134234dc249c96352b1e1f48a8fd042ab33b2ed9929"
          effect_ids: []
          event_digests:
            - "sha256:59421cc889156c730992e2079263b8f01acb0331bf12022e46370cd8cd2cd2f4"
          mutation_id: "capture:202609222222-GGCDPS"
        kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:ab60fc390304acbf56956c84ed02da7ed9891552fd0979d95d0e294f520a5459"
          before_revision: 4
          command_digest: "sha256:72f8425903e248ab0bd764bb5c863e16de8ccc4cce33114cc22116d97d1bcc84"
          effect_ids: []
          event_digests:
            - "sha256:2415cf17203416d48fab11dac567799a16a0ab2aebc1bad2ac5bc1829e812fea"
          mutation_id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474:
          after_revision: 7
          aggregate_digest: "sha256:67080c974b62257b8b9ed948a74644cdb7cfe037a9a138d6dc4e0c59bce4d56b"
          before_revision: 6
          command_digest: "sha256:e609f7a77200e8672369dcfba9a98ac83891fb049f3776b4fdf3e9b6f1e2f00a"
          effect_ids: []
          event_digests:
            - "sha256:b43ff0cb1daa78c9322968b8d81b26173d992c911fdb306e79a456f155ec355f"
          mutation_id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
        kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:f5c5229c58668ba3e2278d6d7bcabead4afe7af214a3b63305dfbe37f0465d89"
          before_revision: 3
          command_digest: "sha256:c5a32c658366b7144f11df962d825244c55c4624246ef4d666a621f7bb5b739b"
          effect_ids: []
          event_digests:
            - "sha256:ac9f87bf83341b02dd5fea23f6e9e7ae5983aeb32555a5151886092c7409590a"
          mutation_id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb:
          after_revision: 2
          aggregate_digest: "sha256:9ecd6f47a7825ab774df84f69e22886fee559841b847ed8f1782ea395c31323e"
          before_revision: 1
          command_digest: "sha256:ae49117ce3f6840a39283c7126cc0e81170a24b0520f2ca9953c49c3caff92e2"
          effect_ids: []
          event_digests:
            - "sha256:91f2549e8c004acee20e4ce50b87074dcc1f9cef8e11c0f43f51f63dc03f8bb5"
          mutation_id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb"
        sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24:
          after_revision: 6
          aggregate_digest: "sha256:eead457b241496a1c22fa56f6b1785c6be79cca62d8fa02171da0ee75147b111"
          before_revision: 5
          command_digest: "sha256:3950c24e2b63cd901e482621e2f7a5383eca8c285fcac8a547f94751996928d2"
          effect_ids: []
          event_digests:
            - "sha256:2bb642858731baaa58f5b4dce1ef762e89f04fee6b83b6c29cba3684e500f090"
          mutation_id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24"
        sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36:
          after_revision: 3
          aggregate_digest: "sha256:9bb76c97529ccc5bfb049367edb5db727982e04264d2a4ebc6da856ae03dc827"
          before_revision: 2
          command_digest: "sha256:80fbe9c1e57d93c3a92950dc9e4dfc0c5d1945d3c2ce4307ee44bdf34155c86d"
          effect_ids: []
          event_digests:
            - "sha256:3f383dadd518e6e5c6190c0d88b0524ad2f5d35cf9468ba1f520c7d445710774"
          mutation_id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        route-canonical-integration-to-base:
          attempt: 1
          claim_id: "sha256:308c16e3ca161f2208ade9ae53daacee46f9dd841fabf12c1bb44dbcc0077bf6"
          definition:
            contract_digest: "sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-integration-base-source"
              - "canonical-integration-base-tests"
            id: "route-canonical-integration-to-base"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:ba635112a1fb1fdd5cf22bd51f2799a6c14bc6eb0a253106524e2b275fdbac1e"
    documents:
      contracts:
        sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc:
          acceptance_criteria:
            - "integration.enqueue is classified as requiring canonical completion before base-checkout workflow execution."
            - "integration.run_next uses the same base-checkout handoff and retains controller suspension recovery."
            - "PR publication and task-worktree-only operations keep their existing checkout behavior."
            - "Existing exact side-effect authority and durable supervisor admission remain unchanged."
          objective: "Transfer completed canonical branch_pr control to the authoritative base checkout before integration.enqueue and integration.run_next, without changing authority or non-integration routing."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations."
        objective: "Run canonical post-completion integration operations from the authoritative base checkout"
    events:
      -
        command_digest: "sha256:4c33aaaeca686e4296665134234dc249c96352b1e1f48a8fd042ab33b2ed9929"
        id: "capture:202609222222-GGCDPS:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609222222-GGCDPS"
        occurred_at: "2026-09-22T22:22:51.982Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609222222-GGCDPS"
        task_revision: 1
      -
        command_digest: "sha256:ae49117ce3f6840a39283c7126cc0e81170a24b0520f2ca9953c49c3caff92e2"
        id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb"
        occurred_at: "2026-09-22T22:24:43.945Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609222222-GGCDPS"
        task_revision: 2
      -
        command_digest: "sha256:80fbe9c1e57d93c3a92950dc9e4dfc0c5d1945d3c2ce4307ee44bdf34155c86d"
        id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36"
        occurred_at: "2026-09-22T22:24:54.765Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609222222-GGCDPS"
        task_revision: 3
      -
        command_digest: "sha256:c5a32c658366b7144f11df962d825244c55c4624246ef4d666a621f7bb5b739b"
        id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T22:25:04.556Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609222222-GGCDPS"
        task_revision: 4
      -
        command_digest: "sha256:72f8425903e248ab0bd764bb5c863e16de8ccc4cce33114cc22116d97d1bcc84"
        id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T22:25:09.639Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609222222-GGCDPS"
        task_revision: 5
      -
        command_digest: "sha256:3950c24e2b63cd901e482621e2f7a5383eca8c285fcac8a547f94751996928d2"
        id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24"
        occurred_at: "2026-09-22T22:27:55.643Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202609222222-GGCDPS"
        task_revision: 6
      -
        command_digest: "sha256:e609f7a77200e8672369dcfba9a98ac83891fb049f3776b4fdf3e9b6f1e2f00a"
        id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
        occurred_at: "2026-09-22T22:28:00.141Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609222222-GGCDPS"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Run canonical post-completion integration operations from the authoritative base checkout

Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.

## Scope

- In scope: Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
- Out of scope: unrelated refactors not required for "Run canonical post-completion integration operations from the authoritative base checkout".

## Plan

1. Execute approved WorkItem route-canonical-integration-to-base.

## Verify Steps

PLANNER fallback scaffold for "Run canonical post-completion integration operations from the authoritative base checkout". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Run canonical post-completion integration operations from the authoritative base checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
