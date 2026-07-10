Task: `202607101141-6T0H1E`
Title: Recognize rebased pre-merge closure recorded on base
Canonical task record: `.agentplane/tasks/202607101141-6T0H1E/README.md`

## Summary

Recognize rebased pre-merge closure recorded on base

Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.

## Scope

- In scope: Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
- Out of scope: unrelated refactors not required for "Recognize rebased pre-merge closure recorded on base".

## Verification

- State: ok
- Note:

```text
Matching closure evidence on protected main is validated strictly by task id, DONE state, non-empty
commit, branch, and PR number. Focused suites 5/20, typecheck, lint, ci:contract, policy routing,
doctor, test:fast 364/2152, full-fast local CI, and critical CLI E2E passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T12:07:19.442Z
- Branch: task/202607101141-6T0H1E/recognize-rebased-pre-merge-closure-recorded-on
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   1 +
 docs/internal/v0.6.22-refactor-plan.md             |   3 +-
 packages/agentplane/src/commands/pr/flow-status.ts |  37 ++++++--
 .../src/commands/task/close-tail-state.test.ts     | 101 +++++++++++++++++++++
 .../src/commands/task/close-tail-state.ts          |  58 ++++++++++++
 5 files changed, 190 insertions(+), 10 deletions(-)
```

</details>
