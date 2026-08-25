---
id: "202608242233-KTFFN7"
title: "Allow evidence-only rework after an already committed implementation"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 25
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.8-blocker"
  - "self-hosting-recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-24T22:58:48.317Z"
  updated_by: "USER"
  note: "Explicit user approval: plan_digest=sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d state_fingerprint=sha256:47c2bc7816b499e67e1867c1b7ed0cd356c268fe54375a92808ea6f968a034f1"
verification:
  state: "needs_rework"
  updated_at: "2026-08-25T02:30:43.531Z"
  updated_by: "EVALUATOR"
  note: "Hosted review rework: preserve KTFFN7 intent and address both unresolved PR #4885 threads before reintegration."
  attempts: 1
quality_review:
  state: "rework"
  updated_at: "2026-08-25T02:30:43.531Z"
  updated_by: "EVALUATOR"
  note: "Hosted review rework: preserve KTFFN7 intent and address both unresolved PR #4885 threads before reintegration."
  evaluated_sha: "6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
  blueprint_digest: "a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe"
  evidence_refs:
    - ".agentplane/tasks/202608242233-KTFFN7/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json"
  findings:
    - "PR #4885 review found two task-owned gaps in canonical WorkItem check projection: optional checks can incorrectly fail the task, and per-check timeout_ms is discarded. Repair both within the approved source/test roots, add regressions, rerun focused and full verification, then republish the exact reviewed head."
token_usage:
  agent_runs: 7
  input_tokens: null
  journal_digest: "sha256:9edaf5ca5f950032c4e257bcf5d1ae701633e78789a2af9f6e5f1743d61573db"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-25T02:14:57.941Z"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch PR preserves exact-head hosted integration evidence for a release-blocking state-machine change."
      - "The defect is confined to Supervisor command selection and no-delta implementation-rework authority."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
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
        id: "verification-record"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
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
      digest: "sha256:adc21fb945a07e8d0f3294af556fccde5a091ead06a0c9bd2e7a3fb92f19010d"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
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
      - "verification_recovery:verification-record"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 690f6b79aa62. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 3d079b6592d9. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c566a26f3469. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c566a26f3469. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: resume evidence-only verification after aggregate CI blocker 202608250015-DZ61YB was hosted-merged at 6d359cd0b1e2944769435cf459078757d2e78324 and cleaned; preserve implementation c566a26f34699e0d0f779ad19fa4978f712aed66 without semantic reimplementation."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f4732e565492. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-24T22:59:25.891Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-24T23:12:32.902Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 690f6b79aa62. CLI accepted one state-bound external-agent semantic result."
    commit: "690f6b79aa6231534f533e448ad8919bd439d8ab"
  -
    type: "verify"
    at: "2026-08-24T23:20:37.262Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-24T23:24:26.904Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3d079b6592d9. CLI accepted one state-bound external-agent semantic result."
    commit: "3d079b6592d9fe737e16130e010102d053f71191"
  -
    type: "verify"
    at: "2026-08-24T23:31:15.369Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-24T23:54:01.885Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c566a26f3469. CLI accepted one state-bound external-agent semantic result."
    commit: "c566a26f34699e0d0f779ad19fa4978f712aed66"
  -
    type: "verify"
    at: "2026-08-25T00:00:57.254Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-25T00:04:24.325Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c566a26f3469. CLI accepted one state-bound external-agent semantic result."
    commit: "c566a26f34699e0d0f779ad19fa4978f712aed66"
  -
    type: "verify"
    at: "2026-08-25T00:11:56.218Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-25T01:31:14.725Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resume evidence-only verification after aggregate CI blocker 202608250015-DZ61YB was hosted-merged at 6d359cd0b1e2944769435cf459078757d2e78324 and cleaned; preserve implementation c566a26f34699e0d0f779ad19fa4978f712aed66 without semantic reimplementation."
  -
    type: "status"
    at: "2026-08-25T02:02:40.180Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f4732e565492. CLI accepted one state-bound external-agent semantic result."
    commit: "f4732e5654922ed462df2aa606985280c3afc7ab"
  -
    type: "verify"
    at: "2026-08-25T02:10:11.037Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-25T02:14:57.941Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "4db5179a92d709eeb2adf708fe1ffb520210d9df"
  -
    type: "verify"
    at: "2026-08-25T02:30:43.531Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Hosted review rework: preserve KTFFN7 intent and address both unresolved PR #4885 threads before reintegration."
