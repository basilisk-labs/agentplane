---
id: "202608300119-ZHYXRS"
title: "Preserve WorkItem results during plan reapproval and recover evidence-only implementation"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
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
  state: "ok"
  updated_at: "2026-08-30T01:41:06.431Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-30T01:43:01.189Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "403edee0581fa08fb661c60487dcde7bd2f5bd88"
  blueprint_digest: "4432de042f170ef169a8e8d949b70e58013f30ee403a54acdfa985f9ed5169fd"
  evidence_refs:
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/7bd203cf9dcbd8fd7fb54c71fb43608d75f904771948104bd6fb5e32111922c3.md"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/README.md"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
    - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "All nine frozen evidence hashes match. The actual three-file diff is confined to approved scope."
    - "Repeated materialization returns the unchanged aggregate only after exact current approval/revision/proposal and complete WorkItem identity checks. Claims, attempts, outputs, validation, lifecycle and revision are therefore preserved atomically."
    - "Tests exercise all twelve WorkItem runtime states, partial and extra runtime, conflicting plan/approval, and fresh-plan materialization. Recovery tests retain rejection for changed effects and WorkItem identity."
    - "Supervisor core tests (443) and full local CI passed for the evaluated implementation. No blocking code or verification defects found."
    - "Residual risk: Already-reset historical WorkItems require explicit requalification; this fix intentionally does not reconstruct lost state."
    - "Residual risk: PR checks, merge and hosted close are not established by this local review."
token_usage:
  agent_runs: 6
  input_tokens: null
  journal_digest: "sha256:2c4146665c944cf66537daa655abd1db29135abbb7b6df5acd07b105b2ef4bad"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-30T01:43:10.640Z"
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
    authority_violations: []
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
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
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
commit:
  hash: "d24316765b3d9073e4aa876ec90620624b18977c"
  message: "🚧 ZHYXRS task: record external evaluator result"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 403edee0581f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-08-30T01:33:33.904Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 403edee0581f. CLI accepted one state-bound external-agent semantic result."
    commit: "403edee0581fa08fb661c60487dcde7bd2f5bd88"
  -
    type: "verify"
    at: "2026-08-30T01:41:06.431Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T01:43:10.640Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "d24316765b3d9073e4aa876ec90620624b18977c"
