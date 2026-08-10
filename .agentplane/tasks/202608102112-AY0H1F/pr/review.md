# PR Review

Created: 2026-08-10T21:13:13.244Z

## Task

- Task: `202608102112-AY0H1F`
- Title: Repair exactly-once external episode recovery
- Status: DOING
- Branch: `task/202608102112-AY0H1F/exactly-once-external-episode-recovery`
- Canonical task record: `.agentplane/tasks/202608102112-AY0H1F/README.md`

## Verification

- State: ok
- Note: PASS reused after rebase: implementation b633b400c has the exact stable patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af as previously verified af1ff44cd; no code, tests, Verify Steps, or declared inputs changed. Reused the prior exactly-once suites, typecheck, ESLint, changed-format, diff, and hotspot receipts without rerunning them. The pre-existing RF-04 workspace dependency-seed defect remains unrelated.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T21:13:13.244Z
- Branch: task/202608102112-AY0H1F/exactly-once-external-episode-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 112 +++++++++-
 ...un-cli.core.task-advance.blocked-result.test.ts |   4 +-
 ...n-cli.core.task-advance.branch-worktree.test.ts |  12 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |  28 +--
 ...i.core.task-advance.worktree-resolution.test.ts |   8 +-
 .../src/commands/task/advance.command.ts           |  16 +-
 .../src/commands/task/agent-action-packet.test.ts  |   9 +-
 .../src/commands/task/agent-action-packet.ts       |  17 +-
 .../task/external-agent-exchange-authority.ts      |  16 +-
 .../src/commands/task/external-agent-exchange.ts   |  51 +++--
 .../task/external-agent-supervisor-episode.ts      |  13 ++
 .../task/external-agent-supervisor-recovery.ts     | 238 +++++++++++++++++++++
 .../src/commands/task/external-agent-supervisor.ts |  64 +++++-
 13 files changed, 527 insertions(+), 61 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
