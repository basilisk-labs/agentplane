Task: `202605240708-K9R164`
Title: Fix recent branch_pr issue candidates
Canonical task record: `.agentplane/tasks/202605240708-K9R164/README.md`

## Summary

Fix recent branch_pr issue candidates

Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.

## Scope

- In scope: Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.
- Out of scope: unrelated refactors not required for "Fix recent branch_pr issue candidates".

## Verification

- State: ok
- Note:

```text
Verified: Quality gate reviewed the implementation diff and focused check results. Command: git show
--stat 15865576914860a14ed5cb1e3bb59731e2b6cac1; Result: pass; Evidence: scoped diff covers pr
artifact auto-commit, local backend scanning, GitHub API merge fallback, and regression tests only.
Scope: issue-backed branch_pr fixes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T07:11:46.100Z
- Branch: task/202605240708-K9R164/fix-recent-branch-pr-issue-candidates
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.local.test.ts        |  31 +++++++
 .../backends/task-backend/local-backend-read.ts    |  16 +++-
 .../cli/run-cli.core.pr-flow.pr-lifecycle.test.ts  | 101 +++++++++++++++++++++
 .../src/commands/pr/integrate/cmd.test.ts          |  84 +++++++++++++++++
 .../pr/integrate/internal/github-pr-merge.ts       |  49 +++++-----
 .../src/commands/pr/internal/auto-commit.ts        |  48 +++++++++-
 6 files changed, 301 insertions(+), 28 deletions(-)
```

</details>
