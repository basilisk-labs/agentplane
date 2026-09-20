---
id: "202609201056-GYZDBW"
title: "Isolate canonical hosted-close regression"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "hosted-close"
  - "meta"
  - "release"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run lint"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
      escalation_reasons:
        - "effect_release_metadata"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-20T10:56:33.532Z"
doc_updated_by: "CODER"
description: "Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate."
sections:
  Summary: |-
    Isolate canonical hosted-close regression

    Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
  Scope: |-
    - In scope: Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
    - Out of scope: unrelated refactors not required for "Isolate canonical hosted-close regression".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Isolate canonical hosted-close regression". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Isolate canonical hosted-close regression". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "c9265ac7041aba0df47b89c7bc81c111d4a5c70d"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e6bd2c9648237ac82978f6fb8b6755aac16d4d05be832e7261681bc5fd503e22"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:485757f73df94f90edbd11d8d6dff44ddef61f874ade26348b64160a4b80757a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close.command.ts"
            task_id: "202609201056-GYZDBW"
            validation_requirements:
              - "bun run lint"
              - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
              - "node scripts/checks/run-local-ci-group.mjs docs-schema"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:485757f73df94f90edbd11d8d6dff44ddef61f874ade26348b64160a4b80757a"
        digest: "sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/hosted-close.command.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
            expected_outputs:
              - "hosted-close-guard"
              - "isolated-regression-test"
            id: "isolate-canonical-hosted-close"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609201056-GYZDBW"
      intent_digest: "sha256:a6fac88336c0dae5d9d773042db740caaf8ea2d06ecd4ea15cdea554481a4881"
      migration_receipts: []
      mutation_receipts:
        capture:202609201056-GYZDBW:
          after_revision: 1
          aggregate_digest: "sha256:e24bcf16bb2ed661a92daabc0f2365614ba868c7bb30b5f0b062b62fc799dc2b"
          before_revision: 0
          command_digest: "sha256:3a6f936a7c77515637299aaf5ec745f0fbc77d90ce985c7ae804ea0388971c64"
          effect_ids: []
          event_digests:
            - "sha256:e39f743488746e4aa5d492e09937ed14b7e60cabc5d8caf598768de97032ed9c"
          mutation_id: "capture:202609201056-GYZDBW"
        kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 5
          aggregate_digest: "sha256:6e8d48dd31b58b8df1c98425b47cf724d0eb7dcedd67a1c7313ece74db8afc88"
          before_revision: 4
          command_digest: "sha256:c70bf3dc2b0eb84bc3b84519654ac7cfb1b389cd474275f2658fd3882d36238b"
          effect_ids: []
          event_digests:
            - "sha256:569a8abb83b5b9f0f2aba9ad2fa2bfd34847e150b1fcf2a445c188c3c58a324a"
          mutation_id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 6
          aggregate_digest: "sha256:f9274f4b095b37f4d8624cadeba6e5a000b53d23ee46fd814000e2e0c6265f22"
          before_revision: 5
          command_digest: "sha256:51be571f634e9cb3f1ca1e9dfbd213271fd3faa6c72c3ef136b4a02a53e2b9f1"
          effect_ids: []
          event_digests:
            - "sha256:006a9ee8496c560a286052954bc809ef3f3e72d7a42dc2d7487422de0b80b406"
          mutation_id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 4
          aggregate_digest: "sha256:ff96f28c6579aadeef1132d60b925147727e84ac851d4e61b08e91413c0102ad"
          before_revision: 3
          command_digest: "sha256:0c61b2b389bec76418c96977929936caf815a0f1f91f2fc9d8087d16b7251dd8"
          effect_ids: []
          event_digests:
            - "sha256:e81a135f6d5a431a999a7950fcc7e50315c9824a6eb47e436b501b0186e85da8"
          mutation_id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed:
          after_revision: 2
          aggregate_digest: "sha256:9f2bba074b6c4d50ee75df0ded98f0a477044211c80c211612cc24d172596dcc"
          before_revision: 1
          command_digest: "sha256:36710da4f78fe7e26502825dcf0b2b8ba12f030d422494e965754748231ff4fb"
          effect_ids: []
          event_digests:
            - "sha256:61befde4c655fadfefad313cd3f2f1ceb07f09daf5ad1d01d5fac008c6a34404"
          mutation_id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed"
        sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216:
          after_revision: 3
          aggregate_digest: "sha256:6dc803c396ced8cb08dd77f869994196754de5b08bdd6334d4ab0d0b8d054c32"
          before_revision: 2
          command_digest: "sha256:fcda5f6aa54eda988aee55433a4d87907a319045ab0424797ede270ba84d1307"
          effect_ids: []
          event_digests:
            - "sha256:83941ac8db30d220b32bad3bdf5eebb50f8647ca7ed04013cbaa892f0b80a89e"
          mutation_id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        isolate-canonical-hosted-close:
          attempt: 1
          claim_id: "sha256:069e040a715b82a21b29ec25b71439dc03cd3a2d19a5c348e608017698836656"
          definition:
            contract_digest: "sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/hosted-close.command.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
            expected_outputs:
              - "hosted-close-guard"
              - "isolated-regression-test"
            id: "isolate-canonical-hosted-close"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:b30c588fdb593b9775a954506384477ac42cee0774869aca524eddbf4064186b"
    documents:
      contracts:
        sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f:
          acceptance_criteria:
            - "Canonical hosted-close exits successfully without changing HEAD or canonical task bytes."
            - "Legacy hosted-close tests remain green."
            - "The dedicated regression test respects architecture layering and the oversized-test baseline."
          objective: "Return a successful no-op for canonical tasks before every legacy hosted-close mutation and prove it in an isolated CLI integration test while preserving legacy behavior and test-size policy."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
            - "bun run lint"
            - "node scripts/checks/run-local-ci-group.mjs docs-schema"
      intent:
        context: "Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate."
        objective: "Isolate canonical hosted-close regression"
    events:
      -
        command_digest: "sha256:3a6f936a7c77515637299aaf5ec745f0fbc77d90ce985c7ae804ea0388971c64"
        id: "capture:202609201056-GYZDBW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609201056-GYZDBW"
        occurred_at: "2026-09-20T10:56:33.498Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609201056-GYZDBW"
        task_revision: 1
      -
        command_digest: "sha256:36710da4f78fe7e26502825dcf0b2b8ba12f030d422494e965754748231ff4fb"
        id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed"
        occurred_at: "2026-09-20T10:59:03.184Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609201056-GYZDBW"
        task_revision: 2
      -
        command_digest: "sha256:fcda5f6aa54eda988aee55433a4d87907a319045ab0424797ede270ba84d1307"
        id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216"
        occurred_at: "2026-09-20T10:59:13.245Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609201056-GYZDBW"
        task_revision: 3
      -
        command_digest: "sha256:0c61b2b389bec76418c96977929936caf815a0f1f91f2fc9d8087d16b7251dd8"
        id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T10:59:21.122Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609201056-GYZDBW"
        task_revision: 4
      -
        command_digest: "sha256:c70bf3dc2b0eb84bc3b84519654ac7cfb1b389cd474275f2658fd3882d36238b"
        id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T10:59:24.957Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609201056-GYZDBW"
        task_revision: 5
      -
        command_digest: "sha256:51be571f634e9cb3f1ca1e9dfbd213271fd3faa6c72c3ef136b4a02a53e2b9f1"
        id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T11:02:23.544Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609201056-GYZDBW"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Isolate canonical hosted-close regression

Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.

## Scope

- In scope: Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
- Out of scope: unrelated refactors not required for "Isolate canonical hosted-close regression".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Isolate canonical hosted-close regression". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Isolate canonical hosted-close regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
