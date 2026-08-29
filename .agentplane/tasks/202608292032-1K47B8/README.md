---
id: "202608292032-1K47B8"
title: "Implement the isolated canonical Task kernel"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202608291005-K5TG4D"
tags:
  - "clean-core-rebuild"
  - "kernel"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T20:33:19.037Z"
  updated_by: "USER"
  note: "Standing user approval applies to this corrected execution intent and exact plan digest."
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
    - "effect_public_api"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "depcruise.config.cjs"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-centric"
      - "packages/core/src/tasks/task-kernel"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch isolation and hosted integration are required by repository policy."
      - "The approved M1 plan adds an internal kernel, its tests, and a namespaced core tasks export."
    repository_effects:
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "depcruise.config.cjs"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-centric"
      - "packages/core/src/tasks/task-kernel"
  observed:
    authority_violations: []
    changed_components:
      - "packages/core"
    changed_paths:
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/invariants.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/model.test.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
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
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
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
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
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
          - "depcruise.config.cjs"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-centric"
          - "packages/core/src/tasks/task-kernel"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:368db4a431f544b142daa3b0d59d7fc0db2f346262efc2bb716f69b5f884873c"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/index.ts"
        - "central_component:packages/core/src/tasks/task-centric"
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
        - "effect_public_api"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/core"
        changed_files:
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/invariants.test.ts"
          - "packages/core/src/tasks/task-kernel/invariants.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/model.test.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
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
      - "repository_effect:public_api"
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
    body: "Implementation committed: 0f4a0d1f5d18. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ab29385a10a1. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c358aea7e1aa. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-29T20:33:30.155Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T20:34:55.793Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0f4a0d1f5d18. CLI accepted one state-bound external-agent semantic result."
    commit: "0f4a0d1f5d18039907d40a9b6a38d6eb83ee7cb9"
  -
    type: "verify"
    at: "2026-08-29T20:43:19.619Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-29T20:53:47.101Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ab29385a10a1. CLI accepted one state-bound external-agent semantic result."
    commit: "ab29385a10a1cf3d142653fe459cec12a6199cb1"
  -
    type: "verify"
    at: "2026-08-29T21:01:40.898Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-29T21:14:56.675Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c358aea7e1aa. CLI accepted one state-bound external-agent semantic result."
    commit: "c358aea7e1aa1107437a7e44ddf83d25550a9dc7"
  -
    type: "verify"
    at: "2026-08-29T21:22:46.580Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-29T21:22:48.696Z"
