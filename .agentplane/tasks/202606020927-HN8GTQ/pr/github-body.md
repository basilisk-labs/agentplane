Task: `202606020927-HN8GTQ`
Title: Split oversized branch_pr lifecycle test files
Canonical task record: `.agentplane/tasks/202606020927-HN8GTQ/README.md`

## Summary

Split oversized branch_pr lifecycle test files

Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.

## Scope

- In scope: Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.
- Out of scope: unrelated refactors not required for "Split oversized branch_pr lifecycle test files".

## Verification

- State: ok
- Note:

```text
Split branch_pr worktree runtime coverage into a focused test file; target tests, hotspot baseline,
vitest project routing, and policy routing passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-02T09:56:20.842Z
- Branch: task/202606020927-HN8GTQ/split-oversized-branch-pr-lifecycle-test-files
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 667 -----------------
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  | 790 +++++++++++++++++++++
 scripts/oversized-test-baseline.json               |   4 -
 3 files changed, 790 insertions(+), 671 deletions(-)
```

</details>
