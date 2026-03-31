# PR Review

Opened by CODER on 2026-03-31T17:10:22.395Z
Branch: task/202603311331-Z22BB6/move-remaining-report-families-onto-emitters

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
- Updated: 2026-03-31T17:10:55.760Z
- Branch: task/202603311331-Z22BB6/move-remaining-report-families-onto-emitters
- Head: c6244a8d0938
- Diffstat:
```
 .agentplane/tasks/202603311331-Z22BB6/README.md    | 58 +++++++++++++++++-----
 .../tasks/202603311331-Z22BB6/pr/diffstat.txt      |  0
 .agentplane/tasks/202603311331-Z22BB6/pr/meta.json | 12 +++++
 .agentplane/tasks/202603311331-Z22BB6/pr/review.md | 22 ++++++++
 .../tasks/202603311331-Z22BB6/pr/verify.log        |  0
 .../src/cli/run-cli.core.backend-sync.test.ts      |  3 +-
 packages/agentplane/src/commands/backend.ts        | 39 +++++++--------
 packages/agentplane/src/commands/branch/base.ts    | 18 ++++---
 .../src/commands/branch/cleanup-merged.ts          | 17 +++----
 packages/agentplane/src/commands/branch/remove.ts  |  7 +--
 packages/agentplane/src/commands/branch/status.ts  |  9 ++--
 .../agentplane/src/commands/branch/work-start.ts   | 17 +++----
 packages/agentplane/src/commands/pr/check.ts       |  5 +-
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 13 +++--
 .../src/commands/pr/integrate/internal/finalize.ts |  7 ++-
 .../agentplane/src/commands/pr/integrate/verify.ts |  7 +--
 packages/agentplane/src/commands/pr/note.ts        |  5 +-
 packages/agentplane/src/commands/pr/open.ts        |  5 +-
 packages/agentplane/src/commands/pr/update.ts      |  7 ++-
 .../src/commands/release/apply.command.ts          | 14 +++---
 .../src/commands/release/plan.command.ts           | 12 +++--
 .../src/commands/scenario/execute.command.ts       | 23 ++++-----
 .../src/commands/scenario/impl/commands.ts         | 47 ++++++++----------
 packages/agentplane/src/commands/upgrade/report.ts | 14 +++---
 24 files changed, 212 insertions(+), 149 deletions(-)
```
<!-- END AUTO SUMMARY -->
