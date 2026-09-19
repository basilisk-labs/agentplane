Task: `202609191838-3YNJ3Y`
Title: Repair ACR native identity and release real-E2E fixtures
Canonical task record: `.agentplane/tasks/202609191838-3YNJ3Y/README.md`

## Summary

Repair ACR native identity and release real-E2E fixtures

Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.

## Scope

- In scope: Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
- Out of scope: unrelated refactors not required for "Repair ACR native identity and release real-E2E fixtures".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T18:44:10.802Z
- Branch: task/202609191838-3YNJ3Y/canonical-3ynj3y
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  23 +++
 .../src/commands/acr/acr.command.test.ts           |  23 +++
 packages/agentplane/src/commands/acr/generate.ts   |   2 +-
 packages/agentplane/src/commands/acr/summary.ts    |   3 +-
 .../check-packaged-mixed-scope-lifecycle.mjs       | 168 ++++++++++++---------
 5 files changed, 142 insertions(+), 77 deletions(-)
```

</details>
