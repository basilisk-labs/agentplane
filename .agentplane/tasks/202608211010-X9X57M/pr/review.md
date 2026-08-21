# PR Review

Created: 2026-08-21T10:13:57.503Z

## Task

- Task: `202608211010-X9X57M`
- Title: Route new task creation to the primary checkout
- Status: DONE
- Branch: `task/202608211010-X9X57M/route-new-task-creation-to-the-primary-checkout`
- Canonical task record: `.agentplane/tasks/202608211010-X9X57M/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T10:33:19.857Z
- Branch: task/202608211010-X9X57M/route-new-task-creation-to-the-primary-checkout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-guided.test.ts       | 49 +++++++++++++++++
 .../src/cli/run-cli.core.tasks.create.test.ts      | 51 ++++++++++++++++++
 .../src/commands/shared/task-backend.test.ts       | 31 +++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 24 ++++++---
 .../agentplane/src/commands/task/begin.command.ts  |  8 +--
 .../src/commands/task/new.primary-checkout.test.ts | 62 ++++++++++++++++++++++
 packages/agentplane/src/commands/task/new.ts       | 13 ++++-
 7 files changed, 226 insertions(+), 12 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
