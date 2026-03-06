# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

## Required sequence

1. CHECKPOINT A: plan/approve on base checkout.
2. Start work with dedicated task branch + worktree.
3. Keep single-writer discipline per task worktree.
4. Publish/update PR artifacts.
5. Verify on task branch.
6. CHECKPOINT B: integrate on base branch by INTEGRATOR.
7. CHECKPOINT C: finish task(s) on base with verification evidence.

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

- MUST NOT perform mutating actions before explicit user approval.
- Task documentation updates MAY be batched within one turn before approval.
- MUST run `task plan approve` then `task start-ready` as `Step 1 -> wait -> Step 2` (never parallel).
- MUST stop and request re-approval on material drift.
- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
