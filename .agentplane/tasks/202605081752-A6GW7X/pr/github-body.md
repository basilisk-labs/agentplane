Task: `202605081752-A6GW7X`
Title: Add branch PR integration queue
Canonical task record: `.agentplane/tasks/202605081752-A6GW7X/README.md`

## Summary

Add branch PR integration queue

Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.

## Scope

- In scope: Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.
- Out of scope: unrelated refactors not required for "Add branch PR integration queue".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts; Result: pass; Evidence: 2 files, 11 tests passed after addressing PR review comments. Command: bun run --filter=agentplane typecheck; Result: pass. Command: bun run --filter=agentplane build; Result: pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T19:16:28.718Z
- Branch: task/202605081752-A6GW7X/integration-queue
- Head: 7eaa984e07c7

```text
 .agentplane/policy/workflow.branch_pr.md           |  10 +-
 .../blueprint/resolved-snapshot.json               | 497 +++++++++++++++++++++
 .../agentplane/assets/policy/workflow.branch_pr.md |  10 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  20 +
 .../src/cli/run-cli/command-loaders/project.ts     |  24 +
 .../src/commands/integrate-queue.command.ts        | 262 +++++++++++
 .../src/commands/integrate-queue.spec.ts           | 178 ++++++++
 .../src/commands/pr/integrate/queue-state.test.ts  | 156 +++++++
 .../src/commands/pr/integrate/queue-state.ts       | 213 +++++++++
 9 files changed, 1364 insertions(+), 6 deletions(-)
```

</details>
