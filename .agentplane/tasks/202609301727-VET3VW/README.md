---
id: "202609301727-VET3VW"
title: "Document workflow modes and shared feature deliveries as roadmap release 0.7.15"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "python3 agentplane-roadmap-r2/validate_roadmap.py"
plan_approval:
  state: "approved"
  updated_at: "2026-09-30T17:29:59.917Z"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "agentplane-roadmap-r2"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "agentplane-roadmap-r2"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
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
          - "agentplane-roadmap-r2"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:00cdc84302bff84524a593ec19f00717e1c15d5103530ab286844390cd976e06"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
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
        - "docs_contract"
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
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-30T17:27:14.568Z"
doc_updated_by: "CODER"
description: "User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes."
sections:
  Summary: |-
    Document workflow modes and shared feature deliveries as roadmap release 0.7.15

    User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.
  Scope: |-
    - In scope: User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.
    - Out of scope: unrelated refactors not required for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15".
  Plan: "1. Execute approved WorkItem roadmap-0715."
  Verify Steps: |-
    PLANNER fallback scaffold for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "1053fee6f16c70a25154d54d4664ccfe609b5082"
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
            digest: "sha256:f695409fd4165b357cdd13c668568b76a29fb518695aa5098e810767dfadee53"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e6686e045bd00ee1d4ada18fcb08769f59abf68ad4eed2728fd65a056df9023c"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:95c544d2a171c7190c1041aa718e821a60758cb8754ff28f0792945c7b021c27"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "tests"
            repository_fingerprint: "sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "agentplane-roadmap-r2"
            task_id: "202609301727-VET3VW"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:95c544d2a171c7190c1041aa718e821a60758cb8754ff28f0792945c7b021c27"
        digest: "sha256:e6686e045bd00ee1d4ada18fcb08769f59abf68ad4eed2728fd65a056df9023c"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d00fe1eb143d65893918dc287d6b41e16900d15b1f08c2a8be7d55cec4fb3adc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "agentplane-roadmap-r2"
            expected_outputs:
              - "workflow-delivery-release-stage"
            id: "roadmap-0715"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609301727-VET3VW"
      intent_digest: "sha256:af17785988dcbdcbda38d68d02e263fe9fca4b13208b590f2e5cd4c5a2bb6862"
      migration_receipts: []
      mutation_receipts:
        capture:202609301727-VET3VW:
          after_revision: 1
          aggregate_digest: "sha256:985a433f7b64c53474fa892928d3a7fa756524e459bb8c83d8248253498f050b"
          before_revision: 0
          command_digest: "sha256:29d75f589b4e3122596cf3f6c69c9088b194ed2688448fbbc842a73613ae2d59"
          effect_ids: []
          event_digests:
            - "sha256:72e760f6753eca82c247b0dd62c8ca4bd5fdd912ab3e48cd00673203f721b40e"
          mutation_id: "capture:202609301727-VET3VW"
        kernel_work_item_claim_required:sha256:7784bc032e267415e2bbb390fc6ca71543fb342c957c09912989911cd6b958c8:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 5
          aggregate_digest: "sha256:79694326f222b0bc6de57ed54ed76922a9c6f5142f354095b25e03d02bda7919"
          before_revision: 4
          command_digest: "sha256:291061a9fe8ab436fd3adb601932baef15f16fc99bc47da8b8a0cba4610d669f"
          effect_ids: []
          event_digests:
            - "sha256:344cb60f9e44e64d4db3bf7c3ed39576e9ba3608d28be99f3d92a18845e03359"
          mutation_id: "kernel_work_item_claim_required:sha256:7784bc032e267415e2bbb390fc6ca71543fb342c957c09912989911cd6b958c8:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_execution_required:sha256:c261dd9b27d529311ea9636f0b9b363db0679fc9b1ebb7bc941fb81f9e5bcea5:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 6
          aggregate_digest: "sha256:31aba81e778e59ab24ed8fce668efea76014e0c110bcd300475cdfe5f59f4751"
          before_revision: 5
          command_digest: "sha256:f84636f85a05d692807027c3aee949a9d8e246083e2b4549160bd8b9e350afa3"
          effect_ids: []
          event_digests:
            - "sha256:e0cc1fae0ba4d23fb1c328c3d1d44cfdd5772a3ea503593633afdd3a381a30a0"
          mutation_id: "kernel_work_item_execution_required:sha256:c261dd9b27d529311ea9636f0b9b363db0679fc9b1ebb7bc941fb81f9e5bcea5:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_materialization_required:sha256:138db2676b495e578175a72cfaf0aa09d99430a74d289964acd5040f36f3481c:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 4
          aggregate_digest: "sha256:3d16369d7e59008ec80998dab2520a0f6b811f13cfeb227d5f42b9a5d148d352"
          before_revision: 3
          command_digest: "sha256:36f9b59779975e98d2bc190670e91502949dec9c6953073ec5537fcde7a0b0c9"
          effect_ids: []
          event_digests:
            - "sha256:adf1f4a8977ff8d4ac058c83565ccb032d35f2aed2188912ef264efa7388c3c4"
          mutation_id: "kernel_work_item_materialization_required:sha256:138db2676b495e578175a72cfaf0aa09d99430a74d289964acd5040f36f3481c:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        result:sha256:5f5f5f69bd359363266818740eb4d47e439e273599214d1e7155c0a3564beeca:
          after_revision: 2
          aggregate_digest: "sha256:7e5315c96b9c2b7b3af43f7eddebf5102eb0c08fdb4ee8d9c313ffdd5ae224d8"
          before_revision: 1
          command_digest: "sha256:40aa4e85d2b29c960f850d98731facf9bc27e4c135261ae0baaaa5064d655d87"
          effect_ids: []
          event_digests:
            - "sha256:bc06b26d2bb96ec77831ff02efe6c35419f972fa9b5d83891afce2dfdc81978a"
          mutation_id: "result:sha256:5f5f5f69bd359363266818740eb4d47e439e273599214d1e7155c0a3564beeca"
        sha256:27f229b633cc4a82cad6d50f506b0da9d687d0c8c79c1381e6669316b330d870:
          after_revision: 3
          aggregate_digest: "sha256:67b10c9cc6b440a1bfa91e9da9a736df6602acb39859a0a16ff148288cc628df"
          before_revision: 2
          command_digest: "sha256:e609b6c999c2a6385577fbfe58ecfcaa5b48cf43117f20572871580030eec129"
          effect_ids: []
          event_digests:
            - "sha256:1fafb5567734e665989356859b9348fc3dc4939d38319a2b2141ead6def27be2"
          mutation_id: "sha256:27f229b633cc4a82cad6d50f506b0da9d687d0c8c79c1381e6669316b330d870"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        roadmap-0715:
          attempt: 1
          claim_id: "sha256:a56ab349cbd718c8965a42ad67ced60f926a5604335a4653b3583455c79fc752"
          definition:
            contract_digest: "sha256:d00fe1eb143d65893918dc287d6b41e16900d15b1f08c2a8be7d55cec4fb3adc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "agentplane-roadmap-r2"
            expected_outputs:
              - "workflow-delivery-release-stage"
            id: "roadmap-0715"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:ba8adad7843d28c8400dc3f92f3e13f0600ebc1bf1e34649f16e7a5105a83b6d"
    documents:
      contracts:
        sha256:d00fe1eb143d65893918dc287d6b41e16900d15b1f08c2a8be7d55cec4fb3adc:
          acceptance_criteria:
            - "All three release summaries link to a coherent 0.7.15 stage following 0.7.14."
            - "The stage specifies mode selection precedence, branch pinning, shared delivery readiness, authority boundaries, compatibility and negative acceptance cases."
            - "EVALUATOR omission remains governed by 0.7.14 qualification. Recipe engine, automatic recipe publication and generalized memory remain excluded."
            - "The 132 existing task cards and their dependency graph are unchanged; the new stage is explicitly outside their validated decomposition."
            - "Roadmap validator passes, changed-document links resolve, and git diff has no whitespace errors."
          objective: "Add releases/0.7.15.md and update README.md, EXECUTION-CHARTER.md and agentplane-0.7.9-0.7.14-roadmap-r2.md within agentplane-roadmap-r2. Define direct on the selected current branch without implicit merge, isolated branch from an explicit base, and branch_pr with delivery-level PR readiness. Define shared feature delivery membership, explicit closure intent, aggregate checks, clean workspace, separate merge authority, frozen route selection, migration and recovery acceptance. Preserve 0.7.13 and 0.7.14 scope. Mark the milestone as planned after 0.7.14, pending decomposition and runtime qualification; retain the existing filename and 132-card catalogue. Do not implement runtime behavior or publish anything."
          role: "EXECUTOR"
          verification_commands:
            - "python3 agentplane-roadmap-r2/validate_roadmap.py"
            - "git diff --check"
      intent:
        context: "User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes."
        objective: "Document workflow modes and shared feature deliveries as roadmap release 0.7.15"
    events:
      -
        command_digest: "sha256:29d75f589b4e3122596cf3f6c69c9088b194ed2688448fbbc842a73613ae2d59"
        id: "capture:202609301727-VET3VW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609301727-VET3VW"
        occurred_at: "2026-09-30T17:27:14.343Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609301727-VET3VW"
        task_revision: 1
      -
        command_digest: "sha256:40aa4e85d2b29c960f850d98731facf9bc27e4c135261ae0baaaa5064d655d87"
        id: "result:sha256:5f5f5f69bd359363266818740eb4d47e439e273599214d1e7155c0a3564beeca:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:5f5f5f69bd359363266818740eb4d47e439e273599214d1e7155c0a3564beeca"
        occurred_at: "2026-09-30T17:28:56.107Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609301727-VET3VW"
        task_revision: 2
      -
        command_digest: "sha256:e609b6c999c2a6385577fbfe58ecfcaa5b48cf43117f20572871580030eec129"
        id: "sha256:27f229b633cc4a82cad6d50f506b0da9d687d0c8c79c1381e6669316b330d870:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:27f229b633cc4a82cad6d50f506b0da9d687d0c8c79c1381e6669316b330d870"
        occurred_at: "2026-09-30T17:29:32.753Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609301727-VET3VW"
        task_revision: 3
      -
        command_digest: "sha256:36f9b59779975e98d2bc190670e91502949dec9c6953073ec5537fcde7a0b0c9"
        id: "kernel_work_item_materialization_required:sha256:138db2676b495e578175a72cfaf0aa09d99430a74d289964acd5040f36f3481c:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:138db2676b495e578175a72cfaf0aa09d99430a74d289964acd5040f36f3481c:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:30:36.905Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609301727-VET3VW"
        task_revision: 4
      -
        command_digest: "sha256:291061a9fe8ab436fd3adb601932baef15f16fc99bc47da8b8a0cba4610d669f"
        id: "kernel_work_item_claim_required:sha256:7784bc032e267415e2bbb390fc6ca71543fb342c957c09912989911cd6b958c8:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7784bc032e267415e2bbb390fc6ca71543fb342c957c09912989911cd6b958c8:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:31:21.466Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609301727-VET3VW"
        task_revision: 5
      -
        command_digest: "sha256:f84636f85a05d692807027c3aee949a9d8e246083e2b4549160bd8b9e350afa3"
        id: "kernel_work_item_execution_required:sha256:c261dd9b27d529311ea9636f0b9b363db0679fc9b1ebb7bc941fb81f9e5bcea5:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c261dd9b27d529311ea9636f0b9b363db0679fc9b1ebb7bc941fb81f9e5bcea5:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:33:11.417Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609301727-VET3VW"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Document workflow modes and shared feature deliveries as roadmap release 0.7.15

User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.

## Scope

- In scope: User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.
- Out of scope: unrelated refactors not required for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15".

## Plan

1. Execute approved WorkItem roadmap-0715.

## Verify Steps

PLANNER fallback scaffold for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
