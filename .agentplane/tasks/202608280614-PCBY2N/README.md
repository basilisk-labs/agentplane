---
id: "202608280614-PCBY2N"
title: "Recover task-level evidence rework after completed WorkItems"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-28T11:08:02.340Z"
  updated_by: "USER"
  note: "The user explicitly approved plan PCBY2N in this conversation with the affirmative response Даа to the specific plan confirmation question. Approved plan digest sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3; observed route fingerprint sha256:0aada06bfe08e7c84f0a36ffa99fd1fbcc251de6550848f9768639e348c209a0. Four-file scope and mandatory verification remain unchanged."
verification:
  state: "ok"
  updated_at: "2026-08-28T11:28:57.349Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "This is a reproduced blocker of a required protected integration path, not a new Core architecture program."
      - "Use the existing implementation proof, journal, verification and evaluator route; keep unchanged-source recovery fail-closed."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
      digest: "sha256:a878b21b3942dc45a1bc9714f7e69c3bbd3a12c48513d379ac98f2943c82caa8"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
  hash: "d7a70b6aba1d8b5d10d46da89edd4a9b9e47d83c"
  message: "🚧 PCBY2N task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d7a70b6aba1d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-28T11:08:27.484Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-28T11:21:14.427Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d7a70b6aba1d. CLI accepted one state-bound external-agent semantic result."
    commit: "d7a70b6aba1d8b5d10d46da89edd4a9b9e47d83c"
  -
    type: "verify"
    at: "2026-08-28T11:28:57.349Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-28T11:28:59.396Z"
doc_updated_by: "SUPERVISOR"
description: "Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap."
sections:
  Summary: |-
    Recover task-level evidence rework after completed WorkItems

    Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
  Scope: |-
    - In scope: Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
    - Out of scope: unrelated refactors not required for "Recover task-level evidence rework after completed WorkItems".
  Plan: "Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route."
  Verify Steps: |-
    1. Reproduce the task-level evidence-only rework failure with real Git after required WorkItem completion, evaluator documentation rework and an operator Findings update.
    2. Verify approved unchanged-source recovery uses validated historical implementation proof and preserves current task-level claims. Verify interrupted WorkItem recovery preserves its original claims. Rerun mandatory checks and obtain fresh evaluation.
    3. Reject changed plan, scope, authority, source HEAD, verification contract, incomplete WorkItems and missing or tampered proof. Cover interruption, replay and absence of false completion.
    4. Run focused recovery and real-Git tests, bun run ci:local:full, and git diff --check. Enforce the existing runtime and test size limits.
    5. Review the four approved source paths against the plan. Evidence and remaining limitations are recorded in typed semantic output and supervisor verification artifacts. Require exact-head hosted checks, protected integration and confirmed closure before calling this delivered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-28T11:28:57.349Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6800e08237fa51d0fbf5c26e109e05253639c40bda1bfed6da974e6a944633d9, input_digest=sha256:6edb64d27b895f1f7ade88e47f1b284a95dfead57d5dd212b40ff5870c881b11

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280614-PCBY2N Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280614-PCBY2N-recover-task-level-evidence-rework-after-complet/.agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json
    - old_digest: 8ed52ea7ab931c3a714304c85770c51901595982c616c106ced834ed6ed4d978
    - current_digest: 8ed52ea7ab931c3a714304c85770c51901595982c616c106ced834ed6ed4d978
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280614-PCBY2N

    DecisionContextRef:
    - operator_action: provider_action
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
  Findings: "Observed on main e3550efba441765882f2507cfaf659e9a76d2f0b: task 59VB06 completed its implementation WorkItem and full local verification. After evaluator documentation-only rework and a supported operator Findings update, a fresh task-level result with work_item_id=null was rejected for no supervisor-observed workspace change. The historical exchange belongs to a non-null WorkItem, and the older evidence-only fallback requires current metadata HEAD to equal the implementation commit. This is a required integration-path blocker, not a release or Core architecture expansion. Implementation and new verification are pending at this planning boundary. Current test, source and review evidence will be retained in typed semantic results and supervisor-owned verification artifacts. Preserve all blocked-task results and proof bytes. Hosted publication, integration, closure and release are not yet claimed."
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
    digest: "sha256:e0fddf99d28e8470facfbab809b4a7f9bdbd429ab4873d349c882baeed6cb003"
    grant_id: "42374c8e-9482-4cd5-b86e-f28ba6b21181"
    issued_at: "2026-08-28T11:08:02.340Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:8bc8509a6b6d92bc1d36ad6f32353e9b7b3a004a3d9c91b245a4b28baaafb575"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608280614-PCBY2N"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T11:08:02.340Z"
        approved_by: "USER"
        approved_digest: "sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T06:16:14.138Z"
      digest: "sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3"
      proposal:
        assumptions:
          - "The scoped repair can use the existing implementation evidence and state machine without new schemas, authority primitives, or stores."
          - "No source edits are allowed in blocked 59VB06 or DVS5NN. Their received results must be preserved for later recovery with the integrated fix."
          - "All required tests and release/Core sequencing remain unchanged. Scope drift must be reported before editing outside the four declared files."
        planning_baseline:
          captured_at: "2026-08-28T06:15:05.383Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
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
            - ".agentplane/tasks/202608280614-PCBY2N/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608280614-PCBY2N"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "mandatory-checks"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "mandatory-checks"
              description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
              id: "reproduce"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
              id: "recover"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
              id: "guards"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
              id: "verify"
              required: true
          evidence_fingerprint: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
                  id: "reproduce"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
                  id: "recover"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
                  id: "guards"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
                  id: "verify"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                symbol_hints:
                  - "resolveRecordedImplementationRecovery"
                  - "recordedEvidenceOnlyReworkCommit"
                  - "applyExternalImplementationResult"
              depends_on: []
              expected_outputs:
                - "evidence-rework-proof"
              id: "recover-task-level-evidence-rework"
              objective: "Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "mandatory-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
                    id: "reproduce"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
                    id: "recover"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
                    id: "guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
                    id: "verify"
                    required: true
                evidence_fingerprint: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608280614-PCBY2N"
    event_cursor: 0
    final_validation: null
    id: "202608280614-PCBY2N"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-28T06:14:54.650Z"
      constraints: []
      request: |-
        Recover task-level evidence rework after completed WorkItems

        Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
      task_id: "202608280614-PCBY2N"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 10
    schema_version: 1
    updated_at: "2026-08-28T11:29:00.632Z"
    work_items:
      recover-task-level-evidence-rework:
        attempt: 1
        claim_id: null
        id: "recover-task-level-evidence-rework"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:85be95d318f6bca1ea19bc54cc90c836f149279de4ee68ba17d88ec9c79e308a"
            id: "evidence-rework-proof"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608280614-PCBY2N"
              work_item_id: "recover-task-level-evidence-rework"
            provenance:
              - "sha256:fece17f7bd22650967fb2b6a3dc236a9822bc0218da8878b5143c694454e4059"
              - ".agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:244fb92a2f29fe0f7c5088c736734d94219922c4adb48fdb1c465321d91f56bb"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
              check_id: "mandatory-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-08-28T11:29:00.628Z"
              repository_snapshot_digest: "sha256:244fb92a2f29fe0f7c5088c736734d94219922c4adb48fdb1c465321d91f56bb"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608280614-PCBY2N-executor-680862d35cabad2bf327c16d:
        aggregate_digest: "sha256:20de28cbc1f6ffb1b004c40f2af5c8c64ba463715a9fda33161dcc68b122fa95"
        event:
          actor_id: "agentplane"
          at: "2026-08-28T11:29:00.632Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_fb6676e09a28acf2286f2e0c"
          mutation_id: "external-result:work-order-202608280614-PCBY2N-executor-680862d35cabad2bf327c16d"
          plan_digest: "sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608280614-PCBY2N"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "recover-task-level-evidence-rework"
        mutation_id: "external-result:work-order-202608280614-PCBY2N-executor-680862d35cabad2bf327c16d"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608280614-PCBY2N"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "d7a70b6aba1d8b5d10d46da89edd4a9b9e47d83c"
  task_execution_context:
    base_ref: "main"
    base_sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
    version: 1
