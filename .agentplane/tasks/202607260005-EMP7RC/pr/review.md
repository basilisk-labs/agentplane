# PR Review

Created: 2026-07-26T00:39:19.677Z

## Task

- Task: `202607260005-EMP7RC`
- Title: Reconcile provider-rebased protected PR heads
- Status: DOING
- Branch: `task/202607260005-EMP7RC/reconcile-provider-rebased-protected-pr-heads`
- Canonical task record: `.agentplane/tasks/202607260005-EMP7RC/README.md`

## Verification

- State: ok
- Note: Independent re-verification passed: full canonical OID gate rejects main, short SHA, refs, and malformed provider identities before Git revision use; each negative reports cleanup_blocked with no command and preserves branch/worktree. Symmetric provider-patch and race coverage remains green; focused suites 27 plus 23 passed; static checks passed; live ZMV dry run reported proof=provider_rebase without cleanup.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T00:39:19.677Z
- Branch: task/202607260005-EMP7RC/reconcile-provider-rebased-protected-pr-heads
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged-proof.ts    | 252 ++++++++-----
 .../cleanup-merged-provider-reconciliation.ts      | 404 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 404 ++++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 packages/agentplane/src/commands/shared/git-ops.ts |  19 +
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 ++-
 .../src/commands/task/close-tail-state.test.ts     |  16 +-
 .../src/commands/task/close-tail-state.ts          |  12 +-
 10 files changed, 1104 insertions(+), 125 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
