---
id: "202608212254-WR57ZD"
title: "Accept exact tree identity for GitHub rebase cleanup"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "github"
  - "rebase"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T22:55:01.360Z"
  updated_by: "USER"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-21T23:19:05.406Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts"
  attempts: 1
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:tests"
      - "verification:recorded-check-1:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:db0c48eb9c6825d069cbf57f0afd2ad4f7a4b9835023690e20b2f1efc738ea64"
      escalation_reasons:
        - "effect_release_metadata"
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
          - "packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts"
          - "packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
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
    author: "CODER"
    body: "Implementation committed: accept exact tree identity only for single-parent GitHub rebase merge receipts; focused cleanup reconciliation tests pass."
events:
  -
    type: "status"
    at: "2026-08-21T22:56:05.511Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-21T23:11:16.706Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: accept exact tree identity only for single-parent GitHub rebase merge receipts; focused cleanup reconciliation tests pass."
    commit: "4a1e3b5de0c042bbb3519d9cad836cad4629f453"
  -
    type: "verify"
    at: "2026-08-21T23:19:05.406Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts"
doc_version: 3
doc_updated_at: "2026-08-21T23:19:08.913Z"
doc_updated_by: "CODER"
description: "Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE."
sections:
  Summary: |-
    Accept exact tree identity for GitHub rebase cleanup

    Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.
  Scope: |-
    - In scope: Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.
    - Out of scope: unrelated refactors not required for "Accept exact tree identity for GitHub rebase cleanup".
  Plan: |-
    1. Inspect cleanup reconciliation and focused rebase/receipt tests.
    2. Add fail-closed exact tree-identity proof before the ancestry-only path while preserving identity, object, task, and provider receipt validation.
    3. Add positive single-parent rebase-merge and negative differing-tree regression coverage; run the assigned focused tests.
    4. Return the semantic result to AgentPlane, then let AgentPlane publish, verify, integrate, hosted-close, and clean the affected task artifacts.
  Verify Steps: |-
    PLANNER fallback scaffold for "Accept exact tree identity for GitHub rebase cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Accept exact tree identity for GitHub rebase cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-21T23:19:05.406Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6adfa243d96b84d2717ef10120008e32a4ba9da884c709e3af04bc572f92ec31, input_digest=sha256:f0b769547ca264fb65928aec21ea87e0d96530be3de77495afad0e3536d3122e

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202608212254-WR57ZD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608212254-WR57ZD declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608212254-WR57ZD-accept-exact-tree-identity-for-github-rebase-cle/.agentplane/tasks/202608212254-WR57ZD/blueprint/resolved-snapshot.json
    - old_digest: f5e933c531525da8a83036a4f85f7fec8d7fb2f4dfb39e9455f48bafbb0cb09d
    - current_digest: f5e933c531525da8a83036a4f85f7fec8d7fb2f4dfb39e9455f48bafbb0cb09d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608212254-WR57ZD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608212254-WR57ZD
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
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:b6f8eb36251e6460611149cc225e3187e50fc0aec9cefeceff1d6bdee5d082fb"
    digest: "sha256:4553555060e56415fa6b5d5aeeca3dd4f63b5055fff8458110dee75dad31ed2e"
    grant_id: "56b9a26e-47cd-4fba-a484-861dca3d8d6c"
    issued_at: "2026-08-21T22:55:01.360Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:6a93975b9b1ae14877b6dc95d58d78fab7e885b3320a1a128609684718b36121"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:9d184cc08e42b27e663e0671350973301ae7755764cebbae4c11086e6175ebcf"
    status: "active"
    task_id: "202608212254-WR57ZD"
  task_execution_context:
    base_ref: "main"
    base_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    version: 1
id_source: "generated"
---
## Summary

Accept exact tree identity for GitHub rebase cleanup

Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.

## Scope

- In scope: Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.
- Out of scope: unrelated refactors not required for "Accept exact tree identity for GitHub rebase cleanup".

## Plan

1. Inspect cleanup reconciliation and focused rebase/receipt tests.
2. Add fail-closed exact tree-identity proof before the ancestry-only path while preserving identity, object, task, and provider receipt validation.
3. Add positive single-parent rebase-merge and negative differing-tree regression coverage; run the assigned focused tests.
4. Return the semantic result to AgentPlane, then let AgentPlane publish, verify, integrate, hosted-close, and clean the affected task artifacts.

## Verify Steps

PLANNER fallback scaffold for "Accept exact tree identity for GitHub rebase cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Accept exact tree identity for GitHub rebase cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-21T23:19:05.406Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6adfa243d96b84d2717ef10120008e32a4ba9da884c709e3af04bc572f92ec31, input_digest=sha256:f0b769547ca264fb65928aec21ea87e0d96530be3de77495afad0e3536d3122e

Details:

Command: bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts
Result: fail
Evidence: .agentplane/tasks/202608212254-WR57ZD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608212254-WR57ZD declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608212254-WR57ZD-accept-exact-tree-identity-for-github-rebase-cle/.agentplane/tasks/202608212254-WR57ZD/blueprint/resolved-snapshot.json
- old_digest: f5e933c531525da8a83036a4f85f7fec8d7fb2f4dfb39e9455f48bafbb0cb09d
- current_digest: f5e933c531525da8a83036a4f85f7fec8d7fb2f4dfb39e9455f48bafbb0cb09d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608212254-WR57ZD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608212254-WR57ZD
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
