Task: `202607221852-WF8A0X`
Title: Create CURATOR-gated post-task knowledge proposals
Canonical task record: `.agentplane/tasks/202607221852-WF8A0X/README.md`

## Summary

Create CURATOR-gated post-task knowledge proposals

RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.

## Scope

- In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
- Out of scope: automatic wiki writes or publishing transient implementation details.

## Verification

- State: ok
- Note:

```text
Verified RF-20 rework: only explicit durable task signals produce proposals; every signal has exact
captured evidence; PR/diff/evaluator provenance is attached when present; unchanged selections
retain one CURATOR owner.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T16:07:48.548Z
- Branch: task/202607221852-WF8A0X/create-curator-gated-post-task-knowledge-proposa
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/context/ingest.mdx                            |  25 +-
 docs/developer/local-context.mdx                   |  24 +-
 docs/user/agents.mdx                               |   6 +-
 docs/user/cli-reference.generated.mdx              |  22 +-
 docs/user/commands.mdx                             |  21 +-
 docs/user/local-context.mdx                        |  60 +-
 .../src/commands/context/context-runner.ts         |   4 +-
 .../src/commands/context/context.learn.spec.ts     |  24 +-
 .../src/commands/context/context.spec.ts           |  32 +-
 .../src/commands/context/harvest-tasks.test.ts     | 923 ++++++++-------------
 .../src/commands/context/harvest-tasks.ts          | 444 +++++++---
 packages/agentplane/src/context/doctor.ts          |   8 +-
 .../src/context/harvest-tasks-artifacts.ts         |  80 +-
 .../src/context/harvest-tasks-builders.ts          | 372 ++++-----
 .../src/context/harvest-tasks-extraction.ts        | 117 +--
 .../src/context/harvest-tasks-markers.ts           |  50 +-
 .../agentplane/src/context/harvest-tasks-model.ts  |  72 +-
 17 files changed, 1112 insertions(+), 1172 deletions(-)
```

</details>
