Task: `202605201000-511PS9`
Title: Unify task next-action route explanation
Canonical task record: `.agentplane/tasks/202605201000-511PS9/README.md`

## Summary

Unify task next-action route explanation

Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.

## Scope

- In scope: Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.
- Out of scope: unrelated refactors not required for "Unify task next-action route explanation".

## Verification

- State: ok
- Note:

```text
Fresh quality gate passed for review fix commit f37cb3865. Review thread r3273173348 addressed by
making unknown required evidence blocking in task evidence check strict mode and adding
evidence-check.unit.test coverage. Focused checks passed: prettier on touched files, vitest
evidence-check plus existing focused suites, and packages/agentplane tsc --noEmit.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T11:50:41.786Z
- Branch: task/202605201000-511PS9/ambiguity-route-contract
- Head: f37cb38652c4

```text
 .agentplane/tasks/202605200959-2KQ8XN/README.md    | 210 ++++++++
 .../blueprint/resolved-snapshot.json               | 404 ++++++++++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-3TVWFX/README.md    | 215 ++++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-C1X8B6/README.md    | 215 ++++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-YCTG8P/README.md    | 215 ++++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 docs/reference/workflow-file.mdx                   |   3 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/configuration.mdx                        |   6 +-
 packages/agentplane/src/cli/command-guide.ts       |   3 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/route-decision.ts          |  80 ++-
 .../src/commands/task/evidence-check.command.ts    | 156 ++++++
 .../src/commands/task/evidence-check.unit.test.ts  |  25 +
 .../agentplane/src/commands/task/lint.command.ts   |  23 +-
 packages/agentplane/src/commands/task/lint.ts      |  17 +-
 .../src/commands/task/next-action.command.ts       |  43 +-
 .../agentplane/src/commands/task/status.command.ts |  11 +
 packages/agentplane/src/runner/types/context.ts    |   1 +
 .../src/runner/usecases/task-run-bootstrap.ts      |  20 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   8 +
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/tasks-lint.test.ts         |  18 +
 packages/core/src/tasks/tasks-lint.ts              |  36 ++
 29 files changed, 4026 insertions(+), 13 deletions(-)
```

</details>
