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
- Note: PASS for implementation 1a87a5216: reused the green full-fast receipt from 2af7e6bd4 because the only delta removes three export modifiers from internal helpers and changes no runtime behavior; delta checks pass knip baseline, typecheck, file ESLint, format, and package build. Hosted CI will provide the independent full rerun.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T22:19:37.467Z
- Branch: task/202608102112-AY0H1F/exactly-once-external-episode-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 112 +++++++++-
 ...un-cli.core.task-advance.blocked-result.test.ts |   4 +-
 ...n-cli.core.task-advance.branch-worktree.test.ts |   7 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |  26 +--
 ...i.core.task-advance.worktree-resolution.test.ts |   8 +-
 .../src/commands/task/advance.command.ts           |  16 +-
 .../src/commands/task/agent-action-packet.ts       |  12 +-
 .../task/external-agent-exchange-authority.ts      |  16 +-
 .../src/commands/task/external-agent-exchange.ts   |  51 +++--
 .../task/external-agent-supervisor-episode.ts      |  13 ++
 .../task/external-agent-supervisor-recovery.ts     | 238 +++++++++++++++++++++
 .../src/commands/task/external-agent-supervisor.ts |  64 +++++-
 12 files changed, 510 insertions(+), 57 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
