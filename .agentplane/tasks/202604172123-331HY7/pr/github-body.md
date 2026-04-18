## Summary

Migrate task artifact schema validation to Zod

Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.

## Scope

- In scope: Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.
- Out of scope: unrelated refactors not required for "Migrate task artifact schema validation to Zod".

## Verification

- State: ok
- Note: Validated Zod-based task artifact contracts end to end: task README frontmatter, tasks export, PR meta, and task handoff schemas now validate through Zod, generated JSON schema artifacts are synced, and focused core/CLI tests plus full typecheck remained green; AJV remains only outside this migrated contract surface.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T04:50:17.507Z
- Branch: task/202604172123-331HY7/zod-task-artifact-ssot
- Head: 98d333de2903

```text
 bun.lock                                           |   6 +
 packages/core/package.json                         |   4 +-
 packages/core/schemas/pr-meta.schema.json          |  34 +-
 packages/core/schemas/task-handoff.schema.json     | 183 +++-
 .../schemas/task-readme-frontmatter.schema.json    | 197 +++--
 packages/core/schemas/tasks-export.schema.json     | 235 +++---
 packages/core/src/tasks/task-artifact-schema.ts    | 918 ++++++++-------------
 packages/spec/schemas/pr-meta.schema.json          |  34 +-
 packages/spec/schemas/task-handoff.schema.json     | 183 +++-
 .../schemas/task-readme-frontmatter.schema.json    | 197 +++--
 packages/spec/schemas/tasks-export.schema.json     | 235 +++---
 11 files changed, 1212 insertions(+), 1014 deletions(-)
```

</details>
