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
Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated
source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing,
diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps
is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T10:22:23.220Z
- Branch: task/202605201000-511PS9/ambiguity-route-contract
- Head: 8dea62f1d0e2

```text
 .agentplane/tasks/202605200959-2KQ8XN/README.md    | 111 ++++
 .../blueprint/resolved-snapshot.json               | 404 ++++++++++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-3TVWFX/README.md    | 116 +++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-C1X8B6/README.md    | 116 +++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 .agentplane/tasks/202605201001-YCTG8P/README.md    | 116 +++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++++++++++
 docs/reference/workflow-file.mdx                   |   3 +-
 docs/user/configuration.mdx                        |   6 +-
 packages/agentplane/src/cli/command-guide.ts       |   3 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/route-decision.ts          |  74 ++-
 .../src/commands/task/evidence-check.command.ts    | 137 +++++
 .../agentplane/src/commands/task/lint.command.ts   |  23 +-
 packages/agentplane/src/commands/task/lint.ts      |  17 +-
 .../src/commands/task/next-action.command.ts       |  42 +-
 .../agentplane/src/commands/task/status.command.ts |  11 +
 packages/agentplane/src/runner/types/context.ts    |   1 +
 .../src/runner/usecases/task-run-bootstrap.ts      |  20 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   8 +
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/tasks-lint.test.ts         |  18 +
 packages/core/src/tasks/tasks-lint.ts              |  36 ++
 27 files changed, 3578 insertions(+), 13 deletions(-)
```

</details>
