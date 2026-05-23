Task: `202605230831-R45MPG`
Title: Persist and clean branch_pr batch ownership
Canonical task record: `.agentplane/tasks/202605230831-R45MPG/README.md`

## Summary

Persist and clean branch_pr batch ownership

Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.

## Scope

- In scope: Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.
- Out of scope: unrelated refactors not required for "Persist and clean branch_pr batch ownership".

## Verification

- State: ok
- Note:

```text
Commands: bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts; bun
test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun run lint:core; bun run
hotspots:check. Result: pass. Evidence: batch ownership test 1 pass/22 expects; hosted-close suite 5
pass/89 expects; lint clean; oversized test baseline OK. Scope: branch_pr batch ownership
persistence, route fallback, stale cleanup, lint/static hotspot gates.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T08:31:34.047Z
- Branch: task/202605230831-R45MPG/batch-ownership-cleanup
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 212 +++++++++++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    | 118 +++++++++++-
 .../agentplane/src/commands/shared/task-handoff.ts |  27 ++-
 3 files changed, 355 insertions(+), 2 deletions(-)
```

</details>
