---
id: "202609040640-2AHA42"
title: "Atomically invalidate stale semantic execution state during replan"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "compatibility-defect"
  - "meta"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run test:agentplane"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    preferred_mode: "branch_pr"
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
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-04T06:40:42.427Z"
doc_updated_by: "CODER"
description: "Symptom: after a normal replan through ap task plan set, a stale task-centric planning marker can survive and keep the current WorkItem unschedulable. Violated invariant: a replan must atomically replace all plan-bound semantic packet, result, and planning state so the next required WorkItem is schedulable from one canonical revision. Cause: plan replacement does not invalidate every task-centric execution artifact bound to the previous plan revision. Temporary recovery: use the AgentPlane-owned ap task advance --replacement --agent-json route and consume the new structured packet with required_inputs: []. Permanent fix: make plan set/replan atomically invalidate or replace stale semantic packets, results, and planning markers, then emit a schedulable WorkItem without manual state edits. Regression test: plan set and approval after rework must schedule the new WorkItem, ignore the old marker, preserve revision consistency, and require no manual projection repair."
sections:
  Summary: |-
    Atomically invalidate stale semantic execution state during replan

    Symptom: after a normal replan through ap task plan set, a stale task-centric planning marker can survive and keep the current WorkItem unschedulable. Violated invariant: a replan must atomically replace all plan-bound semantic packet, result, and planning state so the next required WorkItem is schedulable from one canonical revision. Cause: plan replacement does not invalidate every task-centric execution artifact bound to the previous plan revision. Temporary recovery: use the AgentPlane-owned ap task advance --replacement --agent-json route and consume the new structured packet with required_inputs: []. Permanent fix: make plan set/replan atomically invalidate or replace stale semantic packets, results, and planning markers, then emit a schedulable WorkItem without manual state edits. Regression test: plan set and approval after rework must schedule the new WorkItem, ignore the old marker, preserve revision consistency, and require no manual projection repair.
  Scope: |-
    - In scope: Symptom: after a normal replan through ap task plan set, a stale task-centric planning marker can survive and keep the current WorkItem unschedulable. Violated invariant: a replan must atomically replace all plan-bound semantic packet, result, and planning state so the next required WorkItem is schedulable from one canonical revision. Cause: plan replacement does not invalidate every task-centric execution artifact bound to the previous plan revision. Temporary recovery: use the AgentPlane-owned ap task advance --replacement --agent-json route and consume the new structured packet with required_inputs: []. Permanent fix: make plan set/replan atomically invalidate or replace stale semantic packets, results, and planning markers, then emit a schedulable WorkItem without manual state edits. Regression test: plan set and approval after rework must schedule the new WorkItem, ignore the old marker, preserve revision consistency, and require no manual projection repair.
    - Out of scope: unrelated refactors not required for "Atomically invalidate stale semantic execution state during replan".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Atomically invalidate stale semantic execution state during replan". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Atomically invalidate stale semantic execution state during replan". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
id_source: "generated"
---
## Summary

Atomically invalidate stale semantic execution state during replan

Symptom: after a normal replan through ap task plan set, a stale task-centric planning marker can survive and keep the current WorkItem unschedulable. Violated invariant: a replan must atomically replace all plan-bound semantic packet, result, and planning state so the next required WorkItem is schedulable from one canonical revision. Cause: plan replacement does not invalidate every task-centric execution artifact bound to the previous plan revision. Temporary recovery: use the AgentPlane-owned ap task advance --replacement --agent-json route and consume the new structured packet with required_inputs: []. Permanent fix: make plan set/replan atomically invalidate or replace stale semantic packets, results, and planning markers, then emit a schedulable WorkItem without manual state edits. Regression test: plan set and approval after rework must schedule the new WorkItem, ignore the old marker, preserve revision consistency, and require no manual projection repair.

## Scope

- In scope: Symptom: after a normal replan through ap task plan set, a stale task-centric planning marker can survive and keep the current WorkItem unschedulable. Violated invariant: a replan must atomically replace all plan-bound semantic packet, result, and planning state so the next required WorkItem is schedulable from one canonical revision. Cause: plan replacement does not invalidate every task-centric execution artifact bound to the previous plan revision. Temporary recovery: use the AgentPlane-owned ap task advance --replacement --agent-json route and consume the new structured packet with required_inputs: []. Permanent fix: make plan set/replan atomically invalidate or replace stale semantic packets, results, and planning markers, then emit a schedulable WorkItem without manual state edits. Regression test: plan set and approval after rework must schedule the new WorkItem, ignore the old marker, preserve revision consistency, and require no manual projection repair.
- Out of scope: unrelated refactors not required for "Atomically invalidate stale semantic execution state during replan".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Atomically invalidate stale semantic execution state during replan". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Atomically invalidate stale semantic execution state during replan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
