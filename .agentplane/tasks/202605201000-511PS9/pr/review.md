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
- Note: Fresh integration quality gate passed for published PR head 13286b7e42da22119986d13aa7340cf05eabc1ca. Evidence: GitHub hosted checks are green or skipped by policy; local ci:local:fast passed after CLI reference refresh; PR #3965 is open and mergeable. Note: final artifact-only commit e25a7be77 only refreshed AgentPlane PR metadata after publication.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T11:12:34.439Z
- Branch: task/202605201000-511PS9/ambiguity-route-contract
- Head: 13286b7e42da

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
 .../src/commands/task/evidence-check.command.ts    | 143 +++++
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
 28 files changed, 3988 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
