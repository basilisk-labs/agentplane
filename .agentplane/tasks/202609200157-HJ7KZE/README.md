---
id: "202609200157-HJ7KZE"
title: "Add canonical blocked-plan replanning transition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts"
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
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
    - "agent_preferred_branch_pr"
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
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
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
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-20T01:57:17.640Z"
doc_updated_by: "CODER"
description: "Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior."
sections:
  Summary: |-
    Add canonical blocked-plan replanning transition

    Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
  Scope: |-
    - In scope: Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
    - Out of scope: unrelated refactors not required for "Add canonical blocked-plan replanning transition".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add canonical blocked-plan replanning transition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add canonical blocked-plan replanning transition". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "8aee6c026bf45c569aaa698a4c6b8cced9423505"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d93abd2dbaec0d0dc6cf06b4ed9e5368aa89ea5e40c2b9d0672368c8c8afc67e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609200157-HJ7KZE"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
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
            digest: "sha256:f77d00dd2424a70670b6446ba3109f01d62ad071313773c51ca58a5ef18c7766"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d93abd2dbaec0d0dc6cf06b4ed9e5368aa89ea5e40c2b9d0672368c8c8afc67e"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609200157-HJ7KZE"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
              - "packages/agentplane/src/commands/task/plan-reject.command.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:20acffd5bc337ccab498461442a72df451cb71c590ed54209e0ca0f34f885500"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
        digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "kernel-replan-transition"
              - "canonical-rejection-route"
              - "blocked-replan-regression-coverage"
            id: "canonical-blocked-replan"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609200157-HJ7KZE"
      intent_digest: "sha256:550491822ba3da9a667034547e4a82cf293210127577b047303dc0bcda6aedc0"
      migration_receipts: []
      mutation_receipts:
        capture:202609200157-HJ7KZE:
          after_revision: 1
          aggregate_digest: "sha256:684dcd2ca5efe031d10f92aee21f145eb48ae0813e7ae7a96f7aee88d22afd5a"
          before_revision: 0
          command_digest: "sha256:471a64ac45bd372d23a9778dfb00b52f034e9dabd1debe86c833c430754d8af2"
          effect_ids: []
          event_digests:
            - "sha256:2051e0e5e75ee407e46e718879fea20531e535a47170060a6c9577ba8cd64902"
          mutation_id: "capture:202609200157-HJ7KZE"
        kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 5
          aggregate_digest: "sha256:b6077dc01f1ac4f86b484eeeeda3f7a1ba21df152eeb922cc5a00b686830f99d"
          before_revision: 4
          command_digest: "sha256:38de40dd2ca48bd15a16ed857158ef12578e8df46fc4e0dfb63246a93139df26"
          effect_ids: []
          event_digests:
            - "sha256:1d4a12eb4d974725a386d2048a816898c6f12819c3cad1f2b72843dfee55bbd1"
          mutation_id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 6
          aggregate_digest: "sha256:f1406009388c068c4173e50d24813ea9a7f24e30de3f0445019f9b7e25abd4d9"
          before_revision: 5
          command_digest: "sha256:3d4a029941a2649fe9eb43647a9c34871143adbda5fcffec2e7cfb2fba614a7d"
          effect_ids: []
          event_digests:
            - "sha256:0ff7dd28355b5f472f484b1c4067e3bc0d2d5566c67dacb380bd52eac9c6b26c"
          mutation_id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:
          after_revision: 13
          aggregate_digest: "sha256:1320bee8ab53981f23d41ed94b912ffb4648c0240649adb06e508f2e6166d531"
          before_revision: 12
          command_digest: "sha256:fd97e2230ba0eafee8c975f53fcd54ed677bdb9b84002cf5898d2844dc939f8f"
          effect_ids: []
          event_digests:
            - "sha256:0edb780fbf60f3e7fbf4930cca9243ed7c415cc243bb51b383f29c2c035e1500"
          mutation_id: "kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:
          after_revision: 9
          aggregate_digest: "sha256:1c33cf5e53d99a0328b94a29e986580cf56a43a7f67e04361284ce0b15df565f"
          before_revision: 8
          command_digest: "sha256:89c423ec5bea969dad8fe3242d1fa288dfa39261c11584bf7f6e87132ed7448d"
          effect_ids: []
          event_digests:
            - "sha256:2c66ac5984c4b34085df3880b56da1ae8d1d258b0862562b1236460b2447fcef"
          mutation_id: "kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 4
          aggregate_digest: "sha256:d60298235187983924c180517d2fc03a9b1a6b09602039c7d481afa0144b232b"
          before_revision: 3
          command_digest: "sha256:9c92444ae27d9364d6728884e0c9f62c2bd46eaa6b89e9994c1410ef78ff85b1"
          effect_ids: []
          event_digests:
            - "sha256:3285a8fa47b099f6db91d47a7b09fd8a9cc53147d7ffaae02e0c747882dc1879"
          mutation_id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_rework_claim_required:sha256:36d38f535ade877158a6198cf143369f66743283e146e53f54fdfda11f643115:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:
          after_revision: 12
          aggregate_digest: "sha256:c1f55eacf008ca897f80c2cb2b78da8f1704de0dfc278983fa9b5fc74c552f38"
          before_revision: 11
          command_digest: "sha256:326d538e11c6a97603318ba2e2047ad45ffe302bb8e2f216685ac84f5c7cc9ed"
          effect_ids: []
          event_digests:
            - "sha256:d48a029c923a426786ca354c64dcd00c33461b9f3ff0d8b762c2edb9f8b77a72"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:36d38f535ade877158a6198cf143369f66743283e146e53f54fdfda11f643115:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a:
          after_revision: 2
          aggregate_digest: "sha256:1037bb265fb28226ed61a7bdb5c096120ea804ae4ce04b73b6ec385f44e4069b"
          before_revision: 1
          command_digest: "sha256:6795439b3f66ece3d6a9674b1a6d6057b0364566241f670e3c9ee29b0146f2d4"
          effect_ids: []
          event_digests:
            - "sha256:859f21c5d05d3616f8cb2beef5a4e12c92256221975e888546d72b42096c3ac9"
          mutation_id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a"
        result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6:
          after_revision: 8
          aggregate_digest: "sha256:4ea8514a9641017faa152b8bdd101075ad3f287b67ab80129b78dd515289eb69"
          before_revision: 7
          command_digest: "sha256:ef96d0e07611030db3c520e03639b307570add4623764ae1e01d32c76c479dc1"
          effect_ids: []
          event_digests:
            - "sha256:c92eb81b28a2cfcc3455933c2c28f028c2f5f257af11f1ddbde6f212156a9955"
          mutation_id: "result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6"
        sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af:
          after_revision: 7
          aggregate_digest: "sha256:bdbc3cd6c351cbd02444cbf815750b721a38ef824e3ba4bca4daf2ac07c3c387"
          before_revision: 6
          command_digest: "sha256:12daee1d5457b6cdfd0865bcc122acf7fb810e17cc59b719345da9d1cbc097a7"
          effect_ids: []
          event_digests:
            - "sha256:7e1429cf5d169ebbe762e1bb92aafa9568392245fd7356942f9d6a84e2ef1a35"
          mutation_id: "sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af"
        sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258:
          after_revision: 3
          aggregate_digest: "sha256:c6ec12149c7bf1250ac70c643e3127e36b74c79e5e0510d7ba043debdca53835"
          before_revision: 2
          command_digest: "sha256:0b155203ae9354dd11f7c54fea3ec64138f9bca67e8a9e8e1727128d6208b670"
          effect_ids: []
          event_digests:
            - "sha256:efb0a7519431b78e3aa92f49a4c18c3ba46455172d03966546d2e53609202d71"
          mutation_id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258"
        validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:
          after_revision: 11
          aggregate_digest: "sha256:298ad47b97dfc6c36116fde8cb418ed54ad6d9f5fc78bfcc7ecd0748185a83be"
          before_revision: 10
          command_digest: "sha256:1f820f16068d3f6d9cfae2a70e7c7d823f7e16462fbf6c88647d52d7753a5779"
          effect_ids: []
          event_digests:
            - "sha256:d147b7bd3af4282b5979867abb51c0b24c8dd157f91593765f8850a810de6f5a"
          mutation_id: "validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
        validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:
          after_revision: 10
          aggregate_digest: "sha256:e85635ccf8e5a289c6d3134f14db42f10986bf377abc4ab3f2abcf13394b009b"
          before_revision: 9
          command_digest: "sha256:a2e8e601d4b572396e93876762c9087369457f3cda82055481dce6da0db7eed5"
          effect_ids: []
          event_digests:
            - "sha256:2dc37c4e4946795b0b4a37abc1dadbc856f2e8720c89accb2b04f35da692277c"
          mutation_id: "validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-blocked-replan:
          attempt: 2
          claim_id: "sha256:3447279b51857443838e6e1f4c9433463fbb89ab61eca02b7542135731406aa0"
          definition:
            contract_digest: "sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "kernel-replan-transition"
              - "canonical-rejection-route"
              - "blocked-replan-regression-coverage"
            id: "canonical-blocked-replan"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:68d5fd9a501c7d3db0c9e451309c38c49f369411bf1394ebf5b3e10b902b0433"
    documents:
      contracts:
        sha256:6983ce69f71520b8e51e44b61525f2d939fcc4594638dade649bcf21c7b80f1c:
          acceptance_criteria:
            - "A blocked WorkItem remains blocked until an explicit plan rejection is applied."
            - "Explicit rejection of an approved canonical plan enters planning and the next task advance emits a PLANNER WorkOrder."
            - "The rejected plan, blocked attempt, result evidence, events, and authority lineage remain available as immutable history."
            - "Rejection fails closed for a mismatched plan digest, non-blocked approved plan, unrelated authority drift, and unsupported task states."
            - "Canonical task routing never mutates only the task-centric projection when a task_kernel record exists."
            - "Focused domain and command tests plus full local CI pass."
          objective: "Implement an explicit canonical transition from an approved plan with blocked work to replanning, route task plan rejection through it, and preserve immutable evidence and fail-closed checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior."
        objective: "Add canonical blocked-plan replanning transition"
    events:
      -
        command_digest: "sha256:471a64ac45bd372d23a9778dfb00b52f034e9dabd1debe86c833c430754d8af2"
        id: "capture:202609200157-HJ7KZE:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609200157-HJ7KZE"
        occurred_at: "2026-09-20T01:57:17.620Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609200157-HJ7KZE"
        task_revision: 1
      -
        command_digest: "sha256:6795439b3f66ece3d6a9674b1a6d6057b0364566241f670e3c9ee29b0146f2d4"
        id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a"
        occurred_at: "2026-09-20T01:58:11.706Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609200157-HJ7KZE"
        task_revision: 2
      -
        command_digest: "sha256:0b155203ae9354dd11f7c54fea3ec64138f9bca67e8a9e8e1727128d6208b670"
        id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258"
        occurred_at: "2026-09-20T01:58:25.732Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609200157-HJ7KZE"
        task_revision: 3
      -
        command_digest: "sha256:9c92444ae27d9364d6728884e0c9f62c2bd46eaa6b89e9994c1410ef78ff85b1"
        id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:d8e657e9493794c85d598ca5dd4c7fd01b801af8cc695dde31fa5dfecf950b4c:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:58:37.202Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609200157-HJ7KZE"
        task_revision: 4
      -
        command_digest: "sha256:38de40dd2ca48bd15a16ed857158ef12578e8df46fc4e0dfb63246a93139df26"
        id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4fdf26846daa15cae40ff1e0569fa4b64a955e8ec33295e0334f216f908316e8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:58:41.413Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609200157-HJ7KZE"
        task_revision: 5
      -
        command_digest: "sha256:3d4a029941a2649fe9eb43647a9c34871143adbda5fcffec2e7cfb2fba614a7d"
        id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0c0bf1b2d02188db0ab1d7ef5300885a88f3d3743f69767ef7670c787a607ae8:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:59:16.604Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609200157-HJ7KZE"
        task_revision: 6
      -
        command_digest: "sha256:12daee1d5457b6cdfd0865bcc122acf7fb810e17cc59b719345da9d1cbc097a7"
        id: "sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af"
        occurred_at: "2026-09-20T02:16:17.266Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609200157-HJ7KZE"
        task_revision: 7
      -
        command_digest: "sha256:ef96d0e07611030db3c520e03639b307570add4623764ae1e01d32c76c479dc1"
        id: "result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6"
        occurred_at: "2026-09-20T02:16:21.439Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609200157-HJ7KZE"
        task_revision: 8
      -
        command_digest: "sha256:89c423ec5bea969dad8fe3242d1fa288dfa39261c11584bf7f6e87132ed7448d"
        id: "kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        occurred_at: "2026-09-20T02:16:24.863Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609200157-HJ7KZE"
        task_revision: 9
      -
        command_digest: "sha256:a2e8e601d4b572396e93876762c9087369457f3cda82055481dce6da0db7eed5"
        id: "validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
        occurred_at: "2026-09-20T02:17:28.143Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609200157-HJ7KZE"
        task_revision: 10
      -
        command_digest: "sha256:1f820f16068d3f6d9cfae2a70e7c7d823f7e16462fbf6c88647d52d7753a5779"
        id: "validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
        occurred_at: "2026-09-20T02:17:30.170Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609200157-HJ7KZE"
        task_revision: 11
      -
        command_digest: "sha256:326d538e11c6a97603318ba2e2047ad45ffe302bb8e2f216685ac84f5c7cc9ed"
        id: "kernel_work_item_rework_claim_required:sha256:36d38f535ade877158a6198cf143369f66743283e146e53f54fdfda11f643115:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:36d38f535ade877158a6198cf143369f66743283e146e53f54fdfda11f643115:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        occurred_at: "2026-09-20T02:17:34.354Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609200157-HJ7KZE"
        task_revision: 12
      -
        command_digest: "sha256:fd97e2230ba0eafee8c975f53fcd54ed677bdb9b84002cf5898d2844dc939f8f"
        id: "kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        occurred_at: "2026-09-20T02:17:37.589Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609200157-HJ7KZE"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Add canonical blocked-plan replanning transition

Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.

## Scope

- In scope: Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
- Out of scope: unrelated refactors not required for "Add canonical blocked-plan replanning transition".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Add canonical blocked-plan replanning transition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add canonical blocked-plan replanning transition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
