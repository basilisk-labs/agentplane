Task: `202605231849-TRN34K`
Title: Fix maximum assimilation process rough edges
Canonical task record: `.agentplane/tasks/202605231849-TRN34K/README.md`

## Summary

Fix maximum assimilation process rough edges

Fix context wiki init lint noise, clarify nested context bootstrap behavior, and reduce duplicate-task warning noise for sequential context ingestion workflows.

## Scope

- In scope: Fix context wiki init lint noise, clarify nested context bootstrap behavior, and reduce duplicate-task warning noise for sequential context ingestion workflows.
- Out of scope: unrelated refactors not required for "Fix maximum assimilation process rough edges".

## Verification

- State: ok
- Note:

```text
Implemented maximum-assimilation coverage SGR/writer/verify gate and verified CURATOR prompt
contract creates the LLM-facing task before deterministic extraction apply.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T18:51:31.263Z
- Branch: task/202605231849-TRN34K/max-assimilation-process-fixes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605230451-N5F0HY/pr/meta.json |   6 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   2 +
 .../src/cli/run-cli/command-catalog/project.ts     |   4 +
 .../src/commands/context/context.command.ts        |  14 ++
 .../src/commands/context/context.spec.ts           |  32 ++++
 .../agentplane/src/commands/context/extraction.ts  |  29 ++++
 packages/agentplane/src/commands/context/init.ts   |   5 +-
 .../src/commands/context/release-readiness.test.ts | 149 +++++++++++++++++-
 .../verify-task.maximum-assimilation.unit.test.ts  |  66 ++++++++
 .../agentplane/src/context/extraction-writer.ts    | 171 +++++++++++++++++++++
 .../src/context/harvest-tasks-extraction.ts        |  14 ++
 packages/agentplane/src/context/ingest-task.ts     |  25 ++-
 packages/agentplane/src/context/sgr-extraction.ts  |   2 +
 packages/agentplane/src/context/verify-task.ts     |  36 ++---
 .../agentplane/src/runtime/sgr/contracts.test.ts   |  15 +-
 packages/agentplane/src/runtime/sgr/contracts.ts   |  56 ++++++-
 packages/agentplane/src/runtime/sgr/index.ts       |   2 +
 17 files changed, 602 insertions(+), 26 deletions(-)
```

</details>
