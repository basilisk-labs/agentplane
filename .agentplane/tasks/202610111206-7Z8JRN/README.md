---
id: "202610111206-7Z8JRN"
title: "Bind finite native verification timeout profiles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run hotspots:check"
  - "bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts --maxWorkers=1"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T12:08:54.342Z"
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
      - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
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
      - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
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
          - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
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
      digest: "sha256:c1f9831e738c3d4d428ae800ecbd8fd0fb3c0e58dce1248d4ed66c2cd673cd45"
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
doc_updated_at: "2026-10-11T12:06:36.398Z"
doc_updated_by: "CODER"
description: "Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions."
sections:
  Summary: |-
    Bind finite native verification timeout profiles

    Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.
  Scope: |-
    - In scope: Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.
    - Out of scope: unrelated refactors not required for "Bind finite native verification timeout profiles".
  Plan: "1. Execute approved WorkItem bind-native-timeout-profile."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts --maxWorkers=1`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "d97aaa5d53cdfed5ccfac52305ed22991caf4d73"
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
            digest: "sha256:6ac38a00da1db9d0e1195c6929a764e945fd68ca707ca4a24112d3e37094ce5c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:77e1fa356f2a6939c40cef84ea14af3efa3a2d3b4770e48f31bcbeb2890952ac"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7cbdb094954ce319bc422d07076a0410dd3e19e6f63944e660c32bf7a7a19c92"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
            task_id: "202610111206-7Z8JRN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:e81dfa15e2fdc45b25261b9537ea2d90aa2cd09e4ffb86f12c67af7171a17fe6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:77e1fa356f2a6939c40cef84ea14af3efa3a2d3b4770e48f31bcbeb2890952ac"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7cbdb094954ce319bc422d07076a0410dd3e19e6f63944e660c32bf7a7a19c92"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6ac38a00da1db9d0e1195c6929a764e945fd68ca707ca4a24112d3e37094ce5c"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
            task_id: "202610111206-7Z8JRN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
            evidence_digest: "sha256:f622ec68c0dad69e7921146df541053e234795b115ab7c3a2840598ba61254cc"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:7cbdb094954ce319bc422d07076a0410dd3e19e6f63944e660c32bf7a7a19c92"
        digest: "sha256:77e1fa356f2a6939c40cef84ea14af3efa3a2d3b4770e48f31bcbeb2890952ac"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:68ffd094bba0d9d50869047182eae53cf8e558114d8c7348d1e15273c62dfa42"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
            expected_outputs:
              - "native-timeout-profile-proof"
            id: "bind-native-timeout-profile"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610111206-7Z8JRN"
      intent_digest: "sha256:0c96d3252f90b1d94e225fec0d074fe3bae18e8a2fe396474d26697746cd7e6d"
      migration_receipts: []
      mutation_receipts:
        capture:202610111206-7Z8JRN:
          after_revision: 1
          aggregate_digest: "sha256:220d3f1e96f8851d9de33b4756cdc174730018e48c9472f86bd745bb3b21c1ba"
          before_revision: 0
          command_digest: "sha256:17dc5c629ef9de9105016719e43ae031f266da42ff0b3827b0e51616172babdd"
          effect_ids: []
          event_digests:
            - "sha256:616964961f42540d1b8be9f6dc77944e437f7bd417bffce5672a8b6c03d25aa9"
          mutation_id: "capture:202610111206-7Z8JRN"
        kernel_work_item_claim_required:sha256:a8ff31a0b7838c65b41b3b49d07d059e5534dfcd63b54a5d521aa9d4a5d5d650:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:
          after_revision: 5
          aggregate_digest: "sha256:996fded2807d2116f595ba4396af6f9b24f4cf1769b829f8ba83343a219bf875"
          before_revision: 4
          command_digest: "sha256:fe3614d8ee6b6f4896e969dc95e5728ace129a271be3a1f7ad8515c327afbab8"
          effect_ids: []
          event_digests:
            - "sha256:3dda4741237adb844492c2bd3a4d00c0b4f96aaae957871f1449ecaeafecb819"
          mutation_id: "kernel_work_item_claim_required:sha256:a8ff31a0b7838c65b41b3b49d07d059e5534dfcd63b54a5d521aa9d4a5d5d650:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        kernel_work_item_execution_required:sha256:57dd57fbfb314e8149a692aaaabbd56055cf32cb8340d933f0ed778217e31c88:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:
          after_revision: 6
          aggregate_digest: "sha256:c9d06ee1d3ab2fa7deca5503710fd307e7f1a8649fa22b020a70ea151cbc4935"
          before_revision: 5
          command_digest: "sha256:6d3e3da3e5f62f23c0914f4f423fecd43f0dbd369a4e4b8781aa4b1eb44e50b3"
          effect_ids: []
          event_digests:
            - "sha256:87aa8f7e70dba116c04023557513810fed074471bf6487b73cd93a1cffe8c179"
          mutation_id: "kernel_work_item_execution_required:sha256:57dd57fbfb314e8149a692aaaabbd56055cf32cb8340d933f0ed778217e31c88:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        kernel_work_item_execution_required:sha256:d4aeac54730bdac7206dce4dbbb2316262efcfc5f4377b442d9aa0bb32c40906:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:
          after_revision: 13
          aggregate_digest: "sha256:2bc03b4a578f00817de0fb07be621b4817fc11bff400747fac2d0a25ae0df517"
          before_revision: 12
          command_digest: "sha256:1ba3e9b0697a0b4196d745d66ac1bfdbc40ecad00db32444e57d17ecd1a0c2f9"
          effect_ids: []
          event_digests:
            - "sha256:7dcccf7b4f44cfeacad98b23995e16e6db216e90ba317057f0bed50b5edc82e3"
          mutation_id: "kernel_work_item_execution_required:sha256:d4aeac54730bdac7206dce4dbbb2316262efcfc5f4377b442d9aa0bb32c40906:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        kernel_work_item_inspection_required:sha256:28bddb937f97c5ebe14f5bea90c74a794c5e44ecf5c48145b9d570bf3b75e7b3:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:
          after_revision: 9
          aggregate_digest: "sha256:1f4507e3fe54495a9b9f4fc5cfc13348c3a8bff1c0d09bcc6f4f5b5076c08bf3"
          before_revision: 8
          command_digest: "sha256:532ab96e3413bf3118fed41a6586e9c1318352d11dfe24e6baa8b45603b14723"
          effect_ids: []
          event_digests:
            - "sha256:6c2ca47a73a50c8e1e1920d52cd01d5797928bfeac3b6cf2f008bfa070e0a92d"
          mutation_id: "kernel_work_item_inspection_required:sha256:28bddb937f97c5ebe14f5bea90c74a794c5e44ecf5c48145b9d570bf3b75e7b3:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:
          after_revision: 4
          aggregate_digest: "sha256:f2833fb1cddce293b794a855ea608a55fa8a194cf496ed3e8c7380e0673b6ddf"
          before_revision: 3
          command_digest: "sha256:7d6a7cc4869632b62977fec3696ebdc092981880f75239e444833209844631e8"
          effect_ids: []
          event_digests:
            - "sha256:b3c1f378c34bb728a77e8005b36d265d0e08cb04e7c17d341c68e5c3e8e52352"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        kernel_work_item_rework_claim_required:sha256:7e93e66c055770ff966b425a5fe2d69001220ef80c8f3e02ae6cbdb41f769d6a:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:
          after_revision: 12
          aggregate_digest: "sha256:797da54211ffbee3ec0298b7b8a7dcbc88f0ee8ec6d72b0bf9c4d82a2676f099"
          before_revision: 11
          command_digest: "sha256:17ef81750e8ae20d416d18e8eae2a49e0c1ba08d41c369d7aa47a1db5097b693"
          effect_ids: []
          event_digests:
            - "sha256:6837daae2d5aade7f01068a0e632ab63ca1b2dad32642feafa12636c25413be6"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:7e93e66c055770ff966b425a5fe2d69001220ef80c8f3e02ae6cbdb41f769d6a:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0:
          after_revision: 2
          aggregate_digest: "sha256:2fe074b915e17938d51452019fa63f87e6784f29ce78fb919581241d9ba57386"
          before_revision: 1
          command_digest: "sha256:012805a7da686177f6624a213914a4b90860299850b31c07e311cdabc1f4df4d"
          effect_ids: []
          event_digests:
            - "sha256:c5865672ac56c71f49809dafc30468344a2b1e88de27dff5d14ce8eef5d73c6d"
          mutation_id: "result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0"
        result:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f:
          after_revision: 8
          aggregate_digest: "sha256:5cf0bf98f4c274421401156ba824dca1f8ac4e8e9f5afde9cf0732fa71ec4872"
          before_revision: 7
          command_digest: "sha256:e2676346237ad1fdd896378b02752c5188cb54defb7fd03818d92ece446b40a1"
          effect_ids: []
          event_digests:
            - "sha256:6a2313b44f8eb91c7908350e07213d671fd57f6e12f514a99e4ac0a1be8e58fc"
          mutation_id: "result:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f"
        sha256:705eaa50a44e645bff874f8e707da247dfc0f26535fd9fd271cee6198563e48a:
          after_revision: 7
          aggregate_digest: "sha256:d837cbf6f5f6cf0a734880bfda7d438d8bb8030d75f71a5d818ef9e9ce1356c5"
          before_revision: 6
          command_digest: "sha256:ea224edc8da2bd1fdbc8e579f6deb32a7eea978064fbecfc59ec2f93d9d94280"
          effect_ids: []
          event_digests:
            - "sha256:dd5f34c9d97b808f036466d4e9f1c7be588c16d69f4d84603d03c737b758df8e"
          mutation_id: "sha256:705eaa50a44e645bff874f8e707da247dfc0f26535fd9fd271cee6198563e48a"
        sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f:
          after_revision: 3
          aggregate_digest: "sha256:51f598d607668be04e0879cfe31a297a57102111048ee20c5608df3b9632753a"
          before_revision: 2
          command_digest: "sha256:0644b149c841ad137f859c1f7bcdcb9c37e3fbe59e802c3f80ceeb882978ccee"
          effect_ids: []
          event_digests:
            - "sha256:013185e225a2f383da86946e2803abc17ab18148208f82af949b941e2d24f10b"
          mutation_id: "sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f"
        validation-resolution:sha256:9c90423d82b7fb9d2a877bc3b88287310d0a120955905b19de5c50129c03fb6f:
          after_revision: 11
          aggregate_digest: "sha256:d059dcd522ce9cb363e2ba8f46778c342c0040ff8e8f4c91501ca55aebfb0f01"
          before_revision: 10
          command_digest: "sha256:58b72f9dae28fc7e4fa37fc3d9f8b573c400971b1b5bca77181487a5d353a6e4"
          effect_ids: []
          event_digests:
            - "sha256:4b1d14b147ae5a41a0e0868765ecc6706c9bcb5a13ab011f77481edaebfa0d44"
          mutation_id: "validation-resolution:sha256:9c90423d82b7fb9d2a877bc3b88287310d0a120955905b19de5c50129c03fb6f"
        validation:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f:
          after_revision: 10
          aggregate_digest: "sha256:a092a1f4fab8269a7c6170bcff5cb938f67858da7b5b8a02d3e84127bb6f19d0"
          before_revision: 9
          command_digest: "sha256:1d18c4744c5bc844aa3ce2c5eb6ff1cba37b16370553edd74ff3a2070e039bd6"
          effect_ids: []
          event_digests:
            - "sha256:0c17be38e13e6154f1180314340eeb84cc4389117dc193c03eaeec2c5ee1fbc9"
          mutation_id: "validation:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bind-native-timeout-profile:
          attempt: 2
          claim_id: "sha256:7e9216b1435bde3d574b8066f1caa4b5e1fa3ed5262db4411823d4d80d2854bb"
          definition:
            contract_digest: "sha256:68ffd094bba0d9d50869047182eae53cf8e558114d8c7348d1e15273c62dfa42"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-timeout.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts"
            expected_outputs:
              - "native-timeout-profile-proof"
            id: "bind-native-timeout-profile"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:45cdff82119a06038a1a6ba4977dbaf1cf1f7ad008212690cf0d2c97509f0d6e"
    documents:
      contracts:
        sha256:68ffd094bba0d9d50869047182eae53cf8e558114d8c7348d1e15273c62dfa42:
          acceptance_criteria:
            - "Add an explicit AGENTPLANE_TASK_CHECK_TIMEOUT_MS operator invocation profile accepting only positive decimal integer milliseconds up to86400000; reject empty, zero, negative, fractional, nonnumeric, infinite or overflowing values before process execution. Unset preserves existing script-specific/default budgets."
            - "Preserve explicit AdditionalDirectTaskCommand.timeout_ms precedence and one shared deadline for chained command segments. Do not alter declared command text, test assertions, per-test timeouts or active runs."
            - "Bind the selected profile/effective budgets into native verification input/cache identity and process evidence. Changed profiles cannot reuse older validation evidence; keep no-profile compatibility where sound."
            - "Prove canonical inspection uses the generic profile through its existing command-only path; cover invalid values, precedence, expiration, sequence remaining budget, default behavior and cache separation with bounded tests."
            - "Use only the six admitted files, no Factory or task-ID special cases. Preserve baseline failure evidence, qualify scoped checks, obtain independent review; broad CI remains queued behind the active lane."
          objective: "Allow finite explicit operator timeout profiles for canonical declared checks while binding their selection into verification evidence and cache identity."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts --maxWorkers=1"
            - "bun run typecheck"
            - "bun run hotspots:check"
            - "git diff --check"
      intent:
        context: "Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions."
        objective: "Bind finite native verification timeout profiles"
    events:
      -
        command_digest: "sha256:17dc5c629ef9de9105016719e43ae031f266da42ff0b3827b0e51616172babdd"
        id: "capture:202610111206-7Z8JRN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610111206-7Z8JRN"
        occurred_at: "2026-10-11T12:06:36.314Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610111206-7Z8JRN"
        task_revision: 1
      -
        command_digest: "sha256:012805a7da686177f6624a213914a4b90860299850b31c07e311cdabc1f4df4d"
        id: "result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0"
        occurred_at: "2026-10-11T12:08:35.531Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610111206-7Z8JRN"
        task_revision: 2
      -
        command_digest: "sha256:0644b149c841ad137f859c1f7bcdcb9c37e3fbe59e802c3f80ceeb882978ccee"
        id: "sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f"
        occurred_at: "2026-10-11T12:08:46.341Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610111206-7Z8JRN"
        task_revision: 3
      -
        command_digest: "sha256:7d6a7cc4869632b62977fec3696ebdc092981880f75239e444833209844631e8"
        id: "kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        occurred_at: "2026-10-11T12:08:58.579Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610111206-7Z8JRN"
        task_revision: 4
      -
        command_digest: "sha256:fe3614d8ee6b6f4896e969dc95e5728ace129a271be3a1f7ad8515c327afbab8"
        id: "kernel_work_item_claim_required:sha256:a8ff31a0b7838c65b41b3b49d07d059e5534dfcd63b54a5d521aa9d4a5d5d650:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a8ff31a0b7838c65b41b3b49d07d059e5534dfcd63b54a5d521aa9d4a5d5d650:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        occurred_at: "2026-10-11T12:09:13.904Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610111206-7Z8JRN"
        task_revision: 5
      -
        command_digest: "sha256:6d3e3da3e5f62f23c0914f4f423fecd43f0dbd369a4e4b8781aa4b1eb44e50b3"
        id: "kernel_work_item_execution_required:sha256:57dd57fbfb314e8149a692aaaabbd56055cf32cb8340d933f0ed778217e31c88:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:57dd57fbfb314e8149a692aaaabbd56055cf32cb8340d933f0ed778217e31c88:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        occurred_at: "2026-10-11T12:11:07.266Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610111206-7Z8JRN"
        task_revision: 6
      -
        command_digest: "sha256:ea224edc8da2bd1fdbc8e579f6deb32a7eea978064fbecfc59ec2f93d9d94280"
        id: "sha256:705eaa50a44e645bff874f8e707da247dfc0f26535fd9fd271cee6198563e48a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:705eaa50a44e645bff874f8e707da247dfc0f26535fd9fd271cee6198563e48a"
        occurred_at: "2026-10-11T12:19:00.359Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610111206-7Z8JRN"
        task_revision: 7
      -
        command_digest: "sha256:e2676346237ad1fdd896378b02752c5188cb54defb7fd03818d92ece446b40a1"
        id: "result:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f"
        occurred_at: "2026-10-11T12:19:15.974Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610111206-7Z8JRN"
        task_revision: 8
      -
        command_digest: "sha256:532ab96e3413bf3118fed41a6586e9c1318352d11dfe24e6baa8b45603b14723"
        id: "kernel_work_item_inspection_required:sha256:28bddb937f97c5ebe14f5bea90c74a794c5e44ecf5c48145b9d570bf3b75e7b3:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:28bddb937f97c5ebe14f5bea90c74a794c5e44ecf5c48145b9d570bf3b75e7b3:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        occurred_at: "2026-10-11T12:19:28.103Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610111206-7Z8JRN"
        task_revision: 9
      -
        command_digest: "sha256:1d18c4744c5bc844aa3ce2c5eb6ff1cba37b16370553edd74ff3a2070e039bd6"
        id: "validation:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c514c8ce3e2c951b13c4d860f5ef786f783be5431182984b3485cb4805f5652f"
        occurred_at: "2026-10-11T12:34:54.495Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610111206-7Z8JRN"
        task_revision: 10
      -
        command_digest: "sha256:58b72f9dae28fc7e4fa37fc3d9f8b573c400971b1b5bca77181487a5d353a6e4"
        id: "validation-resolution:sha256:9c90423d82b7fb9d2a877bc3b88287310d0a120955905b19de5c50129c03fb6f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9c90423d82b7fb9d2a877bc3b88287310d0a120955905b19de5c50129c03fb6f"
        occurred_at: "2026-10-11T12:35:00.964Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610111206-7Z8JRN"
        task_revision: 11
      -
        command_digest: "sha256:17ef81750e8ae20d416d18e8eae2a49e0c1ba08d41c369d7aa47a1db5097b693"
        id: "kernel_work_item_rework_claim_required:sha256:7e93e66c055770ff966b425a5fe2d69001220ef80c8f3e02ae6cbdb41f769d6a:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:7e93e66c055770ff966b425a5fe2d69001220ef80c8f3e02ae6cbdb41f769d6a:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        occurred_at: "2026-10-11T12:35:13.775Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610111206-7Z8JRN"
        task_revision: 12
      -
        command_digest: "sha256:1ba3e9b0697a0b4196d745d66ac1bfdbc40ecad00db32444e57d17ecd1a0c2f9"
        id: "kernel_work_item_execution_required:sha256:d4aeac54730bdac7206dce4dbbb2316262efcfc5f4377b442d9aa0bb32c40906:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d4aeac54730bdac7206dce4dbbb2316262efcfc5f4377b442d9aa0bb32c40906:sha256:dce0a12e8aca229ef2e03fae25b8524fc5430f2decad36bd9a5cad1520392c25"
        occurred_at: "2026-10-11T12:35:21.748Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610111206-7Z8JRN"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind finite native verification timeout profiles

Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.

## Scope

- In scope: Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.
- Out of scope: unrelated refactors not required for "Bind finite native verification timeout profiles".

## Plan

1. Execute approved WorkItem bind-native-timeout-profile.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification-timeout.test.ts packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/kernel-inspection-validation.test.ts --maxWorkers=1`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
