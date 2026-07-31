Task: `202607221852-ECBY56`
Title: Expose phase-scoped run tool APIs
Canonical task record: `.agentplane/tasks/202607221852-ECBY56/README.md`

## Summary

Expose phase-scoped run tool APIs

RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority.

## Scope

- In scope: phase/run token, tool schema and capability map, result/blocker/knowledge APIs, role-specific repository tool allowlists, typed denial, adapter capability negotiation, audit, expiry/revocation, and global-help non-reliance.
- Out of scope: treating tool visibility as the only security boundary.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T10:01:38.967Z
- Branch: task/202607221852-ECBY56/expose-phase-scoped-run-tool-apis
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog.test.ts        |   4 +
 .../src/cli/run-cli/command-catalog/task.ts        |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/task/run-tool.command.ts          | 127 +++++
 .../src/runner/adapters/codex-preparation.ts       |  32 ++
 packages/agentplane/src/runner/adapters/codex.ts   |  13 +-
 .../src/runner/adapters/custom-preparation.ts      |  32 ++
 .../agentplane/src/runner/phase-tools/audit.ts     |  75 +++
 .../src/runner/phase-tools/broker.test.ts          |  96 ++++
 .../agentplane/src/runner/phase-tools/broker.ts    | 289 +++++++++++
 .../src/runner/phase-tools/contract.test.ts        | 116 +++++
 .../agentplane/src/runner/phase-tools/contract.ts  | 185 +++++++
 .../src/runner/phase-tools/dispatch.test.ts        | 314 ++++++++++++
 .../agentplane/src/runner/phase-tools/dispatch.ts  | 563 +++++++++++++++++++++
 .../agentplane/src/runner/phase-tools/knowledge.ts |  87 ++++
 .../agentplane/src/runner/phase-tools/token.ts     | 377 ++++++++++++++
 packages/agentplane/src/runner/types.ts            |   8 +
 .../agentplane/src/runner/types/capabilities.ts    |   3 +
 packages/agentplane/src/runner/types/context.ts    |   2 +
 .../agentplane/src/runner/types/phase-tools.ts     |  81 +++
 .../task-run-bootstrap.result-examples.test.ts     |  74 ++-
 .../src/runner/usecases/task-run-bootstrap.ts      |  37 +-
 .../agentplane/src/runner/usecases/task-run.ts     |  16 +-
 .../src/runtime/capabilities/resolve.test.ts       |  32 ++
 .../agentplane/src/runtime/capabilities/runner.ts  |  31 ++
 .../baselines/v0.7-compatibility-candidate.json    |  38 +-
 .../check-compatibility-contract-baseline.mjs      |  15 +
 28 files changed, 2651 insertions(+), 15 deletions(-)
```

</details>
