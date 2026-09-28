---
id: "202609281457-R0XP40"
title: "Fix release candidate preparation order before 0.7.12 publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-28T14:59:54.427Z"
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
      - "task.verify"
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
      - "docs/releases"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "scripts/release/candidate-prepare.mjs"
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
      - "docs/releases"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "scripts/release/candidate-prepare.mjs"
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
          - "docs/releases"
          - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
          - "scripts/release/candidate-prepare.mjs"
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
      digest: "sha256:1f0b71209a62eaba34b006811e5dd9ed18ca684b90888ced8c70901067217cf2"
      escalation_reasons:
        - "central_component:scripts/release/candidate-prepare.mjs"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-28T14:57:56.695Z"
doc_updated_by: "CODER"
description: "User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository."
sections:
  Summary: |-
    Fix release candidate preparation order before 0.7.12 publication

    User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
  Scope: |-
    - In scope: User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
    - Out of scope: unrelated refactors not required for "Fix release candidate preparation order before 0.7.12 publication".
  Plan: "1. Execute approved WorkItem RC-01."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "81fc89167d9d7655bd29664849af6fa2eb4bb054"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:23c50a568d45b7d8b0e2b5239b7fe10a7af133943f295c45f56f57dc98fafeec"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1dead8667830388ace6c8691ef9cb3c9274c9b23a3acfdc0bc82d0539393e507"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/releases"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/release/candidate-prepare.mjs"
            task_id: "202609281457-R0XP40"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:1dead8667830388ace6c8691ef9cb3c9274c9b23a3acfdc0bc82d0539393e507"
        digest: "sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/release/candidate-prepare.mjs"
                - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            expected_outputs:
              - "candidate-wrapper-repair"
            id: "RC-01"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609281457-R0XP40"
      intent_digest: "sha256:57ddaf3c1bfcb5b5ba2f98b5b93f57d36503a7a526e5483d31f90199dbce22b7"
      migration_receipts: []
      mutation_receipts:
        capture:202609281457-R0XP40:
          after_revision: 1
          aggregate_digest: "sha256:b0b0da6b07486718175e343b1fd627e95441d4b11a83b76a7be6454fec70c504"
          before_revision: 0
          command_digest: "sha256:99b02188eefc435b34f27628736304262729cafc57575e0607239e62054af97a"
          effect_ids: []
          event_digests:
            - "sha256:59119943e93917fb7d6bc079332105d03a8ead5dd76db524cd6de739cc8d7ddf"
          mutation_id: "capture:202609281457-R0XP40"
        kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 5
          aggregate_digest: "sha256:e1aa66e0a430fd0041aaa3189eb3d084f798f9278a1f91288508a73b7a6b62b4"
          before_revision: 4
          command_digest: "sha256:feea386976030eb390cc639f0f7518d559942033a98485a4f73c4963676fc0f4"
          effect_ids: []
          event_digests:
            - "sha256:a99f30b32a31bd4d8da46f094d311366a230aa6460cfac70df307e6868fc5271"
          mutation_id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 6
          aggregate_digest: "sha256:205f7f53ae566e4ed23056db9323793cc0040629f6f252f8a6f7da9c94e05108"
          before_revision: 5
          command_digest: "sha256:539a2d7e163584558e463d9097bec851e0338d6c8131fb74dfc4347512139b70"
          effect_ids: []
          event_digests:
            - "sha256:53bdaa36a7d44cd753b76653f3edac19b2855e8f40f4d37b2910aa9adc30c291"
          mutation_id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 4
          aggregate_digest: "sha256:837fd7fc730004231016912dc7083f4b835a71b99ffa953beb27ad825626fd9b"
          before_revision: 3
          command_digest: "sha256:10297d451f44b80cb7b33196f8b6456a83bc65cf3d70a155e6196f8075a296ff"
          effect_ids: []
          event_digests:
            - "sha256:dc6ff24d2670ab8784b2b19eec98bae13653469b23483903e7e3c6a275e88b67"
          mutation_id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229:
          after_revision: 2
          aggregate_digest: "sha256:d049b50bf0909757fe4f88dc004158012d6913c20f9c33b467a81628220235ce"
          before_revision: 1
          command_digest: "sha256:43d984ab36e66df249c1bf16208be14814bfaeef4aaa6442b94f05c41b87e897"
          effect_ids: []
          event_digests:
            - "sha256:4a79b6a2ccb15a1fa57120ef8809548b347ba0b27485a1d94890fb1955d2df35"
          mutation_id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229"
        sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3:
          after_revision: 3
          aggregate_digest: "sha256:33d8f5abb76ab52a5694f55c5eb2f6843eec99db636e923d774cabff3df1c045"
          before_revision: 2
          command_digest: "sha256:1c99ec908ccbcf602fdb44947950e26693d812c3a6c55e881f51de9122232acd"
          effect_ids: []
          event_digests:
            - "sha256:202a30098bac5cb541cfe9eb466a0ca945d2bd8798dad5e166b2d355c289e6f8"
          mutation_id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        RC-01:
          attempt: 1
          claim_id: "sha256:51d26e9a4c5c3f12d972e01dbf4511a3db86882b85714e0492a6e0ffb00723b4"
          definition:
            contract_digest: "sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/release/candidate-prepare.mjs"
                - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            expected_outputs:
              - "candidate-wrapper-repair"
            id: "RC-01"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:711bd7dd25ba93865c068015714db3d5e4908a9fab5a4bf1d308256a1bec19a4"
    documents:
      contracts:
        sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4:
          acceptance_criteria:
            - "A regression test fails on the original wrapper because it changes version or tracked state before invoking native release candidate."
            - "The repaired wrapper invokes native candidate from the original clean version baseline and does not independently bump versions first."
            - "Explicit target mismatch, malformed planning output, invalid bump selection and push without --yes fail before candidate mutation. Dry-run and JSON inspection do not run commands."
            - "Registry, incident and prepublish checks are retained and existing release CI contract tests pass."
            - "Only the two authorized code/test paths change. No production publication or provider evidence is simulated."
          objective: "Repair scripts/release/candidate-prepare.mjs so the native release candidate command receives a clean tracked tree at the original release-plan version. Keep native ownership of version changes and commits. Validate an explicit --version against the actual planned next version before candidate mutation. Preserve task registry, incidents, registry availability and prepublish gates. Preserve --write dry-run behavior and --push --yes approval semantics. Add focused behavioral regression tests in the existing release CI contract test file. Use controlled local fixtures only. Do not run actual release lifecycle or network publication during this semantic episode. Return source and test evidence. Do not modify native preflight guards or GitHub repositories."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            - "bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            - "bun run typecheck"
      intent:
        context: "User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository."
        objective: "Fix release candidate preparation order before 0.7.12 publication"
    events:
      -
        command_digest: "sha256:99b02188eefc435b34f27628736304262729cafc57575e0607239e62054af97a"
        id: "capture:202609281457-R0XP40:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609281457-R0XP40"
        occurred_at: "2026-09-28T14:57:56.632Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609281457-R0XP40"
        task_revision: 1
      -
        command_digest: "sha256:43d984ab36e66df249c1bf16208be14814bfaeef4aaa6442b94f05c41b87e897"
        id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229"
        occurred_at: "2026-09-28T14:59:30.063Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609281457-R0XP40"
        task_revision: 2
      -
        command_digest: "sha256:1c99ec908ccbcf602fdb44947950e26693d812c3a6c55e881f51de9122232acd"
        id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3"
        occurred_at: "2026-09-28T14:59:44.548Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609281457-R0XP40"
        task_revision: 3
      -
        command_digest: "sha256:10297d451f44b80cb7b33196f8b6456a83bc65cf3d70a155e6196f8075a296ff"
        id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T14:59:59.854Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609281457-R0XP40"
        task_revision: 4
      -
        command_digest: "sha256:feea386976030eb390cc639f0f7518d559942033a98485a4f73c4963676fc0f4"
        id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T15:00:18.944Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609281457-R0XP40"
        task_revision: 5
      -
        command_digest: "sha256:539a2d7e163584558e463d9097bec851e0338d6c8131fb74dfc4347512139b70"
        id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T15:01:11.014Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609281457-R0XP40"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix release candidate preparation order before 0.7.12 publication

User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.

## Scope

- In scope: User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
- Out of scope: unrelated refactors not required for "Fix release candidate preparation order before 0.7.12 publication".

## Plan

1. Execute approved WorkItem RC-01.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
