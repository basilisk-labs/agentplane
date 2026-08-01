# PR Review

Created: 2026-08-01T03:23:48.490Z

## Task

- Task: `202607221908-7WV0A7`
- Title: Migrate provider, integration, release, and ops command boundaries
- Status: DOING
- Branch: `task/202607221908-7WV0A7/migrate-provider-integration-release-and-ops-com`
- Canonical task record: `.agentplane/tasks/202607221908-7WV0A7/README.md`

## Verification

- State: ok
- Note: Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T03:24:25.275Z
- Branch: task/202607221908-7WV0A7/migrate-provider-integration-release-and-ops-com
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        | 114 +++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  36 +++--
 .../run-cli/command-catalog/integration-queue.ts   |  83 ++++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  70 ++++++++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  15 +-
 .../src/cli/run-cli/command-catalog/project.ts     | 110 +++++++------
 .../provider-ops-capability-profiles.ts            |  82 ++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  52 ++++--
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  20 ++-
 .../src/cli/run-cli/command-loaders/project.ts     | 180 ++++++++++++++-------
 .../src/cli/run-cli/command-loaders/task.ts        |  16 +-
 .../src/cli/run-cli/registry.run.test.ts           | 102 ++++++++++++
 .../src/commands/integrate-queue-doctor-command.ts | 127 +++++++++------
 .../src/commands/integrate-queue-lane.test.ts      |  57 ++++++-
 .../src/commands/integrate-queue-list.ts           |  38 +++++
 .../src/commands/integrate-queue-render.ts         |  64 ++++++++
 .../src/commands/integrate-queue.command.test.ts   |  10 +-
 .../src/commands/integrate-queue.command.ts        |  67 +++-----
 packages/agentplane/src/commands/pr/pr.command.ts  |  10 +-
 .../src/commands/provider-ops-results.test.ts      | 134 +++++++++++++++
 .../src/commands/release/plan.command.ts           |  67 ++++++--
 .../agentplane/src/commands/release/plan.render.ts |  13 ++
 .../agentplane/src/commands/release/plan.test.ts   |  35 ++--
 24 files changed, 1236 insertions(+), 273 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
