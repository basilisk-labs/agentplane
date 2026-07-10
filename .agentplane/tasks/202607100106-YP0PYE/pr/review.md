# PR Review

Created: 2026-07-10T01:07:58.209Z

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
 .agentplane/tasks/202607092209-F33MNN/README.md    |   2 +
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/commands/context/context-runner.ts         |   2 +
 .../src/commands/context/context.learn.spec.ts     |  10 +
 .../src/commands/context/context.spec.ts           |  10 +
 .../src/commands/context/harvest-tasks.test.ts     | 206 ++++++++++++++++++++-
 .../src/commands/context/harvest-tasks.ts          |   4 +
 .../src/context/harvest-tasks-extraction.ts        | 131 ++++++++++---
 .../src/context/harvest-tasks-markers.ts           |  19 +-
 .../agentplane/src/context/harvest-tasks-model.ts  |  18 ++
 10 files changed, 371 insertions(+), 32 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
