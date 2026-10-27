---
id: "202610262005-459E82"
title: "Require supported Node versions for tsup 9 development"
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
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T20:07:14.722Z"
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
    - "effect_dependencies"
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
      - "dependencies"
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
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "package.json"
      - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "dependencies"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "package.json"
      - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
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
          - "package.json"
          - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:de77e53380ff1e24e93d190fae3b62f07ec031f4d49f815a64e00b6bcb9ff6a2"
      escalation_reasons:
        - "central_component:package.json"
        - "effect_dependencies"
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
      - "repository_effect:dependencies"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-26T20:05:33.083Z"
doc_updated_by: "CODER"
description: "Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged."
sections:
  Summary: |-
    Require supported Node versions for tsup 9 development

    Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.
  Scope: |-
    - In scope: Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.
    - Out of scope: unrelated refactors not required for "Require supported Node versions for tsup 9 development".
  Plan: "1. Execute approved WorkItem tsup9-root-node-engine."
  Verify Steps: |-
    PLANNER fallback scaffold for "Require supported Node versions for tsup 9 development". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Require supported Node versions for tsup 9 development". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "5f3abf24da208b10a3552a869e09ecdb58272e99"
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
            digest: "sha256:2929ed2de9b2b9f88b9ab36c387fa7ea974a4f8743a601f5bf1ebdd81d430405"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a387760ceea126586a5aef4a24e6b7e7bf5c8a9fa71bfc08b1fe6c5523423395"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f32a02523c699f9b0bc33cda4599bb1dc0f9ad9c7e6ddbfb7475883cc8db0af"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "dependencies"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "package.json"
              - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
            task_id: "202610262005-459E82"
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
        approval_evidence_digest: "sha256:0f32a02523c699f9b0bc33cda4599bb1dc0f9ad9c7e6ddbfb7475883cc8db0af"
        digest: "sha256:a387760ceea126586a5aef4a24e6b7e7bf5c8a9fa71bfc08b1fe6c5523423395"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0075611a22e11683e5fc630d774ba68ccc375bb68a878e186f75441fbb238114"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "dependencies"
              resources: []
              scope_roots:
                - "package.json"
                - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
            expected_outputs:
              - "root-engine-range"
              - "node-engine-contract-test"
            id: "tsup9-root-node-engine"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610262005-459E82"
      intent_digest: "sha256:b6f36132d13bbcedcd74b3136eac123b58aad46fc0e448ddb05c2f500fbcff1c"
      migration_receipts: []
      mutation_receipts:
        capture:202610262005-459E82:
          after_revision: 1
          aggregate_digest: "sha256:13864972aa118a726bbaa3337e8c3d2b204782d0ca70db02add592e3d3b4c7cc"
          before_revision: 0
          command_digest: "sha256:660e39726e4c4d4dc5d2b3666a076879f4ae5b3e2ae7e38e6818104ab3ba02ca"
          effect_ids: []
          event_digests:
            - "sha256:c61f0cf5d9074bcccea24a34af05c86869537783bc80e2579c111b8b9e3e69e6"
          mutation_id: "capture:202610262005-459E82"
        kernel_work_item_claim_required:sha256:33a37cea5c03dc2deb72037b62e162368f4395a523c8eff0a02d801884048a74:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:
          after_revision: 5
          aggregate_digest: "sha256:b456b33801c2db1471412c6e1d7a1efbce1c8e4001e3f7d7db09766116c91ac3"
          before_revision: 4
          command_digest: "sha256:ca95bf31983e457bcc6b839573311c499eb2e83784d8fd7cf6b7d92b0a01abf3"
          effect_ids: []
          event_digests:
            - "sha256:bfe91ffd6800f442d609ab12994bfe3634ef8e84532b3f207c456c118a4f94a3"
          mutation_id: "kernel_work_item_claim_required:sha256:33a37cea5c03dc2deb72037b62e162368f4395a523c8eff0a02d801884048a74:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        kernel_work_item_execution_required:sha256:2859a29adea46dc476443edf2beaac2f99f8dc93966407971ccefb3af8287637:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:
          after_revision: 6
          aggregate_digest: "sha256:3489535b91be76968f0bfc579759b400b5a50944141d0df5b69aeac41e30c88e"
          before_revision: 5
          command_digest: "sha256:31671f5f37ad5b321e00112608815abcca0140dcb3b795b779b168203366ab3d"
          effect_ids: []
          event_digests:
            - "sha256:1789635c5e411460687bf3a3819e07c9f6b3d4d869876d98e010bd0daf30777c"
          mutation_id: "kernel_work_item_execution_required:sha256:2859a29adea46dc476443edf2beaac2f99f8dc93966407971ccefb3af8287637:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        kernel_work_item_materialization_required:sha256:1af59902a14ccc70a84e517c27a9b79fff81d46d0d10503c3c765739ff7b8106:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:
          after_revision: 4
          aggregate_digest: "sha256:d4e6ad579aaf9ae100b221d89b540ea81f810d88aef76bc55dea650c6892e569"
          before_revision: 3
          command_digest: "sha256:a99a54b7e5f461b4d9553df9d232970a3f5d67776b9cd89d143a51b30e820fba"
          effect_ids: []
          event_digests:
            - "sha256:78d1b6c37ec6e478aa33b11ff72aae7ef4257370ff8fa173a0a5c10f972887fb"
          mutation_id: "kernel_work_item_materialization_required:sha256:1af59902a14ccc70a84e517c27a9b79fff81d46d0d10503c3c765739ff7b8106:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        result:sha256:6028d3013d46d76bbd1997ea6cb857a7e137f8df58a1bc78d6645c2958f3f3fe:
          after_revision: 2
          aggregate_digest: "sha256:201b72847fa7de5338b1b8106c51fa48af612dc1ca27bb789453876493678e88"
          before_revision: 1
          command_digest: "sha256:961761ee5c0e94f1ffebbf1a0405a42f099dbc1c50391b55fdcc93b039abe1f4"
          effect_ids: []
          event_digests:
            - "sha256:af86c35dedcc401fa1f809d079c25c814983dc9c34a90342844d66fe312edfe2"
          mutation_id: "result:sha256:6028d3013d46d76bbd1997ea6cb857a7e137f8df58a1bc78d6645c2958f3f3fe"
        sha256:6a65aa2b4702325d6606e1246f10ac335b4a1117f66c811e3ac2dffc53ac736c:
          after_revision: 3
          aggregate_digest: "sha256:0c38fae185d811f1fd8abe85f8a97a948368ac9d28bb7b6f02b64692eaa3748c"
          before_revision: 2
          command_digest: "sha256:9f4c67d21bdadbc772bdcb067f710f22e37a40689e5793caaece163906c267a0"
          effect_ids: []
          event_digests:
            - "sha256:2fbec714201e25c6c12fc836f2fe508df7fad6e7505dc6ad9cfa87041a76cff1"
          mutation_id: "sha256:6a65aa2b4702325d6606e1246f10ac335b4a1117f66c811e3ac2dffc53ac736c"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        tsup9-root-node-engine:
          attempt: 1
          claim_id: "sha256:131139a887b375b252ba24f9cbbcf69f877b2f28a40e332022e379ff3d95d57c"
          definition:
            contract_digest: "sha256:0075611a22e11683e5fc630d774ba68ccc375bb68a878e186f75441fbb238114"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "dependencies"
              resources: []
              scope_roots:
                - "package.json"
                - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
            expected_outputs:
              - "root-engine-range"
              - "node-engine-contract-test"
            id: "tsup9-root-node-engine"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:7e7447e7e3b2af17e08fb414d4443b31eb6d4f9ce9dbb62536ecd25c2daf227a"
    documents:
      contracts:
        sha256:0075611a22e11683e5fc630d774ba68ccc375bb68a878e186f75441fbb238114:
          acceptance_criteria:
            - "The root package.json engines.node is exactly ^24.11.0 || >=26.0.0."
            - "The workflow Node engine contract test expects the same root range."
            - "Published package engines.node ranges are unchanged."
          objective: "Require only supported Node versions for the repository development toolchain before tsup 9 while preserving published package runtime ranges."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged."
        objective: "Require supported Node versions for tsup 9 development"
    events:
      -
        command_digest: "sha256:660e39726e4c4d4dc5d2b3666a076879f4ae5b3e2ae7e38e6818104ab3ba02ca"
        id: "capture:202610262005-459E82:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610262005-459E82"
        occurred_at: "2026-10-26T20:05:33.001Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610262005-459E82"
        task_revision: 1
      -
        command_digest: "sha256:961761ee5c0e94f1ffebbf1a0405a42f099dbc1c50391b55fdcc93b039abe1f4"
        id: "result:sha256:6028d3013d46d76bbd1997ea6cb857a7e137f8df58a1bc78d6645c2958f3f3fe:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:6028d3013d46d76bbd1997ea6cb857a7e137f8df58a1bc78d6645c2958f3f3fe"
        occurred_at: "2026-10-26T20:06:35.475Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610262005-459E82"
        task_revision: 2
      -
        command_digest: "sha256:9f4c67d21bdadbc772bdcb067f710f22e37a40689e5793caaece163906c267a0"
        id: "sha256:6a65aa2b4702325d6606e1246f10ac335b4a1117f66c811e3ac2dffc53ac736c:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6a65aa2b4702325d6606e1246f10ac335b4a1117f66c811e3ac2dffc53ac736c"
        occurred_at: "2026-10-26T20:06:59.021Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610262005-459E82"
        task_revision: 3
      -
        command_digest: "sha256:a99a54b7e5f461b4d9553df9d232970a3f5d67776b9cd89d143a51b30e820fba"
        id: "kernel_work_item_materialization_required:sha256:1af59902a14ccc70a84e517c27a9b79fff81d46d0d10503c3c765739ff7b8106:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:1af59902a14ccc70a84e517c27a9b79fff81d46d0d10503c3c765739ff7b8106:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        occurred_at: "2026-10-26T20:07:21.932Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610262005-459E82"
        task_revision: 4
      -
        command_digest: "sha256:ca95bf31983e457bcc6b839573311c499eb2e83784d8fd7cf6b7d92b0a01abf3"
        id: "kernel_work_item_claim_required:sha256:33a37cea5c03dc2deb72037b62e162368f4395a523c8eff0a02d801884048a74:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:33a37cea5c03dc2deb72037b62e162368f4395a523c8eff0a02d801884048a74:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        occurred_at: "2026-10-26T20:07:51.710Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610262005-459E82"
        task_revision: 5
      -
        command_digest: "sha256:31671f5f37ad5b321e00112608815abcca0140dcb3b795b779b168203366ab3d"
        id: "kernel_work_item_execution_required:sha256:2859a29adea46dc476443edf2beaac2f99f8dc93966407971ccefb3af8287637:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2859a29adea46dc476443edf2beaac2f99f8dc93966407971ccefb3af8287637:sha256:571e1443cce6ba437a8735750f4c8c4674e46fe452db3edc563af201930f6b44"
        occurred_at: "2026-10-26T20:09:11.311Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610262005-459E82"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Require supported Node versions for tsup 9 development

Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.

## Scope

- In scope: Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.
- Out of scope: unrelated refactors not required for "Require supported Node versions for tsup 9 development".

## Plan

1. Execute approved WorkItem tsup9-root-node-engine.

## Verify Steps

PLANNER fallback scaffold for "Require supported Node versions for tsup 9 development". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Require supported Node versions for tsup 9 development". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
