---
id: "202609231152-HP97AA"
title: "Allow explicit USER rejection of an approved blocked canonical plan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "authority-recovery"
  - "pre-0.7.12"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T11:58:40.645Z"
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
doc_updated_at: "2026-09-23T11:52:57.292Z"
doc_updated_by: "CODER"
description: "Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard."
sections:
  Summary: |-
    Allow explicit USER rejection of an approved blocked canonical plan

    Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
  Scope: |-
    - In scope: Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
    - Out of scope: unrelated refactors not required for "Allow explicit USER rejection of an approved blocked canonical plan".
  Plan: "1. Execute approved WorkItem repair-approved-plan-rejection-route."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow explicit USER rejection of an approved blocked canonical plan". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow explicit USER rejection of an approved blocked canonical plan". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "4d25a67cc233872b57c12b7fbaa6ceb84ed7d939"
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
              - "repository.read"
              - "repository.write"
              - "test.execute"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d40cd2e94159f19b85ab40260480c35184481a3dc0e8f221df1e00a874bb843d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2b55eee9f1f474f77733dc89663b787ab1f4e9a280582e7c6586ce39a377b2f2"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            task_id: "202609231152-HP97AA"
            validation_requirements:
              - "bun run format:changed"
              - "bun run hotspots:check"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2b55eee9f1f474f77733dc89663b787ab1f4e9a280582e7c6586ce39a377b2f2"
        digest: "sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.read"
                - "repository.write"
                - "test.execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            expected_outputs:
              - "reachable-explicit-user-rejection"
              - "runtime-guard-regression-test"
            id: "repair-approved-plan-rejection-route"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609231152-HP97AA"
      intent_digest: "sha256:1438f120c51563328c56e7d39ff7844efdebf29917dad8885d3492cdaaaec31e"
      migration_receipts: []
      mutation_receipts:
        capture:202609231152-HP97AA:
          after_revision: 1
          aggregate_digest: "sha256:8a8bde98cbd3b0eeab90c0ac1af4e9ce33ab012e46587d40592dd036eeba0988"
          before_revision: 0
          command_digest: "sha256:a51d863a783df6a7b13adee6bd2d3ee791b3ddaacafa00ebe3e49c26ce3752d9"
          effect_ids: []
          event_digests:
            - "sha256:3b3a74e7a3d973bed1634c05a4b1093781e3b9090c23ec014d581d920eb412ae"
          mutation_id: "capture:202609231152-HP97AA"
        kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 5
          aggregate_digest: "sha256:600744a74889b702b9d5dd32a28e3f30460f83d1aab2327f4f8d95ddd5b28844"
          before_revision: 4
          command_digest: "sha256:902882246f3f37accccefb994986d575d2229e693e1f650fe00f456f0287cd29"
          effect_ids: []
          event_digests:
            - "sha256:3f276f1f66f3e9dcbe120282eb9faa5c4ad169fa5dd39a8730e77fedddf7d9b3"
          mutation_id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 6
          aggregate_digest: "sha256:63f9aa3a16bde4b985f69593a05943ca370cdde84763f9e278b9879a6569324c"
          before_revision: 5
          command_digest: "sha256:38651d69079cf1c3181a48da47b428633965be7c9ecccd6961b395212618d354"
          effect_ids: []
          event_digests:
            - "sha256:e960769e448e33cf6cbd5d187e80de3c52c1d48c49c1053000fc92d82ad1c518"
          mutation_id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 4
          aggregate_digest: "sha256:116b493a22bc97096100eb5da205c0d6fa255d7277711ecedd4f40dc00031377"
          before_revision: 3
          command_digest: "sha256:811aae63b216483a5e6ecfeed3177cb642bd2e65b834423250c8615e5c6ef376"
          effect_ids: []
          event_digests:
            - "sha256:c4f79514f92ae9866693a713a0b8a8f5d9d6fdf992c95ffefc1599287c289840"
          mutation_id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce:
          after_revision: 2
          aggregate_digest: "sha256:88e21f5f08444e1c108702781f448921e5fd04c67c74fa483b358351b65647df"
          before_revision: 1
          command_digest: "sha256:864b3e015f77528610d24404c2903638fe3ad9930681d7914bbf841611992d4c"
          effect_ids: []
          event_digests:
            - "sha256:225ae439e9ad5ade7a2fc4fb9d69f1243f086ca33db5e1dfd564ae69fd294d84"
          mutation_id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce"
        sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580:
          after_revision: 3
          aggregate_digest: "sha256:7d3f2714e6f62ea3ecdddd834f25bccdec3ca06190fc574aaa5c7dbb08166708"
          before_revision: 2
          command_digest: "sha256:37c22f8d787dc6b7f21ebaf22ffa9bd725945f7373f6c9410febe6f646453378"
          effect_ids: []
          event_digests:
            - "sha256:50a686e0f7a75545761b03af9df5411a18f30e11a8eee9eaf97552f314d01471"
          mutation_id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-approved-plan-rejection-route:
          attempt: 1
          claim_id: "sha256:8eb8e6496983299f353c65cc06f240c9dcf5be73a0de2e20f12499cd410a0fd7"
          definition:
            contract_digest: "sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.read"
                - "repository.write"
                - "test.execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            expected_outputs:
              - "reachable-explicit-user-rejection"
              - "runtime-guard-regression-test"
            id: "repair-approved-plan-rejection-route"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:92b788cc070dc8697294c8befb32d2ae458ad68dbf8a011208a233a48edf5d67"
    documents:
      contracts:
        sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a:
          acceptance_criteria:
            - "task plan reject reaches the kernel reducer for an approved ACTIVE plan with blocked work and existing USER authority lineage."
            - "capture_intent and propose_plan remain forbidden from replacing canonical USER authority except for the existing post-rejection replacement-plan route."
            - "A regression test exercises the real runtime input guard instead of mocking it away."
          objective: "Allow the exact manual USER reject_plan command to pass the planning authority guard when the kernel reducer permits approved blocked-plan replanning, without allowing capture_intent or propose_plan to replace canonical USER authority."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            - "bun run typecheck"
            - "bun run format:changed"
            - "bun run hotspots:check"
      intent:
        context: "Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard."
        objective: "Allow explicit USER rejection of an approved blocked canonical plan"
    events:
      -
        command_digest: "sha256:a51d863a783df6a7b13adee6bd2d3ee791b3ddaacafa00ebe3e49c26ce3752d9"
        id: "capture:202609231152-HP97AA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231152-HP97AA"
        occurred_at: "2026-09-23T11:52:57.266Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231152-HP97AA"
        task_revision: 1
      -
        command_digest: "sha256:864b3e015f77528610d24404c2903638fe3ad9930681d7914bbf841611992d4c"
        id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce"
        occurred_at: "2026-09-23T11:54:48.221Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231152-HP97AA"
        task_revision: 2
      -
        command_digest: "sha256:37c22f8d787dc6b7f21ebaf22ffa9bd725945f7373f6c9410febe6f646453378"
        id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580"
        occurred_at: "2026-09-23T11:58:39.721Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231152-HP97AA"
        task_revision: 3
      -
        command_digest: "sha256:811aae63b216483a5e6ecfeed3177cb642bd2e65b834423250c8615e5c6ef376"
        id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:58:50.055Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231152-HP97AA"
        task_revision: 4
      -
        command_digest: "sha256:902882246f3f37accccefb994986d575d2229e693e1f650fe00f456f0287cd29"
        id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:58:53.781Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231152-HP97AA"
        task_revision: 5
      -
        command_digest: "sha256:38651d69079cf1c3181a48da47b428633965be7c9ecccd6961b395212618d354"
        id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:59:16.131Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231152-HP97AA"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow explicit USER rejection of an approved blocked canonical plan

Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.

## Scope

- In scope: Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
- Out of scope: unrelated refactors not required for "Allow explicit USER rejection of an approved blocked canonical plan".

## Plan

1. Execute approved WorkItem repair-approved-plan-rejection-route.

## Verify Steps

PLANNER fallback scaffold for "Allow explicit USER rejection of an approved blocked canonical plan". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow explicit USER rejection of an approved blocked canonical plan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
