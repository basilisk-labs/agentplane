---
id: "202610111206-7Z8JRN"
title: "Bind finite native verification timeout profiles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
        kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34:
          after_revision: 4
          aggregate_digest: "sha256:f2833fb1cddce293b794a855ea608a55fa8a194cf496ed3e8c7380e0673b6ddf"
          before_revision: 3
          command_digest: "sha256:7d6a7cc4869632b62977fec3696ebdc092981880f75239e444833209844631e8"
          effect_ids: []
          event_digests:
            - "sha256:b3c1f378c34bb728a77e8005b36d265d0e08cb04e7c17d341c68e5c3e8e52352"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f60cd128dddeade4d178b667183edac801f2c7a6b0dd0ee366816a0dc5a0acc:sha256:c7668b8ae0e61845e1fee14c708acec84e70daa37e4d5f2a61cf81272e8c2b34"
        result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0:
          after_revision: 2
          aggregate_digest: "sha256:2fe074b915e17938d51452019fa63f87e6784f29ce78fb919581241d9ba57386"
          before_revision: 1
          command_digest: "sha256:012805a7da686177f6624a213914a4b90860299850b31c07e311cdabc1f4df4d"
          effect_ids: []
          event_digests:
            - "sha256:c5865672ac56c71f49809dafc30468344a2b1e88de27dff5d14ce8eef5d73c6d"
          mutation_id: "result:sha256:490932b39c49ce78ef11518f4cb4d330dc876a090d4f4b26fe7635bad3e478b0"
        sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f:
          after_revision: 3
          aggregate_digest: "sha256:51f598d607668be04e0879cfe31a297a57102111048ee20c5608df3b9632753a"
          before_revision: 2
          command_digest: "sha256:0644b149c841ad137f859c1f7bcdcb9c37e3fbe59e802c3f80ceeb882978ccee"
          effect_ids: []
          event_digests:
            - "sha256:013185e225a2f383da86946e2803abc17ab18148208f82af949b941e2d24f10b"
          mutation_id: "sha256:cbbd0fcdea78a1a410aacc90be738bf1d9b691616bd05e253ff87ddde9c7df4f"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bind-native-timeout-profile:
          attempt: 1
          claim_id: "sha256:1cea9a36a2ad98c85b7d9c2d6eba15c1d0c4dea3e1143ebf32660b3aa8f468e7"
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
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:b4b3a011e9aec5a5cf292fd2a044c6c53f959ad135144c7f9296c7200da1f144"
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
