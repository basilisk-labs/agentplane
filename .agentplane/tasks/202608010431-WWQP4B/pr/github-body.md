Task: `202608010431-WWQP4B`
Title: Bound evaluator review packets to implementation evidence
Canonical task record: `.agentplane/tasks/202608010431-WWQP4B/README.md`

## Summary

Bound evaluator review packets to implementation evidence

Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence.

## Scope

- In scope: change evaluator actual_diff preparation so the active task artifact subtree is excluded from the patch because task README, blueprint, observed checks, and policy are already separate digest-verified evidence; add regression coverage for generated README/blueprint/pr/verification/quality artifacts and preserve implementation plus unrelated-task changes.
- In scope: record before/after line and byte counts on the YD5J89 review surface.
- Out of scope: changing evaluator verdict rules, provider selection, frozen digest validation, or excluding another task's intentional artifacts.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T04:33:32.635Z
- Branch: task/202608010431-WWQP4B/bound-evaluator-review-packets-to-implementation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
