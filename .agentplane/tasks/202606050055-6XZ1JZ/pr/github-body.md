Task: `202606050055-6XZ1JZ`
Title: Normalize lifecycle doctor warnings before v0.6.17
Canonical task record: `.agentplane/tasks/202606050055-6XZ1JZ/README.md`

## Summary

Normalize lifecycle doctor warnings before v0.6.17

Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.

## Scope

- In scope: Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.
- Out of scope: unrelated refactors not required for "Normalize lifecycle doctor warnings before v0.6.17".

## Verification

- State: ok
- Note: Lifecycle doctor warnings normalized.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T01:02:41.108Z
- Branch: task/202606050055-6XZ1JZ/normalize-lifecycle-doctor-warnings-before-v0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605221745-8BHZSX/README.md    | 37 +++++++++--
 .../evaluator-opinion.md                           | 18 ++++++
 .../evaluator-prompt.md                            | 74 ++++++++++++++++++++++
 .../quality-report.json                            | 20 ++++++
 .agentplane/tasks/202606011809-VCQPP7/README.md    | 37 +++++++++--
 .../evaluator-opinion.md                           | 18 ++++++
 .../evaluator-prompt.md                            | 74 ++++++++++++++++++++++
 .../quality-report.json                            | 20 ++++++
 .agentplane/tasks/202606041738-A531FX/pr/meta.json |  6 +-
 9 files changed, 293 insertions(+), 11 deletions(-)
```

</details>
