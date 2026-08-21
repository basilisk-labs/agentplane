---
id: "202608211020-FGAPJC"
title: "Implement task-scoped autonomous execution after one user-approved plan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T11:11:43.312Z"
  updated_by: "USER"
  note: "Approved in Codex: implement one-confirmation autonomous execution"
verification:
  state: "needs_rework"
  updated_at: "2026-08-21T11:17:30.277Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run check"
  attempts: 2
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
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
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/developer"
      - "docs/recipes"
      - "docs/user"
      - "packages/agentplane/assets"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/runtime"
      - "packages/core/schemas"
      - "packages/core/src/config"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "One approved plan must compile into durable task-scoped authority instead of repeated approval boundaries."
      - "The authority resolver, workflow reducer, supervisor, effect leases, workspace allocation, compatibility migration, and documentation form one coherent execution contract."
      - "branch_pr remains the repository floor and provides isolated implementation and review for the security-boundary change."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/recipes"
      - "docs/user"
      - "packages/agentplane/assets"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/runtime"
      - "packages/core/schemas"
      - "packages/core/src/config"
      - "packages/core/src/tasks"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "docs/developer/task-execution-authority.mdx"
      - "docs/user/branching-and-pr-artifacts.mdx"
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/configured-authority.test.ts"
      - "packages/agentplane/src/commands/task/configured-authority.ts"
      - "packages/agentplane/src/commands/task/create.command.ts"
      - "packages/agentplane/src/commands/task/new.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/plan-execution-grant.test.ts"
      - "packages/core/src/tasks/plan-execution-grant.ts"
      - "packages/core/src/tasks/task-execution-base.ts"
      - "packages/core/src/tasks/task-store.ts"
      - "packages/core/src/tasks/tasks-export.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
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
          - "docs/developer"
          - "docs/recipes"
          - "docs/user"
          - "packages/agentplane/assets"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/doctor"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/agentplane/src/runtime"
          - "packages/core/schemas"
          - "packages/core/src/config"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0f1dfb8a708c5f9be29d81fec548df028fc11f0519f4463ee1aa8b812a24ce96"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/config"
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.test.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.ts"
        - "central_path:packages/core/src/tasks/task-execution-base.ts"
        - "central_path:packages/core/src/tasks/task-store.ts"
        - "central_path:packages/core/src/tasks/tasks-export.ts"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "docs/developer/task-execution-authority.mdx"
          - "docs/user/branching-and-pr-artifacts.mdx"
          - "docs/user/cli-reference.generated.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/configured-authority.test.ts"
          - "packages/agentplane/src/commands/task/configured-authority.ts"
          - "packages/agentplane/src/commands/task/create.command.ts"
          - "packages/agentplane/src/commands/task/new.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/plan-execution-grant.test.ts"
          - "packages/core/src/tasks/plan-execution-grant.ts"
          - "packages/core/src/tasks/task-execution-base.ts"
          - "packages/core/src/tasks/task-store.ts"
          - "packages/core/src/tasks/tasks-export.ts"
        external_effects: []
        repository_effects:
          - "documentation"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
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
    author: "SUPERVISOR"
    body: "Implementation committed: ca672064d752. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 57a6b8ca2817. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-21T10:27:11.099Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-21T11:10:10.410Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ca672064d752. CLI accepted one state-bound external-agent semantic result."
    commit: "ca672064d7529c01a36e13991a6b6f50ef0ee962"
  -
    type: "verify"
    at: "2026-08-21T11:12:03.715Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run check"
  -
    type: "status"
    at: "2026-08-21T11:17:10.551Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 57a6b8ca2817. CLI accepted one state-bound external-agent semantic result."
    commit: "57a6b8ca28171e5608420354f74a6612a8fbd452"
  -
    type: "verify"
    at: "2026-08-21T11:17:30.277Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run check"