doc_version: 3
doc_updated_at: "2026-08-30T01:43:10.651Z"
doc_updated_by: "CODER"
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

    ### 2026-08-30T01:41:06.431Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8d97ad7afb16d72981973139859cb991b9aee06b2fd9b467d8e2c81d4e9e6b54, input_digest=sha256:68a59b239f2b1bdc7b8d6f4b0c9e4a8bcd76c8893ee7d22c2b1f3d1c2d862f9a

    Details:

    Check: affected_unit_integration
    Command: bun run test:project core
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run test:project core
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project core
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check task_outcome (2/2)

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
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608300119-ZHYXRS"
            - "git:403edee0581fa08fb661c60487dcde7bd2f5bd88"
          check_id: "core"
          command_identity: "bun run test:project core"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T01:41:06.431Z"
          repository_snapshot_digest: "sha256:e7f091081b910c5046815c48678e69812e82419f58940428360b5cbd04e6a150"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608300119-ZHYXRS"
            - "git:403edee0581fa08fb661c60487dcde7bd2f5bd88"
          check_id: "full"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T01:41:06.431Z"
          repository_snapshot_digest: "sha256:e7f091081b910c5046815c48678e69812e82419f58940428360b5cbd04e6a150"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
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
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 18
    schema_version: 1
    updated_at: "2026-08-30T01:43:10.640Z"
    work_items:
      preserve-reapproval-evidence:
        attempt: 2
        claim_id: null
        id: "preserve-reapproval-evidence"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:c06629cc559454bf0ca28148f247c254c6bf4221c1d3cddb3ac5a88644fad200"
            id: "reapproval-runtime-fix"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 1
              task_id: "202608300119-ZHYXRS"
              work_item_id: "preserve-reapproval-evidence"
            provenance:
              - "sha256:7d328d6e294a0b63bcfe31179b071939d96f06eb670c5256af2f4c02db3bc894"
              - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f39914f6fffc8e10363892fd89d4cacf69cf834817b077373da8e26442bc783a"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
              check_id: "core"
              command_identity: "bun run test:project core"
              detail: "Observed by bun run test:project core."
              exit_code: 0
              observed_at: "2026-08-30T01:41:09.802Z"
              repository_snapshot_digest: "sha256:f39914f6fffc8e10363892fd89d4cacf69cf834817b077373da8e26442bc783a"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
              check_id: "full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-30T01:41:09.802Z"
              repository_snapshot_digest: "sha256:f39914f6fffc8e10363892fd89d4cacf69cf834817b077373da8e26442bc783a"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608300119-ZHYXRS-executor-63fcd801b8b6e75985adc523:
        aggregate_digest: "sha256:8d1697e0d73766acb91519bdb93da0915b3c03b2f26474d2958c1816814d0e6f"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T01:41:09.806Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_750b2db316f5aa966329db17"
          mutation_id: "external-result:work-order-202608300119-ZHYXRS-executor-63fcd801b8b6e75985adc523"
          plan_digest: "sha256:55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608300119-ZHYXRS"
          task_revision: 14
          to: "COMPLETED"
          work_item_id: "preserve-reapproval-evidence"
        mutation_id: "external-result:work-order-202608300119-ZHYXRS-executor-63fcd801b8b6e75985adc523"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202608300119-ZHYXRS"
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
      legacy-finish:202608300119-ZHYXRS:2026-08-30T01:41:06.431Z:403edee0581fa08fb661c60487dcde7bd2f5bd88:
        aggregate_digest: "sha256:108045258d7e0c18e7fba116439a37927190f63ea9afd76f6cb7319b293d1109"
        event:
          actor_id: "CODER"
          at: "2026-08-30T01:43:10.640Z"
          cause_refs:
            - "task-verification:202608300119-ZHYXRS"
            - "git:403edee0581fa08fb661c60487dcde7bd2f5bd88"
          entity: "task"
          from: "ACTIVE"
          id: "event_11d59e17798904ed13524cc8"
          mutation_id: "legacy-finish:202608300119-ZHYXRS:2026-08-30T01:41:06.431Z:403edee0581fa08fb661c60487dcde7bd2f5bd88"
          plan_digest: "sha256:55b0da86d389ffee572af9276c362405a7b4f98e4af18f479e5f981f175581a4"
          plan_revision: 1
          repository_fingerprint: "sha256:e7f091081b910c5046815c48678e69812e82419f58940428360b5cbd04e6a150"
          schema_version: 1
          task_id: "202608300119-ZHYXRS"
          task_revision: 15
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608300119-ZHYXRS:2026-08-30T01:41:06.431Z:403edee0581fa08fb661c60487dcde7bd2f5bd88"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608300119-ZHYXRS"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "403edee0581fa08fb661c60487dcde7bd2f5bd88"
    message: "🚧 ZHYXRS task: apply external agent result"
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

### 2026-08-30T01:41:06.431Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8d97ad7afb16d72981973139859cb991b9aee06b2fd9b467d8e2c81d4e9e6b54, input_digest=sha256:68a59b239f2b1bdc7b8d6f4b0c9e4a8bcd76c8893ee7d22c2b1f3d1c2d862f9a

Details:

Check: affected_unit_integration
Command: bun run test:project core
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run test:project core
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project core
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608300119-ZHYXRS Verification Contract check task_outcome (2/2)

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

## Token Usage

- State: `unavailable`
- Completeness: `0/6` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:2c4146665c944cf66537daa655abd1db29135abbb7b6df5acd07b105b2ef4bad`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-30T01:43:10.640Z`
