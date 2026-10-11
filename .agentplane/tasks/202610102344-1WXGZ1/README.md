---
id: "202610102344-1WXGZ1"
title: "Authenticate completed native review projection from exact merged base checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts --maxWorkers=2"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T23:47:43.964Z"
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
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
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
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
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
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
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
      digest: "sha256:bbe1eee6a9b9d5488063d34f280a5f4640546c9a0dcc5127815a1a66258a637d"
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
doc_updated_at: "2026-10-10T23:44:35.586Z"
doc_updated_by: "CODER"
description: "Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path."
sections:
  Summary: |-
    Authenticate completed native review projection from exact merged base checkout

    Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path.
  Scope: |-
    - In scope: Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path.
    - Out of scope: unrelated refactors not required for "Authenticate completed native review projection from exact merged base checkout".
  Plan: "1. Execute approved WorkItem authenticate-merged-review-projection."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "743ce58d0c7f8568adb5adf102a5fe78d27ac797"
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
            digest: "sha256:f2f8807cca9807598d8129a68340433444ec2daed9ae21ea468747ad6f047be1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d90644a373d00ec9028addc690495b1df3d0b9fec34c594454973bb599a1a3a7"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f9ddc8d509b7dcb4e73c4613c95b48a92c1498007ca22397caf7b3ce5a6f05fb"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
            task_id: "202610102344-1WXGZ1"
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
        approval_evidence_digest: "sha256:f9ddc8d509b7dcb4e73c4613c95b48a92c1498007ca22397caf7b3ce5a6f05fb"
        digest: "sha256:d90644a373d00ec9028addc690495b1df3d0b9fec34c594454973bb599a1a3a7"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:3956b076bb03a3a06d434cae9196983b332420f16b3f5fdb0ded50de420a4b23"
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
                - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
            expected_outputs:
              - "completed-review-base-evidence"
            id: "authenticate-merged-review-projection"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610102344-1WXGZ1"
      intent_digest: "sha256:0ef5866180004e30568c78f0b600d432ed316a74e90a997721f7e707407ccf18"
      migration_receipts: []
      mutation_receipts:
        capture:202610102344-1WXGZ1:
          after_revision: 1
          aggregate_digest: "sha256:4bc974364216d787b3757d9bd585262586459ea39e44929117dea9c86ce344cf"
          before_revision: 0
          command_digest: "sha256:f8e66d1c59d23b394b1665aa6cf02a2b84ade2b3aac5eda2e691cf996f001689"
          effect_ids: []
          event_digests:
            - "sha256:06fa0e9719bf28097eae834798a25bb16f90d7956bab79342ef35958cf251fc1"
          mutation_id: "capture:202610102344-1WXGZ1"
        kernel_work_item_claim_required:sha256:d2ce8b052f3b861d950d4e8c0fa74e4dcdf38fb4a405edac66255ca0e408642d:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 5
          aggregate_digest: "sha256:9473e87fa5fb8145299f5c7ef089a3b81bee3ad439ce95c93db1cc9d99f4fd08"
          before_revision: 4
          command_digest: "sha256:b6bbbebf163b983dfddbe5870135e12f33f08e330d4a569951781809276d2414"
          effect_ids: []
          event_digests:
            - "sha256:aedd2f8687f18e3514321c33520a2984f044287f533d0f60a13f580406e5320e"
          mutation_id: "kernel_work_item_claim_required:sha256:d2ce8b052f3b861d950d4e8c0fa74e4dcdf38fb4a405edac66255ca0e408642d:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_execution_required:sha256:e2788fe460c31cfdd9ef540962ea4b082dcc631baf8b07da10910fc1ec6638ec:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 6
          aggregate_digest: "sha256:b0a26388a9dfb25c857a5715135bf76cbe55ced6e92c6bd0a4660120f1f2003f"
          before_revision: 5
          command_digest: "sha256:6ef1b30c3a33cec30f9a0644377e684b580e99be5eabd6153ab922240881fd11"
          effect_ids: []
          event_digests:
            - "sha256:7a27bfe55697a8f51479f7b4cc701e41a0eba187f2580adbb26102570fff1cde"
          mutation_id: "kernel_work_item_execution_required:sha256:e2788fe460c31cfdd9ef540962ea4b082dcc631baf8b07da10910fc1ec6638ec:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_materialization_required:sha256:ccd73e6233aff0cf6136af01c1549c39dacdea5fe69d50518d495534808218e0:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 4
          aggregate_digest: "sha256:54cec2492ebe7fbf3ad94408c0ab58b421ebc7b8bb26030902121433c901d90a"
          before_revision: 3
          command_digest: "sha256:24cbd199517f25c9b0cba05c388c69adbae5e5cf07a10efe37ceb004de17f24b"
          effect_ids: []
          event_digests:
            - "sha256:9def9c45146082b7fd4925806dd897363b8a443aa067628c04e0e68276a37792"
          mutation_id: "kernel_work_item_materialization_required:sha256:ccd73e6233aff0cf6136af01c1549c39dacdea5fe69d50518d495534808218e0:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        result:sha256:674f61a6c3d5701f7ce36db06a4896404fca6130251c8a1bd17fcdb403649ed8:
          after_revision: 2
          aggregate_digest: "sha256:59b95bf9c4a7579bc07f83a6c91552b609db4228059107856758e9d38deb4f4c"
          before_revision: 1
          command_digest: "sha256:12a4c3588caac524b05748a948cd0e41d60fcedb8157dbebe7101d73a8ec4068"
          effect_ids: []
          event_digests:
            - "sha256:3ed813e7519cd71da8df36bb91c84025ea081c027d8ea7ae364c17002788a085"
          mutation_id: "result:sha256:674f61a6c3d5701f7ce36db06a4896404fca6130251c8a1bd17fcdb403649ed8"
        sha256:dc243b401594025caeea86110f9d111036831dbe73e7dafa32fbb0b8df558c35:
          after_revision: 3
          aggregate_digest: "sha256:df0240e16e949f1e3ab22003fb1636e8a0688f4d7fc29ab2fd70be91e494514e"
          before_revision: 2
          command_digest: "sha256:c898939a63b171222c0b531a6e7a52adeff85825c0b7b6d8a13594dae9849992"
          effect_ids: []
          event_digests:
            - "sha256:37dc0a791abfa2fb61c2c6c4934488d3abb8e4d51f588ac6b3f9507cf3fa5109"
          mutation_id: "sha256:dc243b401594025caeea86110f9d111036831dbe73e7dafa32fbb0b8df558c35"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        authenticate-merged-review-projection:
          attempt: 1
          claim_id: "sha256:8804895b58296d949cbf127a5d226bde919c2b62dee70334d4877de7fdd9ae7f"
          definition:
            contract_digest: "sha256:3956b076bb03a3a06d434cae9196983b332420f16b3f5fdb0ded50de420a4b23"
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
                - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts"
            expected_outputs:
              - "completed-review-base-evidence"
            id: "authenticate-merged-review-projection"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:9fd05af62469bc6a6a1427dea63752753b633328d62b72041e8e25be29981341"
    documents:
      contracts:
        sha256:3956b076bb03a3a06d434cae9196983b332420f16b3f5fdb0ded50de420a4b23:
          acceptance_criteria:
            - "Separate read-only authentication of an already applied completed native review from owner-only preparation/application authority. Preserve all current owner, revision, expiry, WorkOrder and semantic result checks for mutation permits."
            - "Permit cross-checkout read-only projection only after authenticating the retained owner and the registered merged base in the same repository/common store with identical COMPLETED canonical record. Reject arbitrary or foreign checkout substitution; do not trust a path or caller boolean alone."
            - "Retain exact exchange, WorkOrder, result, evaluator evidence, quality digest, canonical record, supervisor operation and application-time proof. No historical PASS inheritance, replay, fabricated receipt, verification-floor reduction or consumer-specific branch."
            - "Add meaningful actual accepted-review then merged-base regression using existing native fixtures. Prove owner authentication still works and merged projection succeeds; reject mismatched record/repository, unregistered/foreign owner/base, tampered exchange/result/quality/journal and cross-checkout result application."
            - "Run three declared commands plus scoped lint/format; preserve observed failures and bind final source/check hashes in completed-review-base-evidence. Obtain independent review before native completion."
          objective: "Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts --maxWorkers=2"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path."
        objective: "Authenticate completed native review projection from exact merged base checkout"
    events:
      -
        command_digest: "sha256:f8e66d1c59d23b394b1665aa6cf02a2b84ade2b3aac5eda2e691cf996f001689"
        id: "capture:202610102344-1WXGZ1:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610102344-1WXGZ1"
        occurred_at: "2026-10-10T23:44:35.523Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610102344-1WXGZ1"
        task_revision: 1
      -
        command_digest: "sha256:12a4c3588caac524b05748a948cd0e41d60fcedb8157dbebe7101d73a8ec4068"
        id: "result:sha256:674f61a6c3d5701f7ce36db06a4896404fca6130251c8a1bd17fcdb403649ed8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:674f61a6c3d5701f7ce36db06a4896404fca6130251c8a1bd17fcdb403649ed8"
        occurred_at: "2026-10-10T23:47:00.106Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610102344-1WXGZ1"
        task_revision: 2
      -
        command_digest: "sha256:c898939a63b171222c0b531a6e7a52adeff85825c0b7b6d8a13594dae9849992"
        id: "sha256:dc243b401594025caeea86110f9d111036831dbe73e7dafa32fbb0b8df558c35:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:dc243b401594025caeea86110f9d111036831dbe73e7dafa32fbb0b8df558c35"
        occurred_at: "2026-10-10T23:47:26.511Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610102344-1WXGZ1"
        task_revision: 3
      -
        command_digest: "sha256:24cbd199517f25c9b0cba05c388c69adbae5e5cf07a10efe37ceb004de17f24b"
        id: "kernel_work_item_materialization_required:sha256:ccd73e6233aff0cf6136af01c1549c39dacdea5fe69d50518d495534808218e0:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ccd73e6233aff0cf6136af01c1549c39dacdea5fe69d50518d495534808218e0:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:47:53.336Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610102344-1WXGZ1"
        task_revision: 4
      -
        command_digest: "sha256:b6bbbebf163b983dfddbe5870135e12f33f08e330d4a569951781809276d2414"
        id: "kernel_work_item_claim_required:sha256:d2ce8b052f3b861d950d4e8c0fa74e4dcdf38fb4a405edac66255ca0e408642d:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d2ce8b052f3b861d950d4e8c0fa74e4dcdf38fb4a405edac66255ca0e408642d:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:48:25.402Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610102344-1WXGZ1"
        task_revision: 5
      -
        command_digest: "sha256:6ef1b30c3a33cec30f9a0644377e684b580e99be5eabd6153ab922240881fd11"
        id: "kernel_work_item_execution_required:sha256:e2788fe460c31cfdd9ef540962ea4b082dcc631baf8b07da10910fc1ec6638ec:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e2788fe460c31cfdd9ef540962ea4b082dcc631baf8b07da10910fc1ec6638ec:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:50:37.146Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610102344-1WXGZ1"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Authenticate completed native review projection from exact merged base checkout

Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path.

## Scope

- In scope: Repair generic read-only completed native review authentication after supported completed-workflow routing to a registered merged base checkout. Preserve strict owner-only review preparation/application permits. Allow retained review projection only with authenticated repository/common-store identity, registered owner/base routing, exact COMPLETED canonical record and original immutable exchange/WorkOrder/result/quality/supervisor receipt bindings. Never inherit a historical PASS or replay implementation. Reproduce actual accepted owner review followed by exact merged record at registered base; reject foreign or unregistered checkout, mismatched record/repository, tampered evidence and cross-checkout result application. No consumer-specific code, live provider effects, state forgery or verification-floor change. Use only four declared production/test files; return scope boundary before any additional path.
- Out of scope: unrelated refactors not required for "Authenticate completed native review projection from exact merged base checkout".

## Plan

1. Execute approved WorkItem authenticate-merged-review-projection.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts packages/agentplane/src/commands/task/kernel-completed-provider-workflow.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
