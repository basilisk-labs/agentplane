# PR Review

Opened by CODER on 2026-03-31T14:37:17.039Z
Branch: task/202603311331-PRG60Z/migrate-task-run-handoff-emitters

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
- Updated: 2026-03-31T14:37:22.388Z
- Branch: task/202603311331-PRG60Z/migrate-task-run-handoff-emitters
- Head: 231922cec444
- Diffstat:
```
 .agentplane/tasks/202603311331-PRG60Z/README.md    |  58 +++++++--
 .../src/cli/run-cli.core.tasks.query.test.ts       | 131 +++++++++++++++++++--
 .../src/commands/task/handoff-record.command.ts    |  29 +++--
 .../src/commands/task/handoff-show.command.ts      |  47 +++++---
 .../src/commands/task/reclaim.command.ts           |  21 ++--
 .../src/commands/task/run-cancel.command.ts        |  23 ++--
 .../src/commands/task/run-resume.command.ts        |  31 +++--
 .../src/commands/task/run-retry.command.ts         |  33 ++++--
 .../src/commands/task/run-show.command.ts          |  95 ++++++++-------
 9 files changed, 333 insertions(+), 135 deletions(-)
```
<!-- END AUTO SUMMARY -->
