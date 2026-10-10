---
id: "202610101212-RDPWEM"
title: "Bind publication base to authenticated reviewed import"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T12:14:51.649Z"
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
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
          - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
          - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
          - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
      digest: "sha256:8703396c720806cb1faf0487f0ce45ea9b357791d545858007833c7b97cdad1a"
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
doc_updated_at: "2026-10-10T12:12:30.002Z"
doc_updated_by: "CODER"
description: "Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review."
sections:
  Summary: |-
    Bind publication base to authenticated reviewed import

    Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
  Scope: |-
    - In scope: Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
    - Out of scope: unrelated refactors not required for "Bind publication base to authenticated reviewed import".
  Plan: "1. Execute approved WorkItem bind-reviewed-publication-base."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
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
            digest: "sha256:daf77c13963c01f0463aedc3efe61bfe1c2d7ec36151bd266a61fad1e160f197"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
            task_id: "202610101212-RDPWEM"
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
        approval_evidence_digest: "sha256:e9afa2fd15e756c1da7847f6696d49a886853ceee8e3bdcb4bb4683684bc928f"
        digest: "sha256:2e4c358b7e44fbb96dce29a20b454a59e63d22c8afba3f00955182433f8c88b4"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4"
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
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
            expected_outputs:
              - "publication-base-repair-evidence"
            id: "bind-reviewed-publication-base"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610101212-RDPWEM"
      intent_digest: "sha256:441c567517183ea00fa7e0de6fa24e214e9faf872e3507a261bb89218174909a"
      migration_receipts: []
      mutation_receipts:
        capture:202610101212-RDPWEM:
          after_revision: 1
          aggregate_digest: "sha256:71988ac9a7219bcf3780ef4e0684651a8f0a95db6e0a03188f203c863975de66"
          before_revision: 0
          command_digest: "sha256:dba1511268d58b128ddc88cf91692ef759b53c3f580d5cb442b37450d1e1b82b"
          effect_ids: []
          event_digests:
            - "sha256:23fa5d60c87aef36e038107e479bfe63571e9a31f8d690adaf607627c5fd6c4a"
          mutation_id: "capture:202610101212-RDPWEM"
        kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 5
          aggregate_digest: "sha256:606e5621ff4f9fe4b662a2c74bac9977304886b466938da31607c67eb039164e"
          before_revision: 4
          command_digest: "sha256:0a8b604ea2839897f934c2f310c406b0a2e30278855d0b8be1dadd4b30880854"
          effect_ids: []
          event_digests:
            - "sha256:563c1890bda147f4c3b8d0694010257c2c41063c5ded60daf5b11449d6d5760f"
          mutation_id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 4
          aggregate_digest: "sha256:94e70d288f7fdf0d4a200ceccde6a6b445d3733345a17eefc942bbeb2f543839"
          before_revision: 3
          command_digest: "sha256:fa504306923802f36810f27dd5babc251db64c1400908b1054c31a1870bbdb19"
          effect_ids: []
          event_digests:
            - "sha256:97c997dc9575c062b3d2956939ff20a94901b1b7bc9db304d34fb36a61890266"
          mutation_id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6:
          after_revision: 2
          aggregate_digest: "sha256:065def9684fbb8b84a7d744aec5585d15a25265215fbbed1e90d39e33a26f2bf"
          before_revision: 1
          command_digest: "sha256:ac050e04beac99197e7ace8c71dfd6e87f3de6a972cab37c0a0876a3d0c4ed30"
          effect_ids: []
          event_digests:
            - "sha256:35a94ae123be2cd05d0d284a8ed25e44e1466cf935aa5093e18a70e5f8ae77e4"
          mutation_id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6"
        sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce:
          after_revision: 3
          aggregate_digest: "sha256:6f47064178a355896353dc51dac533a6fe06fdb94c15cd87c13656ee4ce1e1db"
          before_revision: 2
          command_digest: "sha256:2dcaaef336e99bc1ef6ae2a5b54473462da03a818242f16b9a71f2c3a67a1e5d"
          effect_ids: []
          event_digests:
            - "sha256:51c52c546d571aab2aeaf53b7e4859223d52dc771e9fe2fc34b2186e4156a809"
          mutation_id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce"
      plan_history: []
      revision: 5
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bind-reviewed-publication-base:
          attempt: 1
          claim_id: "sha256:d29707be9dbd71488b1c45a0d0cf33cca3c92ee8d9cb6e45e5240f3ad20f5db0"
          definition:
            contract_digest: "sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4"
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
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
            expected_outputs:
              - "publication-base-repair-evidence"
            id: "bind-reviewed-publication-base"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 2
          state: "CLAIMED"
          validation: null
    digest: "sha256:990ec402005fe75b1128dd43c176a52fa9ba954a17a4216fbf5d43e0894bb72c"
    documents:
      contracts:
        sha256:5c98afdfced33b963074ced17d77fb5b65d8a4363ebb5a6c36e461fa61a114d4:
          acceptance_criteria:
            - "Preserve original task_execution_context base and original WorkItem implementation evidence unchanged."
            - "Require valid canonical authority lineage and its latest authenticated reviewed-base import chain reaching exact current final-validated Git HEAD. Validate retained final evidence identity; a mutable projection alone is insufficient."
            - "Require an explicit supported publication branch pin and observed matching remote target SHA equal to the authenticated import new_commit and current verified HEAD. Reject arbitrary ancestors, unrelated descendants and target drift."
            - "Use the derived publication base consistently for ownership guard, diffstat and generated PR metadata in both sync entry points. Do not edit PR metadata or canonical state by hand."
            - "Ordinary tasks without a matching reviewed import retain existing frozen-base behavior. Invalid claimed recovery evidence fails closed before writes."
            - "Real Git/native evidence tests cover old task base to reviewed main recovery and unchanged ordinary task behavior; reject missing/forged import, wrong parent/checkpoint, HEAD/verification drift, remote drift and foreign artifacts introduced after the authenticated base."
            - "Do not rerun WS full CI for this routing repair. Independently review and qualify this implementation before any operator invocation on WS. Keep original failed verification and publication receipts."
          objective: "Resolve a separately explicit publication branch only from exact authenticated reviewed-base import and current final verification, then use that base consistently in PR artifact synchronization."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            - "bun run typecheck"
            - "bun run hotspots:check"
      intent:
        context: "Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review."
        objective: "Bind publication base to authenticated reviewed import"
    events:
      -
        command_digest: "sha256:dba1511268d58b128ddc88cf91692ef759b53c3f580d5cb442b37450d1e1b82b"
        id: "capture:202610101212-RDPWEM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101212-RDPWEM"
        occurred_at: "2026-10-10T12:12:29.903Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101212-RDPWEM"
        task_revision: 1
      -
        command_digest: "sha256:ac050e04beac99197e7ace8c71dfd6e87f3de6a972cab37c0a0876a3d0c4ed30"
        id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ec9645484a5c74e58ded08033f22ba2644af805c38be573bb7808bae49b244e6"
        occurred_at: "2026-10-10T12:14:16.785Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101212-RDPWEM"
        task_revision: 2
      -
        command_digest: "sha256:2dcaaef336e99bc1ef6ae2a5b54473462da03a818242f16b9a71f2c3a67a1e5d"
        id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:59f041f90405a6045bcfb995a7a55709da4872000c95ac57f586fbde2ea3e4ce"
        occurred_at: "2026-10-10T12:14:41.304Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101212-RDPWEM"
        task_revision: 3
      -
        command_digest: "sha256:fa504306923802f36810f27dd5babc251db64c1400908b1054c31a1870bbdb19"
        id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:753ffca9efdf7131da2e2a00600bd06becc7b458629952ace5cac72808d8b890:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-10T12:14:59.951Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101212-RDPWEM"
        task_revision: 4
      -
        command_digest: "sha256:0a8b604ea2839897f934c2f310c406b0a2e30278855d0b8be1dadd4b30880854"
        id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:2b3a580f809f1bb3a656a3ed0eaf11c6a2f34060ab95d296f96d8cebd3f01374:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-10T12:15:24.092Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101212-RDPWEM"
        task_revision: 5
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind publication base to authenticated reviewed import

Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.

## Scope

- In scope: Recover publication routing after an explicitly reviewed base import. Preserve original task execution base and WorkItem evidence. Resolve an explicitly pinned publication target only when its actual remote head equals the final-validated current HEAD and authenticated reviewed-base import lineage. Apply the derived base consistently to ownership guards, diffstat and PR metadata; reject missing or forged imports, arbitrary ancestors, remote drift and foreign artifacts after the authenticated base. Trace WS6H31 native final validation PASS followed by obsolete RDZE4P publication guard. Do not rewrite canonical state, PR metadata by hand, or rerun WS full CI. Prepare bounded plan for independent operator review.
- Out of scope: unrelated refactors not required for "Bind publication base to authenticated reviewed import".

## Plan

1. Execute approved WorkItem bind-reviewed-publication-base.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
