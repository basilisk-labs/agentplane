Task: `202609241856-CCBDZ9`
Title: Make canonical final validation execute only approved Plan verification commands
Canonical task record: `.agentplane/tasks/202609241856-CCBDZ9/README.md`

## Summary

Make canonical final validation execute only approved Plan verification commands

Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.

## Scope

- In scope: Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
- Out of scope: unrelated refactors not required for "Make canonical final validation execute only approved Plan verification commands".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-24T19:20:32.994Z
- Branch: task/202609241856-CCBDZ9/make-canonical-final-validation-execute-only-app
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/kernel-final-validation.test.ts   | 21 ++++++++++++++++++++-
 .../src/commands/task/kernel-final-validation.ts    |  6 +++++-
 2 files changed, 25 insertions(+), 2 deletions(-)
```

</details>
