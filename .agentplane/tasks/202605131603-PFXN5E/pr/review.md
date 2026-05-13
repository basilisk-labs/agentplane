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
- Note: Verified branch_pr PR-first integration route: lint changed files, focused integrate tests, targeted protected-base validation, typecheck, schema sync check, policy routing, CLI docs freshness, quickstart smoke, and git diff check all passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:10:26.522Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: 2e7fc7d3d4b5

```text
 .agentplane/policy/workflow.branch_pr.md           |   9 +-
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   9 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   4 +-
 packages/agentplane/src/cli/command-guide.ts       |   6 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
 .../src/commands/integrate-queue.command.ts        | 137 +++++++++++----------
 .../src/commands/integrate-queue.spec.ts           |   9 ++
 .../src/commands/pr/integrate/cmd.test.ts          | 102 +++++++++++++--
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 126 +++++++++++++++++--
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |  81 +++++++++---
 schemas/task-handoff.schema.json                   |  81 +++++++++---
 18 files changed, 462 insertions(+), 140 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
