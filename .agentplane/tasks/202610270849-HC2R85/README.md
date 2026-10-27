---
id: "202610270849-HC2R85"
title: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
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
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T08:51:46.524Z"
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
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
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
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
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
          - "packages/agentplane/src/commands/doctor/archive.test.ts"
          - "packages/agentplane/src/commands/doctor/archive.ts"
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
      digest: "sha256:24f560f34de89f1be390218d7ce8714b205115bcbad51ce0c3732dd26dcbdf26"
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
doc_updated_at: "2026-10-27T08:49:46.969Z"
doc_updated_by: "CODER"
description: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
sections:
  Summary: |-
    Bound doctor archive commit inspection in partial clones without lazy object fetch

    Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
  Scope: |-
    - In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
    - Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".
  Plan: "1. Execute approved WorkItem doctor-archive-local-objects."
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "a4b1534f06f52d10ae96e437a99514abe2629f52"
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
            digest: "sha256:5fbca06a71f710ccdca1a5f8f64ddbf59b13bf6a7100f5f658b5a6b3f9f2e2de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
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
        approval_evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
        digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610270849-HC2R85"
      intent_digest: "sha256:b210304f3d1fd2f7a4e4686ee838572cfc6ad5a6761d5d68278b7f5bb0ffc5ca"
      migration_receipts: []
      mutation_receipts:
        capture:202610270849-HC2R85:
          after_revision: 1
          aggregate_digest: "sha256:9724143c494a86b3c4898fa7deb5773b9254e5dd944029d9d53d631651a28b7e"
          before_revision: 0
          command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
          effect_ids: []
          event_digests:
            - "sha256:86a8f3c67c5fbc9b3544f7b62ef618456870f1b15a84fce19fc0c0982440aab9"
          mutation_id: "capture:202610270849-HC2R85"
        kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 5
          aggregate_digest: "sha256:b63e1c611b79795df1298ff1c26f55d3bc9f7187ceab9b04e525c6cd9600357f"
          before_revision: 4
          command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
          effect_ids: []
          event_digests:
            - "sha256:9ffb412303311e3dcd55145149f5e2d532b32f3561b25c80fab6e1bd75a31cd2"
          mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 6
          aggregate_digest: "sha256:13d5ebe44de8fe5e780bce36199ee3a0ab53a9494880f7c38452233b91e46c43"
          before_revision: 5
          command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
          effect_ids: []
          event_digests:
            - "sha256:862a201814e05c1ffcbe63d18f014f33cb18a2346cbe10d686f3295a583de032"
          mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 4
          aggregate_digest: "sha256:7e3bfe10a4832c20456f871676552304eb5b5ba9fc7ab28c97cc27d37fda87f9"
          before_revision: 3
          command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
          effect_ids: []
          event_digests:
            - "sha256:6016af24f5221fd5dff9a036b8c2a844de143abe5128dcf235637f4389374b8a"
          mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:
          after_revision: 2
          aggregate_digest: "sha256:f7b4ba85b56aba3ad5e685cfbf5625f63345eb2233418a3d51410653e3a9d6e5"
          before_revision: 1
          command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
          effect_ids: []
          event_digests:
            - "sha256:1c470b2535b92ae9001f3ce6af8b961178c08a131acb48728d43851011a147ad"
          mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:
          after_revision: 3
          aggregate_digest: "sha256:4629f8b206d9b0d41a542b57f181a2b040e89977cac3c35cafeae1f3c5ce641d"
          before_revision: 2
          command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
          effect_ids: []
          event_digests:
            - "sha256:c5aab388a7103ba21929049cce7ba5912f821ef319b0f1c1bcc5e1e31087825a"
          mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        doctor-archive-local-objects:
          attempt: 1
          claim_id: "sha256:531fb65471de56d07e89dd1427219f6bbd7fe6f0e423a76e46b770c7b37abedb"
          definition:
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:ba8f7119f2b0597a9805a51c909d7226609ba867b1195d22e9d16811460eecb0"
    documents:
      contracts:
        sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a:
          acceptance_criteria:
            - "Historical summary lookup never triggers lazy promisor network fetch or unbounded object download; locally available commits continue to classify close-commit references as before."
            - "Missing or unreadable historical objects remain visible as INFO unknown-hash findings, while other doctor failures are unchanged."
            - "Focused tests cover local commit, unavailable historical object, and a promisor-style missing-object lookup without a network fetch."
          objective: "Ensure doctor archive historical DONE-task commit summaries use only locally available Git objects, with bounded process behavior and explicit INFO findings for absent objects in partial/promisor clones."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
        objective: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
    events:
      -
        command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
        id: "capture:202610270849-HC2R85:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610270849-HC2R85"
        occurred_at: "2026-10-27T08:49:46.901Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610270849-HC2R85"
        task_revision: 1
      -
        command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
        id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        occurred_at: "2026-10-27T08:51:07.542Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610270849-HC2R85"
        task_revision: 2
      -
        command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
        id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
        occurred_at: "2026-10-27T08:51:30.345Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610270849-HC2R85"
        task_revision: 3
      -
        command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
        id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:51:54.603Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610270849-HC2R85"
        task_revision: 4
      -
        command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
        id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:52:26.744Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610270849-HC2R85"
        task_revision: 5
      -
        command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
        id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:54:01.570Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610270849-HC2R85"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bound doctor archive commit inspection in partial clones without lazy object fetch

Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.

## Scope

- In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
- Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".

## Plan

1. Execute approved WorkItem doctor-archive-local-objects.

## Verify Steps

PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
