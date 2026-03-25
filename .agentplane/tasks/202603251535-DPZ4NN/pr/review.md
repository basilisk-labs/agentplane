# PR Review

Opened by CODER on 2026-03-25T16:36:49.356Z
Branch: task/202603251535-DPZ4NN/task-artifact-schemas

## Summary

- 

## Checklist

- [ ] Tests added/updated
- [ ] Lint/format passes
- [ ] Verify passed
- [ ] Docs updated (if needed)

## Handoff Notes

<!-- Add review notes here. -->

<!-- BEGIN AUTO SUMMARY -->
- Updated: 2026-03-25T17:35:20.982Z
- Branch: task/202603251535-DPZ4NN/task-artifact-schemas
- Head: 6cf1fd7936e0
- Diffstat:
```
 .agentplane/tasks/202603251535-DPZ4NN/README.md    |  96 +++-
 .../tasks/202603251535-DPZ4NN/pr/diffstat.txt      |  32 ++
 .agentplane/tasks/202603251535-DPZ4NN/pr/meta.json |  12 +
 .agentplane/tasks/202603251535-DPZ4NN/pr/review.md |  60 ++
 .../tasks/202603251535-DPZ4NN/pr/verify.log        |   0
 .../src/backends/task-backend.load.test.ts         |   9 +-
 .../src/backends/task-backend.local.test.ts        |  50 ++
 .../agentplane/src/backends/task-backend.test.ts   |  15 +-
 .../src/backends/task-backend/local-backend.ts     |  75 ++-
 .../src/backends/task-backend/shared/export.ts     |  97 +++-
 .../agentplane/src/commands/doctor.command.test.ts |   4 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  16 +-
 packages/agentplane/src/commands/shared/pr-meta.ts |  30 +-
 .../agentplane/src/commands/shared/task-backend.ts |  13 +-
 packages/core/schemas/pr-meta.schema.json          |  51 ++
 .../schemas/task-readme-frontmatter.schema.json    | 536 +++++++++++++++++
 packages/core/schemas/tasks-export.schema.json     | 573 +++++++++++++++++++
 packages/core/src/index.ts                         |  14 +
 .../core/src/tasks/task-artifact-schema.test.ts    | 127 +++++
 packages/core/src/tasks/task-artifact-schema.ts    | 529 +++++++++++++++++
 packages/core/src/tasks/task-store.test.ts         |  38 ++
 packages/core/src/tasks/task-store.ts              |  34 +-
 packages/core/src/tasks/tasks-export.test.ts       |  18 +-
 packages/core/src/tasks/tasks-export.ts            |  80 ++-
 packages/core/src/tasks/tasks-lint.ts              |   3 +
 .../spec/examples/task-readme-frontmatter.json     |   2 +
 packages/spec/examples/tasks.json                  |  12 +
 packages/spec/schemas/pr-meta.schema.json          |  46 +-
 .../schemas/task-readme-frontmatter.schema.json    | 521 ++++++++++++++++-
 packages/spec/schemas/tasks-export.schema.json     | 632 ++++++++++++++++++---
 scripts/sync-schemas.mjs                           |  95 +++-
 31 files changed, 3602 insertions(+), 218 deletions(-)
```
<!-- END AUTO SUMMARY -->
