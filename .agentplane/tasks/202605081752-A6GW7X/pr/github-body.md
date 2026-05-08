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
- Note: Command: bun run workflow:wait-remote-checks -- 3483 --repo basilisk-labs/agentplane; Result: pass; Evidence: required checks passed for PR #3483 after Core CI, Docs CI, Socket, release-ready, test, test-windows, and recovery-validate reported success.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:27:14.919Z
- Branch: task/202605081752-A6GW7X/integration-queue
- Head: 818bae616eac

```text
 .agentplane/policy/workflow.branch_pr.md           |  10 +-
 .../blueprint/resolved-snapshot.json               | 497 +++++++++++++++++++++
 .../agentplane/assets/policy/workflow.branch_pr.md |  10 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  20 +
 .../src/cli/run-cli/command-loaders/project.ts     |  24 +
 .../src/commands/integrate-queue.command.ts        | 262 +++++++++++
 .../src/commands/integrate-queue.spec.ts           | 166 +++++++
 .../src/commands/pr/integrate/queue-state.test.ts  | 101 +++++
 .../src/commands/pr/integrate/queue-state.ts       | 208 +++++++++
 9 files changed, 1292 insertions(+), 6 deletions(-)
```

</details>
