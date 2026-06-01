Task: `202606011717-C22C3X`
Title: Initialize maximum assimilation context layer
Canonical task record: `.agentplane/tasks/202606011717-C22C3X/README.md`

## Summary

Initialize maximum assimilation context layer

Initialize the AgentPlane context workspace using the maximum-assimilation profile and assimilate the oldest 10 completed task-history records into sourced local context artifacts.

## Scope

- In scope: Initialize the AgentPlane context workspace using the maximum-assimilation profile and assimilate the oldest 10 completed task-history records into sourced local context artifacts.
- Out of scope: unrelated refactors not required for "Initialize maximum assimilation context layer".

## Verification

- State: ok
- Note:

```bash
ap context verify-task 202606011717-C22C3X. Result: pass. Evidence: maximum-assimilation gates \
  passed with source_set, glossary, topology, coverage, line-addressed graph refs, Obsidian wiki \
  links, and changed_paths accepted. Scope: task-bound context artifacts for the first ten completed \
  task-history records. Command: ap context doctor. Result: pass. Evidence: context doctor: ok after \
  reindex. Scope: local context registry/projection health. Command: ap context graph validate. \
  Result: pass. Evidence: context graph valid. Scope: derived graph entities, edges, and provenance. \
  Command: bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts \
  packages/agentplane/src/commands/context/verify-task.maximum-assimilation.test.ts. Result: pass. \
  Evidence: 13 pass, 0 fail. Scope: harvest generator compatibility and maximum-assimilation \
  verification gates.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T17:17:56.355Z
- Branch: task/202606011717-C22C3X/maximum-context-history
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/context/agentplane.context.yaml        |  17 ++-
 .agentplane/context/derived/facts/facts.jsonl      |  10 ++
 .agentplane/context/derived/graph/edges.jsonl      |  20 +++
 .agentplane/context/derived/graph/entities.jsonl   |  17 +++
 .../context/derived/graph/provenance_edges.jsonl   |  10 ++
 .agentplane/context/derived/ingestion/tasks.jsonl  |  10 ++
 .agentplane/context/derived/reports/coverage.jsonl |  10 ++
 .../reports/task-harvest-7d9aff29512eeeff.json     |  53 +++++++
 .agentplane/tasks/202601041253-00001/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00002/README.md     |  35 ++++-
 .agentplane/tasks/202601041253-00003/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00004/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00005/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00006/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00007/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00008/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-00009/README.md     |  36 ++++-
 .agentplane/tasks/202601041253-0000A/README.md     |  36 ++++-
 context/README.md                                  |  35 ++++-
 context/capabilities/README.md                     |   2 +-
 context/raw/tasks/202601041253-00001.json          |  28 ++++
 context/raw/tasks/202601041253-00002.json          |  29 ++++
 context/raw/tasks/202601041253-00003.json          |  28 ++++
 context/raw/tasks/202601041253-00004.json          |  28 ++++
 context/raw/tasks/202601041253-00005.json          |  28 ++++
 context/raw/tasks/202601041253-00006.json          |  28 ++++
 context/raw/tasks/202601041253-00007.json          |  28 ++++
 context/raw/tasks/202601041253-00008.json          |  28 ++++
 context/raw/tasks/202601041253-00009.json          |  28 ++++
 context/raw/tasks/202601041253-0000A.json          |  28 ++++
 context/wiki/AGENTS.md                             |  43 +++++-
 context/wiki/glossary.md                           |  36 +++++
 .../wiki/proposals/task-harvest/done-all-tags.md   | 169 +++++++++++++++++++++
 context/wiki/reports/coverage.md                   |  42 +++++
 context/wiki/reports/topology.md                   |  40 +++++
 context/wiki/task-harvest/done-all-tags.md         | 169 +++++++++++++++++++++
 .../src/commands/context/harvest-tasks.test.ts     |  18 +++
 .../src/context/harvest-tasks-builders.ts          |  48 +++++-
 38 files changed, 1354 insertions(+), 35 deletions(-)
```

</details>
