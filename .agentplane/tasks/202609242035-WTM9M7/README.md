---
id: "202609242035-WTM9M7"
title: "Bind canonical final verification to the observed verification contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:fast"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
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
      - "task.verify"
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
      - "packages/agentplane/src/commands/task"
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
      - "packages/agentplane/src/commands/task"
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
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:d78d82424608c308b74971fddac528e3e64d64d49c0d93326da4588004942040"
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
doc_updated_at: "2026-09-24T20:35:26.748Z"
doc_updated_by: "CODER"
description: "Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record."
sections:
  Summary: |-
    Bind canonical final verification to the observed verification contract

    Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
  Scope: |-
    - In scope: Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
    - Out of scope: unrelated refactors not required for "Bind canonical final verification to the observed verification contract".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "b3af40b4834cbb0b270af1bd5772888d7a8cd97f"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:06efd5b3a8cd51ac6888d33ee3aaaa1c2bfee6120ecb7ec22513c0a75b4f23e6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4e3f2b54e8e8fb81a3064fe1074560235fbb2dd62ef1f2f74e90b8f71f5e9ef8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:06efd5b3a8cd51ac6888d33ee3aaaa1c2bfee6120ecb7ec22513c0a75b4f23e6"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            evidence_digest: "sha256:46f9a8629d144011f84a0991eb5b3003ca58ff7a6c2bac4ed0bcaf19761cde9c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
        digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "observed-contract-ordering"
              - "dynamic-check-regression"
            id: "observed-final-verification"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609242035-WTM9M7"
      intent_digest: "sha256:7a2ac4209bb189b310e70c1c48159de632ba24b8861a7f3fee0d6925febdeb29"
      migration_receipts: []
      mutation_receipts:
        capture:202609242035-WTM9M7:
          after_revision: 1
          aggregate_digest: "sha256:d087299f97c7cb3a793b69e18744def4f0ec228728d9cd3e97a1ab32d3406d75"
          before_revision: 0
          command_digest: "sha256:355f80998e8fade91cfc4aaa42408e9ce3985988b5f571582d8d9f5a89bb1bf9"
          effect_ids: []
          event_digests:
            - "sha256:3be372c321354dc63dbfeb426bdf1775fa448fdfce8c3fd11580975da377ad4c"
          mutation_id: "capture:202609242035-WTM9M7"
        kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 5
          aggregate_digest: "sha256:6e9a4cd954462763207abe53a631a53220c6380af7192e5bb50a83634627167a"
          before_revision: 4
          command_digest: "sha256:404871be7346551dfd753db631f36981f1fda16d170a496c2725beb8096b5de4"
          effect_ids: []
          event_digests:
            - "sha256:822a31fdaee83332d70a4ff15b0e9c43c8076d2832ac8716d8f72945abd3f071"
          mutation_id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 6
          aggregate_digest: "sha256:833097294101178f46ca107082dd3dddca30014045e0df4c76b2caedfedabe2e"
          before_revision: 5
          command_digest: "sha256:97da9e4bed674b92a089efb5e5fbb7e74a97ce9bfaa6abde98128a9efa93bd7f"
          effect_ids: []
          event_digests:
            - "sha256:45eacc17a573b182fe22ae34ad4d2247ff0262781925afc0904d7b9074ff80d6"
          mutation_id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 13
          aggregate_digest: "sha256:feab8a6ff883ca048a0e4f7d0a51443dc66474350f5a5d3e84096f08cfd8eaea"
          before_revision: 12
          command_digest: "sha256:b72c5d1a902b68ede43d7bda36f83409b88bfade301cce49513202658292ccdd"
          effect_ids: []
          event_digests:
            - "sha256:9bb722221df48a7425f6f8e066eabb2b03c61756f18ea92b66ac3da273a57fce"
          mutation_id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 9
          aggregate_digest: "sha256:ea726f5c6d3214f352e0790276247c2023ddd35f23cd4611f8c8e11714d28ac6"
          before_revision: 8
          command_digest: "sha256:c4c78bf43fccf2bf8c66f91eae46b45ad1cf802f348714cbe912ced71e8ca86a"
          effect_ids: []
          event_digests:
            - "sha256:e16ef976af3c75a8c424908edc93c328c8050ecff04d8c18acb06f8fa4a81171"
          mutation_id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 4
          aggregate_digest: "sha256:318a42477f675444a00d2205494ac739cc1a723d9901da1045fe73ba475a1762"
          before_revision: 3
          command_digest: "sha256:750ecb51e720cf84711c1a9eea60801a3e4ae4e5c03f11e82b026d982ccb8a8b"
          effect_ids: []
          event_digests:
            - "sha256:a1b575a790c73cf9086c24a6a1a3d3328dbddb9be08448e4b711cf0f9378322e"
          mutation_id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 12
          aggregate_digest: "sha256:58c7d9fa9358cb679f27ac28f877a4b802f27a114068d8ae69e5ab4406958718"
          before_revision: 11
          command_digest: "sha256:0f87cfedfeab7ee6705f3277511da77f7aa4b6d91199d27e458396d8e05c7aa4"
          effect_ids: []
          event_digests:
            - "sha256:85b31aa4030313c6b954d21ea4638f440e789c50873cf5efa0ca1a0c4b036771"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:
          after_revision: 8
          aggregate_digest: "sha256:9f1074ce36e32d328b5bf771732092bff94d934590388802fffd19cc2d73dc4a"
          before_revision: 7
          command_digest: "sha256:f9a4f664e0dd0d4f16b4965f6095ce83c0cc1efff5fd267393bf3cd1d699eea9"
          effect_ids: []
          event_digests:
            - "sha256:6f6e873310afe35d673495dd6d1918c033951f35c27511e1bcd7c11e163285d5"
          mutation_id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4:
          after_revision: 2
          aggregate_digest: "sha256:4e8a8e2c5a6730ce4df36ca15bc46d2bcfaa6593ee673ca315639c33e9c7244e"
          before_revision: 1
          command_digest: "sha256:a71d0559c411225193056282fb3bdf84efdbbcf2f26b14634f3dfa490219c26c"
          effect_ids: []
          event_digests:
            - "sha256:51af1ca37b8eab56b45333ffc6e2eb009464d4f2f0988b70663ee45cd9b65878"
          mutation_id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4"
        sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97:
          after_revision: 3
          aggregate_digest: "sha256:7911c66a65a0a6611d2ca20df7d455d15c697085f216f6bc604dcf0cff6889ec"
          before_revision: 2
          command_digest: "sha256:80f050281a3776d983b710abdb79da93ef496a97c3d30dd4369a03ef1bc6e579"
          effect_ids: []
          event_digests:
            - "sha256:6d88dee3e1f444350e90134908470781fc19e055ea4be431d6f8bc02d18b0200"
          mutation_id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97"
        sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102:
          after_revision: 7
          aggregate_digest: "sha256:46ab6bbf8b91f25ed1df293e72770596cc1ffa1f3a11a627672f72f4425fe0b7"
          before_revision: 6
          command_digest: "sha256:02b52dc58009ac8c642a9b1ad36f8fa0e94d5e6a8b71bdabaf8f1b19a5369fea"
          effect_ids: []
          event_digests:
            - "sha256:8f2dc6d4765f6ab7d2819c1c7d95e39c9b708a1b6e027e9c4736051b5f675447"
          mutation_id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102"
        validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71:
          after_revision: 11
          aggregate_digest: "sha256:1ad6d4f85698b73624ed6d43046833a715e4f25dd9acfc0b96b85552bd01242c"
          before_revision: 10
          command_digest: "sha256:96d6b4ee2946ebea6df4185481e8bef4011f4b62f86244caf12f9e4f94b744a4"
          effect_ids: []
          event_digests:
            - "sha256:05bca566d4e460d6734d3c2e8cf993e8907d9c8229b3b46f08bf362834157b0b"
          mutation_id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71"
        validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:
          after_revision: 10
          aggregate_digest: "sha256:52f2fe76a20584a3f0374a3a5d2585f864c8eff276a9ab95047ec50612522d74"
          before_revision: 9
          command_digest: "sha256:2a509c362578776d040da3f4b4243883dce389f71f77902e0109da0469369f29"
          effect_ids: []
          event_digests:
            - "sha256:b8cd96dfb2c98d6bc748b91020d4517124cac74aa098dd4e401c08ac3c3d5c5a"
          mutation_id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        observed-final-verification:
          attempt: 2
          claim_id: "sha256:39f79ae9fca43f39c6a643f9e1b580da26a5ea47f0015eb7d83419508bac7701"
          definition:
            contract_digest: "sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "observed-contract-ordering"
              - "dynamic-check-regression"
            id: "observed-final-verification"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:b88bcdad36d383cfe44b9f0d71526beb3d964636a0b346067b8a4196f77c65cd"
    documents:
      contracts:
        sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8:
          acceptance_criteria:
            - "Dynamically required check IDs are present in final validation evidence."
            - "The verification snapshot used for checks is reused for projection."
            - "Canonical Plan commands remain the only executed final commands."
            - "Regression coverage proves docs_contract enrichment cannot outrun evidence construction."
          objective: "Resolve observed verification requirements before canonical final checks and reuse the same verification snapshot for projection."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:fast"
      intent:
        context: "Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record."
        objective: "Bind canonical final verification to the observed verification contract"
    events:
      -
        command_digest: "sha256:355f80998e8fade91cfc4aaa42408e9ce3985988b5f571582d8d9f5a89bb1bf9"
        id: "capture:202609242035-WTM9M7:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609242035-WTM9M7"
        occurred_at: "2026-09-24T20:35:26.701Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609242035-WTM9M7"
        task_revision: 1
      -
        command_digest: "sha256:a71d0559c411225193056282fb3bdf84efdbbcf2f26b14634f3dfa490219c26c"
        id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4"
        occurred_at: "2026-09-24T20:36:13.230Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609242035-WTM9M7"
        task_revision: 2
      -
        command_digest: "sha256:80f050281a3776d983b710abdb79da93ef496a97c3d30dd4369a03ef1bc6e579"
        id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97"
        occurred_at: "2026-09-24T20:36:20.603Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609242035-WTM9M7"
        task_revision: 3
      -
        command_digest: "sha256:750ecb51e720cf84711c1a9eea60801a3e4ae4e5c03f11e82b026d982ccb8a8b"
        id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:36:28.244Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609242035-WTM9M7"
        task_revision: 4
      -
        command_digest: "sha256:404871be7346551dfd753db631f36981f1fda16d170a496c2725beb8096b5de4"
        id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:36:38.404Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609242035-WTM9M7"
        task_revision: 5
      -
        command_digest: "sha256:97da9e4bed674b92a089efb5e5fbb7e74a97ce9bfaa6abde98128a9efa93bd7f"
        id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:37:07.461Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609242035-WTM9M7"
        task_revision: 6
      -
        command_digest: "sha256:02b52dc58009ac8c642a9b1ad36f8fa0e94d5e6a8b71bdabaf8f1b19a5369fea"
        id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102"
        occurred_at: "2026-09-24T20:39:45.098Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609242035-WTM9M7"
        task_revision: 7
      -
        command_digest: "sha256:f9a4f664e0dd0d4f16b4965f6095ce83c0cc1efff5fd267393bf3cd1d699eea9"
        id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        occurred_at: "2026-09-24T20:39:52.754Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609242035-WTM9M7"
        task_revision: 8
      -
        command_digest: "sha256:c4c78bf43fccf2bf8c66f91eae46b45ad1cf802f348714cbe912ced71e8ca86a"
        id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:39:58.749Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609242035-WTM9M7"
        task_revision: 9
      -
        command_digest: "sha256:2a509c362578776d040da3f4b4243883dce389f71f77902e0109da0469369f29"
        id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        occurred_at: "2026-09-24T20:52:42.396Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609242035-WTM9M7"
        task_revision: 10
      -
        command_digest: "sha256:96d6b4ee2946ebea6df4185481e8bef4011f4b62f86244caf12f9e4f94b744a4"
        id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71"
        occurred_at: "2026-09-24T20:52:45.932Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609242035-WTM9M7"
        task_revision: 11
      -
        command_digest: "sha256:0f87cfedfeab7ee6705f3277511da77f7aa4b6d91199d27e458396d8e05c7aa4"
        id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:52:53.323Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609242035-WTM9M7"
        task_revision: 12
      -
        command_digest: "sha256:b72c5d1a902b68ede43d7bda36f83409b88bfade301cce49513202658292ccdd"
        id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:52:57.976Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609242035-WTM9M7"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind canonical final verification to the observed verification contract

Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.

## Scope

- In scope: Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
- Out of scope: unrelated refactors not required for "Bind canonical final verification to the observed verification contract".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
