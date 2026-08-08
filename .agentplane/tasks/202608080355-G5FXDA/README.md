---
id: "202608080355-G5FXDA"
title: "Correct stale plan comparison in next-action diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run release:incidents:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T03:55:19.801Z"
  updated_by: "ORCHESTRATOR"
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
commit:
  hash: "21a5bad500af96450ff8c101d50f78c27a89affa"
  message: "🚧 G5FXDA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 21a5bad500af. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T03:55:51.861Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T04:02:14.139Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 21a5bad500af. CLI accepted one state-bound external-agent semantic result."
doc_version: 3
doc_updated_at: "2026-08-08T04:02:14.139Z"
doc_updated_by: "SUPERVISOR"
description: "Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges."
sections:
  Summary: |-
    Correct stale plan comparison in next-action diagnostics

    Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
  Scope: |-
    - In scope: Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
    - Out of scope: unrelated refactors not required for "Correct stale plan comparison in next-action diagnostics".
  Plan: "1. Reproduce issue #4783 with fixture states where the published current version has valid evidence and the latest plan is missing, stale, current, or future. 2. Add semver-safe plan-target ordering in scripts/release/next-action.mjs: missing, invalid, current, and older targets request ap release plan --patch; only a valid future target may proceed to candidate preparation; preserve recovery applicability and partial-publication precedence. 3. Expand release-next-action-script tests for all four target relations and invalid metadata. 4. Mark INC-20260807-01 resolved in both canonical and bundled policy registries, with the merged MCY8ZC evidence retained. 5. Run the focused suite, incident release gate, typecheck, policy routing, contract checks, evaluator review, hosted CI, and integrate through the serialized queue. 6. Close GitHub issue #4783 only after merge proof."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:incidents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4a2895659e677071caaa9b56cadf35df8e261e82"
    version: 1
id_source: "generated"
---
## Summary

Correct stale plan comparison in next-action diagnostics

Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.

## Scope

- In scope: Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
- Out of scope: unrelated refactors not required for "Correct stale plan comparison in next-action diagnostics".

## Plan

1. Reproduce issue #4783 with fixture states where the published current version has valid evidence and the latest plan is missing, stale, current, or future. 2. Add semver-safe plan-target ordering in scripts/release/next-action.mjs: missing, invalid, current, and older targets request ap release plan --patch; only a valid future target may proceed to candidate preparation; preserve recovery applicability and partial-publication precedence. 3. Expand release-next-action-script tests for all four target relations and invalid metadata. 4. Mark INC-20260807-01 resolved in both canonical and bundled policy registries, with the merged MCY8ZC evidence retained. 5. Run the focused suite, incident release gate, typecheck, policy routing, contract checks, evaluator review, hosted CI, and integrate through the serialized queue. 6. Close GitHub issue #4783 only after merge proof.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:incidents:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
