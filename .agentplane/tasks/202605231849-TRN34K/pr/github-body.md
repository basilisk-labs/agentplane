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
Implemented supported context_extraction writer for derived facts/entities/edges/provenance, added
maximum-assimilation hard gate for non-empty derived outputs, refreshed prompts to require writer
pass before wiki synthesis, normalized stale branch_pr metadata for 202605230451-N5F0HY, and
verified with focused SGR/context tests, full context release-readiness with extended timeout,
eslint on touched files, docs:cli:check, policy routing, ap doctor, and an end-to-end nested
maximum-assimilation smoke with two sequential sources.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T18:51:31.263Z
- Branch: task/202605231849-TRN34K/max-assimilation-process-fixes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  2 +
 packages/agentplane/src/commands/context/init.ts   |  5 +--
 .../src/commands/context/release-readiness.test.ts | 44 +++++++++++++++++++++-
 packages/agentplane/src/context/ingest-task.ts     | 19 +++++++++-
 4 files changed, 65 insertions(+), 5 deletions(-)
```

</details>