id_source: "generated"
---
## Summary

Recover task-level evidence rework after completed WorkItems

Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.

## Scope

- In scope: Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
- Out of scope: unrelated refactors not required for "Recover task-level evidence rework after completed WorkItems".

## Plan

Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route.

## Verify Steps

1. Reproduce the task-level evidence-only rework failure with real Git after required WorkItem completion, evaluator documentation rework and an operator Findings update.
2. Verify approved unchanged-source recovery uses validated historical implementation proof and preserves current task-level claims. Verify interrupted WorkItem recovery preserves its original claims. Rerun mandatory checks and obtain fresh evaluation.
3. Reject changed plan, scope, authority, source HEAD, verification contract, incomplete WorkItems and missing or tampered proof. Cover interruption, replay and absence of false completion.
4. Run focused recovery and real-Git tests, bun run ci:local:full, and git diff --check. Enforce the existing runtime and test size limits.
5. Review the four approved source paths against the plan. Evidence and remaining limitations are recorded in typed semantic output and supervisor verification artifacts. Require exact-head hosted checks, protected integration and confirmed closure before calling this delivered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-28T11:28:57.349Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6800e08237fa51d0fbf5c26e109e05253639c40bda1bfed6da974e6a944633d9, input_digest=sha256:6edb64d27b895f1f7ade88e47f1b284a95dfead57d5dd212b40ff5870c881b11

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280614-PCBY2N Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280614-PCBY2N-recover-task-level-evidence-rework-after-complet/.agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json
- old_digest: 8ed52ea7ab931c3a714304c85770c51901595982c616c106ced834ed6ed4d978
- current_digest: 8ed52ea7ab931c3a714304c85770c51901595982c616c106ced834ed6ed4d978
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280614-PCBY2N

DecisionContextRef:
- operator_action: provider_action
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

Observed on main e3550efba441765882f2507cfaf659e9a76d2f0b: task 59VB06 completed its implementation WorkItem and full local verification. After evaluator documentation-only rework and a supported operator Findings update, a fresh task-level result with work_item_id=null was rejected for no supervisor-observed workspace change. The historical exchange belongs to a non-null WorkItem, and the older evidence-only fallback requires current metadata HEAD to equal the implementation commit. This is a required integration-path blocker, not a release or Core architecture expansion. Implementation and new verification are pending at this planning boundary. Current test, source and review evidence will be retained in typed semantic results and supervisor-owned verification artifacts. Preserve all blocked-task results and proof bytes. Hosted publication, integration, closure and release are not yet claimed.
