Task: `202605271730-QSZ1R3`
Title: Harden patch-release workflow ergonomics
Canonical task record: `.agentplane/tasks/202605271730-QSZ1R3/README.md`

## Summary

Harden patch-release workflow ergonomics

Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.

## Scope

- In scope: Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.
- Out of scope: unrelated refactors not required for "Harden patch-release workflow ergonomics".

## Verification

- State: ok
- Note:

```text
Implemented preflight role/active-task summary, hosted PR check waiting, integration queue doctor,
SQLite warning suppression, and lifecycle invariant gate. Verified with typecheck, targeted lint,
focused tests, docs freshness checks, lifecycle invariants, policy routing, doctor, preflight smoke,
and queue doctor smoke.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T17:32:19.320Z
- Branch: task/202605271730-QSZ1R3/patch-workflow-hardening
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  28 ++++
 package.json                                       |   3 +-
 .../run-cli.core.help-snap.test.ts.snap            |  91 +++++------
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../cli/run-cli/commands/core/preflight-render.ts  |  14 +-
 .../cli/run-cli/commands/core/preflight-report.ts  |  56 ++++++-
 .../src/cli/run-cli/commands/core/preflight.ts     |  12 +-
 .../src/commands/integrate-queue-doctor.ts         |  37 +++++
 .../src/commands/integrate-queue.command.ts        |  92 +++++++++++
 .../src/commands/integrate-queue.spec.test.ts      |  85 ++++++++++
 .../src/commands/integrate-queue.spec.ts           |  87 ++++++++++-
 packages/agentplane/src/commands/pr/check.ts       |  21 +++
 packages/agentplane/src/commands/pr/flow-status.ts |  75 +--------
 .../agentplane/src/commands/pr/hosted-checks.ts    | 171 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/pr.command.ts  |   5 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  56 ++++++-
 .../src/commands/pr/pr.spec.unit.test.ts           |  30 ++++
 packages/agentplane/src/shared/sqlite-driver.ts    |  46 +++++-
 scripts/README.md                                  |   4 +-
 scripts/checks/check-lifecycle-invariants.mjs      |  65 ++++++++
 21 files changed, 859 insertions(+), 126 deletions(-)
```

</details>
