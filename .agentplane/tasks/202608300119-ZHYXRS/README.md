---
id: "202608300119-ZHYXRS"
title: "Preserve WorkItem results during plan reapproval and recover evidence-only implementation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project core"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T01:22:55.423Z"
  updated_by: "USER"
  note: "Denis explicitly approved all subsequent in-scope Clean Core plans and bootstrap fixes and instructed continuation to completion in this conversation. Apply that standing operator authorization to plan 55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4; preserve all enforcement gates."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Bounded bootstrap repair preserves canonical execution evidence and retains strict recovery guards."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  observed:
    authority_violations:
      - "verification:recorded-check-2:fail"
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/core/src/tasks/task-centric/graph.ts"
      - "packages/core/src/tasks/task-centric/task-centric.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "fail"
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
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-centric"
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
      digest: "sha256:9b32c27a551fe07f89ded9baf48dc67ab77e452421d44ad81e4726f76c2b1037"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-centric"
        - "central_path:packages/core/src/tasks/task-centric/graph.ts"
        - "central_path:packages/core/src/tasks/task-centric/task-centric.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/core/src/tasks/task-centric/graph.ts"
          - "packages/core/src/tasks/task-centric/task-centric.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
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
      - "verification_recovery:recorded-check-2"
commit: null
comments:
  -
    author: "PLANNER"
    body: "Planning returned blocked: The declared bun run test:core command does not exist in package.json. Correct the operator-created verification command before planning."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 01974c4594b1. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "comment"
    at: "2026-08-30T01:20:56.186Z"
    author: "PLANNER"
    body: "Planning returned blocked: The declared bun run test:core command does not exist in package.json. Correct the operator-created verification command before planning."
  -
    type: "status"
    at: "2026-08-30T01:23:11.887Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T01:27:35.255Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 01974c4594b1. CLI accepted one state-bound external-agent semantic result."
    commit: "01974c4594b14c86c2705a1b586d3cb90a3b6f08"
  -
    type: "verify"
    at: "2026-08-30T01:30:42.448Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-08-30T01:30:44.440Z"
