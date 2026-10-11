---
id: "202610110143-JSGDVH"
title: "Make no-grace process cleanup verification deterministic"
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
  - "bun run format:check"
  - "bun run hotspots:check"
  - "bun run lint"
  - "bun run test:project agentplane packages/agentplane/src/runner/process-supervision.process-tree.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts --maxWorkers=1"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T01:47:42.724Z"
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
      - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
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
      - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
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
          - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
          - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
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
      digest: "sha256:055b02aa06d420fe4ff9e267467c2308b03bc92f2c9781b632916e7e7d24499c"
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
doc_updated_at: "2026-10-11T01:43:57.180Z"
doc_updated_by: "CODER"
description: "Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression."
sections:
  Summary: |-
    Make no-grace process cleanup verification deterministic

    Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.
  Scope: |-
    - In scope: Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.
    - Out of scope: unrelated refactors not required for "Make no-grace process cleanup verification deterministic".
  Plan: "1. Execute approved WorkItem deterministic-no-grace-proof."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make no-grace process cleanup verification deterministic". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make no-grace process cleanup verification deterministic". Expected: the visible result matches ## Summary and stays inside approved scope.
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
            digest: "sha256:d3dd038c87f1ed2187a3454aeca61452300690808c00771d282197454d9ca1e7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3c840c73c1d0a56a88713b18d2440a1da4429b8a52691390225ca3e7441b2b18"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c044d064824b7d42a2abdd01e7ea358572720e8d46d86046463cb7e0be9bdf0d"
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
              - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
            task_id: "202610110143-JSGDVH"
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
        approval_evidence_digest: "sha256:c044d064824b7d42a2abdd01e7ea358572720e8d46d86046463cb7e0be9bdf0d"
        digest: "sha256:3c840c73c1d0a56a88713b18d2440a1da4429b8a52691390225ca3e7441b2b18"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:58a51ce94370a49bd26f2fd14ae463b3f7c339b33e3f3253cae1ef4abd454f0f"
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
                - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
            expected_outputs:
              - "no-grace-cleanup-evidence"
            id: "deterministic-no-grace-proof"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610110143-JSGDVH"
      intent_digest: "sha256:a019cd76e3bd869e87e2b4f28cbbf5abce9fffbcf04e35fc0336ed78d271f250"
      migration_receipts: []
      mutation_receipts:
        capture:202610110143-JSGDVH:
          after_revision: 1
          aggregate_digest: "sha256:54d6e63dcd7181d856286dc95a0201ab6b67767672447b6d7504637ae89a1a96"
          before_revision: 0
          command_digest: "sha256:67ef857658a0fbe06f19c76610c0d52542f606824a8edc5d69cd9157033637c3"
          effect_ids: []
          event_digests:
            - "sha256:a0988b35a7c372fcffa4608ad5359beeda8af83a8b69e66342586ba3dd4ce3e3"
          mutation_id: "capture:202610110143-JSGDVH"
        kernel_work_item_claim_required:sha256:93c59926eacd8282becb6fddc9178a3ef4cae357c0a9f915097650a6d7dce34d:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 5
          aggregate_digest: "sha256:84ec4e31f131fd688e442ad128f6ddea3244705113ca22d578ca3c0483a8f5b2"
          before_revision: 4
          command_digest: "sha256:7e1b97ebd9e91c6a874143bb8c897f37bf436a92bd230c142cec59346be77349"
          effect_ids: []
          event_digests:
            - "sha256:c2da8192ca667767110b2e3f3eab3e8a4050ad142f93b3c235ea0a6d935bc0ce"
          mutation_id: "kernel_work_item_claim_required:sha256:93c59926eacd8282becb6fddc9178a3ef4cae357c0a9f915097650a6d7dce34d:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        kernel_work_item_execution_required:sha256:c94519bbe0b6ecff50805671d00621895f8ea726edf9993cbe0660e5b9542c1c:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 6
          aggregate_digest: "sha256:cebcca7274f55ec7d1a65fa1ad7e1ad86e9ce97da89129eb26a4baadd53c5a9d"
          before_revision: 5
          command_digest: "sha256:8b039253c6925c1b688284e9c1bf8365e07b61c213b3f6a0efa31f309586852a"
          effect_ids: []
          event_digests:
            - "sha256:de87ea6ebf07e6149673bc3d5e8a2ddc1578fb4246e487f1e4710acb3214d1fe"
          mutation_id: "kernel_work_item_execution_required:sha256:c94519bbe0b6ecff50805671d00621895f8ea726edf9993cbe0660e5b9542c1c:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        kernel_work_item_materialization_required:sha256:2bf1c22364cc119011465982c7ca31be6df6a5b2e2c3489bc8c5154381aacd24:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:
          after_revision: 4
          aggregate_digest: "sha256:1203e7e1b9379c9fdcd3eea43ee8f683d40b54b52afd6cb0fd596e6cd683674d"
          before_revision: 3
          command_digest: "sha256:3638cf192487a6a15691058af85513025fef63996ea9b091a36c70a424c7f4ef"
          effect_ids: []
          event_digests:
            - "sha256:8973014d807fe7e6e695dad67a8e3c64c9c8b8cc581583ed01cdfa8fd78f8c89"
          mutation_id: "kernel_work_item_materialization_required:sha256:2bf1c22364cc119011465982c7ca31be6df6a5b2e2c3489bc8c5154381aacd24:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        result:sha256:db354ae92d4022cc6c21b1d5c568920929648fb7e47662a9a2c2198e0bfc2e59:
          after_revision: 2
          aggregate_digest: "sha256:21f8eec484df4cfaa1148d2876d52ca58738cbaf21b222c56c72ed4bd75e91f7"
          before_revision: 1
          command_digest: "sha256:6de4e8e1bbcb5323ee79e3349b6da17b7ff5c8ac30c5e6c09e00144680c567e4"
          effect_ids: []
          event_digests:
            - "sha256:ad9e9e927721cd4a5e8235a2f0870edafe082896e62e7284d3bbf619b395c20b"
          mutation_id: "result:sha256:db354ae92d4022cc6c21b1d5c568920929648fb7e47662a9a2c2198e0bfc2e59"
        sha256:72ca64d3a4d3a0cd3c3442d0f84392a49aea93fe7bddc14cdaa5132287f30e3d:
          after_revision: 3
          aggregate_digest: "sha256:13265bfaa1942371b4d3bca5e5f10036cf4241323247f1ca6080336951887dae"
          before_revision: 2
          command_digest: "sha256:0cb9baaaaa565451306bf8dd03bab57af41c52adb3adb33f9e3c26bb202763a0"
          effect_ids: []
          event_digests:
            - "sha256:405355e76b4bd18af30fd16f2cf2ac7e78520a889fa839f8b9b6c97c7086ce3c"
          mutation_id: "sha256:72ca64d3a4d3a0cd3c3442d0f84392a49aea93fe7bddc14cdaa5132287f30e3d"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        deterministic-no-grace-proof:
          attempt: 1
          claim_id: "sha256:4bd73e83ada6e6d72683f5d02ed38b4585137b23a80a4389f3e7847eedf7703d"
          definition:
            contract_digest: "sha256:58a51ce94370a49bd26f2fd14ae463b3f7c339b33e3f3253cae1ef4abd454f0f"
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
                - "packages/agentplane/src/runner/process-supervision.process-tree.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.test.ts"
            expected_outputs:
              - "no-grace-cleanup-evidence"
            id: "deterministic-no-grace-proof"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:cdb26008f92ca51fc50cd80adc131a13db1b972cb393f3a75d6049819063efe7"
    documents:
      contracts:
        sha256:58a51ce94370a49bd26f2fd14ae463b3f7c339b33e3f3253cae1ef4abd454f0f:
          acceptance_criteria:
            - "Preserve the real POSIX integration assertions for exit 0, cleanup not_needed, no termination or kill signals, no residual process, error null and containment limitation. Remove only the total-wall-time measurement and below-1500ms assertion; do not raise a threshold or alter production behavior."
            - "Add a deterministic POSIX unit regression for cleanupSupervisedProcessGroup with terminate_grace_ms 2000. Mock ESRCH only for the exact negative process-group ID and assert the existence probe uses signal 0. Require completion without advancing fake timers, zero scheduled timers, and no termination or kill signal. Preserve not_needed/no-residual/containment semantics."
            - "Restore process.kill spies and real timers in finally, including assertion or promise failure paths. Do not allow the mock to hide unexpected process IDs/signals or leak fake timer state into other tests."
            - "Confine changes to the two admitted test files. Preserve original HY failed full run-008 and distinguish a total startup/wall-clock timing assertion failure from proven production cleanup delay. No production edits, network/provider operations, threshold increase, skipped mandatory checks or altered lifecycle authority."
            - "Run the six unchanged declared commands with recorded exact runtime/source/log evidence and preserve failures. Obtain independent evaluation. No additional full regression is launched alongside an occupied full lane; native required full status follows the current packet, never a waiver."
          objective: "Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/runner/process-supervision.process-tree.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts --maxWorkers=1"
            - "bun run typecheck"
            - "bun run hotspots:check"
            - "bun run lint"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression."
        objective: "Make no-grace process cleanup verification deterministic"
    events:
      -
        command_digest: "sha256:67ef857658a0fbe06f19c76610c0d52542f606824a8edc5d69cd9157033637c3"
        id: "capture:202610110143-JSGDVH:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610110143-JSGDVH"
        occurred_at: "2026-10-11T01:43:57.030Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610110143-JSGDVH"
        task_revision: 1
      -
        command_digest: "sha256:6de4e8e1bbcb5323ee79e3349b6da17b7ff5c8ac30c5e6c09e00144680c567e4"
        id: "result:sha256:db354ae92d4022cc6c21b1d5c568920929648fb7e47662a9a2c2198e0bfc2e59:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:db354ae92d4022cc6c21b1d5c568920929648fb7e47662a9a2c2198e0bfc2e59"
        occurred_at: "2026-10-11T01:47:11.463Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610110143-JSGDVH"
        task_revision: 2
      -
        command_digest: "sha256:0cb9baaaaa565451306bf8dd03bab57af41c52adb3adb33f9e3c26bb202763a0"
        id: "sha256:72ca64d3a4d3a0cd3c3442d0f84392a49aea93fe7bddc14cdaa5132287f30e3d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:72ca64d3a4d3a0cd3c3442d0f84392a49aea93fe7bddc14cdaa5132287f30e3d"
        occurred_at: "2026-10-11T01:47:31.318Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610110143-JSGDVH"
        task_revision: 3
      -
        command_digest: "sha256:3638cf192487a6a15691058af85513025fef63996ea9b091a36c70a424c7f4ef"
        id: "kernel_work_item_materialization_required:sha256:2bf1c22364cc119011465982c7ca31be6df6a5b2e2c3489bc8c5154381aacd24:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2bf1c22364cc119011465982c7ca31be6df6a5b2e2c3489bc8c5154381aacd24:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T01:47:51.070Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610110143-JSGDVH"
        task_revision: 4
      -
        command_digest: "sha256:7e1b97ebd9e91c6a874143bb8c897f37bf436a92bd230c142cec59346be77349"
        id: "kernel_work_item_claim_required:sha256:93c59926eacd8282becb6fddc9178a3ef4cae357c0a9f915097650a6d7dce34d:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:93c59926eacd8282becb6fddc9178a3ef4cae357c0a9f915097650a6d7dce34d:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T01:48:14.759Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610110143-JSGDVH"
        task_revision: 5
      -
        command_digest: "sha256:8b039253c6925c1b688284e9c1bf8365e07b61c213b3f6a0efa31f309586852a"
        id: "kernel_work_item_execution_required:sha256:c94519bbe0b6ecff50805671d00621895f8ea726edf9993cbe0660e5b9542c1c:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c94519bbe0b6ecff50805671d00621895f8ea726edf9993cbe0660e5b9542c1c:sha256:a3b639fdd9c90dcc085ead7ff9eff3202ccf1164a31722ffa708d19bd1cd1506"
        occurred_at: "2026-10-11T01:51:28.648Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610110143-JSGDVH"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make no-grace process cleanup verification deterministic

Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.

## Scope

- In scope: Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.
- Out of scope: unrelated refactors not required for "Make no-grace process cleanup verification deterministic".

## Plan

1. Execute approved WorkItem deterministic-no-grace-proof.

## Verify Steps

PLANNER fallback scaffold for "Make no-grace process cleanup verification deterministic". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make no-grace process cleanup verification deterministic". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
