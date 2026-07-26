Task: `202607221848-T9B3PS`
Title: Publish AgentWorkOrder v2 schema and migrations
Canonical task record: `.agentplane/tasks/202607221848-T9B3PS/README.md`

## Summary

Publish AgentWorkOrder v2 schema and migrations

RF-05a: evolve agentplane.agent_work_context into one versioned AgentWorkOrder v2 schema containing objective, acceptance, role, fingerprint, authority, prepared evidence, knowledge refs, verification intent, required outputs, and semantic-result contract.

## Scope

- In scope: Zod source of truth, generated JSON Schema/types/fixtures, v1 compatibility reader and explicit v1-to-v2 migration, casing conversion, digest/fingerprint validation, role-specific prepared excerpts, ContextIntent and VerificationIntent, omission receipts, and output schemas.
- Out of scope: migrating every producer/consumer, which is the next task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T08:09:07.907Z
- Branch: task/202607221848-T9B3PS/publish-agentworkorder-v2-schema-and-migrations
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   38 +-
 .../commands/task/agent-work-context-contract.ts   |   24 +-
 .../core/schemas/agent-work-order-v2.schema.json   | 2015 ++++++++++++++++++++
 packages/core/src/index.ts                         |   48 +
 .../core/src/runner/agent-work-order-compat.ts     |  361 ++++
 .../core/src/runner/agent-work-order-fixtures.ts   |  179 ++
 packages/core/src/runner/agent-work-order.test.ts  |  205 ++
 packages/core/src/runner/agent-work-order.ts       |  451 +++++
 packages/core/src/schemas/index.ts                 |   54 +
 .../spec/schemas/agent-work-order-v2.schema.json   | 2015 ++++++++++++++++++++
 schemas/agent-work-order-v2.schema.json            | 2015 ++++++++++++++++++++
 .../examples/agent-work-order-v1.brief.legacy.json |   23 +
 .../agent-work-order-v1.hermes.legacy.json         |   13 +
 .../agent-work-order-v1.runner.legacy.json         |   15 +
 .../agent-work-order-v2.camel-case.compat.json     |  214 +++
 schemas/examples/agent-work-order-v2.valid.json    |  214 +++
 scripts/baselines/trust-boundary-violations.json   |    9 -
 .../baselines/v0.7-compatibility-candidate.json    |  145 +-
 .../check-compatibility-contract-baseline.mjs      |   85 +-
 scripts/checks/check-spec-examples.mjs             |    9 +-
 scripts/generate/sync-schemas.mjs                  |   43 +
 21 files changed, 8146 insertions(+), 29 deletions(-)
```

</details>
