<!-- ap:fragment id="policy.workflow.branch_pr.workflow.workflow.branch_pr" slot="workflow" mutability="replaceable" -->

# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.workflow.required.sequence" slot="workflow" mutability="replaceable" -->

## Required sequence

1. CHECKPOINT A: plan/approve on base checkout.
2. Start work with dedicated task branch + worktree.
3. Continue owner-scoped execution from the task worktree (not the base checkout).
4. Keep single-writer discipline per task worktree.
5. Publish/update PR artifacts from the task worktree.
6. Verify on the task branch.
7. Queue verified task branches for serialized integration when more than one agent is ready to merge.
8. CHECKPOINT B: INTEGRATOR runs integration from the base checkout; protected bases finalize through the task GitHub PR merge, not a direct local base mutation.
9. CHECKPOINT C: finish/close-tail evidence lands after the task PR merge and hosted close route complete.
10. Remove merged task branches/worktrees once the hosted-close/finish route has landed.

## Related task batch worktrees

When several approved tasks form one dependent change, they MAY be executed in one primary task
worktree instead of one worktree per task. Use this only when splitting the work into separate PRs
would add coordination risk without improving review.

Batch worktree rules:

- One task is the primary integration task and owns the branch, worktree, and PR.
- Every included task id MUST be listed in the primary task plan or PR artifact before mutation.
- Each included task MUST keep its own plan, start-ready record, Verify Steps, verification result,
  and finish evidence.
- Commits SHOULD mention the relevant task suffixes when a change serves more than one included
  task.
- The final PR MUST describe the full included task set and merge the complete result into `main`.

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
- In `branch_pr`, the task GitHub PR is the primary integration mechanism. Local `integrate`
  serializes the lane and drives the provider merge route; it MUST NOT treat GitHub PR merge as an
  exceptional shortcut around local base mutation.
- If protected `main` requires GitHub PR merges, the agent MUST create/update the GitHub PR,
  wait until all hosted checks are complete and stable (including late agent checks that appear
  after the first green rollup), then merge it through GitHub. If auto-merge remains blocked
  after stable green checks, the agent MUST continue with the permitted GitHub merge route
  available to its credentials instead of stopping at enabled auto-merge.
- `integrate` defaults to the `merge` strategy so task branch commits stay in base history. Use `--merge-strategy squash` only when intentionally compacting branch history.
- When several task PRs are ready together, use the integration queue so only one branch owns the merge lane; agents waiting behind `claimed` or `handoff` entries SHOULD use bounded polling (`--wait --poll-interval-ms 30000 --timeout-ms 600000`) instead of retrying ad hoc; stale branch heads move to rework instead of blocking later queued work.
- `task start-ready` MAY surface targeted incident advice for analogous scope/tags; follow it before widening scope.
- Keep structured resolved external findings in the task README; mark reusable ones with `Fixability: external` (or `IncidentExternal: true`) and let base-branch `finish` or `agentplane incidents collect <task-id>` promote them into `.agentplane/policy/incidents.md`, using optional `Incident*` fields only when the inferred scope/advice needs refinement. Plain `Findings` text remains task-local and does not update the shared incident registry.
- MUST stop and request re-approval on material drift.
- Planning and closure happen on base checkout.
- Do not export task snapshots from task branches.
- After merged closure, remove stale task branches/worktrees via the cleanup route instead of leaving orphaned local state behind.
<!-- /ap:fragment -->
