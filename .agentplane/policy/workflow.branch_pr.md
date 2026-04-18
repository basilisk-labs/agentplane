# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

## Required sequence

1. CHECKPOINT A: plan/approve on base checkout.
2. Start work with dedicated task branch + worktree.
3. Continue owner-scoped execution from the task worktree (not the base checkout).
4. Keep single-writer discipline per task worktree.
5. Publish/update PR artifacts from the task worktree.
6. Verify on the task branch.
7. CHECKPOINT B: integrate on base branch by INTEGRATOR.
8. CHECKPOINT C: finish task(s) on base with verification evidence.
9. Remove merged task branches/worktrees once the hosted-close/finish route has landed.

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
- In `branch_pr`, `task start-ready`, `pr open`, `pr update`, and verification commands SHOULD be run from the task worktree created by `work start`.
- `pr open` without `--sync-only` SHOULD complete in one pass: sync local artifacts, auto-publish the task branch to `origin` when it has no upstream yet, then create/link the remote GitHub PR.
- `task start-ready` MAY surface targeted incident advice for analogous scope/tags; follow it before widening scope.
- Keep structured resolved external findings in the task README; mark reusable ones with `Fixability: external` (or `IncidentExternal: true`) and let base-branch `finish` or `agentplane incidents collect <task-id>` promote them into `.agentplane/policy/incidents.md`, using optional `Incident*` fields only when the inferred scope/advice needs refinement. Plain `Findings` text remains task-local and does not update the shared incident registry.
- MUST stop and request re-approval on material drift.
- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
- After merged closure, remove stale task branches/worktrees via the cleanup route instead of leaving orphaned local state behind.
