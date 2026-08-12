---
id: "202608120643-75ZFHW"
title: "Prevent worktree accumulation and clean obsolete task checkouts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202608112232-3NC7Y4"
tags:
  - "cleanup"
  - "lifecycle"
  - "ux"
  - "worktree"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-12T06:44:53.943Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the previously agreed worktree/branch lifecycle step before final verification optimization."
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
    - "effect_external_write"
    - "effect_release_metadata"
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
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
      - "packages/agentplane/src/commands/branch/work-start.ts"
      - "packages/agentplane/src/commands/doctor.run.ts"
      - "packages/agentplane/src/commands/doctor/branch-pr.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    required_evidence:
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "e7e76d7855570667aca67e6e47bbca4822628cea"
  message: "🚧 75ZFHW task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e7e76d785557. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-12T06:44:59.708Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-12T07:29:22.527Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e7e76d785557. CLI accepted one state-bound external-agent semantic result."
    commit: "e7e76d7855570667aca67e6e47bbca4822628cea"
doc_version: 3
doc_updated_at: "2026-08-12T07:29:22.527Z"
doc_updated_by: "SUPERVISOR"
description: "Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests."
sections:
  Summary: |-
    Prevent worktree accumulation and clean obsolete task checkouts

    Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
  Scope: |-
    - In scope: Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
    - Out of scope: unrelated refactors not required for "Prevent worktree accumulation and clean obsolete task checkouts".
  Plan: |-
    1. Inventory the current local and hosted checkout graph. For every registered worktree and local or remote branch, record task id, task state, authoritative checkout, dirtiness, open/merged/closed PR state, ancestry to origin/main, stashes or archive refs, recovery/control provenance, and whether unique commits remain. Establish the pre-change baseline counts and retained-reason taxonomy.
    2. Define and implement the canonical invariant: any number of different active branch_pr tasks may run concurrently, but each task has exactly one authoritative task worktree; direct tasks need no dedicated worktree; merged or hosted-closed tasks own no task worktree or ordinary local task branch. Duplicate same-task worktree creation must fail with deterministic readback naming the authoritative checkout.
    3. Move cleanup into deterministic lifecycle ownership. After hosted-close or provider-proven merge, the foreground supervisor/queue progression must finalize the clean task worktree and local/remote task branch automatically and idempotently. The coding agent must not infer or manually advance the queue. A cleanup failure must preserve work, classify the blocker, and emit the exact safe retry or inspection command without rolling back a successful merge.
    4. Prevent worktree graph resurrection. Recovery, benchmark, integration, and control checkouts must be isolated from the primary repository worktree registry or explicitly marked non-authoritative; nested historical task worktrees must not be registered when a recovery base is created, resumed, copied, or removed. Add doctor/inventory detection for recursive recovery graphs and legacy duplicate registrations.
    5. Extend cleanup inventory/reporting to classify active, merged, dirty, detached, recovery, remote-only, open-PR, blocked, archived, and ambiguous refs. Automated deletion is allowed only for clean provider-proven merged/hosted-closed state or explicitly archived obsolete recovery state. Preserve dirty worktrees, active or blocked tasks, open PRs, stashes, release/archive refs, and unique unassimilated commits.
    6. Add focused unit/integration coverage plus realistic E2E scenarios: two different active tasks retain two independent worktrees; a second worktree for the same task is rejected; hosted-close removes a clean merged worktree/branch and is idempotent; cleanup preserves dirty/ambiguous state with actionable readback; recovery creation cannot re-register nested historical worktrees.
    7. Apply the deterministic inventory and cleanup to this repository. Reconcile origin/main and hosted PR truth, remove only proven obsolete worktrees and local/remote refs, retain every ambiguous or active item with a recorded reason, and report before/after counts. Verify git worktree integrity, branch recoverability, active task routing, stash preservation, remote branch state, and clean intended tracked state.
    8. Run focused lifecycle/cleanup tests, critical CLI E2E, typecheck, lint, schema/contract checks, and the full PR verification route. Record residual retained state and exact reasons rather than forcing deletion.
  Verify Steps: |-
    1. Run the worktree invariant matrix. Expected: different active branch_pr tasks can each own one worktree concurrently; a duplicate worktree for the same task is rejected with the authoritative checkout; direct tasks do not receive a mandatory worktree.
    2. Exercise hosted-close and queue progression on a merged task fixture. Expected: the supervisor advances the queue and removes the clean task worktree plus ordinary local/remote task refs exactly once; a second run is a no-op; merge success remains recorded if cleanup is blocked.
    3. Exercise dirty, blocked, open-PR, stashed, archived, detached, unique-commit, recovery, and ambiguous fixtures. Expected: no protected work is deleted; every retained item has a deterministic reason and safe next action.
    4. Create and resume recovery/control fixtures containing historical nested .agentplane/worktrees directories. Expected: no nested worktree becomes registered in the primary repository; doctor/inventory identifies any legacy recursive registration.
    5. Apply cleanup to the real repository after fetching hosted truth. Expected: before/after counts and every removed/retained ref are recorded; origin/main is current; only proven obsolete clean state is deleted; active tasks, open PRs, dirty state, stashes, release/archive refs, and unique commits are preserved.
    6. Run focused lifecycle/cleanup unit and integration tests, realistic CLI E2E, typecheck, lint, schema/contract checks, and full hosted PR verification. Expected: all pass on the exact reviewed SHA and final git worktree prune dry-run reports no stale registrations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4efbe19bb2aed31d9b6beb6f01288906b823d8bb"
    version: 1
