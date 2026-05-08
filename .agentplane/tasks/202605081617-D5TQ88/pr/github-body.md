Task: `202605081617-D5TQ88`
Title: Clean up v0.5 release code debt
Canonical task record: `.agentplane/tasks/202605081617-D5TQ88/README.md`

## Summary

Clean up v0.5 release code debt

Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.

## Scope

- In scope: Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.
- Out of scope: unrelated refactors not required for "Clean up v0.5 release code debt".

## Verification

- State: ok
- Note: Implemented scoped v0.5 cleanup: recipe build warning removed, task-doc version normalization consolidated through core, testkit internal imports routed through the testkit internal facade, and knip baseline reduced by one stale export. Checks passed: agentplane build, focused recipe/task/testkit tests, release:parity, diff --check, knip:check, hotspots:check, test:fast, release:check.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T16:28:26.940Z
- Branch: task/202605081617-D5TQ88/v05-release-cleanup
- Head: 552d344f8737

```text
 .../blueprint/resolved-snapshot.json               | 401 +++++++++++++++++++++
 .../agentplane/src/commands/recipes/impl/apply.ts  |   4 +-
 .../src/commands/recipes/impl/constants.test.ts    |  55 +++
 .../src/commands/recipes/impl/constants.ts         |  48 ++-
 .../src/commands/recipes/impl/overlay-publish.ts   |   4 +-
 .../agentplane/src/commands/task/shared/docs.ts    |  14 +-
 packages/testkit/src/agentplane-internal.ts        |   6 +
 packages/testkit/src/cli-harness/stdio.ts          |   2 +-
 packages/testkit/src/runner.ts                     |   4 +-
 packages/testkit/src/task.ts                       |   6 +-
 scripts/baselines/knip-baseline.json               |  14 +-
 11 files changed, 512 insertions(+), 46 deletions(-)
```

</details>
