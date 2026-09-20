---
id: "202609200157-HJ7KZE"
title: "Add canonical blocked-plan replanning transition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts"
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
doc_updated_at: "2026-09-20T01:57:17.640Z"
doc_updated_by: "CODER"
description: "Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior."
sections:
  Summary: |-
    Add canonical blocked-plan replanning transition

    Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
  Scope: |-
    - In scope: Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
    - Out of scope: unrelated refactors not required for "Add canonical blocked-plan replanning transition".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add canonical blocked-plan replanning transition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add canonical blocked-plan replanning transition". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "8aee6c026bf45c569aaa698a4c6b8cced9423505"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:d93abd2dbaec0d0dc6cf06b4ed9e5368aa89ea5e40c2b9d0672368c8c8afc67e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609200157-HJ7KZE"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
        digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "kernel-replan-transition"
              - "canonical-rejection-route"
              - "blocked-replan-regression-coverage"
            id: "canonical-blocked-replan"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609200157-HJ7KZE"
      intent_digest: "sha256:550491822ba3da9a667034547e4a82cf293210127577b047303dc0bcda6aedc0"
      migration_receipts: []
      mutation_receipts:
        capture:202609200157-HJ7KZE:
          after_revision: 1
          aggregate_digest: "sha256:684dcd2ca5efe031d10f92aee21f145eb48ae0813e7ae7a96f7aee88d22afd5a"
          before_revision: 0
          command_digest: "sha256:471a64ac45bd372d23a9778dfb00b52f034e9dabd1debe86c833c430754d8af2"
          effect_ids: []
          event_digests:
            - "sha256:2051e0e5e75ee407e46e718879fea20531e535a47170060a6c9577ba8cd64902"
          mutation_id: "capture:202609200157-HJ7KZE"
        kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 5
          aggregate_digest: "sha256:b6077dc01f1ac4f86b484eeeeda3f7a1ba21df152eeb922cc5a00b686830f99d"
          before_revision: 4
          command_digest: "sha256:38de40dd2ca48bd15a16ed857158ef12578e8df46fc4e0dfb63246a93139df26"
          effect_ids: []
          event_digests:
            - "sha256:1d4a12eb4d974725a386d2048a816898c6f12819c3cad1f2b72843dfee55bbd1"
          mutation_id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 6
          aggregate_digest: "sha256:f1406009388c068c4173e50d24813ea9a7f24e30de3f0445019f9b7e25abd4d9"
          before_revision: 5
          command_digest: "sha256:3d4a029941a2649fe9eb43647a9c34871143adbda5fcffec2e7cfb2fba614a7d"
          effect_ids: []
          event_digests:
            - "sha256:0ff7dd28355b5f472f484b1c4067e3bc0d2d5566c67dacb380bd52eac9c6b26c"
          mutation_id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 4
          aggregate_digest: "sha256:d60298235187983924c180517d2fc03a9b1a6b09602039c7d481afa0144b232b"
          before_revision: 3
          command_digest: "sha256:9c92444ae27d9364d6728884e0c9f62c2bd46eaa6b89e9994c1410ef78ff85b1"
          effect_ids: []
          event_digests:
            - "sha256:3285a8fa47b099f6db91d47a7b09fd8a9cc53147d7ffaae02e0c747882dc1879"
          mutation_id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a:
          after_revision: 2
          aggregate_digest: "sha256:1037bb265fb28226ed61a7bdb5c096120ea804ae4ce04b73b6ec385f44e4069b"
          before_revision: 1
          command_digest: "sha256:6795439b3f66ece3d6a9674b1a6d6057b0364566241f670e3c9ee29b0146f2d4"
          effect_ids: []
          event_digests:
            - "sha256:859f21c5d05d3616f8cb2beef5a4e12c92256221975e888546d72b42096c3ac9"
          mutation_id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a"
        sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258:
          after_revision: 3
          aggregate_digest: "sha256:c6ec12149c7bf1250ac70c643e3127e36b74c79e5e0510d7ba043debdca53835"
          before_revision: 2
          command_digest: "sha256:0b155203ae9354dd11f7c54fea3ec64138f9bca67e8a9e8e1727128d6208b670"
          effect_ids: []
          event_digests:
            - "sha256:efb0a7519431b78e3aa92f49a4c18c3ba46455172d03966546d2e53609202d71"
          mutation_id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-blocked-replan:
          attempt: 1
          claim_id: "sha256:070472ae0a4aa0676bc262b1605da00c299ad203b331c61c69ed407e1fbe2e12"
          definition:
            contract_digest: "sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "kernel-replan-transition"
              - "canonical-rejection-route"
              - "blocked-replan-regression-coverage"
            id: "canonical-blocked-replan"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:5e121c852a7a8b421676cf144b9cf7bee323a5b755a2a845f77f948324bf8d8b"
    documents:
      contracts:
        sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c:
          acceptance_criteria:
            - "A blocked WorkItem remains blocked until an explicit plan rejection is applied."
            - "Explicit rejection of an approved canonical plan enters planning and the next task advance emits a PLANNER WorkOrder."
            - "The rejected plan, blocked attempt, result evidence, events, and authority lineage remain available as immutable history."
            - "Rejection fails closed for a mismatched plan digest, non-blocked approved plan, unrelated authority drift, and unsupported task states."
            - "Canonical task routing never mutates only the task-centric projection when a task_kernel record exists."
            - "Focused domain and command tests plus full local CI pass."
          objective: "Implement an explicit canonical transition from an approved plan with blocked work to replanning, route task plan rejection through it, and preserve immutable evidence and fail-closed checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior."
        objective: "Add canonical blocked-plan replanning transition"
    events:
      -
        command_digest: "sha256:471a64ac45bd372d23a9778dfb00b52f034e9dabd1debe86c833c430754d8af2"
        id: "capture:202609200157-HJ7KZE:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609200157-HJ7KZE"
        occurred_at: "2026-09-20T01:57:17.620Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609200157-HJ7KZE"
        task_revision: 1
      -
        command_digest: "sha256:6795439b3f66ece3d6a9674b1a6d6057b0364566241f670e3c9ee29b0146f2d4"
        id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a"
        occurred_at: "2026-09-20T01:58:11.706Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609200157-HJ7KZE"
        task_revision: 2
      -
        command_digest: "sha256:0b155203ae9354dd11f7c54fea3ec64138f9bca67e8a9e8e1727128d6208b670"
        id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258"
        occurred_at: "2026-09-20T01:58:25.732Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609200157-HJ7KZE"
        task_revision: 3
      -
        command_digest: "sha256:9c92444ae27d9364d6728884e0c9f62c2bd46eaa6b89e9994c1410ef78ff85b1"
        id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:58:37.202Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609200157-HJ7KZE"
        task_revision: 4
      -
        command_digest: "sha256:38de40dd2ca48bd15a16ed857158ef12578e8df46fc4e0dfb63246a93139df26"
        id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:58:41.413Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609200157-HJ7KZE"
        task_revision: 5
      -
        command_digest: "sha256:3d4a029941a2649fe9eb43647a9c34871143adbda5fcffec2e7cfb2fba614a7d"
        id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:59:16.604Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609200157-HJ7KZE"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Add canonical blocked-plan replanning transition

Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.

## Scope

- In scope: Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
- Out of scope: unrelated refactors not required for "Add canonical blocked-plan replanning transition".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Add canonical blocked-plan replanning transition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add canonical blocked-plan replanning transition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
