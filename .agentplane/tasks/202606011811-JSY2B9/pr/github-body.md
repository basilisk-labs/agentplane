Task: `202606011811-JSY2B9`
Title: Assimilate task history by version summaries
Canonical task record: `.agentplane/tasks/202606011811-JSY2B9/README.md`

## Summary

Assimilate task history by version summaries

Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.

## Scope

- In scope: Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.
- Out of scope: unrelated refactors not required for "Assimilate task history by version summaries".

## Verification

- State: ok
- Note:

```text
Verified: addressed hosted verify-contract formatting failure by running Prettier on context wiki
markdown. Re-ran bun run format:check, context wiki lint, context graph validate, context reindex,
and context verify-task successfully.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T18:15:03.313Z
- Branch: task/202606011811-JSY2B9/assimilate-task-history-by-version-summaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/context/derived/facts/facts.jsonl      |     2 +
 .agentplane/context/derived/graph/edges.jsonl      |     1 +
 .agentplane/context/derived/graph/entities.jsonl   |     2 +
 .../context/derived/graph/provenance_edges.jsonl   |     5 +
 .agentplane/context/derived/reports/coverage.jsonl |  2949 +
 .../task-history-version-coverage-detail.jsonl     |  2945 +
 .../task-history-version-extraction.sgr.json       | 62050 +++++++++++++++++++
 .../reports/task-history-version-preextract.json   | 12316 ++++
 .agentplane/tasks/202606011809-VCQPP7/README.md    |   115 +
 context/wiki/index.md                              |     8 +
 context/wiki/proposals/index.md                    |    32 +
 context/wiki/proposals/task-harvest/index.md       |    32 +
 context/wiki/reports/index.md                      |    37 +
 .../reports/task-history-preextract-topology.md    |    47 +
 .../reports/task-history-version-assimilation.md   |    65 +
 .../wiki/reports/task-history-version-coverage.md  |   113 +
 .../wiki/reports/task-history-version-packets.md   |  1041 +
 context/wiki/task-harvest/index.md                 |    32 +
 18 files changed, 81792 insertions(+)
```

</details>
