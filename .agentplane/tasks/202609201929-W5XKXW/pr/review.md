# PR Review

Created: 2026-09-20T20:29:05.070Z

## Task

- Task: `202609201929-W5XKXW`
- Title: Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication
- Status: DOING
- Branch: `task/202609201929-W5XKXW/canonical-w5xkxw`
- Canonical task record: `.agentplane/tasks/202609201929-W5XKXW/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T20:29:05.070Z
- Branch: task/202609201929-W5XKXW/canonical-w5xkxw
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   9 +-
 .../check-published-packages-script.test.ts        |  75 +++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |  37 +++++++-
 .../commands/task/kernel-repository-coordinator.ts |  52 +----------
 .../src/commands/task/kernel-terminal-artifacts.ts | 103 +++++++++++++++++++++
 .../runner/usecases/kernel-task-lifecycle.test.ts  |  39 ++++++++
 .../src/runner/usecases/kernel-task-lifecycle.ts   |  19 +++-
 packages/agentplane/src/shared/runtime-env.test.ts |  30 ++++--
 packages/agentplane/src/shared/runtime-env.ts      |   5 +
 scripts/checks/run-pre-push-hook.mjs               |   2 +-
 scripts/release/check-published-packages.mjs       |  23 ++++-
 11 files changed, 327 insertions(+), 67 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
