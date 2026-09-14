---
id: "202609140050-8QDRVN"
title: "Recover an external-agent result rejected during supervisor application"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 28
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "backend"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T01:09:55.252Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:5cef21c13132d53023ecd9bb7d12dabe1d15ed95a025f8ddb16e7f648d779251"
verification:
  state: "pending"
  updated_at: "2026-09-14T01:32:12.108Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 2
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
      - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The corrected plan retains the original WorkItem identity."
      - "The source implementation is already committed by AgentPlane."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts; repository_effects=repository_write,tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts; repository_effects=repository_write,source_code"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
      - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
          - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
      digest: "sha256:c2b07d87302e46460a3e7a398ae030a0374bd0dab9fb8d24bbf6afa092fcb5a2"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b4792b0bfad0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b4792b0bfad0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The full regression requires a new focused recovery module to satisfy the 600-line hotspot limit. Recommended action: Approve the single new source path and move rejected-result application orchestration into it. Requested scope: roots=packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts; repository effects=repository_write,source_code; request digest=sha256:b8771c7f197270cda0a1858ec1a92226eb7df21754e64541fdfcd90e6d7174bc. Agentplane receipt: external-agent-blocker/tr_f54760a204f63fe7afccddcd01a7afbb/sha256:61de061074e6f8662ae521bf4162a802199bbfe8a7d1cd12afff51da81fdc135/sha256:b8771c7f197270cda0a1858ec1a92226eb7df21754e64541fdfcd90e6d7174bc."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts; repository effects: repository_write, source_code."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7bd4004c11a8. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The remaining oversized-test gate requires one dedicated testkit module. Recommended action: Approve one new testkit path and move only the new scenario setup and assertions into it. Requested scope: roots=packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts; repository effects=repository_write,tests; request digest=sha256:d528e833e5ce8ad8a80110c79cdeae8ac5883dd1d5a4cfbb7f24b3c6344964c7. Agentplane receipt: external-agent-blocker/tr_995d06a66acddde96490bbe069b9c7ce/sha256:41a416d380e01ac9399820a83c3dab2621ae8bcbae9371e6cd20d4802dc2d844/sha256:d528e833e5ce8ad8a80110c79cdeae8ac5883dd1d5a4cfbb7f24b3c6344964c7."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts; repository effects: repository_write, tests."
events:
  -
    type: "status"
    at: "2026-09-14T00:54:28.801Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-14T01:04:15.499Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b4792b0bfad0. CLI accepted one state-bound external-agent semantic result."
    commit: "b4792b0bfad088dedeca07904a813fe2b7c53f9d"
  -
    type: "status"
    at: "2026-09-14T01:10:31.333Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b4792b0bfad0. CLI accepted one state-bound external-agent semantic result."
    commit: "b4792b0bfad088dedeca07904a813fe2b7c53f9d"
  -
    type: "verify"
    at: "2026-09-14T01:18:24.089Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-14T01:20:12.364Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The full regression requires a new focused recovery module to satisfy the 600-line hotspot limit. Recommended action: Approve the single new source path and move rejected-result application orchestration into it. Requested scope: roots=packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts; repository effects=repository_write,source_code; request digest=sha256:b8771c7f197270cda0a1858ec1a92226eb7df21754e64541fdfcd90e6d7174bc. Agentplane receipt: external-agent-blocker/tr_f54760a204f63fe7afccddcd01a7afbb/sha256:61de061074e6f8662ae521bf4162a802199bbfe8a7d1cd12afff51da81fdc135/sha256:b8771c7f197270cda0a1858ec1a92226eb7df21754e64541fdfcd90e6d7174bc."
  -
    type: "status"
    at: "2026-09-14T01:24:06.290Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7bd4004c11a8. CLI accepted one state-bound external-agent semantic result."
    commit: "7bd4004c11a8fb70fb4c8708a94557a41e301a65"
  -
    type: "verify"
    at: "2026-09-14T01:31:12.134Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-14T01:31:48.472Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The remaining oversized-test gate requires one dedicated testkit module. Recommended action: Approve one new testkit path and move only the new scenario setup and assertions into it. Requested scope: roots=packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts; repository effects=repository_write,tests; request digest=sha256:d528e833e5ce8ad8a80110c79cdeae8ac5883dd1d5a4cfbb7f24b3c6344964c7. Agentplane receipt: external-agent-blocker/tr_995d06a66acddde96490bbe069b9c7ce/sha256:41a416d380e01ac9399820a83c3dab2621ae8bcbae9371e6cd20d4802dc2d844/sha256:d528e833e5ce8ad8a80110c79cdeae8ac5883dd1d5a4cfbb7f24b3c6344964c7."
