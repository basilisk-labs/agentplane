---
id: "202611030001-Q8FMSQ"
title: "Bind native quarantine publication to the exact execution start"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-03T00:02:32.448Z"
  updated_by: "USER"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
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
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
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
    - "effect_security_boundary"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:ffc3b70d94ea114a513cb66dd742a954302e8caeabce05fe0a1fdb7b7fe7fefa"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-03T00:01:11.055Z"
doc_updated_by: "CODER"
description: "Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass."
sections:
  Summary: |-
    Bind native quarantine publication to the exact execution start

    Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass.
  Scope: |-
    - In scope: Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass.
    - Out of scope: unrelated refactors not required for "Bind native quarantine publication to the exact execution start".
  Plan: "1. Execute approved WorkItem issued-start-quarantine-proof."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "5b7ba95fdbdcf214e75c1b23b597684eac87ab07"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:76fc0233268542c301ed5f41ba853a32ad0fdd772e9514f48e2fcf4168bb1bf5"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a95473323396775d93bdf98ae18cf7ef766bd80f07126de640f4510aec8f113f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611030001-Q8FMSQ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:20a8bb10e84558e2a27f906468b552e286313d41d15fa1082f8e8b8905b78b12"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a95473323396775d93bdf98ae18cf7ef766bd80f07126de640f4510aec8f113f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:76fc0233268542c301ed5f41ba853a32ad0fdd772e9514f48e2fcf4168bb1bf5"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5d610ec4db49d629f6a1621b38f15207330c1b815e63e826d9f34e84a2ce917a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611030001-Q8FMSQ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:9922de12ce9bd70e0e8a4a5f9f3df14c0791ba87dfa7d82138f1d8f954ce311e"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:a95473323396775d93bdf98ae18cf7ef766bd80f07126de640f4510aec8f113f"
        digest: "sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:33cc7ed0a695fa2aa32a065193d295017ebca51d8dd700c0492c70fa7cc9b85e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "issued-start-quarantine-source"
              - "issued-start-quarantine-evidence"
            id: "issued-start-quarantine-proof"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611030001-Q8FMSQ"
      intent_digest: "sha256:a1502a2a70d3af8ed8e3b0ceec6afb286493ed73661b6805fa9674b251aa94b9"
      migration_receipts: []
      mutation_receipts:
        capture:202611030001-Q8FMSQ:
          after_revision: 1
          aggregate_digest: "sha256:1c2fb6bc508b1abd551d170dd37cdad14b2d1e2da9091618c04108c4a44eead9"
          before_revision: 0
          command_digest: "sha256:edb816efa2971b834dfe857d9a721315eb8ff1e1711e0e2ac0ebeb52ab37dc3b"
          effect_ids: []
          event_digests:
            - "sha256:867a69a66f375188652c36dce306695aa452b34b775c239a988ddd638333aa18"
          mutation_id: "capture:202611030001-Q8FMSQ"
        kernel_work_item_claim_required:sha256:3d198154d74815d7e8726b0d1b9a2706f2c1f02c609ffa61725d590732e1f263:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795:
          after_revision: 5
          aggregate_digest: "sha256:c81b6fbfee9e31318ea14a44ddd0a6e956b37f01dc56eda5715e26139cf3f77f"
          before_revision: 4
          command_digest: "sha256:e44674462513965461ed1aeedd53c4ec31872f52517b6a95666cf19870e9405f"
          effect_ids: []
          event_digests:
            - "sha256:627f81cb8a154c27cee12308debb0a9ee0ea28fa57864a67d309904f7e8acb6f"
          mutation_id: "kernel_work_item_claim_required:sha256:3d198154d74815d7e8726b0d1b9a2706f2c1f02c609ffa61725d590732e1f263:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
        kernel_work_item_execution_required:sha256:d1394df6bb7c97e4a4479463ec0f8c486f1f84a9be0f84c2e66662ec049af9bf:sha256:5d610ec4db49d629f6a1621b38f15207330c1b815e63e826d9f34e84a2ce917a:
          after_revision: 7
          aggregate_digest: "sha256:c4c33556dbcc3348296eacd2a2150c5b20ac8b8cd801bde3cddc47f3134440ae"
          before_revision: 6
          command_digest: "sha256:782f1e3ffdb5eda8a6137006cfdd625cf717479088d4c8a3b60594dc558ad6b6"
          effect_ids: []
          event_digests:
            - "sha256:d818f224f06e522ec0bf5c0a43365b297607537d9689b4813d445ded752886ac"
          mutation_id: "kernel_work_item_execution_required:sha256:d1394df6bb7c97e4a4479463ec0f8c486f1f84a9be0f84c2e66662ec049af9bf:sha256:5d610ec4db49d629f6a1621b38f15207330c1b815e63e826d9f34e84a2ce917a"
        kernel_work_item_materialization_required:sha256:ecbd673c176acf18a529b39c3a468f779f60e5364b8140e63ee9ac9a16a1ec17:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795:
          after_revision: 4
          aggregate_digest: "sha256:752794d2e01ffb3daaccfeb1a7da36886888a6a0291f71ea0b8ca841a45ab879"
          before_revision: 3
          command_digest: "sha256:4c1bcf6f1564da4fdd5f9ee2bba0149a8b607ffa70855d897589e22141c110a3"
          effect_ids: []
          event_digests:
            - "sha256:0a345a12d58c69ecd42c881874ed74b5447e3bf46df7996d5620a68e1de4f92c"
          mutation_id: "kernel_work_item_materialization_required:sha256:ecbd673c176acf18a529b39c3a468f779f60e5364b8140e63ee9ac9a16a1ec17:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
        plan:sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05:
          after_revision: 2
          aggregate_digest: "sha256:ee2f799953a3c3c71e60a9ef345453c29e16dd31f0fa769487db1587512a1814"
          before_revision: 1
          command_digest: "sha256:7e6cc617ed0a497b468e8750f39a65b58e9756265c85850b2bbe053d7291928e"
          effect_ids: []
          event_digests:
            - "sha256:f68d7a6a05132b57a797d2b22d90633c54625ab80ed8d2ae2b74556ed72f8d6c"
          mutation_id: "plan:sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05"
        sha256:137202f38a55f03c61b1b4bac0121be9491ae8b79559b8bc8d695fdb44f427e3:
          after_revision: 3
          aggregate_digest: "sha256:0fea670ea3628b752c4d4a630518fd92719539ff24c88322f0fa3f0a8ee2a029"
          before_revision: 2
          command_digest: "sha256:4d7f8ad7d68a6b3be763222d19074726e2c47dc53cf7ab62d1b420a8e2b01ac6"
          effect_ids: []
          event_digests:
            - "sha256:21775d7d1c67f68ac4f277ddad83c832acb454654fd37d6ce54721fb9f3b17e8"
          mutation_id: "sha256:137202f38a55f03c61b1b4bac0121be9491ae8b79559b8bc8d695fdb44f427e3"
        sha256:58b74bda4fe9582431c3229535dddbefa2201dfcc9de7d196cc7029a3d2d7e34:
          after_revision: 6
          aggregate_digest: "sha256:50ca587149419577696d7fa356c2bbb1917d6c7f31a74e72ace969c2484c03f7"
          before_revision: 5
          command_digest: "sha256:31bc4044f743a89c6932370ea99593be4556d2ca10b2aa640a1d7183ec95c88b"
          effect_ids: []
          event_digests:
            - "sha256:a2fb6d92f808c89d798bd71494d1ca1b8f82dbc08271e28a3735ef5e1d3eed04"
          mutation_id: "sha256:58b74bda4fe9582431c3229535dddbefa2201dfcc9de7d196cc7029a3d2d7e34"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        issued-start-quarantine-proof:
          attempt: 1
          claim_id: "sha256:3e14eee63a76c654212fc55c3dbc5a7051570ca4f6509ba93a176d965ea2d8aa"
          definition:
            contract_digest: "sha256:33cc7ed0a695fa2aa32a065193d295017ebca51d8dd700c0492c70fa7cc9b85e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "issued-start-quarantine-source"
              - "issued-start-quarantine-evidence"
            id: "issued-start-quarantine-proof"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:877e1b9a0c74a4d41faa090b2f2dbeb18fc95707fb31f600cb3e13d35392dc0a"
    documents:
      contracts:
        sha256:33cc7ed0a695fa2aa32a065193d295017ebca51d8dd700c0492c70fa7cc9b85e:
          acceptance_criteria:
            - "Reproduce the observed canonical GSQP8B failure before production changes using actual native issuance and begin behavior: immutable WorkOrder revision N, live EXECUTING Task revision N+1, same approved plan, claim, attempt, contract, repository and authority. No mutation of the retained real Factory Task or its WorkOrder."
            - "Admit only the exact authenticated native start continuation of the issued WorkOrder. Bind its recorded transition, revision, work item, claim, plan, authority and fingerprint. Refuse arbitrary revision relaxation, missing or forged begin evidence, stale claims or attempts, changed contracts/plans, unrelated intervening Task writes and mismatched repository or authority."
            - "Retain exact Git-base and live/committed quarantine byte proofs, strict UTF8/BOM and filesystem identity checks, approved exact foreign-Task scope and required repository/security effects. Old Tasks remain BLOCKED with exact recoverable sources, no DONE/PASS or new execution."
            - "Cover default and configured workflow paths and a real native coordinator commit of pre-existing exact quarantine baseline paths after native begin, including hook/commit retry and unrelated dirty data preservation. Keep authorized deletion-only foreign volatile-artifact cleanup and all existing 120 focused regressions passing."
            - "Limit source edits to the already approved seven files. Preserve predecessors, all retained branches/worktrees, native journals and credentials/runtime guards. Run the unchanged full local CI and focused five-file checks through native EXEC, independent EVAL, final validation, canonical PR/current-head CI/review/merge and Hosted Close."
          objective: "Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass."
        objective: "Bind native quarantine publication to the exact execution start"
    events:
      -
        command_digest: "sha256:edb816efa2971b834dfe857d9a721315eb8ff1e1711e0e2ac0ebeb52ab37dc3b"
        id: "capture:202611030001-Q8FMSQ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611030001-Q8FMSQ"
        occurred_at: "2026-11-03T00:01:11.019Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 1
      -
        command_digest: "sha256:7e6cc617ed0a497b468e8750f39a65b58e9756265c85850b2bbe053d7291928e"
        id: "plan:sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:9c068f1fdb11651cc8dd27ecba34247289c64c68125f02bafaafe4a2a69b2d05"
        occurred_at: "2026-11-03T00:01:38.564Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 2
      -
        command_digest: "sha256:4d7f8ad7d68a6b3be763222d19074726e2c47dc53cf7ab62d1b420a8e2b01ac6"
        id: "sha256:137202f38a55f03c61b1b4bac0121be9491ae8b79559b8bc8d695fdb44f427e3:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:137202f38a55f03c61b1b4bac0121be9491ae8b79559b8bc8d695fdb44f427e3"
        occurred_at: "2026-11-03T00:02:31.103Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 3
      -
        command_digest: "sha256:4c1bcf6f1564da4fdd5f9ee2bba0149a8b607ffa70855d897589e22141c110a3"
        id: "kernel_work_item_materialization_required:sha256:ecbd673c176acf18a529b39c3a468f779f60e5364b8140e63ee9ac9a16a1ec17:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ecbd673c176acf18a529b39c3a468f779f60e5364b8140e63ee9ac9a16a1ec17:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
        occurred_at: "2026-11-03T00:02:36.865Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 4
      -
        command_digest: "sha256:e44674462513965461ed1aeedd53c4ec31872f52517b6a95666cf19870e9405f"
        id: "kernel_work_item_claim_required:sha256:3d198154d74815d7e8726b0d1b9a2706f2c1f02c609ffa61725d590732e1f263:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3d198154d74815d7e8726b0d1b9a2706f2c1f02c609ffa61725d590732e1f263:sha256:c972b4efada2e33258e16cbf4d2ff8d333b9968cd30a2099e3a0118c93c25795"
        occurred_at: "2026-11-03T00:02:42.600Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 5
      -
        command_digest: "sha256:31bc4044f743a89c6932370ea99593be4556d2ca10b2aa640a1d7183ec95c88b"
        id: "sha256:58b74bda4fe9582431c3229535dddbefa2201dfcc9de7d196cc7029a3d2d7e34:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:58b74bda4fe9582431c3229535dddbefa2201dfcc9de7d196cc7029a3d2d7e34"
        occurred_at: "2026-11-03T00:03:14.563Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 6
      -
        command_digest: "sha256:782f1e3ffdb5eda8a6137006cfdd625cf717479088d4c8a3b60594dc558ad6b6"
        id: "kernel_work_item_execution_required:sha256:d1394df6bb7c97e4a4479463ec0f8c486f1f84a9be0f84c2e66662ec049af9bf:sha256:5d610ec4db49d629f6a1621b38f15207330c1b815e63e826d9f34e84a2ce917a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d1394df6bb7c97e4a4479463ec0f8c486f1f84a9be0f84c2e66662ec049af9bf:sha256:5d610ec4db49d629f6a1621b38f15207330c1b815e63e826d9f34e84a2ce917a"
        occurred_at: "2026-11-03T00:03:17.212Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611030001-Q8FMSQ"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind native quarantine publication to the exact execution start

Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass.

## Scope

- In scope: Complete the already approved native quarantine publication mechanism for sb within the same exact seven source files. Reproduce GSQP8B immutable WorkOrder revision 7 followed by normal native begin revision 8; prove the exact issued claim and start transition rather than requiring impossible revision equality. Preserve immutable WorkOrders, source/Git byte proofs, scope/approval checks, cleanup and interrupted commit guards. No historical Task execution, DONE/PASS assignment, data/credential/runtime mutation or guard bypass.
- Out of scope: unrelated refactors not required for "Bind native quarantine publication to the exact execution start".

## Plan

1. Execute approved WorkItem issued-start-quarantine-proof.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
