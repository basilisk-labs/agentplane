Task: `202607221852-9T0RT3`
Title: Build deterministic task knowledge retrieval
Canonical task record: `.agentplane/tasks/202607221852-9T0RT3/README.md`

## Summary

Build deterministic task knowledge retrieval

RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder.

## Scope

- In scope: deterministic query planning, exact/FTS/alias/graph retrieval, scoring/reasons, budgets, prepared excerpts, missing/omitted receipt, work-order integration, relevance fixtures, and metrics.
- Out of scope: always-on CURATOR or semantic reranking.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T10:59:50.919Z
- Branch: task/202607221852-9T0RT3/build-deterministic-task-knowledge-retrieval
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/usecases/agent-work-order-build.ts  |  34 +-
 .../runner/usecases/agent-work-order-projection.ts |   2 +
 .../usecases/agent-work-order.integration.test.ts  |  94 +++
 .../src/runner/usecases/agent-work-order.ts        |   9 +
 .../runner/usecases/task-knowledge-retrieval.ts    | 646 +++++++++++++++++++++
 5 files changed, 780 insertions(+), 5 deletions(-)
```

</details>
