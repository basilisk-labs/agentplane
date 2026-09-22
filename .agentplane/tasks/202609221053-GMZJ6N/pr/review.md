# PR Review

Created: 2026-09-22T22:01:46.997Z

## Task

- Task: `202609221053-GMZJ6N`
- Title: Allow canonical provider lifecycle effects to consume the separately granted state-bound side-effect authority after ...
- Status: DOING
- Branch: `task/202609221053-GMZJ6N/canonical-provider-lifecycle`
- Canonical task record: `.agentplane/tasks/202609221053-GMZJ6N/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T22:01:46.997Z
- Branch: task/202609221053-GMZJ6N/canonical-provider-lifecycle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/advance-task-step.ts         | 49 +++++++++----
 .../src/commands/task/advance.command.ts           | 22 ++++--
 .../commands/task/branch-task-supervisor.test.ts   |  6 +-
 .../kernel-provider-effect-coordinator.test.ts     | 27 +++++++
 .../task/kernel-provider-effect-coordinator.ts     | 83 ++++++++++++++--------
 .../commands/task/roadmap-advance-one-step.test.ts |  7 +-
 .../commands/task/roadmap-terminal-noop.test.ts    | 56 ++++++++++++++-
 7 files changed, 194 insertions(+), 56 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
