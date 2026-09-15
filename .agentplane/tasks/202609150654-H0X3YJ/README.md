---
id: "202609150654-H0X3YJ"
title: "Fix active-runtime install reuse on v0.6"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-15T06:54:26.249Z"
  updated_by: "USER"
  note: "Approved in the current conversation for the bounded guard repair and v0.6.30 release continuation."
verification:
  state: "ok"
  updated_at: "2026-09-15T20:32:34.639Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-09-15T20:33:44.271Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "4efe98151697964fc9b87a3a6441ca6960cee26e"
  blueprint_digest: "d539653fa7913736ead798f543627bccebd858284d1d1826decdcca7f8cb22c9"
  evidence_refs:
    - ".agentplane/tasks/202609150654-H0X3YJ/README.md"
    - ".agentplane/tasks/202609150654-H0X3YJ/quality/20260915-203344271-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609150654-H0X3YJ/quality/20260915-203344271-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202609150654-H0X3YJ/quality/20260915-203344271-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; current diff is limited to the runtime guard, deterministic regression tests, and task evidence, and both declared checks pass."
commit:
  hash: "4efe98151697964fc9b87a3a6441ca6960cee26e"
  message: "🚧 H0X3YJ task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7ac9524bb5af. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation is unchanged and the full regression suite passes. Formal verification cannot recover until the legacy execution contract permits the test effect already required by the approved task. Recommended action: Approve the pending scope extension for repository effect tests. Replace the focused Verify Step with the already-passing workspace command. Requested scope: roots=unchanged; repository effects=tests; request digest=sha256:25af6765bf66fbbdacb33df7be8d1ed39c78a1895de49b154712485d032dc360. Agentplane receipt: external-agent-blocker/tr_74db211e7aa895c6e7fcd95e1705d3c1/sha256:fa39f2df3da07470ade3a50cfe16c6ce0a6ebe03a047146df2559d997df7f076/sha256:25af6765bf66fbbdacb33df7be8d1ed39c78a1895de49b154712485d032dc360."
  -
    author: "SUPERVISOR"
    body: "Resume implementation rework to replace the invalid rootless scope-extension request with the approved test scope."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation remains complete. Formal recovery requires a corrected scope extension that includes the approved implementation and test root. Recommended action: Apply the exact USER-approved scope extension and issue a freshly scoped executor episode. Requested scope: roots=packages/agentplane/src; repository effects=tests; request digest=sha256:b2eae1a392340b123fd25c6db7fe2d613f430a9080566071c39d1e4eaaf70853. Agentplane receipt: external-agent-blocker/tr_fa80cb8b461c2e6d9c12db8e35e9e036/sha256:5ec8130d629288581d70bdb4b203dc1ada60f6224b1f1e3975a36ebe57642212/sha256:b2eae1a392340b123fd25c6db7fe2d613f430a9080566071c39d1e4eaaf70853."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 72149ad2afe7. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4efe98151697. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-15T06:55:00.939Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-15T07:13:13.670Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7ac9524bb5af. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-09-15T07:15:58.142Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
  -
    type: "status"
    at: "2026-09-15T07:18:33.419Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation is unchanged and the full regression suite passes. Formal verification cannot recover until the legacy execution contract permits the test effect already required by the approved task. Recommended action: Approve the pending scope extension for repository effect tests. Replace the focused Verify Step with the already-passing workspace command. Requested scope: roots=unchanged; repository effects=tests; request digest=sha256:25af6765bf66fbbdacb33df7be8d1ed39c78a1895de49b154712485d032dc360. Agentplane receipt: external-agent-blocker/tr_74db211e7aa895c6e7fcd95e1705d3c1/sha256:fa39f2df3da07470ade3a50cfe16c6ce0a6ebe03a047146df2559d997df7f076/sha256:25af6765bf66fbbdacb33df7be8d1ed39c78a1895de49b154712485d032dc360."
  -
    type: "status"
    at: "2026-09-15T20:04:04.956Z"
    author: "SUPERVISOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume implementation rework to replace the invalid rootless scope-extension request with the approved test scope."
  -
    type: "status"
    at: "2026-09-15T20:04:55.731Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation remains complete. Formal recovery requires a corrected scope extension that includes the approved implementation and test root. Recommended action: Apply the exact USER-approved scope extension and issue a freshly scoped executor episode. Requested scope: roots=packages/agentplane/src; repository effects=tests; request digest=sha256:b2eae1a392340b123fd25c6db7fe2d613f430a9080566071c39d1e4eaaf70853. Agentplane receipt: external-agent-blocker/tr_fa80cb8b461c2e6d9c12db8e35e9e036/sha256:5ec8130d629288581d70bdb4b203dc1ada60f6224b1f1e3975a36ebe57642212/sha256:b2eae1a392340b123fd25c6db7fe2d613f430a9080566071c39d1e4eaaf70853."
  -
    type: "status"
    at: "2026-09-15T20:18:37.716Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 72149ad2afe7. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-09-15T20:20:32.881Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-15T20:30:15.072Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4efe98151697. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-09-15T20:32:34.639Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-09-15T20:32:35.360Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish."
