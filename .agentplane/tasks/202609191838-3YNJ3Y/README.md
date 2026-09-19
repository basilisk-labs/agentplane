---
id: "202609191838-3YNJ3Y"
title: "Repair ACR native identity and release real-E2E fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "real-e2e"
  - "release-0.7.10"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run format:check"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
  - "git diff --check"
  - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
  - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
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
doc_updated_at: "2026-09-19T18:38:48.063Z"
doc_updated_by: "CODER"
description: "Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch."
sections:
  Summary: |-
    Repair ACR native identity and release real-E2E fixtures

    Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
  Scope: |-
    - In scope: Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
    - Out of scope: unrelated refactors not required for "Repair ACR native identity and release real-E2E fixtures".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair ACR native identity and release real-E2E fixtures". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair ACR native identity and release real-E2E fixtures". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "ef8068df34a264d6eccc51190b4f6e3c43d27ab8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3bdee1692c903f412816c12c65fdc3f5fa0d20723ca777947028f62c8bc2f306"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
        digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "command_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "schemas/acr-v0.1.schema.json"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              scope_roots:
                - "packages/agentplane/src/commands/acr/generate.ts"
                - "packages/agentplane/src/commands/acr/summary.ts"
                - "packages/agentplane/src/commands/acr/acr.command.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
                - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            expected_outputs:
              - "acr-extension-repair"
              - "fixture-repairs"
              - "verification-evidence"
            id: "repair-acr-and-real-e2e"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609191838-3YNJ3Y"
      intent_digest: "sha256:5e5f4c58b7ffa5d06198f256ae61fcd4fecf91ec5d3684a689f4cde3f5ba7f1b"
      migration_receipts: []
      mutation_receipts:
        capture:202609191838-3YNJ3Y:
          after_revision: 1
          aggregate_digest: "sha256:be49475795949c626a7b4f27c2d2144736e09acf824b5d2e4e363a5f3e3cc963"
          before_revision: 0
          command_digest: "sha256:bb93d6c4e7d2e79f968a44a8394b41eafe857feed98b09afd702a61b58e3911a"
          effect_ids: []
          event_digests:
            - "sha256:1f7dfcdaef0fa3b9327752cc40f24a151fc9f862307c1ab86f155fa0b6465f1c"
          mutation_id: "capture:202609191838-3YNJ3Y"
        kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 5
          aggregate_digest: "sha256:c424bbe4c1d5482d2cc600b5e51ce3ad79f99f828b90071b36fea9e62d506e14"
          before_revision: 4
          command_digest: "sha256:5b00d52b0438449c0fdc1ce5e692656588ea580acec36b770cc1913457f4f192"
          effect_ids: []
          event_digests:
            - "sha256:58e3468508f2458a1633ae634005e97cc9bead89e9a58552aaeddfb140688c13"
          mutation_id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 6
          aggregate_digest: "sha256:c12076aecfbba2252e102f5da543f1f9874c42c14c5a067a7676ab0e90d06db4"
          before_revision: 5
          command_digest: "sha256:fd0f038754463a513442ab2a44ddf17c75d15d1d60e64d274a50a92cc60fcfbe"
          effect_ids: []
          event_digests:
            - "sha256:09adac581d3420131630bca02363d7083a56e2ac166f6fb05b095ff8c3eb631d"
          mutation_id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 4
          aggregate_digest: "sha256:f6a1e041e3ee2a355073f5395c6c528dc1a563f07a6ffbc170102aaf456e3d0f"
          before_revision: 3
          command_digest: "sha256:08ad0817c2fc1ca27f9dbadd0f2da6e6c475e65625e210fc4c9571ea096dd086"
          effect_ids: []
          event_digests:
            - "sha256:73f8e1d3d584db0285a50fcc9dbaead90abf6a529fd158f172378b47a106fb69"
          mutation_id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f:
          after_revision: 2
          aggregate_digest: "sha256:42abe8f09e5a4ee6141adc3522a82bc81b3fcaeffc71c1c4ddf42c5c7f471b0d"
          before_revision: 1
          command_digest: "sha256:ad91b55b3ff2344a827f5400ec3f512cd5673e515c0e106aa2533e2337800946"
          effect_ids: []
          event_digests:
            - "sha256:f9392113f8a285a87ec3b727955723b5d773e0b50a6e305053897eb683f0b3d1"
          mutation_id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f"
        sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e:
          after_revision: 3
          aggregate_digest: "sha256:845982ba07c467a5adff7e69594182da33b7acf5f5f1df2aa05fd8cf68cb4007"
          before_revision: 2
          command_digest: "sha256:a4135de041bd6cc45c5f307a068191ef4c06452c620bfd3ee86f5dbb554ad453"
          effect_ids: []
          event_digests:
            - "sha256:3c9ff38818d19489156885d4144bca99b9c15ff9fefd40b5e41bdf2077500a0d"
          mutation_id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-acr-and-real-e2e:
          attempt: 1
          claim_id: "sha256:bf3d248519b2d5b12c26bca82cda90eabb917ac68d1d2fd0970db6f4b82c461a"
          definition:
            contract_digest: "sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "command_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "schemas/acr-v0.1.schema.json"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              scope_roots:
                - "packages/agentplane/src/commands/acr/generate.ts"
                - "packages/agentplane/src/commands/acr/summary.ts"
                - "packages/agentplane/src/commands/acr/acr.command.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
                - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            expected_outputs:
              - "acr-extension-repair"
              - "fixture-repairs"
              - "verification-evidence"
            id: "repair-acr-and-real-e2e"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:365e6c0c2a3279ba6891af2b0748938925660fe5674ae63678a48bee5f9b7dc3"
    documents:
      contracts:
        sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf:
          acceptance_criteria:
            - "Generated ACRs with native identity validate against ACR v0.1 and use agentplane.native-identity."
            - "ACR summary reads both the schema-valid key and the legacy underscore key."
            - "Hosted-close fixtures materialize completed canonical work items and all focused tests pass."
            - "The packaged mixed-scope fixture does not invoke task doc set and both release real-E2E scenarios pass together."
          objective: "Generate native identity under the schema-valid agentplane.native-identity ACR extension key, retain summary compatibility with the legacy underscore spelling, and repair the hosted-close and packaged mixed-scope fixtures without weakening lifecycle checks."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
            - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch."
        objective: "Repair ACR native identity and release real-E2E fixtures"
    events:
      -
        command_digest: "sha256:bb93d6c4e7d2e79f968a44a8394b41eafe857feed98b09afd702a61b58e3911a"
        id: "capture:202609191838-3YNJ3Y:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609191838-3YNJ3Y"
        occurred_at: "2026-09-19T18:38:48.029Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 1
      -
        command_digest: "sha256:ad91b55b3ff2344a827f5400ec3f512cd5673e515c0e106aa2533e2337800946"
        id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f"
        occurred_at: "2026-09-19T18:39:49.978Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 2
      -
        command_digest: "sha256:a4135de041bd6cc45c5f307a068191ef4c06452c620bfd3ee86f5dbb554ad453"
        id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e"
        occurred_at: "2026-09-19T18:39:59.255Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 3
      -
        command_digest: "sha256:08ad0817c2fc1ca27f9dbadd0f2da6e6c475e65625e210fc4c9571ea096dd086"
        id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:06.729Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 4
      -
        command_digest: "sha256:5b00d52b0438449c0fdc1ce5e692656588ea580acec36b770cc1913457f4f192"
        id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:10.432Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 5
      -
        command_digest: "sha256:fd0f038754463a513442ab2a44ddf17c75d15d1d60e64d274a50a92cc60fcfbe"
        id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:28.309Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair ACR native identity and release real-E2E fixtures

Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.

## Scope

- In scope: Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
- Out of scope: unrelated refactors not required for "Repair ACR native identity and release real-E2E fixtures".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Repair ACR native identity and release real-E2E fixtures". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair ACR native identity and release real-E2E fixtures". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
