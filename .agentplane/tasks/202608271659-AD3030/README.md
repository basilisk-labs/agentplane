---
id: "202608271659-AD3030"
title: "Preserve task identity in closeout and worktree fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on:
  - "202608271251-GHHA0Q"
tags:
  - "tests"
  - "architecture"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T20:52:04.105Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-27T23:15:43.799Z"
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Four test files only; preserve batch identity and authoritative checkout behavior."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
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
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:91d1a32e9b582c2326db1b5c727debe52914c45e362e615f3da2cd0a946307b1"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
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
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  message: "🚧 AD3030 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-27T21:02:50.742Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-27T21:18:30.441Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
    commit: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  -
    type: "verify"
    at: "2026-08-27T21:31:49.985Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-27T21:35:59.410Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
    commit: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  -
    type: "verify"
    at: "2026-08-27T21:58:47.391Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-27T22:25:29.688Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
    commit: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  -
    type: "verify"
    at: "2026-08-27T22:36:23.598Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-27T23:06:58.739Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 37c73e481fb2. CLI accepted one state-bound external-agent semantic result."
    commit: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  -
    type: "verify"
    at: "2026-08-27T23:15:43.799Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-27T23:15:46.043Z"
doc_updated_by: "SUPERVISOR"
description: "Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof."
sections:
  Summary: |-
    Preserve task identity in closeout and worktree fixtures

    Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
  Scope: |-
    - In scope: Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
    - Out of scope: unrelated refactors not required for "Preserve task identity in closeout and worktree fixtures".
  Plan: "Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1. Expected: all27scenarios pass without skips or increased timeouts.
    2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
    3. Run bun run ci:local:full. Expected: mandatory local CI passes.
    4. Review the four-file diff. Shared task execution bases and unknown extensions survive fixture changes. Landed commit precedence, unresolved-task refusal, reviewed implementation identity, worktree requirement and authoritative worktree-only start are asserted. No production, global helpers, policy or CI changes.
    5. Require independent EVALUATOR and hosted exact-head proof before supported integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-27T21:31:49.985Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:526785981be5dd1b27d59a05283b37d954b0c7ca893c4a424cfe1cdde40fed3c

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
    - old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

    ### 2026-08-27T21:58:47.391Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:cccd5ddae2e0109a969c707004716e7f159945825a3d6feac038535fbc283d4b

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
    - old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

    ### 2026-08-27T22:36:23.598Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:c97a4e8870a9447396ab9f544b697eea2acb8abec0d9973fcb0a63c24aa20dc8

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
    - old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

    ### 2026-08-27T23:15:43.799Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:290e257f1c37e1a811b3693711d35fa86c97cbeff0100d433549667bc91ab913

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271659-AD3030 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
    - old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271659-AD3030

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
    completion_contract_digest: "sha256:4b76aff3166ab28a7e6f189e5bd667185e4129d4dfb2ac2609242897865a0677"
    digest: "sha256:0e9a17171624b1c97a5b0fc4cdd6c62daedff68dd7587af0d2404eff55e2682c"
    grant_id: "19899c94-792a-4251-89f5-0c83e677ae3e"
    issued_at: "2026-08-27T20:52:04.105Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:d86ed97196ec4a37ad680617df7a2088d00695f9425f6a4efb8955b5c82f0bcd"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608271659-AD3030"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T20:52:04.105Z"
        approved_by: "USER"
        approved_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T17:01:20.836Z"
      digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
      proposal:
        assumptions:
          - "Task-owned routing is intentional current behavior; validate preservation rather than restoring a manual handoff."
        planning_baseline:
          captured_at: "2026-08-27T17:00:09.085Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
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
            - ".agentplane/tasks/202608271659-AD3030/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608271659-AD3030"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
              id: "scoped-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "scoped-tests"
                - "full-ci"
              description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
              id: "closeout-contract"
              required: true
          evidence_fingerprint: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "scoped-tests"
                    - "full-ci"
                  description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
                  id: "closeout-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources:
                  - "packages/agentplane/src/commands/task/start-ready.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                symbol_hints:
                  - "task_execution_context"
                  - "branch_pr_batch"
                  - "loadTaskCommandContext"
              depends_on: []
              expected_outputs:
                - "artifact:closeout-fixture-report"
              id: "repair-closeout-fixtures"
              objective: "Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
                    id: "scoped-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scoped-tests"
                      - "full-ci"
                    description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
                    id: "closeout-contract"
                    required: true
                evidence_fingerprint: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271659-AD3030"
    event_cursor: 0
    final_validation: null
    id: "202608271659-AD3030"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T17:00:00.059Z"
      constraints: []
      request: |-
        Preserve task identity in closeout and worktree fixtures

        Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
      task_id: "202608271659-AD3030"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 21
    schema_version: 1
    updated_at: "2026-08-27T23:15:47.181Z"
    work_items:
      repair-closeout-fixtures:
        attempt: 4
        claim_id: null
        id: "repair-closeout-fixtures"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:d16645d5001ead827393d70a138732abc698c18c92664d8883c5a873eb08c497"
            id: "artifact:closeout-fixture-report"
            kind: "semantic_output"
            producer:
              attempt: 4
              plan_revision: 1
              task_id: "202608271659-AD3030"
              work_item_id: "repair-closeout-fixtures"
            provenance:
              - "sha256:62db0d6cff6a45d9451b646f2f602b9a1cd4100c76752962dac80801f9817d53"
              - ".agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1507c16ba87b70bbebfe5b9b89d94aa36569e1bd9ddab10080d2c673f25bc153"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 5
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
              check_id: "scoped-tests"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-08-27T23:15:47.176Z"
              repository_snapshot_digest: "sha256:1507c16ba87b70bbebfe5b9b89d94aa36569e1bd9ddab10080d2c673f25bc153"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-27T23:15:47.176Z"
              repository_snapshot_digest: "sha256:1507c16ba87b70bbebfe5b9b89d94aa36569e1bd9ddab10080d2c673f25bc153"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608271659-AD3030-executor-5ac7d26dc02fdbc1b74feaca:
        aggregate_digest: "sha256:5fc0cd607b546454c189f4a0dd45b8c9085906bbfe813ff3833d73819fe9324b"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T21:58:59.974Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_33c7e5a39c930c5f1f85a0dd"
          mutation_id: "external-result:work-order-202608271659-AD3030-executor-5ac7d26dc02fdbc1b74feaca"
          plan_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271659-AD3030"
          task_revision: 12
          to: "REWORK_READY"
          work_item_id: "repair-closeout-fixtures"
        mutation_id: "external-result:work-order-202608271659-AD3030-executor-5ac7d26dc02fdbc1b74feaca"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202608271659-AD3030"
      external-result:work-order-202608271659-AD3030-executor-7a5762da01902517c9515379:
        aggregate_digest: "sha256:58fe8ec598cf257de6d0ffe369e86341ec841048da3b77e5f39ad19c7777919f"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T22:36:28.493Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_1c82f602a139cc666e86f395"
          mutation_id: "external-result:work-order-202608271659-AD3030-executor-7a5762da01902517c9515379"
          plan_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271659-AD3030"
          task_revision: 16
          to: "REWORK_READY"
          work_item_id: "repair-closeout-fixtures"
        mutation_id: "external-result:work-order-202608271659-AD3030-executor-7a5762da01902517c9515379"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202608271659-AD3030"
      external-result:work-order-202608271659-AD3030-executor-893130ee668b92697585a4c1:
        aggregate_digest: "sha256:d005e7ae01591d7ce7da77ec470b28b4d4848eaea550d348dae8570f12e82efa"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T21:31:53.322Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_6c27d1f935a546d1b5d9d703"
          mutation_id: "external-result:work-order-202608271659-AD3030-executor-893130ee668b92697585a4c1"
          plan_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271659-AD3030"
          task_revision: 8
          to: "REWORK_READY"
          work_item_id: "repair-closeout-fixtures"
        mutation_id: "external-result:work-order-202608271659-AD3030-executor-893130ee668b92697585a4c1"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202608271659-AD3030"
      external-result:work-order-202608271659-AD3030-executor-c9c5e32688992218128ad5df:
        aggregate_digest: "sha256:2a34d5e3a12e1d30d7d26412d9823e0c83dac7b369820b56061e8852a93de78a"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T23:15:47.181Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_a1dd59b36756f192b509b845"
          mutation_id: "external-result:work-order-202608271659-AD3030-executor-c9c5e32688992218128ad5df"
          plan_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271659-AD3030"
          task_revision: 20
          to: "COMPLETED"
          work_item_id: "repair-closeout-fixtures"
        mutation_id: "external-result:work-order-202608271659-AD3030-executor-c9c5e32688992218128ad5df"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202608271659-AD3030"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "37c73e481fb24ef71c13270b9c74ec22ba117040"
  task_execution_context:
    base_ref: "main"
    base_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    version: 1
