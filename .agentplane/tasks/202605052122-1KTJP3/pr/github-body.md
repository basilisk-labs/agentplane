Task: `202605052122-1KTJP3`
Title: Add structured blueprint intent contract

## Summary

Add structured blueprint intent contract

Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.

## Scope

- In scope: Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
- Out of scope: unrelated refactors not required for "Add structured blueprint intent contract".

## Verification

- State: ok
- Note: Verified: structured blueprint intent fields, resolver precedence, task creation flags, commit-scope synchronization, schema/docs generation, and focused regression tests passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T21:32:47.578Z
- Branch: task/202605052122-1KTJP3/structured-blueprint-intent
- Head: 56a624633c72

```text
 docs/developer/blueprints.mdx                      | 100 ++++++++++
 docs/user/cli-reference.generated.mdx              |  11 +-
 .../src/backends/task-backend/shared/record.ts     |  46 +++++
 .../src/backends/task-backend/shared/types.ts      |  19 ++
 packages/agentplane/src/blueprints/index.ts        |   1 +
 packages/agentplane/src/blueprints/model.ts        |  10 +
 packages/agentplane/src/blueprints/resolve.test.ts |  28 +++
 packages/agentplane/src/blueprints/resolve.ts      |  27 ++-
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |  47 +++++
 .../src/cli/run-cli.core.tasks.create.test.ts      |  42 +++++
 .../src/commands/blueprint/blueprint.command.ts    |   5 +-
 .../src/commands/blueprint/task-input.ts           |  43 ++++-
 .../src/commands/hooks/run.commit-msg.ts           |  54 +++++-
 packages/agentplane/src/commands/task/new.spec.ts  |  49 +++++
 packages/agentplane/src/commands/task/new.ts       |  82 +++++++-
 packages/agentplane/src/policy/model.ts            |   2 +
 .../agentplane/src/policy/rules/commit-subject.ts  |   1 +
 .../src/runtime/task-intake/resolve-materialize.ts |   8 +
 .../src/runtime/task-intake/resolve-normalize.ts   |   6 +
 .../agentplane/src/runtime/task-intake/types.ts    |   4 +
 .../schemas/task-readme-frontmatter.schema.json    | 205 +++++++++++++++++---
 packages/core/schemas/tasks-export.schema.json     | 207 ++++++++++++++++++---
 packages/core/src/commit/commit-policy.test.ts     |  34 ++++
 packages/core/src/commit/commit-policy.ts          |  64 +++++++
 packages/core/src/commit/index.ts                  |   4 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  32 ++++
 packages/core/src/tasks/task-readme.ts             |   4 +
 .../schemas/task-readme-frontmatter.schema.json    | 205 +++++++++++++++++---
 packages/spec/schemas/tasks-export.schema.json     | 207 ++++++++++++++++++---
 schemas/task-readme-frontmatter.schema.json        | 205 +++++++++++++++++---
 schemas/tasks-export.schema.json                   | 207 ++++++++++++++++++---
 31 files changed, 1778 insertions(+), 181 deletions(-)
```

</details>
