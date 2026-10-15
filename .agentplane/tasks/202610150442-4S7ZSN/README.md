---
id: "202610150442-4S7ZSN"
title: "Bind canonical integration recovery to the resolved task checkout"
status: "DOING"
priority: "med"
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
  - "security"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-15T04:49:27.204Z"
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
    - "effect_security_boundary"
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
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
  declaration:
    external_effects: []
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
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:43f659b5c97f292c10d6448d0bf91864bd094714a3cdbc333c1e6e00d0ab0556"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-15T04:42:08.600Z"
doc_updated_by: "CODER"
description: "Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects."
sections:
  Summary: |-
    Bind canonical integration recovery to the resolved task checkout

    Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
  Scope: |-
    - In scope: Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
    - Out of scope: unrelated refactors not required for "Bind canonical integration recovery to the resolved task checkout".
  Plan: "1. Execute approved WorkItem bind-recovery-task-checkout."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "task/202610142302-3PJHSP/recover-interrupted-integration-intent-for-compl"
    base_sha: "53d9a96ecc8f688e1c83de0336624f3338bc97a8"
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
            digest: "sha256:68dff98186fee278ab037d439dc24be178da18a28676cea282213b5d45468106"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b5f121b6b0ac89c8057986e1390e9e17e07a21cd70aeeafa71bc23b095c4e418"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            task_id: "202610150442-4S7ZSN"
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
        approval_evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
        digest: "sha256:b5f121b6b0ac89c8057986e1390e9e17e07a21cd70aeeafa71bc23b095c4e418"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
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
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            expected_outputs:
              - "task-checkout-recovery-source-report"
            id: "bind-recovery-task-checkout"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610150442-4S7ZSN"
      intent_digest: "sha256:268136e664984541275657a821402cf93770f8705b7c1b23d1727166449e8faa"
      migration_receipts: []
      mutation_receipts:
        capture:202610150442-4S7ZSN:
          after_revision: 1
          aggregate_digest: "sha256:f74a1fa1e467cd714e12a20616d4a781f4170b43828f9cfde3bd4860a9566808"
          before_revision: 0
          command_digest: "sha256:e7f5a638c060f75209e2b47d35751f902d47d78ba4b77bd2dcdfb33c89546296"
          effect_ids: []
          event_digests:
            - "sha256:89fa1b9c2ec2100ef3d1e1786e19db05dccd6e2551a9fca10a3f34ff71ce057e"
          mutation_id: "capture:202610150442-4S7ZSN"
        kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 5
          aggregate_digest: "sha256:4d1f8f18ef413df00e7f4ed3dd1cff4209777fac83aeb0269f708c0dff658d70"
          before_revision: 4
          command_digest: "sha256:c980f335794cd70c111af0148d2a4d36f6bbd9d1aeaeefbd142f8b8fedf3272e"
          effect_ids: []
          event_digests:
            - "sha256:22a79a9f0d06bd522c846d0defdce5e1682e64a8f795531559bc1f8c437fbf2b"
          mutation_id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 6
          aggregate_digest: "sha256:4eb3098f9bc4f4d1b2def7893ef0720cab9e781f72b36cad1bfbfbb8b2c0328c"
          before_revision: 5
          command_digest: "sha256:48db0e9d0cbade0ed156c4362ded33022ee7fa4413c63f37fefed068b964a8c0"
          effect_ids: []
          event_digests:
            - "sha256:0f93c6a62d2d79810fe437e18acc9042c0cb5f13cdaf3793baf693d96a871dbe"
          mutation_id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 4
          aggregate_digest: "sha256:13319bebe3a58f9eb0972cca5240b794c2e8f9d64516da79ed442108fc7ed9e5"
          before_revision: 3
          command_digest: "sha256:abc7d899f6a9b3e0f7a0a1bd2a3ac7539001fbf3fe4ac950ace0855b57d418ca"
          effect_ids: []
          event_digests:
            - "sha256:1f05f7754c6c2b1bfe5fe3c7e04eb5beb86170ef03b9592012145eb05c6ce415"
          mutation_id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015:
          after_revision: 2
          aggregate_digest: "sha256:e0a6b673ab260d6c4a652c16371a229c31e73d54ff55ae528ac1c0ad89379a4e"
          before_revision: 1
          command_digest: "sha256:f0c81a377e6da0029be61a28e83d4cfc489c8d54d2484054b72c8f6c207e2d1b"
          effect_ids: []
          event_digests:
            - "sha256:038ad9c2adc46a03a96ca3b6f96ad23841bd2363341d8699dc453eed9640a431"
          mutation_id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015"
        sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4:
          after_revision: 3
          aggregate_digest: "sha256:4164471c4e2440981ad85966fd31ef52d56fbfda34c9829e7630e55d6cf249c3"
          before_revision: 2
          command_digest: "sha256:e135fcad6d643812de03215166b6b63ae239c0db5d66a7d1feed9672b33d6b63"
          effect_ids: []
          event_digests:
            - "sha256:92f9e27f66ede67fa96c1cf3bd7198a0daf4e20d5e558d01526094562023c89a"
          mutation_id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bind-recovery-task-checkout:
          attempt: 1
          claim_id: "sha256:6766dc4aacc5274751a734c42d60988ce028f93613a6cebf4289bb4bda9f37b0"
          definition:
            contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
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
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            expected_outputs:
              - "task-checkout-recovery-source-report"
            id: "bind-recovery-task-checkout"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:627323cc4ecf3bb8197815d2f1e987482ce9409074eab53c7213ca3299482031"
    documents:
      contracts:
        sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021:
          acceptance_criteria:
            - "The original snapshot with repository_root equal to the genuine resolved Task checkout W passes identity validation when the exact integration queue is owned by base P, for supported invocation from either P or W. Resolve and revalidate W through existing trusted Task/workspace context; never derive trusted ownership solely from the untrusted receipt or original snapshot string."
            - "Reject a third unrelated root, mismatched or missing native task-worktree resolution, a snapshot naming another Task checkout, and Task/workspace ownership drift between initial and locked/final revalidation. Keep resolution.repository_root strictly equal to the authoritative queue/base P. Do not add broad root allowlists or arbitrary fallbacks."
            - "Preserve exact canonical COMPLETED Task identity/digest and accepted Plan/WorkItems/outputs/final validation, original operation snapshot/key/payload/authority/effect/preFP/start and full historical operations. Preserve current route and journal CAS, exact provider/project/PR/branch/head/base and full queue claim checks. Never downgrade a Task or manufacture implementation_rework."
            - "Preserve explicit operator-supplied receipt trust boundary and all existing receipt completeness, unique argv/time/root process/whole owned_history, same-host, expired lease and ESRCH-only liveness gates. Live, reused, EPERM, unknown or omitted worker identities remain rejected; expiry or a stopped assertion alone never proves an abandoned claim."
            - "Preserve both native locks, journal outcome CAS before exact queue release, post-CAS persistence failure behavior and idempotent bookkeeping-only continuation. No successor worker, merge, push, provider write, cleanup or automatic retry follows reconciliation. Legacy/applied recovery behavior and verification floors stay unchanged."
            - "Extend only the existing roadmap-common-recovery.test.ts with a real distinct P/W positive path for both supported invocations, unrelated-third-root and mismatched/missing resolved-checkout negatives. Preserve every existing assertion, failure injection and ordering test. Use existing test primitives, with no new module, wrapper, schema, dependency or test harness."
            - "Modify only the two authorized existing paths, preserving published parent53d9 and all source4/Task13/evidence, frozen C9/shared dependencies and Task35/PR6154/HANDOFF/claim artifacts. Do not change advance.command.ts unless a genuine supported scope expansion is approved first."
            - "Run the registered focused test command and typecheck, retain exact actual results/closure and stop at ROOT source review before native source intake. Required native SOURCE checks, distinct EVAL and mandatory independent FINAL full regression remain unchanged; FULL waits for the serialized ROOT heavy lane. No source-only delivery, verification waiver or live recovery claim."
          objective: "Fix only the repeated original snapshot root check in completed canonical integration recovery. Resolve the genuine Task worktree checkout W through existing native workspace ownership, while retaining resolution/queue ownership at base P. Support invocation from the genuine P or W through the existing authoritative controller route. Add the nearest existing regression cases and return the exact minimal source diff and focused evidence for ROOT review before source intake. Do not operate on the live queue or provider."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            - "bun run typecheck"
      intent:
        context: "Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects."
        objective: "Bind canonical integration recovery to the resolved task checkout"
    events:
      -
        command_digest: "sha256:e7f5a638c060f75209e2b47d35751f902d47d78ba4b77bd2dcdfb33c89546296"
        id: "capture:202610150442-4S7ZSN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610150442-4S7ZSN"
        occurred_at: "2026-10-15T04:42:08.565Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610150442-4S7ZSN"
        task_revision: 1
      -
        command_digest: "sha256:f0c81a377e6da0029be61a28e83d4cfc489c8d54d2484054b72c8f6c207e2d1b"
        id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015"
        occurred_at: "2026-10-15T04:49:22.888Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610150442-4S7ZSN"
        task_revision: 2
      -
        command_digest: "sha256:e135fcad6d643812de03215166b6b63ae239c0db5d66a7d1feed9672b33d6b63"
        id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4"
        occurred_at: "2026-10-15T04:49:25.287Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610150442-4S7ZSN"
        task_revision: 3
      -
        command_digest: "sha256:abc7d899f6a9b3e0f7a0a1bd2a3ac7539001fbf3fe4ac950ace0855b57d418ca"
        id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T04:49:28.404Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610150442-4S7ZSN"
        task_revision: 4
      -
        command_digest: "sha256:c980f335794cd70c111af0148d2a4d36f6bbd9d1aeaeefbd142f8b8fedf3272e"
        id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T04:49:31.892Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610150442-4S7ZSN"
        task_revision: 5
      -
        command_digest: "sha256:48db0e9d0cbade0ed156c4362ded33022ee7fa4413c63f37fefed068b964a8c0"
        id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T05:19:24.938Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610150442-4S7ZSN"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind canonical integration recovery to the resolved task checkout

Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.

## Scope

- In scope: Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
- Out of scope: unrelated refactors not required for "Bind canonical integration recovery to the resolved task checkout".

## Plan

1. Execute approved WorkItem bind-recovery-task-checkout.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