id_source: "generated"
---
## Summary

Preserve task identity in closeout and worktree fixtures

Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.

## Scope

- In scope: Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
- Out of scope: unrelated refactors not required for "Preserve task identity in closeout and worktree fixtures".

## Plan

Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1. Expected: all27scenarios pass without skips or increased timeouts.
2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
3. Run bun run ci:local:full. Expected: mandatory local CI passes.
4. Review the four-file diff. Shared task execution bases and unknown extensions survive fixture changes. Landed commit precedence, unresolved-task refusal, reviewed implementation identity, worktree requirement and authoritative worktree-only start are asserted. No production, global helpers, policy or CI changes.
5. Require independent EVALUATOR and hosted exact-head proof before supported integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-27T21:31:49.985Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:526785981be5dd1b27d59a05283b37d954b0c7ca893c4a424cfe1cdde40fed3c

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
- old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

### 2026-08-27T21:58:47.391Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:cccd5ddae2e0109a969c707004716e7f159945825a3d6feac038535fbc283d4b

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
- old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

### 2026-08-27T22:36:23.598Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:c97a4e8870a9447396ab9f544b697eea2acb8abec0d9973fcb0a63c24aa20dc8

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
- old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271659-AD3030

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

### 2026-08-27T23:15:43.799Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9ae473cbc5a07af7c0ac5336b7676b8b836d4b91ce6274f4dac1bbd5747c8023, input_digest=sha256:290e257f1c37e1a811b3693711d35fa86c97cbeff0100d433549667bc91ab913

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271659-AD3030 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271659-AD3030 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271659-AD3030 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271659-AD3030 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271659-AD3030-preserve-task-identity-in-closeout-and-worktree/.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json
- old_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- current_digest: 0d09cb76e6021e2ef303a75461cc70335a3cea6d6f7bee5819b630d96da713fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271659-AD3030

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
