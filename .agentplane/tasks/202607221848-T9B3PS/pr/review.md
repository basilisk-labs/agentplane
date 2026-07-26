# PR Review

Created: 2026-07-26T08:07:55.572Z

## Task

- Task: `202607221848-T9B3PS`
- Title: Publish AgentWorkOrder v2 schema and migrations
- Status: DONE
- Branch: `task/202607221848-T9B3PS/publish-agentworkorder-v2-schema-and-migrations`
- Canonical task record: `.agentplane/tasks/202607221848-T9B3PS/README.md`

## Verification

- State: ok
- Note: Verified corrected v1 migration compatibility: explicit work_order_id and role omission receipts, lifecycle-role separation, representative runner/Hermes packets, and Hermes owner:null parsing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
 .../core/src/runner/agent-work-order-compat.ts     |  449 +++++
 .../core/src/runner/agent-work-order-fixtures.ts   |  179 ++
 packages/core/src/runner/agent-work-order.test.ts  |  230 +++
 packages/core/src/runner/agent-work-order.ts       |  451 +++++
 packages/core/src/schemas/index.ts                 |   54 +
 .../spec/schemas/agent-work-order-v2.schema.json   | 2015 ++++++++++++++++++++
 schemas/agent-work-order-v2.schema.json            | 2015 ++++++++++++++++++++
 .../examples/agent-work-order-v1.brief.legacy.json |   23 +
 .../agent-work-order-v1.hermes.legacy.json         |   36 +
 .../agent-work-order-v1.runner.legacy.json         |   45 +
 .../agent-work-order-v2.camel-case.compat.json     |  214 +++
 schemas/examples/agent-work-order-v2.valid.json    |  214 +++
 scripts/baselines/trust-boundary-violations.json   |    9 -
 .../baselines/v0.7-compatibility-candidate.json    |  145 +-
 .../check-compatibility-contract-baseline.mjs      |   85 +-
 scripts/checks/check-spec-examples.mjs             |    9 +-
 scripts/generate/sync-schemas.mjs                  |   53 +
 21 files changed, 8322 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
