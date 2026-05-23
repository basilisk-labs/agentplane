Task: `202605230424-Z1S0G9`
Title: Make PR artifacts head-independent
Canonical task record: `.agentplane/tasks/202605230424-Z1S0G9/README.md`

## Summary

Make PR artifacts head-independent

Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.

## Scope

- In scope: Replace self-referential PR artifact freshness with a stable tree or runtime-state contract so branch_pr tasks can keep a one-commit implementation PR without stale head churn after artifact refresh, amend, or hosted close.
- Out of scope: unrelated refactors not required for "Make PR artifacts head-independent".

## Verification

- State: ok
- Note:

```text
Verified: addressed protected-base integrate review by resolving OPEN PR identity live from branch
state. Focused PR-flow/integrate tests passed (27 tests); typecheck, lint, format, hotspots, knip,
and task-scope checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T04:25:05.110Z
- Branch: task/202605230424-Z1S0G9/head-independent-pr-artifacts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.pr-flow.pr-open.network.test.ts   | 12 ++++++------
 ...re.pr-flow.pr-validation.open-hydration.test.ts | 22 +++++++++++-----------
 ...n-cli.core.pr-flow.pr-validation.update.test.ts | 10 +++++-----
 packages/agentplane/src/commands/pr/check.ts       | 11 ++++++++++-
 .../src/commands/pr/internal/sync-github.ts        |  2 +-
 5 files changed, 33 insertions(+), 24 deletions(-)
```

</details>
