Task: `202605180515-4CAK13`
Title: Fix open branch_pr feedback issues
Canonical task record: `.agentplane/tasks/202605180515-4CAK13/README.md`

## Summary

Fix open branch_pr feedback issues

Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.

Fixes #3853
Fixes #3854
Fixes #3845

## Scope

- In scope: Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
- Out of scope: unrelated refactors not required for "Fix open branch_pr feedback issues".

## Verification

- State: ok
- Note:

```text
Final PR artifact refresh after rebase and format repair. Command: bun run format:check; Result:
pass; Evidence: full Prettier check exited 0 after formatting rebased workflow scripts. Command:
hosted checks on PR #3863 head 837136122; Result: pass; Evidence: CodeQL, docs, test, test-windows,
Release-ready manifest all passed. Scope: final merge readiness for issues #3853, #3854, and #3845.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T05:51:51.896Z
- Branch: task/202605180515-4CAK13/fix-open-branch-pr-feedback
- Head: 83713612298d

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 .../cli/run-cli.core.pr-flow.pr-feedback.test.ts   | 128 +++++
 .../src/commands/task/finish.state.unit.test.ts    |  56 ++-
 .../src/commands/task/start.unit.test.ts           |  11 +-
 scripts/release/release-task-evidence.mjs          |   9 +-
 scripts/workflow/prepare-hosted-task-closure.mjs   |   9 +-
 6 files changed, 734 insertions(+), 31 deletions(-)
```

</details>
