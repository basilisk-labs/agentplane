# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

## Required sequence

1. Plan/approve on base checkout.
2. Start work with dedicated worktree and task branch.
3. Keep single-writer discipline per task worktree.
4. Publish/update PR artifacts.
5. Verify on branch.
6. Integrate on base branch by INTEGRATOR.
7. Finish task(s) on base with verification evidence.

## Constraints

- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
