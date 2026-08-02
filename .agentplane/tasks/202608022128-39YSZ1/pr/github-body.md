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
- Note: Verified at 137ca290f: route freshness and CI hotspot rework pass all required local gates.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T21:30:08.514Z
- Branch: task/202608022128-39YSZ1/require-fresh-verification-evidence-in-the-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.route-decision.batch.test.ts  |   6 +-
 .../run-cli.core.route-decision.pre-merge.test.ts  |  28 ++-
 .../src/cli/run-cli.core.route-decision.test.ts    |  69 +------
 ...un-cli.core.route-decision.verification.test.ts | 230 +++++++++++++++++++++
 .../evaluator/evaluator-verification-records.ts    | 122 +----------
 .../src/commands/shared/route-decision-blockers.ts |  23 ++-
 .../route-decision-blockers.worktree.test.ts       |  36 ++++
 .../commands/shared/route-decision-verification.ts |  56 +++++
 .../shared/task-verification-records.test.ts       |  69 +++++++
 .../commands/shared/task-verification-records.ts   | 196 ++++++++++++++++++
 10 files changed, 641 insertions(+), 194 deletions(-)
```

</details>
