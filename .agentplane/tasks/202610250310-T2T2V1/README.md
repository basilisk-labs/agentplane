---
id: "202610250310-T2T2V1"
title: "Authenticate repository-policy scope replans after approved scope requests"
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
  - "bun run ci:local:full"
  - "bun run hotspots:check"
  - "bun run lint:core"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/replan-work-items.test.ts packages/agentplane/src/commands/task/kernel-scope-request.test.ts --pool=forks --maxWorkers 1"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T03:12:27.047Z"
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
      - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
      - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
          - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
      digest: "sha256:8e2fa4c8a6f53532e28bf30e2e21a3d43f0c57aab2d3878ec168cf45e7846519"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
doc_updated_at: "2026-10-25T03:11:01.771Z"
doc_updated_by: "CODER"
description: "For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits."
sections:
  Summary: |-
    Authenticate repository-policy scope replans after approved scope requests

    For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.
  Scope: |-
    - In scope: For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.
    - Out of scope: unrelated refactors not required for "Authenticate repository-policy scope replans after approved scope requests".
  Plan: "1. Execute approved WorkItem authenticate-policy-scope-replan."
  Verify Steps: |-
    PLANNER fallback scaffold for "Authenticate repository-policy scope replans after approved scope requests". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Authenticate repository-policy scope replans after approved scope requests". Expected: the visible result matches ## Summary and stays inside approved scope.
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
            digest: "sha256:61a1dc967f2aa64f1c5dcec0463b421c7060ba253495622befa0b671e1ccc9ad"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:23c5943fb03d0a7e0ad71b92e1f6bb41a440d67869e205101013b2b34e68c4d8"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:562a63b9e2bfe9d2421092558abffc1f2ccb8ba68f2c266433460723d85584fc"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610250310-T2T2V1"
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
        approval_evidence_digest: "sha256:562a63b9e2bfe9d2421092558abffc1f2ccb8ba68f2c266433460723d85584fc"
        digest: "sha256:23c5943fb03d0a7e0ad71b92e1f6bb41a440d67869e205101013b2b34e68c4d8"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:01f2bc9c5311f07b7e575c2c01199d7f445cb2ff4f05f6ed4350ffa092a3d246"
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
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
            expected_outputs:
              - "authenticated-scope-replan"
              - "policy-replan-regressions"
              - "verification-evidence"
            id: "authenticate-policy-scope-replan"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610250310-T2T2V1"
      intent_digest: "sha256:d9cc1915d439161f779e0fa84a1c04944659fdcbf645ae2c4527464f97b873d2"
      migration_receipts: []
      mutation_receipts:
        capture:202610250310-T2T2V1:
          after_revision: 1
          aggregate_digest: "sha256:3b49c9e994912c818918e974b9a0a7e6e4224c386ad252c70487bd14d80a3c85"
          before_revision: 0
          command_digest: "sha256:9798f51c3ae1f60b7cea321f7f9e7c21ab81fe71b4db25a5b6449b9f8d54115e"
          effect_ids: []
          event_digests:
            - "sha256:b28fbf02378a60556958930bc12f6dc8803ec9e3144624874554cb2146be0527"
          mutation_id: "capture:202610250310-T2T2V1"
        kernel_work_item_claim_required:sha256:9a7bd6ff96cb297b28b807d9a398dd166384398f95d39e3001549ed3cb9d2e05:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:
          after_revision: 5
          aggregate_digest: "sha256:d4847705229f1751116913a26d4df3532fd95edf29a09e8adfdb4e255af76a22"
          before_revision: 4
          command_digest: "sha256:16f9d540aa87080faca636fe76b1ef6e40337d7e16a1592e20a5a0d4001c0a86"
          effect_ids: []
          event_digests:
            - "sha256:df5d3f2dc4f84aa63788bc6391fc1d7220561fea6d7fcc8d6306213fa407dac9"
          mutation_id: "kernel_work_item_claim_required:sha256:9a7bd6ff96cb297b28b807d9a398dd166384398f95d39e3001549ed3cb9d2e05:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        kernel_work_item_execution_required:sha256:52c0310b27ac6cd5033e3a9e29073efab075abc3e2cb74433e4d9eaa3991ec92:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:
          after_revision: 6
          aggregate_digest: "sha256:6442799c7d1901bb8523b80850e1ce24dd2860d1a94c07243c386141fa0c1af5"
          before_revision: 5
          command_digest: "sha256:5dce6fcf707972ed7e812ed429d375fec8a5de11bf8c6014070a549fedd42632"
          effect_ids: []
          event_digests:
            - "sha256:25223e40dcb4b7ea364918932bcf65e0ace73ecd465625416c97abb50e19bfe2"
          mutation_id: "kernel_work_item_execution_required:sha256:52c0310b27ac6cd5033e3a9e29073efab075abc3e2cb74433e4d9eaa3991ec92:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        kernel_work_item_materialization_required:sha256:c074502d8c89eda4a09fd69fb4b372d3d32c8202092a25644b1fd13c982555a2:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:
          after_revision: 4
          aggregate_digest: "sha256:0973a949ea6dbc71434c0a9447d0508fe497d1643daebf4c23fe9e1c686b1285"
          before_revision: 3
          command_digest: "sha256:c40cc85c6b7c8bc98c3cce244c2139575c97814616c3fbc2593543d833ab1222"
          effect_ids: []
          event_digests:
            - "sha256:dc32d668a13e659f7e379400a3ffaa38efb9461a0de5ff1d89d03a368542466a"
          mutation_id: "kernel_work_item_materialization_required:sha256:c074502d8c89eda4a09fd69fb4b372d3d32c8202092a25644b1fd13c982555a2:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        result:sha256:f9850c252d409a2a2370c08c7087cd3a4cb08a1c158091ec49cde6cc06665f45:
          after_revision: 2
          aggregate_digest: "sha256:a81c909d3c58079be7136eac2f2f1c79fd4e3356d4fd9e3889c55bff19c1db9e"
          before_revision: 1
          command_digest: "sha256:2f59dfb7de22d56a478086e108b4754fdc69881a7231e75761918d17e27b907d"
          effect_ids: []
          event_digests:
            - "sha256:6665d3aad152790f5db9da67d268d803182a0688ae2aad755168fbe78cb7a8dc"
          mutation_id: "result:sha256:f9850c252d409a2a2370c08c7087cd3a4cb08a1c158091ec49cde6cc06665f45"
        sha256:4621822ccad083a661034dd9f1467c4aa64824bae2fc6ca173461efd4c7b0c6d:
          after_revision: 3
          aggregate_digest: "sha256:f7ecd69d54f57cafd75a5c7e1b5cf89e5706e95a195689facf1b4cb49cdff05b"
          before_revision: 2
          command_digest: "sha256:dc0574a3e2471bc4a90a7e9c0b271a5cce4d9d1b20c6f34991b79a642b92bf55"
          effect_ids: []
          event_digests:
            - "sha256:0fa11fc0c61ddd2747c701b791429087270a62e577138fd5ea80ab8f812c5f67"
          mutation_id: "sha256:4621822ccad083a661034dd9f1467c4aa64824bae2fc6ca173461efd4c7b0c6d"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        authenticate-policy-scope-replan:
          attempt: 1
          claim_id: "sha256:c9e857f143e8b6c29047a4604e254c7b40a024308a29671f63826e14777e26fd"
          definition:
            contract_digest: "sha256:01f2bc9c5311f07b7e575c2c01199d7f445cb2ff4f05f6ed4350ffa092a3d246"
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
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
            expected_outputs:
              - "authenticated-scope-replan"
              - "policy-replan-regressions"
              - "verification-evidence"
            id: "authenticate-policy-scope-replan"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:00ce1f3b363ae6b7e0ed19a1c2398ab552b7ef8ee6cfa43a87b471927caad43f"
    documents:
      contracts:
        sha256:01f2bc9c5311f07b7e575c2c01199d7f445cb2ff4f05f6ed4350ffa092a3d246:
          acceptance_criteria:
            - "An exact approved scope request, blocked result, proposal, repository-policy approval receipt, and bounded authority allow the next EXECUTOR work order to retain scope-replan evidence."
            - "The existing explicit USER approval path remains valid."
            - "Forged SYSTEM actor, approval mode, authority/evidence digest, grant, proposal, or scope mismatch does not produce rework evidence."
            - "No Factory-specific adapter, manual journal edits, or verification bypass."
          objective: "After an exact USER-approved scope request, authenticate a revised Plan approved by the configured repository policy as well as the existing explicit USER path. Preserve retained stop/failed-check evidence and fail closed for forged or unrelated approvals."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/replan-work-items.test.ts packages/agentplane/src/commands/task/kernel-scope-request.test.ts --pool=forks --maxWorkers 1"
            - "bun run lint:core"
            - "bun run hotspots:check"
            - "bun run ci:local:full"
      intent:
        context: "For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits."
        objective: "Authenticate repository-policy scope replans after approved scope requests"
    events:
      -
        command_digest: "sha256:9798f51c3ae1f60b7cea321f7f9e7c21ab81fe71b4db25a5b6449b9f8d54115e"
        id: "capture:202610250310-T2T2V1:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610250310-T2T2V1"
        occurred_at: "2026-10-25T03:11:01.517Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610250310-T2T2V1"
        task_revision: 1
      -
        command_digest: "sha256:2f59dfb7de22d56a478086e108b4754fdc69881a7231e75761918d17e27b907d"
        id: "result:sha256:f9850c252d409a2a2370c08c7087cd3a4cb08a1c158091ec49cde6cc06665f45:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f9850c252d409a2a2370c08c7087cd3a4cb08a1c158091ec49cde6cc06665f45"
        occurred_at: "2026-10-25T03:11:56.352Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610250310-T2T2V1"
        task_revision: 2
      -
        command_digest: "sha256:dc0574a3e2471bc4a90a7e9c0b271a5cce4d9d1b20c6f34991b79a642b92bf55"
        id: "sha256:4621822ccad083a661034dd9f1467c4aa64824bae2fc6ca173461efd4c7b0c6d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:4621822ccad083a661034dd9f1467c4aa64824bae2fc6ca173461efd4c7b0c6d"
        occurred_at: "2026-10-25T03:12:16.706Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610250310-T2T2V1"
        task_revision: 3
      -
        command_digest: "sha256:c40cc85c6b7c8bc98c3cce244c2139575c97814616c3fbc2593543d833ab1222"
        id: "kernel_work_item_materialization_required:sha256:c074502d8c89eda4a09fd69fb4b372d3d32c8202092a25644b1fd13c982555a2:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c074502d8c89eda4a09fd69fb4b372d3d32c8202092a25644b1fd13c982555a2:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        occurred_at: "2026-10-25T03:12:34.528Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610250310-T2T2V1"
        task_revision: 4
      -
        command_digest: "sha256:16f9d540aa87080faca636fe76b1ef6e40337d7e16a1592e20a5a0d4001c0a86"
        id: "kernel_work_item_claim_required:sha256:9a7bd6ff96cb297b28b807d9a398dd166384398f95d39e3001549ed3cb9d2e05:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9a7bd6ff96cb297b28b807d9a398dd166384398f95d39e3001549ed3cb9d2e05:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        occurred_at: "2026-10-25T03:12:59.848Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610250310-T2T2V1"
        task_revision: 5
      -
        command_digest: "sha256:5dce6fcf707972ed7e812ed429d375fec8a5de11bf8c6014070a549fedd42632"
        id: "kernel_work_item_execution_required:sha256:52c0310b27ac6cd5033e3a9e29073efab075abc3e2cb74433e4d9eaa3991ec92:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:52c0310b27ac6cd5033e3a9e29073efab075abc3e2cb74433e4d9eaa3991ec92:sha256:25af26713d1c4ac2e2f540078239c5baafb7e9ebf770346b9b98cfc0510c1993"
        occurred_at: "2026-10-25T03:13:42.201Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610250310-T2T2V1"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Authenticate repository-policy scope replans after approved scope requests

For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.

## Scope

- In scope: For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.
- Out of scope: unrelated refactors not required for "Authenticate repository-policy scope replans after approved scope requests".

## Plan

1. Execute approved WorkItem authenticate-policy-scope-replan.

## Verify Steps

PLANNER fallback scaffold for "Authenticate repository-policy scope replans after approved scope requests". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Authenticate repository-policy scope replans after approved scope requests". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
