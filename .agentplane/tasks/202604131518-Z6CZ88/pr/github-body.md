## Summary

Auto-prune merged local task branches on post-merge

Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.

## Scope

- In scope: Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.
- Out of scope: unrelated refactors not required for "Auto-prune merged local task branches on post-merge".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: hooks install/bootstrap now reconcile a managed post-merge hook, the post-merge hook silently no-ops off-base and prunes merged local task worktrees on base via cleanup merged, and .agentplane/bin is now ignored so shim refreshes stop dirtying framework checkouts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T15:26:25.285Z
- Branch: task/202604131518-Z6CZ88/post-merge-prune-hook
- Head: 61794f8dae4c

```text
 .agentplane/tasks/202604131518-Z6CZ88/README.md    | 118 +++++++++++++++++++++
 .gitignore                                         |   1 +
 .../src/cli/bootstrap-framework-dev-script.test.ts |  33 ++++++
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  87 +++++++++++++++
 packages/agentplane/src/commands/hooks/index.ts    |  44 +++++++-
 scripts/bootstrap-framework-dev.mjs                |  33 ++++--
 6 files changed, 305 insertions(+), 11 deletions(-)
```

</details>
