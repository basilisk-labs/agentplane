## Summary

Stabilize worktree fast CI against uv_cwd worker failures

Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.

## Scope

- In scope: Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.
- Out of scope: unrelated refactors not required for "Stabilize worktree fast CI against uv_cwd worker failures".

## Verification

### Plan

1. Reproduce the worktree failure with `bun run ci:local:fast` or the equivalent pre-push hook path from a task worktree. Expected: before the fix the failure is attributable to the uv_cwd ENOENT path, and after the fix the command completes without worker cwd crashes.
2. Run focused vitest coverage for the touched tests/helpers that previously mutated or deleted cwd state. Expected: the targeted suite passes and no worker reports uv_cwd ENOENT.
3. Run eslint on the touched source/tests/scripts. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in the published worktree branch without uv_cwd/ENOENT failures.

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

- Updated: 2026-04-07T00:22:30.760Z
- Branch: task/202604062308-VV2MBB/worktree-fast-ci-cwd
- Head: 07aed3a93d00

```text
 .agentplane/tasks/202604062308-VV2MBB/README.md    | 140 +++++++++++++++++++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   5 +-
 packages/agentplane/src/meta/release.test.ts       |  23 ++--
 3 files changed, 154 insertions(+), 14 deletions(-)
```

</details>
