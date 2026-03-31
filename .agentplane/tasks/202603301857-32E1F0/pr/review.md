# PR Review

Opened by CODER on 2026-03-31T10:03:43.158Z
Branch: task/202603301857-32E1F0/shared-task-projection-query

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
- Updated: 2026-03-31T10:03:57.933Z
- Branch: task/202603301857-32E1F0/shared-task-projection-query
- Head: 7451cf9a3987
- Diffstat:
```
 .agentplane/tasks/202603301857-32E1F0/README.md    | 58 +++++++++++----
 packages/agentplane/src/commands/task/list.ts      | 29 ++------
 packages/agentplane/src/commands/task/next.ts      | 40 ++--------
 packages/agentplane/src/commands/task/search.ts    | 50 +++++--------
 packages/agentplane/src/commands/task/shared.ts    |  2 +
 .../src/commands/task/shared.unit.test.ts          | 53 +++++++++++++
 .../agentplane/src/commands/task/shared/listing.ts | 86 ++++++++++++++++++++++
 7 files changed, 218 insertions(+), 100 deletions(-)
```
<!-- END AUTO SUMMARY -->
