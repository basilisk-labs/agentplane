# PR Review

Created: 2026-07-10T01:07:58.209Z

## Batch Tasks

- Primary: `202607100106-YP0PYE`
- Closure policy: `all_or_fail`
- Included: `202607100140-WGV79Y`

## Task

- Task: `202607100106-YP0PYE`
- Title: Bound context extraction batches by source bytes and prevent duplicate ingestion
- Status: DOING
- Branch: `task/202607100106-YP0PYE/bound-context-extraction-batches-by-source-bytes`
- Canonical task record: `.agentplane/tasks/202607100106-YP0PYE/README.md`

## Verification

- State: ok
- Note: Pass: focused context harvest tests 14/14; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,139 tests; live CLI help and dry-run confirmed batch-bytes, source byte totals, oversized ids, and batch fingerprints.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T01:29:12.616Z
- Branch: task/202607100106-YP0PYE/bound-context-extraction-batches-by-source-bytes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   3 +
 .agentplane/tasks/202607100140-WGV79Y/README.md    | 280 ++++++++++
 .../blueprint/resolved-snapshot.json               | 580 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  22 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  23 +
 docs/user/cli-reference.generated.mdx              |   1 +
 .../cli/run-cli.core.route-decision.batch.test.ts  | 103 ++++
 .../src/commands/context/context-runner.ts         |   2 +
 .../src/commands/context/context.learn.spec.ts     |  10 +
 .../src/commands/context/context.spec.ts           |  10 +
 .../src/commands/context/harvest-tasks.test.ts     | 206 +++++++-
 .../src/commands/context/harvest-tasks.ts          |   4 +
 .../src/commands/shared/route-decision-blockers.ts |  19 +-
 .../src/commands/shared/task-local-freshness.ts    |  28 +-
 .../src/commands/task/finish-execute-close.ts      |  20 +-
 .../task/finish.pre-merge-closure.unit.test.ts     |  59 +++
 .../src/context/harvest-tasks-extraction.ts        | 131 +++--
 .../src/context/harvest-tasks-markers.ts           |  19 +-
 .../agentplane/src/context/harvest-tasks-model.ts  |  18 +
 23 files changed, 1681 insertions(+), 46 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
