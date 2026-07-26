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
- Note: Independent TESTER PASS at 3ad3880: 35 focused and 23 cli-core tests pass; 20/20 proof-identity matrix rejects symbolic, short, malformed, and local blob values; ZMV dry-run remains proof=provider_rebase and remote route is sync_hosted_close; all declared local gates pass; DQM6AW remains unstaged.
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
 .../branch/cleanup-merged-provider-receipt.test.ts | 284 ++++++++++++++
 .../cleanup-merged-provider-reconciliation.ts      | 435 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 404 ++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 packages/agentplane/src/commands/shared/git-ops.ts |  19 +
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 ++-
 .../src/commands/task/close-tail-state.test.ts     |  16 +-
 .../src/commands/task/close-tail-state.ts          |  12 +-
 11 files changed, 1419 insertions(+), 125 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
