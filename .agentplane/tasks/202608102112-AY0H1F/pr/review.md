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
- Note: PASS for implementation a1f0190de: state-machine and all affected task-advance/supervisor suites pass 80/80; drifted running and effect-in-doubt intents become exact-key replaceable failures; CLI retires the old exchange, emits the exact replacement command, issues a distinct successor, and rejects late retired output. Typecheck, knip, ESLint, format, diff, core build, and CLI build pass; hosted CI supplies the full independent rerun.
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
 ...n-cli.core.task-advance-effect-recovery.test.ts | 112 +++++++-
 ...un-cli.core.task-advance.blocked-result.test.ts |   4 +-
 ...n-cli.core.task-advance.branch-worktree.test.ts |   7 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |  84 ++++--
 ...i.core.task-advance.worktree-resolution.test.ts |   8 +-
 .../src/commands/task/advance.command.ts           |  16 +-
 .../src/commands/task/agent-action-packet.ts       |  12 +-
 .../task/external-agent-exchange-authority.ts      |  16 +-
 .../src/commands/task/external-agent-exchange.ts   |  51 ++--
 .../task/external-agent-supervisor-episode.ts      |  13 +
 .../task/external-agent-supervisor-recovery.ts     | 294 +++++++++++++++++++++
 .../src/commands/task/external-agent-supervisor.ts |  71 ++++-
 .../runner/supervisor-execution-episode.test.ts    |  50 ++++
 .../src/runner/supervisor-execution-episode.ts     |  60 +++++
 packages/core/src/schemas/index.ts                 |   1 +
 15 files changed, 740 insertions(+), 59 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