doc_version: 3
doc_updated_at: "2026-08-25T02:30:53.993Z"
doc_updated_by: "CODER"
description: "Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop."
sections:
  Summary: |-
    Allow evidence-only rework after an already committed implementation

    Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
  Scope: |-
    - In scope: Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
    - Out of scope: unrelated refactors not required for "Allow evidence-only rework after an already committed implementation".
  Plan: "Add one fail-closed evidence-only implementation-rework path. Supervisor verification must execute the selected canonical WorkItem's deterministic validation commands in addition to legacy task checks, and a no-delta implementation_rework may reuse the exact recorded implementation commit only for the matching REWORK_READY WorkItem. Initial no-op implementation and semantic repair with actual workspace changes retain their existing behavior."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow evidence-only rework after an already committed implementation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow evidence-only rework after an already committed implementation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-24T23:20:37.262Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:6b64bc5add45df93762c2797e3ae2d9a91a85e6da452ccfe4b11dff33a2bb5e8

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

    ### 2026-08-24T23:31:15.369Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:5a35419a780429d1e0e543473ae9a2091a36153f143ce01de32a73d6da5f388d

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

    ### 2026-08-25T00:00:57.254Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:955b8ad0aec8f06fd550e6d2e0e3095d7b5bb2c72a8b997a88793e6bca9fecf2

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

    ### 2026-08-25T00:11:56.218Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:3ca2d24b022864814ee66161ba7161d63b1646371cbce66a84fb7f6020a6e7da

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

    ### 2026-08-25T02:10:11.037Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:ff33d4a286caf60aca51a29ea4645ac30c84e8e3e674c4d66cdfce18638e1c75

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check critical_paths

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

    ### 2026-08-25T02:30:43.531Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Hosted review rework: preserve KTFFN7 intent and address both unresolved PR #4885 threads before reintegration.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:ed360358c9744f4b995d6aa923e0402a179c8894c7596783d41d4133117d381f

    Details:

    PR #4885 review found two task-owned gaps in canonical WorkItem check projection: optional checks can incorrectly fail the task, and per-check timeout_ms is discarded. Repair both within the approved source/test roots, add regressions, rerun focused and full verification, then republish the exact reviewed head.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
    - old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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
    digest: "sha256:ddde2f409854d81f3ad75304908e61ea932111c9a6f9f25fb697ade2463114c1"
    grant_id: "ec3b3b05-1320-4880-99d7-a0a02f9085d3"
    issued_at: "2026-08-24T22:58:48.317Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:dfa22536402373fca0255e8494dedc93b2f137cc30698cecf09497ca047a521e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608242233-KTFFN7"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-24T22:58:48.317Z"
        approved_by: "USER"
        approved_digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-24T22:35:57.481Z"
      digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
      proposal:
        assumptions:
          - "The selected WorkItem is identified by work_order.task.work_item_id and its canonical runtime remains REWORK_READY at result application."
          - "Supervisor-executed deterministic commands are the trusted evidence source; agent claims alone do not satisfy validation."
        planning_baseline:
          captured_at: "2026-08-24T22:33:08.626Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6c6cbc2bd1351858c2cdd8e824c331b387e9344901dfd5271515401f655d5413"
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
            - ".agentplane/tasks/202608242233-KTFFN7/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608242233-KTFFN7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-diff"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-lint"
                - "check-diff"
              description: "A committed implementation with one previously unsupported canonical validation command converges through evidence-only rework, while initial no-op and changed repair boundaries remain fail-closed."
              id: "criterion-release-blocker-removed"
              required: true
          evidence_fingerprint: "sha256:6666666666666666666666666666666666666666666666666666666666666666"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                  description: "Supervisor verification executes and records every deterministic task.verify command required by the selected canonical WorkItem, deduplicated with legacy task.verify commands and preserving exact command identity."
                  id: "criterion-canonical-check-execution"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "For implementation_rework of the matching REWORK_READY WorkItem, no scoped workspace delta reuses only the exact recorded implementation commit and can apply fresh validation evidence once; it does not create a new implementation commit."
                  id: "criterion-evidence-only-rework"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Initial completed implementation with no workspace change remains rejected, and implementation_rework with actual scoped changes still creates and records a new implementation commit."
                  id: "criterion-fail-closed-boundaries"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-lint"
                    - "check-diff"
                  description: "Focused regressions, core lint, and diff hygiene pass."
                  id: "criterion-quality"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "assertExternalImplementationReturnState"
                  - "runDirectTaskVerification"
                  - "recordExternalImplementationVerification"
                  - "recordTaskCentricExternalResult"
              depends_on: []
              expected_outputs:
                - "canonical-workitem-validation-execution"
                - "evidence-only-rework-transition"
                - "no-progress-regression-evidence"
              id: "recover-evidence-only-implementation-rework"
              objective: "Execute selected canonical WorkItem validation commands under Supervisor authority and allow a no-workspace-delta implementation_rework to reuse the exact recorded implementation identity only from REWORK_READY, so fresh passing evidence completes the WorkItem without semantic source drift."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "check-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "Supervisor verification executes and records every deterministic task.verify command required by the selected canonical WorkItem, deduplicated with legacy task.verify commands and preserving exact command identity."
                    id: "criterion-canonical-check-execution"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "For implementation_rework of the matching REWORK_READY WorkItem, no scoped workspace delta reuses only the exact recorded implementation commit and can apply fresh validation evidence once; it does not create a new implementation commit."
                    id: "criterion-evidence-only-rework"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Initial completed implementation with no workspace change remains rejected, and implementation_rework with actual scoped changes still creates and records a new implementation commit."
                    id: "criterion-fail-closed-boundaries"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-lint"
                      - "check-diff"
                    description: "Focused regressions, core lint, and diff hygiene pass."
                    id: "criterion-quality"
                    required: true
                evidence_fingerprint: "sha256:5555555555555555555555555555555555555555555555555555555555555555"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608242233-KTFFN7"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608242233-KTFFN7"
            - "git:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
          check_id: "check-focused"
          command_identity: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-25T02:10:11.037Z"
          repository_snapshot_digest: "sha256:5e090623905fb5758dcf8da3e58fe346d3f736ceb9e692bbc0e826a3dd4a04ad"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608242233-KTFFN7"
            - "git:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
          check_id: "check-lint"
          command_identity: "bun run lint:core"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-25T02:10:11.037Z"
          repository_snapshot_digest: "sha256:5e090623905fb5758dcf8da3e58fe346d3f736ceb9e692bbc0e826a3dd4a04ad"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608242233-KTFFN7"
            - "git:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
          check_id: "check-diff"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-25T02:10:11.037Z"
          repository_snapshot_digest: "sha256:5e090623905fb5758dcf8da3e58fe346d3f736ceb9e692bbc0e826a3dd4a04ad"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608242233-KTFFN7"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-24T22:33:02.485Z"
      constraints: []
      request: |-
        Allow evidence-only rework after an already committed implementation

        Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
      task_id: "202608242233-KTFFN7"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 24
    schema_version: 1
    updated_at: "2026-08-25T02:14:57.941Z"
    work_items:
      recover-evidence-only-implementation-rework:
        attempt: 1
        claim_id: null
        id: "recover-evidence-only-implementation-rework"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:3ec742986739941bb0572196a4fb5b28b4cba085b6a0761cc6aa5af0bf365993"
            id: "canonical-workitem-validation-execution"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608242233-KTFFN7"
              work_item_id: "recover-evidence-only-implementation-rework"
            provenance:
              - "sha256:4dd8e904f9604bf7da2345294ef0f344c2dc7a46db0daa1b84481c25d2e6cb15"
              - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:f14c67713dbe25dab1dcf02751a8b62bcbc2b5bf3a97e2daf4e562bdfa7ecf4e"
            id: "evidence-only-rework-transition"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608242233-KTFFN7"
              work_item_id: "recover-evidence-only-implementation-rework"
            provenance:
              - "sha256:4dd8e904f9604bf7da2345294ef0f344c2dc7a46db0daa1b84481c25d2e6cb15"
              - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:a3124c6cda11d43024ce27606ed9acc10381726540495054c82a4340ae74a152"
            id: "no-progress-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608242233-KTFFN7"
              work_item_id: "recover-evidence-only-implementation-rework"
            provenance:
              - "sha256:4dd8e904f9604bf7da2345294ef0f344c2dc7a46db0daa1b84481c25d2e6cb15"
              - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
              check_id: "check-focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-24T23:20:40.522Z"
              repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
              check_id: "check-lint"
              command_identity: "bun run lint:core"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-24T23:20:40.522Z"
              repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json"
              check_id: "check-diff"
              command_identity: "git diff --check"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-24T23:20:40.522Z"
              repository_snapshot_digest: "sha256:5eecdf4592760d7cbc3bdaeb9e1f091051ef4514f1cf270fa0153f3b23a64bd9"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608242233-KTFFN7-executor-1fb442b580428bfa99725ee3:
        aggregate_digest: "sha256:9720fa4011b3ef05b9880c05fa3025b468fde6dcbf9d8e78e87f97e6c5896724"
        event:
          actor_id: "agentplane"
          at: "2026-08-24T23:20:40.526Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_0e45b7a0c1acaff6aac22ad5"
          mutation_id: "external-result:work-order-202608242233-KTFFN7-executor-1fb442b580428bfa99725ee3"
          plan_digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608242233-KTFFN7"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "recover-evidence-only-implementation-rework"
        mutation_id: "external-result:work-order-202608242233-KTFFN7-executor-1fb442b580428bfa99725ee3"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608242233-KTFFN7"
      legacy-finish:202608242233-KTFFN7:2026-08-25T02:10:11.037Z:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba:
        aggregate_digest: "sha256:b9fab0a58f8bda803677e7e47b2bbb0c46dbfcce7b434fcf110cd54178a4b7c7"
        event:
          actor_id: "CODER"
          at: "2026-08-25T02:14:57.941Z"
          cause_refs:
            - "task-verification:202608242233-KTFFN7"
            - "git:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
          entity: "task"
          from: "ACTIVE"
          id: "event_72e1533b6a8d0fcdc39be4c1"
          mutation_id: "legacy-finish:202608242233-KTFFN7:2026-08-25T02:10:11.037Z:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
          plan_digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
          plan_revision: 1
          repository_fingerprint: "sha256:5e090623905fb5758dcf8da3e58fe346d3f736ceb9e692bbc0e826a3dd4a04ad"
          schema_version: 1
          task_id: "202608242233-KTFFN7"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608242233-KTFFN7:2026-08-25T02:10:11.037Z:6d078038f42391d1ed6bb4b1fb406b1a4c27f6ba"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202608242233-KTFFN7"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    version: 1
