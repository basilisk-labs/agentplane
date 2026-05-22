Task: `202605221846-3ER2XX`
Title: Bound PR sync git subprocess duration
Canonical task record: `.agentplane/tasks/202605221846-3ER2XX/README.md`

## Summary

Bound PR sync git subprocess duration

Prevent PR sync diff-base git subprocesses from hanging pre-push or CI indefinitely by adding bounded timeout handling and explicit fallback diagnostics.

## Scope

- In scope: Prevent PR sync diff-base git subprocesses from hanging pre-push or CI indefinitely by adding bounded timeout handling and explicit fallback diagnostics.
- Out of scope: unrelated refactors not required for "Bound PR sync git subprocess duration".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed: review feedback about false empty diffstat on timeout was addressed;
timeout failures now surface, focused regression tests cover both ancestry and diffstat timeout
paths, Knip baseline remains unchanged, and typecheck passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T18:49:37.708Z
- Branch: task/202605221846-3ER2XX/pr-sync-git-timeouts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/sync-branch.test.ts   | 97 ++++++++++++++++++++++
 .../src/commands/pr/internal/sync-branch.ts        | 40 +++++++--
 packages/core/src/git/git-diff.ts                  | 19 +++--
 3 files changed, 143 insertions(+), 13 deletions(-)
```

</details>
