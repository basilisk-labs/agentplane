---
id: "202608281151-WQ89A1"
title: "Recover evidence rework after execution-base provenance hydration"
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
  updated_at: "2026-08-28T14:50:16.090Z"
  updated_by: "USER"
  note: "The user explicitly replied Да to the preceding question approving WQ89A1: bounded recovery comparison and regression tests in three files with unchanged checks and authority guards. Current plan_digest sha256:26170da8dfdfe4b526eee0cc9e3d8ff300df0d12129b1c3499891c0f3f6ce6f9 and state_fingerprint sha256:a7b91c761fb8c29e4ec6642a167f0c20fb56b8c3b9d42efe1b4b194d8b841835 were freshly checked before this operator recording. This records the actual user decision; it is not a host receipt or an expansion of release scope."
verification:
  state: "ok"
  updated_at: "2026-08-28T15:05:29.537Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
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
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The missing provenance normalization blocks an already approved protected integration path."
      - "Use existing recorded effect recovery and mandatory verification; do not add a state store, authority mechanism or release criterion."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
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
      digest: "sha256:54f320469b996b47df8bd77937e9fb51f74336ba033ec1fdd8d2a6208eb51aa9"
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
  hash: "3bcbff39f0ebe9bc381ff6230d1d55190914be84"
  message: "🚧 WQ89A1 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 3bcbff39f0eb. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-28T14:50:51.072Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-28T14:57:32.386Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3bcbff39f0eb. CLI accepted one state-bound external-agent semantic result."
    commit: "3bcbff39f0ebe9bc381ff6230d1d55190914be84"
  -
    type: "verify"
    at: "2026-08-28T15:05:29.537Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-28T15:05:31.724Z"
