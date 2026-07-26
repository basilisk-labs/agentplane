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
- Note: Independent TESTER PASS at 5da3b9b: 37 focused and 23 cli-core tests pass; provider-head and provider-merge local blobs are rejected by the shared receipt gate, and all five persisted reconciliation identities are commit-validated; resolver matrix rejects 20/20 invalid cases; task-close head-blob integration reports cleanup_blocked/no command/preserve; ZMV remains proof=provider_rebase; declared gates pass; DQM6AW remains unstaged.
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
 .../src/commands/branch/cleanup-merged-proof.ts    | 252 +++++++-----
 .../branch/cleanup-merged-provider-receipt.test.ts | 422 ++++++++++++++++++++
 .../cleanup-merged-provider-reconciliation.ts      | 435 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 404 ++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 packages/agentplane/src/commands/shared/git-ops.ts |  19 +
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 ++-
 .../src/commands/task/close-tail-state.test.ts     |  22 +-
 .../src/commands/task/close-tail-state.ts          |  12 +-
 11 files changed, 1563 insertions(+), 125 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
