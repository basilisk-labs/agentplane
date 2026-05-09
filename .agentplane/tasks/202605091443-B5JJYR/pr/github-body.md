Task: `202605091443-B5JJYR`
Title: Deduplicate async JSON file reader
Canonical task record: `.agentplane/tasks/202605091443-B5JJYR/README.md`

## Summary

Deduplicate async JSON file reader

Add a shared async JSON file reader for agentplane CLI code and replace the duplicated release preflight and task-index readJsonFile helpers while preserving their different error handling behavior.

## Scope

- In scope: Add a shared async JSON file reader for agentplane CLI code and replace the duplicated release preflight and task-index readJsonFile helpers while preserving their different error handling behavior.
- Out of scope: unrelated refactors not required for "Deduplicate async JSON file reader".

## Verification

- State: ok
- Note: Async JSON reader deduplication verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T14:56:13.910Z
- Branch: task/202605091443-B5JJYR/async-json-reader
- Head: ca94aa77d8f3

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 packages/agentplane/src/backends/task-index.ts     |  18 +-
 .../src/commands/release/apply.preflight.plan.ts   |   5 +-
 packages/agentplane/src/shared/json-io.test.ts     |  37 ++
 packages/agentplane/src/shared/json-io.ts          |  17 +
 5 files changed, 553 insertions(+), 20 deletions(-)
```

</details>
