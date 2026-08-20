---
id: "202608202133-1C8P0N"
title: "Add AP-TE Lite to framework agent instructions"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run agents:check"
  - "bun run assets:builtin:check"
  - "bun run format:changed"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T21:34:44.238Z"
  updated_by: "USER"
  note: "User approved implementation and the generated asset scope in this conversation."
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
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/assets/agents"
      - "packages/agentplane/src/shared/builtin-assets.generated.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The generated built-in table is required to publish the changed framework prompt asset."
      - "The role-profile directory is included for audit and only direct conflicts may be edited."
      - "The user approved a separate branch and the generated source-code effect."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/assets/agents"
      - "packages/agentplane/src/shared/builtin-assets.generated.ts"
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
          - "packages/agentplane/assets/AGENTS.md"
          - "packages/agentplane/assets/agents"
          - "packages/agentplane/src/shared/builtin-assets.generated.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:a5967a84d1f25ba9c8071108719d781e32465f828dd5d07691d88524d33d2ced"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "1b3a79d06829e04bc250e824c42aedad541711f8"
  message: "🚧 1C8P0N task: add AP-TE Lite to agent instructions"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed after AP-TE Lite, generated asset, role prompt audit, and required checks passed."
events:
  -
    type: "status"
    at: "2026-08-20T21:35:27.222Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:35:39.851Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:40:54.481Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed after AP-TE Lite, generated asset, role prompt audit, and required checks passed."
    commit: "1b3a79d06829e04bc250e824c42aedad541711f8"
doc_version: 3
doc_updated_at: "2026-08-20T21:40:54.481Z"
doc_updated_by: "CODER"
description: "Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite."
sections:
  Summary: |-
    Add AP-TE Lite to framework agent instructions

    Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
  Scope: |-
    - In scope: Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
    - Out of scope: unrelated refactors not required for "Add AP-TE Lite to framework agent instructions".
  Plan: "Prepared the replacement code-task plan for AP-TE Lite and its generated built-in projection."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run assets:builtin:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Add AP-TE Lite to framework agent instructions

Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.

## Scope

- In scope: Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
- Out of scope: unrelated refactors not required for "Add AP-TE Lite to framework agent instructions".

## Plan

Prepared the replacement code-task plan for AP-TE Lite and its generated built-in projection.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run assets:builtin:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
