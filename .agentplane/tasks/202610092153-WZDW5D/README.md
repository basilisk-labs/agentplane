---
id: "202610092153-WZDW5D"
title: "Align full CI nested timeouts and lint memory budget for issue #6093"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-09T21:55:24.720Z"
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
    - "effect_ci"
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
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs"
      - "packages/agentplane/src/commands/task"
      - "scripts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs"
      - "packages/agentplane/src/commands/task"
      - "scripts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
          - "docs"
          - "packages/agentplane/src/commands/task"
          - "scripts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:24083f1fbe3916ee2c68eda6c8d62367a8ad99e5631200742363cdeff61a7374"
      escalation_reasons:
        - "effect_ci"
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
      - "repository_effect:ci"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-09T21:54:06.395Z"
doc_updated_by: "CODER"
description: "Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks."
sections:
  Summary: |-
    Align full CI nested timeouts and lint memory budget for issue #6093

    Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
  Scope: |-
    - In scope: Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
    - Out of scope: unrelated refactors not required for "Align full CI nested timeouts and lint memory budget for issue #6093".
  Plan: "1. Execute approved WorkItem align-full-ci-resource-profile."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align full CI nested timeouts and lint memory budget for issue #6093". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align full CI nested timeouts and lint memory budget for issue #6093". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and"
    base_sha: "f8df44c021e8cdfe38aa4eaedf9d8f86d441cad8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
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
            digest: "sha256:b64a0fe6152827675331d06bbbd170c6e0df6a7111fc9a5baab9acf2a8631890"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
        approval_evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
        digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts"
                - "packages/agentplane/src/commands/task"
                - "docs"
            expected_outputs:
              - "full-ci-resource-profile-evidence"
            id: "align-full-ci-resource-profile"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610092153-WZDW5D"
      intent_digest: "sha256:1b4bbec40e955c1585457c8ec67e6f39e9a9bd83fccf848b31b7a43d91f82cde"
      migration_receipts: []
      mutation_receipts:
        capture:202610092153-WZDW5D:
          after_revision: 1
          aggregate_digest: "sha256:fce050491d064fe18388897f659ff63d5ce873ad2f4e5d42b1026e3879a79914"
          before_revision: 0
          command_digest: "sha256:4ca9e066119b74186856b5a898ad944c15a72758cd5057a3ef3c989d61a9df81"
          effect_ids: []
          event_digests:
            - "sha256:6bad90be5a761ed253cf5d0cc35b354ceeac7d2ad8c4a86f3f1c4aa7c6823021"
          mutation_id: "capture:202610092153-WZDW5D"
        kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 5
          aggregate_digest: "sha256:18163e9bcaf5c76c52268ac7ba36624169c34c63cb94dd75b3b48578e7b3beb9"
          before_revision: 4
          command_digest: "sha256:c2a535e5ab5edc3607a58eb534f52708a0dd7856a3ea10535df5593aa3b71fe9"
          effect_ids: []
          event_digests:
            - "sha256:35ff4f82c6b09a964c2c3de203a3718cc78a33bf4a7ba97bb601a660528606f4"
          mutation_id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 6
          aggregate_digest: "sha256:01419f73ab68ab124e676946d71313a4f62eb77922adf7fab09e5e78d90fff79"
          before_revision: 5
          command_digest: "sha256:1532a434848b4c254289f3c01c97b3a5e62a55f015482f6bf03605c2b527a6f4"
          effect_ids: []
          event_digests:
            - "sha256:089b1ff335f120074cdf84eaa70417d0ff90fa6eb62937eeeb2a324fcd26ae0b"
          mutation_id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 4
          aggregate_digest: "sha256:a2f6a85f0b86f66370022654dd2d54c292c55c9128e9b4a443f8f28cdadac2da"
          before_revision: 3
          command_digest: "sha256:dcea20b8d1dea4998c5f479b186c352749f8e8d82effed634bf37adeb575e5a8"
          effect_ids: []
          event_digests:
            - "sha256:d33545cb096eeb8d7bc7b5359e60da8e3ec4a4aa30d7efd1283726663e82df2b"
          mutation_id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b:
          after_revision: 2
          aggregate_digest: "sha256:f5c071f272fb462feb64a3afe598983c8a542434ca5f06cac2a19e81bc7c41af"
          before_revision: 1
          command_digest: "sha256:3a479fa700c46f60bd21c4d99416ce7544f433cc9fd8bf4de4ff61210c1139e5"
          effect_ids: []
          event_digests:
            - "sha256:1eb11936cdca2b656185511f1def43acc8de2c8b965bedc35851c7799cac9f07"
          mutation_id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b"
        sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b:
          after_revision: 3
          aggregate_digest: "sha256:8609ab490f72b0ff8192ee07724c8536385b112b33c058fa2fbf6b27f8f8ce9d"
          before_revision: 2
          command_digest: "sha256:7d0f4ac5f38c821dc420a0ee5a2a1558a61c6365b7f7aac307fd790d1a209bd6"
          effect_ids: []
          event_digests:
            - "sha256:d5c883c3250ffe5a5d99244e820fb883eff64c482baa171ef3984ba59527b734"
          mutation_id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        align-full-ci-resource-profile:
          attempt: 1
          claim_id: "sha256:4b9f75f7b3b5e131015d11706918b1b0b8344f3ad852836f02f3c120948bc07e"
          definition:
            contract_digest: "sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts"
                - "packages/agentplane/src/commands/task"
                - "docs"
            expected_outputs:
              - "full-ci-resource-profile-evidence"
            id: "align-full-ci-resource-profile"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:a33b1aa11ddfacf7174103899ea1ac9404bbe1624ff395d5e22b1a6f099f0a8a"
    documents:
      contracts:
        sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121:
          acceptance_criteria:
            - "Inspect the native full-check deadline, local scheduler group timeout, ESLint heap behavior, and existing user overrides before changing defaults."
            - "Make the default inner full-CI deadline sufficient for the observed legitimate workload while finite and below the native outer default; preserve explicit shorter user budgets and report effective limit provenance before launch."
            - "Provide a bounded lint memory profile or lower lint memory demand without assuming that every host can allocate a larger heap; document prerequisites and supported overrides."
            - "Report timeout, out-of-memory, and assertion failures distinctly while retaining mixed group failures and all verification selections."
            - "Add focused tests for deadline precedence, an execution longer than the former 15-minute default using a simulated clock or budget comparison, memory selection, and failure classification; run the unchanged full regression."
            - "Do not change required checks, success criteria, release metadata, or security boundaries."
          objective: "Implement and document finite, coherent full-CI group and lint-memory budgets for issue #6093, preserving all selected checks and explicit shorter user limits."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/*resource*.test.mjs"
            - "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            - "bun run format:check"
            - "bun run ci:local:full"
      intent:
        context: "Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks."
        objective: "Align full CI nested timeouts and lint memory budget for issue #6093"
    events:
      -
        command_digest: "sha256:4ca9e066119b74186856b5a898ad944c15a72758cd5057a3ef3c989d61a9df81"
        id: "capture:202610092153-WZDW5D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610092153-WZDW5D"
        occurred_at: "2026-10-09T21:54:06.346Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610092153-WZDW5D"
        task_revision: 1
      -
        command_digest: "sha256:3a479fa700c46f60bd21c4d99416ce7544f433cc9fd8bf4de4ff61210c1139e5"
        id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b"
        occurred_at: "2026-10-09T21:55:08.115Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610092153-WZDW5D"
        task_revision: 2
      -
        command_digest: "sha256:7d0f4ac5f38c821dc420a0ee5a2a1558a61c6365b7f7aac307fd790d1a209bd6"
        id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b"
        occurred_at: "2026-10-09T21:55:17.899Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610092153-WZDW5D"
        task_revision: 3
      -
        command_digest: "sha256:dcea20b8d1dea4998c5f479b186c352749f8e8d82effed634bf37adeb575e5a8"
        id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:55:27.506Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610092153-WZDW5D"
        task_revision: 4
      -
        command_digest: "sha256:c2a535e5ab5edc3607a58eb534f52708a0dd7856a3ea10535df5593aa3b71fe9"
        id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:55:40.534Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610092153-WZDW5D"
        task_revision: 5
      -
        command_digest: "sha256:1532a434848b4c254289f3c01c97b3a5e62a55f015482f6bf03605c2b527a6f4"
        id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:57:36.097Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610092153-WZDW5D"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align full CI nested timeouts and lint memory budget for issue #6093

Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.

## Scope

- In scope: Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
- Out of scope: unrelated refactors not required for "Align full CI nested timeouts and lint memory budget for issue #6093".

## Plan

1. Execute approved WorkItem align-full-ci-resource-profile.

## Verify Steps

PLANNER fallback scaffold for "Align full CI nested timeouts and lint memory budget for issue #6093". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align full CI nested timeouts and lint memory budget for issue #6093". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
