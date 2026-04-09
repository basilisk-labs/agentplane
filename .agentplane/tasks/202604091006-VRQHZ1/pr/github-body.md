## Summary

Block branch_pr finish before base integration

Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.

## Scope

- In scope: Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.
- Out of scope: unrelated refactors not required for "Block branch_pr finish before base integration".

## Verification

### Plan

1. Reproduce finish from a non-base branch in branch_pr mode. Expected: command fails with an explicit base-branch guidance message and does not mutate task state.
2. Run focused finish command tests for the new guard. Expected: the guarded path fails while direct-mode or base-branch paths keep passing.
3. Run touched lint/test checks. Expected: no regressions outside the guarded finish path.

### Current Status

- State: ok
- Note: Focused vitest coverage for finish unit and lifecycle CLI paths passed; eslint passed on touched finish files; branch_pr finish now fails off-base and preserves task state.

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

- Updated: 2026-04-09T10:15:59.967Z
- Branch: task/202604091006-VRQHZ1/guard-finish-base-branch
- Head: 643aad9db4da

```text
 .../run-cli.core.lifecycle.block-finish.test.ts    | 82 ++++++++++++++++++++++
 packages/agentplane/src/commands/task/finish.ts    | 42 +++++++++++
 .../src/commands/task/finish.unit.test.ts          | 21 ++++++
 3 files changed, 145 insertions(+)
```

</details>