doc_updated_by: "SUPERVISOR"
description: "On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion."
sections:
  Summary: |-
    Recover evidence rework after execution-base provenance hydration

    On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.
  Scope: |-
    - In scope: On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.
    - Out of scope: unrelated refactors not required for "Recover evidence rework after execution-base provenance hydration".
  Plan: "Recover the unchanged approved implementation after verification removes creation-checkout provenance from an otherwise identical execution base. Cover the actual initialized-repository lifecycle and retain exact authority and history guards."
  Verify Steps: |-
    1. Reproduce the initialized-repository creation-checkout execution context, verification persistence, completed WorkItems and Findings-only rework using real Git. Expected: before the fix the unchanged-source recovery fails because source=creation_checkout is removed by verification.
    2. Run scoped recovery unit and real-Git tests. Expected: only proved provenance-only equivalence succeeds; changed base ref, SHA, repository identity, invalid schema and unknown fields/provenance remain rejected alongside existing scope, plan, grant, proof and incomplete-WorkItem guards.
    3. Exercise ordinary continuation, interruptions before and after verification, repeated continuation and the next fresh evaluator transition. Expected: original result/proof bytes remain unchanged, no old verdict is copied, required checks rerun and no false DONE occurs.
    4. Run bun run ci:local:full and git diff --check with unchanged checks. Review the complete diff against the three approved files. Expected: no CI, schema, authority, lifecycle or release scope expansion.
    5. Return current evidence and residual gaps in the typed result. Findings records the initial cause and pending boundaries. Exact-head hosted checks, protected integration and terminal closure are required for delivery; release 0.7.8 qualification remains separate.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-28T15:05:29.537Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fe3b67317a2fee4491f170cfa36bafd2e76c1e18ed69b0bc6fa43f9d64cb47a5, input_digest=sha256:8663aef770ac0e01d75b1a8e92ba4fb2b62f95c0d27cb7fb93f7be912bdb64a6

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608281151-WQ89A1-recover-evidence-rework-after-execution-base-pro/.agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json
    - old_digest: 94f5b2a0be0bc765475fc39cdeab2d5f9f337399de1c086b89b8e26edd719ffe
    - current_digest: 94f5b2a0be0bc765475fc39cdeab2d5f9f337399de1c086b89b8e26edd719ffe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608281151-WQ89A1

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
  Findings: |-
    Observed on main 2b0760edea02ef80eecc61e82d47fa2a21c691fc after PCBY2N integration and terminal closure: 59VB06 still rejects its immutable received task-level rework result with no supervisor-observed workspace change. In-memory comparison of implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376 against both HEAD and working README changes from false to true when only execution-context source is removed. Schema 1, base ref main, base SHA 844eff36ba407436c26a3c63346b0dcc384ce2b5 and repository identity are identical. No historical artifact was changed.

    Cause: task creation stores source=creation_checkout; verify-record-execute.ts persists the same execution base without that field. The existing real-Git fixture creates its task before an initial commit, so it misses this production shape. The approved task repairs only recovery comparison and the two existing test files, retaining exact identity and authority checks.

    Pending at planning: reproduce the red case with the actual initialized-repository shape, implement bounded equivalence, prove guarded recovery and retry, run focused checks and unchanged full CI, obtain fresh evaluation, pass exact-head hosted checks, integrate and confirm terminal closure. Implementer evidence will be returned through the semantic result and supervisor-owned records. These planning findings do not claim implementation, verification, integration or release readiness. After delivery, retry 59VB06 and then DVS5NN through the fresh integrated runtime; preserve their original exchanges and the release/Core order.
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
    digest: "sha256:a0033cf67da17f7ce20303cf59ae8bc1ce9312430cedd34657cca29bb7bcfd40"
    grant_id: "0e7731d0-9d11-460e-b2a6-75fa368050e8"
    issued_at: "2026-08-28T14:50:16.090Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:6cb4055f7ef1890363e5f3741e2fdcd2cc6bfff0d5a4e5a9d60719aa75498736"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608281151-WQ89A1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T14:50:16.090Z"
        approved_by: "USER"
        approved_digest: "sha256:26170da8dfdfe4b526eee0cc9e3d8ff300df0d12129b1c3499891c0f3f6ce6f9"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T11:53:09.367Z"
      digest: "sha256:26170da8dfdfe4b526eee0cc9e3d8ff300df0d12129b1c3499891c0f3f6ce6f9"
      proposal:
        assumptions:
          - "The repair is bounded to recovery comparison and its tests; changing verification persistence is not required to recover existing historical tasks."
          - "All previous exchanges, task state, execution grants and release/Core ordering remain unchanged."
          - "Do not expand the three-file scope if another cause appears. Return a typed blocker with evidence."
        planning_baseline:
          captured_at: "2026-08-28T11:52:12.067Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:73976ae845f48d09d183fa76ce0179c5b41fc4ebbdeefc8599506306347bf7d2"
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
            - ".agentplane/tasks/202608281151-WQ89A1/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2b0760edea02ef80eecc61e82d47fa2a21c691fc"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608281151-WQ89A1"
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
              description: "Reproduce on real Git the creation-checkout context, implementation commit, verification persistence, completed WorkItems, evaluator Findings rework and failed no-change recovery. Start from an initialized repository before task creation so the test covers the production context shape."
              id: "reproduce"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Normalize only the demonstrated provenance-only transition when schema, base ref, base SHA and repository identity remain valid and exactly equal. Recover existing implementation evidence and rerun required checks before fresh evaluator review; do not rewrite historical context or old result/proof."
              id: "recover"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Reject changed base ref, base SHA, repository identity, schema, invalid or unknown context/provenance fields, and all existing plan, scope, grant, source, evidence, verification-contract and WorkItem guards. Do not convert genuine drift into approval equivalence."
              id: "guards"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Verify ordinary continuation, interruption before and after verification, repeat invocation, late stale-result rejection and next fresh evaluator transition. Preserve immutable original bytes and no-false-DONE checks."
              id: "sequence"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Run focused recovery tests, required bun run ci:local:full and git diff --check without weaker checks. Keep the three-file scope. Findings must contain the proved cause and current evidence gaps before implementation review. Delivery requires exact-head hosted checks, protected integration and terminal closure; release qualification is separate."
              id: "verify"
              required: true
          evidence_fingerprint: "sha256:73976ae845f48d09d183fa76ce0179c5b41fc4ebbdeefc8599506306347bf7d2"
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
                  description: "Reproduce on real Git the creation-checkout context, implementation commit, verification persistence, completed WorkItems, evaluator Findings rework and failed no-change recovery. Start from an initialized repository before task creation so the test covers the production context shape."
                  id: "reproduce"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Normalize only the demonstrated provenance-only transition when schema, base ref, base SHA and repository identity remain valid and exactly equal. Recover existing implementation evidence and rerun required checks before fresh evaluator review; do not rewrite historical context or old result/proof."
                  id: "recover"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reject changed base ref, base SHA, repository identity, schema, invalid or unknown context/provenance fields, and all existing plan, scope, grant, source, evidence, verification-contract and WorkItem guards. Do not convert genuine drift into approval equivalence."
                  id: "guards"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Verify ordinary continuation, interruption before and after verification, repeat invocation, late stale-result rejection and next fresh evaluator transition. Preserve immutable original bytes and no-false-DONE checks."
                  id: "sequence"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Run focused recovery tests, required bun run ci:local:full and git diff --check without weaker checks. Keep the three-file scope. Findings must contain the proved cause and current evidence gaps before implementation review. Delivery requires exact-head hosted checks, protected integration and terminal closure; release qualification is separate."
                  id: "verify"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 150000
                optional_sources:
                  - "packages/agentplane/src/commands/task/new.ts"
                  - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                  - "packages/core/src/tasks/task-execution-base.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                symbol_hints:
                  - "taskReadmesPreserveRecoveryContract"
                  - "resolveRecordedImplementationRecovery"
                  - "completedFixture"
              depends_on: []
              expected_outputs:
                - "base-provenance-recovery-proof"
              id: "recover-base-provenance"
              objective: "Recover the unchanged approved implementation after verification removes creation-checkout provenance from an otherwise identical execution base. Cover the actual initialized-repository lifecycle and retain exact authority and history guards."
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
                    description: "Reproduce on real Git the creation-checkout context, implementation commit, verification persistence, completed WorkItems, evaluator Findings rework and failed no-change recovery. Start from an initialized repository before task creation so the test covers the production context shape."
                    id: "reproduce"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Normalize only the demonstrated provenance-only transition when schema, base ref, base SHA and repository identity remain valid and exactly equal. Recover existing implementation evidence and rerun required checks before fresh evaluator review; do not rewrite historical context or old result/proof."
                    id: "recover"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reject changed base ref, base SHA, repository identity, schema, invalid or unknown context/provenance fields, and all existing plan, scope, grant, source, evidence, verification-contract and WorkItem guards. Do not convert genuine drift into approval equivalence."
                    id: "guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Verify ordinary continuation, interruption before and after verification, repeat invocation, late stale-result rejection and next fresh evaluator transition. Preserve immutable original bytes and no-false-DONE checks."
                    id: "sequence"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run focused recovery tests, required bun run ci:local:full and git diff --check without weaker checks. Keep the three-file scope. Findings must contain the proved cause and current evidence gaps before implementation review. Delivery requires exact-head hosted checks, protected integration and terminal closure; release qualification is separate."
                    id: "verify"
                    required: true
                evidence_fingerprint: "sha256:73976ae845f48d09d183fa76ce0179c5b41fc4ebbdeefc8599506306347bf7d2"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608281151-WQ89A1"
    event_cursor: 0
    final_validation: null
    id: "202608281151-WQ89A1"
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
      captured_at: "2026-08-28T11:52:00.001Z"
      constraints: []
      request: |-
        Recover evidence rework after execution-base provenance hydration

        On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.
      task_id: "202608281151-WQ89A1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 10
    schema_version: 1
    updated_at: "2026-08-28T15:05:33.197Z"
    work_items:
      recover-base-provenance:
        attempt: 1
        claim_id: null
        id: "recover-base-provenance"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:611cb6b513485907a0c3b11436a1360d38144e71adf832278549b2f323e8841d"
            id: "base-provenance-recovery-proof"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608281151-WQ89A1"
              work_item_id: "recover-base-provenance"
            provenance:
              - "sha256:67437c8094ae31a4de68a92e62a0116641ed6e886dfcb9df7c129113326796d6"
              - ".agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:b3089cf25b04fd21ae3673f928182311e6b224970795026e21af3c15532bb2f5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
              check_id: "mandatory-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-08-28T15:05:33.192Z"
              repository_snapshot_digest: "sha256:b3089cf25b04fd21ae3673f928182311e6b224970795026e21af3c15532bb2f5"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608281151-WQ89A1-executor-5e2235a5501c3f1c8941dfb4:
        aggregate_digest: "sha256:7f658d1a1f54bc5a2dd8912a67d27601c239ac94697aafb88ea10788119ffa0c"
        event:
          actor_id: "agentplane"
          at: "2026-08-28T15:05:33.197Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_300377562887322b24f21665"
          mutation_id: "external-result:work-order-202608281151-WQ89A1-executor-5e2235a5501c3f1c8941dfb4"
          plan_digest: "sha256:26170da8dfdfe4b526eee0cc9e3d8ff300df0d12129b1c3499891c0f3f6ce6f9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608281151-WQ89A1"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "recover-base-provenance"
        mutation_id: "external-result:work-order-202608281151-WQ89A1-executor-5e2235a5501c3f1c8941dfb4"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608281151-WQ89A1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "3bcbff39f0ebe9bc381ff6230d1d55190914be84"
  task_execution_context:
    base_ref: "main"
    base_sha: "2b0760edea02ef80eecc61e82d47fa2a21c691fc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "2b0760edea02ef80eecc61e82d47fa2a21c691fc"
    version: 1
