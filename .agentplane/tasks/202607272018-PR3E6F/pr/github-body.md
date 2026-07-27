Task: `202607272018-PR3E6F`
Title: Synchronize evaluator verification guidance for alpha.2 qualification
Canonical task record: `.agentplane/tasks/202607272018-PR3E6F/README.md`

## Summary

Synchronize evaluator verification guidance for alpha.2 qualification

Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.

## Scope

- In scope: Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.
- Out of scope: unrelated refactors not required for "Synchronize evaluator verification guidance for alpha.2 qualification".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T20:21:29.432Z
- Branch: task/202607272018-PR3E6F/synchronize-evaluator-verification-guidance-for
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/assets/AGENTS.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
