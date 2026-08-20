---
id: "202608202112-E6CDHP"
title: "Fix live GitLab MR transport and provider-neutral mergeability validation"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 24
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane test -- --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T21:18:00.049Z"
  updated_by: "USER"
  note: "Approved explicitly by Denis in Codex on 2026-08-21 after reviewing the live GitLab findings and remediation plan."
verification:
  state: "blocked_external"
  updated_at: "2026-08-20T22:58:44.826Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run --filter=agentplane test -- --maxWorkers=1"
  attempts: 4
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Provider writes remain operator-controlled and will be performed only after local code verification."
      - "The requested GitLab support requires a reviewable branch because it changes hosted mutation and merge routing behavior."
      - "The two defects are narrowly reproduced and can be covered by existing GitLab transport and conflict-route test seams."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
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
          - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework.ts"
          - "packages/agentplane/src/commands/pr/internal"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:f5dc97b5706d81976944fc1bed745d482896061d7df775b0d6bfa88099fe2113"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 69eb542b0b7a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 94b7f9f2d424. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bedfd34a86d3. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Extended provider-neutral conflict-route regression coverage for GitLab non-conflict gating states. GitLab mergeable, ci_still_running, not_approved, and draft_status observations now all prove the ordinary non-conflict route without local conflict analysis. Focused tests, TypeScript, formatting, and diff validation pass. Recommended action: Retain the full agentplane test suite and pass --maxWorkers=4 to Vitest, then rerun supervisor verification. Agentplane receipt: external-agent-blocker/tr_0795a8d1fffa6af0296987433dc64d66/sha256:8f4b6c4544a665556e55f8112479a88eb4cec41388c21ea431ee6ec904c2ea1c."
  -
    author: "USER"
    body: "Resolved verification resource contention: retain the full agentplane test suite and bound Vitest concurrency with --maxWorkers=4; continue the approved GitLab qualification plan."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 6013cfd0a1d6. CLI accepted one state-bound external-agent semantic result."
  -
    author: "USER"
    body: "Live GitLab canary exposed an additional provider-specific merge-path defect anticipated by the approved plan: cleanup reconciliation still performs GitHub-only provider lookup and integrate dry-run labels the hosted route as github-pr. Resume for a bounded provider-neutral repair."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Live GitLab guarded-integration qualification exposed a third provider-specific defect anticipated by the approved plan. Targeted cleanup reconciliation still observes GitHub only, so GitLab tasks report unavailable cleanup identity and state-bound integration authority cannot be granted. Integrate dry-run also hard-codes the hosted route label as github-pr. Recommended action: Approve the bounded provider-neutral scope extension, then replace GitHub-only cleanup observation with the existing change-request abstraction and make the dry-run route label provider-neutral. Requested scope: roots=packages/agentplane/src/commands/branch,packages/agentplane/src/commands/pr/integrate; repository effects=repository_write,source_code,tests; request digest=sha256:70b0582829d15378430386ccb57f65ba52c09d1391cbb78270812d1f50507943. Agentplane receipt: external-agent-blocker/tr_d8407a031f9e61846e4252a349ebf8b2/sha256:f62f8e0237e72867647e6931b38325f6b6d26f83ce0121ee04ad01fe2009d5ca/sha256:70b0582829d15378430386ccb57f65ba52c09d1391cbb78270812d1f50507943."
