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
- Note: Verified GitHub merge transport hardening: gh readiness checks, GH_TOKEN/GITHUB_TOKEN API fallback, init recommendation, quickstart guidance, focused tests, eslint, typecheck, schema check, policy routing, CLI docs freshness, quickstart smoke, blueprint snapshot, doctor, and git diff check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:30:21.702Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: bf0a9545d028

```text
 .agentplane/policy/workflow.branch_pr.md           |   9 +-
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   9 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   6 +-
 packages/agentplane/src/cli/command-guide.ts       |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
 .../cli/run-cli/commands/init/execution.test.ts    |  49 ++++
 .../src/cli/run-cli/commands/init/execution.ts     |  56 ++++-
 .../src/cli/run-cli/commands/init/model.ts         |   1 +
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   7 +
 .../src/commands/integrate-queue.command.ts        | 137 ++++++-----
 .../src/commands/integrate-queue.spec.ts           |   9 +
 .../src/commands/pr/integrate/cmd.test.ts          | 188 ++++++++++++++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    |  83 ++++++-
 .../pr/integrate/internal/github-pr-merge.ts       | 268 +++++++++++++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |   5 +-
 schemas/task-handoff.schema.json                   |   5 +-
 23 files changed, 755 insertions(+), 122 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
