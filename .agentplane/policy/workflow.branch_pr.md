# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

## Required sequence

1. Plan/approve on base checkout.
2. Start work with dedicated task branch + worktree.
3. Keep single-writer discipline per task worktree.
4. Publish/update PR artifacts.
5. Verify on task branch.
6. Integrate on base branch by INTEGRATOR.
7. Finish task(s) on base with verification evidence.

## Command contract

```bash
agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree
agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."
agentplane pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>
agentplane pr update <task-id>
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."
agentplane integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify
agentplane finish <task-id> --author INTEGRATOR --body "Verified: ..." --result "..." --commit <git-rev> --close-commit
```

## Constraints

- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