doc_updated_by: "SUPERVISOR"
description: "Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged."
sections:
  Summary: |-
    Implement the isolated canonical Task kernel

    Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
  Scope: |-
    - In scope: Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
    - Out of scope: unrelated refactors not required for "Implement the isolated canonical Task kernel".
  Plan: "Prepared the corrected M1 plan and explicit execution intent for four ordered WorkItems: contract, reducer, invariants, and qualification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Implement the isolated canonical Task kernel". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Implement the isolated canonical Task kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-29T20:43:19.619Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:0e2983ba21a8e746e59c7758be629300e86c9a8c597334c947d0be0b36e5dfe1

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
    - old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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

    ### 2026-08-29T21:01:40.898Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:15c2531619d92b3b77f8b50cbdb63defb9d54d52836084bf43d14bdae94d0995

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
    - old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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

    ### 2026-08-29T21:22:46.580Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:e6d16db14bc0d7d9606c4584a276f5a14b21550f0be2799c830fa1085e1f5528

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
    - old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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
    completion_contract_digest: "sha256:d2dbeffb7a18a2aa14d9095ec35f3fa073d62f607cb5ca32fdc0f809ae5952ac"
    digest: "sha256:394d61675b1da58400b9b962114b53eee059fba5d429cdebdf874d46ca7e0465"
    grant_id: "06ef4363-81db-417c-961e-0e432ed5cd90"
    issued_at: "2026-08-29T20:33:19.037Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a752af1a7363aeccb30070385ac080119c00c8ed5762fb713470bac3a2000c68"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:1616ddcb213db7f09d7baf7bb8228589ff7160c875bcf927122c2747903a3935"
    status: "active"
    task_id: "202608292032-1K47B8"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T20:33:19.037Z"
        approved_by: "USER"
        approved_digest: "sha256:cef2efdd6c79e86a763bdadaf7f1bd6c0635edfdfd265b4f37b83c2e5fed9dca"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-29T20:33:09.377Z"
      digest: "sha256:cef2efdd6c79e86a763bdadaf7f1bd6c0635edfdfd265b4f37b83c2e5fed9dca"
      proposal:
        assumptions:
          - "M1 introduces only an internal kernel boundary; adapter integration, persistence migration, dual-run, and production cutover remain M2/M3 work."
          - "Existing public CLI behavior and serialized task compatibility remain unchanged throughout M1."
        planning_baseline:
          captured_at: "2026-08-29T20:32:17.851Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:9560a92fc58cba6830f1c84a09db181542b593cdf292bd7ef1f5ee473bf9227b"
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
            - ".agentplane/tasks/202608292032-1K47B8/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608292032-1K47B8"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
              id: "check-kernel-model"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts"
              id: "check-kernel-reducer"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts"
              id: "check-kernel-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "check-architecture"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "check-fast-suite"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-kernel-model"
                - "check-kernel-reducer"
                - "check-kernel-invariants"
                - "check-architecture"
              description: "The isolated canonical Task kernel implements the M1 contract and all fourteen mandatory invariants without adapter or legacy authority."
              id: "criterion-m1-pure-kernel"
              required: true
            -
              check_ids:
                - "check-architecture"
                - "check-fast-suite"
                - "check-typecheck"
              description: "bun run arch:check, bun run test:fast, and bun run typecheck pass on the exact implementation identity."
              id: "criterion-m1-regression"
              required: true
          evidence_fingerprint: "sha256:1afc95aed168c1cf3daea19f41769872a6b1dd15e5502cf4428b671d6be2b087"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-model"
                    - "check-architecture"
                  description: "The internal module defines a closed typed command/result/event contract without filesystem, process, Git, provider, backend, CLI, clock, randomness, environment, document, or legacy compatibility dependencies."
                  id: "criterion-closed-contract"
                  required: true
                -
                  check_ids:
                    - "check-kernel-model"
                  description: "Kernel evaluation inputs carry actor, authority, repository fingerprint, occurredAt, and mutationId explicitly; no free-text status authorizes a transition."
                  id: "criterion-explicit-inputs"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 393216
                optional_sources:
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                required_sources:
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "packages/core/src/tasks/task-centric/model.ts"
                  - "packages/core/src/tasks/task-centric/lifecycle.ts"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                symbol_hints:
                  - "TaskAggregate"
                  - "TaskCommand"
                  - "KernelInput"
                  - "KernelResult"
                  - "KernelRejectionCode"
                  - "MutationReceipt"
              depends_on: []
              expected_outputs:
                - "canonical-task-kernel-contract"
              id: "define-kernel-domain-contract"
              objective: "Create the internal canonical Task kernel domain model with immutable aggregate, closed command and event unions, stable rejection codes, receipts, actor and authority values, and adapter-supplied time and mutation identity."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
                    id: "check-kernel-model"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "check-architecture"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-model"
                      - "check-architecture"
                    description: "The internal module defines a closed typed command/result/event contract without filesystem, process, Git, provider, backend, CLI, clock, randomness, environment, document, or legacy compatibility dependencies."
                    id: "criterion-closed-contract"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-model"
                    description: "Kernel evaluation inputs carry actor, authority, repository fingerprint, occurredAt, and mutationId explicitly; no free-text status authorizes a transition."
                    id: "criterion-explicit-inputs"
                    required: true
                evidence_fingerprint: "sha256:005557cb530872a6c013727ce20a995e6b1ecf09415d93bb9dd5f5170a9d907c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Every accepted Task and WorkItem transition belongs to an explicit closed transition table and every expected conflict returns a stable rejection value without mutating the aggregate."
                  id: "criterion-transition-table"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Plans, WorkItems, results, approvals, reviews, validation, effects, and completion enforce current revision, digest, fingerprint, and implementation identity bindings."
                  id: "criterion-state-binding"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Repeating a mutationId returns the existing receipt with byte-identical aggregate, events, reason codes, and receipts and creates no second effect."
                  id: "criterion-idempotency"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Completion requires the approved current plan, all required WorkItems and manifests, current final validation, and no pending or uncertain effects."
                  id: "criterion-completion"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 524288
                optional_sources:
                  - "packages/core/src/tasks/task-centric/orchestrator.ts"
                  - "packages/core/src/tasks/task-centric/digest.ts"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/task-centric/lifecycle.ts"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "transitionWorkItem"
                  - "isTaskCompletionEligible"
                  - "mutationId"
                  - "stateFingerprint"
              depends_on:
                - "define-kernel-domain-contract"
              expected_outputs:
                - "deterministic-task-kernel-reducer"
              id: "implement-deterministic-kernel-reducer"
              objective: "Implement the pure deterministic reducer and legal transition policies for Task, plan, WorkItem graph, results, validation, effects, authority, idempotency, and completion."
              optional: false
              priority: 2
              required_inputs:
                - "canonical-task-kernel-contract"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts"
                    id: "check-kernel-reducer"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Every accepted Task and WorkItem transition belongs to an explicit closed transition table and every expected conflict returns a stable rejection value without mutating the aggregate."
                    id: "criterion-transition-table"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Plans, WorkItems, results, approvals, reviews, validation, effects, and completion enforce current revision, digest, fingerprint, and implementation identity bindings."
                    id: "criterion-state-binding"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Repeating a mutationId returns the existing receipt with byte-identical aggregate, events, reason codes, and receipts and creates no second effect."
                    id: "criterion-idempotency"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Completion requires the approved current plan, all required WorkItems and manifests, current final validation, and no pending or uncertain effects."
                    id: "criterion-completion"
                    required: true
                evidence_fingerprint: "sha256:d3b4a5906f91fc152680edab1a926bd560e15f2a4a720c6c9ac7686597c4b117"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Child and replacement authority cannot exceed the active parent across repository, scope, effects, capabilities, resources, risk, reversibility, validation, policy, or completion dimensions; derived authority never gains USER provenance."
                  id: "criterion-authority-subset"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "A result targets exactly one Task and one WorkItem; required outputs and validation are required before WorkItem completion; readiness follows the canonical dependency graph."
                  id: "criterion-workitem-output"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Unknown non-idempotent effects block replay until explicit readback or reconciliation resolves them."
                  id: "criterion-effect-safety"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Documents, legacy status, verification text, PR metadata, and provider summaries cannot authorize kernel transitions."
                  id: "criterion-projection-impotence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 524288
                optional_sources:
                  - "packages/core/src/tasks/task-centric/ports.ts"
                  - "packages/core/src/tasks/verification-contract.ts"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                symbol_hints:
                  - "ExecutionAuthority"
                  - "authoritySubset"
                  - "requiredOutputs"
                  - "effectState"
                  - "projection"
              depends_on:
                - "implement-deterministic-kernel-reducer"
              expected_outputs:
                - "kernel-invariant-policy-suite"
              id: "enforce-authority-effects-and-projection-invariants"
              objective: "Implement authority subset and user provenance rules, graph readiness, one-result targeting, validation identity, output integrity, uncertain-effect blocking, and projection impotence as kernel policies."
              optional: false
              priority: 3
              required_inputs:
                - "deterministic-task-kernel-reducer"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts"
                    id: "check-kernel-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Child and replacement authority cannot exceed the active parent across repository, scope, effects, capabilities, resources, risk, reversibility, validation, policy, or completion dimensions; derived authority never gains USER provenance."
                    id: "criterion-authority-subset"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "A result targets exactly one Task and one WorkItem; required outputs and validation are required before WorkItem completion; readiness follows the canonical dependency graph."
                    id: "criterion-workitem-output"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Unknown non-idempotent effects block replay until explicit readback or reconciliation resolves them."
                    id: "criterion-effect-safety"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Documents, legacy status, verification text, PR metadata, and provider summaries cannot authorize kernel transitions."
                    id: "criterion-projection-impotence"
                    required: true
                evidence_fingerprint: "sha256:bb9aa97aa4eb56b67afd1c8542406c57866bd87708126acdce5c3e0a011e4080"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-model"
                    - "check-kernel-reducer"
                    - "check-kernel-invariants"
                  description: "Table vectors cover every legal transition and representative illegal edges with exact aggregate, event, receipt, rejection-code, event-order, and post-state digest assertions."
                  id: "criterion-vector-coverage"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Generated cases reject illegal transitions, widened authority, duplicate mutations with changed payloads, stale fingerprints, missing manifests, and uncertain effects; deterministic replay is byte-identical."
                  id: "criterion-property-coverage"
                  required: true
                -
                  check_ids:
                    - "check-architecture"
                  description: "Architecture enforcement proves the kernel imports no filesystem, process, Git, provider, CLI, backend, task-document, clock, randomness, environment, or legacy conversion code."
                  id: "criterion-import-boundary"
                  required: true
                -
                  check_ids:
                    - "check-fast-suite"
                    - "check-typecheck"
                    - "check-architecture"
                  description: "Fast tests, typecheck, architecture checks, and existing task-centric behavior pass without changing the public CLI contract."
                  id: "criterion-regression-suite"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 786432
                optional_sources:
                  - "vitest.config.ts"
                  - "package.json"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "depcruise.config.cjs"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "packages/core/src/tasks/task-centric/orchestrator.test.ts"
                symbol_hints:
                  - "forbidden"
                  - "dependency-cruiser"
                  - "KernelResult"
                  - "KernelRejectionCode"
              depends_on:
                - "enforce-authority-effects-and-projection-invariants"
              expected_outputs:
                - "m1-kernel-qualification-receipt"
              id: "qualify-isolated-kernel"
              objective: "Add table vectors and generated invariant tests, enforce the kernel import boundary, and run the milestone acceptance suite while preserving existing public CLI behavior."
              optional: false
              priority: 4
              required_inputs:
                - "kernel-invariant-policy-suite"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
                    id: "check-kernel-model"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts"
                    id: "check-kernel-reducer"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts"
                    id: "check-kernel-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "check-architecture"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "check-fast-suite"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-model"
                      - "check-kernel-reducer"
                      - "check-kernel-invariants"
                    description: "Table vectors cover every legal transition and representative illegal edges with exact aggregate, event, receipt, rejection-code, event-order, and post-state digest assertions."
                    id: "criterion-vector-coverage"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Generated cases reject illegal transitions, widened authority, duplicate mutations with changed payloads, stale fingerprints, missing manifests, and uncertain effects; deterministic replay is byte-identical."
                    id: "criterion-property-coverage"
                    required: true
                  -
                    check_ids:
                      - "check-architecture"
                    description: "Architecture enforcement proves the kernel imports no filesystem, process, Git, provider, CLI, backend, task-document, clock, randomness, environment, or legacy conversion code."
                    id: "criterion-import-boundary"
                    required: true
                  -
                    check_ids:
                      - "check-fast-suite"
                      - "check-typecheck"
                      - "check-architecture"
                    description: "Fast tests, typecheck, architecture checks, and existing task-centric behavior pass without changing the public CLI contract."
                    id: "criterion-regression-suite"
                    required: true
                evidence_fingerprint: "sha256:8bd8db621a0d6dd852c2375ed4fddb3836e4217681c9123aa9d6b76f3bdea4bf"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608292032-1K47B8"
    event_cursor: 0
    final_validation: null
    id: "202608292032-1K47B8"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-29T20:32:03.292Z"
      constraints: []
      request: |-
        Implement the isolated canonical Task kernel

        Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
      task_id: "202608292032-1K47B8"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 16
    schema_version: 1
    updated_at: "2026-08-29T21:22:49.803Z"
    work_items:
      define-kernel-domain-contract:
        attempt: 1
        claim_id: null
        id: "define-kernel-domain-contract"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:f5d0d1089f47db118552a9ef9d53d107d52763f4c07d31fe7f62842c4556f10a"
            id: "canonical-task-kernel-contract"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608292032-1K47B8"
              work_item_id: "define-kernel-domain-contract"
            provenance:
              - "sha256:ba877fa45e2f0c9d377b9e4491f1eb9414ab1d91e749a731e6d7379c6ee1c996"
              - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:fd38c3e9ab285b4fde948dfc2d5950e5eb255645170cbae337fc7a31f5319156"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
              check_id: "check-kernel-model"
              command_identity: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts"
              detail: "Observed by bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts."
              exit_code: 0
              observed_at: "2026-08-29T20:43:33.956Z"
              repository_snapshot_digest: "sha256:fd38c3e9ab285b4fde948dfc2d5950e5eb255645170cbae337fc7a31f5319156"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
              check_id: "check-architecture"
              command_identity: "bun run arch:check"
              detail: "Observed by bun run arch:check."
              exit_code: 0
              observed_at: "2026-08-29T20:43:33.956Z"
              repository_snapshot_digest: "sha256:fd38c3e9ab285b4fde948dfc2d5950e5eb255645170cbae337fc7a31f5319156"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      enforce-authority-effects-and-projection-invariants:
        attempt: 1
        claim_id: null
        id: "enforce-authority-effects-and-projection-invariants"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:0a4327b7d1aabd5ba68ca455531a8ff1068745256459a80e13f26a4709a4f23b"
            id: "kernel-invariant-policy-suite"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608292032-1K47B8"
              work_item_id: "enforce-authority-effects-and-projection-invariants"
            provenance:
              - "sha256:f689cf32701b1efa5ea286bbcdd38ec65eba4fba16e76a4d5509deab861cc6ab"
              - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e0990e9e22ee27c7c608e05e2356aef46ee7b326f1531d3797aa73aed44c0b79"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
              check_id: "check-kernel-invariants"
              command_identity: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts"
              detail: "Observed by bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts."
              exit_code: 0
              observed_at: "2026-08-29T21:22:49.792Z"
              repository_snapshot_digest: "sha256:e0990e9e22ee27c7c608e05e2356aef46ee7b326f1531d3797aa73aed44c0b79"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      implement-deterministic-kernel-reducer:
        attempt: 1
        claim_id: null
        id: "implement-deterministic-kernel-reducer"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:d75f415c0156ba72ccfb35bef44d370f39003060c77928ef60190b68cf5d96fe"
            id: "deterministic-task-kernel-reducer"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608292032-1K47B8"
              work_item_id: "implement-deterministic-kernel-reducer"
            provenance:
              - "sha256:603044ae240c75cbca75841fcabf7f13e1e0e5c6a148f697b1e4425bfebd62fe"
              - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1dcd861a751c2490253fd1b845561593d644a94becd5c81d11b5124cca237ed7"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
              check_id: "check-kernel-reducer"
              command_identity: "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts"
              detail: "Observed by bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts."
              exit_code: 0
              observed_at: "2026-08-29T21:01:44.411Z"
              repository_snapshot_digest: "sha256:1dcd861a751c2490253fd1b845561593d644a94becd5c81d11b5124cca237ed7"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      qualify-isolated-kernel:
        attempt: 0
        claim_id: null
        id: "qualify-isolated-kernel"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608292032-1K47B8-executor-57f344eeb2d34341fa77143d:
        aggregate_digest: "sha256:ffc3a7b99de1cde01df81dc46a4727377aa3a8ff81b0d3e3e08bd0e838f65532"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T21:01:44.417Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_073c0544e548b00b8451c8c3"
          mutation_id: "external-result:work-order-202608292032-1K47B8-executor-57f344eeb2d34341fa77143d"
          plan_digest: "sha256:cef2efdd6c79e86a763bdadaf7f1bd6c0635edfdfd265b4f37b83c2e5fed9dca"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292032-1K47B8"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "implement-deterministic-kernel-reducer"
        mutation_id: "external-result:work-order-202608292032-1K47B8-executor-57f344eeb2d34341fa77143d"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202608292032-1K47B8"
      external-result:work-order-202608292032-1K47B8-executor-b1a6107dfc6496d5ce139229:
        aggregate_digest: "sha256:7cd03cbba4886db9b473705a7e568ce2ac6b42079e1b8a2c68e1dcdd5e5c11a0"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T20:43:33.969Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_6bf850d845a9e7ad07612f01"
          mutation_id: "external-result:work-order-202608292032-1K47B8-executor-b1a6107dfc6496d5ce139229"
          plan_digest: "sha256:cef2efdd6c79e86a763bdadaf7f1bd6c0635edfdfd265b4f37b83c2e5fed9dca"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292032-1K47B8"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "define-kernel-domain-contract"
        mutation_id: "external-result:work-order-202608292032-1K47B8-executor-b1a6107dfc6496d5ce139229"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608292032-1K47B8"
      external-result:work-order-202608292032-1K47B8-executor-ef23207ba06ffdec776b54ea:
        aggregate_digest: "sha256:d81db33beb0dd7b60a34bae8518aeb2f6ee83aacf46eb340623e70bd54fbcc1b"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T21:22:49.803Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_08d5003cda23e6eddf390450"
          mutation_id: "external-result:work-order-202608292032-1K47B8-executor-ef23207ba06ffdec776b54ea"
          plan_digest: "sha256:cef2efdd6c79e86a763bdadaf7f1bd6c0635edfdfd265b4f37b83c2e5fed9dca"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292032-1K47B8"
          task_revision: 15
          to: "COMPLETED"
          work_item_id: "enforce-authority-effects-and-projection-invariants"
        mutation_id: "external-result:work-order-202608292032-1K47B8-executor-ef23207ba06ffdec776b54ea"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202608292032-1K47B8"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "c358aea7e1aa1107437a7e44ddf83d25550a9dc7"
  task_execution_context:
    base_ref: "main"
    base_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    version: 1
