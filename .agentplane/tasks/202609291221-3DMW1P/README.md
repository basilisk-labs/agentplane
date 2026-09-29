---
id: "202609291221-3DMW1P"
title: "Fix issue 6020: task new must admit bounded source and test plans"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-29T12:35:13.120Z"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runtime/task-routing"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runtime/task-routing"
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
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runtime/task-routing"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:cc6fd9f9bf90a1dbdaf947d126581d1a272cf128ae2f16b1f644a6fcb598871f"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-29T12:22:04.108Z"
doc_updated_by: "CODER"
description: "Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue."
sections:
  Summary: |-
    Fix issue 6020: task new must admit bounded source and test plans

    Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.
  Scope: |-
    - In scope: Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.
    - Out of scope: unrelated refactors not required for "Fix issue 6020: task new must admit bounded source and test plans".
  Plan: "1. Execute approved WorkItem repair-new-intake."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix issue 6020: task new must admit bounded source and test plans". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix issue 6020: task new must admit bounded source and test plans". Expected: the visible result matches ## Summary and stays inside approved scope.
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
            digest: "sha256:9b8e36d1df9a40c1d01bc6530cb51617051efac84a074d0a87e676fd67d2ba95"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7071eac517cb6b65b6967b8e8120695929d5c5438456b803ead63df663fdf6a5"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:8b6bffdb7b35c989e18d207230d214fc16194cc825d95a2d04f3cd3c709fd4f7"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
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
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runtime/task-routing"
            task_id: "202609291221-3DMW1P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:ed1aabfcd17b30e4336c8d413547ea0f1a9f8066ed9de3cc9a97c726df5de80d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7071eac517cb6b65b6967b8e8120695929d5c5438456b803ead63df663fdf6a5"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:8b6bffdb7b35c989e18d207230d214fc16194cc825d95a2d04f3cd3c709fd4f7"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9b8e36d1df9a40c1d01bc6530cb51617051efac84a074d0a87e676fd67d2ba95"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:da13b0b6c399d70a0484af0d2921f4af0ab629b714f88ec03f8db4e52c19f588"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runtime/task-routing"
            task_id: "202609291221-3DMW1P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/create.command.ts"
              - "packages/agentplane/src/commands/task/execution-contract-intake.ts"
              - "packages/agentplane/src/commands/task/execution-contract-options.ts"
              - "packages/agentplane/src/commands/task/new-execution-contract.test.ts"
              - "packages/agentplane/src/commands/task/new.spec.ts"
              - "packages/agentplane/src/commands/task/new.ts"
            evidence_digest: "sha256:4f6618141cf11970bf6dc89c696fa2d0c9cb3856ac07e0f32ac27fc4e44dd915"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:8b6bffdb7b35c989e18d207230d214fc16194cc825d95a2d04f3cd3c709fd4f7"
        digest: "sha256:7071eac517cb6b65b6967b8e8120695929d5c5438456b803ead63df663fdf6a5"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:bf6ac4af4b11ff092576724c93e7dcdb534cad190409f1c60324690db73a9fdb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "bounded-intake-fix"
            id: "repair-new-intake"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609291221-3DMW1P"
      intent_digest: "sha256:04a9f8779afbcd2cfc9a7d4a6c9a844f38ed9110bc6c39e2dae99e8f22738535"
      migration_receipts: []
      mutation_receipts:
        capture:202609291221-3DMW1P:
          after_revision: 1
          aggregate_digest: "sha256:02f6f0661227cd0ff6c700db70b3f4edc218eba5e22a919c576f97f4dbeef543"
          before_revision: 0
          command_digest: "sha256:9cec2f889087ce3b0033361c04c9e08052ec73913abdfb9e36cff0d50bb5a89a"
          effect_ids: []
          event_digests:
            - "sha256:5600161ee4c858033a5334eb4760bcf51d97b3e2dfc0c72de3fb8b805391f5b3"
          mutation_id: "capture:202609291221-3DMW1P"
        kernel_work_item_claim_required:sha256:f9d939d67119ada01f5b84184b49cf7b18ca414d364496cd5bdf401deba4f63a:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 5
          aggregate_digest: "sha256:12a9fc332353bce41c53bd0381c8660560344dd69844f3ef890ac41aeb49a2c1"
          before_revision: 4
          command_digest: "sha256:749719f3dafa4f497be1e167d6d52e50f7482caba7f5e98af3c0a3fdc1b83081"
          effect_ids: []
          event_digests:
            - "sha256:fd7c9835275e656d84b8defb270e4eac0f31d359f890d72c07354c83e546347b"
          mutation_id: "kernel_work_item_claim_required:sha256:f9d939d67119ada01f5b84184b49cf7b18ca414d364496cd5bdf401deba4f63a:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        kernel_work_item_execution_required:sha256:9d78b40d3dd6ed9972a44dcd0a99c6767c50312a99f4fbebe4bbe9a8ba834e5f:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 6
          aggregate_digest: "sha256:ab387765117afc549375ea269cee20b4b845eb558e6cf967abdd36425d2f13cb"
          before_revision: 5
          command_digest: "sha256:96a3e31b6c1dab9fb4c87092495a05c24c6f447221822833dad59fc251e6012a"
          effect_ids: []
          event_digests:
            - "sha256:d0bb33b1669e8856e8035366695f8a4509db6d4a85d3fff2c91fb88296cdd877"
          mutation_id: "kernel_work_item_execution_required:sha256:9d78b40d3dd6ed9972a44dcd0a99c6767c50312a99f4fbebe4bbe9a8ba834e5f:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        kernel_work_item_materialization_required:sha256:28883ee50f3c25aafeda424ed4ab1c3abc5f5e0c63c3d13f162dcf6d3db0b61d:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:
          after_revision: 4
          aggregate_digest: "sha256:ad3342eb8c53f578d889e69ebbb79e402240bb7595adc669c467f1552a090823"
          before_revision: 3
          command_digest: "sha256:d38fc6144f6321f51ab41353c2adf5e5bcbae3da4d4f225fbddfdb92dc0b0d54"
          effect_ids: []
          event_digests:
            - "sha256:f7f55714bd5626a53a8ee55064c136992981df1892531280f1beed9933ecd0af"
          mutation_id: "kernel_work_item_materialization_required:sha256:28883ee50f3c25aafeda424ed4ab1c3abc5f5e0c63c3d13f162dcf6d3db0b61d:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        result:sha256:b39bfa874ba396af91872b24fe688c788bc4c284323f0e980e214cbcab0219a9:
          after_revision: 2
          aggregate_digest: "sha256:f743824ef02e18b3716f427a578a472b1dd6f2cc83cf5339822365550a707824"
          before_revision: 1
          command_digest: "sha256:47f718e1829e0717ab4a2eef14ba9f883a44f5675010645de5a3746c7721263b"
          effect_ids: []
          event_digests:
            - "sha256:ffaf5f0d59b2ab8ddceb141cd24a1406a0686b0a912fad02aac7b575b643b76f"
          mutation_id: "result:sha256:b39bfa874ba396af91872b24fe688c788bc4c284323f0e980e214cbcab0219a9"
        sha256:25be4c6fc993ad0ae0500537494047f5248d4f088f4077d923db0f9e6a9ff952:
          after_revision: 7
          aggregate_digest: "sha256:cd73ac0f41350f3a098fec1c6fae0df2506a6d39f3937b1e80d119d3c61dad6f"
          before_revision: 6
          command_digest: "sha256:76bbeb1a78d9353fce885fe26cf91096144d6872b3683c5ead7a7cef0feb299d"
          effect_ids: []
          event_digests:
            - "sha256:634335f63af02f6456f42aabd0b7f20f4ca587ad954806e32c00bbe158a8a08c"
          mutation_id: "sha256:25be4c6fc993ad0ae0500537494047f5248d4f088f4077d923db0f9e6a9ff952"
        sha256:53cf8836de129ebcd580dfc8edf284de84769a1ebe818c1dbc10df07e9f49ec0:
          after_revision: 3
          aggregate_digest: "sha256:2873af1ec2c739e2438acd2d5966cbad93c9db64b727a55daaf14b953b3ee965"
          before_revision: 2
          command_digest: "sha256:41958eaf297e5be00e407a089f5b268ad5956d2c9614af71f2eaf2107edc8783"
          effect_ids: []
          event_digests:
            - "sha256:16dca554006022b40227b92ed6806b5dc4f5bb7bbb5b1eed1fdc83599a23228d"
          mutation_id: "sha256:53cf8836de129ebcd580dfc8edf284de84769a1ebe818c1dbc10df07e9f49ec0"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-new-intake:
          attempt: 1
          claim_id: "sha256:1ded9ea49156b1bc009cac1a2f45098cb5afca7c60d6317ed0e962ed59345fdd"
          definition:
            contract_digest: "sha256:bf6ac4af4b11ff092576724c93e7dcdb534cad190409f1c60324690db73a9fdb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "bounded-intake-fix"
            id: "repair-new-intake"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:124ee866b4f0a5670bd8c5a37484bde010866fac0416dff8d069c7cff44393d4"
    documents:
      contracts:
        sha256:bf6ac4af4b11ff092576724c93e7dcdb534cad190409f1c60324690db73a9fdb:
          acceptance_criteria:
            - "A structured task new code task with verification admits a bounded source-and-test canonical Plan."
            - "Explicit caller roots, effects, capabilities and resources are preserved; undeclared authority remains rejected."
            - "task create behavior and programmatically supplied execution contracts remain compatible."
            - "Focused regressions and typecheck pass; generated CLI documentation matches the command surface."
          objective: "Fix #6020 by sharing structured intake construction, exposing explicit scope/effect/capability/resource inputs to task new, and covering source/test plan admission and unauthorized scope rejection. Update generated CLI reference for changed options. Preserve supplied execution contracts and task-create semantics."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run --config vitest.config.ts --maxWorkers=2 packages/agentplane/src/commands/task/new-execution-contract.test.ts packages/agentplane/src/commands/task/kernel-plan-authority.test.ts packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
            - "bun run typecheck"
            - "bun run docs:cli:check"
      intent:
        context: "Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue."
        objective: "Fix issue 6020: task new must admit bounded source and test plans"
    events:
      -
        command_digest: "sha256:9cec2f889087ce3b0033361c04c9e08052ec73913abdfb9e36cff0d50bb5a89a"
        id: "capture:202609291221-3DMW1P:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609291221-3DMW1P"
        occurred_at: "2026-09-29T12:22:04.039Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609291221-3DMW1P"
        task_revision: 1
      -
        command_digest: "sha256:47f718e1829e0717ab4a2eef14ba9f883a44f5675010645de5a3746c7721263b"
        id: "result:sha256:b39bfa874ba396af91872b24fe688c788bc4c284323f0e980e214cbcab0219a9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b39bfa874ba396af91872b24fe688c788bc4c284323f0e980e214cbcab0219a9"
        occurred_at: "2026-09-29T12:34:45.886Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609291221-3DMW1P"
        task_revision: 2
      -
        command_digest: "sha256:41958eaf297e5be00e407a089f5b268ad5956d2c9614af71f2eaf2107edc8783"
        id: "sha256:53cf8836de129ebcd580dfc8edf284de84769a1ebe818c1dbc10df07e9f49ec0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:53cf8836de129ebcd580dfc8edf284de84769a1ebe818c1dbc10df07e9f49ec0"
        occurred_at: "2026-09-29T12:35:06.384Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609291221-3DMW1P"
        task_revision: 3
      -
        command_digest: "sha256:d38fc6144f6321f51ab41353c2adf5e5bcbae3da4d4f225fbddfdb92dc0b0d54"
        id: "kernel_work_item_materialization_required:sha256:28883ee50f3c25aafeda424ed4ab1c3abc5f5e0c63c3d13f162dcf6d3db0b61d:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:28883ee50f3c25aafeda424ed4ab1c3abc5f5e0c63c3d13f162dcf6d3db0b61d:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T12:35:15.771Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609291221-3DMW1P"
        task_revision: 4
      -
        command_digest: "sha256:749719f3dafa4f497be1e167d6d52e50f7482caba7f5e98af3c0a3fdc1b83081"
        id: "kernel_work_item_claim_required:sha256:f9d939d67119ada01f5b84184b49cf7b18ca414d364496cd5bdf401deba4f63a:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f9d939d67119ada01f5b84184b49cf7b18ca414d364496cd5bdf401deba4f63a:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T12:35:30.507Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609291221-3DMW1P"
        task_revision: 5
      -
        command_digest: "sha256:96a3e31b6c1dab9fb4c87092495a05c24c6f447221822833dad59fc251e6012a"
        id: "kernel_work_item_execution_required:sha256:9d78b40d3dd6ed9972a44dcd0a99c6767c50312a99f4fbebe4bbe9a8ba834e5f:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9d78b40d3dd6ed9972a44dcd0a99c6767c50312a99f4fbebe4bbe9a8ba834e5f:sha256:39db37f3f852f5e6b50c13363fdb6cc113aefcc81ee068018f1ef56df76f65da"
        occurred_at: "2026-09-29T12:35:55.324Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609291221-3DMW1P"
        task_revision: 6
      -
        command_digest: "sha256:76bbeb1a78d9353fce885fe26cf91096144d6872b3683c5ead7a7cef0feb299d"
        id: "sha256:25be4c6fc993ad0ae0500537494047f5248d4f088f4077d923db0f9e6a9ff952:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:25be4c6fc993ad0ae0500537494047f5248d4f088f4077d923db0f9e6a9ff952"
        occurred_at: "2026-09-29T19:35:17.093Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609291221-3DMW1P"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix issue 6020: task new must admit bounded source and test plans

Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.

## Scope

- In scope: Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.
- Out of scope: unrelated refactors not required for "Fix issue 6020: task new must admit bounded source and test plans".

## Plan

1. Execute approved WorkItem repair-new-intake.

## Verify Steps

PLANNER fallback scaffold for "Fix issue 6020: task new must admit bounded source and test plans". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix issue 6020: task new must admit bounded source and test plans". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
