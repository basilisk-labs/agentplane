# PR Review

Created: 2026-08-17T18:59:25.035Z

## Task

- Task: `202608171853-X3FD5M`
- Title: Harden autonomous authority recovery and Hermes dialog approvals
- Status: DOING
- Branch: `task/202608171853-X3FD5M/harden-autonomous-authority-recovery-and-hermes`
- Canonical task record: `.agentplane/tasks/202608171853-X3FD5M/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T19:18:18.741Z
- Branch: task/202608171853-X3FD5M/harden-autonomous-authority-recovery-and-hermes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/branch-publication.ts          |  23 +-
 .../pr/integrate/internal/github-protection.ts     |  15 ++
 .../src/commands/shared/declared-check.ts          |   6 +
 .../src/commands/shared/side-effect-authority.ts   |   5 +
 .../shared/supervisor-execution-episode.ts         |   7 +-
 .../src/commands/task/agent-action-packet.ts       |  79 +++++--
 .../src/commands/task/authority-grant.command.ts   |  70 +++++-
 .../task/external-agent-supervisor-episode.ts      |   7 +-
 .../src/commands/task/plan-approve.command.ts      |  76 ++++++-
 packages/agentplane/src/commands/task/plan.ts      |  74 +++---
 .../src/commands/task/user-approval-receipt.ts     | 249 +++++++++++++++++++++
 packages/core/src/config/schema.impl.ts            |  32 +++
 .../src/runner/supervisor-execution-episode.ts     |  23 +-
 13 files changed, 584 insertions(+), 82 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
