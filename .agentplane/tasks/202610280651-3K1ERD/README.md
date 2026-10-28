---
id: "202610280651-3K1ERD"
title: "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-10-28T06:57:05.358Z"
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
    - "effect_release_metadata"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
      - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
      - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
          - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:dcf26fb5ffb91f7da51844c91e201d1b0ebfb13becdcf88999cb7733349a2e41"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-28T06:51:39.989Z"
doc_updated_by: "CODER"
description: "Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13."
sections:
  Summary: |-
    Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents

    Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.
  Scope: |-
    - In scope: Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.
    - Out of scope: unrelated refactors not required for "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents".
  Plan: "1. Execute approved WorkItem admit-declared-operator-adoption."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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
    base_sha: "8dc7008ea00ef190520168ca16ba9006ccbe378f"
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
            digest: "sha256:1461546013318c0b8ba31d70e52a6326e0bd71dde253e4c79cecd4d75506bf8b"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:e47e72f54705b015e797b3dd61376a7a98ef4d130b161d3a2866430bbc8ae45f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:8173137d4f0737a1a3614dd0cd18046b5a84ed3d00a13abad28dbe6f455d28a3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
            task_id: "202610280651-3K1ERD"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:8173137d4f0737a1a3614dd0cd18046b5a84ed3d00a13abad28dbe6f455d28a3"
        digest: "sha256:e47e72f54705b015e797b3dd61376a7a98ef4d130b161d3a2866430bbc8ae45f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fd1f5730414e20fe16c10a3759c1069eea18c9919d5937ef05d1fe8502760b02"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
                - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
            expected_outputs:
              - "generic-adoption-authority-fix"
              - "resolved-contract-regression-evidence"
            id: "admit-declared-operator-adoption"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610280651-3K1ERD"
      intent_digest: "sha256:f2033ff702906d0eddd883d00162a8176b08d6e127a91bc1502e6d3ab21c0970"
      migration_receipts: []
      mutation_receipts:
        capture:202610280651-3K1ERD:
          after_revision: 1
          aggregate_digest: "sha256:de58672ac8fe137ccf5d5530696041d3dee4c5ded72813fb7a1d3d652a9da650"
          before_revision: 0
          command_digest: "sha256:d3013407154b50203bb4116bcade8eb206fcc832e01adbf07aea7ab2230e7a0d"
          effect_ids: []
          event_digests:
            - "sha256:972a1b63ae0642d0b01fa7b69e43e728aa15879b811c6ecc6886b44379b67b84"
          mutation_id: "capture:202610280651-3K1ERD"
        kernel_work_item_claim_required:sha256:f3363101731d133475226eab419215f53c583bc2b34697ac5cfbd9fe5b070fb5:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:
          after_revision: 5
          aggregate_digest: "sha256:02eb621afc825783d217f972ccad421587c44688625530cbd086f096e7e4200b"
          before_revision: 4
          command_digest: "sha256:15c629ef502efdbc11610100d64e07f34ad999ededdcaa7a300f1cc6a767548e"
          effect_ids: []
          event_digests:
            - "sha256:852455c945e479f32c70105def4660cb4a65efca36a0689c6f15c31f1a826acd"
          mutation_id: "kernel_work_item_claim_required:sha256:f3363101731d133475226eab419215f53c583bc2b34697ac5cfbd9fe5b070fb5:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        kernel_work_item_execution_required:sha256:3a4ae1db04af1780858ee27781e106a91f1395cc12665ae55bdfcbf53c68cc03:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:
          after_revision: 6
          aggregate_digest: "sha256:944ae1afe92471ce721f7abb434c387480bdb7cbe9f88b33d420423a9575314c"
          before_revision: 5
          command_digest: "sha256:24f62d1166d4ae1ec62f389d369acf4bdb7727cc5092d3993826f0689caeb0dc"
          effect_ids: []
          event_digests:
            - "sha256:18f9fa0e3a0bf9b8fdcbcdb3ce316b3476686356d535b89b496c57721bbf1148"
          mutation_id: "kernel_work_item_execution_required:sha256:3a4ae1db04af1780858ee27781e106a91f1395cc12665ae55bdfcbf53c68cc03:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:
          after_revision: 4
          aggregate_digest: "sha256:1c1b4c007ccf10945fa8443c6ff3dffd35a8e2bf141305178ca79941f0607473"
          before_revision: 3
          command_digest: "sha256:dbfafd082e308e5cd77bbbaad862b81ebbe0cd94a4eccb9dafd11985b1fa10ec"
          effect_ids: []
          event_digests:
            - "sha256:86001c381be811c67ecbaf1f6797caee68581e6b4adf2a4c87d85f0066b21f9a"
          mutation_id: "kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983:
          after_revision: 2
          aggregate_digest: "sha256:b3740a1f34bbd8b2d211e571936c648344e40e0dcd7c3243b4a198866e41d503"
          before_revision: 1
          command_digest: "sha256:91761cf49ab0cfd7294a3120b08a72ad03df34915710073a92cf9a12d1cd2879"
          effect_ids: []
          event_digests:
            - "sha256:47d884250aaa55d2eee13d0d51bea80888369086f14c1f470a95f046e78c2c9f"
          mutation_id: "result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983"
        sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78:
          after_revision: 3
          aggregate_digest: "sha256:fb2460791f5a74dca3961690527d5954584c725394894b209c84f8cee485540a"
          before_revision: 2
          command_digest: "sha256:6477aff26cbbabc019fd1fd2fba01b79bb02ad224c7fe84a7dd79f263b687d29"
          effect_ids: []
          event_digests:
            - "sha256:759542a11a3abfb42f2572c363ecc48a8a878e746598c3eb26e76b30f1448eb2"
          mutation_id: "sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        admit-declared-operator-adoption:
          attempt: 1
          claim_id: "sha256:74ad595ebe8077bc7ad148e81a37d3f6af5dd6385b41d53a0dc6e34884e7896e"
          definition:
            contract_digest: "sha256:fd1f5730414e20fe16c10a3759c1069eea18c9919d5937ef05d1fe8502760b02"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
                - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
            expected_outputs:
              - "generic-adoption-authority-fix"
              - "resolved-contract-regression-evidence"
            id: "admit-declared-operator-adoption"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:916796698534d0b2b34abc79c8479c44d4b9499345a17ab0b8079540a952ebf0"
    documents:
      contracts:
        sha256:fd1f5730414e20fe16c10a3759c1069eea18c9919d5937ef05d1fe8502760b02:
          acceptance_criteria:
            - "The adoption guard accepts a real resolved branch_pr execution contract that declares network_read and external_write while its semantic authority allows network_read and forbids external_write."
            - "The guard rejects a contract lacking declared external_write or allowed network_read, and continues to reject unapproved, non-branch_pr, or noncanonical tasks."
            - "The fix changes only the generic adoption authority check and its focused tests; the exact USER operation grant and provider identity safeguards remain intact."
          objective: "Admit native same-repository hosted PR adoption when a branch_pr task declares external_write for the exact USER-granted operator operation, without granting external_write to semantic agents. Reject tasks without declaration, approved plan, canonical task, or network-read authority."
          role: "EXECUTOR"
          verification_commands:
            - "git diff --check"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13."
        objective: "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents"
    events:
      -
        command_digest: "sha256:d3013407154b50203bb4116bcade8eb206fcc832e01adbf07aea7ab2230e7a0d"
        id: "capture:202610280651-3K1ERD:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610280651-3K1ERD"
        occurred_at: "2026-10-28T06:51:39.810Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610280651-3K1ERD"
        task_revision: 1
      -
        command_digest: "sha256:91761cf49ab0cfd7294a3120b08a72ad03df34915710073a92cf9a12d1cd2879"
        id: "result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983"
        occurred_at: "2026-10-28T06:55:30.540Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610280651-3K1ERD"
        task_revision: 2
      -
        command_digest: "sha256:6477aff26cbbabc019fd1fd2fba01b79bb02ad224c7fe84a7dd79f263b687d29"
        id: "sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78"
        occurred_at: "2026-10-28T06:56:57.787Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610280651-3K1ERD"
        task_revision: 3
      -
        command_digest: "sha256:dbfafd082e308e5cd77bbbaad862b81ebbe0cd94a4eccb9dafd11985b1fa10ec"
        id: "kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        occurred_at: "2026-10-28T06:57:39.135Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610280651-3K1ERD"
        task_revision: 4
      -
        command_digest: "sha256:15c629ef502efdbc11610100d64e07f34ad999ededdcaa7a300f1cc6a767548e"
        id: "kernel_work_item_claim_required:sha256:f3363101731d133475226eab419215f53c583bc2b34697ac5cfbd9fe5b070fb5:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f3363101731d133475226eab419215f53c583bc2b34697ac5cfbd9fe5b070fb5:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        occurred_at: "2026-10-28T06:58:16.045Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610280651-3K1ERD"
        task_revision: 5
      -
        command_digest: "sha256:24f62d1166d4ae1ec62f389d369acf4bdb7727cc5092d3993826f0689caeb0dc"
        id: "kernel_work_item_execution_required:sha256:3a4ae1db04af1780858ee27781e106a91f1395cc12665ae55bdfcbf53c68cc03:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3a4ae1db04af1780858ee27781e106a91f1395cc12665ae55bdfcbf53c68cc03:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        occurred_at: "2026-10-28T07:00:03.492Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610280651-3K1ERD"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents

Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.

## Scope

- In scope: Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.
- Out of scope: unrelated refactors not required for "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents".

## Plan

1. Execute approved WorkItem admit-declared-operator-adoption.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
