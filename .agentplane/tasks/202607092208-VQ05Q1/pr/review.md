# PR Review

Created: 2026-07-10T15:55:48.138Z

## Task

- Task: `202607092208-VQ05Q1`
- Title: Split context pipeline hotspots for v0.6.22
- Status: DOING
- Branch: `task/202607092208-VQ05Q1/split-context-pipeline-hotspots-for-v0-6-22`
- Canonical task record: `.agentplane/tasks/202607092208-VQ05Q1/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T15:55:48.138Z
- Branch: task/202607092208-VQ05Q1/split-context-pipeline-hotspots-for-v0-6-22
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/dashboard-graph.ts        | 319 ++++++++++++++
 .../src/commands/context/dashboard-snapshot.ts     |  33 ++
 .../src/commands/context/dashboard-wiki.ts         | 211 +++++++++
 .../agentplane/src/commands/context/dashboard.ts   | 472 +--------------------
 .../src/commands/context/wiki-report-links.ts      | 265 ++++++++++++
 .../src/commands/context/wiki-reports.ts           | 318 ++------------
 .../src/context/extraction-writer-quality.ts       | 199 +++++++++
 .../agentplane/src/context/extraction-writer.ts    | 204 +--------
 ...m-assimilation-artifacts-validation-ontology.ts | 235 ++++++++++
 .../maximum-assimilation-artifacts-validation.ts   | 215 +---------
 10 files changed, 1315 insertions(+), 1156 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
