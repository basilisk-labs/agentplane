Task: `202607221908-7WV0A7`
Title: Migrate provider, integration, release, and ops command boundaries
Canonical task record: `.agentplane/tasks/202607221908-7WV0A7/README.md`

## Summary

Migrate provider, integration, release, and ops command boundaries

RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.

## Scope

- In scope: exact CommandSession capability profiles for PR, integration queue, hosted-close, cleanup, release, and adjacent provider/ops command families; parsed-intent session selection; representative typed result and renderer seams for integration queue list/doctor and release plan; runtime authority-denial, recovery, output-parity, and exact-SHA regression evidence.
- Out of scope: repository-wide removal of legacy CommandNeeds/coarse context consumers and completion of typed use-case/rendering boundaries for every command; those remain owned by 202607221854-SDPFN0 and 202607221854-PGPR3J. Granting publication authority or changing protected-main policy also remains out of scope.

## Verification

- State: ok
- Note: PASS: provider/release vertical verified with SHA-bound command and runtime recovery evidence.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T03:24:25.275Z
- Branch: task/202607221908-7WV0A7/migrate-provider-integration-release-and-ops-com
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        | 114 ++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  36 ++--
 .../run-cli/command-catalog/integration-queue.ts   |  83 +++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  70 ++++++++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  15 +-
 .../src/cli/run-cli/command-catalog/project.ts     | 110 ++++++------
 .../provider-ops-capability-profiles.ts            |  82 +++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  52 ++++--
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  20 ++-
 .../src/cli/run-cli/command-loaders/project.ts     | 180 +++++++++++++------
 .../src/cli/run-cli/command-loaders/task.ts        |  16 +-
 .../src/cli/run-cli/registry.run.test.ts           | 194 +++++++++++++++++++++
 .../src/commands/integrate-queue-doctor-command.ts | 127 +++++++++-----
 .../src/commands/integrate-queue-lane.test.ts      |  57 +++++-
 .../src/commands/integrate-queue-list.ts           |  38 ++++
 .../src/commands/integrate-queue-render.ts         |  64 +++++++
 .../src/commands/integrate-queue.command.test.ts   |  10 +-
 .../src/commands/integrate-queue.command.ts        |  67 +++----
 packages/agentplane/src/commands/pr/pr.command.ts  |  10 +-
 .../src/commands/provider-ops-results.test.ts      | 134 ++++++++++++++
 .../src/commands/release/plan.command.ts           | 105 +++++++----
 .../agentplane/src/commands/release/plan.render.ts |  13 ++
 .../agentplane/src/commands/release/plan.test.ts   |  36 +++-
 24 files changed, 1346 insertions(+), 294 deletions(-)
```

</details>
