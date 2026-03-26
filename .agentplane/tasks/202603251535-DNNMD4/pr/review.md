# PR Review

Opened by CODER on 2026-03-26T15:59:20.469Z
Branch: task/202603251535-DNNMD4/task-doc-contract

## Summary

- Tightened TaskDocContract parity by making doc-version normalization/string handling, strict ISO metadata validation, and section writes share the same contract across core task flows.

## Checklist

- [ ] Tests added/updated
- [ ] Lint/format passes
- [ ] Verify passed
- [ ] Docs updated (if needed)

## Handoff Notes

<!-- Add review notes here. -->

<!-- BEGIN AUTO SUMMARY -->
- Updated: 2026-03-26T17:10:00.195Z
- Branch: task/202603251535-DNNMD4/task-doc-contract
- Head: 4fa486e5efec
- Diffstat:
```
 .agentplane/tasks/202603251535-DNNMD4/README.md    |  70 +++++++-----
 .../tasks/202603251535-DNNMD4/pr/diffstat.txt      |   0
 .agentplane/tasks/202603251535-DNNMD4/pr/meta.json |  12 ++
 .agentplane/tasks/202603251535-DNNMD4/pr/review.md |  22 ++++
 .../tasks/202603251535-DNNMD4/pr/verify.log        |   0
 .../src/backends/task-backend.redmine.test.ts      |   2 +-
 .../src/backends/task-backend/redmine-backend.ts   |   2 +-
 .../src/backends/task-backend/redmine/mapping.ts   |   8 +-
 .../src/backends/task-backend/redmine/parse.ts     |   9 +-
 .../src/backends/task-backend/shared/constants.ts  |   4 +-
 .../src/backends/task-backend/shared/doc.ts        |   5 +-
 .../src/backends/task-backend/shared/record.ts     |   5 +-
 .../src/backends/task-backend/shared/types.ts      | 113 +++++--------------
 .../agentplane/src/commands/task/verify-record.ts  |   2 +-
 .../src/commands/task/verify-record.unit.test.ts   |   6 +-
 packages/core/src/index.ts                         |  24 ++++
 packages/core/src/tasks/task-doc-contract.ts       | 107 ++++++++++++++++++
 packages/core/src/tasks/task-doc.ts                |  16 +--
 packages/core/src/tasks/task-readme.ts             |  13 +--
 packages/core/src/tasks/task-store.test.ts         |  70 ++++++++++++
 packages/core/src/tasks/task-store.ts              | 124 +++++++--------------
 packages/core/src/tasks/tasks-export.ts            |   7 +-
 packages/core/src/tasks/tasks-lint.ts              |   3 +-
 23 files changed, 385 insertions(+), 239 deletions(-)
```
<!-- END AUTO SUMMARY -->
