---
id: "202610251417-WYHEXR"
title: "Recover proven applied provider branch updates after interrupted supervisor intents"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run lint:core"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T14:19:59.464Z"
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
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
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
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
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
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
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
      digest: "sha256:c680a559f50c016f7f93cf54b935cc8208d8b829607879cb22deeef3d065c949"
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
doc_updated_at: "2026-10-25T14:18:09.518Z"
doc_updated_by: "CODER"
description: "A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate."
sections:
  Summary: |-
    Recover proven applied provider branch updates after interrupted supervisor intents

    A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.
  Scope: |-
    - In scope: A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.
    - Out of scope: unrelated refactors not required for "Recover proven applied provider branch updates after interrupted supervisor intents".
  Plan: "1. Execute approved WorkItem recover-proven-provider-update-intent."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover proven applied provider branch updates after interrupted supervisor intents". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover proven applied provider branch updates after interrupted supervisor intents". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "43599c5f5a42310f4b5265def081b1d5ccb26fa8"
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
            digest: "sha256:28585930267455b910f679ad66e183b8abcf3ce0eafb6c809f17cdde2a9191e7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7035ddcb213d8a43fbbbc3ea28d96922af5817b3b70067aa40e19cda822a6fe7"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f7aedfebaf96a82343d76ca7df791c83a6c0f3a639d7ce4b3e44e3f957f11dba"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
            task_id: "202610251417-WYHEXR"
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
        approval_evidence_digest: "sha256:f7aedfebaf96a82343d76ca7df791c83a6c0f3a639d7ce4b3e44e3f957f11dba"
        digest: "sha256:7035ddcb213d8a43fbbbc3ea28d96922af5817b3b70067aa40e19cda822a6fe7"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:55d1d493829474f31fb901e6b71a14f88202daa5bd7e3bddd6bc4f054af7551e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "exact-provider-effect-recovery"
              - "negative-identity-and-replay-tests"
              - "native-route-regression"
              - "verification-evidence"
            id: "recover-proven-provider-update-intent"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610251417-WYHEXR"
      intent_digest: "sha256:872506038d1d2c360ada92f98d457a793b9486045348a3f17eedcf7e4153ebb3"
      migration_receipts: []
      mutation_receipts:
        capture:202610251417-WYHEXR:
          after_revision: 1
          aggregate_digest: "sha256:6d5e770630bbe6f84cc9f371413ca8b3a482ada3e3a73aa00cf64975edc09b84"
          before_revision: 0
          command_digest: "sha256:cde21c0873a97c0574538f98901786e25534c7a4612d18c7a3382230b2761ce7"
          effect_ids: []
          event_digests:
            - "sha256:21359c647b27cfda04abc90d86a56aa5915e0d591fa30ab1dce33ae57f9a74c1"
          mutation_id: "capture:202610251417-WYHEXR"
        kernel_work_item_claim_required:sha256:d185c450f90caabbe23984da1af8ba521af95faaefb1d487de345ff56a05afe9:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:
          after_revision: 5
          aggregate_digest: "sha256:26a3bc5787905931e093896480b7f71b4e6173e1848e0ef41ca585ac71b525d2"
          before_revision: 4
          command_digest: "sha256:0e1f090a27b14ce47fa0ddf2d9a4c620514640617d7cd015e6e4ca7b91121bc6"
          effect_ids: []
          event_digests:
            - "sha256:be74f7903aada72b89c0fb1bd6610905d68d733abdfcea2e9fcd4e598ba71b52"
          mutation_id: "kernel_work_item_claim_required:sha256:d185c450f90caabbe23984da1af8ba521af95faaefb1d487de345ff56a05afe9:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        kernel_work_item_execution_required:sha256:5c5a72700a42e478022a7e2fd53f93019e18a345b90689dae9a4f521ca7e85cf:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:
          after_revision: 6
          aggregate_digest: "sha256:dedf3d4984fca29c4fe46355b66e62c72deea9d38eb0fe0ecdb6174172dea6eb"
          before_revision: 5
          command_digest: "sha256:35a33aac0e23b2fe0ad30ae88257f6c419b0e8089b9904889db8304513977e15"
          effect_ids: []
          event_digests:
            - "sha256:3b9fdbf6150544ec40e8bb117bcf9ccb3c9381310415f5311de407853694c8ad"
          mutation_id: "kernel_work_item_execution_required:sha256:5c5a72700a42e478022a7e2fd53f93019e18a345b90689dae9a4f521ca7e85cf:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        kernel_work_item_materialization_required:sha256:93297b0f57ccc31ab45814e98d6b14528a6bf9dd2a5036058d8315c7c00fa28d:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:
          after_revision: 4
          aggregate_digest: "sha256:7c131ad4eaf0b4bd8997a26db53555cc7eba79a6d996dbd364ac340c9765d9a2"
          before_revision: 3
          command_digest: "sha256:0d63f262946053dcffe76f3d449a144df79c963502e3ce7b3f1d414484bc3c7c"
          effect_ids: []
          event_digests:
            - "sha256:adfe65e7a86cd7e58b2d4e1ccc85270c15aaa6c8885d05f2727949b8cb09f847"
          mutation_id: "kernel_work_item_materialization_required:sha256:93297b0f57ccc31ab45814e98d6b14528a6bf9dd2a5036058d8315c7c00fa28d:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        result:sha256:e48cb599d648ea36f2e91588757415f8ecd9ddf4487606ad14fafb52415fc182:
          after_revision: 2
          aggregate_digest: "sha256:0f0ff35dfd3a916defcacfdd9c3e98e5474379c4a44276692954a9190368ea0f"
          before_revision: 1
          command_digest: "sha256:60c48f91409a4ace74d8416c753d8e4b987a8a03a6b9af7a20a5b3cbc31d545f"
          effect_ids: []
          event_digests:
            - "sha256:ab382837ee49952e0be81af5ebeaf529f030b40e420871ebd5277f90b56447eb"
          mutation_id: "result:sha256:e48cb599d648ea36f2e91588757415f8ecd9ddf4487606ad14fafb52415fc182"
        sha256:eb3729006a49783d3d4a4bd8966b85c691cbd409f7561edbe72da0982b1425e2:
          after_revision: 3
          aggregate_digest: "sha256:b43530f543bd2f9f7fb8e389a753579815a5b01ef32585b3952f0c53cb80e22a"
          before_revision: 2
          command_digest: "sha256:bda3ff21f506b132c7cb182c2d6089b83a4501daf3780baa610bedf1bc4f7fbf"
          effect_ids: []
          event_digests:
            - "sha256:c10ded805612a50264a7cc41c0d8815f78d6a90c028cc817ca42ad6ec66e3adc"
          mutation_id: "sha256:eb3729006a49783d3d4a4bd8966b85c691cbd409f7561edbe72da0982b1425e2"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        recover-proven-provider-update-intent:
          attempt: 1
          claim_id: "sha256:2721ae474826dfdd5305309bc69b6449c1c721e6e9fcf1c0bd79f7f94b09827f"
          definition:
            contract_digest: "sha256:55d1d493829474f31fb901e6b71a14f88202daa5bd7e3bddd6bc4f054af7551e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "exact-provider-effect-recovery"
              - "negative-identity-and-replay-tests"
              - "native-route-regression"
              - "verification-evidence"
            id: "recover-proven-provider-update-intent"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:0379c4915322b580b66552d6b860d51706528e0611de71cbbbfe320a9c4e60de"
    documents:
      contracts:
        sha256:55d1d493829474f31fb901e6b71a14f88202daa5bd7e3bddd6bc4f054af7551e:
          acceptance_criteria:
            - "A stopped exact provider.pr.update_branch intent whose published head is a proven descendant of the original head and base can be completed once with retained evidence and a journal compare-and-swap; normal route is then recomputed from current provider and hosted checks."
            - "Recovery rejects wrong task, operation key, authority or operation digest, PR/provider/branch/base identity, ambiguous or non-descendant head, dirty or misaligned local checkout, missing original binding, failed provider readback, concurrent journal change, and replay."
            - "Recovery never repeats provider update-branch and never changes hosted failure or verification verdicts. Unrelated mutating intents remain stopped unless their own explicit proof adapter is registered."
            - "Focused tests and required lint:core and ci:local:full pass, with exact native verification evidence."
          objective: "Add a generic supervisor recovery hook for stopped mutating CLI intents with a narrowly registered provider.pr.update_branch proof. Settle an already-applied update only after matching the exact retained intent and original USER-authorized operation, proving provider PR identity and exact head/base ancestry, and verifying a clean local branch and tracking head. Complete the same journal operation atomically. Never issue PUT, push, merge, or synthesize a PASS during recovery."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/shared/supervisor-execution-effect-recovery.test.ts"
            - "bun run lint:core"
            - "bun run ci:local:full"
      intent:
        context: "A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate."
        objective: "Recover proven applied provider branch updates after interrupted supervisor intents"
    events:
      -
        command_digest: "sha256:cde21c0873a97c0574538f98901786e25534c7a4612d18c7a3382230b2761ce7"
        id: "capture:202610251417-WYHEXR:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610251417-WYHEXR"
        occurred_at: "2026-10-25T14:18:09.365Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610251417-WYHEXR"
        task_revision: 1
      -
        command_digest: "sha256:60c48f91409a4ace74d8416c753d8e4b987a8a03a6b9af7a20a5b3cbc31d545f"
        id: "result:sha256:e48cb599d648ea36f2e91588757415f8ecd9ddf4487606ad14fafb52415fc182:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:e48cb599d648ea36f2e91588757415f8ecd9ddf4487606ad14fafb52415fc182"
        occurred_at: "2026-10-25T14:19:36.042Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610251417-WYHEXR"
        task_revision: 2
      -
        command_digest: "sha256:bda3ff21f506b132c7cb182c2d6089b83a4501daf3780baa610bedf1bc4f7fbf"
        id: "sha256:eb3729006a49783d3d4a4bd8966b85c691cbd409f7561edbe72da0982b1425e2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:eb3729006a49783d3d4a4bd8966b85c691cbd409f7561edbe72da0982b1425e2"
        occurred_at: "2026-10-25T14:19:51.095Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610251417-WYHEXR"
        task_revision: 3
      -
        command_digest: "sha256:0d63f262946053dcffe76f3d449a144df79c963502e3ce7b3f1d414484bc3c7c"
        id: "kernel_work_item_materialization_required:sha256:93297b0f57ccc31ab45814e98d6b14528a6bf9dd2a5036058d8315c7c00fa28d:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:93297b0f57ccc31ab45814e98d6b14528a6bf9dd2a5036058d8315c7c00fa28d:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        occurred_at: "2026-10-25T14:20:04.023Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610251417-WYHEXR"
        task_revision: 4
      -
        command_digest: "sha256:0e1f090a27b14ce47fa0ddf2d9a4c620514640617d7cd015e6e4ca7b91121bc6"
        id: "kernel_work_item_claim_required:sha256:d185c450f90caabbe23984da1af8ba521af95faaefb1d487de345ff56a05afe9:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d185c450f90caabbe23984da1af8ba521af95faaefb1d487de345ff56a05afe9:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        occurred_at: "2026-10-25T14:20:23.299Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610251417-WYHEXR"
        task_revision: 5
      -
        command_digest: "sha256:35a33aac0e23b2fe0ad30ae88257f6c419b0e8089b9904889db8304513977e15"
        id: "kernel_work_item_execution_required:sha256:5c5a72700a42e478022a7e2fd53f93019e18a345b90689dae9a4f521ca7e85cf:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:5c5a72700a42e478022a7e2fd53f93019e18a345b90689dae9a4f521ca7e85cf:sha256:14250b3548ac51e49537c240a0e0a89e87d142aaf2dc0d3f59bd0a97d59c4a57"
        occurred_at: "2026-10-25T14:21:36.349Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610251417-WYHEXR"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover proven applied provider branch updates after interrupted supervisor intents

A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.

## Scope

- In scope: A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.
- Out of scope: unrelated refactors not required for "Recover proven applied provider branch updates after interrupted supervisor intents".

## Plan

1. Execute approved WorkItem recover-proven-provider-update-intent.

## Verify Steps

PLANNER fallback scaffold for "Recover proven applied provider branch updates after interrupted supervisor intents". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover proven applied provider branch updates after interrupted supervisor intents". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
