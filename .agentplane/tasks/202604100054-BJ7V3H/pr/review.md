# PR Review

Created: 2026-04-10T01:11:06.460Z
Branch: task/202604100054-BJ7V3H/fresh-worktree-bootstrap

## Summary

Make fresh branch_pr worktrees runnable before repo-local PR commands

Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.

## Scope

- In scope: Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.
- Out of scope: unrelated refactors not required for "Make fresh branch_pr worktrees runnable before repo-local PR commands".

## Verification

### Plan

1. Create or simulate a fresh branch_pr framework worktree and run the relevant repo-local command. Expected: it no longer fails with a manual bootstrap requirement.
2. Run the new bootstrap/runtime regression test. Expected: the repo-local command path succeeds without unexpected installs or dependency errors.
3. Inspect the runtime/bootstrap branch. Expected: common-root reuse remains safe and existing bootstrap guidance still works for genuinely missing dependencies.

### Current Status

- State: ok
- Note: bootstrap: bun run framework:dev:bootstrap; runtime: agentplane runtime explain; vitest: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts -t 'work start makes a fresh framework worktree immediately runnable for repo-local commands'; eslint: bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T01:11:06.460Z
- Branch: task/202604100054-BJ7V3H/fresh-worktree-bootstrap
- Head: 47a800016afc

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 99 ++++++++++++++++++++++
 .../agentplane/src/commands/branch/work-start.ts   | 41 ++++++++-
 2 files changed, 139 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
