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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T03:24:25.275Z
- Branch: task/202607221908-7WV0A7/migrate-provider-integration-release-and-ops-com
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        | 106 +++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  36 ++++--
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  33 +++++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  15 ++-
 .../src/cli/run-cli/command-catalog/project.ts     | 119 ++++++++++++-----
 .../provider-ops-capability-profiles.ts            |  39 ++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  52 ++++++--
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  20 ++-
 .../src/cli/run-cli/command-loaders/project.ts     | 142 ++++++++++++---------
 .../src/cli/run-cli/command-loaders/task.ts        |  16 ++-
 .../src/commands/integrate-queue.command.ts        |  13 +-
 packages/agentplane/src/commands/pr/pr.command.ts  |  10 +-
 13 files changed, 456 insertions(+), 152 deletions(-)
```

</details>
