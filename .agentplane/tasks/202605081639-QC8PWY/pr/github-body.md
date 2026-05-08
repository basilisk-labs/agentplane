Task: `202605081639-QC8PWY`
Title: Add specialized built-in blueprint definitions
Canonical task record: `.agentplane/tasks/202605081639-QC8PWY/README.md`

## Summary

Add specialized built-in blueprint definitions

Add built-in blueprint definitions for performance.benchmark, quality.regression, and runner.execution with required evidence and stop rules.

## Scope

- In scope: Add built-in blueprint definitions for performance.benchmark, quality.regression, and runner.execution with required evidence and stop rules.
- Out of scope: unrelated refactors not required for "Add specialized built-in blueprint definitions".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T16:54:31.098Z
- Branch: task/202605081639-QC8PWY/specialized-blueprints
- Head: 77782aef768c

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  46 ++
 packages/agentplane/src/blueprints/builtins.ts     | 269 +++++++++++
 packages/agentplane/src/blueprints/model.ts        |   3 +
 packages/agentplane/src/blueprints/resolve.test.ts |  71 +++
 packages/agentplane/src/blueprints/resolve.ts      |  73 ++-
 .../agentplane/src/blueprints/validate.test.ts     |   5 +-
 .../src/commands/blueprint/task-input.test.ts      |  45 ++
 .../src/commands/blueprint/task-input.ts           |   3 +
 packages/agentplane/src/commands/task/new.ts       |   3 +
 10 files changed, 1021 insertions(+), 2 deletions(-)
```

</details>
