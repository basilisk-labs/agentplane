Task: `202606081626-MH14DH`
Title: Fix direct workflow closeout regressions from GitHub issues
Canonical task record: `.agentplane/tasks/202606081626-MH14DH/README.md`

## Summary

Fix direct workflow closeout regressions reported by GitHub issues #4471, #4472, and #4473. The intended behavior is that ordinary direct tasks are not routed to runner execution unless runner evidence is actually required, unreadable historical task artifacts do not block unrelated active-task verify/finish flows, and generated direct closeout commits use repository-accepted task/close scope semantics.

## Scope

- In scope: Fix direct-mode regressions reported in GitHub issues #4471, #4472, and #4473: avoid unnecessary runner route after start-ready, avoid blocking unrelated mutation on unreadable historical task artifacts, and ensure direct closeout commit scope is accepted by repository policy.
- Out of scope: unrelated refactors not required for "Fix direct workflow closeout regressions from GitHub issues".

## Verification

- State: ok
- Note: Verified: direct route, reconcile guard, and direct close-commit regressions are covered and passing.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T16:28:14.734Z
- Branch: task/202606081626-MH14DH/fix-direct-workflow-closeout-regressions-from-gi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.core.lifecycle.finish-close-commit.test.ts |  7 ++-
 ...cli.core.route-decision.direct-closeout.test.ts | 64 ++++++++++++++++++++++
 .../src/commands/shared/reconcile-check.test.ts    | 18 +++---
 .../commands/shared/route-decision-next-action.ts  | 18 +++++-
 4 files changed, 94 insertions(+), 13 deletions(-)
```

</details>
