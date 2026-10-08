Task: `202610081722-JBCX2J`
Title: Allow bounded full regression to complete on constrained release hosts
Canonical task record: `.agentplane/tasks/202610081722-JBCX2J/README.md`

## Summary

Allow bounded full regression to complete on constrained release hosts

Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.

## Scope

- In scope: Repair the hardcoded 90-minute ci:local:full outer timeout exposed by NDWDC5 canonical final validation 115dfcedac5b9c50c1ebc25b09ef53b2b3af26652d6e3890eeceaad6b9298426 (SIGTERM after 5405721ms). Use the existing finite 150-minute qualification budget already established for release:ci-check, preserve explicit shorter timeout precedence and unrelated 30-minute defaults, and qualify actual runner invocation. This is authorized release 0.7.13 repair, not a check waiver. Preserve all failed evidence and all required checks.
- Out of scope: unrelated refactors not required for "Allow bounded full regression to complete on constrained release hosts".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T17:35:56.266Z
- Branch: task/202610081722-JBCX2J/allow-bounded-full-regression-to-complete-on-con
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/direct-task-verification.qualification.test.ts    | 2 ++
 packages/agentplane/src/commands/task/direct-task-verification.test.ts  | 2 +-
 packages/agentplane/src/commands/task/direct-task-verification.ts       | 2 +-
 3 files changed, 4 insertions(+), 2 deletions(-)
```

</details>
