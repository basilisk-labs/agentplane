## Summary

Optimize hosted merge sync with local PR meta fast-path

Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.

## Scope

- In scope: Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.
- Out of scope: unrelated refactors not required for "Optimize hosted merge sync with local PR meta fast-path".

## Verification

### Plan

1. Run unit coverage for hosted merge sync logic. Expected: local MERGED pr/meta reconciliation passes and existing GitHub fallback behavior stays green.
2. Run CLI normalization coverage for --sync-hosted-merges. Expected: task normalize can reconcile from local pr/meta without requiring a live gh lookup when merge metadata is already present.
3. Run lint on touched source and test files. Expected: no new lint violations in the modified scope.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: local MERGED pr/meta now reconciles normalize without gh, fallback hosted-merge path stayed green, eslint passed, and the worktree runtime rebuilt cleanly. Scope: hosted-merge-sync module, its unit test, normalize CLI test, task README.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-06T18:33:08.675Z
- Branch: task/202604061815-01F3CY/hosted-merge-sync-local-fast-path
- Head: 48d42e3337c5

```text
 .agentplane/tasks/202604061815-01F3CY/README.md    | 89 +++++++++++++++++++++
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 90 ++++++++++++++++++++++
 .../src/commands/task/hosted-merge-sync.test.ts    | 44 ++++++++++-
 .../src/commands/task/hosted-merge-sync.ts         | 74 ++++++++++++++++++
 4 files changed, 296 insertions(+), 1 deletion(-)
```

</details>
