# PR Review

Created: 2026-07-10T16:21:23.441Z

## Task

- Task: `202607092208-1J49NQ`
- Title: Split routing and task-command hotspots for v0.6.22
- Status: DOING
- Branch: `task/202607092208-1J49NQ/split-routing-and-task-command-hotspots-for-v0-6`
- Canonical task record: `.agentplane/tasks/202607092208-1J49NQ/README.md`

## Verification

- State: ok
- Note: Verified route/task behavior, lifecycle invariants, hotspot reduction, CI contract, and full fast suite.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T16:21:23.441Z
- Branch: task/202607092208-1J49NQ/split-routing-and-task-command-hotspots-for-v0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli/commands/platform-role-guides.ts   |  84 +++++++
 .../src/cli/run-cli/commands/platform.ts           |  84 +------
 .../commands/guard/impl/close-message-render.ts    |  74 +-----
 .../guard/impl/close-message-verification.ts       |  83 +++++++
 .../src/commands/shared/route-execution-packet.ts  | 261 ++++++++++++++++++++
 .../agentplane/src/commands/shared/route-oracle.ts | 262 +--------------------
 .../src/commands/task/hosted-close-premerge.ts     | 143 +++++++++++
 .../src/commands/task/hosted-close.command.ts      | 156 ++----------
 .../agentplane/src/commands/task/new-duplicates.ts | 108 +++++++++
 packages/agentplane/src/commands/task/new.ts       | 109 +--------
 10 files changed, 703 insertions(+), 661 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
