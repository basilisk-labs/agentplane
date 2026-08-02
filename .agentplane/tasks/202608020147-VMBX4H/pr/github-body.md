Task: `202608020147-VMBX4H`
Title: Scope pre-commit mutation policy to task-side base-sync diff
Canonical task record: `.agentplane/tasks/202608020147-VMBX4H/README.md`

## Summary

Scope pre-commit mutation policy to task-side base-sync diff

When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.

## Scope

- In scope: When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.
- Out of scope: unrelated refactors not required for "Scope pre-commit mutation policy to task-side base-sync diff".

## Verification

- State: needs_rework
- Note:

```text
Verification contract correction required: use the repository Knip baseline gate, not the raw
diagnostic binary.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T01:59:08.696Z
- Branch: task/202608020147-VMBX4H/base-sync-policy
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 117 +++++++++++++++++++++
 .../src/commands/hooks/base-sync-policy-paths.ts   |  53 ++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  22 +++-
 .../src/commands/hooks/run.pre-commit.ts           |   9 +-
 4 files changed, 198 insertions(+), 3 deletions(-)
```

</details>
