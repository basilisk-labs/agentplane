---
id: "202610102009-NYTBDA"
title: "Qualify GitLab frozen-source and logical-target publication regression"
status: "DOING"
priority: "high"
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
  - "bun run test:project agentplane packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts --maxWorkers=2"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T20:10:39.307Z"
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
      - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
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
      - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
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
          - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
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
      digest: "sha256:764e3eb0255bfa07a9398a6bfb2f82d7e1d7c98d633c24484acbca12034ed3d7"
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
doc_updated_at: "2026-10-10T20:09:10.561Z"
doc_updated_by: "CODER"
description: "Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review."
sections:
  Summary: |-
    Qualify GitLab frozen-source and logical-target publication regression

    Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.
  Scope: |-
    - In scope: Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.
    - Out of scope: unrelated refactors not required for "Qualify GitLab frozen-source and logical-target publication regression".
  Plan: "1. Execute approved WorkItem qualify-gitlab-frozen-base."
  Verify Steps: |-
    PLANNER fallback scaffold for "Qualify GitLab frozen-source and logical-target publication regression". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Qualify GitLab frozen-source and logical-target publication regression". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "7b46bd63fa10785c36420ee627c01d814171497b"
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
            digest: "sha256:d49fd72909adde4206983eeec6899909f1aa218c976287005676cad0f81b7415"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6759087e995be9683191635af864dfd47e6c7d1ee1d44446a6ff15d88993e29c"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eb097b51b0a4ede55dc2ad3303d3c08415e6374ed4e7c707c8a65fa093287cce"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
            task_id: "202610102009-NYTBDA"
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
        approval_evidence_digest: "sha256:eb097b51b0a4ede55dc2ad3303d3c08415e6374ed4e7c707c8a65fa093287cce"
        digest: "sha256:6759087e995be9683191635af864dfd47e6c7d1ee1d44446a6ff15d88993e29c"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9b3de62d4958614e9d3c1a23a26f8b979c1ccc631d4395300bbc09faf207fdeb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
            expected_outputs:
              - "gitlab-frozen-base-regression-evidence"
            id: "qualify-gitlab-frozen-base"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610102009-NYTBDA"
      intent_digest: "sha256:b6f3235fde33da2dc27c741b563ef6381cb03130fd93820562ffa7c83e2b2fa8"
      migration_receipts: []
      mutation_receipts:
        capture:202610102009-NYTBDA:
          after_revision: 1
          aggregate_digest: "sha256:b9b60a40c987f7e830ffe9c1d9d2968c02eb075de24f9783d161a36f2111b7e1"
          before_revision: 0
          command_digest: "sha256:ddd49b65b16c406a77dc5203bc7d82a701c4c67ca4783a3404f41df029eba136"
          effect_ids: []
          event_digests:
            - "sha256:b6e0358cd4531837016f603b8471841b20890cb048cb4cf088ce0db6c384e5a2"
          mutation_id: "capture:202610102009-NYTBDA"
        kernel_work_item_claim_required:sha256:1fe95650b7ba3d4e56c55b972a844d89ee93f2e2f9b30ed6c33d1ffd2c1ae930:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:229b8fff0dd0c09e21c8e7cb6f05242b0457cf0c9dfbe58b626dc88a396b10fe"
          before_revision: 4
          command_digest: "sha256:6377b6eebdcfe5305f0db482f1023dc8ddf582994fb5a4730398d160c5407bd1"
          effect_ids: []
          event_digests:
            - "sha256:e5bcfbbdd8e858b8a574d58ac77b183f338a1b2846af844174b520d66ae374bb"
          mutation_id: "kernel_work_item_claim_required:sha256:1fe95650b7ba3d4e56c55b972a844d89ee93f2e2f9b30ed6c33d1ffd2c1ae930:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:4bbfef7e23978f702cb2c0a77bdf8d6e1fc0edabc9ac7f12d1fc7483b51977f8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:1224ef13cdd6b6f1a17044cf6e19e8d3a845f428cf4e1388711e44948c6694c8"
          before_revision: 5
          command_digest: "sha256:352ef53f49c3f381267ec897ff0e19e67ea9ef2f5a09ee892985ec9f1da7849c"
          effect_ids: []
          event_digests:
            - "sha256:b9cfdefb8224ee68650f1285976af093171acded261426a6aba72875e540d190"
          mutation_id: "kernel_work_item_execution_required:sha256:4bbfef7e23978f702cb2c0a77bdf8d6e1fc0edabc9ac7f12d1fc7483b51977f8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_materialization_required:sha256:cd12f547f28ba8b93c07a17027a67f8cd735c9cdeb18ae39d8b0d6fc3e063d9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:a39269b30ecfa970548fea3fd66d2f9bccbd1261f6e2a9c8ae5b09644197b648"
          before_revision: 3
          command_digest: "sha256:671c36642129ef0a44035358a75479f9caa636f7b883fb003a1a2c41d756c356"
          effect_ids: []
          event_digests:
            - "sha256:943fb47fa37b8e55a8531d1f87d5e63ce6d8e96c79c28226af9461ec1ec02a54"
          mutation_id: "kernel_work_item_materialization_required:sha256:cd12f547f28ba8b93c07a17027a67f8cd735c9cdeb18ae39d8b0d6fc3e063d9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:70e5d1046ab1b9c6a81991bbaf14084dd034bfeeab99e530b03dffce9b521556:
          after_revision: 2
          aggregate_digest: "sha256:02649c1f8eeb9ba0d792653c7a8c56fca9822725be7ab65275ca5a60289b720a"
          before_revision: 1
          command_digest: "sha256:7a79350ec168cbfcc9330ed6d06edb7b6626806496d1af59f25f80a64b821cdd"
          effect_ids: []
          event_digests:
            - "sha256:0e8a581860e7452fe7e41a1bb9062a82227be937eabbb1ad43af415414a817c4"
          mutation_id: "result:sha256:70e5d1046ab1b9c6a81991bbaf14084dd034bfeeab99e530b03dffce9b521556"
        sha256:38875b80fe466ae79c30a4eda3b2f45693924e20c816a29e798da43bb53b70a1:
          after_revision: 3
          aggregate_digest: "sha256:a687337c37a427da1faa877e4d78bef5f5516f522b1b7e578f238eb5f0d61745"
          before_revision: 2
          command_digest: "sha256:d387a3c28ae61460a3438f64872fb1c85eb4b211fe4d92b2bf8c5aaa98ae98e5"
          effect_ids: []
          event_digests:
            - "sha256:af75b09aa95a6c412dcdfd6e5db1f1d97cb9e7fe727bc7cd43dc214f6a1b6aa2"
          mutation_id: "sha256:38875b80fe466ae79c30a4eda3b2f45693924e20c816a29e798da43bb53b70a1"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        qualify-gitlab-frozen-base:
          attempt: 1
          claim_id: "sha256:cd46980dfc1c31e4adb53ffeee4b0c81fabb2350ec66a7f6e37da69c7cdc9393"
          definition:
            contract_digest: "sha256:9b3de62d4958614e9d3c1a23a26f8b979c1ccc631d4395300bbc09faf207fdeb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
            expected_outputs:
              - "gitlab-frozen-base-regression-evidence"
            id: "qualify-gitlab-frozen-base"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:74acbf73037596be417cc00b88c427dc5d37f264f56dbe5528b1542930d860f4"
    documents:
      contracts:
        sha256:9b3de62d4958614e9d3c1a23a26f8b979c1ccc631d4395300bbc09faf207fdeb:
          acceptance_criteria:
            - "Exercise the real PR sync and GitLab payload construction with a legacy task frozen40-character base_ref/base_sha and separately configured main target. Use a local Git remote and mocked external provider transport; do not mock the base resolver or MR payload builder. Assert target_branch main and exact source branch/head."
            - "Assert frozen task execution base, source contents and diff comparison remain bound to the original commit; publication metadata uses logical main. Do not rewrite accepted implementation or verification evidence or claim hosted checks have run."
            - "Prove missing, moved or inconsistent target branch evidence refuses before any GitLab POST. Preserve exact existing fail-closed resolver semantics and GitHub behavior."
            - "Confine changes to the two admitted test files. Reuse completed K43XFE/RDP implementation; no production fix duplication, provider-specific lifecycle, live GitLab writes, credentials, retarget operation or immutable baseline changes."
            - "Run all three declared checks plus scoped test-file lint/format. Record source/runtime hashes and actual positive/negative results, retaining any failures. Return report for independent evaluation; do not claim release completion."
          objective: "Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts --maxWorkers=2"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review."
        objective: "Qualify GitLab frozen-source and logical-target publication regression"
    events:
      -
        command_digest: "sha256:ddd49b65b16c406a77dc5203bc7d82a701c4c67ca4783a3404f41df029eba136"
        id: "capture:202610102009-NYTBDA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610102009-NYTBDA"
        occurred_at: "2026-10-10T20:09:10.408Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610102009-NYTBDA"
        task_revision: 1
      -
        command_digest: "sha256:7a79350ec168cbfcc9330ed6d06edb7b6626806496d1af59f25f80a64b821cdd"
        id: "result:sha256:70e5d1046ab1b9c6a81991bbaf14084dd034bfeeab99e530b03dffce9b521556:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:70e5d1046ab1b9c6a81991bbaf14084dd034bfeeab99e530b03dffce9b521556"
        occurred_at: "2026-10-10T20:10:22.968Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610102009-NYTBDA"
        task_revision: 2
      -
        command_digest: "sha256:d387a3c28ae61460a3438f64872fb1c85eb4b211fe4d92b2bf8c5aaa98ae98e5"
        id: "sha256:38875b80fe466ae79c30a4eda3b2f45693924e20c816a29e798da43bb53b70a1:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:38875b80fe466ae79c30a4eda3b2f45693924e20c816a29e798da43bb53b70a1"
        occurred_at: "2026-10-10T20:10:33.052Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610102009-NYTBDA"
        task_revision: 3
      -
        command_digest: "sha256:671c36642129ef0a44035358a75479f9caa636f7b883fb003a1a2c41d756c356"
        id: "kernel_work_item_materialization_required:sha256:cd12f547f28ba8b93c07a17027a67f8cd735c9cdeb18ae39d8b0d6fc3e063d9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:cd12f547f28ba8b93c07a17027a67f8cd735c9cdeb18ae39d8b0d6fc3e063d9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T20:10:43.845Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610102009-NYTBDA"
        task_revision: 4
      -
        command_digest: "sha256:6377b6eebdcfe5305f0db482f1023dc8ddf582994fb5a4730398d160c5407bd1"
        id: "kernel_work_item_claim_required:sha256:1fe95650b7ba3d4e56c55b972a844d89ee93f2e2f9b30ed6c33d1ffd2c1ae930:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1fe95650b7ba3d4e56c55b972a844d89ee93f2e2f9b30ed6c33d1ffd2c1ae930:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T20:10:59.698Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610102009-NYTBDA"
        task_revision: 5
      -
        command_digest: "sha256:352ef53f49c3f381267ec897ff0e19e67ea9ef2f5a09ee892985ec9f1da7849c"
        id: "kernel_work_item_execution_required:sha256:4bbfef7e23978f702cb2c0a77bdf8d6e1fc0edabc9ac7f12d1fc7483b51977f8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4bbfef7e23978f702cb2c0a77bdf8d6e1fc0edabc9ac7f12d1fc7483b51977f8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T20:12:35.595Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610102009-NYTBDA"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Qualify GitLab frozen-source and logical-target publication regression

Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.

## Scope

- In scope: Issue #6119 was observed with installed 0.7.12-beta.1, not qualified7b46. Add generic regression coverage of the existing provider-base separation; do not duplicate or change production implementation. Exercise legacy task_execution_context base_ref/base_sha as a frozen40-character commit with configured logicalmain through real PR synchronization and GitLab POST payload construction, mocking only external transport. Use local Git target evidence, no live GitLab writes/network/provider. Preserve frozen verification/diff base and source/task evidence. Test missing or inconsistent branch evidence refuses before provider POST; retain existing GitHub behavior. No Factory-specific adapter, lifecycle workaround, retargeting or release claim. Read existing K43XFE/RDP source coverage; report exact source/runtime/check evidence for independent review.
- Out of scope: unrelated refactors not required for "Qualify GitLab frozen-source and logical-target publication regression".

## Plan

1. Execute approved WorkItem qualify-gitlab-frozen-base.

## Verify Steps

PLANNER fallback scaffold for "Qualify GitLab frozen-source and logical-target publication regression". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Qualify GitLab frozen-source and logical-target publication regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
