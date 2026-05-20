# PR Review

Created: 2026-05-20T10:03:29.826Z

## Task

- Task: `202605201000-511PS9`
- Title: Unify task next-action route explanation
- Status: DOING
- Branch: `task/202605201000-511PS9/ambiguity-route-contract`
- Canonical task record: `.agentplane/tasks/202605201000-511PS9/README.md`

## Verification

- State: ok
- Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T10:25:30.437Z
- Branch: task/202605201000-511PS9/ambiguity-route-contract
- Head: d5f50e7b3c05

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
 27 files changed, 3974 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
