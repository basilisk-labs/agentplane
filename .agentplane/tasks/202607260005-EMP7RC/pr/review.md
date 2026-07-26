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
- Note: Independent re-verification passed: provider-only extra-patch refusal; exact-head and ZMV provider-rebase positives; identity, base, closure, unavailable, and race refusals; cleanup safeguards and route priority. Focused suites 26 plus 23 passed; typecheck, lint, guards, lifecycle, routing, doctor, diff check passed; live ZMV dry run reported proof=provider_rebase without cleanup.
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
 .../src/commands/branch/cleanup-merged-proof.ts    | 212 +++++++-----
 .../cleanup-merged-provider-reconciliation.ts      | 378 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 277 ++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 ++-
 7 files changed, 871 insertions(+), 118 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
