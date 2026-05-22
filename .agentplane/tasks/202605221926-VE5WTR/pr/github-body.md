Task: `202605221926-VE5WTR`
Title: Bound local CI targeted test process duration
Canonical task record: `.agentplane/tasks/202605221926-VE5WTR/README.md`

## Summary

Bound local CI targeted test process duration

Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.

## Scope

- In scope: Prevent local pre-push and run-local-ci targeted Vitest suites from hanging indefinitely by adding a bounded process timeout and actionable diagnostics for suite-level stalls.
- Out of scope: unrelated refactors not required for "Bound local CI targeted test process duration".

## Verification

- State: ok
- Note:

```text
Reviewed one-commit branch after PR artifact refresh; local focused checks passed and PR diff
contains the intended run-local-ci timeout guard.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T19:30:34.074Z
- Branch: task/202605221926-VE5WTR/local-ci-vitest-timeout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/release/release-ci-contract.test.ts   | 12 ++++++
 scripts/checks/run-local-ci.mjs                    | 46 +++++++++++++++++++---
 2 files changed, 53 insertions(+), 5 deletions(-)
```

</details>
