---
id: "202608040748-7Z0401"
title: "Harden stale runner reclaim regression after semantic plan enforcement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "issue-4773"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T07:49:26.080Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T07:49:53.341Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T07:49:53.341Z"
doc_updated_by: "CODER"
description: "Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL."
sections:
  Summary: |-
    Harden stale runner reclaim regression after semantic plan enforcement

    Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.
  Scope: |-
    - In scope: Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.
    - Out of scope: unrelated refactors not required for "Harden stale runner reclaim regression after semantic plan enforcement".
  Plan: "1. Reproduce the stale-runner reclaim path on current main with a semantically planned DOING task, a valid runner state, and a nonexistent PID. 2. Repair only the fixture or runtime path proven responsible, preserving fail-closed behavior when no active claim exists. 3. Add assertions that reclaim never returns E_INTERNAL, claimed stale runs become cancelled with deterministic retry guidance, and unclaimed stale runs return the documented typed conflict without writing a handoff. 4. Run the focused task-handoff suite, typecheck, routing validation, and issue-specific CLI proof. 5. Publish through branch_pr and link the verified result to GitHub issue #4773."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "1f0024cf22d743bfdeb7a5554ae306b0fe1b4680"
    version: 1
id_source: "generated"
---
## Summary

Harden stale runner reclaim regression after semantic plan enforcement

Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.

## Scope

- In scope: Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.
- Out of scope: unrelated refactors not required for "Harden stale runner reclaim regression after semantic plan enforcement".

## Plan

1. Reproduce the stale-runner reclaim path on current main with a semantically planned DOING task, a valid runner state, and a nonexistent PID. 2. Repair only the fixture or runtime path proven responsible, preserving fail-closed behavior when no active claim exists. 3. Add assertions that reclaim never returns E_INTERNAL, claimed stale runs become cancelled with deterministic retry guidance, and unclaimed stale runs return the documented typed conflict without writing a handoff. 4. Run the focused task-handoff suite, typecheck, routing validation, and issue-specific CLI proof. 5. Publish through branch_pr and link the verified result to GitHub issue #4773.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
