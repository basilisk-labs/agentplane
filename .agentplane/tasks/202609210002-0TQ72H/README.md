---
id: "202609210002-0TQ72H"
title: "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection."
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
mutation_scope: "unknown"
verify: []
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
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
    requirements_uncertainty: "material"
    reversibility: "reversible"
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
    - "material_requirements_uncertainty"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "requirements_resolution"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "material"
          reversibility: "reversible"
      digest: "sha256:16a9c88f40a6388c2c9327e1b5bc954dc5a6ef6b185bca0c060e6023505f4c47"
      escalation_reasons:
        - "material_requirements_uncertainty"
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
        - "full_regression"
        - "hosted_integration"
        - "requirements_resolution"
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
      - "requirements_resolution"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T00:02:10.665Z"
doc_updated_by: "CODER"
description: "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection."
sections:
  Summary: |-
    LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.

    LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.
  Scope: |-
    - In scope: LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.
    - Out of scope: unrelated refactors not required for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "11cfc37a0dc0fc1b262e10990ec33ddef68da2d6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:7d5cfa2496d056fdfba35a52407d77b1f6636cd59b885a5610d4a75e0f37c0cd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:28ea15a5eb86f1d5152f8bcd042efcebd9f2d5ae052f4a699d8530832841c659"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a1002de7d1c4a4d334154f7601dcc58418fa66b1eb3338d9b5422a34c38a519f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel and backend fixtures"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-centric"
              - "packages/core/src/tasks/task-kernel"
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            task_id: "202609210002-0TQ72H"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts"
              - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-kernel"
              - "bun run typecheck"
              - "node scripts/checks/lifecycle-owner-map.test.mjs"
            work_item_id: null
          observation: null
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
            digest: "sha256:69e9843390b1196cd2034bf9bf3a3df9110d2cd5c3bf2e0857184f44549ac400"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:28ea15a5eb86f1d5152f8bcd042efcebd9f2d5ae052f4a699d8530832841c659"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a1002de7d1c4a4d334154f7601dcc58418fa66b1eb3338d9b5422a34c38a519f"
              kind: "USER"
              parent_authority_digest: "sha256:7d5cfa2496d056fdfba35a52407d77b1f6636cd59b885a5610d4a75e0f37c0cd"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel and backend fixtures"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "agentplane-recipes"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-centric"
              - "packages/core/src/tasks/task-kernel"
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            task_id: "202609210002-0TQ72H"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts"
              - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-kernel"
              - "bun run typecheck"
              - "node scripts/checks/lifecycle-owner-map.test.mjs"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
            added_scope_roots:
              - "agentplane-recipes"
            changed_paths:
              - "agentplane-recipes"
            evidence_digest: "sha256:7f0ef3a9809465525ac32bf08f25990c88e518258488dd09c22bef0a34057c7f"
            kind: "authority_delta"
            previous_fingerprint: "sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
            repository_evidence_digest: "sha256:e9871ac2ad16bc72a0084dde934edc25d8a920f4b3970a297c100911b550b72a"
            request_digest: "sha256:28c8ee6bc54d332d7f879f9d95a3a6133c411efa07a5a9207efc56a28d2a525c"
            request_task_revision: 5
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
            digest: "sha256:e71879ce57849587dd5400e96635d132827c95b3e4953e4f1a71d96c01f54640"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:28ea15a5eb86f1d5152f8bcd042efcebd9f2d5ae052f4a699d8530832841c659"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a1002de7d1c4a4d334154f7601dcc58418fa66b1eb3338d9b5422a34c38a519f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:69e9843390b1196cd2034bf9bf3a3df9110d2cd5c3bf2e0857184f44549ac400"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:510fc8e91fa5e16e7fefb480163a2c7dec082e361044e5a21e2411781c4d9c4d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing Task Kernel and backend fixtures"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "agentplane-recipes"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-centric"
              - "packages/core/src/tasks/task-kernel"
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            task_id: "202609210002-0TQ72H"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts"
              - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-kernel"
              - "bun run typecheck"
              - "node scripts/checks/lifecycle-owner-map.test.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.test.ts"
              - "packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/show-kernel.test.ts"
              - "packages/core/src/tasks/task-centric/index.ts"
              - "packages/core/src/tasks/task-centric/lifecycle.ts"
              - "scripts/checks/lifecycle-owner-map.json"
              - "scripts/checks/lifecycle-owner-map.test.mjs"
            evidence_digest: "sha256:09f01498eaac8e01912c003556674f01c61accbe3875032e9b69d72935c460ce"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:a1002de7d1c4a4d334154f7601dcc58418fa66b1eb3338d9b5422a34c38a519f"
        digest: "sha256:28ea15a5eb86f1d5152f8bcd042efcebd9f2d5ae052f4a699d8530832841c659"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:01cd26cfc04b269b36c40a32f0a283fe67f6024a46cf8376d73a06850012abce"
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
                - "existing Task Kernel and backend fixtures"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "scripts/checks/lifecycle-owner-map.json"
                - "scripts/checks/lifecycle-owner-map.test.mjs"
            expected_outputs:
              - "lc02-canonical-mutation-gateway"
              - "lc02-read-only-compatibility-projection"
              - "lc02-parallel-reducer-deletion"
              - "lc02-focused-regression-evidence"
            id: "lc-02-kernel-mutation-gateway"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609210002-0TQ72H"
      intent_digest: "sha256:7e265b1503855d0e0932420c0b812169ef7597f26bed38d11ccac00cc242285a"
      migration_receipts: []
      mutation_receipts:
        capture:202609210002-0TQ72H:
          after_revision: 1
          aggregate_digest: "sha256:ae972d4ed4d97e7b7fee04d6bf822b717f9000c931240da701b12e898357e2d3"
          before_revision: 0
          command_digest: "sha256:dc18cbaf8b0e63f98204845941625f3602c9da5df583620c9c8f05bd690190a5"
          effect_ids: []
          event_digests:
            - "sha256:f4417105a7a1fa59281239674fbdfc7e556e03fb62e1666b04b0f76bc925d36d"
          mutation_id: "capture:202609210002-0TQ72H"
        kernel_work_item_claim_required:sha256:a4347c94c28521086cd02c93693db7c648437d3de898edd4e257817af046a19e:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357:
          after_revision: 5
          aggregate_digest: "sha256:df0da305833ced98cc97eafeb8d5902995789915987b6363aef4eb6e9468ce65"
          before_revision: 4
          command_digest: "sha256:24eb16f82f00a0cc4efd13112274088c767771d1b100da88e48ec1988753ee94"
          effect_ids: []
          event_digests:
            - "sha256:a25726531dcd0cece8fcee1a8c546a7dd79e2da06d737aa27ceaac86dff9ff4a"
          mutation_id: "kernel_work_item_claim_required:sha256:a4347c94c28521086cd02c93693db7c648437d3de898edd4e257817af046a19e:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
        kernel_work_item_execution_required:sha256:96c7157b265819c99547cac5d4c151993249274dcee20369afebcbe12fd6ec32:sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396:
          after_revision: 7
          aggregate_digest: "sha256:09ab6de5c64c9ac3c78268f7a05e5af5a5c9cc1b25fe89305a50344a3ade48f0"
          before_revision: 6
          command_digest: "sha256:764ec9fb86930ba01cbd079a3a8c5eb563ac757042e125211ac24aecdd95a7d2"
          effect_ids: []
          event_digests:
            - "sha256:1ca07545e2f9df27e9b8248ac8d2494a1a7539eca8aa130354487caecfbd8f5b"
          mutation_id: "kernel_work_item_execution_required:sha256:96c7157b265819c99547cac5d4c151993249274dcee20369afebcbe12fd6ec32:sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396"
        kernel_work_item_materialization_required:sha256:fec4e1e647f7bdcc66949ca83e1a5afa80eaab5c22925f599f73411c21f52b0a:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357:
          after_revision: 4
          aggregate_digest: "sha256:352d10e9715dc97dfcb7ae0bd48499ca3918c9957999d88fc67c4db90f057926"
          before_revision: 3
          command_digest: "sha256:3cd6db61794da70eec394248c4edeb2d610e8dba7392d8adb1b23ac0cbc7e4b3"
          effect_ids: []
          event_digests:
            - "sha256:4fd9e737da351172626bf97573f4f5357078f3377738f66f84fae8bf08fa9f4c"
          mutation_id: "kernel_work_item_materialization_required:sha256:fec4e1e647f7bdcc66949ca83e1a5afa80eaab5c22925f599f73411c21f52b0a:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
        result:sha256:f241f4fa526ab46fe49a594d97fc090eebfd0068d4778a025b5feeccee7b5a58:
          after_revision: 2
          aggregate_digest: "sha256:c802337c76145e46742a839a7f22fc8ee94a18e20155bf259b5e62ef433166a4"
          before_revision: 1
          command_digest: "sha256:631e9c9b1e41f691af5fb9cf6caf96d99fb7f58ee6385c5e7e3078303b8b0e69"
          effect_ids: []
          event_digests:
            - "sha256:cde9e3edc48f2b2485bac04f0a5c99fee08cac8f59f48b9ddb770822ea7b9281"
          mutation_id: "result:sha256:f241f4fa526ab46fe49a594d97fc090eebfd0068d4778a025b5feeccee7b5a58"
        sha256:7a693c8035af07b8c7a058af855c0d084198b6be286ac120d439e1ff72bd1c03:
          after_revision: 3
          aggregate_digest: "sha256:02b93bbac38f5c0d9163bc83662e851f3602e588d63bf96a96bddd084a3f8a16"
          before_revision: 2
          command_digest: "sha256:5a27c2b5073f952a9a0e9ba0a6533ed6d3f528a570c550b9740835034381b56b"
          effect_ids: []
          event_digests:
            - "sha256:0009f4156ebecf8c10d2a8884f4b7e9abb7dd4c9eb8d517efcc4378937f593e7"
          mutation_id: "sha256:7a693c8035af07b8c7a058af855c0d084198b6be286ac120d439e1ff72bd1c03"
        sha256:c39df40ce9c77202cdb2923b6da381480bdcbcc924fe966b5de343d5089bbb12:
          after_revision: 8
          aggregate_digest: "sha256:fb52e836475f4aae9c31c2162e3795c87ff2c3c1ae5ec3105db60d87d6c7fa00"
          before_revision: 7
          command_digest: "sha256:0329df5eeee511e492f8f432ccbd62395e960fc8d831e3b0ef425e1a28a5c948"
          effect_ids: []
          event_digests:
            - "sha256:b1ff0bc0beeaee811cb77937905817deeb1ba5667d2543f0d8d12a481e484cf6"
          mutation_id: "sha256:c39df40ce9c77202cdb2923b6da381480bdcbcc924fe966b5de343d5089bbb12"
        sha256:f7bd9b9adcb51cafc84b7bc0f248ddcfafc46a548ad135b554bd25be22419175:
          after_revision: 6
          aggregate_digest: "sha256:c08249e4be5d076972af76eea534b24375ac61b4f4e1a7c46081a7478d4f1a49"
          before_revision: 5
          command_digest: "sha256:d86dd501ead33a78c517037f3563cdd2e4c7b517d6699d6c465032a0b9b21de8"
          effect_ids: []
          event_digests:
            - "sha256:375f9597b25c64656a809edcc7a5822d4156ba21764e7b46eef2eade9c5fd510"
          mutation_id: "sha256:f7bd9b9adcb51cafc84b7bc0f248ddcfafc46a548ad135b554bd25be22419175"
      plan_history: []
      revision: 8
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lc-02-kernel-mutation-gateway:
          attempt: 1
          claim_id: "sha256:12b601ecdc83fa0dcd00f982754ce07732d47ce0db00a7f0667e2cac63e9fd2d"
          definition:
            contract_digest: "sha256:01cd26cfc04b269b36c40a32f0a283fe67f6024a46cf8376d73a06850012abce"
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
                - "existing Task Kernel and backend fixtures"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "scripts/checks/lifecycle-owner-map.json"
                - "scripts/checks/lifecycle-owner-map.test.mjs"
            expected_outputs:
              - "lc02-canonical-mutation-gateway"
              - "lc02-read-only-compatibility-projection"
              - "lc02-parallel-reducer-deletion"
              - "lc02-focused-regression-evidence"
            id: "lc-02-kernel-mutation-gateway"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:c649400a5dbf7aa6ddaf03284f9097ba923b0c558f64339bc8f37951c01ad8b7"
    documents:
      contracts:
        sha256:01cd26cfc04b269b36c40a32f0a283fe67f6024a46cf8376d73a06850012abce:
          acceptance_criteria:
            - "Concurrent canonical writes share one revision/CAS boundary and one semantic transition yields exactly one accepted event and receipt."
            - "Compatibility rendering is read-only and outer status conflicts with accepted Kernel state fail closed."
            - "No production LifecycleEngine reducer remains, while legacy non-Kernel historical decoding behavior remains intact."
            - "Focused tests execute a nonzero count for CAS conflict, read-only projection, one accepted mutation, and conflict rejection."
          objective: "Keep Kernel commands and the backend transaction as the only live Plan and WorkItem mutation authority; reject conflicting outer compatibility projections; remove the unused LifecycleEngine while retaining pure and cold compatibility helpers."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts"
            - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-kernel"
            - "node scripts/checks/lifecycle-owner-map.test.mjs"
            - "bun run typecheck"
            - "bun run lint"
            - "bun run ci:local:full"
      intent:
        context: "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection."
        objective: "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection."
    events:
      -
        command_digest: "sha256:dc18cbaf8b0e63f98204845941625f3602c9da5df583620c9c8f05bd690190a5"
        id: "capture:202609210002-0TQ72H:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609210002-0TQ72H"
        occurred_at: "2026-09-21T00:02:10.627Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609210002-0TQ72H"
        task_revision: 1
      -
        command_digest: "sha256:631e9c9b1e41f691af5fb9cf6caf96d99fb7f58ee6385c5e7e3078303b8b0e69"
        id: "result:sha256:f241f4fa526ab46fe49a594d97fc090eebfd0068d4778a025b5feeccee7b5a58:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f241f4fa526ab46fe49a594d97fc090eebfd0068d4778a025b5feeccee7b5a58"
        occurred_at: "2026-09-21T00:03:10.773Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609210002-0TQ72H"
        task_revision: 2
      -
        command_digest: "sha256:5a27c2b5073f952a9a0e9ba0a6533ed6d3f528a570c550b9740835034381b56b"
        id: "sha256:7a693c8035af07b8c7a058af855c0d084198b6be286ac120d439e1ff72bd1c03:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7a693c8035af07b8c7a058af855c0d084198b6be286ac120d439e1ff72bd1c03"
        occurred_at: "2026-09-21T00:03:22.266Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609210002-0TQ72H"
        task_revision: 3
      -
        command_digest: "sha256:3cd6db61794da70eec394248c4edeb2d610e8dba7392d8adb1b23ac0cbc7e4b3"
        id: "kernel_work_item_materialization_required:sha256:fec4e1e647f7bdcc66949ca83e1a5afa80eaab5c22925f599f73411c21f52b0a:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:fec4e1e647f7bdcc66949ca83e1a5afa80eaab5c22925f599f73411c21f52b0a:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
        occurred_at: "2026-09-21T00:03:25.757Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609210002-0TQ72H"
        task_revision: 4
      -
        command_digest: "sha256:24eb16f82f00a0cc4efd13112274088c767771d1b100da88e48ec1988753ee94"
        id: "kernel_work_item_claim_required:sha256:a4347c94c28521086cd02c93693db7c648437d3de898edd4e257817af046a19e:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a4347c94c28521086cd02c93693db7c648437d3de898edd4e257817af046a19e:sha256:372ddaaee77d9b37f58d40d868eb3312f5aefe2bd38180b44be3641951a31357"
        occurred_at: "2026-09-21T00:03:29.803Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609210002-0TQ72H"
        task_revision: 5
      -
        command_digest: "sha256:d86dd501ead33a78c517037f3563cdd2e4c7b517d6699d6c465032a0b9b21de8"
        id: "sha256:f7bd9b9adcb51cafc84b7bc0f248ddcfafc46a548ad135b554bd25be22419175:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f7bd9b9adcb51cafc84b7bc0f248ddcfafc46a548ad135b554bd25be22419175"
        occurred_at: "2026-09-21T00:04:02.268Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202609210002-0TQ72H"
        task_revision: 6
      -
        command_digest: "sha256:764ec9fb86930ba01cbd079a3a8c5eb563ac757042e125211ac24aecdd95a7d2"
        id: "kernel_work_item_execution_required:sha256:96c7157b265819c99547cac5d4c151993249274dcee20369afebcbe12fd6ec32:sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:96c7157b265819c99547cac5d4c151993249274dcee20369afebcbe12fd6ec32:sha256:06841aaf4739105e5b2e6c7094cdd0fc521ead28e766fd2299ce4a26a12ad396"
        occurred_at: "2026-09-21T00:04:05.603Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609210002-0TQ72H"
        task_revision: 7
      -
        command_digest: "sha256:0329df5eeee511e492f8f432ccbd62395e960fc8d831e3b0ef425e1a28a5c948"
        id: "sha256:c39df40ce9c77202cdb2923b6da381480bdcbcc924fe966b5de343d5089bbb12:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c39df40ce9c77202cdb2923b6da381480bdcbcc924fe966b5de343d5089bbb12"
        occurred_at: "2026-09-21T00:48:54.061Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202609210002-0TQ72H"
        task_revision: 8
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.

LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.

## Scope

- In scope: LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.
- Out of scope: unrelated refactors not required for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
