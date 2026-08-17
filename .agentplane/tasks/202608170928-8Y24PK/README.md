---
id: "202608170928-8Y24PK"
title: "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "hermes"
  - "agentplane"
  - "worker-lane"
  - "runner"
  - "integration"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
  - "security"
  - "external_system"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-17T09:29:25.839Z"
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
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
      - "ci"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
    writable_roots:
      - "agentplane-recipes/recipes/hermes-agentplane"
      - "docs/recipes/hermes-agentplane.mdx"
      - "docs/workflow-guides/hermes-kanban.mdx"
      - "integrations/hermes-agentplane-plugin"
      - "packages/agentplane/src/cli/run-cli/commands/init"
      - "packages/agentplane/src/commands/hermes"
      - "packages/agentplane/src/runner"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch and PR isolation are required because the Hermes upstream branch is stale and external publication must remain separately authorized."
      - "The integration spans three versioned repositories and changes a public worker-lane and runner protocol."
      - "The security boundary changes environment inheritance, workspace allowlists, current-run guards, and terminal completion authority."
    repository_effects:
      - "ci"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "agentplane-recipes/recipes/hermes-agentplane"
      - "docs/recipes/hermes-agentplane.mdx"
      - "docs/workflow-guides/hermes-kanban.mdx"
      - "integrations/hermes-agentplane-plugin"
      - "packages/agentplane/src/cli/run-cli/commands/init"
      - "packages/agentplane/src/commands/hermes"
      - "packages/agentplane/src/runner"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
          - "agentplane-recipes/recipes/hermes-agentplane"
          - "docs/recipes/hermes-agentplane.mdx"
          - "docs/workflow-guides/hermes-kanban.mdx"
          - "integrations/hermes-agentplane-plugin"
          - "packages/agentplane/src/cli/run-cli/commands/init"
          - "packages/agentplane/src/commands/hermes"
          - "packages/agentplane/src/runner"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:ci"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "ci"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:81e3a12755eee39db40c879d194fba2c566d18a797031c29ca2466ff7661aae5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli/commands/init"
        - "effect_ci"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
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
        - "docs_contract"
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
      - "implementation_risk_validation"
      - "repository_effect:ci"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-17T09:29:36.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-17T09:29:36.776Z"
doc_updated_by: "CODER"
description: "Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published."
sections:
  Summary: |-
    Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories

    Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
  Scope: |-
    - In scope: Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
    - Out of scope: unrelated refactors not required for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories".
  Plan: "Implement the approved three-repository Hermes integration in dependency order: establish the AgentPlane 0.7.6 fail-closed bridge contract and terminal attestation; release an external plugin 0.2.0 that drives the canonical task advance exchange and managed runner result transport; refresh the Hermes worker-lane registry hook on current upstream main; then prove the installed-package PLANNER, approval, EXECUTOR, EVALUATOR, retry, stale-run, and terminal-completion paths without direct kanban.db writes. Preserve the obsolete D5MAJ3 worktree and failed DDW1J5 intake, and stop at every AgentPlane authority or external-provider boundary."
  Verify Steps: |-
    PLANNER fallback scaffold for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "89f760183da24c5a768dfe97e6c4c2fb67bd1478"
    version: 1
id_source: "generated"
---
## Summary

Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories

Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.

## Scope

- In scope: Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
- Out of scope: unrelated refactors not required for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories".

## Plan

Implement the approved three-repository Hermes integration in dependency order: establish the AgentPlane 0.7.6 fail-closed bridge contract and terminal attestation; release an external plugin 0.2.0 that drives the canonical task advance exchange and managed runner result transport; refresh the Hermes worker-lane registry hook on current upstream main; then prove the installed-package PLANNER, approval, EXECUTOR, EVALUATOR, retry, stale-run, and terminal-completion paths without direct kanban.db writes. Preserve the obsolete D5MAJ3 worktree and failed DDW1J5 intake, and stop at every AgentPlane authority or external-provider boundary.

## Verify Steps

PLANNER fallback scaffold for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
