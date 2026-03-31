# PR Review

Opened by CODER on 2026-03-31T12:16:06.629Z
Branch: task/202603301857-DMYRDF/collapse-runtime-dead-wrappers

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
- Updated: 2026-03-31T12:16:14.578Z
- Branch: task/202603301857-DMYRDF/collapse-runtime-dead-wrappers
- Head: b673366008d2
- Diffstat:
```
 .agentplane/tasks/202603301857-DMYRDF/README.md    | 102 ++++++++++++++++++---
 packages/agentplane/src/commands/block.command.ts  |   4 -
 .../agentplane/src/commands/doctor.command.test.ts |   2 +-
 packages/agentplane/src/commands/doctor.command.ts |   2 -
 .../agentplane/src/commands/doctor.fast.test.ts    |   2 +-
 packages/agentplane/src/commands/finish.command.ts |   4 -
 .../src/commands/recipes.test-helpers.ts           |   2 +-
 .../src/commands/recipes/install.command.ts        |   2 -
 packages/agentplane/src/commands/start.command.ts  |   4 -
 .../agentplane/src/commands/task/list.command.ts   |   4 -
 .../agentplane/src/commands/task/next.command.ts   |   4 -
 .../agentplane/src/commands/task/search.command.ts |   4 -
 .../agentplane/src/commands/task/show.command.ts   |   4 -
 packages/agentplane/src/commands/verify.command.ts |   4 -
 .../src/commands/workflow.verify-hooks.test.ts     |   2 +-
 15 files changed, 93 insertions(+), 53 deletions(-)
```
<!-- END AUTO SUMMARY -->
