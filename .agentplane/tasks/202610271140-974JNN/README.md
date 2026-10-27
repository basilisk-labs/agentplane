---
id: "202610271140-974JNN"
title: "Synchronize adopted PR metadata schema with formatted generation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-blocker"
  - "schema"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run format:check"
  - "bun run schemas:check"
  - "bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts --pool=forks --maxWorkers 1"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T11:41:39.498Z"
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
    - "effect_schema"
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
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/core/schemas/pr-meta.schema.json"
      - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
      - "packages/core/src/tasks/task-artifact-schema.test.ts"
      - "packages/spec/schemas/pr-meta.schema.json"
      - "schemas/pr-meta.schema.json"
      - "scripts/generate/sync-schemas.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/core/schemas/pr-meta.schema.json"
      - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
      - "packages/core/src/tasks/task-artifact-schema.test.ts"
      - "packages/spec/schemas/pr-meta.schema.json"
      - "schemas/pr-meta.schema.json"
      - "scripts/generate/sync-schemas.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_schema"
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
          - "packages/core/schemas/pr-meta.schema.json"
          - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
          - "packages/core/src/tasks/task-artifact-schema.test.ts"
          - "packages/spec/schemas/pr-meta.schema.json"
          - "schemas/pr-meta.schema.json"
          - "scripts/generate/sync-schemas.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5e4fdef5dc599c7448bdb1e76b207ab9b311478b19544167a6c3361375072b39"
      escalation_reasons:
        - "central_component:packages/core/schemas/pr-meta.schema.json"
        - "central_component:packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
        - "central_component:packages/core/src/tasks/task-artifact-schema.test.ts"
        - "central_component:schemas/pr-meta.schema.json"
        - "effect_schema"
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
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-27T11:40:26.897Z"
doc_updated_by: "CODER"
description: "Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge."
sections:
  Summary: |-
    Synchronize adopted PR metadata schema with formatted generation

    Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.
  Scope: |-
    - In scope: Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.
    - Out of scope: unrelated refactors not required for "Synchronize adopted PR metadata schema with formatted generation".
  Plan: "1. Execute approved WorkItem adopted-pr-meta-schema."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
            digest: "sha256:1ee1d13d0440ee43cc47c16f054724731650ec272f5110eac381352fab511f15"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3b8955cde33da369bf5cf3219525f6ddd742a292e6c55ecbd229dbd0b60f8b21"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:3a09f8859bb1c2208c18ff958b4aa551f7973a2bcd41a9956cd9a4787f3df41f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "schema"
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
              - "packages/core/schemas/pr-meta.schema.json"
              - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
              - "packages/core/src/tasks/task-artifact-schema.test.ts"
              - "packages/spec/schemas/pr-meta.schema.json"
              - "schemas/pr-meta.schema.json"
              - "scripts/generate/sync-schemas.mjs"
            task_id: "202610271140-974JNN"
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
        approval_evidence_digest: "sha256:3a09f8859bb1c2208c18ff958b4aa551f7973a2bcd41a9956cd9a4787f3df41f"
        digest: "sha256:3b8955cde33da369bf5cf3219525f6ddd742a292e6c55ecbd229dbd0b60f8b21"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b7845bc0eb8371eb79d1304cb44991d9961caf0349cf4fcbf0c8584b95e63ded"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "schema"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/schemas/pr-meta.schema.json"
                - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
                - "packages/core/src/tasks/task-artifact-schema.test.ts"
                - "packages/spec/schemas/pr-meta.schema.json"
                - "schemas/pr-meta.schema.json"
                - "scripts/generate/sync-schemas.mjs"
            expected_outputs:
              - "typed-adoption-metadata-schema"
              - "three-synchronized-pr-meta-schema-snapshots"
              - "strict-adoption-schema-regressions"
              - "prettier-stable-pr-meta-schema-generation"
            id: "adopted-pr-meta-schema"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610271140-974JNN"
      intent_digest: "sha256:98c8784d4321249edb82ff799482011046a22c2882210cd07b523a19f84c7ffb"
      migration_receipts: []
      mutation_receipts:
        capture:202610271140-974JNN:
          after_revision: 1
          aggregate_digest: "sha256:64eec475eef28dbc1248180689fd408af11b1eec3e12ff469243a27852816b0d"
          before_revision: 0
          command_digest: "sha256:7dae1b2f7445877d48451759d015410b9eb5b3f675adbd0804edb2f52fa3198c"
          effect_ids: []
          event_digests:
            - "sha256:341ba9b71d13d49542bc8d1413c67cced4df302d5c5f6b184dbb153779f26089"
          mutation_id: "capture:202610271140-974JNN"
        kernel_work_item_claim_required:sha256:8b64c5314988c86b639655beba028bbb0fa48d111abd3896f2475b9cc17dcdd6:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 5
          aggregate_digest: "sha256:cbd8b75adc6dc5ff6a8cf7f2a0fcc445b66ba847d584f4b61bf6a7a6f003c107"
          before_revision: 4
          command_digest: "sha256:dfc79cb3f6e1c1e23230c6bdb792f93a97b50154986581cb1b9ddf7d89a970d7"
          effect_ids: []
          event_digests:
            - "sha256:25961ba53ee9f2be9e1f738a7a1a24439c3c84bda7e0f45f7ae7fbb9bd92d34f"
          mutation_id: "kernel_work_item_claim_required:sha256:8b64c5314988c86b639655beba028bbb0fa48d111abd3896f2475b9cc17dcdd6:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        kernel_work_item_execution_required:sha256:f3cf6774b2938e1d46f2ef53ddf0694c89e843559719c579a466c5410b23a4b3:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 6
          aggregate_digest: "sha256:46da97d34ade697da2bb39d61469485e214088f18e7cba45769c0c9bb7a915d9"
          before_revision: 5
          command_digest: "sha256:c6d6b29530702ef687ba2c6db349731a757605a2fd7f62f60aa38f21ba3cd1f5"
          effect_ids: []
          event_digests:
            - "sha256:428a3ad349e9e5d27396b2f23129d9b90f024d9b572883f8013674f28903f83d"
          mutation_id: "kernel_work_item_execution_required:sha256:f3cf6774b2938e1d46f2ef53ddf0694c89e843559719c579a466c5410b23a4b3:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        kernel_work_item_materialization_required:sha256:75bdea69aa008a2176926b10cc9b3f3b6e4ddfa026cda3ecc2996c2d3b434ecf:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:
          after_revision: 4
          aggregate_digest: "sha256:61710823388691cd1101dd067ffa67fc9af834c36a2cbc1b416576aaf7ac15f6"
          before_revision: 3
          command_digest: "sha256:be89ae397add2f2a3e900f4c3c0563a6d370fc85050f5528576c896a81cc6f8a"
          effect_ids: []
          event_digests:
            - "sha256:bd00b77313eba553970d3ced0b5e31574081e80543805735b2e6fc701d287ad9"
          mutation_id: "kernel_work_item_materialization_required:sha256:75bdea69aa008a2176926b10cc9b3f3b6e4ddfa026cda3ecc2996c2d3b434ecf:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        result:sha256:d28188bb8d6eb51abaf302c75477edd371504eb2a4695e92c64d0e978adfad11:
          after_revision: 2
          aggregate_digest: "sha256:3ee14dbd83ef2297076e86efd8903acb9f89372c6ec0a84b8230b6ac0331e43f"
          before_revision: 1
          command_digest: "sha256:6733dd0e17ecf35eccead706d6578020cb3d5402a413f279fd76085e40ec5e80"
          effect_ids: []
          event_digests:
            - "sha256:889fa3a6eb5e42ae38a2a499fd8727646e90a1ae62c9d224114094bb377d0bf1"
          mutation_id: "result:sha256:d28188bb8d6eb51abaf302c75477edd371504eb2a4695e92c64d0e978adfad11"
        sha256:03094ac41cfe562da82d761f51946d52d0053adb4258587477bbec9ca258c716:
          after_revision: 3
          aggregate_digest: "sha256:581f08f32d8366c060823b348ac0295627b4533b8bdaa5c0102cc840b305162d"
          before_revision: 2
          command_digest: "sha256:a82b32f9f33e100133dceb776e5cd48c302b25e2ecd8154ce9edb71ca47b20d8"
          effect_ids: []
          event_digests:
            - "sha256:0ccf9a15931038112574a00eed67892c0a9e00c5ef25201b4aa949639a2260cc"
          mutation_id: "sha256:03094ac41cfe562da82d761f51946d52d0053adb4258587477bbec9ca258c716"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        adopted-pr-meta-schema:
          attempt: 1
          claim_id: "sha256:dd9f74f1078b1bfa6c87c27904bf35aff37ac1f9d4e8b48fbb8c5458e48aebf6"
          definition:
            contract_digest: "sha256:b7845bc0eb8371eb79d1304cb44991d9961caf0349cf4fcbf0c8584b95e63ded"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "schema"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/schemas/pr-meta.schema.json"
                - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
                - "packages/core/src/tasks/task-artifact-schema.test.ts"
                - "packages/spec/schemas/pr-meta.schema.json"
                - "schemas/pr-meta.schema.json"
                - "scripts/generate/sync-schemas.mjs"
            expected_outputs:
              - "typed-adoption-metadata-schema"
              - "three-synchronized-pr-meta-schema-snapshots"
              - "strict-adoption-schema-regressions"
              - "prettier-stable-pr-meta-schema-generation"
            id: "adopted-pr-meta-schema"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:6654c42d2f51a84102d44085b8b263e1295a83d4a5a5f5872f750072282f74eb"
    documents:
      contracts:
        sha256:b7845bc0eb8371eb79d1304cb44991d9961caf0349cf4fcbf0c8584b95e63ded:
          acceptance_criteria:
            - "The optional adoption field accepts a valid same-repository hosted PR identity and rejects mismatched task IDs, source and target projects, invalid PR number, SHA or digest, missing required identity, and unknown nested fields."
            - "The core runtime schema and all three generated pr-meta.schema.json snapshots represent the same adoption shape; bun run schemas:check passes after schemas:sync."
            - "The canonical pr-meta schema generator emits deterministic Prettier-stable JSON; bun run format:check passes alongside schemas:check."
            - "Only the six approved files change. If schemas:sync changes another file, stop for a new native scope grant before editing or returning implementation."
            - "The implementation remains provider-neutral and does not mutate a hosted PR, impersonate USER, or change MY0JZE task artifacts."
            - "Focused schema tests, typecheck, and full local CI pass under native supervision; record exact check evidence and retain an independent EVALUATOR review."
          objective: "Add a typed, provider-neutral adoption identity field to core PR metadata; validate task, same-repository project, refs, SHAs, digests, timestamps and provider identity. Format canonical pr-meta schema generation using the existing Prettier pattern, regenerate exactly three snapshots, and add strict positive and negative tests. Do not edit MY0JZE files or add bot-specific behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run schemas:check"
            - "bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts --pool=forks --maxWorkers 1"
            - "bun run typecheck"
            - "bun run format:check"
            - "bun run ci:local:full"
      intent:
        context: "Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge."
        objective: "Synchronize adopted PR metadata schema with formatted generation"
    events:
      -
        command_digest: "sha256:7dae1b2f7445877d48451759d015410b9eb5b3f675adbd0804edb2f52fa3198c"
        id: "capture:202610271140-974JNN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610271140-974JNN"
        occurred_at: "2026-10-27T11:40:26.770Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610271140-974JNN"
        task_revision: 1
      -
        command_digest: "sha256:6733dd0e17ecf35eccead706d6578020cb3d5402a413f279fd76085e40ec5e80"
        id: "result:sha256:d28188bb8d6eb51abaf302c75477edd371504eb2a4695e92c64d0e978adfad11:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d28188bb8d6eb51abaf302c75477edd371504eb2a4695e92c64d0e978adfad11"
        occurred_at: "2026-10-27T11:41:19.018Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610271140-974JNN"
        task_revision: 2
      -
        command_digest: "sha256:a82b32f9f33e100133dceb776e5cd48c302b25e2ecd8154ce9edb71ca47b20d8"
        id: "sha256:03094ac41cfe562da82d761f51946d52d0053adb4258587477bbec9ca258c716:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:03094ac41cfe562da82d761f51946d52d0053adb4258587477bbec9ca258c716"
        occurred_at: "2026-10-27T11:41:30.870Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610271140-974JNN"
        task_revision: 3
      -
        command_digest: "sha256:be89ae397add2f2a3e900f4c3c0563a6d370fc85050f5528576c896a81cc6f8a"
        id: "kernel_work_item_materialization_required:sha256:75bdea69aa008a2176926b10cc9b3f3b6e4ddfa026cda3ecc2996c2d3b434ecf:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:75bdea69aa008a2176926b10cc9b3f3b6e4ddfa026cda3ecc2996c2d3b434ecf:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T11:41:43.025Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610271140-974JNN"
        task_revision: 4
      -
        command_digest: "sha256:dfc79cb3f6e1c1e23230c6bdb792f93a97b50154986581cb1b9ddf7d89a970d7"
        id: "kernel_work_item_claim_required:sha256:8b64c5314988c86b639655beba028bbb0fa48d111abd3896f2475b9cc17dcdd6:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8b64c5314988c86b639655beba028bbb0fa48d111abd3896f2475b9cc17dcdd6:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T11:41:58.690Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610271140-974JNN"
        task_revision: 5
      -
        command_digest: "sha256:c6d6b29530702ef687ba2c6db349731a757605a2fd7f62f60aa38f21ba3cd1f5"
        id: "kernel_work_item_execution_required:sha256:f3cf6774b2938e1d46f2ef53ddf0694c89e843559719c579a466c5410b23a4b3:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f3cf6774b2938e1d46f2ef53ddf0694c89e843559719c579a466c5410b23a4b3:sha256:de3c79161e5a3e41fd65ab138c3a0f97cad056c9dd83695871252bd49eda5feb"
        occurred_at: "2026-10-27T11:42:42.388Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610271140-974JNN"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Synchronize adopted PR metadata schema with formatted generation

Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.

## Scope

- In scope: Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.
- Out of scope: unrelated refactors not required for "Synchronize adopted PR metadata schema with formatted generation".

## Plan

1. Execute approved WorkItem adopted-pr-meta-schema.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
