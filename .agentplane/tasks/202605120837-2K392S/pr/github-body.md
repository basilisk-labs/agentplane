Task: `202605120837-2K392S`
Title: Defer init base branch creation until apply
Canonical task record: `.agentplane/tasks/202605120837-2K392S/README.md`

## Summary

Defer init base branch creation until apply

Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.

## Scope

- In scope: Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.
- Out of scope: unrelated refactors not required for "Defer init base branch creation until apply".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T08:49:23.593Z
- Branch: task/202605120837-2K392S/defer-init-base-branch-apply
- Head: 27540f93715f

```text
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 .../src/cli/run-cli.core.init-base-branch.test.ts  |  51 ++
 .../src/cli/run-cli/commands/init/base-branch.ts   | 102 +++-
 .../src/cli/run-cli/commands/init/execution.ts     |  11 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   4 +-
 5 files changed, 669 insertions(+), 11 deletions(-)
```

</details>
