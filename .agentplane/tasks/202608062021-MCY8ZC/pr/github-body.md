Task: `202608062021-MCY8ZC`
Title: Polish the external supervisor protocol and canonical task help
Canonical task record: `.agentplane/tasks/202608062021-MCY8ZC/README.md`

## Summary

Polish the external supervisor protocol and canonical task help

Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.

## Scope

- In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
- Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".

## Verification

- State: ok
- Note:

```text
Final hosted-CI rework head 032a2b8ab passes protocol, worktree, contract, hotspot, lint, typing,
critical, and cleanliness checks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T21:35:52.329Z
- Branch: task/202608062021-MCY8ZC/polish-the-external-supervisor-protocol-and-cano
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 +
 .agentplane/policy/workflow.branch_pr.md           |   3 +-
 .agentplane/policy/workflow.direct.md              |   3 +-
 README.md                                          |   5 +-
 docs/user/agent-bootstrap.generated.mdx            |   2 +-
 docs/user/task-lifecycle.mdx                       |  10 +-
 docs/workflow-guides/branch-pr.mdx                 |   5 +-
 docs/workflow-guides/hermes-kanban.mdx             |   3 +-
 packages/agentplane/assets/AGENTS.md               |   6 +-
 .../assets/codex-plugin/skills/agentplane/SKILL.md |   5 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   3 +-
 .../agentplane/assets/policy/workflow.direct.md    |   3 +-
 .../agentplane/src/agents/agents-template.test.ts  |  18 ++
 .../run-cli.core.help-snap.test.ts.snap            |  12 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   2 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   7 +-
 packages/agentplane/src/cli/command-guide.ts       |   4 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |   8 +-
 ...n-cli.core.task-advance.branch-worktree.test.ts | 328 +++++++++++++++++++++
 .../src/cli/run-cli.core.task-advance.test.ts      | 276 ++++++-----------
 .../src/cli/run-cli.core.task-guided.test.ts       |   2 +-
 packages/agentplane/src/cli/run-cli.core.test.ts   |  18 +-
 .../src/commands/shared/route-decision-blockers.ts |   6 +
 .../agentplane/src/commands/shared/route-oracle.ts |   1 +
 .../commands/shared/verification-details.test.ts   |  54 ++++
 .../src/commands/shared/verification-details.ts    |   7 +-
 .../src/commands/shared/workflow-step-branch.ts    |  14 +-
 .../shared/workflow-step-fingerprint.test.ts       |   4 +-
 .../src/commands/shared/workflow-step-reducer.ts   |  28 ++
 .../src/commands/shared/workflow-step.test.ts      |  42 ++-
 .../src/commands/shared/workflow-step.ts           |   4 +
 .../src/commands/task/advance.command.ts           |  62 +++-
 .../src/commands/task/agent-action-packet.test.ts  |  89 ++++++
 .../src/commands/task/agent-action-packet.ts       |  70 ++++-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 packages/agentplane/src/commands/task/shared.ts    |   1 +
 .../src/commands/task/shared.unit.test.ts          |  11 +
 .../src/commands/task/shared/dependencies.ts       |  16 +
 .../agentplane/src/commands/task/task.command.ts   |  62 +---
 40 files changed, 891 insertions(+), 307 deletions(-)
```

</details>
