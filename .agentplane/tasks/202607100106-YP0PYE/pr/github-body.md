Task: `202607100106-YP0PYE`
Title: Bound context extraction batches by source bytes and prevent duplicate ingestion
Canonical task record: `.agentplane/tasks/202607100106-YP0PYE/README.md`

## Batch Tasks

- Primary: `202607100106-YP0PYE`
- Closure policy: `all_or_fail`
- Included: `202607100140-WGV79Y`

## Summary

Bound context extraction batches by source bytes and prevent duplicate ingestion

For v0.6.22, make task-history context extraction batching respect a deterministic serialized-source byte budget in addition to task count, isolate oversized single sources, surface batch byte metadata, and converge queued/ingested duplicate detection on the same versioned source fingerprint without breaking existing CLI defaults.

## Scope

- In scope: packages/agentplane context harvest CLI parsing, task-source fingerprint helpers, extraction batch planning, batch metadata, duplicate-selection logic, and focused tests (target: at most 8 implementation/test files).
- Acceptance: batches obey both --batch-size and --batch-bytes; a single oversized source is isolated without being dropped; output reports deterministic byte totals and oversized state; unchanged tasks already queued or ingested are not queued again unless explicitly selected with --task.
- Compatibility: preserve the existing --batch-size default and accept legacy source_digest markers.
- Out of scope: source document chunking inside a single task, wiki topology/schema changes already delivered by 202607100021-S11TCN, and unrelated release refactors.

## Verification

- State: ok
- Note:

```text
Pass after review fix: context harvest tests 15/15; lifecycle/batch tests 19/19; AgentPlane
typecheck; lint:core; ci:contract; targeted local CI; full fast suite 361 files and 2,144 tests.
Live dry-run reported source_bytes=17,873, exactly matching README plus available ACR bytes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T01:29:12.616Z
- Branch: task/202607100106-YP0PYE/bound-context-extraction-batches-by-source-bytes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   3 +
 .agentplane/tasks/202607100140-WGV79Y/README.md    | 412 +++++++++++++++
 .../blueprint/resolved-snapshot.json               | 580 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  22 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  23 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  23 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  23 +
 docs/user/cli-reference.generated.mdx              |   1 +
 .../cli/run-cli.core.route-decision.batch.test.ts  | 103 ++++
 .../src/commands/context/context-runner.ts         |   2 +
 .../src/commands/context/context.learn.spec.ts     |  10 +
 .../src/commands/context/context.spec.ts           |  10 +
 .../src/commands/context/harvest-tasks.test.ts     | 280 +++++++++-
 .../src/commands/context/harvest-tasks.ts          |  27 +-
 .../pr/internal/sync-batch-ownership.test.ts       |  53 +-
 .../commands/pr/internal/sync-batch-ownership.ts   |  19 +
 .../agentplane/src/commands/pr/internal/sync.ts    |  14 +
 .../src/commands/shared/route-decision-blockers.ts |  19 +-
 .../src/commands/shared/task-local-freshness.ts    |  28 +-
 .../src/commands/task/finish-execute-close.ts      |  20 +-
 .../src/commands/task/finish-execute-commit.ts     |  51 +-
 .../task/finish.pre-merge-closure.unit.test.ts     |  59 +++
 .../task/finish.quality-review-target.unit.test.ts |  35 ++
 .../src/context/harvest-tasks-artifacts.ts         |  19 +-
 .../src/context/harvest-tasks-extraction.ts        | 136 +++--
 .../src/context/harvest-tasks-markers.ts           | 104 +++-
 .../agentplane/src/context/harvest-tasks-model.ts  |  18 +
 35 files changed, 2405 insertions(+), 68 deletions(-)
```

</details>
