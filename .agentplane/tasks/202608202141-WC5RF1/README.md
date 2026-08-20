---
id: "202608202141-WC5RF1"
title: "Improve the root README around the semantic-agent and deterministic-CLI boundary"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
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
      digest: "sha256:b93612aaf5983b6c59a50ee903610427f87e45a708da6699a96b8590a73cccbc"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-20T22:06:47.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-20T22:06:47.263Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
