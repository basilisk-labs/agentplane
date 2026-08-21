Task: `202608210853-0FYGE3`
Title: Fix local branch_pr status after merged cleanup
Canonical task record: `.agentplane/tasks/202608210853-0FYGE3/README.md`

## Summary

Fix local branch_pr status after merged cleanup

Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.

## Scope

- In scope: Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.
- Out of scope: unrelated refactors not required for "Fix local branch_pr status after merged cleanup".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T09:00:42.185Z
- Branch: task/202608210853-0FYGE3/fix-local-branch-pr-status-after-merged-cleanup
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/route-decision-next-action.test.ts      |  96 ++++++++++++++++++-
 .../src/commands/shared/route-decision.ts          | 102 ++++++++++++---------
 2 files changed, 152 insertions(+), 46 deletions(-)
```

</details>
