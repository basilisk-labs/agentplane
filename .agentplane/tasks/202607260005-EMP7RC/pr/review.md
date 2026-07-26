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
- Note: Independent verification at 9a3cb50: replacement refs cannot authorize receipt, ancestry, patch, base, or cleanup proof; targeted and declared local checks pass.
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
 .../src/commands/branch/cleanup-merged-proof.ts    | 267 +++++++----
 .../branch/cleanup-merged-provider-receipt.test.ts | 480 ++++++++++++++++++++
 .../cleanup-merged-provider-reconciliation.ts      | 439 ++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 491 ++++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 packages/agentplane/src/commands/shared/git-ops.ts |  21 +
 .../shared/route-decision-next-action.test.ts      |  49 ++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 +-
 .../src/commands/task/close-tail-state.test.ts     |  24 +-
 .../src/commands/task/close-tail-state.ts          |  18 +-
 packages/core/src/git/git-client.ts                |  28 +-
 packages/core/src/git/git-diff.ts                  |  32 +-
 packages/core/src/git/index.ts                     |   3 +
 14 files changed, 1783 insertions(+), 142 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
