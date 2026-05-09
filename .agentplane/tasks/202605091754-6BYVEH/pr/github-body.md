Task: `202605091754-6BYVEH`
Title: Consolidate task transition comment commit flow
Canonical task record: `.agentplane/tasks/202605091754-6BYVEH/README.md`

## Summary

Consolidate task transition comment commit flow

Factor the repeated start/block transition path for structured comments, transition command execution, optional comment commit, and success output while preserving command-specific guards.

## Scope

- In scope: Factor the repeated start/block transition path for structured comments, transition command execution, optional comment commit, and success output while preserving command-specific guards.
- Out of scope: unrelated refactors not required for "Consolidate task transition comment commit flow".

## Verification

- State: ok
- Note: Verified: consolidated shared task transition comment command options and optional comment-commit plumbing; lifecycle tests passed (1 file, 12 tests), typecheck passed, Prettier passed, clone:report improved metrics to 82 clones / 1360 duplicated lines / 14489 duplicated tokens, and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T19:09:25.879Z
- Branch: task/202605091754-6BYVEH/transition-comment-flow
- Head: 7ff2f8f90118

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 packages/agentplane/src/commands/task/block.ts     |  66 +--
 packages/agentplane/src/commands/task/shared.ts    |   2 +
 .../src/commands/task/shared/transitions.ts        |  63 +++
 packages/agentplane/src/commands/task/start.ts     |  66 +--
 5 files changed, 618 insertions(+), 84 deletions(-)
```

</details>
