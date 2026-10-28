---
id: "202610280201-Z9MAPZ"
title: "Allow exact provider update after failed integration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-28T02:05:15.625Z"
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
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:3a495c26fc7b7dad9f30018b0460df6808c493f2452361ab71c9da5cb2eab452"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-28T02:01:54.230Z"
doc_updated_by: "CODER"
description: "When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors."
sections:
  Summary: |-
    Allow exact provider update after failed integration

    When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
  Scope: |-
    - In scope: When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
    - Out of scope: unrelated refactors not required for "Allow exact provider update after failed integration".
  Plan: "1. Execute approved WorkItem exact-provider-update-successor."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow exact provider update after failed integration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow exact provider update after failed integration". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "9c1ad3fe68b6ce490e72ace285dcea2d316d0364"
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
            digest: "sha256:ccb68b88847845fcf3d72b93e522647a20f57348b0374d2a7942941b57525617"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
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
            digest: "sha256:e29db572a7dd24bfdc46361a1d79fedc95f685ad15ac407635a3c134bef268c8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccb68b88847845fcf3d72b93e522647a20f57348b0374d2a7942941b57525617"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:f93ad4e6608ab1f39e3613cf7279c44d9616d766da7fe013a45c3c121b43c03d"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
        digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:7c22ab758b21a6999f78267f28e06d8753bfe53725715a31b5559ac4b5b28625"
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
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
            expected_outputs:
              - "generic-recovery-guard"
              - "recovery-guard-regressions"
            id: "exact-provider-update-successor"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610280201-Z9MAPZ"
      intent_digest: "sha256:0a900dde897f9535cdf1fafbf4a3f205fd78cffa6eeee28ad1e48050b41f05f2"
      migration_receipts: []
      mutation_receipts:
        capture:202610280201-Z9MAPZ:
          after_revision: 1
          aggregate_digest: "sha256:9169b1acffaf02547782c5f0d8f29f55ee27e444864a51fa89c3b2a16c6eebef"
          before_revision: 0
          command_digest: "sha256:5c6fbc26f8737a5ae057055d8fa01169862eb4aee278fa530e842609ce91d85a"
          effect_ids: []
          event_digests:
            - "sha256:c71a4da3bf4184290a6900d027786d6ef08a0513084e22d54e19f0cff761c981"
          mutation_id: "capture:202610280201-Z9MAPZ"
        kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:
          after_revision: 5
          aggregate_digest: "sha256:c4e20945fb9aeb00096dc157cab8c14c4d78f3360bb233b4133418bfd671247a"
          before_revision: 4
          command_digest: "sha256:a0a6539842f02a96b2e7455d81a2835f632e37837bdb1c81a22cd659d27832ff"
          effect_ids: []
          event_digests:
            - "sha256:773c0ef06a4df4b306f88d1db25eb2a8137d508cd7f06d5a3fb015304c3f4918"
          mutation_id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:
          after_revision: 7
          aggregate_digest: "sha256:44402f68c04ca5ca561ccfb73c17c540b995d590633d6f78cd80a6555b2344f2"
          before_revision: 6
          command_digest: "sha256:423ccbffee97a6ba0e38beae5d14040954101d062e1dff5a0bc0b49caf72f904"
          effect_ids: []
          event_digests:
            - "sha256:c12adb6c41ab785355de7f633a93528589e1622a6011389d9bee420c11ceccaf"
          mutation_id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:
          after_revision: 4
          aggregate_digest: "sha256:b20147769e75aff7df73437613971b07326c984e333f3abd7c0e9cd7095b37e2"
          before_revision: 3
          command_digest: "sha256:1f751d529c12a5d8786cdb5e72b15263d8008cfbab2b3635e44f545a9837e289"
          effect_ids: []
          event_digests:
            - "sha256:0a625cb7eff863b5adf394f333fd02b6707d490b4a67f224f65cc42059ad0bb2"
          mutation_id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35:
          after_revision: 2
          aggregate_digest: "sha256:6278559e542f246685e8de141a150921562089811d4228656bb247de90cc38b5"
          before_revision: 1
          command_digest: "sha256:e55921635df63fbfc3e512985461296b050040c789266862b3c63a4c6903fdad"
          effect_ids: []
          event_digests:
            - "sha256:350e4b000c54fb8d3b2099e4e206d125ec275a820938b9770aaa66750b71bc93"
          mutation_id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35"
        sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad:
          after_revision: 6
          aggregate_digest: "sha256:2a4e906065f34fe3d509c1bfcb4460b71e5796a7fe7fc388b2527a82d364549b"
          before_revision: 5
          command_digest: "sha256:fdd19ef2a9e5c8d540c5155af2759a22adf1ff96b9e0d5cb51a9b0bcb01c120b"
          effect_ids: []
          event_digests:
            - "sha256:5cac18fd306bfbd97828dca36a27483658f0cea1872f85761e8410be96bf925b"
          mutation_id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad"
        sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea:
          after_revision: 3
          aggregate_digest: "sha256:7711cfe01e65bca900e05d0af5faceb7a011eaccc232c4807bddf9de205c203b"
          before_revision: 2
          command_digest: "sha256:b0c90a6a43ecb6283a23fe79120396f8b65314fc2460d3361dc221da05d0a991"
          effect_ids: []
          event_digests:
            - "sha256:edfa0137c73286607d99336d097f076b18791c4f536d1cb0de497037498bfaa9"
          mutation_id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        exact-provider-update-successor:
          attempt: 1
          claim_id: "sha256:00e54782fd5b56ce23861e82927d24f31e94c91ad38de65961403751117bcd75"
          definition:
            contract_digest: "sha256:7c22ab758b21a6999f78267f28e06d8753bfe53725715a31b5559ac4b5b28625"
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
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
            expected_outputs:
              - "generic-recovery-guard"
              - "recovery-guard-regressions"
            id: "exact-provider-update-successor"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:9be54e54de08809a5edcd88e10e125b81230671a582e14810a10db1d9ca509b7"
    documents:
      contracts:
        sha256:7c22ab758b21a6999f78267f28e06d8753bfe53725715a31b5559ac4b5b28625:
          acceptance_criteria:
            - "A ready replacement of failed integration.run_next accepts an authorized provider.pr.update_branch route only when task ID, PR number, branch, base branch, expected head/base SHA, and provider identity match the frozen failure snapshot."
            - "Any missing snapshot, changed identity, changed route, or unsafe mutation authority is rejected before a provider effect."
            - "Existing semantic implementation rework and unresolved integration-intent paths remain unchanged."
          objective: "Permit only the exact typed provider.pr.update_branch successor after a failed integration.run_next when the immutable failed-operation recovery snapshot and fresh route describe the same task, queued PR, provider identity, branch, head, and base; preserve semantic rework requirement for all other successors."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts"
            - "bun run typecheck"
            - "AgentPlane native full local CI and hosted PR checks"
      intent:
        context: "When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors."
        objective: "Allow exact provider update after failed integration"
    events:
      -
        command_digest: "sha256:5c6fbc26f8737a5ae057055d8fa01169862eb4aee278fa530e842609ce91d85a"
        id: "capture:202610280201-Z9MAPZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610280201-Z9MAPZ"
        occurred_at: "2026-10-28T02:01:54.153Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 1
      -
        command_digest: "sha256:e55921635df63fbfc3e512985461296b050040c789266862b3c63a4c6903fdad"
        id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35"
        occurred_at: "2026-10-28T02:03:48.032Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 2
      -
        command_digest: "sha256:b0c90a6a43ecb6283a23fe79120396f8b65314fc2460d3361dc221da05d0a991"
        id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea"
        occurred_at: "2026-10-28T02:04:59.891Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 3
      -
        command_digest: "sha256:1f751d529c12a5d8786cdb5e72b15263d8008cfbab2b3635e44f545a9837e289"
        id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        occurred_at: "2026-10-28T02:05:58.422Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 4
      -
        command_digest: "sha256:a0a6539842f02a96b2e7455d81a2835f632e37837bdb1c81a22cd659d27832ff"
        id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        occurred_at: "2026-10-28T02:06:47.101Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 5
      -
        command_digest: "sha256:fdd19ef2a9e5c8d540c5155af2759a22adf1ff96b9e0d5cb51a9b0bcb01c120b"
        id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad"
        occurred_at: "2026-10-28T02:08:42.964Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 6
      -
        command_digest: "sha256:423ccbffee97a6ba0e38beae5d14040954101d062e1dff5a0bc0b49caf72f904"
        id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        occurred_at: "2026-10-28T02:09:21.178Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow exact provider update after failed integration

When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.

## Scope

- In scope: When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
- Out of scope: unrelated refactors not required for "Allow exact provider update after failed integration".

## Plan

1. Execute approved WorkItem exact-provider-update-successor.

## Verify Steps

PLANNER fallback scaffold for "Allow exact provider update after failed integration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow exact provider update after failed integration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
