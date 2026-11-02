---
id: "202611022117-4F49ZT"
title: "Preserve foreign cleanup during native quarantine publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-02T21:17:29.215Z"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:ffc3b70d94ea114a513cb66dd742a954302e8caeabce05fe0a1fdb7b7fe7fefa"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-02T21:17:07.459Z"
doc_updated_by: "CODER"
description: "Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment."
sections:
  Summary: |-
    Preserve foreign cleanup during native quarantine publication

    Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment.
  Scope: |-
    - In scope: Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment.
    - Out of scope: unrelated refactors not required for "Preserve foreign cleanup during native quarantine publication".
  Plan: "1. Execute approved WorkItem quarantine-cleanup-compatibility."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_ref: "main"
    base_sha: "fd98a4b4f1c85e82f7c8a35f7297d5985c41f7ba"
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
            digest: "sha256:8fa012323ca47c43a47ae3807d7c84450b9025081a358dd006da3c1b52e3a202"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:dcd6cdfbe170157551213fce404ee585c236a0da54c014fdb4c5e3cdf0e94c34"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611022117-4F49ZT"
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
            digest: "sha256:d6ef4f50ecba5d92b5acccd64b47f0f9258a8b4cacef2f9d9e1a4ce07d3f0dab"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:dcd6cdfbe170157551213fce404ee585c236a0da54c014fdb4c5e3cdf0e94c34"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:8fa012323ca47c43a47ae3807d7c84450b9025081a358dd006da3c1b52e3a202"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611022117-4F49ZT"
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
            evidence_digest: "sha256:ce08f42cf36dc99c6312e279ebdfb07718ef8cfdf083c969594edab4f7b318fe"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:dcd6cdfbe170157551213fce404ee585c236a0da54c014fdb4c5e3cdf0e94c34"
        digest: "sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:dc27bc01d8a6344432334bc611d89d9da8564367bc02dd5cd06ad5b7ebea850d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "exact-seven-source"
              - "cleanup-compatible-quarantine-proof"
            id: "quarantine-cleanup-compatibility"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611022117-4F49ZT"
      intent_digest: "sha256:e432b3f652ebfe126308de0a799b9f88da64a67c0b35c9d4fb23adb3790165d0"
      migration_receipts: []
      mutation_receipts:
        capture:202611022117-4F49ZT:
          after_revision: 1
          aggregate_digest: "sha256:52b61a1ef7671e1bea2cffad8590fb91f6a5f55bbe1c888b79354d211d300d18"
          before_revision: 0
          command_digest: "sha256:4acb9e627855defee67d3b430be66d376d0e49fba2414bd347b34501bbbcbebb"
          effect_ids: []
          event_digests:
            - "sha256:65f2093f2fd6ea4a65984017d4283184e7e87878d96fd100363b27f294c1287f"
          mutation_id: "capture:202611022117-4F49ZT"
        kernel_work_item_claim_required:sha256:6254c7d8e590f0ee238c6d996b444ce90dc2669be9dca2f5147a92a1fd99751a:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 5
          aggregate_digest: "sha256:3a41bc1bf553547fe10ec1d3897370c1e756e15ee6e869b70bd2b19964649b21"
          before_revision: 4
          command_digest: "sha256:6b421b114d2d218a12de9d3a698ecf2b7e5f4673be522a5917d0fe07f1849e65"
          effect_ids: []
          event_digests:
            - "sha256:541928ad33766cac08086e9028920e2bfe7f7fbce92a85f0734b14653ab844bf"
          mutation_id: "kernel_work_item_claim_required:sha256:6254c7d8e590f0ee238c6d996b444ce90dc2669be9dca2f5147a92a1fd99751a:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        kernel_work_item_execution_required:sha256:bcd758d5129704a15138780f0bbd5f40de34270c203b32f82ff6e3959d1e5046:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:
          after_revision: 7
          aggregate_digest: "sha256:0a2304e3b3f13a8c6ee609f8c521af32505fd1393e63b171a06b446883116d4b"
          before_revision: 6
          command_digest: "sha256:3c2a210f886e7e7b7de9ca20e3c4a1d1718da40b17f9b3feee4f6160a45ed598"
          effect_ids: []
          event_digests:
            - "sha256:19cc7977446ee11773a081ab607a963c3ce5267e59acd68caccb2a198a2c99ec"
          mutation_id: "kernel_work_item_execution_required:sha256:bcd758d5129704a15138780f0bbd5f40de34270c203b32f82ff6e3959d1e5046:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        kernel_work_item_materialization_required:sha256:e04268401d44d5dc2d297ce4cc28f4201635046d477790ccf1f5b3b124fee58c:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 4
          aggregate_digest: "sha256:a6463d50d58c7acf24f3368969af9e78ec2f50ffa4991d55e37ab5e69dd829bd"
          before_revision: 3
          command_digest: "sha256:ebe9f045ef2ca183c75ce3b04ab4c17ef9e79c7aac00cd13028c0ca3ed90db60"
          effect_ids: []
          event_digests:
            - "sha256:e084b5a9e170955e12bd021bbe0ad76c7a8a680395a73f5ede338586f283fe3b"
          mutation_id: "kernel_work_item_materialization_required:sha256:e04268401d44d5dc2d297ce4cc28f4201635046d477790ccf1f5b3b124fee58c:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        plan:sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1:
          after_revision: 2
          aggregate_digest: "sha256:4f7531797d863b2533e95dfaf4ffb2d277f11a673b9af63cbed0df9e454170ba"
          before_revision: 1
          command_digest: "sha256:acb551494632df9d9c14bafe5dce0784744676cb528f754acb2ce3d1cb668a23"
          effect_ids: []
          event_digests:
            - "sha256:1b4ed953ab4eb246d2adf56555d0c5e9cc5cf9454747348351da61072ebefee5"
          mutation_id: "plan:sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1"
        sha256:9c28a91612adf8938460b15b8562b6840f5ab9bc191cdf6f95a7787e7cc39d08:
          after_revision: 3
          aggregate_digest: "sha256:abea917cde5e0eb7922b0b78ef123b58197b0c6b3a29a6b726c266ac41617043"
          before_revision: 2
          command_digest: "sha256:ba73499279c7834b014c5ff522dc47c6502b4c9670edd2a38a4908db98d9378c"
          effect_ids: []
          event_digests:
            - "sha256:12d28d839b069a927b1ff2865dd690e5edc96605eef0e09d1ac78d1c196c2f5b"
          mutation_id: "sha256:9c28a91612adf8938460b15b8562b6840f5ab9bc191cdf6f95a7787e7cc39d08"
        sha256:c9ca68353a9cc09a5d79ce967d054923e2d845d8b0b4478cd57f2751f843e3e5:
          after_revision: 6
          aggregate_digest: "sha256:a280ae4994eca5f6047ab489baad74517de25cf184b188800689a81638c1b91d"
          before_revision: 5
          command_digest: "sha256:61b17331d2d5c9052cd8e332e3a12bbe593a30ff8cd2dcf77dcfa0524255dd33"
          effect_ids: []
          event_digests:
            - "sha256:fca40b1d392087b80e667f7e312f47a9815cc9e14747d194df4c9e2d23664634"
          mutation_id: "sha256:c9ca68353a9cc09a5d79ce967d054923e2d845d8b0b4478cd57f2751f843e3e5"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        quarantine-cleanup-compatibility:
          attempt: 1
          claim_id: "sha256:2637304aa49026f184966ccb6752b6be4f42d20ff288650c509d7c42b6ac2734"
          definition:
            contract_digest: "sha256:dc27bc01d8a6344432334bc611d89d9da8564367bc02dd5cd06ad5b7ebea850d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "exact-seven-source"
              - "cleanup-compatible-quarantine-proof"
            id: "quarantine-cleanup-compatibility"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:782aa6dbb7c634ed4a286c884dba9fc04cc9bd50e819346379fc770a0af4a13c"
    documents:
      contracts:
        sha256:dc27bc01d8a6344432334bc611d89d9da8564367bc02dd5cd06ad5b7ebea850d:
          acceptance_criteria:
            - "Port exactly the approved seven source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40. Preserve all predecessor Tasks, PRs, evidence, journals, branches, and unrelated dirty files."
            - "Reproduce the reviewed rejection of an explicitly scoped deletion-only foreign volatile-artifact cleanup in both default and configured workflow directories before changing production code."
            - "Keep authorized foreign volatile-artifact cleanup working on the first commit, after a rejected hook, and after an interrupted successful commit. Preserve exact scope and publication ownership guards; never admit foreign edits or durable-evidence deletion through cleanup authority."
            - "Keep quarantine proof mandatory only for actual quarantine artifacts. Invalid live or committed quarantine afterimage/backup bytes must remain rejected on every retry, retain native commit intent and head, and produce no implementation evidence or followup effect."
            - "Cover mixed authorized cleanup and exact quarantine for different historical Tasks, all existing ninety-eight regressions, default/configured workflow paths, immutable Git-base binding, and unrelated-data preservation."
            - "Run unchanged declared full local CI and focused five-file regressions through native EXEC and independent EVAL/final validation, followed by canonical PR, current-head CI, review, merge, and Hosted Close. No old Task execution or DONE/PASS assignment and no data, credential, runtime-guard, or timeout weakening."
          objective: "Complete the already approved exact seven-file native quarantine publication for sb. Port only immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40 source files. Reproduce reviewed regression PRRT_kwDORCLmJM6y3Xqy, preserve authorized deletion-only foreign volatile-artifact cleanup, and retain exact live and Git quarantine proofs across commit interruptions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment."
        objective: "Preserve foreign cleanup during native quarantine publication"
    events:
      -
        command_digest: "sha256:4acb9e627855defee67d3b430be66d376d0e49fba2414bd347b34501bbbcbebb"
        id: "capture:202611022117-4F49ZT:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611022117-4F49ZT"
        occurred_at: "2026-11-02T21:17:07.425Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611022117-4F49ZT"
        task_revision: 1
      -
        command_digest: "sha256:acb551494632df9d9c14bafe5dce0784744676cb528f754acb2ce3d1cb668a23"
        id: "plan:sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:20574f4ed59d9c862bf46dc7a35dc33e91a16a8e42edad8fdb99eb47fb657dd1"
        occurred_at: "2026-11-02T21:17:23.645Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611022117-4F49ZT"
        task_revision: 2
      -
        command_digest: "sha256:ba73499279c7834b014c5ff522dc47c6502b4c9670edd2a38a4908db98d9378c"
        id: "sha256:9c28a91612adf8938460b15b8562b6840f5ab9bc191cdf6f95a7787e7cc39d08:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9c28a91612adf8938460b15b8562b6840f5ab9bc191cdf6f95a7787e7cc39d08"
        occurred_at: "2026-11-02T21:17:27.884Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611022117-4F49ZT"
        task_revision: 3
      -
        command_digest: "sha256:ebe9f045ef2ca183c75ce3b04ab4c17ef9e79c7aac00cd13028c0ca3ed90db60"
        id: "kernel_work_item_materialization_required:sha256:e04268401d44d5dc2d297ce4cc28f4201635046d477790ccf1f5b3b124fee58c:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e04268401d44d5dc2d297ce4cc28f4201635046d477790ccf1f5b3b124fee58c:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T21:17:33.902Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611022117-4F49ZT"
        task_revision: 4
      -
        command_digest: "sha256:6b421b114d2d218a12de9d3a698ecf2b7e5f4673be522a5917d0fe07f1849e65"
        id: "kernel_work_item_claim_required:sha256:6254c7d8e590f0ee238c6d996b444ce90dc2669be9dca2f5147a92a1fd99751a:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6254c7d8e590f0ee238c6d996b444ce90dc2669be9dca2f5147a92a1fd99751a:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T21:17:39.692Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611022117-4F49ZT"
        task_revision: 5
      -
        command_digest: "sha256:61b17331d2d5c9052cd8e332e3a12bbe593a30ff8cd2dcf77dcfa0524255dd33"
        id: "sha256:c9ca68353a9cc09a5d79ce967d054923e2d845d8b0b4478cd57f2751f843e3e5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c9ca68353a9cc09a5d79ce967d054923e2d845d8b0b4478cd57f2751f843e3e5"
        occurred_at: "2026-11-02T21:18:18.922Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611022117-4F49ZT"
        task_revision: 6
      -
        command_digest: "sha256:3c2a210f886e7e7b7de9ca20e3c4a1d1718da40b17f9b3feee4f6160a45ed598"
        id: "kernel_work_item_execution_required:sha256:bcd758d5129704a15138780f0bbd5f40de34270c203b32f82ff6e3959d1e5046:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bcd758d5129704a15138780f0bbd5f40de34270c203b32f82ff6e3959d1e5046:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        occurred_at: "2026-11-02T21:18:21.566Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611022117-4F49ZT"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve foreign cleanup during native quarantine publication

Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment.

## Scope

- In scope: Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from immutable implementation68d1d1fbb9880de082e5cef3bf66342c823b6e40, reproduce and fix reviewed authorized foreign volatile-artifact cleanup regression PRRT_kwDORCLmJM6y3Xqy, and retain every live/Git byte-proof and commit recovery guard. Preserve all predecessors, data, credentials and runtime guards; no old Task execution or DONE/PASS assignment.
- Out of scope: unrelated refactors not required for "Preserve foreign cleanup during native quarantine publication".

## Plan

1. Execute approved WorkItem quarantine-cleanup-compatibility.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
