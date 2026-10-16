---
id: "202610160536-N2BA6P"
title: "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "generic-worktree-topology"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane -- packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-16T05:39:15.331Z"
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
    - "effect_public_api"
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
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
          - "packages/agentplane/src/commands/shared/worktree-topology.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:93a19e0f1082ec9c20d227579c2d6334fa88714dc93a0de67c7de5f828c2cc98"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/worktree-topology.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/worktree-topology.ts"
        - "effect_public_api"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-16T05:36:26.423Z"
doc_updated_by: "CODER"
description: "Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround."
sections:
  Summary: |-
    Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree

    Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
  Scope: |-
    - In scope: Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
    - Out of scope: unrelated refactors not required for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree".
  Plan: "1. Execute approved WorkItem prepare-worktree-from-canonical-primary."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
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
            digest: "sha256:1ac8821ec9dfaf458375047513d22645d59e092887fca5cdf3f3805c888299ac"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:00cfa54b76077fd74961d5a0cce085d21ef75f9f3f8cfcd3bb78084d6c878d01"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1ac8821ec9dfaf458375047513d22645d59e092887fca5cdf3f3805c888299ac"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:a60818b9d4e8daa0b104b574f51064dcf2aa83d7c7d10091b310bc373365ee25"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
        digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2"
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
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            expected_outputs:
              - "topology-validated-primary-selection"
              - "preserved-frozen-base-intent"
              - "stale-primary-native-regression-evidence"
            id: "prepare-worktree-from-canonical-primary"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610160536-N2BA6P"
      intent_digest: "sha256:21aebc56155bcb9cdd1af8d8416fd7b54e942496628faf938242ef3155fd26a4"
      migration_receipts: []
      mutation_receipts:
        capture:202610160536-N2BA6P:
          after_revision: 1
          aggregate_digest: "sha256:cfa71e0fa59c0659fe5d4c9e768026c2b6ea78f78485590b730e6d7a835f6800"
          before_revision: 0
          command_digest: "sha256:b93b23b3282b932ec1ed886c9f2f9e3afe30f20b5fb8f41821635caa05ee1fa3"
          effect_ids: []
          event_digests:
            - "sha256:9313e16ef61ac92c5df50585ff591d8a8f98d7f1d226ea1c6f442256d86acbc1"
          mutation_id: "capture:202610160536-N2BA6P"
        kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 5
          aggregate_digest: "sha256:bab1e55ee1d49d7e74655d43362369c74903ca07ac0b9643a4418bdb6c18f948"
          before_revision: 4
          command_digest: "sha256:e9aa4b0e1fe3dc0040061683eb9f0621e5221dcd9a684c467c6c24ff53aa27cc"
          effect_ids: []
          event_digests:
            - "sha256:bbc30c8c10ce483d96d54da620c3fd494ae9924badcd622e6033e00e7a23c409"
          mutation_id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:237cda654b97ce69845b20b6320736c9b0c7e8417d3cf30b6c1f5a50f18bfac3"
          before_revision: 6
          command_digest: "sha256:a4b59662e58411c380efeaaa4317e4cb69714ccad967f11e45bb48aa50cd1aa6"
          effect_ids: []
          event_digests:
            - "sha256:4c29ef17c4c14b16c5daffb197aa7176d3321a1b006eed2f98fcbfc7ce812d03"
          mutation_id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 4
          aggregate_digest: "sha256:eecdd903064bf3d62c7527c9424e2db4f8d8467fd3f9d5991bfeca90a9381da6"
          before_revision: 3
          command_digest: "sha256:d540d6e1b99a4bd6699e0b7fda304c6d6d751260eb7b593828d098175e022ef5"
          effect_ids: []
          event_digests:
            - "sha256:6b3fad3afdf53caecfc6b7c03a12ed2da0bc7cdb6e240f11a8aec2a90a45a790"
          mutation_id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd:
          after_revision: 2
          aggregate_digest: "sha256:78aca2400ca04e6c508e81d9c1e8054f8d590e643340d789b96762c7ba95c16a"
          before_revision: 1
          command_digest: "sha256:1b45440ab8ba1ef50240bd020e73b7dee42187ecd505f96e36b9a09d8c714598"
          effect_ids: []
          event_digests:
            - "sha256:79c508e523e7ed274da25f6bd8d0b5091a930f6a25dc4d4845497805f3be381c"
          mutation_id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd"
        sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35:
          after_revision: 6
          aggregate_digest: "sha256:175c6cc0d7229a337c6b270d3904b2c218e216f8b26fa251d2057564c113b983"
          before_revision: 5
          command_digest: "sha256:2194c2d1b36c0f260b6668e9c89d3106b0c531d151201dd7a567f431c4334dff"
          effect_ids: []
          event_digests:
            - "sha256:2f058b820a071fd1b4c3064370f9c336827b0ca8eb3c7889b6b46b9ff5235abf"
          mutation_id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35"
        sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48:
          after_revision: 3
          aggregate_digest: "sha256:059e9a69fc849c8081470fb484c5b51ccddd67264b374d3292d1d10acb89b33e"
          before_revision: 2
          command_digest: "sha256:b741718346ef09c6e1e2177b3449eccd6cdd32a2175200ed7f2460414e3420ec"
          effect_ids: []
          event_digests:
            - "sha256:55fd604b8d68b56cb74a390c164616f3b9cb3ebff0b5c55999a917c78c3aa19a"
          mutation_id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        prepare-worktree-from-canonical-primary:
          attempt: 1
          claim_id: "sha256:2f078f135c70021454f9648942a3251379186078b9e671e18c750cc47790bbee"
          definition:
            contract_digest: "sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2"
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
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            expected_outputs:
              - "topology-validated-primary-selection"
              - "preserved-frozen-base-intent"
              - "stale-primary-native-regression-evidence"
            id: "prepare-worktree-from-canonical-primary"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:12e46b5f54151f5478e12f8fd5ee437f1b398aabf23613a347f3b7d857da76a7"
    documents:
      contracts:
        sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2:
          acceptance_criteria:
            - "A registered internal development base can create a sibling task worktree from the canonical primary even when primary main is behind that base."
            - "The created branch derives from the frozen base SHA, not the stale primary HEAD; semantic inspection and task authority remain bound to the registered base."
            - "Foreign common directories, ambiguous primary registration, task/base mismatches, and nested task-worktree creation are rejected before a Git mutation or success receipt."
            - "Other branch supervisor operations retain their existing route and authority semantics."
            - "The regression exercises native task advancement and real Git worktree registration, not only a mocked cmdWorkStart call."
            - "The test asserts successful operation receipt, exact base ancestry, canonical sibling placement, and unchanged primary HEAD."
            - "A negative topology case confirms no nested or foreign worktree is created and no success receipt is persisted."
          objective: "For worktree.prepare only, resolve the canonical primary checkout in the same Git common directory as the route's registered internal base. Execute cmdWorkStart from that primary checkout while retaining the exact task ID, base ref, base SHA, admission, and operation receipt from the original route. Reject foreign, missing, duplicate, or nested topology. Add a real native stale-primary lifecycle regression."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround."
        objective: "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree"
    events:
      -
        command_digest: "sha256:b93b23b3282b932ec1ed886c9f2f9e3afe30f20b5fb8f41821635caa05ee1fa3"
        id: "capture:202610160536-N2BA6P:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610160536-N2BA6P"
        occurred_at: "2026-10-16T05:36:26.327Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610160536-N2BA6P"
        task_revision: 1
      -
        command_digest: "sha256:1b45440ab8ba1ef50240bd020e73b7dee42187ecd505f96e36b9a09d8c714598"
        id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd"
        occurred_at: "2026-10-16T05:38:56.221Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610160536-N2BA6P"
        task_revision: 2
      -
        command_digest: "sha256:b741718346ef09c6e1e2177b3449eccd6cdd32a2175200ed7f2460414e3420ec"
        id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48"
        occurred_at: "2026-10-16T05:39:08.279Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610160536-N2BA6P"
        task_revision: 3
      -
        command_digest: "sha256:d540d6e1b99a4bd6699e0b7fda304c6d6d751260eb7b593828d098175e022ef5"
        id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-16T05:39:20.054Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610160536-N2BA6P"
        task_revision: 4
      -
        command_digest: "sha256:e9aa4b0e1fe3dc0040061683eb9f0621e5221dcd9a684c467c6c24ff53aa27cc"
        id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-16T05:39:38.378Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610160536-N2BA6P"
        task_revision: 5
      -
        command_digest: "sha256:2194c2d1b36c0f260b6668e9c89d3106b0c531d151201dd7a567f431c4334dff"
        id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35"
        occurred_at: "2026-10-16T05:40:29.674Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610160536-N2BA6P"
        task_revision: 6
      -
        command_digest: "sha256:a4b59662e58411c380efeaaa4317e4cb69714ccad967f11e45bb48aa50cd1aa6"
        id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-16T05:40:46.195Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610160536-N2BA6P"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree

Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.

## Scope

- In scope: Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
- Out of scope: unrelated refactors not required for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree".

## Plan

1. Execute approved WorkItem prepare-worktree-from-canonical-primary.

## Verify Steps

PLANNER fallback scaffold for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
