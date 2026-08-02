Task: `202608022128-39YSZ1`
Title: Require fresh verification evidence in the route oracle
Canonical task record: `.agentplane/tasks/202608022128-39YSZ1/README.md`

## Summary

Require fresh verification evidence in the route oracle

Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.

## Scope

- In scope: Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
- Out of scope: unrelated refactors not required for "Require fresh verification evidence in the route oracle".

## Verification

- State: ok
- Note:

```text
Verified: route freshness, branch-snapshot evidence, static gates, and critical trust-boundary
behavior all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T21:30:08.514Z
- Branch: task/202608022128-39YSZ1/require-fresh-verification-evidence-in-the-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.route-decision.batch.test.ts  |   6 +-
 .../run-cli.core.route-decision.pre-merge.test.ts  |  28 ++-
 .../src/cli/run-cli.core.route-decision.test.ts    | 137 ++++++++++++++-
 .../evaluator/evaluator-verification-records.ts    | 122 +------------
 .../src/commands/shared/route-decision-blockers.ts |  67 ++++++-
 .../route-decision-blockers.worktree.test.ts       |  36 ++++
 .../commands/shared/task-verification-records.ts   | 194 +++++++++++++++++++++
 7 files changed, 457 insertions(+), 133 deletions(-)
```

</details>
