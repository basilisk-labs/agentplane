---
id: "202609220730-N4NG4B"
title: "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "v0.7.11-followup"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run lint"
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T07:31:36.103Z"
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
doc_updated_at: "2026-09-22T07:30:21.749Z"
doc_updated_by: "CODER"
description: "Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages."
sections:
  Summary: |-
    Harden AgentPlane 0.7.11 lifecycle boundaries and recovery

    Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
  Scope: |-
    - In scope: Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
    - Out of scope: unrelated refactors not required for "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery".
  Plan: "1. Execute approved WorkItem harden-lifecycle-boundaries."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "a2104636fe2522ebdcd79ce32e5ba59f23241a6f"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a5bdd7e9a042b5a23f505d1807b6dd224c479cf4f55a30269a728f0472e6a3f4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "approval-transport"
              - "lifecycle-plan-admission"
              - "merged-worktree-cleanup"
              - "supervisor-pre-effect-recovery"
              - "text-payload-validation"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202609220730-N4NG4B"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
        digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "lifecycle-plan-admission"
                - "approval-transport"
                - "text-payload-validation"
                - "supervisor-pre-effect-recovery"
                - "merged-worktree-cleanup"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
            expected_outputs:
              - "lifecycle-hardening-source"
              - "lifecycle-hardening-tests"
            id: "harden-lifecycle-boundaries"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609220730-N4NG4B"
      intent_digest: "sha256:56f7b9055adb9655ef26decf20bd4d7eebb6931375dfa7b6e0d874006ba7fd84"
      migration_receipts: []
      mutation_receipts:
        capture:202609220730-N4NG4B:
          after_revision: 1
          aggregate_digest: "sha256:0feb3c0905e5d58d23c3efd5e4df0bf8311a2df8c7dd7c5cca86495cb6356e06"
          before_revision: 0
          command_digest: "sha256:f9941b595fd9ce6e7db680b8f7c78e7eece8fde27bcb6825c61e034020e6779b"
          effect_ids: []
          event_digests:
            - "sha256:308417462416c800fcd3aef70855a35b060504dfb017dfab4bda2478dda7383c"
          mutation_id: "capture:202609220730-N4NG4B"
        kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:cd7fb2eea5f4c520deff27762416936d5acdde01476391b6ebd7497f05d1ce6a"
          before_revision: 4
          command_digest: "sha256:5413acb00ac20c7e701e532779c7927a4df0f38f045e610a91e0632179a6d38b"
          effect_ids: []
          event_digests:
            - "sha256:31abc32b8b3514cc6679314349ccd63ff22340811d79e8a5af2b0e77b769efa5"
          mutation_id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:a1d8202b37905fb1838168664b75cdfda5cc1e6c1407a42ea461acb80f322571"
          before_revision: 5
          command_digest: "sha256:ebcd179989672de3c2bc27ee3869210802197604e55803a65c58bfdb58e482fd"
          effect_ids: []
          event_digests:
            - "sha256:f2cca7fcd61d1892ed244650a569ffab4ab13bfc6d2379f65170b0ef5aaf111b"
          mutation_id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:2ee1eacf85d746ba2b9a9f64f3bf02ca738c564d32800393a29306d371c931a3"
          before_revision: 3
          command_digest: "sha256:537aace923d4e9b745be53d9f58ff8fdc581b99739eb01d60ea2612c70152d04"
          effect_ids: []
          event_digests:
            - "sha256:20ec7892f584676ff314dcda7123e5c57879932937b0d2173a53581e896640d1"
          mutation_id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40:
          after_revision: 2
          aggregate_digest: "sha256:8f8d0e229b15fd093e576329e12c3cf85a210944a875342dd5f5be957b0a17a2"
          before_revision: 1
          command_digest: "sha256:b9c3d59ea0244c0722cc90625c5d6118f585e0b0db5ea6db8a9e56b84139edf0"
          effect_ids: []
          event_digests:
            - "sha256:ec686e794d2da3e9610403cb39333f58773030358180a1be8438c14e3c11be01"
          mutation_id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40"
        sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15:
          after_revision: 3
          aggregate_digest: "sha256:dec2b5bea416b3ccc70cf977ac05ae0ab4d58969b5913b2a0d4327a53b975b45"
          before_revision: 2
          command_digest: "sha256:beb4296ab6a5b0b9878fd16656a04bd53453432a055715428a88a4f6d39f0a0d"
          effect_ids: []
          event_digests:
            - "sha256:1fb466e2444a735771c3377a09ff367d34fe5b285ec9010ecaa65ae34100cb9b"
          mutation_id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        harden-lifecycle-boundaries:
          attempt: 1
          claim_id: "sha256:bbb9d37720735d126776fc55212b9fb25fa558b161485246a448d25d7b988992"
          definition:
            contract_digest: "sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "lifecycle-plan-admission"
                - "approval-transport"
                - "text-payload-validation"
                - "supervisor-pre-effect-recovery"
                - "merged-worktree-cleanup"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
            expected_outputs:
              - "lifecycle-hardening-source"
              - "lifecycle-hardening-tests"
            id: "harden-lifecycle-boundaries"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:c5533b9fe67bc491b2249353e5e22f4847f9bd6a92120793b3e416fa6f2aabef"
    documents:
      contracts:
        sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac:
          acceptance_criteria:
            - "Canonical plan admission rejects semantic WorkItems that claim supervisor-owned PR publication, merge, hosted-close, cleanup, or equivalent provider lifecycle effects while preserving legitimate multiple semantic WorkItems."
            - "Host user decision packets and approval parsing expose one consistent required-field contract with field-specific malformed input diagnostics while preserving provenance and state binding."
            - "Task plan and document inline text reject shell-sensitive backticks and command substitution and direct callers to file input."
            - "Repeated accepted external results and task revision bindings have focused regression coverage for the post-apply recovery window."
            - "A persisted pre-effect supervisor intent can be explicitly proven not applied and replaced without replaying an uncertain effect."
            - "Repeated merged-branch cleanup removes a safe unregistered leftover worktree directory before deleting the branch and remains fail-closed for unsafe or still-locked paths."
            - "No semantic WorkItem performs PR publication, hosted checks, merge, hosted close, or cleanup lifecycle actions."
          objective: "Implement the confirmed AgentPlane 0.7.11 lifecycle-boundary and recovery fixes without moving provider lifecycle into semantic execution."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages."
        objective: "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery"
    events:
      -
        command_digest: "sha256:f9941b595fd9ce6e7db680b8f7c78e7eece8fde27bcb6825c61e034020e6779b"
        id: "capture:202609220730-N4NG4B:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220730-N4NG4B"
        occurred_at: "2026-09-22T07:30:21.690Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220730-N4NG4B"
        task_revision: 1
      -
        command_digest: "sha256:b9c3d59ea0244c0722cc90625c5d6118f585e0b0db5ea6db8a9e56b84139edf0"
        id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40"
        occurred_at: "2026-09-22T07:31:24.668Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220730-N4NG4B"
        task_revision: 2
      -
        command_digest: "sha256:beb4296ab6a5b0b9878fd16656a04bd53453432a055715428a88a4f6d39f0a0d"
        id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15"
        occurred_at: "2026-09-22T07:31:35.182Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220730-N4NG4B"
        task_revision: 3
      -
        command_digest: "sha256:537aace923d4e9b745be53d9f58ff8fdc581b99739eb01d60ea2612c70152d04"
        id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:07.642Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220730-N4NG4B"
        task_revision: 4
      -
        command_digest: "sha256:5413acb00ac20c7e701e532779c7927a4df0f38f045e610a91e0632179a6d38b"
        id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:11.477Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220730-N4NG4B"
        task_revision: 5
      -
        command_digest: "sha256:ebcd179989672de3c2bc27ee3869210802197604e55803a65c58bfdb58e482fd"
        id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:14.392Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220730-N4NG4B"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Harden AgentPlane 0.7.11 lifecycle boundaries and recovery

Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.

## Scope

- In scope: Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
- Out of scope: unrelated refactors not required for "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery".

## Plan

1. Execute approved WorkItem harden-lifecycle-boundaries.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
