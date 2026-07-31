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
- Note:

```text
PASS with immutable evidence scope: source and managed task artifacts pass range whitespace
validation at 0af1c1a64.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T14:05:54.431Z
- Branch: task/202607311404-P746PE/bind-verification-records-to-semantic-review-tar
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         |   1 +
 .../evaluator/evaluator-qualification-review.ts    |   4 +-
 .../commands/evaluator/evaluator-review-usecase.ts |   4 +-
 .../evaluator/evaluator-run.command.test.ts        |   7 +-
 .../evaluator/evaluator-runtime-evidence.test.ts   | 405 ++++++++++++++++++++-
 .../src/commands/pr/integrate/internal/prepare.ts  |   4 +-
 .../commands/pr/internal/sync-batch-ownership.ts   |  22 ++
 .../commands/shared/quality-review-target.test.ts  |  19 +
 .../src/commands/shared/quality-review-target.ts   |  95 ++++-
 .../task/qualification-packet-dependencies.ts      |   7 +-
 .../src/commands/task/verify-record-execute.ts     |  23 +-
 11 files changed, 565 insertions(+), 26 deletions(-)
```

</details>