doc_updated_by: "SUPERVISOR"
description: "Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1."
sections:
  Summary: |-
    Preserve WorkItem results during plan reapproval and recover evidence-only implementation

    Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.
  Scope: |-
    - In scope: Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.
    - Out of scope: unrelated refactors not required for "Preserve WorkItem results during plan reapproval and recover evidence-only implementation".
  Plan: |-
    1. Preserve existing WorkItem runtime when materializing the identical approved current plan. Reject incompatible runtime or plan identity instead of guessing.
    2. Extend existing tests for COMPLETED results, manifests, validation, attempts, active claims, partial runtime and changed-plan rejection.
    3. Audit recorded implementation recovery. Keep exact WorkItem, plan, Git and authority guards. Add missing negative coverage; do not weaken no-change rejection when the recovery contract changed.
    4. Run core and focused recovery suites, typechecking and full local CI. Submit evidence for supervisor evaluation and hosted delivery.
    5. After delivery, resume M1 through an explicit requalification plan if its historical receipt cannot satisfy the current contract. No manual task-state restoration and no cosmetic implementation edits.
  Verify Steps: |-
    1. Run `bun run test:project core`. Confirm that same-plan reapproval preserves WorkItem state, manifests, validation, and attempts; mismatched plans remain rejected.
    2. Run focused implementation recovery tests. Confirm exact recorded evidence can be reused only for the matching WorkItem and unchanged authority, and stale or ambiguous evidence fails closed.
    3. Run `bun run ci:local:full`. Require all configured checks to pass.
    4. Require exact-head hosted checks, merge, and Task Hosted Close before calling this task delivered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T01:30:42.448Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8d97ad7afb16d72981973139859cb991b9aee06b2fd9b467d8e2c81d4e9e6b54, input_digest=sha256:ca9f5123bc2ab03729a08040396c3ded88c391125b776b4c378b586712b653be

    Details:

    Command: bun run test:project core
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608300119-ZHYXRS declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608300119-ZHYXRS declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608300119-ZHYXRS-preserve-workitem-results-during-plan-reapproval/.agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json
    - old_digest: 4432de042f170ef169a8e8d949b70e58013f30ee403a54acdfa985f9ed5169fd
    - current_digest: 4432de042f170ef169a8e8d949b70e58013f30ee403a54acdfa985f9ed5169fd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608300119-ZHYXRS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:df8af5f2131c41c75b3fe206942e680678405e819bb78751266f77ab512bae13"
    grant_id: "9984aabd-8323-4507-8788-71358225e88b"
    issued_at: "2026-08-30T01:22:55.423Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:15732b0e2e9bfd1140253386851d981e5677f8a9e6157822dd1299fc9bd57ffb"
    plan_revision: 5
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608300119-ZHYXRS"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T01:22:55.423Z"
        approved_by: "USER"
        approved_digest: "sha256:55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T01:22:41.851Z"
      digest: "sha256:55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4"
      proposal:
        assumptions:
          - "M1 will be freshly qualified if its current approved contract differs from recorded evidence."
        planning_baseline:
          captured_at: "2026-08-30T01:21:43.157Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c88e5d8caf7a1c21b84632dd618883f55b9b6fe3a237465318ef4c2e665f4800"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
            - ".agentplane/tasks/202608300119-ZHYXRS/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "71519a0e675d7d460d27e7c5aea87d1f2363b9e2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:4"
        schema_version: 1
        task_id: "202608300119-ZHYXRS"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project core"
              id: "core"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "core"
                - "full"
              description: "Repeated approval of the identical current plan preserves all WorkItem runtime evidence and does not reopen completed work. Changed, mismatched, unapproved, or ambiguous plan runtime is rejected."
              id: "preservation"
              required: true
            -
              check_ids:
                - "full"
              description: "Recovery remains bound to exact recorded implementation, WorkItem, plan and authority. Retain rejection for missing or stale evidence; use explicit requalification for M1 when its changed contract cannot reuse historical results."
              id: "recovery-safety"
              required: true
          evidence_fingerprint: "sha256:a35f4e7d57491a78c67824b07dd887d361713e826343a2fe95926ca4f58fcbdd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "core"
                    - "full"
                  description: "Repeated approval of the identical current plan preserves all WorkItem runtime evidence and does not reopen completed work. Changed, mismatched, unapproved, or ambiguous plan runtime is rejected."
                  id: "preservation"
                  required: true
                -
                  check_ids:
                    - "full"
                  description: "Recovery remains bound to exact recorded implementation, WorkItem, plan and authority. Retain rejection for missing or stale evidence; use explicit requalification for M1 when its changed contract cannot reuse historical results."
                  id: "recovery-safety"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65000
                optional_sources: []
                required_sources:
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                symbol_hints:
                  - "materializeApprovedWorkItems"
                  - "resolveRecordedImplementationRecovery"
              depends_on: []
              expected_outputs:
                - "reapproval-runtime-fix"
              id: "preserve-reapproval-evidence"
              objective: "Make same-plan materialization idempotent without resetting runtime. Add preservation and rejection regressions. Audit evidence-only recovery; preserve its strict contract and add missing tests for changed authority rather than accepting unsupported no-op claims."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "medium"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project core"
                    id: "core"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "core"
                      - "full"
                    description: "Repeated approval of the identical current plan preserves all WorkItem runtime evidence and does not reopen completed work. Changed, mismatched, unapproved, or ambiguous plan runtime is rejected."
                    id: "preservation"
                    required: true
                  -
                    check_ids:
                      - "full"
                    description: "Recovery remains bound to exact recorded implementation, WorkItem, plan and authority. Retain rejection for missing or stale evidence; use explicit requalification for M1 when its changed contract cannot reuse historical results."
                    id: "recovery-safety"
                    required: true
                evidence_fingerprint: "sha256:a35f4e7d57491a78c67824b07dd887d361713e826343a2fe95926ca4f58fcbdd"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608300119-ZHYXRS"
    event_cursor: 0
    final_validation: null
    id: "202608300119-ZHYXRS"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project core"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-30T01:21:37.039Z"
      constraints: []
      request: |-
        Preserve WorkItem results during plan reapproval and recover evidence-only implementation

        Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.
      task_id: "202608300119-ZHYXRS"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 11
    schema_version: 1
    updated_at: "2026-08-30T01:30:45.653Z"
    work_items:
      preserve-reapproval-evidence:
        attempt: 1
        claim_id: null
        id: "preserve-reapproval-evidence"
        last_failure:
          cause_refs:
            - "preservation"
            - "recovery-safety"
          code: "validation_failed"
          kind: "validation"
          message: "Implemented idempotent materialization for an already approved identical current plan. Existing WorkItem states, attempts, claims, output manifests, validation and task lifecycle remain intact. Partial, mismatched, unapproved or different-plan runtime is rejected rather than reset. Extended core regressions across all 12 WorkItem states and recovery guards for changed repository effects and WorkItem identity."
          retryable: true
        output_manifests:
          -
            digest: "sha256:55415ddc5c30e29e4dcd22200e9f76d11b94fd8e3b2dcb05faafd23a00154beb"
            id: "reapproval-runtime-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608300119-ZHYXRS"
              work_item_id: "preserve-reapproval-evidence"
            provenance:
              - "sha256:fea986f2e92bad78577f74b14b7cc6259bb6f9d05b8636454fc4311a2efb720f"
              - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:a4a94d3179bfefcbc08a5abfc3b739ad971bb0b15e08e7dfc62c99e9e3a663c7"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
              check_id: "core"
              command_identity: "bun run test:project core"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T01:30:45.647Z"
              repository_snapshot_digest: "sha256:a4a94d3179bfefcbc08a5abfc3b739ad971bb0b15e08e7dfc62c99e9e3a663c7"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
              check_id: "full"
              command_identity: "bun run ci:local:full"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 1
              observed_at: "2026-08-30T01:30:45.647Z"
              repository_snapshot_digest: "sha256:a4a94d3179bfefcbc08a5abfc3b739ad971bb0b15e08e7dfc62c99e9e3a663c7"
              status: "failed"
          schema_version: 1
          stale_evidence: []
          status: "failed"
          unsatisfied_criteria:
            - "preservation"
            - "recovery-safety"
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608300119-ZHYXRS-executor-74cd710cc58c74d5b61770c9:
        aggregate_digest: "sha256:518664286ec5bc8796dafc7e4f878e40a53f3c3e1ec19a42b1e0be0f0b68865b"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T01:30:45.653Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_cdfb4346b961138fcab22293"
          mutation_id: "external-result:work-order-202608300119-ZHYXRS-executor-74cd710cc58c74d5b61770c9"
          plan_digest: "sha256:55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608300119-ZHYXRS"
          task_revision: 10
          to: "REWORK_READY"
          work_item_id: "preserve-reapproval-evidence"
        mutation_id: "external-result:work-order-202608300119-ZHYXRS-executor-74cd710cc58c74d5b61770c9"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202608300119-ZHYXRS"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "71519a0e675d7d460d27e7c5aea87d1f2363b9e2"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "71519a0e675d7d460d27e7c5aea87d1f2363b9e2"
    version: 1
