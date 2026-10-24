---
id: "202610240900-3G83E0"
title: "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13"
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
risk_flags:
  - "merge"
  - "network"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T09:02:56.662Z"
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
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
      - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
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
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
      - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
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
    - "effect_security_boundary"
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
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
          - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:a2684bf4d813afb84964faec67e66b1304a6a96299228c90efed94d570292446"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-24T09:01:10.384Z"
doc_updated_by: "CODER"
description: "The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity."
sections:
  Summary: |-
    Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13

    The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.
  Scope: |-
    - In scope: The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.
    - Out of scope: unrelated refactors not required for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13".
  Plan: "1. Execute approved WorkItem update-vitest5-anchor-projection."
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "5a1c1dda6693966e934193a8ec05a3604648cf3e"
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
            digest: "sha256:ad28ac57fcc7446ebe16b6289562989c1b1f76fdd864957d1d54fc399aab11b2"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:fbb0e6f9b24d400f7a31b106cf92ff20d2345ac82304efb7f524394bba215572"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:3ae28382588b3298ee50e5cb31ad7961933a9a479675772e7626837f3a399386"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
              - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
            task_id: "202610240900-3G83E0"
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
        approval_evidence_digest: "sha256:3ae28382588b3298ee50e5cb31ad7961933a9a479675772e7626837f3a399386"
        digest: "sha256:fbb0e6f9b24d400f7a31b106cf92ff20d2345ac82304efb7f524394bba215572"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:33b663e9b390519783f89542494dc59c8a7748db108cb7242e5e4bb6462e8e41"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
            expected_outputs:
              - "exact-vitest5-lock-projection"
              - "critical-lock-regression-evidence"
            id: "update-vitest5-anchor-projection"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610240900-3G83E0"
      intent_digest: "sha256:59a46b953547cd5f83753735664f4eebf81032547f175e6910c410f8121479ab"
      migration_receipts: []
      mutation_receipts:
        capture:202610240900-3G83E0:
          after_revision: 1
          aggregate_digest: "sha256:ab1123404941eabc8d4cfe100e3f8900b61c7e1cc9f725abf5a0e4758b8cb1f4"
          before_revision: 0
          command_digest: "sha256:6e5bebd20780a417e2f0fed7375a67d0ad4a0065d03f685c4e5c3e045aa00642"
          effect_ids: []
          event_digests:
            - "sha256:4d70cf154c5b8709e13454b2b8c118c9f2135296f0aa0b05f19230e4dbc39a14"
          mutation_id: "capture:202610240900-3G83E0"
        kernel_work_item_claim_required:sha256:9bf769d6a2354a7a12abc891ce1941f5d286435bf110204534c1272ec101beb9:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 5
          aggregate_digest: "sha256:cd2b54791f26ec0ecee58bb40299f384470308d14c3d00e8d85ab2c11eff98e6"
          before_revision: 4
          command_digest: "sha256:cd3cb74589efde04081f5b8f05660496566afd7926b9b5c3cce1420ce3a69009"
          effect_ids: []
          event_digests:
            - "sha256:cbb465da51463431aec9da1ecd5dc6807a3808a62741b8c738cfa4b14b18aff7"
          mutation_id: "kernel_work_item_claim_required:sha256:9bf769d6a2354a7a12abc891ce1941f5d286435bf110204534c1272ec101beb9:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        kernel_work_item_execution_required:sha256:ced4738575ffb1f2b4aa4197e47b0898c264a4a15cae2c3f9908d4ffa6092992:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 6
          aggregate_digest: "sha256:f4ecc2891b092446625ae1b009c0f175a57c1fa4ab7674d78db4792e69d5cd4a"
          before_revision: 5
          command_digest: "sha256:086196894ce9f9a73dc6030712fa0800308784d4efd0a5803b645a5e54635ecf"
          effect_ids: []
          event_digests:
            - "sha256:dd7692939554e3fcb7f58abdcb486afc8eca5d963dcd93f35c22a8a912c7c78c"
          mutation_id: "kernel_work_item_execution_required:sha256:ced4738575ffb1f2b4aa4197e47b0898c264a4a15cae2c3f9908d4ffa6092992:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        kernel_work_item_materialization_required:sha256:62effe2730f6fcca771a47a525768fe8adff5f1f6a1b683e798ca7daf5f59c7a:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 4
          aggregate_digest: "sha256:0bd333eed3678b1befc3bdac5aed01a58115958c5c9b78a03f3d41922b21a6c1"
          before_revision: 3
          command_digest: "sha256:72485b22677718ee9d81b73071687eb2a5520fdbff64bca79f29d450f37ce135"
          effect_ids: []
          event_digests:
            - "sha256:88d2906e598342c2bcf34725a50abe4b28f3b3648a0f17361c6556c84524d369"
          mutation_id: "kernel_work_item_materialization_required:sha256:62effe2730f6fcca771a47a525768fe8adff5f1f6a1b683e798ca7daf5f59c7a:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        result:sha256:4f0507a7b57f137848dcf515af7eecdc84d6d0daf9698be9976e82c9180aa328:
          after_revision: 2
          aggregate_digest: "sha256:0ed81f44cc00ce70c8ff5a5970a6ceea482844cb6af17ab81643dfe81ee46eae"
          before_revision: 1
          command_digest: "sha256:d2d0d11fffc2bddc7bf919da3b561df5da763bfb7e16e5ce37b1a7ae2d625914"
          effect_ids: []
          event_digests:
            - "sha256:4b2f21b40a2d16b8c737d91843b11f9bb0f3d7420c9e6f8577798843dc3c5d10"
          mutation_id: "result:sha256:4f0507a7b57f137848dcf515af7eecdc84d6d0daf9698be9976e82c9180aa328"
        sha256:332ac05135a1c3f8a439236cd33c8741f93e5b88204401730012aff945af94fa:
          after_revision: 3
          aggregate_digest: "sha256:581cf67a667c61d930fb8a8b8720a9cb8cfbd3420ac8705ab371610d8e9624f1"
          before_revision: 2
          command_digest: "sha256:bfbaffc73bc622904f4fca1a4f7e8deaaad157863edfe468600574ff60e1c692"
          effect_ids: []
          event_digests:
            - "sha256:d89265aec26525d42a7c18ea3ee30a954e1d576cf2d58583e836937a73c0a8d0"
          mutation_id: "sha256:332ac05135a1c3f8a439236cd33c8741f93e5b88204401730012aff945af94fa"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        update-vitest5-anchor-projection:
          attempt: 1
          claim_id: "sha256:62c92e17cbf9c71162e91468006a95863e3d0207c937480761bcdcd0a7e2403b"
          definition:
            contract_digest: "sha256:33b663e9b390519783f89542494dc59c8a7748db108cb7242e5e4bb6462e8e41"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
            expected_outputs:
              - "exact-vitest5-lock-projection"
              - "critical-lock-regression-evidence"
            id: "update-vitest5-anchor-projection"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:0426d14d3e43af0750669a0a522311feed7dbffef16affc76054ba184585ce3c"
    documents:
      contracts:
        sha256:33b663e9b390519783f89542494dc59c8a7748db108cb7242e5e4bb6462e8e41:
          acceptance_criteria:
            - "The exact historical 4.1.9 subject and current reviewed 5.0.5 driver graph pass without mutation."
            - "Any changed pin, package integrity, registry, metadata, missing or added package, or unrelated lock entry fails closed with ANCHOR_LOCK_MISMATCH."
            - "The critical test file and native full CI pass; independent review assesses the exact security projection."
          objective: "Update only the frozen Vitest security lock projection and its critical fixture for the exact reviewed 5.0.5 graph, including package additions and removals. Keep the historical subject, anchor identity and whole-lock equality unchanged."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-anchor-lock.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity."
        objective: "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13"
    events:
      -
        command_digest: "sha256:6e5bebd20780a417e2f0fed7375a67d0ad4a0065d03f685c4e5c3e045aa00642"
        id: "capture:202610240900-3G83E0:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610240900-3G83E0"
        occurred_at: "2026-10-24T09:01:10.308Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610240900-3G83E0"
        task_revision: 1
      -
        command_digest: "sha256:d2d0d11fffc2bddc7bf919da3b561df5da763bfb7e16e5ce37b1a7ae2d625914"
        id: "result:sha256:4f0507a7b57f137848dcf515af7eecdc84d6d0daf9698be9976e82c9180aa328:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4f0507a7b57f137848dcf515af7eecdc84d6d0daf9698be9976e82c9180aa328"
        occurred_at: "2026-10-24T09:02:02.020Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610240900-3G83E0"
        task_revision: 2
      -
        command_digest: "sha256:bfbaffc73bc622904f4fca1a4f7e8deaaad157863edfe468600574ff60e1c692"
        id: "sha256:332ac05135a1c3f8a439236cd33c8741f93e5b88204401730012aff945af94fa:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:332ac05135a1c3f8a439236cd33c8741f93e5b88204401730012aff945af94fa"
        occurred_at: "2026-10-24T09:02:48.564Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610240900-3G83E0"
        task_revision: 3
      -
        command_digest: "sha256:72485b22677718ee9d81b73071687eb2a5520fdbff64bca79f29d450f37ce135"
        id: "kernel_work_item_materialization_required:sha256:62effe2730f6fcca771a47a525768fe8adff5f1f6a1b683e798ca7daf5f59c7a:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:62effe2730f6fcca771a47a525768fe8adff5f1f6a1b683e798ca7daf5f59c7a:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T09:03:04.456Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610240900-3G83E0"
        task_revision: 4
      -
        command_digest: "sha256:cd3cb74589efde04081f5b8f05660496566afd7926b9b5c3cce1420ce3a69009"
        id: "kernel_work_item_claim_required:sha256:9bf769d6a2354a7a12abc891ce1941f5d286435bf110204534c1272ec101beb9:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9bf769d6a2354a7a12abc891ce1941f5d286435bf110204534c1272ec101beb9:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T09:03:24.732Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610240900-3G83E0"
        task_revision: 5
      -
        command_digest: "sha256:086196894ce9f9a73dc6030712fa0800308784d4efd0a5803b645a5e54635ecf"
        id: "kernel_work_item_execution_required:sha256:ced4738575ffb1f2b4aa4197e47b0898c264a4a15cae2c3f9908d4ffa6092992:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ced4738575ffb1f2b4aa4197e47b0898c264a4a15cae2c3f9908d4ffa6092992:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T09:04:25.191Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610240900-3G83E0"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13

The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.

## Scope

- In scope: The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.
- Out of scope: unrelated refactors not required for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13".

## Plan

1. Execute approved WorkItem update-vitest5-anchor-projection.

## Verify Steps

PLANNER fallback scaffold for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
