# PR Review

Opened by CODER on 2026-03-31T15:30:17.101Z
Branch: task/202603311331-2VHKVQ/bulk-task-mutators

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
- Updated: 2026-03-31T15:30:24.128Z
- Branch: task/202603311331-2VHKVQ/bulk-task-mutators
- Head: ecbd71c889de
- Diffstat:
```
 .agentplane/tasks/202603311331-2VHKVQ/README.md    | 58 +++++++++++----
 .../src/commands/shared/task-mutation.test.ts      | 53 ++++++++++++++
 .../src/commands/shared/task-mutation.ts           | 22 +++++-
 packages/agentplane/src/commands/task/add.ts       | 84 +++++++++++-----------
 packages/agentplane/src/commands/task/normalize.ts | 32 +++++----
 packages/agentplane/src/commands/task/scrub.ts     | 46 ++++++------
 6 files changed, 208 insertions(+), 87 deletions(-)
```
<!-- END AUTO SUMMARY -->