id_source: "generated"
---
## Summary

Preserve WorkItem results during plan reapproval and recover evidence-only implementation

Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.

## Scope

- In scope: Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.
- Out of scope: unrelated refactors not required for "Preserve WorkItem results during plan reapproval and recover evidence-only implementation".

## Plan

1. Preserve existing WorkItem runtime when materializing the identical approved current plan. Reject incompatible runtime or plan identity instead of guessing.
2. Extend existing tests for COMPLETED results, manifests, validation, attempts, active claims, partial runtime and changed-plan rejection.
3. Audit recorded implementation recovery. Keep exact WorkItem, plan, Git and authority guards. Add missing negative coverage; do not weaken no-change rejection when the recovery contract changed.
4. Run core and focused recovery suites, typechecking and full local CI. Submit evidence for supervisor evaluation and hosted delivery.
5. After delivery, resume M1 through an explicit requalification plan if its historical receipt cannot satisfy the current contract. No manual task-state restoration and no cosmetic implementation edits.

## Verify Steps

1. Run `bun run test:project core`. Confirm that same-plan reapproval preserves WorkItem state, manifests, validation, and attempts; mismatched plans remain rejected.
2. Run focused implementation recovery tests. Confirm exact recorded evidence can be reused only for the matching WorkItem and unchanged authority, and stale or ambiguous evidence fails closed.
3. Run `bun run ci:local:full`. Require all configured checks to pass.
4. Require exact-head hosted checks, merge, and Task Hosted Close before calling this task delivered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T01:30:42.448Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8d97ad7afb16d72981973139859cb991b9aee06b2fd9b467d8e2c81d4e9e6b54, input_digest=sha256:ca9f5123bc2ab03729a08040396c3ded88c391125b776b4c378b586712b653be

Details:

Command: bun run test:project core
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608300119-ZHYXRS declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608300119-ZHYXRS declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608300119-ZHYXRS-preserve-workitem-results-during-plan-reapproval/.agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json
- old_digest: 4432de042f170ef169a8e8d949b70e58013f30ee403a54acdfa985f9ed5169fd
- current_digest: 4432de042f170ef169a8e8d949b70e58013f30ee403a54acdfa985f9ed5169fd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608300119-ZHYXRS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
