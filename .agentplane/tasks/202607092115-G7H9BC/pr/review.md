# PR Review

Created: 2026-07-09T21:17:08.700Z

## Task

- Task: `202607092115-G7H9BC`
- Title: Harden patch-release quality and routing contracts
- Status: DOING
- Branch: `task/202607092115-G7H9BC/harden-patch-release-quality-and-routing-contrac`
- Canonical task record: `.agentplane/tasks/202607092115-G7H9BC/README.md`

## Verification

- State: ok
- Note: Verified: ci:contract passed including clone and architecture gates; test:fast passed 359 files and 2127 tests; policy routing and doctor completed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
