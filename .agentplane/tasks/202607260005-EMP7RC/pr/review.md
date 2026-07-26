# PR Review

Created: 2026-07-26T00:39:19.677Z

## Task

- Task: `202607260005-EMP7RC`
- Title: Reconcile provider-rebased protected PR heads
- Status: DOING
- Branch: `task/202607260005-EMP7RC/reconcile-provider-rebased-protected-pr-heads`
- Canonical task record: `.agentplane/tasks/202607260005-EMP7RC/README.md`

## Verification

- State: needs_rework
- Note: Provider rebase proof is directional and accepts provider-only patches.
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
 .../src/commands/branch/cleanup-merged-proof.ts    | 208 +++++++------
 .../cleanup-merged-provider-reconciliation.ts      | 337 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 211 ++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 +--
 7 files changed, 761 insertions(+), 117 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
