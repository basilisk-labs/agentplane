---
id: "202609231207-R59HKK"
title: "Make canonical supervisor transitions recoverable across branch lifecycle boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-verification-contract.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T12:08:53.053Z"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
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
    - "repository_branch_pr_floor"
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
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
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
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-23T12:07:39.850Z"
doc_updated_by: "CODER"
description: "Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution."
sections:
  Summary: |-
    Make canonical supervisor transitions recoverable across branch lifecycle boundaries

    Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.
  Scope: |-
    - In scope: Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.
    - Out of scope: unrelated refactors not required for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries".
  Plan: "1. Execute approved WorkItem supervisor-transition-recovery."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "940209a800dedc5b27c382a2642dff316b30a8fc"
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
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7251c4a4fdc2680745a78ee3a76d587bd234ca28cc4855374b9eab8b417ac502"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c7e4e13963ee3e176d46d80eff725163587d243761643fc175af5d05a235650d"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2855cd654fca779350491011e8d549f49f5f1e129ef6236e9d1c0b3a3a5e673d"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Current repository source and existing test infrastructure"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
            task_id: "202609231207-R59HKK"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-verification-contract.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2855cd654fca779350491011e8d549f49f5f1e129ef6236e9d1c0b3a3a5e673d"
        digest: "sha256:c7e4e13963ee3e176d46d80eff725163587d243761643fc175af5d05a235650d"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:842789e44324dcc3e47e695dbaa8cdd9c83b05721b50d23e0a93ba872bfa385d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Current repository source and existing test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
            expected_outputs:
              - "supervisor-recovery-code"
              - "supervisor-recovery-regressions"
              - "local-verification-evidence"
            id: "supervisor-transition-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609231207-R59HKK"
      intent_digest: "sha256:b919c9f53bbd28fe30419da703af3d8cb4dcff8072b40bd76f4f8849fb91d65a"
      migration_receipts: []
      mutation_receipts:
        capture:202609231207-R59HKK:
          after_revision: 1
          aggregate_digest: "sha256:7f0703f0d29e562c4bc2153676ca6185002184ea313060d71ce09167d6f57357"
          before_revision: 0
          command_digest: "sha256:acf495c6cc304ea238190276edd864d47574f0f25c2aa2d93ac87670568b0cfb"
          effect_ids: []
          event_digests:
            - "sha256:b4d097d34e890aca2ae70ce1ee673e666f4b1f239f0a61df2f620042d5bf93cb"
          mutation_id: "capture:202609231207-R59HKK"
        kernel_work_item_claim_required:sha256:abbc04077e022bb9394cdb379786cebd14c97bb6a914b5617d8050c6a4d660c2:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:
          after_revision: 5
          aggregate_digest: "sha256:e943ee14f4ae0900914ae52e807267deb50a3c2a1976df8a29ac1a742429c4d0"
          before_revision: 4
          command_digest: "sha256:326775493038bb8ba0a5018bcfa8ec8e1c3eed9f11cf536ff53e6a38739e9de3"
          effect_ids: []
          event_digests:
            - "sha256:2e362db650cc288eadbe0aaae3fd023e5a082535cba14f71d1fa87383193cd25"
          mutation_id: "kernel_work_item_claim_required:sha256:abbc04077e022bb9394cdb379786cebd14c97bb6a914b5617d8050c6a4d660c2:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        kernel_work_item_execution_required:sha256:1e6723e28fcab9fb90ba5c5771a4e043d4c07b700cbcc71b66eb522607b47b63:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:
          after_revision: 6
          aggregate_digest: "sha256:7301c029c6941eadcf68d1e9abc38f36e2177270c28e1be2caedacc2198b3382"
          before_revision: 5
          command_digest: "sha256:2c39f262b9a9c8ed4bfa0d173600d6d161713a04300c691b449006bd12071385"
          effect_ids: []
          event_digests:
            - "sha256:1a56ef7432785d73189f23de5c8f0b27f7156c9efa7e44d5d7abbaebf0db31cf"
          mutation_id: "kernel_work_item_execution_required:sha256:1e6723e28fcab9fb90ba5c5771a4e043d4c07b700cbcc71b66eb522607b47b63:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        kernel_work_item_materialization_required:sha256:e22d0020a8e05573424ab338b64ba41c5d48d65905bc83774cdadd31b0843450:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:
          after_revision: 4
          aggregate_digest: "sha256:892484fc15d799c9db613b09fae19becbf1c431a8f515c572779e3bcc6230d1c"
          before_revision: 3
          command_digest: "sha256:5299a9e5762a92565dd2d85929724ea226a5650b5e102b56300b9c1e1a087c4a"
          effect_ids: []
          event_digests:
            - "sha256:d36e0b781384b6c49f5fe86491a0e0b98909a4bc639f28f6fbd102daf3469b7d"
          mutation_id: "kernel_work_item_materialization_required:sha256:e22d0020a8e05573424ab338b64ba41c5d48d65905bc83774cdadd31b0843450:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        result:sha256:dd3d1072d12cd77877451d763324dde46f0b124a02b6dc21c9b6c78fa4a88885:
          after_revision: 2
          aggregate_digest: "sha256:7cc07f35242f205cd8f85262b10d8d1a8e0bb356dd3051bf19744be46b746af7"
          before_revision: 1
          command_digest: "sha256:8ee93e10ac6ef607bd5c7a07826c82c7590c3555658fbdec5d1ee9c2869c984d"
          effect_ids: []
          event_digests:
            - "sha256:66194084eae84ec9d773d8189433e9a200eb3cc855c9c3b0636816daa4f65557"
          mutation_id: "result:sha256:dd3d1072d12cd77877451d763324dde46f0b124a02b6dc21c9b6c78fa4a88885"
        sha256:1301a5c32f9c2553e25cdf3dfec2af67a72749abbebe667293ae873d19a37025:
          after_revision: 3
          aggregate_digest: "sha256:f97f72d45cef615a29c5228d2bb6171ea1c58bfb6e92354c1ef23d996ac3eefd"
          before_revision: 2
          command_digest: "sha256:370d82edee191312a78b627107741b8ae2e0302907f8cec97b8fffed0d9231d1"
          effect_ids: []
          event_digests:
            - "sha256:de162af0420c042b7b5aa12e035fd89d7dbb491a1321f2d700cf34371498e380"
          mutation_id: "sha256:1301a5c32f9c2553e25cdf3dfec2af67a72749abbebe667293ae873d19a37025"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        supervisor-transition-recovery:
          attempt: 1
          claim_id: "sha256:2d9c2dc5225aa2dec58894b9d80baa4e2c08e4b5fbfcf88f030ad13d139877be"
          definition:
            contract_digest: "sha256:842789e44324dcc3e47e695dbaa8cdd9c83b05721b50d23e0a93ba872bfa385d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Current repository source and existing test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
            expected_outputs:
              - "supervisor-recovery-code"
              - "supervisor-recovery-regressions"
              - "local-verification-evidence"
            id: "supervisor-transition-recovery"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:f1b216b4deeea1990ca506f7e23e6bcd93c94ff7b25ce3745d4fe8f3ba4c16ab"
    documents:
      contracts:
        sha256:842789e44324dcc3e47e695dbaa8cdd9c83b05721b50d23e0a93ba872bfa385d:
          acceptance_criteria:
            - "Evaluator diff evidence excludes unrelated base-branch changes after provider branch update while retaining the task-owned diff."
            - "Explicit replacement intent reaches evaluator execution after a terminal failed lifecycle operation."
            - "Completed canonical tasks persist supervisor-generated artifacts and continue lifecycle routing without a false dirty-worktree episode."
            - "Pre-merge closure executes through the supported local lifecycle path and does not produce canonical_workflow_effect_unavailable or E_INTERNAL."
            - "Required worktree.prepare routing wins before dirty base-checkout resolution for a canonical branch task without a task worktree."
            - "Focused regression tests, typecheck, and the full local CI suite pass."
          objective: "Repair the five demonstrated supervisor transition failures without moving PR publication, hosted checks, integration, merge, or cleanup into the semantic work item."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-verification-contract.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution."
        objective: "Make canonical supervisor transitions recoverable across branch lifecycle boundaries"
    events:
      -
        command_digest: "sha256:acf495c6cc304ea238190276edd864d47574f0f25c2aa2d93ac87670568b0cfb"
        id: "capture:202609231207-R59HKK:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231207-R59HKK"
        occurred_at: "2026-09-23T12:07:39.826Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231207-R59HKK"
        task_revision: 1
      -
        command_digest: "sha256:8ee93e10ac6ef607bd5c7a07826c82c7590c3555658fbdec5d1ee9c2869c984d"
        id: "result:sha256:dd3d1072d12cd77877451d763324dde46f0b124a02b6dc21c9b6c78fa4a88885:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:dd3d1072d12cd77877451d763324dde46f0b124a02b6dc21c9b6c78fa4a88885"
        occurred_at: "2026-09-23T12:08:42.263Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231207-R59HKK"
        task_revision: 2
      -
        command_digest: "sha256:370d82edee191312a78b627107741b8ae2e0302907f8cec97b8fffed0d9231d1"
        id: "sha256:1301a5c32f9c2553e25cdf3dfec2af67a72749abbebe667293ae873d19a37025:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1301a5c32f9c2553e25cdf3dfec2af67a72749abbebe667293ae873d19a37025"
        occurred_at: "2026-09-23T12:08:51.890Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231207-R59HKK"
        task_revision: 3
      -
        command_digest: "sha256:5299a9e5762a92565dd2d85929724ea226a5650b5e102b56300b9c1e1a087c4a"
        id: "kernel_work_item_materialization_required:sha256:e22d0020a8e05573424ab338b64ba41c5d48d65905bc83774cdadd31b0843450:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e22d0020a8e05573424ab338b64ba41c5d48d65905bc83774cdadd31b0843450:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        occurred_at: "2026-09-23T12:08:55.515Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231207-R59HKK"
        task_revision: 4
      -
        command_digest: "sha256:326775493038bb8ba0a5018bcfa8ec8e1c3eed9f11cf536ff53e6a38739e9de3"
        id: "kernel_work_item_claim_required:sha256:abbc04077e022bb9394cdb379786cebd14c97bb6a914b5617d8050c6a4d660c2:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:abbc04077e022bb9394cdb379786cebd14c97bb6a914b5617d8050c6a4d660c2:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        occurred_at: "2026-09-23T12:08:59.570Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231207-R59HKK"
        task_revision: 5
      -
        command_digest: "sha256:2c39f262b9a9c8ed4bfa0d173600d6d161713a04300c691b449006bd12071385"
        id: "kernel_work_item_execution_required:sha256:1e6723e28fcab9fb90ba5c5771a4e043d4c07b700cbcc71b66eb522607b47b63:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1e6723e28fcab9fb90ba5c5771a4e043d4c07b700cbcc71b66eb522607b47b63:sha256:cd7492ba364fc969d2f958eea41934f70c832ae2f33126dc36f4f0416f2cb583"
        occurred_at: "2026-09-23T12:09:26.734Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231207-R59HKK"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make canonical supervisor transitions recoverable across branch lifecycle boundaries

Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.

## Scope

- In scope: Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.
- Out of scope: unrelated refactors not required for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries".

## Plan

1. Execute approved WorkItem supervisor-transition-recovery.

## Verify Steps

PLANNER fallback scaffold for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
