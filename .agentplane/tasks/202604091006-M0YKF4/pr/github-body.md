## Summary

Point DONE PR-artifact drift recovery at targeted normalize

Update diagnostics and docs so DONE branch_pr tasks with stale OPEN PR artifacts recommend the actual recovery path: task normalize --sync-hosted-merges --task-id <task-id>, not pr check.

## Scope

- In scope: update doctor/help guidance for DONE branch_pr tasks with stale OPEN PR artifacts; add focused regression coverage.
- Out of scope: unrelated doctor diagnostics or new reconcile commands beyond the existing targeted normalize path.

## Verification

### Plan

1. Run the focused doctor/diagnostic regression test for DONE branch_pr tasks with stale OPEN PR artifacts. Expected: the recommended next action points at task normalize --sync-hosted-merges --task-id <task-id>.
2. Run touched doctor/help tests. Expected: diagnostics and user-facing guidance stay consistent.
3. Run lint or equivalent checks on touched files. Expected: no new lint failures in changed scope.

### Current Status

- State: ok
- Note: doctor.command tests passed with the updated DONE drift guidance and eslint passed on touched doctor files after framework bootstrap.

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

- Updated: 2026-04-09T10:22:30.128Z
- Branch: task/202604091006-M0YKF4/done-pr-drift-guidance
- Head: ef529694d35e

```text
No changes detected.
```

</details>
