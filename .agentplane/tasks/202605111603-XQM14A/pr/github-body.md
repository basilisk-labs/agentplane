Task: `202605111603-XQM14A`
Title: Fix branch_pr lifecycle and integrate regressions
Canonical task record: `.agentplane/tasks/202605111603-XQM14A/README.md`

## Summary

Fix branch_pr lifecycle and integrate regressions

Stabilize branch_pr integrate, PR-flow, finish, timeout, merge-branch, and close-commit behavior before release.

## Scope

- In scope: branch_pr lifecycle, integrate, PR artifacts, finish, timeout, merge branch, and close-commit behavior.
- Out of scope: unrelated backend or release publication changes.

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core. Result: pass. Evidence: full cli-core passed 83 files and 675 tests, including branch_pr lifecycle, integrate, PR artifacts, hosted-close, and finish-close-commit suites. Scope: branch_pr lifecycle and integrate regressions.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T06:18:48.492Z
- Branch: task/202605111603-XQM14A/v05-cli-readiness
- Head: f5d1ea8a6a30

```text
No changes detected.
```

</details>
