---
id: "202610110036-P4SP5F"
title: "Diagnose evaluator replacement CLI contention failure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release-repair"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run hotspots:check"
  - "bun run test:project agentplane packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --maxWorkers=1"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T00:40:01.927Z"
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
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
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
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
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
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
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
      digest: "sha256:d76630579a5f18590a20dfdd6d83eac00b5dd0cd50d626124f347968723c5c99"
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
doc_updated_at: "2026-10-11T00:37:07.047Z"
doc_updated_by: "CODER"
description: "Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation."
sections:
  Summary: |-
    Diagnose evaluator replacement CLI contention failure

    Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.
  Scope: |-
    - In scope: Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.
    - Out of scope: unrelated refactors not required for "Diagnose evaluator replacement CLI contention failure".
  Plan: "1. Execute approved WorkItem replacement-contention."
  Verify Steps: |-
    PLANNER fallback scaffold for "Diagnose evaluator replacement CLI contention failure". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Diagnose evaluator replacement CLI contention failure". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "fa28ec7a3df959e5b4e0cd3ab0a6b98f0840a46e"
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
            digest: "sha256:85091ced2ce4c653e2abde5d3e0b5f93932d97ee34aa9b0a23cd59bde062be78"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d0b288fb8ae4e51a60cbd431a9026de7e0ebfaa105f0bb677e29d11db6bf6bd3"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6e39f74c0b6dbdc9fa0c94fc1b4ab1d1801e7db652490e1444d8b585d154b381"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
            task_id: "202610110036-P4SP5F"
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
        approval_evidence_digest: "sha256:6e39f74c0b6dbdc9fa0c94fc1b4ab1d1801e7db652490e1444d8b585d154b381"
        digest: "sha256:d0b288fb8ae4e51a60cbd431a9026de7e0ebfaa105f0bb677e29d11db6bf6bd3"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6a68b045cf1759c985d30b6558440bd79fe4da8e357edee8691b4351c11425d0"
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
                - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
            expected_outputs:
              - "replacement-contention-evidence"
            id: "replacement-contention"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610110036-P4SP5F"
      intent_digest: "sha256:891b2d7b8c38069d66c7b77a89fff937c816a4f215a799b36641dfb7dd06ff53"
      migration_receipts: []
      mutation_receipts:
        capture:202610110036-P4SP5F:
          after_revision: 1
          aggregate_digest: "sha256:0102f345fbf14f2a5e77ee12a2c0b2aa2b48dd4f9f0c397ee8978e903bc89f27"
          before_revision: 0
          command_digest: "sha256:9db5a886a68b9783e348a340c0a73d6dc0ceecf5c1de165b07c91d699ba611a9"
          effect_ids: []
          event_digests:
            - "sha256:a06dcc65e1bff740e3305a02d0bf2f37d0628121e4775fefd02f72d43dfabb53"
          mutation_id: "capture:202610110036-P4SP5F"
        kernel_work_item_claim_required:sha256:ba89898ecbc6be0241b2406acacbc0869ffb37058869b7450e175dd9803610b9:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 5
          aggregate_digest: "sha256:87ce362590c811d26de512ab79560e16a2f1d8f40300211b1220c990268f126f"
          before_revision: 4
          command_digest: "sha256:165f017fbd7796dc215072075b80ad46df58e60ebbe08ba96ab20479c0c477f3"
          effect_ids: []
          event_digests:
            - "sha256:06c91e1fe24a46be6a6f0686e4df9cb8ce8904bad38db15495eb365903ac6ba3"
          mutation_id: "kernel_work_item_claim_required:sha256:ba89898ecbc6be0241b2406acacbc0869ffb37058869b7450e175dd9803610b9:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        kernel_work_item_execution_required:sha256:db2d8b7a3c130cb10f3668acb0b9d75b0673033c58aa0de3df5505ad6974b8e8:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 6
          aggregate_digest: "sha256:ef0c2ecd2d8e2ac8c5429d67f8ae2350bbc80d613402358b2ee84cb99a157a0b"
          before_revision: 5
          command_digest: "sha256:be1d313700889eb4b8cc0713b8c154a80ccdf9df4e15e31c1ef275e6c887bd70"
          effect_ids: []
          event_digests:
            - "sha256:50feea27093712988e4a883db149f8ac3430a9916e6c2c8528cc0106cfa623bd"
          mutation_id: "kernel_work_item_execution_required:sha256:db2d8b7a3c130cb10f3668acb0b9d75b0673033c58aa0de3df5505ad6974b8e8:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        kernel_work_item_materialization_required:sha256:4fa508b368329c657d87a665e0d0f586328aecd7601b86705df76600261ef0ef:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 4
          aggregate_digest: "sha256:b4ff78435d229595f491846e82a4f534df288635f7972d2d0e7a4f8726af613f"
          before_revision: 3
          command_digest: "sha256:3e887511d005816ca4f3d4b8a8594fedbe00deee43ddc19f9a103c7fcdb6fb30"
          effect_ids: []
          event_digests:
            - "sha256:685725889a6a6676a0c41ec28d5f9a10e6c7685a76579476c6214df8c4047cde"
          mutation_id: "kernel_work_item_materialization_required:sha256:4fa508b368329c657d87a665e0d0f586328aecd7601b86705df76600261ef0ef:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        result:sha256:6feefd72b9bda7b67ecbc7c61d9b8f845105ed0773927b6467366c130dd49e63:
          after_revision: 2
          aggregate_digest: "sha256:804ca560c98900525a533868bb975ec2e9a239e210383a6916271e36f251a6af"
          before_revision: 1
          command_digest: "sha256:168ea99051e089c3a819d2d5e973981329157cd706e551141465b3cec5a20004"
          effect_ids: []
          event_digests:
            - "sha256:758559c1bce53b142a5ac00aeec8b0ddbdfc18df1d04c35838a4f398e87e8d79"
          mutation_id: "result:sha256:6feefd72b9bda7b67ecbc7c61d9b8f845105ed0773927b6467366c130dd49e63"
        sha256:1f11bcec4655215c1eb0b2c59ffe457f4e873606a2d7fa078397b08c55e0bb3e:
          after_revision: 3
          aggregate_digest: "sha256:6bfa99c9c8fc7a1c82dd2a83f9bf3c6edcf4ec0da941c17dfbe5e102ffd27f78"
          before_revision: 2
          command_digest: "sha256:36e91dc1fea7a9e54990a2775609661dc0399d56b85e7aedc6280f8c07b8da71"
          effect_ids: []
          event_digests:
            - "sha256:a4c1bb29c68167f5aaebd388700e080f7853d562926d5888b352a85d1a7dbed6"
          mutation_id: "sha256:1f11bcec4655215c1eb0b2c59ffe457f4e873606a2d7fa078397b08c55e0bb3e"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        replacement-contention:
          attempt: 1
          claim_id: "sha256:308abd7da35598d09828fd67832907f42b05208929b461fbfe5606fa37edc183"
          definition:
            contract_digest: "sha256:6a68b045cf1759c985d30b6558440bd79fe4da8e357edee8691b4351c11425d0"
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
                - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
            expected_outputs:
              - "replacement-contention-evidence"
            id: "replacement-contention"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:6e30405f36b65a7dc978e7fab28c9d0ddadf8aad1a8e43b9b32b98250e1a71ee"
    documents:
      contracts:
        sha256:6a68b045cf1759c985d30b6558440bd79fe4da8e357edee8691b4351c11425d0:
          acceptance_criteria:
            - "Capture both subprocess stdout/stderr and exit status on assertion failure before repair. Retain actual reproduction or report explicitly when the original failure does not reproduce."
            - "Exercise bounded independent-process contention with exactly one provider start, unchanged replacement linkage, usage accounting and durable journal assertions."
            - "Preserve typed conflict semantics and all lease/authority guards. Do not accept arbitrary exit 1 or claim infrastructure failure is a product defect."
            - "Modify the supervisor only if evidence proves a product cause there; request new scope before a fourth-file change. No real providers, network, full suite, or consumer state mutation."
            - "Run all four declared checks and report precise evidence and remaining uncertainty for independent review."
          objective: "Reproduce the retained 9R run-022 independent replacement CLI failure with complete child output and journal evidence, then correct only its demonstrated generic cause within these three files. Preserve the original failing receipt."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --maxWorkers=1"
            - "bun run typecheck"
            - "bun run hotspots:check"
            - "git diff --check"
      intent:
        context: "Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation."
        objective: "Diagnose evaluator replacement CLI contention failure"
    events:
      -
        command_digest: "sha256:9db5a886a68b9783e348a340c0a73d6dc0ceecf5c1de165b07c91d699ba611a9"
        id: "capture:202610110036-P4SP5F:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610110036-P4SP5F"
        occurred_at: "2026-10-11T00:37:06.834Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610110036-P4SP5F"
        task_revision: 1
      -
        command_digest: "sha256:168ea99051e089c3a819d2d5e973981329157cd706e551141465b3cec5a20004"
        id: "result:sha256:6feefd72b9bda7b67ecbc7c61d9b8f845105ed0773927b6467366c130dd49e63:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:6feefd72b9bda7b67ecbc7c61d9b8f845105ed0773927b6467366c130dd49e63"
        occurred_at: "2026-10-11T00:39:06.149Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610110036-P4SP5F"
        task_revision: 2
      -
        command_digest: "sha256:36e91dc1fea7a9e54990a2775609661dc0399d56b85e7aedc6280f8c07b8da71"
        id: "sha256:1f11bcec4655215c1eb0b2c59ffe457f4e873606a2d7fa078397b08c55e0bb3e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1f11bcec4655215c1eb0b2c59ffe457f4e873606a2d7fa078397b08c55e0bb3e"
        occurred_at: "2026-10-11T00:39:39.298Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610110036-P4SP5F"
        task_revision: 3
      -
        command_digest: "sha256:3e887511d005816ca4f3d4b8a8594fedbe00deee43ddc19f9a103c7fcdb6fb30"
        id: "kernel_work_item_materialization_required:sha256:4fa508b368329c657d87a665e0d0f586328aecd7601b86705df76600261ef0ef:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4fa508b368329c657d87a665e0d0f586328aecd7601b86705df76600261ef0ef:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T00:40:12.669Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610110036-P4SP5F"
        task_revision: 4
      -
        command_digest: "sha256:165f017fbd7796dc215072075b80ad46df58e60ebbe08ba96ab20479c0c477f3"
        id: "kernel_work_item_claim_required:sha256:ba89898ecbc6be0241b2406acacbc0869ffb37058869b7450e175dd9803610b9:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ba89898ecbc6be0241b2406acacbc0869ffb37058869b7450e175dd9803610b9:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T00:40:57.963Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610110036-P4SP5F"
        task_revision: 5
      -
        command_digest: "sha256:be1d313700889eb4b8cc0713b8c154a80ccdf9df4e15e31c1ef275e6c887bd70"
        id: "kernel_work_item_execution_required:sha256:db2d8b7a3c130cb10f3668acb0b9d75b0673033c58aa0de3df5505ad6974b8e8:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:db2d8b7a3c130cb10f3668acb0b9d75b0673033c58aa0de3df5505ad6974b8e8:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T00:49:22.692Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610110036-P4SP5F"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Diagnose evaluator replacement CLI contention failure

Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.

## Scope

- In scope: Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.
- Out of scope: unrelated refactors not required for "Diagnose evaluator replacement CLI contention failure".

## Plan

1. Execute approved WorkItem replacement-contention.

## Verify Steps

PLANNER fallback scaffold for "Diagnose evaluator replacement CLI contention failure". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Diagnose evaluator replacement CLI contention failure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
