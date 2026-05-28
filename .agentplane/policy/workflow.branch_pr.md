<!-- ap:fragment id="policy.workflow.branch_pr.workflow.workflow.branch_pr" slot="workflow" mutability="replaceable" -->

# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.workflow.required.sequence" slot="workflow" mutability="replaceable" -->

## Required sequence

1. CHECKPOINT A: plan/approve on base checkout.
2. Execute from a dedicated task branch/worktree with single-writer discipline.
3. Publish PR artifacts and verify on the task branch.
4. CHECKPOINT B: INTEGRATOR runs base-checkout integration; protected bases merge through the task GitHub PR.
5. CHECKPOINT C: finish/close-tail evidence lands after PR merge and hosted close; then cleanup removes merged branches/worktrees.

## Related task batch worktrees

Several approved dependent tasks MAY share one primary task worktree only when separate PRs add coordination risk without improving review. The primary task owns branch/worktree/PR; every included task id MUST be listed before mutation and retain independent plan, start-ready, Verify Steps, verification result, and finish evidence. Commits SHOULD mention relevant task suffixes; the final PR MUST describe the complete task set.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.commands.command.contract" slot="commands" mutability="replaceable" -->

## Command contract

```bash
agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree
agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."
agentplane pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>
agentplane pr update <task-id>
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."
agentplane integrate queue enqueue <task-id> --branch task/<task-id>/<slug>
agentplane integrate queue run-next --run-verify --drain --wait --poll-interval-ms 30000 --timeout-ms 600000
agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify
agentplane finish <task-id> --author INTEGRATOR --body "Verified: ..." --result "..." --commit <git-rev> --close-commit
```

Default branch names are `task/<task-id>/<slug>` for implementation branches and
`task-close/<task-id>/<sha12>` for close-tail branches. Repositories MAY override only the prefixes
through `branch.task_prefix` and `branch.task_close_prefix`; task id, slug, and sha positions remain
fixed.

Before manually filling `<slug>` or `<branch>`, use `agentplane task brief <task-id>` or `agentplane task next-action <task-id> --explain` and prefer the emitted concrete command.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.hard_constraint.constraints" slot="hard_constraint" mutability="append_only" -->

## Constraints

- MUST NOT perform mutating actions before explicit user approval.
- Task documentation updates MAY be batched within one turn before approval.
- MUST run `task plan approve` then `task start-ready` as `Step 1 -> wait -> Step 2` (never parallel).
- In `branch_pr`, `task start-ready`, `pr open`, `pr update`, and verification commands SHOULD be run from the task worktree created by `work start`.
- A related task batch MAY reuse one primary task worktree when all included tasks are approved,
  listed, verified independently, and merged through the primary task PR.
- `pr open` without `--sync-only` SHOULD complete in one pass: sync local artifacts, auto-publish the task branch to `origin` when it has no upstream yet, then create/link the remote GitHub PR.
- In `branch_pr`, the task GitHub PR is the primary integration mechanism. Local `integrate` serializes the lane and drives the provider merge route; GitHub PR merge is not a shortcut around integration.
- Protected `main` requires a created/updated GitHub PR, stable completed hosted checks, and an approved merge lane. If auto-merge remains blocked after stable green checks, continue with the permitted GitHub merge route available to credentials.
- Treat `gh pr merge`, GitHub UI merge, and auto-merge as user-attributed publication; record PR number and merge commit in task artifacts after merge.
- If a task is already `DONE` and needs a post-merge fix, create a new task unless the follow-up
  branch slug explicitly starts with `post-merge-` or uses `followup` as a separate slug token
  bounded by the start, end, or hyphens; generic slugs under an already closed task id are treated
  as conflicting closure attempts.
- `integrate` defaults to the `merge` strategy so task branch commits stay in base history. Use `--merge-strategy squash` only when intentionally compacting branch history.
- When several task PRs are ready together, use the integration queue so only one branch owns the merge lane; agents waiting behind `claimed` or `handoff` entries SHOULD use bounded polling (`--wait --poll-interval-ms 30000 --timeout-ms 600000`) instead of retrying ad hoc; stale branch heads move to rework instead of blocking later queued work.
- `task start-ready` MAY surface targeted incident advice for analogous scope/tags; follow it before widening scope.
- Keep reusable external findings structured in the task README (`Fixability: external` or `IncidentExternal: true`); promote through base-branch `finish` or `agentplane incidents collect <task-id>`. Plain `Findings` stays task-local.
- MUST stop and request re-approval on material drift.
- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
- After merged closure, remove stale task branches/worktrees via the cleanup route instead of leaving orphaned local state behind.
<!-- /ap:fragment -->
