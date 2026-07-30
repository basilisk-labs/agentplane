Task: `202607221852-01ACZ9`
Title: Serve bounded knowledge requests during agent episodes
Canonical task record: `.agentplane/tasks/202607221852-01ACZ9/README.md`

## Summary

Serve bounded knowledge requests during agent episodes

RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.

## Scope

- In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
- Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.

## Verification

- State: ok
- Note:

```text
RF-22 verified. schemas:check passed; focused agentplane suite 76/76 and core suite 25/25 passed;
critical CLI matrix passed 12/12 chunks. Valid EXECUTOR/EVALUATOR requests, bounded denials,
repeated-gap escalation, and digest/work-order/fingerprint tamper rejection are covered.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T13:21:04.341Z
- Branch: task/202607221852-01ACZ9/serve-bounded-knowledge-requests-during-agent-ep
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/evaluator/evaluator-review-usecase.ts |  13 +-
 .../runner/adapters/codex-result-transport.test.ts |   5 +
 .../src/runner/adapters/codex-result-transport.ts  |  38 +-
 .../agentplane/src/runner/result-manifest.test.ts  |  10 +
 .../src/runner/task-state-render-semantic.ts       |   2 +-
 packages/agentplane/src/runner/types/invocation.ts |   9 +
 .../src/runner/usecases/agent-work-order-build.ts  |   3 +
 .../usecases/task-knowledge-request-audit.ts       | 105 ++++
 .../task-knowledge-request-lifecycle.test.ts       | 143 +++++
 .../usecases/task-knowledge-request-lifecycle.ts   |  73 +++
 .../usecases/task-knowledge-request-scope.ts       |  53 ++
 .../runner/usecases/task-knowledge-request.test.ts | 294 +++++++++++
 .../src/runner/usecases/task-knowledge-request.ts  | 586 +++++++++++++++++++++
 .../runner/usecases/task-knowledge-retrieval.ts    |  14 +
 .../task-run-bootstrap.result-examples.test.ts     |   6 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |   9 +
 .../agentplane/src/runner/usecases/task-run.ts     |   8 +-
 packages/core/src/index.ts                         |   4 +
 .../core/src/runner/agent-semantic-result.test.ts  |   5 +
 packages/core/src/runner/agent-semantic-result.ts  |  21 +
 .../core/src/runner/agent-work-order-fixtures.ts   |   1 +
 packages/core/src/schemas/index.ts                 |   4 +
 schemas/agent-semantic-result.schema.json          |  87 ++-
 ...ent-semantic-result-v2.needs-context.valid.json |   7 +-
 .../agent-work-order-v2.camel-case.compat.json     |   1 +
 schemas/examples/agent-work-order-v2.valid.json    |   1 +
 26 files changed, 1489 insertions(+), 13 deletions(-)
```

</details>
