Task: `202605191434-5C3XZX`
Title: Leave context raw scaffold empty
Canonical task record: `.agentplane/tasks/202605191434-5C3XZX/README.md`

## Summary

Leave context raw scaffold empty

Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.

## Scope

- In scope: Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.
- Out of scope: unrelated refactors not required for "Leave context raw scaffold empty".

## Verification

- State: ok
- Note: Quality gate passed for focused context scaffold change.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:51:12.371Z
- Branch: task/202605191434-5C3XZX/empty-raw-context
- Head: 79272dca473a

```text
 .agentplane/policy/context.must.md                 |   4 +-
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 .gitignore                                         |   1 -
 docs/developer/local-context.mdx                   |   2 +-
 docs/user/cli-reference.generated.mdx              |   2 -
 docs/user/local-context.mdx                        |  16 +-
 packages/agentplane/assets/agents/CURATOR.json     |   2 +-
 packages/agentplane/assets/policy/context.must.md  |   4 +-
 packages/agentplane/src/blueprints/builtins.ts     |  14 +-
 .../agentplane/src/blueprints/validate.test.ts     |   2 +-
 .../src/commands/context/context.command.ts        |   8 +-
 .../src/commands/context/context.learn.spec.ts     |  16 -
 .../agentplane/src/commands/context/ingest.spec.ts |   7 -
 packages/agentplane/src/commands/context/init.ts   |  30 +-
 .../src/commands/context/release-readiness.test.ts |  18 +-
 .../src/context/harvest-tasks-extraction.ts        |   1 -
 packages/agentplane/src/context/ingest-task.ts     |  34 +-
 packages/agentplane/src/context/ingest.ts          |  23 +-
 packages/agentplane/src/context/reindex.ts         |   2 -
 packages/agentplane/src/context/verify-task.ts     |   1 -
 20 files changed, 636 insertions(+), 122 deletions(-)
```

</details>
