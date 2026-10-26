---
id: "202610261659-DMVWHE"
title: "Support provider branch updates in constrained-refspec checkouts"
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
verify:
  - "bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T17:00:51.205Z"
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
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
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
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
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
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
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
      digest: "sha256:ce2d74e2ea6bee19749b2857342005fc681aeb7fc179fe97d6f4fe95eb1cfb8d"
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
doc_updated_at: "2026-10-26T16:59:39.757Z"
doc_updated_by: "CODER"
description: "Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression."
sections:
  Summary: |-
    Support provider branch updates in constrained-refspec checkouts

    Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.
  Scope: |-
    - In scope: Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.
    - Out of scope: unrelated refactors not required for "Support provider branch updates in constrained-refspec checkouts".
  Plan: "1. Execute approved WorkItem provider-tracking-validation."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "8727d85da7df97573e3d95842654ac57ce25766b"
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
            digest: "sha256:c467583f1454127eb0613ab7c1cf661648e966505883caea50bac7dc8332b106"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0dc985871ee5b3b70431a2974753d21bb2f19bbfbd880e3980d039ffbc048f43"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:bd73d0d4049a7a52ef16cb2141fbc1181b72fd9a7cffa025bb7fd1da6c9dbf75"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
            task_id: "202610261659-DMVWHE"
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
        approval_evidence_digest: "sha256:bd73d0d4049a7a52ef16cb2141fbc1181b72fd9a7cffa025bb7fd1da6c9dbf75"
        digest: "sha256:0dc985871ee5b3b70431a2974753d21bb2f19bbfbd880e3980d039ffbc048f43"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:3c1fd7c98e1889f5990c62ee8ffd007811fe057e25a6ba9dd77893e9fbf2dc4e"
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
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            expected_outputs:
              - "provider-validator"
              - "constrained-refspec-regression"
            id: "provider-tracking-validation"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610261659-DMVWHE"
      intent_digest: "sha256:244dcc66dd7c0b8b571a0f9b6e1e8660c37efaed38b040407458418a8bbfd78a"
      migration_receipts: []
      mutation_receipts:
        capture:202610261659-DMVWHE:
          after_revision: 1
          aggregate_digest: "sha256:083c9c4372124ad244441079b8eb192791029c9a4411e2dbb2a0b93dd95a8da3"
          before_revision: 0
          command_digest: "sha256:5fce333aeac2ca33cc1b17dec3c595e3626eaf36afc7fa7f70826de85dce71e4"
          effect_ids: []
          event_digests:
            - "sha256:168a3bb634e676f8581b5374166208a45a6c8a4878d6cb8c09413d5b94c528c8"
          mutation_id: "capture:202610261659-DMVWHE"
        kernel_work_item_claim_required:sha256:5075b48b2a09e80100dbbc98e3ec7ee185a0907804bcc8eeb097dff631d4f643:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 5
          aggregate_digest: "sha256:bb49bebba70c7a0c802105944fb2c3b3c049759302777ed9fb96ff91e1ad9999"
          before_revision: 4
          command_digest: "sha256:72d496756133e1adf203675c0960ca09d06229c7fe40d93b22dbc7ffa49e2994"
          effect_ids: []
          event_digests:
            - "sha256:fdb11cf4c2b2113fac0dc8832dd1067cbdc1c84c3bb3a24e9e32562eb2412648"
          mutation_id: "kernel_work_item_claim_required:sha256:5075b48b2a09e80100dbbc98e3ec7ee185a0907804bcc8eeb097dff631d4f643:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        kernel_work_item_execution_required:sha256:312457bd8ce2f24829d1be9de8331c9859cef0c98c4044ad5499b50c9ae6b898:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 6
          aggregate_digest: "sha256:c4aff39faff98a1f06c4fb52054d05c28bc095896c496bfdf3db05ad3622f78b"
          before_revision: 5
          command_digest: "sha256:0b74784ed6179e433b4ac2206b52de3c593432fb4c16cf56f3c266cb5b215d8b"
          effect_ids: []
          event_digests:
            - "sha256:a08c76105742e381c3dc7ea347f93842d87ae459a95b6f79fb41865f7e429025"
          mutation_id: "kernel_work_item_execution_required:sha256:312457bd8ce2f24829d1be9de8331c9859cef0c98c4044ad5499b50c9ae6b898:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        kernel_work_item_materialization_required:sha256:0eda31ac4ba725ba21a0b8cb3e8a38f94accf47be8a18a32b3f04a06803255df:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:
          after_revision: 4
          aggregate_digest: "sha256:8b0058a928f7843e5bebb82b6a2392102d067f38f37af3906ad6575dcd26f3f2"
          before_revision: 3
          command_digest: "sha256:a2198e8ec50c1c061ac740464f1f9740b33e6374f115d2536b6d7e37598d367f"
          effect_ids: []
          event_digests:
            - "sha256:e3961042f1a35afc10340b9dc6cf44318a99dadc6b78a63d66b68541616dac53"
          mutation_id: "kernel_work_item_materialization_required:sha256:0eda31ac4ba725ba21a0b8cb3e8a38f94accf47be8a18a32b3f04a06803255df:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        result:sha256:d53651a0d06295d5dbf5c5412d16f957fe00993dcbb9af21a183272b58419d28:
          after_revision: 2
          aggregate_digest: "sha256:9f1e5b3925722f0a6af6eda50a65388dcbec06e4ccbede8545356b29d7959d2d"
          before_revision: 1
          command_digest: "sha256:43b48f111f164dc6d3040507517e5537940e00f31af74214dcfb3a87449cf8be"
          effect_ids: []
          event_digests:
            - "sha256:935863d7232b438e6248f1a64e6e580437ac203a5df66288d1f02e90dad48134"
          mutation_id: "result:sha256:d53651a0d06295d5dbf5c5412d16f957fe00993dcbb9af21a183272b58419d28"
        sha256:e51d834b7b18d00579754494ca0fb856e694150cd6f388b7b269e3cacdb2880a:
          after_revision: 3
          aggregate_digest: "sha256:db45f6e4add8b69dfadbad211ff8bab68f9f2103c505e3973b85d1b1ce299e05"
          before_revision: 2
          command_digest: "sha256:29bdb339b45d83cd598aade983a5dfce9ac9eff938813656d52200e66e3b3fc2"
          effect_ids: []
          event_digests:
            - "sha256:0656ce4a670b03d2543a1f3f00cba0ee95699004c28ade2372f6724335c093a2"
          mutation_id: "sha256:e51d834b7b18d00579754494ca0fb856e694150cd6f388b7b269e3cacdb2880a"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        provider-tracking-validation:
          attempt: 1
          claim_id: "sha256:26d1e1f5c25cef8ca076e3a68c3d086cb869a934441b6a7c7711baf94363cc07"
          definition:
            contract_digest: "sha256:3c1fd7c98e1889f5990c62ee8ffd007811fe057e25a6ba9dd77893e9fbf2dc4e"
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
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            expected_outputs:
              - "provider-validator"
              - "constrained-refspec-regression"
            id: "provider-tracking-validation"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:4072c02628076e95d1afee9b0c9dd1a953d9439283803553eeba009719b0ad27"
    documents:
      contracts:
        sha256:3c1fd7c98e1889f5990c62ee8ffd007811fe057e25a6ba9dd77893e9fbf2dc4e:
          acceptance_criteria:
            - "An exact remote-tracking ref and configured branch remote/merge pass when remote fetch is constrained to main."
            - "Missing, ambiguous, or changed branch remote/merge configuration is rejected before provider mutation."
            - "Existing branch, head, clean-tree, URL, and tracking-head drift checks remain fail closed."
          objective: "Accept an exact task branch tracking ref when branch remote and merge configuration match the authorized identity, regardless of fetch refspec breadth."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            - "bun run typecheck"
            - "AgentPlane native full local CI and hosted PR checks"
      intent:
        context: "Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression."
        objective: "Support provider branch updates in constrained-refspec checkouts"
    events:
      -
        command_digest: "sha256:5fce333aeac2ca33cc1b17dec3c595e3626eaf36afc7fa7f70826de85dce71e4"
        id: "capture:202610261659-DMVWHE:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610261659-DMVWHE"
        occurred_at: "2026-10-26T16:59:39.662Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610261659-DMVWHE"
        task_revision: 1
      -
        command_digest: "sha256:43b48f111f164dc6d3040507517e5537940e00f31af74214dcfb3a87449cf8be"
        id: "result:sha256:d53651a0d06295d5dbf5c5412d16f957fe00993dcbb9af21a183272b58419d28:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d53651a0d06295d5dbf5c5412d16f957fe00993dcbb9af21a183272b58419d28"
        occurred_at: "2026-10-26T17:00:31.571Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610261659-DMVWHE"
        task_revision: 2
      -
        command_digest: "sha256:29bdb339b45d83cd598aade983a5dfce9ac9eff938813656d52200e66e3b3fc2"
        id: "sha256:e51d834b7b18d00579754494ca0fb856e694150cd6f388b7b269e3cacdb2880a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e51d834b7b18d00579754494ca0fb856e694150cd6f388b7b269e3cacdb2880a"
        occurred_at: "2026-10-26T17:00:44.387Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610261659-DMVWHE"
        task_revision: 3
      -
        command_digest: "sha256:a2198e8ec50c1c061ac740464f1f9740b33e6374f115d2536b6d7e37598d367f"
        id: "kernel_work_item_materialization_required:sha256:0eda31ac4ba725ba21a0b8cb3e8a38f94accf47be8a18a32b3f04a06803255df:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0eda31ac4ba725ba21a0b8cb3e8a38f94accf47be8a18a32b3f04a06803255df:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T17:00:54.606Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610261659-DMVWHE"
        task_revision: 4
      -
        command_digest: "sha256:72d496756133e1adf203675c0960ca09d06229c7fe40d93b22dbc7ffa49e2994"
        id: "kernel_work_item_claim_required:sha256:5075b48b2a09e80100dbbc98e3ec7ee185a0907804bcc8eeb097dff631d4f643:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5075b48b2a09e80100dbbc98e3ec7ee185a0907804bcc8eeb097dff631d4f643:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T17:01:07.205Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610261659-DMVWHE"
        task_revision: 5
      -
        command_digest: "sha256:0b74784ed6179e433b4ac2206b52de3c593432fb4c16cf56f3c266cb5b215d8b"
        id: "kernel_work_item_execution_required:sha256:312457bd8ce2f24829d1be9de8331c9859cef0c98c4044ad5499b50c9ae6b898:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:312457bd8ce2f24829d1be9de8331c9859cef0c98c4044ad5499b50c9ae6b898:sha256:2ee6e63ce88d1a520c0671597e3441f5436fd7dd798a5b477ae438b785df5514"
        occurred_at: "2026-10-26T17:02:00.844Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610261659-DMVWHE"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Support provider branch updates in constrained-refspec checkouts

Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.

## Scope

- In scope: Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.
- Out of scope: unrelated refactors not required for "Support provider branch updates in constrained-refspec checkouts".

## Plan

1. Execute approved WorkItem provider-tracking-validation.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
