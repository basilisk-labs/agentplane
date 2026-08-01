Task: `202607221908-7WV0A7`
Title: Migrate provider, integration, release, and ops command boundaries
Canonical task record: `.agentplane/tasks/202607221908-7WV0A7/README.md`

## Summary

Migrate provider, integration, release, and ops command boundaries

RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.

## Scope

- In scope: PR sync/open/check, integration queue/merge/hosted close/cleanup, release/publish/recovery, network/provider and ops commands, granular authority/provider/Git capabilities, typed results/errors, audit, and human/JSON renderers.
- Out of scope: granting publication authority or changing protected-main policy.

## Verification

- State: ok
- Note:

```text
Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests;
critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust
ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T03:24:25.275Z
- Branch: task/202607221908-7WV0A7/migrate-provider-integration-release-and-ops-com
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        | 114 ++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  36 +++--
 .../run-cli/command-catalog/integration-queue.ts   |  83 ++++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  70 +++++++++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  15 +-
 .../src/cli/run-cli/command-catalog/project.ts     | 110 ++++++-------
 .../provider-ops-capability-profiles.ts            |  82 ++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  52 +++++--
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  20 ++-
 .../src/cli/run-cli/command-loaders/project.ts     | 172 ++++++++++++++-------
 .../src/cli/run-cli/command-loaders/task.ts        |  16 +-
 .../src/cli/run-cli/registry.run.test.ts           | 102 ++++++++++++
 .../src/commands/integrate-queue-doctor-command.ts | 128 +++++++++------
 .../src/commands/integrate-queue-lane.test.ts      |  56 ++++++-
 .../src/commands/integrate-queue-list.ts           |  38 +++++
 .../src/commands/integrate-queue-render.ts         |  64 ++++++++
 .../src/commands/integrate-queue.command.test.ts   |  10 +-
 .../src/commands/integrate-queue.command.ts        |  66 +++-----
 packages/agentplane/src/commands/pr/pr.command.ts  |  10 +-
 .../src/commands/provider-ops-results.test.ts      | 134 ++++++++++++++++
 .../src/commands/release/plan.command.ts           |  67 ++++++--
 .../agentplane/src/commands/release/plan.render.ts |  13 ++
 .../agentplane/src/commands/release/plan.test.ts   |  35 +++--
 24 files changed, 1229 insertions(+), 271 deletions(-)
```

</details>
