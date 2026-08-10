# Worktree and branch debt findings

The baseline inventory is recorded in `inventory-before.json`. No worktree, branch, or remote ref has been removed.

## Confirmed baseline

- Registered worktrees: 76.
- Local branches: 89.
- Protected recovery worktrees: 48, including every nested worktree below the RF05B and XS41ZV recovery roots.
- Dirty worktrees: 13.
- Worktrees whose task artifact still reports `TODO`, `DOING`, or `BLOCKED`: 12.
- Duplicate worktrees for the same active task: 0.
- Stale registrations whose paths are absent: 1.
- Clean inactive worktrees with an exact merged-PR head identity: 4.

## Lifecycle gaps

1. `agentplane cleanup merged --base main` reports no candidates even though four clean `DONE` worktrees exactly match the recorded head of merged PRs. Their commits are not ancestors of `origin/main` after provider squash/rebase, so ancestry-only cleanup proof strands them.
2. `cleanup merged --report ...` must run from the base checkout, while this approved branch_pr ops task grants mutation authority only to its task worktree. The command therefore cannot persist its report inside the authoritative task artifact without violating one of the two contracts.
3. The single stale registration is visible to `git worktree prune --dry-run --verbose`, but the same base-checkout authority mismatch prevents this task from pruning it through its current guarded route.
4. Several old worktrees remain formally active because their task artifacts still say `DOING`, including branches with closed or missing PRs. They require explicit task-state reconciliation before cleanup; age alone is not deletion proof.
5. Most registered worktrees are nested inside two intentionally preserved recovery roots. A flat global count makes this protected recovery state look like ordinary task debt.

## Required remediation order

1. Fix cleanup proof to accept an exact merged provider PR head when ancestry was rewritten, while rejecting post-merge branch drift.
2. Give cleanup/report/prune operations a coherent base-checkout execution route with task-scoped evidence persistence.
3. Re-run the inventory and AgentPlane candidate report.
4. Prune the single absent registration and clean the four currently proven merged worktrees by explicit task id.
5. Reconcile the remaining old `DOING` tasks separately; retain every dirty, unmerged, open, recovery, or ambiguous entry.

## Completed cleanup

- Added provider-backed recovery for legacy merged tasks whose metadata lacks `pr_number`; the proof requires one exact branch/base PR identity, merged provider state, exact provider head, valid task/closure ancestry, and no replacement refs.
- Deleted four clean inactive worktrees and their local branches through targeted AgentPlane cleanup: `202606050702-9E8DFM` (PR #4456), `202606050748-TSVF5R` (PR #4457), `202606050808-HP5P63` (PR #4458), and `202606120809-85QTY9` (PR #4510).
- Pruned the single stale registration `/private/tmp/nwvcag-scope-adUDF0` only after `git worktree prune --dry-run --verbose` identified its missing gitdir.
- Fast-forwarded the primary `main` checkout to `origin/main` at `30390d4a2c545984642bcc2e4754582ff5d2316b`. Its tracked state is clean. The conflicting local 25R7W2 README was retained under `.agentplane/tmp/recovery-20260810-root-task-readmes/`.

## Confirmed after state

- Registered worktrees: 70, down from 76.
- Local branches: 84, down from 89 at baseline and including branches created after baseline before their own cleanup.
- Stale registrations: 0.
- Remaining safe worktree cleanup candidates: 0.
- Remaining safe local branch delete candidates: 0.
- Duplicate active-task worktrees: 0. Distinct active tasks retain independent worktrees and may execute concurrently.
- Dirty worktrees remain 13 and active-task worktrees remain 12; none was removed.
- All 48 protected recovery worktrees remain. The RF05B and XS41ZV status, diff, and staged digests exactly match the baseline inventory.

## Retained debt

The remaining 70 worktrees are not bulk-cleanup candidates. Forty-eight belong to the two protected recovery trees; the rest include the primary checkout, the current task, active tasks, dirty state, missing task truth, open/unmerged work, or ambiguous legacy state. They require task-state reconciliation rather than age-based deletion.
