Task: `202605061609-P86BJS`
Title: Preview blueprint route during task creation
Canonical task record: `.agentplane/tasks/202605061609-P86BJS/README.md`

## Summary

Preview blueprint route during task creation

Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.

## Scope

- In scope: Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.
- Out of scope: unrelated refactors not required for "Preview blueprint route during task creation".

## Verification

- State: ok
- Note: Preview flag verified: task new keeps stdout as the generated id and emits resolved blueprint route details to stderr when --show-blueprint is passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T16:24:37.002Z
- Branch: task/202605061609-P86BJS/blueprint-task-new-preview
- Head: 281f0acd803c

```text
 .../blueprint/resolved-snapshot.json               | 498 +++++++++++++++++++++
 .agentplane/tasks/202605061609-PD9A1Y/README.md    |  90 ++++
 .../blueprint/resolved-snapshot.json               | 342 ++++++++++++++
 docs/developer/blueprints.mdx                      |  26 +-
 docs/user/cli-reference.generated.mdx              |   8 +
 .../run-cli.core.help-snap.test.ts.snap            |  23 +
 .../src/cli/run-cli.core.tasks.create.test.ts      |  46 ++
 .../src/commands/task/blueprint-summary.ts         |  28 ++
 packages/agentplane/src/commands/task/new.spec.ts  |  13 +
 packages/agentplane/src/commands/task/new.ts       |  13 +
 10 files changed, 1086 insertions(+), 1 deletion(-)
```

</details>
