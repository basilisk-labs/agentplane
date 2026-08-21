---
id: "202608212254-WR57ZD"
title: "Accept exact tree identity for GitHub rebase cleanup"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
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
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
      - "task_outcome"
commit:
  hash: "4a1e3b5de0c042bbb3519d9cad836cad4629f453"
  message: "🚧 WR57ZD task: apply external agent result"
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
doc_version: 3
doc_updated_at: "2026-08-21T23:11:16.706Z"
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
    source: "creation_checkout"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
