---
id: "202608171106-XFN696"
title: "Add policy-driven autonomous side-effect authority"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "code"
  - "security"
  - "ux"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/authority-grant.command.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/core/src/config/config.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-17T11:57:31.790Z"
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
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
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
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
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
    - "repository_mode_selected"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
      escalation_reasons: []
      execution_groups:
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
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-17T11:57:53.595Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-17T11:57:53.595Z"
doc_updated_by: "CODER"
description: "Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list."
sections:
  Summary: |-
    Add policy-driven autonomous side-effect authority

    Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.
  Scope: |-
    - In scope: Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.
    - Out of scope: unrelated refactors not required for "Add policy-driven autonomous side-effect authority".
  Plan: "Add a backward-compatible repository autonomy configuration with manual default, policy allowlist, and explicit all/YOLO mode. A configured POLICY actor may auto-approve prepared plans only when the repository policy explicitly enables plan auto-approval, and may auto-grant state-bound side-effect operations according to allow/deny rules; agents must never impersonate USER. Preserve operation, state, and scope digests, short TTL, durable audit, fail-closed actor/config validation, and separate deny rules for integration or destructive effects. Make task begin and supervisor routing honor require_plan=false and the configured policy decision consistently. Fix authority grant remote/local route drift so stale hosted requests return the fresh route and actionable reason instead of incorrectly reporting that no grant is required. Cover manual compatibility, plan approval, allow/deny, all mode, stale provider drift, expiry, audit, and runner behavior; update operator documentation; run focused tests, typecheck, lint, routing policy, and full required verification before publication."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/authority-grant.command.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/core/src/config/config.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
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
    start_head_sha: "89f760183da24c5a768dfe97e6c4c2fb67bd1478"
    version: 1
id_source: "generated"
---
## Summary

Add policy-driven autonomous side-effect authority

Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.

## Scope

- In scope: Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.
- Out of scope: unrelated refactors not required for "Add policy-driven autonomous side-effect authority".

## Plan

Add a backward-compatible repository autonomy configuration with manual default, policy allowlist, and explicit all/YOLO mode. A configured POLICY actor may auto-approve prepared plans only when the repository policy explicitly enables plan auto-approval, and may auto-grant state-bound side-effect operations according to allow/deny rules; agents must never impersonate USER. Preserve operation, state, and scope digests, short TTL, durable audit, fail-closed actor/config validation, and separate deny rules for integration or destructive effects. Make task begin and supervisor routing honor require_plan=false and the configured policy decision consistently. Fix authority grant remote/local route drift so stale hosted requests return the fresh route and actionable reason instead of incorrectly reporting that no grant is required. Cover manual compatibility, plan approval, allow/deny, all mode, stale provider drift, expiry, audit, and runner behavior; update operator documentation; run focused tests, typecheck, lint, routing policy, and full required verification before publication.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/authority-grant.command.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/core/src/config/config.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
