Task: `202610240837-5MMMW5`
Title: Repair PR check snapshot validation for 0.7.13
Canonical task record: `.agentplane/tasks/202610240837-5MMMW5/README.md`

## Summary

Repair PR check snapshot validation for 0.7.13

Diagnose and fix two deterministic pr check failures in pr-validation CLI tests. Preserve correct local-versus-branch artifact freshness selection and fail-closed validation. Add exact stderr evidence, focused regression coverage, and full verification.

## Scope

- In scope: Diagnose and fix two deterministic pr check failures in pr-validation CLI tests. Preserve correct local-versus-branch artifact freshness selection and fail-closed validation. Add exact stderr evidence, focused regression coverage, and full verification.
- Out of scope: unrelated refactors not required for "Repair PR check snapshot validation for 0.7.13".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T08:48:08.033Z
- Branch: task/202610240837-5MMMW5/repair-pr-check-snapshot-validation-for-0-7-13
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts | 61 ++++++++++------------
 1 file changed, 29 insertions(+), 32 deletions(-)
```

</details>
