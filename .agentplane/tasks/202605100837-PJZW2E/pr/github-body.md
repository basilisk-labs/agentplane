Task: `202605100837-PJZW2E`
Title: Pre-v0.5: reject finish --commit-from-comment in branch_pr
Canonical task record: `.agentplane/tasks/202605100837-PJZW2E/README.md`

## Summary

Pre-v0.5: reject finish --commit-from-comment in branch_pr

After diagnostics/error taxonomy exists, reject finish --commit-from-comment in branch_pr with E_USAGE explaining that finish runs on base while implementation commits belong to task worktrees. Preserve direct mode.

## Scope

- In scope: After diagnostics/error taxonomy exists, reject finish --commit-from-comment in branch_pr with E_USAGE explaining that finish runs on base while implementation commits belong to task worktrees. Preserve direct mode.
- Out of scope: unrelated refactors not required for "Pre-v0.5: reject finish --commit-from-comment in branch_pr".

## Verification

- State: ok
- Note: Verified: branch_pr finish --commit-from-comment now fails with E_USAGE before task loading/mutation or commit-from-comment staging; direct/status paths remain covered by focused finish suites.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T17:34:16.697Z
- Branch: task-202605100837-PJZW2E-finish-commit-from-comment-guard
- Head: d145ef3cb450

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../agentplane/src/commands/task/finish-plan.ts    |  11 +
 .../commands/task/finish.close-tail.unit.test.ts   | 104 ++---
 .../src/commands/task/finish.state.unit.test.ts    |  59 ++-
 4 files changed, 581 insertions(+), 98 deletions(-)
```

</details>
