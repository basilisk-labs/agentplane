# PR Review

Created: 2026-05-13T16:03:49.901Z

## Task

- Task: `202605131603-PFXN5E`
- Title: Automate branch_pr merge queue finalization
- Status: DOING
- Branch: `task/202605131603-PFXN5E/automate-merge-queue`
- Canonical task record: `.agentplane/tasks/202605131603-PFXN5E/README.md`

## Verification

- State: ok
- Note: Hotspot follow-up verified: branch_pr list-state test moved out of oversized query-listing file; targeted tests passed; targeted eslint passed; typecheck passed; hotspots:check passed; policy routing passed; git diff --check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:41:04.439Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: 08e1d16c7033

```text
 .agentplane/policy/workflow.branch_pr.md           |  11 +-
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   4 +
 .../agentplane/assets/policy/workflow.branch_pr.md |  11 +-
 .../task-backend/local-task-sqlite-cache.ts        |  12 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   8 +-
 packages/agentplane/src/cli/command-guide.ts       |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
 ...run-cli.core.tasks.branch-pr-list-state.test.ts | 115 +++++
 .../cli/run-cli/commands/init/execution.test.ts    |  49 ++
 .../src/cli/run-cli/commands/init/execution.ts     |  56 ++-
 .../src/cli/run-cli/commands/init/model.ts         |   1 +
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   7 +
 .../src/commands/integrate-queue.command.ts        | 177 ++++---
 .../src/commands/integrate-queue.spec.test.ts      |  29 ++
 .../src/commands/integrate-queue.spec.ts           |  43 ++
 .../src/commands/pr/integrate/cmd.test.ts          | 249 +++++++++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 109 ++++-
 .../pr/integrate/internal/github-pr-merge.ts       | 268 +++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 packages/agentplane/src/commands/task/list.ts      |  10 +-
 packages/agentplane/src/commands/task/next.ts      |   6 +-
 packages/agentplane/src/commands/task/search.ts    |   6 +-
 .../commands/task/shared/branch-pr-list-state.ts   | 108 +++++
 .../src/commands/task/shared/dependencies.ts       |   8 +-
 .../agentplane/src/commands/task/shared/listing.ts |   9 +-
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |   5 +-
 schemas/task-handoff.schema.json                   |   5 +-
 33 files changed, 1727 insertions(+), 137 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
