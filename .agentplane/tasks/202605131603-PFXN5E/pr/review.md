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
- Note: Review-thread fix verified: protected-base GitHub merge now leaves integrate queue in handoff until Task Hosted Close; focused integrate/queue/guide tests passed; eslint targeted files passed; typecheck passed; policy routing passed; git diff --check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:06:11.873Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: e081a880bc81

```text
 .agentplane/policy/workflow.branch_pr.md           |  11 +-
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   4 +
 .../agentplane/assets/policy/workflow.branch_pr.md |  11 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   8 +-
 packages/agentplane/src/cli/command-guide.ts       |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
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
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |   5 +-
 schemas/task-handoff.schema.json                   |   5 +-
 25 files changed, 1466 insertions(+), 124 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
