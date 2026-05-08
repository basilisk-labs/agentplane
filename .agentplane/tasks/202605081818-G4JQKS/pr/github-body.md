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
- Note: Updated after rebasing onto current origin/main. Docs guidance is unchanged and scoped. Trial clone report now shows sources=843, clones=88, duplicatedLines=1587, duplicatedTokens=16808, percentage=1.44. clone:check intentionally fails on current main because duplicatedLines and duplicatedTokens exceed the older baseline by 6 lines and 24 tokens; this documents fresh clone drift rather than a docs regression. docs:scripts:check, policy routing, and doctor passed.
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
