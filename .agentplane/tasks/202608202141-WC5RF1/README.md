---
id: "202608202141-WC5RF1"
title: "Improve the root README around the semantic-agent and deterministic-CLI boundary"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T22:05:30.620Z"
  updated_by: "USER"
  note: "User approved the prepared plan in the Codex dialogue on 2026-08-21."
verification:
  state: "ok"
  updated_at: "2026-08-20T22:18:08.019Z"
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
      - "documentation"
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "README.md"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "No network, credentials, publication, deployment, merge, code, schema, or generated-artifact effects are required."
      - "The repository policy enforces branch_pr for this mutation."
      - "The requested change is a reversible documentation-only rewrite of the root README."
    repository_effects:
      - "documentation"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "README.md"
  observed:
    authority_violations: []
    changed_components:
      - "README.md"
    changed_paths:
      - "README.md"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
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
          - "README.md"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:30b20e6658ee0f44fe42b8dad9b5a20e76e3844341f28112c28df4fcafbe05d5"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
      observed:
        changed_components:
          - "README.md"
        changed_files:
          - "README.md"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "task_outcome"
commit:
  hash: "7d0cee50ba5a9f310b6537a299ea459486f6e627"
  message: "🚧 WC5RF1 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7d0cee50ba5a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-20T22:06:47.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T22:17:00.127Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7d0cee50ba5a. CLI accepted one state-bound external-agent semantic result."
    commit: "7d0cee50ba5a9f310b6537a299ea459486f6e627"
  -
    type: "verify"
    at: "2026-08-20T22:18:08.019Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-20T22:18:16.632Z"
doc_updated_by: "SUPERVISOR"
description: "Improve the root README around the semantic-agent and deterministic-CLI boundary"
sections:
  Summary: |-
    Improve the root README around the semantic-agent and deterministic-CLI boundary

    Improve the root README around the semantic-agent and deterministic-CLI boundary
  Scope: |-
    - In scope: Improve the root README around the semantic-agent and deterministic-CLI boundary.
    - Out of scope: unrelated refactors not required for "Improve the root README around the semantic-agent and deterministic-CLI boundary".
  Plan: "Rewrite the root README as a concise product entry point centered on the human-agent-control-plane split, with an executable quick start, a compact workflow explanation, and clear documentation routes."
  Verify Steps: |-
    PLANNER fallback scaffold for "Improve the root README around the semantic-agent and deterministic-CLI boundary". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Improve the root README around the semantic-agent and deterministic-CLI boundary". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-20T22:18:08.019Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:db1ef94ab77cfe1d02b3f5995262b0482f94697efed012384b6c15b0740196a0, input_digest=sha256:746d893fa39b04935120499cb7780f1e0b93d31dd912f08e3ea121b839acf42b

    Details:

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check docs_contract

    Check: hosted_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check hosted_integration

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202141-WC5RF1-improve-the-root-readme-around-the-semantic-agen/.agentplane/tasks/202608202141-WC5RF1/blueprint/resolved-snapshot.json
    - old_digest: a248e393dac1bbd033b4170944771af2eefd6ac9878f769982a5b08e518c2946
    - current_digest: a248e393dac1bbd033b4170944771af2eefd6ac9878f769982a5b08e518c2946
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202141-WC5RF1

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
  implementation_commit:
    hash: "7d0cee50ba5a9f310b6537a299ea459486f6e627"
  workflow_route_baseline:
    start_head_sha: "60be0145753e9e2aecf31f4bbd8471895db13395"
    version: 1
id_source: "generated"
---
## Summary

Improve the root README around the semantic-agent and deterministic-CLI boundary

Improve the root README around the semantic-agent and deterministic-CLI boundary

## Scope

- In scope: Improve the root README around the semantic-agent and deterministic-CLI boundary.
- Out of scope: unrelated refactors not required for "Improve the root README around the semantic-agent and deterministic-CLI boundary".

## Plan

Rewrite the root README as a concise product entry point centered on the human-agent-control-plane split, with an executable quick start, a compact workflow explanation, and clear documentation routes.

## Verify Steps

PLANNER fallback scaffold for "Improve the root README around the semantic-agent and deterministic-CLI boundary". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Improve the root README around the semantic-agent and deterministic-CLI boundary". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-20T22:18:08.019Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:db1ef94ab77cfe1d02b3f5995262b0482f94697efed012384b6c15b0740196a0, input_digest=sha256:746d893fa39b04935120499cb7780f1e0b93d31dd912f08e3ea121b839acf42b

Details:

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check docs_contract

Check: hosted_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check hosted_integration

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202141-WC5RF1/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202141-WC5RF1 Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202141-WC5RF1-improve-the-root-readme-around-the-semantic-agen/.agentplane/tasks/202608202141-WC5RF1/blueprint/resolved-snapshot.json
- old_digest: a248e393dac1bbd033b4170944771af2eefd6ac9878f769982a5b08e518c2946
- current_digest: a248e393dac1bbd033b4170944771af2eefd6ac9878f769982a5b08e518c2946
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202141-WC5RF1

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