events:
  -
    type: "status"
    at: "2026-08-20T21:18:16.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:31:34.442Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 69eb542b0b7a. CLI accepted one state-bound external-agent semantic result."
    commit: "69eb542b0b7a12904f58c1f6b4cba9c082f46129"
  -
    type: "verify"
    at: "2026-08-20T21:32:46.976Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check could not run: pnpm --filter @agentplaneorg/agentplane test"
  -
    type: "status"
    at: "2026-08-20T21:46:30.527Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 94b7f9f2d424. CLI accepted one state-bound external-agent semantic result."
    commit: "94b7f9f2d424ac259818990a94710fef73b86e65"
  -
    type: "verify"
    at: "2026-08-20T21:57:23.176Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run --filter=agentplane test"
  -
    type: "status"
    at: "2026-08-20T21:59:24.974Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bedfd34a86d3. CLI accepted one state-bound external-agent semantic result."
    commit: "bedfd34a86d3d29976347e6c7c869d4f153befb5"
  -
    type: "verify"
    at: "2026-08-20T22:33:56.787Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run --filter=agentplane test"
  -
    type: "status"
    at: "2026-08-20T22:38:53.975Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Extended provider-neutral conflict-route regression coverage for GitLab non-conflict gating states. GitLab mergeable, ci_still_running, not_approved, and draft_status observations now all prove the ordinary non-conflict route without local conflict analysis. Focused tests, TypeScript, formatting, and diff validation pass. Recommended action: Retain the full agentplane test suite and pass --maxWorkers=4 to Vitest, then rerun supervisor verification. Agentplane receipt: external-agent-blocker/tr_0795a8d1fffa6af0296987433dc64d66/sha256:8f4b6c4544a665556e55f8112479a88eb4cec41388c21ea431ee6ec904c2ea1c."
  -
    type: "status"
    at: "2026-08-20T22:40:03.380Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resolved verification resource contention: retain the full agentplane test suite and bound Vitest concurrency with --maxWorkers=4; continue the approved GitLab qualification plan."
  -
    type: "status"
    at: "2026-08-20T22:41:31.636Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 6013cfd0a1d6. CLI accepted one state-bound external-agent semantic result."
    commit: "6013cfd0a1d6de248b8a55a0e738f3feb0b89358"
  -
    type: "verify"
    at: "2026-08-20T22:58:44.826Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run --filter=agentplane test -- --maxWorkers=1"
  -
    type: "status"
    at: "2026-08-20T23:22:11.674Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Live GitLab canary exposed an additional provider-specific merge-path defect anticipated by the approved plan: cleanup reconciliation still performs GitHub-only provider lookup and integrate dry-run labels the hosted route as github-pr. Resume for a bounded provider-neutral repair."
  -
    type: "status"
    at: "2026-08-20T23:23:05.842Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Live GitLab guarded-integration qualification exposed a third provider-specific defect anticipated by the approved plan. Targeted cleanup reconciliation still observes GitHub only, so GitLab tasks report unavailable cleanup identity and state-bound integration authority cannot be granted. Integrate dry-run also hard-codes the hosted route label as github-pr. Recommended action: Approve the bounded provider-neutral scope extension, then replace GitHub-only cleanup observation with the existing change-request abstraction and make the dry-run route label provider-neutral. Requested scope: roots=packages/agentplane/src/commands/branch,packages/agentplane/src/commands/pr/integrate; repository effects=repository_write,source_code,tests; request digest=sha256:70b0582829d15378430386ccb57f65ba52c09d1391cbb78270812d1f50507943. Agentplane receipt: external-agent-blocker/tr_d8407a031f9e61846e4252a349ebf8b2/sha256:f62f8e0237e72867647e6931b38325f6b6d26f83ce0121ee04ad01fe2009d5ca/sha256:70b0582829d15378430386ccb57f65ba52c09d1391cbb78270812d1f50507943."