sections:
  Summary: |-
    Fix active-runtime install reuse on v0.6

    Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
  Scope: |-
    - In scope: Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
    - Out of scope: unrelated refactors not required for "Fix active-runtime install reuse on v0.6".
  Plan: |-
    1. Update `isReusableWorkspaceInstallLayout` to validate `node_modules` and declared dependency roots against the repository that owns `sourceRoot`, not the unrelated target repository.
    2. Preserve fail-closed rejection for missing manifests, dangling targets, task-worktree-owned targets, and targets outside the source repository.
    3. Add focused coverage for valid cross-repository reuse and retain the existing runtime bootstrap integration cases.
    4. Run focused tests and `bun run ci:local:full`; then open a PR only to `codex/release-v0.6.27-reclaim-fix` and require hosted CI.
  Verify Steps: |-
    1. Run `bun run ci:local:full`. Expected: the complete local regression suite passes.
    2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts`. Expected: cross-repository active-runtime reuse passes while dangling, task-worktree-owned, and external layouts remain rejected.
    3. Inspect the final diff. Expected: only the two approved implementation and test paths plus task evidence change; no release metadata or unrelated refactor is included.
    4. Verify hosted CI on the exact PR head. Expected: all required checks pass before merge to `codex/release-v0.6.27-reclaim-fix`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-15T07:15:58.142Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:90a655d46980e7603d596905d420e1fd68e573465809fdbe7d4444004e728b69, input_digest=sha256:8b0ef1494333123576dbe1ab008ba000c23f2a1b4ce0f228c3cb12d725de9107

    Details:

    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609150654-H0X3YJ declared verification

    Command: bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609150654-H0X3YJ declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
    - old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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

    ### 2026-09-15T20:20:32.881Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:aec20a37d124f7eaf8fdf0805aaa798d6fb454fbb66364aa82e138c9b1beb721, input_digest=sha256:a4a94ed2d7f1d6e37e3aece1b6373796d95efa5be501c8978e77d09dffa93886

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609150654-H0X3YJ declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
    - old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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

    ### 2026-09-15T20:32:34.639Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:aec20a37d124f7eaf8fdf0805aaa798d6fb454fbb66364aa82e138c9b1beb721, input_digest=sha256:90d3f0194465ceb4d15c388e0d06ee1949790c827aa499510c3c34146703ffd2

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check critical_paths (2/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
    - old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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
  agentplane.scope_extension_request:
    applied_at: "2026-09-15T20:05:47.419Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:5ec8130d629288581d70bdb4b203dc1ada60f6224b1f1e3975a36ebe57642212"
    kind: "task_scope_extension_request"
    request:
      rationale: "The approved task changes implementation and regression tests under packages/agentplane/src. The legacy rootless execution declaration must be migrated to that exact root and allow tests."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src"
    request_digest: "sha256:b2eae1a392340b123fd25c6db7fe2d613f430a9080566071c39d1e4eaaf70853"
    schema_version: 1
    status: "applied"
    transition_id: "tr_fa80cb8b461c2e6d9c12db8e35e9e036"
    work_item_id: null
  implementation_commit:
    hash: "4efe98151697964fc9b87a3a6441ca6960cee26e"
  task_execution_context:
    base_ref: "codex/release-v0.6.27-reclaim-fix"
    base_sha: "cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9"
    repository_identity: null
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9"
    version: 1
id_source: "generated"
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
      - "packages/agentplane/src"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src; repository_effects=tests"
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
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
        id: "verification-record"
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
          - "packages/agentplane/src"
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
      digest: "sha256:5fa31af598327a352ab2fe51b808b6ceccff0a6e4870d09b3e4de2271a377bf7"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
---
## Summary

Fix active-runtime install reuse on v0.6

Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.

## Scope

- In scope: Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
- Out of scope: unrelated refactors not required for "Fix active-runtime install reuse on v0.6".

## Plan

1. Update `isReusableWorkspaceInstallLayout` to validate `node_modules` and declared dependency roots against the repository that owns `sourceRoot`, not the unrelated target repository.
2. Preserve fail-closed rejection for missing manifests, dangling targets, task-worktree-owned targets, and targets outside the source repository.
3. Add focused coverage for valid cross-repository reuse and retain the existing runtime bootstrap integration cases.
4. Run focused tests and `bun run ci:local:full`; then open a PR only to `codex/release-v0.6.27-reclaim-fix` and require hosted CI.

## Verify Steps

1. Run `bun run ci:local:full`. Expected: the complete local regression suite passes.
2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts`. Expected: cross-repository active-runtime reuse passes while dangling, task-worktree-owned, and external layouts remain rejected.
3. Inspect the final diff. Expected: only the two approved implementation and test paths plus task evidence change; no release metadata or unrelated refactor is included.
4. Verify hosted CI on the exact PR head. Expected: all required checks pass before merge to `codex/release-v0.6.27-reclaim-fix`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-15T07:15:58.142Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:90a655d46980e7603d596905d420e1fd68e573465809fdbe7d4444004e728b69, input_digest=sha256:8b0ef1494333123576dbe1ab008ba000c23f2a1b4ce0f228c3cb12d725de9107

Details:

Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609150654-H0X3YJ declared verification

Command: bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
Result: fail
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609150654-H0X3YJ declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
- old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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

### 2026-09-15T20:20:32.881Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:aec20a37d124f7eaf8fdf0805aaa798d6fb454fbb66364aa82e138c9b1beb721, input_digest=sha256:a4a94ed2d7f1d6e37e3aece1b6373796d95efa5be501c8978e77d09dffa93886

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609150654-H0X3YJ declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
- old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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

### 2026-09-15T20:32:34.639Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:aec20a37d124f7eaf8fdf0805aaa798d6fb454fbb66364aa82e138c9b1beb721, input_digest=sha256:90d3f0194465ceb4d15c388e0d06ee1949790c827aa499510c3c34146703ffd2

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check critical_paths (2/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609150654-H0X3YJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609150654-H0X3YJ Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609150654-H0X3YJ-fix-active-runtime-reuse-v0-6/.agentplane/tasks/202609150654-H0X3YJ/blueprint/resolved-snapshot.json
- old_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- current_digest: a07deb437a1312a6ee3031ad1aae4d775183554bbc915015d13bd085e2efb485
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609150654-H0X3YJ

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
