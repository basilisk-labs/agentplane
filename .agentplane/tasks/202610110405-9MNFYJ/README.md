---
id: "202610110405-9MNFYJ"
title: "Preserve merged-review assertions through a bounded testkit extraction"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "v0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run format:check"
  - "bun run hotspots:check"
  - "bun run lint"
  - "bun run test:project agentplane -- packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T04:09:32.401Z"
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
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
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
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
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
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
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
      digest: "sha256:f256ffc76fece5f0254da854679e80634df2a611d538f0e782168cbbdcaa4962"
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
doc_updated_at: "2026-10-11T04:05:34.342Z"
doc_updated_by: "CODER"
description: "Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work."
sections:
  Summary: |-
    Preserve merged-review assertions through a bounded testkit extraction

    Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.
  Scope: |-
    - In scope: Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.
    - Out of scope: unrelated refactors not required for "Preserve merged-review assertions through a bounded testkit extraction".
  Plan: "1. Execute approved WorkItem extract-merged-base-assertions."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane -- packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "task/202610102344-1WXGZ1/completed-review-base"
    base_sha: "894d510c79814d9ae2aa50b8b2da4c6c7b1b2e49"
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
            digest: "sha256:b0a248531bc4c9e0011b76ebe25132ea64c09ae0f28663d391153b26b0de07c5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ffdf413abf906b6d9e4fbb7b0dd9dce6a4dd6cae5730b9fb9be6475343410953"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6b634b3d75b1534abaf276b0998b66720e4e1d62cbed11ca00810ff95489d747"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
            task_id: "202610110405-9MNFYJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:6b634b3d75b1534abaf276b0998b66720e4e1d62cbed11ca00810ff95489d747"
        digest: "sha256:ffdf413abf906b6d9e4fbb7b0dd9dce6a4dd6cae5730b9fb9be6475343410953"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d6a33a6f9b7ea32c1fc5a8d8bd295a4e9c3f978246cc9080006b60b870c26710"
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
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
            expected_outputs:
              - "testkit-extraction-evidence"
            id: "extract-merged-base-assertions"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610110405-9MNFYJ"
      intent_digest: "sha256:c1cf5d26bfde72acb84c7c1bbd668d0d3b47c0654a2a4cb21c8af63b8cd34f62"
      migration_receipts: []
      mutation_receipts:
        capture:202610110405-9MNFYJ:
          after_revision: 1
          aggregate_digest: "sha256:f2bdd6721b7b93d311199f9b5b029db63743c129ea9fa99079d93d1a0b2ab906"
          before_revision: 0
          command_digest: "sha256:a45a8b46e50359ff4a491f08d6de80ba37b1f6c184abf8e8bea9889bb63fdf38"
          effect_ids: []
          event_digests:
            - "sha256:be2adb068e48c6853a0c8dc95899a194200a6296e2c0c34d92c126c69790b531"
          mutation_id: "capture:202610110405-9MNFYJ"
        kernel_work_item_claim_required:sha256:ba503291d17b4101387e7683692c3197e5ce1d43a63602a21d465d1a9cd713a1:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:
          after_revision: 5
          aggregate_digest: "sha256:8764960e7a18cc1d40e6805fb0a39ec214d0e758bac31faca0b9f1a5830e3902"
          before_revision: 4
          command_digest: "sha256:91fd1642f0405c61464ee669716ee904b38ec2c678205c3b49f68a74dd3693ff"
          effect_ids: []
          event_digests:
            - "sha256:d4629deceb1d07af1314ef681c71576b781113adb595a8417d5397665c46a31b"
          mutation_id: "kernel_work_item_claim_required:sha256:ba503291d17b4101387e7683692c3197e5ce1d43a63602a21d465d1a9cd713a1:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        kernel_work_item_execution_required:sha256:8f51be0fdaf32dc5ab9ac00db7d6123a52c154f866a1a846884c8d4510f8a349:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:
          after_revision: 6
          aggregate_digest: "sha256:48e5e13f4089decd1f3c457bf0bc626691e2d2b9fcd75646a76ef4c320ea4de6"
          before_revision: 5
          command_digest: "sha256:86012454afd68c7585550c580474bdc93c49c51495670a81010023bd93afdbb9"
          effect_ids: []
          event_digests:
            - "sha256:e0436c25a42ff0ef75dac3e5565094fc2f8eecc66cb250ff940e4e9cd9840d31"
          mutation_id: "kernel_work_item_execution_required:sha256:8f51be0fdaf32dc5ab9ac00db7d6123a52c154f866a1a846884c8d4510f8a349:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        kernel_work_item_materialization_required:sha256:5040dd96b0fec0d197db3e4299339d9f763843ca95b82417b4bdeef88e45b95b:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:
          after_revision: 4
          aggregate_digest: "sha256:72f6f97aedd939c80dcd330d69e7e73d2dcbb053d7d52d0a3a980bbf6faae80c"
          before_revision: 3
          command_digest: "sha256:6c272c9644bcdc24d0d2997e171d29ed4b60fe1a8423f4bca35baf3e8a759bde"
          effect_ids: []
          event_digests:
            - "sha256:0695723623eee7f3cb80c0405468fd9c2af7731cd04db1a8f17eccb8192a2cfd"
          mutation_id: "kernel_work_item_materialization_required:sha256:5040dd96b0fec0d197db3e4299339d9f763843ca95b82417b4bdeef88e45b95b:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        result:sha256:96e61d6202102e80505540bb5124039189c3a6f36161ad2eb580895ca6813a8a:
          after_revision: 2
          aggregate_digest: "sha256:8dd5f302c79b4751c7e42413ab50b15e3e101109c239ad2c24fd45e3edd1ab2d"
          before_revision: 1
          command_digest: "sha256:474b75c8f4f76bd16477215858954ee4cddeecb0537965a1c06c08816bb404ea"
          effect_ids: []
          event_digests:
            - "sha256:ee9b6ac3cdd4d6ac125e36661bb245e0e24b2489b9adb57a5ef60e3628557a5b"
          mutation_id: "result:sha256:96e61d6202102e80505540bb5124039189c3a6f36161ad2eb580895ca6813a8a"
        sha256:3817e173f82c30fd74a8a9d21cd6edb92d8ea5a1c0e1915f358010a95f6cabde:
          after_revision: 3
          aggregate_digest: "sha256:6edf36c9c3ddc95ea85164c57a7cd5fc790c2612341cb8b8d0805d24a02aecdd"
          before_revision: 2
          command_digest: "sha256:e4d00dd09aeca8d88f1ff14008c2cde29ee632f344b9ee0a26f9753bbe4ee82d"
          effect_ids: []
          event_digests:
            - "sha256:cab3804370c6fe8f1f7a1ea5d2adcc991222d89e8d060943bf0f2e56c8f80883"
          mutation_id: "sha256:3817e173f82c30fd74a8a9d21cd6edb92d8ea5a1c0e1915f358010a95f6cabde"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        extract-merged-base-assertions:
          attempt: 1
          claim_id: "sha256:c301f6d358bee60cf2c33e26ae7aa9f8c933fb316f62633ba8a07f681376da57"
          definition:
            contract_digest: "sha256:d6a33a6f9b7ea32c1fc5a8d8bd295a4e9c3f978246cc9080006b60b870c26710"
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
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
            expected_outputs:
              - "testkit-extraction-evidence"
            id: "extract-merged-base-assertions"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:54a02caa3414a4cadba6865496d6219c8fcdd96ab52421f44cb2ce36cbdabd28"
    documents:
      contracts:
        sha256:d6a33a6f9b7ea32c1fc5a8d8bd295a4e9c3f978246cc9080006b60b870c26710:
          acceptance_criteria:
            - "Extract the coherent merged-base assertion block into the admitted existing testkit with explicit inputs and invoke it at the same point in the real native journey."
            - "Preserve accepted owner and merged-base authentication assertions, owner-only preparation/result mutation rejection, changed quality-review rejection, clean-state assertion and worktree cleanup. Do not weaken or remove assertions."
            - "Keep the test below the existing 1000-line oversized entry threshold through semantic extraction. Preserve all baseline bytes and production source; do not compress formatting or raise thresholds."
            - "Run all five declared verification commands on final source; retain failures and bind source/log hashes in testkit-extraction-evidence. Independent EVALUATOR must review the actual change before native completion."
            - "Preserve parent task history, hosted failure and superseded erroneous intake. No live provider action in semantic work, no fabricated closure and no transfer of old PASS to a new head."
          objective: "Move the existing crashPhase none merged-base assertion block into a reusable helper in the existing testkit, with explicit typed inputs. Preserve the real native journey, all assertions and cleanup. Restore the existing oversized-test ratchet without baseline changes, assertion removal, formatting compression, production edits or network activity. Return exact source and command evidence for independent evaluation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane -- packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
            - "bun run hotspots:check"
            - "bun run typecheck"
            - "bun run lint"
            - "bun run format:check"
      intent:
        context: "Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work."
        objective: "Preserve merged-review assertions through a bounded testkit extraction"
    events:
      -
        command_digest: "sha256:a45a8b46e50359ff4a491f08d6de80ba37b1f6c184abf8e8bea9889bb63fdf38"
        id: "capture:202610110405-9MNFYJ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610110405-9MNFYJ"
        occurred_at: "2026-10-11T04:05:34.214Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610110405-9MNFYJ"
        task_revision: 1
      -
        command_digest: "sha256:474b75c8f4f76bd16477215858954ee4cddeecb0537965a1c06c08816bb404ea"
        id: "result:sha256:96e61d6202102e80505540bb5124039189c3a6f36161ad2eb580895ca6813a8a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:96e61d6202102e80505540bb5124039189c3a6f36161ad2eb580895ca6813a8a"
        occurred_at: "2026-10-11T04:08:33.784Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610110405-9MNFYJ"
        task_revision: 2
      -
        command_digest: "sha256:e4d00dd09aeca8d88f1ff14008c2cde29ee632f344b9ee0a26f9753bbe4ee82d"
        id: "sha256:3817e173f82c30fd74a8a9d21cd6edb92d8ea5a1c0e1915f358010a95f6cabde:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3817e173f82c30fd74a8a9d21cd6edb92d8ea5a1c0e1915f358010a95f6cabde"
        occurred_at: "2026-10-11T04:09:10.779Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610110405-9MNFYJ"
        task_revision: 3
      -
        command_digest: "sha256:6c272c9644bcdc24d0d2997e171d29ed4b60fe1a8423f4bca35baf3e8a759bde"
        id: "kernel_work_item_materialization_required:sha256:5040dd96b0fec0d197db3e4299339d9f763843ca95b82417b4bdeef88e45b95b:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5040dd96b0fec0d197db3e4299339d9f763843ca95b82417b4bdeef88e45b95b:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        occurred_at: "2026-10-11T04:09:45.155Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610110405-9MNFYJ"
        task_revision: 4
      -
        command_digest: "sha256:91fd1642f0405c61464ee669716ee904b38ec2c678205c3b49f68a74dd3693ff"
        id: "kernel_work_item_claim_required:sha256:ba503291d17b4101387e7683692c3197e5ce1d43a63602a21d465d1a9cd713a1:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ba503291d17b4101387e7683692c3197e5ce1d43a63602a21d465d1a9cd713a1:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        occurred_at: "2026-10-11T04:10:30.450Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610110405-9MNFYJ"
        task_revision: 5
      -
        command_digest: "sha256:86012454afd68c7585550c580474bdc93c49c51495670a81010023bd93afdbb9"
        id: "kernel_work_item_execution_required:sha256:8f51be0fdaf32dc5ab9ac00db7d6123a52c154f866a1a846884c8d4510f8a349:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:8f51be0fdaf32dc5ab9ac00db7d6123a52c154f866a1a846884c8d4510f8a349:sha256:3f6c4a60f440e8cec0d555b6df8a0bd329b923ff8de1c84cf604a89226145199"
        occurred_at: "2026-10-11T10:00:09.502Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610110405-9MNFYJ"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve merged-review assertions through a bounded testkit extraction

Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.

## Scope

- In scope: Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.
- Out of scope: unrelated refactors not required for "Preserve merged-review assertions through a bounded testkit extraction".

## Plan

1. Execute approved WorkItem extract-merged-base-assertions.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane -- packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