doc_version: 3
doc_updated_at: "2026-09-14T01:31:48.472Z"
doc_updated_by: "SUPERVISOR"
description: "When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect."
sections:
  Summary: |-
    Recover an external-agent result rejected during supervisor application

    When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
  Scope: |-
    - In scope: When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
    - Out of scope: unrelated refactors not required for "Recover an external-agent result rejected during supervisor application".
  Plan: "Preserve the original WorkItem identity and correct its test launcher."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts`. Expected: all focused recovery tests pass, including the Git-history rejection regression.
    2. Confirm the rejected exchange is retired, the owning journal operation is failed, and a plain advance requires the existing exact-key `--replacement` route.
    3. Confirm existing accepted-result replay and effect-in-doubt recovery cases still pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-14T01:18:24.089Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:05eab6b62620509c625d909f09ebfb96b67576ef0e857e4aff2df272b855d255, input_digest=sha256:16f08d4e2b301d98fd7c05b2eac3614512ae9a27b0d0a3cc838c23649f8fbd31

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609140050-8QDRVN declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609140050-8QDRVN declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609140050-8QDRVN-recover-an-external-agent-result-rejected-during/.agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json
    - old_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
    - current_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609140050-8QDRVN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609140050-8QDRVN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-14T01:31:12.134Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:05eab6b62620509c625d909f09ebfb96b67576ef0e857e4aff2df272b855d255, input_digest=sha256:cc659a7ace86ebec50e6c59310274fa3b05d7ed8d49698dd25c180d62142e258

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609140050-8QDRVN declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609140050-8QDRVN declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609140050-8QDRVN-recover-an-external-agent-result-rejected-during/.agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json
    - old_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
    - current_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609140050-8QDRVN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609140050-8QDRVN
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
  agentplane.scope_extension_request:
    applied_at: "2026-09-14T01:32:12.108Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:41a416d380e01ac9399820a83c3dab2621ae8bcbae9371e6cd20d4802dc2d844"
    kind: "task_scope_extension_request"
    request:
      rationale: "Move the new rejected-result integration scenario into a dedicated testkit module so the existing test file returns below the oversized-test threshold without weakening coverage."
      repository_effects:
        - "repository_write"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
    request_digest: "sha256:d528e833e5ce8ad8a80110c79cdeae8ac5883dd1d5a4cfbb7f24b3c6344964c7"
    schema_version: 1
    status: "applied"
    transition_id: "tr_995d06a66acddde96490bbe069b9c7ce"
    work_item_id: null
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T01:09:55.252Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T01:09:30.988Z"
      digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
      proposal:
        assumptions:
          - "The supervisor-owned commits b4792b0bf and d8d3fc8c0 remain the implementation evidence for WorkItem recover-rejected-result."
        planning_baseline:
          captured_at: "2026-09-14T01:08:51.137Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:09b9c9bed169c48ecd78eb7458ff651cb306b10f63d012c508d3583fc434b184"
          dirty_paths:
            - ".agentplane/tasks/202609140050-8QDRVN/README.md"
            - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
          git:
            kind: "commit"
            ref: null
            sha: "d8d3fc8c010c824ca3d2d1d01386ef72e3f3d651"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:13"
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              id: "focused-recovery-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "focused-recovery-tests"
              description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
              id: "rejected-result-recovery"
              required: true
            -
              check_ids:
                - "focused-recovery-tests"
              description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
              id: "recovery-invariants"
              required: true
          evidence_fingerprint: "sha256:09b9c9bed169c48ecd78eb7458ff651cb306b10f63d012c508d3583fc434b184"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-recovery-tests"
                  description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                  id: "rejected-result-recovery"
                  required: true
                -
                  check_ids:
                    - "focused-recovery-tests"
                  description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                  id: "recovery-invariants"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                symbol_hints:
                  - "failRejectedExternalAgentResult"
                  - "acceptExternalAgentResult"
              depends_on: []
              expected_outputs:
                - "Verified rejected-result recovery implementation"
                - "Passing focused regression evidence"
              id: "recover-rejected-result"
              objective: "Qualify the already committed rejected-result recovery against the focused supervisor regression suite."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "read"
                  resource: "."
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                    id: "focused-recovery-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                    id: "rejected-result-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                    id: "recovery-invariants"
                    required: true
                evidence_fingerprint: "sha256:09b9c9bed169c48ecd78eb7458ff651cb306b10f63d012c508d3583fc434b184"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609140050-8QDRVN"
    event_cursor: 22
    final_validation: null
    id: "202609140050-8QDRVN"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-14T00:50:59.467Z"
      constraints: []
      request: |-
        Recover an external-agent result rejected during supervisor application

        When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
      task_id: "202609140050-8QDRVN"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-14T00:52:42.874Z"
        digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
        proposal:
          assumptions:
            - "Deterministic application validation errors are safe to classify as a failed semantic operation because the application code validates the external workspace effect before persisting semantic lifecycle state."
          planning_baseline:
            captured_at: "2026-09-14T00:51:04.225Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - ".agentplane/tasks/202609130319-MHRRRF/README.md"
              - ".agentplane/tasks/202609130319-X96Z3Q/README.md"
              - ".agentplane/tasks/202609130320-EFMSMR/README.md"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130320-EFMSMR/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130352-Q99M4K/README.md"
              - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130402-QWV6VX/README.md"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130402-QWV6VX/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130414-G8VK36/README.md"
              - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130420-X9CKTH/README.md"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130420-X9CKTH/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130428-9GY63X/README.md"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130428-9GY63X/supervision/declared-checks.json"
              - ".agentplane/tasks/202609140050-8QDRVN/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/LC-24.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
              - "packages/agentplane/src/adapters/task-backend/kernel-plan-rejection-recovery.ts"
              - "packages/agentplane/src/cli/run-cli.roadmap-plan-recovery.test.ts"
            git:
              kind: "commit"
              ref: null
              sha: "9792878934b2c4d068e98056cef3c2c691451a90"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                id: "focused-recovery-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
            criteria:
              -
                check_ids:
                  - "focused-recovery-tests"
                description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                id: "rejected-result-recovery"
                required: true
              -
                check_ids:
                  - "focused-recovery-tests"
                description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                id: "recovery-invariants"
                required: true
            evidence_fingerprint: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                    id: "rejected-result-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                    id: "recovery-invariants"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 262144
                  optional_sources:
                    - "packages/core/src/schemas/supervisor-execution-episode.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                    - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                    - "packages/agentplane/src/commands/task/external-agent-result-application.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  symbol_hints:
                    - "acceptExternalAgentResult"
                    - "recoverPendingExternalAgentResult"
                    - "completeSupervisorExecutionEpisode"
                depends_on: []
                expected_outputs:
                  - "Rejected-result recovery implementation"
                  - "Focused regression test"
                id: "recover-rejected-result"
                objective: "Add a fail-closed recovery transition for a durable external-agent result that deterministic supervisor application rejects, and cover the Git-history rejection case."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                      id: "focused-recovery-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery-tests"
                      description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                      id: "rejected-result-recovery"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery-tests"
                      description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                      id: "recovery-invariants"
                      required: true
                  evidence_fingerprint: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-14T01:06:41.600Z"
        digest: "sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
        proposal:
          assumptions:
            - "The supervisor-owned commits b4792b0bf and d8d3fc8c0 remain the implementation evidence for this task."
          planning_baseline:
            captured_at: "2026-09-14T01:05:55.511Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:41542ee6f664fc13ff0e9b501715146f118c3f3baee0cc55bb05105c3c5e5f72"
            dirty_paths:
              - ".agentplane/tasks/202609140050-8QDRVN/README.md"
              - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "d8d3fc8c010c824ca3d2d1d01386ef72e3f3d651"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:9"
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                id: "focused-recovery-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
            criteria:
              -
                check_ids:
                  - "focused-recovery-tests"
                description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                id: "rejected-result-recovery"
                required: true
              -
                check_ids:
                  - "focused-recovery-tests"
                description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                id: "recovery-invariants"
                required: true
            evidence_fingerprint: "sha256:41542ee6f664fc13ff0e9b501715146f118c3f3baee0cc55bb05105c3c5e5f72"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                    id: "rejected-result-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                    id: "recovery-invariants"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 262144
                  optional_sources:
                    - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                    - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  symbol_hints:
                    - "failRejectedExternalAgentResult"
                    - "acceptExternalAgentResult"
                depends_on: []
                expected_outputs:
                  - "Verified rejected-result recovery implementation"
                  - "Passing focused regression evidence"
                id: "qualify-rejected-result-recovery"
                objective: "Qualify the already committed rejected-result recovery against the focused supervisor regression suite."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "read"
                    resource: "."
                risk: "low"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                      id: "focused-recovery-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery-tests"
                      description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                      id: "rejected-result-recovery"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery-tests"
                      description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                      id: "recovery-invariants"
                      required: true
                  evidence_fingerprint: "sha256:41542ee6f664fc13ff0e9b501715146f118c3f3baee0cc55bb05105c3c5e5f72"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609140050-8QDRVN"
    revision: 28
    schema_version: 1
    updated_at: "2026-09-14T01:31:48.472Z"
    work_items:
      recover-rejected-result:
        attempt: 1
        claim_id: null
        id: "recover-rejected-result"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:647403c2e4cff19511e2f3373026816ab616549334817ab1880da7c79b71ff40"
            id: "Verified rejected-result recovery implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609140050-8QDRVN"
              work_item_id: "recover-rejected-result"
            provenance:
              - "sha256:2b16226c267922481f3fbdc258d9baea8ef9913e1c78916149211c742291b51a"
              - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:6d42f89f47c60c87e8420f9136b0b931890cfb7366973d8240b03f9cf9e8bdc6"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:2f9e62dd32be81a8150882328b2f41f1f5754d2ba6058752dc8c3b3367efd41a"
            id: "Passing focused regression evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609140050-8QDRVN"
              work_item_id: "recover-rejected-result"
            provenance:
              - "sha256:2b16226c267922481f3fbdc258d9baea8ef9913e1c78916149211c742291b51a"
              - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:6d42f89f47c60c87e8420f9136b0b931890cfb7366973d8240b03f9cf9e8bdc6"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
              check_id: "focused-recovery-tests"
              command_identity: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts."
              exit_code: 0
              observed_at: "2026-09-14T01:11:08.406Z"
              repository_snapshot_digest: "sha256:6d42f89f47c60c87e8420f9136b0b931890cfb7366973d8240b03f9cf9e8bdc6"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-14T01:04:18.799Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:72fc98362ef27e2a4050fdac6ad20440acbb29cba42d7609d15aa208134085ab"
        entity: "work_item"
        id: "event_5d0456ab6086d3665b3fbc82"
        mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-f29e1020e62e6a9d053f5bda"
        plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        task_revision: 7
        work_item_id: "recover-rejected-result"
      -
        at: "2026-09-14T01:05:42.784Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "USER"
        cause_refs:
          - "plan:sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          - "note:sha256:d351e52d0fd228d5efbc6e991c84256f2f58b06d0ee2d110a8117a0363a76862"
        entity: "task"
        id: "event_5346b065afb045b47a5be19d"
        mutation_id: "plan-reject-a7c0a09428b1b0599c2fea0c49ff8ab4"
        plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        task_revision: 8
        work_item_id: null
      -
        at: "2026-09-14T01:08:49.921Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "USER"
        cause_refs:
          - "plan:sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
          - "note:sha256:c5a88c3d5ae6eb8ed2c16250c8fc3ab2c01662690aa3db8a0274baa9520ed454"
        entity: "task"
        id: "event_4fb2610a50b9ed2082eff288"
        mutation_id: "plan-reject-93f90f50aab9ab6c575b9c9bbc6309ac"
        plan_digest: "sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        task_revision: 12
        work_item_id: null
      -
        at: "2026-09-14T01:11:08.412Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:07b27092b0cadfd30add6392b7c14a521b131639f385c1011b7a2106727c63c6"
        entity: "work_item"
        id: "event_b37b0389963df4198411dc8d"
        mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-826f37c8dfbaaec344100a2a"
        plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        task_revision: 17
        work_item_id: "recover-rejected-result"
    leases: []
    mutation_receipts:
      compatibility:sha256:0c652b61b54202ca8639d43f4f0f58f5393f9acffcf4f1d2e6cc443fa413ae0e:
        aggregate_digest: "sha256:279ac954f8c7724ba0c244fe2b4825436a544fff0f4ee2a81b1522d1748f056b"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:09:30.995Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_73a8592b335e4dae7850735a"
          mutation_id: "compatibility:sha256:0c652b61b54202ca8639d43f4f0f58f5393f9acffcf4f1d2e6cc443fa413ae0e"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0c652b61b54202ca8639d43f4f0f58f5393f9acffcf4f1d2e6cc443fa413ae0e"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34:
        aggregate_digest: "sha256:838e1419190cf1de63ac695fd62c49ba31f769bcba122c8149607cb10302ac88"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:00.218Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9b83fba375816b0a58084f30"
          mutation_id: "compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:247892e7a0a394861ff159c177da64c061a7337221d4797f04ce892d0b083c1c:
        aggregate_digest: "sha256:e9266c57a81f5de8064a4eb4a0b1a8eeb8622ff9f3907acf9d0c80bbc8fc70ee"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:31:13.650Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e88a009193656266a508b8c4"
          mutation_id: "compatibility:sha256:247892e7a0a394861ff159c177da64c061a7337221d4797f04ce892d0b083c1c"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:247892e7a0a394861ff159c177da64c061a7337221d4797f04ce892d0b083c1c"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:599b6906cbddeb46496d98314010a6694974446802a3c16decf3aff7ff8bd2b2:
        aggregate_digest: "sha256:2294e6f6f06a3271aa3660c123213b37d8029556e897fd3cd2ebb71ea83a0bd3"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:31:48.472Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_9bbf0d74d1f10137b95ffe4a"
          mutation_id: "compatibility:sha256:599b6906cbddeb46496d98314010a6694974446802a3c16decf3aff7ff8bd2b2"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 26
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:599b6906cbddeb46496d98314010a6694974446802a3c16decf3aff7ff8bd2b2"
        next_revision: 27
        previous_revision: 26
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:6704b4de875cb03bc0deff335b1f96dd6147c7a05905dc68b3c281b7c6c02d36:
        aggregate_digest: "sha256:3cde1784554dea05ca4d27134a5640ec941171296b3ca077b0b3f44953ac8066"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:04:15.499Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d9e5a49e16a47e0ee12ecb40"
          mutation_id: "compatibility:sha256:6704b4de875cb03bc0deff335b1f96dd6147c7a05905dc68b3c281b7c6c02d36"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6704b4de875cb03bc0deff335b1f96dd6147c7a05905dc68b3c281b7c6c02d36"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782:
        aggregate_digest: "sha256:bc2589877f9a86a792ce145cc9877d78fce10df4c33cac54af74d905f4140c8b"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:00.219Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e92153b945f01263c73fbe71"
          mutation_id: "compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:8c2b4153bfb5d20efc58d726ccaf7aadf696b2f7a77fbef0b9ed9c105c5bb074:
        aggregate_digest: "sha256:004543dfa8a3f03419879af766ac6749eec54123b8b140285dd80786ddfd7cca"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:20:12.364Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_d5b931334629c37e4850713c"
          mutation_id: "compatibility:sha256:8c2b4153bfb5d20efc58d726ccaf7aadf696b2f7a77fbef0b9ed9c105c5bb074"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8c2b4153bfb5d20efc58d726ccaf7aadf696b2f7a77fbef0b9ed9c105c5bb074"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:b00af1438c7a84bab56d23c67abddfc700a552d44e334d1b155385d4a87a1046:
        aggregate_digest: "sha256:5fe7060b8fe523c7976e9d0d6da73440523f1c0278f471ef10ab1156ee1135da"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:24:06.290Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_04171d4e45419602c22c44c7"
          mutation_id: "compatibility:sha256:b00af1438c7a84bab56d23c67abddfc700a552d44e334d1b155385d4a87a1046"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 23
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b00af1438c7a84bab56d23c67abddfc700a552d44e334d1b155385d4a87a1046"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168:
        aggregate_digest: "sha256:2749e05bd99c5add0ba126a66d4d798eaf13256d77e8c207cd8c459703601f28"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:28.801Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e89184e95a3e003f669ca765"
          mutation_id: "compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:b4ae132658e8b75a2b63423d85bc2653844c7e4567d0d053be89606d065fd69e:
        aggregate_digest: "sha256:be8b675c9f14bccb6262f402088304d3a7e537a34b4e76500bccf5965ede3253"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:18:25.138Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_64d1d35757b57daf19b3923d"
          mutation_id: "compatibility:sha256:b4ae132658e8b75a2b63423d85bc2653844c7e4567d0d053be89606d065fd69e"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b4ae132658e8b75a2b63423d85bc2653844c7e4567d0d053be89606d065fd69e"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:c357b5b194d48d6adb135134e8695bd7f85b44b3b7698999dfc0d9d60f77fdf9:
        aggregate_digest: "sha256:5565a5a9c5c53c1eaa2ce73d949431d6a4978b4ea5e850c043dfde2179baeff0"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:06:53.270Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_ea83a36887f079c5e664c0db"
          mutation_id: "compatibility:sha256:c357b5b194d48d6adb135134e8695bd7f85b44b3b7698999dfc0d9d60f77fdf9"
          plan_digest: "sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 10
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:c357b5b194d48d6adb135134e8695bd7f85b44b3b7698999dfc0d9d60f77fdf9"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:d4bd3919827aa2fb884c512e3e35d67f01999a4a375c6132c83bb7dd71bd4cb7:
        aggregate_digest: "sha256:3d2426ff4a36622d2553b5e2d5d9419b62261dc54355047465ca7de80682c284"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:10:31.333Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d753bf8a688a5d3573996fac"
          mutation_id: "compatibility:sha256:d4bd3919827aa2fb884c512e3e35d67f01999a4a375c6132c83bb7dd71bd4cb7"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 15
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d4bd3919827aa2fb884c512e3e35d67f01999a4a375c6132c83bb7dd71bd4cb7"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:d52ba2a679a154e5e7a66d48f969bb9123d570f83b0c2a72f6d1373d3525b459:
        aggregate_digest: "sha256:e8a7ca7e51aa3fc0cf6d9fc4004d10141b1f94d2890a221cbcd0908bdc3126fb"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:04:15.499Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d18c3c23bcd5261354ba4cde"
          mutation_id: "compatibility:sha256:d52ba2a679a154e5e7a66d48f969bb9123d570f83b0c2a72f6d1373d3525b459"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d52ba2a679a154e5e7a66d48f969bb9123d570f83b0c2a72f6d1373d3525b459"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:d78ceb2e84cf111e3897ee2b86ff9dccdcdc7507b0ba7543458d8afe19eb2d4f:
        aggregate_digest: "sha256:7c5ec8d3adc5c5a4a41d400a7bd91323439c35e42b878572be7f8f607918aa97"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:20:12.364Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_842f1b71c9e8a45dcfb15657"
          mutation_id: "compatibility:sha256:d78ceb2e84cf111e3897ee2b86ff9dccdcdc7507b0ba7543458d8afe19eb2d4f"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 19
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:d78ceb2e84cf111e3897ee2b86ff9dccdcdc7507b0ba7543458d8afe19eb2d4f"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:dc43596d8cc2b290396c91f063914998907fe93d1e1b194cfd8e34d42d8d9b88:
        aggregate_digest: "sha256:f13a498ba4aed0ab723b28ef46185e61463cc184d4fa12ea9a51d46e5fcec2b9"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:06:53.272Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c0194ddc3c138bf386e9fa1f"
          mutation_id: "compatibility:sha256:dc43596d8cc2b290396c91f063914998907fe93d1e1b194cfd8e34d42d8d9b88"
          plan_digest: "sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dc43596d8cc2b290396c91f063914998907fe93d1e1b194cfd8e34d42d8d9b88"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:e1bf3038eb7e40566636d26a8f70e78bcb22abdbe872fad67c9a0c5fa685758b:
        aggregate_digest: "sha256:db70b47de0da831cc710664050ad04bf2017f6198616816164c50fff0256d516"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:10:31.333Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_403acd0de1a840542fd0051d"
          mutation_id: "compatibility:sha256:e1bf3038eb7e40566636d26a8f70e78bcb22abdbe872fad67c9a0c5fa685758b"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e1bf3038eb7e40566636d26a8f70e78bcb22abdbe872fad67c9a0c5fa685758b"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:e8a6ca302a314f2d510cd7ec6a5d46d0612c4ee0dece289125893d07bf2812f7:
        aggregate_digest: "sha256:2d6c937c1a5711ada3b517782a962d928bb4bbde780b4434bbf5eaadc25f65e7"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:31:48.472Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_5e1ddcaeaeb7fc09340868dc"
          mutation_id: "compatibility:sha256:e8a6ca302a314f2d510cd7ec6a5d46d0612c4ee0dece289125893d07bf2812f7"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e8a6ca302a314f2d510cd7ec6a5d46d0612c4ee0dece289125893d07bf2812f7"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:ed6903a42c3fa469f32b276f305e66087e7f1b39df29ed928be229ba943d3b4a:
        aggregate_digest: "sha256:c185b02643bb5717ee6be7bdde19d89ef4d47a9502d089b362b1f3901a6739c0"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:24:06.290Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ca6822ca20221d8ea96f9eff"
          mutation_id: "compatibility:sha256:ed6903a42c3fa469f32b276f305e66087e7f1b39df29ed928be229ba943d3b4a"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 22
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ed6903a42c3fa469f32b276f305e66087e7f1b39df29ed928be229ba943d3b4a"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:f13bd6c59f913407e0da7b822de879333a141f4e3bc0517c29f2245dc3037582:
        aggregate_digest: "sha256:ed609f6d71d46c09e8f1b02c7b49608b9a8eb0d850940560180b98b87c5ac21f"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:31:48.472Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bdb423eb82387423ffd739bb"
          mutation_id: "compatibility:sha256:f13bd6c59f913407e0da7b822de879333a141f4e3bc0517c29f2245dc3037582"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 25
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f13bd6c59f913407e0da7b822de879333a141f4e3bc0517c29f2245dc3037582"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:f17f78e586addd2fdaaf424857cf2b85bcf23dbe81ec6577ae9c1a64b745409e:
        aggregate_digest: "sha256:473d68b75d6d7c0c2c420cffade7effd29b9e40a4671e025ee930d103e9e8566"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:20:12.364Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_00afc8e6171155241b15a597"
          mutation_id: "compatibility:sha256:f17f78e586addd2fdaaf424857cf2b85bcf23dbe81ec6577ae9c1a64b745409e"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 20
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f17f78e586addd2fdaaf424857cf2b85bcf23dbe81ec6577ae9c1a64b745409e"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      external-result:work-order-202609140050-8QDRVN-executor-826f37c8dfbaaec344100a2a:
        aggregate_digest: "sha256:4f69a92b9b681fc35d06ae7810d91835f089133e38050bed890de5d2efbcacd6"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:11:08.412Z"
          cause_refs:
            - "semantic-result:sha256:07b27092b0cadfd30add6392b7c14a521b131639f385c1011b7a2106727c63c6"
          entity: "work_item"
          from: "READY"
          id: "event_b37b0389963df4198411dc8d"
          mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-826f37c8dfbaaec344100a2a"
          plan_digest: "sha256:964641b14ee083eb612f6346f18943a5d0d25890074dadc3df62c6285d4e04cb"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 17
          to: "COMPLETED"
          work_item_id: "recover-rejected-result"
        mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-826f37c8dfbaaec344100a2a"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      external-result:work-order-202609140050-8QDRVN-executor-f29e1020e62e6a9d053f5bda:
        aggregate_digest: "sha256:27b2efb37670b391dc65867a745ce4efc97b844a7ae82cda247e1ac1d384a4df"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T01:04:18.799Z"
          cause_refs:
            - "semantic-result:sha256:72fc98362ef27e2a4050fdac6ad20440acbb29cba42d7609d15aa208134085ab"
          entity: "work_item"
          from: "READY"
          id: "event_5d0456ab6086d3665b3fbc82"
          mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-f29e1020e62e6a9d053f5bda"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 7
          to: "REWORK_READY"
          work_item_id: "recover-rejected-result"
        mutation_id: "external-result:work-order-202609140050-8QDRVN-executor-f29e1020e62e6a9d053f5bda"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      plan-reject-93f90f50aab9ab6c575b9c9bbc6309ac:
        aggregate_digest: "sha256:a059982128632d5f82ce3210c2bed8c51444850241be726d23eabe6635ddeefd"
        event:
          actor_id: "USER"
          at: "2026-09-14T01:08:49.921Z"
          cause_refs:
            - "plan:sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
            - "note:sha256:c5a88c3d5ae6eb8ed2c16250c8fc3ab2c01662690aa3db8a0274baa9520ed454"
          entity: "task"
          from: "ACTIVE"
          id: "event_4fb2610a50b9ed2082eff288"
          mutation_id: "plan-reject-93f90f50aab9ab6c575b9c9bbc6309ac"
          plan_digest: "sha256:523bdf17232b0c842555c2ca04bc6ca7ee747ec0913879595a3108ea1c5b0679"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 12
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-93f90f50aab9ab6c575b9c9bbc6309ac"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      plan-reject-a7c0a09428b1b0599c2fea0c49ff8ab4:
        aggregate_digest: "sha256:e10e851c8f0de457d9550873d42a6fa0688ee4fdea8a2124d0588f5a42808427"
        event:
          actor_id: "USER"
          at: "2026-09-14T01:05:42.784Z"
          cause_refs:
            - "plan:sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
            - "note:sha256:d351e52d0fd228d5efbc6e991c84256f2f58b06d0ee2d110a8117a0363a76862"
          entity: "task"
          from: "ACTIVE"
          id: "event_5346b065afb045b47a5be19d"
          mutation_id: "plan-reject-a7c0a09428b1b0599c2fea0c49ff8ab4"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 8
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-a7c0a09428b1b0599c2fea0c49ff8ab4"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609140050-8QDRVN"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "9792878934b2c4d068e98056cef3c2c691451a90"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "9792878934b2c4d068e98056cef3c2c691451a90"
    version: 1
id_source: "generated"
---
## Summary

Recover an external-agent result rejected during supervisor application

When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.

## Scope

- In scope: When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
- Out of scope: unrelated refactors not required for "Recover an external-agent result rejected during supervisor application".

## Plan

Preserve the original WorkItem identity and correct its test launcher.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts`. Expected: all focused recovery tests pass, including the Git-history rejection regression.
2. Confirm the rejected exchange is retired, the owning journal operation is failed, and a plain advance requires the existing exact-key `--replacement` route.
3. Confirm existing accepted-result replay and effect-in-doubt recovery cases still pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-14T01:18:24.089Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:05eab6b62620509c625d909f09ebfb96b67576ef0e857e4aff2df272b855d255, input_digest=sha256:16f08d4e2b301d98fd7c05b2eac3614512ae9a27b0d0a3cc838c23649f8fbd31

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609140050-8QDRVN declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609140050-8QDRVN declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609140050-8QDRVN-recover-an-external-agent-result-rejected-during/.agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json
- old_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
- current_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609140050-8QDRVN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609140050-8QDRVN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-14T01:31:12.134Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:05eab6b62620509c625d909f09ebfb96b67576ef0e857e4aff2df272b855d255, input_digest=sha256:cc659a7ace86ebec50e6c59310274fa3b05d7ed8d49698dd25c180d62142e258

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609140050-8QDRVN declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609140050-8QDRVN declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609140050-8QDRVN-recover-an-external-agent-result-rejected-during/.agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json
- old_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
- current_digest: 2b3bd560197c44675a24a60b7d3717014353b005bd56806b8fb6f1bc6db0d880
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609140050-8QDRVN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609140050-8QDRVN
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