id_source: "generated"
---
## Summary

Recover evidence rework after execution-base provenance hydration

On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.

## Scope

- In scope: On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.
- Out of scope: unrelated refactors not required for "Recover evidence rework after execution-base provenance hydration".

## Plan

Recover the unchanged approved implementation after verification removes creation-checkout provenance from an otherwise identical execution base. Cover the actual initialized-repository lifecycle and retain exact authority and history guards.

## Verify Steps

1. Reproduce the initialized-repository creation-checkout execution context, verification persistence, completed WorkItems and Findings-only rework using real Git. Expected: before the fix the unchanged-source recovery fails because source=creation_checkout is removed by verification.
2. Run scoped recovery unit and real-Git tests. Expected: only proved provenance-only equivalence succeeds; changed base ref, SHA, repository identity, invalid schema and unknown fields/provenance remain rejected alongside existing scope, plan, grant, proof and incomplete-WorkItem guards.
3. Exercise ordinary continuation, interruptions before and after verification, repeated continuation and the next fresh evaluator transition. Expected: original result/proof bytes remain unchanged, no old verdict is copied, required checks rerun and no false DONE occurs.
4. Run bun run ci:local:full and git diff --check with unchanged checks. Review the complete diff against the three approved files. Expected: no CI, schema, authority, lifecycle or release scope expansion.
5. Return current evidence and residual gaps in the typed result. Findings records the initial cause and pending boundaries. Exact-head hosted checks, protected integration and terminal closure are required for delivery; release 0.7.8 qualification remains separate.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-28T15:05:29.537Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fe3b67317a2fee4491f170cfa36bafd2e76c1e18ed69b0bc6fa43f9d64cb47a5, input_digest=sha256:8663aef770ac0e01d75b1a8e92ba4fb2b62f95c0d27cb7fb93f7be912bdb64a6

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281151-WQ89A1 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608281151-WQ89A1-recover-evidence-rework-after-execution-base-pro/.agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json
- old_digest: 94f5b2a0be0bc765475fc39cdeab2d5f9f337399de1c086b89b8e26edd719ffe
- current_digest: 94f5b2a0be0bc765475fc39cdeab2d5f9f337399de1c086b89b8e26edd719ffe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608281151-WQ89A1

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

Observed on main 2b0760edea02ef80eecc61e82d47fa2a21c691fc after PCBY2N integration and terminal closure: 59VB06 still rejects its immutable received task-level rework result with no supervisor-observed workspace change. In-memory comparison of implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376 against both HEAD and working README changes from false to true when only execution-context source is removed. Schema 1, base ref main, base SHA 844eff36ba407436c26a3c63346b0dcc384ce2b5 and repository identity are identical. No historical artifact was changed.

Cause: task creation stores source=creation_checkout; verify-record-execute.ts persists the same execution base without that field. The existing real-Git fixture creates its task before an initial commit, so it misses this production shape. The approved task repairs only recovery comparison and the two existing test files, retaining exact identity and authority checks.

Pending at planning: reproduce the red case with the actual initialized-repository shape, implement bounded equivalence, prove guarded recovery and retry, run focused checks and unchanged full CI, obtain fresh evaluation, pass exact-head hosted checks, integrate and confirm terminal closure. Implementer evidence will be returned through the semantic result and supervisor-owned records. These planning findings do not claim implementation, verification, integration or release readiness. After delivery, retry 59VB06 and then DVS5NN through the fresh integrated runtime; preserve their original exchanges and the release/Core order.
