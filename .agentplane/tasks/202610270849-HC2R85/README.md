---
id: "202610270849-HC2R85"
title: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T08:51:46.524Z"
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
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
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
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
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
          - "packages/agentplane/src/commands/doctor/archive.test.ts"
          - "packages/agentplane/src/commands/doctor/archive.ts"
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
      digest: "sha256:24f560f34de89f1be390218d7ce8714b205115bcbad51ce0c3732dd26dcbdf26"
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
doc_updated_at: "2026-10-27T08:49:46.969Z"
doc_updated_by: "CODER"
description: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
sections:
  Summary: |-
    Bound doctor archive commit inspection in partial clones without lazy object fetch

    Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
  Scope: |-
    - In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
    - Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".
  Plan: "1. Execute approved WorkItem doctor-archive-local-objects."
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
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
            digest: "sha256:5fbca06a71f710ccdca1a5f8f64ddbf59b13bf6a7100f5f658b5a6b3f9f2e2de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
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
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5e41aa9b2f9f307c1b64522861a6269a4724383ace3dce4f85797583e93e5011"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5fbca06a71f710ccdca1a5f8f64ddbf59b13bf6a7100f5f658b5a6b3f9f2e2de"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            evidence_digest: "sha256:c911782174b0c2497c69f1cf0ebd106176fb5c88bd04b6fad87b5629fa06e439"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3f2c824e90dddf580b95101e62e12d33686489a3abfa600bdf2fbb72840dbad4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5e41aa9b2f9f307c1b64522861a6269a4724383ace3dce4f85797583e93e5011"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
            evidence_digest: "sha256:7cfa9bfd1f79430e185db8eaff3cf7e815048fd4db25c30e1d0b03775e223eec"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
        digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610270849-HC2R85"
      intent_digest: "sha256:b210304f3d1fd2f7a4e4686ee838572cfc6ad5a6761d5d68278b7f5bb0ffc5ca"
      migration_receipts: []
      mutation_receipts:
        capture:202610270849-HC2R85:
          after_revision: 1
          aggregate_digest: "sha256:9724143c494a86b3c4898fa7deb5773b9254e5dd944029d9d53d631651a28b7e"
          before_revision: 0
          command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
          effect_ids: []
          event_digests:
            - "sha256:86a8f3c67c5fbc9b3544f7b62ef618456870f1b15a84fce19fc0c0982440aab9"
          mutation_id: "capture:202610270849-HC2R85"
        kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 5
          aggregate_digest: "sha256:b63e1c611b79795df1298ff1c26f55d3bc9f7187ceab9b04e525c6cd9600357f"
          before_revision: 4
          command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
          effect_ids: []
          event_digests:
            - "sha256:9ffb412303311e3dcd55145149f5e2d532b32f3561b25c80fab6e1bd75a31cd2"
          mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 6
          aggregate_digest: "sha256:13d5ebe44de8fe5e780bce36199ee3a0ab53a9494880f7c38452233b91e46c43"
          before_revision: 5
          command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
          effect_ids: []
          event_digests:
            - "sha256:862a201814e05c1ffcbe63d18f014f33cb18a2346cbe10d686f3295a583de032"
          mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 13
          aggregate_digest: "sha256:72d738b1424c3e2f41867c0c05d905b805cd5a2b08f9db9cd7b32d366a1b11b5"
          before_revision: 12
          command_digest: "sha256:0a6104ca2e68ce808f0da5eef102bed6030784f6fb68f65fc157634b70d4defe"
          effect_ids: []
          event_digests:
            - "sha256:f840514a6e02e9fc7f181c6d24e8d308209e796fefe32b90437310b944db23e5"
          mutation_id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 20
          aggregate_digest: "sha256:b219ac1b2a9815158ba50e59fd9c563307d8f67bf003248e1e9c0cb83abed2f8"
          before_revision: 19
          command_digest: "sha256:f3514e78247e712a5e93ecc8fe048ed7f9b3703a2ad6071ec1821d2d646ad6c6"
          effect_ids: []
          event_digests:
            - "sha256:44c77482e501cf39826242ce8dd8600a807e62ac05adec545b11dd5b5460ac66"
          mutation_id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 16
          aggregate_digest: "sha256:fc74e875e9365d212ba9908b07a40e2a9b0e7fbc7fb746bb3200a4d6df1e2ed2"
          before_revision: 15
          command_digest: "sha256:cb63f3b8fe8fb11df4fa799a9ac917a24dc56e6d13311c3de0e89996b8b8b9b5"
          effect_ids: []
          event_digests:
            - "sha256:ecbeb4b2d42b6e2f72de87c184bd6ff903bcb291fa5b25257ef9268652c51c1b"
          mutation_id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 9
          aggregate_digest: "sha256:442bc31c821a1f2e8f4e21c8cb955ff94f780b3fdf26d715f9463befdcdc41fc"
          before_revision: 8
          command_digest: "sha256:7df589a22a69c0295e46b000bca36b27baf49ea448a6583cf885a1e8666d988c"
          effect_ids: []
          event_digests:
            - "sha256:e2decaf23d0594a6c70973db3811564cc4ff7c1b8e2a0eefaf70e07ff6fdea2f"
          mutation_id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 4
          aggregate_digest: "sha256:7e3bfe10a4832c20456f871676552304eb5b5ba9fc7ab28c97cc27d37fda87f9"
          before_revision: 3
          command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
          effect_ids: []
          event_digests:
            - "sha256:6016af24f5221fd5dff9a036b8c2a844de143abe5128dcf235637f4389374b8a"
          mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 19
          aggregate_digest: "sha256:3c2c5d0256fd4dc4960e0b4e1b7e893e44c978832e9676c0059c24a1123dd2a4"
          before_revision: 18
          command_digest: "sha256:ccd7652631431168d65b2110f7408ccc83bbeeb732cb3b6e02fad7ad9e24adb5"
          effect_ids: []
          event_digests:
            - "sha256:4164763eb69b0d7e66e8364c0585e3ded4f40682ca2fe66fe01b1860babe0b4b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 12
          aggregate_digest: "sha256:3ed9dfd27e7321605444408329d61f7aab5c1ddba350b3e7f9576a8e7c8438ee"
          before_revision: 11
          command_digest: "sha256:72f68d9346dd93bcdb5aebdcd48b758cf4880df732bb17b4bd28441a03104de8"
          effect_ids: []
          event_digests:
            - "sha256:5ef0603b2aa8007a77b08de6c4d34815c8ba6d7d7154ca7318e58921e52f2def"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:
          after_revision: 15
          aggregate_digest: "sha256:03276d7b425849cd7216cc5dbc88f677ff09e6dad7b89c4c366adf81aff7f5d6"
          before_revision: 14
          command_digest: "sha256:e8eb010ea297ea69af2edae5bf70aa1b229b1ef2c84d8f478ab3bc5222f37e9e"
          effect_ids: []
          event_digests:
            - "sha256:db1be3c70a05654223f8d44d2557006072b03936aa8f63e702f87a870551e8c8"
          mutation_id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6:
          after_revision: 8
          aggregate_digest: "sha256:1397cb9b66605017d953c68a02f2f7fc6d9740f691dd4863d2f61384cb3e8c04"
          before_revision: 7
          command_digest: "sha256:5d58bec0797de3621057e87504cc25e13a28b8446d5b6c42b4301147c3c8aa2c"
          effect_ids: []
          event_digests:
            - "sha256:40a1056eef660372734f2531a63760b0de88cda535b95f95f030be859c0205c8"
          mutation_id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6"
        result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:
          after_revision: 2
          aggregate_digest: "sha256:f7b4ba85b56aba3ad5e685cfbf5625f63345eb2233418a3d51410653e3a9d6e5"
          before_revision: 1
          command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
          effect_ids: []
          event_digests:
            - "sha256:1c470b2535b92ae9001f3ce6af8b961178c08a131acb48728d43851011a147ad"
          mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf:
          after_revision: 7
          aggregate_digest: "sha256:08eb9a0e212d5ab7c5f2c0a9cd724efa29bbc86f49d32a2f238d8939b7d0f654"
          before_revision: 6
          command_digest: "sha256:cca3be5f478f0132f836bd1e8669757fed89144538d6fb074b39564697ba12eb"
          effect_ids: []
          event_digests:
            - "sha256:90da6bf377fcf6bdda76319e8fbae4f6619b8d4c2ea9c1e543e91f0348158736"
          mutation_id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf"
        sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:
          after_revision: 3
          aggregate_digest: "sha256:4629f8b206d9b0d41a542b57f181a2b040e89977cac3c35cafeae1f3c5ce641d"
          before_revision: 2
          command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
          effect_ids: []
          event_digests:
            - "sha256:c5aab388a7103ba21929049cce7ba5912f821ef319b0f1c1bcc5e1e31087825a"
          mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
        sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f:
          after_revision: 14
          aggregate_digest: "sha256:a07544afbaa7a02ac8799d971f0a4a38a0d9bed2d2a63cc92c500cd217a48019"
          before_revision: 13
          command_digest: "sha256:66d797b242d407f915f0dd71a9b4d21d661b9a9c7d0a3ec653afa213fda0a393"
          effect_ids: []
          event_digests:
            - "sha256:e567bd07c371a4542af4f520d8d0bfad4d38aeea563860039115bd6c03fbe97f"
          mutation_id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f"
        validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad:
          after_revision: 18
          aggregate_digest: "sha256:47fec27362bc3e2c6012fb8a29c78272697e95456a0d146e6442a610c2254281"
          before_revision: 17
          command_digest: "sha256:3b6d05754e9205b9472a493165446d4a006f9bd2c818d5a10b161572e14de8f8"
          effect_ids: []
          event_digests:
            - "sha256:eb5ea98786b9dbe75de6b9a68b0ef5899e2cd22dc3e59fc973591e96c1e01460"
          mutation_id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad"
        validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f:
          after_revision: 11
          aggregate_digest: "sha256:f8e7e2bf2144c22931e414f2e5b7a2f7f1c95916dd71d4d3795d300c7b64a1a3"
          before_revision: 10
          command_digest: "sha256:c2167c50d2fbc00a20991c0abc774afbef4e95475fed654d29e2303d4df873da"
          effect_ids: []
          event_digests:
            - "sha256:bc1f5781c1ea493c18120caa230fd303dd7f77d1a0f5b34f60054a6ff87f895a"
          mutation_id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f"
        validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:
          after_revision: 17
          aggregate_digest: "sha256:acf6abffc108cb30480bbe69a12fcef5eec5dc975e12a17da4d7452eebafcf28"
          before_revision: 16
          command_digest: "sha256:3cce82ca1bb61c6c2d88b5a2f53a4b85d847a24b5d4a739d4d6c1992e2ff33ca"
          effect_ids: []
          event_digests:
            - "sha256:7ad88b8089684df38b1b57ddaceb0f648ce8f4a722beb390f138e197835f2192"
          mutation_id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea:
          after_revision: 10
          aggregate_digest: "sha256:4cfb1f615be362b013097b79258b9a1180d333090050a6d129aaa5fd74495991"
          before_revision: 9
          command_digest: "sha256:1233737fff33a572ef23cc0e31495ae281ce829b599375047ae9991db82be383"
          effect_ids: []
          event_digests:
            - "sha256:58dd71bc4a49edbda21eeca0002e1910398842f1743914f66ac977bcbab0b1cf"
          mutation_id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea"
      plan_history: []
      revision: 20
      schema_version: 1
      state: "ACTIVE"
      work_items:
        doctor-archive-local-objects:
          attempt: 3
          claim_id: "sha256:efe24cf2d19d9775c2e9d4cabf8aa07c577a844b870ea1fa3d12d0f6ec11a4d7"
          definition:
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 15
          state: "EXECUTING"
          validation: null
    digest: "sha256:a7ce5f8b4e2616ca28e233176916f5d409e9f06b54876666f3928043db85aa19"
    documents:
      contracts:
        sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a:
          acceptance_criteria:
            - "Historical summary lookup never triggers lazy promisor network fetch or unbounded object download; locally available commits continue to classify close-commit references as before."
            - "Missing or unreadable historical objects remain visible as INFO unknown-hash findings, while other doctor failures are unchanged."
            - "Focused tests cover local commit, unavailable historical object, and a promisor-style missing-object lookup without a network fetch."
          objective: "Ensure doctor archive historical DONE-task commit summaries use only locally available Git objects, with bounded process behavior and explicit INFO findings for absent objects in partial/promisor clones."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
        objective: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
    events:
      -
        command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
        id: "capture:202610270849-HC2R85:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610270849-HC2R85"
        occurred_at: "2026-10-27T08:49:46.901Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610270849-HC2R85"
        task_revision: 1
      -
        command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
        id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        occurred_at: "2026-10-27T08:51:07.542Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610270849-HC2R85"
        task_revision: 2
      -
        command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
        id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
        occurred_at: "2026-10-27T08:51:30.345Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610270849-HC2R85"
        task_revision: 3
      -
        command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
        id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:51:54.603Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610270849-HC2R85"
        task_revision: 4
      -
        command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
        id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:52:26.744Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610270849-HC2R85"
        task_revision: 5
      -
        command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
        id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:54:01.570Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610270849-HC2R85"
        task_revision: 6
      -
        command_digest: "sha256:cca3be5f478f0132f836bd1e8669757fed89144538d6fb074b39564697ba12eb"
        id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf"
        occurred_at: "2026-10-27T09:17:02.112Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610270849-HC2R85"
        task_revision: 7
      -
        command_digest: "sha256:5d58bec0797de3621057e87504cc25e13a28b8446d5b6c42b4301147c3c8aa2c"
        id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6"
        occurred_at: "2026-10-27T09:17:12.567Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610270849-HC2R85"
        task_revision: 8
      -
        command_digest: "sha256:7df589a22a69c0295e46b000bca36b27baf49ea448a6583cf885a1e8666d988c"
        id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:17:21.523Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610270849-HC2R85"
        task_revision: 9
      -
        command_digest: "sha256:1233737fff33a572ef23cc0e31495ae281ce829b599375047ae9991db82be383"
        id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea"
        occurred_at: "2026-10-27T09:56:15.542Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610270849-HC2R85"
        task_revision: 10
      -
        command_digest: "sha256:c2167c50d2fbc00a20991c0abc774afbef4e95475fed654d29e2303d4df873da"
        id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f"
        occurred_at: "2026-10-27T09:56:21.800Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610270849-HC2R85"
        task_revision: 11
      -
        command_digest: "sha256:72f68d9346dd93bcdb5aebdcd48b758cf4880df732bb17b4bd28441a03104de8"
        id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:56:37.935Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610270849-HC2R85"
        task_revision: 12
      -
        command_digest: "sha256:0a6104ca2e68ce808f0da5eef102bed6030784f6fb68f65fc157634b70d4defe"
        id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:56:51.624Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610270849-HC2R85"
        task_revision: 13
      -
        command_digest: "sha256:66d797b242d407f915f0dd71a9b4d21d661b9a9c7d0a3ec653afa213fda0a393"
        id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f"
        occurred_at: "2026-10-27T10:34:40.355Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610270849-HC2R85"
        task_revision: 14
      -
        command_digest: "sha256:e8eb010ea297ea69af2edae5bf70aa1b229b1ef2c84d8f478ab3bc5222f37e9e"
        id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        occurred_at: "2026-10-27T10:34:54.465Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610270849-HC2R85"
        task_revision: 15
      -
        command_digest: "sha256:cb63f3b8fe8fb11df4fa799a9ac917a24dc56e6d13311c3de0e89996b8b8b9b5"
        id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:35:05.870Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610270849-HC2R85"
        task_revision: 16
      -
        command_digest: "sha256:3cce82ca1bb61c6c2d88b5a2f53a4b85d847a24b5d4a739d4d6c1992e2ff33ca"
        id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        occurred_at: "2026-10-27T10:44:42.973Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610270849-HC2R85"
        task_revision: 17
      -
        command_digest: "sha256:3b6d05754e9205b9472a493165446d4a006f9bd2c818d5a10b161572e14de8f8"
        id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad"
        occurred_at: "2026-10-27T10:44:48.612Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610270849-HC2R85"
        task_revision: 18
      -
        command_digest: "sha256:ccd7652631431168d65b2110f7408ccc83bbeeb732cb3b6e02fad7ad9e24adb5"
        id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:44:59.996Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610270849-HC2R85"
        task_revision: 19
      -
        command_digest: "sha256:f3514e78247e712a5e93ecc8fe048ed7f9b3703a2ad6071ec1821d2d646ad6c6"
        id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:45:09.597Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610270849-HC2R85"
        task_revision: 20
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bound doctor archive commit inspection in partial clones without lazy object fetch

Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.

## Scope

- In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
- Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".

## Plan

1. Execute approved WorkItem doctor-archive-local-objects.

## Verify Steps

PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
