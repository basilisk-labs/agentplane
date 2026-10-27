Task: `202610262005-459E82`
Title: Require supported Node versions for tsup 9 development
Canonical task record: `.agentplane/tasks/202610262005-459E82/README.md`

## Summary

Require supported Node versions for tsup 9 development

Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.

## Scope

- In scope: Before merging tsup 9, constrain only the repository root development engine to ^24.11.0 || >=26.0.0 and update its exact workflow Node engine contract expectation. Keep published package runtime floors unchanged.
- Out of scope: unrelated refactors not required for "Require supported Node versions for tsup 9 development".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T03:45:19.959Z
- Branch: task/202610262005-459E82/require-supported-node-versions-for-tsup-9-devel
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                                            | 2 +-
 .../src/commands/release/workflow-node-version-contract.test.ts         | 2 +-
 2 files changed, 2 insertions(+), 2 deletions(-)
```

</details>
