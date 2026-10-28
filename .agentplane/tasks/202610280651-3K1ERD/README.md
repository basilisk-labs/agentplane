---
id: "202610280651-3K1ERD"
title: "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
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
      - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
      - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
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
      - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
      - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
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
          - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
          - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
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
      digest: "sha256:a932a3db83f7f8ba4a029f67f011ce109a6e9ad04dc3f656d2fbf3952e36867c"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1a30ee474b7257265a5d70d9cf222774c52d5f0fe33bb946ffc89a131c68ff44"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:e47e72f54705b015e797b3dd61376a7a98ef4d130b161d3a2866430bbc8ae45f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:8173137d4f0737a1a3614dd0cd18046b5a84ed3d00a13abad28dbe6f455d28a3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1461546013318c0b8ba31d70e52a6326e0bd71dde253e4c79cecd4d75506bf8b"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
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
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-task-authority.ts"
            evidence_digest: "sha256:a2bad26e74cc64438333c0607bd3ffecc91d106179c8242e9f671ac92381d497"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:73b00dd014e355f6844baaae87afaa8baa269ea1c3e1a95d811a13958219e517"
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
              parent_authority_digest: "sha256:1a30ee474b7257265a5d70d9cf222774c52d5f0fe33bb946ffc89a131c68ff44"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
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
          observation:
            changed_paths: []
            evidence_digest: "sha256:bf1487be6093f8521ad150a47aae8c0a4fc8d44f06941f2390845ba73279659f"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
            request_digest: "sha256:3aef078942933753205f9bb895f6b0c661cd84f375953ef9c6d3b5e5bc90c9fb"
            scope_request:
              attempt: 2
              claim_id: "sha256:c49f014f4d352425620076171ab882eb9a4459709f86034df3bc8ba462cb4f9d"
              contract_digest: "sha256:fd1f5730414e20fe16c10a3759c1069eea18c9919d5937ef05d1fe8502760b02"
              intake_after_digest: "sha256:c8a573919afa8465650e831cbb5e8dba8b24a4453e58f608e3bacfb18f3516cf"
              intake_before_digest: "sha256:0a03dc6a2cda3f67fbfdba59ee05f892a6dbbe82d1fcfef9c49e3edbdd5ee51f"
              parent_authority_digest: "sha256:1a30ee474b7257265a5d70d9cf222774c52d5f0fe33bb946ffc89a131c68ff44"
              plan_digest: "sha256:e47e72f54705b015e797b3dd61376a7a98ef4d130b161d3a2866430bbc8ae45f"
              plan_revision: 1
              record_digest: "sha256:55bf0d8f7bf67b439a94b8f774bedfe7a205760f4b5683b67e64bfcb629bfb40"
              repository_effects:
                - "tests"
              repository_fingerprint: "sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:1352c8e349b2259adfabe1162e6a54c86dd375bd904e03f2d2e743ad23ad73fd"
              scope_roots:
                - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
                - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
              stop_receipt_digest: "sha256:ffa8f63fff8d6b0bc07261522422dbb8becb7a35bf4c030b4669b33256b06fd8"
              task_id: "202610280651-3K1ERD"
              task_revision: 14
              work_item_id: "admit-declared-operator-adoption"
              work_order_id: "sha256:343616a75731c75452bccd3d52d95e97039b9d37cca7f7013e2337c2660418ad"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:42bbc54dbc869b5c6f55aacb908dd9600ec0d53b752b9551cad321e9d9cd5042"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:f80c70c8b2bd6a0c463be8679a86278bcbf8cac7ec99011d1801e1c87c7e3e0a"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c6d6e0651932ceed8ce5c4238ac44b853669d6f2cd6ca3c9dc6fef5b996d6488"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
              - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
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
        approval_evidence_digest: "sha256:c6d6e0651932ceed8ce5c4238ac44b853669d6f2cd6ca3c9dc6fef5b996d6488"
        digest: "sha256:f80c70c8b2bd6a0c463be8679a86278bcbf8cac7ec99011d1801e1c87c7e3e0a"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:8548b67ad3a04fcd12fb09d8e1628c801dd82f14457f6c9aab61ee3b5cb22591"
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
                - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
                - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
            expected_outputs:
              - "generic-adoption-authority-fix"
              - "resolved-contract-regression-evidence"
              - "declaration-aware-adoption-fixtures"
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
        kernel_work_item_claim_required:sha256:9dadf374d9ee870b06fa9acadba5c9009dd30880fc7481519e7f10109e370808:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:
          after_revision: 18
          aggregate_digest: "sha256:e08a2cb7d422ebe3571ce51785b2fd778e8e248632bfa7d1dc8743da96913542"
          before_revision: 17
          command_digest: "sha256:92825db81ef02b2b91de2e28031f2cad626d5acf129a5dcf7511b01e4224a83f"
          effect_ids: []
          event_digests:
            - "sha256:968544b89b306650516aceee0470b3d050fd6a8c08d5a2a671e05a5045a55351"
          mutation_id: "kernel_work_item_claim_required:sha256:9dadf374d9ee870b06fa9acadba5c9009dd30880fc7481519e7f10109e370808:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
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
        kernel_work_item_execution_required:sha256:5cb6dc29646c3e9463d8e245add6499d017be2e0116c1e3723d64e72555a6450:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:
          after_revision: 13
          aggregate_digest: "sha256:6fc53ddf3486018a9f5d8c87cad2a54c9183fb7d600421cc83897ee7976d5361"
          before_revision: 12
          command_digest: "sha256:70497020ba03d49b0d59fa39773caa35268a5513a92f1e1960f09c128125aca5"
          effect_ids: []
          event_digests:
            - "sha256:f5bdb571b909f3112f306ae3a323ce7de522035d830cfcc8799bc0c4aba80f5a"
          mutation_id: "kernel_work_item_execution_required:sha256:5cb6dc29646c3e9463d8e245add6499d017be2e0116c1e3723d64e72555a6450:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        kernel_work_item_execution_required:sha256:cc50e7eccc260c3cdbd9a383c1e1c6e1a4558409cfc6d58e63d4e867ed0181a8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:
          after_revision: 19
          aggregate_digest: "sha256:b6abfb92c3fda38bc90c2419d3135745e944e9abac2b4e4303dc5e54910e0864"
          before_revision: 18
          command_digest: "sha256:2eb73cccc5155d5fe3e5c69987bdd1aaaa9d1d422286b1e3530acbbe7b1e4f79"
          effect_ids: []
          event_digests:
            - "sha256:5ddd084e2e37dd76d0cf1347c857aacaa5b2359d4bd1e7bab277f3ad75a3895f"
          mutation_id: "kernel_work_item_execution_required:sha256:cc50e7eccc260c3cdbd9a383c1e1c6e1a4558409cfc6d58e63d4e867ed0181a8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        kernel_work_item_inspection_required:sha256:38e766d943d698a2a2e89881c704ea4d5f4b5b0b8aea65766f21f6bad330a936:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:
          after_revision: 9
          aggregate_digest: "sha256:82d1035cbbf024bc8a3ab7645e43689bfda41cabaf9ace64146809f10ca12e40"
          before_revision: 8
          command_digest: "sha256:3fa3c8984e90b36e6d8b68d1f29eb9ae72f9e7f2ca1a584fb5cf28d17a58c5ba"
          effect_ids: []
          event_digests:
            - "sha256:0599bc26577eda1ef6c90ae211284cb1dfbb4f62a23d6b9cd1e3507ada59c2e6"
          mutation_id: "kernel_work_item_inspection_required:sha256:38e766d943d698a2a2e89881c704ea4d5f4b5b0b8aea65766f21f6bad330a936:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b:
          after_revision: 4
          aggregate_digest: "sha256:1c1b4c007ccf10945fa8443c6ff3dffd35a8e2bf141305178ca79941f0607473"
          before_revision: 3
          command_digest: "sha256:dbfafd082e308e5cd77bbbaad862b81ebbe0cd94a4eccb9dafd11985b1fa10ec"
          effect_ids: []
          event_digests:
            - "sha256:86001c381be811c67ecbaf1f6797caee68581e6b4adf2a4c87d85f0066b21f9a"
          mutation_id: "kernel_work_item_materialization_required:sha256:a6915975f2bd4f7cf61726fa729b64f9dd8c45983dcf8e4aa9646875ee67fc51:sha256:9d9c27ef4bd5f5ec8b18c9029a2eb3a169eccea6b5ca42fd7f09ee33e3f4757b"
        kernel_work_item_rework_claim_required:sha256:81723fe7b6584c0e7b8048954171988b760a61c5fc95f778c0e2c597d70bdbd8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:
          after_revision: 12
          aggregate_digest: "sha256:998298d94391efca51f78318e7081cae3fd22de2f0b7eae587efef30bf5463ef"
          before_revision: 11
          command_digest: "sha256:c518dcb208e59ee8a51cea6b7b2978368a6edaefd1a55d770f63b5ab8624234d"
          effect_ids: []
          event_digests:
            - "sha256:67fbae5f10acd9b1e1836f4c0c85c8a378edc6653a77e602ec4cfdc2d309da7b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:81723fe7b6584c0e7b8048954171988b760a61c5fc95f778c0e2c597d70bdbd8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        result:sha256:54798d32135c8d0a66eed062076c75ca4a60b6b5a77e05d1624808e080e15f29:
          after_revision: 16
          aggregate_digest: "sha256:ba6a1b3b9bd6cf18610624e9bcc22873d21cb256c9a9a79ff0ec59a72f7380d7"
          before_revision: 15
          command_digest: "sha256:464235924a4c51f146a9e2e83c2838aefedb39fa27a3048b34ad9c72ce4e9455"
          effect_ids: []
          event_digests:
            - "sha256:6e58d2762a08a042fbe790fae3257e3a918589c0bd3565ec3d1beee23eb6f42e"
          mutation_id: "result:sha256:54798d32135c8d0a66eed062076c75ca4a60b6b5a77e05d1624808e080e15f29"
        result:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1:
          after_revision: 8
          aggregate_digest: "sha256:8ffced4aab3c7c43bc72fd6cae4aa3d15ef7e9865e1b17425ae87fc3b7040939"
          before_revision: 7
          command_digest: "sha256:95fb0633f5c5c93bc37a56f63f5ff1aa1df06babd2f6de020c2e7cf5bfce71bb"
          effect_ids: []
          event_digests:
            - "sha256:f81e6609845b4cf2040dc51baf2f3a6d6f9adb900b4514473b1ac859bda6897f"
          mutation_id: "result:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1"
        result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983:
          after_revision: 2
          aggregate_digest: "sha256:b3740a1f34bbd8b2d211e571936c648344e40e0dcd7c3243b4a198866e41d503"
          before_revision: 1
          command_digest: "sha256:91761cf49ab0cfd7294a3120b08a72ad03df34915710073a92cf9a12d1cd2879"
          effect_ids: []
          event_digests:
            - "sha256:47d884250aaa55d2eee13d0d51bea80888369086f14c1f470a95f046e78c2c9f"
          mutation_id: "result:sha256:dda5c68eeed04da0736b35956806d3cb2092b47ceb948a6a2bf39a6b13dc7983"
        scope-request:sha256:3aef078942933753205f9bb895f6b0c661cd84f375953ef9c6d3b5e5bc90c9fb:
          after_revision: 15
          aggregate_digest: "sha256:2a0f18bedf29e1ebe9525570bc1186c31440a6e5a4776644598d3671fb1a58a3"
          before_revision: 14
          command_digest: "sha256:b9d43a69dadc76042f00a61a9f1efd2858e3abc1258cc523076c20282cc576ff"
          effect_ids: []
          event_digests:
            - "sha256:ca610ea53d98c6aa95af2a07c244de9413ea49f1580e98774f55c775ccb905df"
          mutation_id: "scope-request:sha256:3aef078942933753205f9bb895f6b0c661cd84f375953ef9c6d3b5e5bc90c9fb"
        semantic-stop:sha256:343616a75731c75452bccd3d52d95e97039b9d37cca7f7013e2337c2660418ad:
          after_revision: 14
          aggregate_digest: "sha256:3400626bf16269d4f3dbb584ad580064f9bca423a6422d679cacc0d718252c8a"
          before_revision: 13
          command_digest: "sha256:fa732f0c33e4f1fd3dadee2714aa9b01b5c6034b3e51edc3722f4f50c5b5d3ee"
          effect_ids: []
          event_digests:
            - "sha256:416bc66d45ec1e7d664d01093ff2e4854ff6689943d3f62c84097fc0f0f4f636"
          mutation_id: "semantic-stop:sha256:343616a75731c75452bccd3d52d95e97039b9d37cca7f7013e2337c2660418ad"
        sha256:85ccad62b109bfbcb45a3aaad2c14a81a587c65470311aea07f55ff06dd864f4:
          after_revision: 17
          aggregate_digest: "sha256:797cf7232330bcb11c3707e8dd6ad07ead61e0e2d52a31264847699eda999845"
          before_revision: 16
          command_digest: "sha256:3dc660705e664fb9920f51565a1c59f77c3859d6b755afc0338ab085dfd69202"
          effect_ids: []
          event_digests:
            - "sha256:2a48324263e3a3d0e6b0d279321517214c6d7d205fe111073a11f4b7d77a8114"
          mutation_id: "sha256:85ccad62b109bfbcb45a3aaad2c14a81a587c65470311aea07f55ff06dd864f4"
        sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78:
          after_revision: 3
          aggregate_digest: "sha256:fb2460791f5a74dca3961690527d5954584c725394894b209c84f8cee485540a"
          before_revision: 2
          command_digest: "sha256:6477aff26cbbabc019fd1fd2fba01b79bb02ad224c7fe84a7dd79f263b687d29"
          effect_ids: []
          event_digests:
            - "sha256:759542a11a3abfb42f2572c363ecc48a8a878e746598c3eb26e76b30f1448eb2"
          mutation_id: "sha256:b3b16eb31a29450fc4c971d7cbc833d1173aace5ab59c35be0477eb2012a0b78"
        sha256:c1e0d5c801e63199d5d97a2df68419d7e8df47c718746eee17a7a3a854457bb0:
          after_revision: 7
          aggregate_digest: "sha256:00c809324426957d6f5bebb3808235cf1475806411b237cc4f1b44688cc317d0"
          before_revision: 6
          command_digest: "sha256:c646fe5b88affbff08b1ffb6aa0536e7aec5b2e88f833664e5e3e0ba7db847e1"
          effect_ids: []
          event_digests:
            - "sha256:6abef54166cc182e77d5bc97fd26d4f17bab6d8d01ae9972150798ff82df6cdd"
          mutation_id: "sha256:c1e0d5c801e63199d5d97a2df68419d7e8df47c718746eee17a7a3a854457bb0"
        validation-resolution:sha256:19920be7020692cae180288f7fc1f515981e01ad15b6464fa7d57f34da4da206:
          after_revision: 11
          aggregate_digest: "sha256:aee41fb0bd21f46135062aa33cb7bb34e8bd5b395edd7a30f7669420be443428"
          before_revision: 10
          command_digest: "sha256:03d6546bf2640b233db67b6fe2a3b0e98a7cab131a164c3e12ff56631f4ac003"
          effect_ids: []
          event_digests:
            - "sha256:7cfa5d210dcc9a5a925fe4d7cbcd1f4698e85cbcc99e934e6df46dbb062a9996"
          mutation_id: "validation-resolution:sha256:19920be7020692cae180288f7fc1f515981e01ad15b6464fa7d57f34da4da206"
        validation:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1:
          after_revision: 10
          aggregate_digest: "sha256:5e77d1eff11b63ab520ba4077cc9971dee244b5872ba590c69a81d59c0452500"
          before_revision: 9
          command_digest: "sha256:c9ad44ca23591e5737ef3e536630e606af868e52986804c6d712cd342ffb0b56"
          effect_ids: []
          event_digests:
            - "sha256:4973d2e7f7c868f15230a1883103f56efc053ca7bb6ac8246305b721b59914b7"
          mutation_id: "validation:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:8173137d4f0737a1a3614dd0cd18046b5a84ed3d00a13abad28dbe6f455d28a3"
          digest: "sha256:e47e72f54705b015e797b3dd61376a7a98ef4d130b161d3a2866430bbc8ae45f"
          revision: 1
          state: "REJECTED"
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
      revision: 19
      schema_version: 1
      state: "ACTIVE"
      work_items:
        admit-declared-operator-adoption:
          attempt: 3
          claim_id: "sha256:bdfac6b5b78ff332ee70d333b54b4e99b52029cb11223b37d4ce7a812ebb4f53"
          definition:
            contract_digest: "sha256:8548b67ad3a04fcd12fb09d8e1628c801dd82f14457f6c9aab61ee3b5cb22591"
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
                - "packages/agentplane/src/commands/pr/adoption-route.test.ts"
                - "packages/agentplane/src/commands/pr/adoption-merge.test.ts"
            expected_outputs:
              - "generic-adoption-authority-fix"
              - "resolved-contract-regression-evidence"
              - "declaration-aware-adoption-fixtures"
            id: "admit-declared-operator-adoption"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 14
          state: "EXECUTING"
          validation: null
    digest: "sha256:4b7b29235fed529fb7fa08d1494ef32ed6c67e607ca786b85af7d0c546e0c944"
    documents:
      contracts:
        sha256:8548b67ad3a04fcd12fb09d8e1628c801dd82f14457f6c9aab61ee3b5cb22591:
          acceptance_criteria:
            - "The adoption guard accepts a real resolved branch_pr execution contract that declares network_read and external_write while its semantic authority allows network_read and forbids external_write."
            - "The guard rejects a contract lacking declared external_write or allowed network_read, and continues to reject unapproved, non-branch_pr, or noncanonical tasks."
            - "The fix changes only the generic adoption authority check and its focused tests; the exact USER operation grant and provider identity safeguards remain intact."
            - "The route and merge test fixtures represent declared operator external_write while semantic external_write remains forbidden; their positive cases pass and missing-declaration negative coverage remains."
          objective: "Preserve strict generic hosted PR adoption admission based on declared operator external_write and semantic network_read. Update only the two legacy adoption test fixtures to declare operator intent, and replace the obsolete negative assertion with a missing-declaration rejection."
          role: "EXECUTOR"
          verification_commands:
            - "git diff --check"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-task-authority.test.ts"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-task-authority.test.ts packages/agentplane/src/commands/pr/adoption-route.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
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
      -
        command_digest: "sha256:c646fe5b88affbff08b1ffb6aa0536e7aec5b2e88f833664e5e3e0ba7db847e1"
        id: "sha256:c1e0d5c801e63199d5d97a2df68419d7e8df47c718746eee17a7a3a854457bb0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c1e0d5c801e63199d5d97a2df68419d7e8df47c718746eee17a7a3a854457bb0"
        occurred_at: "2026-10-28T07:22:03.504Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610280651-3K1ERD"
        task_revision: 7
      -
        command_digest: "sha256:95fb0633f5c5c93bc37a56f63f5ff1aa1df06babd2f6de020c2e7cf5bfce71bb"
        id: "result:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1"
        occurred_at: "2026-10-28T07:22:20.347Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610280651-3K1ERD"
        task_revision: 8
      -
        command_digest: "sha256:3fa3c8984e90b36e6d8b68d1f29eb9ae72f9e7f2ca1a584fb5cf28d17a58c5ba"
        id: "kernel_work_item_inspection_required:sha256:38e766d943d698a2a2e89881c704ea4d5f4b5b0b8aea65766f21f6bad330a936:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:38e766d943d698a2a2e89881c704ea4d5f4b5b0b8aea65766f21f6bad330a936:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        occurred_at: "2026-10-28T07:22:32.269Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610280651-3K1ERD"
        task_revision: 9
      -
        command_digest: "sha256:c9ad44ca23591e5737ef3e536630e606af868e52986804c6d712cd342ffb0b56"
        id: "validation:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c788c6dd242b5f3598c8632402ccdf87a1a0be7d4b10e416fc7c6e7d5061c6c1"
        occurred_at: "2026-10-28T08:04:04.282Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610280651-3K1ERD"
        task_revision: 10
      -
        command_digest: "sha256:03d6546bf2640b233db67b6fe2a3b0e98a7cab131a164c3e12ff56631f4ac003"
        id: "validation-resolution:sha256:19920be7020692cae180288f7fc1f515981e01ad15b6464fa7d57f34da4da206:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:19920be7020692cae180288f7fc1f515981e01ad15b6464fa7d57f34da4da206"
        occurred_at: "2026-10-28T08:04:11.215Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610280651-3K1ERD"
        task_revision: 11
      -
        command_digest: "sha256:c518dcb208e59ee8a51cea6b7b2978368a6edaefd1a55d770f63b5ab8624234d"
        id: "kernel_work_item_rework_claim_required:sha256:81723fe7b6584c0e7b8048954171988b760a61c5fc95f778c0e2c597d70bdbd8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:81723fe7b6584c0e7b8048954171988b760a61c5fc95f778c0e2c597d70bdbd8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        occurred_at: "2026-10-28T08:04:23.298Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610280651-3K1ERD"
        task_revision: 12
      -
        command_digest: "sha256:70497020ba03d49b0d59fa39773caa35268a5513a92f1e1960f09c128125aca5"
        id: "kernel_work_item_execution_required:sha256:5cb6dc29646c3e9463d8e245add6499d017be2e0116c1e3723d64e72555a6450:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:5cb6dc29646c3e9463d8e245add6499d017be2e0116c1e3723d64e72555a6450:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        occurred_at: "2026-10-28T08:04:31.600Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610280651-3K1ERD"
        task_revision: 13
      -
        command_digest: "sha256:fa732f0c33e4f1fd3dadee2714aa9b01b5c6034b3e51edc3722f4f50c5b5d3ee"
        id: "semantic-stop:sha256:343616a75731c75452bccd3d52d95e97039b9d37cca7f7013e2337c2660418ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:343616a75731c75452bccd3d52d95e97039b9d37cca7f7013e2337c2660418ad"
        occurred_at: "2026-10-28T08:06:33.237Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610280651-3K1ERD"
        task_revision: 14
      -
        command_digest: "sha256:b9d43a69dadc76042f00a61a9f1efd2858e3abc1258cc523076c20282cc576ff"
        id: "scope-request:sha256:3aef078942933753205f9bb895f6b0c661cd84f375953ef9c6d3b5e5bc90c9fb:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:3aef078942933753205f9bb895f6b0c661cd84f375953ef9c6d3b5e5bc90c9fb"
        occurred_at: "2026-10-28T08:07:38.486Z"
        payload_digest: "sha256:beadda41c7dddf7111253ed4faa4eaa674a2c37549c1976b5b3bb0b34aa8b792"
        task_id: "202610280651-3K1ERD"
        task_revision: 15
      -
        command_digest: "sha256:464235924a4c51f146a9e2e83c2838aefedb39fa27a3048b34ad9c72ce4e9455"
        id: "result:sha256:54798d32135c8d0a66eed062076c75ca4a60b6b5a77e05d1624808e080e15f29:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:54798d32135c8d0a66eed062076c75ca4a60b6b5a77e05d1624808e080e15f29"
        occurred_at: "2026-10-28T08:09:42.373Z"
        payload_digest: "sha256:f5366bba6ab6611f87b0bbb42072fa32cb27cbbc2cb8bd4efa8eb37d903c08f7"
        task_id: "202610280651-3K1ERD"
        task_revision: 16
      -
        command_digest: "sha256:3dc660705e664fb9920f51565a1c59f77c3859d6b755afc0338ab085dfd69202"
        id: "sha256:85ccad62b109bfbcb45a3aaad2c14a81a587c65470311aea07f55ff06dd864f4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:85ccad62b109bfbcb45a3aaad2c14a81a587c65470311aea07f55ff06dd864f4"
        occurred_at: "2026-10-28T08:10:17.606Z"
        payload_digest: "sha256:40c0b24802b6177cde123e55ae92def16b76ae2a502406c9f691601bb29a9899"
        task_id: "202610280651-3K1ERD"
        task_revision: 17
      -
        command_digest: "sha256:92825db81ef02b2b91de2e28031f2cad626d5acf129a5dcf7511b01e4224a83f"
        id: "kernel_work_item_claim_required:sha256:9dadf374d9ee870b06fa9acadba5c9009dd30880fc7481519e7f10109e370808:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9dadf374d9ee870b06fa9acadba5c9009dd30880fc7481519e7f10109e370808:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        occurred_at: "2026-10-28T08:10:44.553Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610280651-3K1ERD"
        task_revision: 18
      -
        command_digest: "sha256:2eb73cccc5155d5fe3e5c69987bdd1aaaa9d1d422286b1e3530acbbe7b1e4f79"
        id: "kernel_work_item_execution_required:sha256:cc50e7eccc260c3cdbd9a383c1e1c6e1a4558409cfc6d58e63d4e867ed0181a8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cc50e7eccc260c3cdbd9a383c1e1c6e1a4558409cfc6d58e63d4e867ed0181a8:sha256:4608be67eac18be724daf730dd182c264e51fe392d65a6634899f0b2f251895b"
        occurred_at: "2026-10-28T08:10:53.289Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610280651-3K1ERD"
        task_revision: 19
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
