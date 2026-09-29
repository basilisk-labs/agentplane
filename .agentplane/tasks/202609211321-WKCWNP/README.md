---
id: "202609211321-WKCWNP"
title: "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "compatibility"
  - "lifecycle"
task_kind: "release"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "bun run bench:compatibility:check"
  - "bun run ci:local:full"
  - "bun run test:release:critical"
  - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T13:23:00.196Z"
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
      - "release_metadata"
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
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
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:9d51a4e9b780aa87aefbcf97f67fdb1821d9a38c44f1065fbe5e972d44ac7b75"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T13:21:31.342Z"
doc_updated_by: "CODER"
description: "Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged."
sections:
  Summary: |-
    Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate

    Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
  Scope: |-
    - In scope: Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
    - Out of scope: unrelated refactors not required for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate".
  Plan: "1. Execute approved WorkItem completion-and-compatibility-repair."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "task/202609211051-X92CWM/repair-the-demonstrated-0-7-11-release-blockers"
    base_sha: "480658c6a63ca7680dd86fc55fd4f887f3ea870a"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b3fb0da1533f1de891126da95d3a80125fe4bbddd70acf5f944b9934bcfca484"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f8e8576094b1cc9eb03fb21e86abe6a81f4c8dd10b2296a948fc9c6a7811c560"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:dad5a0ba625446ef9ad9eec3b766913b60cd3a901a0665671e553c66e7c4379b"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
            task_id: "202609211321-WKCWNP"
            validation_requirements:
              - "bun run bench:compatibility:candidate:check"
              - "bun run bench:compatibility:check"
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:dad5a0ba625446ef9ad9eec3b766913b60cd3a901a0665671e553c66e7c4379b"
        digest: "sha256:f8e8576094b1cc9eb03fb21e86abe6a81f4c8dd10b2296a948fc9c6a7811c560"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:09274edf58b6c44888b90eb7aaf2ad0ad63bf231cb027ceaa523c217702ec2e3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
            expected_outputs:
              - "canonical-completion-persistence-proof"
              - "reviewed-compatibility-candidate"
            id: "completion-and-compatibility-repair"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609211321-WKCWNP"
      intent_digest: "sha256:0c2b58526a6944a35121f7477ed7b7d35391491d1084c2ca2371b84a818c9028"
      migration_receipts: []
      mutation_receipts:
        capture:202609211321-WKCWNP:
          after_revision: 1
          aggregate_digest: "sha256:0bc9b7467f160642522b915094ae74fbae4204951733cdfabea4b6262d74e9ca"
          before_revision: 0
          command_digest: "sha256:fd662be970cd8ea9588b82335f212a1b3b2395ae9183c09cb3804421afa9a062"
          effect_ids: []
          event_digests:
            - "sha256:0b0342fe6f2cb520be5136512519edbe82db31e778432a3a741b3d072ce1ea0e"
          mutation_id: "capture:202609211321-WKCWNP"
        kernel_work_item_claim_required:sha256:73db3163d70140017a55cf8f91e90c52e863bd28389d09b843f28db62848e891:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:
          after_revision: 5
          aggregate_digest: "sha256:ac448f31033ad83d9f3c46ed4ab38b4d41b50cd23a661b22431f547e04a3aafc"
          before_revision: 4
          command_digest: "sha256:75ffbbccca0c73b2d0ee49aab0c0c536cff332ddf72edd7f81f3dfefc1377ca6"
          effect_ids: []
          event_digests:
            - "sha256:3b189bb9cea51c395768ee96a9e00ed388214e7da1c7a20a16e63a37460b4247"
          mutation_id: "kernel_work_item_claim_required:sha256:73db3163d70140017a55cf8f91e90c52e863bd28389d09b843f28db62848e891:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        kernel_work_item_materialization_required:sha256:316ed2a9e0d90c08042974e331b1190e847f235fda29c9874a2633f932402c27:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:
          after_revision: 4
          aggregate_digest: "sha256:7ebade0930d6c30906325753dfe2c096fa76440fc467b391c47ee9ca0c6c95ab"
          before_revision: 3
          command_digest: "sha256:b0b5fa53e00488d4d8e8208cbc5334e380bee4d922fd0f1fca13a9da87689a3f"
          effect_ids: []
          event_digests:
            - "sha256:2f7d022719083e9893820f63195485db9a60e8e1fa4a3ed9464a7377fa357a3e"
          mutation_id: "kernel_work_item_materialization_required:sha256:316ed2a9e0d90c08042974e331b1190e847f235fda29c9874a2633f932402c27:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        result:sha256:4728fef94a292bc40618feeab8b1371ad142aae5fe23e3cca72eff5ac5d85f87:
          after_revision: 2
          aggregate_digest: "sha256:81037cdc3784f86ff7fa104d1ecea1827b260bab79b948c43afcbccdb6c784dc"
          before_revision: 1
          command_digest: "sha256:ed13699cdd73203918b38cc4d61f7cf1d7c92346694fd96edde8e06c079a3ee0"
          effect_ids: []
          event_digests:
            - "sha256:a6679720bec445bbce9f1adf310eef563a0dfbc0993295505f673c41cdea3bef"
          mutation_id: "result:sha256:4728fef94a292bc40618feeab8b1371ad142aae5fe23e3cca72eff5ac5d85f87"
        sha256:0a62e34b0fe5abc23b6fed1be4149558245fbd93d912c356705acc2f8be6473f:
          after_revision: 3
          aggregate_digest: "sha256:c58776ce231aeb487eaf1eb213de6b84835d7f6415170c99dcc9f17f5bf9865a"
          before_revision: 2
          command_digest: "sha256:c2dab76eb4f57fd7351feb9b006063ea9b05b8303cb045fc8334ddc0d90f696e"
          effect_ids: []
          event_digests:
            - "sha256:650d528b126a1fa7f10a534d8664a80dc65ebe13eafdaa85b6afb5630c9ff86b"
          mutation_id: "sha256:0a62e34b0fe5abc23b6fed1be4149558245fbd93d912c356705acc2f8be6473f"
      plan_history: []
      revision: 5
      schema_version: 1
      state: "ACTIVE"
      work_items:
        completion-and-compatibility-repair:
          attempt: 1
          claim_id: "sha256:0b1a7f538f5b3824b2c4017ebe2343907a5cd37745cdeaeafaf2ad7d84bd8370"
          definition:
            contract_digest: "sha256:09274edf58b6c44888b90eb7aaf2ad0ad63bf231cb027ceaa523c217702ec2e3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
            expected_outputs:
              - "canonical-completion-persistence-proof"
              - "reviewed-compatibility-candidate"
            id: "completion-and-compatibility-repair"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 2
          state: "CLAIMED"
          validation: null
    digest: "sha256:d60c0712bae084e07d0f911a406e31b59c221d899746d132259e919459aba933"
    documents:
      contracts:
        sha256:09274edf58b6c44888b90eb7aaf2ad0ad63bf231cb027ceaa523c217702ec2e3:
          acceptance_criteria:
            - "A successful canonical branch_pr complete_task transition is persisted before commitCanonicalTerminalTaskArtifacts records terminal state, and failed or stale transitions do not create a false terminal commit."
            - "The nearest public-route regression proves the task is COMPLETED and the task checkout has no uncommitted canonical README projection after terminal completion."
            - "The reviewed v0.7 compatibility candidate exactly matches the cumulative 0.7.11 surface, includes 202609211321-WKCWNP in source-task provenance, and does not modify the immutable v0.6.24 baseline."
            - "Focused lifecycle tests, both compatibility candidate gates, release-critical tests, and the full local CI pass without baseline or gate weakening."
          objective: "Move branch_pr terminal task-artifact persistence after the successful complete_task Kernel mutation without weakening fail-closed routing; add a regression that proves the public completion route leaves the canonical task projection committed and the checkout clean; then regenerate scripts/baselines/v0.7-compatibility-candidate.json with task 202609211321-WKCWNP as source provenance while leaving scripts/baselines/v0.6.24-compatibility-contract.json byte-identical."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run test:release:critical"
            - "bun run ci:local:full"
      intent:
        context: "Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged."
        objective: "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate"
    events:
      -
        command_digest: "sha256:fd662be970cd8ea9588b82335f212a1b3b2395ae9183c09cb3804421afa9a062"
        id: "capture:202609211321-WKCWNP:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609211321-WKCWNP"
        occurred_at: "2026-09-21T13:21:31.297Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609211321-WKCWNP"
        task_revision: 1
      -
        command_digest: "sha256:ed13699cdd73203918b38cc4d61f7cf1d7c92346694fd96edde8e06c079a3ee0"
        id: "result:sha256:4728fef94a292bc40618feeab8b1371ad142aae5fe23e3cca72eff5ac5d85f87:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4728fef94a292bc40618feeab8b1371ad142aae5fe23e3cca72eff5ac5d85f87"
        occurred_at: "2026-09-21T13:22:50.301Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609211321-WKCWNP"
        task_revision: 2
      -
        command_digest: "sha256:c2dab76eb4f57fd7351feb9b006063ea9b05b8303cb045fc8334ddc0d90f696e"
        id: "sha256:0a62e34b0fe5abc23b6fed1be4149558245fbd93d912c356705acc2f8be6473f:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0a62e34b0fe5abc23b6fed1be4149558245fbd93d912c356705acc2f8be6473f"
        occurred_at: "2026-09-21T13:22:59.254Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609211321-WKCWNP"
        task_revision: 3
      -
        command_digest: "sha256:b0b5fa53e00488d4d8e8208cbc5334e380bee4d922fd0f1fca13a9da87689a3f"
        id: "kernel_work_item_materialization_required:sha256:316ed2a9e0d90c08042974e331b1190e847f235fda29c9874a2633f932402c27:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:316ed2a9e0d90c08042974e331b1190e847f235fda29c9874a2633f932402c27:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        occurred_at: "2026-09-21T13:23:08.294Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609211321-WKCWNP"
        task_revision: 4
      -
        command_digest: "sha256:75ffbbccca0c73b2d0ee49aab0c0c536cff332ddf72edd7f81f3dfefc1377ca6"
        id: "kernel_work_item_claim_required:sha256:73db3163d70140017a55cf8f91e90c52e863bd28389d09b843f28db62848e891:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:73db3163d70140017a55cf8f91e90c52e863bd28389d09b843f28db62848e891:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        occurred_at: "2026-09-21T13:23:12.194Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609211321-WKCWNP"
        task_revision: 5
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate

Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.

## Scope

- In scope: Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
- Out of scope: unrelated refactors not required for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate".

## Plan

1. Execute approved WorkItem completion-and-compatibility-repair.

## Verify Steps

PLANNER fallback scaffold for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
