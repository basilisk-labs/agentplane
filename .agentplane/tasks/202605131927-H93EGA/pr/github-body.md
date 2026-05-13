Task: `202605131927-H93EGA`
Title: Resolve Codex review comments from merged PRs
Canonical task record: `.agentplane/tasks/202605131927-H93EGA/README.md`

## Summary

Resolve Codex review comments from merged PRs

Audit unresolved Codex review threads from recent merged PRs, apply still-relevant fixes as separate commits, and resolve GitHub review threads with evidence.

## Scope

- In scope: Audit unresolved Codex review threads from recent merged PRs, apply still-relevant fixes as separate commits, and resolve GitHub review threads with evidence.
- Out of scope: unrelated refactors not required for "Resolve Codex review comments from merged PRs".

## Verification

- State: ok
- Note: Resolved seven current Codex review findings from recent merged PRs with seven focused commits; targeted Vitest suite passed (66 tests) and policy routing passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:56:41.334Z
- Branch: task/202605131927-H93EGA/resolve-codex-review-comments
- Head: aea9099bc129

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        |  47 ++
 .../src/backends/task-backend/cloud-backend.ts     |  12 +-
 .../src/commands/blueprints/catalog-cache.test.ts  |  40 ++
 .../src/commands/blueprints/catalog-cache.ts       |  43 +-
 .../agentplane/src/commands/blueprints/catalog.ts  |   3 +-
 .../src/commands/doctor.command.runtime.test.ts    |  29 ++
 packages/agentplane/src/commands/doctor/fixes.ts   |  16 +-
 packages/agentplane/src/shared/env.test.ts         |  23 +
 packages/agentplane/src/shared/env.ts              |   9 +
 packages/agentplane/src/shared/git-mutation.ts     |  18 +-
 .../schemas/task-readme-frontmatter.schema.json    |   2 +-
 packages/core/schemas/tasks-export.schema.json     |   2 +-
 .../core/src/tasks/task-artifact-schema.test.ts    |  24 +
 packages/core/src/tasks/task-artifact-schema.ts    |   8 +-
 .../src/tasks/task-artifact-schema.verification.ts |   5 +-
 .../schemas/task-readme-frontmatter.schema.json    |   2 +-
 packages/spec/schemas/tasks-export.schema.json     |   2 +-
 schemas/task-readme-frontmatter.schema.json        |   2 +-
 schemas/tasks-export.schema.json                   |   2 +-
 20 files changed, 795 insertions(+), 22 deletions(-)
```

</details>
