# PR Review

Created: 2026-08-08T08:05:29.433Z

## Task

- Task: `202608080805-KPWPAV`
- Title: Allow explicit replacement after failed task advance operation
- Status: DOING
- Branch: `task/202608080805-KPWPAV/allow-task-advance-replacement`
- Canonical task record: `.agentplane/tasks/202608080805-KPWPAV/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T08:23:09.065Z
- Branch: task/202608080805-KPWPAV/allow-task-advance-replacement
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 107 +++++++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 ++-
 .../src/commands/task/advance.command.ts           |   7 ++
 .../agentplane/src/commands/task/advance.spec.ts   |  10 ++
 .../task/external-agent-supervisor-episode.ts      |  35 +++++++
 .../src/commands/task/external-agent-supervisor.ts |   3 +
 .../baselines/v0.7-compatibility-candidate.json    |  37 +++++--
 .../check-compatibility-contract-baseline.mjs      |  18 +++-
 8 files changed, 214 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
