Task: `202605141957-FB780T`
Title: Fix remote-check wait helper timeout contract (issue #3760)
Canonical task record: `.agentplane/tasks/202605141957-FB780T/README.md`

## Summary

Fix remote-check wait helper timeout contract (issue #3760)

Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760

## Scope

- In scope: Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760.
- Out of scope: unrelated refactors not required for "Fix remote-check wait helper timeout contract (issue #3760)".

## Verification

- State: ok
- Note:

```text
Re-verified after replacing fallback Verify Steps with task-specific checks; all previously run
focused code/docs/workflow checks remain passing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T19:57:37.081Z
- Branch: task/202605141957-FB780T/remote-check-timeout-contract
- Head: b9ebb6e0eb9c

```text
No changes detected.
```

</details>