doc_version: 3
doc_updated_at: "2026-08-20T23:23:05.842Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary."
sections:
  Summary: |-
    Fix live GitLab MR transport and provider-neutral mergeability validation

    Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
  Scope: |-
    - In scope: Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
    - Out of scope: unrelated refactors not required for "Fix live GitLab MR transport and provider-neutral mergeability validation".
  Plan: "1. Make glab JSON-body mutations send Content-Type: application/json while retaining explicit --hostname. 2. Add provider-aware mergeability coherence so GitLab mergeable/non-conflicting observations are accepted without weakening GitHub validation. 3. Add focused transport, normalization, and routing regression tests. 4. Run focused tests and the package regression suite. 5. After local verification returns control to the operator, repeat MR readback/check/guarded-merge against the already-authorized private GitLab canary and record exact provider evidence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix live GitLab MR transport and provider-neutral mergeability validation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix live GitLab MR transport and provider-neutral mergeability validation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-20T21:32:46.976Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check could not run: pnpm --filter @agentplaneorg/agentplane test
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:724d2c89195564727b67f0e61eeaeafbbc4c4ec555feff38e6ac7a018f6f5085

    Details:

    Command: pnpm --filter @agentplaneorg/agentplane test
    Result: fail
    Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608202112-E6CDHP declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
    - old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T21:57:23.176Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run --filter=agentplane test
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:179416083480576715af982d232e48512e185c34155bb1be605bedf3d58545ae

    Details:

    Command: bun run --filter=agentplane test
    Result: fail
    Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608202112-E6CDHP declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
    - old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T22:33:56.787Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run --filter=agentplane test
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:03a827dc25608c1d1b7a95a6cc4b3628fbc95bff6df1b261896e25f830894b33

    Details:

    Command: bun run --filter=agentplane test
    Result: fail
    Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608202112-E6CDHP declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
    - old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T22:58:44.826Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run --filter=agentplane test -- --maxWorkers=1
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:42c1b7410a7b37b4deaed191497cb172145172e30ed91c94b4677c177e497ac3

    Details:

    Command: bun run --filter=agentplane test -- --maxWorkers=1
    Result: fail
    Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608202112-E6CDHP declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
    - old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
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
    blocker_state_fingerprint: "sha256:f62f8e0237e72867647e6931b38325f6b6d26f83ce0121ee04ad01fe2009d5ca"
    kind: "task_scope_extension_request"
    request:
      rationale: "The authorized live canary proved that guarded GitLab integration reaches cleanup reconciliation, which still uses GitHub-only provider lookup; these files are outside the original two-defect writable roots."
      repository_effects:
        - "repository_write"
        - "source_code"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/branch"
        - "packages/agentplane/src/commands/pr/integrate"
    request_digest: "sha256:70b0582829d15378430386ccb57f65ba52c09d1391cbb78270812d1f50507943"
    schema_version: 1
    status: "pending"
    transition_id: "tr_d8407a031f9e61846e4252a349ebf8b2"
  implementation_commit:
    hash: "6013cfd0a1d6de248b8a55a0e738f3feb0b89358"
  workflow_route_baseline:
    start_head_sha: "60be0145753e9e2aecf31f4bbd8471895db13395"
    version: 1
id_source: "generated"
---
## Summary

Fix live GitLab MR transport and provider-neutral mergeability validation

Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.

## Scope

- In scope: Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
- Out of scope: unrelated refactors not required for "Fix live GitLab MR transport and provider-neutral mergeability validation".

## Plan

1. Make glab JSON-body mutations send Content-Type: application/json while retaining explicit --hostname. 2. Add provider-aware mergeability coherence so GitLab mergeable/non-conflicting observations are accepted without weakening GitHub validation. 3. Add focused transport, normalization, and routing regression tests. 4. Run focused tests and the package regression suite. 5. After local verification returns control to the operator, repeat MR readback/check/guarded-merge against the already-authorized private GitLab canary and record exact provider evidence.

## Verify Steps

PLANNER fallback scaffold for "Fix live GitLab MR transport and provider-neutral mergeability validation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix live GitLab MR transport and provider-neutral mergeability validation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-20T21:32:46.976Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check could not run: pnpm --filter @agentplaneorg/agentplane test
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:724d2c89195564727b67f0e61eeaeafbbc4c4ec555feff38e6ac7a018f6f5085

Details:

Command: pnpm --filter @agentplaneorg/agentplane test
Result: fail
Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608202112-E6CDHP declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
- old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T21:57:23.176Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run --filter=agentplane test
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:179416083480576715af982d232e48512e185c34155bb1be605bedf3d58545ae

Details:

Command: bun run --filter=agentplane test
Result: fail
Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608202112-E6CDHP declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
- old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T22:33:56.787Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run --filter=agentplane test
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:03a827dc25608c1d1b7a95a6cc4b3628fbc95bff6df1b261896e25f830894b33

Details:

Command: bun run --filter=agentplane test
Result: fail
Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608202112-E6CDHP declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
- old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T22:58:44.826Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run --filter=agentplane test -- --maxWorkers=1
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8eecc6a8269b550473fcd07004d0715ecdd3c25edd9b934120e147076bff5c7c, input_digest=sha256:42c1b7410a7b37b4deaed191497cb172145172e30ed91c94b4677c177e497ac3

Details:

Command: bun run --filter=agentplane test -- --maxWorkers=1
Result: fail
Evidence: .agentplane/tasks/202608202112-E6CDHP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608202112-E6CDHP declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202112-E6CDHP-fix-live-gitlab-mr-transport-and-provider-neutra/.agentplane/tasks/202608202112-E6CDHP/blueprint/resolved-snapshot.json
- old_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- current_digest: e210c95b93855d3926f8366484e5e044283f60b039228bebfd8ef9ccd144705c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202112-E6CDHP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608202112-E6CDHP
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
