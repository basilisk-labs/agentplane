# PR Review

Created: 2026-08-24T22:59:26.702Z

## Task

- Task: `202608242233-KTFFN7`
- Title: Allow evidence-only rework after an already committed implementation
- Status: DOING
- Branch: `task/202608242233-KTFFN7/allow-evidence-only-rework-after-an-already-comm`
- Canonical task record: `.agentplane/tasks/202608242233-KTFFN7/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-24T22:59:26.702Z
- Branch: task/202608242233-KTFFN7/allow-evidence-only-rework-after-an-already-comm
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      | 299 ++++++++++++++++++++-
 .../commands/task/direct-task-verification.test.ts |  23 ++
 .../src/commands/task/direct-task-verification.ts  |   7 +-
 .../external-agent-implementation-authority.ts     | 183 ++++++++++---
 4 files changed, 472 insertions(+), 40 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
