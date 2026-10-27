---
id: "202610271221-Y385P8"
title: "Use configured workflow mode for canonical final-validation targets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "issue-6943"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
  - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T12:23:03.293Z"
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
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
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
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
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
          - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
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
      digest: "sha256:f5066663b2b4b43d4c89094464d219a6f1f8c559fa9bcf36a86ea821dac11669"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.test.ts"
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
doc_updated_at: "2026-10-27T12:21:23.531Z"
doc_updated_by: "CODER"
description: "Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration."
sections:
  Summary: |-
    Use configured workflow mode for canonical final-validation targets

    Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.
  Scope: |-
    - In scope: Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.
    - Out of scope: unrelated refactors not required for "Use configured workflow mode for canonical final-validation targets".
  Plan: "1. Execute approved WorkItem correct-final-validation-mode."
  Verify Steps: |-
    PLANNER fallback scaffold for "Use configured workflow mode for canonical final-validation targets". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use configured workflow mode for canonical final-validation targets". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "3a5d69bd47e56d65e6928d6a16beb0586b056f04"
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
            digest: "sha256:9be11458eed8aa7f0ac172fd4a8b078bf04e7101043620325c0a3b8c75711b2d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6b56b6ee509707680a194f74149ff93957d3674260044bfacc90cc319e7589c9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4422cfcf5594095c28db537906e35eb284904d62bcd2d2f9342b1cc67ae7ce55"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            task_id: "202610271221-Y385P8"
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
        approval_evidence_digest: "sha256:4422cfcf5594095c28db537906e35eb284904d62bcd2d2f9342b1cc67ae7ce55"
        digest: "sha256:6b56b6ee509707680a194f74149ff93957d3674260044bfacc90cc319e7589c9"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:681d44bdba48881d0ef7ec9f4ea4ea66cb2920e03535d94321113e4bc8af7a87"
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
                - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            expected_outputs:
              - "final-validation-mode-fix"
            id: "correct-final-validation-mode"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610271221-Y385P8"
      intent_digest: "sha256:ac8900cb74ddc5ee3f29b03dd7c90748c8437d70bc2485ce5444ab05820f1108"
      migration_receipts: []
      mutation_receipts:
        capture:202610271221-Y385P8:
          after_revision: 1
          aggregate_digest: "sha256:f8d6dfee39a4d834cbfc263ce622ee8ed48e71f684b84145b8a854c246d27ed5"
          before_revision: 0
          command_digest: "sha256:acb39f53e3fa432a814166fb4bc3f3dc27b012b28b9fe5226ed3b8ad18e3cb46"
          effect_ids: []
          event_digests:
            - "sha256:4b1a27c0466885ea6d391266e17744b54df0306ce72acf5ee7c145d086339ae2"
          mutation_id: "capture:202610271221-Y385P8"
        kernel_work_item_claim_required:sha256:a9d119b2e7ea10ee9801cd8a6feab56fcfd82884a45b1172815b1fc397cdd73c:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 5
          aggregate_digest: "sha256:d24453190fb149a222c698292572f41cdb75399bbf4ac5c52cc19fea36f52483"
          before_revision: 4
          command_digest: "sha256:9969e137c85aec7e7834d12746b9a1784a8aec2d2c145122219273aed036c0be"
          effect_ids: []
          event_digests:
            - "sha256:8471a2b69539aee82b5c24b890dad833b40fa59fd855972296008c5905b204d3"
          mutation_id: "kernel_work_item_claim_required:sha256:a9d119b2e7ea10ee9801cd8a6feab56fcfd82884a45b1172815b1fc397cdd73c:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        kernel_work_item_execution_required:sha256:3915c2fe09c36c1c42a3f95c323f1846834455e99225e173a52d7cf5143c59a8:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 6
          aggregate_digest: "sha256:7e3d106c74f65f54d6fd9f2471d5733e2f612d8c25a5cce10d7a71cdba9515ee"
          before_revision: 5
          command_digest: "sha256:d505a5962934548842f7395c117aa4d8f5d9dcf6b93e4452daa98fb6f75db005"
          effect_ids: []
          event_digests:
            - "sha256:1e50c49a153f788f37b94eaf3bc90482a3061d995778a6f75bd5cf37a0ff5834"
          mutation_id: "kernel_work_item_execution_required:sha256:3915c2fe09c36c1c42a3f95c323f1846834455e99225e173a52d7cf5143c59a8:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        kernel_work_item_materialization_required:sha256:b6acc3b7813651d354018cc73801455fb97cfe43975ef35d022e777383dcde64:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 4
          aggregate_digest: "sha256:0c18b1bd10f68f92086e7e812f083096908d17242db64b24f0cba2d18dfb57ae"
          before_revision: 3
          command_digest: "sha256:dcf9566c1efaae5f918635afabdc7eec67a6dd4bfc153f7cf1e063518ed45992"
          effect_ids: []
          event_digests:
            - "sha256:fe3464af8002060071ddc3e707f2b7cade35c7afd38c98b92f3d8c11ae0fed7c"
          mutation_id: "kernel_work_item_materialization_required:sha256:b6acc3b7813651d354018cc73801455fb97cfe43975ef35d022e777383dcde64:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        result:sha256:b615e4c9575dd80fde08c95a496c9ba83953569a5159b3db7e701200f341f7d0:
          after_revision: 2
          aggregate_digest: "sha256:5b5b88dc51fd7568fd72e098d6d04fd3e07e1e659405f81c1abb84c1653847ea"
          before_revision: 1
          command_digest: "sha256:fa4efe478f7e0074c2a59d729cc1ec31abffd511e8fcec00eb246593a1264ee5"
          effect_ids: []
          event_digests:
            - "sha256:ef7a08f317dec851f45bed9cc94cb8da1c27e1778e6a26f37b99782b6fd8aba4"
          mutation_id: "result:sha256:b615e4c9575dd80fde08c95a496c9ba83953569a5159b3db7e701200f341f7d0"
        sha256:9777814a6c6b92eca778f279b696c19405de84c7b3e99d95d8a5a25b62a659d6:
          after_revision: 3
          aggregate_digest: "sha256:4aea4b6888ae0d79804d63ea5e5667585a381f9db095e57a63034ad68caba21e"
          before_revision: 2
          command_digest: "sha256:f1619bfce6f8b2145143d7843db5029d708a3716695faa419e5e823d18c92cac"
          effect_ids: []
          event_digests:
            - "sha256:297495fc30477ee09f9bf4145817b578a319eb3b27b0a3793ba8c87d5bfbc224"
          mutation_id: "sha256:9777814a6c6b92eca778f279b696c19405de84c7b3e99d95d8a5a25b62a659d6"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        correct-final-validation-mode:
          attempt: 1
          claim_id: "sha256:0f36e3c88018aa5f42fd0d3d91c831518e4939023ab2bd63dfb91131b89f13ca"
          definition:
            contract_digest: "sha256:681d44bdba48881d0ef7ec9f4ea4ea66cb2920e03535d94321113e4bc8af7a87"
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
                - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            expected_outputs:
              - "final-validation-mode-fix"
            id: "correct-final-validation-mode"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:da1a315aa5ab62fb64d8b111a32f1a5a4472c3ae52eddd658f2f69c6b5b59709"
    documents:
      contracts:
        sha256:681d44bdba48881d0ef7ec9f4ea4ea66cb2920e03535d94321113e4bc8af7a87:
          acceptance_criteria:
            - "Direct I-C-M history resolves current semantic C and branch_pr retains strict unrelated-task behavior."
            - "Initial, restored, and post-check target resolution use the configured workflow mode."
            - "Unavailable identity, changed target/content, or failed checks cannot persist final-validation success."
            - "Only the three admitted files change and required framework checks pass on the resulting revision."
          objective: "Use configured repository workflow mode consistently for canonical final-validation target resolution and freshness checks; add focused direct/branch regression coverage for issue #6943."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration."
        objective: "Use configured workflow mode for canonical final-validation targets"
    events:
      -
        command_digest: "sha256:acb39f53e3fa432a814166fb4bc3f3dc27b012b28b9fe5226ed3b8ad18e3cb46"
        id: "capture:202610271221-Y385P8:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610271221-Y385P8"
        occurred_at: "2026-10-27T12:21:23.381Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610271221-Y385P8"
        task_revision: 1
      -
        command_digest: "sha256:fa4efe478f7e0074c2a59d729cc1ec31abffd511e8fcec00eb246593a1264ee5"
        id: "result:sha256:b615e4c9575dd80fde08c95a496c9ba83953569a5159b3db7e701200f341f7d0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b615e4c9575dd80fde08c95a496c9ba83953569a5159b3db7e701200f341f7d0"
        occurred_at: "2026-10-27T12:22:37.356Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610271221-Y385P8"
        task_revision: 2
      -
        command_digest: "sha256:f1619bfce6f8b2145143d7843db5029d708a3716695faa419e5e823d18c92cac"
        id: "sha256:9777814a6c6b92eca778f279b696c19405de84c7b3e99d95d8a5a25b62a659d6:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9777814a6c6b92eca778f279b696c19405de84c7b3e99d95d8a5a25b62a659d6"
        occurred_at: "2026-10-27T12:22:51.857Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610271221-Y385P8"
        task_revision: 3
      -
        command_digest: "sha256:dcf9566c1efaae5f918635afabdc7eec67a6dd4bfc153f7cf1e063518ed45992"
        id: "kernel_work_item_materialization_required:sha256:b6acc3b7813651d354018cc73801455fb97cfe43975ef35d022e777383dcde64:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:b6acc3b7813651d354018cc73801455fb97cfe43975ef35d022e777383dcde64:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T12:23:09.356Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610271221-Y385P8"
        task_revision: 4
      -
        command_digest: "sha256:9969e137c85aec7e7834d12746b9a1784a8aec2d2c145122219273aed036c0be"
        id: "kernel_work_item_claim_required:sha256:a9d119b2e7ea10ee9801cd8a6feab56fcfd82884a45b1172815b1fc397cdd73c:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a9d119b2e7ea10ee9801cd8a6feab56fcfd82884a45b1172815b1fc397cdd73c:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T12:23:28.195Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610271221-Y385P8"
        task_revision: 5
      -
        command_digest: "sha256:d505a5962934548842f7395c117aa4d8f5d9dcf6b93e4452daa98fb6f75db005"
        id: "kernel_work_item_execution_required:sha256:3915c2fe09c36c1c42a3f95c323f1846834455e99225e173a52d7cf5143c59a8:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3915c2fe09c36c1c42a3f95c323f1846834455e99225e173a52d7cf5143c59a8:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T12:24:11.174Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610271221-Y385P8"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Use configured workflow mode for canonical final-validation targets

Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.

## Scope

- In scope: Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.
- Out of scope: unrelated refactors not required for "Use configured workflow mode for canonical final-validation targets".

## Plan

1. Execute approved WorkItem correct-final-validation-mode.

## Verify Steps

PLANNER fallback scaffold for "Use configured workflow mode for canonical final-validation targets". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use configured workflow mode for canonical final-validation targets". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
