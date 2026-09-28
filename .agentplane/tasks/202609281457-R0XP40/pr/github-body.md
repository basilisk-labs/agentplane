Task: `202609281457-R0XP40`
Title: Fix release candidate preparation order before 0.7.12 publication
Canonical task record: `.agentplane/tasks/202609281457-R0XP40/README.md`

## Summary

Fix release candidate preparation order before 0.7.12 publication

User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.

## Scope

- In scope: User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
- Out of scope: unrelated refactors not required for "Fix release candidate preparation order before 0.7.12 publication".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-28T15:07:14.483Z
- Branch: task/202609281457-R0XP40/fix-release-candidate-preparation-order-before-0
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/release/release-ci-contract.test.ts   | 140 ++++++++++++++++++++-
 scripts/release/candidate-prepare.mjs              |  81 +++++++++---
 2 files changed, 206 insertions(+), 15 deletions(-)
```

</details>
