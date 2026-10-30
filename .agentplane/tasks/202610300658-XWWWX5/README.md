---
id: "202610300658-XWWWX5"
title: "Preserve exact native Task payload strings during README serialization"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane --run packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
  - "bun run test:project core --run packages/core/src/tasks/task-readme.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-30T08:15:47.913Z"
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
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
      - "packages/core/src/tasks/task-readme.test.ts"
      - "packages/core/src/tasks/task-readme.ts"
  declaration:
    external_effects:
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
      - "packages/core/src/tasks/task-readme.test.ts"
      - "packages/core/src/tasks/task-readme.ts"
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
    - "effect_security_boundary"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
          - "packages/core/src/tasks/task-readme.test.ts"
          - "packages/core/src/tasks/task-readme.ts"
        evidence_requirements:
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "publish"
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:ae9c0daeab6a1e598ff31cb40a7292d062c3a8e9453f9b282f4faea8dd7ee4c6"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-readme.test.ts"
        - "central_component:packages/core/src/tasks/task-readme.ts"
        - "effect_security_boundary"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-30T06:59:21.675Z"
doc_updated_by: "CODER"
description: "Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding."
sections:
  Summary: |-
    Preserve exact native Task payload strings during README serialization

    Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding.
  Scope: |-
    - In scope: Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding.
    - Out of scope: unrelated refactors not required for "Preserve exact native Task payload strings during README serialization".
  Plan: "1. Execute approved WorkItem lossless-native-serialization."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project core --run packages/core/src/tasks/task-readme.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "ac55b72faf90391d04f29a8aa3b03817d92603a4"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:fb9429ddc323921d36bf8cffbb3d2b6db3264aa1623ada849d70bdb645833246"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:893cc6b2c81b2403505644020df431c5bea6e2afdb8ef3a29b36377721592f7a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:77386ed38caa623b9e3b603526d97777a7028fbad88d5e1dddc4a0b65a9ce3d1"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
              - "packages/core/src/tasks/task-readme.test.ts"
              - "packages/core/src/tasks/task-readme.ts"
            task_id: "202610300658-XWWWX5"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:77386ed38caa623b9e3b603526d97777a7028fbad88d5e1dddc4a0b65a9ce3d1"
        digest: "sha256:893cc6b2c81b2403505644020df431c5bea6e2afdb8ef3a29b36377721592f7a"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:129643597d0ec79754880bbdbf8567894cf98d96e3a2f2b4070e51395e4db0f9"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-readme.ts"
                - "packages/core/src/tasks/task-readme.test.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            expected_outputs:
              - "lossless-native-serialization-report"
            id: "lossless-native-serialization"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610300658-XWWWX5"
      intent_digest: "sha256:91212b4fbd82760eea82cfb272b5120bb8184706d5a3dfd3cf62136798291bad"
      migration_receipts: []
      mutation_receipts:
        capture:202610300658-XWWWX5:
          after_revision: 1
          aggregate_digest: "sha256:e42936bbf8e086c186cce39f76fe975f044f75b369abe6443df913c735b8974a"
          before_revision: 0
          command_digest: "sha256:79a5ab25dd7185798e41886cae654cb143f296f80de6ad42add29206a0a8abf9"
          effect_ids: []
          event_digests:
            - "sha256:025d90bc92bff036bde4fea79505bb67661d2f81cd085e1ef6e5d287a1bf38d9"
          mutation_id: "capture:202610300658-XWWWX5"
        kernel_work_item_claim_required:sha256:d9f0c262472cb86e0296a0323d6b24fd41106591217d4a860b88601ca226f328:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:
          after_revision: 5
          aggregate_digest: "sha256:215261cb9b96853d784fecd2a0a9a77ff6674eeb351eaac110e06fe6cab239a8"
          before_revision: 4
          command_digest: "sha256:80c7a080b4f014a04f70ed17a949ed0f8ccedf3a09690fb99c023a3017c3aa59"
          effect_ids: []
          event_digests:
            - "sha256:d085d9e96c501d7346652facfc7b38e79763bc2af555553149701ad30a9ab964"
          mutation_id: "kernel_work_item_claim_required:sha256:d9f0c262472cb86e0296a0323d6b24fd41106591217d4a860b88601ca226f328:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        kernel_work_item_execution_required:sha256:3bd7eb6aaac8e3bbd6c7bf702c9a044aa2655bde9fc5dc6cdb50f13fe2d24354:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:
          after_revision: 6
          aggregate_digest: "sha256:8cebcde3371e9414e32087e80dc6a893e651def0a77936bbdaea984419dc3fca"
          before_revision: 5
          command_digest: "sha256:70e8cfd389acd1209d987557232733ec0d061c5b08c146ef61097c6faa775581"
          effect_ids: []
          event_digests:
            - "sha256:bca14fd623e9e56f95520efd582977bbb603b71e90038a284b89873464a6e3bb"
          mutation_id: "kernel_work_item_execution_required:sha256:3bd7eb6aaac8e3bbd6c7bf702c9a044aa2655bde9fc5dc6cdb50f13fe2d24354:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        kernel_work_item_materialization_required:sha256:ec315ef9e19a8df83ef0924680dc2cdb42f09c4d812918df7a8041d6c781eda9:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:
          after_revision: 4
          aggregate_digest: "sha256:d478d3105aeabb7b8e0957d4ae05970fc5226d984d984c1093329c2ea8e07dc9"
          before_revision: 3
          command_digest: "sha256:38ef17ffd09f9e5f9ce47db25a62d83b43c573a6179b5460b5950e246c0387b7"
          effect_ids: []
          event_digests:
            - "sha256:5f69fc95665e84e5b9661a43d54f90354b3da7ee23c789ad16b04b3ce785b9f7"
          mutation_id: "kernel_work_item_materialization_required:sha256:ec315ef9e19a8df83ef0924680dc2cdb42f09c4d812918df7a8041d6c781eda9:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        result:sha256:678f39896e7b71093c0f982caa79eaf610be6b45d4823671795ab4c1337b9431:
          after_revision: 2
          aggregate_digest: "sha256:2a4762baf67e6fbfadb9db23868317f565b1f20333aafab05a0b148b4cc15d44"
          before_revision: 1
          command_digest: "sha256:a1a1a42080e60bba0592452d324e0629c92caaa81a8df7909247af3afb0b30bb"
          effect_ids: []
          event_digests:
            - "sha256:286f70cc2e2974ae693672b438b0e45a8f3fb9715b943988d321a2e0669f78db"
          mutation_id: "result:sha256:678f39896e7b71093c0f982caa79eaf610be6b45d4823671795ab4c1337b9431"
        sha256:50d023894c54ecc86217c9331ccc04cef8aff7c980e2fb224844f3e2417f154a:
          after_revision: 3
          aggregate_digest: "sha256:b69782ba392016afb675b463a6237fac27bb56e38a3d1b76b1e8e37d37b20880"
          before_revision: 2
          command_digest: "sha256:6b3064ee2a2c0f6cce6f57d2535b78975c6c14fcd3d5ce17daea900400902c65"
          effect_ids: []
          event_digests:
            - "sha256:c30305aef069bf236cc654ce45d5591ca50de7cfc7228e7db3abf866c3d9a9b7"
          mutation_id: "sha256:50d023894c54ecc86217c9331ccc04cef8aff7c980e2fb224844f3e2417f154a"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lossless-native-serialization:
          attempt: 1
          claim_id: "sha256:0b1f74148f96c6fa1fde48b9ff1d6fa0002f497f4c92353bebd493531c2424e5"
          definition:
            contract_digest: "sha256:129643597d0ec79754880bbdbf8567894cf98d96e3a2f2b4070e51395e4db0f9"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-readme.ts"
                - "packages/core/src/tasks/task-readme.test.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            expected_outputs:
              - "lossless-native-serialization-report"
            id: "lossless-native-serialization"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:91b9edb75144258b4460990638d35f66ba5bfa5dba973e9a770ece411a270aef"
    documents:
      contracts:
        sha256:129643597d0ec79754880bbdbf8567894cf98d96e3a2f2b4070e51395e4db0f9:
          acceptance_criteria:
            - "Only the three approved roots change; reuse existing renderer recursion and scalar quoting without new dependency or public API flag."
            - "Strings at every nested record/array position below extensions roundtrip exactly: zero/one/multiple terminal LF, empty and whitespace-only values, internal line trailing spaces/tabs, CRLF and literal escaped newlines. Native extension digest identity is preserved."
            - "Existing description/comment/verification-note readable formatting outside extensions retains its established behavior and assertions; do not rewrite unrelated content."
            - "A real public native body-file audit comment containing newline/whitespace-sensitive data remains canonical after a fresh process read. A second distinct actual native write preserves the first original audit value and committed receipt identity, with fresh readback and idempotent duplicate replay. No mocked successful verifier or no-op-only qualification."
            - "Regression tests fail against the prior renderer and pass with the fix. Do not weaken digest validation, rewrite Kernel hashes or manually repair MRJ/VPB."
            - "Run build, both focused suites and mandatory full native checks with the supported Vitest package scripts; report actual results and let AgentPlane persist native validation and fresh EVAL."
            - "Preserve all original tasks, failed receipts, untracked files, worktrees and private snapshots. No cleanup, provider or host/data/credential/runtime-guard effects inside this implementation episode."
          objective: "Preserve exact strings in native Task extension payloads during README YAML serialization, retaining committed Kernel digests across parse/render and successive genuine native writes while keeping established human-facing formatting."
          role: "EXECUTOR"
          verification_commands:
            - "bun run build"
            - "bun run test:project core --run packages/core/src/tasks/task-readme.test.ts"
            - "bun run test:project agentplane --run packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding."
        objective: "Preserve exact native Task payload strings during README serialization"
    events:
      -
        command_digest: "sha256:79a5ab25dd7185798e41886cae654cb143f296f80de6ad42add29206a0a8abf9"
        id: "capture:202610300658-XWWWX5:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610300658-XWWWX5"
        occurred_at: "2026-10-30T06:59:21.561Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610300658-XWWWX5"
        task_revision: 1
      -
        command_digest: "sha256:a1a1a42080e60bba0592452d324e0629c92caaa81a8df7909247af3afb0b30bb"
        id: "result:sha256:678f39896e7b71093c0f982caa79eaf610be6b45d4823671795ab4c1337b9431:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:678f39896e7b71093c0f982caa79eaf610be6b45d4823671795ab4c1337b9431"
        occurred_at: "2026-10-30T08:15:03.789Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610300658-XWWWX5"
        task_revision: 2
      -
        command_digest: "sha256:6b3064ee2a2c0f6cce6f57d2535b78975c6c14fcd3d5ce17daea900400902c65"
        id: "sha256:50d023894c54ecc86217c9331ccc04cef8aff7c980e2fb224844f3e2417f154a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:50d023894c54ecc86217c9331ccc04cef8aff7c980e2fb224844f3e2417f154a"
        occurred_at: "2026-10-30T08:15:43.500Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610300658-XWWWX5"
        task_revision: 3
      -
        command_digest: "sha256:38ef17ffd09f9e5f9ce47db25a62d83b43c573a6179b5460b5950e246c0387b7"
        id: "kernel_work_item_materialization_required:sha256:ec315ef9e19a8df83ef0924680dc2cdb42f09c4d812918df7a8041d6c781eda9:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ec315ef9e19a8df83ef0924680dc2cdb42f09c4d812918df7a8041d6c781eda9:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        occurred_at: "2026-10-30T08:16:33.213Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610300658-XWWWX5"
        task_revision: 4
      -
        command_digest: "sha256:80c7a080b4f014a04f70ed17a949ed0f8ccedf3a09690fb99c023a3017c3aa59"
        id: "kernel_work_item_claim_required:sha256:d9f0c262472cb86e0296a0323d6b24fd41106591217d4a860b88601ca226f328:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d9f0c262472cb86e0296a0323d6b24fd41106591217d4a860b88601ca226f328:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        occurred_at: "2026-10-30T08:16:52.764Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610300658-XWWWX5"
        task_revision: 5
      -
        command_digest: "sha256:70e8cfd389acd1209d987557232733ec0d061c5b08c146ef61097c6faa775581"
        id: "kernel_work_item_execution_required:sha256:3bd7eb6aaac8e3bbd6c7bf702c9a044aa2655bde9fc5dc6cdb50f13fe2d24354:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3bd7eb6aaac8e3bbd6c7bf702c9a044aa2655bde9fc5dc6cdb50f13fe2d24354:sha256:5bb1f0341f993c2c547efc6cbb27a585561f2864d61484ee82a89e6823e6d98a"
        occurred_at: "2026-10-30T08:17:40.802Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610300658-XWWWX5"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve exact native Task payload strings during README serialization

Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding.

