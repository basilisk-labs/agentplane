Task: `202605051529-S59Z44`
Title: Commit automatic ACR artifacts on finish

## Summary

Commit automatic ACR artifacts on finish

Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.

## Scope

- In scope: Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.
- Out of scope: unrelated refactors not required for "Commit automatic ACR artifacts on finish".

## Verification

- State: ok
- Note: Additional blocker fixed: branch_pr merge integrate now passes --signoff so repo DCO hooks accept AgentPlane-managed merge commits. Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 11 tests passed. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Command: eslint on touched integrate/finish files and git diff --check. Result: pass. Scope: DCO-safe integrate merge plus ACR refresh finalization.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T15:42:27.911Z
- Branch: task/202605051529-S59Z44/commit-auto-acr-artifacts
- Head: 9795b30d2b17

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  9 ++++
 .../pr/integrate/internal/finalize.test.ts         |  9 ++++
 .../src/commands/pr/integrate/internal/finalize.ts | 17 ++++++-
 .../commands/pr/integrate/internal/merge.test.ts   |  1 +
 .../src/commands/pr/integrate/internal/merge.ts    |  1 +
 .../agentplane/src/commands/task/finish-execute.ts | 49 +++-----------------
 .../agentplane/src/commands/task/finish-shared.ts  | 53 ++++++++++++++++++++++
 .../commands/task/finish.validation.unit.test.ts   |  2 +
 .../src/commands/task/hosted-close.command.ts      | 14 +++++-
 9 files changed, 109 insertions(+), 46 deletions(-)
```

</details>
