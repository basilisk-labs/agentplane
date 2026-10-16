---
id: "202610160558-WCR70H"
title: "Match operational review projections to normalized Task readback"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "fix"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run arch:check"
  - "bun run ci:local:full"
  - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-16T06:06:31.803Z"
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
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
          - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
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
      digest: "sha256:526f585c323ce2bed2abc98e06ca6d845ce3132e922effd0356d6c7438d6814f"
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
doc_updated_at: "2026-10-16T05:58:45.649Z"
doc_updated_by: "CODER"
description: "Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes."
sections:
  Summary: |-
    Match operational review projections to normalized Task readback

    Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.
  Scope: |-
    - In scope: Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.
    - Out of scope: unrelated refactors not required for "Match operational review projections to normalized Task readback".
  Plan: "1. Execute approved WorkItem normalize-operational-review-readback."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "52bd7ae0b289547a5069fc1a76fa878369bd069e"
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
            digest: "sha256:3b1f25c43f433454bc67863010f263fb601a4a1154f26b137a9a987ca4100209"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:1f3ae3c843899889331667fd02b26b6d5e843c42ee01035aeec33634c335dd28"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c0af3277a3bb6eb0d061f43c1020ba025ddac42bd082ac43e2a655a4430e7e27"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
            task_id: "202610160558-WCR70H"
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
        approval_evidence_digest: "sha256:c0af3277a3bb6eb0d061f43c1020ba025ddac42bd082ac43e2a655a4430e7e27"
        digest: "sha256:1f3ae3c843899889331667fd02b26b6d5e843c42ee01035aeec33634c335dd28"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9affe61406fd3d8f7fa6ddaa508f4588e27418a542e54ab391b0b33d5a8a3d0a"
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
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            expected_outputs:
              - "normalized-projection-source-report"
            id: "normalize-operational-review-readback"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610160558-WCR70H"
      intent_digest: "sha256:32f2da8d953c2495e36e71000070712fe2a0c7a0a5f220612d15db80c33e3562"
      migration_receipts: []
      mutation_receipts:
        capture:202610160558-WCR70H:
          after_revision: 1
          aggregate_digest: "sha256:a22310c5312bdc3ea0a07f6f9731d13f44cc7b6cbc4fa19055b62f69dcb38305"
          before_revision: 0
          command_digest: "sha256:7242f961af0b9fd215e7c3651a584815a9611c3e8e9911e5f53bee254b3ee652"
          effect_ids: []
          event_digests:
            - "sha256:73c184ce28b9554b9a5a4f1535e7e86d8493c79aa2a626a7c63cf24816837667"
          mutation_id: "capture:202610160558-WCR70H"
        kernel_work_item_claim_required:sha256:0fe59c5f9fa6448b0180ab9e249a61cae88add5572fc9cf81ea0ec454d0a15d4:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:
          after_revision: 5
          aggregate_digest: "sha256:a4bdb069f90f7f958828908e59c4d007217bf9b52db725600abf3016fd2c8ec5"
          before_revision: 4
          command_digest: "sha256:4e975306c3e672ff0f3b0040d712c9913fc38c3b93a414e024be819d354f42ba"
          effect_ids: []
          event_digests:
            - "sha256:08e7469efa61f0b0968b492649fccf92d83f3ce552f6226c1aa1cb5e79b9d2d0"
          mutation_id: "kernel_work_item_claim_required:sha256:0fe59c5f9fa6448b0180ab9e249a61cae88add5572fc9cf81ea0ec454d0a15d4:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        kernel_work_item_execution_required:sha256:f8a91b81043f463d2f17ee15912ebf000461e211701dc3f64f1f6ec7db576542:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:
          after_revision: 6
          aggregate_digest: "sha256:9c47134dc6e1f7cc70d8949a5fa8975692389d9914a5b75e77ee042d86e9cba7"
          before_revision: 5
          command_digest: "sha256:ec19dbd9899d1dc5f7236a1c859ad8cac51987c71d34b7cedd9530e799f10802"
          effect_ids: []
          event_digests:
            - "sha256:1933e9cf4bffd58ce39eaca4670b342c1dd6b178d77e299a0e90867cbcae4d3c"
          mutation_id: "kernel_work_item_execution_required:sha256:f8a91b81043f463d2f17ee15912ebf000461e211701dc3f64f1f6ec7db576542:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        kernel_work_item_materialization_required:sha256:6bac114a277991fdc00cd771fdc9fadb381d47ebc2e4ba726946e33eb6354519:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:
          after_revision: 4
          aggregate_digest: "sha256:08891a54f357ff2b073950009ad26deb77a5735363b1eeb595832dc951d70264"
          before_revision: 3
          command_digest: "sha256:71d150f388cac0332c5dc60b8f377802c96ede9e524577be0f9adee380ef6aa2"
          effect_ids: []
          event_digests:
            - "sha256:f5e7542a2801f03be1828d5dd24bd6af8149ae477d44a373e9f6c2347a900b59"
          mutation_id: "kernel_work_item_materialization_required:sha256:6bac114a277991fdc00cd771fdc9fadb381d47ebc2e4ba726946e33eb6354519:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        result:sha256:d4434f3a41f7ab846547403faf52db13bd58c50d192c475d73f1b51bcf8ba689:
          after_revision: 2
          aggregate_digest: "sha256:d1f0dbac93f79c2112cd6e68d115504a4d2608d731089813d52df6a98ce86d84"
          before_revision: 1
          command_digest: "sha256:62c5c719f8fad024b8c6d893c0f1f721bd112aa9d79d5465af6b5f31c9097912"
          effect_ids: []
          event_digests:
            - "sha256:b5473fa3485d13dfa1dfa42e8882b214720d02f30a244c85d8ed0f10e3b9dfd2"
          mutation_id: "result:sha256:d4434f3a41f7ab846547403faf52db13bd58c50d192c475d73f1b51bcf8ba689"
        sha256:31eb8bf0fb5783cb6486476a1148753d519460468f3894556210a26f100e111e:
          after_revision: 3
          aggregate_digest: "sha256:d0ef10eadc631868024a0475f8609f0ee46386df2aab100e225904cb9893734b"
          before_revision: 2
          command_digest: "sha256:5e5f2e747456dcc1bcd18c7d5237b3f2ae74e40d071ffd1653d4d062c447d1d5"
          effect_ids: []
          event_digests:
            - "sha256:e14aaa6d39cbe04a4a137757452c6e57860d72aaf63321da3f14a4f12e85ebc5"
          mutation_id: "sha256:31eb8bf0fb5783cb6486476a1148753d519460468f3894556210a26f100e111e"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        normalize-operational-review-readback:
          attempt: 1
          claim_id: "sha256:43fbec09a7471389b6a3976e1d0018af396daa868e73dc1a1692094f7d818def"
          definition:
            contract_digest: "sha256:9affe61406fd3d8f7fa6ddaa508f4588e27418a542e54ab391b0b33d5a8a3d0a"
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
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            expected_outputs:
              - "normalized-projection-source-report"
            id: "normalize-operational-review-readback"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:6e772538db071c905ff6e4dd1c748d947ac801c59311c57d16dc6c942e20ea0c"
    documents:
      contracts:
        sha256:9affe61406fd3d8f7fa6ddaa508f4588e27418a542e54ab391b0b33d5a8a3d0a:
          acceptance_criteria:
            - "Normalize only the expected compatibility quality-review object in kernelProjectedReviewMatches with existing normalizeQualityReviewResult before comparing its digest to the actual parsed Task quality_review. Do not normalize the actual operand or change its admission."
            - "Keep raw canonical projection findings/evidence_refs, accepted EVALUATOR result, quality report and review_identity_digest bytes/digests unchanged. Do not rewrite Task Kernel state, review identity, authority, grants, or canonical history."
            - "Extend the two existing nearest test modules with trailing LF/CRLF, leading/trailing whitespace and blank-list-entry readback through the existing real backend normalizer. Demonstrate first projection/recovery restoration and subsequent unchanged/no-second-write recovery so the same canonical final-validation route progresses instead of consuming the repeated-restoration fuse."
            - "Retain strict rejection for changed state, provenance, evaluated SHA, review identity digest, meaningful findings/evidence entries, ordering/duplicates and missing/null/malformed fields where observable. Compare exactly the established normalized representation; do not add blanket evidence normalization, weakening guards or ignored failures."
            - "Use only the three declared existing source/test files on canonical52bd. Preserve all unrelated worktrees, accepted source/evidence, old source tasks, C9/C13/controllers, Factory MQ2VPY Task and runtime profiles. No new module, wrapper, dependency, schema, feature flag or test infrastructure."
            - "Run the exact assigned nearest commands and retain observed logs/results. Native SOURCE verification, independent EVAL, mandatory exact-SHA FINAL full checks and separately approved hosted/runtime qualification remain open until actual evidence. No full check before focused diff review and ROOT heavy slot."
            - "No provider/network/publication, installation/global configuration, image/host operation, stage/commit/manual native mutation or controller patch during source semantic work. Return source manifest/diff/report and typed result UNPLACED for ROOT admission."
          objective: "Match only the expected compatibility review to its established normalized Task readback, removing repeated operational projection recovery without altering raw accepted EVAL/evidence or strict authority identities."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
            - "bun run typecheck"
            - "bun run arch:check"
      intent:
        context: "Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes."
        objective: "Match operational review projections to normalized Task readback"
    events:
      -
        command_digest: "sha256:7242f961af0b9fd215e7c3651a584815a9611c3e8e9911e5f53bee254b3ee652"
        id: "capture:202610160558-WCR70H:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610160558-WCR70H"
        occurred_at: "2026-10-16T05:58:45.610Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610160558-WCR70H"
        task_revision: 1
      -
        command_digest: "sha256:62c5c719f8fad024b8c6d893c0f1f721bd112aa9d79d5465af6b5f31c9097912"
        id: "result:sha256:d4434f3a41f7ab846547403faf52db13bd58c50d192c475d73f1b51bcf8ba689:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d4434f3a41f7ab846547403faf52db13bd58c50d192c475d73f1b51bcf8ba689"
        occurred_at: "2026-10-16T06:06:26.839Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610160558-WCR70H"
        task_revision: 2
      -
        command_digest: "sha256:5e5f2e747456dcc1bcd18c7d5237b3f2ae74e40d071ffd1653d4d062c447d1d5"
        id: "sha256:31eb8bf0fb5783cb6486476a1148753d519460468f3894556210a26f100e111e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:31eb8bf0fb5783cb6486476a1148753d519460468f3894556210a26f100e111e"
        occurred_at: "2026-10-16T06:06:29.870Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610160558-WCR70H"
        task_revision: 3
      -
        command_digest: "sha256:71d150f388cac0332c5dc60b8f377802c96ede9e524577be0f9adee380ef6aa2"
        id: "kernel_work_item_materialization_required:sha256:6bac114a277991fdc00cd771fdc9fadb381d47ebc2e4ba726946e33eb6354519:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:6bac114a277991fdc00cd771fdc9fadb381d47ebc2e4ba726946e33eb6354519:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        occurred_at: "2026-10-16T06:06:32.919Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610160558-WCR70H"
        task_revision: 4
      -
        command_digest: "sha256:4e975306c3e672ff0f3b0040d712c9913fc38c3b93a414e024be819d354f42ba"
        id: "kernel_work_item_claim_required:sha256:0fe59c5f9fa6448b0180ab9e249a61cae88add5572fc9cf81ea0ec454d0a15d4:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0fe59c5f9fa6448b0180ab9e249a61cae88add5572fc9cf81ea0ec454d0a15d4:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        occurred_at: "2026-10-16T06:06:36.809Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610160558-WCR70H"
        task_revision: 5
      -
        command_digest: "sha256:ec19dbd9899d1dc5f7236a1c859ad8cac51987c71d34b7cedd9530e799f10802"
        id: "kernel_work_item_execution_required:sha256:f8a91b81043f463d2f17ee15912ebf000461e211701dc3f64f1f6ec7db576542:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f8a91b81043f463d2f17ee15912ebf000461e211701dc3f64f1f6ec7db576542:sha256:210efc6d74544f8c754080bc13555e1061133e8fe4390a2ba21dfab37d9a6a3b"
        occurred_at: "2026-10-16T06:06:54.654Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610160558-WCR70H"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Match operational review projections to normalized Task readback

Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.

## Scope

- In scope: Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.
- Out of scope: unrelated refactors not required for "Match operational review projections to normalized Task readback".

## Plan

1. Execute approved WorkItem normalize-operational-review-readback.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/kernel-operational-projection.test.ts packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
