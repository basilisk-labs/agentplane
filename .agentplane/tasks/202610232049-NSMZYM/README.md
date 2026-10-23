---
id: "202610232049-NSMZYM"
title: "Preserve linked-worktree observation context for canonical primary-stored tasks"
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
  - "bun run format:check"
  - "bun run lint:core"
  - "bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-23T20:50:58.310Z"
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
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
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
      digest: "sha256:5ab315b85e18e48bd0f125d36a3ade09cff04bd292ba3f4c244c56c7d19c5685"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.ts"
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
doc_updated_at: "2026-10-23T20:49:53.969Z"
doc_updated_by: "CODER"
description: "Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests."
sections:
  Summary: |-
    Preserve linked-worktree observation context for canonical primary-stored tasks

    Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
  Scope: |-
    - In scope: Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
    - Out of scope: unrelated refactors not required for "Preserve linked-worktree observation context for canonical primary-stored tasks".
  Plan: "1. Execute approved WorkItem preserve-linked-observation-context."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preserve linked-worktree observation context for canonical primary-stored tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preserve linked-worktree observation context for canonical primary-stored tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "d26d3b9db612abacec93dcfe7ae1371816453236"
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
            digest: "sha256:9a1c4ffd4ca8e12f7fd62c893cb7c69a2b611493a286f0433f662415ce15f5eb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e3c3b36a3350c2866d968969c712b47ddd754939479602cbd84c25874f13263"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
            task_id: "202610232049-NSMZYM"
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
        approval_evidence_digest: "sha256:2e3c3b36a3350c2866d968969c712b47ddd754939479602cbd84c25874f13263"
        digest: "sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "linked-context-routing-fix"
              - "focused-regression-evidence"
            id: "preserve-linked-observation-context"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610232049-NSMZYM"
      intent_digest: "sha256:92f9de4cd4054334ca6c819faf241d046dd9b56014eaf5b66a7bd65b34dcdf49"
      migration_receipts: []
      mutation_receipts:
        capture:202610232049-NSMZYM:
          after_revision: 1
          aggregate_digest: "sha256:41d56f794f787a02892026b51faed10ec6f81fcab94c91a5680a5d875c58127f"
          before_revision: 0
          command_digest: "sha256:0acf3d63391e2408973c012f89f207f3734d57a267eec6cfd0ab165d5b37da0a"
          effect_ids: []
          event_digests:
            - "sha256:9eb0d3569205e128fa44e80a49285275cd902f5f6773e1defe511d0872c1d008"
          mutation_id: "capture:202610232049-NSMZYM"
        kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 5
          aggregate_digest: "sha256:d1f3ff87ea81db237b19298cb586589141d1daf31aa2e6a22cba842f8d850b71"
          before_revision: 4
          command_digest: "sha256:136396eefc9f2f9669c8bafd95f95234f6ed9eb657e5a274f5b8e8b3c0fcd941"
          effect_ids: []
          event_digests:
            - "sha256:b98fdb1471a103ffce6c9d4b6e5658556cee214c896028f3bed64272849b7763"
          mutation_id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 6
          aggregate_digest: "sha256:6a1fa4f272ea5c60288dba90b832c460b409201dba7ed2b17651afabf8bd1363"
          before_revision: 5
          command_digest: "sha256:4aff0e5530a925e89469196e46d4de325fb463034856497295f794767d69fe7c"
          effect_ids: []
          event_digests:
            - "sha256:913720320b7c03c5ee9b1defd05dd8ce75a77539d2362e27583d1835d82dcbc7"
          mutation_id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 4
          aggregate_digest: "sha256:3e1259bd493ed99b933fe12433f9eea5c7e2f8ef88e0256fc04b7725d9e97744"
          before_revision: 3
          command_digest: "sha256:c8f6d56d549b1b5095efeed007c3c8ade87c8f91621815cfda3cc7ae0c59db81"
          effect_ids: []
          event_digests:
            - "sha256:5d0b6faff110c986636c8d17a0f988ad6f82cbeeeb36e787f4cbbd0e301e2b71"
          mutation_id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4:
          after_revision: 2
          aggregate_digest: "sha256:df8b696e5019a65c868eb4d846bd279aac83bc5a7f8bf7d5f1bfd9c86892d3a7"
          before_revision: 1
          command_digest: "sha256:4420268e7b7ec9bfe68f29ce33f4ab0094089ca6f2435a9e0258a0409237b236"
          effect_ids: []
          event_digests:
            - "sha256:86b56ca087fa0db1dae1ca73570495a5cf283573d36265b95fde0b5a822d0fb4"
          mutation_id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4"
        sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc:
          after_revision: 3
          aggregate_digest: "sha256:1d1454a92627f23f1caee66ea0e0f205b3ed677752a6d5d4ff0264dfcb9c8f75"
          before_revision: 2
          command_digest: "sha256:22cbbf3f071c348469110426cf19bd261a8019b6e8d2d879a22cc4c431ee8466"
          effect_ids: []
          event_digests:
            - "sha256:8efdf420dca886f1b78629e635cd87a80593e1baf507323aaa90d627bb501b5a"
          mutation_id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        preserve-linked-observation-context:
          attempt: 1
          claim_id: "sha256:2092cee141b653eac364eb78ceb1e362c808111e31467a431875b9aad816314c"
          definition:
            contract_digest: "sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "linked-context-routing-fix"
              - "focused-regression-evidence"
            id: "preserve-linked-observation-context"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:eb322d7e2be847feb7d704c13440665c9e779c2036d2e4017729e4b763dc5a9c"
    documents:
      contracts:
        sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07:
          acceptance_criteria:
            - "The focused kernel transport test for linked-worktree observation and WorkOrder roots passes."
            - "Legacy primary-owner routing, explicit-base routing, and task-branch owner routing retain their existing behavior."
            - "No Factory-specific condition or weakened assertion is introduced."
            - "Native full regression and hosted PR checks pass before integration."
          objective: "Preserve the invocation linked-worktree gitRoot and WorkOrder observation context when a canonical Kernel task is stored in the primary checkout and no task-branch owner supersedes the caller. Keep canonical backend storage primary."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            - "bun run format:check"
            - "bun run lint:core"
      intent:
        context: "Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests."
        objective: "Preserve linked-worktree observation context for canonical primary-stored tasks"
    events:
      -
        command_digest: "sha256:0acf3d63391e2408973c012f89f207f3734d57a267eec6cfd0ab165d5b37da0a"
        id: "capture:202610232049-NSMZYM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610232049-NSMZYM"
        occurred_at: "2026-10-23T20:49:53.824Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610232049-NSMZYM"
        task_revision: 1
      -
        command_digest: "sha256:4420268e7b7ec9bfe68f29ce33f4ab0094089ca6f2435a9e0258a0409237b236"
        id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4"
        occurred_at: "2026-10-23T20:50:43.483Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610232049-NSMZYM"
        task_revision: 2
      -
        command_digest: "sha256:22cbbf3f071c348469110426cf19bd261a8019b6e8d2d879a22cc4c431ee8466"
        id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc"
        occurred_at: "2026-10-23T20:50:52.942Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610232049-NSMZYM"
        task_revision: 3
      -
        command_digest: "sha256:c8f6d56d549b1b5095efeed007c3c8ade87c8f91621815cfda3cc7ae0c59db81"
        id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:01.428Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610232049-NSMZYM"
        task_revision: 4
      -
        command_digest: "sha256:136396eefc9f2f9669c8bafd95f95234f6ed9eb657e5a274f5b8e8b3c0fcd941"
        id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:12.897Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610232049-NSMZYM"
        task_revision: 5
      -
        command_digest: "sha256:4aff0e5530a925e89469196e46d4de325fb463034856497295f794767d69fe7c"
        id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:43.072Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610232049-NSMZYM"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve linked-worktree observation context for canonical primary-stored tasks

Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.

## Scope

- In scope: Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
- Out of scope: unrelated refactors not required for "Preserve linked-worktree observation context for canonical primary-stored tasks".

## Plan

1. Execute approved WorkItem preserve-linked-observation-context.

## Verify Steps

PLANNER fallback scaffold for "Preserve linked-worktree observation context for canonical primary-stored tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preserve linked-worktree observation context for canonical primary-stored tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
