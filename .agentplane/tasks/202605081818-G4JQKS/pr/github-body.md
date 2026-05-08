Task: `202605081818-G4JQKS`
Title: Document semantic clone refactor workflow
Canonical task record: `.agentplane/tasks/202605081818-G4JQKS/README.md`

## Summary

Document semantic clone refactor workflow

Document how to use clone report/check/baseline commands during refactoring and record a trial run.

## Scope

- In scope: Document how to use clone report/check/baseline commands during refactoring and record a trial run.
- Out of scope: unrelated refactors not required for "Document semantic clone refactor workflow".

## Verification

- State: ok
- Note: Documented semantic clone report/check/baseline usage in developer quality docs. Trial run passed: clone:report reported sources=843, clones=88, duplicatedLines=1581, duplicatedTokens=16784, percentage=1.44; clone:check passed against the baseline. docs:scripts:check, policy routing, and doctor also passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:26:36.677Z
- Branch: task/202605081818-G4JQKS/clone-refactor-docs
- Head: dd75f838a3b8

```text
 .../blueprint/resolved-snapshot.json               | 343 +++++++++++++++++++++
 docs/developer/testing-and-quality.mdx             |  37 +++
 2 files changed, 380 insertions(+)
```

</details>
