## Summary

Persist duplicate closure artifacts for superseded branch_pr tasks

Record canonical DONE state on base for duplicate-closed branch_pr tasks 202604091534-1Y4FGP and 202604091534-2ETZXS after their stale GitHub PRs were superseded and closed, so main/origin/task projections stay consistent without local untracked task artifacts.

## Scope

- In scope: Record canonical DONE state on base for duplicate-closed branch_pr tasks 202604091534-1Y4FGP and 202604091534-2ETZXS after their stale GitHub PRs were superseded and closed, so main/origin/task projections stay consistent without local untracked task artifacts.
- Out of scope: unrelated refactors not required for "Persist duplicate closure artifacts for superseded branch_pr tasks".

## Verification

### Plan

1. Confirm task projections for 202604091534-1Y4FGP and 202604091534-2ETZXS resolve to DONE duplicate closures in the branch copy. Expected: both tasks show `status=DONE` with `result_summary` pointing at the superseding task ids.
2. Confirm GitHub PRs #195 and #196 are closed and no open PR remains for those task branches. Expected: both PRs are `CLOSED` and `gh pr list --state open` excludes them.
3. Confirm the reconcile branch changes only add canonical task artifacts for the two superseded tasks plus the active reconcile task doc. Expected: `git status --short` scopes to `.agentplane/tasks/202604091534-1Y4FGP`, `.agentplane/tasks/202604091534-2ETZXS`, and `.agentplane/tasks/202604091711-90MFFW`.

### Current Status

- State: ok
- Note: Command: agentplane task show 202604091534-1Y4FGP; agentplane task show 202604091534-2ETZXS
Result: pass
Evidence: both task projections resolve to DONE duplicate closures with result summaries pointing at 202604091534-H5N1BV and 202604091534-QQH4QA.
Scope: canonical task artifacts for superseded tasks 1Y4FGP and 2ETZXS.

Command: gh pr view 195 --repo basilisk-labs/agentplane --json number,state,closed; gh pr view 196 --repo basilisk-labs/agentplane --json number,state,closed; gh pr list --repo basilisk-labs/agentplane --state open
Result: pass
Evidence: PR #195 and PR #196 are CLOSED; the only remaining open PR is the active reconcile PR #207.
Scope: GitHub closure state for superseded task branches.

Command: git diff --name-only main...HEAD
Result: pass
Evidence: committed branch diff is limited to .agentplane/tasks/202604091534-1Y4FGP, .agentplane/tasks/202604091534-2ETZXS, and .agentplane/tasks/202604091711-90MFFW/README.md.
Scope: reconcile branch change surface.

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

- Updated: 2026-04-09T17:17:12.478Z
- Branch: task/202604091711-90MFFW/persist-duplicate-closures
- Head: cbd088effec4

```text
 .agentplane/tasks/202604091534-1Y4FGP/README.md    | 171 +++++++++++++++++++++
 .../tasks/202604091534-1Y4FGP/pr/diffstat.txt      |   0
 .../tasks/202604091534-1Y4FGP/pr/github-body.md    |  58 +++++++
 .../tasks/202604091534-1Y4FGP/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091534-1Y4FGP/pr/meta.json |  14 ++
 .../tasks/202604091534-1Y4FGP/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091534-1Y4FGP/pr/review.md |  65 ++++++++
 .../tasks/202604091534-1Y4FGP/pr/verify.log        |   0
 .agentplane/tasks/202604091534-2ETZXS/README.md    | 171 +++++++++++++++++++++
 .../tasks/202604091534-2ETZXS/pr/diffstat.txt      |   0
 .../tasks/202604091534-2ETZXS/pr/github-body.md    |  58 +++++++
 .../tasks/202604091534-2ETZXS/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091534-2ETZXS/pr/meta.json |  14 ++
 .../tasks/202604091534-2ETZXS/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091534-2ETZXS/pr/review.md |  65 ++++++++
 .../tasks/202604091534-2ETZXS/pr/verify.log        |   0
 .agentplane/tasks/202604091711-90MFFW/README.md    |  94 +++++++++++
 17 files changed, 712 insertions(+)
```

</details>