## Scope

- In scope: Direct HUMAN grant in root reply call_4b00c5c5b38a4cbb88ab0589e3b146b4 authorizes exactly three files, separate genuine serializer prerequisite Task, native checks/full CI/EVAL/PR merge. Preserve existing MRJ9WH and original VPB; this prerequisite does not replace either Task. Existing Task renderer emits YAML block scalar strip chomping and trims line endings inside hashed native extension payloads. In-memory production roundtrip of a valid MRJ candidate changes its audit body960 to959 and produces canonical_identity_mismatch with unchanged stored Kernel digest. Fix exact native extension string preservation including terminal LF count, internal trailing whitespace, CRLF and literal escaped newlines, while retaining existing human-facing formatting semantics. Use existing renderer and tests; no new dependency or hash validation bypass. Qualify at least two successive real native writes plus cold readback; duplicate no-op alone is insufficient. Keep original native receipts, Kernel/Plan/base history, untracked user files, worktrees, private snapshots and runtime guards. No manual MRJ byte recovery under this grant; separate exception remains pending. No MRJ or VPB writes, no host/data/credentials effects. All task description and semantic reports must avoid newline normalization hazards until corrected renderer is active. Mandatory focused core and native bookkeeping checks plus full native validation and fresh EVAL/current-head hosted PR merge. Do not cleanup any worktree or holding.
- Out of scope: unrelated refactors not required for "Preserve exact native Task payload strings during README serialization".

## Plan

1. Execute approved WorkItem lossless-native-serialization.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project core --run packages/core/src/tasks/task-readme.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