id_source: "generated"
---
## Summary

Allow evidence-only rework after an already committed implementation

Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.

## Scope

- In scope: Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
- Out of scope: unrelated refactors not required for "Allow evidence-only rework after an already committed implementation".

## Plan

Add one fail-closed evidence-only implementation-rework path. Supervisor verification must execute the selected canonical WorkItem's deterministic validation commands in addition to legacy task checks, and a no-delta implementation_rework may reuse the exact recorded implementation commit only for the matching REWORK_READY WorkItem. Initial no-op implementation and semantic repair with actual workspace changes retain their existing behavior.

## Verify Steps

PLANNER fallback scaffold for "Allow evidence-only rework after an already committed implementation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow evidence-only rework after an already committed implementation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-24T23:20:37.262Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:6b64bc5add45df93762c2797e3ae2d9a91a85e6da452ccfe4b11dff33a2bb5e8

Details:

Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 declared verification

Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608242233-KTFFN7 declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608242233-KTFFN7 declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608242233-KTFFN7 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

### 2026-08-24T23:31:15.369Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:5a35419a780429d1e0e543473ae9a2091a36153f143ce01de32a73d6da5f388d

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

### 2026-08-25T00:00:57.254Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:955b8ad0aec8f06fd550e6d2e0e3095d7b5bb2c72a8b997a88793e6bca9fecf2

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

