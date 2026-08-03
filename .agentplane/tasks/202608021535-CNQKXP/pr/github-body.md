Task: `202608021535-CNQKXP`
Title: Add compatibility retirement inventory and doctor legacy
Canonical task record: `.agentplane/tasks/202608021535-CNQKXP/README.md`

## Summary

Add compatibility retirement inventory and doctor legacy

Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.

## Scope

- In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
- Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".

## Verification

- State: ok
- Note:

```text
PASS at bc76eb0c6: compatibility retirement inventory, doctor legacy, advanced repair migration,
package contract, and legacy alias compatibility verified.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T18:26:44.047Z
- Branch: task/202608021535-CNQKXP/add-compatibility-retirement-inventory-and-docto
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/breaking-changes.mdx                     |   7 +-
 docs/user/cli-reference.generated.mdx              |  15 -
 docs/user/commands.mdx                             |  13 +
 packages/agentplane/README.md                      |  16 +-
 .../assets/compatibility-retirement-manifest.json  | 152 ++++++++
 .../src/cli/run-cli.core.help-contract.test.ts     |  38 ++
 .../cli/run-cli.core.pr-conflict-rework.test.ts    |  29 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  13 +-
 .../src/cli/run-cli/command-catalog.test.ts        |  10 +
 .../src/cli/run-cli/command-catalog/core.ts        |   6 +
 .../run-cli/command-catalog/integration-queue.ts   |  13 +
 .../src/cli/run-cli/command-loaders/core.ts        |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |  12 +
 .../agentplane/src/commands/doctor-legacy.run.ts   |  32 ++
 .../agentplane/src/commands/doctor-legacy.spec.ts  |  18 +
 .../src/commands/doctor/legacy-manifest.ts         | 141 ++++++++
 .../src/commands/doctor/legacy-probes.test.ts      | 259 ++++++++++++++
 .../src/commands/doctor/legacy-probes.ts           | 395 +++++++++++++++++++++
 .../src/commands/integrate-queue.command.ts        |   3 +-
 .../src/commands/integrate-queue.spec.ts           |   3 +-
 .../src/commands/pr/conflict-rework.command.ts     |   2 +-
 packages/agentplane/src/commands/repair.command.ts |  83 +++++
 .../commands/shared/workflow-operation-prefix.ts   |   7 +-
 .../workflow-operation-projection.registry.test.ts |   5 +-
 .../shared/workflow-operation-projection.ts        |   5 +-
 .../shared/workflow-step-projections.test.ts       |   5 +-
 .../baselines/v0.7-compatibility-candidate.json    | 125 ++++++-
 .../check-compatibility-contract-baseline.mjs      |  63 +++-
 scripts/lib/package-tarball-policy.mjs             |   1 +
 .../release/check-local-tarball-install-smoke.mjs  |  16 +
 30 files changed, 1417 insertions(+), 73 deletions(-)
```

</details>
