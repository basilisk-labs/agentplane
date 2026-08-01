Task: `202607221854-TE9ZJ5`
Title: Instrument preparation graph nodes and invalidation inputs
Canonical task record: `.agentplane/tasks/202607221854-TE9ZJ5/README.md`

## Summary

Instrument preparation graph nodes and invalidation inputs

RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance.

## Scope

- In scope: preparation DAG trace model, node inputs/outputs, latency, bytes, fingerprint components, dependency edges, invalidation reasons, cacheability classification, and representative cold/warm scenario reports.
- Out of scope: enabling caches before evidence identifies worthwhile nodes.

## Verification

- State: ok
- Note:

```text
PASS: 16 focused trace/CLI/fingerprint tests and TypeScript 7 typecheck passed after commit; full
test:fast (3612 tests), ci:contract, clone/knip/hotspot guards, and paired overhead benchmark passed
before commit with identical stdout. Median traced ratios: simple 0.990, branch route 1.022,
next-action 1.079 against <=1.15 threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T14:43:47.525Z
- Branch: task/202607221854-TE9ZJ5/instrument-preparation-graph-nodes-and-invalidat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.command-session.test.ts   |  71 +++++
 packages/agentplane/src/cli/run-cli.ts             |  14 +-
 .../cli/run-cli/command-catalog/command-session.ts | 110 +++++++-
 .../src/commands/shared/route-decision-blockers.ts |  18 ++
 .../shared/route-decision-preparation-trace.ts     |  59 +++++
 .../src/commands/shared/route-decision.ts          |  77 +++---
 .../agentplane/src/commands/shared/task-backend.ts |  34 ++-
 .../shared/workflow-step-fingerprint-trace.ts      |  65 +++++
 .../shared/workflow-step-fingerprint.test.ts       |  30 ++-
 .../commands/shared/workflow-step-fingerprint.ts   | 120 ++++++---
 .../src/runner/usecases/agent-work-order.ts        | 146 ++++++++---
 .../agentplane/src/runtime/execution-context.ts    |   3 +
 .../src/shared/preparation-trace.test.ts           | 139 ++++++++++
 .../agentplane/src/shared/preparation-trace.ts     | 287 +++++++++++++++++++++
 14 files changed, 1044 insertions(+), 129 deletions(-)
```

</details>
