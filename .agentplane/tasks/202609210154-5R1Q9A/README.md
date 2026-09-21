---
id: "202609210154-5R1Q9A"
title: "LC-03: extract one Kernel-backed advance-one-step coordinator"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "LC-03"
  - "lifecycle-convergence"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run ci:local:full"
  - "bun run lint"
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
  - "bun run typecheck"
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
      escalation_reasons:
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T01:54:52.623Z"
doc_updated_by: "CODER"
description: "Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection."
sections:
  Summary: |-
    LC-03: extract one Kernel-backed advance-one-step coordinator

    Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.
  Scope: |-
    - In scope: Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.
    - Out of scope: unrelated refactors not required for "LC-03: extract one Kernel-backed advance-one-step coordinator".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "LC-03: extract one Kernel-backed advance-one-step coordinator". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "LC-03: extract one Kernel-backed advance-one-step coordinator". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "4f28ee5433e7666de75437015b2003a9895073fc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3ea7513121dff0e2cd0660d09dd0ad6955bc5f37e9469e19b3a8c77919e5f5b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d29b722f31435e182c38402e28a1b9671d11767e2fdfc84ab8aa994e6d1f51aa"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:1f9bc3d691b1268050d8b2418ea41d9829d262eb21b45521d9afab63389a1efd"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            task_id: "202609210154-5R1Q9A"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "bun run typecheck"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e01cc268a084a41307a913ee178177401891d2cf6e7c6aec04c5c7f4d2bfa878"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d29b722f31435e182c38402e28a1b9671d11767e2fdfc84ab8aa994e6d1f51aa"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1f9bc3d691b1268050d8b2418ea41d9829d262eb21b45521d9afab63389a1efd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3ea7513121dff0e2cd0660d09dd0ad6955bc5f37e9469e19b3a8c77919e5f5b9"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            task_id: "202609210154-5R1Q9A"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "bun run typecheck"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            evidence_digest: "sha256:27091ee84f0aebcf2818de4e6207fcc19a85feb00ae5c847648fec25d515b5ed"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2b8a5eae49998a60e157a21c8ccc243dcc9de079c0a192e9aa5dce62fc49ad99"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a99f77276a086d3519ccfe8b420902a2ea05beba584d6119cb4b9afed1cad7ea"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:234094b999e80cc112bd7af62aedf36287ca47350a900040fd2b3c7e8864f77e"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            task_id: "202609210154-5R1Q9A"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "bun run typecheck"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:234094b999e80cc112bd7af62aedf36287ca47350a900040fd2b3c7e8864f77e"
        digest: "sha256:a99f77276a086d3519ccfe8b420902a2ea05beba584d6119cb4b9afed1cad7ea"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:4542a7e837eee45cd762793ff7ce4b06d3dadd50bfe27c1293e9aaae2416cf50"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Bun 1.4.2"
                - "Node 24"
                - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
              scope_roots:
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
                - "packages/agentplane/src/commands/task/kernel-advance.ts"
                - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
                - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
            expected_outputs:
              - "lc03-common-advance-one-step-coordinator"
              - "lc03-behavior-equivalent-public-wrappers"
              - "lc03-single-owner-loop-deletion"
              - "lc03-post-merge-completion-order-regression"
            id: "lc-03-coordinator-hotspot-split"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609210154-5R1Q9A"
      intent_digest: "sha256:b2f0b7bc5a489a81e659e9c473b625e7948411438d755078ccc5c5fd5be59324"
      migration_receipts: []
      mutation_receipts:
        capture:202609210154-5R1Q9A:
          after_revision: 1
          aggregate_digest: "sha256:8b81d90f25aeeeba4abb27c5c9ce8afac18fa97f8e7132d549427547a8a31582"
          before_revision: 0
          command_digest: "sha256:a70105e3adb65502513b8f30bec86283d37f4e5b07edee5e69929302f807a42a"
          effect_ids: []
          event_digests:
            - "sha256:66f80518ce9aca2460cba7a322696713bc825e2aa78fccafc54ce768c4d7723b"
          mutation_id: "capture:202609210154-5R1Q9A"
        kernel_work_item_claim_required:sha256:887f3dd2b30d1017e660d79eace49ce38d7d15134ef489b84501be865279fa2d:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:
          after_revision: 5
          aggregate_digest: "sha256:339e548c5a0a8f748ba02f3f9f07e976230efdf24edac8628ebfba7e7053c91f"
          before_revision: 4
          command_digest: "sha256:69b6e5705a5e779e49b9ba869c3e1b728f9598fe54598a5d2df0946ff4c3ded9"
          effect_ids: []
          event_digests:
            - "sha256:3cf8bf63fbe188c7ed5ba57a5840d7001833b4fab6591cc127a2431d59e1b2ef"
          mutation_id: "kernel_work_item_claim_required:sha256:887f3dd2b30d1017e660d79eace49ce38d7d15134ef489b84501be865279fa2d:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        kernel_work_item_claim_required:sha256:d3ed561bd05cb6678fb9462603ff8b72e5c3b9bf1c5cfb767e0945a2e7ffb0c5:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:
          after_revision: 13
          aggregate_digest: "sha256:e60bf22302f9dcf4d768110ce640135e9cf0dde87cbb9378999b2bd3e523e808"
          before_revision: 12
          command_digest: "sha256:d7bd1a431715124020cd25243d506877afa91903c3e2fde40707f3f75a191f00"
          effect_ids: []
          event_digests:
            - "sha256:419bd54ed2fe74d996ae44545883c0970fd254ad1d993cea19a4221800f6478e"
          mutation_id: "kernel_work_item_claim_required:sha256:d3ed561bd05cb6678fb9462603ff8b72e5c3b9bf1c5cfb767e0945a2e7ffb0c5:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        kernel_work_item_execution_required:sha256:6056c91cfe2b49e1b0bb6108ba484f03fdd11065e1701862de0516cacc44e47b:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:
          after_revision: 6
          aggregate_digest: "sha256:f3ff4ce4217461c74c41112498a932ea8644f31fff1d50b2b1ab4610d9d9139e"
          before_revision: 5
          command_digest: "sha256:2dd3f391b66b09b7633b956e5766b191c9c0ff36d407c21a70de9316465b6400"
          effect_ids: []
          event_digests:
            - "sha256:f4d6b4d680d29b73de57bfc7f86180377468ff637c77f092608e4859dc1f5353"
          mutation_id: "kernel_work_item_execution_required:sha256:6056c91cfe2b49e1b0bb6108ba484f03fdd11065e1701862de0516cacc44e47b:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        kernel_work_item_execution_required:sha256:75566f5b49b315c376e9b3db276fd862f1a665fc6c8bcaf863d8c88504492fdc:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:
          after_revision: 14
          aggregate_digest: "sha256:605eecee6ab9a947ac6629c0ce45abfad1f8ad70a8143651aaf13fad33062917"
          before_revision: 13
          command_digest: "sha256:9086698710c656045806affcf44b7e198afc05bf8db04b5047875b5faec6897b"
          effect_ids: []
          event_digests:
            - "sha256:0d68a017f04f9334248fd87fe387f609414808d15c957b5d8b6b617bc3ac525b"
          mutation_id: "kernel_work_item_execution_required:sha256:75566f5b49b315c376e9b3db276fd862f1a665fc6c8bcaf863d8c88504492fdc:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        kernel_work_item_materialization_required:sha256:4a31e7c87e35d93f3c4cd5bf42c24be6d8bb5fb263230ef2cdc309fb8d5554d0:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:
          after_revision: 4
          aggregate_digest: "sha256:2515afff4234ad1f98f462695ee053eaff47bd7b797adc7a792b91dc929b245b"
          before_revision: 3
          command_digest: "sha256:3631a5dee5a2a30c87b67801be737416dc53f8704814dcd653078b00f8c62d1d"
          effect_ids: []
          event_digests:
            - "sha256:c96460fe2fefa4e5f16b95329c421384d279e3f65e8efe3130dc581566fec0f2"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a31e7c87e35d93f3c4cd5bf42c24be6d8bb5fb263230ef2cdc309fb8d5554d0:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        kernel_work_item_materialization_required:sha256:ef07aa3aaf7d02edf58c6ed054d789d2cc219d2a848d56ebf8b420f830c5f170:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:
          after_revision: 12
          aggregate_digest: "sha256:b8f0cf4d54aadae9b82523b7c6e6d1d006511ee9398a907ef4a1bfbb65d2eef7"
          before_revision: 11
          command_digest: "sha256:c77de732948e075e870ecdcc897605ad555cf98a3c510f93e18366ba8b9ef9ac"
          effect_ids: []
          event_digests:
            - "sha256:cebad4d64fd450ed118d3bc763fcf21eae3f3c50382adf8e5dedc71bb00394f4"
          mutation_id: "kernel_work_item_materialization_required:sha256:ef07aa3aaf7d02edf58c6ed054d789d2cc219d2a848d56ebf8b420f830c5f170:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        reject:sha256:7f73ff00a37e435e9bd075adc45052eb12edb43af719a13f83305d8d13b415ec:
          after_revision: 9
          aggregate_digest: "sha256:af1f80066eb8ced2157bdbc9091a41f39ee3bf966f2b980fdbd285871abd75cd"
          before_revision: 8
          command_digest: "sha256:10199b718a87ec779c393f1d049a86fa3902c0229e53f1c48514491894a48b0d"
          effect_ids: []
          event_digests:
            - "sha256:9e3353db3a38d3c8ea653f1c2faf29983892babdbf2aa4f7d96af3efc24a0171"
          mutation_id: "reject:sha256:7f73ff00a37e435e9bd075adc45052eb12edb43af719a13f83305d8d13b415ec"
        result:sha256:524d8e5d29d2c96eec4b263903880f852cb861e17afefee98bcb0069ab3f370f:
          after_revision: 2
          aggregate_digest: "sha256:107699a73d324cececf90e372632417f15bca5082b50ecc3118a679017d2664b"
          before_revision: 1
          command_digest: "sha256:85f97c1b6349bb370c8283708b5fb377e95c995f4b8c1b5da024ad108402f78d"
          effect_ids: []
          event_digests:
            - "sha256:913443f2261155ab108a757ae1845cd622a2394935695fa38a56f6755ef9047b"
          mutation_id: "result:sha256:524d8e5d29d2c96eec4b263903880f852cb861e17afefee98bcb0069ab3f370f"
        result:sha256:53020f77ba9960fe251af8eb62a51390173f36843063a6c7a18f4ac8e89d1d73:
          after_revision: 10
          aggregate_digest: "sha256:88ea9c0d1e5454d063684aa2313fb13961f7b74bd245ad47aa3abf303815b8e0"
          before_revision: 9
          command_digest: "sha256:e5f8571e74aa288a7348102de65e40c10a83e0978372abf3f3b5a9335eb080a8"
          effect_ids: []
          event_digests:
            - "sha256:fdb1b0ae2e83c672a4cb8912af3ecd4a0a4ecc8e0c95398b9425c6ef1ebbda3a"
          mutation_id: "result:sha256:53020f77ba9960fe251af8eb62a51390173f36843063a6c7a18f4ac8e89d1d73"
        semantic-stop:sha256:4606f9c51b18bfa3c78e6b019337144ba56d5cbb802a93a5c7bd941d6d2cf948:
          after_revision: 8
          aggregate_digest: "sha256:f7b8ca019c2bf20c7ae528f38fd18bf928dc5db03ed490c65200d37b4257ec8a"
          before_revision: 7
          command_digest: "sha256:5e3f51e79e752c688cfb2c74120d7228270fbf744ddac92aa813d00479bdffd0"
          effect_ids: []
          event_digests:
            - "sha256:608b5b048ade1963a632e7627e86cf3e99a033158c91eb5fe206ae3413e8d4bc"
          mutation_id: "semantic-stop:sha256:4606f9c51b18bfa3c78e6b019337144ba56d5cbb802a93a5c7bd941d6d2cf948"
        sha256:17680659f7d3d7c1da43d7b7bc9d3c444463a8f35e45d806a3554e4927127585:
          after_revision: 11
          aggregate_digest: "sha256:1fde7789d0b35edfe1142868ffa0cacbd6b3782b2a31d465757cb71923981116"
          before_revision: 10
          command_digest: "sha256:2ef1b49cd89e9abd6998024183d8d2f5ee9fb217cd0b6d09a047dff0671e7cb6"
          effect_ids: []
          event_digests:
            - "sha256:6323a0b2650b634ed1c9e8604e69cdc8dbf110ab2d28073c1b7e094c1f1222f9"
          mutation_id: "sha256:17680659f7d3d7c1da43d7b7bc9d3c444463a8f35e45d806a3554e4927127585"
        sha256:378f8738af74a84dc80db82261410a4fd66eafe88010788d9d7e263900ea1462:
          after_revision: 3
          aggregate_digest: "sha256:7bf5976ee8de36d5f4822b12f8e71df256fa7f6f9e18c0d5b9bf2a22deba2dd2"
          before_revision: 2
          command_digest: "sha256:8f9afe9086ccea96def1f7b74ace533132ae8d4f151ef556471a71b1fd5e3510"
          effect_ids: []
          event_digests:
            - "sha256:1fd0b257f4760fd3a0ea9941f71b9b5952b215fd0e6c2309a3fbf8295f4f8370"
          mutation_id: "sha256:378f8738af74a84dc80db82261410a4fd66eafe88010788d9d7e263900ea1462"
        sha256:3bfda716afffb0eee7aee75ab9d4cb6e95bf4dd824eae1dc5e711431b2e97ed9:
          after_revision: 7
          aggregate_digest: "sha256:98269e2d32207ec18af183a987b06fffa36a224666161d4d8272966d9d538c1b"
          before_revision: 6
          command_digest: "sha256:d1716a3daf743183ab5be49742af42f7a8260a6fa2b89e5a5f8818140a4e4aa9"
          effect_ids: []
          event_digests:
            - "sha256:a39add8954228d2f0f7c7b846c79f460b1df0bce63686480bc77244e458ee142"
          mutation_id: "sha256:3bfda716afffb0eee7aee75ab9d4cb6e95bf4dd824eae1dc5e711431b2e97ed9"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:1f9bc3d691b1268050d8b2418ea41d9829d262eb21b45521d9afab63389a1efd"
          digest: "sha256:d29b722f31435e182c38402e28a1b9671d11767e2fdfc84ab8aa994e6d1f51aa"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:9ed00ed62eee18185bcd7b8bc9897005bd905d0b684f4f07afa3a2001be3322d"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
                scope_roots:
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/task/advance-task-step.ts"
                  - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
                  - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
              expected_outputs:
                - "lc03-common-advance-one-step-coordinator"
                - "lc03-behavior-equivalent-public-wrappers"
                - "lc03-single-owner-loop-deletion"
                - "lc03-post-merge-completion-order-regression"
              id: "lc-03-advance-one-step-coordinator"
              optional: false
              required_inputs: []
      revision: 14
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lc-03-coordinator-hotspot-split:
          attempt: 1
          claim_id: "sha256:37ed99c01dc94c6c8ad434c8586c4658bb0c3154fa57d27bc7e63a315b864cf0"
          definition:
            contract_digest: "sha256:4542a7e837eee45cd762793ff7ce4b06d3dadd50bfe27c1293e9aaae2416cf50"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "Bun 1.4.2"
                - "Node 24"
                - "existing Task Kernel, route decision, workflow supervisor, execution journal, and exchange primitives"
              scope_roots:
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
                - "packages/agentplane/src/commands/task/kernel-advance.ts"
                - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-supervisor.ts"
                - "packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
            expected_outputs:
              - "lc03-common-advance-one-step-coordinator"
              - "lc03-behavior-equivalent-public-wrappers"
              - "lc03-single-owner-loop-deletion"
              - "lc03-post-merge-completion-order-regression"
            id: "lc-03-coordinator-hotspot-split"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:8bb68ddca67e2c27497d1b622307a08fc4687246defb996dc7cbe55c71539a11"
    documents:
      contracts:
        sha256:4542a7e837eee45cd762793ff7ce4b06d3dadd50bfe27c1293e9aaae2416cf50:
          acceptance_criteria:
            - "Each call advances at most one admitted semantic or effect boundary while deterministic local transitions remain bounded and freshly re-routed."
            - "Intent-before-effect, exact preconditions, idempotency, effect-in-doubt recovery, and no-progress non-replay remain intact."
            - "Canonical branch_pr completion applies complete_task before hosted-close finalize or worktree cleanup."
            - "Public and managed wrappers preserve typed exchange, approval, wait, recovery, terminal, and effect-in-doubt contracts."
            - "advance.command.ts remains wrapper/input/output only, kernel-advance.ts has no competing coordinator, and all touched runtime modules remain at or below 600 lines."
            - "Focused tests and full local CI pass."
          objective: "Complete LC-03 by moving the ordinary route adapter into one internal module so advance-task-step.ts remains the sole application coordinator and every runtime module satisfies the enforced size budget."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
            - "bun run typecheck"
            - "bun run lint"
            - "bun run ci:local:full"
        sha256:9ed00ed62eee18185bcd7b8bc9897005bd905d0b684f4f07afa3a2001be3322d:
          acceptance_criteria:
            - "Each call advances at most one admitted semantic or effect boundary while deterministic local transitions remain bounded and freshly re-routed."
            - "The coordinator persists operation intent before effects, checks the exact current precondition fingerprint, preserves idempotency and effect-in-doubt recovery, and never silently reruns semantic work after no progress or budget exhaustion."
            - "Canonical branch_pr completion applies complete_task before any hosted-close or worktree-cleanup operation that requires the DONE projection."
            - "Public task advance and managed wrappers preserve the current typed exchange, approval, wait, recovery, terminal, and effect-in-doubt contracts."
            - "advance.command.ts contains only wrapper/input/output concerns, kernel-advance.ts contains no competing outer coordinator, and moved logic is not duplicated."
            - "Focused positive and negative tests execute a nonzero count and cover intent-before-effect, stale route rejection, exchange compatibility, post-merge completion ordering, and no-progress non-replay."
          objective: "Extract the mature ordinary route, recovery, admission, and typed operation flow into one internal advance-one-step coordinator that invokes the Task Kernel as sole domain reducer; adapt external and managed entrypoints to it and remove the ordinary and kernel-specific competing outer loops."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/workflow-supervisor.test.ts"
            - "bun run typecheck"
            - "bun run lint"
            - "bun run ci:local:full"
      intent:
        context: "Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection."
        objective: "LC-03: extract one Kernel-backed advance-one-step coordinator"
    events:
      -
        command_digest: "sha256:a70105e3adb65502513b8f30bec86283d37f4e5b07edee5e69929302f807a42a"
        id: "capture:202609210154-5R1Q9A:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609210154-5R1Q9A"
        occurred_at: "2026-09-21T01:54:52.601Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609210154-5R1Q9A"
        task_revision: 1
      -
        command_digest: "sha256:85f97c1b6349bb370c8283708b5fb377e95c995f4b8c1b5da024ad108402f78d"
        id: "result:sha256:524d8e5d29d2c96eec4b263903880f852cb861e17afefee98bcb0069ab3f370f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:524d8e5d29d2c96eec4b263903880f852cb861e17afefee98bcb0069ab3f370f"
        occurred_at: "2026-09-21T01:56:32.667Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609210154-5R1Q9A"
        task_revision: 2
      -
        command_digest: "sha256:8f9afe9086ccea96def1f7b74ace533132ae8d4f151ef556471a71b1fd5e3510"
        id: "sha256:378f8738af74a84dc80db82261410a4fd66eafe88010788d9d7e263900ea1462:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:378f8738af74a84dc80db82261410a4fd66eafe88010788d9d7e263900ea1462"
        occurred_at: "2026-09-21T01:56:40.029Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609210154-5R1Q9A"
        task_revision: 3
      -
        command_digest: "sha256:3631a5dee5a2a30c87b67801be737416dc53f8704814dcd653078b00f8c62d1d"
        id: "kernel_work_item_materialization_required:sha256:4a31e7c87e35d93f3c4cd5bf42c24be6d8bb5fb263230ef2cdc309fb8d5554d0:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4a31e7c87e35d93f3c4cd5bf42c24be6d8bb5fb263230ef2cdc309fb8d5554d0:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        occurred_at: "2026-09-21T01:56:47.671Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609210154-5R1Q9A"
        task_revision: 4
      -
        command_digest: "sha256:69b6e5705a5e779e49b9ba869c3e1b728f9598fe54598a5d2df0946ff4c3ded9"
        id: "kernel_work_item_claim_required:sha256:887f3dd2b30d1017e660d79eace49ce38d7d15134ef489b84501be865279fa2d:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:887f3dd2b30d1017e660d79eace49ce38d7d15134ef489b84501be865279fa2d:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        occurred_at: "2026-09-21T01:56:51.499Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609210154-5R1Q9A"
        task_revision: 5
      -
        command_digest: "sha256:2dd3f391b66b09b7633b956e5766b191c9c0ff36d407c21a70de9316465b6400"
        id: "kernel_work_item_execution_required:sha256:6056c91cfe2b49e1b0bb6108ba484f03fdd11065e1701862de0516cacc44e47b:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6056c91cfe2b49e1b0bb6108ba484f03fdd11065e1701862de0516cacc44e47b:sha256:101b6758f008bf5c66d1f904c15b27dbc2125219bdc1acbafb65c77a7056f363"
        occurred_at: "2026-09-21T01:57:26.268Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609210154-5R1Q9A"
        task_revision: 6
      -
        command_digest: "sha256:d1716a3daf743183ab5be49742af42f7a8260a6fa2b89e5a5f8818140a4e4aa9"
        id: "sha256:3bfda716afffb0eee7aee75ab9d4cb6e95bf4dd824eae1dc5e711431b2e97ed9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3bfda716afffb0eee7aee75ab9d4cb6e95bf4dd824eae1dc5e711431b2e97ed9"
        occurred_at: "2026-09-21T02:15:53.866Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609210154-5R1Q9A"
        task_revision: 7
      -
        command_digest: "sha256:5e3f51e79e752c688cfb2c74120d7228270fbf744ddac92aa813d00479bdffd0"
        id: "semantic-stop:sha256:4606f9c51b18bfa3c78e6b019337144ba56d5cbb802a93a5c7bd941d6d2cf948:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:4606f9c51b18bfa3c78e6b019337144ba56d5cbb802a93a5c7bd941d6d2cf948"
        occurred_at: "2026-09-21T02:15:56.780Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609210154-5R1Q9A"
        task_revision: 8
      -
        command_digest: "sha256:10199b718a87ec779c393f1d049a86fa3902c0229e53f1c48514491894a48b0d"
        id: "reject:sha256:7f73ff00a37e435e9bd075adc45052eb12edb43af719a13f83305d8d13b415ec:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:7f73ff00a37e435e9bd075adc45052eb12edb43af719a13f83305d8d13b415ec"
        occurred_at: "2026-09-21T02:16:31.226Z"
        payload_digest: "sha256:210d720fd9db399de9062f585e29a3879d7f09345fd1beb4c471546bf153255a"
        task_id: "202609210154-5R1Q9A"
        task_revision: 9
      -
        command_digest: "sha256:e5f8571e74aa288a7348102de65e40c10a83e0978372abf3f3b5a9335eb080a8"
        id: "result:sha256:53020f77ba9960fe251af8eb62a51390173f36843063a6c7a18f4ac8e89d1d73:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:53020f77ba9960fe251af8eb62a51390173f36843063a6c7a18f4ac8e89d1d73"
        occurred_at: "2026-09-21T02:17:21.881Z"
        payload_digest: "sha256:a200efd88c358847aed34923407883595221c720840e41bd1412cae4e9432e62"
        task_id: "202609210154-5R1Q9A"
        task_revision: 10
      -
        command_digest: "sha256:2ef1b49cd89e9abd6998024183d8d2f5ee9fb217cd0b6d09a047dff0671e7cb6"
        id: "sha256:17680659f7d3d7c1da43d7b7bc9d3c444463a8f35e45d806a3554e4927127585:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:17680659f7d3d7c1da43d7b7bc9d3c444463a8f35e45d806a3554e4927127585"
        occurred_at: "2026-09-21T02:17:30.105Z"
        payload_digest: "sha256:40ea801a3b3d94ae0a4312f5d0eb788c21e80b2b0d9e7c74104b7be5a3c387f9"
        task_id: "202609210154-5R1Q9A"
        task_revision: 11
      -
        command_digest: "sha256:c77de732948e075e870ecdcc897605ad555cf98a3c510f93e18366ba8b9ef9ac"
        id: "kernel_work_item_materialization_required:sha256:ef07aa3aaf7d02edf58c6ed054d789d2cc219d2a848d56ebf8b420f830c5f170:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ef07aa3aaf7d02edf58c6ed054d789d2cc219d2a848d56ebf8b420f830c5f170:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        occurred_at: "2026-09-21T02:17:33.664Z"
        payload_digest: "sha256:2de36150836e32010d7230d3b5cbfb766f7840f8151bede2763c002bb5ccfff3"
        task_id: "202609210154-5R1Q9A"
        task_revision: 12
      -
        command_digest: "sha256:d7bd1a431715124020cd25243d506877afa91903c3e2fde40707f3f75a191f00"
        id: "kernel_work_item_claim_required:sha256:d3ed561bd05cb6678fb9462603ff8b72e5c3b9bf1c5cfb767e0945a2e7ffb0c5:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d3ed561bd05cb6678fb9462603ff8b72e5c3b9bf1c5cfb767e0945a2e7ffb0c5:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        occurred_at: "2026-09-21T02:17:37.686Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609210154-5R1Q9A"
        task_revision: 13
      -
        command_digest: "sha256:9086698710c656045806affcf44b7e198afc05bf8db04b5047875b5faec6897b"
        id: "kernel_work_item_execution_required:sha256:75566f5b49b315c376e9b3db276fd862f1a665fc6c8bcaf863d8c88504492fdc:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:75566f5b49b315c376e9b3db276fd862f1a665fc6c8bcaf863d8c88504492fdc:sha256:cbff54569b45de2960b0cf41e53b3b1e0b816afbc87ce3e2092ca5701811f4bb"
        occurred_at: "2026-09-21T02:17:40.769Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609210154-5R1Q9A"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

LC-03: extract one Kernel-backed advance-one-step coordinator

Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.

## Scope

- In scope: Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.
- Out of scope: unrelated refactors not required for "LC-03: extract one Kernel-backed advance-one-step coordinator".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "LC-03: extract one Kernel-backed advance-one-step coordinator". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "LC-03: extract one Kernel-backed advance-one-step coordinator". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
