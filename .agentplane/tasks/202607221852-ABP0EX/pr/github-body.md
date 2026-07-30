Task: `202607221852-ABP0EX`
Title: Add policy-gated semantic retrieval escalation
Canonical task record: `.agentplane/tasks/202607221852-ABP0EX/README.md`

## Summary

Add policy-gated semantic retrieval escalation

RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default.

## Scope

- In scope: measurable escalation triggers, typed selector input/output, authority/budget policy, provenance, fallback, quality/escalation metrics, and conflict fixtures.
- Out of scope: running CURATOR before every coding task or allowing semantic selection to rewrite durable knowledge.

## Verification

- State: ok
- Note:

```text
Verified c4348a3: 17 focused tests cover high-confidence zero escalation, four bounded trigger
episodes, and stale/invalid/adapter-failure fallbacks; critical-cli 12 chunks, typecheck, and fast
local CI passed. Receipt exposes baseline versus observed escalation and token cost; downstream
quality remains explicitly not_observed pending evaluator evidence.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T12:36:40.861Z
- Branch: task/202607221852-ABP0EX/add-policy-gated-semantic-retrieval-escalation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../usecases/agent-work-order.integration.test.ts  |  54 ++-
 .../src/runner/usecases/agent-work-order.ts        |   7 +-
 .../usecases/task-knowledge-retrieval-query.ts     |   2 +
 .../runner/usecases/task-knowledge-retrieval.ts    |  38 +-
 .../task-knowledge-semantic-escalation.test.ts     | 195 ++++++++
 .../usecases/task-knowledge-semantic-escalation.ts | 494 +++++++++++++++++++++
 6 files changed, 785 insertions(+), 5 deletions(-)
```

</details>
