Task: `202608280009-QMVHM2`
Title: Recover interrupted verification-to-WorkItem completion without false DONE
Canonical task record: `.agentplane/tasks/202608280009-QMVHM2/README.md`

## Summary

Recover interrupted verification-to-WorkItem completion without false DONE

Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.

## Scope

- In scope: Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
- Out of scope: unrelated refactors not required for "Recover interrupted verification-to-WorkItem completion without false DONE".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T01:13:18.715Z
- Branch: task/202608280009-QMVHM2/recover-interrupted-verification-to-workitem-com
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.branch-worktree.test.ts | 370 ++++++++++++++++++-
 .../commands/task/direct-task-verification.test.ts |  69 ++++
 .../src/commands/task/direct-task-verification.ts  |   7 +-
 .../external-agent-implementation-authority.ts     | 120 +++---
 .../external-agent-implementation-recovery.test.ts | 125 +++++++
 .../task/external-agent-implementation-recovery.ts | 405 +++++++++++++++++++++
 .../agentplane/src/commands/task/finish-shared.ts  |  13 +
 7 files changed, 1050 insertions(+), 59 deletions(-)
```

</details>
