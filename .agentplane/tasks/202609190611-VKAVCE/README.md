---
id: "202609190611-VKAVCE"
title: "Preserve evaluator repository evidence for hosted closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bun run ci:local:full"
  - "bun x vitest run packages/agentplane/src/commands/task/kernel-exchange.test.ts"
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
doc_updated_at: "2026-09-19T06:11:45.234Z"
doc_updated_by: "CODER"
description: "Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage."
sections:
  Summary: |-
    Preserve evaluator repository evidence for hosted closure

    Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.
  Scope: |-
    - In scope: Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.
    - Out of scope: unrelated refactors not required for "Preserve evaluator repository evidence for hosted closure".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preserve evaluator repository evidence for hosted closure". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preserve evaluator repository evidence for hosted closure". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "4ebbcdd07185c8984d50a94daa24aa9ff07fbf56"
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
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:09c66b37644c2146129bc77775823ace780bf5ed7dad3263b6006a0de64f19fb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4291663d8fcb3bfcd54970d08679e75e30cd102b27e86596d7978c59dc625a43"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:024c5a5c58273d3d3ade1e2f8e033094f4d7633a1f042714603ae082b73bcc78"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
            task_id: "202609190611-VKAVCE"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun x vitest run packages/agentplane/src/commands/task/kernel-exchange.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6ed6a5b7dc88c5f1be9d37256ff1e5fb93210ca5f323952c0ad1fdb82f8bfacb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:af21ec0d5ccddce1e0e8a4656f9487ec0beef6b1c11990d3d08bc7eaa0bdbdeb"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:09c66b37644c2146129bc77775823ace780bf5ed7dad3263b6006a0de64f19fb"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
            task_id: "202609190611-VKAVCE"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun x vitest run packages/agentplane/src/commands/task/kernel-exchange.test.ts"
            work_item_id: null
          observation:
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            changed_paths: []
            evidence_digest: "sha256:8dcfd81327abc10636765e05a7868893b952aae43d5fdf850e78c03d990ef393"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:af21ec0d5ccddce1e0e8a4656f9487ec0beef6b1c11990d3d08bc7eaa0bdbdeb"
        digest: "sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:506955c1f7132a3b1043afcd2bef336728412506b0209a103304f8fbdf42ea4f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "kernel-inspection-source"
              - "kernel-inspection-regression-tests"
            id: "preserve-repository-evidence-on-evaluator-retry"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609190611-VKAVCE"
      intent_digest: "sha256:afa08a5cf47e032dc5cfd81128f1b7bc2d1434424f9fd67c2bc10fb9941a70b7"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45:
          after_revision: 8
          aggregate_digest: "sha256:2b42b1082891fa4879b62040be8fa5671894c078c8b849c85c149112d7373c2d"
          before_revision: 7
          command_digest: "sha256:c1e1bc1cb5469eff10513fb4726b3b24dd35e51ba823b23ec4e5b3524139225b"
          effect_ids: []
          event_digests:
            - "sha256:37780039512bdc0a66595a67a85d73131589913189b12efc39586f976ee6866b"
          mutation_id: "amend:sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45"
        capture:202609190611-VKAVCE:
          after_revision: 1
          aggregate_digest: "sha256:c3e59309ad91e44578ce62733e66bfeccd594cf24da24d750230d1bfa6826d56"
          before_revision: 0
          command_digest: "sha256:12f8c1d8e71abd8605349ba8f53b0d791b3b76184b386ce90f2b9618dd709834"
          effect_ids: []
          event_digests:
            - "sha256:ec860b709e2f9625f0454980f1e67ead9ca51932397155a6ec05903be219a73a"
          mutation_id: "capture:202609190611-VKAVCE"
        kernel_work_item_claim_required:sha256:49de7603ccef91fd5833c94f83b569470f6cc3ee00a8b91c63be73379d58cc2a:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:
          after_revision: 5
          aggregate_digest: "sha256:44c1883007a28981480f60dc51d73297bdd9097ffeb0ca6679d3f4a6b6df52d1"
          before_revision: 4
          command_digest: "sha256:5f05dbbb42997b4ead46eb1fe62a52d68563c90b52cc6bf986dea49d10ab680d"
          effect_ids: []
          event_digests:
            - "sha256:2ac7b65ec7df6d21b404fa0d7c5d3fe0dda749fdedec7dd4fcd74fc9e5bad586"
          mutation_id: "kernel_work_item_claim_required:sha256:49de7603ccef91fd5833c94f83b569470f6cc3ee00a8b91c63be73379d58cc2a:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        kernel_work_item_claim_required:sha256:f71ad8d16e1bb9e5a8d07f320457fe454abf8b06bbaef42881a0049a918d8919:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:
          after_revision: 10
          aggregate_digest: "sha256:1cff7bacf3d228a0b1cd35d49760a60ee34083bace18bf599614f9dc9d30caf1"
          before_revision: 9
          command_digest: "sha256:fa52d83ae3fc5683b4b6a8c8e1bce925b5448025f5410d6215fbe5339519e700"
          effect_ids: []
          event_digests:
            - "sha256:ee0b5b3cac0ff239734ee2925e8bf86ff7dce4c767d4b627ef758e993d2b6146"
          mutation_id: "kernel_work_item_claim_required:sha256:f71ad8d16e1bb9e5a8d07f320457fe454abf8b06bbaef42881a0049a918d8919:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        kernel_work_item_execution_required:sha256:cfdddb71aeffc3e4eb72c43a8c01e40f88b57307dcd8e6e655546a407f5b96e2:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:
          after_revision: 6
          aggregate_digest: "sha256:146ce8bd7d11bfcc3a2568ecbf1f69012ff2d9e4dfe5252271229883ccd37e51"
          before_revision: 5
          command_digest: "sha256:5ca563b71866b09f11b101626f91347ad391e3758ed84c0a6a2f1a8ac02a2689"
          effect_ids: []
          event_digests:
            - "sha256:bcb00d74f2770ad6d9e302b35626403db6d0f00429adab30988a401c7e593911"
          mutation_id: "kernel_work_item_execution_required:sha256:cfdddb71aeffc3e4eb72c43a8c01e40f88b57307dcd8e6e655546a407f5b96e2:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        kernel_work_item_execution_required:sha256:d4e5cbbc7d89b5b576a729b5924eac2a1e1e73f7e9e22c84455c8eefb17cf79e:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:
          after_revision: 11
          aggregate_digest: "sha256:ffc55dd3c58cd3856b0af9c6def6bf13e7601f59a70099e404d1bf270dfc9cd8"
          before_revision: 10
          command_digest: "sha256:229732b10f1ab62b1433db3b37a69aafd0c85573777b9f30e49e1762a7b40a6a"
          effect_ids: []
          event_digests:
            - "sha256:e58177e3bc200dc917ce9a43da8eba79c59bcc008a05a7bb5d2229592ded120b"
          mutation_id: "kernel_work_item_execution_required:sha256:d4e5cbbc7d89b5b576a729b5924eac2a1e1e73f7e9e22c84455c8eefb17cf79e:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        kernel_work_item_materialization_required:sha256:97713892e0680d3d6cc72e39394f01a0008848ccdc6bc323972d4320c1ed9d50:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:
          after_revision: 4
          aggregate_digest: "sha256:86e3d81bea99551ce349afbdd56093c3bd2de04e480a1c1dcb0069b3fb4a63e5"
          before_revision: 3
          command_digest: "sha256:e177db6c8155370c7745611e82ef923ac9a072ddf548d11242cdc643920a4812"
          effect_ids: []
          event_digests:
            - "sha256:5fbca8c00afda85cb95793636fb1d5e50d6df8c02b35f91601ea2beadb6547dc"
          mutation_id: "kernel_work_item_materialization_required:sha256:97713892e0680d3d6cc72e39394f01a0008848ccdc6bc323972d4320c1ed9d50:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        result:sha256:73c5b1c8d5d57152fccac0cc9f525e2ede77c6c1df330c4299dc16fb5538a9d0:
          after_revision: 2
          aggregate_digest: "sha256:230f8f00ded956c3cd2a2d67f5b34c48db65c3caf02bc2c703c92d8809040494"
          before_revision: 1
          command_digest: "sha256:d6989bc1b1ef3b8a45b3c1aa799047ec6984098fb93acb7976fde4f48d9d0c77"
          effect_ids: []
          event_digests:
            - "sha256:8fc8c06253844a90db240ec5b4b5070526c423bc10b16c4e9bf5cfeeb3c24569"
          mutation_id: "result:sha256:73c5b1c8d5d57152fccac0cc9f525e2ede77c6c1df330c4299dc16fb5538a9d0"
        semantic-stop:sha256:010ec79fe0800a414a11c644d630dde81504253f157e3816f93570ede6f5df4d:
          after_revision: 7
          aggregate_digest: "sha256:18ec82a3edf8d22369f681a419ecd014b7a9cd4b2af8bedc9be509a1c2a75d2a"
          before_revision: 6
          command_digest: "sha256:0ed4957573fb856a7e8ad2ae068458147e2dd8f64153e39338cf3b27b32693c6"
          effect_ids: []
          event_digests:
            - "sha256:cebba413caf53bb2f0321ae9e1399617fb22f195694a6d1053001050552635eb"
          mutation_id: "semantic-stop:sha256:010ec79fe0800a414a11c644d630dde81504253f157e3816f93570ede6f5df4d"
        sha256:79aa82bd88115ec6e69423a5a41e65dbabd221f4301a6e8cdd9b9ab2787a7301:
          after_revision: 9
          aggregate_digest: "sha256:1d9902787bae42b8693d8ccfa4cbe4106fbd6f3eeae62fe3dfb29508a648c1a1"
          before_revision: 8
          command_digest: "sha256:10e65d67d217fde4c5b5f0ebfcf6048616ea64087b74ec40d918a9972513c539"
          effect_ids: []
          event_digests:
            - "sha256:427982c3a301d338ef4a6ccde8794209e264b9a3ca66e6c6102dce141914e461"
          mutation_id: "sha256:79aa82bd88115ec6e69423a5a41e65dbabd221f4301a6e8cdd9b9ab2787a7301"
        sha256:a0284292d2afa1b04ccdd90a1c79cd689b8e9e1ea65f8704d386aa79c2e5b757:
          after_revision: 3
          aggregate_digest: "sha256:c1afe4c37b4f3b68fbb1da469ef8fbd6cf40b3d4b9365a514cbe37a59e36df88"
          before_revision: 2
          command_digest: "sha256:611c6a8239cb271de494ff7f38b4a3c8c4d739997908f1c1743e8b7516645de8"
          effect_ids: []
          event_digests:
            - "sha256:872a32b3e88094b7ebca5100d8d4085c992c957823b13772dc3ce51b1b7772b7"
          mutation_id: "sha256:a0284292d2afa1b04ccdd90a1c79cd689b8e9e1ea65f8704d386aa79c2e5b757"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:024c5a5c58273d3d3ade1e2f8e033094f4d7633a1f042714603ae082b73bcc78"
          digest: "sha256:4291663d8fcb3bfcd54970d08679e75e30cd102b27e86596d7978c59dc625a43"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:506955c1f7132a3b1043afcd2bef336728412506b0209a103304f8fbdf42ea4f"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "run_tests"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              expected_outputs:
                - "kernel-inspection-source"
                - "kernel-inspection-regression-tests"
              id: "preserve-repository-evidence-on-evaluator-retry"
              optional: false
              required_inputs: []
      revision: 11
      schema_version: 1
      state: "ACTIVE"
      work_items:
        preserve-repository-evidence-on-evaluator-retry:
          attempt: 2
          claim_id: "sha256:524404fac347875aa9b41edbc11603b5ccdd8f965dbcaf7a63ce272382d08fc3"
          definition:
            contract_digest: "sha256:506955c1f7132a3b1043afcd2bef336728412506b0209a103304f8fbdf42ea4f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "kernel-inspection-source"
              - "kernel-inspection-regression-tests"
            id: "preserve-repository-evidence-on-evaluator-retry"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 8
          state: "EXECUTING"
          validation: null
    digest: "sha256:8398a9943be6bca318e505a292c82649cc0317dee7cf309d1e59e8c83cbe4f5b"
    documents:
      contracts:
        sha256:506955c1f7132a3b1043afcd2bef336728412506b0209a103304f8fbdf42ea4f:
          acceptance_criteria:
            - "A later evaluator retry with no new repository mutation receives or resolves prior valid repository evidence for the same task and work item."
            - "Evidence remains digest-validated and bound to the current implementation commit; stale or mismatched evidence is rejected fail-closed."
            - "A regression test reproduces the earlier-evidence plus later-retry topology and proves operational projection is produced."
            - "Existing fresh-evidence and no-evidence behavior remains unchanged."
          objective: "Preserve or recover the latest valid AgentPlane-owned repository evidence for an evaluator retry of the same canonical work item, so a passing inspection writes the operational projection required by branch_pr closure."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run packages/agentplane/src/commands/task/kernel-exchange.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage."
        objective: "Preserve evaluator repository evidence for hosted closure"
    events:
      -
        command_digest: "sha256:12f8c1d8e71abd8605349ba8f53b0d791b3b76184b386ce90f2b9618dd709834"
        id: "capture:202609190611-VKAVCE:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609190611-VKAVCE"
        occurred_at: "2026-09-19T06:11:45.187Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609190611-VKAVCE"
        task_revision: 1
      -
        command_digest: "sha256:d6989bc1b1ef3b8a45b3c1aa799047ec6984098fb93acb7976fde4f48d9d0c77"
        id: "result:sha256:73c5b1c8d5d57152fccac0cc9f525e2ede77c6c1df330c4299dc16fb5538a9d0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:73c5b1c8d5d57152fccac0cc9f525e2ede77c6c1df330c4299dc16fb5538a9d0"
        occurred_at: "2026-09-19T06:12:27.337Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609190611-VKAVCE"
        task_revision: 2
      -
        command_digest: "sha256:611c6a8239cb271de494ff7f38b4a3c8c4d739997908f1c1743e8b7516645de8"
        id: "sha256:a0284292d2afa1b04ccdd90a1c79cd689b8e9e1ea65f8704d386aa79c2e5b757:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a0284292d2afa1b04ccdd90a1c79cd689b8e9e1ea65f8704d386aa79c2e5b757"
        occurred_at: "2026-09-19T06:12:35.605Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609190611-VKAVCE"
        task_revision: 3
      -
        command_digest: "sha256:e177db6c8155370c7745611e82ef923ac9a072ddf548d11242cdc643920a4812"
        id: "kernel_work_item_materialization_required:sha256:97713892e0680d3d6cc72e39394f01a0008848ccdc6bc323972d4320c1ed9d50:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:97713892e0680d3d6cc72e39394f01a0008848ccdc6bc323972d4320c1ed9d50:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        occurred_at: "2026-09-19T06:12:42.607Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609190611-VKAVCE"
        task_revision: 4
      -
        command_digest: "sha256:5f05dbbb42997b4ead46eb1fe62a52d68563c90b52cc6bf986dea49d10ab680d"
        id: "kernel_work_item_claim_required:sha256:49de7603ccef91fd5833c94f83b569470f6cc3ee00a8b91c63be73379d58cc2a:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:49de7603ccef91fd5833c94f83b569470f6cc3ee00a8b91c63be73379d58cc2a:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        occurred_at: "2026-09-19T06:12:46.144Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609190611-VKAVCE"
        task_revision: 5
      -
        command_digest: "sha256:5ca563b71866b09f11b101626f91347ad391e3758ed84c0a6a2f1a8ac02a2689"
        id: "kernel_work_item_execution_required:sha256:cfdddb71aeffc3e4eb72c43a8c01e40f88b57307dcd8e6e655546a407f5b96e2:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cfdddb71aeffc3e4eb72c43a8c01e40f88b57307dcd8e6e655546a407f5b96e2:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        occurred_at: "2026-09-19T06:12:48.808Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609190611-VKAVCE"
        task_revision: 6
      -
        command_digest: "sha256:0ed4957573fb856a7e8ad2ae068458147e2dd8f64153e39338cf3b27b32693c6"
        id: "semantic-stop:sha256:010ec79fe0800a414a11c644d630dde81504253f157e3816f93570ede6f5df4d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:010ec79fe0800a414a11c644d630dde81504253f157e3816f93570ede6f5df4d"
        occurred_at: "2026-09-19T06:14:34.735Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609190611-VKAVCE"
        task_revision: 7
      -
        command_digest: "sha256:c1e1bc1cb5469eff10513fb4726b3b24dd35e51ba823b23ec4e5b3524139225b"
        id: "amend:sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:e5189934079a314e2b40b01f7fd08335fd9d50f128c4ed40db8b1577e50b8d45"
        occurred_at: "2026-09-19T06:15:39.913Z"
        payload_digest: "sha256:964cf42524ec72c6b22cee6501b5fee95dfd1b1ad6daef1e25dfc8c2b25b6b13"
        task_id: "202609190611-VKAVCE"
        task_revision: 8
      -
        command_digest: "sha256:10e65d67d217fde4c5b5f0ebfcf6048616ea64087b74ec40d918a9972513c539"
        id: "sha256:79aa82bd88115ec6e69423a5a41e65dbabd221f4301a6e8cdd9b9ab2787a7301:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:79aa82bd88115ec6e69423a5a41e65dbabd221f4301a6e8cdd9b9ab2787a7301"
        occurred_at: "2026-09-19T06:15:41.845Z"
        payload_digest: "sha256:24f7ea3d3341ee0c827f30d020d0d10cfe76d88847462d9a35c97dcef11d0ac1"
        task_id: "202609190611-VKAVCE"
        task_revision: 9
      -
        command_digest: "sha256:fa52d83ae3fc5683b4b6a8c8e1bce925b5448025f5410d6215fbe5339519e700"
        id: "kernel_work_item_claim_required:sha256:f71ad8d16e1bb9e5a8d07f320457fe454abf8b06bbaef42881a0049a918d8919:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f71ad8d16e1bb9e5a8d07f320457fe454abf8b06bbaef42881a0049a918d8919:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        occurred_at: "2026-09-19T06:15:50.603Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609190611-VKAVCE"
        task_revision: 10
      -
        command_digest: "sha256:229732b10f1ab62b1433db3b37a69aafd0c85573777b9f30e49e1762a7b40a6a"
        id: "kernel_work_item_execution_required:sha256:d4e5cbbc7d89b5b576a729b5924eac2a1e1e73f7e9e22c84455c8eefb17cf79e:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d4e5cbbc7d89b5b576a729b5924eac2a1e1e73f7e9e22c84455c8eefb17cf79e:sha256:61bc6f17cc4a374f107f7fcdff7fe100674fb3f26c4d635cbb7eda14ad740d8e"
        occurred_at: "2026-09-19T06:15:53.453Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609190611-VKAVCE"
        task_revision: 11
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve evaluator repository evidence for hosted closure

Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.

## Scope

- In scope: Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.
- Out of scope: unrelated refactors not required for "Preserve evaluator repository evidence for hosted closure".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Preserve evaluator repository evidence for hosted closure". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preserve evaluator repository evidence for hosted closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