doc_version: 3
doc_updated_at: "2026-08-21T11:17:31.210Z"
doc_updated_by: "SUPERVISOR"
description: "Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift."
sections:
  Summary: |-
    Implement task-scoped autonomous execution after one user-approved plan

    Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.
  Scope: |-
    - In scope: Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.
    - Out of scope: unrelated refactors not required for "Implement task-scoped autonomous execution after one user-approved plan".
  Plan: |-
    Implement one-confirmation task autonomy as eight atomic, independently verifiable changes.

    1. Add versioned core contracts and schemas for PlanProposal, HostUserDecision, ExecutionGrant, and OperationLease. Bind every grant to task_id, plan_revision, plan_digest, scope_digest, repository identity, and the approved logical completion contract. Preserve legacy plan_approval data as compatibility evidence.

    2. Add an authority resolver that runs before workflow reduction and returns granted, policy_transition, user_required, external_blocked, or denied. It must never project an approval transport that is unavailable. Treat a Codex-originated user decision as trusted only when the host supplies an unforgeable origin=user event bound to the current plan digest; retain signed receipts as an optional remote transport.

    3. Replace the unconditional plan approval step with PlanProposal -> HostUserDecision -> ExecutionGrant compilation. One user confirmation authorizes all plan-declared repository and provider effects. Internal plan acceptance, start, rework, verification, commit, PR maintenance, integration, closeout, and cleanup must not create new user boundaries. Require a Plan Amendment only when the goal, deliverables, repository/system scope, irreversible effects, risk envelope, or verification strength materially changes.

    4. Extend the managed supervisor so task run continuously selects ready semantic episodes, allocates their authority, applies typed results, performs deterministic lifecycle effects, evaluates failures, retries bounded rework, verifies the approved outcome, and advances until logical completion or a genuine external/material-drift boundary. Persist replay-safe transition and operation identities so crash recovery is idempotent.

    5. Issue short-lived OperationLease records derived from the active ExecutionGrant for repository and provider effects. The supervisor, not the semantic agent, owns signing, effect execution, receipts, and formal transitions. Prevent stale leases, cross-task reuse, and self-expansion of the authority policy.

    6. Make workspace routing task-scoped and independent of the caller checkout. Freeze base_ref and base_sha per task, create worktrees directly from base_sha, permit simultaneous long-lived bases such as master and typescript, and treat cumulative development branches as bases rather than single-task branches. Persist logical repository/workspace identities and rediscover absolute paths after repository relocation.

    7. Add compatibility migration and doctor diagnostics. Existing tasks retain historical evidence; unstarted tasks receive the new route deterministically; ambiguous started tasks fail with typed recovery guidance. Diagnose missing host approval transport before returning an impossible action. Keep legacy manual and signed-receipt flows available as explicit compatibility modes.

    8. Add unit, integration, and end-to-end coverage plus user/developer documentation. Prove: one user confirmation drives a code task to logical completion; no trusted issuer is needed for a host-originated local Codex decision; material drift produces one plan amendment; ordinary rework does not; master and typescript tasks run concurrently; prior commits do not enter a new task diff; repository rename recovery succeeds; crash replay does not duplicate effects; and final verification, integration, and cleanup evidence are complete.

    Completion requires bun run typecheck and bun run check to pass, targeted authority/workflow/runner/workspace tests to pass, generated schemas and CLI documentation to be current, an end-to-end one-confirmation scenario to pass, and final Git/task state to contain no unintended artifacts. Stop and request a revised plan only if implementation needs credentials, an additional repository or host product change not representable by the AgentPlane host-event protocol, destructive history rewriting, a new external effect, or weaker verification than this plan.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-21T11:12:03.715Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run check
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c574107470b67e55775fd32a15c3c8ba96f795405e397aadd51eedb93985a01c, input_digest=sha256:00c4cb66747856cca6131d8cb0d166f629439ebe50d9dc52566e2f2aa435e12a

    Details:

    Command: bun run check
    Result: fail
    Evidence: .agentplane/tasks/202608211020-FGAPJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608211020-FGAPJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211020-FGAPJC-implement-task-scoped-autonomous-execution-after/.agentplane/tasks/202608211020-FGAPJC/blueprint/resolved-snapshot.json
    - old_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
    - current_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608211020-FGAPJC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608211020-FGAPJC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-21T11:17:30.277Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run check
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c574107470b67e55775fd32a15c3c8ba96f795405e397aadd51eedb93985a01c, input_digest=sha256:11a0d638fc4d485953232265e5935676381d8f682a3d73bef70c3cca7df1c85d

    Details:

    Command: bun run check
    Result: fail
    Evidence: .agentplane/tasks/202608211020-FGAPJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608211020-FGAPJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211020-FGAPJC-implement-task-scoped-autonomous-execution-after/.agentplane/tasks/202608211020-FGAPJC/blueprint/resolved-snapshot.json
    - old_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
    - current_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608211020-FGAPJC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608211020-FGAPJC
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
    digest: "sha256:ec84a4e5b23b78dc8f0866600bd3039d4008140595b544cba4a9904fc33b7fb5"
    grant_id: "1cccb18b-f789-4a42-b940-56da931e4b0a"
    issued_at: "2026-08-21T11:11:43.312Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:9f962e2f12b6b3d277456b77faaa1ca1416ff27ce6a48e9e91599347b8f3045c"
    plan_revision: 6
    schema_version: 1
    scope_digest: "sha256:df7b071ada977f3768cad6168c80f60ac30b6683159adab7645545486acc7df8"
    status: "active"
    task_id: "202608211020-FGAPJC"
  implementation_commit:
    hash: "57a6b8ca28171e5608420354f74a6612a8fbd452"
  task_execution_context:
    base_ref: "main"
    base_sha: "3e756cba6cfd6619327433c5fc38f6a52e79131d"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "3e756cba6cfd6619327433c5fc38f6a52e79131d"
    version: 1