id_source: "generated"
---
## Summary

Implement the isolated canonical Task kernel

Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.

## Scope

- In scope: Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
- Out of scope: unrelated refactors not required for "Implement the isolated canonical Task kernel".

## Plan

Prepared the corrected M1 plan and explicit execution intent for four ordered WorkItems: contract, reducer, invariants, and qualification.

## Verify Steps

PLANNER fallback scaffold for "Implement the isolated canonical Task kernel". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Implement the isolated canonical Task kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-29T20:43:19.619Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:0e2983ba21a8e746e59c7758be629300e86c9a8c597334c947d0be0b36e5dfe1

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
- old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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

### 2026-08-29T21:01:40.898Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:15c2531619d92b3b77f8b50cbdb63defb9d54d52836084bf43d14bdae94d0995

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/kernel.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
- old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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

### 2026-08-29T21:22:46.580Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:509ac1522bea3472392f8734b7b7c1f34ee7accd92341278f59c5ee0f5270a2b, input_digest=sha256:e6d16db14bc0d7d9606c4584a276f5a14b21550f0be2799c830fa1085e1f5528

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/invariants.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608292032-1K47B8 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292032-1K47B8-implement-the-isolated-canonical-task-kernel/.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json
- old_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- current_digest: dc2c028ecfd2cbd4e83e9c695b7c3697411141ca514ea82ca00e20848226929b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292032-1K47B8

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
