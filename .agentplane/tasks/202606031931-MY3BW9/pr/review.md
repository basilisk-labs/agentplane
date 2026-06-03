# PR Review

Created: 2026-06-03T19:32:40.634Z

## Task

- Task: `202606031931-MY3BW9`
- Title: Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run
- Status: DOING
- Branch: `task/202606031931-MY3BW9/fix-upstream-issue-4407-direct-workflow-leaves-v`
- Canonical task record: `.agentplane/tasks/202606031931-MY3BW9/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T19:32:40.634Z
- Branch: task/202606031931-MY3BW9/fix-upstream-issue-4407-direct-workflow-leaves-v
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    | 79 ++++++++++++++++++
 .../src/commands/hermes/hermes-runtime.ts          |  8 ++
 .../commands/shared/route-decision-next-action.ts  | 12 +++
 .../agentplane/src/commands/shared/route-oracle.ts |  7 +-
 packages/agentplane/src/commands/task/list.ts      |  5 ++
 .../commands/task/shared/branch-pr-list-state.ts   | 93 +++++++++++++++++++---
 6 files changed, 194 insertions(+), 10 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
