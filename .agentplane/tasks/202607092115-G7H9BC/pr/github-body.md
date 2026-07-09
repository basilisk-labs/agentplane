Task: `202607092115-G7H9BC`
Title: Harden patch-release quality and routing contracts
Canonical task record: `.agentplane/tasks/202607092115-G7H9BC/README.md`

## Summary

Harden patch-release quality and routing contracts

Fix jscpd v5 clone detection, align architecture Node support with declared engines, make route blockers and repairs exhaustive with surfaced local probe diagnostics, and prevent ambiguous wiki links from resolving nondeterministically.

## Scope

Implementation scope: package.json; scripts/README.md; scripts/checks/check-clone-baseline.mjs; scripts/checks/run-depcruise-arch.mjs; scripts/checks/check-lifecycle-invariants.mjs; focused script tests; packages/agentplane/src/commands/shared/route-*.ts and focused tests; packages/agentplane/src/commands/context/wiki-reports.ts and its unit tests.
Release target: patch 0.6.22. No version bump or npm publication in this task.

## Verification

- State: ok
- Note:

```text
Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and
2127 tests; policy routing and doctor completed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-09T21:17:08.700Z
- Branch: task/202607092115-G7H9BC/harden-patch-release-quality-and-routing-contrac
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   2 +-
 .../src/cli/check-clone-baseline-script.test.ts    |  78 ++++++
 .../src/commands/context/wiki-reports.ts           |  53 +++--
 .../src/commands/context/wiki-reports.unit.test.ts |  28 +++
 .../release/workflow-node-version-contract.test.ts |  14 ++
 .../src/commands/shared/route-decision-blockers.ts |   4 +-
 .../src/commands/shared/route-decision-repair.ts   | 169 +++++++++++++
 .../route-decision.source-confidence.test.ts       |  21 ++
 .../src/commands/shared/route-decision.ts          | 263 +++++----------------
 .../agentplane/src/commands/shared/route-oracle.ts |  19 +-
 scripts/README.md                                  |   2 +-
 scripts/checks/check-clone-baseline.mjs            |   3 +-
 scripts/checks/check-lifecycle-invariants.mjs      |  20 +-
 scripts/checks/run-depcruise-arch.mjs              |   6 +-
 14 files changed, 449 insertions(+), 233 deletions(-)
```

</details>
