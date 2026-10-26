---
id: "202610261134-JK4HX9"
title: "Prevent stale final-validation evidence from bypassing authority continuation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T11:36:16.831Z"
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
      - "packages/agentplane/src/commands/task"
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
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:e90990f9c8d1c4350980b2ee0250c4d06395644c07f0e70e7d6c2f81d0fd0046"
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
doc_updated_at: "2026-10-26T11:34:55.896Z"
doc_updated_by: "CODER"
description: "For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery."
sections:
  Summary: |-
    Prevent stale final-validation evidence from bypassing authority continuation

    For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.
  Scope: |-
    - In scope: For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.
    - Out of scope: unrelated refactors not required for "Prevent stale final-validation evidence from bypassing authority continuation".
  Plan: "1. Execute approved WorkItem safe-final-validation-continuation."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prevent stale final-validation evidence from bypassing authority continuation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prevent stale final-validation evidence from bypassing authority continuation". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "cdc68137f324840b306f26b78e7c5dc9587b51e6"
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
            digest: "sha256:4f1a51ac828f9f2fc4408127fb8988b620573e289f6325f3964d4a8672513f9a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f3e04975aedfaf86ace508ec30bbd3311f5853192473a1ef52e3457f23ae314b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1acb9678e0936a7fd86413a18531e456d917f94af928f99d2c5405eb7b5018ee"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202610261134-JK4HX9"
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
        approval_evidence_digest: "sha256:1acb9678e0936a7fd86413a18531e456d917f94af928f99d2c5405eb7b5018ee"
        digest: "sha256:f3e04975aedfaf86ace508ec30bbd3311f5853192473a1ef52e3457f23ae314b"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:093409cb8e37a77bcfcad92529182f7654420b90516915459cef56a9a99597e2"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "safe-continuation"
              - "regression-tests"
            id: "safe-final-validation-continuation"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610261134-JK4HX9"
      intent_digest: "sha256:90d8f0e00060448c187a8a2c807569fd8725fd5127875359bcafc790568d2ec5"
      migration_receipts: []
      mutation_receipts:
        capture:202610261134-JK4HX9:
          after_revision: 1
          aggregate_digest: "sha256:4098ee97dfc01b2a3cc05a951732766cd0b10ab37595bd5d62ec4641fff87264"
          before_revision: 0
          command_digest: "sha256:15e394fea37c2c0ddbed7b2bcff6422c4a5a83ef4bae49cb5db10e08773587b3"
          effect_ids: []
          event_digests:
            - "sha256:c170f2b0fe2aacd8b315986884b7e59645d4d62bbb3e27963f0a166f07004ddb"
          mutation_id: "capture:202610261134-JK4HX9"
        kernel_work_item_claim_required:sha256:5e9c01b99112d4d8eed2cc55f7b4963ecd7fcec3d7a92a8255013276e29b8def:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:ad2e7a841ee838b1ae82cc95e5c148840293e61304fc4cf4db5a13693c7cb0ab"
          before_revision: 4
          command_digest: "sha256:cd324c3418cdee15698c7704741f8f95861aea2df5759011f2370dd825ff49fe"
          effect_ids: []
          event_digests:
            - "sha256:32afcb16619d3a0265efde5cfcfd5bfe6637a2b2efab9c80691903a0390bfb9d"
          mutation_id: "kernel_work_item_claim_required:sha256:5e9c01b99112d4d8eed2cc55f7b4963ecd7fcec3d7a92a8255013276e29b8def:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:95ad8d6dcf96047cad2248adedce9e564735b07675b94d0ef3cba576bbe01054:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:fc7e9a20b50804cb9909e2c3d55c7f6597e0d3824a07e1f4ff558bb7a75350f7"
          before_revision: 5
          command_digest: "sha256:f25e1178421ad7ce5b8ce5eb6da872fcfa4558b6d51adffc8f05fbca021e57d6"
          effect_ids: []
          event_digests:
            - "sha256:83d0f227a49bcecf1a1235781701d4a9dcc15a1aa18e701d0d0a914d8c452338"
          mutation_id: "kernel_work_item_execution_required:sha256:95ad8d6dcf96047cad2248adedce9e564735b07675b94d0ef3cba576bbe01054:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_materialization_required:sha256:525ea2fce048987b79711e027cfcd5d7c59aed37137c9d3c98a268f2c7fcbcf4:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:f0882f7c13f5f2e362dd611976ab46662cf111c306d7ca3154538b19125bd2d4"
          before_revision: 3
          command_digest: "sha256:f21554d269ba0c08c6ed6852d7164ed8db742485897f8c417ec6049a55d712b5"
          effect_ids: []
          event_digests:
            - "sha256:69cff1f17f4c64120bfffb7ab3b49824877fbe626c95fe5c02063393d1ae4395"
          mutation_id: "kernel_work_item_materialization_required:sha256:525ea2fce048987b79711e027cfcd5d7c59aed37137c9d3c98a268f2c7fcbcf4:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        result:sha256:fb06a8670e1879a27b151ec09ac5031baf27e147bc2ee5e7ee5b9ec9a46724c3:
          after_revision: 2
          aggregate_digest: "sha256:7b04c04eb50ffa502f1a70b23dd85a5cb796f9753581ad8aa1f2e0ee6a97a180"
          before_revision: 1
          command_digest: "sha256:b5b31e754b790541c3489f04e0d78e7fb2ea750e50ae3b6aac75b2492209ddae"
          effect_ids: []
          event_digests:
            - "sha256:6e26f823f322ee49ad0171eb93f9f0ebe3c602695314a0db927820bf73548b01"
          mutation_id: "result:sha256:fb06a8670e1879a27b151ec09ac5031baf27e147bc2ee5e7ee5b9ec9a46724c3"
        sha256:8c579f8528186b0231af4ebdf2f3ba1da08f96fe7f964b61e1a41e8af7094717:
          after_revision: 3
          aggregate_digest: "sha256:a75b224b236d9f7c9115277213298fb800d3a79f485ca1976429e98aafd62b1e"
          before_revision: 2
          command_digest: "sha256:01b3ad6efe7c4415dbb8a0b6b679cbd4c02e74dfcb1407cf7e4fddfa24983f91"
          effect_ids: []
          event_digests:
            - "sha256:736025d47fe810ff7be07187bca0316eab4c166ff661a26e59e743b3ba38aec9"
          mutation_id: "sha256:8c579f8528186b0231af4ebdf2f3ba1da08f96fe7f964b61e1a41e8af7094717"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        safe-final-validation-continuation:
          attempt: 1
          claim_id: "sha256:8b333e681e410c3f9a5cd290500d2d30e020f6b8c534df2953d659a94f89ea6d"
          definition:
            contract_digest: "sha256:093409cb8e37a77bcfcad92529182f7654420b90516915459cef56a9a99597e2"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "safe-continuation"
              - "regression-tests"
            id: "safe-final-validation-continuation"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:f52a38a19d660a51145e6f4336abb7e06e953a81e368f718739741e0b42fbf15"
    documents:
      contracts:
        sha256:093409cb8e37a77bcfcad92529182f7654420b90516915459cef56a9a99597e2:
          acceptance_criteria:
            - "Changed implementation cannot complete from retained PASS; native continuation is recorded before any completion attempt."
            - "Fresh final checks run for changed implementation and only their recorded PASS permits completion."
            - "Unchanged repository with current valid final-validation identity retains existing recovery behavior."
            - "A failed continuation or failed check never records task completion or fabricated verification."
          objective: "Ensure canonical branch PR completion cannot consume retained final-validation PASS after repository implementation or check environment changes. Advance native authority before completion, then execute fresh final checks. Preserve exact current-input recovery and fail closed on drift."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery."
        objective: "Prevent stale final-validation evidence from bypassing authority continuation"
    events:
      -
        command_digest: "sha256:15e394fea37c2c0ddbed7b2bcff6422c4a5a83ef4bae49cb5db10e08773587b3"
        id: "capture:202610261134-JK4HX9:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610261134-JK4HX9"
        occurred_at: "2026-10-26T11:34:55.808Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610261134-JK4HX9"
        task_revision: 1
      -
        command_digest: "sha256:b5b31e754b790541c3489f04e0d78e7fb2ea750e50ae3b6aac75b2492209ddae"
        id: "result:sha256:fb06a8670e1879a27b151ec09ac5031baf27e147bc2ee5e7ee5b9ec9a46724c3:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fb06a8670e1879a27b151ec09ac5031baf27e147bc2ee5e7ee5b9ec9a46724c3"
        occurred_at: "2026-10-26T11:35:53.688Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610261134-JK4HX9"
        task_revision: 2
      -
        command_digest: "sha256:01b3ad6efe7c4415dbb8a0b6b679cbd4c02e74dfcb1407cf7e4fddfa24983f91"
        id: "sha256:8c579f8528186b0231af4ebdf2f3ba1da08f96fe7f964b61e1a41e8af7094717:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8c579f8528186b0231af4ebdf2f3ba1da08f96fe7f964b61e1a41e8af7094717"
        occurred_at: "2026-10-26T11:36:07.356Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610261134-JK4HX9"
        task_revision: 3
      -
        command_digest: "sha256:f21554d269ba0c08c6ed6852d7164ed8db742485897f8c417ec6049a55d712b5"
        id: "kernel_work_item_materialization_required:sha256:525ea2fce048987b79711e027cfcd5d7c59aed37137c9d3c98a268f2c7fcbcf4:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:525ea2fce048987b79711e027cfcd5d7c59aed37137c9d3c98a268f2c7fcbcf4:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T11:36:21.974Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610261134-JK4HX9"
        task_revision: 4
      -
        command_digest: "sha256:cd324c3418cdee15698c7704741f8f95861aea2df5759011f2370dd825ff49fe"
        id: "kernel_work_item_claim_required:sha256:5e9c01b99112d4d8eed2cc55f7b4963ecd7fcec3d7a92a8255013276e29b8def:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5e9c01b99112d4d8eed2cc55f7b4963ecd7fcec3d7a92a8255013276e29b8def:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T11:36:39.589Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610261134-JK4HX9"
        task_revision: 5
      -
        command_digest: "sha256:f25e1178421ad7ce5b8ce5eb6da872fcfa4558b6d51adffc8f05fbca021e57d6"
        id: "kernel_work_item_execution_required:sha256:95ad8d6dcf96047cad2248adedce9e564735b07675b94d0ef3cba576bbe01054:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:95ad8d6dcf96047cad2248adedce9e564735b07675b94d0ef3cba576bbe01054:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T11:37:29.104Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610261134-JK4HX9"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Prevent stale final-validation evidence from bypassing authority continuation

For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.

## Scope

- In scope: For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.
- Out of scope: unrelated refactors not required for "Prevent stale final-validation evidence from bypassing authority continuation".

## Plan

1. Execute approved WorkItem safe-final-validation-continuation.

## Verify Steps

PLANNER fallback scaffold for "Prevent stale final-validation evidence from bypassing authority continuation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prevent stale final-validation evidence from bypassing authority continuation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
