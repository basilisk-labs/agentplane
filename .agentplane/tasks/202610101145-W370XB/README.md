---
id: "202610101145-W370XB"
title: "Anchor semantic result continuation to exact issued authority"
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
  - "bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T11:50:43.612Z"
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
      - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
      - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
          - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
          - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
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
      digest: "sha256:a8213495590f2e48e3e1b44dbb76f486920ee13be6489b9a236c2cc389a7832a"
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
doc_updated_at: "2026-10-10T11:46:08.672Z"
doc_updated_by: "CODER"
description: "Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation."
sections:
  Summary: |-
    Anchor semantic result continuation to exact issued authority

    Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
  Scope: |-
    - In scope: Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
    - Out of scope: unrelated refactors not required for "Anchor semantic result continuation to exact issued authority".
  Plan: "1. Execute approved WorkItem anchor-issued-authority."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
            digest: "sha256:4407c74546170270cf219d823a7ac422d189b352403b7974fd8275aebe888305"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
            task_id: "202610101145-W370XB"
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
        approval_evidence_digest: "sha256:15ec72a45db4881ecc5818b8067ca5e16f742313fccd1393356d824bb4981aba"
        digest: "sha256:4e1c0fdad28cd2f5b5e4cb8bc07ee47b955aa26809865787e4beede3345d8361"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9"
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
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            expected_outputs:
              - "issued-authority-repair-evidence"
            id: "anchor-issued-authority"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610101145-W370XB"
      intent_digest: "sha256:6c26ce7d70458b6bfec8dc073d52779d3515bc7264c0c749c9e2bde462423325"
      migration_receipts: []
      mutation_receipts:
        capture:202610101145-W370XB:
          after_revision: 1
          aggregate_digest: "sha256:d67e90975678bde22d61d0517a8d9a708caf59be2807c7099382239d3914645c"
          before_revision: 0
          command_digest: "sha256:e96619f157a78afcd2acc6cd1306b26917c11537fb15b1c4e29b7cb9fb98f834"
          effect_ids: []
          event_digests:
            - "sha256:1cecbfd234b13170b812133e3aaa38dab7d3371fd2e72c3921cef4eb87be3ec2"
          mutation_id: "capture:202610101145-W370XB"
        kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 5
          aggregate_digest: "sha256:4b57ba6902a37f46bf358c24646e98c571312c8c24ce725bd8d562475643a21f"
          before_revision: 4
          command_digest: "sha256:b1ae2974b052ee6037717a9f9fb171f803f956b161387b58ba98f4982b544e67"
          effect_ids: []
          event_digests:
            - "sha256:bcad567566eda3aba8490b4c94d044234fa2aac0f21a8803ef4b476e27d90dd7"
          mutation_id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 4
          aggregate_digest: "sha256:85dca334d4bea0c4e1e28d549b32637674701d3f34599f24c50b4311866404e4"
          before_revision: 3
          command_digest: "sha256:27bdda69bf4a1fca66455b12f7f085408dfc6477de66b8603a7088d71de5ce50"
          effect_ids: []
          event_digests:
            - "sha256:4e38e9ff757fda862cad5b7eed7de025111c93f2342a1830d28772a329cc883e"
          mutation_id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5:
          after_revision: 2
          aggregate_digest: "sha256:d63d5005ec24bff70db38daf1155990cc6c2d3cfee4efbc4efc4f6140a983acd"
          before_revision: 1
          command_digest: "sha256:68880d9502624c7381496333700128218befe9cf3d3356925af37b5c72f882ef"
          effect_ids: []
          event_digests:
            - "sha256:4e4b9e351ddb578d22a8a89bc1fbd915e3f2032a33e5774acaa3f76670a9d05a"
          mutation_id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5"
        sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91:
          after_revision: 3
          aggregate_digest: "sha256:0a552cced4a661887970dd83fa72e96626487f3a68476811d4af790a22c09c13"
          before_revision: 2
          command_digest: "sha256:a61ad38eb192f164df30771f71b568d27fb145e55382f84d72d68690283586c2"
          effect_ids: []
          event_digests:
            - "sha256:e1284a8dabe4ce6a5a760b73b0e993c7ce73b5ed9c833ac3f7d9fb4e7b3f1e19"
          mutation_id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91"
      plan_history: []
      revision: 5
      schema_version: 1
      state: "ACTIVE"
      work_items:
        anchor-issued-authority:
          attempt: 1
          claim_id: "sha256:caa3b7fde37b6e6b27eff3cb1ebe86b1fabcefae3c9aaf7594c708215b6ebf98"
          definition:
            contract_digest: "sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9"
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
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            expected_outputs:
              - "issued-authority-repair-evidence"
            id: "anchor-issued-authority"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 2
          state: "CLAIMED"
          validation: null
    digest: "sha256:213c200e081143badc6357e5c7d1370a21f17b0759b8f40fa861c78d25832601"
    documents:
      contracts:
        sha256:0849325ad8d05e938f72fe722a6887e790b91af13d9cd39c0bae23e081c1e3e9:
          acceptance_criteria:
            - "Anchor continuation to the authenticated issued WorkOrder authority, not the first or last repeated repository fingerprint."
            - "Reconstruct and verify an exact delegated WorkOrder authority against its canonical lineage parent when necessary. Reject missing, substituted or ambiguous historical anchors."
            - "Apply the same trusted anchor to semantic stop continuation, semantic implementation acceptance and receiveResult; preserve task, plan, WorkItem, contract, attempt and claim binding checks."
            - "Preserve serialized KernelWorkBinding fields and existing semantic receipt/replay digests. Do not require a new core schema or public artifact field."
            - "Reproduce approval fingerprint A, authority delta, genuine issued authority with fingerprint A, then valid scoped implementation continuation B; accept only continuation from the exact issued authority."
            - "Negative regressions cover wrong or missing authority, unrelated repeated fingerprint, wrong claim/attempt/plan, out-of-scope paths and a non-implementation transition after the genuine anchor; ordinary unchanged bindings and replay remain compatible."
            - "Do not mutate Factory or WS task state/results, expand authority, rewrite native receipts or introduce a fingerprint-selection fallback."
            - "Before implementation, obtain operator plan review and an isolated native task checkout on reviewed source; any old-base bootstrap/import must use genuine supported recovery and fresh evidence."
          objective: "Repair native result continuation by anchoring all three acceptance paths to trusted exact issued authority, preserving existing binding/replay serialization."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
            - "bun run typecheck"
            - "bun run hotspots:check"
      intent:
        context: "Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation."
        objective: "Anchor semantic result continuation to exact issued authority"
    events:
      -
        command_digest: "sha256:e96619f157a78afcd2acc6cd1306b26917c11537fb15b1c4e29b7cb9fb98f834"
        id: "capture:202610101145-W370XB:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101145-W370XB"
        occurred_at: "2026-10-10T11:46:08.486Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101145-W370XB"
        task_revision: 1
      -
        command_digest: "sha256:68880d9502624c7381496333700128218befe9cf3d3356925af37b5c72f882ef"
        id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:25c29b60e0ff8101d729aacf258623e0ff1825b039223f3271fd2215f58c5ea5"
        occurred_at: "2026-10-10T11:49:40.516Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101145-W370XB"
        task_revision: 2
      -
        command_digest: "sha256:a61ad38eb192f164df30771f71b568d27fb145e55382f84d72d68690283586c2"
        id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:62b1a1eaed3cffcaefcec306053e73aa996467423596cf59b2e571c103260b91"
        occurred_at: "2026-10-10T11:50:20.156Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101145-W370XB"
        task_revision: 3
      -
        command_digest: "sha256:27bdda69bf4a1fca66455b12f7f085408dfc6477de66b8603a7088d71de5ce50"
        id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:95e578aa7ccf964f366f117a04bf0c60e418d42f130a38d41e0fa4a36379a898:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:50:49.956Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101145-W370XB"
        task_revision: 4
      -
        command_digest: "sha256:b1ae2974b052ee6037717a9f9fb171f803f956b161387b58ba98f4982b544e67"
        id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0d6947bb5333c5a542cc460a13b18997a9960e73d8621583a20beb6198aae487:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:51:27.708Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101145-W370XB"
        task_revision: 5
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Anchor semantic result continuation to exact issued authority

Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.

## Scope

- In scope: Fix repeated repository-fingerprint authority lineage selection in native semantic result acceptance. Anchor all three continuation checks to the authenticated issued WorkOrder authority, including exact delegated-parent reconstruction when required. Preserve existing KernelWorkBinding serialization and receipt replay digests; reject absent or ambiguous historical anchors rather than guessing. Scope is the lifecycle helper, semantic result adapter and their adjacent tests. No Factory or WS task-state edits, result rewriting, or authority expansion. Prepare a native plan for operator review before implementation.
- Out of scope: unrelated refactors not required for "Anchor semantic result continuation to exact issued authority".

## Plan

1. Execute approved WorkItem anchor-issued-authority.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-semantic-result.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
