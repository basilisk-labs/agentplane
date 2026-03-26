# PR Review

Opened by CODER on 2026-03-26T19:40:10.943Z
Branch: task/202603251535-H2EGEM/pr-artifact-state

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
- Updated: 2026-03-26T19:40:16.296Z
- Branch: task/202603251535-H2EGEM/pr-artifact-state
- Head: e9a0e935fa6a
- Diffstat:
```
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   2 +
 .../pr/integrate/internal/finalize.test.ts         |  71 ++++--
 .../src/commands/pr/integrate/internal/finalize.ts |  81 ++++---
 .../src/commands/pr/integrate/internal/prepare.ts  |   2 +-
 packages/agentplane/src/commands/pr/open.ts        |  16 +-
 packages/agentplane/src/commands/pr/update.ts      |  10 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  42 +++-
 packages/agentplane/src/commands/shared/pr-meta.ts |  78 +++++++
 .../agentplane/src/commands/task/finish-shared.ts  | 246 ++++++++++++++++++++
 packages/agentplane/src/commands/task/finish.ts    | 248 +++------------------
 packages/core/schemas/pr-meta.schema.json          |  24 ++
 packages/core/src/tasks/task-artifact-schema.ts    |  12 +
 packages/spec/examples/pr-meta.json                |   1 +
 packages/spec/schemas/pr-meta.schema.json          |  24 ++
 14 files changed, 552 insertions(+), 305 deletions(-)
```
<!-- END AUTO SUMMARY -->
