Task: `202607311404-P746PE`
Title: Bind verification records to semantic review targets
Canonical task record: `.agentplane/tasks/202607311404-P746PE/README.md`

## Summary

Bind verification records to semantic review targets

Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.

## Scope

- In scope: Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.
- Out of scope: unrelated refactors not required for "Bind verification records to semantic review targets".

## Verification

- State: ok
- Note: PASS after rework: branch_pr, batch, semantic-advance, focused, and critical checks pass at 6141e3600.
- Canonical workflow state lives in the task README.

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
