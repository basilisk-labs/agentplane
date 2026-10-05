---
id: "202609301755-N31BSK"
title: "Recover policy authority without losing approved task progress"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
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
  - "bun run lint"
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-09-30T17:57:49.503Z"
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
    - "effect_public_api"
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
      - "documentation"
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "."
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "."
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
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
          - "."
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:20325ba44e46969c181778a33036e8b396520b42d3bec114928fef37fb7f9caa"
      escalation_reasons:
        - "effect_public_api"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-30T17:55:12.489Z"
doc_updated_by: "CODER"
description: "Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main."
sections:
  Summary: |-
    Recover policy authority without losing approved task progress

    Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main.
  Scope: |-
    - In scope: Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main.
    - Out of scope: unrelated refactors not required for "Recover policy authority without losing approved task progress".
  Plan: "1. Execute approved WorkItem renew-policy-authority."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_ref: "agentplane/lifecycle-recovery"
    base_sha: "1053fee6f16c70a25154d54d4664ccfe609b5082"
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
            digest: "sha256:fe961a699c8979ea6274f5079afeba65f25ba719b50afb7db0e55048829968fa"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:05bdb090c7d8ab2b46e3b60e3c5bf730199389a48974c7320735317f9f2c4798"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7b1ef82737b59274d60c5ef91a483a2dc20d08e451de0c2cf1698c4017935279"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "."
            task_id: "202609301755-N31BSK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:8a02fbe74d3186ff2bfb999605db7f6ba92efe52828ec995c643d100bb859d40"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:05bdb090c7d8ab2b46e3b60e3c5bf730199389a48974c7320735317f9f2c4798"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7b1ef82737b59274d60c5ef91a483a2dc20d08e451de0c2cf1698c4017935279"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:fe961a699c8979ea6274f5079afeba65f25ba719b50afb7db0e55048829968fa"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3d387419ca711425815c088c1c88594c57b1ac77426e2539b1c881382fcb88f7"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "."
            task_id: "202609301755-N31BSK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.policy-authority-renewal.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-kernel/policy-renewal.test.ts"
              - "website/static/llms-full.txt"
            evidence_digest: "sha256:5f834837e953a6ff5532ffbbeb257ab5647df018a01037ee6e828cc0252af7fb"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:7b1ef82737b59274d60c5ef91a483a2dc20d08e451de0c2cf1698c4017935279"
        digest: "sha256:05bdb090c7d8ab2b46e3b60e3c5bf730199389a48974c7320735317f9f2c4798"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5a9478298046d968a635440928d4be6d91b954aa328e464cfb8312443e607a1a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "docs/user"
                - "website/docs"
                - "website/static/llms-full.txt"
            expected_outputs:
              - "policy-authority-recovery"
            id: "renew-policy-authority"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609301755-N31BSK"
      intent_digest: "sha256:a1c3487693a06a729ee57c7a32b1d23e3184f2bc3d63dd43d9d5fb9a8d4dc6bd"
      migration_receipts: []
      mutation_receipts:
        capture:202609301755-N31BSK:
          after_revision: 1
          aggregate_digest: "sha256:d1b9be0efe39e92a0c4c20b3a23121383fc0b0b9faa95fce43da76bc17030aad"
          before_revision: 0
          command_digest: "sha256:325e86fde860e1f99c65443171508e634c59fcba93016a965e0f6bf79e83b90b"
          effect_ids: []
          event_digests:
            - "sha256:87441bae66735b2dbb845a2f75efa26d4303c77d25e661c1c25ffc0f1b650279"
          mutation_id: "capture:202609301755-N31BSK"
        kernel_work_item_claim_required:sha256:adaeb3c9bb68e5f69760fe1bb05b93e18cf1476c8b92f3247286441556b004b1:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 5
          aggregate_digest: "sha256:ba1d79ced2b38a4d03ee1e6c87e5f65e90b0ce11cb8ef5678f0f0323b8c6c4e4"
          before_revision: 4
          command_digest: "sha256:1f0ac0ba0a6a38cf8c1f5471cb57d27b629fe85205207b08423334e29bfe0a42"
          effect_ids: []
          event_digests:
            - "sha256:34778f621eca240990469c705be474c6e40c54779b78e41e79293877fb6d446d"
          mutation_id: "kernel_work_item_claim_required:sha256:adaeb3c9bb68e5f69760fe1bb05b93e18cf1476c8b92f3247286441556b004b1:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_execution_required:sha256:371eb4ea1e8ff7abc845883bbdad0188adf97af49904e0042b5a90698e2c2196:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 6
          aggregate_digest: "sha256:3e8b1c985c22cef8debfd36694701087bc993cf6acca1db5e68d058865b3c835"
          before_revision: 5
          command_digest: "sha256:48036a706148f4be6f07c4b5db5564c60cd0b2fdf38c5e778e09a7165161fba8"
          effect_ids: []
          event_digests:
            - "sha256:4e1e64047518ef80d895ec8f797951ead4027c110c397abb33051d9cd5aa778b"
          mutation_id: "kernel_work_item_execution_required:sha256:371eb4ea1e8ff7abc845883bbdad0188adf97af49904e0042b5a90698e2c2196:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_materialization_required:sha256:d9cbba415e696db1f6f00f3a63afd1526c52e914f307d2080dcead8690aaa1e6:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 4
          aggregate_digest: "sha256:b6dafb10bcd974f2cb142c9a250532c0eeb3d29f6d9ef2cc0e139ed9c0aeec2d"
          before_revision: 3
          command_digest: "sha256:56d79261a85c00308fde398432262e89fb0fd249eca4d3e34e91f4d088e291e5"
          effect_ids: []
          event_digests:
            - "sha256:031842a9840d1980e257fd9c8326897e8c22894aa502cb5d5978e4a890d9c106"
          mutation_id: "kernel_work_item_materialization_required:sha256:d9cbba415e696db1f6f00f3a63afd1526c52e914f307d2080dcead8690aaa1e6:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        result:sha256:0a6966a04cf4d14a15e2bc80a65e05ec2c862aa4b70068b1bdbf1dc883180510:
          after_revision: 2
          aggregate_digest: "sha256:b5dddfcb9385ae935ff8452980d4d2ae8403132a018a016121d2969f6a749ac6"
          before_revision: 1
          command_digest: "sha256:23e099c8017df011189bb1fc2d7ee3568d9c303409deecc8369cdaa19c67d376"
          effect_ids: []
          event_digests:
            - "sha256:4d29b8f57425eb02cd06537ecb48fef4cdeb8f6caad95426557169d92450ad2c"
          mutation_id: "result:sha256:0a6966a04cf4d14a15e2bc80a65e05ec2c862aa4b70068b1bdbf1dc883180510"
        semantic-stop:sha256:fc6dfe1bc0045a6b24ac123679ae8a16a3a848f92673d5081c668b4e39ac1f57:
          after_revision: 8
          aggregate_digest: "sha256:1e4d12de869b2308652455cde8ff19bb907c783a568d9590a2f92a4225f429f4"
          before_revision: 7
          command_digest: "sha256:4d4816e99f9a0cf6fd27fd21d7c41edf511262e90982581cb0ecee640821c9d8"
          effect_ids: []
          event_digests:
            - "sha256:e8f7481699f0ea97c3ac88d0b099cc9fef9b7368b0f020f26746246550ef40f2"
          mutation_id: "semantic-stop:sha256:fc6dfe1bc0045a6b24ac123679ae8a16a3a848f92673d5081c668b4e39ac1f57"
        sha256:28c40935824ff758bb369b9ee93589d0f0b11d687c0890bf94482780cb30d06c:
          after_revision: 3
          aggregate_digest: "sha256:05bbf9bd9503ce8988ed17e4dc856336a25d393c607094afdcfb8ce908e08585"
          before_revision: 2
          command_digest: "sha256:340d7955f5140c29531109ef1529a66f4af9022ebb4ae37323c24140494795dd"
          effect_ids: []
          event_digests:
            - "sha256:e03ab1f4ac35c714520be21949b35df9f1cc6fe8cabf76e6405a53ff564b64e6"
          mutation_id: "sha256:28c40935824ff758bb369b9ee93589d0f0b11d687c0890bf94482780cb30d06c"
        sha256:6447c33eab4afe02e54a3b955c2f585fc6a4c5a302e6ae4584a8c0da4ba3f01a:
          after_revision: 7
          aggregate_digest: "sha256:d3b739d80ba45cadab89d086f743e412551109af20b3a384826d98d38293df33"
          before_revision: 6
          command_digest: "sha256:8ac03a24385f5adccc065d488bd9093c6e770d0942fae60437e65d237408f74b"
          effect_ids: []
          event_digests:
            - "sha256:a412063325339ed60edc35b658a2ebe96a9b17db6ab95dc61f6b277fe13e78fe"
          mutation_id: "sha256:6447c33eab4afe02e54a3b955c2f585fc6a4c5a302e6ae4584a8c0da4ba3f01a"
      plan_history: []
      revision: 8
      schema_version: 1
      state: "ACTIVE"
      work_items:
        renew-policy-authority:
          attempt: 1
          claim_id: "sha256:79dd8fcbde0d9e506b046ec27e532bd4c54887eb564bfc19438c97010d192934"
          definition:
            contract_digest: "sha256:5a9478298046d968a635440928d4be6d91b954aa328e464cfb8312443e607a1a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "docs/user"
                - "website/docs"
                - "website/static/llms-full.txt"
            expected_outputs:
              - "policy-authority-recovery"
            id: "renew-policy-authority"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "BLOCKED"
          validation: null
    digest: "sha256:a3cebca017873a84be6458c42a7e3d2e1b1127743eba381cb16d72d668ddb158"
    documents:
      contracts:
        sha256:5a9478298046d968a635440928d4be6d91b954aa328e464cfb8312443e607a1a:
          acceptance_criteria:
            - "Policy drift blocks ordinary continuation until explicit USER renewal."
            - "Renewal appends bound authority evidence while preserving plan and completed or active WorkItems."
            - "Forged approval, stale context, broadened authority, terminal tasks and uncertain effects are refused without mutation."
            - "Legacy migration still reaches PLANNING."
            - "CLI help and lifecycle documentation describe recovery."
          objective: "Implement explicit task plan approve --renew-authority for an unchanged approved plan after policy drift. Preserve Task state, WorkItem progress, outputs, verification and audit lineage. Require native USER approval and exact current repository binding. Do not widen scope, capabilities, effects, resources or obligations. Retain fail-closed ordinary continuation. Add regression tests, CLI help and recovery documentation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run lint"
            - "bun run test:full"
      intent:
        context: "Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main."
        objective: "Recover policy authority without losing approved task progress"
    events:
      -
        command_digest: "sha256:325e86fde860e1f99c65443171508e634c59fcba93016a965e0f6bf79e83b90b"
        id: "capture:202609301755-N31BSK:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609301755-N31BSK"
        occurred_at: "2026-09-30T17:55:12.454Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609301755-N31BSK"
        task_revision: 1
      -
        command_digest: "sha256:23e099c8017df011189bb1fc2d7ee3568d9c303409deecc8369cdaa19c67d376"
        id: "result:sha256:0a6966a04cf4d14a15e2bc80a65e05ec2c862aa4b70068b1bdbf1dc883180510:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:0a6966a04cf4d14a15e2bc80a65e05ec2c862aa4b70068b1bdbf1dc883180510"
        occurred_at: "2026-09-30T17:57:32.984Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609301755-N31BSK"
        task_revision: 2
      -
        command_digest: "sha256:340d7955f5140c29531109ef1529a66f4af9022ebb4ae37323c24140494795dd"
        id: "sha256:28c40935824ff758bb369b9ee93589d0f0b11d687c0890bf94482780cb30d06c:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:28c40935824ff758bb369b9ee93589d0f0b11d687c0890bf94482780cb30d06c"
        occurred_at: "2026-09-30T17:57:42.495Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609301755-N31BSK"
        task_revision: 3
      -
        command_digest: "sha256:56d79261a85c00308fde398432262e89fb0fd249eca4d3e34e91f4d088e291e5"
        id: "kernel_work_item_materialization_required:sha256:d9cbba415e696db1f6f00f3a63afd1526c52e914f307d2080dcead8690aaa1e6:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:d9cbba415e696db1f6f00f3a63afd1526c52e914f307d2080dcead8690aaa1e6:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:57:51.332Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609301755-N31BSK"
        task_revision: 4
      -
        command_digest: "sha256:1f0ac0ba0a6a38cf8c1f5471cb57d27b629fe85205207b08423334e29bfe0a42"
        id: "kernel_work_item_claim_required:sha256:adaeb3c9bb68e5f69760fe1bb05b93e18cf1476c8b92f3247286441556b004b1:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:adaeb3c9bb68e5f69760fe1bb05b93e18cf1476c8b92f3247286441556b004b1:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:57:58.924Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609301755-N31BSK"
        task_revision: 5
      -
        command_digest: "sha256:48036a706148f4be6f07c4b5db5564c60cd0b2fdf38c5e778e09a7165161fba8"
        id: "kernel_work_item_execution_required:sha256:371eb4ea1e8ff7abc845883bbdad0188adf97af49904e0042b5a90698e2c2196:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:371eb4ea1e8ff7abc845883bbdad0188adf97af49904e0042b5a90698e2c2196:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:58:47.085Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609301755-N31BSK"
        task_revision: 6
      -
        command_digest: "sha256:8ac03a24385f5adccc065d488bd9093c6e770d0942fae60437e65d237408f74b"
        id: "sha256:6447c33eab4afe02e54a3b955c2f585fc6a4c5a302e6ae4584a8c0da4ba3f01a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6447c33eab4afe02e54a3b955c2f585fc6a4c5a302e6ae4584a8c0da4ba3f01a"
        occurred_at: "2026-09-30T18:46:57.404Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609301755-N31BSK"
        task_revision: 7
      -
        command_digest: "sha256:4d4816e99f9a0cf6fd27fd21d7c41edf511262e90982581cb0ecee640821c9d8"
        id: "semantic-stop:sha256:fc6dfe1bc0045a6b24ac123679ae8a16a3a848f92673d5081c668b4e39ac1f57:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:fc6dfe1bc0045a6b24ac123679ae8a16a3a848f92673d5081c668b4e39ac1f57"
        occurred_at: "2026-09-30T18:46:59.372Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609301755-N31BSK"
        task_revision: 8
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover policy authority without losing approved task progress

Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main.

## Scope

- In scope: Fix the confirmed Factory policy-drift recovery blocker with explicit operator approval, bounded authority, preserved task progress and audit evidence. Include regression tests, CLI help and user documentation. Existing migration to PLANNING is already fixed in fresh main.
- Out of scope: unrelated refactors not required for "Recover policy authority without losing approved task progress".

## Plan

1. Execute approved WorkItem renew-policy-authority.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
