---
id: "202609291223-N4B1DN"
title: "Complete issue 5991: verify test fixture cleanup and interrupted-run recovery"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-29T22:25:36.178Z"
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
      - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
      - "packages/testkit/src"
      - "scripts/checks"
      - "vitest.config.ts"
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
      - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
      - "packages/testkit/src"
      - "scripts/checks"
      - "vitest.config.ts"
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
          - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
          - "packages/testkit/src"
          - "scripts/checks"
          - "vitest.config.ts"
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
      digest: "sha256:2e4f8e14931234aa2316e6267e5b83c39782cc6b2c204e54a200b26843586a67"
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
doc_updated_at: "2026-09-29T12:23:27.813Z"
doc_updated_by: "CODER"
description: "Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated."
sections:
  Summary: |-
    Complete issue 5991: verify test fixture cleanup and interrupted-run recovery

    Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.
  Scope: |-
    - In scope: Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.
    - Out of scope: unrelated refactors not required for "Complete issue 5991: verify test fixture cleanup and interrupted-run recovery".
  Plan: "1. Execute approved WorkItem verify-temp-cleanup."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "4119c4342407fa28a7283521e2b0f87bbea5f243"
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
            digest: "sha256:2d7a8263f212f0d305c94fa73908a7cf35ea07f6aeefd89f99987ae765dbf4de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:43e43428d42910bbe6e236119b68edd9d6613d05c722762cc8f692b76e15c65f"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d971378b084e3a621e8a6f8144f9a1bab5824a0b0491901c83b5bcb62377d0bf"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
              - "packages/testkit/src"
              - "scripts/checks"
              - "vitest.config.ts"
            task_id: "202609291223-N4B1DN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1908d13143fba45933d1694cbb9bf69d283b2525f5030ca83e90a9fb9ebabb10"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:43e43428d42910bbe6e236119b68edd9d6613d05c722762cc8f692b76e15c65f"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:d971378b084e3a621e8a6f8144f9a1bab5824a0b0491901c83b5bcb62377d0bf"
              kind: "USER"
              parent_authority_digest: "sha256:2d7a8263f212f0d305c94fa73908a7cf35ea07f6aeefd89f99987ae765dbf4de"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
              - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
              - "packages/testkit/src"
              - "scripts/checks"
              - "vitest.config.ts"
            task_id: "202609291223-N4B1DN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
            changed_paths:
              - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
            evidence_digest: "sha256:b705c6e5d3b687307b0160030ac8a9ffa9d4412fed3389d3e38e19e712a9950f"
            kind: "authority_delta"
            previous_fingerprint: "sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
            repository_evidence_digest: "sha256:1357f26936c66474ac96e7809f87c33c13485132164861364ec4a1727b2423d7"
            request_digest: "sha256:aea01ba4b01392f8dca4211fb626a16e643af69b509fbc7604490c0fcaa8bb22"
            request_task_revision: 5
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:d971378b084e3a621e8a6f8144f9a1bab5824a0b0491901c83b5bcb62377d0bf"
        digest: "sha256:43e43428d42910bbe6e236119b68edd9d6613d05c722762cc8f692b76e15c65f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:4dcf62af993410e05c6c4090e20117d7217d37d4bf8295ecd1bcc472de41e6dd"
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
                - "packages/testkit/src"
            expected_outputs:
              - "cleanup-regressions"
            id: "verify-temp-cleanup"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609291223-N4B1DN"
      intent_digest: "sha256:e476df75ee05b65e917820761ae67a41eacecb9a9224d90d9c756db00c6cf0f5"
      migration_receipts: []
      mutation_receipts:
        capture:202609291223-N4B1DN:
          after_revision: 1
          aggregate_digest: "sha256:b359322e1e668ea12587f4537bd559e2801aca239deb510ec26ba0d34cf09e19"
          before_revision: 0
          command_digest: "sha256:45d284c8f8ac16caa765dbe9f8414f179abd1f318c7c6457a315798ff095624c"
          effect_ids: []
          event_digests:
            - "sha256:6e5ac165144bc63c7bf618108346c3befb0f1303a0f07ede37c1e147b3516462"
          mutation_id: "capture:202609291223-N4B1DN"
        kernel_work_item_claim_required:sha256:e8dc2c53ced004050917cd3435e1d40a8948c8efb41b3a286fcbfb615d04548f:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821:
          after_revision: 5
          aggregate_digest: "sha256:5d350706116f6e6fe551d59ea9cf1f5ec2d9bceeccfe6f7726d9df5017bb5f70"
          before_revision: 4
          command_digest: "sha256:fcf7a94f5aba2108dc28fe6e0a3c1545f296e3d2413612e63818e714af3c6333"
          effect_ids: []
          event_digests:
            - "sha256:559bb7e57976b19c2a2b054a199eff6495dfd345430cae00b70600a7673ea895"
          mutation_id: "kernel_work_item_claim_required:sha256:e8dc2c53ced004050917cd3435e1d40a8948c8efb41b3a286fcbfb615d04548f:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
        kernel_work_item_execution_required:sha256:2b568978b1c2b96888a29ffa2fa64ecce3939c27fbcc0647fb8765f7559abbe1:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 7
          aggregate_digest: "sha256:1f553e5998c49922f9e238ca6fabdb3a9f977e6317413cf35e495728bb40ab90"
          before_revision: 6
          command_digest: "sha256:41754ffc1efebc005b6c028515524bb737fdfc90f98b81e98598b4007e1c333a"
          effect_ids: []
          event_digests:
            - "sha256:d0be711e82998255647429a74e8a8b74d6b478b1d953018e99cc39355202dcfb"
          mutation_id: "kernel_work_item_execution_required:sha256:2b568978b1c2b96888a29ffa2fa64ecce3939c27fbcc0647fb8765f7559abbe1:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        kernel_work_item_materialization_required:sha256:ca93404b4f55f6d54a63679dac450fd82d96be5b7536692a375dd0d73b47f2ed:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821:
          after_revision: 4
          aggregate_digest: "sha256:b5e3441327b0cbc33329043e50c09e91ee29c99ff3833cfc56815907eec47a9b"
          before_revision: 3
          command_digest: "sha256:e2356d32c62fd44fb6988e030dfb86bf8a8eeb93fde1c241fe65a89d26173227"
          effect_ids: []
          event_digests:
            - "sha256:368711f3e18117077fb0d31984eec8f88be1643858c27e0d6d69d212ce2a0899"
          mutation_id: "kernel_work_item_materialization_required:sha256:ca93404b4f55f6d54a63679dac450fd82d96be5b7536692a375dd0d73b47f2ed:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
        result:sha256:ac7f205441773737a060c28071fc5661d25e2ac9fd49cfa33b9123664fe834dd:
          after_revision: 2
          aggregate_digest: "sha256:53abf1960f58f47730c698d80425cbb893a6fd64f1897af76c53bbc1e51a4901"
          before_revision: 1
          command_digest: "sha256:74b9daef19ca8e82af23da40a676f267fc1ac90f6e85d363aac666c06cbedecc"
          effect_ids: []
          event_digests:
            - "sha256:6109bbac6a00a5a956f3dc0a0c65f2c7176062ac8bca53b3bf4fc660698762a8"
          mutation_id: "result:sha256:ac7f205441773737a060c28071fc5661d25e2ac9fd49cfa33b9123664fe834dd"
        sha256:38a3df4d77a650a11cff328f2e3056807810091b055655b640de2589be398ca4:
          after_revision: 3
          aggregate_digest: "sha256:4d802d839b9a0b2e6e3c8200a30bbd2be9ea95ae7110a9fb14a948731b26ba13"
          before_revision: 2
          command_digest: "sha256:a37e141085b6d979027b4c4ae1c0962d7bb127e548964f8ba21c81e7b2607529"
          effect_ids: []
          event_digests:
            - "sha256:386d754db26eac652fdf2e20eb38e4552da2aafd4638a7b5b1ba8def4dd9c98e"
          mutation_id: "sha256:38a3df4d77a650a11cff328f2e3056807810091b055655b640de2589be398ca4"
        sha256:efc91be69c075ff7efa12609a4d97ff8095b94e28f3e00669e4e25dba0dd6a6a:
          after_revision: 6
          aggregate_digest: "sha256:1309be055d801196bdca6151d0c6b140f561137ffd09d266b49f76bce8b64b1b"
          before_revision: 5
          command_digest: "sha256:cf3eed76c5a67405c41c7fcd1e0b527e0515c4836d8d0b9f6b5e306dfcdb5330"
          effect_ids: []
          event_digests:
            - "sha256:2bf517c80f55ee2c4ba73eade78feccc881a10a0ded7947922cd5d7dcb4dcea2"
          mutation_id: "sha256:efc91be69c075ff7efa12609a4d97ff8095b94e28f3e00669e4e25dba0dd6a6a"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        verify-temp-cleanup:
          attempt: 1
          claim_id: "sha256:49fe3dac20b0b250051ca5ab65fd6c5991521ad5d511dd8c66120ce3a3c7245d"
          definition:
            contract_digest: "sha256:4dcf62af993410e05c6c4090e20117d7217d37d4bf8295ecd1bcc472de41e6dd"
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
                - "packages/testkit/src"
            expected_outputs:
              - "cleanup-regressions"
            id: "verify-temp-cleanup"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:a12460087c927715b69efcc6becaf2c69d7144d1bc6a687993f6fa1d00c18ae2"
    documents:
      contracts:
        sha256:4dcf62af993410e05c6c4090e20117d7217d37d4bf8295ecd1bcc472de41e6dd:
          acceptance_criteria:
            - "Ordinary failure and child-process failure still execute cleanup and restore environment."
            - "Concurrent workers cannot delete each other's active roots."
            - "Interrupted dead-worker roots are recovered only after the stale threshold; malformed, unmarked, symlink and unrelated roots remain untouched."
            - "Repeated focused checks report zero residual owned directories and bytes."
            - "A measurement runner supports the full local CI command, preserves its exit code and reports residue independently."
          objective: "Add regression coverage for owned temporary-root cleanup after ordinary test failure, subprocess failure, interrupted worker recovery, and concurrent workers. Preserve live and unrelated data. Add an isolated measurement runner for repeated focused tests and optional full local CI that reports remaining root count and bytes before deleting only its own isolated parent. Repair reproduced scoped leaks. Full-CI residue evidence is required before issue closure."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run --config vitest.config.ts --maxWorkers=2 packages/testkit/src/cli-harness/temp-root-cleanup.test.ts packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts"
            - "node packages/testkit/src/cli-harness/temp-root-cleanup.measure.mjs --focused"
            - "bun x eslint packages/testkit/src/cli-harness/temp-root-cleanup*.ts packages/testkit/src/cli-harness/temp-root-cleanup.measure.mjs"
            - "bun run typecheck"
      intent:
        context: "Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated."
        objective: "Complete issue 5991: verify test fixture cleanup and interrupted-run recovery"
    events:
      -
        command_digest: "sha256:45d284c8f8ac16caa765dbe9f8414f179abd1f318c7c6457a315798ff095624c"
        id: "capture:202609291223-N4B1DN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609291223-N4B1DN"
        occurred_at: "2026-09-29T12:23:27.744Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609291223-N4B1DN"
        task_revision: 1
      -
        command_digest: "sha256:74b9daef19ca8e82af23da40a676f267fc1ac90f6e85d363aac666c06cbedecc"
        id: "result:sha256:ac7f205441773737a060c28071fc5661d25e2ac9fd49cfa33b9123664fe834dd:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ac7f205441773737a060c28071fc5661d25e2ac9fd49cfa33b9123664fe834dd"
        occurred_at: "2026-09-29T22:25:02.161Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609291223-N4B1DN"
        task_revision: 2
      -
        command_digest: "sha256:a37e141085b6d979027b4c4ae1c0962d7bb127e548964f8ba21c81e7b2607529"
        id: "sha256:38a3df4d77a650a11cff328f2e3056807810091b055655b640de2589be398ca4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:38a3df4d77a650a11cff328f2e3056807810091b055655b640de2589be398ca4"
        occurred_at: "2026-09-29T22:25:21.378Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609291223-N4B1DN"
        task_revision: 3
      -
        command_digest: "sha256:e2356d32c62fd44fb6988e030dfb86bf8a8eeb93fde1c241fe65a89d26173227"
        id: "kernel_work_item_materialization_required:sha256:ca93404b4f55f6d54a63679dac450fd82d96be5b7536692a375dd0d73b47f2ed:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ca93404b4f55f6d54a63679dac450fd82d96be5b7536692a375dd0d73b47f2ed:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
        occurred_at: "2026-09-29T22:25:41.812Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609291223-N4B1DN"
        task_revision: 4
      -
        command_digest: "sha256:fcf7a94f5aba2108dc28fe6e0a3c1545f296e3d2413612e63818e714af3c6333"
        id: "kernel_work_item_claim_required:sha256:e8dc2c53ced004050917cd3435e1d40a8948c8efb41b3a286fcbfb615d04548f:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e8dc2c53ced004050917cd3435e1d40a8948c8efb41b3a286fcbfb615d04548f:sha256:d59328527a747302e7127ff752a5ccfe2cc273f2a2e015de8028dcd698fc0821"
        occurred_at: "2026-09-29T22:26:17.725Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609291223-N4B1DN"
        task_revision: 5
      -
        command_digest: "sha256:cf3eed76c5a67405c41c7fcd1e0b527e0515c4836d8d0b9f6b5e306dfcdb5330"
        id: "sha256:efc91be69c075ff7efa12609a4d97ff8095b94e28f3e00669e4e25dba0dd6a6a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:efc91be69c075ff7efa12609a4d97ff8095b94e28f3e00669e4e25dba0dd6a6a"
        occurred_at: "2026-09-29T22:28:46.321Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202609291223-N4B1DN"
        task_revision: 6
      -
        command_digest: "sha256:41754ffc1efebc005b6c028515524bb737fdfc90f98b81e98598b4007e1c333a"
        id: "kernel_work_item_execution_required:sha256:2b568978b1c2b96888a29ffa2fa64ecce3939c27fbcc0647fb8765f7559abbe1:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2b568978b1c2b96888a29ffa2fa64ecce3939c27fbcc0647fb8765f7559abbe1:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T22:29:51.212Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609291223-N4B1DN"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Complete issue 5991: verify test fixture cleanup and interrupted-run recovery

Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.

## Scope

- In scope: Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.
- Out of scope: unrelated refactors not required for "Complete issue 5991: verify test fixture cleanup and interrupted-run recovery".

## Plan

1. Execute approved WorkItem verify-temp-cleanup.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
