Task: `202607252051-RK9N29`
Title: Make branch_pr route resolution branch-snapshot aware
Canonical task record: `.agentplane/tasks/202607252051-RK9N29/README.md`

## Summary

Make branch_pr route resolution branch-snapshot aware

Correct branch_pr control-plane truth: routes, flow status, blockers, and resume must prefer the active task branch snapshot (live worktree, local branch, then origin) for task README and PR metadata, falling back to base only when no branch snapshot exists. Regress stale base TODO versus task-branch DONE/open PR so the CLI selects publication or integration, never a false plan approval. Keep typed route semantics unchanged.

## Scope

In scope: make branch_pr route, PR flow, blocker, and resume reads prefer a verified task-branch snapshot over stale base-local task artifacts; preserve base fallback; add a stale-base versus DONE-branch regression. Out of scope: changing workflow phases, TaskData schema, or provider semantics.

## Verification

- State: ok
- Note:

```text
Focused route, PR-flow, resume, task-backend, and artifact tests passed; typecheck, lint, guards,
lifecycle, routing, architecture, formatting, and diff checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T20:56:24.686Z
- Branch: task/202607252051-RK9N29/make-branch-pr-route-resolution-branch-snapshot
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.status.test.ts    | 113 +++++++++++++++++++++
 .../run-cli.core.route-decision.pre-merge.test.ts  | 110 +++++++++++++++++++-
 .../src/cli/run-cli.core.task-handoff.test.ts      |  91 ++++++++++++++++-
 packages/agentplane/src/commands/pr/flow-status.ts |  36 ++++---
 .../src/commands/pr/internal/pr-paths.test.ts      |  99 +++++++++++++++++-
 .../src/commands/pr/internal/pr-paths.ts           |  43 +++++++-
 .../src/commands/shared/route-decision-blockers.ts |  30 +++---
 .../src/commands/shared/route-decision.ts          |  25 +++--
 .../shared/task-backend-branch-snapshot.ts         |  51 +++++++++-
 .../src/commands/shared/task-backend.test.ts       |  11 +-
 .../agentplane/src/commands/shared/task-backend.ts |   9 +-
 .../agentplane/src/commands/shared/task-handoff.ts |  41 ++++----
 .../agentplane/src/commands/task/handoff.shared.ts |   6 +-
 13 files changed, 598 insertions(+), 67 deletions(-)
```

</details>
