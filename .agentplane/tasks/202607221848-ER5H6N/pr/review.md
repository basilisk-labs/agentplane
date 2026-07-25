# PR Review

Created: 2026-07-24T22:17:13.092Z

## Task

- Task: `202607221848-ER5H6N`
- Title: Define digest-addressed KnowledgeRef contracts
- Status: DOING
- Branch: `task/202607221848-ER5H6N/define-digest-addressed-knowledgeref-contracts`
- Canonical task record: `.agentplane/tasks/202607221848-ER5H6N/README.md`

## Verification

- State: needs_rework
- Note: Hosted rework: knip found two unused AgentPlane re-exports; full fast suite also observed one unrelated active-claim history race (targeted repetition passed 20/20).
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T22:23:15.250Z
- Branch: task/202607221848-ER5H6N/define-digest-addressed-knowledgeref-contracts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |  40 +-
 packages/agentplane/src/commands/context/show.ts   |  14 +-
 packages/agentplane/src/context/context-utils.ts   |  76 +-
 .../agentplane/src/context/knowledge-ref.test.ts   | 562 ++++++++++++
 packages/agentplane/src/context/knowledge-ref.ts   | 590 ++++++++++++
 .../agentplane/src/context/reindex-projection.ts   |  41 +-
 packages/agentplane/src/context/reindex.ts         |  46 +-
 packages/agentplane/src/runner/types/context.ts    |  17 +-
 packages/core/schemas/knowledge-ref.schema.json    | 135 +++
 packages/core/src/index.ts                         |  27 +
 packages/core/src/runner/knowledge-ref.test.ts     | 831 +++++++++++++++++
 packages/core/src/runner/knowledge-ref.ts          | 990 +++++++++++++++++++++
 packages/core/src/schemas/index.ts                 |  30 +
 packages/spec/examples/acr.json                    |   4 +-
 packages/spec/schemas/knowledge-ref.schema.json    | 135 +++
 schemas/examples/knowledge-ref-v1.valid.json       |  10 +
 schemas/knowledge-ref.schema.json                  | 135 +++
 .../baselines/v0.7-compatibility-candidate.json    |  95 +-
 .../check-compatibility-contract-baseline.mjs      |  85 +-
 scripts/checks/check-spec-examples.mjs             |  71 +-
 scripts/generate/sync-schemas.mjs                  |  17 +
 21 files changed, 3879 insertions(+), 72 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