### 2026-08-25T00:11:56.218Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:3ca2d24b022864814ee66161ba7161d63b1646371cbce66a84fb7f6020a6e7da

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

### 2026-08-25T02:10:11.037Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:ff33d4a286caf60aca51a29ea4645ac30c84e8e3e674c4d66cdfce18638e1c75

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check critical_paths

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608242233-KTFFN7/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608242233-KTFFN7 Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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

### 2026-08-25T02:30:43.531Z — VERIFY — needs_rework

By: EVALUATOR

Note: Hosted review rework: preserve KTFFN7 intent and address both unresolved PR #4885 threads before reintegration.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:06688da95fee77730196745baa87be27b8a0e8900b661b1f3c8aa295bb04f370, input_digest=sha256:ed360358c9744f4b995d6aa923e0402a179c8894c7596783d41d4133117d381f

Details:

PR #4885 review found two task-owned gaps in canonical WorkItem check projection: optional checks can incorrectly fail the task, and per-check timeout_ms is discarded. Repair both within the approved source/test roots, add regressions, rerun focused and full verification, then republish the exact reviewed head.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608242233-KTFFN7-allow-evidence-only-rework-after-an-already-comm/.agentplane/tasks/202608242233-KTFFN7/blueprint/resolved-snapshot.json
- old_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- current_digest: a5aaffc0bb7335d9b87df4bb1c8608cdb7d6d06a1d77387c38012f4c3dfb99fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608242233-KTFFN7

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
- Completeness: `0/7` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:9edaf5ca5f950032c4e257bcf5d1ae701633e78789a2af9f6e5f1743d61573db`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-25T02:14:57.941Z`
