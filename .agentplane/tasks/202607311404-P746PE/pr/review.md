# PR Review

Created: 2026-07-31T14:05:33.781Z

## Task

- Task: `202607311404-P746PE`
- Title: Bind verification records to semantic review targets
- Status: DOING
- Branch: `task/202607311404-P746PE/bind-verification-records-to-semantic-review-tar`
- Canonical task record: `.agentplane/tasks/202607311404-P746PE/README.md`

## Verification

- State: ok
- Note: PASS after rework: branch_pr, batch, semantic-advance, focused, and critical checks pass at 6141e3600.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T14:05:54.431Z
- Branch: task/202607311404-P746PE/bind-verification-records-to-semantic-review-tar
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-qualification-review.ts    |   4 +-
 .../commands/evaluator/evaluator-review-usecase.ts |   4 +-
 .../evaluator/evaluator-runtime-evidence.test.ts   | 289 ++++++++++++++++++++-
 .../src/commands/pr/integrate/internal/prepare.ts  |   4 +-
 .../commands/pr/internal/sync-batch-ownership.ts   |  22 ++
 .../src/commands/task/verify-record-execute.ts     |  11 +-
 6 files changed, 320 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
