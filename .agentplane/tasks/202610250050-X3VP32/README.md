---
id: "202610250050-X3VP32"
title: "Guard canonical local lifecycle against unresolved external-agent intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run hotspots:check"
  - "bun run lint:core"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts --pool=forks --maxWorkers 1"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T00:52:38.423Z"
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
      - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
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
      - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
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
          - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
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
      digest: "sha256:3e0d99712f473045ee3b6b08f3a32a8429bc7026fae2c867b2742d43277d5f5c"
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
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-25T00:50:55.505Z"
doc_updated_by: "CODER"
description: "For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception."
sections:
  Summary: |-
    Guard canonical local lifecycle against unresolved external-agent intent

    For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.
  Scope: |-
    - In scope: For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.
    - Out of scope: unrelated refactors not required for "Guard canonical local lifecycle against unresolved external-agent intent".
  Plan: "1. Execute approved WorkItem guard-canonical-local-lifecycle."
  Verify Steps: |-
    PLANNER fallback scaffold for "Guard canonical local lifecycle against unresolved external-agent intent". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Guard canonical local lifecycle against unresolved external-agent intent". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "214a26d1bda13f9a81349cc1364669ad24dfb92c"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
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
            digest: "sha256:d9bdbe92fb32eac9795e017c61e481a3f3d36e2af2df3cd571b4186dcafe2bb0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0167d00b3f07fb0c612c0b05bfb7915c1eed0a66d1c222552831e17724c640ea"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2c5c8a0e87760e1a50830426701308695a9ae4b68f2834e3c1f4bfea1b646cf"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
            task_id: "202610250050-X3VP32"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:f2c5c8a0e87760e1a50830426701308695a9ae4b68f2834e3c1f4bfea1b646cf"
        digest: "sha256:0167d00b3f07fb0c612c0b05bfb7915c1eed0a66d1c222552831e17724c640ea"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:1462af8447ebf71f5644502a848152cf18c54c11fe8fc8f0f35590e62e35ff15"
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
                - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
                - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
            expected_outputs:
              - "canonical-read-only-reconciliation"
              - "local-lifecycle-zero-dispatch-regressions"
              - "verification-evidence"
            id: "guard-canonical-local-lifecycle"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610250050-X3VP32"
      intent_digest: "sha256:71a975bd62153e4174743b6ea7d1797dde0fe17bd673f0b8e2b1b18cfb148d19"
      migration_receipts: []
      mutation_receipts:
        capture:202610250050-X3VP32:
          after_revision: 1
          aggregate_digest: "sha256:86136534615bcf7255c1cc970d9da6b2c74e46dadd92e49b5af413cbca1d52f1"
          before_revision: 0
          command_digest: "sha256:90244926413137b54782b01f435e989f275870ec83c456b2ff023574bc5558a7"
          effect_ids: []
          event_digests:
            - "sha256:468eb4e046afc2633e2018d983517b1685c4063fe5eab0a9e000b0d01ce542d9"
          mutation_id: "capture:202610250050-X3VP32"
        kernel_work_item_claim_required:sha256:3cef0710133bbb8572a895ae5f04c77642327bd8b8e9af69c71c9498d23a748e:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:
          after_revision: 5
          aggregate_digest: "sha256:44458abc1d6cbfc0fe0bb9188f9d8778915605a1dd057388bda8200b67ddf974"
          before_revision: 4
          command_digest: "sha256:796fb3ee058f56aff0023834ef284fe6e28a40ffb7c149adb32587ace39a2429"
          effect_ids: []
          event_digests:
            - "sha256:1f3bcf394c96fea333d214977de6af440e40c0eefa87da239b80ce36c66fe831"
          mutation_id: "kernel_work_item_claim_required:sha256:3cef0710133bbb8572a895ae5f04c77642327bd8b8e9af69c71c9498d23a748e:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:
          after_revision: 6
          aggregate_digest: "sha256:d064b054785e5bc5faedae3a180609e2d8469e2c9caecf3c5fa0d426690f250d"
          before_revision: 5
          command_digest: "sha256:3f34ca3db9abbc25755e675982f798c4703bb859ff13358e6850abb04657ec35"
          effect_ids: []
          event_digests:
            - "sha256:e141b6c43f7454b9d5611a418673aca632178d37aa9522a177632d3d305b331a"
          mutation_id: "kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:
          after_revision: 4
          aggregate_digest: "sha256:b68eee8a4258e32fe4d6029275023495f48bdbd3eaa3313a36c9e94e042e5ebc"
          before_revision: 3
          command_digest: "sha256:a36f49063b2de5a37359ba40736d1abd57cac292e1b3298cb0081d39da28c757"
          effect_ids: []
          event_digests:
            - "sha256:8ace4de4a64feda09eed6d2b35269159027c847711611ad970fc7ac53ab8efab"
          mutation_id: "kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd:
          after_revision: 2
          aggregate_digest: "sha256:0c70c85aa1cf8e8406d87a28278f8b6fa3872347dbc20fa0352cb29931a4808d"
          before_revision: 1
          command_digest: "sha256:e8af89b6cf6019bc6bb90f0beefef718825d23d9f3b474fdadeaa38383b73c45"
          effect_ids: []
          event_digests:
            - "sha256:86ad205f397ee35b4740a03228a527c194b3975d256259799bd3b3394f673b45"
          mutation_id: "result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd"
        sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8:
          after_revision: 3
          aggregate_digest: "sha256:fde0e653d6bb92a94c20774ac3e09b98916e502495fc1ffd29988943ef41e993"
          before_revision: 2
          command_digest: "sha256:ebe5d3cd2357914ba9f5eec932eb8e74776db87d311813f9788fe70aaeb1bd1e"
          effect_ids: []
          event_digests:
            - "sha256:a84d141f4cfb25a80861b4063fbb239974da23a1605f1457d5edb68a1c3122e4"
          mutation_id: "sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        guard-canonical-local-lifecycle:
          attempt: 1
          claim_id: "sha256:c1e3be6984b630b61e72a7ca50f28cc668f2477da81b99c8c0cb3327f1e8fac4"
          definition:
            contract_digest: "sha256:1462af8447ebf71f5644502a848152cf18c54c11fe8fc8f0f35590e62e35ff15"
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
                - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
                - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
            expected_outputs:
              - "canonical-read-only-reconciliation"
              - "local-lifecycle-zero-dispatch-regressions"
              - "verification-evidence"
            id: "guard-canonical-local-lifecycle"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:edb2d5495db8c64a1f253c05dbc508af3226cba0389659bf38ff321e5075909d"
    documents:
      contracts:
        sha256:1462af8447ebf71f5644502a848152cf18c54c11fe8fc8f0f35590e62e35ff15:
          acceptance_criteria:
            - "Only an exact drifted unanswered issued or prepared read-only observation retires through historical identity, exchange-first acknowledgement and journal CAS, then returns the native replacement route."
            - "Unchanged, result-present, mutation-authorized, malformed, unrelated and interrupted acknowledgement states block local and provider operation admission and execution without replaying effects."
            - "Absent or completed external-agent intents allow normal local and provider workflow behavior."
            - "The PR #6920 five-file implementation is preserved byte-for-byte where possible. Only the generic local coordinator and its tests add behavior."
            - "No Factory-specific adapter, manual journal mutation, verification bypass or hotspot exception is introduced."
          objective: "Carry forward the independently reviewed PR #6920 generic strict read-only recovery implementation. Apply the same guard before canonical local lifecycle operation admission. Keep provider and local dispatch fail-closed for every unresolved ineligible external-agent intent."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts --pool=forks --maxWorkers 1"
            - "bun run lint:core"
            - "bun run hotspots:check"
            - "bun run ci:local:full"
      intent:
        context: "For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception."
        objective: "Guard canonical local lifecycle against unresolved external-agent intent"
    events:
      -
        command_digest: "sha256:90244926413137b54782b01f435e989f275870ec83c456b2ff023574bc5558a7"
        id: "capture:202610250050-X3VP32:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610250050-X3VP32"
        occurred_at: "2026-10-25T00:50:55.413Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610250050-X3VP32"
        task_revision: 1
      -
        command_digest: "sha256:e8af89b6cf6019bc6bb90f0beefef718825d23d9f3b474fdadeaa38383b73c45"
        id: "result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd"
        occurred_at: "2026-10-25T00:52:03.131Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610250050-X3VP32"
        task_revision: 2
      -
        command_digest: "sha256:ebe5d3cd2357914ba9f5eec932eb8e74776db87d311813f9788fe70aaeb1bd1e"
        id: "sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8"
        occurred_at: "2026-10-25T00:52:26.295Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610250050-X3VP32"
        task_revision: 3
      -
        command_digest: "sha256:a36f49063b2de5a37359ba40736d1abd57cac292e1b3298cb0081d39da28c757"
        id: "kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        occurred_at: "2026-10-25T00:52:44.315Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610250050-X3VP32"
        task_revision: 4
      -
        command_digest: "sha256:796fb3ee058f56aff0023834ef284fe6e28a40ffb7c149adb32587ace39a2429"
        id: "kernel_work_item_claim_required:sha256:3cef0710133bbb8572a895ae5f04c77642327bd8b8e9af69c71c9498d23a748e:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3cef0710133bbb8572a895ae5f04c77642327bd8b8e9af69c71c9498d23a748e:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        occurred_at: "2026-10-25T00:53:15.404Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610250050-X3VP32"
        task_revision: 5
      -
        command_digest: "sha256:3f34ca3db9abbc25755e675982f798c4703bb859ff13358e6850abb04657ec35"
        id: "kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        occurred_at: "2026-10-25T00:54:34.059Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610250050-X3VP32"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
    schema_version: 1
id_source: "generated"
---
## Summary

Guard canonical local lifecycle against unresolved external-agent intent

For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.

## Scope

- In scope: For release 0.7.13, carry forward the independently reviewed PR #6920 generic fail-closed read-only recovery patch and call the same strict recovery guard before canonical local lifecycle operation admission, including task.pre_merge_close. Retire only an exact drifted unanswered read-only observation through historical identity and exchange-first journal CAS, then require native replacement. Block every ineligible unresolved external-agent intent before local operation admission and execution, including unchanged, result-present, mutation-authorized, malformed and unrelated states. Preserve normal local operation behavior when no unresolved intent exists. Add zero-dispatch regressions. No Factory-specific adapter, manual journal edit, weakened verification or hotspot exception.
- Out of scope: unrelated refactors not required for "Guard canonical local lifecycle against unresolved external-agent intent".

## Plan

1. Execute approved WorkItem guard-canonical-local-lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Guard canonical local lifecycle against unresolved external-agent intent". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Guard canonical local lifecycle against unresolved external-agent intent". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
