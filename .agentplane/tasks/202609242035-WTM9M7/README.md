---
id: "202609242035-WTM9M7"
title: "Bind canonical final verification to the observed verification contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
        kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 4
          aggregate_digest: "sha256:318a42477f675444a00d2205494ac739cc1a723d9901da1045fe73ba475a1762"
          before_revision: 3
          command_digest: "sha256:750ecb51e720cf84711c1a9eea60801a3e4ae4e5c03f11e82b026d982ccb8a8b"
          effect_ids: []
          event_digests:
            - "sha256:a1b575a790c73cf9086c24a6a1a3d3328dbddb9be08448e4b711cf0f9378322e"
          mutation_id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
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
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        observed-final-verification:
          attempt: 1
          claim_id: "sha256:c83d1580852e23ceff1d9d56495cc0f7f4fb4931554eacf4edf0c03168b4d0d8"
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
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:3dcbf06edce7fb6bd93d553c1c01b6c4c6a50cf848bbff3d28b00b7ae0838aef"
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
