Task: `202605061546-9JE6YN`
Title: Expose blueprint route in task lifecycle surfaces
Canonical task record: `.agentplane/tasks/202605061546-9JE6YN/README.md`

## Summary

Expose blueprint route in task lifecycle surfaces

Show resolved blueprint route on task show, task list, and task verify-show so agents can see the selected route without running separate blueprint diagnostics.

## Scope

- In scope: Show resolved blueprint route on task show, task list, and task verify-show so agents can see the selected route without running separate blueprint diagnostics.
- Out of scope: unrelated refactors not required for "Expose blueprint route in task lifecycle surfaces".

## Verification

- State: ok
- Note: Verified: task show/list/verify-show expose resolved blueprint route; focused lifecycle and blueprint tests, typecheck, docs:cli:check, routing, doctor, and diff check passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T15:56:41.479Z
- Branch: task/202605061546-9JE6YN/blueprint-task-lifecycle
- Head: 01e9489d0798

```text
 .agentplane/tasks/202605061546-6XX986/README.md    |  87 ++++
 .../blueprint/resolved-snapshot.json               | 342 ++++++++++++++
 .../blueprint/resolved-snapshot.json               | 498 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  26 ++
 docs/user/cli-reference.generated.mdx              |   4 +-
 .../cli/run-cli.core.tasks.query-listing.test.ts   |   7 +-
 .../src/commands/task/blueprint-summary.ts         |  77 ++++
 packages/agentplane/src/commands/task/list.spec.ts |   2 +-
 packages/agentplane/src/commands/task/list.ts      |  13 +-
 .../src/commands/task/shared/dependencies.ts       |   7 +-
 packages/agentplane/src/commands/task/show.spec.ts |   2 +-
 packages/agentplane/src/commands/task/show.ts      |   9 +-
 12 files changed, 1065 insertions(+), 9 deletions(-)
```

</details>