id_source: "generated"
---
## Summary

Prevent worktree accumulation and clean obsolete task checkouts

Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.

## Scope

- In scope: Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
- Out of scope: unrelated refactors not required for "Prevent worktree accumulation and clean obsolete task checkouts".

## Plan

1. Inventory the current local and hosted checkout graph. For every registered worktree and local or remote branch, record task id, task state, authoritative checkout, dirtiness, open/merged/closed PR state, ancestry to origin/main, stashes or archive refs, recovery/control provenance, and whether unique commits remain. Establish the pre-change baseline counts and retained-reason taxonomy.
2. Define and implement the canonical invariant: any number of different active branch_pr tasks may run concurrently, but each task has exactly one authoritative task worktree; direct tasks need no dedicated worktree; merged or hosted-closed tasks own no task worktree or ordinary local task branch. Duplicate same-task worktree creation must fail with deterministic readback naming the authoritative checkout.
3. Move cleanup into deterministic lifecycle ownership. After hosted-close or provider-proven merge, the foreground supervisor/queue progression must finalize the clean task worktree and local/remote task branch automatically and idempotently. The coding agent must not infer or manually advance the queue. A cleanup failure must preserve work, classify the blocker, and emit the exact safe retry or inspection command without rolling back a successful merge.
4. Prevent worktree graph resurrection. Recovery, benchmark, integration, and control checkouts must be isolated from the primary repository worktree registry or explicitly marked non-authoritative; nested historical task worktrees must not be registered when a recovery base is created, resumed, copied, or removed. Add doctor/inventory detection for recursive recovery graphs and legacy duplicate registrations.
5. Extend cleanup inventory/reporting to classify active, merged, dirty, detached, recovery, remote-only, open-PR, blocked, archived, and ambiguous refs. Automated deletion is allowed only for clean provider-proven merged/hosted-closed state or explicitly archived obsolete recovery state. Preserve dirty worktrees, active or blocked tasks, open PRs, stashes, release/archive refs, and unique unassimilated commits.
6. Add focused unit/integration coverage plus realistic E2E scenarios: two different active tasks retain two independent worktrees; a second worktree for the same task is rejected; hosted-close removes a clean merged worktree/branch and is idempotent; cleanup preserves dirty/ambiguous state with actionable readback; recovery creation cannot re-register nested historical worktrees.
7. Apply the deterministic inventory and cleanup to this repository. Reconcile origin/main and hosted PR truth, remove only proven obsolete worktrees and local/remote refs, retain every ambiguous or active item with a recorded reason, and report before/after counts. Verify git worktree integrity, branch recoverability, active task routing, stash preservation, remote branch state, and clean intended tracked state.
8. Run focused lifecycle/cleanup tests, critical CLI E2E, typecheck, lint, schema/contract checks, and the full PR verification route. Record residual retained state and exact reasons rather than forcing deletion.

## Verify Steps

1. Run the worktree invariant matrix. Expected: different active branch_pr tasks can each own one worktree concurrently; a duplicate worktree for the same task is rejected with the authoritative checkout; direct tasks do not receive a mandatory worktree.
2. Exercise hosted-close and queue progression on a merged task fixture. Expected: the supervisor advances the queue and removes the clean task worktree plus ordinary local/remote task refs exactly once; a second run is a no-op; merge success remains recorded if cleanup is blocked.
3. Exercise dirty, blocked, open-PR, stashed, archived, detached, unique-commit, recovery, and ambiguous fixtures. Expected: no protected work is deleted; every retained item has a deterministic reason and safe next action.
4. Create and resume recovery/control fixtures containing historical nested .agentplane/worktrees directories. Expected: no nested worktree becomes registered in the primary repository; doctor/inventory identifies any legacy recursive registration.
5. Apply cleanup to the real repository after fetching hosted truth. Expected: before/after counts and every removed/retained ref are recorded; origin/main is current; only proven obsolete clean state is deleted; active tasks, open PRs, dirty state, stashes, release/archive refs, and unique commits are preserved.
6. Run focused lifecycle/cleanup unit and integration tests, realistic CLI E2E, typecheck, lint, schema/contract checks, and full hosted PR verification. Expected: all pass on the exact reviewed SHA and final git worktree prune dry-run reports no stale registrations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