id_source: "generated"
---
## Summary

Implement task-scoped autonomous execution after one user-approved plan

Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.

## Scope

- In scope: Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.
- Out of scope: unrelated refactors not required for "Implement task-scoped autonomous execution after one user-approved plan".

## Plan

Implement one-confirmation task autonomy as eight atomic, independently verifiable changes.

1. Add versioned core contracts and schemas for PlanProposal, HostUserDecision, ExecutionGrant, and OperationLease. Bind every grant to task_id, plan_revision, plan_digest, scope_digest, repository identity, and the approved logical completion contract. Preserve legacy plan_approval data as compatibility evidence.

2. Add an authority resolver that runs before workflow reduction and returns granted, policy_transition, user_required, external_blocked, or denied. It must never project an approval transport that is unavailable. Treat a Codex-originated user decision as trusted only when the host supplies an unforgeable origin=user event bound to the current plan digest; retain signed receipts as an optional remote transport.

3. Replace the unconditional plan approval step with PlanProposal -> HostUserDecision -> ExecutionGrant compilation. One user confirmation authorizes all plan-declared repository and provider effects. Internal plan acceptance, start, rework, verification, commit, PR maintenance, integration, closeout, and cleanup must not create new user boundaries. Require a Plan Amendment only when the goal, deliverables, repository/system scope, irreversible effects, risk envelope, or verification strength materially changes.

4. Extend the managed supervisor so task run continuously selects ready semantic episodes, allocates their authority, applies typed results, performs deterministic lifecycle effects, evaluates failures, retries bounded rework, verifies the approved outcome, and advances until logical completion or a genuine external/material-drift boundary. Persist replay-safe transition and operation identities so crash recovery is idempotent.

5. Issue short-lived OperationLease records derived from the active ExecutionGrant for repository and provider effects. The supervisor, not the semantic agent, owns signing, effect execution, receipts, and formal transitions. Prevent stale leases, cross-task reuse, and self-expansion of the authority policy.

6. Make workspace routing task-scoped and independent of the caller checkout. Freeze base_ref and base_sha per task, create worktrees directly from base_sha, permit simultaneous long-lived bases such as master and typescript, and treat cumulative development branches as bases rather than single-task branches. Persist logical repository/workspace identities and rediscover absolute paths after repository relocation.

7. Add compatibility migration and doctor diagnostics. Existing tasks retain historical evidence; unstarted tasks receive the new route deterministically; ambiguous started tasks fail with typed recovery guidance. Diagnose missing host approval transport before returning an impossible action. Keep legacy manual and signed-receipt flows available as explicit compatibility modes.

8. Add unit, integration, and end-to-end coverage plus user/developer documentation. Prove: one user confirmation drives a code task to logical completion; no trusted issuer is needed for a host-originated local Codex decision; material drift produces one plan amendment; ordinary rework does not; master and typescript tasks run concurrently; prior commits do not enter a new task diff; repository rename recovery succeeds; crash replay does not duplicate effects; and final verification, integration, and cleanup evidence are complete.

Completion requires bun run typecheck and bun run check to pass, targeted authority/workflow/runner/workspace tests to pass, generated schemas and CLI documentation to be current, an end-to-end one-confirmation scenario to pass, and final Git/task state to contain no unintended artifacts. Stop and request a revised plan only if implementation needs credentials, an additional repository or host product change not representable by the AgentPlane host-event protocol, destructive history rewriting, a new external effect, or weaker verification than this plan.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-21T11:12:03.715Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run check
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c574107470b67e55775fd32a15c3c8ba96f795405e397aadd51eedb93985a01c, input_digest=sha256:00c4cb66747856cca6131d8cb0d166f629439ebe50d9dc52566e2f2aa435e12a

Details:

Command: bun run check
Result: fail
Evidence: .agentplane/tasks/202608211020-FGAPJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608211020-FGAPJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211020-FGAPJC-implement-task-scoped-autonomous-execution-after/.agentplane/tasks/202608211020-FGAPJC/blueprint/resolved-snapshot.json
- old_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
- current_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608211020-FGAPJC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608211020-FGAPJC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-21T11:17:30.277Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run check
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c574107470b67e55775fd32a15c3c8ba96f795405e397aadd51eedb93985a01c, input_digest=sha256:11a0d638fc4d485953232265e5935676381d8f682a3d73bef70c3cca7df1c85d

Details:

Command: bun run check
Result: fail
Evidence: .agentplane/tasks/202608211020-FGAPJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608211020-FGAPJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211020-FGAPJC-implement-task-scoped-autonomous-execution-after/.agentplane/tasks/202608211020-FGAPJC/blueprint/resolved-snapshot.json
- old_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
- current_digest: 15a8472a282a435dc9ede295a803682f824c9089c52fb65d8a94c49be1481dfa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608211020-FGAPJC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608211020-FGAPJC
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
