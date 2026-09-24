---
id: "202609241856-CCBDZ9"
title: "Make canonical final validation execute only approved Plan verification commands"
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
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
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
doc_updated_at: "2026-09-24T18:57:01.313Z"
doc_updated_by: "CODER"
description: "Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands."
sections:
  Summary: |-
    Make canonical final validation execute only approved Plan verification commands

    Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
  Scope: |-
    - In scope: Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
    - Out of scope: unrelated refactors not required for "Make canonical final validation execute only approved Plan verification commands".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "9a9ccf33a80c42e7a2643caaaf2f490e588384d0"
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
            digest: "sha256:c5aafd1604e3a96f1c2d8bbd93679134d8c5482a3942e0290786c85304663143"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:452b1803dc898dbb83e03088a04ebe839011f5c5bfbc08137df3d2e79456f03b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609241856-CCBDZ9"
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
        approval_evidence_digest: "sha256:452b1803dc898dbb83e03088a04ebe839011f5c5bfbc08137df3d2e79456f03b"
        digest: "sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de"
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
              - "canonical-command-ownership"
              - "divergent-command-regression"
            id: "canonical-final-validation-commands"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609241856-CCBDZ9"
      intent_digest: "sha256:5a12b5634a0e89f2eacc248636e2ed15e621def6b5afcf9ae2529b7acff74ca5"
      migration_receipts: []
      mutation_receipts:
        capture:202609241856-CCBDZ9:
          after_revision: 1
          aggregate_digest: "sha256:f0de3f8920e88e61685df1f7baa0dd3e49f174839d602d892d102678adb2a549"
          before_revision: 0
          command_digest: "sha256:6babd9b04ffe0eacacca42e438010228810c06b823fe9d103100db62c758ee6d"
          effect_ids: []
          event_digests:
            - "sha256:532e61e2e14f083f80602b4e3b48d01b5ababaaf4cabc304400b98f9dbad5482"
          mutation_id: "capture:202609241856-CCBDZ9"
        kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 5
          aggregate_digest: "sha256:6f8da34f3465d2caa66cbdd08882ae637a96e2d49bee2a436aaa869af4d82c28"
          before_revision: 4
          command_digest: "sha256:cd27eec62b91e5c1f745de780bb5761c99916b3fa5b5002b4777e3684bb5a314"
          effect_ids: []
          event_digests:
            - "sha256:6fa62258cf4e35431ae611642b25f060b13eee53010f0d43b26d6d7c2ce20f35"
          mutation_id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 6
          aggregate_digest: "sha256:78914ab8f8471689b0cca2dfe9e740bd3979a6dd08869f82c24797e68b86b2a1"
          before_revision: 5
          command_digest: "sha256:d26bb0d50bd4ab17026430d57a8e630f65c2111ac5146a693fe341fea6961a80"
          effect_ids: []
          event_digests:
            - "sha256:f81684b63703f96d63867252fa2728350fdbc85db831257cd05388b48ece8e01"
          mutation_id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 4
          aggregate_digest: "sha256:5f30332994f42e4cfe8a70550f17b8c0d07e4a6dc08e41d6e1eeaea08707bab4"
          before_revision: 3
          command_digest: "sha256:f5d7b6dc3c2be7bf3ba7fe2946d61a8bc84487b3b511a4563a1ec52e445f1020"
          effect_ids: []
          event_digests:
            - "sha256:87912d696d6fbb9fd0a36c7ec9b57fa1a1744d02840a18e33baa87582b587e99"
          mutation_id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02:
          after_revision: 2
          aggregate_digest: "sha256:831fbab0cc27cb5e5b40aaf490fe4da615416e5e4aa97a4c59ef9bc6717d3c67"
          before_revision: 1
          command_digest: "sha256:9bfc27b3f3c7c0339c23f2fb45f1b0aa9e61e43ee7a97ebce6d6712c4894c16a"
          effect_ids: []
          event_digests:
            - "sha256:6b5fc51a4edc721792cd67b60b3ef50f1103e503beabdd3742befe6024d1af1f"
          mutation_id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02"
        sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26:
          after_revision: 3
          aggregate_digest: "sha256:e26dfa25bd2e91fccbd58b5458b0d3c08306c72c2f3398286df7f3b7967b17fb"
          before_revision: 2
          command_digest: "sha256:a33d3206ea72e0526f32c67dd5b3c0fb9877a11774982ed66262ded1a6cad9dc"
          effect_ids: []
          event_digests:
            - "sha256:65bf645bd5b098bcdc9ff04268fb49adb720107d45cc9e36f367220258e367cb"
          mutation_id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-final-validation-commands:
          attempt: 1
          claim_id: "sha256:db2295b3bf2e8c2ccb7f52c91dab50793f1f565c57d358371ff6ed3fa2f87bbf"
          definition:
            contract_digest: "sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de"
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
              - "canonical-command-ownership"
              - "divergent-command-regression"
            id: "canonical-final-validation-commands"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:d1336f17cd14012319bcc62233ffa48317f45b0e2c4d8601d1fb39d49b8c1a32"
    documents:
      contracts:
        sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de:
          acceptance_criteria:
            - "A stale or divergent operational task.verify command is not executed by canonical final validation."
            - "Every verification command from the approved canonical Plan is still executed and bound into final validation evidence."
            - "Direct-task verification continues to include task.verify when invoked outside canonical final validation."
            - "Regression coverage proves divergent legacy and canonical command ownership."
          objective: "Make canonical final validation execute only the verification commands in the currently approved canonical Plan while preserving legacy direct-task verification behavior outside this route."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:fast"
      intent:
        context: "Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands."
        objective: "Make canonical final validation execute only approved Plan verification commands"
    events:
      -
        command_digest: "sha256:6babd9b04ffe0eacacca42e438010228810c06b823fe9d103100db62c758ee6d"
        id: "capture:202609241856-CCBDZ9:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609241856-CCBDZ9"
        occurred_at: "2026-09-24T18:57:01.291Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609241856-CCBDZ9"
        task_revision: 1
      -
        command_digest: "sha256:9bfc27b3f3c7c0339c23f2fb45f1b0aa9e61e43ee7a97ebce6d6712c4894c16a"
        id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02"
        occurred_at: "2026-09-24T18:57:54.365Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609241856-CCBDZ9"
        task_revision: 2
      -
        command_digest: "sha256:a33d3206ea72e0526f32c67dd5b3c0fb9877a11774982ed66262ded1a6cad9dc"
        id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26"
        occurred_at: "2026-09-24T18:57:57.643Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609241856-CCBDZ9"
        task_revision: 3
      -
        command_digest: "sha256:f5d7b6dc3c2be7bf3ba7fe2946d61a8bc84487b3b511a4563a1ec52e445f1020"
        id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:00.736Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609241856-CCBDZ9"
        task_revision: 4
      -
        command_digest: "sha256:cd27eec62b91e5c1f745de780bb5761c99916b3fa5b5002b4777e3684bb5a314"
        id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:04.952Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609241856-CCBDZ9"
        task_revision: 5
      -
        command_digest: "sha256:d26bb0d50bd4ab17026430d57a8e630f65c2111ac5146a693fe341fea6961a80"
        id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:52.572Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609241856-CCBDZ9"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make canonical final validation execute only approved Plan verification commands

Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.

## Scope

- In scope: Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
- Out of scope: unrelated refactors not required for "Make canonical final validation execute only approved Plan verification commands".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
