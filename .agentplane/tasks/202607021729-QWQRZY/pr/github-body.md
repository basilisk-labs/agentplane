Task: `202607021729-QWQRZY`
Title: Create context task pack and source span skeleton
Canonical task record: `.agentplane/tasks/202607021729-QWQRZY/README.md`

## Summary

Create context task pack and source span skeleton

Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.

## Scope

- In scope: Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
- Out of scope: unrelated refactors not required for "Create context task pack and source span skeleton".

## Verification

- State: ok
- Note:

```text
Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite,
policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T18:12:34.390Z
- Branch: task/202607021729-QWQRZY/context-task-pack-source-spans
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/context/ingest-task-pack.test.ts           |  93 ++++++++++++++
 .../agentplane/src/context/ingest-task-pack.ts     | 131 +++++++++++++++++++
 packages/agentplane/src/context/ingest-task.ts     |   5 +
 packages/agentplane/src/context/ingest.ts          |   8 +-
 .../agentplane/src/context/source-spans.test.ts    |  76 +++++++++++
 packages/agentplane/src/context/source-spans.ts    | 140 +++++++++++++++++++++
 6 files changed, 452 insertions(+), 1 deletion(-)
```

</details>
