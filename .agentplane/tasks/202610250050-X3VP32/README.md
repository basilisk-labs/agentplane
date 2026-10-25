---
id: "202610250050-X3VP32"
title: "Guard canonical local lifecycle against unresolved external-agent intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
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
      - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
      - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
          - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
      digest: "sha256:ee1eddc2b591196fffa77a5fc48fb9fd305630319b16ea9277bb120648a0bfb3"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ae14a23dabcc645831679b5526b347ccfb9bc990550be78336a2adbfb9323578"
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
              parent_authority_digest: "sha256:d9bdbe92fb32eac9795e017c61e481a3f3d36e2af2df3cd571b4186dcafe2bb0"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
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
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-read-only-observation.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-read-only-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
            evidence_digest: "sha256:d3bea5fefd61c0bbc3908f518aa6878be13b0ab4d0298e529a0c89655f207dfa"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9f3f35d0a5558b31644a83b7280d7fb4963807cfd7096960ba3a9be12a9fab7e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0167d00b3f07fb0c612c0b05bfb7915c1eed0a66d1c222552831e17724c640ea"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:f2c5c8a0e87760e1a50830426701308695a9ae4b68f2834e3c1f4bfea1b646cf"
              kind: "USER"
              parent_authority_digest: "sha256:ae14a23dabcc645831679b5526b347ccfb9bc990550be78336a2adbfb9323578"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
          observation:
            changed_paths: []
            evidence_digest: "sha256:002bfd6964a3a0bdb04973ac0899e15a0eff78f541d9d433604146145b1e8584"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
            request_digest: "sha256:71f3ca48d4e73c9deb49d24496aa65be99926b14e925e94915012d6e1062f46a"
            scope_request:
              attempt: 2
              claim_id: "sha256:121d2576524427060b19e683f6c91063414b166bfcd446b9f3a311bf0600fabd"
              contract_digest: "sha256:1462af8447ebf71f5644502a848152cf18c54c11fe8fc8f0f35590e62e35ff15"
              intake_after_digest: "sha256:5072beae77ca9b8c37497f59fceeedfabe63ae99a96697878061b96f19d01bc0"
              intake_before_digest: "sha256:6e70174190cae0737598d63a459c1e418220632114ee5de561061540ab294e06"
              parent_authority_digest: "sha256:ae14a23dabcc645831679b5526b347ccfb9bc990550be78336a2adbfb9323578"
              plan_digest: "sha256:0167d00b3f07fb0c612c0b05bfb7915c1eed0a66d1c222552831e17724c640ea"
              plan_revision: 1
              record_digest: "sha256:64309a5e21c0aa16af32e1dc6b7a009e5de2940799b3ebb7a847e8ef7d48d478"
              repository_effects:
                - "repository_write"
                - "tests"
              repository_fingerprint: "sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:8a10c3fff66d61fd24fe0c3ecb4e2a0c2493e9b79858762928ee5cea4a168f59"
              scope_roots:
                - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
              stop_receipt_digest: "sha256:b64959e348d15b3723171d8dc65650ce78af8c6c72c3fe183fc9691a736f379a"
              task_id: "202610250050-X3VP32"
              task_revision: 14
              work_item_id: "guard-canonical-local-lifecycle"
              work_order_id: "sha256:e9f8b21120cd73c184be7d76e3180789901a1fa435063cce808c22ca18910982"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:60a9a5f3337df1e0d75809dcb35968aeff4c31585b988f933cea8fddc202e26b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:73eeaec71e43dc266fce311bf29812e305eaf010e376178d0887bf1abce95410"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c90c1f7cb3c30c019d541f4d6a2af5b7f025c5be8c607c890df740bc43bbee7a"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
        approval_evidence_digest: "sha256:c90c1f7cb3c30c019d541f4d6a2af5b7f025c5be8c607c890df740bc43bbee7a"
        digest: "sha256:73eeaec71e43dc266fce311bf29812e305eaf010e376178d0887bf1abce95410"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a0196ea11c029c2ee17ee4840d8ab504e84ae26948f8d8c6ba4d159ac9191fe5"
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
                - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
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
        kernel_work_item_claim_required:sha256:73c7b5cef93879dfd892e79b30eeba9f308896ccf9ad806670615b79de24b214:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:
          after_revision: 18
          aggregate_digest: "sha256:c5e02c96279ae2a457a0e8f5873a1260e9cd1319cc5224afa7d07c209c9b43f1"
          before_revision: 17
          command_digest: "sha256:710418534dc443503014f8acbdc016c8d815ed0521860eaab0bfdf775a69516c"
          effect_ids: []
          event_digests:
            - "sha256:2e9cd4583669a8f86613342de4ae7a0d87336759b1265fab7bcfa330da5a48f5"
          mutation_id: "kernel_work_item_claim_required:sha256:73c7b5cef93879dfd892e79b30eeba9f308896ccf9ad806670615b79de24b214:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        kernel_work_item_execution_required:sha256:19d68638c66981e1396aaafff39f612f2aa4ef1359cf4e306d6c3b22cd7bcb1c:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:
          after_revision: 19
          aggregate_digest: "sha256:9ee94e3f7cdda73277858386e1ca87fe2327697d02385327532ceacbf9460a3d"
          before_revision: 18
          command_digest: "sha256:f17b58bed938e936de8e8e6f2cd7ae153bff866ba3bcc24aa11fd17990c16769"
          effect_ids: []
          event_digests:
            - "sha256:824169a606db5aa628ab7fe067e7ac41f3913a51a6401f2e0dc030a8fe53ec61"
          mutation_id: "kernel_work_item_execution_required:sha256:19d68638c66981e1396aaafff39f612f2aa4ef1359cf4e306d6c3b22cd7bcb1c:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:
          after_revision: 6
          aggregate_digest: "sha256:d064b054785e5bc5faedae3a180609e2d8469e2c9caecf3c5fa0d426690f250d"
          before_revision: 5
          command_digest: "sha256:3f34ca3db9abbc25755e675982f798c4703bb859ff13358e6850abb04657ec35"
          effect_ids: []
          event_digests:
            - "sha256:e141b6c43f7454b9d5611a418673aca632178d37aa9522a177632d3d305b331a"
          mutation_id: "kernel_work_item_execution_required:sha256:1cfc88d32c1d241a515dcf0cca95a9b2c5374a367ddd8b2296ab95fe2c911ce4:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        kernel_work_item_execution_required:sha256:dcea0ddb4f8029b080a6d4f95375c44aff067e0610bcacaab34c4f6329e0c358:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:
          after_revision: 13
          aggregate_digest: "sha256:56dd86a8c29bc793921597f75c5bf87832c3b8d3b5351462a6088aba20bb9f64"
          before_revision: 12
          command_digest: "sha256:e34d09183c1dd27240ac5bd09684959b4ab44fd95232128d16d601dff70ec0d2"
          effect_ids: []
          event_digests:
            - "sha256:4a3a3bf90e28871b9b84da035634c8fbcefe330f34f4db33bbcac4221fba6906"
          mutation_id: "kernel_work_item_execution_required:sha256:dcea0ddb4f8029b080a6d4f95375c44aff067e0610bcacaab34c4f6329e0c358:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        kernel_work_item_inspection_required:sha256:eabb6978729dc00127238315f6d71610862a793df05ba75e36848d409f0963cf:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:
          after_revision: 9
          aggregate_digest: "sha256:41aba47d24b0d7ea3be22674490209ab33a78b59f6469876b57701577879c2d2"
          before_revision: 8
          command_digest: "sha256:501a8bc6518cc8941acf8438b8e8abe70469cc557624b1957c08888f9a844390"
          effect_ids: []
          event_digests:
            - "sha256:6c852f071a79c8e7eae7cbd3940885dc58c7ede5d41097622cc11564cfacc1a4"
          mutation_id: "kernel_work_item_inspection_required:sha256:eabb6978729dc00127238315f6d71610862a793df05ba75e36848d409f0963cf:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe:
          after_revision: 4
          aggregate_digest: "sha256:b68eee8a4258e32fe4d6029275023495f48bdbd3eaa3313a36c9e94e042e5ebc"
          before_revision: 3
          command_digest: "sha256:a36f49063b2de5a37359ba40736d1abd57cac292e1b3298cb0081d39da28c757"
          effect_ids: []
          event_digests:
            - "sha256:8ace4de4a64feda09eed6d2b35269159027c847711611ad970fc7ac53ab8efab"
          mutation_id: "kernel_work_item_materialization_required:sha256:469faae0cf5b8749c5e95ee4026cba0ec444f07741dc0b5678a9127621e93803:sha256:f605559b62e782f4bd9baee7123016dd139303d863b181d2dc10ac3aaeeeccbe"
        kernel_work_item_rework_claim_required:sha256:e51da5e576fca92c66dc07eb27b741ade7f0a16d6eeebe793136fb1a0afd1bd4:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:
          after_revision: 12
          aggregate_digest: "sha256:68d4ff88b51a9a19cfd23468d115297fbc146a126fba70ad768001cc2b1415fc"
          before_revision: 11
          command_digest: "sha256:bc0fad9ae5cd7ffbc3ecc52d4f2b0485653da08bb3b8903cdde637becc339690"
          effect_ids: []
          event_digests:
            - "sha256:16662f3342cd98aaf4509bc669034d98d13d2e635e564d34c6994ced27b37cd6"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:e51da5e576fca92c66dc07eb27b741ade7f0a16d6eeebe793136fb1a0afd1bd4:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        result:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd:
          after_revision: 8
          aggregate_digest: "sha256:723736011f014013b916da44f3919540ab20bfd5d7a0bb3deecdea0faa4041b9"
          before_revision: 7
          command_digest: "sha256:40df15f542ec7379829e7d4d3574eb2dfcea1e10712add738ae7a64424d20bb6"
          effect_ids: []
          event_digests:
            - "sha256:1d2f6363270cfe0f7df17a8a2665912ecdf5103592399017bac91f1d7180f81d"
          mutation_id: "result:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd"
        result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd:
          after_revision: 2
          aggregate_digest: "sha256:0c70c85aa1cf8e8406d87a28278f8b6fa3872347dbc20fa0352cb29931a4808d"
          before_revision: 1
          command_digest: "sha256:e8af89b6cf6019bc6bb90f0beefef718825d23d9f3b474fdadeaa38383b73c45"
          effect_ids: []
          event_digests:
            - "sha256:86ad205f397ee35b4740a03228a527c194b3975d256259799bd3b3394f673b45"
          mutation_id: "result:sha256:250c63bb71fc450cfcf721b4717ac6e0ee697f3f3156a76ac80a31cc1aa549bd"
        result:sha256:ec4c550b2aef92c9835b78a46497b4f7d39dc9e99504510d356bc0fc8b0a31e9:
          after_revision: 16
          aggregate_digest: "sha256:cac427a58b45d306f4faaf7b3446a928ec6716133349871931fc0d5256d316c1"
          before_revision: 15
          command_digest: "sha256:ffbb3ce9bdefc75333b69ad3bad48019f48808301d3fbc8d0b182cdd678c161e"
          effect_ids: []
          event_digests:
            - "sha256:b7fcf9b3645648af345959e1bf2e82810750d6d2935f0cbdbd168339aca8face"
          mutation_id: "result:sha256:ec4c550b2aef92c9835b78a46497b4f7d39dc9e99504510d356bc0fc8b0a31e9"
        scope-request:sha256:71f3ca48d4e73c9deb49d24496aa65be99926b14e925e94915012d6e1062f46a:
          after_revision: 15
          aggregate_digest: "sha256:19a7a656c7da4ba1f40889cda98112472667a058ab7211b573176028648ec207"
          before_revision: 14
          command_digest: "sha256:6e5797ffbf57972961e400ff8984e0369560c7aefaa8a4a2af7dd795f7a35d05"
          effect_ids: []
          event_digests:
            - "sha256:a53ffece4521809cf205ac97e118fc1260a6e499b8f89f5f1b494964f3562b30"
          mutation_id: "scope-request:sha256:71f3ca48d4e73c9deb49d24496aa65be99926b14e925e94915012d6e1062f46a"
        semantic-stop:sha256:e9f8b21120cd73c184be7d76e3180789901a1fa435063cce808c22ca18910982:
          after_revision: 14
          aggregate_digest: "sha256:b655ffad67b3fd0bfd18e0a07bee321b09513d8fac88d1dd6b3e710d92bf4792"
          before_revision: 13
          command_digest: "sha256:e13c26132669f327abe14201566001a36c93cf6b12107a4d36171c900e025206"
          effect_ids: []
          event_digests:
            - "sha256:972b8c9a869fb835882b0f126b7e0a837f0fe2877e72db8c3a281f3fc25d429c"
          mutation_id: "semantic-stop:sha256:e9f8b21120cd73c184be7d76e3180789901a1fa435063cce808c22ca18910982"
        sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8:
          after_revision: 3
          aggregate_digest: "sha256:fde0e653d6bb92a94c20774ac3e09b98916e502495fc1ffd29988943ef41e993"
          before_revision: 2
          command_digest: "sha256:ebe5d3cd2357914ba9f5eec932eb8e74776db87d311813f9788fe70aaeb1bd1e"
          effect_ids: []
          event_digests:
            - "sha256:a84d141f4cfb25a80861b4063fbb239974da23a1605f1457d5edb68a1c3122e4"
          mutation_id: "sha256:1d7c7d12d4acd6fa73130255769902838241b79de7e3421b41417dd6137c6dc8"
        sha256:3a7e0922396c7ed1f51424e063335b294a4f67dfb5572c0c7d2d088a2496a076:
          after_revision: 17
          aggregate_digest: "sha256:c3dad820f7d3d360453f40aa825a0f016ce365019933cd12e629eac0a2980861"
          before_revision: 16
          command_digest: "sha256:2f3472441349ecb0864dc570db30533bffb5697ed7759b53aa9ffecefcaf5deb"
          effect_ids: []
          event_digests:
            - "sha256:fcd57c0cc6f212368e5dd10030dd48ebe14537017ef938ee6607bb4233c81c8a"
          mutation_id: "sha256:3a7e0922396c7ed1f51424e063335b294a4f67dfb5572c0c7d2d088a2496a076"
        sha256:947e45201081ff69a895a8aea6448bed1378bea8880746b9d7e8c075f80d5d2f:
          after_revision: 7
          aggregate_digest: "sha256:164c010cb931e992fa98ac59daf7fbcd25767d09256afa126d3bb89f91a5289e"
          before_revision: 6
          command_digest: "sha256:4754534cdae28a8d373089f1199055a82b9a90a798843325235c79bf87f038fc"
          effect_ids: []
          event_digests:
            - "sha256:af4d880e287155201e2f648341622d6d0e6c52fe0186ac948ca9c88909a5a871"
          mutation_id: "sha256:947e45201081ff69a895a8aea6448bed1378bea8880746b9d7e8c075f80d5d2f"
        validation-resolution:sha256:33c4ae725ca9a3589c548a08e967ef5ac95c77f2c88f0cd79368ef6ba899bb7a:
          after_revision: 11
          aggregate_digest: "sha256:124869859bb75b05fe8c85eb90919e6227087add57f59bc23241c827360f7408"
          before_revision: 10
          command_digest: "sha256:33dc476481c4d753b9a232bfa2a7833a31dc6ce3f8cef81d36cfb6d01b94e09f"
          effect_ids: []
          event_digests:
            - "sha256:8b0b21834bd89bd547d2336aff1de7c91bb8cefbd0ac030a45e126cb5138d574"
          mutation_id: "validation-resolution:sha256:33c4ae725ca9a3589c548a08e967ef5ac95c77f2c88f0cd79368ef6ba899bb7a"
        validation:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd:
          after_revision: 10
          aggregate_digest: "sha256:1cf663f75700d2b7e12ba5e5c25708282becd38bdcf036073125fc33e47392d0"
          before_revision: 9
          command_digest: "sha256:6bf727327453068235acca9be57bd53f0664e658ec59cbec5b63bfb794df4d90"
          effect_ids: []
          event_digests:
            - "sha256:50fc31d3c094a1d64822e2236e53a8f62f8513b6c070bbff85fc352865fc6715"
          mutation_id: "validation:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:f2c5c8a0e87760e1a50830426701308695a9ae4b68f2834e3c1f4bfea1b646cf"
          digest: "sha256:0167d00b3f07fb0c612c0b05bfb7915c1eed0a66d1c222552831e17724c640ea"
          revision: 1
          state: "REJECTED"
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
      revision: 19
      schema_version: 1
      state: "ACTIVE"
      work_items:
        guard-canonical-local-lifecycle:
          attempt: 3
          claim_id: "sha256:d6665f451398bbaadbc99efe9541e726bf11ddafd62f9d1048ff90e1d5f92840"
          definition:
            contract_digest: "sha256:a0196ea11c029c2ee17ee4840d8ab504e84ae26948f8d8c6ba4d159ac9191fe5"
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
                - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
            expected_outputs:
              - "canonical-read-only-reconciliation"
              - "local-lifecycle-zero-dispatch-regressions"
              - "verification-evidence"
            id: "guard-canonical-local-lifecycle"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 14
          state: "EXECUTING"
          validation: null
    digest: "sha256:8f2a29d725ea4320eac3cf2b5d25ba5179423852595a31cf3c38d96f1c87444e"
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
        sha256:a0196ea11c029c2ee17ee4840d8ab504e84ae26948f8d8c6ba4d159ac9191fe5:
          acceptance_criteria:
            - "Only an exact drifted unanswered issued or prepared read-only observation retires through historical identity, exchange-first acknowledgement and journal CAS, then returns the native replacement route."
            - "Unchanged, result-present, mutation-authorized, malformed, unrelated and interrupted acknowledgement states block local and provider operation admission and execution without replaying effects."
            - "Absent or completed external-agent intents allow normal local and provider workflow behavior."
            - "The PR #6920 five-file implementation is preserved byte-for-byte where possible. Only the generic local coordinator and its tests add behavior."
            - "No Factory-specific adapter, manual journal mutation, verification bypass or hotspot exception is introduced."
            - "The cloud backend auto-pull fixture remains genuinely stale before pull and reliably fresh after pull under loaded CI; production readiness code is unchanged."
          objective: "Carry forward the independently reviewed PR #6920 generic strict read-only recovery implementation. Apply the same guard before canonical local lifecycle operation admission. Keep provider and local dispatch fail-closed for every unresolved ineligible external-agent intent. Correct the cloud backend auto-pull test timing fixture so a stale seed and fresh pull are deterministic under full-suite load."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.cloud.test.ts --pool=forks --maxWorkers 1"
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
      -
        command_digest: "sha256:4754534cdae28a8d373089f1199055a82b9a90a798843325235c79bf87f038fc"
        id: "sha256:947e45201081ff69a895a8aea6448bed1378bea8880746b9d7e8c075f80d5d2f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:947e45201081ff69a895a8aea6448bed1378bea8880746b9d7e8c075f80d5d2f"
        occurred_at: "2026-10-25T01:17:24.184Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610250050-X3VP32"
        task_revision: 7
      -
        command_digest: "sha256:40df15f542ec7379829e7d4d3574eb2dfcea1e10712add738ae7a64424d20bb6"
        id: "result:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd"
        occurred_at: "2026-10-25T01:17:40.630Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610250050-X3VP32"
        task_revision: 8
      -
        command_digest: "sha256:501a8bc6518cc8941acf8438b8e8abe70469cc557624b1957c08888f9a844390"
        id: "kernel_work_item_inspection_required:sha256:eabb6978729dc00127238315f6d71610862a793df05ba75e36848d409f0963cf:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:eabb6978729dc00127238315f6d71610862a793df05ba75e36848d409f0963cf:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        occurred_at: "2026-10-25T01:17:53.349Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610250050-X3VP32"
        task_revision: 9
      -
        command_digest: "sha256:6bf727327453068235acca9be57bd53f0664e658ec59cbec5b63bfb794df4d90"
        id: "validation:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:19518a12ef22b9843ac8209d9dde84e88df7e16430ca6b4a7b34f29df9551ecd"
        occurred_at: "2026-10-25T02:00:19.182Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610250050-X3VP32"
        task_revision: 10
      -
        command_digest: "sha256:33dc476481c4d753b9a232bfa2a7833a31dc6ce3f8cef81d36cfb6d01b94e09f"
        id: "validation-resolution:sha256:33c4ae725ca9a3589c548a08e967ef5ac95c77f2c88f0cd79368ef6ba899bb7a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:33c4ae725ca9a3589c548a08e967ef5ac95c77f2c88f0cd79368ef6ba899bb7a"
        occurred_at: "2026-10-25T02:00:24.980Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610250050-X3VP32"
        task_revision: 11
      -
        command_digest: "sha256:bc0fad9ae5cd7ffbc3ecc52d4f2b0485653da08bb3b8903cdde637becc339690"
        id: "kernel_work_item_rework_claim_required:sha256:e51da5e576fca92c66dc07eb27b741ade7f0a16d6eeebe793136fb1a0afd1bd4:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:e51da5e576fca92c66dc07eb27b741ade7f0a16d6eeebe793136fb1a0afd1bd4:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        occurred_at: "2026-10-25T02:00:36.439Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610250050-X3VP32"
        task_revision: 12
      -
        command_digest: "sha256:e34d09183c1dd27240ac5bd09684959b4ab44fd95232128d16d601dff70ec0d2"
        id: "kernel_work_item_execution_required:sha256:dcea0ddb4f8029b080a6d4f95375c44aff067e0610bcacaab34c4f6329e0c358:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dcea0ddb4f8029b080a6d4f95375c44aff067e0610bcacaab34c4f6329e0c358:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        occurred_at: "2026-10-25T02:00:45.403Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610250050-X3VP32"
        task_revision: 13
      -
        command_digest: "sha256:e13c26132669f327abe14201566001a36c93cf6b12107a4d36171c900e025206"
        id: "semantic-stop:sha256:e9f8b21120cd73c184be7d76e3180789901a1fa435063cce808c22ca18910982:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:e9f8b21120cd73c184be7d76e3180789901a1fa435063cce808c22ca18910982"
        occurred_at: "2026-10-25T02:03:31.412Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610250050-X3VP32"
        task_revision: 14
      -
        command_digest: "sha256:6e5797ffbf57972961e400ff8984e0369560c7aefaa8a4a2af7dd795f7a35d05"
        id: "scope-request:sha256:71f3ca48d4e73c9deb49d24496aa65be99926b14e925e94915012d6e1062f46a:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:71f3ca48d4e73c9deb49d24496aa65be99926b14e925e94915012d6e1062f46a"
        occurred_at: "2026-10-25T02:04:15.799Z"
        payload_digest: "sha256:beadda41c7dddf7111253ed4faa4eaa674a2c37549c1976b5b3bb0b34aa8b792"
        task_id: "202610250050-X3VP32"
        task_revision: 15
      -
        command_digest: "sha256:ffbb3ce9bdefc75333b69ad3bad48019f48808301d3fbc8d0b182cdd678c161e"
        id: "result:sha256:ec4c550b2aef92c9835b78a46497b4f7d39dc9e99504510d356bc0fc8b0a31e9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ec4c550b2aef92c9835b78a46497b4f7d39dc9e99504510d356bc0fc8b0a31e9"
        occurred_at: "2026-10-25T02:05:16.389Z"
        payload_digest: "sha256:f5366bba6ab6611f87b0bbb42072fa32cb27cbbc2cb8bd4efa8eb37d903c08f7"
        task_id: "202610250050-X3VP32"
        task_revision: 16
      -
        command_digest: "sha256:2f3472441349ecb0864dc570db30533bffb5697ed7759b53aa9ffecefcaf5deb"
        id: "sha256:3a7e0922396c7ed1f51424e063335b294a4f67dfb5572c0c7d2d088a2496a076:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3a7e0922396c7ed1f51424e063335b294a4f67dfb5572c0c7d2d088a2496a076"
        occurred_at: "2026-10-25T02:05:29.949Z"
        payload_digest: "sha256:40c0b24802b6177cde123e55ae92def16b76ae2a502406c9f691601bb29a9899"
        task_id: "202610250050-X3VP32"
        task_revision: 17
      -
        command_digest: "sha256:710418534dc443503014f8acbdc016c8d815ed0521860eaab0bfdf775a69516c"
        id: "kernel_work_item_claim_required:sha256:73c7b5cef93879dfd892e79b30eeba9f308896ccf9ad806670615b79de24b214:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:73c7b5cef93879dfd892e79b30eeba9f308896ccf9ad806670615b79de24b214:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        occurred_at: "2026-10-25T02:05:48.948Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610250050-X3VP32"
        task_revision: 18
      -
        command_digest: "sha256:f17b58bed938e936de8e8e6f2cd7ae153bff866ba3bcc24aa11fd17990c16769"
        id: "kernel_work_item_execution_required:sha256:19d68638c66981e1396aaafff39f612f2aa4ef1359cf4e306d6c3b22cd7bcb1c:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:19d68638c66981e1396aaafff39f612f2aa4ef1359cf4e306d6c3b22cd7bcb1c:sha256:645014bea37e08fa65aeab74322030561d989e4eabec1bba0eada30729c12732"
        occurred_at: "2026-10-25T02:06:01.811Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610250050-X3VP32"
        task_revision: 19
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
