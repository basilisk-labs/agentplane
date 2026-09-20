---
id: "202609200157-HJ7KZE"
title: "Add canonical blocked-plan replanning transition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 34
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:233a39e4a1d2a232e0d21e179ed32fd6d9d02053dc41d2d31e25d728d0f0d6ac"
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
              parent_authority_digest: "sha256:f77d00dd2424a70670b6446ba3109f01d62ad071313773c51ca58a5ef18c7766"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
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
            evidence_digest: "sha256:5629af6a444c3e55895fc3cc314150f4f937c2f85d0afdfe911f4a349170a946"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bce576403c95b4ad225fb8009df34fa5238cbfdf642f867ae5a0899d28a4697b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b27740c03ccbab57ffd85151bf2825c82193d6680d4c81313495fa8e9d7c8b27"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6715895295e926332f6f2c0e1f6365f597371d20f70f8c7a9544a97d2907f1fb"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
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
              - "bunx vitest --config vitest.workspace.ts run --project core --project agentplane packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/kernel-replan.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/plan-reject.command.test.ts --maxWorkers=4"
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
            digest: "sha256:f4365052662a1334bf853767be74fe0f48d99d15eeadf4f9e40f162d886a0c57"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b27740c03ccbab57ffd85151bf2825c82193d6680d4c81313495fa8e9d7c8b27"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6715895295e926332f6f2c0e1f6365f597371d20f70f8c7a9544a97d2907f1fb"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:bce576403c95b4ad225fb8009df34fa5238cbfdf642f867ae5a0899d28a4697b"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
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
              - "bunx vitest --config vitest.workspace.ts run --project core --project agentplane packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/kernel-replan.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/plan-reject.command.test.ts --maxWorkers=4"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:017ceb9ef35a4e15023d1d76f4150e9e64308cff15f354ffbbbdcba540c87362"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:6715895295e926332f6f2c0e1f6365f597371d20f70f8c7a9544a97d2907f1fb"
        digest: "sha256:b27740c03ccbab57ffd85151bf2825c82193d6680d4c81313495fa8e9d7c8b27"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:075a3b3aa077b8767b0d28dbb7a3e119192108197320f70fee89c7beac25b047"
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
        kernel_work_item_claim_required:sha256:10c1890b92b3f79cc8b982f7c2add2139410bae99532a80da5dce681732c92fa:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 26
          aggregate_digest: "sha256:b050d5d4ca86ab15a89acd8cb08d2e334dbdb0178a7670a6b2c3461f8d65f196"
          before_revision: 25
          command_digest: "sha256:86cc358eb3bd969665f01af57361287d37c16eacadd9ed0dc5d01c0e2f6507ee"
          effect_ids: []
          event_digests:
            - "sha256:3dbf585759c92460dbada02c16824e87f03012da1c61203bfcdd8529305ed35c"
          mutation_id: "kernel_work_item_claim_required:sha256:10c1890b92b3f79cc8b982f7c2add2139410bae99532a80da5dce681732c92fa:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
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
        kernel_work_item_execution_required:sha256:282130f78f2d6a8043b5be450bed0acac4c2da2685129ede0fb9f762718587b9:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 27
          aggregate_digest: "sha256:2f94edd49645f4073e778602fda7996f50d01532ceb6294f5ae1229f402e0daf"
          before_revision: 26
          command_digest: "sha256:4549ab68d75b538be13a4ae641d75b460a0f24f961455e659dff9fc3356511ac"
          effect_ids: []
          event_digests:
            - "sha256:98f4d861d682570806a015766c0b4665290680711ede041ccd416c01b77cdc53"
          mutation_id: "kernel_work_item_execution_required:sha256:282130f78f2d6a8043b5be450bed0acac4c2da2685129ede0fb9f762718587b9:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        kernel_work_item_execution_required:sha256:bc50486c1c782ad7ba24b43686dffd90b8c3f249c2ec46e4e9e2807e28a06c1f:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:
          after_revision: 34
          aggregate_digest: "sha256:0859d1388cd08ae93cea9c662c9ef0ef27c7ef1975242f58387efc1c3cf8e1de"
          before_revision: 33
          command_digest: "sha256:30d463cee901cdf5956a1dca618e6550e4a931991fb76c6e204ef9e6cf9ae4c2"
          effect_ids: []
          event_digests:
            - "sha256:a6d67679887fbc781f59a30f7909de717a57dc43d8fff5cac13d39300a9e5f83"
          mutation_id: "kernel_work_item_execution_required:sha256:bc50486c1c782ad7ba24b43686dffd90b8c3f249c2ec46e4e9e2807e28a06c1f:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        kernel_work_item_execution_required:sha256:c7bba39491b656e6af10a55b668268cffced05247f21483feeac0e1f91811475:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 20
          aggregate_digest: "sha256:1bccba5dca4e6ca35159ab13372caf7d857b63c40495a518896e432a869c59ab"
          before_revision: 19
          command_digest: "sha256:dc7ecaac12842db8f80483dcd2318180185a11494300ad0761303c22e09c46a3"
          effect_ids: []
          event_digests:
            - "sha256:fac5d36a29e1363e1028f79b32109cd2681bf74504e713f48f2f7cf05165aedf"
          mutation_id: "kernel_work_item_execution_required:sha256:c7bba39491b656e6af10a55b668268cffced05247f21483feeac0e1f91811475:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:
          after_revision: 13
          aggregate_digest: "sha256:1320bee8ab53981f23d41ed94b912ffb4648c0240649adb06e508f2e6166d531"
          before_revision: 12
          command_digest: "sha256:fd97e2230ba0eafee8c975f53fcd54ed677bdb9b84002cf5898d2844dc939f8f"
          effect_ids: []
          event_digests:
            - "sha256:0edb780fbf60f3e7fbf4930cca9243ed7c415cc243bb51b383f29c2c035e1500"
          mutation_id: "kernel_work_item_execution_required:sha256:cd5560b2518de1d6f0c4c414cb68ec63bfccacb588b27c417ff232c5a88f2675:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        kernel_work_item_inspection_required:sha256:5700fc342b554f7fb53e8496f20c9e1ddd345638445f3c9140cb9485c1eb5eb5:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 16
          aggregate_digest: "sha256:9b106655399af96e95c9799fff8f1130a33a79cfd65fcc9c4ac708828c870072"
          before_revision: 15
          command_digest: "sha256:7d5963a2625e45ef8f346309584292d58a6e2328368b70da7293a9416a4f91b9"
          effect_ids: []
          event_digests:
            - "sha256:bfa10aa478a8c85a6ae69ce7b9d5c0fcdef3dc06070edb2a945b8c67918cb6e4"
          mutation_id: "kernel_work_item_inspection_required:sha256:5700fc342b554f7fb53e8496f20c9e1ddd345638445f3c9140cb9485c1eb5eb5:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621:
          after_revision: 9
          aggregate_digest: "sha256:1c33cf5e53d99a0328b94a29e986580cf56a43a7f67e04361284ce0b15df565f"
          before_revision: 8
          command_digest: "sha256:89c423ec5bea969dad8fe3242d1fa288dfa39261c11584bf7f6e87132ed7448d"
          effect_ids: []
          event_digests:
            - "sha256:2c66ac5984c4b34085df3880b56da1ae8d1d258b0862562b1236460b2447fcef"
          mutation_id: "kernel_work_item_inspection_required:sha256:ddb27b90b67c268b3226db4dc7eddf23a4788b11354a852438319e80e70debb1:sha256:22c451e7b9dd432d241195d274a3be2ac5eea79ce67a6db38983f98171418621"
        kernel_work_item_inspection_required:sha256:f51b65df91b857452298127bc63cb7e7f8eaaacceb7d719a367dd26c57caac95:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:
          after_revision: 30
          aggregate_digest: "sha256:cde566deb613843af357fd011c6583158c17e607147e9b70107e3ea8317ecf04"
          before_revision: 29
          command_digest: "sha256:025d2b1f0acebc10c7b5b4441186b202f88938cf2673f1340f383042086db709"
          effect_ids: []
          event_digests:
            - "sha256:1babef8ea8bd0855d21f56cf6657984b2ff5f60db1eeaeab887cc3a5fca8d285"
          mutation_id: "kernel_work_item_inspection_required:sha256:f51b65df91b857452298127bc63cb7e7f8eaaacceb7d719a367dd26c57caac95:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        kernel_work_item_materialization_required:sha256:861e72a09c0420bcd33094a0889fccb55d4d447cf63955a50b031416789ab9cd:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 25
          aggregate_digest: "sha256:79cbc2eb8c2485fa3eb0655b09816b47cb86f5224dac5b998c3508098df50393"
          before_revision: 24
          command_digest: "sha256:734c09e7700e9003d9e8b8bdbbec7be9d30943dabc7ef05154a792d1a38732da"
          effect_ids: []
          event_digests:
            - "sha256:b4bdaebbb6a90f0bfde3da91433a8f51e275e35f807a9fd13fe5900a7b0b320d"
          mutation_id: "kernel_work_item_materialization_required:sha256:861e72a09c0420bcd33094a0889fccb55d4d447cf63955a50b031416789ab9cd:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
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
        kernel_work_item_rework_claim_required:sha256:5173013ef8668b07940b028df9d190a5f9cb5d512f5aaeb72a82240ad993ff3a:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:
          after_revision: 19
          aggregate_digest: "sha256:b13a8227b6b0b90d16a0da7d4d10adacb7f5d0e017a2555a778c6f3c31a2a10a"
          before_revision: 18
          command_digest: "sha256:080f55811ba68f00c240f6be3a1236f9187447c6ba2ba495b33ee37363687a05"
          effect_ids: []
          event_digests:
            - "sha256:1d3e4608c4c9b06e9e8c052065e49b7d3d00bf96df0e60455a6865e972a3019a"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:5173013ef8668b07940b028df9d190a5f9cb5d512f5aaeb72a82240ad993ff3a:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        kernel_work_item_rework_claim_required:sha256:dfd4973b2cef7c395cf68f67328c185ec2d6b673003512eb7ddec723803e0b8b:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:
          after_revision: 33
          aggregate_digest: "sha256:98972a633f47183b7dfd1d2504e1315dc6bdeb31aeb3fca3de242fb8078ee2b9"
          before_revision: 32
          command_digest: "sha256:85a10f4b5a45d9597aa6470ca73b4535bcf36b15507f86da10a195b4120ff8cf"
          effect_ids: []
          event_digests:
            - "sha256:f34aeafee307165d94e096b2725341d5da5da8ef619470632ffbe530543e83a3"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:dfd4973b2cef7c395cf68f67328c185ec2d6b673003512eb7ddec723803e0b8b:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        reject:sha256:18269d8c4fbef5d7f23a648371e882ad67bbcf59b75f3ba20195be6779e7f798:
          after_revision: 22
          aggregate_digest: "sha256:fe81afed9839dd4ce3fd3bfa35718ba289295a7eb49bbf056781d60463f8523e"
          before_revision: 21
          command_digest: "sha256:3fd2028b45a89b38476805416338b6224c8139af109c18aed4e2e25e45e2f06a"
          effect_ids: []
          event_digests:
            - "sha256:816625d3417c1962e80cba25c349ff8f223945480a914443ed5ce083e5239e41"
          mutation_id: "reject:sha256:18269d8c4fbef5d7f23a648371e882ad67bbcf59b75f3ba20195be6779e7f798"
        result:sha256:79a1ddcc8f4c9e0a593c880b986ada2a316ab260b86f74e7d31114338b6497e0:
          after_revision: 23
          aggregate_digest: "sha256:3e3d046125c5fedec80e3f50c3e696e555cd476161e3d4a178823cf61bf02370"
          before_revision: 22
          command_digest: "sha256:2d2cfef0fec2c08a7fabf3fdb2cf2c566480fc94bcc951162908bb9a7739cba2"
          effect_ids: []
          event_digests:
            - "sha256:78ccd83e823cdc8d135d3d7be5ad6b9d6cb33731708430a345c4fc90b07f136b"
          mutation_id: "result:sha256:79a1ddcc8f4c9e0a593c880b986ada2a316ab260b86f74e7d31114338b6497e0"
        result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a:
          after_revision: 2
          aggregate_digest: "sha256:1037bb265fb28226ed61a7bdb5c096120ea804ae4ce04b73b6ec385f44e4069b"
          before_revision: 1
          command_digest: "sha256:6795439b3f66ece3d6a9674b1a6d6057b0364566241f670e3c9ee29b0146f2d4"
          effect_ids: []
          event_digests:
            - "sha256:859f21c5d05d3616f8cb2beef5a4e12c92256221975e888546d72b42096c3ac9"
          mutation_id: "result:sha256:b3d5d81eeee5b9b35138958135d634a8cb4b8656498c60e6ef2ced9d614d631a"
        result:sha256:c4e81a60b3c85958b7bab35637af957b89e451a4463d510f8b0d0f72e8003c9e:
          after_revision: 29
          aggregate_digest: "sha256:1a4d8855d58026b20eef8caedf08e5606af2be719df4e6fed44a111afd4137e0"
          before_revision: 28
          command_digest: "sha256:9657128f095952232b109841aecb31f7986ee58af1b3d584ec8f3fd95be46f37"
          effect_ids: []
          event_digests:
            - "sha256:bbc1119e15d27e64dcc65f39905a49797a7e2ae1e88715280d76a8be75f742fb"
          mutation_id: "result:sha256:c4e81a60b3c85958b7bab35637af957b89e451a4463d510f8b0d0f72e8003c9e"
        result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6:
          after_revision: 8
          aggregate_digest: "sha256:4ea8514a9641017faa152b8bdd101075ad3f287b67ab80129b78dd515289eb69"
          before_revision: 7
          command_digest: "sha256:ef96d0e07611030db3c520e03639b307570add4623764ae1e01d32c76c479dc1"
          effect_ids: []
          event_digests:
            - "sha256:c92eb81b28a2cfcc3455933c2c28f028c2f5f257af11f1ddbde6f212156a9955"
          mutation_id: "result:sha256:cf6217cd1330dd3668ee276a37f199918292a2fa6b181483d37ab43837ce35f6"
        result:sha256:e1cd8875abedb6ec66838ef896cf0674e24af194e0c4c6f4238dec5097fa5ecb:
          after_revision: 15
          aggregate_digest: "sha256:0c43592a49c72233b11606783a37b1f1533ec5c7afabf0bfc808fb85f155153b"
          before_revision: 14
          command_digest: "sha256:d132556305384eb4cee93855d3b7eda2da9fad1cbeb1db43a4a650d49f1b89d0"
          effect_ids: []
          event_digests:
            - "sha256:d08d9e34a9d43d06ff45fd068d82c3a0c1e04e43ab501726252b2393ca33e7a1"
          mutation_id: "result:sha256:e1cd8875abedb6ec66838ef896cf0674e24af194e0c4c6f4238dec5097fa5ecb"
        semantic-stop:sha256:f488ddc4042533c4112465f7bef194e39e9ad85721f1c94bad4d8ab95a69cedd:
          after_revision: 21
          aggregate_digest: "sha256:d97be68ee1ab819aafa0789cda3f4325a3717ddb5110f91b66abec760fa931cb"
          before_revision: 20
          command_digest: "sha256:bca1b6568b98ec3a04800593afed44cfae00cb8edff2c1df1254335e7a69eb8d"
          effect_ids: []
          event_digests:
            - "sha256:ce180a61004672eff52c0755c0c367b92ffce042f02bcb72bbe87441ea15f308"
          mutation_id: "semantic-stop:sha256:f488ddc4042533c4112465f7bef194e39e9ad85721f1c94bad4d8ab95a69cedd"
        sha256:17a1a82a286ff54f2dcc0df8b4eb94fbd17afaa0f98ed8805540e97ade97f238:
          after_revision: 28
          aggregate_digest: "sha256:f5e0358baf1f3af85c0bfac0a18eef9e5e9a97bcaeed8581d480a06db85d26ab"
          before_revision: 27
          command_digest: "sha256:1b9c067e5540a1938952e9ce749f6b4f9e14f947e258e64d54f0c863845f2743"
          effect_ids: []
          event_digests:
            - "sha256:9b55623fb2e33cb24c0fd5b94f8e9d4df09cf274b20c8890cfb16d33843ba130"
          mutation_id: "sha256:17a1a82a286ff54f2dcc0df8b4eb94fbd17afaa0f98ed8805540e97ade97f238"
        sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af:
          after_revision: 7
          aggregate_digest: "sha256:bdbc3cd6c351cbd02444cbf815750b721a38ef824e3ba4bca4daf2ac07c3c387"
          before_revision: 6
          command_digest: "sha256:12daee1d5457b6cdfd0865bcc122acf7fb810e17cc59b719345da9d1cbc097a7"
          effect_ids: []
          event_digests:
            - "sha256:7e1429cf5d169ebbe762e1bb92aafa9568392245fd7356942f9d6a84e2ef1a35"
          mutation_id: "sha256:2a18bc975f757c824ab7f95a639924d6bbd1b6e0a0684630719392637baf59af"
        sha256:37c5a0ae76acd6e66bb4f027f970159b41b767cf99d5194fae5fdd54f329f6bf:
          after_revision: 14
          aggregate_digest: "sha256:07f642f8c048acd165c0046db7cdf89ce37dd8eb251ecc825973801117a1f300"
          before_revision: 13
          command_digest: "sha256:150f38c39cf2f1d5083267bf3b11df371a8a78b93ebdef6748f85e07c0cd0ebd"
          effect_ids: []
          event_digests:
            - "sha256:7e53fe3a72805583bb1715ffcf8f7facb15219e9c5c20190b296dfe2165d8f00"
          mutation_id: "sha256:37c5a0ae76acd6e66bb4f027f970159b41b767cf99d5194fae5fdd54f329f6bf"
        sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258:
          after_revision: 3
          aggregate_digest: "sha256:c6ec12149c7bf1250ac70c643e3127e36b74c79e5e0510d7ba043debdca53835"
          before_revision: 2
          command_digest: "sha256:0b155203ae9354dd11f7c54fea3ec64138f9bca67e8a9e8e1727128d6208b670"
          effect_ids: []
          event_digests:
            - "sha256:efb0a7519431b78e3aa92f49a4c18c3ba46455172d03966546d2e53609202d71"
          mutation_id: "sha256:d5665bd7de00e52e8e927444ba48f90a629eaebd5e4501c471a588c2048a8258"
        sha256:f717364f65ba62d870f570cd7e7a8ae161d1819fbdb57b6b20868e1a816bafbd:
          after_revision: 24
          aggregate_digest: "sha256:45df3b39fca8466e6a26b8421f506646a4881a31b7f9a22c8e4b233cba1edb72"
          before_revision: 23
          command_digest: "sha256:151fb7044650eead9572f2fb807699cd86901db7263dcd45a1067871ee00174d"
          effect_ids: []
          event_digests:
            - "sha256:81082937bde9492d32f3a34395b4720c8cf928db03bf07c15634bed052624723"
          mutation_id: "sha256:f717364f65ba62d870f570cd7e7a8ae161d1819fbdb57b6b20868e1a816bafbd"
        validation-resolution:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82:
          after_revision: 32
          aggregate_digest: "sha256:baa2f897aaeba246d4947ce31cdc96a29a3262bec4c79979c603f4623fd345af"
          before_revision: 31
          command_digest: "sha256:e8f10a3a8e485d786feff0beb6f1ecc085a535d820a771ecd74609c89ff366cd"
          effect_ids: []
          event_digests:
            - "sha256:e580444d14eb20253d066b506870bc22fc8caac789f7a765bdab3a4989a1dcb7"
          mutation_id: "validation-resolution:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82"
        validation-resolution:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2:
          after_revision: 18
          aggregate_digest: "sha256:cfea8d1825a464ccd8994543e8bc9e0258a27af0796d54b3114c4a04ac3e941f"
          before_revision: 17
          command_digest: "sha256:5364077d2a9356419c8623f0d7ebe88b1e7ac15137a1bdd21c154b2e7f20aa77"
          effect_ids: []
          event_digests:
            - "sha256:f7e46f2fb36e3d926ccbb74694ab9c1039a3fda728b26d445941d73b6ac7cdee"
          mutation_id: "validation-resolution:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2"
        validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:
          after_revision: 11
          aggregate_digest: "sha256:298ad47b97dfc6c36116fde8cb418ed54ad6d9f5fc78bfcc7ecd0748185a83be"
          before_revision: 10
          command_digest: "sha256:1f820f16068d3f6d9cfae2a70e7c7d823f7e16462fbf6c88647d52d7753a5779"
          effect_ids: []
          event_digests:
            - "sha256:d147b7bd3af4282b5979867abb51c0b24c8dd157f91593765f8850a810de6f5a"
          mutation_id: "validation-resolution:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
        validation:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82:
          after_revision: 31
          aggregate_digest: "sha256:7afc6ed9c852fcdb86a15c102f069626ec9c69f2aa2ecc26a775375d2c1edcbf"
          before_revision: 30
          command_digest: "sha256:940f5d8e0a27791cbc43ccca8ebf7ba0e61c1ae49d82d1070c04f852e1709a79"
          effect_ids: []
          event_digests:
            - "sha256:6919f306a4b8403aea5e10965df25059924be5d2df8a07934c0e496d638f141e"
          mutation_id: "validation:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82"
        validation:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2:
          after_revision: 17
          aggregate_digest: "sha256:817961c96c321bc198cdcaee6c23bd964f91ea59e85e7a5ed3a72aeb3271cff2"
          before_revision: 16
          command_digest: "sha256:bf666c0656acaf3b8d967e57eb6066055321b216ab55c6c8e5182eab539f33b6"
          effect_ids: []
          event_digests:
            - "sha256:b53b4da25ce60f95dcae6e137fd88ac817809bef7d374051a5b6910efa356e93"
          mutation_id: "validation:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2"
        validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33:
          after_revision: 10
          aggregate_digest: "sha256:e85635ccf8e5a289c6d3134f14db42f10986bf377abc4ab3f2abcf13394b009b"
          before_revision: 9
          command_digest: "sha256:a2e8e601d4b572396e93876762c9087369457f3cda82055481dce6da0db7eed5"
          effect_ids: []
          event_digests:
            - "sha256:2dc37c4e4946795b0b4a37abc1dadbc856f2e8720c89accb2b04f35da692277c"
          mutation_id: "validation:sha256:cc4e3ec4bb59bacf65675c24adf592716385777c2186d9b42c1da58c7d4a7a33"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:9dff505b6e277a7ba75dafa938ddbb28a3c3d1bd21e1e0262416aaa462dd26f6"
          digest: "sha256:4465ddacda492edb3b388469e7bec99421a21f9352f0cd3d9e5b0d7901579f59"
          revision: 1
          state: "REJECTED"
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
      revision: 34
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-blocked-replan:
          attempt: 2
          claim_id: "sha256:13b3af7d8dbc7c992942e3a32146067074c4c9d37b42ba01540a3a11af329eea"
          definition:
            contract_digest: "sha256:075a3b3aa077b8767b0d28dbb7a3e119192108197320f70fee89c7beac25b047"
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
    digest: "sha256:49417801a3d1bc22bd3b782816f1376e0d2c32258762151cdd80dc27064098a8"
    documents:
      contracts:
        sha256:075a3b3aa077b8767b0d28dbb7a3e119192108197320f70fee89c7beac25b047:
          acceptance_criteria:
            - "Approved blocked-plan rejection requires exact USER/manual provenance and evidence digest."
            - "Unrejected blocked work, non-blocked plans, stale fingerprints, and unresolved effects remain fail-closed."
            - "Canonical routing bypasses the task-centric projection and preserves blocked attempt, event, and authority history."
            - "Focused Vitest workspace checks and full local CI pass."
          objective: "Confirm the existing canonical blocked-plan replanning implementation and return its source and regression outputs under the corrected verification contract."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project core --project agentplane packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/kernel-replan.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/plan-reject.command.test.ts --maxWorkers=4"
            - "bun run ci:local:full"
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
      -
        command_digest: "sha256:150f38c39cf2f1d5083267bf3b11df371a8a78b93ebdef6748f85e07c0cd0ebd"
        id: "sha256:37c5a0ae76acd6e66bb4f027f970159b41b767cf99d5194fae5fdd54f329f6bf:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:37c5a0ae76acd6e66bb4f027f970159b41b767cf99d5194fae5fdd54f329f6bf"
        occurred_at: "2026-09-20T02:27:34.381Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609200157-HJ7KZE"
        task_revision: 14
      -
        command_digest: "sha256:d132556305384eb4cee93855d3b7eda2da9fad1cbeb1db43a4a650d49f1b89d0"
        id: "result:sha256:e1cd8875abedb6ec66838ef896cf0674e24af194e0c4c6f4238dec5097fa5ecb:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e1cd8875abedb6ec66838ef896cf0674e24af194e0c4c6f4238dec5097fa5ecb"
        occurred_at: "2026-09-20T02:27:38.649Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609200157-HJ7KZE"
        task_revision: 15
      -
        command_digest: "sha256:7d5963a2625e45ef8f346309584292d58a6e2328368b70da7293a9416a4f91b9"
        id: "kernel_work_item_inspection_required:sha256:5700fc342b554f7fb53e8496f20c9e1ddd345638445f3c9140cb9485c1eb5eb5:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5700fc342b554f7fb53e8496f20c9e1ddd345638445f3c9140cb9485c1eb5eb5:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:27:41.995Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609200157-HJ7KZE"
        task_revision: 16
      -
        command_digest: "sha256:bf666c0656acaf3b8d967e57eb6066055321b216ab55c6c8e5182eab539f33b6"
        id: "validation:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2"
        occurred_at: "2026-09-20T02:28:23.811Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609200157-HJ7KZE"
        task_revision: 17
      -
        command_digest: "sha256:5364077d2a9356419c8623f0d7ebe88b1e7ac15137a1bdd21c154b2e7f20aa77"
        id: "validation-resolution:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7df5953dd3d5ce70ef3b11b926c37eda7d7690b5a9933b6b7ea2b1ab208053c2"
        occurred_at: "2026-09-20T02:28:25.827Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609200157-HJ7KZE"
        task_revision: 18
      -
        command_digest: "sha256:080f55811ba68f00c240f6be3a1236f9187447c6ba2ba495b33ee37363687a05"
        id: "kernel_work_item_rework_claim_required:sha256:5173013ef8668b07940b028df9d190a5f9cb5d512f5aaeb72a82240ad993ff3a:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:5173013ef8668b07940b028df9d190a5f9cb5d512f5aaeb72a82240ad993ff3a:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:28:30.014Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609200157-HJ7KZE"
        task_revision: 19
      -
        command_digest: "sha256:dc7ecaac12842db8f80483dcd2318180185a11494300ad0761303c22e09c46a3"
        id: "kernel_work_item_execution_required:sha256:c7bba39491b656e6af10a55b668268cffced05247f21483feeac0e1f91811475:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c7bba39491b656e6af10a55b668268cffced05247f21483feeac0e1f91811475:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:28:33.201Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609200157-HJ7KZE"
        task_revision: 20
      -
        command_digest: "sha256:bca1b6568b98ec3a04800593afed44cfae00cb8edff2c1df1254335e7a69eb8d"
        id: "semantic-stop:sha256:f488ddc4042533c4112465f7bef194e39e9ad85721f1c94bad4d8ab95a69cedd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:f488ddc4042533c4112465f7bef194e39e9ad85721f1c94bad4d8ab95a69cedd"
        occurred_at: "2026-09-20T02:29:19.393Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202609200157-HJ7KZE"
        task_revision: 21
      -
        command_digest: "sha256:3fd2028b45a89b38476805416338b6224c8139af109c18aed4e2e25e45e2f06a"
        id: "reject:sha256:18269d8c4fbef5d7f23a648371e882ad67bbcf59b75f3ba20195be6779e7f798:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:18269d8c4fbef5d7f23a648371e882ad67bbcf59b75f3ba20195be6779e7f798"
        occurred_at: "2026-09-20T02:29:22.792Z"
        payload_digest: "sha256:57cf43bf992edfb56c4b9fc7f3daab51dc14fc4db1911b7c5c7814bfd3264acd"
        task_id: "202609200157-HJ7KZE"
        task_revision: 22
      -
        command_digest: "sha256:2d2cfef0fec2c08a7fabf3fdb2cf2c566480fc94bcc951162908bb9a7739cba2"
        id: "result:sha256:79a1ddcc8f4c9e0a593c880b986ada2a316ab260b86f74e7d31114338b6497e0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:79a1ddcc8f4c9e0a593c880b986ada2a316ab260b86f74e7d31114338b6497e0"
        occurred_at: "2026-09-20T02:32:30.901Z"
        payload_digest: "sha256:db68ef34e8f87d9fd3701d48680e459e5e3de0884ebbf57ad98a4dd97e9c09a6"
        task_id: "202609200157-HJ7KZE"
        task_revision: 23
      -
        command_digest: "sha256:151fb7044650eead9572f2fb807699cd86901db7263dcd45a1067871ee00174d"
        id: "sha256:f717364f65ba62d870f570cd7e7a8ae161d1819fbdb57b6b20868e1a816bafbd:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f717364f65ba62d870f570cd7e7a8ae161d1819fbdb57b6b20868e1a816bafbd"
        occurred_at: "2026-09-20T02:33:37.945Z"
        payload_digest: "sha256:f8c8c64c417e19e36d276588bc054b71f186c8763f421a31481d93e35cbe515d"
        task_id: "202609200157-HJ7KZE"
        task_revision: 24
      -
        command_digest: "sha256:734c09e7700e9003d9e8b8bdbbec7be9d30943dabc7ef05154a792d1a38732da"
        id: "kernel_work_item_materialization_required:sha256:861e72a09c0420bcd33094a0889fccb55d4d447cf63955a50b031416789ab9cd:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:861e72a09c0420bcd33094a0889fccb55d4d447cf63955a50b031416789ab9cd:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:36:32.247Z"
        payload_digest: "sha256:6c6a3d8117c13a8eab8bdd7243d2cf1185afd793ecedc650a575d4bcc8af061e"
        task_id: "202609200157-HJ7KZE"
        task_revision: 25
      -
        command_digest: "sha256:86cc358eb3bd969665f01af57361287d37c16eacadd9ed0dc5d01c0e2f6507ee"
        id: "kernel_work_item_claim_required:sha256:10c1890b92b3f79cc8b982f7c2add2139410bae99532a80da5dce681732c92fa:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:10c1890b92b3f79cc8b982f7c2add2139410bae99532a80da5dce681732c92fa:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:36:36.222Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202609200157-HJ7KZE"
        task_revision: 26
      -
        command_digest: "sha256:4549ab68d75b538be13a4ae641d75b460a0f24f961455e659dff9fc3356511ac"
        id: "kernel_work_item_execution_required:sha256:282130f78f2d6a8043b5be450bed0acac4c2da2685129ede0fb9f762718587b9:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:282130f78f2d6a8043b5be450bed0acac4c2da2685129ede0fb9f762718587b9:sha256:3e44597403911b28ec79e20508d8be564441ce05de5c063276bfea546c2768f8"
        occurred_at: "2026-09-20T02:36:40.289Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609200157-HJ7KZE"
        task_revision: 27
      -
        command_digest: "sha256:1b9c067e5540a1938952e9ce749f6b4f9e14f947e258e64d54f0c863845f2743"
        id: "sha256:17a1a82a286ff54f2dcc0df8b4eb94fbd17afaa0f98ed8805540e97ade97f238:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:17a1a82a286ff54f2dcc0df8b4eb94fbd17afaa0f98ed8805540e97ade97f238"
        occurred_at: "2026-09-20T02:46:51.102Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202609200157-HJ7KZE"
        task_revision: 28
      -
        command_digest: "sha256:9657128f095952232b109841aecb31f7986ee58af1b3d584ec8f3fd95be46f37"
        id: "result:sha256:c4e81a60b3c85958b7bab35637af957b89e451a4463d510f8b0d0f72e8003c9e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c4e81a60b3c85958b7bab35637af957b89e451a4463d510f8b0d0f72e8003c9e"
        occurred_at: "2026-09-20T02:46:55.376Z"
        payload_digest: "sha256:26dd0f4b06a2bea56fb8527d7c16b2e90cf490d12c0d1654c88f5900a6ad8e4d"
        task_id: "202609200157-HJ7KZE"
        task_revision: 29
      -
        command_digest: "sha256:025d2b1f0acebc10c7b5b4441186b202f88938cf2673f1340f383042086db709"
        id: "kernel_work_item_inspection_required:sha256:f51b65df91b857452298127bc63cb7e7f8eaaacceb7d719a367dd26c57caac95:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f51b65df91b857452298127bc63cb7e7f8eaaacceb7d719a367dd26c57caac95:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        occurred_at: "2026-09-20T02:46:58.672Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202609200157-HJ7KZE"
        task_revision: 30
      -
        command_digest: "sha256:940f5d8e0a27791cbc43ccca8ebf7ba0e61c1ae49d82d1070c04f852e1709a79"
        id: "validation:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82"
        occurred_at: "2026-09-20T02:47:46.097Z"
        payload_digest: "sha256:508ff4e990154e1dbf9852bacbf1c924f77c4110611ba32112cffdb03055fc3b"
        task_id: "202609200157-HJ7KZE"
        task_revision: 31
      -
        command_digest: "sha256:e8f10a3a8e485d786feff0beb6f1ecc085a535d820a771ecd74609c89ff366cd"
        id: "validation-resolution:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5293cfca765b3353ba834ac265ea8b2b77b5860b654b0780ef69621e157a9c82"
        occurred_at: "2026-09-20T02:47:48.239Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609200157-HJ7KZE"
        task_revision: 32
      -
        command_digest: "sha256:85a10f4b5a45d9597aa6470ca73b4535bcf36b15507f86da10a195b4120ff8cf"
        id: "kernel_work_item_rework_claim_required:sha256:dfd4973b2cef7c395cf68f67328c185ec2d6b673003512eb7ddec723803e0b8b:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:dfd4973b2cef7c395cf68f67328c185ec2d6b673003512eb7ddec723803e0b8b:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        occurred_at: "2026-09-20T02:47:52.318Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202609200157-HJ7KZE"
        task_revision: 33
      -
        command_digest: "sha256:30d463cee901cdf5956a1dca618e6550e4a931991fb76c6e204ef9e6cf9ae4c2"
        id: "kernel_work_item_execution_required:sha256:bc50486c1c782ad7ba24b43686dffd90b8c3f249c2ec46e4e9e2807e28a06c1f:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bc50486c1c782ad7ba24b43686dffd90b8c3f249c2ec46e4e9e2807e28a06c1f:sha256:c118fde32956f8367667e42f2b8d8ac93a8f3aac919233ada663519020f385d0"
        occurred_at: "2026-09-20T02:47:56.364Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202609200157-HJ7KZE"
        task_revision: 34
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
