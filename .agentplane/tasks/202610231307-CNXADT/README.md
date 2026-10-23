---
id: "202610231307-CNXADT"
title: "Exclude JavaScript test files from clone detection without changing the clone baseline"
status: "DOING"
priority: "high"
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
  - "bun run clone:check"
  - "bunx vitest run packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-23T13:08:31.301Z"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
      - "scripts/checks/check-clone-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
      - "scripts/checks/check-clone-baseline.mjs"
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
          - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
          - "scripts/checks/check-clone-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:7e792f1e170a2bef2985760389bfe62521c964385da032800d78b31958dddcf6"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
        - "central_component:scripts/checks/check-clone-baseline.mjs"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-23T13:07:34.488Z"
doc_updated_by: "CODER"
description: "For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge."
sections:
  Summary: |-
    Exclude JavaScript test files from clone detection without changing the clone baseline

    For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.
  Scope: |-
    - In scope: For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.
    - Out of scope: unrelated refactors not required for "Exclude JavaScript test files from clone detection without changing the clone baseline".
  Plan: "1. Execute approved WorkItem scanner-fix."
  Verify Steps: |-
    PLANNER fallback scaffold for "Exclude JavaScript test files from clone detection without changing the clone baseline". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Exclude JavaScript test files from clone detection without changing the clone baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "39c5ed946a445d108f2be402c1382cc9204a311b"
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
            digest: "sha256:c95b198d28f230220a29a8fed8cd56dd9a2a7cffe14ea3a1c2a94b91c7aa4bf7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3fb4f4bd03248608258f69c97dc571db64bc085df17c8489b9fc802d7e1fd0f1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:3a539a72ec2870e1f8fc64ba9fd8b6bfb3d601228f21741a8dfbf4703745559b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
              - "scripts/checks/check-clone-baseline.mjs"
            task_id: "202610231307-CNXADT"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:3a539a72ec2870e1f8fc64ba9fd8b6bfb3d601228f21741a8dfbf4703745559b"
        digest: "sha256:3fb4f4bd03248608258f69c97dc571db64bc085df17c8489b9fc802d7e1fd0f1"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:14d13c1032b17c0435dfea8e90e984be9321733a9481edd3bd5e6a8ca94cde3c"
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
                - "scripts/checks/check-clone-baseline.mjs"
                - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
            expected_outputs:
              - "clone scanner ignores JavaScript test/spec files while retaining ordinary JavaScript files"
              - "regression coverage for ignore contract and non-test scanning"
              - "unchanged clone baseline and threshold"
            id: "scanner-fix"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610231307-CNXADT"
      intent_digest: "sha256:b181186fdebd75a194eae3cfe5df54a2a255263bcc87ba06d54ea445fecd0d6e"
      migration_receipts: []
      mutation_receipts:
        capture:202610231307-CNXADT:
          after_revision: 1
          aggregate_digest: "sha256:98223158d7962d24cb24dfb68cfddd28ca058a2c1d98af163420a6d89a2c88b1"
          before_revision: 0
          command_digest: "sha256:fb19ef6ae419fcdbfe2780e57ba4c562e6edf08e89591a867a82a598ee73f858"
          effect_ids: []
          event_digests:
            - "sha256:e47a0ef4ad7e3fd71ff864648908e2ed2cf0b39cf4b4b9e246c84d296d07f9b0"
          mutation_id: "capture:202610231307-CNXADT"
        kernel_work_item_claim_required:sha256:e13b89e3713eb797b5e63e6af877501c9c3231cfd9700afe9bd349cdf85d7830:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:
          after_revision: 5
          aggregate_digest: "sha256:edaae6f3e086b9cf0b9ec6a43e11835948522aa1152d36da265aa70ebf1c97b5"
          before_revision: 4
          command_digest: "sha256:d2b06c40e6ea8d3d50aee5da8a6264d403b0731ee039abf996703e629fb3a666"
          effect_ids: []
          event_digests:
            - "sha256:e56988f61fb872ff97e8b8df9d319ca11892214238646e27aef30c131301c666"
          mutation_id: "kernel_work_item_claim_required:sha256:e13b89e3713eb797b5e63e6af877501c9c3231cfd9700afe9bd349cdf85d7830:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        kernel_work_item_execution_required:sha256:be2d5196ae27242c74f6c6ef461da7523ebbbf95e3f8a5114c3b3058d6c63d2b:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:
          after_revision: 6
          aggregate_digest: "sha256:bed4e2df8ca80c249be19e6f9a847c7ca24bc77c5569f3580cf81ee84b196e41"
          before_revision: 5
          command_digest: "sha256:eb40588f1703614613371991ce9d76fc41b90594167d0edb0e823927020d66bd"
          effect_ids: []
          event_digests:
            - "sha256:775694880ef69119411da25e35346cd452f79fdc90705e376c736fffbe853e93"
          mutation_id: "kernel_work_item_execution_required:sha256:be2d5196ae27242c74f6c6ef461da7523ebbbf95e3f8a5114c3b3058d6c63d2b:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        kernel_work_item_materialization_required:sha256:a71d0dc2b6c079b2869cf738ac9dac21839b0aa65d720497243be778e4668505:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:
          after_revision: 4
          aggregate_digest: "sha256:467d38a44b80c946405d1aad3a2bec751b704c433737100ea8ae2cc7ed06d943"
          before_revision: 3
          command_digest: "sha256:3a14d278c6119925ebf5317d1ed4dc4d521ad9b8231013fb81b4ae703a1d7c74"
          effect_ids: []
          event_digests:
            - "sha256:f502c43644a9cab76f97aed0fb3d3e77f91cff5fa70a8710b1cbdb5fd1d55220"
          mutation_id: "kernel_work_item_materialization_required:sha256:a71d0dc2b6c079b2869cf738ac9dac21839b0aa65d720497243be778e4668505:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        result:sha256:3a63be63468dfa7bf2ad7ae3d449e00a07468aa93f8f057b4e90f3725287f507:
          after_revision: 2
          aggregate_digest: "sha256:dc1cae8376ae43ef1741cc1401c0b18097f2e0521e0858ee68c49f04fee45e8f"
          before_revision: 1
          command_digest: "sha256:3b7ff21b94dd9f8c4ff4dc51363eca7655f964ee29809a66e41b9353a2a9d524"
          effect_ids: []
          event_digests:
            - "sha256:3703ca6ef2a3a22900848beb0e8f919e7bfe9d594a0459392e0cffa4cfd8dfd9"
          mutation_id: "result:sha256:3a63be63468dfa7bf2ad7ae3d449e00a07468aa93f8f057b4e90f3725287f507"
        sha256:896305a52193b9cbf3d3f04127c2b5d6c5675fc5cb66667fd98cc948e4b68f99:
          after_revision: 3
          aggregate_digest: "sha256:09e60ac8d503f52889f287bead360827b1bb3f39cdcc265a8b2eb2ac7456c976"
          before_revision: 2
          command_digest: "sha256:5f19768e480a776d00787d77f1ca434f4e4aa05634fdb379cd375d724822092f"
          effect_ids: []
          event_digests:
            - "sha256:a156ae3ca724be652e7763863baadc76c30bb82bb4f4f44b601d9e1eb7ba3cec"
          mutation_id: "sha256:896305a52193b9cbf3d3f04127c2b5d6c5675fc5cb66667fd98cc948e4b68f99"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        scanner-fix:
          attempt: 1
          claim_id: "sha256:7137dff90395c1e39ed8eebcc251db58871ff122e95464e4ebe31b660f1cd702"
          definition:
            contract_digest: "sha256:14d13c1032b17c0435dfea8e90e984be9321733a9481edd3bd5e6a8ca94cde3c"
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
                - "scripts/checks/check-clone-baseline.mjs"
                - "packages/agentplane/src/cli/check-clone-baseline-script.test.ts"
            expected_outputs:
              - "clone scanner ignores JavaScript test/spec files while retaining ordinary JavaScript files"
              - "regression coverage for ignore contract and non-test scanning"
              - "unchanged clone baseline and threshold"
            id: "scanner-fix"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:c85e1e9337868f5ed765c674509c1474053261217a66a30214a59fa1e8f22828"
    documents:
      contracts:
        sha256:14d13c1032b17c0435dfea8e90e984be9321733a9481edd3bd5e6a8ca94cde3c:
          acceptance_criteria:
            - "The jscpd invocation excludes JS/MJS test and spec suffixes in the same way as TS/TSX tests."
            - "A meaningful regression proves test files are omitted and ordinary JS/MJS files remain eligible for clone detection."
            - "The baseline file and clone metric comparison are unchanged."
            - "Clone guard and exact-head full regression pass before PR merge."
          objective: "Extend the generic jscpd ignore list for .test/.spec.js and .test/.spec.mjs. Keep ordinary js/mjs scanned, and do not edit the baseline or weaken clone thresholds."
          role: "EXECUTOR"
          verification_commands:
            - "bun run clone:check"
            - "bun run ci:local:full"
      intent:
        context: "For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge."
        objective: "Exclude JavaScript test files from clone detection without changing the clone baseline"
    events:
      -
        command_digest: "sha256:fb19ef6ae419fcdbfe2780e57ba4c562e6edf08e89591a867a82a598ee73f858"
        id: "capture:202610231307-CNXADT:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610231307-CNXADT"
        occurred_at: "2026-10-23T13:07:34.362Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610231307-CNXADT"
        task_revision: 1
      -
        command_digest: "sha256:3b7ff21b94dd9f8c4ff4dc51363eca7655f964ee29809a66e41b9353a2a9d524"
        id: "result:sha256:3a63be63468dfa7bf2ad7ae3d449e00a07468aa93f8f057b4e90f3725287f507:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:3a63be63468dfa7bf2ad7ae3d449e00a07468aa93f8f057b4e90f3725287f507"
        occurred_at: "2026-10-23T13:08:16.383Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610231307-CNXADT"
        task_revision: 2
      -
        command_digest: "sha256:5f19768e480a776d00787d77f1ca434f4e4aa05634fdb379cd375d724822092f"
        id: "sha256:896305a52193b9cbf3d3f04127c2b5d6c5675fc5cb66667fd98cc948e4b68f99:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:896305a52193b9cbf3d3f04127c2b5d6c5675fc5cb66667fd98cc948e4b68f99"
        occurred_at: "2026-10-23T13:08:24.590Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610231307-CNXADT"
        task_revision: 3
      -
        command_digest: "sha256:3a14d278c6119925ebf5317d1ed4dc4d521ad9b8231013fb81b4ae703a1d7c74"
        id: "kernel_work_item_materialization_required:sha256:a71d0dc2b6c079b2869cf738ac9dac21839b0aa65d720497243be778e4668505:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a71d0dc2b6c079b2869cf738ac9dac21839b0aa65d720497243be778e4668505:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        occurred_at: "2026-10-23T13:08:34.564Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610231307-CNXADT"
        task_revision: 4
      -
        command_digest: "sha256:d2b06c40e6ea8d3d50aee5da8a6264d403b0731ee039abf996703e629fb3a666"
        id: "kernel_work_item_claim_required:sha256:e13b89e3713eb797b5e63e6af877501c9c3231cfd9700afe9bd349cdf85d7830:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e13b89e3713eb797b5e63e6af877501c9c3231cfd9700afe9bd349cdf85d7830:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        occurred_at: "2026-10-23T13:08:44.796Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610231307-CNXADT"
        task_revision: 5
      -
        command_digest: "sha256:eb40588f1703614613371991ce9d76fc41b90594167d0edb0e823927020d66bd"
        id: "kernel_work_item_execution_required:sha256:be2d5196ae27242c74f6c6ef461da7523ebbbf95e3f8a5114c3b3058d6c63d2b:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:be2d5196ae27242c74f6c6ef461da7523ebbbf95e3f8a5114c3b3058d6c63d2b:sha256:7a24ba0213ed8a51ca5e337da956bf0f213a6adfaf3abcfe629ee7491755ec9b"
        occurred_at: "2026-10-23T13:09:22.200Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610231307-CNXADT"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Exclude JavaScript test files from clone detection without changing the clone baseline

For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.

## Scope

- In scope: For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.
- Out of scope: unrelated refactors not required for "Exclude JavaScript test files from clone detection without changing the clone baseline".

## Plan

1. Execute approved WorkItem scanner-fix.

## Verify Steps

PLANNER fallback scaffold for "Exclude JavaScript test files from clone detection without changing the clone baseline". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Exclude JavaScript test files from clone detection without changing the clone baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
